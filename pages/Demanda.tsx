import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { DemandAreaChart } from '../components/charts/DemandAreaChart';
import { DemandControl } from '../components/dashboard/DemandControl';
import { demandHistory, demandState } from '../mock/energy';

export default function Demanda() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Gestão de carga"
        title="Controle de demanda"
        description="Histórico de demanda comparado ao limite contratado da conexão."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader eyebrow="Últimas 24h" title="Demanda vs. limite" />
          <DemandAreaChart data={demandHistory} />
        </Card>
        <Card>
          <CardHeader eyebrow="Gerenciamento de potência" title="Controle dinâmico de carga" />
          <DemandControl data={demandState} />
        </Card>
      </div>
    </PageContainer>
  );
}
