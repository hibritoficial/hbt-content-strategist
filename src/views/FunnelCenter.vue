<template>
  <div class="funnel-center">
    <!-- Floating Action Menu -->
    <FloatingActionMenu 
      :actions="floatingActions"
      main-icon="mdi-crown"
      main-color="deep-purple"
    />
    <!-- ULTIMATE Hero Section -->
    <div class="ultimate-hero">
      <div class="hero-background">
        <div class="floating-icons">
          <v-icon v-for="i in 20" :key="i" class="floating-icon" :style="getFloatingStyle(i)">
            {{ getRandomIcon() }}
          </v-icon>
        </div>
      </div>
      
      <div class="hero-content">
        <div class="ultimate-badge">
          <v-icon class="crown-icon">mdi-crown</v-icon>
          ULTIMATE STRATEGY
        </div>
        
        <h1 class="ultimate-title">
          <span class="gradient-text">Funnel Command Center</span>
        </h1>
        
        <p class="ultimate-subtitle">
          O coração estratégico que faz sua empresa <strong>LITERALMENTE FUNCIONAR</strong>
        </p>
        
        <div class="power-metrics">
          <div class="power-metric">
            <div class="metric-icon">
              <v-icon size="32" color="white">mdi-trending-up</v-icon>
            </div>
            <div class="metric-content">
              <div class="metric-number">{{ totalConversions.toLocaleString() }}</div>
              <div class="metric-label">Conversões Totais</div>
            </div>
          </div>
          
          <div class="power-metric">
            <div class="metric-icon">
              <v-icon size="32" color="white">mdi-cash-multiple</v-icon>
            </div>
            <div class="metric-content">
              <div class="metric-number">R$ {{ totalRevenue.toLocaleString() }}</div>
              <div class="metric-label">Receita Gerada</div>
            </div>
          </div>
          
          <div class="power-metric">
            <div class="metric-icon">
              <v-icon size="32" color="white">mdi-rocket-launch</v-icon>
            </div>
            <div class="metric-content">
              <div class="metric-number">{{ activeFunnels }}</div>
              <div class="metric-label">Funis Ativos</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Command Dashboard -->
    <div class="command-dashboard">
      <!-- Funnel Performance Matrix -->
      <v-card class="matrix-card ultimate-card" elevation="0">
        <div class="card-header ultimate-header">
          <div class="header-icon">
            <v-icon color="white" size="28">mdi-matrix</v-icon>
          </div>
          <div class="header-content">
            <h3>Performance Matrix</h3>
            <p>Visão estratégica de todos os funis</p>
          </div>
          <v-chip color="success" variant="elevated">{{ activeFunnels }} Ativos</v-chip>
        </div>
        
        <div class="matrix-grid">
          <div v-for="funnel in funnels" :key="funnel.id" class="funnel-matrix-item" @click="selectFunnel(funnel)">
            <div class="funnel-header">
              <div class="funnel-name">{{ funnel.name }}</div>
              <v-chip :color="getFunnelStatusColor(funnel.performance)" size="small">
                {{ getFunnelStatus(funnel.performance) }}
              </v-chip>
            </div>
            
            <div class="funnel-metrics">
              <div class="mini-metric">
                <span class="mini-label">Conversão</span>
                <span class="mini-value">{{ funnel.conversionRate }}%</span>
              </div>
              <div class="mini-metric">
                <span class="mini-label">Receita</span>
                <span class="mini-value">R$ {{ funnel.revenue.toLocaleString() }}</span>
              </div>
            </div>
            
            <div class="funnel-stages">
              <div v-for="stage in funnel.stages" :key="stage.id" class="stage-bar">
                <div class="stage-fill" :style="{ width: stage.fillPercentage + '%', backgroundColor: stage.color }"></div>
              </div>
            </div>
          </div>
        </div>
      </v-card>

      <!-- Strategic Intelligence -->
      <v-card class="intelligence-card ultimate-card" elevation="0">
        <div class="card-header ultimate-header">
          <div class="header-icon">
            <v-icon color="white" size="28">mdi-brain</v-icon>
          </div>
          <div class="header-content">
            <h3>Strategic Intelligence</h3>
            <p>IA estratégica para otimização</p>
          </div>
          <v-chip color="warning" variant="elevated">
            <v-icon left size="16">mdi-lightning-bolt</v-icon>
            AI Powered
          </v-chip>
        </div>
        
        <div class="intelligence-content">
          <div class="ai-insights">
            <div v-for="insight in aiInsights" :key="insight.id" class="insight-item" :class="insight.priority">
              <div class="insight-icon">
                <v-icon :color="insight.iconColor">{{ insight.icon }}</v-icon>
              </div>
              <div class="insight-content">
                <div class="insight-title">{{ insight.title }}</div>
                <div class="insight-description">{{ insight.description }}</div>
                <div class="insight-impact">Impacto: +{{ insight.impact }}% conversão</div>
              </div>
              <v-btn :color="insight.actionColor" size="small" variant="elevated">
                {{ insight.actionLabel }}
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>

      <!-- Funnel Flow Visualizer -->
      <v-card class="flow-card ultimate-card" elevation="0">
        <div class="card-header ultimate-header">
          <div class="header-icon">
            <v-icon color="white" size="28">mdi-chart-sankey-variant</v-icon>
          </div>
          <div class="header-content">
            <h3>Flow Visualizer</h3>
            <p>Fluxo em tempo real</p>
          </div>
          <v-chip color="info" variant="elevated">Live</v-chip>
        </div>
        
        <div class="flow-content">
          <div class="flow-stages">
            <div v-for="(stage, index) in selectedFunnelStages" :key="stage.id" class="flow-stage">
              <div class="stage-info">
                <div class="stage-name">{{ stage.name }}</div>
                <div class="stage-count">{{ stage.count.toLocaleString() }}</div>
                <div class="stage-rate">{{ stage.rate }}%</div>
              </div>
              
              <div v-if="index < selectedFunnelStages.length - 1" class="flow-connector">
                <div class="connector-line" :style="{ height: getConnectorHeight(stage, selectedFunnelStages[index + 1]) + 'px' }">
                  <div class="flow-animation"></div>
                </div>
                <div class="drop-rate">-{{ stage.dropRate }}%</div>
              </div>
            </div>
          </div>
        </div>
      </v-card>

      <!-- Content Blood System -->
      <v-card class="blood-card ultimate-card" elevation="0">
        <div class="card-header ultimate-header">
          <div class="header-icon">
            <v-icon color="white" size="28">mdi-water</v-icon>
          </div>
          <div class="header-content">
            <h3>Content Blood System</h3>
            <p>O sangue que corre no funil</p>
          </div>
          <v-chip color="error" variant="elevated">
            <v-icon left size="16">mdi-heart-pulse</v-icon>
            Vital
          </v-chip>
        </div>
        
        <div class="blood-content">
          <div class="blood-flow">
            <div class="blood-vessel">
              <div class="blood-stream">
                <div v-for="content in contentFlow" :key="content.id" class="blood-cell" :class="content.type">
                  <v-icon size="16" color="white">{{ content.icon }}</v-icon>
                </div>
              </div>
            </div>
          </div>
          
          <div class="content-stats">
            <div class="content-stat">
              <v-icon color="red">mdi-instagram</v-icon>
              <span>{{ contentStats.instagram }} Posts</span>
            </div>
            <div class="content-stat">
              <v-icon color="blue">mdi-email</v-icon>
              <span>{{ contentStats.email }} Emails</span>
            </div>
            <div class="content-stat">
              <v-icon color="green">mdi-video</v-icon>
              <span>{{ contentStats.video }} Vídeos</span>
            </div>
            <div class="content-stat">
              <v-icon color="orange">mdi-post</v-icon>
              <span>{{ contentStats.blog }} Blogs</span>
            </div>
          </div>
        </div>
      </v-card>

      <!-- Ultimate Actions -->
      <v-card class="actions-card ultimate-card" elevation="0">
        <div class="card-header ultimate-header">
          <div class="header-icon">
            <v-icon color="white" size="28">mdi-lightning-bolt</v-icon>
          </div>
          <div class="header-content">
            <h3>Ultimate Actions</h3>
            <p>Comandos estratégicos</p>
          </div>
        </div>
        
        <div class="ultimate-actions">
          <v-btn 
            v-for="action in ultimateActions" 
            :key="action.id"
            :color="action.color"
            variant="elevated"
            size="large"
            class="ultimate-action-btn"
            @click="action.action"
          >
            <v-icon left>{{ action.icon }}</v-icon>
            {{ action.label }}
            <v-chip v-if="action.badge" color="white" size="x-small" class="ml-2">{{ action.badge }}</v-chip>
          </v-btn>
        </div>
      </v-card>

      <!-- Gamification Center -->
      <v-card class="gamification-card ultimate-card" elevation="0">
        <div class="card-header ultimate-header">
          <div class="header-icon">
            <v-icon color="white" size="28">mdi-trophy</v-icon>
          </div>
          <div class="header-content">
            <h3>Funnel Mastery</h3>
            <p>Sistema de conquistas</p>
          </div>
          <v-chip color="gold" variant="elevated">
            <v-icon left size="16">mdi-star</v-icon>
            Nível {{ playerLevel }}
          </v-chip>
        </div>
        
        <div class="gamification-content">
          <div class="mastery-progress">
            <div class="progress-ring">
              <svg viewBox="0 0 100 100" class="progress-svg">
                <circle cx="50" cy="50" r="45" class="progress-bg"/>
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  class="progress-fill"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="masteryOffset"
                />
              </svg>
              <div class="progress-center">
                <div class="level-number">{{ playerLevel }}</div>
                <div class="level-label">Master</div>
              </div>
            </div>
            
            <div class="mastery-info">
              <div class="xp-bar">
                <div class="xp-fill" :style="{ width: xpPercentage + '%' }"></div>
              </div>
              <div class="xp-text">{{ currentXP }} / {{ nextLevelXP }} XP</div>
            </div>
          </div>
          
          <div class="achievements">
            <div v-for="achievement in achievements" :key="achievement.id" class="achievement" :class="{ earned: achievement.earned }">
              <v-icon :color="achievement.earned ? achievement.color : 'grey'">{{ achievement.icon }}</v-icon>
              <div class="achievement-info">
                <div class="achievement-name">{{ achievement.name }}</div>
                <div class="achievement-desc">{{ achievement.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FloatingActionMenu from '@/components/FloatingActionMenu.vue'

const router = useRouter()

// Dados estratégicos
const totalConversions = ref(15847)
const totalRevenue = ref(2847392)
const activeFunnels = ref(7)
const playerLevel = ref(8)
const currentXP = ref(2340)
const nextLevelXP = ref(3000)

const xpPercentage = computed(() => (currentXP.value / nextLevelXP.value) * 100)
const circumference = 2 * Math.PI * 45
const masteryOffset = computed(() => circumference - (xpPercentage.value / 100) * circumference)

// Funis estratégicos
const funnels = ref([
  {
    id: 1,
    name: 'Aquisição Premium',
    conversionRate: 23.4,
    revenue: 847392,
    performance: 95,
    stages: [
      { id: 1, fillPercentage: 100, color: '#4CAF50' },
      { id: 2, fillPercentage: 67, color: '#FF9800' },
      { id: 3, fillPercentage: 23, color: '#F44336' }
    ]
  },
  {
    id: 2,
    name: 'Retenção VIP',
    conversionRate: 45.7,
    revenue: 1200000,
    performance: 88,
    stages: [
      { id: 1, fillPercentage: 100, color: '#4CAF50' },
      { id: 2, fillPercentage: 78, color: '#FF9800' },
      { id: 3, fillPercentage: 46, color: '#2196F3' }
    ]
  },
  {
    id: 3,
    name: 'Upsell Master',
    conversionRate: 34.2,
    revenue: 650000,
    performance: 92,
    stages: [
      { id: 1, fillPercentage: 100, color: '#4CAF50' },
      { id: 2, fillPercentage: 85, color: '#FF9800' },
      { id: 3, fillPercentage: 34, color: '#9C27B0' }
    ]
  }
])

const selectedFunnelStages = ref([
  { id: 1, name: 'Awareness', count: 10000, rate: 100, dropRate: 45 },
  { id: 2, name: 'Interest', count: 5500, rate: 55, dropRate: 32 },
  { id: 3, name: 'Consideration', count: 3740, rate: 68, dropRate: 28 },
  { id: 4, name: 'Purchase', count: 2693, rate: 72, dropRate: 15 },
  { id: 5, name: 'Advocacy', count: 2289, rate: 85, dropRate: 0 }
])

// IA Insights
const aiInsights = ref([
  {
    id: 1,
    title: 'Otimização Crítica Detectada',
    description: 'Etapa "Consideration" com 28% de drop. Recomendo A/B test no CTA.',
    impact: 12,
    priority: 'critical',
    icon: 'mdi-alert-circle',
    iconColor: 'error',
    actionLabel: 'Otimizar',
    actionColor: 'error'
  },
  {
    id: 2,
    title: 'Oportunidade de Upsell',
    description: 'Clientes VIP mostram 67% mais engajamento. Criar funil específico.',
    impact: 23,
    priority: 'high',
    icon: 'mdi-trending-up',
    iconColor: 'success',
    actionLabel: 'Criar Funil',
    actionColor: 'success'
  },
  {
    id: 3,
    title: 'Conteúdo de Alto Impacto',
    description: 'Vídeos geram 3x mais conversões. Aumentar produção de vídeo.',
    impact: 18,
    priority: 'medium',
    icon: 'mdi-video',
    iconColor: 'info',
    actionLabel: 'Implementar',
    actionColor: 'info'
  }
])

// Sistema de Sangue (Conteúdo)
const contentFlow = ref([
  { id: 1, type: 'instagram', icon: 'mdi-instagram' },
  { id: 2, type: 'email', icon: 'mdi-email' },
  { id: 3, type: 'video', icon: 'mdi-video' },
  { id: 4, type: 'blog', icon: 'mdi-post' },
  { id: 5, type: 'instagram', icon: 'mdi-instagram' },
  { id: 6, type: 'email', icon: 'mdi-email' }
])

const contentStats = ref({
  instagram: 45,
  email: 23,
  video: 12,
  blog: 8
})

// Ações Ultimate
const ultimateActions = ref([
  { id: 1, label: 'Criar Funil', icon: 'mdi-plus-circle', color: 'primary', badge: 'Novo', action: () => router.push('/funnels/new') },
  { id: 2, label: 'A/B Test', icon: 'mdi-test-tube', color: 'orange', action: () => {} },
  { id: 3, label: 'Analytics', icon: 'mdi-chart-line', color: 'green', action: () => {} },
  { id: 4, label: 'Automação', icon: 'mdi-robot', color: 'purple', badge: 'AI', action: () => {} }
])

// Floating Actions para o menu flutuante
const floatingActions = ref([
  { id: 1, label: 'Novo Funil ULTIMATE', icon: 'mdi-plus-circle', color: 'rgba(103, 58, 183, 0.9)', action: () => router.push('/funnels/new') },
  { id: 2, label: 'A/B Test Inteligente', icon: 'mdi-test-tube', color: 'rgba(255, 152, 0, 0.8)', action: () => console.log('A/B Test') },
  { id: 3, label: 'Analytics Avançado', icon: 'mdi-chart-sankey', color: 'rgba(76, 175, 80, 0.8)', action: () => router.push('/metrics') },
  { id: 4, label: 'IA Stratégica', icon: 'mdi-brain', color: 'rgba(33, 150, 243, 0.8)', action: () => console.log('AI Strategy') },
  { id: 5, label: 'Otimização Auto', icon: 'mdi-robot', color: 'rgba(156, 39, 176, 0.8)', action: () => console.log('Auto Optimization') },
  { id: 6, label: 'Funis Ativos', icon: 'mdi-view-list', color: 'rgba(0, 150, 136, 0.8)', action: () => router.push('/funnels') }
])

// Gamificação
const achievements = ref([
  { id: 1, name: 'Funnel Master', description: 'Criou 5 funis', icon: 'mdi-trophy', color: 'gold', earned: true },
  { id: 2, name: 'Conversion King', description: '90%+ conversão', icon: 'mdi-crown', color: 'purple', earned: true },
  { id: 3, name: 'Revenue Rocket', description: 'R$ 1M+ gerado', icon: 'mdi-rocket', color: 'red', earned: false },
  { id: 4, name: 'AI Strategist', description: 'Usou 10 insights IA', icon: 'mdi-brain', color: 'blue', earned: false }
])

// Funções
const getFunnelStatusColor = (performance) => {
  if (performance >= 90) return 'success'
  if (performance >= 75) return 'warning'
  return 'error'
}

const getFunnelStatus = (performance) => {
  if (performance >= 90) return 'ULTIMATE'
  if (performance >= 75) return 'STRONG'
  return 'NEEDS BOOST'
}

const selectFunnel = (funnel) => {
  router.push(`/funnels/${funnel.id}`)
}

const getConnectorHeight = (stage1, stage2) => {
  return Math.max(20, (stage1.count - stage2.count) / 100)
}

const getFloatingStyle = (index) => {
  return {
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    animationDelay: Math.random() * 3 + 's',
    animationDuration: (3 + Math.random() * 4) + 's'
  }
}

const getRandomIcon = () => {
  const icons = ['mdi-chart-line', 'mdi-trending-up', 'mdi-cash', 'mdi-target', 'mdi-rocket', 'mdi-crown', 'mdi-star']
  return icons[Math.floor(Math.random() * icons.length)]
}

onMounted(() => {
  // Animações de entrada
  document.querySelectorAll('.ultimate-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    card.classList.add('slide-in-up')
  })
})
</script>

<style scoped>
.funnel-center {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.ultimate-hero {
  position: relative;
  padding: 80px 40px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.floating-icons {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-icon {
  position: absolute;
  color: rgba(255, 255, 255, 0.1);
  font-size: 24px;
  animation: float infinite ease-in-out;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  color: white;
}

.ultimate-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 12px 24px;
  border-radius: 50px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 32px;
  animation: pulse-glow 2s infinite;
}

.crown-icon {
  color: #FFD700 !important;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
  50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.5); }
}

.ultimate-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 24px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.gradient-text {
  background: linear-gradient(45deg, #fff, #f093fb, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.ultimate-subtitle {
  font-size: 1.4rem;
  margin-bottom: 48px;
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.power-metrics {
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}

.power-metric {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  padding: 24px 32px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.power-metric:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.metric-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-number {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.command-dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 32px;
  padding: 60px 40px;
  max-width: 1600px;
  margin: 0 auto;
  margin-top: -40px;
  position: relative;
  z-index: 3;
}

.ultimate-card {
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px !important;
  padding: 32px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.ultimate-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
}

.ultimate-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15) !important;
  border-color: rgba(102, 126, 234, 0.5);
}

.ultimate-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.05);
}

