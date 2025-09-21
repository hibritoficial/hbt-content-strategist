<template>
  <div class="hibrit-labs">
    <!-- Laboratory Header -->
    <div class="lab-header">
      <div class="lab-particles"></div>
      <div class="lab-grid-bg"></div>
      
      <div class="lab-hero">
        <div class="lab-logo">
          <div class="molecule-icon">
            <div class="atom-core"></div>
            <div class="electron-orbit orbit-1"></div>
            <div class="electron-orbit orbit-2"></div>
            <div class="electron-orbit orbit-3"></div>
          </div>
        </div>
        
        <div class="lab-title-section">
          <h1 class="lab-title">
            <span class="title-hibrit">HIBRIT</span>
            <span class="title-labs">LABS</span>
          </h1>
          <p class="lab-subtitle">Laboratório Científico de Inteligência em Negócios</p>
          <div class="lab-status">
            <div class="status-indicator active">
              <div class="pulse-dot"></div>
              <span>Sistema Operacional</span>
            </div>
            <div class="lab-metrics">
              <div class="metric-item">
                <span class="metric-number">{{ totalExperiments }}</span>
                <span class="metric-label">Experimentos Ativos</span>
              </div>
              <div class="metric-item">
                <span class="metric-number">{{ totalTests }}</span>
                <span class="metric-label">Testes Realizados</span>
              </div>
              <div class="metric-item">
                <span class="metric-number">{{ avgImprovement }}%</span>
                <span class="metric-label">Melhoria Média</span>
              </div>
              <div class="metric-item">
                <span class="metric-number">{{ clientExperiments }}</span>
                <span class="metric-label">Clientes Ativos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Two Pillars Introduction -->
    <div class="pillars-section">
      <div class="pillars-header">
        <h2>Dois Universos Interconectados</h2>
        <p>Pesquisa e Desenvolvimento trabalhando em sinergia para revolucionar o marketing digital</p>
      </div>
      
      <div class="pillars-grid">
        <!-- Neural Research Engine Pillar -->
        <div class="pillar-card research-pillar" @click="$router.push('/labs/neural-research-engine')">
          <div class="pillar-particles research-particles"></div>
          <div class="pillar-content">
            <div class="pillar-badge research-badge">
              <v-icon size="18" color="#fbbf24">mdi-brain</v-icon>
              <span>PESQUISA</span>
            </div>
            
            <h3 class="pillar-title research-title">
              <span class="title-neural">NEURAL RESEARCH</span>
              <span class="title-engine">ENGINE</span>
            </h3>
            
            <p class="pillar-description">
              Sistema avançado de absorção e produção de conhecimento científico aplicado ao marketing digital
            </p>
            
            <div class="pillar-features">
              <div class="feature-item">
                <v-icon size="16" color="#fbbf24">mdi-sitemap</v-icon>
                <span>5 Áreas de Pesquisa</span>
              </div>
              <div class="feature-item">
                <v-icon size="16" color="#fbbf24">mdi-layers</v-icon>
                <span>4 Camadas de Aprendizado</span>
              </div>
              <div class="feature-item">
                <v-icon size="16" color="#fbbf24">mdi-compass</v-icon>
                <span>Cobertura 360°</span>
              </div>
            </div>
            
            <button class="pillar-btn research-btn">
              <v-icon size="16">mdi-brain</v-icon>
              Explorar Sistema de Conhecimento
            </button>
          </div>
        </div>
        
        <!-- Scientific Laboratories Pillar -->
        <div class="pillar-card labs-pillar" @click="$router.push('/labs/scientific-laboratories')">
          <div class="pillar-particles labs-particles"></div>
          <div class="pillar-content">
            <div class="pillar-badge labs-badge">
              <v-icon size="18" color="#00ff9d">mdi-flask</v-icon>
              <span>DESENVOLVIMENTO</span>
            </div>
            
            <h3 class="pillar-title labs-title">
              <span class="title-scientific">LABORATÓRIOS</span>
              <span class="title-scientific-accent">CIENTÍFICOS</span>
            </h3>
            
            <p class="pillar-description">
              Ambiente controlado para desenvolvimento, teste e validação de tecnologias disruptivas em marketing digital
            </p>
            
            <div class="pillar-features">
              <div class="feature-item">
                <v-icon size="16" color="#00ff9d">mdi-test-tube</v-icon>
                <span>6 Laboratórios Ativos</span>
              </div>
              <div class="feature-item">
                <v-icon size="16" color="#00ff9d">mdi-chart-line</v-icon>
                <span>94.7% Taxa de Sucesso</span>
              </div>
              <div class="feature-item">
                <v-icon size="16" color="#00ff9d">mdi-rocket-launch</v-icon>
                <span>1,247 Experimentos</span>
              </div>
            </div>
            
            <button class="pillar-btn labs-btn">
              <v-icon size="16">mdi-flask</v-icon>
              Acessar Laboratórios
            </button>
          </div>
        </div>
      </div>
      
      <div class="synergy-section">
        <div class="synergy-content">
          <div class="synergy-icon">
            <v-icon size="32" color="#8b5cf6">mdi-atom</v-icon>
          </div>
          <h3>Sinergia entre Pesquisa e Desenvolvimento</h3>
          <p>O Neural Research Engine alimenta os Laboratórios Científicos com conhecimento estruturado, enquanto os experimentos práticos validam e refinam as teorias, criando um ciclo contínuo de inovação.</p>
        </div>
      </div>
    </div>

    <!-- Laboratory Navigation Carousel -->
    <div class="lab-navigation">
      <div class="carousel-header">
        <h2>Laboratórios Científicos</h2>
        <div class="carousel-controls">
          <button class="carousel-btn" @click="prevLab" :disabled="carouselOffset === 0">
            <v-icon size="16">mdi-chevron-left</v-icon>
          </button>
          <button class="carousel-btn" @click="nextLab" :disabled="carouselOffset >= maxCarouselOffset">
            <v-icon size="16">mdi-chevron-right</v-icon>
          </button>
        </div>
      </div>
      
      <div class="carousel-container">
        <div class="carousel-track" :style="{ transform: `translateX(-${carouselOffset}px)` }">
          <div 
            v-for="section in labSections" 
            :key="section.id"
            class="lab-card"
            :class="{ active: activeSection === section.id }"
            @click="activeSection = section.id"
          >
            <div class="card-glow"></div>
            <div class="card-header">
              <div class="lab-icon">
                <v-icon size="28">{{ section.icon }}</v-icon>
              </div>
              <div class="lab-status" :class="section.status">
                <div class="status-dot"></div>
              </div>
            </div>
            
            <div class="card-content">
              <h3>{{ section.name }}</h3>
              <p>{{ section.description }}</p>
              
              <div class="lab-metrics">
                <div class="metric">
                  <span class="metric-value">{{ section.experiments }}</span>
                  <span class="metric-label">Experimentos</span>
                </div>
                <div class="metric">
                  <span class="metric-value">{{ section.success }}%</span>
                  <span class="metric-label">Taxa Sucesso</span>
                </div>
              </div>
              
              <div class="progress-indicator">
                <div class="progress-bar" :style="{ width: section.progress + '%' }"></div>
              </div>
            </div>
            
            <div class="card-footer">
              <span class="access-label">{{ section.accessLevel }}</span>
              <v-icon size="16" class="access-arrow">mdi-arrow-right</v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Laboratory Content -->
    <div class="lab-content">
      <!-- Growth Hacking Section -->
      <div v-if="activeSection === 'growth'" class="lab-section growth-section">
        <div class="section-header">
          <h2>Growth Hacking Laboratory</h2>
          <p>Experimentação científica para crescimento exponencial</p>
        </div>
        
        <div class="experiments-grid">
          <!-- Active Experiments -->
          <div class="experiment-category">
            <h3>🧪 Experimentos Ativos</h3>
            <div class="experiments-list">
              <div v-for="exp in activeExperiments" :key="exp.id" class="experiment-card active">
                <div class="exp-header">
                  <div class="exp-status running"></div>
                  <h4>{{ exp.name }}</h4>
                  <div class="exp-progress">
                    <div class="progress-bar" :style="{ width: exp.progress + '%' }"></div>
                  </div>
                </div>
                <div class="exp-metrics">
                  <div class="metric">
                    <span class="metric-label">Conversão</span>
                    <span class="metric-value" :class="exp.conversion > 0 ? 'positive' : 'negative'">
                      {{ exp.conversion > 0 ? '+' : '' }}{{ exp.conversion }}%
                    </span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Confiança</span>
                    <span class="metric-value">{{ exp.confidence }}%</span>
                  </div>
                </div>
                <div class="exp-actions">
                  <button class="action-btn view">Ver Dados</button>
                  <button class="action-btn stop">Parar</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Experiment Templates -->
          <div class="experiment-category">
            <h3>⚗️ Templates de Experimento</h3>
            <div class="templates-grid">
              <div v-for="template in experimentTemplates" :key="template.id" class="template-card">
                <div class="template-icon">
                  <v-icon size="32">{{ template.icon }}</v-icon>
                </div>
                <h4>{{ template.name }}</h4>
                <p>{{ template.description }}</p>
                <div class="template-tags">
                  <span v-for="tag in template.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
                <button class="template-btn" @click="createExperiment(template)">
                  Iniciar Experimento
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Strategy Section -->
      <div v-if="activeSection === 'strategy'" class="lab-section strategy-section">
        <div class="section-header">
          <h2>Strategic Intelligence Lab</h2>
          <p>IA estratégica e simulações de cenários de negócio</p>
        </div>
        
        <div class="strategy-dashboard">
          <div class="strategy-card">
            <div class="card-icon">
              <v-icon size="32" color="#00ff9d">mdi-target</v-icon>
            </div>
            <h3>Análise de Mercado IA</h3>
            <p>Processamento de dados de mercado com machine learning para identificar oportunidades e ameaças</p>
            <div class="analysis-metrics">
              <div class="metric-item">
                <span class="metric-value">94.7%</span>
                <span class="metric-label">Precisão Preditiva</span>
              </div>
              <div class="metric-item">
                <span class="metric-value">2.3s</span>
                <span class="metric-label">Tempo Análise</span>
              </div>
            </div>
            <button class="lab-action-btn">Executar Análise</button>
          </div>
          
          <div class="strategy-card">
            <div class="card-icon">
              <v-icon size="32" color="#007bff">mdi-chart-timeline-variant</v-icon>
            </div>
            <h3>Simulador de Cenários</h3>
            <p>Monte Carlo e algoritmos preditivos para simular diferentes cenários de negócio</p>
            <div class="scenario-grid">
              <div class="scenario-item optimistic">
                <span class="scenario-label">Otimista</span>
                <span class="scenario-value">+47%</span>
              </div>
              <div class="scenario-item realistic">
                <span class="scenario-label">Realista</span>
                <span class="scenario-value">+23%</span>
              </div>
              <div class="scenario-item pessimistic">
                <span class="scenario-label">Pessimista</span>
                <span class="scenario-value">-8%</span>
              </div>
            </div>
            <button class="lab-action-btn">Nova Simulação</button>
          </div>
          
          <div class="strategy-card">
            <div class="card-icon">
              <v-icon size="32" color="#f59e0b">mdi-brain</v-icon>
            </div>
            <h3>Inteligência Competitiva</h3>
            <p>Monitoramento automatizado de concorrentes e análise de posicionamento estratégico</p>
            <div class="competitive-insights">
              <div class="insight-item">
                <span class="insight-label">Concorrentes Monitorados</span>
                <span class="insight-value">23</span>
              </div>
              <div class="insight-item">
                <span class="insight-label">Alertas Ativos</span>
                <span class="insight-value">7</span>
              </div>
            </div>
            <button class="lab-action-btn">Ver Relatório</button>
          </div>
        </div>
      </div>

      <!-- Funnel Lab Section -->
      <div v-if="activeSection === 'funnel'" class="lab-section funnel-section">
        <div class="section-header">
          <h2>Funnel Engineering Lab</h2>
          <p>Engenharia de funis com otimização algorítmica</p>
        </div>
        
        <div class="funnel-experiments">
          <div class="funnel-card">
            <div class="card-icon">
              <v-icon size="32" color="#10b981">mdi-filter-variant</v-icon>
            </div>
            <h3>Otimizador Automático de Funis</h3>
            <p>Algoritmos genéticos para encontrar a combinação perfeita de elementos do funil</p>
            <div class="optimization-results">
              <div class="result-item">
                <span class="result-label">Melhoria Média</span>
                <span class="result-value positive">+34.7%</span>
              </div>
              <div class="result-item">
                <span class="result-label">Testes Simultâneos</span>
                <span class="result-value">12</span>
              </div>
            </div>
            <button class="lab-action-btn">Otimizar Funil</button>
          </div>
          
          <div class="funnel-card">
            <div class="card-icon">
              <v-icon size="32" color="#3b82f6">mdi-ab-testing</v-icon>
            </div>
            <h3>A/B Testing Inteligente</h3>
            <p>Testes multivariados com significância estatística automática e parada inteligente</p>
            <div class="ab-test-visual">
              <div class="variant variant-a">
                <h4>Variante A</h4>
                <div class="conversion-rate">12.4%</div>
                <div class="confidence">Controle</div>
              </div>
              <div class="vs-indicator">VS</div>
              <div class="variant variant-b winner">
                <h4>Variante B</h4>
                <div class="conversion-rate">15.7%</div>
                <div class="confidence">95% confiança</div>
              </div>
            </div>
            <button class="lab-action-btn">Novo Teste</button>
          </div>
          
          <div class="funnel-card">
            <div class="card-icon">
              <v-icon size="32" color="#8b5cf6">mdi-chart-sankey</v-icon>
            </div>
            <h3>Análise de Fluxo Comportamental</h3>
            <p>Mapeamento de jornadas do usuário com identificação de pontos de atrito</p>
            <div class="flow-metrics">
              <div class="flow-item">
                <span class="flow-stage">Landing</span>
                <span class="flow-rate">100%</span>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-item">
                <span class="flow-stage">Interesse</span>
                <span class="flow-rate">67%</span>
              </div>
              <div class="flow-arrow">→</div>
              <div class="flow-item">
                <span class="flow-stage">Conversão</span>
                <span class="flow-rate">23%</span>
              </div>
            </div>
            <button class="lab-action-btn">Analisar Fluxo</button>
          </div>
        </div>
      </div>

      <!-- Copy Lab Section -->
      <div v-if="activeSection === 'copy'" class="lab-section copy-section">
        <div class="section-header">
          <h2>Copy Science Lab</h2>
          <p>Neurociência aplicada à persuasão textual</p>
        </div>
        
        <div class="copy-analyzer">
          <div class="analyzer-card">
            <div class="card-icon">
              <v-icon size="32" color="#ef4444">mdi-text-box-outline</v-icon>
            </div>
            <h3>Analisador Neural de Copy</h3>
            <p>IA treinada em milhões de copies para análise de persuasão e gatilhos mentais</p>
            <textarea class="copy-input" placeholder="Cole seu copy aqui para análise neural..."></textarea>
            <div class="analysis-results">
              <div class="neural-metrics">
                <div class="neural-item">
                  <span class="neural-label">Score Persuasão</span>
                  <div class="neural-bar">
                    <div class="neural-fill" style="width: 78%"></div>
                  </div>
                  <span class="neural-value">78/100</span>
                </div>
                <div class="neural-item">
                  <span class="neural-label">Gatilhos Detectados</span>
                  <span class="neural-count">7</span>
                </div>
              </div>
            </div>
            <button class="lab-action-btn">Analisar Copy</button>
          </div>
          
          <div class="analyzer-card">
            <div class="card-icon">
              <v-icon size="32" color="#06b6d4">mdi-brain</v-icon>
            </div>
            <h3>Gerador de Variações</h3>
            <p>GPT especializado em copywriting para gerar variações otimizadas automaticamente</p>
            <div class="generator-controls">
              <div class="control-group">
                <label>Tom de Voz:</label>
                <select class="control-select">
                  <option>Profissional</option>
                  <option>Casual</option>
                  <option>Urgente</option>
                </select>
              </div>
              <div class="control-group">
                <label>Objetivo:</label>
                <select class="control-select">
                  <option>Conversão</option>
                  <option>Engajamento</option>
                  <option>Educação</option>
                </select>
              </div>
            </div>
            <button class="lab-action-btn">Gerar Variações</button>
          </div>
          
          <div class="analyzer-card">
            <div class="card-icon">
              <v-icon size="32" color="#f59e0b">mdi-target</v-icon>
            </div>
            <h3>Detector de Gatilhos Mentais</h3>
            <p>Identificação automática de gatilhos psicológicos e sugestões de otimização</p>
            <div class="triggers-detected">
              <div class="trigger-item active">
                <span class="trigger-name">Escassez</span>
                <span class="trigger-strength">Alto</span>
              </div>
              <div class="trigger-item">
                <span class="trigger-name">Urgência</span>
                <span class="trigger-strength">Médio</span>
              </div>
              <div class="trigger-item">
                <span class="trigger-name">Prova Social</span>
                <span class="trigger-strength">Baixo</span>
              </div>
            </div>
            <button class="lab-action-btn">Detectar Gatilhos</button>
          </div>
        </div>
      </div>

      <!-- Design Lab Section -->
      <div v-if="activeSection === 'design'" class="lab-section design-section">
        <div class="section-header">
          <h2>Visual Impact Lab</h2>
          <p>Psicologia visual e design comportamental</p>
        </div>
        
        <div class="design-tools">
          <div class="tool-card">
            <div class="card-icon">
              <v-icon size="32" color="#00ff9d">mdi-monitor-dashboard</v-icon>
            </div>
            <h3>🚀 Experimentos de Interface</h3>
            <p>5 experimentos completos: CXA Dashboard, Analytics, Funnel Builder, Mobile e CXA Ultimate</p>
            <div class="interface-experiments">
              <div class="experiment-item" @click="$router.push('/labs/cxa-dashboard')">
                <div class="experiment-icon">
                  <v-icon size="20">mdi-monitor-dashboard</v-icon>
                </div>
                <div class="experiment-info">
                  <h4>CXA Dashboard</h4>
                  <p>Dashboard completo de funis e receita</p>
                  <div class="experiment-status">
                    <span class="status-dot running"></span>
                    <span>Ativo</span>
                  </div>
                </div>
                <div class="experiment-arrow">
                  <v-icon size="14">mdi-chevron-right</v-icon>
                </div>
              </div>
              
              <div class="experiment-item" @click="$router.push('/labs/analytics-overview')">
                <div class="experiment-icon">
                  <v-icon size="20">mdi-chart-line</v-icon>
                </div>
                <div class="experiment-info">
                  <h4>Analytics Overview</h4>
                  <p>Visão geral de métricas avançadas</p>
                  <div class="experiment-status">
                    <span class="status-dot pending"></span>
                    <span>Em Desenvolvimento</span>
                  </div>
                </div>
                <div class="experiment-arrow">
                  <v-icon size="14">mdi-chevron-right</v-icon>
                </div>
              </div>
              
              <div class="experiment-item" @click="$router.push('/labs/funnel-builder')">
                <div class="experiment-icon">
                  <v-icon size="20">mdi-filter-variant</v-icon>
                </div>
                <div class="experiment-info">
                  <h4>Funnel Builder</h4>
                  <p>Construtor visual de funis</p>
                  <div class="experiment-status">
                    <span class="status-dot pending"></span>
                    <span>Planejado</span>
                  </div>
                </div>
                <div class="experiment-arrow">
                  <v-icon size="14">mdi-chevron-right</v-icon>
                </div>
              </div>
              
              <div class="experiment-item" @click="$router.push('/labs/mobile-interface')">
                <div class="experiment-icon">
                  <v-icon size="20">mdi-cellphone</v-icon>
                </div>
                <div class="experiment-info">
                  <h4>Mobile Interface</h4>
                  <p>Interface otimizada para mobile</p>
                  <div class="experiment-status">
                    <span class="status-dot pending"></span>
                    <span>Planejado</span>
                  </div>
                </div>
                <div class="experiment-arrow">
                  <v-icon size="14">mdi-chevron-right</v-icon>
                </div>
              </div>
              
              <div class="experiment-item" @click="$router.push('/labs/cxa-ultimate')">
                <div class="experiment-icon">
                  <v-icon size="20">mdi-rocket-launch</v-icon>
                </div>
                <div class="experiment-info">
                  <h4>CXA Ultimate</h4>
                  <p>Dashboard definitivo de Customer Experience Automation</p>
                  <div class="experiment-status">
                    <span class="status-dot running"></span>
                    <span>Ativo</span>
                  </div>
                </div>
                <div class="experiment-arrow">
                  <v-icon size="14">mdi-chevron-right</v-icon>
                </div>
              </div>
            </div>
            <button class="lab-action-btn" @click="$router.push('/labs/cxa-dashboard')">Abrir Experimentos</button>
          </div>
          
          <div class="tool-card">
            <div class="card-icon">
              <v-icon size="32" color="#ff6b6b">mdi-test-tube</v-icon>
            </div>
            <h3>🧪 Testes de Componentes</h3>
            <p>Laboratório dedicado para testes visuais de componentes de interface</p>
            <div class="component-tests-preview">
              <div class="test-category">
                <v-icon size="16" color="#10b981">mdi-cursor-pointer</v-icon>
                <span>Botões & Ações</span>
              </div>
              <div class="test-category">
                <v-icon size="16" color="#3b82f6">mdi-form-select</v-icon>
                <span>Formulários</span>
              </div>
              <div class="test-category">
                <v-icon size="16" color="#f59e0b">mdi-chart-bar</v-icon>
                <span>Dados & Métricas</span>
              </div>
              <div class="test-category">
                <v-icon size="16" color="#8b5cf6">mdi-navigation</v-icon>
                <span>Navegação</span>
              </div>
            </div>
            <button class="lab-action-btn" @click="$router.push('/labs/components-test')">Acessar Testes</button>
          </div>
          
          <div class="tool-card">
            <div class="card-icon">
              <v-icon size="32" color="#10b981">mdi-palette-outline</v-icon>
            </div>
            <h3>Psicologia das Cores</h3>
            <p>Análise do impacto psicológico das cores na conversão e comportamento</p>
            <div class="color-psychology">
              <div class="color-item">
                <div class="color-swatch red"></div>
                <span class="color-effect">Urgência +23%</span>
              </div>
              <div class="color-item">
                <div class="color-swatch green"></div>
                <span class="color-effect">Confiança +18%</span>
              </div>
              <div class="color-item">
                <div class="color-swatch blue"></div>
                <span class="color-effect">Profissional +15%</span>
              </div>
              <div class="color-item">
                <div class="color-swatch orange"></div>
                <span class="color-effect">Energia +27%</span>
              </div>
              <div class="color-item">
                <div class="color-swatch purple"></div>
                <span class="color-effect">Criatividade +21%</span>
              </div>
            </div>
            <button class="lab-action-btn">Analisar Cores</button>
          </div>
          
          <div class="tool-card">
            <div class="card-icon">
              <v-icon size="32" color="#ec4899">mdi-eye-outline</v-icon>
            </div>
            <h3>Eye Tracking Simulator</h3>
            <p>Simulação de padrões de visualização baseada em estudos de eye tracking</p>
            <div class="eyetrack-preview">
              <div class="heatmap-overlay">
                <div class="heat-point hot" style="top: 20%; left: 30%"></div>
                <div class="heat-point warm" style="top: 60%; left: 70%"></div>
                <div class="heat-point cool" style="top: 80%; left: 50%"></div>
              </div>
            </div>
            <button class="lab-action-btn">Simular Eye Tracking</button>
          </div>
          
          <div class="tool-card">
            <div class="card-icon">
              <v-icon size="32" color="#8b5cf6">mdi-format-font</v-icon>
            </div>
            <h3>Tipografia Comportamental</h3>
            <p>Otimização de fontes baseada em legibilidade e impacto psicológico</p>
            <div class="typography-analysis">
              <div class="font-sample">
                <span class="font-name">Roboto</span>
                <span class="readability-score">94% legibilidade</span>
              </div>
              <div class="font-sample">
                <span class="font-name">Montserrat</span>
                <span class="readability-score">89% legibilidade</span>
              </div>
            </div>
            <button class="lab-action-btn">Otimizar Tipografia</button>
          </div>
        </div>
      </div>

      <!-- P&D Section -->
      <div v-if="activeSection === 'rd'" class="lab-section rd-section">
        <div class="section-header">
          <h2>Pesquisa & Desenvolvimento</h2>
          <p>Tecnologias disruptivas e inovação em marketing</p>
        </div>
        
        <div class="rd-projects">
          <div class="project-card classified">
            <div class="project-header">
              <div class="classification-badge">CLASSIFICADO</div>
              <div class="project-status experimental"></div>
            </div>
            <div class="card-icon">
              <v-icon size="32" color="#ff6b6b">mdi-rocket-launch</v-icon>
            </div>
            <h3>Projeto NEXUS</h3>
            <p>IA generativa para criação automática de campanhas completas</p>
            <div class="project-metrics">
              <div class="metric-row">
                <span class="metric-label">Progresso:</span>
                <div class="progress-track">
                  <div class="progress-fill" style="width: 67%"></div>
                </div>
                <span class="metric-value">67%</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Fase:</span>
                <span class="phase-badge alpha">Alpha Testing</span>
              </div>
            </div>
            <button class="lab-action-btn restricted">Acesso Restrito</button>
          </div>
          
          <div class="project-card">
            <div class="project-header">
              <div class="classification-badge open">ABERTO</div>
              <div class="project-status active"></div>
            </div>
            <div class="card-icon">
              <v-icon size="32" color="#00ff9d">mdi-brain</v-icon>
            </div>
            <h3>Neural Marketing Engine</h3>
            <p>Rede neural para predição de comportamento do consumidor</p>
            <div class="project-metrics">
              <div class="metric-row">
                <span class="metric-label">Progresso:</span>
                <div class="progress-track">
                  <div class="progress-fill" style="width: 89%"></div>
                </div>
                <span class="metric-value">89%</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Fase:</span>
                <span class="phase-badge beta">Beta Release</span>
              </div>
            </div>
            <button class="lab-action-btn">Acessar Projeto</button>
          </div>
          
          <div class="project-card">
            <div class="project-header">
              <div class="classification-badge concept">CONCEITO</div>
              <div class="project-status planning"></div>
            </div>
            <div class="card-icon">
              <v-icon size="32" color="#8b5cf6">mdi-atom</v-icon>
            </div>
            <h3>Quantum Analytics</h3>
            <p>Computação quântica aplicada à análise de big data de marketing</p>
            <div class="project-metrics">
              <div class="metric-row">
                <span class="metric-label">Progresso:</span>
                <div class="progress-track">
                  <div class="progress-fill" style="width: 12%"></div>
                </div>
                <span class="metric-value">12%</span>
              </div>
              <div class="metric-row">
                <span class="metric-label">Fase:</span>
                <span class="phase-badge concept">Pesquisa</span>
              </div>
            </div>
            <button class="lab-action-btn">Ver Conceito</button>
          </div>
        </div>
      </div>

      <!-- Interface Lab (Hidden Area) -->
      <div v-if="activeSection === 'interface'" class="lab-section interface-section">
        <div class="section-header">
          <h2>🔬 Interface Experiments</h2>
          <p>Laboratório de testes de interface e UX</p>
        </div>
        
        <div class="interface-playground">
          <div class="playground-card">
            <h3>🧪 Testes de Interface Ativos</h3>
            <div class="test-list">
              <div class="test-item" @click="$router.push('/labs/interface-test')">
                <div class="test-icon">
                  <v-icon size="24">mdi-monitor-dashboard</v-icon>
                </div>
                <div class="test-info">
                  <h4>Dashboard Components Test</h4>
                  <p>Teste visual de componentes de dashboard</p>
                  <div class="test-status">
                    <span class="status-dot running"></span>
                    <span>Ativo</span>
                  </div>
                </div>
                <div class="test-arrow">
                  <v-icon size="16">mdi-chevron-right</v-icon>
                </div>
              </div>
              
              <div class="test-item disabled">
                <div class="test-icon">
                  <v-icon size="24">mdi-form-select</v-icon>
                </div>
                <div class="test-info">
                  <h4>Form Components Test</h4>
                  <p>Teste de formulários e inputs</p>
                  <div class="test-status">
                    <span class="status-dot pending"></span>
                    <span>Em Desenvolvimento</span>
                  </div>
                </div>
              </div>
              
              <div class="test-item disabled">
                <div class="test-icon">
                  <v-icon size="24">mdi-animation</v-icon>
                </div>
                <div class="test-info">
                  <h4>Animation Performance Test</h4>
                  <p>Teste de performance de animações</p>
                  <div class="test-status">
                    <span class="status-dot pending"></span>
                    <span>Planejado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- HIBRIT Labs Presentation Button -->
    <button class="interface-lab-btn" @click="showLabsModal = true" title="HIBRIT Labs Presentation">
      <v-icon size="20">mdi-flask</v-icon>
    </button>
    
    <!-- HIBRIT Labs Modal -->
    <div v-if="showLabsModal" class="labs-modal-overlay" @click="showLabsModal = false">
      <div class="labs-modal" @click.stop>
        <div class="modal-header">
          <div class="modal-logo">
            <div class="molecule-icon-small">
              <div class="atom-core-small"></div>
              <div class="electron-orbit-small orbit-1-small"></div>
              <div class="electron-orbit-small orbit-2-small"></div>
            </div>
          </div>
          <div class="modal-title-section">
            <h1 class="modal-title">
              <span class="title-hibrit">HIBRIT</span>
              <span class="title-labs">LABS</span>
            </h1>
            <p class="modal-subtitle">Laboratório Científico de Inteligência em Negócios</p>
          </div>
          <button class="modal-close" @click="showLabsModal = false">
            <v-icon size="24">mdi-close</v-icon>
          </button>
        </div>
        
        <div class="modal-content">
          <div class="labs-presentation">
            <div class="presentation-section">
              <h3>🧬 Ciência Aplicada ao Marketing</h3>
              <p>Utilizamos metodologia científica para transformar hipóteses de marketing em resultados mensuráveis através de experimentação controlada.</p>
            </div>
            
            <div class="presentation-section">
              <h3>🚀 Tecnologias Avançadas</h3>
              <div class="tech-grid">
                <div class="tech-item">
                  <v-icon color="#00ff9d">mdi-brain</v-icon>
                  <span>Inteligência Artificial</span>
                </div>
                <div class="tech-item">
                  <v-icon color="#007bff">mdi-chart-timeline-variant</v-icon>
                  <span>Machine Learning</span>
                </div>
                <div class="tech-item">
                  <v-icon color="#f59e0b">mdi-atom</v-icon>
                  <span>Algoritmos Genéticos</span>
                </div>
                <div class="tech-item">
                  <v-icon color="#8b5cf6">mdi-eye-outline</v-icon>
                  <span>Neurociência</span>
                </div>
              </div>
            </div>
            
            <div class="presentation-section">
              <h3>📊 Resultados Comprovados</h3>
              <div class="results-grid">
                <div class="result-metric">
                  <span class="metric-number">+347%</span>
                  <span class="metric-desc">Melhoria Média</span>
                </div>
                <div class="result-metric">
                  <span class="metric-number">1,247</span>
                  <span class="metric-desc">Experimentos</span>
                </div>
                <div class="result-metric">
                  <span class="metric-number">94.7%</span>
                  <span class="metric-desc">Taxa de Sucesso</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-action-btn" @click="showLabsModal = false">
            Explorar Laboratórios
          </button>
        </div>
      </div>
    </div>

    <!-- Laboratory Footer -->
    <div class="lab-footer">
      <div class="footer-content">
        <!-- Team Section -->
        <div class="footer-section team-section">
          <h3>Equipe Científica</h3>
          <div class="team-avatars">
            <div v-for="member in teamMembers" :key="member.id" class="team-avatar" :title="member.name + ' - ' + member.role">
              <img :src="member.avatar" :alt="member.name">
              <div class="avatar-status" :class="member.status"></div>
            </div>
          </div>
          <p class="team-description">Cientistas de dados, engenheiros de growth e especialistas em comportamento trabalhando para revolucionar o marketing.</p>
        </div>
        
        <!-- Authority Section -->
        <div class="footer-section authority-section">
          <h3>Reconhecimento</h3>
          <div class="achievements">
            <div class="achievement-item">
              <v-icon color="#ffd700">mdi-trophy</v-icon>
              <span>Prêmio Inovação MarTech 2024</span>
            </div>
            <div class="achievement-item">
              <v-icon color="#00ff9d">mdi-certificate</v-icon>
              <span>Certificação ISO 27001</span>
            </div>
            <div class="achievement-item">
              <v-icon color="#007bff">mdi-school</v-icon>
              <span>Parceria Universidade MIT</span>
            </div>
            <div class="achievement-item">
              <v-icon color="#8b5cf6">mdi-rocket-launch</v-icon>
              <span>Top 10 Startups B2B Brasil</span>
            </div>
          </div>
        </div>
        
        <!-- Events Section -->
        <div class="footer-section events-section">
          <h3>Próximos Eventos</h3>
          <div class="events-list">
            <div class="event-item">
              <div class="event-date">
                <span class="day">15</span>
                <span class="month">MAR</span>
              </div>
              <div class="event-info">
                <h4>Web Summit Lisbon</h4>
                <p>Apresentação: "IA no Marketing do Futuro"</p>
              </div>
            </div>
            <div class="event-item">
              <div class="event-date">
                <span class="day">22</span>
                <span class="month">ABR</span>
              </div>
              <div class="event-info">
                <h4>Growth Hacking Conference</h4>
                <p>Workshop: "Experimentação Científica"</p>
              </div>
            </div>
            <div class="event-item">
              <div class="event-date">
                <span class="day">08</span>
                <span class="month">JUN</span>
              </div>
              <div class="event-info">
                <h4>RD Summit</h4>
                <p>Palestra: "Neurociência em Vendas"</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-brand">
          <div class="brand-logo">
            <div class="molecule-mini">
              <div class="atom-mini"></div>
              <div class="orbit-mini"></div>
            </div>
          </div>
          <div class="brand-text">
            <h4>HIBRIT LABS</h4>
            <p>Onde a ciência encontra o marketing</p>
          </div>
        </div>
        
        <div class="footer-links">
          <a href="#">Publicações</a>
          <a href="#">Pesquisas</a>
          <a href="#">Parcerias</a>
          <a href="#">Contato</a>
        </div>
        
        <div class="footer-copyright">
          <p>© 2024 HIBRIT Labs. Laboratório de Inteligência em Negócios.</p>
          <p class="tagline">"Transformando hipóteses em resultados desde 2019"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeSection = ref('design')

