// Tipos compartilhados pela camada de mock.
// Espelham as entidades já existentes na simulação em Python
// (Carros.py, gerenciamentoDeRecarga.py, sistemaCobranca.py, SimuladorOCPP.py),
// para que trocar `mock/` por chamadas reais de API não exija reescrever o front-end.

export type ChargeType = 'lenta' | 'rapida' | 'prioridade';

export interface ChargeTypeInfo {
  id: ChargeType;
  label: string;
  maxPowerKw: number;
}

export const CHARGE_TYPES: Record<ChargeType, ChargeTypeInfo> = {
  lenta: { id: 'lenta', label: 'Lenta', maxPowerKw: 7.4 },
  rapida: { id: 'rapida', label: 'Rápida', maxPowerKw: 22 },
  prioridade: { id: 'prioridade', label: 'Prioridade', maxPowerKw: 50 },
};

export type StationStatus = 'disponivel' | 'carregando' | 'atencao' | 'erro' | 'offline';

export interface Station {
  id: string;
  name: string;
  location: string;
  status: StationStatus;
  powerKw: number;
  maxPowerKw: number;
  connectedVehicle?: string;
  activeSessionId?: string;
  energyTodayKwh: number;
  alertCount: number;
}

export interface ChargingSession {
  id: string;
  stationId: string;
  stationName: string;
  clientName: string;
  vehicleModel: string;
  chargeType: ChargeType;
  startedAt: string;
  endedAt?: string;
  durationMin: number;
  energyKwh: number;
  avgPowerKw: number;
  costBrl: number;
  status: 'em-andamento' | 'concluida';
  batteryPct: number;
}

export interface DemandSample {
  time: string;
  demandKw: number;
  limitKw: number;
  solarKw: number;
  gridKw: number;
}

export interface DemandState {
  currentKw: number;
  limitKw: number;
  dynamicControlActive: boolean;
  adjustedFromKw?: number;
  adjustedToKw?: number;
  reason?: string;
}

export interface EnergyFlowState {
  solarKw: number;
  batteryKw: number;
  batteryPct: number;
  batteryDirection: 'carregando' | 'descarregando' | 'parada';
  gridKw: number;
  chargerKw: number;
  vehicleConnected: boolean;
  vehicleModel?: string;
  vehicleBatteryPct?: number;
}

export type TariffPeriod = 'pico' | 'normal' | 'madrugada';

export interface TariffRule {
  period: TariffPeriod;
  label: string;
  window: string;
  baseRateBrl: number;
}

export interface TariffSurcharge {
  label: string;
  condition: string;
  extraBrl: number;
}

export interface AIInsight {
  id: string;
  title: string;
  icon: 'peak' | 'optimize' | 'price' | 'efficiency';
  probabilityPct?: number;
  description: string;
  recommendation: string;
  estimatedSavingBrl?: number;
  createdAt: string;
}

export type AlertSeverity = 'info' | 'success' | 'warning' | 'error';

export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  time: string;
}

export type ProtocolStatus = 'disponivel' | 'sob-solicitacao' | 'nao-suportado' | 'futuro';

export interface ProtocolInfo {
  id: string;
  name: string;
  status: ProtocolStatus;
  description: string;
}

export interface OcppMessage {
  id: number;
  type: 'BootNotification' | 'StartTransaction' | 'StopTransaction';
  action: string;
  status: 'Accepted' | 'Rejected';
  time: string;
}
