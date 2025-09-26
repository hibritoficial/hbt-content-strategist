<template>
  <div class="knowledge-overview">
    <!-- Knowledge Stats -->
    <v-row class="mb-6">
      <v-col cols="12" md="3" v-for="stat in knowledgeStats" :key="stat.title">
        <v-card class="stat-card" elevation="0">
          <v-card-text class="text-center">
            <v-icon :color="stat.color" size="48" class="mb-3">{{ stat.icon }}</v-icon>
            <div class="stat-number">{{ stat.value }}</div>
            <div class="stat-title">{{ stat.title }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Knowledge Map -->
    <v-card class="knowledge-map-card mb-6" elevation="0">
      <v-card-title class="d-flex align-center">
        <v-icon color="cyan" class="mr-3">mdi-map</v-icon>
        Mapa do Conhecimento HIBRIT
      </v-card-title>
      <v-card-text>
        <div class="knowledge-map">
          <div class="knowledge-node central-node" @click="selectNode('hibrit')">
            <div class="node-content">
              <v-icon size="32" color="cyan">mdi-brain</v-icon>
              <span>HIBRIT NEXUS</span>
            </div>
          </div>

          <!-- Business Nodes -->
          <div class="knowledge-node business-node" @click="selectNode('business')">
            <div class="node-content">
              <v-icon size="24" color="purple">mdi-briefcase</v-icon>
              <span>Negócios</span>
            </div>
          </div>

          <!-- Marketing Nodes -->
          <div class="knowledge-node marketing-node" @click="selectNode('marketing')">
            <div class="node-content">
              <v-icon size="24" color="orange">mdi-bullhorn</v-icon>
              <span>Marketing</span>
            </div>
          </div>

          <!-- Technology Nodes -->
          <div class="knowledge-node tech-node" @click="selectNode('technology')">
            <div class="node-content">
              <v-icon size="24" color="blue">mdi-code-tags</v-icon>
              <span>Tecnologia</span>
            </div>
          </div>

          <!-- Client Nodes -->
          <div class="knowledge-node client-node" @click="selectNode('clients')">
            <div class="node-content">
              <v-icon size="24" color="green">mdi-account-group</v-icon>
              <span>Clientes</span>
            </div>
          </div>

          <!-- Research Nodes -->
          <div class="knowledge-node research-node" @click="selectNode('research')">
            <div class="node-content">
              <v-icon size="24" color="pink">mdi-flask</v-icon>
              <span>Pesquisa</span>
            </div>
          </div>

          <!-- Connection Lines -->
          <svg class="connection-lines">
            <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="rgba(0,188,212,0.3)" stroke-width="2"/>
            <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="rgba(0,188,212,0.3)" stroke-width="2"/>
            <line x1="50%" y1="50%" x2="20%" y2="80%" stroke="rgba(0,188,212,0.3)" stroke-width="2"/>
            <line x1="50%" y1="50%" x2="80%" y2="80%" stroke="rgba(0,188,212,0.3)" stroke-width="2"/>
            <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="rgba(0,188,212,0.3)" stroke-width="2"/>
          </svg>
        </div>
      </v-card-text>
    </v-card>

    <!-- Recent Knowledge Updates -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="recent-updates-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="cyan" class="mr-3">mdi-update</v-icon>
            Atualizações Recentes
          </v-card-title>
          <v-card-text>
            <v-list class="transparent">
              <v-list-item v-for="update in recentUpdates" :key="update.id" class="update-item">
                <template #prepend>
                  <v-avatar :color="update.color" size="32">
                    <v-icon color="white" size="16">{{ update.icon }}</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title>{{ update.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ update.description }}</v-list-item-subtitle>
                <template #append>
                  <v-chip size="small" color="cyan" variant="outlined">{{ update.time }}</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="quick-access-card" elevation="0">
          <v-card-title class="d-flex align-center">
            <v-icon color="cyan" class="mr-3">mdi-lightning-bolt</v-icon>
            Acesso Rápido
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" v-for="access in quickAccess" :key="access.title">
                <v-btn
                  :color="access.color"
                  variant="outlined"
                  block
                  class="quick-access-btn"
                  @click="navigateTo(access.route)"
                >
                  <v-icon class="mr-2">{{ access.icon }}</v-icon>
                  {{ access.title }}
                </v-btn>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const knowledgeStats = ref([
  { title: 'Áreas de Conhecimento', value: '6', icon: 'mdi-brain', color: 'cyan' },
  { title: 'Segmentos de Clientes', value: '12+', icon: 'mdi-account-group', color: 'green' },
  { title: 'Frameworks Ativos', value: '24', icon: 'mdi-cog', color: 'orange' },
  { title: 'Conexões Neurais', value: '∞', icon: 'mdi-network', color: 'purple' }
])

const recentUpdates = ref([
  {
    id: 1,
    title: 'Marketing de Influência 2024',
    description: 'Novas estratégias e métricas avançadas',
    time: '2h',
    icon: 'mdi-star',
    color: 'orange'
  },
  {
    id: 2,
    title: 'IA Conversacional',
    description: 'Implementação de ChatGPT-4 em funis',
    time: '4h',
    icon: 'mdi-robot',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Segmento Saúde & Bem-estar',
    description: 'Compliance e regulamentações atualizadas',
    time: '1d',
    icon: 'mdi-heart-pulse',
    color: 'red'
  },
  {
    id: 4,
    title: 'Growth Hacking Avançado',
    description: 'Técnicas de viralização orgânica',
    time: '2d',
    icon: 'mdi-trending-up',
    color: 'green'
  }
])

const quickAccess = ref([
  { title: 'Funis', icon: 'mdi-filter-variant', color: 'purple', route: '/funnels' },
  { title: 'Neural Engine', icon: 'mdi-flask', color: 'green', route: '/labs/neural-research-engine' },
  { title: 'Biblioteca', icon: 'mdi-library', color: 'blue', route: '/library' },
  { title: 'Métricas', icon: 'mdi-chart-line', color: 'orange', route: '/metrics' }
])

const selectNode = (nodeType) => {
  console.log('Selected node:', nodeType)
}

const navigateTo = (route) => {
  router.push(route)
}
</script>

<style scoped>
.knowledge-overview {
  color: white;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(0, 188, 212, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(0, 188, 212, 0.4);
  transform: translateY(-4px);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #00bcd4;
}

.stat-title {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.knowledge-map-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(0, 188, 212, 0.2);
  backdrop-filter: blur(10px);
}

.knowledge-map {
  position: relative;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.knowledge-node {
  position: absolute;
  width: 120px;
  height: 80px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.central-node {
  background: rgba(0, 188, 212, 0.2);
  border: 2px solid rgba(0, 188, 212, 0.5);
  width: 160px;
  height: 100px;
}

.business-node {
  background: rgba(156, 39, 176, 0.2);
  border: 2px solid rgba(156, 39, 176, 0.5);
  top: 10%;
  left: 10%;
}

.marketing-node {
  background: rgba(255, 152, 0, 0.2);
  border: 2px solid rgba(255, 152, 0, 0.5);
  top: 10%;
  right: 10%;
}

.tech-node {
  background: rgba(33, 150, 243, 0.2);
  border: 2px solid rgba(33, 150, 243, 0.5);
  bottom: 10%;
  left: 10%;
}

.client-node {
  background: rgba(76, 175, 80, 0.2);
  border: 2px solid rgba(76, 175, 80, 0.5);
  bottom: 10%;
  right: 10%;
}

.research-node {
  background: rgba(233, 30, 99, 0.2);
  border: 2px solid rgba(233, 30, 99, 0.5);
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
}

.knowledge-node:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(0, 188, 212, 0.3);
}

.node-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.node-content span {
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

.recent-updates-card,
.quick-access-card {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(0, 188, 212, 0.2);
  backdrop-filter: blur(10px);
}

.update-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
}

.update-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.quick-access-btn {
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  background: rgba(255, 255, 255, 0.05) !important;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.quick-access-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  transform: translateY(-2px);
}
</style>