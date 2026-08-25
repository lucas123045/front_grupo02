import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { protocols, protocolStatusMeta, ocppLog } from '../mock/protocols';
import { cn } from '../lib/cn';

export default function Protocolos() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Camada técnica"
        title="Protocolos"
        description="Estado real de comunicação da linha HCA G2, conforme documentação oficial do desafio."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {protocols.map((protocol) => {
          const meta = protocolStatusMeta[protocol.status];
          return (
            <Card key={protocol.id}>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-display text-base font-semibold text-text">{protocol.name}</h3>
                <span className={cn('flex items-center gap-1.5 font-mono text-[11px]', meta.textClass)}>
                  <span className={cn('h-1.5 w-1.5 rounded-full', meta.dotClass)} />
                  {meta.label}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-text-muted">{protocol.description}</p>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader eyebrow="Simulação OCPP 1.6" title="Log de mensagens" />
        <div className="space-y-2 font-mono text-xs">
          {ocppLog.map((msg) => (
            <div key={msg.id} className="flex items-center gap-3 rounded-md bg-surface-2 px-3 py-2">
              <span className="text-text-faint">{msg.time}</span>
              <span className="text-magenta">[OCPP →]</span>
              <span className="text-text">{msg.type}</span>
              <span className="text-text-muted">— {msg.action}</span>
              <span className={cn('ml-auto', msg.status === 'Accepted' ? 'text-success' : 'text-red')}>{msg.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
}
