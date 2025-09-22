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
            {{ currentEpisode.completed ? 'Assistir Novamente' : 'Assistir' }}
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

    <!-- Episodes Row -->
    <div class="episodes-section">
      <h2 class="section-title">Episódios</h2>
      
      <div class="episodes-grid">
        <div 
          v-for="episode in episodes" 
          :key="episode.id"
          class="futuristic-episode-card"
          :class="{ 
            completed: episode.completed,
            locked: !episode.available 
          }"
          @click="selectEpisode(episode)"
        >
          <div class="episode-glow"></div>
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
            
            <div class="episode-rewards">
              <div v-if="episode.missions" class="reward-chip mission">
                <v-icon size="small">mdi-target</v-icon>
                <span>{{ episode.missions.length }}M</span>
              </div>
              <div v-if="episode.artifacts" class="reward-chip artifact">
                <v-icon size="small">mdi-file-document</v-icon>
                <span>{{ episode.artifacts.length }}A</span>
              </div>
              <div v-if="episode.badges" class="reward-chip badge">
                <v-icon size="small">mdi-medal</v-icon>
                <span>{{ episode.badges.length }}S</span>
              </div>
            </div>
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
          <!-- Carousel Block -->
          <div class="content-block carousel-block">
            <div class="block-header">
              <v-icon class="mr-2">mdi-view-carousel</v-icon>
              <span>Carrossel: "{{ currentEpisode.carouselTitle }}"</span>
              <v-btn 
                size="small" 
                variant="outlined" 
                class="ml-auto view-mode-btn"
                @click="toggleCarouselView"
              >
                {{ showAllSlides ? 'Ver Slideshow' : 'Ver Todos' }}
              </v-btn>
            </div>
            
            <!-- All Slides Grid View -->
            <div v-if="showAllSlides" class="slides-section">
              <div class="slides-grid">
                <div 
                  v-for="(slide, index) in currentEpisode.slides" 
                  :key="index"
                  class="slide-card"
                  @click="showCopy(slide)"
                >
                  <div class="slide-card-glow"></div>
                  <div class="slide-card-number">{{ slide.number }}</div>
                  
                  <!-- Image or Icon -->
                  <div v-if="slide.image" class="slide-image">
                    <img :src="slide.image" :alt="slide.title" />
                  </div>
                  <div v-else class="slide-card-icon">📱</div>
                  
                  <div class="slide-card-title">{{ slide.title }}</div>
                  
                  <!-- Copy Button -->
                  <v-btn 
                    v-if="slide.copy"
                    size="x-small"
                    variant="text"
                    class="copy-btn"
                    @click.stop="showCopy(slide)"
                  >
                    <v-icon size="small">mdi-text</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
            
            <!-- Slideshow View -->
            <div v-else class="slideshow-section">
              <div class="slideshow-header">
                <v-btn 
                  size="small" 
                  variant="text" 
                  class="back-btn"
                  @click="showAllSlides = true"
                >
                  <v-icon class="mr-1">mdi-arrow-left</v-icon>
                  Voltar para Grid
                </v-btn>
              </div>
              <div class="slideshow-container">
                <div class="simple-carousel">
                  <div 
                    v-for="(slide, index) in currentEpisode.slides" 
                    :key="slide.number"
                    class="carousel-slide-content"
                    :class="{ active: index === 0 }"
                  >
                    <div class="slide-preview">
                      <div class="slide-number">{{ slide.number }}</div>
                      
                      <!-- Image or Icon -->
                      <div v-if="slide.image" class="slide-image-carousel">
                        <img :src="slide.image" :alt="slide.title" />
                      </div>
                      <div v-else class="slide-icon">📱</div>
                    </div>
                    <div class="slide-info">
                      <h4 class="slide-title">{{ slide.title }}</h4>
                    </div>
                    <v-btn 
                      v-if="slide.copy"
                      size="small"
                      variant="outlined"
                      class="details-btn"
                      @click="showCopy(slide)"
                    >
                      Ver Detalhes
                    </v-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Video Block -->
          <div class="content-block video-block">
            <div class="block-header">
              <v-icon class="mr-2">mdi-video</v-icon>
              <span>Vídeo: "{{ currentEpisode.videoTitle }}"</span>
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
        
        <!-- MASP Advanced Panel -->
        <div class="masp-advanced-panel">
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
                      <div class="btn-count">{{ (currentEpisode.missions || []).length }} disponíveis</div>
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
                    <div class="btn-icon">📜</div>
                    <div class="btn-text">
                      <div class="btn-title">ARTEFATOS</div>
                      <div class="btn-count">{{ (currentEpisode.artifacts || []).length }} para desbloquear</div>
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
                      <div class="btn-count">{{ (currentEpisode.badges || []).length }} conquistas</div>
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
                    <div class="btn-icon">📜</div>
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
                  <h2>🎯 Missões do Episódio</h2>
                  <p>Ações práticas para implementar o aprendizado</p>
                </div>
                
                <div v-if="currentEpisode.missions && currentEpisode.missions.length > 0" class="missions-grid">
                  <div v-for="(mission, index) in currentEpisode.missions" :key="mission" class="mission-card">
                    <div class="mission-glow"></div>
                    <div class="mission-header">
                      <div class="mission-number">M{{ index + 1 }}</div>
                      <div class="mission-status">
                        <v-icon color="orange">mdi-clock-outline</v-icon>
                        <span>Pendente</span>
                      </div>
                    </div>
                    
                    <div class="mission-content">
                      <h3 class="mission-title">{{ mission }}</h3>
                      <p class="mission-description">Use o artefato desbloqueado para executar esta missão e conquistar seu selo.</p>
                      
                      <div class="mission-requirements">
                        <div v-if="currentEpisode.artifacts && currentEpisode.artifacts[0]" class="requirement">
                          <v-icon size="small" color="blue">mdi-file-document</v-icon>
                          <span>Artefato: {{ currentEpisode.artifacts[0] }}</span>
                        </div>
                        <div v-if="currentEpisode.badges && currentEpisode.badges[0]" class="requirement">
                          <v-icon size="small" color="green">mdi-medal</v-icon>
                          <span>Recompensa: {{ currentEpisode.badges[0] }}</span>
                        </div>
                      </div>
                      
                      <div class="mission-actions">
                        <v-btn class="start-mission-btn" variant="outlined">
                          <v-icon class="mr-1">mdi-play</v-icon>
                          Iniciar Missão
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-else class="no-content">
                  <p>Este episódio não possui missões disponíveis.</p>
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
        
        <!-- Passport Block -->
        <div class="passport-block">
          <div class="passport-hero">
            <div class="passport-glow"></div>
            <div class="passport-header">
              <div class="passport-icon">🏆</div>
              <div class="passport-info">
                <h2 class="passport-title">PASSAPORTE ANTI-GHOSTING</h2>
                <p class="passport-subtitle">Colete 10 selos para desbloquear o prêmio de R$ 350</p>
              </div>
            </div>
          </div>
          
          <div class="passport-content">
            <div class="progress-section">
              <div class="seals-collected">
                <div class="seals-grid">
                  <div v-for="n in 10" :key="n" class="seal-slot" :class="{ collected: n <= 3 }">
                    <div class="seal-number">{{ n }}</div>
                    <div v-if="n <= 3" class="seal-icon">🏆</div>
                    <div v-else class="seal-empty">?</div>
                  </div>
                </div>
              </div>
              
              <div class="progress-info">
                <div class="progress-bar-passport">
                  <div class="progress-fill-passport" :style="{ width: '30%' }"></div>
                </div>
                <div class="progress-stats">
                  <span class="current-seals">3 selos coletados</span>
                  <span class="remaining-seals">7 restantes</span>
                </div>
              </div>
            </div>
            
            <div class="prize-section">
              <div class="prize-card">
                <div class="prize-glow"></div>
                <div class="prize-header">
                  <div class="prize-icon">💰</div>
                  <div class="prize-value">R$ 350</div>
                </div>
                <div class="prize-details">
                  <h3>PRÊMIO FINAL</h3>
                  <ul class="prize-list">
                    <li>Mentoria Exclusiva 1:1 (60min)</li>
                    <li>Certificado Digital Oficial</li>
                    <li>Acesso ao Grupo VIP</li>
                    <li>Templates Premium</li>
                  </ul>
                </div>
                <div class="unlock-status">
                  <v-icon color="orange">mdi-lock</v-icon>
                  <span>Desbloqueie com 10 selos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Radar Animado -->
        <div class="radar-section">
          <div class="radar-header">
            <h2 class="radar-title">📶 RADAR ANTI-GHOSTING</h2>
            <p class="radar-subtitle">Detectando leads perdidos em tempo real</p>
          </div>
          
          <div class="radar-container">
            <div class="radar-screen">
              <div class="radar-grid">
                <div class="radar-line horizontal"></div>
                <div class="radar-line vertical"></div>
                <div class="radar-circle circle-1"></div>
                <div class="radar-circle circle-2"></div>
                <div class="radar-circle circle-3"></div>
              </div>
              
              <div class="radar-sweep"></div>
              
              <!-- Leads detectados -->
              <div class="radar-dot dot-1" :class="{ active: radarActive }">
                <div class="dot-pulse"></div>
                <div class="dot-label">Lead perdido</div>
              </div>
              <div class="radar-dot dot-2" :class="{ active: radarActive }">
                <div class="dot-pulse"></div>
                <div class="dot-label">Ghosting detectado</div>
              </div>
              <div class="radar-dot dot-3" :class="{ active: radarActive }">
                <div class="dot-pulse"></div>
                <div class="dot-label">Oportunidade</div>
              </div>
            </div>
            
            <div class="radar-stats">
              <div class="stat-item">
                <div class="stat-number">{{ detectedLeads }}</div>
                <div class="stat-label">Leads Detectados</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">R$ {{ lostValue }}</div>
                <div class="stat-label">Valor Perdido</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">{{ recoveryRate }}%</div>
                <div class="stat-label">Taxa de Recuperação</div>
              </div>
            </div>
          </div>
          
          <div class="radar-controls">
            <v-btn 
              class="radar-btn"
              :class="{ active: radarActive }"
              @click="toggleRadar"
              size="large"
            >
              <v-icon class="mr-2">{{ radarActive ? 'mdi-pause' : 'mdi-play' }}</v-icon>
              {{ radarActive ? 'Pausar Radar' : 'Ativar Radar' }}
            </v-btn>
          </div>
        </div>
        
        <!-- Termômetro Ghosting -->
        <div v-if="radarActive && ghostingLevel > 0" class="thermometer-section">
          <div class="thermometer-header">
            <h2 class="thermometer-title">🌡️ TERMÔMETRO DE GHOSTING</h2>
            <p class="thermometer-subtitle">Nível de ghosting detectado: {{ ghostingLevel }}%</p>
          </div>
          
          <div class="thermometer-container">
            <div class="thermometer-visual">
              <div class="thermometer-tube">
                <div class="temperature-fill" :style="{ height: ghostingLevel + '%' }" :class="getTemperatureClass()"></div>
                <div class="temperature-marks">
                  <div v-for="mark in temperatureMarks" :key="mark.value" class="temp-mark" :style="{ bottom: mark.value + '%' }">
                    <span class="mark-line"></span>
                    <span class="mark-label">{{ mark.label }}</span>
                  </div>
                </div>
              </div>
              <div class="thermometer-bulb" :class="getTemperatureClass()"></div>
            </div>
            
            <div class="ghosting-analysis">
              <div class="analysis-card" :class="getTemperatureClass()">
                <div class="analysis-header">
                  <div class="analysis-icon">{{ getGhostingIcon() }}</div>
                  <div class="analysis-level">{{ getGhostingStatus() }}</div>
                </div>
                
                <div class="analysis-content">
                  <h3>{{ getGhostingTitle() }}</h3>
                  <p>{{ getGhostingDescription() }}</p>
                  
                  <div class="recommendations">
                    <h4>Recomendações:</h4>
                    <ul>
                      <li v-for="rec in getRecommendations()" :key="rec">{{ rec }}</li>
                    </ul>
                  </div>
                  
                  <div class="urgency-level">
                    <div class="urgency-bar">
                      <div class="urgency-fill" :style="{ width: getUrgencyLevel() + '%' }" :class="getTemperatureClass()"></div>
                    </div>
                    <span class="urgency-text">Urgência: {{ getUrgencyText() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Copy Editor Modal -->
    <v-dialog v-model="showCopyEditor" max-width="1400" persistent>
      <div class="copy-editor-modal">
        <div class="editor-header">
          <h2>📝 Editor de Copies da Série</h2>
          <div class="header-actions">
            <v-btn size="small" variant="outlined" @click="exportJson">
              <v-icon class="mr-1">mdi-download</v-icon>
              Exportar JSON
            </v-btn>
            <v-btn size="small" variant="outlined" @click="showJsonImport = true">
              <v-icon class="mr-1">mdi-upload</v-icon>
              Importar JSON
            </v-btn>
            <v-btn icon variant="text" @click="closeCopyEditor">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
        
        <div class="editor-layout-new">
          <!-- Top Episodes Bar -->
          <div class="episodes-bar">
            <div class="episodes-header">
              <h3>Episódios ({{ episodes.length }})</h3>
              <div class="navigation-hint">
                <span>Use ← → para navegar</span>
              </div>
            </div>
            <div class="episodes-horizontal">
              <div 
                v-for="(episode, index) in episodes" 
                :key="episode.id"
                class="episode-chip"
                :class="{ active: selectedEpisodeId === episode.id }"
                @click="selectEpisodeForEdit(episode.id)"
                tabindex="0"
                @keydown="handleEpisodeKeydown($event, index)"
              >
                <div class="chip-number">{{ index + 1 }}</div>
                <div class="chip-content">
                  <div class="chip-title">EP{{ episode.number }}</div>
                  <div class="chip-subtitle">{{ episode.title }}</div>
                  <div class="chip-badges">
                    <v-icon v-if="episode.videoScript" size="10" color="#2196f3">mdi-video</v-icon>
                    <v-icon v-if="episode.slides && episode.slides.length > 0" size="10" color="#9c27b0">mdi-view-carousel</v-icon>
                    <span v-if="episode.slides && episode.slides.length > 0" class="slides-count">{{ episode.slides.length }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Content Grid -->
          <div class="content-grid">
            <!-- Left - Content Tabs -->
            <div class="content-panel">
              <v-tabs v-model="activeTab" class="content-tabs">
                <v-tab v-if="selectedEpisode?.number >= 1 && selectedEpisode?.number <= 6" value="carousel">
                  <v-icon class="mr-2" size="small">mdi-view-carousel</v-icon>
                  Carrossel ({{ selectedEpisodeSlides.length }})
                </v-tab>
                <v-tab v-if="selectedEpisode?.number === 0 || selectedEpisode?.number === 7 || (selectedEpisode?.number >= 1 && selectedEpisode?.number <= 6)" value="video">
                  <v-icon class="mr-2" size="small">mdi-video</v-icon>
                  Roteiro do Vídeo
                </v-tab>
              </v-tabs>
              
              <v-tabs-window v-model="activeTab" class="tabs-content">
                <!-- Carousel Tab -->
                <v-tabs-window-item value="carousel">
                  <div class="tab-header">
                    <v-btn 
                      @click="addSlide" 
                      size="small"
                      variant="outlined"
                      class="add-slide-btn"
                    >
                      <v-icon size="small" class="mr-1">mdi-plus</v-icon>
                      Novo Slide
                    </v-btn>
                  </div>
                  
                  <div class="slides-grid-compact">
                    <div 
                      v-for="(slide, index) in selectedEpisodeSlides" 
                      :key="slide.number"
                      class="slide-card-compact"
                      :class="{ active: currentSlideIndex === index, editing: editingSlide === index }"
                      @click="selectSlide(index)"
                      @mouseenter="hoveredSlide = index"
                      @mouseleave="hoveredSlide = null"
                      tabindex="0"
                      @keydown="handleSlideKeydown($event, index)"
                    >
                      <div class="slide-header">
                        <div class="slide-info">
                          <span class="slide-number">{{ slide.number }}</span>
                          <span class="slide-preview">{{ slide.title || 'Sem título' }}</span>
                        </div>
                        <div class="slide-actions" :class="{ visible: hoveredSlide === index || currentSlideIndex === index }">
                          <v-checkbox
                            v-model="slide.approved"
                            density="compact"
                            hide-details
                            color="success"
                            class="approval-checkbox"
                            @click.stop
                          />
                          <v-btn 
                            size="x-small" 
                            icon 
                            variant="text"
                            @click.stop="startEdit(index)"
                            class="edit-btn"
                          >
                            <v-icon size="small">mdi-pencil</v-icon>
                          </v-btn>
                          <v-btn 
                            size="x-small" 
                            icon 
                            variant="text"
                            @click.stop="removeSlide(index)"
                            :disabled="selectedEpisodeSlides.length <= 1"
                            class="delete-btn"
                          >
                            <v-icon size="small">mdi-close</v-icon>
                          </v-btn>
                        </div>
                      </div>
                      
                      <!-- View Mode -->
                      <div v-if="editingSlide !== index" class="slide-view">
                        <div class="slide-field" v-if="slide.title">
                          <strong>Título:</strong> {{ slide.title }}
                        </div>
                        <div class="slide-field" v-if="slide.subtitle">
                          <strong>Subtítulo:</strong> {{ slide.subtitle }}
                        </div>
                        <div class="slide-field" v-if="slide.description">
                          <strong>Descrição:</strong> {{ slide.description }}
                        </div>
                      </div>
                      
                      <!-- Edit Mode -->
                      <div v-else class="slide-edit">
                        <v-text-field
                          v-model="slide.title"
                          label="Título"
                          variant="outlined"
                          density="compact"
                          hide-details
                          class="mb-2"
                        />
                        
                        <v-text-field
                          v-model="slide.subtitle"
                          label="Subtítulo"
                          variant="outlined"
                          density="compact"
                          hide-details
                          class="mb-2"
                        />
                        
                        <v-textarea
                          v-model="slide.description"
                          label="Descrição/Copy"
                          variant="outlined"
                          density="compact"
                          rows="3"
                          auto-grow
                          hide-details
                          class="mb-2"
                        />
                        
                        <div class="edit-actions">
                          <v-btn size="small" @click="saveEdit" color="success">
                            <v-icon class="mr-1" size="small">mdi-check</v-icon>
                            Salvar
                          </v-btn>
                          <v-btn size="small" @click="cancelEdit" variant="outlined">
                            <v-icon class="mr-1" size="small">mdi-close</v-icon>
                            Cancelar
                          </v-btn>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-tabs-window-item>
                
                <!-- Video Tab -->
                <v-tabs-window-item value="video">
                  <div class="video-section">
                    <div class="section-header">
                      <div class="section-info">
                        <span class="section-title">Roteiro do Vídeo Complementar</span>
                      </div>
                      <v-checkbox
                        v-model="selectedEpisode.videoScriptApproved"
                        density="compact"
                        hide-details
                        color="success"
                        class="approval-checkbox"
                      />
                    </div>
                    
                    <v-textarea
                      v-model="selectedEpisode.videoScript"
                      variant="outlined"
                      density="comfortable"
                      rows="25"
                      auto-grow
                      hide-details
                      placeholder="Digite o roteiro do vídeo complementar aqui..."
                      class="content-textarea-full"
                    />
                  </div>
                </v-tabs-window-item>
              </v-tabs-window>
            </div>
            
            <!-- Right - JSON Panel -->
            <div class="json-panel-right">
              <div class="json-header">
                <h3>JSON Atualizado</h3>
                <v-btn size="small" variant="outlined" @click="copyJsonToClipboard">
                  <v-icon class="mr-1" size="small">mdi-content-copy</v-icon>
                  Copiar
                </v-btn>
              </div>
              <div class="json-output-right">
                <pre>{{ formattedJson }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-dialog>
    
    <!-- JSON Import Modal -->
    <v-dialog v-model="showJsonImport" max-width="600">
      <div class="json-import-modal">
        <div class="modal-header">
          <h3>Importar JSON</h3>
          <v-btn icon variant="text" @click="showJsonImport = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        
        <div class="modal-content">
          <v-textarea
            v-model="jsonInput"
            label="Cole o JSON aqui"
            variant="outlined"
            rows="15"
            placeholder='[{"id": 1, "slides": [...]}]'
          />
          
          <div class="import-actions">
            <v-btn @click="showJsonImport = false" variant="outlined">
              Cancelar
            </v-btn>
            <v-btn @click="importJson" color="primary">
              Importar
            </v-btn>
          </div>
        </div>
      </div>
    </v-dialog>
    
    <!-- Copy Modal -->
    <v-dialog v-model="showCopyModal" max-width="600" @update:model-value="onModalClose">
      <div class="copy-modal">
        <div class="modal-header">
          <h3>Slide {{ selectedSlide?.number }} / {{ currentEpisode.slides.length }}</h3>
          <v-btn 
            icon 
            variant="text" 
            @click="showCopyModal = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        
        <div class="modal-content">
          <div class="slide-preview-modal">
            <!-- Navigation Controls -->
            <v-btn 
              icon 
              variant="text" 
              class="nav-btn-left"
              @click="prevSlide"
              :disabled="selectedSlide?.number === 1"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            
            <div v-if="selectedSlide?.image" class="slide-image-modal">
              <img :src="selectedSlide.image" :alt="selectedSlide.title" />
            </div>
            
            <v-btn 
              icon 
              variant="text" 
              class="nav-btn-right"
              @click="nextSlide"
              :disabled="selectedSlide?.number === currentEpisode.slides.length"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
          
          <div class="slide-details">
            <h3 class="slide-title-modal">{{ selectedSlide?.title }}</h3>
            <p class="slide-subtitle-modal">{{ selectedSlide?.description }}</p>
          </div>
          
          <div class="copy-content">
            <h4>Copy Projetado:</h4>
            <p>{{ selectedSlide?.copy || 'Copy não disponível para este slide.' }}</p>
          </div>
        </div>
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
// import FuturisticCarousel from '@/components/FuturisticCarousel.vue'

const showInfo = ref(false)
const scrollPosition = ref(0)
const maxScroll = ref(0)
const carouselContainer = ref(null)
const showAllSlides = ref(true)
const showCopyModal = ref(false)
const selectedSlide = ref(null)
const showCopyEditor = ref(false)
const showJsonImport = ref(false)
const jsonInput = ref('')
const selectedEpisodeId = ref(1)
const currentSlideIndex = ref(0)
const editingSlide = ref(null)
const hoveredSlide = ref(null)
const activeTab = ref('carousel')
const activePanel = ref('missions')
const radarActive = ref(false)
const detectedLeads = ref(12)
const lostValue = ref(818)
const recoveryRate = ref(73)
const ghostingLevel = ref(0)

const temperatureMarks = ref([
  { value: 0, label: '0%' },
  { value: 25, label: '25%' },
  { value: 50, label: '50%' },
  { value: 75, label: '75%' },
  { value: 100, label: '100%' }
])

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
    videoScript: 'Roteiro do vídeo teaser aqui...',
    videoScriptApproved: true
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
    missions: ['M1: Mapeie seus contatos perdidos'],
    artifacts: ['A1: Planilha Radar de Contatos', 'A10: Kit de Recuperação'],
    badges: ['S1: Detetive de Leads'],
    carouselTitle: 'Perdidos na Neblina',
    videoTitle: 'Anatomia do Sumiço — como montar seu Radar',
    videoScript: 'Roteiro do vídeo complementar do EP1...',
    videoScriptApproved: false,
    slides: [
      { number: 1, title: 'Perdidos R$ 818', subtitle: 'O custo real do ghosting', description: 'Capa impactante mostrando o valor perdido mensalmente', image: '/images/carousels/episodio-1/slide-1.jpg', approved: true },
      { number: 2, title: 'O que é Ghosting?', subtitle: 'Definindo o problema', description: 'Definição clara do problema que afeta professores', image: '/images/carousels/episodio-1/slide-2.jpg', approved: false },
      { number: 3, title: 'Conversa Real', subtitle: 'Exemplo prático', description: 'Screenshot de conversa real mostrando o ghosting', image: '/images/carousels/episodio-1/slide-3.jpg', approved: false },
      { number: 4, title: 'A Realidade', subtitle: 'Dados alarmantes', description: 'Estatísticas sobre abandono de alunos', image: '/images/carousels/episodio-1/slide-4.jpg', approved: true }
    ]
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
    missions: ['M5: Luz na Sala (Pitch 45s)'],
    artifacts: ['A5: Script Pitch 45s', 'A7: Preço 2 Etapas', 'A3: Aberturas'],
    badges: ['S5: Luz antes do Preço', 'S7: Preço Luminoso'],
    carouselTitle: 'Protocolo OEP',
    videoTitle: 'OEP ao vivo (com 1 contato da sua lista)',
    videoScript: 'Roteiro do vídeo complementar do EP2...',
    videoScriptApproved: true,
    slides: [
      { number: 1, title: 'Protocolo OEP', subtitle: 'Metodologia em 3 passos', description: 'Capa apresentando a metodologia em 3 passos' },
      { number: 2, title: 'O de Objetivo', subtitle: 'Primeiro passo', description: 'Como definir objetivos claros na conversa' },
      { number: 3, title: 'E de Encaixe', subtitle: 'Segundo passo', description: 'Técnicas para criar conexão com o lead' },
      { number: 4, title: 'P de Proposta', subtitle: 'Terceiro passo', description: 'Estrutura para apresentar sua oferta' }
    ]
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
    missions: ['M1: Analise 10 conversas perdidas'],
    artifacts: ['A1: Checklist de Diagnóstico', 'A18: Dashboard de Métricas'],
    badges: ['S1: Detetive de Leads', 'S17: Analista Expert'],
    carouselTitle: 'Autópsia de Chats',
    videoTitle: 'Audite 10 conversas em 15 minutos',
    videoScript: 'Roteiro do vídeo complementar do EP3...',
    slides: [
      { number: 1, title: 'Sala Interrogatório', subtitle: 'Ambiente forense', description: 'Ambiente para análise forense de conversas' },
      { number: 2, title: 'O que Observar', subtitle: 'Pontos-chave', description: 'Pontos-chave para identificar problemas' }
    ]
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
    progress: 0,
    videoScript: 'Roteiro do vídeo complementar do EP4...',
    slides: []
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
    progress: 0,
    videoScript: 'Roteiro do vídeo complementar do EP5...',
    slides: []
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
    progress: 0,
    videoScript: 'Roteiro do vídeo complementar do EP6...',
    slides: []
  },
  {
    id: 7,
    number: 7,
    title: 'Agradecimento Final',
    description: 'Vídeo de encerramento e próximos passos',
    duration: '5min',
    type: 'Encerramento',
    available: false,
    completed: false,
    progress: 0,
    videoScript: 'Roteiro do vídeo de agradecimento final...'
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

const playVideo = (episodeId) => {
  console.log('Playing video for episode:', episodeId)
  // Simulate watching - complete after 2 seconds
  setTimeout(() => {
    completeEpisode(episodeId)
  }, 2000)
}

const openCarousel = (episodeId) => {
  console.log('Opening carousel for episode:', episodeId)
}

const toggleCarouselView = () => {
  showAllSlides.value = !showAllSlides.value
}

const selectSlide = (index) => {
  showAllSlides.value = false
  // Navigate to specific slide in carousel
  console.log('Selected slide:', index)
}

const showCopy = (slide) => {
  selectedSlide.value = slide
  showCopyModal.value = true
  
  // Add keyboard listener
  document.addEventListener('keydown', handleKeydown)
}

const handleKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    prevSlide()
  } else if (event.key === 'ArrowRight') {
    nextSlide()
  }
}

const onModalClose = (isOpen) => {
  if (!isOpen) {
    document.removeEventListener('keydown', handleKeydown)
  }
}

const getPanelTitle = () => {
  const titles = {
    missions: '🎯 Missões do Episódio',
    artifacts: '📄 Artefatos Disponíveis', 
    badges: '🏆 Selos para Conquistar',
    passport: '📖 Progresso do Passaporte'
  }
  return titles[activePanel.value] || 'Painel'
}

const nextSlide = () => {
  const currentIndex = currentEpisode.value.slides.findIndex(s => s.number === selectedSlide.value.number)
  if (currentIndex < currentEpisode.value.slides.length - 1) {
    selectedSlide.value = currentEpisode.value.slides[currentIndex + 1]
  }
}

const prevSlide = () => {
  const currentIndex = currentEpisode.value.slides.findIndex(s => s.number === selectedSlide.value.number)
  if (currentIndex > 0) {
    selectedSlide.value = currentEpisode.value.slides[currentIndex - 1]
  }
}

const toggleRadar = () => {
  radarActive.value = !radarActive.value
  if (radarActive.value) {
    // Simulate radar detection
    setTimeout(() => {
      detectedLeads.value = Math.floor(Math.random() * 20) + 10
      lostValue.value = Math.floor(Math.random() * 500) + 600
      recoveryRate.value = Math.floor(Math.random() * 30) + 60
      ghostingLevel.value = Math.floor(Math.random() * 80) + 20
    }, 2000)
  }
}

const getTemperatureClass = () => {
  if (ghostingLevel.value <= 30) return 'low'
  if (ghostingLevel.value <= 60) return 'medium'
  if (ghostingLevel.value <= 80) return 'high'
  return 'critical'
}

const getGhostingIcon = () => {
  if (ghostingLevel.value <= 30) return '😊'
  if (ghostingLevel.value <= 60) return '😐'
  if (ghostingLevel.value <= 80) return '😟'
  return '😱'
}

const getGhostingStatus = () => {
  if (ghostingLevel.value <= 30) return 'BAIXO'
  if (ghostingLevel.value <= 60) return 'MÉDIO'
  if (ghostingLevel.value <= 80) return 'ALTO'
  return 'CRÍTICO'
}

const getGhostingTitle = () => {
  if (ghostingLevel.value <= 30) return 'Situação Controlada'
  if (ghostingLevel.value <= 60) return 'Atenção Necessária'
  if (ghostingLevel.value <= 80) return 'Situação Preocupante'
  return 'ALERTA MÁXIMO'
}

const getGhostingDescription = () => {
  if (ghostingLevel.value <= 30) return 'Seu nível de ghosting está dentro do esperado. Continue aplicando as técnicas aprendidas.'
  if (ghostingLevel.value <= 60) return 'Há sinais de ghosting que precisam ser tratados. Revise sua abordagem inicial.'
  if (ghostingLevel.value <= 80) return 'Nível alto de ghosting detectado. Ação imediata é necessária para reverter a situação.'
  return 'Nível crítico! Seus leads estão desaparecendo rapidamente. Implemente o protocolo de emergência.'
}

const getRecommendations = () => {
  if (ghostingLevel.value <= 30) return [
    'Mantenha o follow-up regular',
    'Continue personalizando as mensagens',
    'Monitore as métricas semanalmente'
  ]
  if (ghostingLevel.value <= 60) return [
    'Revise seus scripts de abertura',
    'Aumente a frequência de follow-up',
    'Teste novos horários de contato',
    'Analise o perfil dos leads perdidos'
  ]
  if (ghostingLevel.value <= 80) return [
    'Implemente o Protocolo OEP imediatamente',
    'Faça auditoria completa das conversas',
    'Reduza o tempo entre contatos',
    'Crie senso de urgência nas mensagens',
    'Ofereça valor antes de vender'
  ]
  return [
    'PROTOCOLO DE EMERGÊNCIA ATIVO',
    'Pare todas as vendas e foque na recuperação',
    'Contate todos os leads perdidos em 24h',
    'Implemente desconto de recuperação',
    'Agende reunião de emergência com mentor'
  ]
}

const getUrgencyLevel = () => {
  return Math.min(ghostingLevel.value + 20, 100)
}

const getUrgencyText = () => {
  if (ghostingLevel.value <= 30) return 'Baixa'
  if (ghostingLevel.value <= 60) return 'Média'
  if (ghostingLevel.value <= 80) return 'Alta'
  return 'MÁXIMA'
}

// Copy Editor Functions
const selectedEpisode = computed(() => {
  return episodes.value.find(e => e.id === selectedEpisodeId.value) || null
})

const selectedEpisodeSlides = computed(() => {
  return selectedEpisode.value?.slides || []
})

const currentSlideForEdit = computed(() => {
  return selectedEpisodeSlides.value[currentSlideIndex.value] || null
})

const formattedJson = computed(() => {
  const episodesData = episodes.value.map(episode => {
    const data = {
      id: episode.id,
      number: episode.number,
      title: episode.title
    }
    
    if (episode.videoScript) {
      data.videoScript = episode.videoScript
    }
    
    if (episode.slides && episode.slides.length > 0) {
      data.slides = episode.slides.map(slide => ({
        number: slide.number,
        title: slide.title,
        subtitle: slide.subtitle,
        description: slide.description,
        approved: slide.approved || false
      }))
    }
    
    if (episode.videoScript) {
      data.videoScriptApproved = episode.videoScriptApproved || false
    }
    
    return data
  })
  return JSON.stringify(episodesData, null, 2)
})

const selectEpisodeForEdit = (episodeId) => {
  selectedEpisodeId.value = episodeId
  currentSlideIndex.value = 0
  editingSlide.value = null
  const episode = episodes.value.find(e => e.id === episodeId)
  if (episode?.slides && episode.slides.length > 0) {
    activeTab.value = 'carousel'
  } else {
    activeTab.value = 'video'
  }
}

const prevSlideEdit = () => {
  if (currentSlideIndex.value > 0) {
    currentSlideIndex.value--
    document.querySelector(`.slide-card:nth-child(${currentSlideIndex.value + 1})`).focus()
  }
}

const nextSlideEdit = () => {
  if (currentSlideIndex.value < selectedEpisodeSlides.value.length - 1) {
    currentSlideIndex.value++
    document.querySelector(`.slide-card:nth-child(${currentSlideIndex.value + 1})`).focus()
  }
}

const exportJson = () => {
  const dataStr = formattedJson.value
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'episodes-copies.json'
  link.click()
  URL.revokeObjectURL(url)
}

const importJson = () => {
  try {
    const data = JSON.parse(jsonInput.value)
    if (Array.isArray(data)) {
      data.forEach(episodeData => {
        const episode = episodes.value.find(e => e.id === episodeData.id)
        if (episode) {
          if (episodeData.videoScript) {
            episode.videoScript = episodeData.videoScript
            episode.videoScriptApproved = episodeData.videoScriptApproved || false
          }
          if (episodeData.slides) {
            episode.slides = episodeData.slides.map((slideData, index) => ({
              number: index + 1,
              title: slideData.title || '',
              subtitle: slideData.subtitle || '',
              description: slideData.description || '',
              approved: slideData.approved || false
            }))
          }
        }
      })
      showJsonImport.value = false
      jsonInput.value = ''
    }
  } catch (error) {
    alert('JSON inválido')
  }
}

const addSlide = () => {
  if (selectedEpisode.value && selectedEpisode.value.slides) {
    const newSlideNumber = selectedEpisode.value.slides.length + 1
    selectedEpisode.value.slides.push({
      number: newSlideNumber,
      title: '',
      subtitle: '',
      description: '',
      approved: false
    })
    currentSlideIndex.value = selectedEpisode.value.slides.length - 1
  }
}

const removeSlide = (index) => {
  if (selectedEpisode.value && selectedEpisode.value.slides && selectedEpisode.value.slides.length > 1) {
    selectedEpisode.value.slides.splice(index, 1)
    // Renumber slides
    selectedEpisode.value.slides.forEach((slide, i) => {
      slide.number = i + 1
    })
    if (currentSlideIndex.value >= selectedEpisode.value.slides.length) {
      currentSlideIndex.value = selectedEpisode.value.slides.length - 1
    }
  }
}

const copyJsonToClipboard = () => {
  navigator.clipboard.writeText(formattedJson.value)
}

const closeCopyEditor = () => {
  showCopyEditor.value = false
  document.removeEventListener('keydown', handleEditorKeydown)
}

const handleEditorKeydown = (event) => {
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return
  
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    prevSlideEdit()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    nextSlideEdit()
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    const currentIndex = episodes.value.findIndex(e => e.id === selectedEpisodeId.value)
    if (currentIndex > 0) {
      selectEpisodeForEdit(episodes.value[currentIndex - 1].id)
    }
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    const currentIndex = episodes.value.findIndex(e => e.id === selectedEpisodeId.value)
    if (currentIndex < episodes.value.length - 1) {
      selectEpisodeForEdit(episodes.value[currentIndex + 1].id)
    }
  }
}

const handleSlideKeydown = (event, index) => {
  if (event.key === 'ArrowUp' && index > 0) {
    event.preventDefault()
    selectSlide(index - 1)
    setTimeout(() => {
      document.querySelector(`.slide-card-compact:nth-child(${index})`).focus()
    }, 10)
  } else if (event.key === 'ArrowDown' && index < selectedEpisodeSlides.value.length - 1) {
    event.preventDefault()
    selectSlide(index + 1)
    setTimeout(() => {
      document.querySelector(`.slide-card-compact:nth-child(${index + 2})`).focus()
    }, 10)
  } else if (event.key === 'Enter') {
    event.preventDefault()
    startEdit(index)
  }
}

const selectSlide = (index) => {
  currentSlideIndex.value = index
  editingSlide.value = null
}

const startEdit = (index) => {
  editingSlide.value = index
  currentSlideIndex.value = index
}

const saveEdit = () => {
  editingSlide.value = null
}

const cancelEdit = () => {
  editingSlide.value = null
}

const handleEpisodeKeydown = (event, index) => {
  if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault()
    selectEpisodeForEdit(episodes.value[index - 1].id)
    document.querySelector(`.episode-chip:nth-child(${index})`).focus()
  } else if (event.key === 'ArrowRight' && index < episodes.value.length - 1) {
    event.preventDefault()
    selectEpisodeForEdit(episodes.value[index + 1].id)
    document.querySelector(`.episode-chip:nth-child(${index + 2})`).focus()
  }
}

