# Análise Completa do Projeto HBT Content Strategist

## 🎯 Visão Geral

O **HBT Content Strategist** é uma aplicação web moderna desenvolvida pela Hibrit Agency para orquestrar o processo de criação de conteúdo para Instagram e outros canais digitais. É um sistema multi-tenant (1 código → N clientes) com foco em produtividade e automação.

## 🏗️ Arquitetura Técnica

### Stack Principal
- **Frontend**: Vue 3.4+ com Composition API
- **UI Framework**: Vuetify 3.4+ (Material Design)
- **Build Tool**: Vite 5.0+
- **Roteamento**: Vue Router 4
- **Estado**: Pinia 2.1+
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Deploy**: Vercel
- **Linguagem**: JavaScript ES6+

### Dependências Principais
```json
{
  "vue": "^3.4.0",
  "vuetify": "^3.4.0", 
  "vite": "^5.0.0",
  "@supabase/supabase-js": "^2.38.4",
  "pinia": "^2.1.7",
  "@vue-flow/core": "^1.46.4",
  "dayjs": "^1.11.10",
  "zod": "^3.22.4"
}
```

## 🗂️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── crm/            # Componentes de CRM
│   ├── docs/           # Sistema de documentação
│   ├── flow/           # Componentes de fluxo
│   ├── funnel/         # Componentes de funil
│   ├── gamification/   # Sistema de gamificação
│   └── workspace/      # Gerenciamento de workspace
├── composables/        # Composables Vue
├── data/              # Dados estáticos e templates
├── lib/               # Configurações (Supabase)
├── plugins/           # Plugins Vue (Vuetify)
├── router/            # Configuração de rotas
├── stores/            # Stores Pinia
├── styles/            # Estilos globais
├── utils/             # Utilitários
└── views/             # Páginas da aplicação
    ├── channels/      # Canais (Instagram, YouTube, Blog)
    ├── content/       # Gestão de conteúdo
    ├── experiments/   # Laboratórios de experimentação
    ├── funnel/        # Construtor de funis
    ├── gamification/  # Sistema de gamificação
    └── metrics/       # Analytics e métricas
```

## 🎨 Funcionalidades Principais

### 1. **Sistema de Cockpits**
- **Cockpit Principal**: Dashboard unificado
- **Cockpit OCS**: Específico para cliente OCS (Blocos de Concreto)
- **Navegação Flutuante**: FAB para acesso rápido

### 2. **Gestão de Conteúdo**
- **Pipeline Kanban**: Backlog → Brief → Copy → Design → Ready → Published
- **Editor Inteligente**: Brief + Copy + Prévia em tempo real
- **Biblioteca**: Pilares, ângulos, moldes, hooks, hashtags, CTAs
- **Calendar**: Agendamento visual com drag & drop

### 3. **Sistema de Funis**
- **Funnel Builder**: Construtor visual drag & drop
- **Templates**: Funis pré-definidos
- **Métricas**: KPIs unificados por funil
- **Export**: PNG para apresentações

### 4. **Multi-Canal**
- **Instagram**: Canal ativo com funcionalidades completas
- **YouTube**: Placeholder para futuras implementações
- **Blog**: Placeholder para futuras implementações

### 5. **Sistema de Gamificação**
- **Operação Anti-Ghosting**: Sistema de engajamento
- **Timeline Netflix**: Interface gamificada
- **Métricas de Performance**: Tracking de atividades

### 6. **Laboratórios (Hibrit Labs)**
- **Experimentos**: CXA Dashboard, Analytics Overview
- **Interface Test**: Testes de componentes
- **Scientific Laboratories**: Pesquisa e desenvolvimento

## 🗄️ Estrutura de Dados

### Tabelas Principais (Supabase)
```sql
-- Configuração
pillars          # Pilares de conteúdo
angles           # Ângulos de abordagem
formats          # Formatos (post, carrossel, reels)
molds            # Moldes LEGO com layout_schema

-- Produção
content_items    # Itens de conteúdo principais
briefs           # Templates estruturados
copy_versions    # Variações A/B/C
assets           # Arquivos de mídia
metric_entries   # Dados de performance

-- Funis
funnel_nodes     # Nós dos funis
funnel_edges     # Conexões entre nós
flow_node_status # Status dos fluxos

