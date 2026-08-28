// Cliente HTTP para a API FastAPI (backend/) que porta o simulador de
// recarga do Data Structures Sprint (Equipe02-1CCPO).
//
// Em dev, o Vite faz proxy de /api para http://127.0.0.1:8000 (ver
// vite.config.ts), então o padrão '/api' funciona sem configuração.
// Em produção (ex: front na Vercel), não existe esse proxy — defina
// VITE_API_URL apontando para a URL pública do backend (ex: Render),
// incluindo o sufixo /api, ex: https://chargegrid-backend.onrender.com/api
import type { ChargeType, ChargingSession } from '../mock/types';
import type { DetalheTarifa, Fatura } from './tarifacao';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API ${path} falhou (${res.status}): ${body}`);
  }
  return res.json() as Promise<T>;
}

export interface SessionsResponse {
  ativas: ChargingSession[];
  finalizadas: ChargingSession[];
}

export function getSessions(): Promise<SessionsResponse> {
  return request<SessionsResponse>('/sessions');
}

export interface NovaSessaoPayload {
  nome: string;
  modelo: string;
  tipoRecarga: ChargeType;
}

export interface NovaSessaoResponse {
  session: ChargingSession;
  fatura: Fatura & { estimada: boolean };
}

export function createSession(payload: NovaSessaoPayload): Promise<NovaSessaoResponse> {
  return request<NovaSessaoResponse>('/sessions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export interface TarifaTipo {
  tipo: ChargeType;
  label: string;
  maxPowerKw: number;
  adicionalTipo: number;
  tarifaFinal: number;
}

export interface TarifasResponse {
  tarifaHorario: number;
  adicionalDemanda: number;
  carrosAtivos: number;
  porTipo: TarifaTipo[];
}

export function getTarifas(): Promise<TarifasResponse> {
  return request<TarifasResponse>('/tarifas');
}

export interface DemandaResponse {
  currentKw: number;
  limitKw: number;
  mode: 'automatico';
  activeChargers: number;
}

export function getDemanda(): Promise<DemandaResponse> {
  return request<DemandaResponse>('/demanda');
}

export interface DemandPoint {
  time: string;
  demandKw: number;
  limitKw: number;
}

export function getDemandaHistorico(): Promise<DemandPoint[]> {
  return request<DemandPoint[]>('/demanda/historico');
}

export interface ProtocolEvent {
  id: string;
  message: string;
  direction: 'in' | 'out';
  time: string;
}

export function getProtocolos(): Promise<ProtocolEvent[]> {
  return request<ProtocolEvent[]>('/protocolos');
}

export interface RelatorioResponse {
  totalSessoes: number;
  sessoesConcluidas: number;
  sessoesAtivas: number;
  energiaTotalKwh: number;
  receitaTotalBrl: number;
  historicoTotalBrl: number;
}

export function getRelatorio(): Promise<RelatorioResponse> {
  return request<RelatorioResponse>('/relatorio');
}

export type { DetalheTarifa };
