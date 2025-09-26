<template>
  <div class="client-segments">
    <!-- Segments Overview -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="segments-overview-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="green" class="mr-3">mdi-account-group</v-icon>
            Segmentos de Clientes HIBRIT
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3" v-for="stat in segmentStats" :key="stat.title">
                <div class="segment-stat">
                  <v-icon :color="stat.color" size="32" class="mb-2">{{ stat.icon }}</v-icon>
                  <div class="stat-number">{{ stat.value }}</div>
                  <div class="stat-title">{{ stat.title }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Client Segments Grid -->
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="segment in clientSegments" :key="segment.name">
        <v-card class="segment-card" elevation="2">
          <v-card-title class="segment-header">
            <v-icon :color="segment.color" size="32" class="mr-3">{{ segment.icon }}</v-icon>
            <div>
              <div class="segment-name">{{ segment.name }}</div>
              <div class="segment-subtitle">{{ segment.subtitle }}</div>
            </div>
          </v-card-title>
          
          <v-card-text>
            <!-- Market Size -->
            <div class="market-info mb-3">
              <v-chip size="small" :color="segment.marketSize.level" variant="flat" class="mr-2">
                {{ segment.marketSize.level }}
              </v-chip>
              <span class="market-value">{{ segment.marketSize.value }}</span>
            </div>

            <!-- Description -->
            <p class="segment-description">{{ segment.description }}</p>

            <!-- Key Characteristics -->
            <div class="characteristics mb-3">
              <h4 class="section-title">Características-chave</h4>
              <v-chip-group>
                <v-chip v-for="char in segment.characteristics" :key="char" size="small" color="green" variant="outlined">
                  {{ char }}
                </v-chip>
              </v-chip-group>
            </div>

            <!-- Pain Points -->
            <div class="pain-points mb-3">
              <h4 class="section-title">Dores Principais</h4>
              <v-list density="compact" class="transparent">
                <v-list-item v-for="pain in segment.painPoints" :key="pain" class="pain-item">
                  <template #prepend>
                    <v-icon color="red" size="16">mdi-alert-circle</v-icon>
                  </template>
                  <v-list-item-title>{{ pain }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </div>

            <!-- Marketing Strategies -->
            <div class="strategies mb-3">
              <h4 class="section-title">Estratégias de Marketing</h4>
              <v-chip-group>
                <v-chip v-for="strategy in segment.strategies" :key="strategy" size="small" :color="segment.color" variant="outlined">
                  {{ strategy }}
                </v-chip>
              </v-chip-group>
            </div>

            <!-- Success Metrics -->
            <div class="metrics">
              <h4 class="section-title">Métricas de Sucesso</h4>
              <v-row>
                <v-col cols="6" v-for="metric in segment.metrics" :key="metric.name">
                  <div class="metric-item">
                    <div class="metric-name">{{ metric.name }}</div>
                    <div class="metric-value" :style="{ color: segment.color }">{{ metric.value }}</div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn :color="segment.color" variant="outlined" size="small" @click="viewSegmentDetails(segment)">
              Ver Detalhes
            </v-btn>
            <v-btn :color="segment.color" variant="text" size="small" @click="createCampaign(segment)">
              Criar Campanha
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Segment Analysis Tools -->
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card class="analysis-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="cyan" class="mr-3">mdi-chart-pie</v-icon>
            Análise de Segmentos
          </v-card-title>
          <v-card-text>
            <div class="analysis-tools">
              <v-btn color="purple" variant="outlined" block class="mb-2" @click="runSegmentAnalysis">
                <v-icon class="mr-2">mdi-analytics</v-icon>
                Análise Comportamental
              </v-btn>
              <v-btn color="orange" variant="outlined" block class="mb-2" @click="generatePersonas">
                <v-icon class="mr-2">mdi-account-multiple</v-icon>
                Gerar Personas
              </v-btn>
              <v-btn color="teal" variant="outlined" block @click="marketOpportunities">
                <v-icon class="mr-2">mdi-target</v-icon>
                Oportunidades de Mercado
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="trends-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="cyan" class="mr-3">mdi-trending-up</v-icon>
            Tendências de Mercado
          </v-card-title>
          <v-card-text>
            <v-list class="transparent">
              <v-list-item v-for="trend in marketTrends" :key="trend.title" class="trend-item">
                <template #prepend>
                  <v-avatar :color="trend.impact" size="32">
                    <v-icon color="white" size="16">{{ trend.icon }}</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>{{ trend.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ trend.description }}</v-list-item-subtitle>
                <template #append>
                  <v-chip size="small" :color="trend.impact" variant="outlined">{{ trend.impact }}</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const segmentStats = ref([
  { title: 'Segmentos Ativos', value: '12', icon: 'mdi-account-group', color: 'green' },
  { title: 'Clientes Totais', value: '150+', icon: 'mdi-account-multiple', color: 'blue' },
  { title: 'Campanhas Ativas', value: '45', icon: 'mdi-rocket-launch', color: 'orange' },
  { title: 'ROI Médio', value: '340%', icon: 'mdi-chart-line', color: 'purple' }
])

const clientSegments = ref([
  {
    name: 'Saúde & Bem-estar',
    subtitle: 'Clínicas, médicos e profissionais da saúde',
    icon: 'mdi-heart-pulse',
    color: 'red',
    marketSize: { level: 'Grande', value: 'R$ 2.8B' },
    description: 'Profissionais e empresas do setor de saúde que buscam aumentar sua presença digital e atrair mais pacientes.',
    characteristics: ['Regulamentado', 'Confiança', 'Especialização', 'Relacionamento'],
    painPoints: [
      'Compliance com regulamentações',
      'Construção de autoridade',
      'Captação de pacientes',
      'Educação do mercado'
    ],
    strategies: ['Content Marketing', 'SEO Local', 'Webinars', 'Depoimentos'],
    metrics: [
      { name: 'CAC', value: 'R$ 180' },
      { name: 'LTV', value: 'R$ 12K' },
      { name: 'Conversão', value: '8.5%' },
      { name: 'Retenção', value: '85%' }
    ]
  },
  {
    name: 'Educação & Cursos',
    subtitle: 'Educadores, coaches e criadores de conteúdo',
    icon: 'mdi-school',
    color: 'blue',
    marketSize: { level: 'Muito Grande', value: 'R$ 4.2B' },
    description: 'Profissionais que monetizam conhecimento através de cursos online, mentorias e produtos educacionais.',
    characteristics: ['Autoridade', 'Engajamento', 'Transformação', 'Comunidade'],
    painPoints: [
      'Posicionamento de autoridade',
      'Criação de funis educativos',
      'Precificação de produtos',
      'Escalabilidade do negócio'
    ],
    strategies: ['Funis Educativos', 'Webinars', 'Lançamentos', 'Afiliados'],
    metrics: [
      { name: 'CAC', value: 'R$ 95' },
      { name: 'LTV', value: 'R$ 2.8K' },
      { name: 'Conversão', value: '12.3%' },
      { name: 'Retenção', value: '72%' }
    ]
  },
  {
    name: 'E-commerce & Varejo',
    subtitle: 'Lojas online e marcas de produtos',
    icon: 'mdi-shopping',
    color: 'green',
    marketSize: { level: 'Muito Grande', value: 'R$ 8.1B' },
    description: 'Empresas que vendem produtos físicos ou digitais através de plataformas online.',
    characteristics: ['Performance', 'Conversão', 'Ticket Médio', 'Recorrência'],
    painPoints: [
      'Aquisição de tráfego qualificado',
      'Otimização de conversão',
      'Gestão de estoque',
      'Competitividade de preços'
    ],
    strategies: ['Performance Ads', 'Email Marketing', 'Remarketing', 'Influencers'],
    metrics: [
      { name: 'CAC', value: 'R$ 45' },
      { name: 'LTV', value: 'R$ 890' },
      { name: 'Conversão', value: '3.2%' },
      { name: 'ROAS', value: '4.8x' }
    ]
  },
  {
    name: 'Tecnologia & SaaS',
    subtitle: 'Startups e empresas de software',
    icon: 'mdi-laptop',
    color: 'purple',
    marketSize: { level: 'Grande', value: 'R$ 1.9B' },
    description: 'Empresas de tecnologia que desenvolvem software, aplicativos e soluções digitais.',
    characteristics: ['Inovação', 'Escalabilidade', 'Dados', 'Automação'],
    painPoints: [
      'Product-Market Fit',
      'Aquisição de usuários',
      'Churn rate alto',
      'Educação do mercado'
    ],
    strategies: ['Product-Led Growth', 'Content Marketing', 'Freemium', 'Partnerships'],
    metrics: [
      { name: 'CAC', value: 'R$ 320' },
      { name: 'LTV', value: 'R$ 8.5K' },
      { name: 'Churn', value: '5.2%' },
      { name: 'MRR Growth', value: '15%' }
    ]
  },
  {
    name: 'Consultoria & Serviços',
    subtitle: 'Consultores e prestadores de serviços B2B',
    icon: 'mdi-briefcase',
    color: 'indigo',
    marketSize: { level: 'Médio', value: 'R$ 1.2B' },
    description: 'Profissionais que oferecem consultoria especializada e serviços personalizados para empresas.',
    characteristics: ['Expertise', 'Relacionamento', 'Customização', 'Resultados'],
    painPoints: [
      'Geração de leads qualificados',
      'Demonstração de ROI',
      'Ciclo de vendas longo',
      'Precificação de serviços'
    ],
    strategies: ['LinkedIn Marketing', 'Case Studies', 'Networking', 'Referrals'],
    metrics: [
      { name: 'CAC', value: 'R$ 850' },
      { name: 'LTV', value: 'R$ 25K' },
      { name: 'Conversão', value: '18%' },
      { name: 'Ticket Médio', value: 'R$ 15K' }
    ]
  },
  {
    name: 'Beleza & Estética',
    subtitle: 'Salões, clínicas estéticas e profissionais da beleza',
    icon: 'mdi-face-woman-shimmer',
    color: 'pink',
    marketSize: { level: 'Grande', value: 'R$ 3.1B' },
    description: 'Profissionais e estabelecimentos do setor de beleza que buscam atrair e fidelizar clientes.',
    characteristics: ['Visual', 'Tendências', 'Experiência', 'Transformação'],
    painPoints: [
      'Agendamento online',
      'Fidelização de clientes',
      'Gestão de redes sociais',
      'Diferenciação no mercado'
    ],
    strategies: ['Instagram Marketing', 'Influencer Marketing', 'UGC', 'Local SEO'],
    metrics: [
      { name: 'CAC', value: 'R$ 65' },
      { name: 'LTV', value: 'R$ 1.8K' },
      { name: 'Conversão', value: '15.7%' },
      { name: 'Retenção', value: '68%' }
    ]
  }
])

const marketTrends = ref([
  {
    title: 'IA Generativa no Marketing',
    description: 'Automação de criação de conteúdo e personalização em massa',
    icon: 'mdi-robot',
    impact: 'Alto'
  },
  {
    title: 'Marketing Conversacional',
    description: 'WhatsApp Business e chatbots para vendas diretas',
    icon: 'mdi-message',
    impact: 'Alto'
  },
  {
    title: 'Vídeos Curtos Dominantes',
    description: 'TikTok, Reels e Shorts como principais canais de descoberta',
    icon: 'mdi-video',
    impact: 'Muito Alto'
  },
  {
    title: 'Privacy-First Marketing',
    description: 'Adaptação ao fim dos cookies e novas regulamentações',
    icon: 'mdi-shield-check',
    impact: 'Médio'
  }
])

const viewSegmentDetails = (segment) => {
  console.log('Viewing details for:', segment.name)
}

const createCampaign = (segment) => {
  console.log('Creating campaign for:', segment.name)
}

const runSegmentAnalysis = () => {
  console.log('Running segment analysis')
}

const generatePersonas = () => {
  console.log('Generating personas')
}

const marketOpportunities = () => {
  console.log('Analyzing market opportunities')
}
</script>

<style scoped>
.client-segments {
  color: white;
}

.segments-overview-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(76, 175, 80, 0.2);
  backdrop-filter: blur(10px);
}

.segment-stat {
  text-align: center;
  padding: 1rem;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #4caf50;
}

.stat-title {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.segment-card {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  height: 100%;
}

.segment-card:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(0, 188, 212, 0.3);
  transform: translateY(-4px);
}

.segment-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

.segment-name {
  font-size: 1.1rem;
  font-weight: 600;
}

.segment-subtitle {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.market-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.market-value {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.segment-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
}

.pain-item {
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.pain-item:last-child {
  border-bottom: none;
}

.metric-item {
  text-align: center;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.metric-name {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 600;
}

.analysis-card,
.trends-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(0, 188, 212, 0.2);
  backdrop-filter: blur(10px);
}

.analysis-tools {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.trend-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
}

.trend-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
</style>