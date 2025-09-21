<template>
  <div class="knowledge-system">
    <div class="knowledge-header">
      <div class="knowledge-title">Sistema de Conhecimento 360°</div>
      <div class="knowledge-subtitle">Aprendizado completo em camadas progressivas</div>
      <h2 class="experiment-name">{{ experimentName }}</h2>
    </div>
    
    <!-- Tabs Futuristas -->
    <div class="futuristic-tabs">
      <div 
        v-for="tab in knowledgeTabs" 
        :key="tab.id"
        :class="['tab-item', { active: activeKnowledgeTab === tab.id }]"
        @click="activeKnowledgeTab = tab.id"
      >
        <v-icon :color="activeKnowledgeTab === tab.id ? '#00ff88' : '#666'">{{ tab.icon }}</v-icon>
        <span>{{ tab.label }}</span>
        <div class="tab-glow"></div>
      </div>
    </div>
    
    <!-- Conteúdo das Tabs -->
    <div class="tab-content">
      <!-- Lógica Básica - Árvore -->
      <div v-if="activeKnowledgeTab === 'logic'" class="logic-tree">
        <div class="tree-container">
          <div class="tree-node root">
            <div class="node-content">
              <v-icon color="#00ff88">mdi-sitemap</v-icon>
              <span>{{ experimentName }}</span>
            </div>
            <div class="tree-branches">
              <div v-for="branch in currentLogicTree" :key="branch.id" class="branch">
                <div class="branch-line"></div>
                <div class="tree-node">
                  <div class="node-content">
                    <v-icon :color="branch.color">{{ branch.icon }}</v-icon>
                    <span>{{ branch.title }}</span>
                  </div>
                  <div v-if="branch.children" class="sub-branches">
                    <div v-for="child in branch.children" :key="child.id" class="sub-branch">
                      <div class="sub-line"></div>
                      <div class="tree-node small">
                        <v-icon size="16" :color="child.color">{{ child.icon }}</v-icon>
                        <span>{{ child.title }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Conceitos Básicos - Cards Essenciais -->
      <div v-if="activeKnowledgeTab === 'concepts'" class="concepts-grid">
        <div v-for="concept in currentConcepts" :key="concept.id" class="concept-card">
          <div class="concept-header">
            <v-icon :color="concept.color">{{ concept.icon }}</v-icon>
            <h4>{{ concept.title }}</h4>
          </div>
          <p class="concept-description">{{ concept.description }}</p>
          <div class="concept-details">
            <div class="detail-item">
              <strong>Importância:</strong> {{ concept.importance }}
            </div>
            <div class="detail-item">
              <strong>Aplicação:</strong> {{ concept.application }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Dicas Estratégicas - Carrossel -->
      <div v-if="activeKnowledgeTab === 'strategies'" class="strategies-carousel">
        <div class="carousel-container">
          <div class="carousel-track" :style="{ transform: `translateX(-${carouselOffset}px)` }">
            <div v-for="pill in currentKnowledge" :key="pill.id" class="strategy-card">
              <div class="strategy-header">
                <v-icon :color="pill.color" size="24">{{ pill.icon }}</v-icon>
                <h4>{{ pill.title }}</h4>
              </div>
              <div class="strategy-content">
                <div class="strategy-section">
                  <h5>O que é</h5>
                  <p>{{ pill.what }}</p>
                </div>
                <div class="strategy-section">
                  <h5>Por que funciona</h5>
                  <p>{{ pill.why }}</p>
                </div>
                <div class="strategy-section golden">
                  <h5><v-icon color="#FFD700" size="16">mdi-star</v-icon> Dica de ouro</h5>
                  <p>{{ pill.tip }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-controls">
          <v-btn icon @click="prevStrategy" :disabled="carouselOffset === 0">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon @click="nextStrategy" :disabled="carouselOffset >= maxCarouselOffset">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </div>
      
      <!-- Checklist - Fatores Críticos -->
      <div v-if="activeKnowledgeTab === 'checklist'" class="checklist-container">
        <div class="checklist-header">
          <v-icon color="#ff6b35">mdi-clipboard-check</v-icon>
          <h4>Fatores Críticos de Sucesso</h4>
        </div>
        <div class="checklist-grid">
          <div v-for="factor in currentChecklist" :key="factor.id" class="factor-card">
            <div class="factor-header">
              <v-checkbox 
                v-model="factor.checked" 
                color="#00ff88"
                hide-details
              ></v-checkbox>
              <div class="factor-info">
                <h5>{{ factor.title }}</h5>
                <span class="priority" :class="factor.priority">{{ factor.priority.toUpperCase() }}</span>
              </div>
            </div>
            <p class="factor-description">{{ factor.description }}</p>
            <div class="factor-impact">
              <span class="impact-label">Impacto:</span>
              <div class="impact-bar">
                <div class="impact-fill" :style="{ width: factor.impact + '%' }"></div>
              </div>
              <span class="impact-value">{{ factor.impact }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  experimentType: {
    type: String,
    required: true
  },
  experimentName: {
    type: String,
    required: true
  }
})

// Knowledge System Data
const activeKnowledgeTab = ref('logic')
const carouselOffset = ref(0)
const cardWidth = 350
const maxCarouselOffset = computed(() => {
  const totalWidth = currentKnowledge.value.length * cardWidth
  const containerWidth = 1000
  return Math.max(0, totalWidth - containerWidth)
})

const knowledgeTabs = ref([
  { id: 'logic', label: 'Lógica Básica', icon: 'mdi-sitemap' },
  { id: 'concepts', label: 'Conceitos Básicos', icon: 'mdi-book-open' },
  { id: 'strategies', label: 'Dicas Estratégicas', icon: 'mdi-lightbulb' },
  { id: 'checklist', label: 'Checklist', icon: 'mdi-clipboard-check' }
])

// Logic Tree Data
const logicTrees = {
  'cxa-dashboard': [
    {
      id: 1,
      title: 'Aquisição de Leads',
      icon: 'mdi-magnet',
      color: '#10b981',
      children: [
        { id: 11, title: 'Tráfego Pago', icon: 'mdi-currency-usd', color: '#3b82f6' },
        { id: 12, title: 'Tráfego Orgânico', icon: 'mdi-leaf', color: '#10b981' },
        { id: 13, title: 'Indicações', icon: 'mdi-account-group', color: '#f59e0b' }
      ]
    },
    {
      id: 2,
      title: 'Conversão & Vendas',
      icon: 'mdi-chart-line',
      color: '#3b82f6',
      children: [
        { id: 21, title: 'Qualificação', icon: 'mdi-filter', color: '#8b5cf6' },
        { id: 22, title: 'Nutrição', icon: 'mdi-water', color: '#06b6d4' },
        { id: 23, title: 'Fechamento', icon: 'mdi-handshake', color: '#10b981' }
      ]
    },
    {
      id: 3,
      title: 'Retenção & Expansão',
      icon: 'mdi-account-heart',
      color: '#f59e0b',
      children: [
        { id: 31, title: 'Onboarding', icon: 'mdi-rocket-launch', color: '#10b981' },
        { id: 32, title: 'Upsell/Cross-sell', icon: 'mdi-trending-up', color: '#3b82f6' },
        { id: 33, title: 'Advocacy', icon: 'mdi-account-star', color: '#fbbf24' }
      ]
    }
  ],
  'cxa-ultimate': [
    {
      id: 1,
      title: 'Customer Intelligence',
      icon: 'mdi-brain',
      color: '#10b981',
      children: [
        { id: 11, title: 'Journey Mapping', icon: 'mdi-map', color: '#3b82f6' },
        { id: 12, title: 'Behavioral Analytics', icon: 'mdi-chart-timeline-variant', color: '#10b981' },
        { id: 13, title: 'Predictive Scoring', icon: 'mdi-crystal-ball', color: '#8b5cf6' }
      ]
    },
    {
      id: 2,
      title: 'Automation Engine',
      icon: 'mdi-robot',
      color: '#3b82f6',
      children: [
        { id: 21, title: 'Trigger-based Actions', icon: 'mdi-lightning-bolt', color: '#f59e0b' },
        { id: 22, title: 'Personalization', icon: 'mdi-account-cog', color: '#10b981' },
        { id: 23, title: 'Multi-channel Sync', icon: 'mdi-sync', color: '#06b6d4' }
      ]
    },
    {
      id: 3,
      title: 'Experience Optimization',
      icon: 'mdi-star',
      color: '#f59e0b',
      children: [
        { id: 31, title: 'A/B Testing', icon: 'mdi-test-tube', color: '#8b5cf6' },
        { id: 32, title: 'Real-time Feedback', icon: 'mdi-message-fast', color: '#10b981' },
        { id: 33, title: 'Continuous Learning', icon: 'mdi-school', color: '#3b82f6' }
      ]
    }
  ],
  'analytics-overview': [
    {
      id: 1,
      title: 'Data Collection',
      icon: 'mdi-database',
      color: '#10b981',
      children: [
        { id: 11, title: 'Event Tracking', icon: 'mdi-cursor-default-click', color: '#3b82f6' },
        { id: 12, title: 'User Properties', icon: 'mdi-account-details', color: '#10b981' },
        { id: 13, title: 'Custom Metrics', icon: 'mdi-chart-box', color: '#f59e0b' }
      ]
    },
    {
      id: 2,
      title: 'Analysis & Insights',
      icon: 'mdi-chart-line',
      color: '#3b82f6',
      children: [
        { id: 21, title: 'Cohort Analysis', icon: 'mdi-group', color: '#8b5cf6' },
        { id: 22, title: 'Funnel Analysis', icon: 'mdi-filter-variant', color: '#06b6d4' },
        { id: 23, title: 'Attribution', icon: 'mdi-source-branch', color: '#10b981' }
      ]
    }
  ],
  'funnel-builder': [
    {
      id: 1,
      title: 'Funnel Design',
      icon: 'mdi-draw',
      color: '#10b981',
      children: [
        { id: 11, title: 'Stage Definition', icon: 'mdi-stairs', color: '#3b82f6' },
        { id: 12, title: 'Conversion Goals', icon: 'mdi-target', color: '#10b981' },
        { id: 13, title: 'Flow Logic', icon: 'mdi-sitemap', color: '#f59e0b' }
      ]
    },
    {
      id: 2,
      title: 'Optimization',
      icon: 'mdi-tune',
      color: '#3b82f6',
      children: [
        { id: 21, title: 'A/B Testing', icon: 'mdi-test-tube', color: '#8b5cf6' },
        { id: 22, title: 'Drop-off Analysis', icon: 'mdi-chart-waterfall', color: '#ef4444' },
        { id: 23, title: 'Performance Metrics', icon: 'mdi-speedometer', color: '#10b981' }
      ]
    }
  ],
  'mobile-interface': [
    {
      id: 1,
      title: 'Mobile UX',
      icon: 'mdi-cellphone',
      color: '#10b981',
      children: [
        { id: 11, title: 'Touch Optimization', icon: 'mdi-gesture-tap', color: '#3b82f6' },
        { id: 12, title: 'Responsive Design', icon: 'mdi-responsive', color: '#10b981' },
        { id: 13, title: 'Performance', icon: 'mdi-speedometer', color: '#f59e0b' }
      ]
    },
    {
      id: 2,
      title: 'Mobile Features',
      icon: 'mdi-feature-search',
      color: '#3b82f6',
      children: [
        { id: 21, title: 'Push Notifications', icon: 'mdi-bell', color: '#8b5cf6' },
        { id: 22, title: 'Offline Support', icon: 'mdi-cloud-off', color: '#6b7280' },
        { id: 23, title: 'Native Integration', icon: 'mdi-cellphone-link', color: '#10b981' }
      ]
    }
  ]
}

const currentLogicTree = computed(() => logicTrees[props.experimentType] || [])

// Concepts Data
const conceptsData = {
  'cxa-dashboard': [
    {
      id: 1,
      title: 'Customer Acquisition Cost (CAC)',
      icon: 'mdi-currency-usd',
      color: '#ef4444',
      description: 'Quanto custa para adquirir um novo cliente, incluindo todos os custos de marketing e vendas.',
      importance: 'Métrica fundamental para sustentabilidade do negócio',
      application: 'CAC deve ser < 1/3 do LTV para negócio saudável'
    },
    {
      id: 2,
      title: 'Lifetime Value (LTV)',
      icon: 'mdi-chart-timeline-variant',
      color: '#10b981',
      description: 'Valor total que um cliente gera durante todo o relacionamento com a empresa.',
      importance: 'Determina quanto investir em aquisição e retenção',
      application: 'LTV deve ser > 3x CAC para ROI sustentável'
    },
    {
      id: 3,
      title: 'Churn Rate',
      icon: 'mdi-account-minus',
      color: '#f59e0b',
      description: 'Percentual de clientes que cancelam ou param de comprar em um período.',
      importance: 'Impacta diretamente na receita recorrente',
      application: 'Churn < 5% mensal é considerado saudável para SaaS'
    },
    {
      id: 4,
      title: 'Net Revenue Retention (NRR)',
      icon: 'mdi-trending-up',
      color: '#3b82f6',
      description: 'Mede o crescimento da receita dos clientes existentes, incluindo expansão e churn.',
      importance: 'NRR > 100% indica crescimento orgânico da base',
      application: 'NRR > 110% é excelente para empresas SaaS'
    }
  ],
  'cxa-ultimate': [
    {
      id: 1,
      title: 'Customer Experience (CX)',
      icon: 'mdi-heart-outline',
      color: '#8b5cf6',
      description: 'Soma de todas as interações que o cliente tem com a marca.',
      importance: 'CX superior = maior retenção e indicações',
      application: 'Mapear todos os pontos de contato e otimizar cada um'
    },
    {
      id: 2,
      title: 'Customer Journey',
      icon: 'mdi-map-marker-path',
      color: '#10b981',
      description: 'Caminho completo que o cliente percorre desde o primeiro contato até se tornar advogado da marca.',
      importance: 'Entender a jornada permite otimizar cada touchpoint',
      application: 'Mapear awareness → consideration → purchase → retention → advocacy'
    },
    {
      id: 3,
      title: 'Behavioral Triggers',
      icon: 'mdi-lightning-bolt',
      color: '#f59e0b',
      description: 'Ações ou eventos que indicam intenção, interesse ou risco do cliente.',
      importance: 'Permite automação inteligente e personalizada',
      application: 'Ex: 3 emails abertos sem clique = interessado mas indeciso'
    },
    {
      id: 4,
      title: 'Predictive Analytics',
      icon: 'mdi-crystal-ball',
      color: '#3b82f6',
      description: 'Uso de dados históricos e ML para prever comportamentos futuros.',
      importance: 'Antecipa problemas e oportunidades',
      application: 'Identificar clientes em risco de churn antes que cancelem'
    }
  ],
  'analytics-overview': [
    {
      id: 1,
      title: 'Key Performance Indicators (KPIs)',
      icon: 'mdi-speedometer',
      color: '#10b981',
      description: 'Métricas essenciais que indicam o desempenho do negócio.',
      importance: 'Direcionam decisões estratégicas baseadas em dados',
      application: 'Definir 3-5 KPIs principais por área de negócio'
    },
    {
      id: 2,
      title: 'Cohort Analysis',
      icon: 'mdi-group',
      color: '#3b82f6',
      description: 'Análise de grupos de usuários com características similares ao longo do tempo.',
      importance: 'Revela padrões de comportamento e retenção',
      application: 'Comparar cohorts por canal de aquisição ou período'
    },
    {
      id: 3,
      title: 'Attribution Modeling',
      icon: 'mdi-source-branch',
      color: '#f59e0b',
      description: 'Determina qual canal/touchpoint merece crédito pela conversão.',
      importance: 'Otimiza investimento em canais de marketing',
      application: 'First-touch, last-touch, ou multi-touch attribution'
    }
  ],
  'funnel-builder': [
    {
      id: 1,
      title: 'Conversion Funnel',
      icon: 'mdi-filter-variant',
      color: '#10b981',
      description: 'Representação visual do caminho que usuários percorrem até converter.',
      importance: 'Identifica gargalos e oportunidades de otimização',
      application: 'Cada etapa deve ter taxa de conversão > 20%'
    },
    {
      id: 2,
      title: 'Drop-off Analysis',
      icon: 'mdi-chart-waterfall',
      color: '#ef4444',
      description: 'Análise de onde e por que usuários abandonam o funil.',
      importance: 'Maior impacto na conversão geral',
      application: 'Focar na etapa com maior volume de drop-off'
    },
    {
      id: 3,
      title: 'A/B Testing',
      icon: 'mdi-test-tube',
      color: '#8b5cf6',
      description: 'Teste de duas versões para determinar qual performa melhor.',
      importance: 'Validação científica de hipóteses de otimização',
      application: 'Testar uma variável por vez com significância estatística'
    }
  ],
  'mobile-interface': [
    {
      id: 1,
      title: 'Mobile-First Design',
      icon: 'mdi-cellphone',
      color: '#10b981',
      description: 'Abordagem que prioriza a experiência mobile antes do desktop.',
      importance: '60%+ do tráfego web é mobile',
      application: 'Projetar para tela pequena primeiro, depois expandir'
    },
    {
      id: 2,
      title: 'Touch Interface',
      icon: 'mdi-gesture-tap',
      color: '#3b82f6',
      description: 'Interface otimizada para interação por toque.',
      importance: 'Melhora usabilidade e reduz erros',
      application: 'Botões mínimo 44px, espaçamento adequado'
    },
    {
      id: 3,
      title: 'Progressive Web App (PWA)',
      icon: 'mdi-web',
      color: '#f59e0b',
      description: 'Web app com funcionalidades nativas como offline e push.',
      importance: 'Experiência app-like sem instalação',
      application: 'Service workers + manifest + HTTPS'
    }
  ]
}

const currentConcepts = computed(() => conceptsData[props.experimentType] || [])

// Knowledge Pills Data
const knowledgeData = {
  'cxa-dashboard': [
    {
      id: 1,
      title: 'Funil de Conversão',
      icon: 'mdi-chart-line',
      color: '#10b981',
      what: 'Visualização do caminho que o cliente percorre até comprar.',
      why: 'Cada etapa tem uma "taxa de vazamento". Identificar onde mais pessoas desistem permite focar esforços no ponto certo.',
      tip: 'Se a conversão Lead→MQL está baixa, o problema é qualificação. Se SQL→Fechado está baixa, é vendas.'
    },
    {
      id: 2,
      title: 'Cobertura de Pipeline',
      icon: 'mdi-chart-timeline-variant',
      color: '#3b82f6',
      what: 'Relação entre o valor do pipeline e a meta de receita.',
      why: 'Pipeline insuficiente = meta impossível. Cobertura baixa indica problema na geração de oportunidades.',
      tip: 'Mantenha cobertura de 3-4x a meta. Se está baixo, foque em geração de leads qualificados.'
    },
    {
      id: 3,
      title: 'CAC Payback Period',
      icon: 'mdi-clock-outline',
      color: '#f59e0b',
      what: 'Tempo necessário para recuperar o investimento em aquisição de cliente.',
      why: 'Payback longo = fluxo de caixa apertado. Payback curto = crescimento sustentável.',
      tip: 'Meta: < 12 meses para B2B, < 6 meses para B2C. Otimize LTV e reduza CAC.'
    },
    {
      id: 4,
      title: 'Análise de Cohort',
      icon: 'mdi-group',
      color: '#8b5cf6',
      what: 'Acompanha grupos de clientes adquiridos no mesmo período ao longo do tempo.',
      why: 'Revela se melhorias no produto/processo realmente impactam retenção.',
      tip: 'Compare cohorts por canal de aquisição. Canal com melhor retenção merece mais investimento.'
    }
  ],
  'cxa-ultimate': [
    {
      id: 1,
      title: 'Automação Inteligente',
      icon: 'mdi-robot',
      color: '#10b981',
      what: 'Sistema que toma decisões baseadas em comportamento do cliente, não apenas tempo.',
      why: 'Cada cliente é único. Automação por comportamento converte 5x mais que por tempo.',
      tip: 'Se abriu 3 emails mas não clicou = interessado mas indeciso. Mude a abordagem.'
    },
    {
      id: 2,
      title: 'Customer Health Score',
      icon: 'mdi-heart-pulse',
      color: '#ef4444',
      what: 'Métrica composta que indica a "saúde" do relacionamento com o cliente.',
      why: 'Permite ação proativa antes do cliente demonstrar insatisfação ou cancelar.',
      tip: 'Combine usage, engagement, support tickets e NPS. Score baixo = intervenção imediata.'
    },
    {
      id: 3,
      title: 'Jornada Omnichannel',
      icon: 'mdi-map-marker-path',
      color: '#3b82f6',
      what: 'Experiência consistente e conectada em todos os pontos de contato.',
      why: 'Clientes usam múltiplos canais. Experiência fragmentada = frustração e churn.',
      tip: 'Contexto deve seguir o cliente: se começou no WhatsApp, continue a conversa no email.'
    },
    {
      id: 4,
      title: 'Predictive Churn',
      icon: 'mdi-crystal-ball',
      color: '#f59e0b',
      what: 'Modelo que identifica clientes com alta probabilidade de cancelar.',
      why: 'Reter cliente existente custa 5x menos que adquirir novo.',
      tip: 'Sinais: redução de uso, aumento de tickets, NPS baixo. Aja com 30-60 dias de antecedência.'
    }
  ],
  'analytics-overview': [
    {
      id: 1,
      title: 'North Star Metric',
      icon: 'mdi-star',
      color: '#fbbf24',
      what: 'A métrica mais importante que reflete o valor entregue aos clientes.',
      why: 'Alinha toda a empresa em torno de um objetivo comum e mensurável.',
      tip: 'Deve conectar valor do cliente com crescimento do negócio. Ex: usuários ativos mensais.'
    },
    {
      id: 2,
      title: 'Data Storytelling',
      icon: 'mdi-book-open-variant',
      color: '#10b981',
      what: 'Arte de comunicar insights através de narrativa com dados.',
      why: 'Dados sem contexto não geram ação. História + dados = decisões melhores.',
      tip: 'Estrutura: Contexto → Conflito → Resolução. Use visualizações que suportem a narrativa.'
    },
    {
      id: 3,
      title: 'Real-time Analytics',
      icon: 'mdi-clock-fast',
      color: '#3b82f6',
      what: 'Análise de dados em tempo real ou quase real.',
      why: 'Permite reação imediata a problemas e oportunidades.',
      tip: 'Use para alertas críticos. Nem tudo precisa ser real-time - balance custo vs valor.'
    }
  ],
  'funnel-builder': [
    {
      id: 1,
      title: 'Micro-conversões',
      icon: 'mdi-stairs',
      color: '#10b981',
      what: 'Pequenas ações que indicam progresso em direção à conversão principal.',
      why: 'Otimizar micro-conversões melhora a conversão geral do funil.',
      tip: 'Ex: download de material → cadastro → demo → proposta → fechamento.'
    },
    {
      id: 2,
      title: 'Friction Points',
      icon: 'mdi-alert-circle',
      color: '#ef4444',
      what: 'Pontos no funil onde usuários encontram dificuldades ou resistência.',
      why: 'Remover friction pode dobrar a conversão sem aumentar tráfego.',
      tip: 'Use heatmaps, session recordings e testes de usabilidade para identificar.'
    },
    {
      id: 3,
      title: 'Progressive Profiling',
      icon: 'mdi-account-plus',
      color: '#3b82f6',
      what: 'Coletar informações do usuário gradualmente ao longo do funil.',
      why: 'Formulários longos assustam. Informações graduais mantêm conversão alta.',
      tip: 'Comece com email. A cada interação, peça 1-2 campos adicionais.'
    }
  ],
  'mobile-interface': [
    {
      id: 1,
      title: 'Thumb-friendly Design',
      icon: 'mdi-hand-pointing-up',
      color: '#10b981',
      what: 'Interface otimizada para uso com polegar em dispositivos móveis.',
      why: '75% dos usuários mobile usam apenas o polegar para navegar.',
      tip: 'Elementos importantes na parte inferior. Evite cantos superiores distantes.'
    },
    {
      id: 2,
      title: 'Performance Budget',
      icon: 'mdi-speedometer',
      color: '#f59e0b',
      what: 'Limite de recursos (tamanho, requests) para manter performance.',
      why: '1 segundo de delay = 7% menos conversões. Mobile é mais sensível.',
      tip: 'Meta: < 3s para carregar, < 100KB crítico, < 50 requests iniciais.'
    },
    {
      id: 3,
      title: 'Offline-first Strategy',
      icon: 'mdi-cloud-off',
      color: '#6b7280',
      what: 'Projetar assumindo que conexão será instável ou inexistente.',
      why: 'Conexão mobile é imprevisível. Offline-first = experiência robusta.',
      tip: 'Cache conteúdo crítico, sincronize quando possível, feedback claro do status.'
    }
  ]
}

const currentKnowledge = computed(() => knowledgeData[props.experimentType] || [])

// Checklist Data
const checklistData = {
  'cxa-dashboard': [
    {
      id: 1,
      title: 'Tracking de Conversões Configurado',
      description: 'Google Analytics, Facebook Pixel e outras ferramentas instaladas corretamente',
      priority: 'high',
      impact: 95,
      checked: false
    },
    {
      id: 2,
      title: 'Funis de Conversão Definidos',
      description: 'Etapas claras do lead até cliente, com critérios de passagem entre estágios',
      priority: 'high',
      impact: 90,
      checked: false
    },
    {
      id: 3,
      title: 'Dashboards de KPIs Criados',
      description: 'Painéis com métricas principais atualizados em tempo real',
      priority: 'high',
      impact: 85,
      checked: false
    },
    {
      id: 4,
      title: 'Alertas de Performance Configurados',
      description: 'Notificações automáticas quando métricas saem do padrão',
      priority: 'medium',
      impact: 75,
      checked: false
    },
    {
      id: 5,
      title: 'Análise de Cohort Implementada',
      description: 'Acompanhamento de grupos de clientes ao longo do tempo',
      priority: 'medium',
      impact: 70,
      checked: false
    },
    {
      id: 6,
      title: 'Attribution Modeling Configurado',
      description: 'Modelo de atribuição para entender contribuição de cada canal',
      priority: 'low',
      impact: 60,
      checked: false
    }
  ],
  'cxa-ultimate': [
    {
      id: 1,
      title: 'Customer Journey Mapeado',
      description: 'Todos os pontos de contato identificados e otimizados',
      priority: 'high',
      impact: 95,
      checked: false
    },
    {
      id: 2,
      title: 'Behavioral Triggers Definidos',
      description: 'Ações que disparam automações baseadas em comportamento',
      priority: 'high',
      impact: 90,
      checked: false
    },
    {
      id: 3,
      title: 'Customer Health Score Implementado',
      description: 'Métrica composta para avaliar saúde do relacionamento',
      priority: 'high',
      impact: 88,
      checked: false
    },
    {
      id: 4,
      title: 'Automações Inteligentes Ativas',
      description: 'Fluxos automatizados baseados em comportamento e contexto',
      priority: 'high',
      impact: 85,
      checked: false
    },
    {
      id: 5,
      title: 'Predictive Analytics Configurado',
      description: 'Modelos para prever churn, upsell e lifetime value',
      priority: 'medium',
      impact: 80,
      checked: false
    },
    {
      id: 6,
      title: 'Omnichannel Sync Implementado',
      description: 'Contexto do cliente sincronizado entre todos os canais',
      priority: 'medium',
      impact: 75,
      checked: false
    },
    {
      id: 7,
      title: 'Real-time Personalization Ativa',
      description: 'Personalização dinâmica baseada em comportamento atual',
      priority: 'low',
      impact: 65,
      checked: false
    }
  ],
  'analytics-overview': [
    {
      id: 1,
      title: 'Data Warehouse Configurado',
      description: 'Repositório central de dados com ETL/ELT implementado',
      priority: 'high',
      impact: 95,
      checked: false
    },
    {
      id: 2,
      title: 'North Star Metric Definida',
      description: 'Métrica principal que guia todas as decisões da empresa',
      priority: 'high',
      impact: 90,
      checked: false
    },
    {
      id: 3,
      title: 'Dashboards Executivos Criados',
      description: 'Painéis com KPIs principais para liderança',
      priority: 'high',
      impact: 85,
      checked: false
    },
    {
      id: 4,
      title: 'Data Governance Implementada',
      description: 'Políticas de qualidade, privacidade e acesso aos dados',
      priority: 'medium',
      impact: 80,
      checked: false
    },
    {
      id: 5,
      title: 'Self-service Analytics Disponível',
      description: 'Ferramentas para equipes criarem suas próprias análises',
      priority: 'medium',
      impact: 70,
      checked: false
    },
    {
      id: 6,
      title: 'Machine Learning Pipeline Ativo',
      description: 'Modelos automatizados para insights preditivos',
      priority: 'low',
      impact: 65,
      checked: false
    }
  ],
  'funnel-builder': [
    {
      id: 1,
      title: 'Funis Principais Mapeados',
      description: 'Jornadas críticas do usuário identificadas e documentadas',
      priority: 'high',
      impact: 95,
      checked: false
    },
    {
      id: 2,
      title: 'Event Tracking Implementado',
      description: 'Eventos de cada etapa do funil sendo capturados',
      priority: 'high',
      impact: 90,
      checked: false
    },
    {
      id: 3,
      title: 'A/B Testing Framework Ativo',
      description: 'Sistema para testar variações de cada etapa',
      priority: 'high',
      impact: 85,
      checked: false
    },
    {
      id: 4,
      title: 'Drop-off Analysis Configurada',
      description: 'Análise automática de onde usuários abandonam',
      priority: 'medium',
      impact: 80,
      checked: false
    },
    {
      id: 5,
      title: 'Cohort Funnel Analysis',
      description: 'Análise de funis por segmentos de usuários',
      priority: 'medium',
      impact: 75,
      checked: false
    },
    {
      id: 6,
      title: 'Automated Optimization',
      description: 'Otimização automática baseada em performance',
      priority: 'low',
      impact: 60,
      checked: false
    }
  ],
  'mobile-interface': [
    {
      id: 1,
      title: 'Responsive Design Implementado',
      description: 'Interface adaptável para todos os tamanhos de tela',
      priority: 'high',
      impact: 95,
      checked: false
    },
    {
      id: 2,
      title: 'Performance Mobile Otimizada',
      description: 'Carregamento < 3s em conexões 3G',
      priority: 'high',
      impact: 90,
      checked: false
    },
    {
      id: 3,
      title: 'Touch Interface Otimizada',
      description: 'Elementos com tamanho adequado para toque',
      priority: 'high',
      impact: 85,
      checked: false
    },
    {
      id: 4,
      title: 'PWA Implementado',
      description: 'Progressive Web App com funcionalidades offline',
      priority: 'medium',
      impact: 80,
      checked: false
    },
    {
      id: 5,
      title: 'Push Notifications Configuradas',
      description: 'Sistema de notificações push para engajamento',
      priority: 'medium',
      impact: 70,
      checked: false
    },
    {
      id: 6,
      title: 'Mobile Analytics Implementado',
      description: 'Tracking específico para comportamento mobile',
      priority: 'low',
      impact: 65,
      checked: false
    }
  ]
}

const currentChecklist = computed(() => checklistData[props.experimentType] || [])

// Carousel Controls
const nextStrategy = () => {
  if (carouselOffset.value < maxCarouselOffset.value) {
    carouselOffset.value = Math.min(carouselOffset.value + cardWidth, maxCarouselOffset.value)
  }
}

const prevStrategy = () => {
  if (carouselOffset.value > 0) {
    carouselOffset.value = Math.max(carouselOffset.value - cardWidth, 0)
  }
}
</script>

<style scoped>
/* Knowledge System 360° */
.knowledge-system {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1));
  border-top: 2px solid rgba(251, 191, 36, 0.3);
  padding: 40px 24px;
  margin-top: 40px;
}

