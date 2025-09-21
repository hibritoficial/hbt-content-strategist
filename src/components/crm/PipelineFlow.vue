<template>
  <div class="pipeline-flow">
    <!-- Flow Header -->
    <div class="flow-header">
      <h2 class="flow-title">🌊 Pipeline Visual</h2>
      <p class="flow-subtitle">Acompanhe o fluxo natural das suas vendas</p>
    </div>

    <!-- Pipeline Stages -->
    <div class="pipeline-stages">
      <div 
        v-for="(stage, index) in pipelineStages" 
        :key="stage.id"
        class="stage-column"
      >
        <!-- Stage Header -->
        <div class="stage-header" :style="{ background: stage.gradient }">
          <div class="stage-info">
            <div class="stage-icon">{{ stage.icon }}</div>
            <div class="stage-details">
              <h3 class="stage-name">{{ stage.name }}</h3>
              <p class="stage-value">R$ {{ stage.totalValue.toLocaleString() }}</p>
            </div>
          </div>
          <div class="stage-count">{{ stage.deals.length }}</div>
        </div>

        <!-- Deals Container -->
        <div class="deals-container">
          <div 
            v-for="deal in stage.deals" 
            :key="deal.id"
            class="deal-card"
            @click="selectDeal(deal)"
          >
            <!-- Deal Header -->
            <div class="deal-header">
              <div class="deal-avatar">{{ deal.client.charAt(0) }}</div>
              <div class="deal-info">
                <h4 class="deal-title">{{ deal.title }}</h4>
                <p class="deal-client">{{ deal.client }}</p>
              </div>
            </div>

            <!-- Deal Value -->
            <div class="deal-value">
              <span class="value-amount">R$ {{ deal.value.toLocaleString() }}</span>
              <div class="deal-progress">
                <div class="progress-bar" :style="{ width: deal.probability + '%' }"></div>
              </div>
              <span class="probability">{{ deal.probability }}% chance</span>
            </div>

            <!-- Deal Meta -->
            <div class="deal-meta">
              <div class="meta-item">
                <span class="meta-icon">📅</span>
                <span class="meta-text">{{ deal.daysInStage }}d no estágio</span>
              </div>
              <div class="meta-item">
                <span class="meta-icon">🎯</span>
                <span class="meta-text">{{ deal.source }}</span>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="deal-actions">
              <v-btn 
                size="small" 
                variant="text" 
                icon="mdi-phone"
                @click.stop="callClient(deal)"
              />
              <v-btn 
                size="small" 
                variant="text" 
                icon="mdi-email"
                @click.stop="emailClient(deal)"
              />
              <v-btn 
                size="small" 
                variant="text" 
                icon="mdi-calendar"
                @click.stop="scheduleCall(deal)"
              />
            </div>
          </div>

          <!-- Add Deal Button -->
          <div class="add-deal-btn" @click="addDealToStage(stage.id)">
            <v-icon>mdi-plus</v-icon>
            <span>Adicionar</span>
          </div>
        </div>

        <!-- Flow Arrow -->
        <div v-if="index < pipelineStages.length - 1" class="flow-connector">
          <div class="connector-line"></div>
          <div class="connector-arrow">→</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pipelineStages = ref([
  {
    id: 'leads',
    name: 'Novos Leads',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    totalValue: 98000,
    deals: [
      {
        id: 1,
        title: 'Website Institucional',
        client: 'TechCorp',
        value: 25000,
        probability: 20,
        daysInStage: 3,
        source: 'Website'
      },
      {
        id: 2,
        title: 'E-commerce Fashion',
        client: 'ModaStyle',
        value: 45000,
        probability: 15,
        daysInStage: 7,
        source: 'Instagram'
      },
      {
        id: 3,
        title: 'App Delivery',
        client: 'FoodExpress',
        value: 28000,
        probability: 25,
        daysInStage: 2,
        source: 'Indicação'
      }
    ]
  },
  {
    id: 'qualified',
    name: 'Qualificados',
    icon: '✨',
    gradient: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    totalValue: 120000,
    deals: [
      {
        id: 4,
        title: 'Sistema CRM',
        client: 'SalesForce Pro',
        value: 75000,
        probability: 60,
        daysInStage: 12,
        source: 'LinkedIn'
      },
      {
        id: 5,
        title: 'Plataforma EAD',
        client: 'EduTech',
        value: 45000,
        probability: 45,
        daysInStage: 8,
        source: 'Email'
      }
    ]
  },
  {
    id: 'proposal',
    name: 'Proposta Enviada',
    icon: '📋',
    gradient: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)',
    totalValue: 85000,
    deals: [
      {
        id: 6,
        title: 'Marketplace B2B',
        client: 'ConnectBiz',
        value: 85000,
        probability: 75,
        daysInStage: 5,
        source: 'Indicação'
      }
    ]
  },
  {
    id: 'negotiation',
    name: 'Negociação',
    icon: '🤝',
    gradient: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
    totalValue: 60000,
    deals: [
      {
        id: 7,
        title: 'App Fintech',
        client: 'MoneyFlow',
        value: 60000,
        probability: 85,
        daysInStage: 18,
        source: 'Website'
      }
    ]
  },
  {
    id: 'closed',
    name: 'Fechados',
    icon: '🎉',
    gradient: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
    totalValue: 42000,
    deals: [
      {
        id: 8,
        title: 'Landing Page',
        client: 'StartupX',
        value: 15000,
        probability: 100,
        daysInStage: 1,
        source: 'Instagram'
      },
      {
        id: 9,
        title: 'Identidade Visual',
        client: 'BrandCo',
        value: 27000,
        probability: 100,
        daysInStage: 2,
        source: 'Indicação'
      }
    ]
  }
])

