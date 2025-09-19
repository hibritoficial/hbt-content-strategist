# Hibrit Copiloto Estrategista de Conteúdo Inteligente — "Modo Instagram" (v1)

Mono-repo **1 código → N clientes** (tenants) com Vue 3 + Vuetify, Supabase e deploy na Vercel.

## 🚀 Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/hbt-content-strategist)

### Variáveis de Ambiente (Vercel)
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 🚀 Stack Tecnológica

### Frontend
- **Vue 3.4+** - Framework progressivo com Composition API
- **Vuetify 3.4+** - Sistema de design Material com componentes pré-construídos
- **Vite 5.0+** - Build tool ultrarrápido com HMR
- **Vue Router 4** - Roteamento oficial para SPA
- **Pinia 2.1+** - Gerenciamento de estado moderno

### Utilitários
- **VueUse** - Composables utilitários
- **Zod** - Validação de schemas
- **Day.js** - Manipulação de datas
- **UUID** - Geração de IDs únicos
- **vue3-smooth-dnd** - Drag and drop

### Backend & Integrações
- **Supabase** - Postgres + Auth + Row Level Security
- **Vercel** - Deploy e hosting

## 🎯 Objetivo

Orquestrar, em fluxo leve, o processo de copy/arte para Instagram com pilares/ângulos, moldes LEGO visuais, geração de variações por IA, CTAs com palavras-chave e registro de métricas simples — preparado para multicanais (YouTube/Blog) na navegação.

## ⚡ Requisitos de UX

- **Velocidade e fluidez**: tudo com "inline edit", atalhos (N = novo, / = busca, G+C = ir para Calendar, G+P = Pipeline)
- **Design LEGO**: blocos visuais e de copy que se encaixam; zero reinvenção de layout
- **Uma ideia por tela**: no editor, copy à esquerda e prévia do modelo à direita
- **Barras de ação contextuais**: CTA único sempre visível; status com 1 clique
- **Acessibilidade**: contraste, tab order, autofocus, snackbar de feedback

## 🗺️ Mapa de Navegação

- `/` → Dashboard (cards: peças do dia, pendências, atalhos)
- `/calendar` → Calendar (grade semanal/mensal com arrastar-soltar)
- `/pipeline` → Pipeline (Kanban: backlog→brief→draft_copy→design→ready→scheduled→published)
- `/editor/:id` → Editor (brief + copy + prévia)
- `/library` → Biblioteca (moldes, hooks, hashtags, CTAs)
- `/metrics` → Métricas (tabela e gráficos simples)
- `/settings` → Configurações (marca, canal, equipes)
- `/channels/instagram` (ativo), `/channels/youtube` (stub), `/channels/blog` (stub)

## 🏗️ Arquitetura

### Layout (Vuetify)
- **VApp** + **VNavigationDrawer** (rail) com três seções na sidebar:
  - **Negócio** (Marcas/Workspaces, Equipes, Permissões)
  - **Marca & Marketing** (Pilares, Ângulos, Tom de voz, Visual tokens)
  - **Canais** (Instagram ativo; YouTube/Blog placeholders)
- **VAppBar** com Command Bar (busca global, "New" e "Generate 3 copies")
- **VMain** com páginas usando VContainer, VCard, VDataTable, etc.

### Entidades Principais

#### Configuração & Biblioteca
- **Pillars** - Pilares de conteúdo
- **Angles** - Ângulos de abordagem
- **Formats** - Tipos de formato (post, carrossel, reels, story)
- **Molds** - Moldes LEGO com layout_schema
- **Hooks** - Padrões de ganchos
- **HashtagClusters** - Grupos de hashtags (amplas, nicho, branded)
- **CTAKeywords** - Palavras-chave para automação

#### Produção de Conteúdo
- **ContentItem** - A peça principal com todos os metadados
- **Brief** - Template estruturado do processo
- **CopyVersion** - Variações A/B/C do copy
- **Asset** - Arquivos de mídia
- **MetricEntry** - Dados de performance

### Segurança & Multi-marca
- **Supabase Auth** com Row Level Security
- Cada `brand_id` é um workspace isolado
- Usuários só acessam dados da sua marca

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 18+
- Conta no Supabase
- Conta na Vercel (opcional)

### Setup Local

1. **Clone e instale dependências:**
   ```bash
   git clone <repo>
   cd hbt-content-strategist
   npm install
   ```

2. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```
   
   Preencha no `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

