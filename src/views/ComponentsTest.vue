<template>
  <div class="components-test">
    <!-- Test Header -->
    <div class="test-header">
      <div class="header-content">
        <div class="breadcrumb-nav">
          <button class="breadcrumb-btn" @click="$router.push('/labs')">
            <v-icon size="16">mdi-arrow-left</v-icon>
            HIBRIT Labs
          </button>
          <v-icon size="12" color="#9ca3af">mdi-chevron-right</v-icon>
          <span class="breadcrumb-item">Visual Impact Lab</span>
          <v-icon size="12" color="#9ca3af">mdi-chevron-right</v-icon>
          <span class="breadcrumb-current">Testes de Componentes</span>
        </div>
        
        <div class="test-info">
          <div class="test-title">
            <h1>🧪 Laboratório de Componentes Visuais</h1>
            <div class="test-status">
              <div class="status-dot"></div>
              <span>Testes Ativos</span>
            </div>
          </div>
          <button class="open-interface-btn" @click="$router.push('/labs/cxa-dashboard')">
            <v-icon size="16">mdi-monitor-dashboard</v-icon>
            <div class="btn-content">
              <span class="btn-title">ABRIR INTERFACE</span>
              <span class="btn-subtitle">Visualizar dashboard CXA completo em tela dedicada</span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Test Content -->
    <div class="test-content">
      <v-container fluid class="pa-6">
        <!-- Test Categories -->
        <div class="test-categories">
          <div class="category-header">
            <h2>Categorias de Teste</h2>
            <p>Componentes organizados por funcionalidade e complexidade</p>
          </div>
          
          <div class="categories-grid">
            <!-- Buttons & Actions -->
            <div class="category-card">
              <div class="category-icon">
                <v-icon size="32" color="#10b981">mdi-cursor-pointer</v-icon>
              </div>
              <h3>Botões & Ações</h3>
              <p>Testes de diferentes tipos de botões, estados e interações</p>
              <div class="component-samples">
                <v-btn color="primary" variant="elevated">Primary</v-btn>
                <v-btn color="success" variant="outlined">Success</v-btn>
                <v-btn color="warning" variant="text">Warning</v-btn>
                <v-btn color="error" variant="tonal" size="small">Error</v-btn>
              </div>
            </div>

            <!-- Form Elements -->
            <div class="category-card">
              <div class="category-icon">
                <v-icon size="32" color="#3b82f6">mdi-form-select</v-icon>
              </div>
              <h3>Elementos de Formulário</h3>
              <p>Inputs, selects, checkboxes e validações</p>
              <div class="component-samples">
                <v-text-field 
                  label="Nome" 
                  variant="outlined" 
                  density="compact"
                  hide-details
                />
                <v-select 
                  :items="['Opção 1', 'Opção 2']" 
                  label="Selecione"
                  variant="outlined"
                  density="compact"
                  hide-details
                />
              </div>
            </div>

            <!-- Data Display -->
            <div class="category-card">
              <div class="category-icon">
                <v-icon size="32" color="#f59e0b">mdi-chart-bar</v-icon>
              </div>
              <h3>Exibição de Dados</h3>
              <p>Cards, tabelas, gráficos e métricas</p>
              <div class="component-samples">
                <v-card class="sample-card" variant="outlined">
                  <v-card-text>
                    <div class="metric-display">
                      <div class="metric-value">R$ 12.4K</div>
                      <div class="metric-label">Receita</div>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
            </div>

            <!-- Navigation -->
            <div class="category-card">
              <div class="category-icon">
                <v-icon size="32" color="#8b5cf6">mdi-navigation</v-icon>
              </div>
              <h3>Navegação</h3>
              <p>Menus, breadcrumbs, tabs e paginação</p>
              <div class="component-samples">
                <v-chip-group>
                  <v-chip>Tab 1</v-chip>
                  <v-chip>Tab 2</v-chip>
                  <v-chip>Tab 3</v-chip>
                </v-chip-group>
              </div>
            </div>

            <!-- Feedback -->
            <div class="category-card">
              <div class="category-icon">
                <v-icon size="32" color="#ef4444">mdi-bell</v-icon>
              </div>
              <h3>Feedback & Alertas</h3>
              <p>Notificações, tooltips, modais e confirmações</p>
              <div class="component-samples">
                <v-alert type="success" variant="tonal" density="compact">
                  Operação realizada com sucesso!
                </v-alert>
              </div>
            </div>

            <!-- Layout -->
            <div class="category-card">
              <div class="category-icon">
                <v-icon size="32" color="#06b6d4">mdi-view-grid</v-icon>
              </div>
              <h3>Layout & Estrutura</h3>
              <p>Grids, containers, divisores e espaçamentos</p>
              <div class="component-samples">
                <div class="layout-sample">
                  <div class="sample-box">Grid 1</div>
                  <div class="sample-box">Grid 2</div>
                  <div class="sample-box">Grid 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Testing Area -->
        <div class="detailed-tests">
          <div class="section-header">
            <h2>Área de Testes Detalhados</h2>
            <p>Componentes em diferentes estados e configurações</p>
          </div>

          <!-- Button States Test -->
          <div class="test-section">
            <h3>Estados de Botões</h3>
            <div class="test-grid">
              <div class="test-item">
                <h4>Variantes</h4>
                <div class="button-group">
                  <v-btn color="primary" variant="elevated">Elevated</v-btn>
                  <v-btn color="primary" variant="flat">Flat</v-btn>
                  <v-btn color="primary" variant="outlined">Outlined</v-btn>
                  <v-btn color="primary" variant="text">Text</v-btn>
                  <v-btn color="primary" variant="tonal">Tonal</v-btn>
                </div>
              </div>

              <div class="test-item">
                <h4>Tamanhos</h4>
                <div class="button-group">
                  <v-btn size="x-small">X-Small</v-btn>
                  <v-btn size="small">Small</v-btn>
                  <v-btn size="default">Default</v-btn>
                  <v-btn size="large">Large</v-btn>
                  <v-btn size="x-large">X-Large</v-btn>
                </div>
              </div>

              <div class="test-item">
                <h4>Estados</h4>
                <div class="button-group">
                  <v-btn color="primary">Normal</v-btn>
                  <v-btn color="primary" :loading="true">Loading</v-btn>
                  <v-btn color="primary" disabled>Disabled</v-btn>
                  <v-btn color="success">Success</v-btn>
                  <v-btn color="error">Error</v-btn>
                </div>
              </div>

              <div class="test-item">
                <h4>Com Ícones</h4>
                <div class="button-group">
                  <v-btn color="primary" prepend-icon="mdi-plus">Adicionar</v-btn>
                  <v-btn color="success" append-icon="mdi-check">Confirmar</v-btn>
                  <v-btn color="error" prepend-icon="mdi-delete">Excluir</v-btn>
                  <v-btn icon="mdi-heart" color="pink"></v-btn>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Elements Test -->
          <div class="test-section">
            <h3>Elementos de Formulário</h3>
            <div class="form-test-grid">
              <div class="form-column">
                <h4>Text Fields</h4>
                <v-text-field label="Nome completo" variant="outlined" />
                <v-text-field label="Email" type="email" variant="filled" />
                <v-text-field label="Senha" type="password" variant="underlined" />
                <v-text-field label="Disabled" disabled variant="outlined" />
                <v-text-field 
                  label="Com erro" 
                  variant="outlined" 
                  error-messages="Campo obrigatório"
                />
              </div>

              <div class="form-column">
                <h4>Selects & Choices</h4>
                <v-select 
                  :items="['Opção 1', 'Opção 2', 'Opção 3']"
                  label="Select simples"
                  variant="outlined"
                />
                <v-autocomplete
                  :items="['Auto 1', 'Auto 2', 'Auto 3']"
                  label="Autocomplete"
                  variant="outlined"
                />
                <v-checkbox label="Checkbox normal" />
                <v-switch label="Switch toggle" />
                <v-radio-group>
                  <v-radio label="Opção A" value="a" />
                  <v-radio label="Opção B" value="b" />
                </v-radio-group>
              </div>

              <div class="form-column">
                <h4>Advanced Inputs</h4>
                <v-textarea 
                  label="Comentários"
                  variant="outlined"
                  rows="3"
                />
                <v-file-input 
                  label="Upload arquivo"
                  variant="outlined"
                />
                <v-slider 
                  label="Slider"
                  :min="0"
                  :max="100"
                  :step="10"
                />
                <v-range-slider 
                  label="Range"
                  :min="0"
                  :max="100"
                />
              </div>
            </div>
          </div>

          <!-- Data Display Test -->
          <div class="test-section">
            <h3>Exibição de Dados</h3>
            <div class="data-test-grid">
              <!-- Cards -->
              <div class="test-group">
                <h4>Cards & Métricas</h4>
                <div class="cards-row">
                  <v-card class="metric-card" variant="outlined">
                    <v-card-text>
                      <div class="metric-display">
                        <div class="metric-value success">R$ 45.2K</div>
                        <div class="metric-label">Receita</div>
                        <div class="metric-change positive">+12.5%</div>
                      </div>
                    </v-card-text>
                  </v-card>

                  <v-card class="metric-card" variant="tonal" color="warning">
                    <v-card-text>
                      <div class="metric-display">
                        <div class="metric-value">247</div>
                        <div class="metric-label">Leads</div>
                        <div class="metric-change negative">-3.2%</div>
                      </div>
                    </v-card-text>
                  </v-card>

                  <v-card class="metric-card" variant="elevated">
                    <v-card-text>
                      <div class="metric-display">
                        <div class="metric-value info">89.3%</div>
                        <div class="metric-label">Conversão</div>
                        <div class="metric-change neutral">0.0%</div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </div>

              <!-- Progress & Loading -->
              <div class="test-group">
                <h4>Progress & Loading</h4>
                <v-progress-linear 
                  :model-value="75" 
                  color="success" 
                  height="8"
                  rounded
                />
                <v-progress-circular 
                  :model-value="60" 
                  color="primary"
                  size="64"
                />
                <v-progress-linear 
                  indeterminate 
                  color="warning"
                />
              </div>

              <!-- Chips & Badges -->
              <div class="test-group">
                <h4>Chips & Badges</h4>
                <div class="chips-row">
                  <v-chip color="success" variant="elevated">Ativo</v-chip>
                  <v-chip color="warning" variant="tonal">Pendente</v-chip>
                  <v-chip color="error" variant="outlined">Erro</v-chip>
                  <v-chip closable>Removível</v-chip>
                  <v-chip prepend-icon="mdi-account">Com Ícone</v-chip>
                </div>
              </div>
            </div>
          </div>

          <!-- Table Test -->
          <div class="test-section">
            <h3>Tabelas</h3>
            <v-table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Status</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tableData" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>
                    <v-chip 
                      :color="item.status === 'Ativo' ? 'success' : item.status === 'Pendente' ? 'warning' : 'error'"
                      size="small"
                      variant="tonal"
                    >
                      {{ item.status }}
                    </v-chip>
                  </td>
                  <td>{{ item.value }}</td>
                  <td>{{ item.date }}</td>
                  <td>
                    <v-btn icon="mdi-pencil" size="small" variant="text" />
                    <v-btn icon="mdi-delete" size="small" variant="text" color="error" />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  { id: 1, name: 'Cliente A', status: 'Ativo', value: 'R$ 1.250', date: '15/03/2024' },
  { id: 2, name: 'Cliente B', status: 'Pendente', value: 'R$ 890', date: '14/03/2024' },
  { id: 3, name: 'Cliente C', status: 'Inativo', value: 'R$ 2.100', date: '13/03/2024' },
  { id: 4, name: 'Cliente D', status: 'Ativo', value: 'R$ 750', date: '12/03/2024' },
])
</script>

