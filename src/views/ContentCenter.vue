<template>
  <div class="content-center">
    <!-- Floating Action Menu -->
    <FloatingActionMenu 
      :actions="floatingActions"
      main-icon="mdi-chart-timeline-variant"
      main-color="primary"
    />
    <!-- Hero Header -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Content Command Center</h1>
          <p class="hero-subtitle">Seu centro de controle estratégico de conteúdo</p>
        </div>
        <div class="hero-stats">
          <div class="stat-card">
            <div class="stat-number">{{ totalContent }}</div>
            <div class="stat-label">Conteúdos</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ completionRate }}%</div>
            <div class="stat-label">Taxa de Conclusão</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ streak }}</div>
            <div class="stat-label">Sequência</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Dashboard -->
    <div class="dashboard-grid">
      <!-- Timeline Card -->
      <v-card class="timeline-card glass-card" elevation="0">
        <div class="card-header">
          <v-icon color="primary" size="24">mdi-timeline-clock</v-icon>
          <h3>Timeline de Conteúdo</h3>
          <v-chip color="success" size="small">{{ todayContent }} hoje</v-chip>
        </div>
        
        <div class="timeline-content">
          <div class="timeline-section">
            <div class="timeline-label">Passado</div>
            <div class="timeline-bar">
              <div class="timeline-fill past" :style="{ width: pastPercentage + '%' }"></div>
            </div>
            <div class="timeline-stats">{{ pastContent }} publicados</div>
          </div>
          
          <div class="timeline-section">
            <div class="timeline-label">Presente</div>
            <div class="timeline-bar">
              <div class="timeline-fill present" :style="{ width: presentPercentage + '%' }"></div>
            </div>
            <div class="timeline-stats">{{ presentContent }} em produção</div>
          </div>
          
          <div class="timeline-section">
            <div class="timeline-label">Futuro</div>
            <div class="timeline-bar">
              <div class="timeline-fill future" :style="{ width: futurePercentage + '%' }"></div>
            </div>
            <div class="timeline-stats">{{ futureContent }} planejados</div>
          </div>
        </div>
      </v-card>

      <!-- Performance Card -->
      <v-card class="performance-card glass-card" elevation="0">
        <div class="card-header">
          <v-icon color="purple" size="24">mdi-rocket-launch</v-icon>
          <h3>Performance</h3>
          <v-chip :color="performanceColor" size="small">{{ performanceLevel }}</v-chip>
        </div>
        
        <div class="performance-content">
          <div class="performance-circle">
            <svg viewBox="0 0 100 100" class="circular-progress">
              <circle cx="50" cy="50" r="45" class="progress-bg"/>
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                class="progress-fill"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="progressOffset"
              />
            </svg>
            <div class="progress-text">
              <div class="progress-number">{{ completionRate }}%</div>
              <div class="progress-label">Completo</div>
            </div>
          </div>
          
          <div class="performance-badges">
            <div v-for="badge in badges" :key="badge.id" class="badge" :class="badge.earned ? 'earned' : 'locked'">
              <v-icon :color="badge.earned ? badge.color : 'grey'">{{ badge.icon }}</v-icon>
              <span>{{ badge.name }}</span>
            </div>
          </div>
        </div>
      </v-card>

      <!-- Quick Actions -->
      <v-card class="actions-card glass-card" elevation="0">
        <div class="card-header">
          <v-icon color="orange" size="24">mdi-lightning-bolt</v-icon>
          <h3>Ações Rápidas</h3>
        </div>
        
        <div class="actions-grid">
          <v-btn 
            v-for="action in quickActions" 
            :key="action.id"
            :color="action.color"
            variant="elevated"
            class="action-btn"
            @click="action.action"
          >
            <v-icon>{{ action.icon }}</v-icon>
            {{ action.label }}
          </v-btn>
        </div>
      </v-card>

      <!-- Library Insights -->
      <v-card class="library-card glass-card" elevation="0">
        <div class="card-header">
          <v-icon color="indigo" size="24">mdi-library</v-icon>
          <h3>Biblioteca</h3>
          <v-chip color="indigo" size="small">{{ libraryCount }} itens</v-chip>
        </div>
        
        <div class="library-content">
          <div class="library-categories">
            <div v-for="category in libraryCategories" :key="category.name" class="category-item">
              <div class="category-icon">
                <v-icon :color="category.color">{{ category.icon }}</v-icon>
              </div>
              <div class="category-info">
                <div class="category-name">{{ category.name }}</div>
                <div class="category-count">{{ category.count }} itens</div>
              </div>
            </div>
          </div>
        </div>
      </v-card>

      <!-- Training Card -->
      <v-card class="training-card glass-card" elevation="0">
        <div class="card-header">
          <v-icon color="teal" size="24">mdi-school</v-icon>
          <h3>Treinamento</h3>
          <v-chip color="warning" size="small">Novo!</v-chip>
        </div>
        
        <div class="training-content">
          <div class="training-video">
            <div class="video-thumbnail">
              <v-icon size="48" color="white">mdi-play-circle</v-icon>
            </div>
            <div class="video-info">
              <h4>Estratégias Avançadas de Conteúdo</h4>
              <p>Aprenda técnicas profissionais para maximizar o impacto do seu conteúdo</p>
              <v-btn color="teal" variant="elevated" size="small">
                <v-icon left>mdi-play</v-icon>
                Assistir Agora
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>

      <!-- Calendar Preview -->
      <v-card class="calendar-card glass-card" elevation="0">
        <div class="card-header">
          <v-icon color="green" size="24">mdi-calendar-today</v-icon>
          <h3>Próximos 7 Dias</h3>
        </div>
        
        <div class="calendar-content">
          <div v-for="day in upcomingDays" :key="day.date" class="calendar-day">
            <div class="day-info">
              <div class="day-number">{{ day.day }}</div>
              <div class="day-name">{{ day.name }}</div>
            </div>
            <div class="day-content">
              <div v-for="item in day.items" :key="item.id" class="content-item" :class="item.type">
                <v-icon size="16">{{ item.icon }}</v-icon>
                <span>{{ item.title }}</span>
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