const carouselOffset = ref(0)
const cardWidth = 280
const maxCarouselOffset = computed(() => {
  const totalWidth = labSections.length * cardWidth
  const containerWidth = 1200
  return Math.max(0, totalWidth - containerWidth)
})

const labSections = [
  {
    id: 'design',
    name: 'Visual Impact',
    description: 'Psicologia visual e design comportamental',
    icon: 'mdi-palette-outline',
    experiments: 18,
    success: 89,
    progress: 73,
    status: 'active',
    accessLevel: 'Acesso Total'
  },
  {
    id: 'growth',
    name: 'Growth Hacking',
    description: 'Experimentação científica para crescimento exponencial',
    icon: 'mdi-trending-up',
    experiments: 12,
    success: 87,
    progress: 78,
    status: 'active',
    accessLevel: 'Acesso Total'
  },
  {
    id: 'strategy',
    name: 'Strategic Intelligence',
    description: 'IA estratégica e simulações de cenários de negócio',
    icon: 'mdi-chess-queen',
    experiments: 8,
    success: 92,
    progress: 85,
    status: 'active',
    accessLevel: 'Acesso Total'
  },
  {
    id: 'funnel',
    name: 'Funnel Engineering',
    description: 'Engenharia de funis com otimização algorítmica',
    icon: 'mdi-filter-variant',
    experiments: 15,
    success: 78,
    progress: 92,
    status: 'active',
    accessLevel: 'Acesso Total'
  },
  {
    id: 'copy',
    name: 'Copy Science',
    description: 'Neurociência aplicada à persuasão textual',
    icon: 'mdi-text-box-outline',
    experiments: 23,
    success: 84,
    progress: 67,
    status: 'active',
    accessLevel: 'Acesso Total'
  },
  {
    id: 'rd',
    name: 'P&D',
    description: 'Pesquisa e desenvolvimento de tecnologias disruptivas',
    icon: 'mdi-rocket-launch',
    experiments: 5,
    success: 95,
    progress: 45,
    status: 'experimental',
    accessLevel: 'Acesso Restrito'
  }
]