const getStatusText = (episode) => {
  if (episode.completed) return 'Assistido'
  if (episode.available) return 'Disponível'
  return 'Bloqueado'
}

const scrollCarousel = (direction) => {
  const container = carouselContainer.value
  if (!container) return
  
  const scrollAmount = 300
  if (direction === 'next') {
    container.scrollLeft += scrollAmount
    scrollPosition.value = Math.min(scrollPosition.value + scrollAmount, maxScroll.value)
  } else {
    container.scrollLeft -= scrollAmount
    scrollPosition.value = Math.max(scrollPosition.value - scrollAmount, 0)
  }
}

const openCopyEditor = () => {
  showCopyEditor.value = true
  selectedEpisodeId.value = 0
  currentSlideIndex.value = 0
  document.addEventListener('keydown', handleEditorKeydown)
}

onMounted(() => {
  const container = carouselContainer.value
  if (container) {
    maxScroll.value = container.scrollWidth - container.clientWidth
  }
})
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
  margin-bottom: 40px;
}

.simple-carousel {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 16px 0;
}

.episodes-carousel {
  position: relative;
}

.carousel-container {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding-bottom: 8px;
}

.carousel-container::-webkit-scrollbar {
  display: none;
}

.episode-card {
  flex: 0 0 280px;
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
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.episode-rewards {
  display: flex;
  gap: 6px;
}

.reward-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.reward-chip.mission {
  background: rgba(255, 152, 0, 0.2);
  color: #ff9800;
}

.reward-chip.artifact {
  background: rgba(33, 150, 243, 0.2);
  color: #2196f3;
}

.reward-chip.badge {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

/* Futuristic Episodes Carousel */
.episodes-futuristic-carousel {
  margin-bottom: 40px;
}

.futuristic-episode-card {
  position: relative;
  background: #2f2f2f;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  opacity: 0.7;
  height: 100%;
  border: 1px solid rgba(138, 43, 226, 0.2);
}

.futuristic-episode-card.active {
  opacity: 1;
  border-color: rgba(138, 43, 226, 0.8);
  box-shadow: 0 0 30px rgba(138, 43, 226, 0.4);
}

.futuristic-episode-card.completed {
  border-color: #46d369;
  box-shadow: 0 0 20px rgba(70, 211, 105, 0.3);
}

.futuristic-episode-card.locked {
  opacity: 0.3;
  cursor: not-allowed;
}

.episode-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, transparent 30%, rgba(138, 43, 226, 0.4) 50%, transparent 70%);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.futuristic-episode-card.active .episode-glow {
  opacity: 1;
  animation: episode-glow 3s ease-in-out infinite alternate;
}

@keyframes episode-glow {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
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
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
  margin-bottom: 24px;
}

.slides-section {
  width: 100%;
}

.slideshow-section {
  width: 100%;
}

.slideshow-container {
  max-width: 100%;
  overflow: hidden;
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

/* Episode Carousel Styles */
.episode-carousel {
  margin-bottom: 16px;
}

.carousel-slide-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
  transition: all 0.3s ease;
}

.slide-preview {
  position: relative;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slide-number {
  background: rgba(138, 43, 226, 0.2);
  color: #8a2be2;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
  border: 1px solid rgba(138, 43, 226, 0.4);
}

.carousel-slide-content.active .slide-number {
  background: rgba(138, 43, 226, 0.4);
  border-color: #8a2be2;
  box-shadow: 0 0 12px rgba(138, 43, 226, 0.6);
}

.slide-icon {
  font-size: 32px;
  filter: drop-shadow(0 0 8px rgba(138, 43, 226, 0.4));
  transition: all 0.3s ease;
}

.carousel-slide-content.active .slide-icon {
  font-size: 36px;
  filter: drop-shadow(0 0 15px rgba(138, 43, 226, 0.8));
  animation: icon-bounce 2s ease-in-out infinite alternate;
}

@keyframes icon-bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-4px); }
}

