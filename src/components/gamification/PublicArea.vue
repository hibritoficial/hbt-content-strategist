<template>
  <div class="public-area">
    <!-- Série Timeline -->
    <div class="serie-section">
      <SerieTimeline />
    </div>

    <!-- Alerta de Sinal -->
    <div class="signal-alert">
      <div class="alert-background">
        <div class="warning-lines"></div>
      </div>
      
      <div class="alert-content">
        <div class="alert-icon">⚠️</div>
        <h2 class="alert-headline">Você está perdendo alunos antes do preço?</h2>
        <p class="alert-description">
          90% dos "sumiços" nascem antes da conversa sobre valores. 
          Detecte e corrija os pontos de falha agora.
        </p>
        
        <div class="teaser-video">
          <div class="video-placeholder">
            <div class="play-button" @click="playTeaser">
              <div class="play-icon">▶️</div>
            </div>
            <div class="video-info">
              <span class="video-duration">2:30</span>
              <span class="video-label">Vídeo Teaser</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Radar de Sinal -->
    <div class="radar-section">
      <div class="section-header">
        <h3 class="section-title">🎯 Radar de Sinal - Diagnóstico Rápido</h3>
        <p class="section-subtitle">Descubra em 90 segundos onde você está perdendo alunos</p>
      </div>
      
      <div class="radar-container">
        <div class="radar-display-large">
          <div class="radar-grid">
            <div class="grid-lines"></div>
            <div class="radar-center">
              <div class="center-dot"></div>
            </div>
            <div class="radar-sweep" :class="{ active: radarActive }"></div>
            
            <!-- Pontos de Sinal -->
            <div 
              v-for="signal in signals" 
              :key="signal.id"
              class="signal-point"
              :style="{ 
                left: signal.x + '%', 
                top: signal.y + '%',
                '--signal-color': signal.color 
              }"
              :class="signal.status"
            >
              <div class="signal-pulse"></div>
            </div>
          </div>
        </div>
        
        <div class="radar-controls">
          <v-btn 
            class="radar-btn"
            :class="{ active: radarActive }"
            @click="startRadarScan"
            :disabled="scanCompleted"
          >
            <span class="btn-icon">📡</span>
            {{ radarActive ? 'Escaneando...' : scanCompleted ? 'Scan Completo' : 'Iniciar Radar' }}
          </v-btn>
          
          <div v-if="scanProgress > 0" class="scan-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: scanProgress + '%' }"></div>
            </div>
            <div class="progress-text">{{ scanProgress }}% completo</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Termômetro de Ghosting -->
    <div v-if="scanCompleted" class="thermometer-section">
      <div class="section-header">
        <h3 class="section-title">🌡️ Termômetro de Ghosting</h3>
        <p class="section-subtitle">Seu nível atual de perda de alunos</p>
      </div>
      
      <div class="thermometer-container">
        <div class="thermometer">
          <div class="thermometer-scale">
            <div class="scale-mark critical">Crítico</div>
            <div class="scale-mark high">Alto</div>
            <div class="scale-mark medium">Médio</div>
            <div class="scale-mark low">Baixo</div>
          </div>
          
          <div class="thermometer-tube">
            <div 
              class="mercury-level" 
              :style="{ height: ghostingLevel + '%' }"
              :class="getGhostingClass(ghostingLevel)"
            ></div>
          </div>
          
          <div class="temperature-display">
            <div class="temp-value">{{ ghostingLevel }}%</div>
            <div class="temp-label">Ghosting</div>
          </div>
        </div>
        
        <div class="diagnosis-result">
          <div class="result-card">
            <div class="result-icon">{{ getDiagnosisIcon(ghostingLevel) }}</div>
            <h4 class="result-title">{{ getDiagnosisTitle(ghostingLevel) }}</h4>
            <p class="result-description">{{ getDiagnosisDescription(ghostingLevel) }}</p>
            
            <div class="impact-calculation">
              <div class="impact-item">
                <span class="impact-label">Perda mensal estimada:</span>
                <span class="impact-value">R$ {{ calculateLoss(ghostingLevel).toLocaleString() }}</span>
              </div>
              <div class="impact-item">
                <span class="impact-label">Alunos perdidos/mês:</span>
                <span class="impact-value">{{ Math.floor(ghostingLevel / 10) }} alunos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mapa de Rotas -->
    <div v-if="scanCompleted" class="routes-section">
      <div class="section-header">
        <h3 class="section-title">🗺️ Mapa de Rotas Anti-Ghosting</h3>
        <p class="section-subtitle">3 passos simples para recuperar seus alunos</p>
      </div>
      
      <div class="routes-map">
        <div 
          v-for="(route, index) in routes" 
          :key="route.id"
          class="route-step"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <div class="step-icon">{{ route.icon }}</div>
            <h4 class="step-title">{{ route.title }}</h4>
            <p class="step-description">{{ route.description }}</p>
            <div class="step-benefit">{{ route.benefit }}</div>
          </div>
          <div v-if="index < routes.length - 1" class="route-connector">→</div>
        </div>
      </div>
    </div>

    <!-- Gatilho de Captura -->
    <div v-if="scanCompleted && !userCaptured" class="capture-gate">
      <div class="gate-background">
        <div class="gate-glow"></div>
      </div>
      
      <div class="gate-content">
        <div class="gate-icon">🔒</div>
        <h3 class="gate-title">Acesso Restrito</h3>
        <p class="gate-description">
          Para continuar e acessar o Mapa de Rotas + recursos avançados, 
          precisamos do seu contato para enviar os materiais.
        </p>
        
        <div class="capture-form">
          <v-text-field
            v-model="captureData.name"
            label="Seu nome"
            variant="outlined"
            density="comfortable"
            class="mb-3"
          />
          
          <v-text-field
            v-model="captureData.email"
            label="Seu melhor email"
            variant="outlined"
            density="comfortable"
            type="email"
            class="mb-3"
          />
          
          <v-text-field
            v-model="captureData.whatsapp"
            label="WhatsApp (com DDD)"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />
          
          <v-btn 
            class="unlock-btn"
            size="large"
            block
            @click="unlockContent"
            :disabled="!isFormValid"
          >
            <span class="btn-icon">🔓</span>
            <span class="btn-text">Desbloquear Conteúdo</span>
          </v-btn>
        </div>
        
        <div class="capture-guarantee">
          <span class="guarantee-icon">🔒</span>
          <span class="guarantee-text">Seus dados estão seguros • Sem spam • Apenas conteúdo de valor</span>
        </div>
      </div>
    </div>

    <!-- CTA Principal -->
    <div v-if="scanCompleted && userCaptured" class="main-cta">
      <div class="cta-background">
        <div class="cta-glow"></div>
      </div>
      
      <div class="cta-content">
        <div class="cta-badge">
          <span class="badge-icon">🎯</span>
          <span class="badge-text">MAPA 8K - EDIÇÃO 2</span>
        </div>
        
        <h3 class="cta-title">Operação Anti-Ghosting</h3>
        <p class="cta-description">
          Baixe o guia completo e recupere R$ 818/mês só ajustando sua conversa
        </p>
        
        <div class="social-proof">
          <div class="proof-item">
            <span class="proof-icon">👥</span>
            <span class="proof-text">+2.847 professores já baixaram</span>
          </div>
          <div class="proof-item">
            <span class="proof-icon">⭐</span>
            <span class="proof-text">4.9/5 estrelas de avaliação</span>
          </div>
        </div>
        
        <v-btn 
          class="download-btn"
          size="large"
          @click="downloadMap"
        >
          <span class="btn-glow"></span>
          <span class="btn-icon">📥</span>
          <span class="btn-text">Baixar Mapa 8K Grátis</span>
        </v-btn>
        
        <div class="cta-guarantee">
          <span class="guarantee-icon">🔒</span>
          <span class="guarantee-text">100% gratuito • Sem spam • Acesso imediato</span>
        </div>
      </div>
    </div>

    <!-- Episódios da Série -->
    <div v-if="userCaptured" class="episodes-section">
      <div class="section-header">
        <h3 class="section-title">🎥 Episódios da Série</h3>
        <p class="section-subtitle">6 episódios + recursos avançados no Painel</p>
      </div>
      
      <div class="episodes-timeline">
        <div 
          v-for="(episode, index) in episodes" 
          :key="episode.id"
          class="episode-card"
          :class="{ 
            available: episode.available, 
            current: episode.current,
            completed: episode.completed 
          }"
          @click="openEpisode(episode)"
        >
          <div class="episode-number">EP{{ episode.number }}</div>
          <div class="episode-content">
            <h4 class="episode-title">{{ episode.title }}</h4>
            <p class="episode-description">{{ episode.description }}</p>
            
            <div class="episode-resources">
              <div class="resource-item">
                <span class="resource-icon">🎯</span>
                <span class="resource-text">{{ episode.missions }} missões</span>
              </div>
              <div class="resource-item">
                <span class="resource-icon">📜</span>
                <span class="resource-text">{{ episode.artifacts }} artefatos</span>
              </div>
              <div class="resource-item">
                <span class="resource-icon">🏆</span>
                <span class="resource-text">{{ episode.badges }} selos</span>
              </div>
            </div>
          </div>
          
          <div class="episode-status">
            <div v-if="episode.completed" class="status-icon completed">✓</div>
            <div v-else-if="episode.current" class="status-icon current">▶️</div>
            <div v-else-if="episode.available" class="status-icon available">🔓</div>
            <div v-else class="status-icon locked">🔒</div>
          </div>
          
          <div v-if="index < episodes.length - 1" class="episode-connector"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SerieTimeline from './SerieTimeline.vue'

