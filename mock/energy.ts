export interface EnergyFlowData {
  solarKw: number;
  gridKw: number;
  batteryPct: number;
  batteryKw: number;
  chargerKw: number;
  homeLoadKw: number;
}

export const energyFlow: EnergyFlowData = {
  solarKw: 4.2,
  gridKw: 2.1,
  batteryPct: 76,
  batteryKw: 1.3,
  chargerKw: 7.6,
  homeLoadKw: 1.8,
};

export interface DemandStateData {
  currentKw: number;
  limitKw: number;
  mode: 'automatico' | 'manual';
  activeChargers: number;
}

export const demandState: DemandStateData = {
  currentKw: 12.4,
  limitKw: 18,
  mode: 'automatico',
  activeChargers: 2,
};

export interface DemandPoint {
  time: string;
  demandKw: number;
  limitKw: number;
}

export const demandHistory: DemandPoint[] = [
  { time: '06h', demandKw: 3.2, limitKw: 18 },
  { time: '08h', demandKw: 6.8, limitKw: 18 },
  { time: '10h', demandKw: 9.1, limitKw: 18 },
  { time: '12h', demandKw: 11.4, limitKw: 18 },
  { time: '14h', demandKw: 10.2, limitKw: 18 },
  { time: '16h', demandKw: 13.6, limitKw: 18 },
  { time: '18h', demandKw: 16.8, limitKw: 18 },
  { time: '20h', demandKw: 15.1, limitKw: 18 },
  { time: '22h', demandKw: 8.4, limitKw: 18 },
  { time: '00h', demandKw: 4.6, limitKw: 18 },
];
