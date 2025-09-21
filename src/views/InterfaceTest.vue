<template>
  <div class="interface-test">
    <!-- Test Header -->
    <div class="test-header">
      <div class="header-content">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb-nav">
          <button class="breadcrumb-btn" @click="$router.push('/labs')">
            <v-icon size="16">mdi-arrow-left</v-icon>
            HIBRIT Labs
          </button>
          <v-icon size="12" color="#9ca3af">mdi-chevron-right</v-icon>
          <span class="breadcrumb-current">Teste de Componentes</span>
        </div>
        
        <!-- Test Info -->
        <div class="test-info">
          <div class="test-title">
            <h1>Dashboard Components Test</h1>
            <div class="test-status running">
              <div class="status-dot"></div>
              <span>Teste Ativo</span>
            </div>
          </div>
          
          <div class="test-metadata">
            <div class="meta-item">
              <span class="meta-label">Tipo:</span>
              <span class="meta-value">Visual Interface Testing</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Componentes:</span>
              <span class="meta-value">Cards, Charts, Tables, KPIs</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Iniciado:</span>
              <span class="meta-value">{{ new Date().toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Test Controls -->
    <div class="test-controls">
      <div class="controls-section">
        <h3>Controles do Teste</h3>
        <div class="control-group">
          <label>Tema:</label>
          <select v-model="theme" class="control-select">
            <option value="dark">Dark Mode</option>
            <option value="light">Light Mode</option>
            <option value="neon">Neon Lab</option>
          </select>
        </div>
        
        <div class="control-group">
          <label>Densidade:</label>
          <select v-model="density" class="control-select">
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
            <option value="spacious">Spacious</option>
          </select>
        </div>
        
        <div class="control-group">
          <label>Animações:</label>
          <input v-model="animations" type="checkbox" class="control-checkbox">
        </div>
      </div>
    </div>

    <!-- Test Dashboard -->
    <div class="test-dashboard" :class="[theme, density, { animated: animations }]">
      <v-container fluid class="pa-4 bg-surface-950 text-white">
        <!-- Header -->
        <v-row class="mb-4" align="center" justify="space-between" no-gutters>
          <v-col cols="12" md="6" class="mb-4 mb-md-0">
            <div class="text-white text-opacity-70 text-caption">Teste de Interface - HIBRIT LABS</div>
            <div class="text-h5 font-weight-bold">Dashboard de Componentes Visuais</div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex ga-2 justify-end align-center">
            <v-select
              v-model="selectedClient"
              :items="clientItems"
              item-title="name"
              item-value="id"
              density="comfortable"
              variant="outlined"
              class="w-50"
              hide-details
              label="Cliente Teste"
            />
            <v-chip-group v-model="range" class="bg-white bg-opacity-5 rounded-lg px-2 py-1" selected-class="bg-white bg-opacity-15">
              <v-chip v-for="r in ranges" :key="r.id" :value="r.id" size="small" variant="text">{{ r.label }}</v-chip>
            </v-chip-group>
          </v-col>
        </v-row>

        <!-- KPI Row -->
        <v-row class="mb-4" dense>
          <v-col v-for="k in kpiCards" :key="k.label" cols="6" md="4" lg="2">
            <v-card :class="['elevated-card test-card', k.warn ? 'warn' : '']" variant="outlined">
              <v-card-text>
                <div class="text-caption text-white text-opacity-70 text-uppercase">{{ k.label }}</div>
                <div class="text-h5 font-weight-bold mt-1">{{ k.value }}</div>
                <div v-if="k.sub" class="text-caption text-white text-opacity-60 mt-1">{{ k.sub }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Component Test Grid -->
        <v-row dense>
          <!-- Test Card 1: Button Variants -->
          <v-col cols="12" md="4">
            <v-card class="elevated-card test-card" variant="outlined">
              <v-card-title class="text-subtitle-2 text-white text-opacity-90">Button Component Tests</v-card-title>
              <v-card-text>
                <div class="component-showcase">
                  <div class="showcase-group">
                    <h4>Primary Buttons</h4>
                    <div class="button-grid">
                      <button class="test-btn primary">Primary</button>
                      <button class="test-btn primary-outline">Primary Outline</button>
                      <button class="test-btn primary-ghost">Primary Ghost</button>
                    </div>
                  </div>
                  
                  <div class="showcase-group">
                    <h4>Secondary Buttons</h4>
                    <div class="button-grid">
                      <button class="test-btn secondary">Secondary</button>
                      <button class="test-btn secondary-outline">Secondary Outline</button>
                      <button class="test-btn secondary-ghost">Secondary Ghost</button>
                    </div>
                  </div>
                  
                  <div class="showcase-group">
                    <h4>State Buttons</h4>
                    <div class="button-grid">
                      <button class="test-btn success">Success</button>
                      <button class="test-btn warning">Warning</button>
                      <button class="test-btn danger">Danger</button>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Test Card 2: Form Components -->
          <v-col cols="12" md="4">
            <v-card class="elevated-card test-card" variant="outlined">
              <v-card-title class="text-subtitle-2 text-white text-opacity-90">Form Component Tests</v-card-title>
              <v-card-text>
                <div class="form-showcase">
                  <div class="form-group">
                    <label>Input Field</label>
                    <input v-model="testInput" class="test-input" placeholder="Digite algo...">
                  </div>
                  
                  <div class="form-group">
                    <label>Select Field</label>
                    <select v-model="testSelect" class="test-select">
                      <option value="">Selecione...</option>
                      <option value="opt1">Opção 1</option>
                      <option value="opt2">Opção 2</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label>Checkbox & Radio</label>
                    <div class="checkbox-group">
                      <label class="checkbox-label">
                        <input v-model="testCheck" type="checkbox">
                        <span>Checkbox Test</span>
                      </label>
                      <label class="radio-label">
                        <input v-model="testRadio" type="radio" value="radio1">
                        <span>Radio Test</span>
                      </label>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label>Range Slider</label>
                    <input v-model="testRange" type="range" min="0" max="100" class="test-range">
                    <span class="range-value">{{ testRange }}%</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Test Card 3: Data Display -->
          <v-col cols="12" md="4">
            <v-card class="elevated-card test-card" variant="outlined">
              <v-card-title class="text-subtitle-2 text-white text-opacity-90">Data Display Tests</v-card-title>
              <v-card-text>
                <div class="data-showcase">
                  <div class="metric-cards">
                    <div class="metric-card">
                      <div class="metric-value">{{ formatNumber(12847) }}</div>
                      <div class="metric-label">Total Users</div>
                      <div class="metric-change positive">+12.5%</div>
                    </div>
                    
                    <div class="metric-card">
                      <div class="metric-value">{{ formatCurrency(45230) }}</div>
                      <div class="metric-label">Revenue</div>
                      <div class="metric-change negative">-3.2%</div>
                    </div>
                  </div>
                  
                  <div class="progress-showcase">
                    <div class="progress-item">
                      <span>Conversão</span>
                      <div class="progress-bar">
                        <div class="progress-fill" :style="{ width: '67%' }"></div>
                      </div>
                      <span>67%</span>
                    </div>
                    
                    <div class="progress-item">
                      <span>Retenção</span>
                      <div class="progress-bar">
                        <div class="progress-fill success" :style="{ width: '89%' }"></div>
                      </div>
                      <span>89%</span>
                    </div>
                  </div>
                  
                  <div class="badge-showcase">
                    <span class="test-badge success">Ativo</span>
                    <span class="test-badge warning">Pendente</span>
                    <span class="test-badge danger">Erro</span>
                    <span class="test-badge info">Info</span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Test Results -->
        <v-row class="mt-4">
          <v-col cols="12">
            <v-card class="elevated-card test-card" variant="outlined">
              <v-card-title class="text-subtitle-2 text-white text-opacity-90">Resultados do Teste</v-card-title>
              <v-card-text>
                <div class="test-results">
                  <div class="result-header">
                    <div class="result-grid">
                      <div class="result-item">
                        <h4>Componentes Testados</h4>
                        <div class="result-value">{{ componentCount }}</div>
                      </div>
                      <div class="result-item">
                        <h4>Variações</h4>
                        <div class="result-value">{{ variationCount }}</div>
                      </div>
                      <div class="result-item">
                        <h4>Status</h4>
                        <div class="result-value success">Aprovado</div>
                      </div>
                      <div class="result-item">
                        <h4>Score Visual</h4>
                        <div class="result-value">{{ visualScore }}/100</div>
                      </div>
                    </div>
                    
                    <div class="interface-action">
                      <button class="open-interface-btn" @click="$router.push('/labs/cxa-dashboard')">
                        <v-icon size="20">mdi-monitor-dashboard</v-icon>
                        <span>ABRIR INTERFACE</span>
                        <v-icon size="16">mdi-arrow-right</v-icon>
                      </button>
                      <p class="interface-description">Visualizar dashboard CXA completo em tela dedicada</p>
                    </div>
                  </div>
                  
                  <div class="test-notes">
                    <h4>Observações do Teste:</h4>
                    <ul>
                      <li>Todos os componentes renderizam corretamente</li>
                      <li>Responsividade funcional em diferentes densidades</li>
                      <li>Animações suaves quando habilitadas</li>
                      <li>Contraste adequado em modo escuro</li>
                      <li>Interações funcionais em todos os elementos</li>
                    </ul>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Test Controls
const theme = ref('dark')
const density = ref('comfortable')
const animations = ref(true)

// Test Data
const selectedClient = ref('test')
const range = ref('30d')
const testInput = ref('')
const testSelect = ref('')
const testCheck = ref(false)
const testRadio = ref('')
const testRange = ref(50)

const clientItems = [
  { id: 'test', name: 'Cliente Teste' },
  { id: 'demo', name: 'Demo Client' },
  { id: 'sample', name: 'Sample Corp' }
]

const ranges = [
  { id: '7d', label: '7d' },
  { id: '30d', label: '30d' },
  { id: '90d', label: '90d' }
]

const kpiCards = computed(() => [
  { label: 'Componentes', value: '24', sub: 'testados' },
  { label: 'Variações', value: '156', sub: 'diferentes' },
  { label: 'Score', value: '94%', sub: 'aprovação' },
  { label: 'Performance', value: '2.1s', sub: 'render time' },
  { label: 'Acessibilidade', value: '98%', sub: 'WCAG AA' },
  { label: 'Responsivo', value: '100%', sub: 'breakpoints', warn: false }
])

const componentCount = computed(() => 24)
const variationCount = computed(() => 156)
const visualScore = computed(() => 94)

// Helpers
const formatNumber = (n) => n.toLocaleString('pt-BR')
const formatCurrency = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
</script>

<style scoped>
.interface-test {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
}

/* Test Header */
.test-header {
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 255, 157, 0.2);
  padding: 24px 40px;
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

.test-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.test-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.test-title h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.test-status {
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

.test-metadata {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-item {
  display: flex;
  gap: 8px;
  font-size: 0.9rem;
}

.meta-label {
  color: rgba(255, 255, 255, 0.6);
  min-width: 80px;
}

.meta-value {
  color: white;
  font-weight: 500;
}

/* Test Controls */
.test-controls {
  background: rgba(0, 0, 0, 0.3);
  padding: 20px 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.controls-section {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
}

.controls-section h3 {
  font-size: 1rem;
  margin: 0;
  color: #00ff9d;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-group label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.control-select {
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
}

.control-checkbox {
  width: 16px;
  height: 16px;
}

/* Test Dashboard */
.test-dashboard {
  transition: all 0.3s ease;
}

.test-dashboard.animated .test-card {
  animation: cardFadeIn 0.5s ease-out;
}

@keyframes cardFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.test-dashboard.neon {
  background: linear-gradient(135deg, #000 0%, #1a0033 50%, #330066 100%);
}

.test-dashboard.light {
  background: #f8fafc;
  color: #1f2937;
}

.test-dashboard.compact .test-card {
  padding: 12px !important;
}

.test-dashboard.spacious .test-card {
  padding: 32px !important;
}

/* Component Showcase */
.component-showcase {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.showcase-group h4 {
  font-size: 0.9rem;
  color: #00ff9d;
  margin: 0 0 8px 0;
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.test-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.test-btn.primary {
  background: #2563eb;
  color: white;
}

.test-btn.primary-outline {
  background: transparent;
  border-color: #2563eb;
  color: #2563eb;
}

.test-btn.primary-ghost {
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
}

.test-btn.secondary {
  background: #6b7280;
  color: white;
}

.test-btn.secondary-outline {
  background: transparent;
  border-color: #6b7280;
  color: #6b7280;
}

.test-btn.secondary-ghost {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.test-btn.success {
  background: #10b981;
  color: white;
}

.test-btn.warning {
  background: #f59e0b;
  color: white;
}

.test-btn.danger {
  background: #ef4444;
  color: white;
}

/* Form Showcase */
.form-showcase {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.9rem;
  color: #00ff9d;
  font-weight: 500;
}

.test-input, .test-select {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
}

.test-input:focus, .test-select:focus {
  outline: none;
  border-color: #00ff9d;
  box-shadow: 0 0 0 2px rgba(0, 255, 157, 0.2);
}

.checkbox-group {
  display: flex;
  gap: 16px;
}

.checkbox-label, .radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  cursor: pointer;
}

.test-range {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
}

.range-value {
  font-size: 0.8rem;
  color: #00ff9d;
  font-weight: 600;
}

/* Data Showcase */
.data-showcase {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.metric-cards {
  display: flex;
  gap: 12px;
}

.metric-card {
  flex: 1;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-align: center;
}

.metric-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #00ff9d;
}

.metric-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 4px 0;
}

.metric-change {
  font-size: 0.8rem;
  font-weight: 600;
}

.metric-change.positive {
  color: #10b981;
}

.metric-change.negative {
  color: #ef4444;
}

.progress-showcase {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #2563eb;
  transition: width 0.3s ease;
}

.progress-fill.success {
  background: #10b981;
}

.badge-showcase {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.test-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.test-badge.success {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.test-badge.warning {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.test-badge.danger {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.test-badge.info {
  background: rgba(37, 99, 235, 0.2);
  color: #2563eb;
}

/* Test Results */
.test-results {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px;
}

.interface-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.open-interface-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0, 255, 157, 0.3);
}

.open-interface-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 35px rgba(0, 255, 157, 0.5);
}

.open-interface-btn:active {
  transform: translateY(-2px) scale(1.02);
}

.interface-description {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin: 0;
  max-width: 200px;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  flex: 1;
}

.result-item {
  text-align: center;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.result-item h4 {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 8px 0;
}

.result-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #00ff9d;
}

.result-value.success {
  color: #10b981;
}

.test-notes h4 {
  font-size: 1rem;
  color: #00ff9d;
  margin: 0 0 12px 0;
}

.test-notes ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.test-notes li {
  padding: 4px 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.test-notes li::before {
  content: '✓';
  color: #10b981;
  font-weight: bold;
  margin-right: 8px;
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

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>