.slide-info {
  flex: 1;
}

.slide-info .slide-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.carousel-slide-content.active .slide-info .slide-title {
  color: #8a2be2;
}

.slide-desc {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.3;
  margin: 0;
}

.carousel-slide-content.active .slide-desc {
  color: rgba(255, 255, 255, 0.8);
}

/* Slides Grid View */
.slides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
  margin-bottom: 16px;
}

.slide-card {
  position: relative;
  background: rgba(138, 43, 226, 0.1);
  border: 1px solid rgba(138, 43, 226, 0.3);
  border-radius: 16px;
  padding: 24px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slide-card:hover {
  background: rgba(138, 43, 226, 0.2);
  border-color: rgba(138, 43, 226, 0.6);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(138, 43, 226, 0.3);
}

.slide-card-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, transparent 30%, rgba(138, 43, 226, 0.4) 50%, transparent 70%);
  border-radius: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.slide-card:hover .slide-card-glow {
  opacity: 1;
  animation: card-glow 2s ease-in-out infinite alternate;
}

@keyframes card-glow {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
}

.slide-card-number {
  background: rgba(138, 43, 226, 0.3);
  color: #8a2be2;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  margin: 0 auto 12px;
  border: 2px solid rgba(138, 43, 226, 0.5);
}

.slide-card:hover .slide-card-number {
  background: rgba(138, 43, 226, 0.5);
  border-color: #8a2be2;
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.6);
}

