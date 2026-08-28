from typing import Literal, Optional

from pydantic import BaseModel, Field

ChargeType = Literal["lenta", "rapida", "prioridade"]

CHARGE_TYPE_TO_CODE = {"lenta": "1", "rapida": "2", "prioridade": "3"}
CODE_TO_CHARGE_TYPE = {v: k for k, v in CHARGE_TYPE_TO_CODE.items()}


class NovaSessaoIn(BaseModel):
    nome: str = Field(min_length=1)
    modelo: str = Field(min_length=1)
    tipoRecarga: ChargeType


class DetalheTarifa(BaseModel):
    tarifaHorario: float
    tarifaDemanda: float
    tarifaTipo: float
    tarifaFinal: float


class ChargingSessionOut(BaseModel):
    id: str
    stationId: str
    stationName: str
    clientName: str
    vehicleModel: str
    chargeType: ChargeType
    startedAt: str
    endedAt: Optional[str] = None
    durationMin: float
    energyKwh: float
    avgPowerKw: float
    costBrl: float
    status: Literal["em-andamento", "concluida"]
    batteryPct: float


class NovaSessaoOut(BaseModel):
    session: ChargingSessionOut
    fatura: "FaturaOut"


class FaturaOut(BaseModel):
    clienteNome: str
    veiculoModelo: str
    energiaKwh: float
    detalheTarifa: DetalheTarifa
    totalBrl: float
    estimada: bool


class SessionsOut(BaseModel):
    ativas: list[ChargingSessionOut]
    finalizadas: list[ChargingSessionOut]


class TarifaTipoOut(BaseModel):
    tipo: ChargeType
    label: str
    maxPowerKw: float
    adicionalTipo: float
    tarifaFinal: float


class TarifasOut(BaseModel):
    tarifaHorario: float
    adicionalDemanda: float
    carrosAtivos: int
    porTipo: list[TarifaTipoOut]


class DemandaOut(BaseModel):
    currentKw: float
    limitKw: float
    mode: Literal["automatico"]
    activeChargers: int


class DemandPointOut(BaseModel):
    time: str
    demandKw: float
    limitKw: float


class ProtocolEventOut(BaseModel):
    id: str
    message: str
    direction: Literal["in", "out"]
    time: str


class RelatorioOut(BaseModel):
    totalSessoes: int
    sessoesConcluidas: int
    sessoesAtivas: int
    energiaTotalKwh: float
    receitaTotalBrl: float
    historicoTotalBrl: float


NovaSessaoOut.model_rebuild()
