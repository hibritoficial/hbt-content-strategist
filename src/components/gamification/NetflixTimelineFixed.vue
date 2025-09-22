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

    <!-- Episodes Combined Section -->
    <div class="episodes-combined-section">
      <div class="episodes-header">
        <h2 class="section-title">Episódios</h2>
      </div>
      
      <div class="episodes-grid">
        <div 
          v-for="episode in episodes" 
          :key="episode.id"
          class="episode-card"
          :class="{ active: currentEpisode.id === episode.id, locked: !episode.available }"
          @click="selectEpisode(episode)"
        >
          <div class="episode-thumbnail">
            <div class="episode-number">{{ episode.number }}</div>
            <div class="episode-duration">{{ episode.duration }}</div>
            <div v-if="!episode.available" class="lock-overlay">
              <v-icon>mdi-lock</v-icon>
            </div>
          </div>
          
          <div class="episode-info">
            <h3 class="episode-title">{{ episode.title }}</h3>
            <p class="episode-description">{{ episode.description }}</p>
          </div>
        </div>
      </div>

      <!-- Episode Details (Integrated) -->
      <div class="episode-details" v-if="currentEpisode">
        <div class="details-container">
          <div class="episode-meta">
            <h3 class="meta-title">EP{{ currentEpisode.number }}: {{ currentEpisode.title }}</h3>
            <div class="meta-info">
              <span class="meta-duration">{{ currentEpisode.duration }}</span>
              <span class="meta-separator">•</span>
              <span class="meta-type">{{ currentEpisode.type || 'Diagnóstico' }}</span>
              <span class="meta-separator">•</span>
              <span class="meta-status">{{ currentEpisode.available ? 'Disponível' : 'Bloqueado' }}</span>
            </div>
          </div>
        
        <div class="episode-content">
          <!-- Carrossel Slideshow -->
          <div class="content-block carousel-block">
            <div class="block-header">
              <v-icon class="mr-2">mdi-view-carousel</v-icon>
              <span>Carrossel: "{{ currentEpisode.carouselTitle || 'Conteúdo Principal' }}"</span>
            </div>
            
            <div class="slideshow-container">
              <div class="slideshow-header">
                <div class="slide-counter">{{ currentSlide + 1 }} / {{ getCurrentCarousel().length }}</div>
                <div class="slideshow-controls">
                  <v-btn 
                    icon 
                    size="small" 
                    variant="text" 
                    @click="previousSlide"
                    :disabled="currentSlide === 0"
                  >
                    <v-icon>mdi-chevron-left</v-icon>
                  </v-btn>
                  <v-btn 
                    icon 
                    size="small" 
                    variant="text" 
                    @click="nextSlide"
                    :disabled="currentSlide === getCurrentCarousel().length - 1"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </div>
              </div>
              
              <div class="slide-viewer">
                <div class="slide-content" v-if="getCurrentCarousel()[currentSlide]">
                  <div class="slide-image" v-if="getCurrentCarousel()[currentSlide].image">
                    <img :src="getCurrentCarousel()[currentSlide].image" :alt="'Slide ' + (currentSlide + 1)" />
                  </div>
                  <div class="slide-text" v-else>
                    <div class="slide-number">{{ currentSlide + 1 }}</div>
                    <h4>{{ getCurrentCarousel()[currentSlide].title }}</h4>
                    <p>{{ getCurrentCarousel()[currentSlide].content }}</p>
                  </div>
                </div>
              </div>
              
              <div class="slide-thumbnails">
                <div 
                  v-for="(slide, index) in getCurrentCarousel()" 
                  :key="index"
                  class="thumbnail"
                  :class="{ active: index === currentSlide }"
                  @click="currentSlide = index"
                >
                  <div class="thumbnail-number">{{ index + 1 }}</div>
                  <div class="thumbnail-title">{{ slide.title }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Vídeo -->
          <div class="content-block">
            <div class="block-header">
              <v-icon class="mr-2">mdi-video</v-icon>
              <span>Vídeo: "{{ currentEpisode.videoTitle || 'Vídeo Complementar' }}"</span>
            </div>
            <div class="vimeo-container">
              <div class="vimeo-wrapper">
                <iframe 
                  src="https://player.vimeo.com/video/1120566489?badge=0&autopause=0&player_id=0&app_id=58479" 
                  frameborder="0" 
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                  referrerpolicy="strict-origin-when-cross-origin"
                  title="Vídeo do Episódio"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        

      </div>
      </div>
    </div>

    <!-- Radar Section -->
    <div class="radar-section">
      <div class="radar-header">
        <h2 class="radar-title">📶 RADAR ANTI-GHOSTING</h2>
        <p class="radar-subtitle">Detectando leads perdidos em tempo real</p>
      </div>
      
      <div class="radar-container">
        <div class="radar-screen">
          <div class="radar-sweep"></div>
          <div class="radar-dot dot-1" :class="{ active: radarActive }">
            <div class="dot-label">Lead perdido</div>
          </div>
          <div class="radar-dot dot-2" :class="{ active: radarActive }">
            <div class="dot-label">Ghosting detectado</div>
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

    <!-- Termômetro -->
    <div v-if="radarActive && ghostingLevel > 0" class="thermometer-section">
      <div class="thermometer-header">
        <h2 class="thermometer-title">🌡️ TERMÔMETRO DE GHOSTING</h2>
        <p class="thermometer-subtitle">Nível de ghosting detectado: {{ ghostingLevel }}%</p>
      </div>
      
      <div class="thermometer-container">
        <div class="thermometer-visual">
          <div class="thermometer-tube">
            <div class="temperature-fill" :style="{ height: ghostingLevel + '%' }" :class="getTemperatureClass()"></div>
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Passport Block Ultra Mega Bombástico -->
    <div class="passport-block-ultra">
      <div class="passport-hero-ultra">
        <div class="passport-mega-glow"></div>
        <div class="passport-header-ultra">
          <div class="passport-icon-ultra">🏆</div>
          <div class="passport-info-ultra">
            <h2 class="passport-title-ultra">🎯 PASSAPORTE ANTI-GHOSTING 🎯</h2>
            <p class="passport-subtitle-ultra">COLETE 10 SELOS EXCLUSIVOS E DESBLOQUEIE O PRÊMIO MÁXIMO</p>
            <div class="passport-value-highlight">
              <span class="value-currency">R$</span>
              <span class="value-amount">350</span>
              <span class="value-label">EM MENTORIA GRATUITA</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="passport-content-ultra">
        <!-- Seals Collection Showcase -->
        <div class="seals-showcase">
          <div class="showcase-header">
            <h3>🏆 COLEÇÃO DE SELOS EXCLUSIVOS</h3>
            <div class="progress-indicator">
              <span class="collected-count">3</span>
              <span class="separator">/</span>
              <span class="total-count">10</span>
              <span class="progress-label">SELOS CONQUISTADOS</span>
            </div>
          </div>
          
          <div class="seals-grid-ultra">
            <div v-for="n in 10" :key="n" class="seal-slot-ultra" :class="{ collected: n <= 3, locked: n > 3 }">
              <div class="seal-glow"></div>
              <div class="seal-number-ultra">{{ n }}</div>
              <div v-if="n <= 3" class="seal-icon-ultra">
                <div class="seal-trophy">🏆</div>
                <div class="seal-shine"></div>
              </div>
              <div v-else class="seal-locked">
                <div class="lock-icon">🔒</div>
              </div>
              <div class="seal-name">{{ getSealName(n) }}</div>
            </div>
          </div>
        </div>
        
        <!-- Prize Showcase -->
        <div class="prize-showcase">
          <div class="prize-card-ultra">
            <div class="prize-mega-glow"></div>
            <div class="prize-header-ultra">
              <div class="prize-icon-ultra">💎</div>
              <div class="prize-title-ultra">PRÊMIO EXCLUSIVO</div>
            </div>
            
            <div class="prize-value-ultra">
              <div class="value-display">
                <span class="currency">R$</span>
                <span class="amount">350</span>
              </div>
              <div class="value-description">VALOR EQUIVALENTE</div>
            </div>
            
            <div class="benefits-list">
              <div class="benefit-item premium">
                <div class="benefit-icon">👨🏫</div>
                <div class="benefit-text">
                  <strong>Mentoria Exclusiva 1:1</strong>
                  <span>60 minutos com especialista</span>
                </div>
                <div class="benefit-value">R$ 350</div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">🏅</div>
                <div class="benefit-text">
                  <strong>Certificado Digital Oficial</strong>
                  <span>Reconhecimento profissional</span>
                </div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">👥</div>
                <div class="benefit-text">
                  <strong>Acesso ao Grupo VIP</strong>
                  <span>Comunidade exclusiva</span>
                </div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">📋</div>
                <div class="benefit-text">
                  <strong>Templates Premium</strong>
                  <span>Kit completo de recursos</span>
                </div>
              </div>
            </div>
            
            <div class="unlock-progress">
              <div class="progress-bar-ultra">
                <div class="progress-fill-ultra" :style="{ width: '30%' }"></div>
                <div class="progress-sparkles"></div>
              </div>
              <div class="unlock-status-ultra">
                <v-icon color="#ffd700">mdi-lock</v-icon>
                <span>Colete mais 7 selos para desbloquear</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Copy Editor Modal -->
    <v-dialog v-model="showCopyEditor" max-width="1200">
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
const detectedLeads = ref(12)
const lostValue = ref(818)
const ghostingLevel = ref(0)

const currentSlide = ref(0)

const episodes = ref([
  {
    id: 1,
    number: 1,
    title: 'Radar Anti‑Ghosting',
    description: 'Mapeie seus contatos e descubra onde está perdendo leads',
    duration: '15min',
    type: 'Diagnóstico',
    available: true,
    completed: false,
    carouselTitle: 'Perdidos na Neblina',
    videoTitle: 'Anatomia do Sumiço — como montar seu Radar'
  },
  {
    id: 2,
    number: 2,
    title: 'Protocolo OEP',
    description: 'Estrutura em 3 passos: Objetivo → Encaixe → Proposta',
    duration: '20min',
    type: 'Estrutura',
    available: true,
    completed: false,
    carouselTitle: 'Protocolo OEP',
    videoTitle: 'OEP ao vivo (com 1 contato da sua lista)'
  },
  {
    id: 3,
    number: 3,
    title: 'Portão das 3 Questões',
    description: 'Filtre leads qualificados com 3 perguntas estratégicas',
    duration: '18min',
    type: 'Qualificação',
    available: true,
    completed: false,
    carouselTitle: 'O Portão Seletor',
    videoTitle: 'As 3 Questões que Separam Prospects de Curiosos'
  },
  {
    id: 4,
    number: 4,
    title: 'Luz na Sala',
    description: 'Técnica de transparência para gerar confiança instantânea',
    duration: '22min',
    type: 'Relacionamento',
    available: true,
    completed: false,
    carouselTitle: 'Transparência Total',
    videoTitle: 'Como Acender a Luz e Eliminar Objeções'
  },
  {
    id: 5,
    number: 5,
    title: 'Relógio da Urgência',
    description: 'Crie senso de urgência sem pressionar o cliente',
    duration: '16min',
    type: 'Conversão',
    available: true,
    completed: false,
    carouselTitle: 'Tempo é Ouro',
    videoTitle: 'Urgência Genuína vs Pressão Artificial'
  },
  {
    id: 6,
    number: 6,
    title: 'Queda Livre',
    description: 'Recupere leads que já estavam perdidos',
    duration: '25min',
    type: 'Recuperação',
    available: true,
    completed: false,
    carouselTitle: 'Resgate Impossível',
    videoTitle: 'Como Trazer de Volta Quem Já Tinha Desistido'
  }
])

const carousels = ref({
  1: [
    { image: '/images/carousels/episodio-1/slide-1.jpg', title: 'Slide 1' },
    { image: '/images/carousels/episodio-1/slide-2.jpg', title: 'Slide 2' },
    { image: '/images/carousels/episodio-1/slide-3.jpg', title: 'Slide 3' },
    { image: '/images/carousels/episodio-1/slide-4.jpg', title: 'Slide 4' }
  ],
  2: [
    { title: 'Objetivo Claro', content: 'Defina exatamente o que você quer alcançar com cada contato. Sem objetivo, não há direção.' },
    { title: 'Encaixe Perfeito', content: 'Identifique se o lead tem o perfil ideal para sua solução. Nem todo mundo é seu cliente.' },
    { title: 'Proposta Irresistível', content: 'Apresente uma oferta que seja impossível de ignorar, baseada nas necessidades reais do lead.' },
    { title: 'Timing Estratégico', content: 'Saiba o momento certo de fazer cada movimento. Timing é tudo na conversão.' },
    { title: 'Follow-up Inteligente', content: 'Mantenha contato sem ser invasivo. A persistência educada vence a resistência.' },
    { title: 'Fechamento Natural', content: 'Quando você segue o protocolo OEP, o fechamento acontece naturalmente.' },
    { title: 'Objeções Antecipadas', content: 'Identifique e trate as objeções mais comuns antes mesmo delas surgirem.' },
    { title: 'Valor Percebido', content: 'Demonstre o valor real da sua solução de forma tangível e mensurável.' },
    { title: 'Prova Social', content: 'Use depoimentos e casos de sucesso para validar sua proposta de valor.' },
    { title: 'Garantia de Resultado', content: 'Ofereça segurança ao cliente com garantias claras e condicionais.' }
  ],
  3: [
    { title: 'Questão 1: Necessidade', content: 'Você realmente precisa aprender idiomas para atingir seus objetivos profissionais?' },
    { title: 'Questão 2: Urgência', content: 'Qual é o prazo que você tem para dominar o idioma? Isso é realmente prioritário agora?' },
    { title: 'Questão 3: Investimento', content: 'Você está disposto a investir tempo e dinheiro para ter resultados reais e duradouros?' },
    { title: 'Filtro Automático', content: 'Essas 3 questões eliminam 70% dos curiosos e deixam apenas prospects qualificados.' },
    { title: 'Economia de Tempo', content: 'Pare de perder tempo com quem não vai comprar. Foque apenas em quem tem potencial real.' },
    { title: 'Qualidade vs Quantidade', content: 'Prefira 10 leads qualificados a 100 curiosos. A conversão será 10x maior.' },
    { title: 'Perfil do Cliente Ideal', content: 'Defina claramente quem é seu cliente ideal antes de aplicar as questões.' },
    { title: 'Momento Certo', content: 'Aplique as questões no momento adequado da conversa para maior efetividade.' },
    { title: 'Tom de Voz', content: 'Use um tom consultivo, não interrogativo. Seja um consultor, não um vendedor.' },
    { title: 'Próximos Passos', content: 'Defina claramente o que acontece com quem passa e quem não passa no filtro.' }
  ],
  4: [
    { title: 'Transparência Total', content: 'Mostre exatamente como funciona seu método, seus resultados e até suas limitações.' },
    { title: 'Sem Segredos', content: 'Compartilhe informações que outros professores escondem. Isso gera confiança instantânea.' },
    { title: 'Casos Reais', content: 'Apresente histórias verdadeiras de alunos, incluindo os desafios que enfrentaram.' },
    { title: 'Processo Claro', content: 'Explique passo a passo como o aluno vai evoluir, sem promessas mágicas.' },
    { title: 'Expectativas Reais', content: 'Seja honesto sobre o tempo e esforço necessários. Honestidade gera credibilidade.' },
    { title: 'Confiança Construída', content: 'Quando você acende a luz na sala, o cliente se sente seguro para tomar a decisão.' },
    { title: 'Vulnerabilidade Estratégica', content: 'Compartilhe seus próprios erros e aprendizados. Isso humaniza sua abordagem.' },
    { title: 'Dados Concretos', content: 'Use números reais, estatísticas e métricas para sustentar suas afirmações.' },
    { title: 'Comparações Honestas', content: 'Compare seu método com outros de forma justa, destacando prós e contras.' },
    { title: 'Garantias Reais', content: 'Ofereça garantias que você realmente pode cumprir, baseadas em resultados comprováveis.' }
  ],
  5: [
    { title: 'Urgência Genuína', content: 'Crie senso de urgência baseado em fatos reais, não em pressão artificial.' },
    { title: 'Oportunidades Limitadas', content: 'Mostre que algumas oportunidades realmente têm prazo ou vagas limitadas.' },
    { title: 'Custo da Demora', content: 'Demonstre o que o cliente perde ao adiar a decisão, sem criar pressão desnecessária.' },
    { title: 'Timing do Mercado', content: 'Explique como o momento atual é favorável para começar a aprender idiomas.' },
    { title: 'Consequências Claras', content: 'Mostre as consequências reais de não agir agora, baseadas em dados concretos.' },
    { title: 'Decisão Facilitada', content: 'Quando a urgência é genuína, a decisão se torna mais fácil e natural.' },
    { title: 'Janela de Oportunidade', content: 'Identifique e comunique janelas reais de oportunidade no mercado ou na vida do cliente.' },
    { title: 'Escassez Verdadeira', content: 'Use apenas escassez real: vagas limitadas, prazos de inscrição, ofertas sazonais.' },
    { title: 'Evolução Pessoal', content: 'Conecte a urgência com os objetivos pessoais e profissionais do cliente.' },
    { title: 'Momento Ideal', content: 'Demonstre por que agora é o momento ideal para o cliente começar sua jornada.' }
  ],
  6: [
    { title: 'Leads Perdidos', content: 'Identifique leads que pareciam interessados mas sumiram no meio do processo.' },
    { title: 'Diagnóstico Preciso', content: 'Entenda exatamente por que cada lead se afastou. Cada caso tem uma razão específica.' },
    { title: 'Abordagem Diferente', content: 'Use uma estratégia completamente nova para reativar o interesse desses leads.' },
    { title: 'Valor Adicional', content: 'Ofereça algo novo e valioso que não estava disponível no primeiro contato.' },
    { title: 'Timing Perfeito', content: 'Escolha o momento certo para fazer o resgate, quando o lead estiver mais receptivo.' },
    { title: 'Segunda Chance', content: 'Transforme leads perdidos em clientes fiéis através da técnica de queda livre.' },
    { title: 'Padrões de Abandono', content: 'Identifique os padrões comuns que levam leads a abandonar o processo de compra.' },
    { title: 'Mensagem de Resgate', content: 'Crie mensagens específicas para cada tipo de abandono identificado.' },
    { title: 'Oferta Irresistível', content: 'Desenvolva uma oferta tão boa que seja difícil para o lead perdido recusar.' },
    { title: 'Recuperação Sistemática', content: 'Implemente um sistema automático de recuperação de leads perdidos.' }
  ]
})

const currentEpisode = ref(episodes.value[0])

const selectEpisode = (episode) => {
  currentEpisode.value = episode
  currentSlide.value = 0
}

const getCurrentCarousel = () => {
  return carousels.value[currentEpisode.value.id] || []
}

const nextSlide = () => {
  const carousel = getCurrentCarousel()
  if (currentSlide.value < carousel.length - 1) {
    currentSlide.value++
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const playCurrentEpisode = () => {
  console.log('Playing episode')
}

const openCopyEditor = () => {
  showCopyEditor.value = true
}

const closeCopyEditor = () => {
  showCopyEditor.value = false
}

const toggleRadar = () => {
  radarActive.value = !radarActive.value
  if (radarActive.value) {
    setTimeout(() => {
      detectedLeads.value = Math.floor(Math.random() * 20) + 10
      lostValue.value = Math.floor(Math.random() * 500) + 600
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
  if (ghostingLevel.value <= 30) return 'Seu nível de ghosting está dentro do esperado.'
  if (ghostingLevel.value <= 60) return 'Há sinais de ghosting que precisam ser tratados.'
  if (ghostingLevel.value <= 80) return 'Nível alto de ghosting detectado.'
  return 'Nível crítico! Seus leads estão desaparecendo rapidamente.'
}

const getSealName = (n) => {
  const names = [
    'Varredura', 'Detetive', 'Radar', 'Portão 3Q', 'Luz na Sala',
    'Relógio', 'Preço Luminoso', 'Invocador', 'Espelho', 'Queda Livre'
  ]
  return names[n - 1] || `Selo ${n}`
}
</script>

<style scoped>
.netflix-timeline {
  background: #141414;
  color: white;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

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

.episodes-combined-section {
  padding: 40px 60px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin: 40px 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.episodes-header {
  margin-bottom: 24px;
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
  border: 2px solid transparent;
}

.episode-card:hover {
  transform: scale(1.02);
  border-color: rgba(138, 43, 226, 0.5);
}

.episode-card.active {
  border-color: rgba(138, 43, 226, 0.8);
  background: rgba(138, 43, 226, 0.1);
  transform: scale(1.02);
}

.episode-card.locked {
  opacity: 0.6;
  cursor: not-allowed;
}

.episode-card.locked:hover {
  transform: none;
  border-color: transparent;
}

.episode-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  background: linear-gradient(135deg, #333, #555);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lock-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 32px;
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

/* Episode Details */
.episode-details {
  padding: 32px 0 0;
  margin-top: 32px;
  border-top: 2px solid rgba(138, 43, 226, 0.3);
  background: rgba(138, 43, 226, 0.05);
  border-radius: 0 0 20px 20px;
}

.details-container {
  max-width: 1200px;
  margin: 0 auto;
}

.episode-meta {
  margin-bottom: 32px;
}

.meta-title {
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin: 0 0 12px 0;
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
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

.content-block {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.block-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.vimeo-container {
  margin-top: 16px;
}

.vimeo-wrapper {
  position: relative;
  padding-bottom: 177.78%;
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  max-width: 300px;
  margin: 0 auto;
}

.vimeo-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Radar Section */
.radar-section {
  margin-top: 40px;
  background: linear-gradient(135deg, rgba(0, 255, 127, 0.1), rgba(0, 128, 0, 0.05));
  border-radius: 20px;
  padding: 32px;
  border: 2px solid rgba(0, 255, 127, 0.3);
  margin: 40px 60px;
}

.radar-section-integrated {
  margin-top: 32px;
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
  grid-template-rows: repeat(2, 1fr);
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

/* Termômetro */
.thermometer-section {
  margin: 32px 60px;
  background: linear-gradient(135deg, rgba(255, 69, 0, 0.1), rgba(255, 140, 0, 0.05));
  border-radius: 20px;
  padding: 32px;
  border: 2px solid rgba(255, 69, 0, 0.3);
  animation: thermometer-appear 0.5s ease-out;
}

.thermometer-section-integrated {
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
  margin: 0;
  line-height: 1.5;
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

/* Passport Block Ultra Mega Bombástico */
.passport-block-ultra {
  margin: 60px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 193, 7, 0.1));
  border-radius: 24px;
  padding: 0;
  border: 3px solid rgba(255, 215, 0, 0.6);
  overflow: hidden;
  position: relative;
}

.passport-hero-ultra {
  position: relative;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 193, 7, 0.2));
  padding: 40px;
  text-align: center;
}

.passport-mega-glow {
  position: absolute;
  inset: -4px;
  background: linear-gradient(45deg, transparent 20%, rgba(255, 215, 0, 0.8) 50%, transparent 80%);
  opacity: 0.8;
  animation: mega-pulse 4s ease-in-out infinite alternate;
  z-index: -1;
  border-radius: 24px;
}

@keyframes mega-pulse {
  0% { opacity: 0.4; transform: scale(0.98); }
  100% { opacity: 1; transform: scale(1.02); }
}

.passport-header-ultra {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.passport-icon-ultra {
  font-size: 80px;
  filter: drop-shadow(0 0 30px rgba(255, 215, 0, 1));
  animation: icon-float 3s ease-in-out infinite alternate;
}

@keyframes icon-float {
  0% { transform: translateY(0) rotate(-5deg); }
  100% { transform: translateY(-8px) rotate(5deg); }
}

.passport-title-ultra {
  font-size: 32px;
  font-weight: 900;
  color: #ffd700;
  margin: 0 0 12px 0;
  letter-spacing: 3px;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
  animation: title-glow 2s ease-in-out infinite alternate;
}

@keyframes title-glow {
  0% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
  100% { text-shadow: 0 0 40px rgba(255, 215, 0, 1); }
}

.passport-subtitle-ultra {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 20px 0;
  font-weight: 600;
}

.passport-value-highlight {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2));
  padding: 16px 32px;
  border-radius: 16px;
  border: 2px solid rgba(255, 215, 0, 0.8);
}

.value-currency {
  font-size: 24px;
  color: #ffd700;
  font-weight: 800;
}

.value-amount {
  font-size: 48px;
  color: #ffd700;
  font-weight: 900;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
}

.value-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

.passport-content-ultra {
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 40px;
  padding: 40px;
}

/* Seals Showcase */
.seals-showcase {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.showcase-header {
  text-align: center;
  margin-bottom: 32px;
}

.showcase-header h3 {
  font-size: 24px;
  font-weight: 800;
  color: #ffd700;
  margin: 0 0 16px 0;
  letter-spacing: 2px;
}

.progress-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.collected-count {
  font-size: 32px;
  font-weight: 900;
  color: #ffd700;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.8);
}

.separator {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.5);
}

.total-count {
  font-size: 32px;
  font-weight: 900;
  color: rgba(255, 255, 255, 0.7);
}

.progress-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-left: 16px;
  font-weight: 600;
}

.seals-grid-ultra {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.seal-slot-ultra {
  position: relative;
  aspect-ratio: 1;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
  overflow: hidden;
}

.seal-slot-ultra.collected {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(255, 193, 7, 0.3));
  border-color: rgba(255, 215, 0, 0.8);
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
  transform: scale(1.05);
}

.seal-slot-ultra.locked {
  opacity: 0.4;
}

.seal-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.6) 50%, transparent 70%);
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.seal-slot-ultra.collected .seal-glow {
  opacity: 1;
  animation: seal-glow-pulse 3s ease-in-out infinite alternate;
}

@keyframes seal-glow-pulse {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

.seal-number-ultra {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
  font-weight: 700;
}

.seal-icon-ultra {
  position: relative;
  margin-bottom: 8px;
}

.seal-trophy {
  font-size: 28px;
  filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.8));
  animation: trophy-bounce 2s ease-in-out infinite alternate;
}

@keyframes trophy-bounce {
  0% { transform: translateY(0); }
  100% { transform: translateY(-4px); }
}

.seal-shine {
  position: absolute;
  inset: -4px;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shine-sweep 3s linear infinite;
  border-radius: 50%;
}

@keyframes shine-sweep {
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(100%) rotate(45deg); }
}

.seal-locked {
  margin-bottom: 8px;
}

.lock-icon {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.3);
}

.seal-name {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-weight: 600;
  line-height: 1.2;
}

.seal-slot-ultra.collected .seal-name {
  color: #ffd700;
  font-weight: 800;
}

/* Prize Showcase */
.prize-showcase {
  display: flex;
  flex-direction: column;
}

.prize-card-ultra {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
  border-radius: 20px;
  padding: 32px;
  border: 2px solid rgba(255, 215, 0, 0.6);
  text-align: center;
  overflow: hidden;
}

.prize-mega-glow {
  position: absolute;
  inset: -3px;
  background: linear-gradient(45deg, transparent 20%, rgba(255, 215, 0, 0.6) 50%, transparent 80%);
  border-radius: 20px;
  opacity: 0.9;
  animation: prize-mega-glow 3s ease-in-out infinite alternate;
  z-index: -1;
}

@keyframes prize-mega-glow {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

.prize-header-ultra {
  margin-bottom: 24px;
}

.prize-icon-ultra {
  font-size: 48px;
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 1));
  margin-bottom: 12px;
  display: block;
}

.prize-title-ultra {
  font-size: 20px;
  font-weight: 800;
  color: #ffd700;
  letter-spacing: 2px;
}

.prize-value-ultra {
  margin-bottom: 32px;
}

.value-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.currency {
  font-size: 32px;
  color: #ffd700;
  font-weight: 800;
}

.amount {
  font-size: 64px;
  color: #ffd700;
  font-weight: 900;
  text-shadow: 0 0 30px rgba(255, 215, 0, 0.8);
  animation: amount-pulse 2s ease-in-out infinite alternate;
}

@keyframes amount-pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

.value-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.benefits-list {
  text-align: left;
  margin-bottom: 32px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.benefit-item:hover {
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.3);
  transform: translateX(4px);
}

.benefit-item.premium {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 193, 7, 0.1));
  border-color: rgba(255, 215, 0, 0.5);
}

