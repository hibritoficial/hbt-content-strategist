<template>
  <div class="business-knowledge">
    <v-row>
      <!-- Business Strategy -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="purple" class="mr-3">mdi-strategy</v-icon>
            Estratégia Empresarial
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="topic in strategyTopics" :key="topic.title">
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

      <!-- Business Models -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="indigo" class="mr-3">mdi-cube-outline</v-icon>
            Modelos de Negócio
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="model in businessModels" :key="model.title">
                <v-expansion-panel-title>
                  <v-icon :color="model.color" class="mr-3">{{ model.icon }}</v-icon>
                  {{ model.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list density="compact">
                    <v-list-item v-for="item in model.items" :key="item">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Operations -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="orange" class="mr-3">mdi-cog</v-icon>
            Operações & Processos
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="operation in operations" :key="operation.title">
                <v-expansion-panel-title>
                  <v-icon :color="operation.color" class="mr-3">{{ operation.icon }}</v-icon>
                  {{ operation.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list density="compact">
                    <v-list-item v-for="item in operation.items" :key="item">
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

    <!-- Advanced Business Frameworks -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="cyan" class="mr-3">mdi-chart-timeline-variant</v-icon>
            Frameworks Avançados de Negócio
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" lg="3" v-for="framework in frameworks" :key="framework.name">
                <v-card class="framework-card" elevation="2">
                  <v-card-title class="text-center">
                    <v-icon :color="framework.color" size="32" class="mb-2">{{ framework.icon }}</v-icon>
                    <div>{{ framework.name }}</div>
                  </v-card-title>
                  <v-card-text>
                    <p class="framework-description">{{ framework.description }}</p>
                    <v-chip-group>
                      <v-chip v-for="tag in framework.tags" :key="tag" size="small" color="cyan" variant="outlined">
                        {{ tag }}
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const strategyTopics = ref([
  {
    title: 'Planejamento Estratégico',
    icon: 'mdi-map-marker-path',
    color: 'purple',
    items: [
      'Análise SWOT Avançada',
      'OKRs e KPIs Estratégicos',
      'Roadmap de Crescimento',
      'Análise de Cenários',
      'Blue Ocean Strategy'
    ]
  },
  {
    title: 'Inovação & Disrupção',
    icon: 'mdi-lightbulb-on',
    color: 'amber',
    items: [
      'Design Thinking',
      'Lean Startup',
      'Jobs-to-be-Done',
      'Inovação Aberta',
      'Ecossistemas de Inovação'
    ]
  },
  {
    title: 'Liderança & Cultura',
    icon: 'mdi-account-star',
    color: 'green',
    items: [
      'Liderança Transformacional',
      'Cultura de Alto Desempenho',
      'Change Management',
      'Employee Experience',
      'Diversidade & Inclusão'
    ]
  }
])

const businessModels = ref([
  {
    title: 'Modelos Digitais',
    icon: 'mdi-web',
    color: 'blue',
    items: [
      'SaaS & Subscription',
      'Marketplace & Plataformas',
      'Freemium & Premium',
      'API Economy',
      'Data Monetization'
    ]
  },
  {
    title: 'Modelos Híbridos',
    icon: 'mdi-merge',
    color: 'teal',
    items: [
      'Omnichannel',
      'D2C + B2B2C',
      'Physical + Digital',
      'Product + Service',
      'Community-driven'
    ]
  },
  {
    title: 'Modelos Emergentes',
    icon: 'mdi-rocket-launch',
    color: 'pink',
    items: [
      'Creator Economy',
      'Circular Economy',
      'Sharing Economy',
      'Blockchain & Web3',
      'AI-first Business'
    ]
  }
])

const operations = ref([
  {
    title: 'Gestão de Processos',
    icon: 'mdi-flow-chart',
    color: 'orange',
    items: [
      'BPM & Automação',
      'Lean Six Sigma',
      'Kaizen & Melhoria Contínua',
      'Process Mining',
      'RPA & Hyperautomation'
    ]
  },
  {
    title: 'Supply Chain 4.0',
    icon: 'mdi-truck-delivery',
    color: 'brown',
    items: [
      'Supply Chain Resilience',
      'Demand Forecasting',
      'Inventory Optimization',
      'Supplier Relationship',
      'Sustainability & ESG'
    ]
  },
  {
    title: 'Qualidade & Excelência',
    icon: 'mdi-medal',
    color: 'deep-orange',
    items: [
      'Total Quality Management',
      'ISO Standards',
      'Customer Experience',
      'Operational Excellence',
      'Risk Management'
    ]
  }
])

const frameworks = ref([
  {
    name: 'Business Model Canvas',
    description: 'Framework visual para desenvolvimento e documentação de modelos de negócio',
    icon: 'mdi-view-grid',
    color: 'purple',
    tags: ['Strategy', 'Innovation', 'Planning']
  },
  {
    name: 'Value Proposition Canvas',
    description: 'Ferramenta para criar propostas de valor centradas no cliente',
    icon: 'mdi-target',
    color: 'indigo',
    tags: ['Customer', 'Value', 'Product-Market Fit']
  },
  {
    name: 'Lean Canvas',
    description: 'Versão adaptada do BMC para startups e produtos digitais',
    icon: 'mdi-speedometer',
    color: 'green',
    tags: ['Startup', 'Lean', 'MVP']
  },
  {
    name: 'North Star Framework',
    description: 'Metodologia para alinhar equipes em torno de um objetivo comum',
    icon: 'mdi-star',
    color: 'amber',
    tags: ['Alignment', 'Growth', 'Metrics']
  },
  {
    name: 'Jobs-to-be-Done',
    description: 'Framework para entender as motivações reais dos clientes',
    icon: 'mdi-briefcase-check',
    color: 'teal',
    tags: ['Customer Research', 'Innovation', 'Product']
  },
  {
    name: 'OKRs Framework',
    description: 'Sistema de definição e acompanhamento de objetivos e resultados-chave',
    icon: 'mdi-bullseye-arrow',
    color: 'red',
    tags: ['Goals', 'Performance', 'Alignment']
  },
  {
    name: 'Design Thinking',
    description: 'Abordagem centrada no humano para resolver problemas complexos',
    icon: 'mdi-lightbulb-variant',
    color: 'orange',
    tags: ['Innovation', 'Human-Centered', 'Problem Solving']
  },
  {
    name: 'Agile & Scrum',
    description: 'Metodologias ágeis para desenvolvimento e gestão de projetos',
    icon: 'mdi-sync',
    color: 'blue',
    tags: ['Agile', 'Project Management', 'Iteration']
  }
])
</script>

<style scoped>
.business-knowledge {
  color: white;
}

.knowledge-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(156, 39, 176, 0.2);
  backdrop-filter: blur(10px);
  height: 100%;
}

.knowledge-panels {
  background: transparent !important;
}

.framework-card {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  height: 100%;
}

.framework-card:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(0, 188, 212, 0.3);
  transform: translateY(-4px);
}

.framework-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  line-height: 1.4;
}
</style>