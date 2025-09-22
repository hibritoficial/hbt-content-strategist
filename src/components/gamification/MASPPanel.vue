<template>
  <div class="masp-panel">
    <div class="panel-layout">
      <!-- Left Menu -->
      <div class="panel-menu">
        <div class="menu-header">
          <h3>🎯 RECURSOS</h3>
        </div>
        
        <div class="menu-buttons">
          <v-btn 
            class="menu-btn"
            :class="{ active: activePanel === 'missions' }"
            @click="activePanel = 'missions'"
            block
          >
            <div class="btn-content">
              <div class="btn-icon">🎯</div>
              <div class="btn-text">
                <div class="btn-title">MISSÕES</div>
                <div class="btn-count">3 disponíveis</div>
              </div>
            </div>
          </v-btn>
          
          <v-btn 
            class="menu-btn"
            :class="{ active: activePanel === 'artifacts' }"
            @click="activePanel = 'artifacts'"
            block
          >
            <div class="btn-content">
              <div class="btn-icon">📄</div>
              <div class="btn-text">
                <div class="btn-title">ARTEFATOS</div>
                <div class="btn-count">5 para desbloquear</div>
              </div>
            </div>
          </v-btn>
          
          <v-btn 
            class="menu-btn"
            :class="{ active: activePanel === 'badges' }"
            @click="activePanel = 'badges'"
            block
          >
            <div class="btn-content">
              <div class="btn-icon">🏆</div>
              <div class="btn-text">
                <div class="btn-title">SELOS</div>
                <div class="btn-count">7 conquistas</div>
              </div>
            </div>
          </v-btn>
          
          <v-btn 
            class="menu-btn passport-btn"
            :class="{ active: activePanel === 'passport' }"
            @click="activePanel = 'passport'"
            block
          >
            <div class="btn-content">
              <div class="btn-icon">📖</div>
              <div class="btn-text">
                <div class="btn-title">PASSAPORTE</div>
                <div class="btn-count">3 / 10 selos</div>
              </div>
            </div>
          </v-btn>
        </div>
      </div>
      
      <!-- Right Content -->
      <div class="panel-content">
        <!-- Missions Panel -->
        <div v-if="activePanel === 'missions'" class="content-panel">
          <div class="panel-header">
            <h2>🎯 Missões Disponíveis</h2>
            <p>Ações práticas para implementar o aprendizado dos episódios</p>
          </div>
          
          <div class="missions-grid">
            <div v-for="mission in missions" :key="mission.id" class="mission-card">
              <div class="mission-glow"></div>
              <div class="mission-header">
                <div class="mission-number">M{{ mission.id }}</div>
                <div class="mission-status" :class="mission.status">
                  <v-icon size="small" :color="getStatusColor(mission.status)">{{ getStatusIcon(mission.status) }}</v-icon>
                  <span>{{ getStatusText(mission.status) }}</span>
                </div>
              </div>
              
              <div class="mission-content">
                <h3 class="mission-title">{{ mission.title }}</h3>
                <p class="mission-description">{{ mission.description }}</p>
                
                <div class="mission-requirements">
                  <div class="requirement">
                    <v-icon size="small" color="blue">mdi-file-document</v-icon>
                    <span>Artefato: {{ mission.artifact }}</span>
                  </div>
                  <div class="requirement">
                    <v-icon size="small" color="green">mdi-medal</v-icon>
                    <span>Recompensa: {{ mission.badge }}</span>
                  </div>
                  <div class="requirement">
                    <v-icon size="small" color="purple">mdi-television</v-icon>
                    <span>Episódio: {{ mission.episode }}</span>
                  </div>
                </div>
                
                <div class="mission-progress" v-if="mission.status === 'in-progress'">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: mission.progress + '%' }"></div>
                  </div>
                  <div class="progress-text">{{ mission.progress }}% concluído</div>
                </div>
                
                <div class="mission-actions">
                  <v-btn 
                    class="mission-action-btn" 
                    :class="mission.status"
                    variant="outlined"
                    @click="handleMissionAction(mission)"
                  >
                    <v-icon class="mr-1">{{ getActionIcon(mission.status) }}</v-icon>
                    {{ getActionText(mission.status) }}
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Other panels placeholder -->
        <div v-else class="content-panel">
          <div class="panel-header">
            <h2>{{ getPanelTitle() }}</h2>
            <p>Conteúdo em desenvolvimento...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activePanel = ref('missions')

