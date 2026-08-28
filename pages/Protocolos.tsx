import { useEffect, useState } from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { getProtocolos, type ProtocolEvent } from '../lib/api';

const POLL_INTERVAL_MS = 2000;

export default function Protocolos() {
  const [eventos, setEventos] = useState<ProtocolEvent[]>([]);
  const [conectado, setConectado] = useState(false);

  useEffect(() => {
    let ativo = true;
    async function carregar() {
      try {
        const dados = await getProtocolos();
        if (ativo) {
          setEventos(dados);
          setConectado(true);
        }
      } catch {
        if (ativo) setConectado(false);
      }
    }
    carregar();
    const id = setInterval(carregar, POLL_INTERVAL_MS);
    return () => {
      ativo = false;
      clearInterval(id);
    };
  }, []);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="OCPP 1.6-J"
        title="Protocolos"
        description="Log de mensagens simuladas pelo backend entre o Charge Point e o Central System (SimuladorOCPP.py)."
      />

      <Card>
        <CardHeader
          eyebrow="Conexão"
          title="Status do backend"
          action={
            <Badge tone={conectado ? 'success' : 'warning'} dot>
              {conectado ? 'Conectado' : 'Sem resposta'}
            </Badge>
          }
        />
        <p className="text-sm text-text-muted">
          API em <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-text">/api/protocolos</code> (proxy para o FastAPI em <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-text">http://127.0.0.1:8000</code>)
        </p>
      </Card>

      <Card padded={false}>
        {eventos.length === 0 ? (
          <p className="px-5 py-6 text-sm text-text-muted">Nenhuma mensagem OCPP registrada ainda.</p>
        ) : (
          <div className="divide-y divide-border-soft">
            {eventos.map((event) => (
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
        )}
      </Card>
    </PageContainer>
  );
}
