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
        
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-icon">📺</span>
            <span class="stat-text">6 episódios</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">⏱️</span>
            <span class="stat-text">40min total</span>
          </div>
          <div class="stat-item">
            <span class="stat-icon">🎯</span>
            <span class="stat-text">-30% ghosting</span>
          </div>
        </div>
        
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
            class="info-btn"
            variant="outlined"
            size="large"
            @click="showInfo = true"
          >
            <v-icon class="mr-2">mdi-information-outline</v-icon>
            Mais Informações
          </v-btn>
        </div>
      </div>
      
      <!-- Teaser Video -->
      <div class="hero-teaser">
        <div class="teaser-container">
          <div class="teaser-label">
            <v-icon class="mr-1">mdi-play-circle</v-icon>
            <span>TEASER</span>
          </div>
          <div class="vimeo-wrapper teaser-video">
            <iframe 
              src="https://player.vimeo.com/video/1120566489?badge=0&autopause=0&player_id=0&app_id=58479" 
              frameborder="0" 
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
              referrerpolicy="strict-origin-when-cross-origin"
              title="EP0 Antecipação Editada v020 20250913"
            ></iframe>
          </div>
        </div>
      </div>
    </div>

    <!-- Episodes Section -->
    <div class="episodes-section">
      <h2 class="section-title">Episódios</h2>
      
      <div class="episodes-grid">
        <div 
          v-for="episode in episodes" 
          :key="episode.id"
          class="episode-card"
          :class="{ 
            active: currentEpisode.id === episode.id,
            completed: episode.completed,
            locked: !episode.available 
          }"
          @click="selectEpisode(episode)"
        >
          <div class="episode-thumbnail">
            <div class="thumbnail-overlay">
              <div class="play-icon">
                <v-icon v-if="episode.completed" color="success">mdi-check-circle</v-icon>
                <v-icon v-else-if="episode.available" color="white">mdi-play</v-icon>
                <v-icon v-else color="grey">mdi-lock</v-icon>
              </div>
            </div>
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

    <!-- Current Episode Details -->
    <div class="episode-details">
      <div class="details-container">
        <div class="episode-meta">
          <h3 class="meta-title">EP{{ currentEpisode.number }}: {{ currentEpisode.title }}</h3>
          <div class="meta-info">
            <span class="meta-duration">{{ currentEpisode.duration }}</span>
            <span class="meta-separator">•</span>
            <span class="meta-type">{{ currentEpisode.type }}</span>
            <span class="meta-separator">•</span>
            <span class="meta-status">{{ getStatusText(currentEpisode) }}</span>
          </div>
        </div>
        
        <div class="episode-content">
          <!-- Video Block -->
          <div class="content-block video-block">
            <div class="block-header">
              <v-icon class="mr-2">mdi-video</v-icon>
              <span>Vídeo: "{{ currentEpisode.videoTitle || currentEpisode.title }}"</span>
            </div>
            <div class="vimeo-container">
              <div class="vimeo-wrapper">
                <iframe 
                  src="https://player.vimeo.com/video/1120566489?badge=0&autopause=0&player_id=0&app_id=58479" 
                  frameborder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                  referrerpolicy="strict-origin-when-cross-origin"
                  title="EP0 Antecipação Editada v020 20250913"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div v-if="currentEpisode.available" class="episode-progress">
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: currentEpisode.progress + '%' }"
            ></div>
          </div>
          <div class="progress-text">{{ currentEpisode.progress }}% assistido</div>
          
          <!-- Complete Button -->
          <v-btn 
            v-if="!currentEpisode.completed"
            class="complete-btn"
            color="success"
            variant="outlined"
            size="small"
            @click="completeEpisode(currentEpisode.id)"
          >
            <v-icon start size="small">mdi-check</v-icon>
            Marcar como Concluído
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showInfo = ref(false)

const episodes = ref([
  {
    id: 0,
    number: 0,
    title: 'Teaser da Série',
    description: 'Vídeo de apresentação da série anti-ghosting',
    duration: '3min',
    type: 'Teaser',
    available: true,
    completed: false,
    progress: 0,
    videoTitle: 'Apresentação da Série'
  },
  {
    id: 1,
    number: 1,
    title: 'Radar Anti‑Ghosting',
    description: 'Mapeie seus contatos e descubra onde está perdendo leads',
    duration: '15min',
    type: 'Diagnóstico',
    available: true,
    completed: false,
    progress: 0,
    videoTitle: 'Anatomia do Sumiço — como montar seu Radar'
  },
  {
    id: 2,
    number: 2,
    title: 'Protocolo OEP',
    description: 'Estrutura em 3 passos: Objetivo → Encaixe → Proposta',
    duration: '20min',
    type: 'Estrutura',
    available: false,
    completed: false,
    progress: 0,
    videoTitle: 'OEP ao vivo (com 1 contato da sua lista)'
  },
  {
    id: 3,
    number: 3,
    title: 'Sala de Interrogatório',
    description: 'Autópsia de 10 conversas para identificar quebras',
    duration: '15min',
    type: 'Auditoria',
    available: false,
    completed: false,
    progress: 0,
    videoTitle: 'Audite 10 conversas em 15 minutos'
  },
  {
    id: 4,
    number: 4,
    title: 'Episódio 4',
    description: 'Descrição do episódio 4',
    duration: '18min',
    type: 'Estratégia',
    available: false,
    completed: false,
    progress: 0
  },
  {
    id: 5,
    number: 5,
    title: 'Episódio 5',
    description: 'Descrição do episódio 5',
    duration: '22min',
    type: 'Implementação',
    available: false,
    completed: false,
    progress: 0
  },
  {
    id: 6,
    number: 6,
    title: 'Episódio 6',
    description: 'Descrição do episódio 6',
    duration: '25min',
    type: 'Otimização',
    available: false,
    completed: false,
    progress: 0
  }
])

