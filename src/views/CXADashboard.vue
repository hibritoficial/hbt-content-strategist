<template>
  <div class="cxa-dashboard">
    <!-- Test Header (Fora da Interface) -->
    <div class="test-header">
      <div class="header-content">
        <div class="breadcrumb-nav">
          <button class="breadcrumb-btn" @click="$router.push('/labs')">
            <v-icon size="16">mdi-arrow-left</v-icon>
            HIBRIT Labs
          </button>
          <v-icon size="12" color="#9ca3af">mdi-chevron-right</v-icon>
          <span class="breadcrumb-current">Experimentos de Interface</span>
        </div>
        
        <div class="dashboard-info">
          <div class="dashboard-title">
            <h1>Mapa CXA Hibrit - Dashboard Completo</h1>
            <div class="dashboard-status">
              <div class="status-dot"></div>
              <span>Interface Ativa</span>
            </div>
          </div>
          <button class="export-btn" @click="exportInterface">
            <v-icon size="16">mdi-camera</v-icon>
            Exportar Interface
          </button>
        </div>
      </div>
    </div>

    <!-- Interface Tabs -->
    <div class="interface-tabs">
      <div class="tabs-container">
        <div class="tabs-header">
          <div class="separator-label">EXPERIMENTOS DE INTERFACE</div>
          <div class="experiment-counter">{{ activeExperiment + 1 }}/{{ experiments.length }}</div>
        </div>
        
        <div class="tabs-navigation">
          <button 
            v-for="(exp, index) in experiments" 
            :key="exp.id"
            class="tab-btn"
            :class="{ active: activeExperiment === index }"
            @click="activeExperiment = index"
          >
            <div class="tab-icon">
              <v-icon size="16">{{ exp.icon }}</v-icon>
            </div>
            <div class="tab-info">
              <div class="tab-name">{{ exp.name }}</div>
              <div class="tab-description">{{ exp.description }}</div>
            </div>
            <div class="tab-status" :class="exp.status">
              <div class="status-dot"></div>
            </div>
          </button>
        </div>
        
        <div class="tabs-controls">
          <button class="nav-btn" @click="previousExperiment" :disabled="activeExperiment === 0">
            <v-icon size="16">mdi-chevron-left</v-icon>
          </button>
          <button class="nav-btn" @click="nextExperiment" :disabled="activeExperiment === experiments.length - 1">
            <v-icon size="16">mdi-chevron-right</v-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Interface Real (Para Captura) -->
    <div id="interface-capture" class="interface-container">
      <!-- Experiment 1: CXA Dashboard -->
      <div v-if="activeExperiment === 0" class="experiment-content">
        <v-container fluid class="pa-4 bg-surface-950 text-white">
      <!-- Header -->
      <v-row class="mb-4" align="center" justify="space-between" no-gutters>
        <v-col cols="12" md="6" class="mb-4 mb-md-0">
          <div class="text-white text-opacity-70 text-caption">Mapa CXA Hibrit</div>
          <div class="text-h5 font-weight-bold">Dashboard de Funis & Receita</div>
        </v-col>
        <v-col cols="12" md="6" class="d-flex gap-2 justify-end align-center">
          <v-select
            v-model="selectedClient"
            :items="clientItems"
            item-title="name"
            item-value="id"
            density="comfortable"
            variant="outlined"
            class="w-50"
            hide-details
            label="Cliente"
          />
          <v-chip-group v-model="range" class="bg-white bg-opacity-5 rounded-lg px-2 py-1" selected-class="bg-white bg-opacity-15" aria-label="Seletor de período">
            <v-chip v-for="r in ranges" :key="r.id" :value="r.id" size="small" variant="text">{{ r.label }}</v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <!-- KPI Row -->
      <v-row class="mb-4" dense>
        <v-col v-for="k in kpiCards" :key="k.label" cols="6" md="4" lg="2">
          <v-card :class="['elevated-card', k.warn ? 'warn' : '']" variant="outlined">
            <v-card-text>
              <div class="d-flex align-center gap-1">
                <div class="text-caption text-white text-opacity-70 text-uppercase">{{ k.label }}</div>
                <v-tooltip v-if="k.tooltip" :text="k.tooltip">
                  <template #activator="{ props }">
                    <v-icon v-bind="props" size="14" class="text-white text-opacity-50">mdi-help-circle-outline</v-icon>
                  </template>
                </v-tooltip>
              </div>
              <div class="text-h5 font-weight-bold mt-1">{{ k.value }}</div>
              <div v-if="k.sub" class="text-caption text-white text-opacity-60 mt-1">{{ k.sub }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Macroetapas filter -->
      <v-row class="mb-3" align="center" no-gutters>
        <v-col cols="12" class="d-flex gap-2 align-center">
          <div class="text-white text-opacity-60 text-caption">Macroetapa:</div>
          <v-chip-group v-model="macro" aria-label="Filtro por macroetapa">
            <v-chip value="all" :class="macro === 'all' ? 'bg-white bg-opacity-15' : ''" size="small" variant="text">Todas</v-chip>
            <v-chip
              v-for="m in macros"
              :key="m.id"
              :value="m.id"
              :class="macro === m.id ? 'bg-white bg-opacity-15' : ''"
              size="small"
              variant="text"
            >
              {{ m.label }}
            </v-chip>
          </v-chip-group>
        </v-col>
      </v-row>

      <!-- Main Grid -->
      <v-row dense>
        <!-- Col 1 - Aquisição -->
        <v-col v-show="show('aq')" cols="12" xl="4">
          <v-card class="elevated-card" variant="outlined">
            <v-card-title class="d-flex align-center justify-space-between">
              <span class="text-subtitle-2 text-white text-opacity-90">Aquisição por Canal</span>
              <span class="text-caption text-white text-opacity-60">visitas × leads</span>
            </v-card-title>
            <v-card-text>
              <div class="chart-placeholder">
                <div class="chart-mock">
                  <div class="chart-bars">
                    <div v-for="channel in data.channels" :key="channel.name" class="bar-group">
                      <div class="bar-label">{{ channel.name }}</div>
                      <div class="bars">
                        <div class="bar visits" :style="{ height: (channel.visits / 6000) * 100 + 'px' }"></div>
                        <div class="bar leads" :style="{ height: (channel.leads / 400) * 100 + 'px' }"></div>
                      </div>
                    </div>
                  </div>
                  <div class="chart-legend">
                    <div class="legend-item">
                      <div class="legend-color visits"></div>
                      <span>Visitas</span>
                    </div>
                    <div class="legend-item">
                      <div class="legend-color leads"></div>
                      <span>Leads</span>
                    </div>
                  </div>
                </div>
              </div>
              <v-row dense class="mt-2">
                <v-col v-for="c in data.channels" :key="c.name" cols="12" sm="6">
                  <div class="d-flex align-center justify-space-between rounded-lg px-3 py-2 bg-white bg-opacity-5 text-caption">
                    <span>{{ c.name }}</span>
                    <span>CPL {{ money(c.cpl) }}</span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card v-show="show('aq')" class="elevated-card mt-4" variant="outlined">
            <v-card-title class="text-subtitle-2 text-white text-opacity-90">Alertas & SLAs</v-card-title>
            <v-list density="comfortable" class="bg-transparent">
              <v-list-item v-for="(a, i) in data.alerts" :key="i">
                <template #prepend>
                  <v-icon color="amber">mdi-alert</v-icon>
                </template>
                <v-list-item-title class="text-body-2 text-white text-opacity-85">{{ a }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

        <!-- Col 2 - Conversão -->
        <v-col v-show="show('conv')" cols="12" xl="4">
          <v-card class="elevated-card" variant="outlined">
            <v-card-title class="d-flex align-center justify-space-between">
              <span class="text-subtitle-2 text-white text-opacity-90">Conversão por Etapa</span>
              <span class="text-caption text-white text-opacity-60">funil normalizado</span>
            </v-card-title>
            <v-card-text>
              <div v-for="(s, idx) in data.conv" :key="idx" class="mb-2">
                <div class="d-flex justify-space-between text-caption text-white text-opacity-70 mb-1">
                  <span>{{ s.stage }}</span>
                  <span>{{ formatBR(s.count) }}</span>
                </div>
                <v-progress-linear
                  :model-value="(s.count / maxConv) * 100"
                  height="10"
                  rounded
                  color="#10b981"
                  bg-color="white"
                  :bg-opacity="0.06"
                />
              </div>
              <v-row dense class="mt-2">
                <v-col v-for="(s, i) in data.conv.slice(0, -1)" :key="i" cols="12" sm="6">
                  <div class="d-flex align-center justify-space-between rounded-lg px-3 py-2 bg-white bg-opacity-5 text-caption">
                    <span>{{ s.stage }} → {{ data.conv[i + 1].stage }}</span>
                    <span :class="(data.conv[i + 1].count / s.count) < 0.3 ? 'text-rose' : ''">
                      {{ pct((data.conv[i + 1].count / s.count) * 100) }}
                    </span>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <v-card v-show="show('conv')" class="elevated-card mt-4" variant="outlined">
            <v-card-title class="text-subtitle-2 text-white text-opacity-90">Cobertura de Pipeline</v-card-title>
            <v-card-text>
              <div class="d-flex align-end ga-2">
                <div class="text-h5 font-weight-bold">{{ coverage.toFixed(2) }}×</div>
                <div class="text-caption text-white text-opacity-70">cobertura (meta ≥ 3×)</div>
              </div>
              <v-progress-linear
                :model-value="Math.min(100, (coverage / 3) * 100)"
                height="10"
                rounded
                :color="coverage >= 3 ? 'success' : 'amber'"
                bg-color="white"
                :bg-opacity="0.06"
                class="mt-3"
              />
              <div class="d-flex justify-space-between text-caption text-white text-opacity-60 mt-1">
                <span>Meta {{ money(data.pipeline.target) }}</span>
                <span>Pipe {{ money(data.pipeline.pipe) }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Col 3 - Retenção -->
        <v-col v-show="show('ret')" cols="12" xl="4">
          <v-card class="elevated-card" variant="outlined">
            <v-card-title class="d-flex align-center justify-space-between">
              <span class="text-subtitle-2 text-white text-opacity-90">Pós-venda: NRR × Churn (12m)</span>
              <span class="text-caption text-white text-opacity-60">NRR (índice base 100)</span>
            </v-card-title>
            <v-card-text>
              <div class="chart-placeholder">
                <div class="line-chart-mock">
                  <div class="chart-grid">
                    <div v-for="i in 5" :key="i" class="grid-line"></div>
                  </div>
                  <div class="chart-lines">
                    <svg width="100%" height="200" viewBox="0 0 300 200">
                      <polyline
                        points="0,150 25,145 50,140 75,148 100,142 125,138 150,145 175,140 200,135 225,142 250,138 275,135 300,140"
                        fill="none"
                        stroke="#10b981"
                        stroke-width="3"
                      />
                      <polyline
                        points="0,170 25,175 50,172 75,178 100,174 125,176 150,172 175,175 200,178 225,174 250,176 275,178 300,175"
                        fill="none"
                        stroke="#ef4444"
                        stroke-width="3"
                      />
                    </svg>
                  </div>
                  <div class="chart-legend">
                    <div class="legend-item">
                      <div class="legend-color" style="background: #10b981;"></div>
                      <span>NRR</span>
                    </div>
                    <div class="legend-item">
                      <div class="legend-color" style="background: #ef4444;"></div>
                      <span>Churn</span>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>

          <v-card v-show="show('all')" class="elevated-card mt-4" variant="outlined">
            <v-card-title class="text-subtitle-2 text-white text-opacity-90">Funis (visão de lista)</v-card-title>
            <v-table class="text-body-2">
              <thead>
                <tr>
                  <th class="px-3 py-2">Nome</th>
                  <th class="px-3 py-2">Macro</th>
                  <th class="px-3 py-2">Owner</th>
                  <th class="px-3 py-2">Conv. Total</th>
                  <th class="px-3 py-2">Tempo Médio</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(f, i) in funnelList" :key="i">
                  <td class="px-3 py-2">{{ f.name }}</td>
                  <td class="px-3 py-2 text-white text-opacity-70">{{ f.macro }}</td>
                  <td class="px-3 py-2 text-white text-opacity-70">{{ f.owner }}</td>
                  <td class="px-3 py-2">{{ f.conv }}</td>
                  <td class="px-3 py-2">{{ f.time }}</td>
                </tr>
              </tbody>
            </v-table>
            <div class="d-flex justify-end gap-2 pa-3">
              <v-btn size="small" variant="outlined" @click="exportFunnelData">Exportar CSV</v-btn>
              <v-btn size="small" color="success">Novo Funil</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <div class="text-caption text-white text-opacity-50 mt-4">
        *Mock com dados fictícios. Estrutura alinhada às macroetapas (Aquisição, Conversão, Onboarding, Retenção, Reativação), com cobertura de pipeline (meta 3×), NRR e alertas de SLA.
      </div>
        </v-container>
        
        <!-- Sistema de Conhecimento 360° -->
        <div class="knowledge-system">
          <div class="knowledge-header">
            <v-icon class="knowledge-icon">mdi-brain</v-icon>
            <h3 class="knowledge-title">Sistema de Conhecimento 360°</h3>
            <p class="knowledge-subtitle">Aprendizado completo em camadas progressivas</p>
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
                    <span>{{ currentExperiment.name }}</span>
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
      </div>
      
      <!-- Experiment 2: Analytics Overview -->
      <div v-if="activeExperiment === 1" class="experiment-content">
        <v-container fluid class="pa-4 bg-surface-950 text-white">
          <div class="text-center py-16">
            <v-icon size="64" color="#00ff9d">mdi-chart-line</v-icon>
            <h2 class="text-h4 mt-4 mb-2">Analytics Overview</h2>
            <p class="text-white text-opacity-70">Interface de analytics em desenvolvimento</p>
            <div class="mt-8">
              <div class="analytics-preview">
                <div class="preview-card">
                  <h3>Métricas Avançadas</h3>
                  <div class="metric-grid">
                    <div class="metric-item">
                      <div class="metric-value">847K</div>
                      <div class="metric-label">Impressões</div>
                    </div>
                    <div class="metric-item">
                      <div class="metric-value">12.4%</div>
                      <div class="metric-label">CTR</div>
                    </div>
                    <div class="metric-item">
                      <div class="metric-value">R$ 45K</div>
                      <div class="metric-label">ROAS</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-container>
        
        <!-- Sistema de Conhecimento 360° -->
        <div class="knowledge-system">
          <div class="knowledge-header">
            <v-icon class="knowledge-icon">mdi-brain</v-icon>
            <h3 class="knowledge-title">Sistema de Conhecimento 360°</h3>
            <p class="knowledge-subtitle">Aprendizado completo em camadas progressivas</p>
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
                    <span>{{ currentExperiment.name }}</span>
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
      </div>
      
      <!-- Experiment 3: Funnel Builder -->
      <div v-if="activeExperiment === 2" class="experiment-content">
        <v-container fluid class="pa-4 bg-surface-950 text-white">
          <div class="text-center py-16">
            <v-icon size="64" color="#007bff">mdi-filter-variant</v-icon>
            <h2 class="text-h4 mt-4 mb-2">Funnel Builder</h2>
            <p class="text-white text-opacity-70">Construtor visual de funis</p>
            <div class="mt-8">
              <div class="funnel-preview">
                <div class="funnel-steps">
                  <div class="funnel-step">
                    <div class="step-number">1</div>
                    <div class="step-name">Landing Page</div>
                  </div>
                  <div class="funnel-arrow">→</div>
                  <div class="funnel-step">
                    <div class="step-number">2</div>
                    <div class="step-name">Lead Capture</div>
                  </div>
                  <div class="funnel-arrow">→</div>
                  <div class="funnel-step">
                    <div class="step-number">3</div>
                    <div class="step-name">Conversion</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-container>
        
        <!-- Sistema de Conhecimento 360° -->
        <div class="knowledge-system">
          <div class="knowledge-header">
            <v-icon class="knowledge-icon">mdi-brain</v-icon>
            <h3 class="knowledge-title">Sistema de Conhecimento 360°</h3>
            <p class="knowledge-subtitle">Aprendizado completo em camadas progressivas</p>
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
                    <span>{{ currentExperiment.name }}</span>
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
      </div>
      
      <!-- Experiment 4: Mobile Interface -->
      <div v-if="activeExperiment === 3" class="experiment-content">
        <v-container fluid class="pa-4 bg-surface-950 text-white">
          <div class="text-center py-16">
            <v-icon size="64" color="#f59e0b">mdi-cellphone</v-icon>
            <h2 class="text-h4 mt-4 mb-2">Mobile Interface</h2>
            <p class="text-white text-opacity-70">Interface otimizada para dispositivos móveis</p>
            <div class="mt-8">
              <div class="mobile-preview">
                <div class="mobile-frame">
                  <div class="mobile-header">
                    <div class="mobile-title">Dashboard Mobile</div>
                  </div>
                  <div class="mobile-content">
                    <div class="mobile-card">
                      <div class="card-title">Vendas Hoje</div>
                      <div class="card-value">R$ 12.4K</div>
                    </div>
                    <div class="mobile-card">
                      <div class="card-title">Leads</div>
                      <div class="card-value">247</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-container>
        
        <!-- Sistema de Conhecimento 360° -->
        <div class="knowledge-system">
          <div class="knowledge-header">
            <v-icon class="knowledge-icon">mdi-brain</v-icon>
            <h3 class="knowledge-title">Sistema de Conhecimento 360°</h3>
            <p class="knowledge-subtitle">Aprendizado completo em camadas progressivas</p>
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
                    <span>{{ currentExperiment.name }}</span>
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
      </div>
      
      <!-- Experiment 5: CXA Ultimate Dashboard -->
      <div v-if="activeExperiment === 4" class="experiment-content">
        <v-container fluid class="pa-2 bg-surface-950 text-white">
          <!-- CXA Command Center Header -->
          <div class="cxa-header">
            <div class="cxa-title-section">
              <div class="cxa-logo">
                <v-icon size="32" color="#00ff9d">mdi-rocket-launch</v-icon>
              </div>
              <div class="cxa-info">
                <h1 class="cxa-title">CXA Command Center</h1>
                <p class="cxa-subtitle">Customer Experience Automation • Real-time Intelligence</p>
              </div>
            </div>
            
            <div class="cxa-controls">
              <div class="client-selector">
                <select v-model="selectedClient" class="cxa-select">
                  <option v-for="client in clientItems" :key="client.id" :value="client.id">
                    {{ client.name }}
                  </option>
                </select>
              </div>
              <div class="automation-status">
                <div class="status-indicator active">
                  <div class="pulse-dot"></div>
                  <span>Automação Ativa</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Real-time Alerts Bar -->
          <div class="alerts-bar">
            <div class="alert-item critical">
              <v-icon size="16">mdi-alert-circle</v-icon>
              <span>Funil "Conversão Premium" com queda de 23% nas últimas 2h</span>
              <button class="alert-action">Investigar</button>
            </div>
            <div class="alert-item warning">
              <v-icon size="16">mdi-clock-alert</v-icon>
              <span>SLA de resposta WhatsApp em 18min (meta: 15min)</span>
              <button class="alert-action">Otimizar</button>
            </div>
          </div>

          <!-- Main CXA Grid -->
          <div class="cxa-grid">
            <!-- Customer Journey Intelligence -->
            <div class="cxa-card journey-card">
              <div class="card-header">
                <h3>🎯 Customer Journey Intelligence</h3>
                <div class="journey-health">98% Health</div>
              </div>
              <div class="journey-flow">
                <div class="journey-stage" v-for="stage in journeyStages" :key="stage.name">
                  <div class="stage-icon" :class="stage.status">
                    <v-icon size="16">{{ stage.icon }}</v-icon>
                  </div>
                  <div class="stage-info">
                    <div class="stage-name">{{ stage.name }}</div>
                    <div class="stage-metrics">
                      <span class="conversion">{{ stage.conversion }}%</span>
                      <span class="volume">{{ stage.volume }}</span>
                    </div>
                  </div>
                  <div v-if="stage.automation" class="automation-badge">
                    <v-icon size="12">mdi-robot</v-icon>
                    <span>Auto</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Revenue Intelligence -->
            <div class="cxa-card revenue-card">
              <div class="card-header">
                <h3>💰 Revenue Intelligence</h3>
                <div class="revenue-trend positive">+34.7%</div>
              </div>
              <div class="revenue-metrics">
                <div class="revenue-main">
                  <div class="revenue-value">{{ money(revenueData.current) }}</div>
                  <div class="revenue-label">Receita Atual (30d)</div>
                </div>
                <div class="revenue-breakdown">
                  <div class="breakdown-item">
                    <span class="label">ARR Projetado</span>
                    <span class="value">{{ money(revenueData.arr) }}</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="label">LTV Médio</span>
                    <span class="value">{{ money(revenueData.ltv) }}</span>
                  </div>
                  <div class="breakdown-item">
                    <span class="label">Churn Rate</span>
                    <span class="value churn">{{ revenueData.churn }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Automation Engine -->
            <div class="cxa-card automation-card">
              <div class="card-header">
                <h3>🤖 Automation Engine</h3>
                <div class="automation-efficiency">94% Efficiency</div>
              </div>
              <div class="automation-list">
                <div class="automation-item" v-for="auto in automations" :key="auto.id">
                  <div class="auto-status" :class="auto.status"></div>
                  <div class="auto-info">
                    <div class="auto-name">{{ auto.name }}</div>
                    <div class="auto-impact">{{ auto.impact }}</div>
                  </div>
                  <div class="auto-metrics">
                    <span class="auto-saves">{{ auto.timeSaved }}h</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Predictive Analytics -->
            <div class="cxa-card prediction-card">
              <div class="card-header">
                <h3>🔮 Predictive Analytics</h3>
                <div class="prediction-accuracy">87% Accuracy</div>
              </div>
              <div class="predictions">
                <div class="prediction-item">
                  <div class="prediction-icon">
                    <v-icon size="20" color="#10b981">mdi-trending-up</v-icon>
                  </div>
                  <div class="prediction-content">
                    <div class="prediction-title">Próximos 7 dias</div>
                    <div class="prediction-value">+127 leads esperados</div>
                    <div class="prediction-confidence">Confiança: 89%</div>
                  </div>
                </div>
                <div class="prediction-item">
                  <div class="prediction-icon">
                    <v-icon size="20" color="#f59e0b">mdi-alert-triangle</v-icon>
                  </div>
                  <div class="prediction-content">
                    <div class="prediction-title">Risco de Churn</div>
                    <div class="prediction-value">12 clientes em risco</div>
                    <div class="prediction-confidence">Ação recomendada</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Experience Score -->
            <div class="cxa-card experience-card">
              <div class="card-header">
                <h3>⭐ Experience Score</h3>
                <div class="experience-score">8.7/10</div>
              </div>
              <div class="experience-breakdown">
                <div class="score-item">
                  <span class="score-label">Velocidade</span>
                  <div class="score-bar">
                    <div class="score-fill" style="width: 92%"></div>
                  </div>
                  <span class="score-value">9.2</span>
                </div>
                <div class="score-item">
                  <span class="score-label">Personalização</span>
                  <div class="score-bar">
                    <div class="score-fill" style="width: 85%"></div>
                  </div>
                  <span class="score-value">8.5</span>
                </div>
                <div class="score-item">
                  <span class="score-label">Resolução</span>
                  <div class="score-bar">
                    <div class="score-fill" style="width: 78%"></div>
                  </div>
                  <span class="score-value">7.8</span>
                </div>
              </div>
            </div>

            <!-- Growth Opportunities -->
            <div class="cxa-card opportunities-card">
              <div class="card-header">
                <h3>🚀 Growth Opportunities</h3>
                <div class="opportunity-potential">+R$ 47K</div>
              </div>
              <div class="opportunities-list">
                <div class="opportunity-item" v-for="opp in opportunities" :key="opp.id">
                  <div class="opp-priority" :class="opp.priority">{{ opp.priority.toUpperCase() }}</div>
                  <div class="opp-content">
                    <div class="opp-title">{{ opp.title }}</div>
                    <div class="opp-impact">{{ opp.impact }}</div>
                  </div>
                  <button class="opp-action">Implementar</button>
                </div>
              </div>
            </div>
          </div>
        </v-container>
        
        <!-- Sistema de Conhecimento 360° -->
        <div class="knowledge-system">
          <div class="knowledge-header">
            <v-icon class="knowledge-icon">mdi-brain</v-icon>
            <h3 class="knowledge-title">Sistema de Conhecimento 360°</h3>
            <p class="knowledge-subtitle">Aprendizado completo em camadas progressivas</p>
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
                    <span>{{ currentExperiment.name }}</span>
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'

// Clientes
const clients = [
  { id: 'acme', name: 'ACME Solar' },
  { id: 'ocs', name: 'OCS Concretos' },
  { id: 'oasis', name: 'Oásis Natural' },
  { id: 'asa', name: 'ASA Mentoria' },
]
const clientItems = clients

// Períodos e macroetapas
const ranges = [
  { id: '30d', label: '30d' },
  { id: '90d', label: '90d' },
  { id: '12m', label: '12m' },
]
const macros = [
  { id: 'aq', label: 'Aquisição' },
  { id: 'conv', label: 'Conversão' },
  { id: 'onb', label: 'Onboarding' },
  { id: 'ret', label: 'Retenção' },
  { id: 'react', label: 'Reativação' },
]

// Estado
const selectedClient = ref('acme')
const range = ref('30d')
const macro = ref('all')
const activeExperiment = ref(0)

// Experimentos disponíveis
const experiments = ref([
  {
    id: 'cxa-dashboard',
    name: 'CXA Dashboard',
    description: 'Dashboard completo de funis e receita',
    icon: 'mdi-monitor-dashboard',
    status: 'active'
  },
  {
    id: 'analytics-overview',
    name: 'Analytics Overview',
    description: 'Visão geral de métricas avançadas',
    icon: 'mdi-chart-line',
    status: 'development'
  },
  {
    id: 'funnel-builder',
    name: 'Funnel Builder',
    description: 'Construtor visual de funis',
    icon: 'mdi-filter-variant',
    status: 'planning'
  },
  {
    id: 'mobile-interface',
    name: 'Mobile Interface',
    description: 'Interface otimizada para mobile',
    icon: 'mdi-cellphone',
    status: 'planning'
  },
  {
    id: 'cxa-ultimate',
    name: 'CXA Ultimate',
    description: 'Dashboard definitivo de Customer Experience Automation',
    icon: 'mdi-rocket-launch',
    status: 'active'
  }
])

// Navegação entre experimentos
const nextExperiment = () => {
  if (activeExperiment.value < experiments.value.length - 1) {
    activeExperiment.value++
  }
}

const previousExperiment = () => {
  if (activeExperiment.value > 0) {
    activeExperiment.value--
  }
}

// Set CXA Ultimate as default
// Set CXA Ultimate as default when loading
activeExperiment.value = 4

// Dados base (mock)
const baseData = reactive({
  acme: {
    kpis: { revenueNew: 128000, nrr: 1.12, cac: 520, payback: 4.2, winRate: 0.28, salesCycle: 19 },
    pipeline: { target: 120000, pipe: 310000 },
    channels: [
      { name: 'Meta Ads', visits: 5400, leads: 320, cpl: 18 },
      { name: 'Google Ads', visits: 3900, leads: 210, cpl: 32 },
      { name: 'Orgânico', visits: 2800, leads: 145, cpl: 4 },
      { name: 'Indicação', visits: 700, leads: 90, cpl: 0 },
    ],
    conv: [
      { stage: 'Lead', count: 765 },
      { stage: 'MQL', count: 520 },
      { stage: 'SQL', count: 210 },
      { stage: 'Proposta', count: 150 },
      { stage: 'Fechado', count: 59 },
    ],
    alerts: [
      'SLA WhatsApp > 15 min em 22% dos leads (Meta)',
      'CVR SQL→Proposta caiu 18% na última semana',
      'Canal Google: CPL ↑ 23% vs 30d',
    ],
  },
  ocs: {
    kpis: { revenueNew: 76000, nrr: 1.06, cac: 410, payback: 3.6, winRate: 0.33, salesCycle: 27 },
    pipeline: { target: 90000, pipe: 210000 },
    channels: [
      { name: 'Meta Ads', visits: 3100, leads: 210, cpl: 21 },
      { name: 'Google Ads', visits: 4700, leads: 280, cpl: 28 },
      { name: 'Orgânico', visits: 2600, leads: 130, cpl: 5 },
      { name: 'Indicação', visits: 500, leads: 62, cpl: 0 },
    ],
    conv: [
      { stage: 'Lead', count: 682 },
      { stage: 'MQL', count: 440 },
      { stage: 'SQL', count: 210 },
      { stage: 'Proposta', count: 160 },
      { stage: 'Fechado', count: 70 },
    ],
    alerts: [
      'Queda de orgânico por 2 semanas (ver SEO)',
      'Tempo médio de proposta > 72h',
    ],
  },
  oasis: {
    kpis: { revenueNew: 32000, nrr: 1.18, cac: 62, payback: 1.2, winRate: 0.21, salesCycle: 7 },
    pipeline: { target: 30000, pipe: 68000 },
    channels: [
      { name: 'Meta Ads', visits: 6200, leads: 510, cpl: 6 },
      { name: 'Google Ads', visits: 1900, leads: 130, cpl: 14 },
      { name: 'Orgânico', visits: 4800, leads: 240, cpl: 2 },
      { name: 'Indicação', visits: 1200, leads: 170, cpl: 0 },
    ],
    conv: [
      { stage: 'Lead', count: 1050 },
      { stage: 'MQL', count: 720 },
      { stage: 'SQL', count: 260 },
      { stage: 'Proposta', count: 180 },
      { stage: 'Fechado', count: 55 },
    ],
    alerts: [
      'Queda de taxa de retorno no Delivery (-9%)',
    ],
  },
  asa: {
    kpis: { revenueNew: 54000, nrr: 1.09, cac: 180, payback: 2.1, winRate: 0.26, salesCycle: 12 },
    pipeline: { target: 50000, pipe: 145000 },
    channels: [
      { name: 'Meta Ads', visits: 4100, leads: 380, cpl: 8 },
      { name: 'Google Ads', visits: 2300, leads: 150, cpl: 19 },
      { name: 'Orgânico', visits: 3600, leads: 190, cpl: 3 },
      { name: 'Indicação', visits: 800, leads: 120, cpl: 0 },
    ],
    conv: [
      { stage: 'Lead', count: 840 },
      { stage: 'MQL', count: 560 },
      { stage: 'SQL', count: 230 },
      { stage: 'Proposta', count: 160 },
      { stage: 'Fechado', count: 60 },
    ],
    alerts: [
      'Episódio novo sem UTM em 3 links',
      'Tempo de resposta > 20 min nas noites de 5ª',
    ],
  },
})

// Helpers
const formatBR = (n) => n.toLocaleString('pt-BR')
const pct = (v) => `${v.toFixed(0)}%`
const money = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Macroetapa filtering
const show = (id) => macro.value === 'all' || macro.value === id

// Derivados por seleção
const data = computed(() => {
  const d = baseData[selectedClient.value]
  const factor = range.value === '90d' ? 1.15 : range.value === '12m' ? 1.6 : 1
  return {
    kpis: {
      revenueNew: Math.round(d.kpis.revenueNew * factor),
      nrr: d.kpis.nrr,
      cac: d.kpis.cac,
      payback: d.kpis.payback,
      winRate: d.kpis.winRate,
      salesCycle: d.kpis.salesCycle,
    },
    pipeline: { target: d.pipeline.target * factor, pipe: d.pipeline.pipe * factor },
    channels: d.channels.map((c) => ({ ...c, visits: Math.round(c.visits * factor), leads: Math.round(c.leads * factor) })),
    conv: d.conv.map((c) => ({ ...c, count: Math.round(c.count * factor) })),
    alerts: d.alerts,
  }
})

const maxConv = computed(() => Math.max(...data.value.conv.map((s) => s.count)))
const coverage = computed(() => data.value.pipeline.pipe / data.value.pipeline.target)

// KPI cards
const kpiCards = computed(() => [
  { 
    label: 'Receita Nova', 
    value: money(data.value.kpis.revenueNew), 
    sub: 'Período selecionado',
    tooltip: 'Receita de novos clientes no período selecionado'
  },
  { 
    label: 'NRR', 
    value: pct((data.value.kpis.nrr - 1) * 100), 
    sub: 'retenção líquida',
    tooltip: 'Net Revenue Retention: (Receita inicial + Expansão - Churn) / Receita inicial'
  },
  { 
    label: 'CAC', 
    value: money(data.value.kpis.cac), 
    sub: 'c/ mídia + ops',
    tooltip: 'Customer Acquisition Cost: (Mídia + Ops de aquisição) / Novos clientes'
  },
  { 
    label: 'Payback', 
    value: `${data.value.kpis.payback.toFixed(1)} m`, 
    sub: 'CAC / margem', 
    warn: data.value.kpis.payback > 6,
    tooltip: 'Tempo para recuperar o investimento em aquisição: CAC / Margem mensal'
  },
  { 
    label: 'Win Rate', 
    value: pct(data.value.kpis.winRate * 100), 
    sub: 'clientes / oportunidades',
    tooltip: 'Taxa de fechamento: Clientes fechados / Total de oportunidades qualificadas'
  },
  { 
    label: 'Sales Cycle', 
    value: `${data.value.kpis.salesCycle} d`, 
    sub: '1º contato → fechamento',
    tooltip: 'Tempo médio desde o primeiro contato até o fechamento da venda'
  },
])

// Export funnel data
const exportFunnelData = () => {
  const csvData = [
    ['Nome', 'Macroetapa', 'Owner', 'Conversão Total', 'Tempo Médio'],
    ...funnelList.value.map(f => [f.name, f.macro, f.owner, f.conv, f.time])
  ]
  
  const csvContent = csvData.map(row => row.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `funis-${selectedClient.value}-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  window.URL.revokeObjectURL(url)
}

// Lista de funis (mock)
const funnelList = computed(() => [
  { name: 'Aquisição — Leads', macro: 'Aquisição', owner: 'Mídia', conv: '4,3%', time: '—' },
  { name: 'Conversão — Plano Anual', macro: 'Conversão', owner: 'Vendas', conv: '28%', time: '19d' },
  { name: 'Onboarding — Setup', macro: 'Onboarding', owner: 'CS', conv: '86%', time: '5d' },
  { name: 'Retenção — Upsell', macro: 'Retenção', owner: 'CS', conv: '16%', time: '—' },
  { name: 'Reativação — Winback', macro: 'Reativação', owner: 'Growth', conv: '6%', time: '—' },
])

// CXA Ultimate Data
const journeyStages = ref([
  { name: 'Awareness', icon: 'mdi-eye', conversion: 12.4, volume: '2.3K', status: 'excellent', automation: true },
  { name: 'Interest', icon: 'mdi-heart', conversion: 8.7, volume: '287', status: 'good', automation: true },
  { name: 'Consideration', icon: 'mdi-scale-balance', conversion: 34.2, volume: '98', status: 'excellent', automation: false },
  { name: 'Purchase', icon: 'mdi-cart', conversion: 28.9, volume: '34', status: 'warning', automation: true },
  { name: 'Retention', icon: 'mdi-account-heart', conversion: 89.3, volume: '30', status: 'excellent', automation: true }
])

const revenueData = ref({
  current: 247800,
  arr: 2974000,
  ltv: 8940,
  churn: 2.3
})

const automations = ref([
  { id: 1, name: 'Lead Scoring Automático', impact: '+23% conversão', timeSaved: 12, status: 'active' },
  { id: 2, name: 'Nurturing Personalizado', impact: '+18% engajamento', timeSaved: 8, status: 'active' },
  { id: 3, name: 'Reativação Inteligente', impact: '+34% winback', timeSaved: 15, status: 'active' },
  { id: 4, name: 'Upsell Preditivo', impact: '+27% revenue', timeSaved: 6, status: 'paused' }
])

const opportunities = ref([
  { id: 1, title: 'Otimizar Funil de Conversão', impact: '+R$ 23K/mês', priority: 'high' },
  { id: 2, title: 'Implementar Chat Inteligente', impact: '+R$ 15K/mês', priority: 'medium' },
  { id: 3, title: 'Personalização Avançada', impact: '+R$ 9K/mês', priority: 'low' }
])

// Knowledge System Data
const activeKnowledgeTab = ref('logic')
const carouselOffset = ref(0)
const cardWidth = 350
const maxCarouselOffset = computed(() => {
  const totalWidth = currentKnowledge.value.length * cardWidth
  const containerWidth = 1000 // approximate container width
  return Math.max(0, totalWidth - containerWidth)
})

const knowledgeTabs = ref([
  { id: 'logic', label: 'Lógica Básica', icon: 'mdi-sitemap' },
  { id: 'concepts', label: 'Conceitos Básicos', icon: 'mdi-book-open' },
  { id: 'strategies', label: 'Dicas Estratégicas', icon: 'mdi-lightbulb' },
  { id: 'checklist', label: 'Checklist', icon: 'mdi-clipboard-check' }
])

const currentExperiment = computed(() => experiments.value[activeExperiment.value])

// Logic Tree Data
const logicTrees = {
  0: [ // CXA Dashboard
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
        { id: 21, title: 'Qualificação MQL', icon: 'mdi-filter', color: '#8b5cf6' },
        { id: 22, title: 'Vendas SQL', icon: 'mdi-handshake', color: '#ef4444' },
        { id: 23, title: 'Fechamento', icon: 'mdi-check-circle', color: '#10b981' }
      ]
    },
    {
      id: 3,
      title: 'Retenção & Expansão',
      icon: 'mdi-heart',
      color: '#f59e0b',
      children: [
        { id: 31, title: 'Onboarding', icon: 'mdi-rocket-launch', color: '#06b6d4' },
        { id: 32, title: 'Upsell/Cross-sell', icon: 'mdi-trending-up', color: '#10b981' },
        { id: 33, title: 'Reativação', icon: 'mdi-refresh', color: '#f59e0b' }
      ]
    }
  ],
  1: [ // Analytics
    {
      id: 1,
      title: 'Métricas de Tráfego',
      icon: 'mdi-eye',
      color: '#10b981',
      children: [
        { id: 11, title: 'Impressões', icon: 'mdi-eye-outline', color: '#3b82f6' },
        { id: 12, title: 'Alcance', icon: 'mdi-account-multiple', color: '#10b981' },
        { id: 13, title: 'CTR', icon: 'mdi-cursor-pointer', color: '#f59e0b' }
      ]
    }
  ],
  2: [ // Funnel Builder
    {
      id: 1,
      title: 'Estrutura do Funil',
      icon: 'mdi-filter',
      color: '#10b981',
      children: [
        { id: 11, title: 'Isca Digital', icon: 'mdi-magnet', color: '#3b82f6' },
        { id: 12, title: 'Landing Page', icon: 'mdi-web', color: '#10b981' },
        { id: 13, title: 'Sequência Email', icon: 'mdi-email', color: '#f59e0b' }
      ]
    }
  ],
  3: [ // Mobile
    {
      id: 1,
      title: 'UX Mobile',
      icon: 'mdi-cellphone',
      color: '#10b981',
      children: [
        { id: 11, title: 'Touch Interface', icon: 'mdi-gesture-tap', color: '#3b82f6' },
        { id: 12, title: 'Performance', icon: 'mdi-speedometer', color: '#10b981' },
        { id: 13, title: 'Responsividade', icon: 'mdi-responsive', color: '#f59e0b' }
      ]
    }
  ],
  4: [ // CXA Ultimate
    {
      id: 1,
      title: 'Customer Intelligence',
      icon: 'mdi-brain',
      color: '#10b981',
      children: [
        { id: 11, title: 'Journey Mapping', icon: 'mdi-map', color: '#3b82f6' },
        { id: 12, title: 'Behavioral Analytics', icon: 'mdi-chart-timeline-variant', color: '#10b981' },
        { id: 13, title: 'Predictive Models', icon: 'mdi-crystal-ball', color: '#8b5cf6' }
      ]
    },
    {
      id: 2,
      title: 'Automation Engine',
      icon: 'mdi-robot',
      color: '#3b82f6',
      children: [
        { id: 21, title: 'Trigger Rules', icon: 'mdi-lightning-bolt', color: '#ef4444' },
        { id: 22, title: 'Personalization', icon: 'mdi-account-cog', color: '#10b981' },
        { id: 23, title: 'Real-time Actions', icon: 'mdi-clock-fast', color: '#f59e0b' }
      ]
    }
  ]
}

const currentLogicTree = computed(() => logicTrees[activeExperiment.value] || [])

// Concepts Data
const conceptsData = {
  0: [
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
      icon: 'mdi-heart',
      color: '#10b981',
      description: 'Valor total que um cliente traz durante todo o relacionamento com a empresa.',
      importance: 'Determina quanto você pode investir na aquisição',
      application: 'LTV = Ticket Médio × Frequência × Tempo de Vida'
    },
    {
      id: 3,
      title: 'Taxa de Conversão',
      icon: 'mdi-percent',
      color: '#3b82f6',
      description: 'Percentual de visitantes que realizam a ação desejada (compra, cadastro, etc).',
      importance: 'Indica eficiência do funil de vendas',
      application: 'Conversão = (Ações Realizadas / Visitantes) × 100'
    }
  ],
  1: [
    {
      id: 1,
      title: 'Click-Through Rate (CTR)',
      icon: 'mdi-cursor-pointer',
      color: '#3b82f6',
      description: 'Percentual de pessoas que clicam no anúncio após vê-lo.',
      importance: 'Indica relevância e atratividade do anúncio',
      application: 'CTR = (Cliques / Impressões) × 100'
    },
    {
      id: 2,
      title: 'Return on Ad Spend (ROAS)',
      icon: 'mdi-cash-refund',
      color: '#10b981',
      description: 'Receita gerada para cada real investido em publicidade.',
      importance: 'Mede eficiência direta dos investimentos em mídia',
      application: 'ROAS = Receita Atribuída / Investimento em Ads'
    },
    {
      id: 3,
      title: 'Cost Per Lead (CPL)',
      icon: 'mdi-account-cash',
      color: '#f59e0b',
      description: 'Custo médio para gerar um lead qualificado.',
      importance: 'Determina viabilidade econômica da aquisição',
      application: 'CPL = Investimento Total / Número de Leads'
    }
  ],
  2: [
    {
      id: 1,
      title: 'Lead Magnet',
      icon: 'mdi-magnet',
      color: '#10b981',
      description: 'Oferta gratuita valiosa em troca do contato do prospect.',
      importance: 'Primeiro passo para construir relacionamento',
      application: 'Deve resolver problema específico do público-alvo'
    },
    {
      id: 2,
      title: 'Landing Page',
      icon: 'mdi-web',
      color: '#3b82f6',
      description: 'Página focada em uma única ação de conversão.',
      importance: 'Elimina distrações e maximiza conversões',
      application: '1 objetivo, 1 CTA, sem menu de navegação'
    },
    {
      id: 3,
      title: 'Email Marketing Automation',
      icon: 'mdi-email-multiple',
      color: '#8b5cf6',
      description: 'Sequências automatizadas baseadas em comportamento.',
      importance: 'Nutre leads sem intervenção manual',
      application: 'Triggers: download, abandono, tempo, ação'
    }
  ],
  3: [
    {
      id: 1,
      title: 'Mobile-First Design',
      icon: 'mdi-cellphone',
      color: '#f59e0b',
      description: 'Metodologia que prioriza a experiência mobile antes do desktop.',
      importance: '70%+ do tráfego é mobile atualmente',
      application: 'Projetar primeiro para tela pequena, depois expandir'
    },
    {
      id: 2,
      title: 'Touch Interface',
      icon: 'mdi-gesture-tap',
      color: '#3b82f6',
      description: 'Interface otimizada para interação por toque.',
      importance: 'Dedos são menos precisos que mouse',
      application: 'Botões mínimo 44px, espaçamento adequado'
    },
    {
      id: 3,
      title: 'Progressive Web App (PWA)',
      icon: 'mdi-application',
      color: '#10b981',
      description: 'Web app que funciona como app nativo.',
      importance: 'Experiência app sem instalação',
      application: 'Offline, push notifications, home screen'
    }
  ],
  4: [
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
      title: 'Marketing Automation',
      icon: 'mdi-robot',
      color: '#10b981',
      description: 'Uso de tecnologia para automatizar tarefas repetitivas de marketing.',
      importance: 'Escala personalização sem aumentar equipe',
      application: 'Segmentar audiência e criar fluxos baseados em comportamento'
    }
  ]
}

const currentConcepts = computed(() => conceptsData[activeExperiment.value] || [])

// Checklist Data
const checklistData = {
  0: [
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
      title: 'Funil de Vendas Mapeado',
      description: 'Todas as etapas desde lead até cliente documentadas e mensuradas',
      priority: 'high',
      impact: 90,
      checked: false
    },
    {
      id: 3,
      title: 'Automação de Nutrição Ativa',
      description: 'Sequência de emails automática para leads que não converteram',
      priority: 'medium',
      impact: 75,
      checked: false
    }
  ],
  1: [
    {
      id: 1,
      title: 'UTMs Padronizadas',
      description: 'Sistema consistente de UTMs para rastrear origem do tráfego',
      priority: 'high',
      impact: 85,
      checked: false
    },
    {
      id: 2,
      title: 'Pixels de Conversão Instalados',
      description: 'Facebook Pixel, Google Analytics e outras ferramentas configuradas',
      priority: 'high',
      impact: 90,
      checked: false
    },
    {
      id: 3,
      title: 'Dashboards Automatizados',
      description: 'Relatórios automáticos com métricas principais',
      priority: 'medium',
      impact: 70,
      checked: false
    }
  ],
  2: [
    {
      id: 1,
      title: 'Lead Magnet Validado',
      description: 'Oferta testada e aprovada pelo público-alvo',
      priority: 'high',
      impact: 90,
      checked: false
    },
    {
      id: 2,
      title: 'Landing Page Otimizada',
      description: 'Taxa de conversão > 15% para tráfego pago',
      priority: 'high',
      impact: 85,
      checked: false
    },
    {
      id: 3,
      title: 'Sequência de Nutrição Ativa',
      description: 'Mínimo 7 emails automatizados pós-cadastro',
      priority: 'medium',
      impact: 75,
      checked: false
    },
    {
      id: 4,
      title: 'Testes A/B Implementados',
      description: 'Headlines, CTAs e ofertas sendo testadas continuamente',
      priority: 'medium',
      impact: 65,
      checked: false
    }
  ],
  3: [
    {
      id: 1,
      title: 'Teste de Velocidade Mobile',
      description: 'PageSpeed Insights > 90 para mobile',
      priority: 'high',
      impact: 85,
      checked: false
    },
    {
      id: 2,
      title: 'Design Responsivo Testado',
      description: 'Interface testada em diferentes tamanhos de tela',
      priority: 'high',
      impact: 80,
      checked: false
    },
    {
      id: 3,
      title: 'Touch Targets Otimizados',
      description: 'Botões e links com tamanho mínimo de 44px',
      priority: 'medium',
      impact: 70,
      checked: false
    },
    {
      id: 4,
      title: 'Formulários Mobile-Friendly',
      description: 'Campos grandes, teclado apropriado, validação clara',
      priority: 'medium',
      impact: 75,
      checked: false
    }
  ],
  4: [
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
      title: 'Automação Comportamental Ativa',
      description: 'Triggers baseados em ações do usuário, não apenas tempo',
      priority: 'high',
      impact: 88,
      checked: false
    },
    {
      id: 3,
      title: 'Segmentação Avançada Configurada',
      description: 'Clientes segmentados por comportamento, valor e estágio',
      priority: 'high',
      impact: 82,
      checked: false
    },
    {
      id: 4,
      title: 'Métricas de Experiência Monitoradas',
      description: 'NPS, CSAT, tempo de resposta e resolução acompanhados',
      priority: 'medium',
      impact: 78,
      checked: false
    },
    {
      id: 5,
      title: 'Integração Omnichannel Ativa',
      description: 'Dados unificados entre todos os pontos de contato',
      priority: 'high',
      impact: 85,
      checked: false
    }
  ]
}

const currentChecklist = computed(() => checklistData[activeExperiment.value] || [])

// Knowledge Pills Data (for strategies carousel)
const knowledgeData = {
  0: [
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
      title: 'Macroetapas CXA',
      icon: 'mdi-target',
      color: '#3b82f6',
      what: 'Divisão da jornada em 5 fases: Aquisição, Conversão, Onboarding, Retenção, Reativação.',
      why: 'Cada fase precisa de estratégias diferentes. Aquisição foca em volume, Conversão em qualidade.',
      tip: '80% das empresas focam só em Aquisição. O dinheiro real está na Retenção e Upsell.'
    },
    {
      id: 3,
      title: 'CAC vs LTV',
      icon: 'mdi-cash',
      color: '#f59e0b',
      what: 'Custo para Adquirir Cliente vs Valor que ele traz na Vida toda.',
      why: 'Se LTV > 3x CAC, o negócio é sustentável. Se < 3x, você está queimando dinheiro.',
      tip: 'Melhor aumentar LTV (retenção/upsell) que diminuir CAC. É mais fácil e rentável.'
    }
  ],
  1: [
    {
      id: 1,
      title: 'Impressões vs Alcance',
      icon: 'mdi-eye',
      color: '#10b981',
      what: 'Impressões = quantas vezes o anúncio apareceu. Alcance = quantas pessoas diferentes viram.',
      why: 'Alta impressão + baixo alcance = você está "martelando" as mesmas pessoas.',
      tip: 'Frequência ideal: 2-3x por pessoa. Acima disso, você irrita e gasta dinheiro à toa.'
    },
    {
      id: 2,
      title: 'CTR Real vs Vanity',
      icon: 'mdi-cursor-pointer',
      color: '#3b82f6',
      what: 'CTR = Click Through Rate. Mas nem todo clique vira lead.',
      why: 'CTR alto com conversão baixa = tráfego errado ou landing page ruim.',
      tip: 'Prefira CTR 2% que converte 10% do que CTR 5% que converte 1%.'
    },
    {
      id: 3,
      title: 'ROAS vs ROI',
      icon: 'mdi-chart-timeline-variant',
      color: '#f59e0b',
      what: 'ROAS = retorno do anúncio. ROI = retorno considerando TODOS os custos.',
      why: 'ROAS 4:1 pode ser ROI negativo se você tem equipe, ferramentas, etc.',
      tip: 'ROAS mínimo = 3:1. ROI mínimo = 20%. Abaixo disso, repense a estratégia.'
    }
  ],
  2: [
    {
      id: 1,
      title: 'Isca Digital Irresistível',
      icon: 'mdi-magnet',
      color: '#10b981',
      what: 'Oferta gratuita que resolve 1 problema específico do seu cliente ideal.',
      why: 'Pessoas trocam email por valor. Quanto mais específico, maior a conversão.',
      tip: '"Ebook de Marketing" converte 2%. "Checklist: 7 Gatilhos que Dobram Vendas em 48h" converte 15%.'
    },
    {
      id: 2,
      title: 'Sequência de Nutrição',
      icon: 'mdi-email-fast',
      color: '#3b82f6',
      what: 'Série de emails que educa, constrói confiança e prepara para a venda.',
      why: '97% não compram na primeira visita. Nutrição transforma "não" em "sim".',
      tip: 'Regra 80/20: 80% valor/educação, 20% venda. Email 1: Entrega. Email 7: Oferta.'
    },
    {
      id: 3,
      title: 'Urgência vs Escassez',
      icon: 'mdi-timer-sand',
      color: '#f59e0b',
      what: 'Urgência = tempo limitado. Escassez = quantidade limitada.',
      why: 'Cérebro humano odeia perder oportunidades (FOMO = Fear of Missing Out).',
      tip: 'Urgência real > falsa. "Só até sexta" funciona se for verdade. Mentir quebra confiança.'
    }
  ],
  3: [
    {
      id: 1,
      title: 'Mobile-First Design',
      icon: 'mdi-cellphone-check',
      color: '#10b981',
      what: 'Criar primeiro para celular, depois adaptar para desktop.',
      why: '70% do tráfego é mobile. Se não funciona no celular, você perde 7 de cada 10 clientes.',
      tip: 'Botão mínimo: 44px. Texto mínimo: 16px. Carregamento máximo: 3 segundos.'
    },
    {
      id: 2,
      title: 'Micro-Interações',
      icon: 'mdi-gesture-tap',
      color: '#3b82f6',
      what: 'Pequenas animações que dão feedback ao usuário (botão que "afunda" ao clicar).',
      why: 'Cérebro precisa de confirmação. Sem feedback, usuário clica 5x no mesmo botão.',
      tip: 'Loading, hover, clique - sempre dê feedback visual. Silêncio = abandono.'
    },
    {
      id: 3,
      title: 'Velocidade = Conversão',
      icon: 'mdi-speedometer',
      color: '#f59e0b',
      what: 'Cada segundo de demora = 7% menos conversões.',
      why: 'Atenção mobile dura 8 segundos. Página lenta = cliente perdido.',
      tip: 'Otimize imagens (WebP), use CDN, minimize CSS/JS. Velocidade > beleza.'
    }
  ],
  4: [
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
      title: 'Análise Preditiva',
      icon: 'mdi-crystal-ball',
      color: '#3b82f6',
      what: 'IA que prevê quem vai comprar, cancelar ou fazer upsell baseado em padrões.',
      why: 'Antecipar é melhor que reagir. Cliente em risco de churn custa 5x menos reter que reconquistar.',
      tip: '3 sinais de churn: diminuiu login, não abriu emails, suporte reclamando.'
    },
    {
      id: 3,
      title: 'Personalização em Escala',
      icon: 'mdi-target-account',
      color: '#f59e0b',
      what: 'Cada cliente recebe experiência única, mas automatizada para milhares.',
      why: '"Oi João, vi que você gosta de futebol" converte 300% mais que "Oi, tudo bem?"',
      tip: 'Colete: nome, interesse, comportamento, momento. Use tudo na comunicação.'
    },
    {
      id: 4,
      title: 'Customer Journey Mapping',
      icon: 'mdi-chart-timeline-variant',
      color: '#8b5cf6',
      what: 'Mapa completo de cada ponto de contato do cliente com sua marca.',
      why: 'Experiência ruim em qualquer ponto = cliente perdido. Mapear = otimizar.',
      tip: 'Teste você mesmo: compre do seu concorrente. Veja onde eles são melhores.'
    },
    {
      id: 5,
      title: 'Real-Time Intelligence',
      icon: 'mdi-lightning-bolt',
      color: '#ef4444',
      what: 'Decisões automáticas baseadas no que está acontecendo AGORA.',
      why: 'Cliente irritado no chat = oferta de desconto automática. Problema resolvido em segundos.',
      tip: 'Configure alertas: queda de 20% em qualquer métrica = notificação imediata.'
    },
    {
      id: 6,
      title: 'Revenue Operations',
      icon: 'mdi-cash-multiple',
      color: '#06b6d4',
      what: 'Alinhar Marketing, Vendas e CS para maximizar receita em cada cliente.',
      why: 'Cliente bem atendido compra mais, indica mais, cancela menos. É matemática.',
      tip: '1% de melhoria na retenção = 5-25% mais lucro. Foque na experiência pós-venda.'
    }
  ]
}

const currentKnowledge = computed(() => knowledgeData[activeExperiment.value] || [])

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

// Export Interface Function
const exportInterface = async () => {
  try {
    const element = document.getElementById('interface-capture')
    if (!element) return
    
    const currentExp = experiments.value[activeExperiment.value]
    
    // Temporariamente esconder a seção de conhecimento
    const knowledgeSection = element.querySelector('.knowledge-system')
    const originalDisplay = knowledgeSection ? knowledgeSection.style.display : null
    if (knowledgeSection) {
      knowledgeSection.style.display = 'none'
    }
    
    // Usar html2canvas se disponível, senão fallback simples
    if (window.html2canvas) {
      const canvas = await window.html2canvas(element, {
        backgroundColor: '#0b1211',
        scale: 2,
        useCORS: true
      })
      
      const link = document.createElement('a')
      link.download = `${currentExp.id}-${new Date().toISOString().slice(0, 10)}.png`
      link.href = canvas.toDataURL()
      link.click()
    } else {
      // Fallback: abrir em nova janela para screenshot manual
      const elementClone = element.cloneNode(true)
      const knowledgeSectionClone = elementClone.querySelector('.knowledge-system')
      if (knowledgeSectionClone) {
        knowledgeSectionClone.remove()
      }
      
      const newWindow = window.open('', '_blank')
      newWindow.document.write(`
        <html>
          <head><title>${currentExp.name} - Export</title></head>
          <body style="margin: 0; padding: 20px; background: #0b1211;">
            ${elementClone.outerHTML}
            <p style="color: white; text-align: center; margin-top: 20px;">
              Use Ctrl+Shift+S (ou Cmd+Shift+S no Mac) para capturar a tela
            </p>
          </body>
        </html>
      `)
    }
    
    // Restaurar a seção de conhecimento
    if (knowledgeSection) {
      knowledgeSection.style.display = originalDisplay || ''
    }
  } catch (error) {
    console.error('Erro ao exportar:', error)
    alert('Erro ao exportar interface. Tente usar screenshot manual.')
  }
}
</script>

<style scoped>
.cxa-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
}

/* Test Header (Fora da Interface) */
.test-header {
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 255, 157, 0.2);
  padding: 24px 40px;
}

.dashboard-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dashboard-title h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dashboard-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  font-size: 0.8rem;
  color: #10b981;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
}

/* Interface Tabs */
.interface-tabs {
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tabs-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 40px;
}

.tabs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.separator-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #00ff9d;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.experiment-counter {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 12px;
  border-radius: 12px;
}

.tabs-navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 255, 157, 0.3);
  transform: translateY(-2px);
}

.tab-btn.active {
  background: linear-gradient(135deg, rgba(0, 255, 157, 0.2), rgba(0, 123, 255, 0.2));
  border-color: #00ff9d;
  box-shadow: 0 8px 25px rgba(0, 255, 157, 0.2);
}

.tab-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.tab-info {
  flex: 1;
}

.tab-name {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2px;
}

.tab-description {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.3;
}

.tab-status {
  display: flex;
  align-items: center;
}

.tab-status .status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.tab-status.active .status-dot {
  background: #10b981;
  animation: pulse 2s infinite;
}

.tab-status.development .status-dot {
  background: #f59e0b;
}

.tab-status.planning .status-dot {
  background: #6b7280;
}

.tabs-controls {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.nav-btn {
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

.nav-btn:hover:not(:disabled) {
  background: rgba(0, 255, 157, 0.2);
  border-color: #00ff9d;
}

.nav-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Interface Container */
.interface-container {
  background: #0b1211;
  min-height: calc(100vh - 200px);
}

.experiment-content {
  min-height: calc(100vh - 200px);
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Experiment Previews */
.analytics-preview {
  max-width: 600px;
  margin: 0 auto;
}

.preview-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
}

.preview-card h3 {
  color: #00ff9d;
  margin-bottom: 16px;
  text-align: center;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.metric-item {
  text-align: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff9d;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Funnel Preview */
.funnel-preview {
  max-width: 500px;
  margin: 0 auto;
}

.funnel-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.funnel-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #007bff, #0056b3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
}

.step-name {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}

.funnel-arrow {
  font-size: 1.5rem;
  color: #007bff;
}

/* Mobile Preview */
.mobile-preview {
  display: flex;
  justify-content: center;
}

.mobile-frame {
  width: 250px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 16px;
}

.mobile-header {
  text-align: center;
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 16px;
}

.mobile-title {
  font-size: 1rem;
  font-weight: 600;
  color: #f59e0b;
}

.mobile-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.card-title {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
}

.card-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #f59e0b;
}

/* CXA Ultimate Styles */
.cxa-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 123, 255, 0.1));
  border: 1px solid rgba(0, 255, 157, 0.2);
  border-radius: 12px;
  margin-bottom: 16px;
}

.cxa-title-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cxa-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cxa-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cxa-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 4px 0 0 0;
}

.cxa-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.cxa-select {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
}

.automation-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 8px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

/* Alerts Bar */
.alerts-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  overflow-x: auto;
}

.alert-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  white-space: nowrap;
  min-width: 300px;
}

.alert-item.critical {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
}

.alert-item.warning {
  background: rgba(245, 158, 11, 0.2);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #fcd34d;
}

.alert-action {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.alert-action:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* CXA Grid */
.cxa-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 16px;
}

.cxa-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.cxa-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 255, 157, 0.3);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-header h3 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: white;
}

/* Journey Card */
.journey-health {
  color: #10b981;
  font-weight: 600;
  font-size: 0.9rem;
}

.journey-flow {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.journey-stage {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  position: relative;
}

.stage-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stage-icon.excellent {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stage-icon.good {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
}

.stage-icon.warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stage-info {
  flex: 1;
}

.stage-name {
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.stage-metrics {
  display: flex;
  gap: 12px;
  font-size: 0.8rem;
}

.conversion {
  color: #10b981;
  font-weight: 600;
}

.volume {
  color: rgba(255, 255, 255, 0.6);
}

.automation-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: rgba(0, 255, 157, 0.2);
  border: 1px solid rgba(0, 255, 157, 0.3);
  border-radius: 12px;
  font-size: 0.7rem;
  color: #00ff9d;
}

/* Revenue Card */
.revenue-trend {
  font-weight: 600;
  font-size: 0.9rem;
}

.revenue-trend.positive {
  color: #10b981;
}

.revenue-main {
  text-align: center;
  margin-bottom: 20px;
}

.revenue-value {
  font-size: 2.2rem;
  font-weight: 800;
  color: #00ff9d;
  margin-bottom: 4px;
}

.revenue-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.revenue-breakdown {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.breakdown-item .label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.breakdown-item .value {
  font-weight: 600;
  color: white;
}

.breakdown-item .value.churn {
  color: #f59e0b;
}

/* Automation Card */
.automation-efficiency {
  color: #00ff9d;
  font-weight: 600;
  font-size: 0.9rem;
}

.automation-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.automation-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.auto-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.auto-status.active {
  background: #10b981;
  animation: pulse 2s infinite;
}

.auto-status.paused {
  background: #f59e0b;
}

.auto-info {
  flex: 1;
}

.auto-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2px;
}

.auto-impact {
  font-size: 0.8rem;
  color: #10b981;
}

.auto-saves {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

/* Prediction Card */
.prediction-accuracy {
  color: #007bff;
  font-weight: 600;
  font-size: 0.9rem;
}

.predictions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.prediction-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.prediction-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
}

.prediction-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.prediction-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #00ff9d;
  margin-bottom: 2px;
}

.prediction-confidence {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Experience Card */
.experience-score {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fbbf24;
}

.experience-breakdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.score-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  min-width: 80px;
}

.score-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  transition: width 0.3s ease;
}

.score-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: #fbbf24;
  min-width: 30px;
  text-align: right;
}

/* Opportunities Card */
.opportunity-potential {
  color: #00ff9d;
  font-weight: 700;
  font-size: 1rem;
}

.opportunities-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.opportunity-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.opp-priority {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.opp-priority.high {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

.opp-priority.medium {
  background: rgba(245, 158, 11, 0.2);
  color: #fcd34d;
}

.opp-priority.low {
  background: rgba(107, 114, 128, 0.2);
  color: #d1d5db;
}

.opp-content {
  flex: 1;
}

.opp-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
  margin-bottom: 2px;
}

.opp-impact {
  font-size: 0.8rem;
  color: #10b981;
}

.opp-action {
  padding: 6px 12px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.opp-action:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 255, 157, 0.3);
}

/* Knowledge System 360° */
.knowledge-system {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1));
  border-top: 2px solid rgba(251, 191, 36, 0.3);
  padding: 40px 24px;
  margin-top: 40px;
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

.knowledge-header {
  text-align: center;
  margin-bottom: 32px;
}

.knowledge-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fbbf24;
  margin: 0 0 8px 0;
}

.knowledge-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.knowledge-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
  50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.6); }
}

.knowledge-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fbbf24;
  margin: 0 0 8px 0;
}

.knowledge-header p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Wisdom Pills */
.wisdom-pills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.pill-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
}

.pill-card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(251, 191, 36, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(251, 191, 36, 0.2);
}

.pill-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.pill-header h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fbbf24;
  margin: 0;
}

.pill-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.pill-content p {
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}

.pill-content strong {
  color: #fbbf24;
  font-weight: 600;
}

/* Responsive Pills */
@media (max-width: 768px) {
  .wisdom-pills {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .knowledge-section {
    padding: 24px 16px;
  }
  
  .pill-card {
    padding: 20px;
  }
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.breadcrumb-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(0, 255, 157, 0.1);
  border: 1px solid rgba(0, 255, 157, 0.3);
  border-radius: 6px;
  color: #00ff9d;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.breadcrumb-btn:hover {
  background: rgba(0, 255, 157, 0.2);
}

.breadcrumb-current {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}



/* Chart Mocks */
.chart-placeholder {
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-mock {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-bars {
  display: flex;
  justify-content: space-around;
  align-items: end;
  height: 180px;
  padding: 0 10px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.bar-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

.bars {
  display: flex;
  gap: 4px;
  align-items: end;
}

.bar {
  width: 12px;
  border-radius: 2px 2px 0 0;
  transition: all 0.3s ease;
}

.bar.visits {
  background: #2563eb;
}

.bar.leads {
  background: #10b981;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-color.visits {
  background: #2563eb;
}

.legend-color.leads {
  background: #10b981;
}

/* Line Chart Mock */
.line-chart-mock {
  width: 100%;
  height: 100%;
  position: relative;
}

.chart-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-line {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.chart-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40px;
}

/* Base Styles */
.bg-surface-950 { 
  background: #0b1211; 
}

.elevated-card { 
  background: #0d1514; 
  border-color: rgba(255,255,255,0.08) !important; 
}

.elevated-card.warn { 
  border-color: rgba(244, 63, 94, 0.5) !important; 
}

.text-rose { 
  color: #fb7185; 
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>