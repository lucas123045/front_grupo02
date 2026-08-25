import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function Configuracoes() {
  return (
    <PageContainer>
      <PageHeader eyebrow="Sistema" title="Configurações" description="Parâmetros gerais da planta e integrações." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader eyebrow="Condomínio / Estabelecimento" title="Limite de conexão" />
          <p className="mb-3 text-xs text-text-muted">
            Limite máximo de potência simultânea entregue às estações, usado pelo controle dinâmico de carga.
          </p>
          <div className="flex items-center justify-between rounded-lg border border-border-soft bg-surface-2 px-3.5 py-3">
            <span className="text-sm text-text">Limite atual</span>
            <span className="font-mono text-sm text-text">100 kW</span>
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Conectividade" title="Integrações" />
          <div className="space-y-2.5">
            <div className="flex items-center justify-between rounded-lg border border-border-soft bg-surface-2 px-3.5 py-3">
              <span className="text-sm text-text">SEMS+ (monitoramento GoodWe)</span>
              <Badge tone="success" dot>Conectado</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border-soft bg-surface-2 px-3.5 py-3">
              <span className="text-sm text-text">API EV Chargers (GoodWe)</span>
              <Badge tone="warning" dot>Ainda não disponível</Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border-soft bg-surface-2 px-3.5 py-3">
              <span className="text-sm text-text">Gateway de pagamento</span>
              <Badge tone="neutral" dot>Não configurado</Badge>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-blue/30 bg-blue-dim">
        <p className="text-xs leading-relaxed text-text">
          Esta tela é ilustrativa — ainda não há persistência real de configurações. Quando a API de EV Chargers da
          GoodWe for liberada (ver PDF da mentoria), estes toggles passam a controlar a integração de fato.
        </p>
      </Card>
    </PageContainer>
  );
}
