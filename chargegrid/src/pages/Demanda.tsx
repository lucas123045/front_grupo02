import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { DemandControl } from '../components/dashboard/DemandControl';
import { DemandAreaChart } from '../components/charts/DemandAreaChart';
import { demandHistory, demandState } from '../mock/energy';
import { stations } from '../mock/stations';

export default function Demanda() {
  const activeStations = stations.filter((s) => s.status === 'carregando');

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Gerenciamento de potência"
        title="Controle de demanda"
        description="Ajuste dinâmico da potência entregue com base no medidor, evitando o disparo do fusível principal."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader eyebrow="Histórico" title="Demanda vs. limite da conexão (100 kW)" />
          <DemandAreaChart data={demandHistory} />
        </Card>
        <Card>
          <CardHeader eyebrow="Status" title="Controle dinâmico" />
          <DemandControl data={demandState} />
        </Card>
      </div>

      <Card>
        <CardHeader eyebrow="Redistribuição automática" title="Potência por estação ativa" />
        <p className="mb-4 text-xs text-text-muted">
          Quando a soma das potências ultrapassa o limite do condomínio, o veículo com menor bateria recebe
          prioridade (+40% de potência) e os demais recebem a potência restante proporcionalmente.
        </p>
        <div className="space-y-3">
          {activeStations.map((station) => {
            const pct = Math.round((station.powerKw / station.maxPowerKw) * 100);
            return (
              <div key={station.id} className="flex items-center gap-4">
                <span className="w-24 shrink-0 font-mono text-xs text-text-muted">{station.id}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-3">
                  <div className="h-full rounded-full bg-magenta" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-16 shrink-0 text-right font-mono text-xs text-text">{station.powerKw.toFixed(1)} kW</span>
              </div>
            );
          })}
        </div>
      </Card>
    </PageContainer>
  );
}
