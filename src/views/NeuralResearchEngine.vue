<template>
  <div class="neural-research">
    <!-- Header -->
    <div class="research-header">
      <div class="breadcrumb-nav">
        <button class="breadcrumb-btn" @click="$router.push('/labs')">
          <v-icon size="16">mdi-arrow-left</v-icon>
          HIBRIT Labs
        </button>
        <v-icon size="12" color="#9ca3af">mdi-chevron-right</v-icon>
        <span class="breadcrumb-current">Neural Research Engine</span>
      </div>
      
      <div class="research-hero">
        <div class="hero-particles"></div>
        <div class="hero-content">
          <div class="hero-badge">
            <v-icon size="20" color="#fbbf24">mdi-brain</v-icon>
            <span>CENTRO DE INTELIGÊNCIA</span>
          </div>
          
          <h1 class="hero-title">
            <span class="title-neural">NEURAL RESEARCH</span>
            <span class="title-engine">ENGINE</span>
          </h1>
          
          <p class="hero-description">
            Sistema avançado de absorção e produção de conhecimento científico aplicado ao marketing digital
          </p>
          
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">5</span>
              <span class="stat-label">Áreas de Pesquisa</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">360°</span>
              <span class="stat-label">Cobertura Total</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">4</span>
              <span class="stat-label">Camadas de Aprendizado</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Neural Knowledge Network -->
    <div class="neural-network">
      <div class="network-header">
        <h2>Rede Neural de Conhecimento</h2>
        <p>Mapeamento científico interativo com conexões sinápticas entre conceitos</p>
        <div class="network-controls">
          <button class="control-btn" :class="{ active: viewMode === 'domains' }" @click="viewMode = 'domains'">
            <v-icon size="16">mdi-view-grid</v-icon>
            Domínios
          </button>
          <button class="control-btn" :class="{ active: viewMode === 'neural' }" @click="viewMode = 'neural'">
            <v-icon size="16">mdi-brain</v-icon>
            Rede Neural
          </button>
          <button class="control-btn" :class="{ active: viewMode === 'classroom' }" @click="viewMode = 'classroom'">
            <v-icon size="16">mdi-school</v-icon>
            Sala de Aula
          </button>
        </div>
      </div>

      <!-- Domains View -->
      <div v-if="viewMode === 'domains'" class="domains-view">
        <div class="domain-grid">
        <div class="domain-card cxa-dashboard">
          <div class="domain-header">
            <div class="domain-icon">
              <v-icon size="24" color="#10b981">mdi-monitor-dashboard</v-icon>
            </div>
            <h3>CXA Dashboard</h3>
            <div class="domain-status active"></div>
          </div>
          <div class="domain-content">
            <div class="experiment-preview">
              <div class="preview-title">🎯 Funis & Receita</div>
              <div class="preview-description">Dashboard completo para análise de aquisição, conversão e retenção com KPIs críticos e alertas de SLA</div>
              <div class="preview-features">
                <div class="feature-item">
                  <v-icon size="12" color="#10b981">mdi-chart-bar</v-icon>
                  <span>Aquisição por Canal</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#10b981">mdi-filter-variant</v-icon>
                  <span>Funil de Conversão</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#10b981">mdi-trending-up</v-icon>
                  <span>NRR & Churn Analysis</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#10b981">mdi-alert</v-icon>
                  <span>Alertas & SLAs</span>
                </div>
              </div>
            </div>
            <div class="knowledge-layers">
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-sitemap</v-icon>
                <span>Lógica</span>
                <div class="layer-topics">
                  <span>Aquisição de Leads</span>
                  <span>Conversão & Vendas</span>
                  <span>Retenção & Expansão</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-book-open</v-icon>
                <span>Conceitos</span>
                <div class="layer-topics">
                  <span>CAC (Customer Acquisition Cost)</span>
                  <span>LTV (Lifetime Value)</span>
                  <span>NRR (Net Revenue Retention)</span>
                  <span>Churn Rate</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-lightbulb</v-icon>
                <span>Estratégias</span>
                <div class="layer-topics">
                  <span>Funil de Conversão</span>
                  <span>Cobertura de Pipeline</span>
                  <span>CAC Payback Period</span>
                  <span>Análise de Cohort</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-clipboard-check</v-icon>
                <span>Checklist</span>
                <div class="layer-topics">
                  <span>6 Fatores Críticos</span>
                  <span>Tracking Configurado</span>
                  <span>Dashboards Ativos</span>
                </div>
              </div>
            </div>
          </div>
          <div class="domain-footer">
            <button class="access-btn" @click="$router.push('/labs/cxa-dashboard')">
              <v-icon size="16">mdi-play</v-icon>
              Acessar Experimento
            </button>
          </div>
        </div>
        
        <div class="domain-card cxa-ultimate">
          <div class="domain-header">
            <div class="domain-icon">
              <v-icon size="24" color="#007bff">mdi-rocket-launch</v-icon>
            </div>
            <h3>CXA Ultimate</h3>
            <div class="domain-status active"></div>
          </div>
          <div class="domain-content">
            <div class="experiment-preview">
              <div class="preview-title">🚀 Intelligence & Automation</div>
              <div class="preview-description">Sistema avançado de customer experience com automação inteligente e análise preditiva</div>
              <div class="preview-features">
                <div class="feature-item">
                  <v-icon size="12" color="#007bff">mdi-brain</v-icon>
                  <span>Health Score</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#007bff">mdi-robot</v-icon>
                  <span>Automação Inteligente</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#007bff">mdi-chart-timeline-variant</v-icon>
                  <span>Journey Mapping</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#007bff">mdi-crystal-ball</v-icon>
                  <span>Churn Prediction</span>
                </div>
              </div>
            </div>
            <div class="knowledge-layers">
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-sitemap</v-icon>
                <span>Lógica</span>
                <div class="layer-topics">
                  <span>Customer Intelligence</span>
                  <span>Automation Engine</span>
                  <span>Experience Optimization</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-book-open</v-icon>
                <span>Conceitos</span>
                <div class="layer-topics">
                  <span>Customer Experience (CX)</span>
                  <span>Customer Journey</span>
                  <span>Behavioral Triggers</span>
                  <span>Predictive Analytics</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-lightbulb</v-icon>
                <span>Estratégias</span>
                <div class="layer-topics">
                  <span>Automação Inteligente</span>
                  <span>Customer Health Score</span>
                  <span>Jornada Omnichannel</span>
                  <span>Predictive Churn</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-clipboard-check</v-icon>
                <span>Checklist</span>
                <div class="layer-topics">
                  <span>7 Fatores Críticos</span>
                  <span>Journey Mapeado</span>
                  <span>Health Score Ativo</span>
                </div>
              </div>
            </div>
          </div>
          <div class="domain-footer">
            <button class="access-btn" @click="$router.push('/labs/cxa-ultimate')">
              <v-icon size="16">mdi-play</v-icon>
              Acessar Experimento
            </button>
          </div>
        </div>
        
        <div class="domain-card analytics">
          <div class="domain-header">
            <div class="domain-icon">
              <v-icon size="24" color="#f59e0b">mdi-chart-line</v-icon>
            </div>
            <h3>Analytics Overview</h3>
            <div class="domain-status active"></div>
          </div>
          <div class="domain-content">
            <div class="experiment-preview">
              <div class="preview-title">📊 Data & Insights</div>
              <div class="preview-description">Visão unificada de métricas com storytelling de dados e análise de cohort avançada</div>
              <div class="preview-features">
                <div class="feature-item">
                  <v-icon size="12" color="#f59e0b">mdi-chart-donut</v-icon>
                  <span>North Star Metrics</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#f59e0b">mdi-account-group</v-icon>
                  <span>Cohort Analysis</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#f59e0b">mdi-book-open-variant</v-icon>
                  <span>Data Storytelling</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#f59e0b">mdi-clock-fast</v-icon>
                  <span>Real-time Insights</span>
                </div>
              </div>
            </div>
            <div class="knowledge-layers">
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-sitemap</v-icon>
                <span>Lógica</span>
                <div class="layer-topics">
                  <span>Data Collection</span>
                  <span>Analysis & Insights</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-book-open</v-icon>
                <span>Conceitos</span>
                <div class="layer-topics">
                  <span>KPIs (Key Performance Indicators)</span>
                  <span>Cohort Analysis</span>
                  <span>Attribution Modeling</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-lightbulb</v-icon>
                <span>Estratégias</span>
                <div class="layer-topics">
                  <span>North Star Metric</span>
                  <span>Data Storytelling</span>
                  <span>Real-time Analytics</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-clipboard-check</v-icon>
                <span>Checklist</span>
                <div class="layer-topics">
                  <span>6 Fatores Críticos</span>
                  <span>Data Warehouse Ativo</span>
                  <span>North Star Definida</span>
                </div>
              </div>
            </div>
          </div>
          <div class="domain-footer">
            <button class="access-btn" @click="$router.push('/labs/analytics-overview')">
              <v-icon size="16">mdi-play</v-icon>
              Acessar Experimento
            </button>
          </div>
        </div>
        
        <div class="domain-card funnel">
          <div class="domain-header">
            <div class="domain-icon">
              <v-icon size="24" color="#8b5cf6">mdi-filter-variant</v-icon>
            </div>
            <h3>Funnel Builder</h3>
            <div class="domain-status active"></div>
          </div>
          <div class="domain-content">
            <div class="experiment-preview">
              <div class="preview-title">🎯 Conversion Design</div>
              <div class="preview-description">Construtor visual de funis com otimização de conversão e análise de friction points</div>
              <div class="preview-features">
                <div class="feature-item">
                  <v-icon size="12" color="#8b5cf6">mdi-vector-polyline</v-icon>
                  <span>Visual Builder</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#8b5cf6">mdi-ab-testing</v-icon>
                  <span>A/B Testing</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#8b5cf6">mdi-speedometer</v-icon>
                  <span>Friction Analysis</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#8b5cf6">mdi-target</v-icon>
                  <span>Micro-conversões</span>
                </div>
              </div>
            </div>
            <div class="knowledge-layers">
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-sitemap</v-icon>
                <span>Lógica</span>
                <div class="layer-topics">
                  <span>Funnel Design</span>
                  <span>Optimization</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-book-open</v-icon>
                <span>Conceitos</span>
                <div class="layer-topics">
                  <span>Conversion Funnel</span>
                  <span>Drop-off Analysis</span>
                  <span>A/B Testing</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-lightbulb</v-icon>
                <span>Estratégias</span>
                <div class="layer-topics">
                  <span>Micro-conversões</span>
                  <span>Friction Points</span>
                  <span>Progressive Profiling</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-clipboard-check</v-icon>
                <span>Checklist</span>
                <div class="layer-topics">
                  <span>6 Fatores Críticos</span>
                  <span>Funis Mapeados</span>
                  <span>A/B Testing Ativo</span>
                </div>
              </div>
            </div>
          </div>
          <div class="domain-footer">
            <button class="access-btn" @click="$router.push('/labs/funnel-builder')">
              <v-icon size="16">mdi-play</v-icon>
              Acessar Experimento
            </button>
          </div>
        </div>
        
        <div class="domain-card mobile">
          <div class="domain-header">
            <div class="domain-icon">
              <v-icon size="24" color="#ef4444">mdi-cellphone</v-icon>
            </div>
            <h3>Mobile Interface</h3>
            <div class="domain-status active"></div>
          </div>
          <div class="domain-content">
            <div class="experiment-preview">
              <div class="preview-title">📱 Mobile-First UX</div>
              <div class="preview-description">Interface otimizada para mobile com PWA features e design thumb-friendly</div>
              <div class="preview-features">
                <div class="feature-item">
                  <v-icon size="12" color="#ef4444">mdi-gesture-tap</v-icon>
                  <span>Touch Optimized</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#ef4444">mdi-application</v-icon>
                  <span>PWA Features</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#ef4444">mdi-speedometer</v-icon>
                  <span>Performance</span>
                </div>
                <div class="feature-item">
                  <v-icon size="12" color="#ef4444">mdi-wifi-off</v-icon>
                  <span>Offline-first</span>
                </div>
              </div>
            </div>
            <div class="knowledge-layers">
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-sitemap</v-icon>
                <span>Lógica</span>
                <div class="layer-topics">
                  <span>Mobile UX</span>
                  <span>Mobile Features</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-book-open</v-icon>
                <span>Conceitos</span>
                <div class="layer-topics">
                  <span>Mobile-First Design</span>
                  <span>Touch Interface</span>
                  <span>Progressive Web App (PWA)</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-lightbulb</v-icon>
                <span>Estratégias</span>
                <div class="layer-topics">
                  <span>Thumb-friendly Design</span>
                  <span>Performance Budget</span>
                  <span>Offline-first Strategy</span>
                </div>
              </div>
              <div class="layer-item">
                <v-icon size="14" color="#fbbf24">mdi-clipboard-check</v-icon>
                <span>Checklist</span>
                <div class="layer-topics">
                  <span>6 Fatores Críticos</span>
                  <span>Responsive Design</span>
                  <span>PWA Implementado</span>
                </div>
              </div>
            </div>
          </div>
          <div class="domain-footer">
            <button class="access-btn" @click="$router.push('/labs/mobile-interface')">
              <v-icon size="16">mdi-play</v-icon>
              Acessar Experimento
            </button>
          </div>
        </div>
        </div>
      </div>

      <!-- Neural Network View -->
      <div v-if="viewMode === 'neural'" class="neural-view">
        <div class="neural-canvas">
          <div class="neural-background"></div>
          <div class="knowledge-nodes">
            <div v-for="node in neuralNodes" :key="node.id" 
                 :class="['knowledge-node', node.type, { active: selectedNode === node.id }]"
                 :style="{ left: node.x + '%', top: node.y + '%' }"
                 @click="selectNode(node.id)">
              <div class="node-core">
                <v-icon :color="node.color" size="20">{{ node.icon }}</v-icon>
              </div>
              <div class="node-label">{{ node.title }}</div>
            </div>
          </div>
          <svg class="neural-connections" viewBox="0 0 1000 600">
            <defs>
              <linearGradient id="synapseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:0.8" />
                <stop offset="50%" style="stop-color:#10b981;stop-opacity:0.6" />
                <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.8" />
              </linearGradient>
            </defs>
            <path v-for="connection in neuralConnections" :key="connection.id"
                  :d="connection.path" 
                  stroke="url(#synapseGradient)" 
                  stroke-width="2" 
                  fill="none"
                  :class="{ active: isConnectionActive(connection) }">
              <animate attributeName="stroke-dasharray" values="0,10;10,0;0,10" dur="3s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
        <div v-if="selectedNode" class="node-details">
          <div class="detail-header">
            <v-icon :color="getNodeById(selectedNode).color" size="24">{{ getNodeById(selectedNode).icon }}</v-icon>
            <h3>{{ getNodeById(selectedNode).title }}</h3>
          </div>
          <div class="detail-content">
            <p>{{ getNodeById(selectedNode).description }}</p>
            <div class="related-concepts">
              <h4>Conceitos Relacionados</h4>
              <div class="concept-tags">
                <span v-for="concept in getNodeById(selectedNode).relatedConcepts" :key="concept" class="concept-tag">
                  {{ concept }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Classroom View -->
      <div v-if="viewMode === 'classroom'" class="classroom-view">
        <div class="classroom-sidebar">
          <div class="curriculum-tree">
            <h3>Currículo Neural</h3>
            <div v-for="module in curriculumModules" :key="module.id" 
                 :class="['module-item', { active: selectedModule === module.id }]"
                 @click="selectedModule = module.id">
              <div class="module-header">
                <v-icon :color="module.color" size="18">{{ module.icon }}</v-icon>
                <span>{{ module.title }}</span>
                <div class="progress-indicator">
                  <div class="progress-fill" :style="{ width: module.progress + '%' }"></div>
                </div>
              </div>
              <div class="module-topics">
                <div v-for="topic in module.topics" :key="topic" class="topic-item">
                  {{ topic }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="classroom-content">
          <div v-if="selectedModule" class="lesson-area">
            <div class="lesson-header">
              <h2>{{ getCurrentModule().title }}</h2>
              <div class="lesson-meta">
                <span class="duration">{{ getCurrentModule().duration }}</span>
                <span class="difficulty">{{ getCurrentModule().difficulty }}</span>
              </div>
            </div>
            
            <!-- Knowledge Layer Tabs -->
            <div class="knowledge-tabs">
              <div 
                v-for="layer in knowledgeLayers" 
                :key="layer"
                :class="['knowledge-tab', { active: activeLayer === layer }]"
                @click="activeLayer = layer"
              >
                <v-icon size="16" :color="activeLayer === layer ? '#fbbf24' : '#666'">
                  {{ layer === 'logic' ? 'mdi-sitemap' : layer === 'concepts' ? 'mdi-book-open' : layer === 'strategies' ? 'mdi-lightbulb' : 'mdi-clipboard-check' }}
                </v-icon>
                <span>{{ layer === 'logic' ? 'Lógica Básica' : layer === 'concepts' ? 'Conceitos Básicos' : layer === 'strategies' ? 'Dicas Estratégicas' : 'Checklist Crítico' }}</span>
              </div>
            </div>
            
            <div class="lesson-content">
              <!-- Logic Tree -->
              <div v-if="activeLayer === 'logic'" class="logic-section">
                <div class="tree-container">
                  <div class="tree-node root">
                    <div class="node-content">
                      <v-icon color="#fbbf24">mdi-sitemap</v-icon>
                      <span>{{ getCurrentModule().title }}</span>
                    </div>
                    <div class="tree-branches">
                      <div v-for="branch in getCurrentLayerData()" :key="branch.id" class="branch">
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
              
              <!-- Concepts Grid -->
              <div v-if="activeLayer === 'concepts'" class="concepts-section">
                <div class="concepts-grid">
                  <div v-for="concept in getCurrentLayerData()" :key="concept.id" class="concept-card">
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
              </div>
              
              <!-- Strategies Carousel -->
              <div v-if="activeLayer === 'strategies'" class="strategies-section">
                <div class="strategies-grid">
                  <div v-for="strategy in getCurrentLayerData()" :key="strategy.id" class="strategy-card">
                    <div class="strategy-header">
                      <v-icon :color="strategy.color" size="24">{{ strategy.icon }}</v-icon>
                      <h4>{{ strategy.title }}</h4>
                    </div>
                    <div class="strategy-content">
                      <div class="strategy-section">
                        <h5>O que é</h5>
                        <p>{{ strategy.what }}</p>
                      </div>
                      <div class="strategy-section">
                        <h5>Por que funciona</h5>
                        <p>{{ strategy.why }}</p>
                      </div>
                      <div class="strategy-section golden">
                        <h5><v-icon color="#FFD700" size="16">mdi-star</v-icon> Dica de ouro</h5>
                        <p>{{ strategy.tip }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Checklist -->
              <div v-if="activeLayer === 'checklist'" class="checklist-section">
                <div class="checklist-header">
                  <v-icon color="#ff6b35">mdi-clipboard-check</v-icon>
                  <h4>Fatores Críticos de Sucesso</h4>
                </div>
                <div class="checklist-grid">
                  <div v-for="factor in getCurrentLayerData()" :key="factor.id" class="factor-card">
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
        </div>
      </div>
    </div>

    <!-- Learning Methodology -->
    <div class="methodology-section">
      <div class="methodology-header">
        <h2>Metodologia de Aprendizado</h2>
        <p>Sistema estruturado em 4 camadas progressivas para absorção completa do conhecimento</p>
      </div>
      
      <div class="methodology-grid">
        <div class="method-card logic">
          <div class="method-icon">
            <v-icon size="32" color="#fbbf24">mdi-sitemap</v-icon>
          </div>
          <h3>1. Lógica Básica</h3>
          <p>Árvore hierárquica com estrutura fundamental e ramificações principais de cada área</p>
          <div class="method-features">
            <span>Estrutura Visual</span>
            <span>Hierarquia Clara</span>
            <span>Conexões Lógicas</span>
          </div>
        </div>
        
        <div class="method-card concepts">
          <div class="method-icon">
            <v-icon size="32" color="#fbbf24">mdi-book-open</v-icon>
          </div>
          <h3>2. Conceitos Básicos</h3>
          <p>Definições essenciais, importância e aplicação prática de cada conceito fundamental</p>
          <div class="method-features">
            <span>Definições Claras</span>
            <span>Importância</span>
            <span>Aplicação Prática</span>
          </div>
        </div>
        
        <div class="method-card strategies">
          <div class="method-icon">
            <v-icon size="32" color="#fbbf24">mdi-lightbulb</v-icon>
          </div>
          <h3>3. Dicas Estratégicas</h3>
          <p>Conhecimento avançado com estratégias práticas e dicas de ouro para implementação</p>
          <div class="method-features">
            <span>Estratégias Avançadas</span>
            <span>Dicas de Ouro</span>
            <span>Implementação</span>
          </div>
        </div>
        
        <div class="method-card checklist">
          <div class="method-icon">
            <v-icon size="32" color="#fbbf24">mdi-clipboard-check</v-icon>
          </div>
          <h3>4. Checklist Crítico</h3>
          <p>Fatores críticos de sucesso com priorização e impacto mensurável para execução</p>
          <div class="method-features">
            <span>Fatores Críticos</span>
            <span>Priorização</span>
            <span>Impacto Mensurável</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Research Stats -->
    <div class="research-stats">
      <div class="stats-header">
        <h2>Estatísticas de Pesquisa</h2>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <v-icon size="24" color="#10b981">mdi-database</v-icon>
          </div>
          <div class="stat-content">
            <span class="stat-number">2,847</span>
            <span class="stat-label">Conceitos Mapeados</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <v-icon size="24" color="#3b82f6">mdi-lightbulb-on</v-icon>
          </div>
          <div class="stat-content">
            <span class="stat-number">1,523</span>
            <span class="stat-label">Estratégias Documentadas</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <v-icon size="24" color="#f59e0b">mdi-clipboard-check</v-icon>
          </div>
          <div class="stat-content">
            <span class="stat-number">347</span>
            <span class="stat-label">Fatores Críticos</span>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">
            <v-icon size="24" color="#8b5cf6">mdi-brain</v-icon>
          </div>
          <div class="stat-content">
            <span class="stat-number">94.7%</span>
            <span class="stat-label">Precisão do Sistema</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// View Mode Control
const viewMode = ref('domains')
const selectedNode = ref(null)
const selectedModule = ref('cxa-dashboard')

// Neural Network Data
const neuralNodes = ref([
  { id: 'acquisition', title: 'Aquisição', type: 'input', x: 15, y: 20, color: '#10b981', icon: 'mdi-magnet', connections: ['conversion', 'analytics'], description: 'Processo de captura de novos leads através de múltiplos canais', relatedConcepts: ['CAC', 'CPL', 'Tráfego', 'Conversão'] },
  { id: 'conversion', title: 'Conversão', type: 'processing', x: 50, y: 15, color: '#3b82f6', icon: 'mdi-chart-line', connections: ['retention', 'analytics'], description: 'Transformação de leads em clientes através do funil de vendas', relatedConcepts: ['Taxa de Conversão', 'Funil', 'Qualificação', 'Fechamento'] },
  { id: 'retention', title: 'Retenção', type: 'output', x: 85, y: 25, color: '#f59e0b', icon: 'mdi-account-heart', connections: ['analytics'], description: 'Manutenção e expansão do relacionamento com clientes existentes', relatedConcepts: ['Churn', 'NRR', 'LTV', 'Upsell'] },
  { id: 'analytics', title: 'Analytics', type: 'central', x: 50, y: 50, color: '#8b5cf6', icon: 'mdi-chart-donut', connections: ['intelligence', 'automation'], description: 'Análise de dados para insights e tomada de decisão', relatedConcepts: ['KPIs', 'Cohort', 'Attribution', 'Dashboards'] },
  { id: 'intelligence', title: 'Intelligence', type: 'processing', x: 25, y: 75, color: '#ef4444', icon: 'mdi-brain', connections: ['automation'], description: 'Inteligência artificial aplicada ao customer experience', relatedConcepts: ['ML', 'Predictive', 'Behavioral', 'Scoring'] },
  { id: 'automation', title: 'Automation', type: 'output', x: 75, y: 80, color: '#06b6d4', icon: 'mdi-robot', connections: [], description: 'Automação inteligente de processos e jornadas', relatedConcepts: ['Triggers', 'Workflows', 'Personalization', 'Omnichannel'] }
])

const neuralConnections = computed(() => [
  { id: 1, path: 'M150,120 Q300,100 500,90', from: 'acquisition', to: 'conversion' },
  { id: 2, path: 'M500,90 Q700,110 850,150', from: 'conversion', to: 'retention' },
  { id: 3, path: 'M500,300 Q400,200 300,120', from: 'analytics', to: 'acquisition' },
  { id: 4, path: 'M500,300 Q600,200 700,150', from: 'analytics', to: 'retention' },
  { id: 5, path: 'M250,450 Q375,375 500,300', from: 'intelligence', to: 'analytics' },
  { id: 6, path: 'M750,480 Q625,390 500,300', from: 'automation', to: 'analytics' },
  { id: 7, path: 'M250,450 Q500,465 750,480', from: 'intelligence', to: 'automation' }
])

// Knowledge Layers
const knowledgeLayers = ref(['logic', 'concepts', 'strategies', 'checklist'])
const activeLayer = ref('logic')

// Complete Knowledge Data
const knowledgeData = {
  'cxa-dashboard': {
    logic: [
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
    concepts: [
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
    strategies: [
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
    checklist: [
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
    ]
  },
  'analytics-overview': {
    logic: [
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
    concepts: [
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
    strategies: [
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
    checklist: [
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
    ]
  },
  'funnel-builder': {
    logic: [
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
    concepts: [
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
    strategies: [
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
    checklist: [
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
    ]
  },
  'mobile-interface': {
    logic: [
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
    ],
    concepts: [
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
    ],
    strategies: [
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
    ],
    checklist: [
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
  },
  'cxa-ultimate': {
    logic: [
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
    concepts: [
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
    strategies: [
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
    checklist: [
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
    ]
  }
}

// Curriculum Data
const curriculumModules = ref([
  {
    id: 'cxa-dashboard',
    title: 'CXA Dashboard Mastery',
    color: '#10b981',
    icon: 'mdi-monitor-dashboard',
    progress: 75,
    duration: '4h 30min',
    difficulty: 'Intermediário',
    topics: ['Funis de Conversão', 'KPIs Críticos', 'Análise de Cohort', 'Pipeline Management']
  },
  {
    id: 'cxa-ultimate',
    title: 'CXA Ultimate Intelligence',
    color: '#3b82f6',
    icon: 'mdi-rocket-launch',
    progress: 45,
    duration: '6h 15min',
    difficulty: 'Avançado',
    topics: ['Customer Intelligence', 'Automação Preditiva', 'Health Scoring', 'Journey Optimization']
  },
  {
    id: 'analytics-overview',
    title: 'Analytics & Data Science',
    color: '#f59e0b',
    icon: 'mdi-chart-donut',
    progress: 60,
    duration: '5h 45min',
    difficulty: 'Intermediário',
    topics: ['Data Modeling', 'Statistical Analysis', 'Predictive Analytics', 'Visualization']
  },
  {
    id: 'funnel-builder',
    title: 'Funnel Builder Mastery',
    color: '#8b5cf6',
    icon: 'mdi-filter-variant',
    progress: 30,
    duration: '3h 20min',
    difficulty: 'Intermediário',
    topics: ['Funnel Design', 'A/B Testing', 'Drop-off Analysis', 'Micro-conversões']
  },
  {
    id: 'mobile-interface',
    title: 'Mobile Interface Excellence',
    color: '#ef4444',
    icon: 'mdi-cellphone',
    progress: 85,
    duration: '2h 50min',
    difficulty: 'Básico',
    topics: ['Mobile-First Design', 'Touch Optimization', 'PWA Features', 'Performance']
  }
])

// Methods
const selectNode = (nodeId) => {
  selectedNode.value = selectedNode.value === nodeId ? null : nodeId
}

const getNodeById = (id) => {
  return neuralNodes.value.find(node => node.id === id)
}

const getCurrentModule = () => {
  return curriculumModules.value.find(module => module.id === selectedModule.value)
}

const getCurrentKnowledge = () => {
  return knowledgeData[selectedModule.value] || {}
}

const getCurrentLayerData = () => {
  const knowledge = getCurrentKnowledge()
  return knowledge[activeLayer.value] || []
}

const isConnectionActive = (connection) => {
  return selectedNode.value && (connection.from === selectedNode.value || connection.to === selectedNode.value)
}
</script>

<style scoped>
.neural-research {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
}

.research-header {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
  border-bottom: 2px solid rgba(251, 191, 36, 0.3);
  padding: 24px 40px 60px;
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
}

.breadcrumb-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 6px;
  color: #fbbf24;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.breadcrumb-btn:hover {
  background: rgba(251, 191, 36, 0.2);
}

.breadcrumb-current {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.research-hero {
  position: relative;
  text-align: center;
}

.hero-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 30px 40px, rgba(251, 191, 36, 0.4), transparent),
    radial-gradient(1px 1px at 80px 20px, rgba(245, 158, 11, 0.3), transparent),
    radial-gradient(1px 1px at 120px 60px, rgba(255, 255, 255, 0.2), transparent);
  background-repeat: repeat;
  background-size: 150px 100px;
  animation: knowledgeFloat 15s linear infinite;
}

@keyframes knowledgeFloat {
  0% { transform: translateX(0px) translateY(0px); }
  100% { transform: translateX(-150px) translateY(-100px); }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(251, 191, 36, 0.2);
  border: 1px solid rgba(251, 191, 36, 0.4);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fbbf24;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin: 0 0 20px 0;
  line-height: 1.1;
}

.title-neural {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(251, 191, 36, 0.5);
}

.title-engine {
  color: #ff6b35;
  text-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
  margin-left: 20px;
}

.hero-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 32px 0;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

/* Neural Network */
.neural-network {
  padding: 60px 40px;
  background: rgba(0, 0, 0, 0.3);
}

.network-header {
  text-align: center;
  margin-bottom: 40px;
}

.network-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #fbbf24, #ff6b35);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.network-header p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 24px 0;
}

.network-controls {
  display: flex;
  justify-content: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.4);
  padding: 8px;
  border-radius: 12px;
  border: 1px solid rgba(251, 191, 36, 0.2);
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: rgba(251, 191, 36, 0.1);
  border-color: rgba(251, 191, 36, 0.3);
  color: #fbbf24;
}

.control-btn.active {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(255, 107, 53, 0.2));
  border-color: #fbbf24;
  color: #fbbf24;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
}

/* Domains View */
.domains-view {
  margin-top: 40px;
}

/* Neural Network View */
.neural-view {
  display: flex;
  gap: 40px;
  margin-top: 40px;
  min-height: 600px;
}

.neural-canvas {
  flex: 2;
  position: relative;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 16px;
  overflow: hidden;
}

.neural-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, rgba(251, 191, 36, 0.3), transparent),
    radial-gradient(1px 1px at 40px 70px, rgba(16, 185, 129, 0.2), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(59, 130, 246, 0.2), transparent);
  background-repeat: repeat;
  background-size: 100px 80px;
  animation: neuralPulse 8s linear infinite;
}

@keyframes neuralPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

.knowledge-nodes {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.knowledge-node {
  position: absolute;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
}

.node-core {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(251, 191, 36, 0.4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.knowledge-node:hover .node-core {
  transform: scale(1.2);
  box-shadow: 0 0 30px rgba(251, 191, 36, 0.6);
}

.knowledge-node.active .node-core {
  border-color: #fbbf24;
  box-shadow: 0 0 40px rgba(251, 191, 36, 0.8);
  background: rgba(251, 191, 36, 0.2);
}

.node-label {
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-align: center;
  white-space: nowrap;
}

.neural-connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.neural-connections path {
  transition: all 0.3s ease;
}

.neural-connections path.active {
  stroke-width: 4;
  filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.8));
}

.node-details {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-header h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fbbf24;
  margin: 0;
}

.detail-content p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
}

.related-concepts h4 {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 12px 0;
}

.concept-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.concept-tag {
  padding: 4px 12px;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 16px;
  font-size: 0.8rem;
  color: #fbbf24;
}

/* Classroom View */
.classroom-view {
  display: flex;
  gap: 40px;
  margin-top: 40px;
  min-height: 600px;
}

.classroom-sidebar {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
}

.curriculum-tree h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #fbbf24;
  margin: 0 0 20px 0;
  text-align: center;
}

.module-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.module-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(251, 191, 36, 0.3);
}

.module-item.active {
  background: rgba(251, 191, 36, 0.1);
  border-color: #fbbf24;
}

.module-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.module-header span {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
}

.progress-indicator {
  width: 60px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #fbbf24);
  transition: width 0.3s ease;
}

.module-topics {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.topic-item {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  padding: 2px 0;
}

.classroom-content {
  flex: 2;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.lesson-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fbbf24;
  margin: 0;
}

/* Knowledge Tabs */
.knowledge-tabs {
  display: flex;
  gap: 8px;
  margin: 24px 0;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 12px;
  border: 1px solid rgba(251, 191, 36, 0.2);
}

.knowledge-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  justify-content: center;
}

.knowledge-tab:hover {
  background: rgba(251, 191, 36, 0.1);
  border-color: rgba(251, 191, 36, 0.3);
  color: #fbbf24;
}

.knowledge-tab.active {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(255, 107, 53, 0.2));
  border-color: #fbbf24;
  color: #fbbf24;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
}

/* Logic Section */
.logic-section {
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
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
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
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);
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
  background: linear-gradient(180deg, #fbbf24, rgba(251, 191, 36, 0.3));
  margin-bottom: 10px;
}

.tree-node:not(.root) .node-content {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
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
  background: rgba(251, 191, 36, 0.2);
  border-color: #fbbf24;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.2);
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
  background: rgba(251, 191, 36, 0.5);
}

.tree-node.small .node-content {
  padding: 8px 12px;
  font-size: 0.8rem;
  margin-bottom: 0;
}

/* Concepts Section */
.concepts-section {
  padding: 20px 0;
}

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.concept-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.concept-card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(251, 191, 36, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.2);
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
  color: #fbbf24;
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

/* Strategies Section */
.strategies-section {
  padding: 20px 0;
}

.strategies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.strategy-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
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

.strategy-card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(251, 191, 36, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.2);
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

/* Checklist Section */
.checklist-section {
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

.lesson-meta {
  display: flex;
  gap: 16px;
}

.duration, .difficulty {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.knowledge-map {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.map-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 16px 0;
}

.concept-network {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.concept-bubble {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
}

.concept-bubble:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(251, 191, 36, 0.3);
  transform: translateY(-2px);
}

.bubble-content {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: 600;
  color: white;
}

.concept-details p {
  font-size: 0.85rem;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 8px 0;
}

.formula {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 6px;
  padding: 8px;
  margin-top: 8px;
}

.formula code {
  color: #fbbf24;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
}

.domain-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.domain-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.domain-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(251, 191, 36, 0.2);
}

.domain-card.cxa-dashboard:hover {
  border-color: rgba(16, 185, 129, 0.5);
}

.domain-card.cxa-ultimate:hover {
  border-color: rgba(0, 123, 255, 0.5);
}

.domain-card.analytics:hover {
  border-color: rgba(245, 158, 11, 0.5);
}

.domain-card.funnel:hover {
  border-color: rgba(139, 92, 246, 0.5);
}

.domain-card.mobile:hover {
  border-color: rgba(239, 68, 68, 0.5);
}

.domain-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.domain-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.domain-header h3 {
  flex: 1;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: white;
}

.domain-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
}

.experiment-preview {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.preview-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.preview-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.4;
  margin-bottom: 12px;
}

.preview-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  padding: 4px 0;
}

.feature-item span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.knowledge-layers {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.layer-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  background: rgba(251, 191, 36, 0.05);
  border: 1px solid rgba(251, 191, 36, 0.1);
  border-radius: 6px;
  transition: all 0.2s ease;
}

.layer-item:hover {
  background: rgba(251, 191, 36, 0.1);
  border-color: rgba(251, 191, 36, 0.3);
}

.layer-item > span {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fbbf24;
  min-width: 90px;
}

.layer-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
  align-items: flex-start;
}

.layer-topics span {
  padding: 3px 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: inline-block;
}

.domain-footer {
  margin-top: auto;
}

.access-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #10b981, #059669);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
}

.access-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  background: linear-gradient(135deg, #059669, #047857);
  color: white;
}

.domain-card:hover .access-btn {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.2);
}

.domain-card:hover .access-btn:hover {
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4);
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

/* Methodology Section */
.methodology-section {
  padding: 60px 40px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(255, 107, 53, 0.05) 100%);
}

.methodology-header {
  text-align: center;
  margin-bottom: 40px;
}

.methodology-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #fbbf24, #ff6b35);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.methodology-header p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.methodology-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.method-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
}

.method-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(251, 191, 36, 0.4);
  transform: translateY(-4px);
}

.method-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2));
  border: 2px solid rgba(251, 191, 36, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.method-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #fbbf24;
}

.method-card p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.method-features {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.method-features span {
  padding: 4px 8px;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 12px;
  font-size: 0.7rem;
  color: #fbbf24;
}

/* Research Stats */
.research-stats {
  padding: 60px 40px;
  background: rgba(0, 0, 0, 0.3);
}

.stats-header {
  text-align: center;
  margin-bottom: 40px;
}

.stats-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #fbbf24, #ff6b35);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(251, 191, 36, 0.3);
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-card .stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fbbf24;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-card .stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .title-engine {
    margin-left: 10px;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .domain-grid {
    grid-template-columns: 1fr;
  }
  
  .methodology-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .research-header {
    padding: 20px 20px 40px;
  }
  
  .neural-network,
  .methodology-section,
  .research-stats {
    padding: 40px 20px;
  }
  
  .network-controls {
    flex-direction: column;
    gap: 6px;
  }
  
  .neural-view,
  .classroom-view {
    flex-direction: column;
    gap: 20px;
  }
  
  .concept-network {
    grid-template-columns: 1fr;
  }
}
</style>