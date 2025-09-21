<template>
  <div class="scientific-labs">
    <!-- Header -->
    <div class="labs-header">
      <div class="breadcrumb-nav">
        <button class="breadcrumb-btn" @click="$router.push('/labs')">
          <v-icon size="16">mdi-arrow-left</v-icon>
          HIBRIT Labs
        </button>
        <v-icon size="12" color="#9ca3af">mdi-chevron-right</v-icon>
        <span class="breadcrumb-current">Laboratórios Científicos</span>
      </div>
      
      <div class="labs-hero">
        <div class="hero-particles"></div>
        <div class="hero-content">
          <div class="hero-badge">
            <v-icon size="20" color="#00ff9d">mdi-flask</v-icon>
            <span>DESENVOLVIMENTO & EXPERIMENTAÇÃO</span>
          </div>
          
          <h1 class="hero-title">
            <span class="title-scientific">LABORATÓRIOS</span>
            <span class="title-accent">CIENTÍFICOS</span>
          </h1>
          
          <p class="hero-description">
            Ambiente controlado para desenvolvimento, teste e validação de tecnologias disruptivas em marketing digital
          </p>
          
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">6</span>
              <span class="stat-label">Laboratórios Ativos</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">94.7%</span>
              <span class="stat-label">Taxa de Sucesso</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">1,247</span>
              <span class="stat-label">Experimentos</span>
            </div>
          </div>
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
      <!-- Visual Impact Lab Section -->
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
        </div>
      </div>

      <!-- Other lab sections would go here with similar structure -->
      <!-- Growth Hacking, Strategy, Funnel, Copy, P&D sections -->
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
</script>

<style scoped>
.scientific-labs {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
}

.labs-header {
  background: linear-gradient(135deg, rgba(0, 255, 157, 0.1) 0%, rgba(0, 123, 255, 0.1) 100%);
  border-bottom: 1px solid rgba(0, 255, 157, 0.2);
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

.labs-hero {
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
  background: rgba(0, 255, 157, 0.2);
  border: 1px solid rgba(0, 255, 157, 0.4);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #00ff9d;
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

.title-scientific {
  background: linear-gradient(135deg, #00ff9d, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(0, 255, 157, 0.5);
}

.title-accent {
  color: #007bff;
  text-shadow: 0 0 30px rgba(0, 123, 255, 0.5);
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
  background: linear-gradient(135deg, #00ff9d, #007bff);
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

/* Design Tools */
.design-tools {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.tool-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.tool-card:hover {
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

.tool-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: white;
}

.tool-card p {
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

/* Interface Experiments */
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

.experiment-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 255, 157, 0.3);
  transform: translateX(4px);
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

.experiment-item:hover .experiment-arrow {
  color: #00ff9d;
  transform: translateX(2px);
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

/* Color Psychology */
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

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .title-accent {
    margin-left: 10px;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .design-tools {
    grid-template-columns: 1fr;
  }
  
  .labs-header {
    padding: 20px 20px 40px;
  }
  
  .lab-content {
    padding: 20px;
  }
  
  .lab-card {
    min-width: 240px;
  }
}
</style>