.knowledge-header {
  text-align: center;
  margin-bottom: 24px;
  position: relative;
}

.knowledge-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(251, 191, 36, 0.8);
  margin: 0 0 4px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.knowledge-subtitle {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 16px 0;
}

.knowledge-icon {
  display: none;
}

.experiment-name {
  font-size: 2.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.2;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
  50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.6); }
}

/* Futuristic Tabs */
.futuristic-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 32px 0;
  padding: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  border: 1px solid rgba(0, 255, 136, 0.2);
}

.tab-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  overflow: hidden;
}

.tab-item:hover {
  background: rgba(0, 255, 136, 0.1);
  border-color: rgba(0, 255, 136, 0.3);
  color: #00ff88;
  transform: translateY(-2px);
}

.tab-item.active {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 123, 255, 0.2));
  border-color: #00ff88;
  color: #00ff88;
  box-shadow: 0 8px 25px rgba(0, 255, 136, 0.3);
}

.tab-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tab-item.active .tab-glow {
  opacity: 1;
  animation: glow-sweep 2s ease-in-out infinite;
}

@keyframes glow-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Tab Content */
.tab-content {
  min-height: 400px;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Logic Tree */
.logic-tree {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.tree-container {
  max-width: 800px;
  width: 100%;
}

.tree-node {
  position: relative;
}

.tree-node.root .node-content {
  background: linear-gradient(135deg, #00ff88, #007bff);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  margin-bottom: 30px;
  box-shadow: 0 8px 25px rgba(0, 255, 136, 0.3);
}

.tree-branches {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.branch {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.branch-line {
  width: 2px;
  height: 30px;
  background: linear-gradient(180deg, #00ff88, rgba(0, 255, 136, 0.3));
  margin-bottom: 10px;
}

.tree-node:not(.root) .node-content {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.tree-node:not(.root):hover .node-content {
  background: rgba(0, 255, 136, 0.2);
  border-color: #00ff88;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.2);
}

.sub-branches {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.sub-branch {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sub-line {
  width: 20px;
  height: 1px;
  background: rgba(0, 255, 136, 0.5);
}

.tree-node.small .node-content {
  padding: 8px 12px;
  font-size: 0.8rem;
  margin-bottom: 0;
}

/* Concepts Grid */
.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.concept-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(0, 255, 136, 0.2);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.concept-card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(0, 255, 136, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 255, 136, 0.2);
}

.concept-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.concept-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #00ff88;
  margin: 0;
}

.concept-description {
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 16px;
}

.concept-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.detail-item strong {
  color: #fbbf24;
}

/* Strategies Carousel */
.strategies-carousel {
  position: relative;
  padding: 20px 0;
}

.carousel-container {
  overflow: hidden;
  border-radius: 12px;
}

.carousel-track {
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease;
  padding: 10px;
}

.strategy-card {
  min-width: 350px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
}

.strategy-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
}

.strategy-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.strategy-header h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fbbf24;
  margin: 0;
}

.strategy-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.strategy-section {
  margin-bottom: 8px;
}

.strategy-section h5 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fbbf24;
  margin: 0 0 4px 0;
  display: flex;
  align-items: center;
  gap: 4px;
}

.strategy-section p {
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}

.strategy-section.golden {
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  padding: 12px;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

/* Checklist */
.checklist-container {
  padding: 20px 0;
}

.checklist-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  justify-content: center;
}

.checklist-header h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ff6b35;
  margin: 0;
}

.checklist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 16px;
}

.factor-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.factor-card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 107, 53, 0.4);
  transform: translateY(-2px);
}

.factor-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.factor-info {
  flex: 1;
}

.factor-info h5 {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 4px 0;
}

.priority {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}

.priority.high {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

.priority.medium {
  background: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
}

.priority.low {
  background: rgba(107, 114, 128, 0.2);
  color: #d1d5db;
}

.factor-description {
  font-size: 0.9rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
}

.factor-impact {
  display: flex;
  align-items: center;
  gap: 8px;
}

.impact-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  min-width: 50px;
}

.impact-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.impact-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff6b35, #f59e0b);
  transition: width 0.3s ease;
}

.impact-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: #ff6b35;
  min-width: 35px;
  text-align: right;
}

/* Responsive */
@media (max-width: 768px) {
  .futuristic-tabs {
    flex-wrap: wrap;
    gap: 6px;
  }
  
  .tab-item {
    padding: 10px 16px;
    font-size: 0.8rem;
  }
  
  .tree-branches {
    flex-direction: column;
    gap: 16px;
  }
  
  .concepts-grid {
    grid-template-columns: 1fr;
  }
  
  .strategy-card {
    min-width: 300px;
  }
  
  .checklist-grid {
    grid-template-columns: 1fr;
  }
}
</style>