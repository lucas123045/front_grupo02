import type { Station } from './types';

// MOCK — dados de exemplo. Sem API liberada pela GoodWe (ver PDF da mentoria),
// a planta real só é acessível via consulta manual ao SEMS+, então esta camada
// simula o que viria de `gerenciamentoDeRecarga.py` até haver integração real.
export const stations: Station[] = [
  {
    id: 'HCA-001',
    name: 'Estação HCA-001',
    location: 'Vaga 12 — Estacionamento Coberto',
    status: 'carregando',
    powerKw: 7.2,
    maxPowerKw: 22,
    connectedVehicle: 'Tesla Model 3',
    activeSessionId: 'S-2048',
    energyTodayKwh: 34.6,
    alertCount: 0,
  },
  {
    id: 'HCA-002',
    name: 'Estação HCA-002',
    location: 'Vaga 14 — Estacionamento Coberto',
    status: 'carregando',
    powerKw: 5.8,
    maxPowerKw: 22,
    connectedVehicle: 'Renault Kwid E-Tech',
    activeSessionId: 'S-2051',
    energyTodayKwh: 21.2,
    alertCount: 1,
  },
  {
    id: 'HCA-003',
    name: 'Estação HCA-003',
    location: 'Vaga 15 — Estacionamento Coberto',
    status: 'disponivel',
    powerKw: 0,
    maxPowerKw: 22,
    energyTodayKwh: 12.9,
    alertCount: 0,
  },
  {
    id: 'HCA-004',
    name: 'Estação HCA-004',
    location: 'Área Externa — Fachada',
    status: 'atencao',
    powerKw: 3.1,
    maxPowerKw: 22,
    connectedVehicle: 'BYD Dolphin',
    activeSessionId: 'S-2053',
    energyTodayKwh: 8.4,
    alertCount: 2,
  },
  {
    id: 'HCA-005',
    name: 'Estação HCA-005',
    location: 'Área Externa — Fachada',
    status: 'erro',
    powerKw: 0,
    maxPowerKw: 22,
    energyTodayKwh: 0,
    alertCount: 3,
  },
  {
    id: 'HCA-006',
    name: 'Estação HCA-006',
    location: 'Subsolo — Nível -1',
    status: 'offline',
    powerKw: 0,
    maxPowerKw: 22,
    energyTodayKwh: 0,
    alertCount: 0,
  },
];

export const stationStatusMeta: Record<
  Station['status'],
  { label: string; dotClass: string; textClass: string }
> = {
  disponivel: { label: 'Disponível', dotClass: 'bg-success', textClass: 'text-success' },
  carregando: { label: 'Carregando', dotClass: 'bg-blue', textClass: 'text-blue' },
  atencao: { label: 'Atenção', dotClass: 'bg-warning', textClass: 'text-warning' },
  erro: { label: 'Erro', dotClass: 'bg-red', textClass: 'text-red' },
  offline: { label: 'Offline', dotClass: 'bg-offline', textClass: 'text-text-faint' },
};
