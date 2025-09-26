<template>
  <div class="marketing-knowledge">
    <v-row>
      <!-- Digital Marketing -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="orange" class="mr-3">mdi-bullhorn</v-icon>
            Marketing Digital Avançado
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="topic in digitalMarketing" :key="topic.title">
                <v-expansion-panel-title>
                  <v-icon :color="topic.color" class="mr-3">{{ topic.icon }}</v-icon>
                  {{ topic.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list density="compact">
                    <v-list-item v-for="item in topic.items" :key="item">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Growth Marketing -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="green" class="mr-3">mdi-trending-up</v-icon>
            Growth Marketing
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="growth in growthMarketing" :key="growth.title">
                <v-expansion-panel-title>
                  <v-icon :color="growth.color" class="mr-3">{{ growth.icon }}</v-icon>
                  {{ growth.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list density="compact">
                    <v-list-item v-for="item in growth.items" :key="item">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Brand & Content -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="purple" class="mr-3">mdi-palette</v-icon>
            Brand & Content Strategy
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="brand in brandContent" :key="brand.title">
                <v-expansion-panel-title>
                  <v-icon :color="brand.color" class="mr-3">{{ brand.icon }}</v-icon>
                  {{ brand.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list density="compact">
                    <v-list-item v-for="item in brand.items" :key="item">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Marketing Channels Matrix -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="cyan" class="mr-3">mdi-matrix</v-icon>
            Matriz de Canais de Marketing 2024
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" lg="4" v-for="channel in marketingChannels" :key="channel.name">
                <v-card class="channel-card" elevation="2">
                  <v-card-title class="text-center">
                    <v-icon :color="channel.color" size="32" class="mb-2">{{ channel.icon }}</v-icon>
                    <div>{{ channel.name }}</div>
                  </v-card-title>
                  <v-card-text>
                    <div class="channel-metrics mb-3">
                      <v-chip size="small" :color="channel.effectiveness" variant="flat" class="mr-2">
                        {{ channel.effectiveness }}
                      </v-chip>
                      <v-chip size="small" color="grey" variant="outlined">
                        {{ channel.cost }}
                      </v-chip>
                    </div>
                    <p class="channel-description">{{ channel.description }}</p>
                    <v-chip-group>
                      <v-chip v-for="strategy in channel.strategies" :key="strategy" size="small" color="orange" variant="outlined">
                        {{ strategy }}
                      </v-chip>
                    </v-chip-group>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Advanced Marketing Frameworks -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="pink" class="mr-3">mdi-rocket-launch</v-icon>
            Frameworks de Marketing Avançado
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" lg="3" v-for="framework in marketingFrameworks" :key="framework.name">
                <v-card class="framework-card" elevation="2">
                  <v-card-title class="text-center">
                    <v-icon :color="framework.color" size="28" class="mb-2">{{ framework.icon }}</v-icon>
                    <div class="framework-name">{{ framework.name }}</div>
                  </v-card-title>
                  <v-card-text>
                    <p class="framework-description">{{ framework.description }}</p>
                    <div class="framework-use-case">
                      <strong>Uso:</strong> {{ framework.useCase }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const digitalMarketing = ref([
  {
    title: 'Performance Marketing',
    icon: 'mdi-chart-line',
    color: 'blue',
    items: [
      'Google Ads & Meta Ads Avançado',
      'Programmatic Advertising',
      'Attribution Modeling',
      'Marketing Mix Modeling',
      'Customer Lifetime Value'
    ]
  },
  {
    title: 'SEO & Content Marketing',
    icon: 'mdi-magnify',
    color: 'green',
    items: [
      'Technical SEO Avançado',
      'Content Clusters & Topic Authority',
      'E-A-T & Core Web Vitals',
      'Voice Search Optimization',
      'AI-Generated Content Strategy'
    ]
  },
  {
    title: 'Marketing Automation',
    icon: 'mdi-robot',
    color: 'purple',
    items: [
      'Lead Scoring & Nurturing',
      'Behavioral Triggers',
      'Omnichannel Automation',
      'Predictive Analytics',
      'Customer Journey Orchestration'
    ]
  }
])

const growthMarketing = ref([
  {
    title: 'Growth Hacking',
    icon: 'mdi-rocket',
    color: 'orange',
    items: [
      'Viral Loops & Network Effects',
      'Product-Led Growth (PLG)',
      'Referral Programs',
      'A/B Testing Framework',
      'Growth Experimentation'
    ]
  },
  {
    title: 'Conversion Optimization',
    icon: 'mdi-target-variant',
    color: 'red',
    items: [
      'CRO Methodology',
      'Landing Page Optimization',
      'Funnel Analysis & Optimization',
      'Behavioral Psychology',
      'Personalization & Dynamic Content'
    ]
  },
  {
    title: 'Retention & Loyalty',
    icon: 'mdi-heart',
    color: 'pink',
    items: [
      'Customer Success Programs',
      'Churn Prediction & Prevention',
      'Loyalty Program Design',
      'Community Building',
      'Advocacy & Word-of-Mouth'
    ]
  }
])

const brandContent = ref([
  {
    title: 'Brand Strategy',
    icon: 'mdi-crown',
    color: 'amber',
    items: [
      'Brand Positioning & Differentiation',
      'Brand Architecture',
      'Brand Personality & Voice',
      'Brand Experience Design',
      'Brand Equity Measurement'
    ]
  },
  {
    title: 'Content Strategy',
    icon: 'mdi-file-document',
    color: 'teal',
    items: [
      'Content Pillar Framework',
      'Editorial Calendar & Planning',
      'Content Distribution Strategy',
      'User-Generated Content',
      'Content Performance Analytics'
    ]
  },
  {
    title: 'Creative & Design',
    icon: 'mdi-brush',
    color: 'indigo',
    items: [
      'Visual Identity Systems',
      'Creative Campaign Development',
      'Motion Graphics & Video',
      'Interactive Content',
      'Brand Guidelines & Standards'
    ]
  }
])

const marketingChannels = ref([
  {
    name: 'Instagram Marketing',
    icon: 'mdi-instagram',
    color: 'pink',
    effectiveness: 'Alto',
    cost: 'Médio',
    description: 'Marketing visual com foco em engagement e conversão através de Stories, Reels e Posts.',
    strategies: ['Influencer Marketing', 'UGC', 'Shopping', 'Stories Ads']
  },
  {
    name: 'LinkedIn B2B',
    icon: 'mdi-linkedin',
    color: 'blue',
    effectiveness: 'Muito Alto',
    cost: 'Alto',
    description: 'Plataforma premium para marketing B2B, thought leadership e networking profissional.',
    strategies: ['Thought Leadership', 'ABM', 'Lead Gen', 'Employee Advocacy']
  },
  {
    name: 'TikTok Marketing',
    icon: 'mdi-music-note',
    color: 'black',
    effectiveness: 'Alto',
    cost: 'Baixo',
    description: 'Marketing viral para Gen Z e Millennials através de conteúdo criativo e autêntico.',
    strategies: ['Viral Content', 'Hashtag Challenges', 'Creator Partnership', 'Trend Jacking']
  },
  {
    name: 'YouTube Strategy',
    icon: 'mdi-youtube',
    color: 'red',
    effectiveness: 'Alto',
    cost: 'Médio',
    description: 'Marketing de vídeo long-form para educação, entretenimento e conversão.',
    strategies: ['Educational Content', 'Product Demos', 'Storytelling', 'YouTube Shorts']
  },
  {
    name: 'Email Marketing',
    icon: 'mdi-email',
    color: 'green',
    effectiveness: 'Muito Alto',
    cost: 'Baixo',
    description: 'Canal direto com alto ROI para nurturing, retenção e conversão de leads.',
    strategies: ['Segmentation', 'Automation', 'Personalization', 'Behavioral Triggers']
  },
  {
    name: 'WhatsApp Business',
    icon: 'mdi-whatsapp',
    color: 'green',
    effectiveness: 'Alto',
    cost: 'Baixo',
    description: 'Marketing conversacional para atendimento, vendas e relacionamento direto.',
    strategies: ['Conversational Commerce', 'Customer Support', 'Broadcast Lists', 'Chatbots']
  }
])

const marketingFrameworks = ref([
  {
    name: 'AARRR (Pirate Metrics)',
    icon: 'mdi-ship-wheel',
    color: 'blue',
    description: 'Framework de growth para medir Acquisition, Activation, Retention, Referral e Revenue.',
    useCase: 'Startups e produtos digitais'
  },
  {
    name: 'Customer Journey Mapping',
    icon: 'mdi-map-marker-path',
    color: 'purple',
    description: 'Mapeamento completo da jornada do cliente para otimizar touchpoints.',
    useCase: 'Experiência do cliente'
  },
  {
    name: 'Jobs-to-be-Done Marketing',
    icon: 'mdi-briefcase-check',
    color: 'orange',
    description: 'Marketing baseado nas tarefas que o cliente quer realizar.',
    useCase: 'Product marketing'
  },
  {
    name: 'Growth Loops',
    icon: 'mdi-sync',
    color: 'green',
    description: 'Sistemas auto-reforçantes que geram crescimento composto.',
    useCase: 'Crescimento sustentável'
  },
  {
    name: 'Flywheel Marketing',
    icon: 'mdi-rotate-right',
    color: 'teal',
    description: 'Modelo circular que transforma clientes em promotores da marca.',
    useCase: 'Inbound marketing'
  },
  {
    name: 'North Star Framework',
    icon: 'mdi-star',
    color: 'amber',
    description: 'Métrica única que guia todas as decisões de marketing e produto.',
    useCase: 'Alinhamento de equipes'
  },
  {
    name: 'ICE Scoring',
    icon: 'mdi-ice-cream',
    color: 'cyan',
    description: 'Priorização de experimentos baseada em Impact, Confidence e Ease.',
    useCase: 'Growth experiments'
  },
  {
    name: 'Bullseye Framework',
    icon: 'mdi-bullseye-arrow',
    color: 'red',
    description: 'Metodologia para encontrar o canal de marketing mais efetivo.',
    useCase: 'Channel strategy'
  }
])
</script>

<style scoped>
.marketing-knowledge {
  color: white;
}

.knowledge-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 152, 0, 0.2);
  backdrop-filter: blur(10px);
  height: 100%;
}

.knowledge-panels {
  background: transparent !important;
}

.channel-card,
.framework-card {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  height: 100%;
}

.channel-card:hover,
.framework-card:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(0, 188, 212, 0.3);
  transform: translateY(-4px);
}

.channel-metrics {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.channel-description,
.framework-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.framework-name {
  font-size: 0.95rem;
  font-weight: 600;
}

.framework-use-case {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
}
</style>