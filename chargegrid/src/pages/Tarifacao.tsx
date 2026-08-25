import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { tariffRules, tariffSurcharges, revenueSplitProposal } from '../mock/tariffs';

export default function Tarifacao() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Modelo comercial"
        title="Tarifação e pagamento"
        description="A GoodWe não define um modelo padrão de cobrança para a linha HCA G2. O modelo abaixo é a proposta comercial da equipe."
        action={<Badge tone="magenta">Proposta do projeto</Badge>}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader eyebrow="Tarifa base" title="Regras por horário" />
          <div className="space-y-2.5">
            {tariffRules.map((rule) => (
              <div key={rule.period} className="flex items-center justify-between rounded-lg border border-border-soft bg-surface-2 px-3.5 py-3">
                <div>
                  <p className="text-sm font-medium text-text">{rule.label}</p>
                  <p className="text-xs text-text-muted">{rule.window}</p>
                </div>
                <p className="font-mono text-sm text-text">R$ {rule.baseRateBrl.toFixed(2).replace('.', ',')}/kWh</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Adicionais" title="Sobretaxas aplicadas" />
          <div className="space-y-2.5">
            {tariffSurcharges.map((s) => (
              <div key={s.label} className="flex items-center justify-between rounded-lg border border-border-soft bg-surface-2 px-3.5 py-3">
                <div>
                  <p className="text-sm font-medium text-text">{s.label}</p>
                  <p className="text-xs text-text-muted">{s.condition}</p>
                </div>
                <p className="font-mono text-sm text-magenta">+ R$ {s.extraBrl.toFixed(2).replace('.', ',')}/kWh</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader eyebrow="Divisão de receita" title="Proposta de split comercial" />
        <div className="space-y-3">
          {revenueSplitProposal.map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-text-muted">{item.label}</span>
                <span className="font-mono text-text">{item.pct}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-3">
                <div className="h-full rounded-full bg-gradient-to-r from-red to-magenta" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </PageContainer>
  );
}
