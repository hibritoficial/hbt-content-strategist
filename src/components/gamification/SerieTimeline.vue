<template>
  <div class="serie-timeline">
    <!-- Header -->
    <div class="timeline-header">
      <h2 class="timeline-title">📺 Operação Anti‑Ghosting</h2>
      <p class="timeline-subtitle">7 dias para eliminar o ghosting e aumentar suas conversões</p>
      
      <div class="timeline-stats">
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">-30%</div>
          <div class="stat-label">Meta Ghosting</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📅</div>
          <div class="stat-value">7</div>
          <div class="stat-label">Dias</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-value">{{ completedEpisodes }}/7</div>
          <div class="stat-label">Episódios</div>
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div class="episodes-timeline">
      <!-- D0 - Teaser -->
      <div class="episode-item teaser" :class="{ completed: progress >= 0 }">
        <div class="episode-marker">
          <div class="marker-icon">🚨</div>
        </div>
        <div class="episode-content">
          <div class="episode-card">
            <div class="episode-header">
              <h3>D0 — Alerta Ghost</h3>
              <span class="episode-type">Teaser</span>
            </div>
            <p class="episode-description">
              "O aluno perguntou preço… e sumiu. Isso tem nome: <strong>Ghosting</strong>."
            </p>
            <div class="episode-video">
              <div class="video-thumbnail">
                <div class="play-button" @click="playVideo('teaser')">
                  <v-icon color="white">mdi-play</v-icon>
                </div>
                <div class="video-info">
                  <span class="video-title">Alerta Ghost — a Operação começou</span>
                  <span class="video-duration">5 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- D+1 - EP1 -->
      <div class="episode-item" :class="{ completed: progress >= 1, active: progress === 1 }">
        <div class="episode-marker">
          <div class="marker-icon">1</div>
        </div>
        <div class="episode-content">
          <div class="episode-card">
            <div class="episode-header">
              <h3>D+1 — EP1: Radar Anti‑Ghosting</h3>
              <span class="episode-type">Diagnóstico</span>
            </div>
            <p class="episode-description">
              Mapeie seus últimos contatos e descubra onde está perdendo leads
            </p>
            
            <!-- Carousel -->
            <div class="carousel-container">
              <div class="carousel-header">
                <v-icon class="mr-1">mdi-view-carousel</v-icon>
                <span>Carrossel: "Perdidos na Neblina"</span>
                <v-btn size="small" variant="outlined" @click="openCarousel(1)">
                  Ver Slides
                </v-btn>
              </div>
              <div class="carousel-preview">
                <div class="slide-preview" v-for="(slide, index) in episode1Slides" :key="index">
                  <div class="slide-number">{{ index + 1 }}</div>
                  <div class="slide-content">{{ slide.title }}</div>
                </div>
              </div>
            </div>

            <!-- Video -->
            <div class="episode-video">
              <div class="video-thumbnail">
                <div class="play-button" @click="playVideo('ep1')">
                  <v-icon color="white">mdi-play</v-icon>
                </div>
                <div class="video-info">
                  <span class="video-title">Anatomia do Sumiço — como montar seu Radar</span>
                  <span class="video-duration">15 min</span>
                </div>
              </div>
            </div>

            <!-- Rewards -->
            <div class="episode-rewards">
              <div class="reward-item mission">
                <v-icon size="small">mdi-target</v-icon>
                <span>M1: Radar de Contatos</span>
              </div>
              <div class="reward-item artifact">
                <v-icon size="small">mdi-file-document</v-icon>
                <span>A1: Planilha Forense</span>
              </div>
              <div class="reward-item badge">
                <v-icon size="small">mdi-medal</v-icon>
                <span>S1: Varredura</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- D+2 - EP2 -->
      <div class="episode-item" :class="{ completed: progress >= 2, active: progress === 2 }">
        <div class="episode-marker">
          <div class="marker-icon">2</div>
        </div>
        <div class="episode-content">
          <div class="episode-card">
            <div class="episode-header">
              <h3>D+2 — EP2: Protocolo OEP</h3>
              <span class="episode-type">Estrutura</span>
            </div>
            <p class="episode-description">
              Aprenda a estrutura em 3 passos que trava fantasmas: Objetivo → Encaixe → Proposta
            </p>
            
            <!-- Carousel -->
            <div class="carousel-container">
              <div class="carousel-header">
                <v-icon class="mr-1">mdi-view-carousel</v-icon>
                <span>Carrossel: "Protocolo OEP"</span>
                <v-btn size="small" variant="outlined" @click="openCarousel(2)">
                  Ver Slides
                </v-btn>
              </div>
              <div class="carousel-preview">
                <div class="slide-preview" v-for="(slide, index) in episode2Slides" :key="index">
                  <div class="slide-number">{{ index + 1 }}</div>
                  <div class="slide-content">{{ slide.title }}</div>
                </div>
              </div>
            </div>

            <!-- Video -->
            <div class="episode-video">
              <div class="video-thumbnail">
                <div class="play-button" @click="playVideo('ep2')">
                  <v-icon color="white">mdi-play</v-icon>
                </div>
                <div class="video-info">
                  <span class="video-title">OEP ao vivo (com 1 contato da sua lista)</span>
                  <span class="video-duration">20 min</span>
                </div>
              </div>
            </div>

            <!-- Rewards -->
            <div class="episode-rewards">
              <div class="reward-item mission">
                <v-icon size="small">mdi-target</v-icon>
                <span>M5: Luz na Sala (Pitch 45s)</span>
              </div>
              <div class="reward-item artifact">
                <v-icon size="small">mdi-file-document</v-icon>
                <span>A5: Script Pitch 45s</span>
              </div>
              <div class="reward-item badge">
                <v-icon size="small">mdi-medal</v-icon>
                <span>S5: Luz antes do Preço</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- D+3 - EP3 -->
      <div class="episode-item" :class="{ completed: progress >= 3, active: progress === 3 }">
        <div class="episode-marker">
          <div class="marker-icon">3</div>
        </div>
        <div class="episode-content">
          <div class="episode-card">
            <div class="episode-header">
              <h3>D+3 — EP3: Sala de Interrogatório</h3>
              <span class="episode-type">Auditoria</span>
            </div>
            <p class="episode-description">
              Faça autópsia de 10 conversas para identificar onde ainda está quebrando
            </p>
            
            <!-- Carousel -->
            <div class="carousel-container">
              <div class="carousel-header">
                <v-icon class="mr-1">mdi-view-carousel</v-icon>
                <span>Carrossel: "Autópsia de Chats"</span>
                <v-btn size="small" variant="outlined" @click="openCarousel(3)">
                  Ver Slides
                </v-btn>
              </div>
              <div class="carousel-preview">
                <div class="slide-preview" v-for="(slide, index) in episode3Slides" :key="index">
                  <div class="slide-number">{{ index + 1 }}</div>
                  <div class="slide-content">{{ slide.title }}</div>
                </div>
              </div>
            </div>

            <!-- Video -->
            <div class="episode-video">
              <div class="video-thumbnail">
                <div class="play-button" @click="playVideo('ep3')">
                  <v-icon color="white">mdi-play</v-icon>
                </div>
                <div class="video-info">
                  <span class="video-title">Audite 10 conversas em 15 minutos</span>
                  <span class="video-duration">15 min</span>
                </div>
              </div>
            </div>

            <!-- Rewards -->
            <div class="episode-rewards">
              <div class="reward-item mission">
                <v-icon size="small">mdi-target</v-icon>
                <span>M1: Autópsia de 10 chats</span>
              </div>
              <div class="reward-item artifact">
                <v-icon size="small">mdi-file-document</v-icon>
                <span>A18: Radar de KPIs</span>
              </div>
              <div class="reward-item badge">
                <v-icon size="small">mdi-medal</v-icon>
                <span>S17: Telemetria</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Continue with remaining episodes... -->
      <!-- Progress Control -->
      <div class="progress-control">
        <v-slider
          v-model="progress"
          :min="0"
          :max="7"
          :step="1"
          show-ticks="always"
          color="purple"
          track-color="grey-lighten-3"
          thumb-label
        >
          <template v-slot:thumb-label="{ modelValue }">
            D+{{ modelValue }}
          </template>
        </v-slider>
        <div class="progress-actions">
          <v-btn size="small" variant="outlined" @click="progress = 0">Reset</v-btn>
          <v-btn size="small" variant="outlined" color="success" @click="progress = 7">Completar</v-btn>
        </div>
      </div>
    </div>

    <!-- Carousel Modal -->
    <v-dialog v-model="carouselDialog" max-width="800px">
      <v-card>
        <v-card-title class="d-flex align-center justify-space-between">
          <span>{{ currentCarousel.title }}</span>
          <v-btn icon @click="carouselDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="carousel-viewer">
            <div class="slide-navigation">
              <v-btn 
                icon 
                :disabled="currentSlide === 0"
                @click="currentSlide--"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <span class="slide-counter">{{ currentSlide + 1 }} / {{ currentCarousel.slides.length }}</span>
              <v-btn 
                icon 
                :disabled="currentSlide === currentCarousel.slides.length - 1"
                @click="currentSlide++"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
            <div class="slide-content-full">
              <h3>{{ currentCarousel.slides[currentSlide]?.title }}</h3>
              <p>{{ currentCarousel.slides[currentSlide]?.content }}</p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const progress = ref(1)
