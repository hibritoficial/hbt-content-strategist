<template>
  <div class="research-knowledge">
    <v-row>
      <!-- Research Areas -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="pink" class="mr-3">mdi-flask</v-icon>
            Áreas de Pesquisa
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="area in researchAreas" :key="area.title">
                <v-expansion-panel-title>
                  <v-icon :color="area.color" class="mr-3">{{ area.icon }}</v-icon>
                  {{ area.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list density="compact">
                    <v-list-item v-for="item in area.items" :key="item">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Methodologies -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="teal" class="mr-3">mdi-microscope</v-icon>
            Metodologias de Pesquisa
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="method in methodologies" :key="method.title">
                <v-expansion-panel-title>
                  <v-icon :color="method.color" class="mr-3">{{ method.icon }}</v-icon>
                  {{ method.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list density="compact">
                    <v-list-item v-for="item in method.items" :key="item">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Innovation Labs -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="amber" class="mr-3">mdi-lightbulb-on</v-icon>
            Laboratórios de Inovação
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="lab in innovationLabs" :key="lab.title">
                <v-expansion-panel-title>
                  <v-icon :color="lab.color" class="mr-3">{{ lab.icon }}</v-icon>
                  {{ lab.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list density="compact">
                    <v-list-item v-for="item in lab.items" :key="item">
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

    <!-- Active Research Projects -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="cyan" class="mr-3">mdi-clipboard-text</v-icon>
            Projetos de Pesquisa Ativos
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" lg="4" v-for="project in activeProjects" :key="project.name">
                <v-card class="project-card" elevation="2">
                  <v-card-title class="project-header">
                    <v-icon :color="project.color" size="28" class="mr-3">{{ project.icon }}</v-icon>
                    <div>
                      <div class="project-name">{{ project.name }}</div>
                      <div class="project-phase">{{ project.phase }}</div>
                    </div>
                  </v-card-title>
                  
                  <v-card-text>
                    <div class="progress-section mb-3">
                      <div class="progress-label">Progresso: {{ project.progress }}%</div>
                      <v-progress-linear
                        :model-value="project.progress"
                        :color="project.color"
                        height="6"
                        rounded
                      ></v-progress-linear>
                    </div>

                    <p class="project-description">{{ project.description }}</p>

                    <div class="project-team mb-3">
                      <h4 class="section-title">Equipe</h4>
                      <v-chip-group>
                        <v-chip v-for="member in project.team" :key="member" size="small" color="grey" variant="outlined">
                          {{ member }}
                        </v-chip>
                      </v-chip-group>
                    </div>

                    <div class="project-deliverables">
                      <h4 class="section-title">Entregáveis</h4>
                      <v-list density="compact" class="transparent">
                        <v-list-item v-for="deliverable in project.deliverables" :key="deliverable" class="deliverable-item">
                          <template #prepend>
                            <v-icon color="green" size="16">mdi-check-circle</v-icon>
                          </template>
                          <v-list-item-title>{{ deliverable }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn :color="project.color" variant="outlined" size="small" @click="viewProject(project)">
                      Ver Projeto
                    </v-btn>
                    <v-btn :color="project.color" variant="text" size="small" @click="connectToNeural(project)">
                      Neural Engine
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Research Tools & Resources -->
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-card class="tools-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="cyan" class="mr-3">mdi-tools</v-icon>
            Ferramentas de Pesquisa
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" v-for="tool in researchTools" :key="tool.name">
                <v-btn
                  :color="tool.color"
                  variant="outlined"
                  block
                  class="tool-btn mb-2"
                  @click="openTool(tool)"
                >
                  <v-icon class="mr-2">{{ tool.icon }}</v-icon>
                  {{ tool.name }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="publications-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="cyan" class="mr-3">mdi-book-open</v-icon>
            Publicações Recentes
          </v-card-title>
          <v-card-text>
            <v-list class="transparent">
              <v-list-item v-for="publication in recentPublications" :key="publication.title" class="publication-item">
                <template #prepend>
                  <v-avatar :color="publication.type === 'paper' ? 'blue' : 'green'" size="32">
                    <v-icon color="white" size="16">
                      {{ publication.type === 'paper' ? 'mdi-file-document' : 'mdi-presentation' }}
                    </v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>{{ publication.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ publication.authors }} • {{ publication.date }}</v-list-item-subtitle>
                <template #append>
                  <v-btn icon="mdi-open-in-new" size="small" variant="text" @click="openPublication(publication)"></v-btn>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const researchAreas = ref([
  {
    title: 'Behavioral Marketing',
    icon: 'mdi-brain',
    color: 'purple',
    items: [
      'Psicologia do Consumidor',
      'Neuromarketing',
      'Behavioral Economics',
      'Decision Making Process',
      'Cognitive Biases in Marketing'
    ]
  },
  {
    title: 'AI & Automation',
    icon: 'mdi-robot',
    color: 'blue',
    items: [
      'Marketing Automation',
      'Predictive Analytics',
      'Conversational AI',
      'Content Generation',
      'Personalization Algorithms'
    ]
  },
  {
    title: 'Customer Experience',
    icon: 'mdi-account-heart',
    color: 'red',
    items: [
      'Journey Mapping',
      'Touchpoint Optimization',
      'Omnichannel Strategy',
      'Customer Satisfaction',
      'Loyalty Programs'
    ]
  }
])

const methodologies = ref([
  {
    title: 'Quantitative Research',
    icon: 'mdi-chart-bar',
    color: 'green',
    items: [
      'A/B Testing Framework',
      'Statistical Analysis',
      'Cohort Analysis',
      'Regression Models',
      'Time Series Analysis'
    ]
  },
  {
    title: 'Qualitative Research',
    icon: 'mdi-account-voice',
    color: 'orange',
    items: [
      'User Interviews',
      'Focus Groups',
      'Ethnographic Studies',
      'Card Sorting',
      'Usability Testing'
    ]
  },
  {
    title: 'Mixed Methods',
    icon: 'mdi-merge',
    color: 'teal',
    items: [
      'Triangulation Studies',
      'Sequential Explanatory',
      'Concurrent Embedded',
      'Transformative Framework',
      'Pragmatic Approach'
    ]
  }
])

const innovationLabs = ref([
  {
    title: 'Future Commerce Lab',
    icon: 'mdi-shopping',
    color: 'indigo',
    items: [
      'Social Commerce',
      'Voice Commerce',
      'AR/VR Shopping',
      'Blockchain Payments',
      'Sustainable Commerce'
    ]
  },
  {
    title: 'Content Innovation Lab',
    icon: 'mdi-creation',
    color: 'pink',
    items: [
      'AI Content Generation',
      'Interactive Content',
      'Immersive Storytelling',
      'Real-time Personalization',
      'Cross-platform Narratives'
    ]
  },
  {
    title: 'Growth Hacking Lab',
    icon: 'mdi-rocket',
    color: 'amber',
    items: [
      'Viral Mechanics',
      'Network Effects',
      'Product-Led Growth',
      'Retention Loops',
      'Referral Systems'
    ]
  }
])

const activeProjects = ref([
  {
    name: 'AI-Powered Funnel Optimization',
    phase: 'Fase 2 - Desenvolvimento',
    icon: 'mdi-filter-variant',
    color: 'blue',
    progress: 65,
    description: 'Desenvolvimento de algoritmos de IA para otimização automática de funis de conversão baseado em dados comportamentais.',
    team: ['Dr. Silva', 'Ana Costa', 'João Santos'],
    deliverables: [
      'Algoritmo de otimização',
      'Interface de configuração',
      'Dashboard de métricas',
      'Documentação técnica'
    ]
  },
  {
    name: 'Conversational Commerce Engine',
    phase: 'Fase 1 - Pesquisa',
    icon: 'mdi-message-processing',
    color: 'green',
    progress: 30,
    description: 'Sistema avançado de vendas conversacionais usando IA para WhatsApp Business e chatbots inteligentes.',
    team: ['Maria Oliveira', 'Pedro Lima', 'Carla Mendes'],
    deliverables: [
      'Análise de mercado',
      'Prototipo funcional',
      'Testes de usabilidade',
      'Roadmap de desenvolvimento'
    ]
  },
  {
    name: 'Behavioral Prediction Model',
    phase: 'Fase 3 - Validação',
    icon: 'mdi-crystal-ball',
    color: 'purple',
    progress: 85,
    description: 'Modelo preditivo para antecipar comportamentos de compra e otimizar estratégias de marketing.',
    team: ['Dr. Ferreira', 'Lucas Rocha', 'Beatriz Alves'],
    deliverables: [
      'Modelo treinado',
      'API de predição',
      'Casos de uso validados',
      'Métricas de performance'
    ]
  },
  {
    name: 'Omnichannel Attribution',
    phase: 'Fase 2 - Desenvolvimento',
    icon: 'mdi-network',
    color: 'orange',
    progress: 50,
    description: 'Sistema de atribuição cross-channel para medir o impacto real de cada touchpoint na jornada do cliente.',
    team: ['Rafael Souza', 'Camila Torres', 'Diego Martins'],
    deliverables: [
      'Engine de atribuição',
      'Conectores de dados',
      'Relatórios automatizados',
      'Integração com plataformas'
    ]
  }
])

const researchTools = ref([
  { name: 'Analytics Suite', icon: 'mdi-chart-line', color: 'blue' },
  { name: 'A/B Test Platform', icon: 'mdi-ab-testing', color: 'green' },
  { name: 'Survey Builder', icon: 'mdi-clipboard-list', color: 'orange' },
  { name: 'Heatmap Analyzer', icon: 'mdi-fire', color: 'red' },
  { name: 'User Session Recorder', icon: 'mdi-record-rec', color: 'purple' },
  { name: 'Cohort Analyzer', icon: 'mdi-account-group', color: 'teal' }
])

const recentPublications = ref([
  {
    title: 'The Future of Conversational Marketing in Brazil',
    authors: 'Silva, A. et al.',
    date: '2024-01',
    type: 'paper'
  },
  {
    title: 'AI-Driven Personalization: A Case Study',
    authors: 'Oliveira, M. & Santos, J.',
    date: '2024-01',
    type: 'presentation'
  },
  {
    title: 'Behavioral Economics in Digital Marketing',
    authors: 'Ferreira, L. et al.',
    date: '2023-12',
    type: 'paper'
  },
  {
    title: 'Cross-Channel Attribution Models',
    authors: 'Costa, R. & Lima, P.',
    date: '2023-12',
    type: 'presentation'
  }
])

const viewProject = (project) => {
  console.log('Viewing project:', project.name)
}

const connectToNeural = (project) => {
  router.push('/labs/neural-research-engine')
}

const openTool = (tool) => {
  console.log('Opening tool:', tool.name)
}

const openPublication = (publication) => {
  console.log('Opening publication:', publication.title)
}
</script>

<style scoped>
.research-knowledge {
  color: white;
}

.knowledge-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(233, 30, 99, 0.2);
  backdrop-filter: blur(10px);
  height: 100%;
}

.knowledge-panels {
  background: transparent !important;
}

.project-card {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  height: 100%;
}

.project-card:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(0, 188, 212, 0.3);
  transform: translateY(-4px);
}

.project-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

.project-name {
  font-size: 1rem;
  font-weight: 600;
}

.project-phase {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.progress-section {
  margin-bottom: 1rem;
}

.progress-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.project-description {
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

.deliverable-item {
  padding: 0.25rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.deliverable-item:last-child {
  border-bottom: none;
}

.tools-card,
.publications-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(0, 188, 212, 0.2);
  backdrop-filter: blur(10px);
}

.tool-btn {
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  background: rgba(255, 255, 255, 0.05) !important;
  transition: all 0.3s ease;
}

.tool-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  transform: translateY(-2px);
}

.publication-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
}

.publication-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}
</style>