3. **Execute o projeto:**
   ```bash
   npm run dev
   ```

### Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build
- `npm run lint` - Linting do código

## 🗺️ Estrutura de Navegação e Funcionalidades

### 📱 Menu Lateral (Rail Navigation)

#### **MARCA & MARKETING**
- **📚 Biblioteca** - Gerenciamento de recursos de conteúdo
- **⚙️ Configurações** - Configurações gerais do sistema

#### **CANAIS**
- **📷 Instagram** - Canal ativo com funcionalidades completas
- **📺 YouTube** - Placeholder (futuro)
- **📝 Blog** - Placeholder (futuro)

### 🔝 Barra Superior (App Bar)

#### **Navegação Rápida**
- **🏠 Dashboard** - Visão geral do sistema
- **📅 Calendar** - Calendário de conteúdos
- **📋 Pipeline** - Kanban de produção
- **📚 Library** - Biblioteca de recursos
- **📊 Metrics** - Métricas e analytics
- **🔗 Flow** - Fluxo de trabalho
- **🎯 Funnels** - Construtor de funis

#### **Ferramentas**
- **🔍 Busca Global** - Campo de busca (atalho: /)
- **➕ Novo** - Criar conteúdo (atalho: N)
- **🤖 Gerar 3 Copies** - IA para variações
- **❓ Ajuda** - Documentação
- **👤 Perfil** - Menu do usuário

---

## 🎨 Funcionalidades Detalhadas por Tela

### ✅ **Dashboard** (`/`)
**Visão geral do sistema com cards informativos**
- Cards de status das peças do dia
- Ações rápidas (Novo conteúdo, Gerar copies, Ir ao editor)
- Próximas ações pendentes
- Resumo de métricas principais

### ✅ **Calendar** (`/calendar`)
**Calendário visual para agendamento de conteúdos**
- Visão semanal com drag & drop
- Filtros por pilar, status e formato
- Cards informativos das peças
- Criação rápida de conteúdo por data

### ✅ **Pipeline** (`/pipeline`)
**Kanban para gerenciamento do fluxo de produção**
- Colunas por status: Backlog → Brief → Copy → Design → Pronto → Agendado → Publicado
- Drag & drop para mudança de status
- Menu contextual (Duplicar, Gerar variações, Excluir)
- Filtros e busca por conteúdo

### ✅ **Editor** (`/editor/:id`)
**Interface principal para criação e edição de conteúdo**

#### **Painel Esquerdo - Brief & Copy**
- **Campos Básicos:**
  - Título da peça
  - Pilar de conteúdo (Autoridade, Relacionamento, Vendas, Educativo)
  - Ângulo de abordagem (Dor, Sonho, Medo, Urgência, Curiosidade)
  - Formato (Post, Carrossel, Reels, Story)
  - Molde LEGO (templates visuais)

- **Campos de Copy:**
  - Oferta/Hook principal
  - Prova/Âncora social
  - Texto do CTA + palavra-chave
  - Clusters de hashtags
  - UTM Campaign/Content
  - Data de agendamento

#### **Painel Direito - Prévia & Sugestões**
- **Prévia do Molde:**
  - Carrossel 6x (6 slides estruturados)
  - Reels (timeline 0-2s, 3-15s, 16-20s)
  - Preview dinâmica baseada no molde selecionado

- **Sidebar de Sugestões:**
  - Hooks sugeridos (clicáveis)
  - Clusters de hashtags organizados
  - Palavras-chave CTA

#### **Barra de Ações**
- **Gerar 3 Variações** - IA para criar variações do copy
- **Salvar** - Persistir alterações
- **Status** - Alterar status do conteúdo (dropdown)

### ✅ **Library** (`/library`)
**Biblioteca completa de recursos para criação de conteúdo**

#### **Aba: Pilares** (Supabase)
- **Funcionalidades:** ✅ Listar, ✅ Criar, ✅ Deletar
- **Dados:** Autoridade, Relacionamento, Vendas, Educativo
- **Campos:** Nome, Descrição

#### **Aba: Ângulos** (Supabase)
- **Funcionalidades:** ✅ Listar, ✅ Criar, ✅ Deletar
- **Dados:** Dor, Sonho, Medo, Urgência, Curiosidade
- **Campos:** Nome, Descrição

