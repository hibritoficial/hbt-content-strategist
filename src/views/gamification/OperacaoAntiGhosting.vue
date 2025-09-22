<template>
  <div class="operacao-anti-ghosting">
    <!-- Command Center Header -->
    <div class="command-header">
      <div class="header-background">
        <div class="radar-sweep"></div>
        <div class="scan-lines"></div>
      </div>
      
      <div class="header-content">
        <div class="mission-badge">
          <span class="badge-icon">👻</span>
          <span class="badge-text">OPERAÇÃO ANTI-GHOSTING</span>
          <span class="badge-status">ATIVA</span>
        </div>
        
        <h1 class="mission-title">
          <span class="title-main">Série Gamificada</span>
          <span class="title-sub">6 Episódios • Recursos Avançados • Mentoria Gratuita</span>
        </h1>
        
        <div class="mission-stats">
          <div class="stat-radar">
            <div class="radar-display">
              <div class="radar-circle"></div>
              <div class="radar-ping"></div>
              <div class="radar-sweep-line"></div>
            </div>
            <div class="radar-info">
              <div class="signal-strength">{{ signalStrength }}%</div>
              <div class="signal-label">Força do Sinal</div>
            </div>
          </div>
          
          <div class="mission-progress">
            <div class="progress-item">
              <div class="progress-icon">🎯</div>
              <div class="progress-data">
                <div class="progress-number">{{ missionProgress.completed }}/{{ missionProgress.total }}</div>
                <div class="progress-label">Missões</div>
              </div>
            </div>
            
            <div class="progress-item">
              <div class="progress-icon">🏆</div>
              <div class="progress-data">
                <div class="progress-number">{{ achievements.length }}</div>
                <div class="progress-label">Selos</div>
              </div>
            </div>
            
            <div class="progress-item">
              <div class="progress-icon">📊</div>
              <div class="progress-data">
                <div class="progress-number">+{{ recoveryRate }}%</div>
                <div class="progress-label">Recuperação</div>
              </div>
            </div>
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
          <div v-if="tab.notification" class="tab-notification">{{ tab.notification }}</div>
        </div>
      </div>
    </div>

    <!-- Content Areas -->
    <div class="content-area">
      <!-- Área Pública -->
      <div v-if="activeTab === 'public'" class="public-area">
        <NetflixTimeline />
      </div>

      <!-- Painel MASP -->
      <div v-if="activeTab === 'masp'" class="masp-panel">
        <div class="masp-simple">
          <h2>🎯 Painel MASP</h2>
          <p>Missões • Artefatos • Selos • Passaporte</p>
          
          <!-- Quick Stats -->
          <div class="masp-grid">
            <div class="masp-card missions">
              <div class="card-icon">🎯</div>
              <h3>Missões</h3>
              <div class="card-stats">6/20 Ativas</div>
            </div>
            
            <div class="masp-card artifacts">
              <div class="card-icon">📜</div>
              <h3>Artefatos</h3>
              <div class="card-stats">20 Recursos</div>
            </div>
            
            <div class="masp-card badges">
              <div class="card-icon">🏆</div>
              <h3>Selos</h3>
              <div class="card-stats">3/20 Conquistados</div>
            </div>
            
            <div class="masp-card passport">
              <div class="card-icon">🏆</div>
              <h3>Passaporte</h3>
              <div class="card-stats">Prêmio R$ 350</div>
            </div>
          </div>
          
          <!-- Resources Lists -->
          <div class="resources-section">
            <div class="resource-category">
              <h3>🎯 Missões (6 Ativas)</h3>
              <div class="resource-items">
                <div class="resource-item active">M1: Radar Anti-Ghosting</div>
                <div class="resource-item locked">M5: Luz na Sala - Pitch 45s</div>
                <div class="resource-item locked">M4: Portão 3Q - Pré-qualificação</div>
                <div class="resource-item locked">M6: Relógio Fantasma</div>
                <div class="resource-item locked">M16: Fecho-Cofre</div>
                <div class="resource-item locked">M18: Central de Telemetria</div>
              </div>
            </div>
            
            <div class="resource-category">
              <h3>📜 Artefatos (20 Recursos)</h3>
              <div class="resource-items">
                <div class="resource-item unlocked">A1: Planilha Forense</div>
                <div class="resource-item unlocked">A10: Estojo Vidas Reais</div>
                <div class="resource-item locked">A5: Script Pitch 45s</div>
                <div class="resource-item locked">A7: Preço 2 Etapas</div>
                <div class="resource-item locked">A3: Aberturas V1/V2</div>
                <div class="resource-item locked">A18: Radar de KPIs</div>
                <div class="resource-item locked">A4: Portal 3Q</div>
                <div class="resource-item locked">A6: Calendário Tático</div>
                <div class="resource-item locked">A15: Checklist Fecho-Cofre</div>
                <div class="resource-item locked">A11: Pacotes + Links</div>
              </div>
            </div>
            
            <div class="resource-category">
              <h3>🏆 Selos (3/20 Conquistados)</h3>
              <div class="resource-items">
                <div class="resource-item earned">S1: Varredura</div>
                <div class="resource-item earned">S9: Espelho</div>
                <div class="resource-item earned">S17: Telemetria</div>
                <div class="resource-item locked">S5: Luz antes do Preço</div>
                <div class="resource-item locked">S7: Preço Luminoso</div>
                <div class="resource-item locked">S4: Guarda-Portão 3Q</div>
                <div class="resource-item locked">S6: Relógio Certo</div>
                <div class="resource-item locked">S11: Invocador</div>
                <div class="resource-item locked">S16: Fecho-Cofre</div>
                <div class="resource-item locked">S20: Queda Livre 30%</div>
              </div>
            </div>
            
            <div class="resource-category passport-section">
              <h3>🏆 Passaporte (Prêmio R$ 350)</h3>
              <div class="passport-progress">
                <div class="progress-info">
                  <span>Colete 10 selos para desbloquear prêmio equivalente a R$ 350</span>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 30%"></div>
                  </div>
                  <span class="progress-text">3/10 selos coletados</span>
                </div>
                <div class="passport-reward locked">
                  <div class="reward-icon">🎁</div>
                  <div class="reward-text">Mentoria Gratuita 45min</div>
                  <div class="reward-value">Valor: R$ 350</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics -->
      <div v-if="activeTab === 'analytics'" class="analytics-area">
        <div class="analytics-placeholder">
          <h3>📊 Analytics em Desenvolvimento</h3>
          <p>Métricas avançadas em breve...</p>
        </div>
      </div>
    </div>

    <!-- Floating HUD -->
    <div class="floating-hud">
      <div class="hud-item">
        <div class="hud-icon">📡</div>
        <div class="hud-value">{{ onlineUsers }}</div>
        <div class="hud-label">Online</div>
      </div>
      
      <div class="hud-item">
        <div class="hud-icon">⚡</div>
        <div class="hud-value">{{ activeSignals }}</div>
        <div class="hud-label">Sinais</div>
      </div>
      
      <div class="hud-item">
        <div class="hud-icon">🎯</div>
        <div class="hud-value">{{ completionRate }}%</div>
        <div class="hud-label">Taxa</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import NetflixTimeline from '@/components/gamification/NetflixTimelineFixed.vue'

