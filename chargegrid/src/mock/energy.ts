import type { DemandSample, DemandState, EnergyFlowState } from './types';

// MOCK — reflete o estado que `gerenciamentoDeRecarga.py` calcularia a cada
// ciclo do loop de monitoramento (soma de potências vs. limite do condomínio).
export const energyFlow: EnergyFlowState = {
  solarKw: 8.6,
  batteryKw: 2.1,
  batteryPct: 72,
  batteryDirection: 'descarregando',
  gridKw: 3.4,
  chargerKw: 13.0,
  vehicleConnected: true,
  vehicleModel: 'Tesla Model 3',
  vehicleBatteryPct: 68,
};

export const demandState: DemandState = {
  currentKw: 78,
  limitKw: 100,
  dynamicControlActive: true,
  adjustedFromKw: 22,
  adjustedToKw: 13,
  reason: 'Alta demanda detectada — redistribuição automática priorizando menor bateria',
};

// Série horária usada nos gráficos de demanda / geração / consumo.
export const demandHistory: DemandSample[] = [
  { time: '06:00', demandKw: 18, limitKw: 100, solarKw: 0, gridKw: 18 },
  { time: '08:00', demandKw: 32, limitKw: 100, solarKw: 6, gridKw: 26 },
  { time: '10:00', demandKw: 41, limitKw: 100, solarKw: 18, gridKw: 23 },
  { time: '12:00', demandKw: 52, limitKw: 100, solarKw: 24, gridKw: 28 },
  { time: '14:00', demandKw: 47, limitKw: 100, solarKw: 22, gridKw: 25 },
  { time: '16:00', demandKw: 58, limitKw: 100, solarKw: 15, gridKw: 43 },
  { time: '18:00', demandKw: 78, limitKw: 100, solarKw: 4, gridKw: 74 },
  { time: '20:00', demandKw: 71, limitKw: 100, solarKw: 0, gridKw: 71 },
  { time: '22:00', demandKw: 39, limitKw: 100, solarKw: 0, gridKw: 39 },
];

export const costHistory = [
  { day: 'Seg', costBrl: 62.4 },
  { day: 'Ter', costBrl: 71.1 },
  { day: 'Qua', costBrl: 58.9 },
  { day: 'Qui', costBrl: 84.3 },
  { day: 'Sex', costBrl: 96.7 },
  { day: 'Sáb', costBrl: 45.2 },
  { day: 'Dom', costBrl: 33.6 },
];

export const forecastVsActual = [
  { time: '14:00', previsto: 44, real: 47 },
  { time: '15:00', previsto: 49, real: 46 },
  { time: '16:00', previsto: 55, real: 58 },
  { time: '17:00', previsto: 68, real: 65 },
  { time: '18:00', previsto: 80, real: 78 },
  { time: '19:00', previsto: 76, real: null },
  { time: '20:00', previsto: 69, real: null },
];

export const energyDistribution = [
  { name: 'Solar', value: 8.6, colorVar: '--color-warning' },
  { name: 'Rede', value: 13.4, colorVar: '--color-blue' },
  { name: 'Bateria', value: 2.1, colorVar: '--color-magenta' },
];