const currentEpisode = ref(episodes.value[0])

const selectEpisode = (episode) => {
  if (episode.available) {
    currentEpisode.value = episode
  }
}

const completeEpisode = (episodeId) => {
  const episode = episodes.value.find(e => e.id === episodeId)
  if (episode && episode.available) {
    episode.completed = true
    episode.progress = 100
    
    // Unlock next episode
    const nextEpisode = episodes.value.find(e => e.id === episodeId + 1)
    if (nextEpisode) {
      nextEpisode.available = true
    }
  }
}

const playCurrentEpisode = () => {
  console.log('Playing episode:', currentEpisode.value.title)
  // Simulate watching - complete after 2 seconds
  setTimeout(() => {
    completeEpisode(currentEpisode.value.id)
  }, 2000)
}

const getStatusText = (episode) => {
  if (episode.completed) return 'Assistido'
  if (episode.available) return 'Disponível'
  return 'Bloqueado'
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
  flex: 1;
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

.hero-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.stat-icon {
  font-size: 16px;
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

.play-btn:hover {
  background: rgba(255, 255, 255, 0.9) !important;
}

.info-btn {
  background: rgba(109, 109, 110, 0.7) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  border-radius: 8px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  font-size: 16px !important;
  padding: 12px 32px !important;
}

.info-btn:hover {
  background: rgba(109, 109, 110, 0.9) !important;
}

/* Hero Teaser */
.hero-teaser {
  position: relative;
  z-index: 2;
  flex: 0 0 300px;
  margin-left: 40px;
}

.teaser-container {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(138, 43, 226, 0.3);
}

.teaser-label {
  display: flex;
  align-items: center;
  color: #8a2be2;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.teaser-video {
  padding-bottom: 177.78%; /* 9:16 aspect ratio */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(138, 43, 226, 0.3);
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.episode-card {
  background: #2f2f2f;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.episode-card.active {
  opacity: 1;
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
}

.episode-card.completed {
  border: 2px solid #46d369;
}

.episode-card.locked {
  opacity: 0.4;
  cursor: not-allowed;
}

.episode-card:hover:not(.locked) {
  transform: scale(1.02);
  opacity: 1;
}

.episode-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, #333, #555);
  display: flex;
  align-items: center;
  justify-content: center;
}

.thumbnail-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.episode-card:hover .thumbnail-overlay {
  opacity: 1;
}

.play-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Episode Details */
.episode-details {
  padding: 0 60px 40px;
}

.details-container {
  background: #1f1f1f;
  border-radius: 8px;
  padding: 24px;
}

.episode-meta {
  margin-bottom: 24px;
}

.meta-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: white;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.meta-separator {
  color: rgba(255, 255, 255, 0.4);
}

.episode-content {
  margin-bottom: 24px;
}

.content-block {
  background: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
}

.block-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

/* Vimeo Video Container */
.vimeo-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.vimeo-wrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.vimeo-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.episode-progress {
  margin-top: 16px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: #e50914;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 12px;
}

.complete-btn {
  border-color: rgba(76, 175, 80, 0.5) !important;
  color: #4caf50 !important;
  text-transform: none !important;
  font-size: 12px !important;
}

.complete-btn:hover {
  background: rgba(76, 175, 80, 0.1) !important;
  border-color: #4caf50 !important;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    padding: 0 20px;
  }
  
  .hero-title {
    font-size: 32px;
  }
  
  .episodes-section {
    padding: 20px;
  }
  
  .episode-details {
    padding: 0 20px 20px;
  }
  
  .hero-teaser {
    flex: 1;
    margin-left: 20px;
    margin-top: 20px;
  }
  
  .teaser-container {
    max-width: 250px;
  }
  
  .hero-actions {
    flex-direction: column;
  }
  
  .play-btn,
  .info-btn {
    width: 100%;
  }
}
</style>