const carouselDialog = ref(false)
const currentSlide = ref(0)
const currentCarousel = ref({ title: '', slides: [] })

const completedEpisodes = computed(() => progress.value)

// Episode 1 Slides
const episode1Slides = ref([
  { title: 'Capa: Perdidos R$ 818', content: 'Hook: Quanto o ghosting te rouba por mês?' },
  { title: 'O que é Ghosting?', content: 'Quando o interessado some (geralmente depois do preço)' },
  { title: 'Conversa Real', content: 'Mockup WhatsApp: Jorge pergunta preço e some' },
  { title: 'A Realidade', content: '9 de 10 sumiços nascem ANTES do preço' },
  { title: 'Termômetro Ghosting', content: 'Baixo ≤20% | Médio 21-40% | Alto 41-60% | Crítico >60%' },
  { title: 'Planilha Radar', content: 'Como registrar: Matriculado/Sumiu/Recusou' },
  { title: 'Onde Capturar', content: 'WhatsApp/IG: prints dos últimos 30-90 dias' },
  { title: 'CTA Prático', content: 'Preencha HOJE os 5-10 últimos contatos' }
])

// Episode 2 Slides  
const episode2Slides = ref([
  { title: 'Capa: Protocolo OEP', content: 'Trava-fantasmas em 3 passos' },
  { title: 'O de Objetivo', content: '2 perguntas-modelo aplicadas em 3 contatos' },
  { title: 'E de Encaixe', content: 'Mini-script "como funciona" + confirmação' },
  { title: 'P de Proposta', content: 'Amarração + CTA (agenda/pacote)' },
  { title: 'Erros Comuns', content: 'O que quebra o OEP e como evitar' },
  { title: 'Artefatos do Dia', content: 'A5: Pitch 45s | A7: Preço 2 Etapas | A3: Aberturas' },
  { title: 'Selos-alvo', content: 'S5: Luz antes do Preço | S7: Preço Luminoso' },
  { title: 'CTA Final', content: 'Rode OEP em 3 contatos do seu Radar hoje' }
])

