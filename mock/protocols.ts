export interface ProtocolEvent {
  id: string;
  message: string;
  direction: 'in' | 'out';
  time: string;
}

export const protocolEvents: ProtocolEvent[] = [
  { id: 'P-01', message: 'StartTransaction — connectorId=1, idTag=S-1042', direction: 'in', time: '19:12:04' },
  { id: 'P-02', message: 'Authorize.conf — status=Accepted', direction: 'out', time: '19:12:04' },
  { id: 'P-03', message: 'MeterValues — connectorId=1, energy=24.6kWh', direction: 'in', time: '19:24:10' },
  { id: 'P-04', message: 'Heartbeat.req', direction: 'in', time: '19:25:00' },
  { id: 'P-05', message: 'StopTransaction — connectorId=2, idTag=S-1041', direction: 'in', time: '18:47:52' },
];