const nextLab = () => {
  if (carouselOffset.value < maxCarouselOffset.value) {
    carouselOffset.value = Math.min(carouselOffset.value + cardWidth, maxCarouselOffset.value)
  }
}

const prevLab = () => {
  if (carouselOffset.value > 0) {
    carouselOffset.value = Math.max(carouselOffset.value - cardWidth, 0)
  }
}

const activeExperiments = ref([
  {
    id: 1,
    name: 'Otimização de CTA - Asa Mentoria',
    progress: 78,
    conversion: 12.4,
    confidence: 95
  },
  {
    id: 2,
    name: 'Teste de Headlines - BIMM Smart',
    progress: 45,
    conversion: -2.1,
    confidence: 67
  },
  {
    id: 3,
    name: 'Funil de Vendas - OCS',
    progress: 92,
    conversion: 23.7,
    confidence: 98
  }
])

const experimentTemplates = ref([
  {
    id: 1,
    name: 'A/B Test de CTA',
    description: 'Teste de botões de call-to-action',
    icon: 'mdi-cursor-pointer',
    tags: ['Conversão', 'UX', 'Funil']
  },
  {
    id: 2,
    name: 'Teste de Headlines',
    description: 'Otimização de títulos persuasivos',
    icon: 'mdi-format-title',
    tags: ['Copy', 'Persuasão', 'Landing Page']
  },
  {
    id: 3,
    name: 'Análise de Cores',
    description: 'Impact das cores na conversão',
    icon: 'mdi-palette',
    tags: ['Design', 'Psicologia', 'Conversão']
  },
  {
    id: 4,
    name: 'Teste de Preços',
    description: 'Otimização de estratégia de preços',
    icon: 'mdi-currency-usd',
    tags: ['Pricing', 'Estratégia', 'Revenue']
  }
])

