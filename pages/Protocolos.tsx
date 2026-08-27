import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { protocolEvents } from '../mock/protocols';

export default function Protocolos() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="OCPP 1.6-J"
        title="Protocolos"
        description="Log de mensagens trocadas entre as estações e o backend (Charge Point ↔ Central System)."
      />

      <Card>
        <CardHeader eyebrow="Conexão" title="Status do gateway" action={<Badge tone="success" dot>Conectado</Badge>} />
        <p className="text-sm text-text-muted">
          WebSocket ativo em <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-text">wss://hca-001.chargegrid/ocpp</code>
        </p>
      </Card>

      <Card padded={false}>
        <div className="divide-y divide-border-soft">
          {protocolEvents.map((event) => (
            <div key={event.id} className="flex items-center gap-3 px-5 py-3">
              <div
                className={
                  event.direction === 'in'
                    ? 'flex h-7 w-7 items-center justify-center rounded-lg bg-blue-dim text-blue'
                    : 'flex h-7 w-7 items-center justify-center rounded-lg bg-magenta-dim text-magenta'
                }
              >
                {event.direction === 'in' ? (
                  <ArrowDownLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
                ) : (
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                )}
              </div>
              <p className="flex-1 font-mono text-xs text-text-muted">{event.message}</p>
              <p className="font-mono text-[11px] text-text-faint">{event.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
}