const radarActive = ref(false)
const scanProgress = ref(0)
const scanCompleted = ref(false)
const ghostingLevel = ref(0)
const userCaptured = ref(false)

const captureData = ref({
  name: '',
  email: '',
  whatsapp: ''
})

const episodes = ref([
  {
    id: 1,
    number: 1,
    title: 'Intro Ghosting',
    description: 'Radar de Contatos e Termômetro de Ghosting',
    available: true,
    current: true,
    completed: false,
    missions: 1,
    artifacts: 2,
    badges: 2
  },
  {
    id: 2,
    number: 2,
    title: 'Técnica OEP',
    description: 'Objetivo → Encaixe → Proposta em 3 passos',
    available: false,
    current: false,
    completed: false,
    missions: 1,
    artifacts: 3,
    badges: 2
  },
  {
    id: 3,
    number: 3,
    title: 'Diagnóstico 10 Conversas',
    description: 'Autópsia de chats e identificação de quebras',
    available: false,
    current: false,
    completed: false,
    missions: 1,
    artifacts: 2,
    badges: 2
  },
  {
    id: 4,
    number: 4,
    title: 'Pré-qualificação & Preço',
    description: 'Portão 3Q e Preço com Luz Acesa',
    available: false,
    current: false,
    completed: false,
    missions: 1,
    artifacts: 2,
    badges: 2
  },
  {
    id: 5,
    number: 5,
    title: 'Cadência & Desghosting',
    description: 'Relógio Fantasma e Ritual de Invocação',
    available: false,
    current: false,
    completed: false,
    missions: 1,
    artifacts: 3,
    badges: 3
  },
  {
    id: 6,
    number: 6,
    title: 'Fechamento & KPIs',
    description: 'Fecho-Cofre e métricas finais',
    available: false,
    current: false,
    completed: false,
    missions: 1,
    artifacts: 3,
    badges: 3
  }
])