const totalExperiments = computed(() => {
  return labSections.reduce((sum, section) => sum + section.experiments, 0)
})

const totalTests = ref(1247)
const avgImprovement = ref(34.7)
const clientExperiments = ref(89)

const teamMembers = ref([
  {
    id: 1,
    name: 'Dr. Ana Silva',
    role: 'Head of Data Science',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    status: 'online'
  },
  {
    id: 2,
    name: 'Prof. Carlos Mendes',
    role: 'Growth Engineer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    status: 'online'
  },
  {
    id: 3,
    name: 'Dra. Marina Costa',
    role: 'Behavioral Scientist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    status: 'away'
  },
  {
    id: 4,
    name: 'Dr. Rafael Santos',
    role: 'AI Researcher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    status: 'online'
  },
  {
    id: 5,
    name: 'Dra. Julia Ferreira',
    role: 'UX Psychologist',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    status: 'online'
  },
  {
    id: 6,
    name: 'Dr. Pedro Lima',
    role: 'Statistical Analyst',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    status: 'away'
  }
])

const showLabsModal = ref(false)

const createExperiment = (template) => {
  console.log('Criando experimento:', template.name)
}
</script>

<style scoped>
.hibrit-labs {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
  position: relative;
  overflow-x: hidden;
}

/* Two Pillars Section */
.pillars-section {
  padding: 60px 40px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 26, 46, 0.8) 50%, rgba(22, 33, 62, 0.8) 100%);
  border-top: 2px solid rgba(139, 92, 246, 0.3);
  border-bottom: 2px solid rgba(139, 92, 246, 0.3);
}