const selectDeal = (deal) => {
  console.log('Deal selecionado:', deal)
}

const callClient = (deal) => {
  console.log('Ligar para:', deal.client)
}

const emailClient = (deal) => {
  console.log('Email para:', deal.client)
}

const scheduleCall = (deal) => {
  console.log('Agendar call com:', deal.client)
}

const addDealToStage = (stageId) => {
  console.log('Adicionar deal ao estágio:', stageId)
}
</script>

<style scoped>
.pipeline-flow {
  padding: 24px 0;
}

.flow-header {
  text-align: center;
  margin-bottom: 32px;
}

.flow-title {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.flow-subtitle {
  color: #64748b;
  font-size: 16px;
  margin: 0;
}

.pipeline-stages {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding: 16px 0;
  min-height: 600px;
}

.stage-column {
  flex: 1;
  min-width: 320px;
  position: relative;
}

.stage-header {
  padding: 20px;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: none;
}

.stage-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stage-icon {
  font-size: 20px;
}

.stage-name {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.stage-value {
  font-size: 14px;
  color: #64748b;
  font-weight: 600;
  margin: 0;
}

.stage-count {
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  padding: 8px 12px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  min-width: 32px;
  text-align: center;
}

.deals-container {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0 0 16px 16px;
  border-top: none;
  padding: 16px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.deal-card {
  background: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.deal-card:hover {
  background: white;
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.deal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.deal-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.deal-title {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 2px 0;
}

.deal-client {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

.deal-value {
  margin-bottom: 12px;
}

.value-amount {
  font-size: 16px;
  font-weight: 800;
  color: #059669;
  display: block;
  margin-bottom: 6px;
}

.deal-progress {
  background: #f1f5f9;
  height: 4px;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  transition: width 0.3s ease;
}

.probability {
  font-size: 11px;
  color: #64748b;
  font-weight: 600;
}

.deal-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-icon {
  font-size: 12px;
}

.meta-text {
  font-size: 11px;
  color: #64748b;
  font-weight: 500;
}

.deal-actions {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.deal-card:hover .deal-actions {
  opacity: 1;
}

.add-deal-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;
}

.add-deal-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

.flow-connector {
  position: absolute;
  right: -24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.connector-line {
  width: 20px;
  height: 2px;
  background: #cbd5e1;
}

.connector-arrow {
  color: #cbd5e1;
  font-size: 16px;
  position: absolute;
  right: -8px;
  top: -8px;
}
</style>