const missions = ref([
  {
    id: 1,
    title: 'Mapeie seus contatos perdidos',
    description: 'Identifique e catalogue todos os leads que pararam de responder nos últimos 30 dias usando a Planilha Radar.',
    artifact: 'Planilha Radar de Contatos',
    badge: 'Detetive de Leads',
    episode: 'EP1: Radar Anti-Ghosting',
    status: 'available',
    progress: 0
  },
  {
    id: 2,
    title: 'Aplique o Protocolo OEP',
    description: 'Execute a estrutura Objetivo → Encaixe → Proposta em 5 conversas diferentes e documente os resultados.',
    artifact: 'Script Pitch 45s',
    badge: 'Especialista em Conversão',
    episode: 'EP2: Protocolo OEP',
    status: 'locked',
    progress: 0
  },
  {
    id: 3,
    title: 'Analise 10 conversas perdidas',
    description: 'Faça uma auditoria completa de 10 conversas que resultaram em ghosting e identifique os pontos de quebra.',
    artifact: 'Checklist de Diagnóstico',
    badge: 'Analista Expert',
    episode: 'EP3: Sala de Interrogatório',
    status: 'in-progress',
    progress: 65
  }
])

const getPanelTitle = () => {
  const titles = {
    missions: '🎯 Missões Disponíveis',
    artifacts: '📄 Artefatos para Desbloquear', 
    badges: '🏆 Selos para Conquistar',
    passport: '📖 Progresso do Passaporte'
  }
  return titles[activePanel.value] || 'Painel'
}

const getStatusColor = (status) => {
  const colors = {
    available: 'orange',
    'in-progress': 'blue',
    completed: 'green',
    locked: 'grey'
  }
  return colors[status] || 'grey'
}

const getStatusIcon = (status) => {
  const icons = {
    available: 'mdi-clock-outline',
    'in-progress': 'mdi-progress-clock',
    completed: 'mdi-check-circle',
    locked: 'mdi-lock'
  }
  return icons[status] || 'mdi-help'
}

const getStatusText = (status) => {
  const texts = {
    available: 'Disponível',
    'in-progress': 'Em Progresso',
    completed: 'Concluída',
    locked: 'Bloqueada'
  }
  return texts[status] || 'Desconhecido'
}

const getActionIcon = (status) => {
  const icons = {
    available: 'mdi-play',
    'in-progress': 'mdi-arrow-right',
    completed: 'mdi-check',
    locked: 'mdi-lock'
  }
  return icons[status] || 'mdi-help'
}

const getActionText = (status) => {
  const texts = {
    available: 'Iniciar Missão',
    'in-progress': 'Continuar',
    completed: 'Concluída',
    locked: 'Bloqueada'
  }
  return texts[status] || 'Ação'
}

const handleMissionAction = (mission) => {
  if (mission.status === 'available') {
    mission.status = 'in-progress'
    mission.progress = 10
  } else if (mission.status === 'in-progress') {
    mission.progress = Math.min(mission.progress + 20, 100)
    if (mission.progress === 100) {
      mission.status = 'completed'
    }
  }
}
</script>

<style scoped>
.masp-panel {
  background: #141414;
  color: white;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  min-height: 100vh;
  padding: 40px 60px;
}