.pillars-header {
  text-align: center;
  margin-bottom: 50px;
}

.pillars-header h2 {
  font-size: 2.8rem;
  font-weight: 800;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
}

.pillars-header p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto 60px;
}

.pillar-card {
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
}

.pillar-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(139, 92, 246, 0.3);
}

.research-pillar:hover {
  border-color: rgba(251, 191, 36, 0.6);
  box-shadow: 0 20px 60px rgba(251, 191, 36, 0.3);
}

.labs-pillar:hover {
  border-color: rgba(0, 255, 157, 0.6);
  box-shadow: 0 20px 60px rgba(0, 255, 157, 0.3);
}

.pillar-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.6;
}

.research-particles {
  background-image: 
    radial-gradient(2px 2px at 30px 40px, rgba(251, 191, 36, 0.4), transparent),
    radial-gradient(1px 1px at 80px 20px, rgba(245, 158, 11, 0.3), transparent);
  background-repeat: repeat;
  background-size: 120px 80px;
  animation: researchFloat 20s linear infinite;
}

.labs-particles {
  background-image: 
    radial-gradient(2px 2px at 40px 30px, rgba(0, 255, 157, 0.4), transparent),
    radial-gradient(1px 1px at 70px 60px, rgba(0, 123, 255, 0.3), transparent);
  background-repeat: repeat;
  background-size: 100px 90px;
  animation: labsFloat 18s linear infinite;
}