#### **Aba: Moldes** (Supabase)
- **Funcionalidades:** ✅ Listar, ✅ Criar, ✅ Deletar, ✅ Preview
- **Dados:** Carrossel 6x, Reels, Post Educativo, Post de Vendas, etc.
- **Campos:** Nome, Descrição

#### **Aba: Hooks** (Local)
- **Funcionalidades:** ✅ Listar, ✅ Criar, ✅ Editar, ✅ Deletar
- **Dados:** Padrões de ganchos ("Você sabia que...", "O segredo para...")
- **Campos:** Padrão, Exemplos (array)

#### **Aba: Hashtags** (Local)
- **Funcionalidades:** ✅ Listar, ✅ Criar, ✅ Editar, ✅ Deletar
- **Dados:** Clusters organizados (amplas, nicho, branded)
- **Campos:** Tipo de cluster, Tags (array)

#### **Aba: CTAs** (Local)
- **Funcionalidades:** ✅ Listar, ✅ Criar, ✅ Editar, ✅ Deletar
- **Dados:** Palavras-chave para automação
- **Campos:** Palavra-chave, Resposta automática, Tag de destino

#### **Ferramentas da Biblioteca**
- **🗃️ Popular Dados Iniciais** - Insere dados padrão no Supabase
- **🧹 Limpar Duplicatas** - Remove registros duplicados (com proteção de FK)

### ✅ **Metrics** (`/metrics`)
**Analytics e métricas de performance**
- Tabela editável de métricas
- Cards de performance geral
- Ranking de hooks e CTAs
- Filtros por período e categoria

### ✅ **Settings** (`/settings`)
**Configurações gerais do sistema**
- Configurações de negócio (marcas, equipes)
- Identidade visual e tom de voz
- Configuração de canais

### ✅ **Flow** (`/flow`)
**Visualização de fluxo de trabalho**
- Fluxograma interativo do processo
- Nodes com status e conexões
- Sistema de atualização de status

### ✅ **Funnels** (`/funnels`)
**Construtor de funis de marketing**
- Lista de funis criados
- Templates pré-definidos (Lead Magnet Básico)
- Acesso ao construtor visual

### ✅ **Funnel Builder** (`/funnels/:id`)
**Interface visual para construção de funis**
- Drag & drop de componentes
- Conexões entre etapas
- Modo compacto/detalhado
- Export para PNG
- Templates de funil

### ✅ **Channels**

#### **Instagram** (`/channels/instagram`)
- Canal ativo com funcionalidades completas
- Configurações específicas do Instagram
- Constraints e limitações da plataforma

#### **YouTube/Blog** (`/channels/youtube`, `/channels/blog`)
- Placeholders para futuras implementações
- Estrutura preparada para expansão

---

## ⌨️ Atalhos de Teclado

- **N** - Criar novo conteúdo
- **/** - Focar no campo de busca
- **G+C** - Ir para Calendar
- **G+P** - Ir para Pipeline
- **ESC** - Cancelar conexões (Funnel Builder)

---

## 🗄️ Estrutura de Dados

### **Supabase (Produção)**
- `pillars` - Pilares de conteúdo
- `angles` - Ângulos de abordagem  
- `formats` - Formatos de conteúdo
- `molds` - Moldes LEGO
- `content_items` - Itens de conteúdo
- `funnel_nodes` - Nós dos funis
- `funnel_edges` - Conexões dos funis
- `flow_node_status` - Status dos nós do fluxo

### **Local (Desenvolvimento)**
- `hooks` - Padrões de ganchos
- `hashtagClusters` - Clusters de hashtags
- `ctaKeywords` - Palavras-chave CTA

---

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
- [ ] Sistema de aprovação de conteúdo

### Canais Futuros
- [ ] **YouTube** (roteiros, thumbnails, SEO)
- [ ] **Blog** (artigos longos, SEO, links internos)
- [ ] **LinkedIn, TikTok, Twitter**

### Melhorias de UX
- [ ] Modo escuro
- [ ] Personalização de workspace
- [ ] Notificações push
- [ ] Histórico de alterações
- [ ] Comentários e feedback

## 🎯 Filosofia do Projeto

Este projeto segue a filosofia **LEGO** de desenvolvimento:
- **Componentes reutilizáveis** que se encaixam perfeitamente
- **Zero reinvenção** de layouts ou padrões
- **Fluxo intuitivo** que acelera a produção
- **Escalabilidade** para múltiplos canais e clientes

---

**Desenvolvido com ❤️ pela Hibrit Agency**