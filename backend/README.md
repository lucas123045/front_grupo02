# ChargeGrid API

FastAPI que porta o simulador de recarga do Data Structures Sprint
(Equipe02-1CCPO: `Carros.py`, `equacoesRecarga.py`, `gerenciamentoDeRecarga.py`,
`sistemaCobranca.py`, `SimuladorOCPP.py`) para uma API HTTP consumida pelo
front-end React em `../`.

O loop bloqueante de CLI (`simuladorDeRecarga.py`) foi substituído por uma
tarefa assíncrona de fundo que avança a simulação 1x por segundo (mesma regra
de `monitorar_carregamento()`), disponível continuamente enquanto a API roda.

## Rodando

```bash
cd backend
python -m venv ../.venv        # se ainda não existir
../.venv/Scripts/activate      # Windows (Git Bash: source ../.venv/Scripts/activate)
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

O front-end (`npm run dev`, porta 5173) já tem um proxy de `/api` para
`http://127.0.0.1:8000` configurado em `vite.config.ts` — não precisa de CORS
extra em dev, mas a API também libera `*` via `CORSMiddleware` caso seja
acessada de outra origem.

## Endpoints

| Rota | Método | Descrição |
|---|---|---|
| `/api/sessions` | GET | Sessões ativas e finalizadas |
| `/api/sessions` | POST | Cadastra um carro (`{nome, modelo, tipoRecarga}`), inicia StartTransaction e retorna a fatura estimada |
| `/api/tarifas` | GET | Tarifa vigente por horário/demanda/tipo |
| `/api/demanda` | GET | Demanda atual vs. limite contratado (100 kW) |
| `/api/demanda/historico` | GET | Últimos pontos de demanda (para o gráfico) |
| `/api/protocolos` | GET | Log de mensagens OCPP 1.6 simuladas |
| `/api/relatorio` | GET | Totais consolidados (sessões, energia, receita) |

`tipoRecarga` usa os valores `lenta` \| `rapida` \| `prioridade` (mapeados
internamente para `'1'`/`'2'`/`'3'`, como no script original).

## Estado

O estado (carros ativos/finalizados, histórico de demanda, log OCPP) é
mantido em memória, em processo único — reinicia ao reiniciar a API. Isso é
suficiente para o propósito de demonstração do projeto; não há persistência
em banco de dados. Por isso a API precisa de um processo sempre ativo — não
roda em uma função serverless (Vercel Functions, por exemplo), que não
mantém estado nem tarefas de fundo entre chamadas.

## Deploy no Render

Existe um `render.yaml` na raiz do repositório (`../render.yaml`) já
configurado para este serviço. Passos:

1. Acesse [render.com](https://render.com) e crie uma conta (dá pra usar login do GitHub).
2. **New +** → **Blueprint** → selecione o repositório `front_grupo02`.
   O Render lê o `render.yaml` sozinho e propõe o serviço `chargegrid-backend`
   (plano Free, root `backend/`, build `pip install -r requirements.txt`,
   start `uvicorn app.main:app --host 0.0.0.0 --port $PORT`).
3. Confirme a criação. O primeiro deploy leva alguns minutos.
4. Quando terminar, copie a URL pública (algo como
   `https://chargegrid-backend.onrender.com`).
5. No projeto da Vercel (front-end), vá em **Settings → Environment
   Variables** e adicione:
   - `VITE_API_URL` = `https://chargegrid-backend.onrender.com/api`
     (inclua o `/api` no final).
6. Redeploy do front na Vercel para a variável entrar em vigor.

**Importante — plano Free do Render:** o serviço "dorme" após ~15 min sem
requisições e leva ~30-50s para acordar na próxima chamada (primeira
requisição do front pode parecer travada nesse período). Isso é uma
limitação do plano gratuito, não um bug da API.
