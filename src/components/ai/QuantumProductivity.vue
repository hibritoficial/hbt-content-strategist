<template>
  <div class="quantum-productivity">
    <div class="productivity-header">
      <div class="header-icon">
        <div class="icon-core"></div>
        <div class="icon-rings"></div>
      </div>
      <h3>Quantum Productivity</h3>
      <div class="header-glow"></div>
    </div>
    
    <div class="productivity-interface">
      <div class="quantum-field">
        <div class="field-particles">
          <div 
            class="particle" 
            v-for="i in 20" 
            :key="i" 
            :style="{ 
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: (Math.random() * 4 + 2) + 's'
            }"
          ></div>
        </div>
        
        <div class="quantum-core">
          <div class="core-center"></div>
          <div class="core-rings">
            <div class="ring" v-for="i in 5" :key="i" :style="{ 
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + i * 0.3}s`
            }"></div>
          </div>
        </div>
        
        <div class="energy-streams">
          <div class="stream" v-for="i in 8" :key="i" :style="{ 
            transform: `rotate(${i * 45}deg)`,
            animationDelay: `${i * 0.1}s`
          }"></div>
        </div>
      </div>
      
      <div class="productivity-multipliers">
        <div class="multiplier-grid">
          <div class="multiplier-card" v-for="multiplier in multipliers" :key="multiplier.id">
            <div class="card-header">
              <div class="multiplier-icon">{{ multiplier.icon }}</div>
              <div class="multiplier-value">{{ multiplier.value }}</div>
            </div>
            <div class="card-content">
              <h4>{{ multiplier.name }}</h4>
              <p>{{ multiplier.description }}</p>
              <div class="multiplier-bar">
                <div class="bar-fill" :style="{ width: multiplier.level + '%' }"></div>
              </div>
              <div class="multiplier-stats">
                <span class="stat">Level: {{ multiplier.level }}%</span>
                <span class="stat">Boost: {{ multiplier.boost }}x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="productivity-controls">
        <button class="nexus-btn primary" @click="activateQuantumMode">
          <span class="btn-text">Activate Quantum Mode</span>
          <div class="btn-energy"></div>
        </button>
        
        <button class="nexus-btn secondary" @click="calibrateField">
          <span class="btn-text">Calibrate Field</span>
          <div class="btn-energy"></div>
        </button>
        
        <button class="nexus-btn tertiary" @click="resetProductivity">
          <span class="btn-text">Reset</span>
          <div class="btn-energy"></div>
        </button>
      </div>
    </div>
    
    <!-- Quantum Mode Modal -->
    <div v-if="showQuantumMode" class="quantum-modal">
      <div class="modal-backdrop" @click="closeQuantumMode"></div>
      <div class="modal-content">
        <div class="quantum-interface">
          <div class="quantum-visualization">
            <div class="quantum-matrix">
              <div class="matrix-cell" v-for="i in 64" :key="i" :style="{ 
                animationDelay: `${i * 0.05}s`
              }"></div>
            </div>
          </div>
          
          <div class="quantum-stats">
            <div class="stat-item">
              <span class="stat-label">Quantum Efficiency</span>
              <span class="stat-value">{{ quantumStats.efficiency }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Processing Speed</span>
              <span class="stat-value">{{ quantumStats.speed }}x</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Output Quality</span>
              <span class="stat-value">{{ quantumStats.quality }}%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Energy Consumption</span>
              <span class="stat-value">{{ quantumStats.energy }}%</span>
            </div>
          </div>
          
          <div class="quantum-controls">
            <button class="nexus-btn primary" @click="optimizeQuantum">
              Optimize Quantum Field
            </button>
            <button class="nexus-btn secondary" @click="closeQuantumMode">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuantumProductivity',
  data() {
    return {
      showQuantumMode: false,
      multipliers: [
        {
          id: 1,
          name: 'Analysis Speed',
          icon: '⚡',
          value: '∞x',
          description: 'Instant data processing and analysis',
          level: 95,
          boost: 1000
        },
        {
          id: 2,
          name: 'Execution Power',
          icon: '🚀',
          value: '∞x',
          description: 'Unlimited task execution capacity',
          level: 98,
          boost: 1000
        },
        {
          id: 3,
          name: 'Research Depth',
          icon: '🔬',
          value: '∞x',
          description: 'Infinite research and discovery potential',
          level: 92,
          boost: 1000
        },
        {
          id: 4,
          name: 'Creative Output',
          icon: '✨',
          value: '∞x',
          description: 'Boundless creative expression',
          level: 96,
          boost: 1000
        },
        {
          id: 5,
          name: 'Problem Solving',
          icon: '🧩',
          value: '∞x',
          description: 'Universal problem resolution',
          level: 94,
          boost: 1000
        },
        {
          id: 6,
          name: 'Learning Rate',
          icon: '📚',
          value: '∞x',
          description: 'Instant knowledge acquisition',
          level: 97,
          boost: 1000
        }
      ],
      quantumStats: {
        efficiency: 98,
        speed: 1000,
        quality: 99,
        energy: 15
      }
    }
  },
  methods: {
    activateQuantumMode() {
      this.showQuantumMode = true
      this.startQuantumOptimization()
    },
    startQuantumOptimization() {
      // Simulate quantum field optimization
      setInterval(() => {
        this.quantumStats.efficiency = Math.min(100, this.quantumStats.efficiency + Math.random() * 0.5)
        this.quantumStats.quality = Math.min(100, this.quantumStats.quality + Math.random() * 0.3)
        this.quantumStats.energy = Math.max(5, this.quantumStats.energy - Math.random() * 0.2)
      }, 1000)
    },
    calibrateField() {
      // Animate field calibration
      this.multipliers.forEach((multiplier, index) => {
        setTimeout(() => {
          multiplier.level = Math.min(100, multiplier.level + Math.random() * 5)
        }, index * 200)
      })
    },
    optimizeQuantum() {
      // Optimize quantum field
      this.quantumStats.efficiency = 100
      this.quantumStats.quality = 100
      this.quantumStats.energy = 5
      this.quantumStats.speed = 10000
    },
    resetProductivity() {
      this.multipliers.forEach(multiplier => {
        multiplier.level = 90
      })
      this.quantumStats = {
        efficiency: 90,
        speed: 100,
        quality: 90,
        energy: 20
      }
    },
    closeQuantumMode() {
      this.showQuantumMode = false
    }
  }
}
</script>

<style scoped>
.quantum-productivity {
  background: rgba(20, 20, 40, 0.8);
  border: 1px solid rgba(255, 255, 0, 0.3);
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.quantum-productivity:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 0, 0.6);
  box-shadow: 0 10px 30px rgba(255, 255, 0, 0.2);
}

.productivity-header {
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
  background: radial-gradient(circle, #ffff00, transparent);
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
  border: 1px solid rgba(255, 255, 0, 0.5);
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

.productivity-header h3 {
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
  background: linear-gradient(45deg, transparent, rgba(255, 255, 0, 0.1), transparent);
  border-radius: 20px;
  animation: headerGlow 4s ease-in-out infinite;
}

@keyframes headerGlow {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.productivity-interface {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.quantum-field {
  height: 200px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.field-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #ffff00, transparent);
  border-radius: 50%;
  animation: particleFloat linear infinite;
}

@keyframes particleFloat {
  0% { transform: translateY(100%) scale(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100%) scale(1); opacity: 0; }
}

.quantum-core {
  position: relative;
  width: 100px;
  height: 100px;
}

.core-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, #ffff00, transparent);
  border-radius: 50%;
  box-shadow: 0 0 30px #ffff00;
  animation: corePulse 2s ease-in-out infinite;
}

@keyframes corePulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.3); }
}

.core-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 0, 0.3);
  border-radius: 50%;
  animation: ringRotate linear infinite;
}

.ring:nth-child(1) { width: 40px; height: 40px; }
.ring:nth-child(2) { width: 60px; height: 60px; }
.ring:nth-child(3) { width: 80px; height: 80px; }
.ring:nth-child(4) { width: 100px; height: 100px; }
.ring:nth-child(5) { width: 120px; height: 120px; }

@keyframes ringRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.energy-streams {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
}

.stream {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 75px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ffff00, transparent);
  transform-origin: 0 0;
  animation: streamPulse 2s ease-in-out infinite;
}

@keyframes streamPulse {
  0%, 100% { opacity: 0.3; transform: scaleX(0.5); }
  50% { opacity: 1; transform: scaleX(1); }
}

.productivity-multipliers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.multiplier-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.multiplier-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 0, 0.2);
  border-radius: 15px;
  padding: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.multiplier-card:hover {
  border-color: rgba(255, 255, 0, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 255, 0, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.multiplier-icon {
  font-size: 1.5rem;
}

.multiplier-value {
  color: #ffff00;
  font-size: 1.2rem;
  font-weight: 900;
  text-shadow: 0 0 10px #ffff00;
}

.card-content h4 {
  color: #ffffff;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
}

.card-content p {
  color: #cccccc;
  font-size: 0.8rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
}

.multiplier-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffff00, #ffaa00);
  border-radius: 3px;
  transition: width 1s ease-out;
  position: relative;
}

.bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: barShine 2s ease-in-out infinite;
}

@keyframes barShine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.multiplier-stats {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.stat {
  color: #ffff00;
  font-size: 0.7rem;
  font-weight: 500;
}

.productivity-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.nexus-btn {
  position: relative;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: linear-gradient(45deg, rgba(255, 255, 0, 0.2), rgba(255, 170, 0, 0.2));
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  flex: 1;
  min-width: 120px;
}

.nexus-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 255, 0, 0.3);
}

.nexus-btn.primary {
  background: linear-gradient(45deg, #ffff00, #ffaa00);
  color: #000000;
}

.nexus-btn.secondary {
  background: linear-gradient(45deg, rgba(255, 255, 0, 0.3), rgba(255, 170, 0, 0.3));
  border: 1px solid rgba(255, 255, 0, 0.5);
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

/* Quantum Modal */
.quantum-modal {
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
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
}

.modal-content {
  position: relative;
  background: rgba(20, 20, 40, 0.95);
  border: 1px solid rgba(255, 255, 0, 0.3);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  backdrop-filter: blur(20px);
}

.quantum-interface {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.quantum-visualization {
  width: 100%;
  height: 200px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantum-matrix {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 2px;
  width: 160px;
  height: 160px;
}

.matrix-cell {
  background: rgba(255, 255, 0, 0.1);
  border: 1px solid rgba(255, 255, 0, 0.2);
  border-radius: 2px;
  animation: matrixPulse 2s ease-in-out infinite;
}

@keyframes matrixPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

.quantum-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 0, 0.2);
}

.stat-label {
  color: #cccccc;
  font-size: 0.9rem;
  text-align: center;
}

.stat-value {
  color: #ffff00;
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 0 0 10px #ffff00;
}

.quantum-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .multiplier-grid {
    grid-template-columns: 1fr;
  }
  
  .productivity-controls {
    flex-direction: column;
  }
  
  .nexus-btn {
    min-width: auto;
  }
  
  .quantum-stats {
    grid-template-columns: 1fr;
  }
  
  .quantum-matrix {
    width: 120px;
    height: 120px;
  }
}
</style>
