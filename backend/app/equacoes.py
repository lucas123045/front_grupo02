"""Porte direto de equacoesRecarga.py."""

MULTIPLICADOR_VELOCIDADE = 100


def calcular_energia_necessaria(capacidade: float, bateria: float) -> float:
    return capacidade * (100 - bateria) / 100


def calcular_tempo_necessario(energia: float, potencia: float) -> float:
    return ((energia / potencia) * 3600) / MULTIPLICADOR_VELOCIDADE
