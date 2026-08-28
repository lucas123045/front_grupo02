"""Porte direto de sistemaCobranca.py."""
from datetime import datetime
from typing import List

from .carros import Carro


class SistemaCobranca:
    def __init__(self):
        self.historico: List[float] = []

    def tarifa_por_horario(self, agora: datetime | None = None) -> float:
        hora = (agora or datetime.now()).hour
        if 18 <= hora <= 21:
            return 0.95
        elif hora >= 22 or hora <= 6:
            return 0.65
        else:
            return 0.80

    def tarifa_por_demanda(self, carros_ativos: list) -> float:
        return 0.10 if len(carros_ativos) >= 3 else 0.0

    def tarifa_por_tipo(self, tipo_recarga: str) -> float:
        return {"1": 0.0, "2": 0.05, "3": 0.15}.get(tipo_recarga, 0.0)

    def calcular_tarifa(self, carro: Carro, carros_ativos: list) -> float:
        return (
            self.tarifa_por_horario()
            + self.tarifa_por_demanda(carros_ativos)
            + self.tarifa_por_tipo(carro.tipo_recarga)
        )

    def calcular_valor_sessao(self, carro: Carro, carros_ativos: list) -> float:
        tarifa = self.calcular_tarifa(carro, carros_ativos)
        custo = carro.energia * tarifa
        self.historico.append(custo)
        return custo

    def gerar_historico(self) -> float:
        return sum(self.historico)
