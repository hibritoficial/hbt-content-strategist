<template>
  <div class="experiment-page">
    <!-- Header -->
    <div class="experiment-header">
      <div class="breadcrumb-nav">
        <button class="breadcrumb-btn" @click="$router.push('/labs')">
          <v-icon size="16">mdi-arrow-left</v-icon>
          HIBRIT Labs
        </button>
        <v-icon size="12" color="#9ca3af">mdi-chevron-right</v-icon>
        <span class="breadcrumb-current">CXA Dashboard</span>
      </div>
      
      <div class="experiment-info">
        <h1>🎯 CXA Dashboard - Funis & Receita</h1>
        <div class="header-actions">
          <button class="knowledge-btn" @click="scrollToKnowledge">
            <v-icon size="16">mdi-brain</v-icon>
            Sistema 360°
          </button>
          <button class="export-btn" @click="exportInterface">
            <v-icon size="16">mdi-camera</v-icon>
            Exportar Interface
          </button>
        </div>
      </div>
    </div>

    <!-- Interface -->
    <div id="interface-capture" class="interface-content">
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
    </div>

    <!-- Other Experiments -->
    <KnowledgeSystem experiment-type="cxa-dashboard" experiment-name="CXA Dashboard" />
    <OtherExperiments current-experiment="cxa-dashboard" />
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import OtherExperiments from '@/components/OtherExperiments.vue'
import KnowledgeSystem from '@/components/KnowledgeSystem.vue'

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

const exportInterface = () => {
  console.log('Export CXA Dashboard')
}

const scrollToKnowledge = () => {
  document.querySelector('.knowledge-system').scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.experiment-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
}

.experiment-header {
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 255, 157, 0.2);
  padding: 24px 40px;
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

.experiment-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.experiment-info h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.knowledge-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.knowledge-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4);
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

.interface-content {
  background: #0b1211;
  min-height: 60vh;
}

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
</style>