// Dados simulados (substituir por dados reais)
const totalContent = ref(247)
const completionRate = ref(87)
const streak = ref(12)
const todayContent = ref(3)
const pastContent = ref(156)
const presentContent = ref(23)
const futureContent = ref(68)
const libraryCount = ref(89)

const pastPercentage = computed(() => (pastContent.value / totalContent.value) * 100)
const presentPercentage = computed(() => (presentContent.value / totalContent.value) * 100)
const futurePercentage = computed(() => (futureContent.value / totalContent.value) * 100)

const performanceLevel = computed(() => {
  if (completionRate.value >= 90) return 'Excelente'
  if (completionRate.value >= 75) return 'Bom'
  if (completionRate.value >= 60) return 'Regular'
  return 'Precisa Melhorar'
})

const performanceColor = computed(() => {
  if (completionRate.value >= 90) return 'success'
  if (completionRate.value >= 75) return 'primary'
  if (completionRate.value >= 60) return 'warning'
  return 'error'
})

const circumference = 2 * Math.PI * 45
const progressOffset = computed(() => circumference - (completionRate.value / 100) * circumference)

const badges = ref([
  { id: 1, name: 'Consistente', icon: 'mdi-medal', color: 'gold', earned: true },
  { id: 2, name: 'Criativo', icon: 'mdi-lightbulb', color: 'orange', earned: true },
  { id: 3, name: 'Estratégico', icon: 'mdi-chess-knight', color: 'purple', earned: false },
  { id: 4, name: 'Viral', icon: 'mdi-trending-up', color: 'green', earned: false }
])

const quickActions = ref([
  { id: 1, label: 'Novo Post', icon: 'mdi-plus', color: 'primary', action: () => router.push('/editor/new') },
  { id: 2, label: 'Pipeline', icon: 'mdi-view-column', color: 'secondary', action: () => router.push('/pipeline') },
  { id: 3, label: 'Biblioteca', icon: 'mdi-library', color: 'indigo', action: () => router.push('/library') },
  { id: 4, label: 'Métricas', icon: 'mdi-chart-line', color: 'success', action: () => router.push('/metrics') }
])

// Floating Actions para o menu flutuante
const floatingActions = ref([
  { id: 1, label: 'Criar Conteúdo', icon: 'mdi-plus-circle', color: 'rgba(102, 126, 234, 0.8)', action: () => router.push('/editor/new') },
  { id: 2, label: 'Ver Pipeline', icon: 'mdi-view-column', color: 'rgba(118, 75, 162, 0.8)', action: () => router.push('/pipeline') },
  { id: 3, label: 'Gerar Copies', icon: 'mdi-auto-fix', color: 'rgba(156, 39, 176, 0.8)', action: () => generateCopies() },
  { id: 4, label: 'Biblioteca', icon: 'mdi-library', color: 'rgba(63, 81, 181, 0.8)', action: () => router.push('/library') },
  { id: 5, label: 'Calendário', icon: 'mdi-calendar', color: 'rgba(76, 175, 80, 0.8)', action: () => router.push('/calendar') }
])