.slide-card-icon {
  font-size: 80px;
  margin: 0 auto 20px;
  filter: drop-shadow(0 0 15px rgba(138, 43, 226, 0.4));
  display: block;
  text-align: center;
}

.slide-card:hover .slide-card-icon {
  filter: drop-shadow(0 0 20px rgba(138, 43, 226, 0.8));
  animation: icon-float 2s ease-in-out infinite alternate;
}

@keyframes icon-float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-6px); }
}

.slide-card-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
  line-height: 1.2;
}

.slide-card:hover .slide-card-title {
  color: #8a2be2;
}

.slide-card-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.3;
}

.slide-card:hover .slide-card-desc {
  color: rgba(255, 255, 255, 0.8);
}

.view-mode-btn {
  border-color: rgba(138, 43, 226, 0.5) !important;
  color: #8a2be2 !important;
  text-transform: none !important;
  font-size: 12px !important;
}

.view-mode-btn:hover {
  background: rgba(138, 43, 226, 0.1) !important;
  border-color: #8a2be2 !important;
}

/* Slideshow Header */
.slideshow-header {
  margin-bottom: 16px;
}

.back-btn {
  color: rgba(255, 255, 255, 0.7) !important;
  text-transform: none !important;
  font-size: 12px !important;
}

.back-btn:hover {
  color: #8a2be2 !important;
  background: rgba(138, 43, 226, 0.1) !important;
}