const activeTab = ref('public')
const signalStrength = ref(73)
const onlineUsers = ref(42)
const activeSignals = ref(156)
const completionRate = ref(68)
const recoveryRate = ref(34)

const missionProgress = ref({
  completed: 4,
  total: 7
})

const achievements = ref([
  { id: 1, name: 'Primeiro Contato', icon: '📡' },
  { id: 2, name: 'Radar Ativo', icon: '🎯' },
  { id: 3, name: 'Sinal Recuperado', icon: '⚡' }
])

const tabs = [
  { key: 'public', icon: '🎥', label: 'Série', notification: null },
  { key: 'masp', icon: '🎯', label: 'Painel Avançado', notification: '3' },
  { key: 'analytics', icon: '📊', label: 'Analytics', notification: 'Em breve' }
]

onMounted(() => {
  // Simular atualizações em tempo real
  setInterval(() => {
    signalStrength.value = Math.floor(Math.random() * 20) + 70
    onlineUsers.value = Math.floor(Math.random() * 10) + 38
    activeSignals.value = Math.floor(Math.random() * 20) + 150
  }, 3000)
})
</script>

<style scoped>
.operacao-anti-ghosting {
  min-height: 100vh;
  background: #0a0a0f;
  color: #00ff88;
  position: relative;
  overflow-x: hidden;
}