const signals = ref([
  { id: 1, x: 25, y: 30, status: 'lost', color: '#ff4444' },
  { id: 2, x: 60, y: 45, status: 'weak', color: '#ffaa00' },
  { id: 3, x: 80, y: 25, status: 'strong', color: '#00ff88' },
  { id: 4, x: 40, y: 70, status: 'lost', color: '#ff4444' },
  { id: 5, x: 15, y: 60, status: 'weak', color: '#ffaa00' }
])

const routes = ref([
  {
    id: 1,
    icon: '🔍',
    title: 'Diagnóstico',
    description: 'Identifique os pontos exatos onde perde alunos',
    benefit: '+25% retenção'
  },
  {
    id: 2,
    icon: '🛠️',
    title: 'Protocolo',
    description: 'Implemente scripts testados de recuperação',
    benefit: '+40% conversão'
  },
  {
    id: 3,
    icon: '📈',
    title: 'Otimização',
    description: 'Monitore e ajuste continuamente',
    benefit: '+60% resultado'
  }
])

const startRadarScan = () => {
  radarActive.value = true
  scanProgress.value = 0
  
  const interval = setInterval(() => {
    scanProgress.value += 2
    
    if (scanProgress.value >= 100) {
      clearInterval(interval)
      radarActive.value = false
      scanCompleted.value = true
      
      // Simular resultado do diagnóstico
      setTimeout(() => {
        ghostingLevel.value = Math.floor(Math.random() * 40) + 60 // 60-100%
      }, 500)
    }
  }, 50)
}

const getGhostingClass = (level) => {
  if (level >= 80) return 'critical'
  if (level >= 60) return 'high'
  if (level >= 40) return 'medium'
  return 'low'
}