/* Slide Images */
.slide-image {
  width: 200px;
  height: 250px;
  border-radius: 16px;
  overflow: hidden;
  margin: 0 auto 20px;
  border: 4px solid rgba(138, 43, 226, 0.5);
  box-shadow: 0 12px 40px rgba(138, 43, 226, 0.3);
}

.slide-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-card:hover .slide-image {
  border-color: rgba(138, 43, 226, 1);
  box-shadow: 0 16px 50px rgba(138, 43, 226, 0.5);
  transform: scale(1.03);
}

.slide-image-carousel {
  width: 240px;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
  border: 4px solid rgba(138, 43, 226, 0.5);
  box-shadow: 0 12px 35px rgba(138, 43, 226, 0.3);
}

.slide-image-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Copy Buttons */
.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7) !important;
  color: rgba(255, 255, 255, 0.8) !important;
  min-width: 24px !important;
  width: 24px !important;
  height: 24px !important;
}

.copy-btn:hover {
  background: rgba(138, 43, 226, 0.8) !important;
  color: white !important;
}

.copy-btn-carousel {
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.7) !important;
  color: rgba(255, 255, 255, 0.8) !important;
  min-width: 20px !important;
  width: 20px !important;
  height: 20px !important;
}

.copy-btn-carousel:hover {
  background: rgba(138, 43, 226, 0.8) !important;
  color: white !important;
}