const libraryCategories = ref([
  { name: 'Templates', count: 23, icon: 'mdi-file-document', color: 'blue' },
  { name: 'Imagens', count: 45, icon: 'mdi-image', color: 'green' },
  { name: 'Vídeos', count: 12, icon: 'mdi-video', color: 'red' },
  { name: 'Textos', count: 9, icon: 'mdi-text', color: 'orange' }
])

const upcomingDays = ref([
  {
    date: '2024-01-15',
    day: '15',
    name: 'Seg',
    items: [
      { id: 1, title: 'Post Instagram', type: 'instagram', icon: 'mdi-instagram' },
      { id: 2, title: 'Newsletter', type: 'email', icon: 'mdi-email' }
    ]
  },
  {
    date: '2024-01-16',
    day: '16',
    name: 'Ter',
    items: [
      { id: 3, title: 'Blog Post', type: 'blog', icon: 'mdi-post' }
    ]
  },
  {
    date: '2024-01-17',
    day: '17',
    name: 'Qua',
    items: [
      { id: 4, title: 'Stories', type: 'stories', icon: 'mdi-camera' },
      { id: 5, title: 'LinkedIn', type: 'linkedin', icon: 'mdi-linkedin' }
    ]
  }
])

onMounted(() => {
  // Animações de entrada
  document.querySelectorAll('.glass-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    card.classList.add('fade-in-up')
  })
})
</script>

<style scoped>
.content-center {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
}

.hero-section {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
  padding: 60px 40px;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(45deg, #fff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0;
}

.hero-stats {
  display: flex;
  gap: 32px;
}

.stat-card {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: -40px;
  position: relative;
  z-index: 2;
}

.glass-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px !important;
  padding: 24px;
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.card-header h3 {
  margin: 0;
  font-weight: 600;
  flex: 1;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.timeline-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.timeline-label {
  width: 80px;
  font-weight: 600;
  font-size: 0.9rem;
}

.timeline-bar {
  flex: 1;
  height: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
}

.timeline-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s ease;
}

.timeline-fill.past { background: linear-gradient(90deg, #4caf50, #66bb6a); }
.timeline-fill.present { background: linear-gradient(90deg, #ff9800, #ffb74d); }
.timeline-fill.future { background: linear-gradient(90deg, #2196f3, #64b5f6); }

.timeline-stats {
  width: 100px;
  text-align: right;
  font-size: 0.85rem;
  color: #666;
}

.performance-content {
  display: flex;
  align-items: center;
  gap: 32px;
}

.performance-circle {
  position: relative;
  width: 120px;
  height: 120px;
}

.circular-progress {
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
  stroke: #667eea;
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.8s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-number {
  font-size: 1.8rem;
  font-weight: 800;
  color: #667eea;
}

.progress-label {
  font-size: 0.8rem;
  color: #666;
}

.performance-badges {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.badge.earned {
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.badge.locked {
  background: rgba(158, 158, 158, 0.1);
  border: 1px solid rgba(158, 158, 158, 0.3);
  opacity: 0.6;
}

.actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.action-btn {
  height: 60px !important;
  flex-direction: column !important;
  gap: 8px !important;
}

.library-categories {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
}

.category-item:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: translateX(4px);
}

.category-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-name {
  font-weight: 600;
  margin-bottom: 4px;
}

.category-count {
  font-size: 0.85rem;
  color: #666;
}

.training-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.training-video {
  display: flex;
  gap: 16px;
  align-items: center;
}

.video-thumbnail {
  width: 80px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.video-thumbnail:hover {
  transform: scale(1.05);
}

.video-info h4 {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 600;
}

.video-info p {
  margin: 0 0 16px 0;
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
}

.calendar-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.calendar-day {
  display: flex;
  gap: 16px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.02);
}

.day-info {
  text-align: center;
  min-width: 50px;
}

.day-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.day-name {
  font-size: 0.8rem;
  color: #666;
}

.day-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.content-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
}

.content-item.instagram { background: rgba(225, 48, 108, 0.1); color: #e1306c; }
.content-item.email { background: rgba(76, 175, 80, 0.1); color: #4caf50; }
.content-item.blog { background: rgba(33, 150, 243, 0.1); color: #2196f3; }
.content-item.stories { background: rgba(255, 152, 0, 0.1); color: #ff9800; }
.content-item.linkedin { background: rgba(0, 119, 181, 0.1); color: #0077b5; }

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fade-in-up 0.6s ease forwards;
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    gap: 32px;
    text-align: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
    padding: 20px;
  }
  
  .performance-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>