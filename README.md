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

## 🎨 Funcionalidades Implementadas

### ✅ Dashboard
- Cards de status das peças do dia
- Ações rápidas (Novo conteúdo, Gerar copies, Ir ao editor)
- Próximas ações pendentes

### ✅ Pipeline (Kanban)
- Colunas por status do fluxo
- Drag & drop para mudança de status
- Menu contextual (Duplicar, Gerar variações, Excluir)

### ✅ Calendar
- Visão semanal com drag & drop
- Filtros por pilar, status e formato
- Cards informativos das peças

### ✅ Editor
- Formulário de brief estruturado
- Prévia dos moldes (Carrossel 6x, Reels)
- Sidebar com hooks e hashtags sugeridos
- Barra de ações contextuais

### ✅ Library (Biblioteca)
- CRUD completo para todos os recursos
- Tabs organizadas por categoria
- Modais de edição dinâmicos

### ✅ Metrics
- Tabela editável de métricas
- Cards de performance geral
- Ranking de hooks e CTAs
- Filtros por período e categoria

### ✅ Settings
- Configurações de negócio (marcas, equipes)
- Identidade visual e tom de voz
- Configuração de canais

### ✅ Channels
- Instagram: configurações específicas e constraints
- YouTube/Blog: placeholders para futuras implementações

## 🔮 Próximos Passos

### Integrações Pendentes
- [ ] Conexão completa com Supabase
- [ ] Autenticação e RLS
- [ ] Upload de arquivos
- [ ] Geração de variações por IA

### Funcionalidades Avançadas
- [ ] Sistema de templates visuais
- [ ] Automação de publicação
- [ ] Analytics avançados
- [ ] Colaboração em tempo real

### Canais Futuros
- [ ] YouTube (roteiros, thumbnails, SEO)
- [ ] Blog (artigos longos, SEO, links internos)
- [ ] LinkedIn, TikTok, Twitter

## 🎯 Filosofia do Projeto

Este projeto segue a filosofia **LEGO** de desenvolvimento:
- **Componentes reutilizáveis** que se encaixam perfeitamente
- **Zero reinvenção** de layouts ou padrões
- **Fluxo intuitivo** que acelera a produção
- **Escalabilidade** para múltiplos canais e clientes

---

**Desenvolvido com ❤️ pela Hibrit Agency**