-- Multi-tenant
brands           # Marcas/clientes
workspaces       # Workspaces por marca
```

### Dados Locais (Desenvolvimento)
```javascript
// src/data/
hooks            # Padrões de ganchos
hashtagClusters  # Clusters de hashtags
ctaKeywords      # Palavras-chave CTA
funnelTemplates  # Templates de funis
```

## 🔐 Segurança e Multi-tenancy

### Autenticação
- **Supabase Auth**: Sistema de autenticação completo
- **Row Level Security (RLS)**: Isolamento por marca
- **Roles**: Hibrit Staff vs Clientes

### Isolamento de Dados
- Cada `brand_id` é um workspace isolado
- Usuários só acessam dados da sua marca
- Sistema de simulação para demonstrações

## 🎯 Fluxo de Trabalho

### 1. **Criação de Conteúdo**
```
Brief → Copy → Design → Review → Schedule → Publish
```

### 2. **Sistema LEGO**
- **Pilares**: Autoridade, Relacionamento, Vendas, Educativo
- **Ângulos**: Dor, Sonho, Medo, Urgência, Curiosidade
- **Moldes**: Templates visuais reutilizáveis
- **Hooks**: Padrões de ganchos testados

### 3. **Automação**
- Geração de variações por IA
- CTAs com palavras-chave automáticas
- Clusters de hashtags organizados
- Métricas de performance integradas

## 🚀 Deploy e Infraestrutura

### Vercel
- **Build**: `npm run vercel-build`
- **Rewrites**: SPA routing configurado
- **Environment**: Variáveis de ambiente do Supabase

### Variáveis de Ambiente
```bash
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 📊 Métricas e Analytics

### KPIs Unificados
- **Clientes**: Total conquistado
- **Receita Nova**: Receita do período
- **Win Rate**: Taxa de conversão global
- **CAC Global**: Custo de aquisição
- **Sales Cycle**: Ciclo de vendas
- **NRR**: Retenção líquida

### Por Funil
- **Intertravados**: Ciclo curto (28d)
- **Estrutural**: Ciclo longo (65d)
- **Públicas**: Institucional (90d)
- **Reativação**: Winback (21d)

## 🎨 Design System

### Paleta de Cores
- **Primária**: Azul (#2196F3)
- **Secundária**: Roxo (#9C27B0)
- **Sucesso**: Verde (#4CAF50)
- **Aviso**: Laranja (#FF9800)
- **Erro**: Vermelho (#F44336)

### Componentes
- **Vuetify**: Sistema Material Design
- **Vue Flow**: Fluxogramas interativos
- **Responsivo**: Mobile-first approach
- **Acessibilidade**: Contraste e navegação por teclado

## ⌨️ Atalhos de Teclado

- **N**: Criar novo conteúdo
- **/**: Focar na busca
- **G+C**: Ir para Calendar
- **G+P**: Ir para Pipeline
- **ESC**: Cancelar conexões (Funnel Builder)

## 🔮 Próximos Passos

### Integrações Pendentes
- [ ] Autenticação completa e RLS
- [ ] Upload de arquivos e mídia
- [ ] Geração de variações por IA
- [ ] Integração com APIs do Instagram

### Funcionalidades Avançadas
- [ ] Sistema de templates visuais
- [ ] Automação de publicação
- [ ] Analytics avançados em tempo real
- [ ] Colaboração em tempo real

### Canais Futuros
- [ ] **YouTube**: Roteiros, thumbnails, SEO
- [ ] **Blog**: Artigos longos, SEO, links internos
- [ ] **LinkedIn, TikTok, Twitter**

## 🏆 Diferenciais

### Usabilidade Inovadora
- Toggle visual entre visões sem perda de contexto
- Tooltips educativos para democratizar métricas
- Navegação flutuante não-intrusiva
- Feedback visual imediato

### Arquitetura Escalável
- Componentes reutilizáveis
- Dados estruturados para fácil expansão
- Sistema de rotas preparado para novos clientes
- Design system consistente

### Foco no Negócio
- Funis como coração do sistema
- Métricas que importam para tomada de decisão
- Visão executiva sem ruído
- Ação direta a partir dos insights

## 📈 Status do Projeto

### ✅ Implementado
- Sistema de cockpits executivos
- Gestão completa de conteúdo
- Construtor de funis visual
- Sistema de gamificação
- Multi-tenancy com RLS
- Deploy na Vercel

### 🚧 Em Desenvolvimento
- Integrações com APIs externas
- Sistema de IA para geração de conteúdo
- Analytics em tempo real
- Colaboração em tempo real

### 📋 Planejado
- Expansão para múltiplos canais
- Sistema de templates avançados
- Automação completa de publicação
- PWA para acesso offline

---

**Desenvolvido com ❤️ pela Hibrit Agency**  
*Transformando dados em decisões estratégicas*



