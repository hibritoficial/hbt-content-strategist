<template>
  <div class="experiment-page">
    <div class="experiment-header">
      <div class="breadcrumb-nav">
        <button class="breadcrumb-btn" @click="$router.push('/labs')">
          <v-icon size="16">mdi-arrow-left</v-icon>
          HIBRIT Labs
        </button>
        <v-icon size="12" color="#9ca3af">mdi-chevron-right</v-icon>
        <span class="breadcrumb-current">Analytics Overview</span>
      </div>
      
      <div class="experiment-info">
        <h1>📊 Analytics Overview - Métricas Avançadas</h1>
        <div class="header-actions">
          <button class="knowledge-btn" @click="scrollToKnowledge">
            <v-icon size="16">mdi-brain</v-icon>
            Sistema 360°
          </button>
          <button class="export-btn" @click="exportInterface">
            <v-icon size="16">mdi-camera</v-icon>
            Exportar Interface
          </button>
        </div>
      </div>
    </div>

    <div id="interface-capture" class="interface-content">
      <v-container fluid class="pa-4 bg-surface-950 text-white">
        <div class="text-center py-16">
          <v-icon size="64" color="#00ff9d">mdi-chart-line</v-icon>
          <h2 class="text-h4 mt-4 mb-2">Analytics Overview</h2>
          <p class="text-white text-opacity-70">Interface de analytics em desenvolvimento</p>
        </div>
      </v-container>
    </div>

    <KnowledgeSystem experiment-type="analytics-overview" experiment-name="Analytics Overview" />
    <OtherExperiments current-experiment="analytics-overview" />
  </div>
</template>

<script setup>
import OtherExperiments from '@/components/OtherExperiments.vue'
import KnowledgeSystem from '@/components/KnowledgeSystem.vue'

const exportInterface = () => {
  console.log('Export Analytics Overview')
}

const scrollToKnowledge = () => {
  document.querySelector('.knowledge-system').scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.experiment-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
}

.experiment-header {
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 255, 157, 0.2);
  padding: 24px 40px;
}

.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.breadcrumb-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(0, 255, 157, 0.1);
  border: 1px solid rgba(0, 255, 157, 0.3);
  border-radius: 6px;
  color: #00ff9d;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.breadcrumb-btn:hover {
  background: rgba(0, 255, 157, 0.2);
}

.breadcrumb-current {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.experiment-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.experiment-info h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.knowledge-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.knowledge-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4);
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.export-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
}

.interface-content {
  background: #0b1211;
  min-height: 60vh;
}

.bg-surface-950 { 
  background: #0b1211; 
}


</style>