/* Details Button */
.details-btn {
  border-color: rgba(138, 43, 226, 0.5) !important;
  color: #8a2be2 !important;
  text-transform: none !important;
  font-size: 11px !important;
  margin-top: 8px !important;
}

.details-btn:hover {
  background: rgba(138, 43, 226, 0.1) !important;
  border-color: #8a2be2 !important;
}

/* Copy Modal */
.copy-modal {
  background: #1a1a2e;
  color: white;
  border-radius: 12px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  margin: 0;
  color: #8a2be2;
  font-size: 18px;
}

.modal-content {
  padding: 24px;
}

.slide-preview-modal {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.slide-image-modal {
  display: inline-block;
  width: 280px;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(138, 43, 226, 0.5);
}

.slide-image-modal img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-details {
  text-align: center;
  margin-bottom: 24px;
}

.slide-title-modal {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
}

.slide-subtitle-modal {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.4;
}

.copy-content h4 {
  color: #8a2be2;
  margin: 0 0 12px 0;
  font-size: 14px;
}

.copy-content p {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin: 0;
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid #8a2be2;
}

/* Modal Navigation */
.nav-btn-left,
.nav-btn-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7) !important;
  color: white !important;
  z-index: 10;
  width: 48px !important;
  height: 48px !important;
  min-width: 48px !important;
}

.nav-btn-left {
  left: 10px;
}

.nav-btn-right {
  right: 10px;
}

.nav-btn-left .v-icon,
.nav-btn-right .v-icon {
  font-size: 24px !important;
}

.nav-btn-left:hover:not(:disabled),
.nav-btn-right:hover:not(:disabled) {
  background: rgba(138, 43, 226, 0.8) !important;
}

.nav-btn-left:disabled,
.nav-btn-right:disabled {
  opacity: 0.3 !important;
}

.slide-counter-header {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  font-size: 14px;
}

.view-carousel-btn {
  border-color: rgba(138, 43, 226, 0.5) !important;
  color: #8a2be2 !important;
  text-transform: none !important;
  font-size: 12px !important;
}

/* Vimeo Video Container */
.vimeo-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.vimeo-wrapper {
  position: relative;
  padding-bottom: 177.78%; /* 9:16 aspect ratio */
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

/* MASP Advanced Panel */
.masp-advanced-panel {
  margin-top: 40px;
  padding: 0;
  background: transparent;
}

.panel-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  min-height: 500px;
}

/* Left Menu */
.panel-menu {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.menu-header h3 {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 24px 0;
  text-align: center;
  letter-spacing: 1px;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.menu-btn {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 12px !important;
  padding: 16px !important;
  height: auto !important;
  min-height: 80px !important;
  text-transform: none !important;
  transition: all 0.3s ease !important;
}

.menu-btn:hover {
  background: rgba(138, 43, 226, 0.1) !important;
  border-color: rgba(138, 43, 226, 0.3) !important;
  transform: translateX(4px);
}

.menu-btn.active {
  background: rgba(138, 43, 226, 0.2) !important;
  border-color: rgba(138, 43, 226, 0.6) !important;
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.3) !important;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.btn-icon {
  font-size: 32px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.btn-text {
  text-align: left;
  flex: 1;
}

.btn-title {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 4px;
}

.btn-count {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

.passport-btn {
  border-color: rgba(255, 215, 0, 0.3) !important;
}

.passport-btn:hover {
  background: rgba(255, 215, 0, 0.1) !important;
  border-color: rgba(255, 215, 0, 0.5) !important;
}

.passport-btn.active {
  background: rgba(255, 215, 0, 0.2) !important;
  border-color: rgba(255, 215, 0, 0.8) !important;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.3) !important;
}

/* Right Content */
.panel-content {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.05), rgba(75, 0, 130, 0.05));
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.content-panel {
  height: 100%;
}

.panel-header {
  text-align: center;
  margin-bottom: 32px;
}

.panel-header h2 {
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.panel-header p {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 14px;
}

/* Missions Grid */
.missions-grid {
  display: grid;
  gap: 20px;
}

.mission-card {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

.mission-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

.mission-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 152, 0, 0.3) 50%, transparent 70%);
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.mission-card:hover .mission-glow {
  opacity: 1;
}

.mission-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.mission-number {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.mission-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #ff9800;
}

.mission-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px 0;
}

.mission-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.mission-requirements {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.requirement {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.mission-actions {
  text-align: center;
}

.start-mission-btn {
  border-color: rgba(255, 152, 0, 0.5) !important;
  color: #ff9800 !important;
  text-transform: none !important;
  font-weight: 600 !important;
}

.start-mission-btn:hover {
  background: rgba(255, 152, 0, 0.1) !important;
  border-color: #ff9800 !important;
}

.mission-flow {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(75, 0, 130, 0.1));
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
}

.flow-header {
  text-align: center;
  margin-bottom: 32px;
}

.flow-title {
  font-size: 24px;
  font-weight: 800;
  color: #fff;
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.flow-subtitle {
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-size: 14px;
}

.flow-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.flow-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
}

.step-icon {
  font-size: 32px;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
}

.step-content h3 {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px 0;
}

.step-content p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.step-arrow {
  position: absolute;
  right: -24px;
  top: 20px;
  font-size: 20px;
  color: #8a2be2;
  font-weight: bold;
}

.flow-step:last-child .step-arrow {
  display: none;
}

.unlock-artifact-btn {
  border-color: rgba(33, 150, 243, 0.5) !important;
  color: #2196f3 !important;
  text-transform: none !important;
  font-size: 11px !important;
}

.mission-status {
  font-size: 10px;
  color: rgba(255, 152, 0, 0.8);
  font-style: italic;
}

.badge-reward {
  font-size: 10px;
  color: rgba(76, 175, 80, 0.8);
  font-weight: 600;
}

/* Passport Progress */
.passport-progress {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.passport-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.passport-icon {
  font-size: 40px;
  filter: drop-shadow(0 0 15px rgba(138, 43, 226, 0.6));
}

.passport-info h3 {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 4px 0;
}

.passport-info p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.progress-track {
  margin-bottom: 20px;
}

.progress-bar-passport {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill-passport {
  height: 100%;
  background: linear-gradient(90deg, #8a2be2, #4b0082);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}

.final-prize {
  text-align: center;
}

.prize-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.2), rgba(75, 0, 130, 0.1));
  border-radius: 12px;
  border: 1px solid rgba(138, 43, 226, 0.3);
}

.prize-icon {
  font-size: 32px;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));
}

.prize-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  text-align: left;
  line-height: 1.4;
}

.prize-text strong {
  color: #ffd700;
}

/* Passport Block */
.passport-block {
  margin-top: 40px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 193, 7, 0.05));
  border-radius: 20px;
  padding: 0;
  border: 2px solid rgba(255, 215, 0, 0.3);
  overflow: hidden;
}

.passport-hero {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 193, 7, 0.1));
  padding: 32px;
  text-align: center;
}

.passport-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.4) 50%, transparent 70%);
  opacity: 0.6;
  animation: passport-pulse 3s ease-in-out infinite alternate;
  z-index: -1;
}

@keyframes passport-pulse {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
}

.passport-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.passport-icon {
  font-size: 60px;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
}

.passport-title {
  font-size: 24px;
  font-weight: 900;
  color: #ffd700;
  margin: 0 0 8px 0;
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.6);
}

.passport-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.passport-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
  padding: 32px;
}

.seals-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.seal-slot {
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.seal-slot.collected {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 193, 7, 0.2));
  border-color: rgba(255, 215, 0, 0.6);
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
}

.seal-number {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 4px;
}

.seal-icon {
  font-size: 20px;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8));
}

.seal-empty {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.3);
}

.progress-bar-passport {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill-passport {
  height: 100%;
  background: linear-gradient(90deg, #ffd700, #ffb300);
  transition: width 0.3s ease;
}

.progress-stats {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.current-seals {
  color: #ffd700;
  font-weight: 600;
}

.remaining-seals {
  color: rgba(255, 255, 255, 0.6);
}

.prize-card {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  text-align: center;
  overflow: hidden;
}

.prize-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.3) 50%, transparent 70%);
  border-radius: 16px;
  opacity: 0.8;
  animation: prize-glow 2s ease-in-out infinite alternate;
  z-index: -1;
}

@keyframes prize-glow {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

.prize-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.prize-icon {
  font-size: 32px;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));
}

.prize-value {
  font-size: 28px;
  font-weight: 900;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
}

.prize-details h3 {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px 0;
}

.prize-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
}

.prize-list li {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 6px;
  padding-left: 16px;
  position: relative;
}

.prize-list li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #ffd700;
  font-weight: bold;
}

.unlock-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 152, 0, 0.8);
  font-weight: 600;
}

/* Radar Section */
.radar-section {
  margin-top: 40px;
  background: linear-gradient(135deg, rgba(0, 255, 127, 0.1), rgba(0, 128, 0, 0.05));
  border-radius: 20px;
  padding: 32px;
  border: 2px solid rgba(0, 255, 127, 0.3);
}

