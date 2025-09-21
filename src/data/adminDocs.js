export const adminDocs = {
  'admin-overview': {
    id: 'admin-overview',
    route: '/admin',
    anchors: ['hierarchy', 'analytics', 'actions'],
    dimensions: ['sistema', 'metodo', 'conhecimento'],
    title: '🏢 Administração - Controle da Plataforma',
    breadcrumb: 'Hibrit > Admin > Visão Geral',
    content: {
      sistema: `**Interface com 3 seções principais:**

• **Hierarquia** → Brands → Workspaces → Users
• **Analytics** → Métricas consolidadas da plataforma
• **Ações Rápidas** → Setup automatizado de clientes

*Acesso restrito ao staff da Hibrit*`,
      metodo: `**Fluxo de gerenciamento:**

1. 📊 **Monitore** Health Score dos brands
2. 🚨 **Identifique** alertas críticos (badge vermelho)
3. ⚡ **Execute** ações rápidas para onboarding
4. 🔍 **Analise** métricas consolidadas

*Priorize brands com score <60%*`,
      conhecimento: `**Health Score - Fórmula:**

• 🎯 **Conversão** (40%) - Leads vs visitantes
• 📈 **Atividade** (30%) - Frequência de uso
• ⚡ **Performance** (20%) - Velocidade/qualidade
• 🔧 **Técnico** (10%) - Integrações/erros

**Códigos de cor:**
• 🟢 Excelente (90%+) • 🔵 Bom (75-89%)
• 🟡 Atenção (60-74%) • 🔴 Crítico (<60%)`
    },
    related: ['admin-brands', 'admin-metrics', 'admin-actions']
  },
  'admin-brands': {
    id: 'admin-brands',
    route: '/admin',
    anchors: ['brands-grid', 'health-score'],
    dimensions: ['sistema', 'metodo', 'conhecimento'],
    title: '🏷️ Brands - Gestão de Clientes',
    breadcrumb: 'Hibrit > Admin > Brands',
    content: {
      sistema: `**Cards visuais com:**

• 📊 **Health Score** (canto superior direito)
• 📈 **Taxa de Conversão** (%)
• ⏰ **Último Acesso** (quando fizeram login)
• 🚨 **Badge de Alertas** (canto superior direito)
• 🔗 **Links Rápidos** (Pipeline, Biblioteca, etc.)

*Clique no card para expandir workspaces*`,
      metodo: `**Priorização de atendimento:**

1. 🔴 **Críticos** → Health Score <60%
2. 🚨 **Alertas** → Badge vermelho no card
3. ⏰ **Inativos** → Último acesso >7 dias
4. 📉 **Baixa conversão** → <10%

**Ações rápidas:**
• Clique no brand → Ver workspaces
• Links diretos → Pipeline/Biblioteca`,
      conhecimento: `**Health Score - Interpretação:**

• 🟢 **90-100%** → Cliente modelo, tudo funcionando
• 🔵 **75-89%** → Bom desempenho, pequenos ajustes
• 🟡 **60-74%** → Atenção necessária, revisar processo
• 🔴 **<60%** → Intervenção urgente, risco de churn

**Taxa de Conversão:**
*Leads gerados ÷ Visitantes únicos × 100*

**Último Acesso:**
*Quando qualquer usuário do brand fez login*`
    },
    related: ['admin-overview', 'admin-workspaces']
  },
  'admin-workspaces': {
    id: 'admin-workspaces',
    route: '/admin',
    anchors: ['workspaces-list', 'workspace-actions'],
    dimensions: ['sistema', 'metodo', 'conhecimento'],
    title: '📁 Workspaces - Ambientes Isolados',
    breadcrumb: 'Hibrit > Admin > Brands > Workspaces',
    content: {
      sistema: `**Lista por brand selecionado:**

• 📝 **Nome** do workspace
• 🔗 **Slug** (URL de acesso)
• 👥 **Usuários** (quantidade)
• 📄 **Conteúdos** (quantidade)
• ⚙️ **Ações** (gerenciar, simular)

*Aparece apenas quando um brand é selecionado*`,
      metodo: `**Gestão de workspaces:**

1. 🎯 **Isolamento** → Cada projeto/equipe tem seu workspace
2. 👁️ **Simular acesso** → Teste a experiência do cliente
3. 👥 **Gerenciar usuários** → Adicionar/remover membros
4. 🔧 **Configurações** → Ajustar permissões

**Quando usar:**
• Cliente tem múltiplos projetos
• Equipes separadas por área
• Ambientes de teste vs produção`,
      conhecimento: `**Arquitetura técnica:**

• 🔒 **RLS** (Row Level Security) no Supabase
• 🏷️ **Slug** define URL: \`app.com/workspace-slug\`
• 👤 **Usuários** só veem dados do seu workspace
• 🔑 **Roles**: owner > manager > editor

**Segurança:**
*Cada workspace é completamente isolado*
*Impossível vazamento de dados entre clientes*`
    },
    related: ['admin-brands', 'admin-users']
  },
  'admin-metrics': {
    id: 'admin-metrics',
    route: '/admin',
    anchors: ['analytics-grid', 'platform-overview'],
    dimensions: ['sistema', 'metodo', 'conhecimento'],
    title: '📊 Analytics - Métricas Consolidadas',
    breadcrumb: 'Hibrit > Admin > Analytics',
    content: {
      sistema: `**Dashboard com 3 cards:**

**🏢 Visão Geral da Plataforma:**
• Brands ativos
• Total de workspaces
• Usuários cadastrados

**📄 Distribuição de Conteúdo:**
• Total de conteúdos
• Funis ativos
• Itens de biblioteca

**💚 Saúde do Sistema:**
• Content Engine (99.9%)
• Funnel Core (100%)
• Analytics (95.2%)`,
      metodo: `**Como interpretar:**

1. 📈 **Crescimento** → Compare números mês a mês
2. 📊 **Distribuição** → Identifique padrões de uso
3. 🚨 **Alertas** → Monitore saúde <98%
4. 🎯 **Tendências** → Planeje recursos

**Ações baseadas em dados:**
• Crescimento rápido → Escalar infraestrutura
• Baixo uso → Revisar onboarding
• Erros técnicos → Priorizar correções`,
      conhecimento: `**Métricas agregadas:**

• 🔢 **Soma** de todos os brands
• 📊 **Tempo real** (atualização automática)
• 🎯 **KPIs** principais da plataforma

**3 Pilares Técnicos:**
• 🎨 **Content Engine** → Criação de conteúdo
• 🔄 **Funnel Core** → Sistema de funis
• 📈 **Analytics** → Coleta de métricas

*Cada pilar deve manter >98% uptime*`
    },
    related: ['admin-overview', 'admin-brands']
  },
  'admin-actions': {
    id: 'admin-actions',
    route: '/admin',
    anchors: ['setup-completo', 'adicionar-usuario'],
    dimensions: ['sistema', 'metodo', 'conhecimento'],
    title: '⚡ Ações Rápidas - Automação de Setup',
    breadcrumb: 'Hibrit > Admin > Ações',
    content: {
      sistema: `**2 formulários principais:**

**🚀 Setup Completo:**
• Nome do Brand
• Email do Usuário
• Nome do Workspace
• ✅ Validação automática

**👤 Adicionar Usuário:**
• Email do usuário
• Workspace (dropdown)
• Função (owner/manager/editor)
• ✅ Verificação de duplicatas`,
      metodo: `**Setup Completo - Novos clientes:**

1. 🏷️ **Brand** → Nome da empresa cliente
2. 👤 **Usuário** → Email do contato principal
3. 📁 **Workspace** → Ambiente de trabalho
4. ⚡ **Automático** → Tudo criado em 1 clique

**Adicionar Usuário - Expansão:**
• Para equipes existentes
• Múltiplos usuários por workspace
• Controle de permissões por role`,
      conhecimento: `**Automação no Supabase:**

**Relacionamentos criados:**
• 🏢 Brand (cliente)
• 📁 Workspace (ambiente)
• 👤 User (pessoa)
• 🔗 Workspace_members (vínculo)

**Roles e permissões:**
• 👑 **Owner** → Controle total
• 🛠️ **Manager** → Gerenciar conteúdo
• ✏️ **Editor** → Criar/editar apenas

**Segurança RLS:**
*Cada usuário só acessa seu workspace*`
    },
    related: ['admin-overview', 'admin-workspaces']
  }
}