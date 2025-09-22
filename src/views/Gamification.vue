<template>
  <div class="gamification-lab">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-background">
        <div class="particle-field"></div>
        <div class="grid-overlay"></div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">🎮</span>
          <span class="badge-text">GAMIFICATION LAB</span>
        </div>
        
        <h1 class="hero-title">
          <span class="title-line">Transforme</span>
          <span class="title-line gradient-text">Experiências</span>
          <span class="title-line">em Jogos</span>
        </h1>
        
        <p class="hero-subtitle">
          Laboratório de experiências gamificadas para marketing, vendas, 
          fidelidade e educação. Onde engagement vira obsessão.
        </p>
        
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">+340%</div>
            <div class="stat-label">Engagement</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">+180%</div>
            <div class="stat-label">Conversão</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">+250%</div>
            <div class="stat-label">Retenção</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="nav-tabs">
      <div class="tabs-container">
        <div 
          v-for="tab in tabs" 
          :key="tab.key"
          class="tab-item"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          <div class="tab-icon">{{ tab.icon }}</div>
          <div class="tab-label">{{ tab.label }}</div>
          <div v-if="tab.count" class="tab-count">{{ tab.count }}</div>
        </div>
      </div>
    </div>

    <!-- Content Sections -->
    <div class="content-sections">
      <!-- Experiências Ativas -->
      <div v-if="activeTab === 'experiences'" class="experiences-section">
        <div class="section-header">
          <h2 class="section-title">🚀 Experiências Ativas</h2>
          <v-btn class="create-btn" @click="showCreateDialog = true">
            <span class="btn-icon">⚡</span>
            Nova Experiência
          </v-btn>
        </div>
        
        <div class="experiences-grid">
          <div 
            v-for="experience in experiences" 
            :key="experience.id"
            class="experience-card"
            :class="experience.theme"
            @click="openExperience(experience)"
          >
            <div class="card-header">
              <div class="experience-icon">{{ experience.icon }}</div>
              <div class="experience-status" :class="experience.status">
                {{ getStatusText(experience.status) }}
              </div>
            </div>
            
            <div class="card-content">
              <h3 class="experience-title">{{ experience.title }}</h3>
              <p class="experience-description">{{ experience.description }}</p>
              
              <div class="experience-meta">
                <div class="meta-item">
                  <span class="meta-icon">👥</span>
                  <span class="meta-text">{{ experience.participants }} participantes</span>
                </div>
                <div class="meta-item">
                  <span class="meta-icon">📊</span>
                  <span class="meta-text">{{ experience.completion }}% conclusão</span>
                </div>
              </div>
              
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: experience.completion + '%' }"></div>
              </div>
            </div>
            
            <div class="card-footer">
              <div class="experience-type">{{ experience.type }}</div>
              <div class="experience-client">{{ experience.client }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Templates -->
      <div v-if="activeTab === 'templates'" class="templates-section">
        <div class="section-header">
          <h2 class="section-title">🎯 Templates de Experiências</h2>
        </div>
        
        <!-- Carrossel Futurista -->
        <FuturisticCarousel 
          :slides="templates" 
          :auto-play="true" 
          :interval="4000"
        >
          <template #default="{ slide, isActive }">
            <div class="template-slide" :class="{ active: isActive }" @click="useTemplate(slide)">
              <div class="slide-preview">
                <div class="preview-icon">{{ slide.icon }}</div>
                <div class="preview-glow"></div>
              </div>
              
              <div class="slide-info">
                <h3 class="slide-title">{{ slide.title }}</h3>
                <p class="slide-description">{{ slide.description }}</p>
                
                <div class="slide-tags">
                  <span 
                    v-for="tag in slide.tags" 
                    :key="tag"
                    class="slide-tag"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <div class="slide-action">
                  <div class="action-btn">
                    <span class="btn-text">Usar Template</span>
                    <span class="btn-icon">⚡</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </FuturisticCarousel>
      </div>

      <!-- Analytics -->
      <div v-if="activeTab === 'analytics'" class="analytics-section">
        <div class="section-header">
          <h2 class="section-title">📈 Analytics Gamificados</h2>
        </div>
        
        <div class="analytics-grid">
          <div class="analytics-card">
            <h3>Engagement Score</h3>
            <div class="score-display">8.7/10</div>
          </div>
          
          <div class="analytics-card">
            <h3>Experiências Completadas</h3>
            <div class="score-display">156</div>
          </div>
          
          <div class="analytics-card">
            <h3>Leads Gerados</h3>
            <div class="score-display">2,847</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Experience Dialog -->
    <v-dialog v-model="showCreateDialog" max-width="600">
      <div class="create-dialog">
        <h3>⚡ Nova Experiência Gamificada</h3>
        <p>Escolha um template para começar:</p>
        
        <div class="template-options">
          <div 
            v-for="template in templates" 
            :key="template.id"
            class="template-option"
            @click="createFromTemplate(template)"
          >
            <div class="option-icon">{{ template.icon }}</div>
            <div class="option-title">{{ template.title }}</div>
          </div>
        </div>
        
        <div class="dialog-actions">
          <v-btn @click="showCreateDialog = false">Cancelar</v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FuturisticCarousel from '@/components/FuturisticCarousel.vue'

const router = useRouter()
const activeTab = ref('experiences')
const showCreateDialog = ref(false)

const tabs = [
  { key: 'experiences', icon: '🚀', label: 'Experiências', count: 3 },
  { key: 'templates', icon: '🎯', label: 'Templates', count: 8 },
  { key: 'analytics', icon: '📈', label: 'Analytics' }
]

const experiences = ref([
  {
    id: 1,
    title: 'Operação Anti-Ghosting',
    description: 'Série gamificada para recuperar alunos perdidos',
    icon: '👻',
    theme: 'ghost-theme',
    status: 'active',
    type: 'Série',
    client: 'Asa Mentoria',
    participants: 847,
    completion: 73,
    route: 'OperacaoAntiGhosting'
  },
  {
    id: 2,
    title: 'Missão Conversão',
    description: 'Jornada de vendas com mecânicas de RPG',
    icon: '⚔️',
    theme: 'rpg-theme',
    status: 'draft',
    type: 'Campanha',
    client: 'Cliente X',
    participants: 0,
    completion: 0
  },
  {
    id: 3,
    title: 'Academia de Leads',
    description: 'Treinamento gamificado para equipe comercial',
    icon: '🎓',
    theme: 'academy-theme',
    status: 'completed',
    type: 'Treinamento',
    client: 'Hibrit',
    participants: 24,
    completion: 100
  }
])

const templates = ref([
  {
    id: 1,
    title: 'Série Anti-Ghosting',
    description: 'Template para recuperação de leads perdidos com mecânicas de suspense e urgência',
    icon: '👻',
    tags: ['Vendas', 'Recuperação', 'Série']
  },
  {
    id: 2,
    title: 'Jornada do Herói',
    description: 'Experiência épica de onboarding com narrativa envolvente e progressão por níveis',
    icon: '⚔️',
    tags: ['Onboarding', 'RPG', 'Jornada']
  },
  {
    id: 3,
    title: 'Academia de Vendas',
    description: 'Treinamento progressivo com níveis, badges e certificações para equipes comerciais',
    icon: '🎓',
    tags: ['Treinamento', 'Vendas', 'Progressão']
  },
  {
    id: 4,
    title: 'Programa Fidelidade',
    description: 'Sistema de pontos, recompensas e status VIP para clientes recorrentes',
    icon: '💎',
    tags: ['Fidelidade', 'Pontos', 'Recompensas']
  },
  {
    id: 5,
    title: 'Missão Conversão',
    description: 'Campanha de vendas com mecânicas de RPG, quests e recompensas progressivas',
    icon: '🎯',
    tags: ['Conversão', 'RPG', 'Campanha']
  },
  {
    id: 6,
    title: 'Laboratório de Leads',
    description: 'Experiência científica para captura e qualificação de leads com experimentos',
    icon: '🧪',
    tags: ['Leads', 'Captura', 'Qualificação']
  },
  {
    id: 7,
    title: 'Arena de Competição',
    description: 'Torneio gamificado entre equipes com rankings, troféus e premiações',
    icon: '🏆',
    tags: ['Competição', 'Equipes', 'Rankings']
  },
  {
    id: 8,
    title: 'Universo Educativo',
    description: 'Plataforma de aprendizado com planetas, missões e descobertas progressivas',
    icon: '🌌',
    tags: ['Educação', 'Aprendizado', 'Progressão']
  }
])

const getStatusText = (status) => {
  const texts = {
    active: 'Ativa',
    draft: 'Rascunho',
    completed: 'Concluída',
    paused: 'Pausada'
  }
  return texts[status] || status
}

const openExperience = (experience) => {
  if (experience.route) {
    router.push({ name: experience.route })
  }
}

const useTemplate = (template) => {
  console.log('Usar template:', template.title)
}

const createFromTemplate = (template) => {
  console.log('Criar experiência com template:', template.title)
  showCreateDialog.value = false
}
</script>

<style scoped>
.gamification-lab {
  min-height: 100vh;
  background: #0a0a0f;
  color: white;
  position: relative;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-background {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a0f 100%);
}

.particle-field {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #00ff88, transparent),
    radial-gradient(2px 2px at 40px 70px, #0088ff, transparent),
    radial-gradient(1px 1px at 90px 40px, #ff0088, transparent);
  background-repeat: repeat;
  background-size: 100px 100px;
  animation: particle-float 20s linear infinite;
  opacity: 0.3;
}

@keyframes particle-float {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-100px, -100px); }
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.2;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 32px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
}

.badge-icon {
  font-size: 16px;
}

.hero-title {
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 900;
  line-height: 0.9;
  margin-bottom: 24px;
}

.title-line {
  display: block;
}

.gradient-text {
  background: linear-gradient(135deg, #00ff88, #0088ff, #ff0088);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 3s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { filter: hue-rotate(0deg); }
  50% { filter: hue-rotate(90deg); }
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #00ff88;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}

/* Navigation Tabs */
.nav-tabs {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(10, 10, 15, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px 0;
}

.tabs-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tab-item:hover {
  background: rgba(0, 255, 136, 0.1);
  border-color: rgba(0, 255, 136, 0.3);
}

.tab-item.active {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 136, 255, 0.2));
  border-color: #00ff88;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.tab-icon {
  font-size: 16px;
}

.tab-label {
  font-weight: 600;
  font-size: 14px;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

/* Content Sections */
.content-sections {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 32px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.create-btn {
  background: linear-gradient(135deg, #00ff88, #0088ff) !important;
  color: white !important;
  border-radius: 12px !important;
  padding: 12px 24px !important;
  font-weight: 700 !important;
  text-transform: none !important;
  box-shadow: 0 8px 25px rgba(0, 255, 136, 0.3) !important;
}

.btn-icon {
  margin-right: 8px;
  font-size: 16px;
}

/* Experiences Grid */
.experiences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 24px;
}

.experience-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.experience-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 136, 0.5);
}

.experience-card.ghost-theme {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(75, 0, 130, 0.1));
  border-color: rgba(138, 43, 226, 0.3);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.experience-icon {
  font-size: 32px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.experience-status {
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.experience-status.active {
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
}

.experience-status.draft {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.experience-status.completed {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.experience-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.experience-description {
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.experience-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-icon {
  font-size: 14px;
}

.meta-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.progress-bar {
  background: rgba(255, 255, 255, 0.1);
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 16px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ff88, #0088ff);
  transition: width 0.3s ease;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.experience-type {
  font-size: 12px;
  color: #00ff88;
  font-weight: 700;
}

.experience-client {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

/* Template Slide Styles */
.template-slide {
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slide-preview {
  position: relative;
  text-align: center;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.preview-icon {
  font-size: 64px;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.4));
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.template-slide.active .preview-icon {
  font-size: 72px;
  filter: drop-shadow(0 0 25px rgba(0, 255, 136, 0.8));
  animation: icon-pulse 2s ease-in-out infinite alternate;
}

@keyframes icon-pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

.preview-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.template-slide.active .preview-glow {
  opacity: 1;
  animation: glow-pulse 2s ease-in-out infinite alternate;
}

@keyframes glow-pulse {
  0% { transform: translate(-50%, -50%) scale(1); }
  100% { transform: translate(-50%, -50%) scale(1.2); }
}

.slide-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.slide-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #fff;
  transition: color 0.3s ease;
}

.template-slide.active .slide-title {
  color: #00ff88;
}

.slide-description {
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 16px 0;
  font-size: 14px;
  line-height: 1.4;
  flex: 1;
}

.slide-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  margin-bottom: 20px;
}

.slide-tag {
  background: rgba(0, 255, 136, 0.1);
  color: #00ff88;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid rgba(0, 255, 136, 0.2);
  transition: all 0.3s ease;
}

.template-slide.active .slide-tag {
  background: rgba(0, 255, 136, 0.2);
  border-color: rgba(0, 255, 136, 0.4);
  box-shadow: 0 0 8px rgba(0, 255, 136, 0.3);
}

.slide-action {
  margin-top: auto;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(0, 255, 136, 0.1);
  border: 1px solid rgba(0, 255, 136, 0.3);
  padding: 12px 20px;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 14px;
}

.template-slide.active .action-btn {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 136, 255, 0.2));
  border-color: #00ff88;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
  transform: translateY(-2px);
}

.btn-text {
  color: #00ff88;
}

.btn-icon {
  font-size: 16px;
  filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.6));
}

/* Analytics Grid */
.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.analytics-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}

.analytics-card h3 {
  font-size: 16px;
  margin: 0 0 16px 0;
  color: rgba(255, 255, 255, 0.8);
}

.score-display {
  font-size: 36px;
  font-weight: 800;
  color: #00ff88;
}

/* Create Dialog */
.create-dialog {
  background: #1a1a2e;
  color: white;
  padding: 32px;
  border-radius: 20px;
}

.create-dialog h3 {
  margin: 0 0 8px 0;
  font-size: 24px;
}

.create-dialog p {
  margin: 0 0 24px 0;
  color: rgba(255, 255, 255, 0.7);
}

.template-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.template-option {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.template-option:hover {
  background: rgba(0, 255, 136, 0.1);
  border-color: rgba(0, 255, 136, 0.3);
}

.option-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.option-title {
  font-size: 12px;
  font-weight: 600;
}

.dialog-actions {
  text-align: right;
}
</style>