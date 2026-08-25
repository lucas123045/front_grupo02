import type { AIInsight } from './types';

// MOCK — não há modelo de IA em produção rodando ainda. Estes são exemplos
// visuais do tipo de saída que a camada de IA (Seção 13 do briefing) deve
// produzir a partir do histórico de sessões e do controle de demanda.
export const aiInsights: AIInsight[] = [
  {
    id: 'AI-1',
    title: 'Pico de demanda previsto',
    icon: 'peak',
    probabilityPct: 82,
    description:
      'A IA identificou uma probabilidade de 82% de aumento da demanda entre 18:00 e 20:00, com base no padrão dos últimos 14 dias.',
    recommendation: 'Reduzir temporariamente a potência de carregamento em 18% nas estações HCA-001 e HCA-002.',
    estimatedSavingBrl: 12.4,
    createdAt: '18:30',
  },
  {
    id: 'AI-2',
    title: 'Sessão com eficiência abaixo da média',
    icon: 'efficiency',
    description: 'A sessão S-2053 (HCA-004) está consumindo 14% mais tempo que sessões similares de mesmo tipo.',
    recommendation: 'Verificar cabo e conector da estação HCA-004 — possível perda de eficiência na transmissão.',
    createdAt: '17:58',
  },
  {
    id: 'AI-3',
    title: 'Oportunidade de precificação dinâmica',
    icon: 'price',
    description: 'Ociosidade de 40% detectada entre 22h e 06h nas últimas 2 semanas.',
    recommendation: 'Testar tarifa promocional na madrugada para aumentar a ocupação das estações.',
    estimatedSavingBrl: 0,
    createdAt: '16:10',
  },
];

export const insightIconMeta: Record<AIInsight['icon'], { label: string }> = {
  peak: { label: 'Pico de demanda' },
  optimize: { label: 'Otimização' },
  price: { label: 'Precificação' },
  efficiency: { label: 'Eficiência' },
};
