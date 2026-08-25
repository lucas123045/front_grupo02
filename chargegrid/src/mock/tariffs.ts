import type { TariffRule, TariffSurcharge } from './types';

// Espelha exatamente as regras de sistemaCobranca.py (tarifa base por horário
// + adicionais). A GoodWe não define um modelo de cobrança para a linha HCA
// G2 — isto é a proposta comercial da própria equipe (ver PDF, seção Pagamento
// e Modelo Comercial).
export const tariffRules: TariffRule[] = [
  { period: 'pico', label: 'Horário de pico', window: '18h – 21h', baseRateBrl: 0.95 },
  { period: 'madrugada', label: 'Madrugada', window: '22h – 06h', baseRateBrl: 0.65 },
  { period: 'normal', label: 'Horário normal', window: '06h – 18h', baseRateBrl: 0.8 },
];

export const tariffSurcharges: TariffSurcharge[] = [
  { label: 'Recarga rápida', condition: 'Tipo de recarga = Rápida', extraBrl: 0.05 },
  { label: 'Recarga prioridade', condition: 'Tipo de recarga = Prioridade', extraBrl: 0.15 },
  { label: 'Alta demanda', condition: '3 ou mais veículos carregando simultaneamente', extraBrl: 0.1 },
];

export interface RevenueSplit {
  label: string;
  pct: number;
}

// Proposta de modelo comercial do grupo — não representa política oficial da GoodWe.
export const revenueSplitProposal: RevenueSplit[] = [
  { label: 'Operador da estação (condomínio / estabelecimento)', pct: 65 },
  { label: 'Plataforma ChargeGrid Intelligence', pct: 25 },
  { label: 'Gateway de pagamento', pct: 10 },
];
