import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { DemandAreaChart } from '../components/charts/DemandAreaChart';
import { EnergyDonut } from '../components/charts/EnergyDonut';
import { CostBarChart } from '../components/charts/CostBarChart';
import { demandHistory, energyDistribution, costHistory } from '../mock/energy';

export default function Monitoramento() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Tempo real"
        title="Monitoramento de energia"
        description="Consumo, geração solar e distribuição energética da planta."
      />

      <Card>
        <CardHeader eyebrow="Últimas 24 horas" title="Demanda e geração solar" />
        <DemandAreaChart data={demandHistory} />
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader eyebrow="Origem da energia" title="Distribuição energética" />
          <EnergyDonut data={energyDistribution} />
          <ul className="mt-2 space-y-1.5 text-xs">
            {energyDistribution.map((item) => (
              <li key={item.name} className="flex items-center justify-between text-text-muted">
                <span>{item.name}</span>
                <span className="font-mono text-text">{item.value.toFixed(1)} kWh</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader eyebrow="Últimos 7 dias" title="Custo diário estimado" />
          <CostBarChart data={costHistory} />
        </Card>
      </div>
    </PageContainer>
  );
}
