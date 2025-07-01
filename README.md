# 🧭 Sistema Inteligente de Gerenciamento de Manutenções

## 💡 Visão Geral

Empresas que vendem produtos com ciclos de manutenção periódica enfrentam o desafio de **controlar, organizar e lembrar** os clientes dessas manutenções.  
Esta solução é uma **plataforma web inteligente** que automatiza todo esse fluxo: do momento da venda à execução da manutenção recorrente, garantindo relacionamento com o cliente, **redução de perdas comerciais** e **aumento da fidelização**.

---

## 🎯 Problemas Resolvidos

- Falta de controle sobre manutenções periódicas
- Agendamentos esquecidos ou desorganizados
- Perda de receita por falha de follow-up
- Falta de histórico centralizado e confiável
- Falta de visualização e previsibilidade de manutenção

---

## ✅ Solução Proposta

- 💼 Cadastro de **clientes, produtos e vendas**
- 📆 Geração **automática de agendamentos** com base nos produtos vendidos
- 🧠 Atualização automática de status com **cron job**
- 📊 Tela de **relatórios** com histórico de manutenções realizadas
- ✉️ Visualização clara e organizada dos **status de agendamento**

---

## 🧩 Como Funciona

1. Venda registrada → sistema detecta produtos com manutenção
2. Criação automática de agendamentos
3. Usuário pode atualizar o status via painel
4. Ao marcar como “done”, sistema:
   - Cria registro em `scheduleHistories`
   - Recalcula e agenda próxima manutenção
5. Cron job diário atualiza status para “late” quando vencido

---

## 🛠 Tecnologias Utilizadas

### Backend (Node.js + GraphQL)

- `Sails.js + TypeScript`
- `GraphQL` com Apollo Server
- `MongoDB + Mongoose`
- **Clean Architecture**
- DTOs, Repositories, UseCases
- Job automático via `node-cron`

### Frontend (React + Tailwind + Shadcn)

- React 19 + TypeScript
- Apollo Client
- TailwindCSS com Craco
- Componentes acessíveis com Shadcn/UI
- Selects, filtros, grid cards, etc.

---

## ⚙️ Fluxo Resumido

```mermaid
graph LR
A[Venda Realizada] --> B{Produto com manutenção?}
B -- Sim --> C[Gerar Agendamento]
C --> D[Usuário Visualiza]
D --> E[Status: done]
E --> F[Cria Histórico + Nova Data]
C -->|Data vencida| G[Status muda para: late]