/* Command Header */
.command-header {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-background {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 30% 20%, rgba(138, 43, 226, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(75, 0, 130, 0.2) 0%, transparent 50%),
    linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 100%);
}

.radar-sweep {
  position: absolute;
  top: 10%;
  right: 10%;
  width: 200px;
  height: 200px;
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 50%;
  animation: radar-pulse 4s ease-in-out infinite;
}

@keyframes radar-pulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.3;
  }
  50% { 
    transform: scale(1.2);
    opacity: 0.6;
  }
}

.scan-lines {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 136, 0.03) 2px,
    rgba(0, 255, 136, 0.03) 4px
  );
  animation: scan-move 2s linear infinite;
}

@keyframes scan-move {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}

.header-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  padding: 0 32px;
}

.mission-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(138, 43, 226, 0.2);
  border: 1px solid rgba(138, 43, 226, 0.5);
  padding: 12px 24px;
  border-radius: 25px;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
}

.badge-icon {
  font-size: 20px;
  filter: drop-shadow(0 0 10px rgba(138, 43, 226, 0.8));
}

.badge-text {
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1px;
}

.badge-status {
  background: rgba(0, 255, 136, 0.2);
  color: #00ff88;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 800;
  animation: status-blink 2s ease-in-out infinite;
}

@keyframes status-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.mission-title {
  margin-bottom: 40px;
}

.title-main {
  display: block;
  font-size: clamp(36px, 6vw, 60px);
  font-weight: 900;
  color: white;
  text-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
  margin-bottom: 8px;
}

.title-sub {
  display: block;
  font-size: clamp(18px, 3vw, 24px);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.mission-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

/* Radar Display */
.stat-radar {
  display: flex;
  align-items: center;
  gap: 20px;
}

.radar-display {
  position: relative;
  width: 80px;
  height: 80px;
}

.radar-circle {
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 255, 136, 0.3);
  border-radius: 50%;
  position: relative;
}

.radar-ping {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  background: #00ff88;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px #00ff88;
  animation: ping-pulse 1.5s ease-in-out infinite;
}

@keyframes ping-pulse {
  0% { 
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% { 
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}

.radar-sweep-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 40px;
  background: linear-gradient(to top, transparent, #00ff88);
  transform-origin: bottom center;
  transform: translate(-50%, -100%);
  animation: radar-sweep-rotate 3s linear infinite;
}

@keyframes radar-sweep-rotate {
  0% { transform: translate(-50%, -100%) rotate(0deg); }
  100% { transform: translate(-50%, -100%) rotate(360deg); }
}

.radar-info {
  text-align: left;
}

.signal-strength {
  font-size: 24px;
  font-weight: 800;
  color: #00ff88;
  margin-bottom: 4px;
}

.signal-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}

/* Mission Progress */
.mission-progress {
  display: flex;
  gap: 40px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-icon {
  font-size: 24px;
  filter: drop-shadow(0 0 8px rgba(0, 255, 136, 0.5));
}

.progress-number {
  font-size: 20px;
  font-weight: 800;
  color: #00ff88;
  margin-bottom: 2px;
}

.progress-label {
  font-size: 11px;
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
  border-bottom: 1px solid rgba(138, 43, 226, 0.3);
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
  background: rgba(138, 43, 226, 0.1);
  border: 1px solid rgba(138, 43, 226, 0.3);
  position: relative;
}

.tab-item:hover {
  background: rgba(138, 43, 226, 0.2);
  border-color: rgba(138, 43, 226, 0.5);
}

.tab-item.active {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(75, 0, 130, 0.3));
  border-color: #8a2be2;
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.4);
}