.header-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.header-content h3 {
  margin: 0 0 4px 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a2e;
}

.header-content p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.funnel-matrix-item {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  border: 2px solid rgba(102, 126, 234, 0.1);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.funnel-matrix-item:hover {
  transform: translateY(-2px);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.1);
}

.funnel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.funnel-name {
  font-weight: 700;
  font-size: 1.1rem;
  color: #1a1a2e;
}

.funnel-metrics {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.mini-metric {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.mini-label {
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 4px;
}

.mini-value {
  font-weight: 700;
  color: #1a1a2e;
}

.funnel-stages {
  display: flex;
  gap: 4px;
  height: 8px;
}

.stage-bar {
  flex: 1;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.stage-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.intelligence-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.insight-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 16px;
  border-left: 4px solid;
  transition: all 0.3s ease;
}

.insight-item.critical {
  background: rgba(244, 67, 54, 0.05);
  border-left-color: #f44336;
}

.insight-item.high {
  background: rgba(76, 175, 80, 0.05);
  border-left-color: #4caf50;
}

.insight-item.medium {
  background: rgba(33, 150, 243, 0.05);
  border-left-color: #2196f3;
}

.insight-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.insight-content {
  flex: 1;
}

.insight-title {
  font-weight: 700;
  margin-bottom: 4px;
  color: #1a1a2e;
}

.insight-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 8px;
}

.insight-impact {
  font-size: 0.8rem;
  font-weight: 600;
  color: #4caf50;
}

.flow-stages {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.flow-stage {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stage-info {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 16px 24px;
  border-radius: 16px;
  min-width: 200px;
  text-align: center;
}

.stage-name {
  font-weight: 700;
  margin-bottom: 8px;
}

.stage-count {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 4px;
}

.stage-rate {
  font-size: 0.9rem;
  opacity: 0.9;
}

.flow-connector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.connector-line {
  width: 4px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}

.flow-animation {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
  animation: flow-down 2s linear infinite;
}

@keyframes flow-down {
  0% { transform: translateY(-20px); }
  100% { transform: translateY(100px); }
}

.drop-rate {
  background: rgba(244, 67, 54, 0.1);
  color: #f44336;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
}

.blood-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.blood-vessel {
  background: linear-gradient(90deg, rgba(244, 67, 54, 0.1), rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.1));
  border-radius: 20px;
  padding: 16px;
  overflow: hidden;
}

.blood-stream {
  display: flex;
  gap: 8px;
  animation: blood-flow 3s linear infinite;
}

@keyframes blood-flow {
  0% { transform: translateX(-100px); }
  100% { transform: translateX(100px); }
}

.blood-cell {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.blood-cell.instagram { background: #e1306c; }
.blood-cell.email { background: #4caf50; }
.blood-cell.video { background: #f44336; }
.blood-cell.blog { background: #ff9800; }

.content-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
}

.content-stat {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  font-weight: 600;
}

.ultimate-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.ultimate-action-btn {
  height: 64px !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  border-radius: 16px !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.3s ease !important;
}

.ultimate-action-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
}

.gamification-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.mastery-progress {
  display: flex;
  align-items: center;
  gap: 32px;
}

.progress-ring {
  position: relative;
  width: 120px;
  height: 120px;
}

.progress-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-bg {
  fill: none;
  stroke: #f0f0f0;
  stroke-width: 8;
}

.progress-fill {
  fill: none;
  stroke: url(#gradient);
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.8s ease;
}

.progress-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.level-number {
  font-size: 2rem;
  font-weight: 800;
  color: #667eea;
}

.level-label {
  font-size: 0.8rem;
  color: #666;
}

.mastery-info {
  flex: 1;
}

.xp-bar {
  height: 12px;
  background: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
}

.xp-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 6px;
  transition: width 0.8s ease;
}

.xp-text {
  font-size: 0.9rem;
  color: #666;
  text-align: center;
}

.achievements {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.achievement {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  border: 2px solid;
  transition: all 0.3s ease;
}

.achievement.earned {
  background: rgba(76, 175, 80, 0.05);
  border-color: rgba(76, 175, 80, 0.3);
}

.achievement:not(.earned) {
  background: rgba(158, 158, 158, 0.05);
  border-color: rgba(158, 158, 158, 0.3);
  opacity: 0.6;
}

.achievement-name {
  font-weight: 700;
  margin-bottom: 4px;
}

.achievement-desc {
  font-size: 0.85rem;
  color: #666;
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-in-up {
  animation: slide-in-up 0.6s ease forwards;
}

@media (max-width: 768px) {
  .ultimate-title {
    font-size: 2.5rem;
  }
  
  .power-metrics {
    flex-direction: column;
    align-items: center;
  }
  
  .command-dashboard {
    grid-template-columns: 1fr;
    padding: 40px 20px;
  }
  
  .mastery-progress {
    flex-direction: column;
    text-align: center;
  }
}
</style>