.benefit-icon {
  font-size: 24px;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
}

.benefit-text {
  flex: 1;
}

.benefit-text strong {
  display: block;
  font-size: 14px;
  color: #fff;
  margin-bottom: 4px;
  font-weight: 700;
}

.benefit-text span {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.benefit-value {
  font-size: 16px;
  color: #ffd700;
  font-weight: 800;
}

.unlock-progress {
  text-align: center;
}

.progress-bar-ultra {
  position: relative;
  width: 100%;
  height: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 16px;
}

.progress-fill-ultra {
  height: 100%;
  background: linear-gradient(90deg, #ffd700, #ffb300);
  transition: width 0.8s ease;
  position: relative;
}

.progress-sparkles {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: sparkle-move 2s linear infinite;
}

@keyframes sparkle-move {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.unlock-status-ultra {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #ffd700;
  font-weight: 600;
}

/* Slideshow Styles */
.carousel-block {
  min-height: 500px;
}

.slideshow-container {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-top: 16px;
}

.slideshow-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.slide-counter {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
}

.slideshow-controls {
  display: flex;
  gap: 8px;
}

.slide-viewer {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  aspect-ratio: 4/5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  overflow: hidden;
}

.slide-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slide-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.slide-text {
  text-align: center;
  padding: 40px;
  max-width: 600px;
}

.slide-number {
  display: inline-block;
  background: rgba(138, 43, 226, 0.8);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 20px;
}

.slide-text h4 {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0 0 16px 0;
  line-height: 1.3;
}

.slide-text p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
}

.slide-thumbnails {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.thumbnail {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.thumbnail:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(138, 43, 226, 0.5);
  transform: translateY(-2px);
}

.thumbnail.active {
  background: rgba(138, 43, 226, 0.3);
  border-color: rgba(138, 43, 226, 0.8);
  transform: translateY(-2px);
}

.thumbnail-number {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
}

.thumbnail.active .thumbnail-number {
  background: rgba(138, 43, 226, 0.8);
}

.thumbnail-title {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  line-height: 1.3;
}

.thumbnail.active .thumbnail-title {
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .slide-thumbnails {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
  }
  
  .slide-text {
    padding: 20px;
  }
  
  .slide-text h4 {
    font-size: 20px;
  }
  
  .slide-text p {
    font-size: 14px;
  }
  .hero-episode {
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
  
  .passport-block-ultra {
    margin: 20px;
  }
  
  .passport-content-ultra {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 24px;
  }
  
  .seals-grid-ultra {
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
  }
  
  .passport-header-ultra {
    flex-direction: column;
    gap: 16px;
  }
  
  .passport-value-highlight {
    flex-direction: column;
    gap: 4px;
  }
  
  .radar-section,
  .thermometer-section {
    margin: 20px;
    padding: 20px;
  }
  
  .radar-container,
  .thermometer-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .radar-screen {
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
}
</style>