import type { AlertItem } from './types';

export const alerts: AlertItem[] = [
  {
    id: 'A-1',
    severity: 'warning',
    title: 'Alta demanda',
    message: 'A demanda está próxima do limite da conexão (78 / 100 kW).',
    time: '18:42',
  },
  {
    id: 'A-2',
    severity: 'success',
    title: 'Carregamento otimizado',
    message: 'A IA reduziu a potência da HCA-001 para evitar pico de demanda.',
    time: '18:39',
  },
  {
    id: 'A-3',
    severity: 'info',
    title: 'Estação conectada',
    message: 'EV Charger HCA-002 iniciou uma nova sessão.',
    time: '18:35',
  },
  {
    id: 'A-4',
    severity: 'error',
    title: 'Falha de comunicação',
    message: 'HCA-005 não responde ao polling Modbus há 6 minutos.',
    time: '18:20',
  },
  {
    id: 'A-5',
    severity: 'warning',
    title: 'Cartão RFID não reconhecido',
    message: 'Tentativa de autorização com cartão não cadastrado na HCA-004.',
    time: '17:52',
  },
];
