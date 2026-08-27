import { Battery, Coins, Gauge, Sun, Timer, Zap } from 'lucide-react';
import { AIInsightCard } from '../components/dashboard/AIInsightCard';
import { AlertsPanel } from '../components/dashboard/AlertsPanel';
import { DemandControl } from '../components/dashboard/DemandControl';
import { EnergyFlow } from '../components/dashboard/EnergyFlow';
import { KPICard } from '../components/dashboard/KPICard';
import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { DemandAreaChart } from '../components/charts/DemandAreaChart';
import { aiInsights } from '../mock/ai-insights';
import { alerts } from '../mock/alerts';
import { demandHistory, demandState, energyFlow } from '../mock/energy';
import { useSessions } from '../context/SessionsContext';

export default function Dashboard() {
  const { sessions } = useSessions();
  const activeSession = sessions.find((s) => s.status === 'em-andamento');

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Visão geral"
        title="Estação HCA-001 — LAB FIAP Eco Home"
        description="Energia → Dados → IA → Decisão → Otimização"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <KPICard icon={Zap} label="Potência do carregador" value={energyFlow.chargerKw.toFixed(1)} unit="kW" tone="red" />
        <KPICard icon={Timer} label="Sessão atual" value={activeSession ? `${activeSession.durationMin}m` : '—'} tone="magenta" />
        <KPICard icon={Sun} label="Energia solar" value={energyFlow.solarKw.toFixed(1)} unit="kWh" tone="warning" />
        <KPICard icon={Battery} label="Estado da bateria" value={`${energyFlow.batteryPct}`} unit="%" tone="success" />
        <KPICard icon={Gauge} label="Demanda atual" value={demandState.currentKw.toString()} unit="kW" tone="blue" trend={{ value: '6% vs ontem', positive: false }} />
        <KPICard icon={Coins} label="Custo estimado" value={activeSession ? activeSession.costBrl.toFixed(2).replace('.', ',') : '0,00'} unit="R$" tone="red" />
      </div>

      <Card>
        <CardHeader eyebrow="Visualização em tempo real" title="Visão geral do fluxo de energia" />
        <EnergyFlow data={energyFlow} />
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader eyebrow="Controle de demanda" title="Demanda vs. limite da conexão" />
          <DemandAreaChart data={demandHistory} />
        </Card>
        <Card>
          <CardHeader eyebrow="Gerenciamento de potência" title="Controle dinâmico de carga" />
          <DemandControl data={demandState} />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader eyebrow="IA aplicada" title="Insights e recomendações" />
          <div className="space-y-3">
            {aiInsights.slice(0, 2).map((insight) => (
              <AIInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader eyebrow="Últimos eventos" title="Alertas" />
          <AlertsPanel alerts={alerts} />
        </Card>
      </div>
    </PageContainer>
  );
}
