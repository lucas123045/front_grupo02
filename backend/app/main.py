"""API FastAPI que expõe o simulador de recarga (Data Structures Sprint,
Equipe02-1CCPO) para o front-end React.

Porta as classes originais (Carros.py, equacoesRecarga.py,
gerenciamentoDeRecarga.py, sistemaCobranca.py, SimuladorOCPP.py) e substitui o
loop bloqueante de CLI (simuladorDeRecarga.py) por uma tarefa assíncrona de
fundo que avança a simulação 1x por segundo, da mesma forma que
`monitorar_carregamento()` fazia.
"""
import asyncio
from contextlib import asynccontextmanager
from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .carros import Carro
from .cobranca import SistemaCobranca
from .gerenciamento import GerenciamentoDeRecarga
from .ocpp import SimuladorOCPP
from .schemas import (
    CHARGE_TYPE_TO_CODE,
    CODE_TO_CHARGE_TYPE,
    ChargingSessionOut,
    DemandaOut,
    DemandPointOut,
    DetalheTarifa,
    FaturaOut,
    NovaSessaoIn,
    NovaSessaoOut,
    ProtocolEventOut,
    RelatorioOut,
    SessionsOut,
    TarifaTipoOut,
    TarifasOut,
)

STATION_ID = "HCA-001"
CHARGE_TYPE_LABEL = {"lenta": "Lenta", "rapida": "Rápida", "prioridade": "Prioridade"}

gerenciamento = GerenciamentoDeRecarga()
cobranca = SistemaCobranca()
ocpp = SimuladorOCPP()
lock = asyncio.Lock()


async def loop_simulacao():
    while True:
        await asyncio.sleep(1)
        async with lock:
            gerenciamento.tick(ocpp, cobranca)


@asynccontextmanager
async def lifespan(app: FastAPI):
    ocpp.boot_notification()
    task = asyncio.create_task(loop_simulacao())
    yield
    task.cancel()