.tab-icon {
  font-size: 16px;
}

.tab-label {
  font-weight: 600;
  font-size: 14px;
  color: white;
}

.tab-notification {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff0088;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  animation: notification-pulse 2s ease-in-out infinite;
}

@keyframes notification-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Content Area */
.content-area {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 32px;
  min-height: 60vh;
}

/* Floating HUD */
.floating-hud {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 20;
}

.hud-item {
  background: rgba(10, 10, 15, 0.9);
  border: 1px solid rgba(0, 255, 136, 0.3);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
  min-width: 60px;
}

.hud-icon {
  font-size: 16px;
  margin-bottom: 4px;
}

.hud-value {
  font-size: 14px;
  font-weight: 800;
  color: #00ff88;
  margin-bottom: 2px;
}

.hud-label {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
}

.analytics-placeholder {
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.7);
}

.analytics-placeholder h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #8a2be2;
}

.analytics-placeholder p {
  font-size: 16px;
  margin: 0;
}

.placeholder {
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.7);
}

.placeholder h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #00ff88;
}

.placeholder p {
  font-size: 16px;
  margin: 0;
}

.masp-simple {
  padding: 40px 20px;
  text-align: center;
}

.masp-simple h2 {
  font-size: 32px;
  margin-bottom: 8px;
  color: #00ff88;
}

.masp-simple p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 40px;
}

.masp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.masp-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.masp-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 255, 136, 0.3);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.masp-card h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: white;
}

.card-stats {
  font-size: 14px;
  color: #00ff88;
  font-weight: 600;
}

/* Resources Section */
.resources-section {
  margin-top: 40px;
  text-align: left;
}

.resource-category {
  margin-bottom: 32px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 20px;
}

.resource-category h3 {
  font-size: 18px;
  margin-bottom: 16px;
  color: #00ff88;
  border-bottom: 1px solid rgba(0, 255, 136, 0.2);
  padding-bottom: 8px;
}

.resource-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 8px;
}

.resource-item {
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  border-left: 3px solid transparent;
  transition: all 0.2s ease;
}

.resource-item.active {
  background: rgba(255, 193, 7, 0.1);
  border-left-color: #ffc107;
  color: #ffc107;
}

.resource-item.unlocked {
  background: rgba(0, 255, 136, 0.1);
  border-left-color: #00ff88;
  color: #00ff88;
}

.resource-item.earned {
  background: rgba(76, 175, 80, 0.1);
  border-left-color: #4caf50;
  color: #4caf50;
}

.resource-item.locked {
  background: rgba(255, 255, 255, 0.05);
  border-left-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.5);
}

/* Passport Section */
.passport-section {
  border: 2px solid rgba(255, 193, 7, 0.3);
  background: rgba(255, 193, 7, 0.05);
}

.passport-progress {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.progress-info {
  flex: 1;
  min-width: 200px;
}

.progress-info span {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffc107, #ff9800);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: #ffc107;
  font-weight: 600;
}

.passport-reward {
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.3);
}

.passport-reward.locked {
  opacity: 0.6;
}

.reward-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.reward-text {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.reward-value {
  font-size: 12px;
  color: #ffc107;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .mission-stats {
    flex-direction: column;
    gap: 30px;
  }
  
  .mission-progress {
    flex-direction: column;
    gap: 20px;
  }
  
  .floating-hud {
    position: static;
    flex-direction: row;
    justify-content: center;
    margin: 20px;
    transform: none;
  }
}
</style>