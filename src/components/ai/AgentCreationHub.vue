<template>
  <div class="agent-creation-hub">
    <div class="hub-header">
      <div class="header-icon">
        <div class="icon-core"></div>
        <div class="icon-rings"></div>
      </div>
      <h3>Agent Genesis</h3>
      <div class="header-glow"></div>
    </div>
    
    <div class="creation-interface">
      <div class="agent-preview">
        <div class="preview-core">
          <div class="core-matrix" :class="{ active: isCreating }"></div>
          <div class="core-data-stream"></div>
          <div class="neural-connections">
            <div class="connection" v-for="i in 8" :key="i" :style="{ 
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${i * 0.1}s`
            }"></div>
          </div>
        </div>
        <div class="agent-status">
          <span class="status-text">{{ agentStatus }}</span>
          <div class="status-indicator" :class="statusClass"></div>
        </div>
      </div>
      
      <div class="creation-controls">
        <div class="agent-config">
          <div class="config-section">
            <label class="config-label">Agent Type</label>
            <select v-model="agentType" class="config-select">
              <option value="analyst">Data Analyst</option>
              <option value="creator">Content Creator</option>
              <option value="researcher">Research Agent</option>
              <option value="optimizer">Process Optimizer</option>
              <option value="predictor">Predictive Agent</option>
            </select>
          </div>
          
          <div class="config-section">
            <label class="config-label">Intelligence Level</label>
            <div class="intelligence-slider">
              <input 
                type="range" 
                v-model="intelligenceLevel" 
                min="1" 
                max="10" 
                class="slider"
              >
              <span class="slider-value">{{ intelligenceLevel }}</span>
            </div>
          </div>
          
          <div class="config-section">
            <label class="config-label">Specialization</label>
            <div class="specialization-chips">
              <div 
                class="chip" 
                v-for="spec in specializations" 
                :key="spec"
                :class="{ active: selectedSpecializations.includes(spec) }"
                @click="toggleSpecialization(spec)"
              >
                {{ spec }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="action-buttons">
          <button 
            class="nexus-btn primary" 
            @click="createAgent"
            :disabled="isCreating"
          >
            <span class="btn-text">{{ isCreating ? 'Creating...' : 'Create Agent' }}</span>
            <div class="btn-energy"></div>
          </button>
          
          <button class="nexus-btn secondary" @click="loadTemplate">
            <span class="btn-text">Load Template</span>
            <div class="btn-energy"></div>
          </button>
          
          <button class="nexus-btn tertiary" @click="resetConfig">
            <span class="btn-text">Reset</span>
            <div class="btn-energy"></div>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Agent Templates Modal -->
    <div v-if="showTemplates" class="templates-modal">
      <div class="modal-backdrop" @click="closeTemplates"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h4>Agent Templates</h4>
          <button class="close-btn" @click="closeTemplates">×</button>
        </div>
        <div class="templates-grid">
          <div 
            class="template-card" 
            v-for="template in agentTemplates" 
            :key="template.id"
            @click="selectTemplate(template)"
          >
            <div class="template-icon">{{ template.icon }}</div>
            <h5>{{ template.name }}</h5>
            <p>{{ template.description }}</p>
            <div class="template-stats">
              <span class="stat">Intelligence: {{ template.intelligence }}</span>
              <span class="stat">Specializations: {{ template.specializations.length }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgentCreationHub',
  data() {
    return {
      agentType: 'analyst',
      intelligenceLevel: 5,
      selectedSpecializations: [],
      isCreating: false,
      agentStatus: 'Ready to Create',
      showTemplates: false,
      specializations: [
        'Machine Learning',
        'Natural Language Processing',
        'Computer Vision',
        'Predictive Analytics',
        'Process Automation',
        'Data Visualization',
        'Content Generation',
        'Research Analysis'
      ],
      agentTemplates: [
        {
          id: 1,
          name: 'Data Oracle',
          icon: '🔮',
          description: 'Advanced predictive analytics agent',
          intelligence: 9,
          specializations: ['Predictive Analytics', 'Machine Learning', 'Data Visualization']
        },
        {
          id: 2,
          name: 'Content Alchemist',
          icon: '✨',
          description: 'Creative content generation specialist',
          intelligence: 8,
          specializations: ['Content Generation', 'Natural Language Processing', 'Creative Writing']
        },
        {
          id: 3,
          name: 'Research Navigator',
          icon: '🧭',
          description: 'Deep research and analysis expert',
          intelligence: 7,
          specializations: ['Research Analysis', 'Data Mining', 'Information Synthesis']
        },
        {
          id: 4,
          name: 'Process Optimizer',
          icon: '⚙️',
          description: 'Workflow and process improvement agent',
          intelligence: 6,
          specializations: ['Process Automation', 'Workflow Optimization', 'Efficiency Analysis']
        }
      ]
    }
  },
  computed: {
    statusClass() {
      if (this.isCreating) return 'creating'
      if (this.agentStatus === 'Ready to Create') return 'ready'
      return 'active'
    }
  },
  methods: {
    toggleSpecialization(spec) {
      const index = this.selectedSpecializations.indexOf(spec)
      if (index > -1) {
        this.selectedSpecializations.splice(index, 1)
      } else {
        this.selectedSpecializations.push(spec)
      }
    },
    async createAgent() {
      this.isCreating = true
      this.agentStatus = 'Initializing Neural Network...'
      
      // Simulate agent creation process
      const steps = [
        'Initializing Neural Network...',
        'Loading Knowledge Base...',
        'Configuring Specializations...',
        'Training Core Algorithms...',
        'Calibrating Intelligence Matrix...',
        'Agent Created Successfully!'
      ]
      
      for (let i = 0; i < steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.agentStatus = steps[i]
      }
      
      this.isCreating = false
      this.$emit('agent-created', {
        type: this.agentType,
        intelligence: this.intelligenceLevel,
        specializations: this.selectedSpecializations
      })
    },
    loadTemplate() {
      this.showTemplates = true
    },
    selectTemplate(template) {
      this.agentType = template.name.toLowerCase().replace(' ', '_')
      this.intelligenceLevel = template.intelligence
      this.selectedSpecializations = [...template.specializations]
      this.closeTemplates()
    },
    closeTemplates() {
      this.showTemplates = false
    },
    resetConfig() {
      this.agentType = 'analyst'
      this.intelligenceLevel = 5
      this.selectedSpecializations = []
      this.agentStatus = 'Ready to Create'
    }
  }
}
</script>

<style scoped>
.agent-creation-hub {
  background: rgba(20, 20, 40, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.agent-creation-hub:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 255, 255, 0.6);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
}

.hub-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.header-icon {
  position: relative;
  width: 40px;
  height: 40px;
}

.icon-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #00ffff, transparent);
  border-radius: 50%;
  animation: iconPulse 2s ease-in-out infinite;
}

.icon-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 255, 255, 0.5);
  border-radius: 50%;
  animation: iconRotate 3s linear infinite;
}

@keyframes iconPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
}

@keyframes iconRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.hub-header h3 {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.header-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent);
  border-radius: 20px;
  animation: headerGlow 4s ease-in-out infinite;
}

@keyframes headerGlow {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.creation-interface {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.agent-preview {
  height: 150px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-core {
  position: relative;
  width: 80px;
  height: 80px;
}

.core-matrix {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  border-radius: 50%;
  animation: matrixRotate 3s linear infinite;
  opacity: 0.7;
}

.core-matrix.active {
  opacity: 1;
  animation-duration: 1s;
  box-shadow: 0 0 30px #00ffff;
}

.core-data-stream {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 0 20px #ffffff;
  animation: dataStream 2s ease-in-out infinite;
}

@keyframes matrixRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes dataStream {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.3); }
}

.neural-connections {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}

.connection {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
  transform-origin: 0 0;
  animation: connectionPulse 2s ease-in-out infinite;
}

@keyframes connectionPulse {
  0%, 100% { opacity: 0.3; transform: scaleX(0.5); }
  50% { opacity: 1; transform: scaleX(1); }
}

.agent-status {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.status-text {
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: statusPulse 2s ease-in-out infinite;
}

.status-indicator.ready {
  background: #00ff00;
}

.status-indicator.creating {
  background: #ffff00;
}

.status-indicator.active {
  background: #00ffff;
}

@keyframes statusPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.creation-controls {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.agent-config {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.config-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.config-label {
  color: #cccccc;
  font-size: 0.9rem;
  font-weight: 500;
}

.config-select {
  padding: 0.8rem;
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.config-select:focus {
  outline: none;
  border-color: #00ffff;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.intelligence-slider {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.slider {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  outline: none;
  -webkit-appearance: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.slider-value {
  color: #00ffff;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.specialization-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  padding: 0.4rem 0.8rem;
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.3);
  color: #cccccc;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.chip:hover {
  border-color: rgba(0, 255, 255, 0.6);
  transform: translateY(-2px);
}

.chip.active {
  background: linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
  border-color: #00ffff;
  color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.nexus-btn {
  position: relative;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  flex: 1;
  min-width: 120px;
}

.nexus-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
}

.nexus-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.nexus-btn.primary {
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  color: #000000;
}

.nexus-btn.secondary {
  background: linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3));
  border: 1px solid rgba(0, 255, 255, 0.5);
}

.nexus-btn.tertiary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-text {
  position: relative;
  z-index: 2;
}

.btn-energy {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.nexus-btn:hover .btn-energy {
  left: 100%;
}

/* Templates Modal */
.templates-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  background: rgba(20, 20, 40, 0.95);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  backdrop-filter: blur(20px);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h4 {
  color: #ffffff;
  font-size: 1.5rem;
  margin: 0;
}

.close-btn {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 0, 0, 0.3);
  transform: scale(1.1);
}

.templates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.template-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.template-card:hover {
  border-color: rgba(0, 255, 255, 0.5);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 255, 255, 0.2);
}

.template-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.template-card h5 {
  color: #ffffff;
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
}

.template-card p {
  color: #cccccc;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.template-stats {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.template-stats .stat {
  color: #00ffff;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .action-buttons {
    flex-direction: column;
  }
  
  .nexus-btn {
    min-width: auto;
  }
  
  .templates-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>