.radar-header {
  text-align: center;
  margin-bottom: 32px;
}

.radar-title {
  font-size: 24px;
  font-weight: 900;
  color: #00ff7f;
  margin: 0 0 8px 0;
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(0, 255, 127, 0.6);
}

.radar-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.radar-container {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 40px;
  margin-bottom: 32px;
}

.radar-screen {
  position: relative;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 255, 127, 0.1) 0%, rgba(0, 0, 0, 0.8) 70%);
  border-radius: 50%;
  border: 3px solid rgba(0, 255, 127, 0.5);
  overflow: hidden;
}

.radar-grid {
  position: absolute;
  inset: 0;
}

.radar-line {
  position: absolute;
  background: rgba(0, 255, 127, 0.3);
}

.radar-line.horizontal {
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  transform: translateY(-50%);
}

.radar-line.vertical {
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  transform: translateX(-50%);
}

.radar-circle {
  position: absolute;
  border: 1px solid rgba(0, 255, 127, 0.2);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.circle-1 {
  width: 120px;
  height: 120px;
}

.circle-2 {
  width: 240px;
  height: 240px;
}

.circle-3 {
  width: 360px;
  height: 360px;
}

.radar-sweep {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(0, 255, 127, 0.8) 50%, transparent 100%);
  transform-origin: 0 50%;
  animation: radar-sweep 3s linear infinite;
}

@keyframes radar-sweep {
  0% { transform: translate(0, -50%) rotate(0deg); }
  100% { transform: translate(0, -50%) rotate(360deg); }
}

.radar-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ff4444;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.radar-dot.active {
  opacity: 1;
  animation: dot-pulse 2s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.5); }
}

.dot-1 {
  top: 30%;
  left: 60%;
}

.dot-2 {
  top: 70%;
  left: 25%;
}

.dot-3 {
  top: 45%;
  left: 80%;
}

.dot-pulse {
  position: absolute;
  inset: -10px;
  border: 2px solid #ff4444;
  border-radius: 50%;
  animation: pulse-ring 2s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.5);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.dot-label {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: #ff4444;
  font-weight: 600;
  white-space: nowrap;
  background: rgba(0, 0, 0, 0.8);
  padding: 2px 6px;
  border-radius: 4px;
}

.radar-stats {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 24px;
  align-content: center;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: rgba(0, 255, 127, 0.1);
  border-radius: 12px;
  border: 1px solid rgba(0, 255, 127, 0.3);
}

.stat-number {
  font-size: 32px;
  font-weight: 900;
  color: #00ff7f;
  margin-bottom: 8px;
  text-shadow: 0 0 10px rgba(0, 255, 127, 0.6);
}

.stat-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

.radar-controls {
  text-align: center;
}

.radar-btn {
  background: linear-gradient(135deg, #00ff7f, #00cc66) !important;
  color: black !important;
  border-radius: 12px !important;
  padding: 16px 32px !important;
  font-weight: 800 !important;
  font-size: 16px !important;
  text-transform: none !important;
  letter-spacing: 1px !important;
  box-shadow: 0 8px 25px rgba(0, 255, 127, 0.4) !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
}

.radar-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 35px rgba(0, 255, 127, 0.6) !important;
}