const getDiagnosisIcon = (level) => {
  if (level >= 80) return '🚨'
  if (level >= 60) return '⚠️'
  if (level >= 40) return '📊'
  return '✅'
}

const getDiagnosisTitle = (level) => {
  if (level >= 80) return 'Situação Crítica'
  if (level >= 60) return 'Alto Risco'
  if (level >= 40) return 'Atenção Necessária'
  return 'Situação Controlada'
}

const getDiagnosisDescription = (level) => {
  if (level >= 80) return 'Você está perdendo muitos alunos antes mesmo de falar sobre preços. Ação imediata necessária.'
  if (level >= 60) return 'Há pontos críticos na sua abordagem que estão causando desistências prematuras.'
  if (level >= 40) return 'Alguns ajustes na comunicação podem melhorar significativamente seus resultados.'
  return 'Sua abordagem está funcionando bem, mas sempre há espaço para otimização.'
}

const calculateLoss = (level) => {
  return Math.floor((level / 100) * 1200) // Base de R$ 1.200 de perda potencial
}

const playTeaser = () => {
  console.log('Reproduzir vídeo teaser')
}

const isFormValid = computed(() => {
  return captureData.value.name.length > 2 && 
         captureData.value.email.includes('@') && 
         captureData.value.whatsapp.length > 10
})

const unlockContent = () => {
  if (isFormValid.value) {
    userCaptured.value = true
    console.log('Usuário capturado:', captureData.value)
    // Aqui integraria com backend para salvar o lead
  }
}

const downloadMap = () => {
  console.log('Download do Mapa 8K iniciado')
}

const openEpisode = (episode) => {
  if (episode.available) {
    console.log('Abrir episódio:', episode.title)
    // Aqui abriria o conteúdo do episódio
  }
}
</script>

<style scoped>
.public-area {
  color: white;
}

/* Signal Alert */
.signal-alert {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 68, 68, 0.1), rgba(255, 0, 136, 0.1));
  border: 1px solid rgba(255, 68, 68, 0.3);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 40px;
  overflow: hidden;
}

.alert-background {
  position: absolute;
  inset: 0;
}

.warning-lines {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255, 68, 68, 0.05) 10px,
    rgba(255, 68, 68, 0.05) 20px
  );
  animation: warning-move 3s linear infinite;
}

@keyframes warning-move {
  0% { transform: translateX(0); }
  100% { transform: translateX(20px); }
}

.alert-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.alert-icon {
  font-size: 48px;
  margin-bottom: 16px;
  filter: drop-shadow(0 0 10px rgba(255, 68, 68, 0.5));
}

.alert-headline {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 16px 0;
  color: #ff4444;
}

.alert-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 32px 0;
  line-height: 1.6;
}

/* Teaser Video */
.teaser-video {
  max-width: 400px;
  margin: 0 auto;
}

.video-placeholder {
  position: relative;
  aspect-ratio: 9/16;
  background: linear-gradient(135deg, #1a1a2e, #2a2a4e);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(138, 43, 226, 0.3);
}

.video-placeholder:hover {
  transform: scale(1.02);
  border-color: rgba(138, 43, 226, 0.6);
}

.play-button {
  width: 60px;
  height: 60px;
  background: rgba(138, 43, 226, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.play-button:hover {
  background: rgba(138, 43, 226, 1);
  transform: scale(1.1);
}

.play-icon {
  font-size: 24px;
  margin-left: 4px;
}

.video-info {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.video-duration {
  background: rgba(0, 0, 0, 0.8);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.video-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
}

/* Radar Section */
.radar-section {
  margin-bottom: 40px;
}

.section-header {
  text-align: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #00ff88;
}

.section-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.radar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.radar-display-large {
  width: 300px;
  height: 300px;
  position: relative;
}

.radar-grid {
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 50%;
  position: relative;
  background: radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%);
}

.grid-lines::before,
.grid-lines::after {
  content: '';
  position: absolute;
  background: rgba(0, 255, 136, 0.2);
}

.grid-lines::before {
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  transform: translateY(-50%);
}

.grid-lines::after {
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  transform: translateX(-50%);
}

.radar-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.center-dot {
  width: 8px;
  height: 8px;
  background: #00ff88;
  border-radius: 50%;
  box-shadow: 0 0 15px #00ff88;
}

.radar-sweep {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 150px;
  background: linear-gradient(to top, transparent, #00ff88);
  transform-origin: bottom center;
  transform: translate(-50%, -100%);
  opacity: 0;
}

.radar-sweep.active {
  opacity: 1;
  animation: radar-sweep-scan 2s linear infinite;
}

@keyframes radar-sweep-scan {
  0% { transform: translate(-50%, -100%) rotate(0deg); }
  100% { transform: translate(-50%, -100%) rotate(360deg); }
}

.signal-point {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--signal-color);
  transform: translate(-50%, -50%);
}

.signal-point.lost {
  animation: signal-blink-lost 1s ease-in-out infinite;
}

.signal-point.weak {
  animation: signal-blink-weak 1.5s ease-in-out infinite;
}

.signal-point.strong {
  animation: signal-blink-strong 2s ease-in-out infinite;
}

@keyframes signal-blink-lost {
  0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.3; transform: translate(-50%, -50%) scale(0.8); }
}

@keyframes signal-blink-weak {
  0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.6; transform: translate(-50%, -50%) scale(0.9); }
}

@keyframes signal-blink-strong {
  0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
}

.signal-pulse {
  position: absolute;
  inset: -4px;
  border: 2px solid var(--signal-color);
  border-radius: 50%;
  animation: pulse-ring 2s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Radar Controls */
.radar-controls {
  text-align: center;
}

.radar-btn {
  background: linear-gradient(135deg, #00ff88, #0088ff) !important;
  color: white !important;
  border-radius: 12px !important;
  padding: 16px 32px !important;
  font-weight: 700 !important;
  text-transform: none !important;
  font-size: 16px !important;
  transition: all 0.3s ease !important;
}

.radar-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 255, 136, 0.4) !important;
}

.radar-btn.active {
  animation: radar-btn-pulse 1s ease-in-out infinite;
}

@keyframes radar-btn-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.4); }
  50% { box-shadow: 0 0 30px rgba(0, 255, 136, 0.8); }
}