@keyframes researchFloat {
  0% { transform: translateX(0px) translateY(0px); }
  100% { transform: translateX(-120px) translateY(-80px); }
}

@keyframes labsFloat {
  0% { transform: translateX(0px) translateY(0px); }
  100% { transform: translateX(-100px) translateY(-90px); }
}

.pillar-content {
  position: relative;
  z-index: 2;
}

.pillar-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.research-badge {
  background: rgba(251, 191, 36, 0.2);
  border: 1px solid rgba(251, 191, 36, 0.4);
  color: #fbbf24;
}

.labs-badge {
  background: rgba(0, 255, 157, 0.2);
  border: 1px solid rgba(0, 255, 157, 0.4);
  color: #00ff9d;
}

.pillar-title {
  font-size: 2.2rem;
  font-weight: 900;
  margin: 0 0 20px 0;
  line-height: 1.2;
}

.title-neural {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-engine {
  color: #ff6b35;
  margin-left: 12px;
}

.title-scientific {
  background: linear-gradient(135deg, #00ff9d, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-scientific-accent {
  color: #007bff;
  margin-left: 12px;
}

.pillar-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 24px 0;
  line-height: 1.6;
}

.pillar-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.pillar-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.research-btn {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);
}

.research-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(251, 191, 36, 0.5);
}

.labs-btn {
  background: linear-gradient(135deg, #00ff9d, #007bff);
  box-shadow: 0 8px 25px rgba(0, 255, 157, 0.3);
}

.labs-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(0, 255, 157, 0.5);
}

/* Synergy Section */
.synergy-section {
  text-align: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1));
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  max-width: 800px;
  margin: 0 auto;
}

.synergy-content {
  max-width: 600px;
  margin: 0 auto;
}

.synergy-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2));
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  animation: synergyPulse 3s ease-in-out infinite;
}

@keyframes synergyPulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
  50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(139, 92, 246, 0.6); }
}

.synergy-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.synergy-content p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.6;
}

/* Laboratory Header */
.lab-header {
  position: relative;
  padding: 60px 40px;
  background: linear-gradient(135deg, rgba(0, 255, 157, 0.1) 0%, rgba(0, 123, 255, 0.1) 100%);
  border-bottom: 1px solid rgba(0, 255, 157, 0.2);
}

.lab-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, rgba(0, 255, 157, 0.3), transparent),
    radial-gradient(2px 2px at 40px 70px, rgba(0, 123, 255, 0.3), transparent),
    radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.2), transparent);
  background-repeat: repeat;
  background-size: 100px 100px;
  animation: particleFloat 20s linear infinite;
}

@keyframes particleFloat {
  0% { transform: translateY(0px); }
  100% { transform: translateY(-100px); }
}

.lab-grid-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 157, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 157, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
}

