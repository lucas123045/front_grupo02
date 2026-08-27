// Porta direta de equacoesRecarga.py + sistemaCobranca.py (Data Structures Sprint).
// Sem chamada HTTP: mesma fórmula, calculada no navegador a partir de dados
// fictícios preenchidos no formulário. Usado apenas para a demo — quando a
// API real existir, esta função é substituída pela resposta do backend.

import type { ChargeType } from '../mock/types';

// ---- equacoesRecarga.py ----

const MULTIPLICADOR_VELOCIDADE = 100;

export function calcularEnergiaNecessaria(capacidadeKwh: number, bateriaPct: number): number {
  return capacidadeKwh * (100 - bateriaPct) / 100;
}

export function calcularTempoNecessarioSegundos(energiaKwh: number, potenciaKw: number): number {
  return ((energiaKwh / potenciaKw) * 3600) / MULTIPLICADOR_VELOCIDADE;
}

// ---- sistemaCobranca.py ----

export function tarifaPorHorario(data: Date = new Date()): number {
  const hora = data.getHours();
  if (hora >= 18 && hora <= 21) return 0.95; // pico
  if (hora >= 22 || hora <= 6) return 0.65; // madrugada
  return 0.80; // normal
}

export function tarifaPorDemanda(quantidadeCarrosAtivos: number): number {
  return quantidadeCarrosAtivos >= 3 ? 0.10 : 0;
}

export function tarifaPorTipo(tipoRecarga: ChargeType): number {
  switch (tipoRecarga) {
    case 'lenta':
      return 0;
    case 'rapida':
      return 0.05;
    case 'prioridade':
      return 0.15;
  }
}

export interface DetalheTarifa {
  tarifaHorario: number;
  tarifaDemanda: number;
  tarifaTipo: number;
  tarifaFinal: number;
}

export function calcularTarifa(tipoRecarga: ChargeType, quantidadeCarrosAtivos: number, data: Date = new Date()): DetalheTarifa {
  const tarifaHorario = tarifaPorHorario(data);
  const tarifaDemanda = tarifaPorDemanda(quantidadeCarrosAtivos);
  const tarifaTipo = tarifaPorTipo(tipoRecarga);
  return {
    tarifaHorario,
    tarifaDemanda,
    tarifaTipo,
    tarifaFinal: tarifaHorario + tarifaDemanda + tarifaTipo,
  };
}

export interface Fatura {
  clienteNome: string;
  veiculoModelo: string;
  energiaKwh: number;
  detalheTarifa: DetalheTarifa;
  totalBrl: number;
}

// Espelha SistemaCobranca.gerarFatura — energiaKwh já deve vir calculada
// (ex: via calcularEnergiaNecessaria) e quantidadeCarrosAtivos é a contagem
// de sessões simultâneas no momento em que a fatura é gerada.
export function gerarFatura(
  clienteNome: string,
  veiculoModelo: string,
  tipoRecarga: ChargeType,
  energiaKwh: number,
  quantidadeCarrosAtivos: number,
  data: Date = new Date(),
): Fatura {
  const detalheTarifa = calcularTarifa(tipoRecarga, quantidadeCarrosAtivos, data);
  return {
    clienteNome,
    veiculoModelo,
    energiaKwh,
    detalheTarifa,
    totalBrl: energiaKwh * detalheTarifa.tarifaFinal,
  };
}