// Episode 3 Slides
const episode3Slides = ref([
  { title: 'Capa: Sala Interrogatório', content: 'Autópsia de 10 chats' },
  { title: 'O que Observar', content: 'Pergunta, timing, preço, silêncio' },
  { title: 'Como Classificar', content: 'Exemplo visual de quebras' },
  { title: 'Planilha Forense', content: 'A1: Matriz de auditoria pronta' },
  { title: 'Radar KPIs', content: 'A18: Baseline de métricas' },
  { title: 'CTA Ação', content: 'Auditar 10 conversas hoje' }
])

const openCarousel = (episodeNumber) => {
  const carousels = {
    1: { title: 'EP1: Perdidos na Neblina', slides: episode1Slides.value },
    2: { title: 'EP2: Protocolo OEP', slides: episode2Slides.value },
    3: { title: 'EP3: Sala de Interrogatório', slides: episode3Slides.value }
  }
  
  currentCarousel.value = carousels[episodeNumber]
  currentSlide.value = 0
  carouselDialog.value = true
}

const playVideo = (videoId) => {
  console.log('Playing video:', videoId)
  // Aqui abriria o player de vídeo
}
</script>

<style scoped>
.serie-timeline {
  color: white;
  padding: 0;
}

/* Header */
.timeline-header {
  text-align: center;
  margin-bottom: 40px;
}

