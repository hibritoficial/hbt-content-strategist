<template>
  <div class="knowledge-nexus">
    <!-- Header Futurista -->
    <div class="nexus-header">
      <div class="header-content">
        <div class="header-left">
          <div class="nexus-logo">
            <v-icon size="48" color="cyan">mdi-brain</v-icon>
            <div class="logo-pulse"></div>
          </div>
          <div class="header-text">
            <h1 class="nexus-title">HIBRIT KNOWLEDGE NEXUS</h1>
            <p class="nexus-subtitle">Centro Avançado de Inteligência Organizacional</p>
          </div>
        </div>
        <div class="header-right">
          <v-btn
            color="cyan"
            prepend-icon="mdi-flask-outline"
            variant="outlined"
            @click="connectToNeuralEngine"
            class="neural-connect-btn"
          >
            Conectar à Neural Research Engine
          </v-btn>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <v-tabs
      v-model="activeTab"
      color="cyan"
      class="nexus-tabs"
      show-arrows
    >
      <v-tab value="overview">Visão Geral</v-tab>
      <v-tab value="business">Negócios & Estratégia</v-tab>
      <v-tab value="marketing">Marketing Avançado</v-tab>
      <v-tab value="technology">Tecnologia & IA</v-tab>
      <v-tab value="clients">Segmentos de Clientes</v-tab>
      <v-tab value="research">Pesquisa & Desenvolvimento</v-tab>
    </v-tabs>

    <!-- Content Area -->
    <v-container fluid class="nexus-content">
      <v-window v-model="activeTab">
        <!-- Overview -->
        <v-window-item value="overview">
          <KnowledgeOverview />
        </v-window-item>

        <!-- Business & Strategy -->
        <v-window-item value="business">
          <BusinessKnowledge />
        </v-window-item>

        <!-- Marketing -->
        <v-window-item value="marketing">
          <MarketingKnowledge />
        </v-window-item>

        <!-- Technology -->
        <v-window-item value="technology">
          <TechnologyKnowledge />
        </v-window-item>

        <!-- Client Segments -->
        <v-window-item value="clients">
          <ClientSegments />
        </v-window-item>

        <!-- Research -->
        <v-window-item value="research">
          <ResearchKnowledge />
        </v-window-item>
      </v-window>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import KnowledgeOverview from '@/components/knowledge/KnowledgeOverview.vue'
import BusinessKnowledge from '@/components/knowledge/BusinessKnowledge.vue'
import MarketingKnowledge from '@/components/knowledge/MarketingKnowledge.vue'
import TechnologyKnowledge from '@/components/knowledge/TechnologyKnowledge.vue'
import ClientSegments from '@/components/knowledge/ClientSegments.vue'
import ResearchKnowledge from '@/components/knowledge/ResearchKnowledge.vue'

const router = useRouter()
const activeTab = ref('overview')

const connectToNeuralEngine = () => {
  router.push('/labs/neural-research-engine')
}
</script>

<style scoped>
.knowledge-nexus {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
}

.nexus-header {
  background: linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(0, 151, 167, 0.2) 100%);
  border-bottom: 1px solid rgba(0, 188, 212, 0.3);
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
}

.nexus-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(0,188,212,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nexus-logo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-pulse {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 2px solid rgba(0, 188, 212, 0.3);
  border-radius: 50%;
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.nexus-title {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #00bcd4, #4fc3f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: 2px;
}

.nexus-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.5rem 0 0 0;
  font-weight: 300;
}

.neural-connect-btn {
  border: 2px solid rgba(0, 188, 212, 0.5) !important;
  background: rgba(0, 188, 212, 0.1) !important;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.neural-connect-btn:hover {
  background: rgba(0, 188, 212, 0.2) !important;
  box-shadow: 0 0 20px rgba(0, 188, 212, 0.4);
  transform: translateY(-2px);
}

.nexus-tabs {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 188, 212, 0.2);
}

.nexus-content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* Scrollbar customization */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #00bcd4, #0097a7);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #4fc3f7, #00bcd4);
}
</style>