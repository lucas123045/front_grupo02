# ChargeGrid Intelligence — Front-end

Front-end do desafio **EV Challenge 2026 (FIAP + GoodWe)** — dashboard de gerenciamento inteligente de
estações de recarga de veículos elétricos, com controle de demanda, tarifação dinâmica e insights de IA.

> Baseado na lógica do simulador Python do time em
> [`Equipe02-1CCPO`](https://github.com/joaovictorferian/Equipe02-1CCPO). O repositório original não tinha
> front-end (era um simulador de terminal) — esta aplicação foi construída do zero, reaproveitando as regras
> de negócio (tipos de recarga, tarifação, controle de demanda, protocolo OCPP) como camada de mock tipada.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Recharts (gráficos)
- lucide-react (ícones)

## Instalação

Requisitos: Node.js 18+ e npm.

```bash
npm install
```

## Variáveis de ambiente

Nenhuma é obrigatória — veja `.env.example`. O projeto usa dados mockados em `src/mock/` porque a API de EV
Chargers da GoodWe ainda não é pública (ver documentação do desafio).

## Execução

```bash
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview
```

## Lint

```bash
npm run lint
```

## Estrutura do projeto

```text
src/
├── components/
│   ├── layout/       # Sidebar, Header, AppShell, PageContainer
│   ├── dashboard/     # KPICard, EnergyFlow, DemandControl, AIInsightCard, AlertsPanel
│   ├── charts/        # Gráficos Recharts (demanda, custo, previsão IA, distribuição)
│   └── ui/            # Card, Badge, Button
├── mock/              # Camada de dados mockados, tipada (ver abaixo)
├── pages/             # Uma página por rota
├── lib/               # Helpers (cn.ts)
├── App.tsx            # Rotas
└── main.tsx           # Entry point
```

### Camada de mock (`src/mock/`)

Os tipos em `mock/types.ts` espelham as entidades da simulação Python original
(`Carros.py`, `gerenciamentoDeRecarga.py`, `sistemaCobranca.py`, `SimuladorOCPP.py`), para que trocar os
mocks por chamadas de API real não exija reescrever componentes — só a fonte de dados.

| Arquivo | Conteúdo |
| --- | --- |
| `stations.ts` | Estações/carregadores e seus status |
| `sessions.ts` | Sessões de recarga (histórico + em andamento) |
| `energy.ts` | Fluxo de energia em tempo real, histórico de demanda, custo |
| `alerts.ts` | Alertas do sistema |
| `ai-insights.ts` | Exemplos de saída da camada de IA (previsão, eficiência, precificação) |
| `tariffs.ts` | Regras de tarifação dinâmica e proposta de split de receita |
| `protocols.ts` | Status real de Modbus / OCPP / RFID + log simulado OCPP 1.6 |

## Páginas

- **Dashboard** — visão geral, KPIs, fluxo de energia, demanda, IA, alertas
- **Estações** — status de cada carregador
- **Monitoramento** — gráficos de energia/demanda/distribuição
- **Demanda** — controle dinâmico de carga e redistribuição
- **Inteligência Artificial** — previsão de picos, insights e recomendações
- **Tarifação** — modelo de cobrança e proposta comercial (não é padrão da GoodWe — ver PDF do desafio)
- **Sessões de Recarga** — histórico tabular
- **Protocolos** — Modbus / OCPP / RFID + log OCPP simulado
- **Relatórios** — indicadores consolidados e exportações
- **Configurações** — parâmetros da planta e status de integrações

## Estado real vs. simulado (importante para a avaliação acadêmica)

Conforme a documentação oficial do EV Challenge 2026:

- A linha **HCA G2 não suporta OCPP** hoje — a tela de Protocolos mostra isso como "planejado/futuro", nunca
  como funcionando.
- A **API de EV Chargers da GoodWe ainda não está disponível**; por isso todos os dados vêm de `src/mock/`.
- A **GoodWe não define um modelo de cobrança** para a linha HCA G2 — a página de Tarifação apresenta uma
  **proposta comercial da equipe**, sinalizada como tal na interface.
- **RFID** é suportado de fato (2 cartões inclusos, até 10 cadastráveis).
