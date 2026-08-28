"""Porte de Carros.py (Data Structures Sprint) para uso via API.

Mesma regra original: bateria e capacidade sorteadas aleatoriamente, potência
máxima definida pelo tipo de recarga ('1' lenta, '2' rápida, '3' prioridade).
"""
import random
from datetime import datetime

POTENCIA_POR_TIPO = {
    "1": 7.4,
    "2": 22.0,
    "3": 50.0,
}


class Carro:
    def __init__(self, id: int, tipo_recarga: str, modelo_carro: str, nome: str):
        self.id = id
        self.modelo = modelo_carro
        self.nome = nome
        self.bateria = random.uniform(25, 75)
        self.bateria_inicial = self.bateria
        self.capacidade = random.uniform(40, 100)
        self.iniciado_em_dt = datetime.now()

        self.potencia_maxima = POTENCIA_POR_TIPO[tipo_recarga]
        self.tipo_recarga = tipo_recarga
        self.potencia = self.potencia_maxima

        # preenchidos por GerenciamentoDeRecarga.adicionar_carro
        self.energia = 0.0
        self.tempo = 0.0
        self.tempo_inicial = 0.0

        # preenchidos quando a sessão termina (bateria atinge 100%)
        self.custo_final: float | None = None
        self.finalizado_em: str | None = None
        self.finalizado_em_dt: datetime | None = None
