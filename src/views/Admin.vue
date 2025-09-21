<template>
  <div class="admin-container" v-if="isHibrit">
    <!-- Header Minimalista -->
    <div class="admin-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="admin-title">Administração</h1>
          <p class="admin-subtitle">Controle operacional da plataforma</p>
        </div>
        <div class="header-right">
          <div class="status-indicator">
            <div class="status-dot active"></div>
            <span>Sistema Operacional</span>
          </div>
          <div class="help-button" @click="docsStore.openTopic('admin-overview')">
            <v-icon size="16">mdi-information-outline</v-icon>
            <span>Guia</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Pills -->
    <div class="nav-pills">
      <button 
        v-for="tab in tabs" 
        :key="tab.value"
        :class="['nav-pill', { active: activeTab === tab.value }]"
        @click="activeTab = tab.value"
      >
        <v-icon size="18">{{ tab.icon }}</v-icon>
        {{ tab.label }}
      </button>
    </div>

    <!-- Content Area -->
    <div class="admin-content">
      <!-- Analytics Dashboard -->
      <div v-if="activeTab === 'analytics'" class="analytics-view">
        <div class="analytics-grid">
          <div class="analytics-card">
            <h4>Total de Brands</h4>
            <div class="big-number">{{ brands.length }}</div>
          </div>
          <div class="analytics-card">
            <h4>Alertas Ativos</h4>
            <div class="big-number critical">{{ totalAlerts }}</div>
          </div>
          <div class="analytics-card">
            <h4>Usuários Ativos</h4>
            <div class="big-number">{{ brands.reduce((sum, b) => sum + b.users_count, 0) }}</div>
          </div>
          <div class="analytics-card">
            <h4>Conteúdos Totais</h4>
            <div class="big-number">{{ brands.reduce((sum, b) => sum + b.content_count, 0) }}</div>
          </div>
        </div>
      </div>

      <!-- Alertas View -->
      <div v-if="activeTab === 'alerts'" class="alerts-view">
        <div class="alerts-summary">
          <h3>Todos os Alertas ({{ totalAlerts }})</h3>
          <div class="alerts-list">
            <div v-for="alert in allAlerts" :key="alert.id" class="alert-item" :class="{ critical: alert.critical }">
              <div class="alert-icon">
                <v-icon size="16" :color="alert.critical ? '#ef4444' : '#f59e0b'">
                  {{ alert.critical ? 'mdi-alert' : 'mdi-information' }}
                </v-icon>
              </div>
              <div class="alert-content">
                <div class="alert-header">
                  <span class="alert-type">{{ alert.type }}</span>
                  <span class="alert-brand">{{ alert.brandName }}</span>
                </div>
                <p class="alert-message">{{ alert.message }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sistema View -->
      <div v-if="activeTab === 'system'" class="system-view">
        <div class="system-info">
          <h3>Informações do Sistema</h3>
          <div class="system-cards">
            <div class="system-card">
              <h4>Status Geral</h4>
              <div class="status-indicator active">
                <div class="status-dot"></div>
                <span>Operacional</span>
              </div>
            </div>
            <div class="system-card">
              <h4>Último Backup</h4>
              <p>Hoje às 03:00</p>
            </div>
            <div class="system-card">
              <h4>Versão</h4>
              <p>v2.1.4</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Hierarquia: Brands → Workspaces → Users -->
      <div v-if="activeTab === 'hierarchy'" class="hierarchy-view">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb-nav" v-if="drillLevel !== 'brands'">
          <button class="breadcrumb-btn" @click="goBack">
            <v-icon size="16">mdi-arrow-left</v-icon>
            Voltar
          </button>
          <div class="breadcrumb-path">
            <span class="breadcrumb-item">Brands</span>
            <v-icon size="12" color="#9ca3af">mdi-chevron-right</v-icon>
            <span class="breadcrumb-item" v-if="selectedBrand">{{ selectedBrand.name }}</span>
            <template v-if="drillLevel === 'users'">
              <v-icon size="12" color="#9ca3af">mdi-chevron-right</v-icon>
              <span class="breadcrumb-item">{{ selectedWorkspace.name }}</span>
            </template>
          </div>
        </div>

        <!-- Brands Level -->
        <div v-if="drillLevel === 'brands'" class="hierarchy-level">
          <div class="level-header">
            <h3>Brands (Clientes)</h3>
            <div class="header-actions">
              <!-- View Controls -->
              <div class="view-controls">
                <div class="view-toggle">
                  <button 
                    class="toggle-btn" 
                    :class="{ active: viewMode === 'expanded' }"
                    @click="changeViewMode('expanded')"
                    title="Visualização Expandida"
                  >
                    <v-icon size="16">mdi-view-grid</v-icon>
                  </button>
                  <button 
                    class="toggle-btn" 
                    :class="{ active: viewMode === 'compact' }"
                    @click="changeViewMode('compact')"
                    title="Visualização Compacta"
                  >
                    <v-icon size="16">mdi-view-list</v-icon>
                  </button>
                </div>
                
                <div class="sort-control">
                  <select v-model="sortBy" class="sort-select">
                    <option value="priority">Prioridade</option>
                    <option value="name">Nome A-Z</option>
                    <option value="health">Health Score</option>
                    <option value="activity">Atividade</option>
                  </select>
                </div>
              </div>
              
              <div class="action-buttons">
                <button class="action-btn secondary" @click="showAlertsModal">
                  <v-icon size="16">mdi-alert-circle</v-icon>
                  Alertas ({{ totalAlerts }})
                </button>
                <button class="action-btn secondary" @click="refreshData">
                  <v-icon size="16">mdi-refresh</v-icon>
                  Atualizar
                </button>
                <button class="action-btn primary" @click="createBrand">
                  <v-icon size="16">mdi-plus</v-icon>
                  Novo Brand
                </button>
              </div>
            </div>
          </div>
          
          <!-- Brands Grid com Drag & Drop -->
          <div class="brands-container" :class="viewMode">
            <div 
              v-for="(brand, index) in sortedBrands" 
              :key="brand.id" 
              class="brand-card" 
              :class="{ 
                editing: editingItem?.id === brand.id, 
                simulated: brand.isSimulated,
                favorite: favorites.has(brand.id),
                compact: viewMode === 'compact'
              }"
              :draggable="sortBy === 'priority' && !editingItem"
              @dragstart="onDragStart($event, index)"
              @dragover="onDragOver($event)"
              @drop="onDrop($event, index)"
              @click="selectBrand(brand)"
            >
              <!-- Drag Handle -->
              <div v-if="sortBy === 'priority' && !editingItem" class="drag-handle" @mousedown.stop>
                <v-icon size="12" color="#9ca3af">mdi-drag-vertical</v-icon>
              </div>
              
              <!-- Favorite Star -->
              <button 
                class="favorite-btn" 
                :class="{ active: favorites.has(brand.id) }"
                @click.stop="toggleFavorite(brand.id)"
                title="Favoritar"
              >
                <v-icon size="16">{{ favorites.has(brand.id) ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
              </button>
              
              <!-- Edit Mode Overlay -->
              <div v-if="editingItem?.id === brand.id" class="edit-overlay" @click.stop>
                <div class="edit-form-compact">
                  <div class="edit-header-compact">
                    <h4>Editando</h4>
                    <div class="edit-actions-compact">
                      <button class="edit-btn save" @click="saveEdit">
                        <v-icon size="14">mdi-check</v-icon>
                      </button>
                      <button class="edit-btn cancel" @click="cancelEdit">
                        <v-icon size="14">mdi-close</v-icon>
                      </button>
                    </div>
                  </div>
                  <div class="edit-fields-compact">
                    <input v-model="editingItem.name" placeholder="Nome" class="edit-input-compact" />
                    <input v-model="editingItem.slug" placeholder="Slug" class="edit-input-compact" />
                    <div class="edit-row">
                      <input v-model="editingItem.color" type="color" class="edit-color-compact" />
                      <label class="edit-checkbox-compact">
                        <input v-model="editingItem.active" type="checkbox" />
                        <span>Ativo</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Brand Card Content -->
              <div class="brand-content">
                <div class="brand-header">
                  <div class="brand-name-section">
                    <div class="brand-name">{{ viewMode === 'compact' ? (brand.acronym || brand.name.substring(0, 3).toUpperCase()) : brand.name }}</div>
                    <div v-if="brand.alerts && brand.alerts.length > 0" class="alert-chip" :class="{ critical: brand.alerts.some(a => a.critical) }" @click.stop="showAlerts(brand)">
                      <v-icon size="10">{{ brand.alerts.some(a => a.critical) ? 'mdi-alert' : 'mdi-information' }}</v-icon>
                      <span class="alert-count">{{ brand.alerts.length }}</span>
                      <span v-if="viewMode === 'expanded'" class="alert-label">alertas</span>
                    </div>
                  </div>
                  <div class="brand-indicators">
                    <div class="brand-actions-hover">
                      <button class="action-icon-mini" @click.stop="startEdit(brand)" title="Editar">
                        <v-icon size="14">mdi-pencil</v-icon>
                      </button>
                      <button class="action-icon-mini delete" @click.stop="deleteItem(brand)" title="Excluir">
                        <v-icon size="14">mdi-delete</v-icon>
                      </button>
                    </div>
                    <div class="health-score" :class="getHealthScoreClass(brand.health_score)">
                      {{ brand.health_score }}%
                    </div>
                    <div class="brand-status" :class="brand.status"></div>
                  </div>
                </div>
                
                <div v-if="viewMode === 'expanded'" class="brand-performance">
                  <div class="perf-compact">
                    <v-icon size="12" color="#9ca3af">mdi-trending-up</v-icon>
                    <span class="perf-value">{{ brand.conversion_rate }}%</span>
                    <span class="perf-label">conversão</span>
                  </div>
                  <div class="perf-compact">
                    <v-icon size="12" color="#9ca3af">mdi-clock-outline</v-icon>
                    <span class="perf-value">{{ brand.last_access }}</span>
                    <span class="perf-label">último acesso</span>
                  </div>
                </div>
                
                <div class="brand-metrics" :class="{ compact: viewMode === 'compact' }">
                  <div class="metric-compact">
                    <span class="metric-number" :class="{ 'big-blue': viewMode === 'expanded' }">{{ brand.funnels_count }}</span>
                    <div class="metric-label-group">
                      <v-icon size="12" color="#d1d5db">mdi-filter-variant</v-icon>
                      <span class="metric-label">funis</span>
                    </div>
                  </div>
                  <div class="metric-compact">
                    <span class="metric-number" :class="{ 'big-blue': viewMode === 'expanded' }">{{ brand.content_count }}</span>
                    <div class="metric-label-group">
                      <v-icon size="12" color="#d1d5db">mdi-file-document</v-icon>
                      <span class="metric-label">conteúdos</span>
                    </div>
                  </div>
                  <div class="metric-compact">
                    <span class="metric-number" :class="{ 'big-blue': viewMode === 'expanded' }">{{ brand.leads_count }}</span>
                    <div class="metric-label-group">
                      <v-icon size="12" color="#d1d5db">mdi-account-multiple</v-icon>
                      <span class="metric-label">leads</span>
                    </div>
                  </div>
                </div>
                
                <div v-if="viewMode === 'expanded'" class="brand-links">
                  <button class="link-btn" @click.stop="goToPipeline(brand)">
                    <v-icon size="14">mdi-view-column</v-icon>
                    <span class="btn-number">{{ brand.pipeline_count }}</span>
                    <span class="btn-label">Pipeline</span>
                  </button>
                  <button class="link-btn" @click.stop="goToLibrary(brand)">
                    <v-icon size="14">mdi-library</v-icon>
                    <span class="btn-number">{{ brand.library_count }}</span>
                    <span class="btn-label">Biblioteca</span>
                  </button>
                  <button class="link-btn drill-btn" @click.stop="goToWorkspaces(brand)">
                    <v-icon size="14">mdi-folder-multiple</v-icon>
                    <span class="btn-number">{{ brand.workspaces_count }}</span>
                    <span class="btn-label">Workspaces</span>
                    <v-icon size="12" class="drill-icon">mdi-chevron-right</v-icon>
                  </button>
                  <button class="link-btn" @click.stop="goToUsers(brand)">
                    <v-icon size="14">mdi-account-group</v-icon>
                    <span class="btn-number">{{ brand.users_count }}</span>
                    <span class="btn-label">Usuários</span>
                  </button>
                </div>
                
                <!-- Compact Mode Quick Actions -->
                <div v-if="viewMode === 'compact'" class="compact-actions">
                  <button class="compact-btn" @click.stop="goToWorkspaces(brand)" title="Workspaces">
                    <v-icon size="16">mdi-folder-multiple</v-icon>
                  </button>
                  <button class="compact-btn" @click.stop="goToPipeline(brand)" title="Pipeline">
                    <v-icon size="16">mdi-view-column</v-icon>
                  </button>
                  <button class="compact-btn" @click.stop="goToLibrary(brand)" title="Biblioteca">
                    <v-icon size="16">mdi-library</v-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Workspaces Level -->
        <div v-if="drillLevel === 'workspaces'" class="hierarchy-level">
          <div class="level-header">
            <h3>Workspaces - {{ selectedBrand.name }}</h3>
            <div class="header-actions">
              <button class="action-btn primary" @click="createWorkspace">
                <v-icon size="16">mdi-plus</v-icon>
                Novo Workspace
              </button>
            </div>
          </div>
          
          <div class="data-grid">
            <div v-for="workspace in workspaces" :key="workspace.id" class="data-card" :class="{ editing: editingItem?.id === workspace.id }">
              <!-- Edit Mode -->
              <div v-if="editingItem?.id === workspace.id" class="edit-form">
                <div class="edit-header">
                  <h4>Editando Workspace</h4>
                  <div class="edit-actions">
                    <button class="edit-btn save" @click="saveEdit">
                      <v-icon size="14">mdi-check</v-icon>
                    </button>
                    <button class="edit-btn cancel" @click="cancelEdit">
                      <v-icon size="14">mdi-close</v-icon>
                    </button>
                  </div>
                </div>
                <div class="edit-fields">
                  <input v-model="editingItem.name" placeholder="Nome" class="edit-input" />
                  <input v-model="editingItem.slug" placeholder="Slug" class="edit-input" />
                </div>
              </div>
              
              <!-- View Mode -->
              <div v-else class="card-content">
                <div class="card-header">
                  <div class="card-title-section">
                    <div class="card-title">{{ workspace.name }}</div>
                  </div>
                  <div class="card-actions">
                    <button class="action-icon" @click.stop="startEdit(workspace)" title="Editar">
                      <v-icon size="16">mdi-pencil</v-icon>
                    </button>
                    <button class="action-icon delete" @click.stop="deleteItem(workspace)" title="Excluir">
                      <v-icon size="16">mdi-delete</v-icon>
                    </button>
                  </div>
                </div>
                
                <div class="card-meta">
                  <div class="meta-item">
                    <span class="meta-label">Slug:</span>
                    <span class="meta-value">{{ workspace.slug }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Criado:</span>
                    <span class="meta-value">{{ new Date(workspace.created_at).toLocaleDateString() }}</span>
                  </div>
                </div>
                
                <div class="card-stats">
                  <div class="stat-item" @click.stop="goToUsers(workspace)">
                    <v-icon size="16" color="#6b7280">mdi-account-group</v-icon>
                    <span class="stat-number">{{ workspace.members_count || 0 }}</span>
                    <span class="stat-label">membros</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Users Level -->
        <div v-if="drillLevel === 'users'" class="hierarchy-level">
          <div class="level-header">
            <h3>Usuários - {{ selectedWorkspace.name }}</h3>
            <div class="header-actions">
              <button class="action-btn primary" @click="inviteUser">
                <v-icon size="16">mdi-account-plus</v-icon>
                Convidar Usuário
              </button>
            </div>
          </div>
          
          <div class="data-grid">
            <div v-for="user in users" :key="user.id" class="data-card" :class="{ editing: editingItem?.id === user.id }">
              <!-- Edit Mode -->
              <div v-if="editingItem?.id === user.id" class="edit-form">
                <div class="edit-header">
                  <h4>Editando Usuário</h4>
                  <div class="edit-actions">
                    <button class="edit-btn save" @click="saveEdit">
                      <v-icon size="14">mdi-check</v-icon>
                    </button>
                    <button class="edit-btn cancel" @click="cancelEdit">
                      <v-icon size="14">mdi-close</v-icon>
                    </button>
                  </div>
                </div>
                <div class="edit-fields">
                  <select v-model="editingItem.role" class="edit-select">
                    <option value="owner">Owner</option>
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
              </div>
              
              <!-- View Mode -->
              <div v-else class="card-content">
                <div class="card-header">
                  <div class="card-title-section">
                    <div class="card-title">{{ user.email }}</div>
                    <div class="role-chip" :class="user.role">{{ user.role }}</div>
                  </div>
                  <div class="card-actions">
                    <button class="action-icon" @click.stop="startEdit(user)" title="Editar">
                      <v-icon size="16">mdi-pencil</v-icon>
                    </button>
                    <button class="action-icon delete" @click.stop="deleteItem(user)" title="Remover">
                      <v-icon size="16">mdi-account-minus</v-icon>
                    </button>
                  </div>
                </div>
                
                <div class="card-meta">
                  <div class="meta-item">
                    <span class="meta-label">Adicionado:</span>
                    <span class="meta-value">{{ new Date(user.created_at).toLocaleDateString() }}</span>
                  </div>
                  <div class="meta-item">
                    <span class="meta-label">Status:</span>
                    <div class="status-indicator active">
                      <div class="status-dot"></div>
                      <span>Ativo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog Novo Brand -->
    <v-dialog v-model="newBrandDialog" max-width="500" class="brand-dialog-wrapper">
      <v-card class="brand-dialog" elevation="24">
        <div class="dialog-header">
          <div class="header-icon">
            <v-icon size="20" color="white">mdi-domain</v-icon>
          </div>
          <div class="header-text">
            <h3>Novo Brand</h3>
            <p>Crie um brand com workspace integrado</p>
          </div>
        </div>
        <div class="dialog-content">
          <v-form @submit.prevent="createNewBrand">
            <v-text-field
              v-model="newBrand.name"
              label="Nome do Brand"
              variant="outlined"
              density="compact"
              class="mb-3"
              required
              @input="generateSlug"
            />
            
            <v-text-field
              v-model="newBrand.slug"
              label="Identificador (slug)"
              variant="outlined"
              density="compact"
              class="mb-3"
              hint="Usado para URLs e identificação"
            />
            
            <div class="acronym-section mb-3">
              <label class="acronym-label">Sigla</label>
              <div class="acronym-suggestions">
                <v-chip
                  v-for="suggestion in acronymSuggestions"
                  :key="suggestion.value"
                  :color="newBrand.acronym === suggestion.value ? 'primary' : 'default'"
                  :variant="newBrand.acronym === suggestion.value ? 'flat' : 'outlined'"
                  size="small"
                  class="mr-2 mb-2"
                  @click="newBrand.acronym = suggestion.value"
                >
                  {{ suggestion.value }}
                  <v-tooltip activator="parent" location="top">
                    {{ suggestion.method }}
                  </v-tooltip>
                </v-chip>
              </div>
              <v-text-field
                v-model="newBrand.acronym"
                variant="outlined"
                density="compact"
                placeholder="Ou digite uma sigla personalizada"
                maxlength="3"
                hide-details
              />
            </div>
            
            <div class="color-section mb-3">
              <label class="color-label">Cor do Brand</label>
              <div class="color-grid">
                <v-tooltip 
                  v-for="colorObj in brandColors" 
                  :key="colorObj.color"
                  location="top"
                  :text="colorObj.name"
                >
                  <template v-slot:activator="{ props }">
                    <div 
                      v-bind="props"
                      class="color-option"
                      :class="{ selected: newBrand.color === colorObj.color }"
                      :style="{ backgroundColor: colorObj.color }"
                      @click="newBrand.color = colorObj.color"
                    />
                  </template>
                </v-tooltip>
                <div class="color-picker-wrapper">
                  <input 
                    type="color" 
                    v-model="newBrand.color" 
                    class="color-picker"
                  />
                  <div class="color-picker-icon">
                    <v-icon size="14" color="#6b7280">mdi-palette</v-icon>
                  </div>
                </div>
              </div>
            </div>
            
            <v-text-field
              v-model="newBrand.contactEmail"
              label="Email do contato (opcional)"
              variant="outlined"
              density="compact"
              type="email"
              hint="Será convidado para acessar o workspace"
            />
          </v-form>
        </div>
        <div class="dialog-actions">
          <v-btn 
            variant="text" 
            @click="newBrandDialog = false"
            class="cancel-btn"
          >
            Cancelar
          </v-btn>
          <v-btn 
            :color="newBrand.color" 
            @click="createNewBrand"
            :loading="newBrand.loading"
            :disabled="!newBrand.name.trim()"
            class="create-btn"
          >
            <v-icon class="mr-2">mdi-plus</v-icon>
            Criar Brand + Workspace
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Modal de Alertas -->
    <v-dialog v-model="alertsModal" max-width="600" class="alerts-dialog-wrapper">
      <v-card class="alerts-dialog" elevation="24">
        <div class="dialog-header">
          <div class="header-icon">
            <v-icon size="20" color="white">mdi-alert-circle</v-icon>
          </div>
          <div class="header-text">
            <h3>Alertas do Sistema</h3>
            <p>{{ selectedAlerts.length }} alertas encontrados</p>
          </div>
        </div>
        <div class="alerts-content">
          <div v-if="selectedAlerts.length === 0" class="no-alerts">
            <v-icon size="48" color="#10b981">mdi-check-circle</v-icon>
            <p>Nenhum alerta ativo</p>
          </div>
          <div v-else class="alerts-list">
            <div v-for="alert in selectedAlerts" :key="alert.id" class="alert-item" :class="{ critical: alert.critical }">
              <div class="alert-icon">
                <v-icon size="16" :color="alert.critical ? '#ef4444' : '#f59e0b'">
                  {{ alert.critical ? 'mdi-alert' : 'mdi-information' }}
                </v-icon>
              </div>
              <div class="alert-content">
                <div class="alert-header">
                  <span class="alert-type">{{ alert.type }}</span>
                  <span v-if="alert.brandName" class="alert-brand">{{ alert.brandName }}</span>
                </div>
                <p class="alert-message">{{ alert.message }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="dialog-actions">
          <v-btn variant="text" @click="alertsModal = false" class="cancel-btn">
            Fechar
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- Vuetify Snackbar -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      location="top"
    >
      {{ snackbar.text }}
    </v-snackbar>
  </div>
  
  <div v-else class="access-denied">
    <v-icon size="64" color="error">mdi-lock</v-icon>
    <h2 class="mt-4">Acesso Negado</h2>
    <p>Esta área é restrita ao staff da Hibrit.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
import { useDocsStore } from '@/stores/docs'

const authStore = useAuthStore()
const docsStore = useDocsStore()

const activeTab = ref('hierarchy')
const selectedBrand = ref(null)
const selectedWorkspace = ref(null)
const drillLevel = ref('brands') // 'brands' | 'workspaces' | 'users'
const editingItem = ref(null)
const viewMode = ref('expanded') // 'compact' | 'expanded'
const sortBy = ref('priority') // 'priority' | 'name' | 'health' | 'activity'
const favorites = ref(new Set())
const brands = ref([])
const workspaces = ref([])
const users = ref([])

// Tabs configuration
const tabs = [
  { value: 'hierarchy', label: 'Hierarquia', icon: 'mdi-file-tree' },
  { value: 'analytics', label: 'Analytics', icon: 'mdi-chart-line' },
  { value: 'alerts', label: 'Alertas', icon: 'mdi-alert-circle' },
  { value: 'system', label: 'Sistema', icon: 'mdi-cog' }
]

const snackbar = ref({
  show: false,
  text: '',
  color: 'success',
  timeout: 3000
})

const newBrandDialog = ref(false)
const alertsModal = ref(false)
const selectedAlerts = ref([])
const newBrand = ref({
  name: '',
  slug: '',
  acronym: '',
  color: '#1976D2',
  contactEmail: '',
  loading: false
})

const brandColors = [
  { color: '#1976D2', name: 'Blue' },
  { color: '#388E3C', name: 'Green' },
  { color: '#7B1FA2', name: 'Purple' },
  { color: '#F57C00', name: 'Orange' },
  { color: '#D32F2F', name: 'Red' },
  { color: '#C2185B', name: 'Pink' },
  { color: '#303F9F', name: 'Indigo' },
  { color: '#00796B', name: 'Teal' },
  { color: '#FFA000', name: 'Amber' },
  { color: '#455A64', name: 'Blue Grey' },
  { color: '#689F38', name: 'Light Green' },
  { color: '#512DA8', name: 'Deep Purple' }
]

const isHibrit = computed(() => {
  const userData = authStore.user?.user_metadata || authStore.user?.raw_user_meta_data || {}
  return userData.org === 'hibrit' || userData.role === 'hibrit_staff'
})

const totalAlerts = computed(() => {
  return brands.value?.reduce((total, brand) => total + (brand.alerts?.length || 0), 0) || 0
})

const allAlerts = computed(() => {
  const alerts = []
  brands.value?.forEach(brand => {
    brand.alerts?.forEach(alert => {
      alerts.push({
        ...alert,
        brandName: brand.name,
        brandId: brand.id
      })
    })
  })
  return alerts.sort((a, b) => b.critical - a.critical)
})

const selectBrand = (brand) => {
  selectedBrand.value = brand
}

const createBrand = () => {
  newBrandDialog.value = true
}

const goToPipeline = (brand) => {
  window.open(`/pipeline?brand=${brand.id}`, '_blank')
}

const goToLibrary = (brand) => {
  window.open(`/library?brand=${brand.id}`, '_blank')
}

const goToWorkspaces = (brand) => {
  selectedBrand.value = brand
  drillLevel.value = 'workspaces'
  loadWorkspaces(brand.id)
}

const goToUsers = (brand) => {
  // Para brands, vai direto para usuários do primeiro workspace
  if (drillLevel.value === 'brands') {
    selectedBrand.value = brand
    drillLevel.value = 'users'
    loadUsersFromBrand(brand.id)
  } else {
    // Para workspaces, carrega usuários do workspace específico
    selectedWorkspace.value = brand
    drillLevel.value = 'users'
    loadUsers(brand.id)
  }
}

const loadUsersFromBrand = async (brandId) => {
  // Simula carregamento de usuários do brand
  users.value = [
    {
      id: 1,
      email: 'admin@exemplo.com',
      full_name: 'Administrador',
      role: 'owner',
      created_at: new Date().toISOString()
    }
  ]
}

// Drag & Drop Functions
let draggedIndex = null

const onDragStart = (event, index) => {
  draggedIndex = index
  event.dataTransfer.effectAllowed = 'move'
}

const onDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

const onDrop = (event, dropIndex) => {
  event.preventDefault()
  if (draggedIndex !== null && draggedIndex !== dropIndex) {
    const draggedBrand = brands.value[draggedIndex]
    brands.value.splice(draggedIndex, 1)
    brands.value.splice(dropIndex, 0, draggedBrand)
    
    // Update priority order
    brands.value.forEach((brand, index) => {
      brand.priority = index
    })
    
    showSnackbar('Ordem atualizada', 'success', 2000)
  }
  draggedIndex = null
}

// Favorites Functions
const toggleFavorite = (brandId) => {
  if (favorites.value.has(brandId)) {
    favorites.value.delete(brandId)
    showSnackbar('Removido dos favoritos', 'info', 2000)
  } else {
    favorites.value.add(brandId)
    showSnackbar('Adicionado aos favoritos', 'success', 2000)
  }
  // Persist to localStorage
  localStorage.setItem('admin-favorites', JSON.stringify([...favorites.value]))
}

const changeViewMode = (mode) => {
  if (editingItem.value) {
    editingItem.value = null
  }
  viewMode.value = mode
}

// Computed for sorted brands
const sortedBrands = computed(() => {
  if (!brands.value) return []
  
  let sorted = [...brands.value]
  
  // Always show favorites first
  sorted.sort((a, b) => {
    const aFav = favorites.value.has(a.id)
    const bFav = favorites.value.has(b.id)
    if (aFav && !bFav) return -1
    if (!aFav && bFav) return 1
    
    // Then sort by selected criteria
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'health':
        return (b.health_score || 0) - (a.health_score || 0)
      case 'activity':
        return new Date(b.last_access || 0) - new Date(a.last_access || 0)
      case 'priority':
      default:
        return (a.priority || 0) - (b.priority || 0)
    }
  })
  
  return sorted
})

const goBack = () => {
  if (drillLevel.value === 'users') {
    drillLevel.value = 'workspaces'
    editingItem.value = null
  } else if (drillLevel.value === 'workspaces') {
    drillLevel.value = 'brands'
    selectedBrand.value = null
    editingItem.value = null
  }
}

const startEdit = (item) => {
  editingItem.value = { ...item }
}

const cancelEdit = () => {
  editingItem.value = null
}

const saveEdit = async () => {
  if (!editingItem.value) return
  
  try {
    let table, data
    
    if (drillLevel.value === 'brands') {
      table = 'brands'
      data = {
        name: editingItem.value.name,
        slug: editingItem.value.slug,
        color: editingItem.value.color,
        active: editingItem.value.active
      }
    } else if (drillLevel.value === 'workspaces') {
      table = 'workspaces'
      data = {
        name: editingItem.value.name,
        slug: editingItem.value.slug
      }
    } else if (drillLevel.value === 'users') {
      table = 'workspace_members'
      data = {
        role: editingItem.value.role
      }
    }
    
    const { error } = await supabase
      .from(table)
      .update(data)
      .eq('id', editingItem.value.id)
    
    if (error) throw error
    
    // Atualizar lista local
    const targetArray = drillLevel.value === 'brands' ? brands.value : 
                       drillLevel.value === 'workspaces' ? workspaces.value : users.value
    
    const index = targetArray.findIndex(item => item.id === editingItem.value.id)
    if (index !== -1) {
      targetArray[index] = { ...targetArray[index], ...editingItem.value }
    }
    
    showSnackbar('Item atualizado com sucesso', 'success')
    editingItem.value = null
  } catch (error) {
    showSnackbar('Erro ao salvar: ' + error.message, 'error')
  }
}

const deleteItem = async (item) => {
  if (!confirm(`Tem certeza que deseja excluir "${item.name || item.email}"?`)) return
  
  try {
    let table = drillLevel.value === 'brands' ? 'brands' : 
               drillLevel.value === 'workspaces' ? 'workspaces' : 'workspace_members'
    
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', item.id)
    
    if (error) throw error
    
    // Remover da lista local
    const targetArray = drillLevel.value === 'brands' ? brands.value : 
                       drillLevel.value === 'workspaces' ? workspaces.value : users.value
    
    const index = targetArray.findIndex(i => i.id === item.id)
    if (index !== -1) {
      targetArray.splice(index, 1)
    }
    
    showSnackbar('Item excluído com sucesso', 'success')
  } catch (error) {
    showSnackbar('Erro ao excluir: ' + error.message, 'error')
  }
}

const showAlerts = (brand) => {
  selectedAlerts.value = brand.alerts.map(alert => ({
    ...alert,
    brandName: brand.name,
    brandId: brand.id
  }))
  alertsModal.value = true
}

const showAlertsModal = () => {
  selectedAlerts.value = allAlerts.value
  alertsModal.value = true
}

const refreshData = () => {
  loadBrands()
  showSnackbar('Dados atualizados com sucesso', 'success')
}

const getHealthScoreClass = (score) => {
  if (score >= 90) return 'excellent'
  if (score >= 75) return 'good'
  if (score >= 60) return 'warning'
  return 'critical'
}

const showSnackbar = (text, color = 'success', timeout = 3000) => {
  snackbar.value = { show: true, text, color, timeout }
}

const acronymSuggestions = ref([])

const generateSlug = () => {
  if (newBrand.value.name) {
    newBrand.value.slug = newBrand.value.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    
    acronymSuggestions.value = generateAcronymSuggestions(newBrand.value.name)
    newBrand.value.acronym = acronymSuggestions.value[0]?.value || ''
  }
}

const generateAcronymSuggestions = (name) => {
  if (!name) return []
  
  const cleanName = name.trim()
  const commonWords = ['de', 'da', 'do', 'das', 'dos', 'e', 'para', 'com', 'em']
  const words = cleanName
    .split(/\s+/)
    .filter(word => word.length > 0)
    .filter(word => !commonWords.includes(word.toLowerCase()))
  
  const suggestions = []
  
  // 1. Três primeiras letras do primeiro nome
  if (words[0]) {
    suggestions.push({
      value: words[0].substring(0, 3).toUpperCase(),
      method: 'Três primeiras letras'
    })
  }
  
  // 2. Primeira letra de cada palavra (sempre 3 letras)
  if (words.length >= 2) {
    let initials = words.slice(0, 3).map(w => w[0]).join('')
    
    // Se tem menos de 3 palavras, completa com segunda letra da primeira palavra
    if (initials.length < 3) {
      initials += words[0].substring(1, 3 - initials.length + 1)
    }
    
    initials = initials.substring(0, 3).toUpperCase()
    suggestions.push({
      value: initials,
      method: 'Iniciais das palavras'
    })
  }
  
  // 3. Consoantes do primeiro nome (sempre 3 letras)
  if (words[0]) {
    let consonants = words[0]
      .toLowerCase()
      .replace(/[aeiouáéíóúâêîôûàèìòùãõ]/g, '')
    
    // Se tem menos de 3 consoantes, completa com letras originais
    if (consonants.length < 3) {
      consonants = words[0].substring(0, 3)
    }
    
    consonants = consonants.substring(0, 3).toUpperCase()
    suggestions.push({
      value: consonants,
      method: 'Consoantes principais'
    })
  }
  
  // 4. Padrão híbrido (baseado nos exemplos: ASA, OCS, AGR, BIM)
  if (words.length >= 2) {
    const hybrid = (words[0][0] + words[0][1] + words[1][0]).toUpperCase()
    suggestions.push({
      value: hybrid,
      method: 'Padrão híbrido'
    })
  }
  
  // Remove duplicatas
  const unique = suggestions.filter((item, index, self) => 
    index === self.findIndex(t => t.value === item.value)
  )
  
  return unique
}



const createWorkspace = () => {
  // TODO: Implementar criação de workspace
  showSnackbar('Funcionalidade em desenvolvimento', 'info')
}

const inviteUser = () => {
  // TODO: Implementar convite de usuário
  showSnackbar('Funcionalidade em desenvolvimento', 'info')
}

const loadWorkspaces = async (brandId) => {
  try {
    const { data, error } = await supabase
      .from('workspaces')
      .select(`
        *,
        workspace_members(count)
      `)
      .eq('brands.id', brandId)
    
    if (error) throw error
    
    workspaces.value = data.map(ws => ({
      ...ws,
      members_count: ws.workspace_members?.[0]?.count || 0
    }))
  } catch (error) {
    console.error('Erro ao carregar workspaces:', error)
    // Dados simulados para desenvolvimento
    workspaces.value = [
      {
        id: 1,
        name: `${selectedBrand.value.name} - Workspace Principal`,
        slug: `${selectedBrand.value.slug}-main`,
        created_at: new Date().toISOString(),
        members_count: 2
      }
    ]
  }
}

const loadUsers = async (workspaceId) => {
  try {
    const { data, error } = await supabase
      .from('workspace_members')
      .select(`
        *,
        profiles(email, full_name)
      `)
      .eq('workspace_id', workspaceId)
    
    if (error) throw error
    
    users.value = data.map(member => ({
      id: member.id,
      email: member.profiles?.email || 'email@exemplo.com',
      full_name: member.profiles?.full_name || 'Usuário',
      role: member.role,
      created_at: member.created_at
    }))
  } catch (error) {
    console.error('Erro ao carregar usuários:', error)
    // Dados simulados para desenvolvimento
    users.value = [
      {
        id: 1,
        email: 'admin@exemplo.com',
        full_name: 'Administrador',
        role: 'owner',
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        email: 'user@exemplo.com',
        full_name: 'Usuário',
        role: 'member',
        created_at: new Date().toISOString()
      }
    ]
  }
}

const createNewBrand = async () => {
  if (!newBrand.value.name.trim()) {
    showSnackbar('Nome do brand é obrigatório', 'error')
    return
  }
  
  newBrand.value.loading = true
  try {
    // Verificar autenticação
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      throw new Error('Usuário não autenticado')
    }

    // Criar workspace primeiro (slug único)
    const uniqueSlug = `${newBrand.value.slug.trim()}-${Date.now()}`
    const { data: workspaceData, error: workspaceError } = await supabase
      .from('workspaces')
      .insert([
        {
          name: `${newBrand.value.name} - Workspace`,
          slug: uniqueSlug
        }
      ])
      .select()
      .single()
    
    if (workspaceError) throw workspaceError
    
    // Criar brand dentro do workspace (color e active têm defaults)
    const { data: brandData, error: brandError } = await supabase
      .from('brands')
      .insert([
        {
          name: newBrand.value.name.trim(),
          slug: newBrand.value.slug.trim(),
          workspace_id: workspaceData.id,
          color: newBrand.value.color
        }
      ])
      .select()
      .single()
    
    if (brandError) throw brandError
    
    // Adicionar usuário ao workspace
    const { error: memberError } = await supabase
      .from('workspace_members')
      .insert([
        {
          workspace_id: workspaceData.id,
          user_id: user.id,
          role: 'owner'
        }
      ])
    
    if (memberError) throw memberError
    
    // Adicionar à lista local (dados reais)
    const processedBrand = {
      ...brandData,
      acronym: newBrand.value.acronym.trim(),
      status: brandData.active ? 'active' : 'inactive',
      workspaces_count: 1,
      users_count: 1,
      content_count: 0,
      funnels_count: 0,
      leads_count: 0,
      pipeline_count: 0,
      library_count: 0,
      health_score: 100,
      conversion_rate: '0.0',
      last_access: 'agora',
      alerts: []
    }
    brands.value = brands.value || []
    brands.value.unshift(processedBrand)
    
    showSnackbar(`Brand "${newBrand.value.name}" (${newBrand.value.acronym}) criado com sucesso!`, 'success')
    newBrandDialog.value = false
    
    // Reset form
    newBrand.value = {
      name: '',
      slug: '',
      acronym: '',
      color: '#1976D2',
      contactEmail: '',
      loading: false
    }
  } catch (error) {
    showSnackbar('Erro ao criar brand: ' + error.message, 'error')
  } finally {
    newBrand.value.loading = false
  }
}

const loadBrands = async () => {
  try {
    // Buscar brands dos workspaces do usuário logado
    if (!authStore.user?.id) {
      brands.value = getSimulatedBrands()
      return
    }

    const { data: realBrands, error } = await supabase
      .from('brands')
      .select(`
        *,
        workspaces!inner(
          id,
          name,
          workspace_members!inner(user_id)
        )
      `)
      .eq('workspaces.workspace_members.user_id', authStore.user.id)
    
    if (error) throw error

    // Combinar brands reais com simulados se necessário
    let allBrands = realBrands || []
    
    // Se não há brands reais, usar simulados
    if (allBrands.length === 0) {
      allBrands = getSimulatedBrands().map(b => ({ ...b, fromDatabase: false }))
    }

    // Processar todos os brands
    const processedBrands = allBrands.map(brand => {
      // Se já é um brand simulado processado, retornar como está
      if (brand.status && brand.workspaces_count !== undefined) {
        return brand
      }
      // Calcular último acesso baseado na criação do brand
      const brandDate = new Date(brand.created_at)
      const daysSinceCreation = Math.floor((Date.now() - brandDate) / (1000 * 60 * 60 * 24))
      const last_access = daysSinceCreation === 0 ? 'hoje' : 
                         daysSinceCreation === 1 ? '1d atrás' : 
                         daysSinceCreation < 7 ? `${daysSinceCreation}d atrás` : 
                         daysSinceCreation < 14 ? '1 semana atrás' : '2+ semanas atrás'
      
      return {
        ...brand,
        status: brand.active !== false ? 'active' : 'inactive',
        workspaces_count: Math.floor(Math.random() * 3) + 1,
        users_count: Math.floor(Math.random() * 8) + 1,
        content_count: Math.floor(Math.random() * 200) + 50,
        funnels_count: Math.floor(Math.random() * 10) + 2,
        leads_count: Math.floor(Math.random() * 1000) + 100,
        pipeline_count: Math.floor(Math.random() * 30) + 5,
        library_count: Math.floor(Math.random() * 50) + 10,
        health_score: Math.floor(Math.random() * 40) + 60,
        conversion_rate: (Math.random() * 20 + 10).toFixed(1),
        last_access,
        alerts: getSimulatedAlerts(brand)
      }
    })

    brands.value = processedBrands

    brands.value = processedBrands
  } catch (error) {
    console.error('Erro ao carregar brands:', error)
    // Em caso de erro, usar dados simulados
    brands.value = getSimulatedBrands()
  }
}

const getSimulatedBrands = () => {
  return [
    {
      id: 1,
      name: 'Asa Mentoria',
      acronym: 'ASA',
      status: 'active',
      workspaces_count: 2,
      users_count: 5,
      content_count: 247,
      funnels_count: 8,
      leads_count: 1247,
      pipeline_count: 23,
      library_count: 45,
      health_score: 92,
      conversion_rate: 23.4,
      last_access: '2h atrás',
      alerts: [
        { id: 1, type: 'Conteúdo', message: 'Pipeline com 15 itens pendentes há mais de 7 dias', critical: false },
        { id: 2, type: 'Sistema', message: 'Backup automático falhando há 2 dias', critical: true }
      ]
    },
    {
      id: 2,
      name: 'BIMM Smart',
      acronym: 'BIM',
      status: 'active',
      workspaces_count: 1,
      users_count: 3,
      content_count: 89,
      funnels_count: 4,
      leads_count: 432,
      pipeline_count: 12,
      library_count: 28,
      health_score: 78,
      conversion_rate: 18.7,
      last_access: '1d atrás',
      alerts: [
        { id: 3, type: 'Analytics', message: 'Queda de 15% nas conversões esta semana', critical: false }
      ]
    },
    {
      id: 3,
      name: 'OCS Pré-Moldados',
      acronym: 'OCS',
      status: 'active',
      workspaces_count: 1,
      users_count: 2,
      content_count: 156,
      funnels_count: 6,
      leads_count: 823,
      pipeline_count: 18,
      library_count: 34,
      health_score: 85,
      conversion_rate: 21.2,
      last_access: '4h atrás',
      alerts: []
    },
    {
      id: 4,
      name: 'Agrolito',
      acronym: 'AGR',
      status: 'inactive',
      workspaces_count: 1,
      users_count: 1,
      content_count: 45,
      funnels_count: 2,
      leads_count: 178,
      pipeline_count: 5,
      library_count: 12,
      health_score: 45,
      conversion_rate: 8.3,
      last_access: '2 semanas atrás',
      alerts: [
        { id: 4, type: 'Sistema', message: 'Conta inativa há mais de 14 dias', critical: true },
        { id: 5, type: 'Biblioteca', message: 'Biblioteca desatualizada', critical: false }
      ]
    }
  ]
}

const getSimulatedAlerts = (brand) => {
  // Manter alertas simulados baseados no nome do brand
  const alertsMap = {
    'Asa Mentoria': [
      { id: 1, type: 'Conteúdo', message: 'Pipeline com 15 itens pendentes há mais de 7 dias', critical: false },
      { id: 2, type: 'Sistema', message: 'Backup automático falhando há 2 dias', critical: true }
    ],
    'BIMM Smart': [
      { id: 3, type: 'Analytics', message: 'Queda de 15% nas conversões esta semana', critical: false }
    ],
    'OCS Pré-Moldados': [],
    'Agrolito': [
      { id: 4, type: 'Sistema', message: 'Conta inativa há mais de 14 dias', critical: true },
      { id: 5, type: 'Biblioteca', message: 'Biblioteca desatualizada', critical: false }
    ]
  }
  
  return alertsMap[brand.name] || []
}

onMounted(async () => {
  if (isHibrit.value) {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('admin-favorites')
    if (savedFavorites) {
      favorites.value = new Set(JSON.parse(savedFavorites))
    }
    
    await loadBrands()
    
    // Add priority to brands if not exists
    brands.value.forEach((brand, index) => {
      if (brand.priority === undefined) {
        brand.priority = index
      }
    })
  }
})
</script>

<style scoped>
.admin-container {
  background: #fafafa;
  min-height: 100vh;
  margin: -24px;
}

.admin-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 32px 40px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.admin-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.admin-subtitle {
  color: #6b7280;
  margin: 4px 0 0 0;
  font-size: 0.95rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
  font-size: 0.9rem;
}

.help-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  margin-left: 20px;
  background: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 6px;
  color: #2563eb;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.help-button:hover {
  background: rgba(37, 99, 235, 0.15);
  border-color: rgba(37, 99, 235, 0.3);
  transform: translateY(-1px);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.nav-pills {
  display: flex;
  gap: 4px;
  padding: 24px 40px 0;
  max-width: 1400px;
  margin: 0 auto;
}

.nav-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-pill:hover {
  background: #f3f4f6;
  color: #374151;
}

.nav-pill.active {
  background: #2563eb;
  color: white;
}

.admin-content {
  padding: 32px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.hierarchy-level {
  margin-bottom: 40px;
}

.level-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.level-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.primary {
  background: #2563eb;
  color: white;
}

.action-btn.primary:hover {
  background: #1d4ed8;
}

/* Brands Grid Refinada (Restaurada) */
.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

/* Edit Overlay para Brands */
.edit-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 16px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-form-compact {
  width: 100%;
  max-width: 280px;
}

.edit-header-compact {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.edit-header-compact h4 {
  font-size: 0.9rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.edit-actions-compact {
  display: flex;
  gap: 4px;
}

.edit-fields-compact {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.edit-input-compact {
  padding: 8px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.85rem;
  transition: border-color 0.2s ease;
}

.edit-input-compact:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.edit-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.edit-color-compact {
  width: 40px;
  height: 32px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
}

.edit-checkbox-compact {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #374151;
  cursor: pointer;
}

.edit-checkbox-compact input {
  width: 14px;
  height: 14px;
  cursor: pointer;
}

/* Brands Container com Modos */
.brands-container {
  display: grid;
  gap: 20px;
  transition: all 0.3s ease;
}

.brands-container.expanded {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.brands-container.compact {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

/* Drag Handle */
.drag-handle {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  opacity: 0;
  transition: opacity 0.2s ease;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  z-index: 5;
}

.brand-card:hover .drag-handle {
  opacity: 1;
}

.drag-handle:active {
  cursor: grabbing;
}

/* Favorite Button */
.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #d1d5db;
  z-index: 5;
  opacity: 0;
}

.brand-card:hover .favorite-btn {
  opacity: 1;
}

.favorite-btn.active {
  opacity: 1 !important;
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.1);
  transform: scale(1.1);
}

.favorite-btn:hover {
  background: rgba(251, 191, 36, 0.1);
  color: #f59e0b;
  transform: scale(1.05);
}

/* Brand Content Wrapper */
.brand-content {
  position: relative;
  z-index: 1;
}

/* Compact Mode Adjustments */
.brand-card.compact .brand-name {
  font-size: 1rem;
}

.brand-metrics.compact {
  margin-bottom: 12px;
}

.brand-metrics.compact .metric-compact {
  gap: 2px;
}

.brand-metrics.compact .metric-number {
  font-size: 1.2rem !important;
  font-weight: 700;
}

.brand-metrics.compact .metric-label {
  font-size: 0.65rem;
}

/* Compact Actions */
.compact-actions {
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 8px;
}

.compact-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
}

.compact-btn:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  color: #374151;
  transform: translateY(-1px);
}

/* Drag States */
.brand-card[draggable="true"]:hover {
  cursor: grab;
}

.brand-card[draggable="true"]:active {
  cursor: grabbing;
  transform: rotate(2deg) scale(1.02);
  z-index: 1000;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .view-controls {
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }
  
  .brands-container.expanded {
    grid-template-columns: 1fr;
  }
  
  .brands-container.compact {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

/* Brand Actions Hover */
.brand-actions-hover {
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.2s ease;
  margin-right: 8px;
}

.brand-card:hover .brand-actions-hover {
  opacity: 1;
}

.action-icon-mini {
  width: 24px;
  height: 24px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.action-icon-mini:hover {
  background: white;
  color: #374151;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.action-icon-mini.delete:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}



/* Drill Button Enhancement */
.link-btn.drill-btn {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-color: #cbd5e1;
}

.link-btn.drill-btn:hover {
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
  border-color: #94a3b8;
}

.drill-icon {
  opacity: 0;
  transition: all 0.2s ease;
  margin-left: 2px;
}

.link-btn.drill-btn:hover .drill-icon {
  opacity: 1;
  transform: translateX(2px);
}

.brand-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  user-select: none;
}

.brand-card.compact {
  padding: 16px;
  border-radius: 8px;
}

.brand-card.favorite {
  border-color: #fbbf24;
  box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.1);
}

.brand-card.favorite::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  border-radius: 12px 12px 0 0;
}

.brand-card.compact.favorite::before {
  border-radius: 8px 8px 0 0;
}

.brand-card:hover {
  border-color: #2563eb;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
  transform: translateY(-2px);
}

.brand-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.brand-name-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
}

.alert-chip {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 2px 8px;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.65rem;
  color: #f59e0b;
}

.alert-count {
  font-size: 0.7rem;
  font-weight: 600;
}

.alert-label {
  font-size: 0.6rem;
  opacity: 0.8;
}

.alert-chip.critical {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.brand-indicators {
  display: flex;
  align-items: center;
  gap: 8px;
}

.health-score {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
}

.health-score.excellent {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.health-score.good {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.health-score.warning {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.health-score.critical {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.brand-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.brand-status.active {
  background: #10b981;
}

.brand-status.inactive {
  background: #f59e0b;
}

.brand-performance {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.perf-compact {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: #f9fafb;
  border-radius: 16px;
  font-size: 0.75rem;
}

.perf-value {
  font-weight: 600;
  color: #111827;
}

.perf-label {
  color: #9ca3af;
  font-size: 0.7rem;
}

.brand-metrics {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 4px;
}

.metric-compact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.metric-number {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
}

.metric-number.big-blue {
  font-size: 2rem;
  font-weight: 800;
  color: #2563eb;
  text-shadow: 0 1px 2px rgba(37, 99, 235, 0.1);
}

.header-actions {
  display: flex;
  gap: 20px;
  align-items: center;
}

/* View Controls */
.view-controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.view-toggle {
  display: flex;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 2px;
}

.toggle-btn {
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: #6b7280;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
}

.toggle-btn.active {
  background: white;
  color: #2563eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sort-control {
  position: relative;
}

.sort-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 0.9rem;
  cursor: pointer;
  min-width: 120px;
}

.sort-select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
}

.action-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-btn.secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.action-btn.secondary:hover {
  background: #e5e7eb;
  border-color: #d1d5db;
}

.metric-label-group {
  display: flex;
  align-items: center;
  gap: 3px;
}

.metric-label {
  font-size: 0.7rem;
  color: #9ca3af;
}

.brand-links {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.link-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  white-space: nowrap;
  width: auto;
  min-width: 40px;
}

.btn-number {
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-label {
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 0;
}

.link-btn:hover {
  background: #e2e8f0;
  border-color: #cbd5e1;
  padding-right: 12px;
}

.link-btn:hover .btn-label {
  max-width: 80px;
  opacity: 1;
  margin-left: 4px;
}

.access-denied {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  padding: 40px;
}

.brand-dialog-wrapper :deep(.v-overlay__content) {
  animation: slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.brand-dialog {
  overflow: visible;
  border-radius: 16px !important;
  background: white;
}

.dialog-header {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
  padding: 24px;
  border-radius: 16px 16px 0 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.header-text h3 {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.header-text p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: 2px 0 0 0;
}

.dialog-content {
  padding: 24px;
}

.dialog-actions {
  padding: 16px 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.cancel-btn {
  color: #6b7280 !important;
}

.create-btn {
  color: white !important;
  font-weight: 600;
  padding: 0 24px !important;
  height: 44px !important;
}

.color-section {
  margin: 16px 0;
}

.color-section .v-field {
  margin-bottom: 0;
}

.color-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  display: block;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr) auto;
  gap: 4px;
  width: 100%;
}

.color-option {
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.color-option::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.color-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-option:hover::after {
  opacity: 1;
}

.color-option.selected {
  border-color: #111827;
  transform: translateY(-2px);
  box-shadow: 0 0 0 2px rgba(17, 24, 39, 0.3), 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-option.selected::after {
  opacity: 1;
}

.color-picker-wrapper {
  position: relative;
  width: 28px;
  height: 36px;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.color-picker-wrapper:hover {
  border-color: #9ca3af;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.color-picker {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.color-picker-icon {
  pointer-events: none;
}

/* Acronym Section */
.acronym-section {
  margin: 16px 0;
}

.acronym-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  display: block;
}

.acronym-suggestions {
  margin-bottom: 12px;
  min-height: 32px;
}

/* Analytics Styles */
.analytics-view {
  margin-bottom: 40px;
}

.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.analytics-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.analytics-card h4 {
  font-size: 0.9rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.big-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2563eb;
  margin: 0;
}

.big-number.critical {
  color: #ef4444;
}

/* Alerts Modal Styles */
.alerts-dialog-wrapper :deep(.v-overlay__content) {
  animation: slideInUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.alerts-dialog {
  overflow: visible;
  border-radius: 16px !important;
  background: white;
}

.alerts-content {
  padding: 24px;
  max-height: 400px;
  overflow-y: auto;
}

.no-alerts {
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.alert-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.alert-item.critical {
  background: rgba(239, 68, 68, 0.05);
  border-color: rgba(239, 68, 68, 0.2);
}

.alert-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: rgba(245, 158, 11, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert-item.critical .alert-icon {
  background: rgba(239, 68, 68, 0.1);
}

.alert-content {
  flex: 1;
}

.alert-header {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.alert-type {
  font-size: 0.75rem;
  font-weight: 600;
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

.alert-item.critical .alert-type {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.alert-brand {
  font-size: 0.75rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
}

.alert-message {
  font-size: 0.9rem;
  color: #374151;
  margin: 0;
  line-height: 1.4;
}

/* Alerts View */
.alerts-view {
  margin-bottom: 40px;
}

.alerts-summary h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
}

/* System View */
.system-view {
  margin-bottom: 40px;
}

.system-info h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
}

.system-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.system-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
}

.system-card h4 {
  font-size: 0.9rem;
  font-weight: 500;
  color: #6b7280;
  margin: 0 0 12px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.system-card p {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}



/* Breadcrumb Navigation */
.breadcrumb-nav {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.breadcrumb-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.breadcrumb-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.breadcrumb-path {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumb-item {
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 500;
}

/* Data Grid (Para Workspaces e Users) */
.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.data-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s ease;
  position: relative;
}

.data-card:hover {
  border-color: #2563eb;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
  transform: translateY(-2px);
}

.data-card.editing {
  border-color: #f59e0b;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
  transform: translateY(-2px);
}

/* Card Content */
.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-title-section {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.3;
}

.demo-chip {
  padding: 2px 6px;
  background: rgba(245, 158, 11, 0.15);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 4px;
  font-size: 0.6rem;
  font-weight: 600;
  color: #f59e0b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.role-chip {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.role-chip.owner {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.role-chip.admin {
  background: rgba(37, 99, 235, 0.15);
  color: #2563eb;
  border: 1px solid rgba(37, 99, 235, 0.3);
}

.role-chip.member {
  background: rgba(107, 114, 128, 0.15);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.3);
}

.role-chip.viewer {
  background: rgba(156, 163, 175, 0.15);
  color: #9ca3af;
  border: 1px solid rgba(156, 163, 175, 0.3);
}

.card-actions {
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.data-card:hover .card-actions {
  opacity: 1;
}

.action-icon {
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
}

.action-icon:hover {
  background: #e5e7eb;
  color: #374151;
}

.action-icon.delete:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* Card Meta */
.card-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.meta-label {
  color: #6b7280;
  font-weight: 500;
}

.meta-value {
  color: #374151;
  font-weight: 600;
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
}

/* Card Stats */
.card-stats {
  display: flex;
  gap: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f9fafb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.85rem;
}

.stat-item:hover {
  background: #f3f4f6;
  transform: translateY(-1px);
}

.stat-number {
  font-weight: 600;
  color: #2563eb;
}

.stat-label {
  color: #6b7280;
  font-size: 0.8rem;
}

/* Edit Form */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.edit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.edit-header h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.edit-actions {
  display: flex;
  gap: 4px;
}

.edit-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn.save {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.edit-btn.save:hover {
  background: rgba(16, 185, 129, 0.2);
}

.edit-btn.cancel {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.edit-btn.cancel:hover {
  background: rgba(239, 68, 68, 0.2);
}

.edit-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.edit-input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s ease;
}

.edit-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.edit-select {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
}

.edit-color {
  width: 60px;
  height: 40px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
}

.edit-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
}

.edit-checkbox input {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>