<template>
  <div class="technology-knowledge">
    <v-row>
      <!-- AI & Machine Learning -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="blue" class="mr-3">mdi-robot</v-icon>
            IA & Machine Learning
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="topic in aiTopics" :key="topic.title">
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

      <!-- Development & Architecture -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="green" class="mr-3">mdi-code-tags</v-icon>
            Desenvolvimento & Arquitetura
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="dev in devTopics" :key="dev.title">
                <v-expansion-panel-title>
                  <v-icon :color="dev.color" class="mr-3">{{ dev.icon }}</v-icon>
                  {{ dev.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list density="compact">
                    <v-list-item v-for="item in dev.items" :key="item">
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Data & Analytics -->
      <v-col cols="12" md="4">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="purple" class="mr-3">mdi-chart-box</v-icon>
            Data & Analytics
          </v-card-title>
          <v-card-text>
            <v-expansion-panels variant="accordion" class="knowledge-panels">
              <v-expansion-panel v-for="data in dataTopics" :key="data.title">
                <v-expansion-panel-title>
                  <v-icon :color="data.color" class="mr-3">{{ data.icon }}</v-icon>
                  {{ data.title }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list density="compact">
                    <v-list-item v-for="item in data.items" :key="item">
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

    <!-- Technology Stack Matrix -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="cyan" class="mr-3">mdi-layers</v-icon>
            Stack Tecnológico HIBRIT 2024
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" lg="4" v-for="stack in techStacks" :key="stack.name">
                <v-card class="stack-card" elevation="2">
                  <v-card-title class="text-center">
                    <v-icon :color="stack.color" size="32" class="mb-2">{{ stack.icon }}</v-icon>
                    <div>{{ stack.name }}</div>
                  </v-card-title>
                  <v-card-text>
                    <div class="stack-level mb-3">
                      <v-chip size="small" :color="stack.level" variant="flat">
                        {{ stack.level }}
                      </v-chip>
                    </div>
                    <p class="stack-description">{{ stack.description }}</p>
                    <v-chip-group>
                      <v-chip v-for="tech in stack.technologies" :key="tech" size="small" color="blue" variant="outlined">
                        {{ tech }}
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

    <!-- Emerging Technologies -->
    <v-row class="mt-6">
      <v-col cols="12">
        <v-card class="knowledge-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="pink" class="mr-3">mdi-rocket-launch</v-icon>
            Tecnologias Emergentes & Futuro
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" lg="3" v-for="tech in emergingTech" :key="tech.name">
                <v-card class="emerging-card" elevation="2">
                  <v-card-title class="text-center">
                    <v-icon :color="tech.color" size="28" class="mb-2">{{ tech.icon }}</v-icon>
                    <div class="tech-name">{{ tech.name }}</div>
                  </v-card-title>
                  <v-card-text>
                    <div class="maturity-level mb-2">
                      <v-progress-linear
                        :model-value="tech.maturity"
                        :color="tech.color"
                        height="6"
                        rounded
                      ></v-progress-linear>
                      <span class="maturity-text">{{ tech.maturity }}% Maturidade</span>
                    </div>
                    <p class="tech-description">{{ tech.description }}</p>
                    <div class="impact-level">
                      <strong>Impacto:</strong> {{ tech.impact }}
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

const aiTopics = ref([
  {
    title: 'Large Language Models',
    icon: 'mdi-brain',
    color: 'blue',
    items: [
      'GPT-4 & Claude Integration',
      'Prompt Engineering Avançado',
      'Fine-tuning & RAG Systems',
      'AI Agents & Workflows',
      'Multimodal AI Applications'
    ]
  },
  {
    title: 'Computer Vision',
    icon: 'mdi-eye',
    color: 'green',
    items: [
      'Image Recognition & Classification',
      'Object Detection & Tracking',
      'Facial Recognition & Biometrics',
      'OCR & Document Processing',
      'Generative AI for Images'
    ]
  },
  {
    title: 'Conversational AI',
    icon: 'mdi-message-processing',
    color: 'purple',
    items: [
      'Chatbots & Virtual Assistants',
      'Natural Language Understanding',
      'Sentiment Analysis',
      'Voice Recognition & Synthesis',
      'Conversational Commerce'
    ]
  }
])

const devTopics = ref([
  {
    title: 'Frontend Moderno',
    icon: 'mdi-web',
    color: 'orange',
    items: [
      'Vue 3 + Composition API',
      'React 18 + Next.js 14',
      'TypeScript & Modern JS',
      'Micro-frontends Architecture',
      'Progressive Web Apps (PWA)'
    ]
  },
  {
    title: 'Backend & APIs',
    icon: 'mdi-server',
    color: 'teal',
    items: [
      'Node.js & Express/Fastify',
      'GraphQL & REST APIs',
      'Microservices Architecture',
      'Serverless & Edge Computing',
      'API Gateway & Rate Limiting'
    ]
  },
  {
    title: 'DevOps & Cloud',
    icon: 'mdi-cloud',
    color: 'indigo',
    items: [
      'Docker & Kubernetes',
      'CI/CD Pipelines',
      'Infrastructure as Code',
      'Monitoring & Observability',
      'Security & Compliance'
    ]
  }
])

const dataTopics = ref([
  {
    title: 'Data Engineering',
    icon: 'mdi-database',
    color: 'amber',
    items: [
      'Data Pipelines & ETL',
      'Real-time Data Processing',
      'Data Lake & Data Warehouse',
      'Stream Processing (Kafka)',
      'Data Quality & Governance'
    ]
  },
  {
    title: 'Analytics & BI',
    icon: 'mdi-chart-line',
    color: 'red',
    items: [
      'Advanced Analytics',
      'Predictive Modeling',
      'Customer Analytics',
      'Marketing Attribution',
      'Real-time Dashboards'
    ]
  },
  {
    title: 'Data Science',
    icon: 'mdi-flask',
    color: 'pink',
    items: [
      'Machine Learning Models',
      'Statistical Analysis',
      'A/B Testing Framework',
      'Recommendation Systems',
      'Anomaly Detection'
    ]
  }
])

const techStacks = ref([
  {
    name: 'Frontend Stack',
    icon: 'mdi-monitor',
    color: 'blue',
    level: 'Avançado',
    description: 'Stack moderno para interfaces de usuário responsivas e performáticas.',
    technologies: ['Vue 3', 'Vuetify', 'TypeScript', 'Vite', 'Pinia']
  },
  {
    name: 'Backend Stack',
    icon: 'mdi-server-network',
    color: 'green',
    level: 'Avançado',
    description: 'Arquitetura robusta para APIs escaláveis e microserviços.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker']
  },
  {
    name: 'AI/ML Stack',
    icon: 'mdi-robot-outline',
    color: 'purple',
    level: 'Intermediário',
    description: 'Ferramentas para desenvolvimento e deploy de modelos de IA.',
    technologies: ['Python', 'TensorFlow', 'OpenAI API', 'Hugging Face', 'MLflow']
  },
  {
    name: 'Data Stack',
    icon: 'mdi-chart-box-outline',
    color: 'orange',
    level: 'Intermediário',
    description: 'Pipeline completo para coleta, processamento e análise de dados.',
    technologies: ['Apache Kafka', 'Elasticsearch', 'Grafana', 'Jupyter', 'Pandas']
  },
  {
    name: 'Cloud Stack',
    icon: 'mdi-cloud-outline',
    color: 'cyan',
    level: 'Avançado',
    description: 'Infraestrutura cloud-native para escalabilidade e confiabilidade.',
    technologies: ['AWS', 'Vercel', 'Supabase', 'CloudFlare', 'GitHub Actions']
  },
  {
    name: 'Mobile Stack',
    icon: 'mdi-cellphone',
    color: 'pink',
    level: 'Básico',
    description: 'Desenvolvimento de aplicações móveis nativas e híbridas.',
    technologies: ['React Native', 'Flutter', 'Expo', 'Firebase', 'App Store Connect']
  }
])

const emergingTech = ref([
  {
    name: 'Web3 & Blockchain',
    icon: 'mdi-cube-outline',
    color: 'amber',
    maturity: 25,
    description: 'Tecnologias descentralizadas para nova economia digital.',
    impact: 'Transformacional'
  },
  {
    name: 'Quantum Computing',
    icon: 'mdi-atom',
    color: 'purple',
    maturity: 15,
    description: 'Computação quântica para problemas complexos.',
    impact: 'Revolucionário'
  },
  {
    name: 'Edge AI',
    icon: 'mdi-chip',
    color: 'green',
    maturity: 60,
    description: 'IA processada localmente em dispositivos edge.',
    impact: 'Alto'
  },
  {
    name: 'Augmented Reality',
    icon: 'mdi-augmented-reality',
    color: 'blue',
    maturity: 45,
    description: 'Realidade aumentada para experiências imersivas.',
    impact: 'Alto'
  },
  {
    name: 'IoT & Smart Devices',
    icon: 'mdi-wifi',
    color: 'teal',
    maturity: 70,
    description: 'Internet das Coisas para automação inteligente.',
    impact: 'Médio-Alto'
  },
  {
    name: '5G & Beyond',
    icon: 'mdi-signal-5g',
    color: 'red',
    maturity: 80,
    description: 'Conectividade ultra-rápida e baixa latência.',
    impact: 'Alto'
  },
  {
    name: 'Neuromorphic Computing',
    icon: 'mdi-brain-outline',
    color: 'pink',
    maturity: 10,
    description: 'Computação inspirada no cérebro humano.',
    impact: 'Revolucionário'
  },
  {
    name: 'Digital Twins',
    icon: 'mdi-content-copy',
    color: 'indigo',
    maturity: 40,
    description: 'Réplicas digitais de sistemas físicos.',
    impact: 'Médio-Alto'
  }
])
</script>

<style scoped>
.technology-knowledge {
  color: white;
}

.knowledge-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(33, 150, 243, 0.2);
  backdrop-filter: blur(10px);
  height: 100%;
}

.knowledge-panels {
  background: transparent !important;
}

.stack-card,
.emerging-card {
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  height: 100%;
}

.stack-card:hover,
.emerging-card:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  border-color: rgba(0, 188, 212, 0.3);
  transform: translateY(-4px);
}

.stack-level {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stack-description,
.tech-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  line-height: 1.4;
}

.tech-name {
  font-size: 0.95rem;
  font-weight: 600;
}

.maturity-level {
  margin-bottom: 1rem;
}

.maturity-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.25rem;
  display: block;
}

.impact-level {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
}
</style>