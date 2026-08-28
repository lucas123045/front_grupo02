"""Porte de gerenciamentoDeRecarga.py + o loop de monitorar_carregamento()
de simuladorDeRecarga.py, adaptado para rodar como uma tarefa de fundo da API
em vez de um loop bloqueante de CLI.
"""
from datetime import datetime
from typing import List

from .carros import Carro
from .cobranca import SistemaCobranca
from .equacoes import calcular_energia_necessaria, calcular_tempo_necessario
from .ocpp import SimuladorOCPP

MULTIPLICADOR = 100
HISTORICO_DEMANDA_MAX = 120


class GerenciamentoDeRecarga:
    def __init__(self):
        self.carros_ativos: List[Carro] = []
        self.carros_finalizados: List[Carro] = []
        self.demanda_contratada = 100
        self.historico_demanda: List[dict] = []
        self._proximo_id = 1

    def adicionar_carro(self, tipo_recarga: str, modelo_carro: str, nome: str) -> Carro:
        carro = Carro(id=self._proximo_id, tipo_recarga=tipo_recarga, modelo_carro=modelo_carro, nome=nome)
        self._proximo_id += 1
        carro.energia = calcular_energia_necessaria(carro.capacidade, carro.bateria)
        carro.tempo = calcular_tempo_necessario(carro.energia, carro.potencia)
        carro.tempo_inicial = carro.tempo
        self.carros_ativos.append(carro)
        return carro

    def gerenciar_carregamento(self):
        total = sum(c.potencia for c in self.carros_ativos)
        if total >= self.demanda_contratada:
            self.redistribuir_carregamento()

    def redistribuir_carregamento(self):
        carro_prioritario = min(self.carros_ativos, key=lambda c: c.bateria)
        outros = [c for c in self.carros_ativos if c is not carro_prioritario]

        potencia_prioritario = min(carro_prioritario.potencia_maxima * 1.4, self.demanda_contratada)
        carro_prioritario.potencia = potencia_prioritario

        sobra = self.demanda_contratada - potencia_prioritario
        potencia_por_carro = sobra / len(outros) if outros else 0

        for carro in outros:
            carro.potencia = min(potencia_por_carro, carro.potencia_maxima)

    def _remover_finalizados(self, ocpp: SimuladorOCPP, cobranca: SistemaCobranca):
        finalizados = []
        contexto_demanda = list(self.carros_ativos)  # nº de carros ativos no instante do término
        for carro in self.carros_ativos[:]:
            if carro.bateria >= 100:
                self.carros_ativos.remove(carro)
                carro.custo_final = cobranca.calcular_valor_sessao(carro, contexto_demanda)
                agora = datetime.now()
                carro.finalizado_em = agora.isoformat()
                carro.finalizado_em_dt = agora
                self.carros_finalizados.append(carro)
                ocpp.encerrar_sessao(carro)
                finalizados.append(carro)
        return finalizados

    def tick(self, ocpp: SimuladorOCPP, cobranca: SistemaCobranca):
        """Avança 1 segundo de simulação (mesma regra de monitorar_carregamento)."""
        for carro in self.carros_ativos:
            energia_por_segundo = (carro.potencia / 3600) * MULTIPLICADOR
            carro.bateria += (energia_por_segundo / carro.capacidade) * 100
            if carro.bateria > 100:
                carro.bateria = 100

            energia_restante = (100 - carro.bateria) * carro.capacidade / 100
            carro.tempo = (energia_restante / energia_por_segundo) if energia_por_segundo > 0 else 0

        self.gerenciar_carregamento()
        finalizados = self._remover_finalizados(ocpp, cobranca)

        self.historico_demanda.append(
            {
                "time": datetime.now().strftime("%H:%M:%S"),
                "demandKw": round(sum(c.potencia for c in self.carros_ativos), 2),
                "limitKw": self.demanda_contratada,
            }
        )
        del self.historico_demanda[:-HISTORICO_DEMANDA_MAX]

        return finalizados