.btn-icon {
  margin-right: 8px;
  font-size: 18px;
}

.scan-progress {
  margin-top: 16px;
}

.progress-bar {
  width: 200px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin: 0 auto 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ff88, #0088ff);
  transition: width 0.1s ease;
}

.progress-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

/* Thermometer Section */
.thermometer-section {
  margin-bottom: 40px;
}

.thermometer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  flex-wrap: wrap;
}

.thermometer {
  display: flex;
  align-items: center;
  gap: 20px;
}

.thermometer-scale {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 12px;
}

.scale-mark {
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.scale-mark.critical {
  background: rgba(255, 68, 68, 0.2);
  color: #ff4444;
}

.scale-mark.high {
  background: rgba(255, 170, 0, 0.2);
  color: #ffaa00;
}

.scale-mark.medium {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.scale-mark.low {
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
}

.thermometer-tube {
  width: 20px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.mercury-level {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 10px;
  transition: height 1s ease;
}

.mercury-level.critical {
  background: linear-gradient(to top, #ff4444, #ff6666);
}

.mercury-level.high {
  background: linear-gradient(to top, #ffaa00, #ffcc44);
}

.mercury-level.medium {
  background: linear-gradient(to top, #ffc107, #ffd54f);
}

.mercury-level.low {
  background: linear-gradient(to top, #00ff88, #44ffaa);
}

.temperature-display {
  text-align: center;
}

.temp-value {
  font-size: 32px;
  font-weight: 800;
  color: #ff4444;
  margin-bottom: 4px;
}

.temp-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

/* Diagnosis Result */
.diagnosis-result {
  max-width: 400px;
}

.result-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
}

.result-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.result-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #ff4444;
}

.result-description {
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.impact-calculation {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.impact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.impact-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.impact-value {
  font-size: 14px;
  font-weight: 700;
  color: #ff4444;
}

/* Routes Section */
.routes-section {
  margin-bottom: 40px;
}

.routes-map {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.route-step {
  display: flex;
  align-items: center;
  gap: 16px;
}

.step-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #00ff88, #0088ff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: white;
  font-size: 18px;
}

.step-content {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  max-width: 200px;
  text-align: center;
}

.step-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.step-title {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #00ff88;
}

.step-description {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.step-benefit {
  font-size: 11px;
  color: #00ff88;
  font-weight: 600;
  background: rgba(0, 255, 136, 0.1);
  padding: 4px 8px;
  border-radius: 6px;
}

.route-connector {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.3);
  font-weight: bold;
}

/* Main CTA */
.main-cta {
  position: relative;
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(75, 0, 130, 0.2));
  border: 1px solid rgba(138, 43, 226, 0.5);
  border-radius: 24px;
  padding: 48px;
  text-align: center;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  inset: 0;
}

.cta-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.3) 0%, transparent 70%);
  animation: cta-pulse 3s ease-in-out infinite;
}

@keyframes cta-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 255, 136, 0.2);
  border: 1px solid rgba(0, 255, 136, 0.5);
  padding: 8px 16px;
  border-radius: 20px;
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: 700;
}

.cta-title {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 12px 0;
  color: white;
}

.cta-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 24px 0;
  line-height: 1.5;
}

