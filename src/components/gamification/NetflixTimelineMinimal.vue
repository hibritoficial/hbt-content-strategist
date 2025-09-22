<template>
  <div class="netflix-timeline">
    <!-- Hero Episode -->
    <div class="hero-episode">
      <div class="hero-background">
        <div class="hero-gradient"></div>
      </div>
      
      <div class="hero-content">
        <div class="series-badge">
          <span class="badge-text">SÉRIE ORIGINAL</span>
        </div>
        
        <h1 class="hero-title">Operação Anti‑Ghosting</h1>
        <p class="hero-description">
          6 episódios para eliminar o ghosting e recuperar R$ 818/mês em alunos perdidos. 
          Técnicas testadas por +2.847 professores de idiomas.
        </p>
        
        <div class="hero-actions">
          <v-btn 
            class="play-btn"
            size="large"
            @click="playCurrentEpisode"
          >
            <v-icon class="mr-2">mdi-play</v-icon>
            Assistir
          </v-btn>
          
          <v-btn 
            class="copy-editor-btn-hero"
            variant="outlined"
            size="large"
            @click="openCopyEditor"
          >
            <v-icon class="mr-2">mdi-pencil</v-icon>
            Editor de Copies
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Episodes Row -->
    <div class="episodes-section">
      <h2 class="section-title">Episódios</h2>
      
      <div class="episodes-grid">
        <div 
          v-for="episode in episodes" 
          :key="episode.id"
          class="episode-card"
          @click="selectEpisode(episode)"
        >
          <div class="episode-thumbnail">
            <div class="episode-number">{{ episode.number }}</div>
            <div class="episode-duration">{{ episode.duration }}</div>
          </div>
          
          <div class="episode-info">
            <h3 class="episode-title">{{ episode.title }}</h3>
            <p class="episode-description">{{ episode.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Episode Details -->
    <div class="episode-details">
      <h3>EP1: Radar Anti-Ghosting</h3>
      <p>Mapeie seus contatos e descubra onde está perdendo leads</p>
    </div>

    <!-- Radar Section -->
    <div class="radar-section">
      <h2>📶 RADAR ANTI-GHOSTING</h2>
      <div class="radar-screen">
        <div class="radar-sweep"></div>
      </div>
      <v-btn @click="toggleRadar" class="radar-btn">
        {{ radarActive ? 'Pausar' : 'Ativar' }} Radar
      </v-btn>
    </div>

    <!-- Passaporte -->
    <div class="passport-section">
      <h2>🏆 PASSAPORTE ANTI-GHOSTING</h2>
      <p>Colete 10 selos para desbloquear o prêmio de R$ 350</p>
      <div class="seals-grid">
        <div v-for="n in 10" :key="n" class="seal" :class="{ collected: n <= 3 }">
          {{ n <= 3 ? '🏆' : '?' }}
        </div>
      </div>
    </div>

    <!-- Copy Editor Modal -->
    <v-dialog v-model="showCopyEditor" max-width="800">
      <div class="copy-editor-modal">
        <div class="editor-header">
          <h2>📝 Editor de Copies da Série</h2>
          <v-btn icon variant="text" @click="closeCopyEditor">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        
        <div class="modal-content">
          <p>Editor de copies em desenvolvimento...</p>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showCopyEditor = ref(false)
const radarActive = ref(false)

const episodes = ref([
  {
    id: 1,
    number: 1,
    title: 'Radar Anti‑Ghosting',
    description: 'Mapeie seus contatos e descubra onde está perdendo leads',
    duration: '15min',
    available: true,
    completed: false
  },
  {
    id: 2,
    number: 2,
    title: 'Protocolo OEP',
    description: 'Estrutura em 3 passos: Objetivo → Encaixe → Proposta',
    duration: '20min',
    available: false,
    completed: false
  }
])

const currentEpisode = ref(episodes.value[0])

const selectEpisode = (episode) => {
  if (episode.available) {
    currentEpisode.value = episode
  }
}

const playCurrentEpisode = () => {
  console.log('Playing episode:', currentEpisode.value.title)
}

const openCopyEditor = () => {
  showCopyEditor.value = true
}

const closeCopyEditor = () => {
  showCopyEditor.value = false
}

const toggleRadar = () => {
  radarActive.value = !radarActive.value
}
</script>

<style scoped>
.netflix-timeline {
  background: #141414;
  color: white;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* Hero Episode */
.hero-episode {
  position: relative;
  height: 70vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 60px;
}

.hero-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #8a2be2, #4b0082, #1a1a2e);
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(20, 20, 20, 0.8) 0%,
    rgba(20, 20, 20, 0.4) 50%,
    transparent 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 600px;
}

.series-badge {
  background: rgba(229, 9, 20, 0.9);
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 16px;
  display: inline-block;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 16px 0;
  line-height: 1.1;
}

.hero-description {
  font-size: 18px;
  line-height: 1.5;
  margin: 0 0 24px 0;
  color: rgba(255, 255, 255, 0.9);
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.play-btn {
  background: white !important;
  color: black !important;
  border-radius: 8px !important;
  font-weight: 700 !important;
  text-transform: none !important;
  font-size: 16px !important;
  padding: 12px 32px !important;
}

.copy-editor-btn-hero {
  background: rgba(138, 43, 226, 0.7) !important;
  color: white !important;
  border: 1px solid rgba(138, 43, 226, 0.8) !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  font-size: 16px !important;
  padding: 12px 32px !important;
}

/* Episodes Section */
.episodes-section {
  padding: 40px 60px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: white;
}

.episodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.episode-card {
  background: #2f2f2f;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.episode-card:hover {
  transform: scale(1.02);
}

.episode-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, #333, #555);
  display: flex;
  align-items: center;
  justify-content: center;
}

.episode-number {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
}

.episode-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.episode-info {
  padding: 16px;
}

.episode-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: white;
  line-height: 1.3;
}

.episode-description {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.4;
}

/* Copy Editor Modal */
.copy-editor-modal {
  background: #1a1a2e;
  color: white;
  border-radius: 12px;
  overflow: hidden;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(138, 43, 226, 0.1);
}

.editor-header h2 {
  margin: 0;
  color: #8a2be2;
  font-size: 20px;
}

.modal-content {
  padding: 24px;
  text-align: center;
}

.episode-details {
  padding: 40px 60px;
  background: #1f1f1f;
  margin: 20px 60px;
  border-radius: 8px;
}

.radar-section {
  padding: 40px 60px;
  background: linear-gradient(135deg, rgba(0, 255, 127, 0.1), rgba(0, 128, 0, 0.05));
  margin: 20px 60px;
  border-radius: 20px;
  text-align: center;
}

.radar-screen {
  width: 200px;
  height: 200px;
  border: 3px solid #00ff7f;
  border-radius: 50%;
  margin: 20px auto;
  position: relative;
}

.radar-sweep {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 2px;
  background: #00ff7f;
  transform-origin: 0 50%;
  animation: radar-sweep 3s linear infinite;
}

@keyframes radar-sweep {
  0% { transform: translate(0, -50%) rotate(0deg); }
  100% { transform: translate(0, -50%) rotate(360deg); }
}

.radar-btn {
  background: #00ff7f !important;
  color: black !important;
}

.passport-section {
  padding: 40px 60px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.05));
  margin: 20px 60px;
  border-radius: 20px;
  text-align: center;
}

.seals-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  max-width: 300px;
  margin: 20px auto;
}

.seal {
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-align: center;
  font-size: 20px;
}

.seal.collected {
  background: rgba(255, 215, 0, 0.3);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-episode {
    padding: 0 20px;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .episodes-section,
  .episode-details,
  .radar-section,
  .passport-section {
    margin: 10px;
    padding: 20px;
  }
  
  .hero-actions {
    flex-direction: column;
  }
}
</style>