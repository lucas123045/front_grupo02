import { PageContainer, PageHeader } from '../components/layout/PageContainer';
import { Card, CardHeader } from '../components/ui/Card';
import { AIInsightCard } from '../components/dashboard/AIInsightCard';
import { ForecastLineChart } from '../components/charts/ForecastLineChart';
import { aiInsights } from '../mock/ai-insights';
import { forecastVsActual } from '../mock/energy';

export default function IA() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="IA aplicada"
        title="Inteligência Artificial"
        description="Previsão de picos de consumo, análise de sessões e precificação dinâmica — exemplos ilustrativos até haver um modelo em produção."
      />

      <Card>
        <CardHeader eyebrow="Previsão vs. realizado" title="Demanda prevista pela IA" />
        <ForecastLineChart data={forecastVsActual} />
      </Card>

      <Card>
        <CardHeader eyebrow="Recomendações ativas" title="AI Insights" />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {aiInsights.map((insight) => (
            <AIInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </Card>

      <Card className="border-magenta/30 bg-magenta-dim">
        <p className="text-xs leading-relaxed text-text">
          <span className="font-semibold text-magenta">Nota de transparência: </span>
          os insights acima são exemplos visuais do tipo de saída esperada da camada de IA. Não representam um
          modelo treinado em produção — a estrutura de dados foi pensada para que um modelo real (previsão de
          picos, análise de sessões e precificação dinâmica) possa substituir estes mocks sem alterar o front-end.
        </p>
      </Card>
    </PageContainer>
  );
}