.social-proof {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.proof-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.proof-icon {
  font-size: 16px;
}

.download-btn {
  position: relative;
  background: linear-gradient(135deg, #8a2be2, #4b0082) !important;
  color: white !important;
  border-radius: 16px !important;
  padding: 20px 40px !important;
  font-weight: 800 !important;
  text-transform: none !important;
  font-size: 18px !important;
  margin-bottom: 16px !important;
  overflow: hidden !important;
}

.btn-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  animation: btn-shimmer 2s ease-in-out infinite;
}

@keyframes btn-shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.btn-text {
  position: relative;
  z-index: 2;
}

.cta-guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.guarantee-icon {
  font-size: 14px;
}

/* Capture Gate */
.capture-gate {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 152, 0, 0.1));
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 24px;
  padding: 48px;
  text-align: center;
  overflow: hidden;
  margin-bottom: 40px;
}

.gate-background {
  position: absolute;
  inset: 0;
}

.gate-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 193, 7, 0.2) 0%, transparent 70%);
  animation: gate-pulse 3s ease-in-out infinite;
}

@keyframes gate-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

.gate-content {
  position: relative;
  z-index: 2;
}

.gate-icon {
  font-size: 48px;
  margin-bottom: 16px;
  filter: drop-shadow(0 0 10px rgba(255, 193, 7, 0.5));
}

.gate-title {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 16px 0;
  color: #ffc107;
}

.gate-description {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 32px 0;
  line-height: 1.6;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.capture-form {
  max-width: 400px;
  margin: 0 auto 24px;
}

.unlock-btn {
  background: linear-gradient(135deg, #ffc107, #ff9800) !important;
  color: white !important;
  border-radius: 12px !important;
  font-weight: 700 !important;
  text-transform: none !important;
  font-size: 16px !important;
}

.unlock-btn:disabled {
  opacity: 0.5 !important;
}

.capture-guarantee {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

/* Episodes Section */
.episodes-section {
  margin-top: 40px;
}

.episodes-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.episode-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  opacity: 0.6;
}

.episode-card.available {
  opacity: 1;
  border-color: rgba(0, 255, 136, 0.3);
}

.episode-card.current {
  border-color: rgba(255, 193, 7, 0.5);
  background: rgba(255, 193, 7, 0.05);
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.2);
}

.episode-card.completed {
  border-color: rgba(0, 255, 136, 0.5);
  background: rgba(0, 255, 136, 0.05);
}

.episode-card:hover.available {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.episode-number {
  background: linear-gradient(135deg, #8a2be2, #4b0082);
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 14px;
  min-width: 60px;
  text-align: center;
}

.episode-card.current .episode-number {
  background: linear-gradient(135deg, #ffc107, #ff9800);
}

.episode-card.completed .episode-number {
  background: linear-gradient(135deg, #00ff88, #0088ff);
}

.episode-content {
  flex: 1;
}

.episode-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: white;
}

.episode-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.episode-resources {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.resource-icon {
  font-size: 14px;
}

.episode-status {
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
}

.status-icon.completed {
  background: #00ff88;
  color: white;
}

.status-icon.current {
  background: #ffc107;
  color: white;
  animation: current-pulse 2s ease-in-out infinite;
}

.status-icon.available {
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
}

.status-icon.locked {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.3);
}

@keyframes current-pulse {
  0%, 100% { box-shadow: 0 0 10px rgba(255, 193, 7, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 193, 7, 0.6); }
}

.episode-connector {
  position: absolute;
  left: 50px;
  bottom: -20px;
  width: 2px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
}

.episode-card.completed .episode-connector {
  background: #00ff88;
}

/* Responsive */
@media (max-width: 768px) {
  .thermometer-container {
    flex-direction: column;
    gap: 30px;
  }
  
  .routes-map {
    flex-direction: column;
  }
  
  .route-connector {
    transform: rotate(90deg);
  }
  
  .social-proof {
    flex-direction: column;
    gap: 16px;
  }
  
  .episode-card {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .episode-resources {
    justify-content: center;
  }
}
</style>