.radar-btn.active {
  background: linear-gradient(135deg, #ff4444, #cc0000) !important;
  color: white !important;
  box-shadow: 0 8px 25px rgba(255, 68, 68, 0.4) !important;
}

/* Termômetro de Ghosting */
.thermometer-section {
  margin-top: 32px;
  background: linear-gradient(135deg, rgba(255, 69, 0, 0.1), rgba(255, 140, 0, 0.05));
  border-radius: 20px;
  padding: 32px;
  border: 2px solid rgba(255, 69, 0, 0.3);
  animation: thermometer-appear 0.5s ease-out;
}

@keyframes thermometer-appear {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.thermometer-header {
  text-align: center;
  margin-bottom: 32px;
}

.thermometer-title {
  font-size: 24px;
  font-weight: 900;
  color: #ff4500;
  margin: 0 0 8px 0;
  letter-spacing: 2px;
  text-shadow: 0 0 15px rgba(255, 69, 0, 0.6);
}

.thermometer-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.thermometer-container {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  align-items: start;
}

.thermometer-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.thermometer-tube {
  position: relative;
  width: 40px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px 20px 0 0;
  border: 3px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  margin-bottom: 10px;
}

.temperature-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transition: height 1s ease-out;
  border-radius: 0 0 20px 20px;
}

.temperature-fill.low {
  background: linear-gradient(0deg, #00ff00, #7fff00);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
}

.temperature-fill.medium {
  background: linear-gradient(0deg, #ffff00, #ffa500);
  box-shadow: 0 0 20px rgba(255, 255, 0, 0.5);
}

.temperature-fill.high {
  background: linear-gradient(0deg, #ff8c00, #ff4500);
  box-shadow: 0 0 20px rgba(255, 140, 0, 0.5);
}

.temperature-fill.critical {
  background: linear-gradient(0deg, #ff0000, #dc143c);
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
  animation: critical-pulse 1s ease-in-out infinite alternate;
}

@keyframes critical-pulse {
  0% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.8); }
  100% { box-shadow: 0 0 40px rgba(255, 0, 0, 1); }
}

.temperature-marks {
  position: absolute;
  right: -30px;
  top: 0;
  bottom: 0;
}

.temp-mark {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mark-line {
  width: 15px;
  height: 1px;
  background: rgba(255, 255, 255, 0.5);
}

.mark-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.thermometer-bulb {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.thermometer-bulb.low {
  background: radial-gradient(circle, #00ff00, #7fff00);
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
}

.thermometer-bulb.medium {
  background: radial-gradient(circle, #ffff00, #ffa500);
  box-shadow: 0 0 20px rgba(255, 255, 0, 0.5);
}

.thermometer-bulb.high {
  background: radial-gradient(circle, #ff8c00, #ff4500);
  box-shadow: 0 0 20px rgba(255, 140, 0, 0.5);
}

.thermometer-bulb.critical {
  background: radial-gradient(circle, #ff0000, #dc143c);
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
  animation: critical-pulse 1s ease-in-out infinite alternate;
}

.ghosting-analysis {
  display: flex;
  flex-direction: column;
}

.analysis-card {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  padding: 24px;
  border: 2px solid;
}

.analysis-card.low {
  border-color: rgba(0, 255, 0, 0.5);
  background: rgba(0, 255, 0, 0.05);
}

.analysis-card.medium {
  border-color: rgba(255, 255, 0, 0.5);
  background: rgba(255, 255, 0, 0.05);
}

.analysis-card.high {
  border-color: rgba(255, 140, 0, 0.5);
  background: rgba(255, 140, 0, 0.05);
}

.analysis-card.critical {
  border-color: rgba(255, 0, 0, 0.8);
  background: rgba(255, 0, 0, 0.1);
  animation: critical-border 2s ease-in-out infinite alternate;
}

@keyframes critical-border {
  0% { border-color: rgba(255, 0, 0, 0.8); }
  100% { border-color: rgba(255, 0, 0, 1); }
}

.analysis-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.analysis-icon {
  font-size: 40px;
}

.analysis-level {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: 2px;
}

.analysis-card.low .analysis-level {
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.6);
}

.analysis-card.medium .analysis-level {
  color: #ffff00;
  text-shadow: 0 0 10px rgba(255, 255, 0, 0.6);
}

.analysis-card.high .analysis-level {
  color: #ff8c00;
  text-shadow: 0 0 10px rgba(255, 140, 0, 0.6);
}

.analysis-card.critical .analysis-level {
  color: #ff0000;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
  animation: critical-text 1s ease-in-out infinite alternate;
}

@keyframes critical-text {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

.analysis-content h3 {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px 0;
}

.analysis-content p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 20px 0;
  line-height: 1.5;
}

.recommendations h4 {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px 0;
}

.recommendations ul {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.recommendations li {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  padding-left: 16px;
  position: relative;
}

.recommendations li:before {
  content: '▶';
  position: absolute;
  left: 0;
  color: #8a2be2;
}

.urgency-level {
  margin-top: 16px;
}

.urgency-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.urgency-fill {
  height: 100%;
  transition: width 1s ease-out;
}

.urgency-fill.low {
  background: linear-gradient(90deg, #00ff00, #7fff00);
}

.urgency-fill.medium {
  background: linear-gradient(90deg, #ffff00, #ffa500);
}

.urgency-fill.high {
  background: linear-gradient(90deg, #ff8c00, #ff4500);
}

.urgency-fill.critical {
  background: linear-gradient(90deg, #ff0000, #dc143c);
  animation: critical-urgency 1s ease-in-out infinite alternate;
}

@keyframes critical-urgency {
  0% { opacity: 0.8; }
  100% { opacity: 1; }
}

.urgency-text {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.hero-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, transparent 30%, rgba(138, 43, 226, 0.4) 50%, transparent 70%);
  border-radius: 20px;
  opacity: 0.6;
  animation: hero-pulse 3s ease-in-out infinite alternate;
  z-index: -1;
}

@keyframes hero-pulse {
  0% { opacity: 0.3; }
  100% { opacity: 0.8; }
}

.resources-hero-title {
  font-size: 28px;
  font-weight: 900;
  margin: 0 0 12px 0;
  color: #fff;
  text-shadow: 0 0 20px rgba(138, 43, 226, 0.8);
  letter-spacing: 2px;
}

.resources-hero-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
}

.resources-showcase {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.resource-card {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.resource-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-glow {
  position: absolute;
  inset: -2px;
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.resource-card:hover .card-glow {
  opacity: 1;
  animation: card-glow-pulse 2s ease-in-out infinite alternate;
}

@keyframes card-glow-pulse {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

.missions-glow {
  background: linear-gradient(45deg, transparent 30%, rgba(255, 152, 0, 0.4) 50%, transparent 70%);
}

.artifacts-glow {
  background: linear-gradient(45deg, transparent 30%, rgba(33, 150, 243, 0.4) 50%, transparent 70%);
}

.badges-glow {
  background: linear-gradient(45deg, transparent 30%, rgba(76, 175, 80, 0.4) 50%, transparent 70%);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.card-icon {
  font-size: 48px;
  filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.5));
}

.card-badge {
  background: linear-gradient(135deg, #8a2be2, #4b0082);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 4px 15px rgba(138, 43, 226, 0.4);
}

.card-title {
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 8px 0;
  color: #fff;
  letter-spacing: 1px;
}

.missions .card-title { color: #ff9800; }
.artifacts .card-title { color: #2196f3; }
.badges .card-title { color: #4caf50; }

.card-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 20px 0;
  font-style: italic;
}

.resource-preview {
  text-align: left;
}

.preview-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
}

.item-bullet {
  color: #8a2be2;
  font-size: 8px;
}

.item-text {
  line-height: 1.3;
}

.more-items {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  text-align: center;
  margin-top: 8px;
}

.unlock-cta {
  position: relative;
  text-align: center;
  padding: 24px;
}

.cta-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: cta-pulse 2s ease-in-out infinite alternate;
  z-index: -1;
}

@keyframes cta-pulse {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.2); opacity: 0.8; }
}

.unlock-btn {
  background: linear-gradient(135deg, #8a2be2, #4b0082) !important;
  color: white !important;
  border-radius: 12px !important;
  padding: 16px 32px !important;
  font-weight: 800 !important;
  font-size: 16px !important;
  text-transform: none !important;
  letter-spacing: 1px !important;
  box-shadow: 0 8px 25px rgba(138, 43, 226, 0.4) !important;
  transition: all 0.3s ease !important;
}

.unlock-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 12px 35px rgba(138, 43, 226, 0.6) !important;
}

/* Copy Editor Modal */
.copy-editor-modal {
  background: #1a1a2e;
  color: white;
  border-radius: 12px;
  overflow: hidden;
  height: 90vh;
  display: flex;
  flex-direction: column;
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

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.editor-layout-new {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  gap: 16px;
  padding: 16px;
}

.episodes-bar {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
}

.episodes-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.episodes-header h3 {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.navigation-hint {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.episodes-horizontal {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.episodes-horizontal::-webkit-scrollbar {
  height: 4px;
}

.episodes-horizontal::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.episodes-horizontal::-webkit-scrollbar-thumb {
  background: rgba(138, 43, 226, 0.5);
  border-radius: 2px;
}

.episode-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
  outline: none;
}

.episode-chip:hover {
  background: rgba(138, 43, 226, 0.1);
  border-color: rgba(138, 43, 226, 0.4);
  transform: translateY(-2px);
}

.episode-chip.active {
  background: rgba(138, 43, 226, 0.15);
  border-color: rgba(138, 43, 226, 0.6);
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.3);
}

.episode-chip:focus {
  border-color: rgba(138, 43, 226, 0.8);
  box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.2);
}

.chip-number {
  background: linear-gradient(135deg, #8a2be2, #4b0082);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(138, 43, 226, 0.4);
  flex-shrink: 0;
}

.chip-content {
  flex: 1;
  min-width: 0;
}

.chip-title {
  font-size: 11px;
  font-weight: 700;
  color: #8a2be2;
  margin-bottom: 2px;
}

.chip-subtitle {
  font-size: 12px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chip-badges {
  display: flex;
  align-items: center;
  gap: 4px;
}

.slides-count {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.7);
}

.json-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.json-header h3 {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}

.json-panel-right {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  max-height: 250px;
  display: flex;
  flex-direction: column;
}

.json-output-right {
  flex: 1;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 12px;
}

.json-output-right::-webkit-scrollbar {
  width: 6px;
}

.json-output-right::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.json-output-right::-webkit-scrollbar-thumb {
  background: rgba(138, 43, 226, 0.5);
  border-radius: 3px;
}

.json-output-right pre {
  margin: 0;
  font-size: 10px;
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.8);
  white-space: pre-wrap;
}

.video-panel {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}



.content-textarea-full {
  flex: 1;
  background: rgba(255, 255, 255, 0.02) !important;
}

.slide-number {
  background: linear-gradient(135deg, #8a2be2, #4b0082);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(138, 43, 226, 0.4);
}

.slide-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.slide-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.delete-btn {
  opacity: 0.6;
}

.delete-btn:hover {
  opacity: 1;
  color: #ff5252 !important;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-info {
  display: flex;
  align-items: center;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.approval-checkbox {
  transform: scale(0.9);
}

.add-slide-btn {
  border-color: rgba(138, 43, 226, 0.5) !important;
  color: #8a2be2 !important;
  text-transform: none !important;
  font-weight: 600 !important;
}

.add-slide-btn:hover {
  background: rgba(138, 43, 226, 0.1) !important;
  border-color: #8a2be2 !important;
}

.content-panel {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.content-tabs {
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tabs-content {
  flex: 1;
  overflow: hidden;
}

.tab-header {
  padding: 16px 20px 0;
  display: flex;
  justify-content: flex-end;
}

.slides-grid-compact {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;
  padding: 16px 20px 20px;
  overflow-y: auto;
  max-height: calc(100vh - 300px);
}

.slides-grid-compact::-webkit-scrollbar {
  width: 6px;
}

.slides-grid-compact::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.slides-grid-compact::-webkit-scrollbar-thumb {
  background: rgba(138, 43, 226, 0.5);
  border-radius: 3px;
}

.slide-card-compact {
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  min-height: 120px;
}

.slide-card-compact:hover {
  background: rgba(138, 43, 226, 0.05);
  border-color: rgba(138, 43, 226, 0.3);
  transform: translateY(-2px);
}

.slide-card-compact.active {
  background: rgba(138, 43, 226, 0.1);
  border-color: rgba(138, 43, 226, 0.6);
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.3);
}

.slide-card-compact.editing {
  background: rgba(138, 43, 226, 0.15);
  border-color: rgba(138, 43, 226, 0.8);
}

.slide-card-compact:focus {
  border-color: rgba(138, 43, 226, 0.8);
  box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.2);
}

.slide-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.slide-actions.visible {
  opacity: 1;
}

.slide-preview {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.slide-view {
  margin-top: 12px;
}

.slide-field {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 6px;
  line-height: 1.4;
}

.slide-field strong {
  color: rgba(255, 255, 255, 0.9);
}

.slide-edit {
  margin-top: 12px;
}

.edit-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.edit-btn {
  opacity: 0.7;
}

.edit-btn:hover {
  opacity: 1;
  color: #8a2be2 !important;
}

.video-section {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.json-panel-right {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.json-output-right {
  flex: 1;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 12px;
}

.json-output-right::-webkit-scrollbar {
  width: 6px;
}

.json-output-right::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.json-output-right::-webkit-scrollbar-thumb {
  background: rgba(138, 43, 226, 0.5);
  border-radius: 3px;
}

.json-output-right pre {
  margin: 0;
  font-size: 10px;
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.8);
  white-space: pre-wrap;
}



.carousel-actions {
  display: flex;
  gap: 8px;
}

.slides-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
}

.slides-editor::-webkit-scrollbar {
  width: 6px;
}

.slides-editor::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.slides-editor::-webkit-scrollbar-thumb {
  background: rgba(138, 43, 226, 0.5);
  border-radius: 3px;
}

.slides-editor::-webkit-scrollbar-thumb:hover {
  background: rgba(138, 43, 226, 0.7);
}

.slide-editor-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.slide-editor-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(138, 43, 226, 0.3);
}

.slide-editor-card.active {
  background: rgba(138, 43, 226, 0.1);
  border-color: rgba(138, 43, 226, 0.5);
}

.slide-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}



.slide-form {
  margin-top: 8px;
}

.slide-preview {
  margin-top: 8px;
}

.preview-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}

.preview-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.no-content {
  text-align: center;
  padding: 40px 20px;
  color: rgba(255, 255, 255, 0.6);
}

/* JSON Import Modal */
.json-import-modal {
  background: #1a1a2e;
  color: white;
  border-radius: 12px;
  overflow: hidden;
}

.import-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 16px;
}

/* Copy Editor Button */
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

.copy-editor-btn-hero:hover {
  background: rgba(138, 43, 226, 0.9) !important;
  border-color: #8a2be2 !important;
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
  
  .episode-content {
    grid-template-columns: 1fr;
  }
  
  .carousel-slides {
    grid-template-columns: repeat(2, 1fr);
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
  
  .editor-layout {
    grid-template-columns: 1fr;
  }
  
  .copy-editor-modal {
    height: 95vh;
  }
}
</style>