.lab-hero {
  display: flex;
  align-items: center;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Molecule Logo */
.lab-logo {
  position: relative;
}

.molecule-icon {
  position: relative;
  width: 120px;
  height: 120px;
}

.atom-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background: linear-gradient(45deg, #00ff9d, #007bff);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgba(0, 255, 157, 0.8);
  animation: atomPulse 2s ease-in-out infinite;
}

.electron-orbit {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 2px solid rgba(0, 255, 157, 0.4);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.orbit-1 {
  width: 60px;
  height: 60px;
  animation: orbitRotate 3s linear infinite;
}

.orbit-2 {
  width: 90px;
  height: 90px;
  animation: orbitRotate 4s linear infinite reverse;
}

.orbit-3 {
  width: 120px;
  height: 120px;
  animation: orbitRotate 5s linear infinite;
}

@keyframes atomPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes orbitRotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Title Section */
.lab-title-section {
  flex: 1;
}

.lab-title {
  font-size: 4rem;
  font-weight: 900;
  margin: 0 0 16px 0;
  line-height: 1;
}

.title-hibrit {
  color: #00ff9d;
  text-shadow: 0 0 30px rgba(0, 255, 157, 0.5);
}

.title-labs {
  color: #007bff;
  text-shadow: 0 0 30px rgba(0, 123, 255, 0.5);
  margin-left: 20px;
}

.lab-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 24px 0;
  font-weight: 300;
}

.lab-status {
  display: flex;
  gap: 32px;
  align-items: center;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pulse-dot {
  width: 12px;
  height: 12px;
  background: #00ff9d;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.lab-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.lab-metrics .metric-item {
  text-align: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.lab-metrics .metric-item:hover {
  background: rgba(0, 255, 157, 0.1);
  border-color: rgba(0, 255, 157, 0.3);
}

.lab-metrics .metric-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #00ff9d;
  line-height: 1;
  margin-bottom: 4px;
}

.lab-metrics .metric-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Carousel Navigation */
.lab-navigation {
  padding: 40px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.carousel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.carousel-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #00ff9d;
  margin: 0;
}

.carousel-controls {
  display: flex;
  gap: 8px;
}

.carousel-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(0, 255, 157, 0.3);
  border-radius: 8px;
  color: #00ff9d;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-btn:hover:not(:disabled) {
  background: rgba(0, 255, 157, 0.2);
  border-color: #00ff9d;
}

.carousel-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.carousel-container {
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel-track {
  display: flex;
  gap: 20px;
  transition: transform 0.5s ease;
  padding: 10px;
}

.lab-card {
  min-width: 260px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.lab-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 255, 157, 0.5);
  transform: translateY(-4px);
}

.lab-card.active {
  background: linear-gradient(135deg, rgba(0, 255, 157, 0.2), rgba(0, 123, 255, 0.2));
  border-color: #00ff9d;
  box-shadow: 0 8px 32px rgba(0, 255, 157, 0.3);
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 157, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lab-card.active .card-glow {
  opacity: 1;
  animation: glow-sweep 2s ease-in-out infinite;
}

@keyframes glow-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.lab-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.lab-status {
  display: flex;
  align-items: center;
}

.lab-status .status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.lab-status.active .status-dot {
  background: #10b981;
  animation: pulse 2s infinite;
}

.lab-status.experimental .status-dot {
  background: #f59e0b;
  animation: pulse 2s infinite;
}

.card-content h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: white;
}

.card-content p {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.lab-metrics {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.lab-metrics .metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: #00ff9d;
  line-height: 1;
}

.metric-label {
  display: block;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
}

.progress-indicator {
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-indicator .progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #00ff9d, #007bff);
  transition: width 0.3s ease;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.access-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
}

.access-arrow {
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease;
}

.lab-card:hover .access-arrow {
  color: #00ff9d;
  transform: translateX(4px);
}

/* Content Sections */
.lab-content {
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.lab-section {
  animation: sectionFadeIn 0.5s ease-out;
}

@keyframes sectionFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-header p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Experiments Grid */
.experiments-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.experiment-category h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #00ff9d;
}

.experiments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.experiment-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.experiment-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 255, 157, 0.3);
}

.exp-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.exp-status {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00ff9d;
  animation: pulse 2s infinite;
}

.exp-header h4 {
  flex: 1;
  margin: 0;
  font-size: 1rem;
  color: white;
}

.exp-progress {
  width: 60px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #00ff9d, #007bff);
  transition: width 0.3s ease;
}

.exp-metrics {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.metric-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 600;
}

.metric-value.positive {
  color: #00ff9d;
}

.metric-value.negative {
  color: #ff4757;
}

.exp-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Templates Grid */
.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.template-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.template-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 255, 157, 0.3);
  transform: translateY(-4px);
}

.template-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  color: white;
}

.template-card h4 {
  font-size: 1rem;
  margin: 0 0 8px 0;
  color: white;
}

.template-card p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 12px 0;
}

.template-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: center;
  margin-bottom: 16px;
}

.tag {
  padding: 2px 8px;
  background: rgba(0, 255, 157, 0.2);
  border: 1px solid rgba(0, 255, 157, 0.3);
  border-radius: 12px;
  font-size: 0.7rem;
  color: #00ff9d;
}

.template-btn {
  width: 100%;
  padding: 10px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.template-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 255, 157, 0.3);
}

/* Interface Lab Button */
.interface-lab-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
}

.interface-lab-btn:hover {
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.6);
}

/* Laboratory Footer */
.lab-footer {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(26, 26, 46, 0.8));
  border-top: 2px solid rgba(0, 255, 157, 0.3);
  padding: 60px 40px 0;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.footer-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: #00ff9d;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Team Section */
.team-avatars {
  display: flex;
  gap: -8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.team-avatar {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid rgba(0, 255, 157, 0.5);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: -8px;
}

.team-avatar:hover {
  transform: translateY(-4px) scale(1.1);
  border-color: #00ff9d;
  z-index: 10;
}

.team-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #0a0a0a;
}

.avatar-status.online {
  background: #10b981;
}

.avatar-status.away {
  background: #f59e0b;
}

.team-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0;
}

/* Authority Section */
.achievements {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.achievement-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.achievement-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 255, 157, 0.3);
}

.achievement-item span {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Events Section */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.event-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 255, 157, 0.3);
}

.event-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  padding: 8px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border-radius: 8px;
  color: white;
}

.event-date .day {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
}

.event-date .month {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.event-info h4 {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 4px 0;
}

.event-info p {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 40px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 16px;
}

.brand-logo {
  position: relative;
}

.molecule-mini {
  position: relative;
  width: 40px;
  height: 40px;
}

.atom-mini {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: linear-gradient(45deg, #00ff9d, #007bff);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 255, 157, 0.8);
}

.orbit-mini {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(0, 255, 157, 0.4);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: orbitRotate 4s linear infinite;
}

.brand-text h4 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #00ff9d;
  margin: 0;
}

.brand-text p {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 2px 0 0 0;
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.footer-links a:hover {
  color: #00ff9d;
}

.footer-copyright {
  text-align: right;
}

.footer-copyright p {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.footer-copyright .tagline {
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}

/* Interface Lab Styles */
.test-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.test-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.test-item:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 255, 157, 0.3);
  transform: translateX(4px);
}

.test-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.test-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.test-item.disabled .test-icon {
  background: rgba(107, 114, 128, 0.3);
}

.test-info {
  flex: 1;
}

.test-info h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: white;
}

.test-info p {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 8px 0;
}

.test-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.running {
  background: #10b981;
  animation: pulse 2s infinite;
}

.status-dot.pending {
  background: #f59e0b;
}

.test-arrow {
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease;
}

.test-item:hover:not(.disabled) .test-arrow {
  color: #00ff9d;
  transform: translateX(4px);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Enhanced Lab Sections */
.strategy-dashboard,
.funnel-experiments,
.copy-analyzer,
.design-tools,
.rd-projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.strategy-card,
.funnel-card,
.analyzer-card,
.tool-card,
.project-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.strategy-card:hover,
.funnel-card:hover,
.analyzer-card:hover,
.tool-card:hover,
.project-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 255, 157, 0.3);
  transform: translateY(-4px);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.strategy-card h3,
.funnel-card h3,
.analyzer-card h3,
.tool-card h3,
.project-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: white;
}

.strategy-card p,
.funnel-card p,
.analyzer-card p,
.tool-card p,
.project-card p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.lab-action-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.lab-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 255, 157, 0.3);
}

.lab-action-btn.restricted {
  background: rgba(255, 107, 107, 0.3);
  cursor: not-allowed;
}

/* Specific Components */
.copy-input {
  width: 100%;
  min-height: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px;
  color: white;
  font-size: 0.9rem;
  resize: vertical;
  margin-bottom: 16px;
}

/* Strategy Lab Components */
.analysis-metrics,
.scenario-grid,
.competitive-insights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.metric-item,
.scenario-item,
.insight-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.metric-value,
.scenario-value,
.insight-value {
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
  color: #00ff9d;
  margin-bottom: 4px;
}

.metric-label,
.scenario-label,
.insight-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.scenario-item.optimistic .scenario-value {
  color: #10b981;
}

.scenario-item.realistic .scenario-value {
  color: #f59e0b;
}

.scenario-item.pessimistic .scenario-value {
  color: #ef4444;
}