.timeline-title {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 12px 0;
  background: linear-gradient(135deg, #8a2be2, #ff0088);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.timeline-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 32px 0;
}

.timeline-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  min-width: 80px;
}

.stat-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 20px;
  font-weight: 800;
  color: #00ff88;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

/* Timeline */
.episodes-timeline {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.episode-item {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 40px;
  position: relative;
}

.episode-item:not(:last-child):not(.teaser)::after {
  content: '';
  position: absolute;
  left: 20px;
  top: 60px;
  width: 2px;
  height: calc(100% + 20px);
  background: rgba(255, 255, 255, 0.2);
  z-index: 1;
}

.episode-item.completed:not(:last-child)::after {
  background: linear-gradient(180deg, #00ff88, rgba(0, 255, 136, 0.3));
}

.episode-marker {
  position: relative;
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.episode-item.completed .episode-marker {
  background: rgba(0, 255, 136, 0.2);
  border-color: #00ff88;
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
}

.episode-item.active .episode-marker {
  background: rgba(138, 43, 226, 0.3);
  border-color: #8a2be2;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 10px rgba(138, 43, 226, 0.3); }
  50% { box-shadow: 0 0 25px rgba(138, 43, 226, 0.6); }
}

.marker-icon {
  font-size: 16px;
  font-weight: 800;
  color: white;
}

.episode-content {
  flex: 1;
}

.episode-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.episode-item.completed .episode-card {
  border-color: rgba(0, 255, 136, 0.3);
  background: rgba(0, 255, 136, 0.05);
}

.episode-item.active .episode-card {
  border-color: rgba(138, 43, 226, 0.4);
  background: rgba(138, 43, 226, 0.05);
}

.episode-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.episode-header h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: white;
}

.episode-type {
  background: rgba(138, 43, 226, 0.2);
  color: #8a2be2;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.episode-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 20px 0;
  line-height: 1.5;
}

/* Carousel */
.carousel-container {
  margin-bottom: 20px;
}

.carousel-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.carousel-header span {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.carousel-preview {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 8px 0;
}

.slide-preview {
  background: rgba(138, 43, 226, 0.1);
  border: 1px solid rgba(138, 43, 226, 0.3);
  border-radius: 8px;
  padding: 8px;
  min-width: 120px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.slide-preview:hover {
  background: rgba(138, 43, 226, 0.2);
  border-color: rgba(138, 43, 226, 0.5);
}

.slide-number {
  font-size: 10px;
  color: #8a2be2;
  font-weight: 700;
  margin-bottom: 4px;
}

.slide-content {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.2;
}

/* Video */
.episode-video {
  margin-bottom: 20px;
}

.video-thumbnail {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.video-thumbnail:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 0, 0, 0.3);
}

.play-button {
  width: 48px;
  height: 48px;
  background: rgba(255, 0, 0, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.play-button:hover {
  background: rgba(255, 0, 0, 1);
  transform: scale(1.1);
}

.video-info {
  flex: 1;
}

.video-title {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.video-duration {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

/* Rewards */
.episode-rewards {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.reward-item.mission {
  background: rgba(255, 152, 0, 0.1);
  color: #ff9800;
  border: 1px solid rgba(255, 152, 0, 0.3);
}

.reward-item.artifact {
  background: rgba(33, 150, 243, 0.1);
  color: #2196f3;
  border: 1px solid rgba(33, 150, 243, 0.3);
}

.reward-item.badge {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
  border: 1px solid rgba(76, 175, 80, 0.3);
}

/* Progress Control */
.progress-control {
  margin-top: 40px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.progress-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

/* Carousel Modal */
.carousel-viewer {
  padding: 20px 0;
}

.slide-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
}

.slide-counter {
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
}

.slide-content-full {
  text-align: center;
  padding: 20px;
  background: rgba(138, 43, 226, 0.05);
  border-radius: 12px;
}

.slide-content-full h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #8a2be2;
}

.slide-content-full p {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
  margin: 0;
  line-height: 1.5;
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .episode-item {
    flex-direction: column;
    gap: 16px;
  }
  
  .episode-item:not(:last-child)::after {
    display: none;
  }
  
  .carousel-preview {
    flex-direction: column;
  }
  
  .slide-preview {
    min-width: auto;
  }
  
  .episode-rewards {
    flex-direction: column;
  }
}
</style>