<style scoped>
.components-test {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
}

/* Test Header */
.test-header {
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 255, 157, 0.2);
  padding: 24px 40px;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
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

.breadcrumb-item {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.breadcrumb-current {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.test-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.test-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.test-title h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.test-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  font-size: 0.8rem;
  color: #10b981;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.open-interface-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 255, 157, 0.3);
}

.open-interface-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 255, 157, 0.4);
}

.btn-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.btn-title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-subtitle {
  font-size: 0.75rem;
  opacity: 0.9;
  font-weight: 400;
}

/* Test Content */
.test-content {
  background: #0b1211;
  min-height: calc(100vh - 200px);
}

/* Categories */
.test-categories {
  margin-bottom: 48px;
}

.category-header {
  text-align: center;
  margin-bottom: 32px;
}

.category-header h2 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #00ff9d, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.category-header p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.category-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.category-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(0, 255, 157, 0.3);
  transform: translateY(-4px);
}

.category-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.category-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: white;
}

.category-card p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.component-samples {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.sample-card {
  min-width: 120px;
}

.metric-display {
  text-align: center;
}

.metric-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #00ff9d;
  margin-bottom: 2px;
}

.metric-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.layout-sample {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.sample-box {
  background: rgba(0, 255, 157, 0.2);
  border: 1px solid rgba(0, 255, 157, 0.3);
  border-radius: 4px;
  padding: 8px;
  text-align: center;
  font-size: 0.7rem;
  color: #00ff9d;
}

/* Detailed Tests */
.detailed-tests {
  margin-top: 48px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #00ff9d;
}

.section-header p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.test-section {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
}

.test-section h3 {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 12px;
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.test-item h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: rgba(255, 255, 255, 0.9);
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* Form Tests */
.form-test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.form-column h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 8px;
}

/* Data Tests */
.data-test-grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.test-group h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: rgba(255, 255, 255, 0.9);
}

.cards-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.metric-card {
  min-height: 100px;
}

.metric-value.success {
  color: #10b981;
}

.metric-value.info {
  color: #3b82f6;
}

.metric-change {
  font-size: 0.8rem;
  font-weight: 600;
  margin-top: 4px;
}

.metric-change.positive {
  color: #10b981;
}

.metric-change.negative {
  color: #ef4444;
}

.metric-change.neutral {
  color: rgba(255, 255, 255, 0.6);
}

.chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive */
@media (max-width: 768px) {
  .test-info {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .open-interface-btn {
    align-self: stretch;
    justify-content: center;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .test-grid {
    grid-template-columns: 1fr;
  }
  
  .form-test-grid {
    grid-template-columns: 1fr;
  }
  
  .cards-row {
    grid-template-columns: 1fr;
  }
}
</style>