app = FastAPI(title="ChargeGrid API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def carro_para_sessao(carro: Carro) -> ChargingSessionOut:
    ativo = carro.custo_final is None
    fim_dt = carro.finalizado_em_dt or datetime.now()
    duracao_min = (fim_dt - carro.iniciado_em_dt).total_seconds() / 60

    if ativo:
        carros_referencia = gerenciamento.carros_ativos
        custo = carro.energia * cobranca.calcular_tarifa(carro, carros_referencia)
    else:
        custo = carro.custo_final or 0.0

    return ChargingSessionOut(
        id=f"S-{carro.id}",
        stationId=STATION_ID,
        stationName=STATION_ID,
        clientName=carro.nome,
        vehicleModel=carro.modelo,
        chargeType=CODE_TO_CHARGE_TYPE[carro.tipo_recarga],
        startedAt=carro.iniciado_em_dt.isoformat(),
        endedAt=carro.finalizado_em,
        durationMin=round(duracao_min, 2),
        energyKwh=round(carro.energia, 2),
        avgPowerKw=round(carro.potencia, 2),
        costBrl=round(custo, 2),
        status="em-andamento" if ativo else "concluida",
        batteryPct=round(carro.bateria, 2),
    )


def montar_tarifa_tipo(tipo: str, carros_ativos_count: int) -> TarifaTipoOut:
    codigo = CHARGE_TYPE_TO_CODE[tipo]
    horario = cobranca.tarifa_por_horario()
    demanda = 0.10 if carros_ativos_count >= 3 else 0.0
    adicional_tipo = cobranca.tarifa_por_tipo(codigo)
    from .carros import POTENCIA_POR_TIPO

    return TarifaTipoOut(
        tipo=tipo,
        label=CHARGE_TYPE_LABEL[tipo],
        maxPowerKw=POTENCIA_POR_TIPO[codigo],
        adicionalTipo=adicional_tipo,
        tarifaFinal=horario + demanda + adicional_tipo,
    )


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.get("/api/sessions", response_model=SessionsOut)
async def listar_sessoes():
    async with lock:
        return SessionsOut(
            ativas=[carro_para_sessao(c) for c in gerenciamento.carros_ativos],
            finalizadas=[carro_para_sessao(c) for c in reversed(gerenciamento.carros_finalizados)],
        )


@app.post("/api/sessions", response_model=NovaSessaoOut, status_code=201)
async def criar_sessao(payload: NovaSessaoIn):
    async with lock:
        if len(gerenciamento.carros_ativos) >= 10:
            raise HTTPException(status_code=409, detail="Limite de 10 veículos simultâneos atingido.")

        codigo = CHARGE_TYPE_TO_CODE[payload.tipoRecarga]
        carro = gerenciamento.adicionar_carro(codigo, payload.modelo, payload.nome)
        ocpp.iniciar_sessao(carro)

        horario = cobranca.tarifa_por_horario()
        demanda = cobranca.tarifa_por_demanda(gerenciamento.carros_ativos)
        tipo = cobranca.tarifa_por_tipo(codigo)
        tarifa_final = horario + demanda + tipo
        total = carro.energia * tarifa_final

        fatura = FaturaOut(
            clienteNome=carro.nome,
            veiculoModelo=carro.modelo,
            energiaKwh=round(carro.energia, 2),
            detalheTarifa=DetalheTarifa(
                tarifaHorario=horario,
                tarifaDemanda=demanda,
                tarifaTipo=tipo,
                tarifaFinal=tarifa_final,
            ),
            totalBrl=round(total, 2),
            estimada=True,
        )

        return NovaSessaoOut(session=carro_para_sessao(carro), fatura=fatura)


@app.get("/api/tarifas", response_model=TarifasOut)
async def tarifas_vigentes():
    async with lock:
        carros_ativos_count = len(gerenciamento.carros_ativos)
        return TarifasOut(
            tarifaHorario=cobranca.tarifa_por_horario(),
            adicionalDemanda=0.10 if carros_ativos_count >= 3 else 0.0,
            carrosAtivos=carros_ativos_count,
            porTipo=[montar_tarifa_tipo(t, carros_ativos_count) for t in ("lenta", "rapida", "prioridade")],
        )


@app.get("/api/demanda", response_model=DemandaOut)
async def demanda_atual():
    async with lock:
        return DemandaOut(
            currentKw=round(sum(c.potencia for c in gerenciamento.carros_ativos), 2),
            limitKw=gerenciamento.demanda_contratada,
            mode="automatico",
            activeChargers=len(gerenciamento.carros_ativos),
        )


@app.get("/api/demanda/historico", response_model=list[DemandPointOut])
async def demanda_historico():
    async with lock:
        return [DemandPointOut(**ponto) for ponto in gerenciamento.historico_demanda]


@app.get("/api/protocolos", response_model=list[ProtocolEventOut])
async def protocolos():
    async with lock:
        return [
            ProtocolEventOut(
                id=msg["id"],
                message=f"{msg['action']} — {msg['payload']}",
                direction=msg["direction"],
                time=msg["time"],
            )
            for msg in ocpp.log
        ]


@app.get("/api/relatorio", response_model=RelatorioOut)
async def relatorio():
    async with lock:
        todas = gerenciamento.carros_ativos + gerenciamento.carros_finalizados
        energia_total = sum(c.energia for c in todas)
        receita_total = sum(
            (c.custo_final if c.custo_final is not None else c.energia * cobranca.calcular_tarifa(c, gerenciamento.carros_ativos))
            for c in todas
        )
        return RelatorioOut(
            totalSessoes=len(todas),
            sessoesConcluidas=len(gerenciamento.carros_finalizados),
            sessoesAtivas=len(gerenciamento.carros_ativos),
            energiaTotalKwh=round(energia_total, 2),
            receitaTotalBrl=round(receita_total, 2),
            historicoTotalBrl=round(cobranca.gerar_historico(), 2),
        )
