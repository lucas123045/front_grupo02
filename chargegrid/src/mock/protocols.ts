import type { OcppMessage, ProtocolInfo } from './types';

// Estado real informado no PDF da mentoria — não inventar suporte que a linha
// HCA G2 ainda não tem.
export const protocols: ProtocolInfo[] = [
  {
    id: 'modbus',
    name: 'Modbus',
    status: 'sob-solicitacao',
    description:
      'O EV Charger, assim como demais dispositivos da planta (inversor, smart meter e bateria), comunica através do protocolo Modbus, disponível sob solicitação.',
  },
  {
    id: 'ocpp',
    name: 'OCPP',
    status: 'futuro',
    description:
      'A linha HCA ainda não possui suporte a OCPP. Hoje não é possível realizar cobrança direta via este protocolo — simulado aqui como referência para uma futura integração.',
  },
  {
    id: 'rfid',
    name: 'RFID',
    status: 'disponivel',
    description:
      'A linha HCA G2 possui 2 cartões RFID inclusos e suporta até 10. São cadastrados via plataforma de monitoramento e permitem autorização de carga local.',
  },
];

export const protocolStatusMeta: Record<
  ProtocolInfo['status'],
  { label: string; textClass: string; dotClass: string }
> = {
  disponivel: { label: 'Disponível', textClass: 'text-success', dotClass: 'bg-success' },
  'sob-solicitacao': { label: 'Disponível sob solicitação', textClass: 'text-blue', dotClass: 'bg-blue' },
  'nao-suportado': { label: 'Não suportado', textClass: 'text-red', dotClass: 'bg-red' },
  futuro: { label: 'Planejado / futuro', textClass: 'text-warning', dotClass: 'bg-warning' },
};

// Mensagens simuladas por SimuladorOCPP.py (formato OCPP 1.6).
export const ocppLog: OcppMessage[] = [
  { id: 1, type: 'BootNotification', action: 'Inicialização do sistema', status: 'Accepted', time: '06:00:02' },
  { id: 2, type: 'StartTransaction', action: 'Sessão S-2044 iniciada', status: 'Accepted', time: '20:15:11' },
  { id: 3, type: 'StopTransaction', action: 'Sessão S-2044 encerrada', status: 'Accepted', time: '21:03:44' },
  { id: 4, type: 'StartTransaction', action: 'Sessão S-2048 iniciada', status: 'Accepted', time: '18:42:07' },
  { id: 5, type: 'StartTransaction', action: 'Sessão S-2051 iniciada', status: 'Accepted', time: '19:05:33' },
];