/* Funnel Lab Components */
.optimization-results,
.flow-metrics {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.result-item,
.flow-item {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.result-label,
.flow-stage {
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
}

.result-value,
.flow-rate {
  display: block;
  font-size: 1.1rem;
  font-weight: 700;
  color: #00ff9d;
}

.result-value.positive {
  color: #10b981;
}

.flow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00ff9d;
  font-size: 1.2rem;
  font-weight: 700;
}

.confidence {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 4px;
}

/* Copy Lab Components */
.neural-metrics {
  margin-bottom: 20px;
}

.neural-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.neural-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  min-width: 100px;
}

.neural-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.neural-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ff9d, #007bff);
}

.neural-value,
.neural-count {
  font-size: 0.9rem;
  font-weight: 600;
  color: #00ff9d;
}

.generator-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.control-group label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.control-select {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
}

.triggers-detected {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.trigger-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

.trigger-item.active {
  border-color: #00ff9d;
  background: rgba(0, 255, 157, 0.1);
}

.trigger-name {
  font-size: 0.9rem;
  color: white;
}

.trigger-strength {
  font-size: 0.8rem;
  font-weight: 600;
  color: #00ff9d;
}

/* Design Lab Components */
.eyetrack-preview {
  position: relative;
  height: 120px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

.heat-point {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: heatPulse 2s infinite;
}

.heat-point.hot {
  background: radial-gradient(circle, #ff4757, #ff3742);
  box-shadow: 0 0 20px rgba(255, 71, 87, 0.6);
}

.heat-point.warm {
  background: radial-gradient(circle, #f39c12, #e67e22);
  box-shadow: 0 0 15px rgba(243, 156, 18, 0.6);
}

.heat-point.cool {
  background: radial-gradient(circle, #3498db, #2980b9);
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.6);
}

@keyframes heatPulse {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.2); opacity: 1; }
}

.color-psychology {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.color-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.color-swatch.red {
  background: linear-gradient(135deg, #ff4757, #ff3742);
}

.color-swatch.green {
  background: linear-gradient(135deg, #2ed573, #1e90ff);
}

.color-swatch.blue {
  background: linear-gradient(135deg, #3742fa, #2f3542);
}

.color-swatch.orange {
  background: linear-gradient(135deg, #ff9500, #ff6348);
}

.color-swatch.purple {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.color-effect {
  font-size: 0.9rem;
  font-weight: 600;
  color: #00ff9d;
}

.typography-analysis {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.font-sample {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

.font-name {
  font-size: 0.9rem;
  color: white;
  font-weight: 500;
}

.readability-score {
  font-size: 0.8rem;
  font-weight: 600;
  color: #00ff9d;
}

/* P&D Components */
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.project-metrics {
  margin-bottom: 20px;
}

.metric-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.metric-row .metric-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  min-width: 70px;
}

.progress-track {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ff9d, #007bff);
}

.metric-row .metric-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: #00ff9d;
  min-width: 40px;
  text-align: right;
}

.phase-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}

.phase-badge.alpha {
  background: rgba(255, 107, 107, 0.2);
  color: #ff6b6b;
}

.phase-badge.beta {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.phase-badge.concept {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
}

/* Component Tests Preview */
.component-tests-preview {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 20px;
}

.test-category {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Interface Experiments in Visual Impact */
.interface-experiments {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.experiment-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.experiment-item:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 255, 157, 0.3);
  transform: translateX(4px);
}

.experiment-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.experiment-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.experiment-item.disabled .experiment-icon {
  background: rgba(107, 114, 128, 0.3);
}

.experiment-info {
  flex: 1;
}

.experiment-info h4 {
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 2px 0;
  color: white;
}

.experiment-info p {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 4px 0;
}

.experiment-status {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
}

.experiment-status .status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.experiment-status .status-dot.running {
  background: #10b981;
  animation: pulse 2s infinite;
}

.experiment-status .status-dot.pending {
  background: #f59e0b;
}

.experiment-arrow {
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.2s ease;
}

.experiment-item:hover:not(.disabled) .experiment-arrow {
  color: #00ff9d;
  transform: translateX(2px);
}

/* HIBRIT Labs Modal */
.labs-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.labs-modal {
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  border: 2px solid rgba(0, 255, 157, 0.3);
  border-radius: 20px;
  overflow: hidden;
  animation: modalSlideIn 0.4s ease-out;
  box-shadow: 0 20px 60px rgba(0, 255, 157, 0.2);
}

@keyframes modalSlideIn {
  from { transform: translateY(-50px) scale(0.9); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 123, 255, 0.1));
  border-bottom: 1px solid rgba(0, 255, 157, 0.2);
  position: relative;
}

.modal-logo {
  position: relative;
}

.molecule-icon-small {
  position: relative;
  width: 60px;
  height: 60px;
}

.atom-core-small {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  background: linear-gradient(45deg, #00ff9d, #007bff);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 15px rgba(0, 255, 157, 0.8);
  animation: atomPulse 2s ease-in-out infinite;
}

.electron-orbit-small {
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid rgba(0, 255, 157, 0.4);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.orbit-1-small {
  width: 30px;
  height: 30px;
  animation: orbitRotate 3s linear infinite;
}

.orbit-2-small {
  width: 50px;
  height: 50px;
  animation: orbitRotate 4s linear infinite reverse;
}

.modal-title-section {
  flex: 1;
}

.modal-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 8px 0;
  line-height: 1;
}

.modal-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.modal-close {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: rgba(255, 107, 107, 0.2);
  border-color: #ff6b6b;
}

.modal-content {
  padding: 30px;
  max-height: 60vh;
  overflow-y: auto;
}

.labs-presentation {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.presentation-section h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: #00ff9d;
}

.presentation-section p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 0.9rem;
  color: white;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.result-metric {
  text-align: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.metric-number {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: #00ff9d;
  margin-bottom: 4px;
}

.metric-desc {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.modal-footer {
  padding: 20px 30px;
  background: rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.modal-action-btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 255, 157, 0.4);
}

/* Responsive Modal */
@media (max-width: 768px) {
  .labs-modal {
    width: 95%;
    margin: 20px;
  }
  
  .modal-header {
    padding: 20px;
  }
  
  .modal-title {
    font-size: 2rem;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-grid {
    grid-template-columns: 1fr;
  }
}

.ab-test-visual {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.variant {
  flex: 1;
  text-align: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.variant.winner {
  border: 2px solid #10b981;
}

.conversion-rate {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff9d;
}

.vs-indicator {
  font-weight: 700;
  color: #f59e0b;
}

.project-card.classified {
  border-color: #ff6b6b;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(238, 90, 36, 0.1));
}

.classification-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
}

.classification-badge.classified {
  background: #ff6b6b;
  color: white;
}

.classification-badge.open {
  background: #10b981;
  color: white;
}

.classification-badge.concept {
  background: #8b5cf6;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .pillars-header h2 {
    font-size: 2.2rem;
  }
  
  .pillars-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .pillar-card {
    padding: 30px 20px;
  }
  
  .pillar-title {
    font-size: 1.8rem;
  }
  
  .title-engine,
  .title-scientific-accent {
    margin-left: 8px;
  }
  
  .pillars-section {
    padding: 40px 20px;
  }
  
  .lab-hero {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .lab-title {
    font-size: 2.5rem;
  }
  
  .experiments-grid {
    grid-template-columns: 1fr;
  }
  
  .lab-metrics {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .footer-links {
    justify-content: center;
  }
  
  .footer-copyright {
    text-align: center;
  }
  
  .lab-card {
    min-width: 240px;
  }
  
  .strategy-dashboard,
  .funnel-experiments,
  .copy-analyzer,
  .design-tools,
  .rd-projects {
    grid-template-columns: 1fr;
  }
}
</style>