.panel-layout {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Left Menu */
.panel-menu {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: fit-content;
  position: sticky;
  top: 40px;
}

.menu-header h3 {
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 32px 0;
  text-align: center;
  letter-spacing: 2px;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.menu-btn {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 16px !important;
  padding: 20px !important;
  height: auto !important;
  min-height: 90px !important;
  text-transform: none !important;
  transition: all 0.4s ease !important;
}

.menu-btn:hover {
  background: rgba(138, 43, 226, 0.1) !important;
  border-color: rgba(138, 43, 226, 0.3) !important;
  transform: translateX(8px);
  box-shadow: 0 8px 25px rgba(138, 43, 226, 0.2);
}

.menu-btn.active {
  background: rgba(138, 43, 226, 0.2) !important;
  border-color: rgba(138, 43, 226, 0.6) !important;
  box-shadow: 0 0 30px rgba(138, 43, 226, 0.4) !important;
  transform: translateX(8px);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
}

.btn-icon {
  font-size: 40px;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
}

.btn-text {
  text-align: left;
  flex: 1;
}

.btn-title {
  font-size: 16px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 6px;
  letter-spacing: 1px;
}

.btn-count {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.passport-btn {
  border-color: rgba(255, 215, 0, 0.3) !important;
}

.passport-btn:hover {
  background: rgba(255, 215, 0, 0.1) !important;
  border-color: rgba(255, 215, 0, 0.5) !important;
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.2);
}

.passport-btn.active {
  background: rgba(255, 215, 0, 0.2) !important;
  border-color: rgba(255, 215, 0, 0.8) !important;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.4) !important;
}

/* Right Content */
.panel-content {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.05), rgba(75, 0, 130, 0.05));
  border-radius: 20px;
  padding: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.panel-header {
  text-align: center;
  margin-bottom: 40px;
}

.panel-header h2 {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 12px 0;
  letter-spacing: 1px;
}

.panel-header p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 16px;
}

/* Missions Grid */
.missions-grid {
  display: grid;
  gap: 24px;
}

.mission-card {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  overflow: hidden;
}

.mission-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.mission-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 152, 0, 0.3) 50%, transparent 70%);
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.mission-card:hover .mission-glow {
  opacity: 1;
  animation: glow-pulse 2s ease-in-out infinite alternate;
}

@keyframes glow-pulse {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
}

.mission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.mission-number {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.4);
}

.mission-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
}

.mission-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 16px 0;
  line-height: 1.3;
}

.mission-description {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 24px 0;
  line-height: 1.6;
}

.mission-requirements {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.requirement {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
}

.mission-progress {
  margin-bottom: 24px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #2196f3, #1976d2);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

.mission-actions {
  text-align: center;
}

.mission-action-btn {
  border-radius: 12px !important;
  padding: 12px 24px !important;
  font-weight: 700 !important;
  text-transform: none !important;
  font-size: 14px !important;
  transition: all 0.3s ease !important;
}

.mission-action-btn.available {
  border-color: rgba(255, 152, 0, 0.5) !important;
  color: #ff9800 !important;
}

.mission-action-btn.available:hover {
  background: rgba(255, 152, 0, 0.1) !important;
  border-color: #ff9800 !important;
  transform: translateY(-2px);
}

.mission-action-btn.in-progress {
  border-color: rgba(33, 150, 243, 0.5) !important;
  color: #2196f3 !important;
}

.mission-action-btn.in-progress:hover {
  background: rgba(33, 150, 243, 0.1) !important;
  border-color: #2196f3 !important;
  transform: translateY(-2px);
}

.mission-action-btn.completed {
  border-color: rgba(76, 175, 80, 0.5) !important;
  color: #4caf50 !important;
}

.mission-action-btn.locked {
  border-color: rgba(158, 158, 158, 0.3) !important;
  color: rgba(255, 255, 255, 0.3) !important;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 1024px) {
  .panel-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .panel-menu {
    position: static;
  }
  
  .menu-buttons {
    flex-direction: row;
    overflow-x: auto;
  }
  
  .menu-btn {
    min-width: 200px;
    flex-shrink: 0;
  }
}
</style>