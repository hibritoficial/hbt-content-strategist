<template>
  <div class="consciousness-alignment">
    <div class="alignment-header">
      <div class="header-icon">
        <div class="icon-core"></div>
        <div class="icon-rings"></div>
      </div>
      <h3>Consciousness Alignment</h3>
      <div class="header-glow"></div>
    </div>
    
    <div class="alignment-interface">
      <div class="cosmic-visualization">
        <div class="cosmic-wheel">
          <div class="wheel-center">
            <div class="center-core"></div>
            <div class="center-pulse"></div>
          </div>
          <div 
            class="wheel-ring" 
            v-for="i in 7" 
            :key="i" 
            :style="{ 
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + i * 0.5}s`
            }"
          ></div>
        </div>
        
        <div class="alignment-indicators">
          <div 
            class="indicator" 
            v-for="(chakra, index) in chakras" 
            :key="index"
            :style="{ 
              transform: `rotate(${index * 45}deg)`,
              animationDelay: `${index * 0.2}s`
            }"
          >
            <div class="indicator-dot" :class="chakra.status"></div>
            <div class="chakra-label">{{ chakra.name }}</div>
          </div>
        </div>
        
        <div class="energy-flow">
          <div class="flow-line" v-for="i in 12" :key="i" :style="{ 
            transform: `rotate(${i * 30}deg)`,
            animationDelay: `${i * 0.1}s`
          }"></div>
        </div>
      </div>
      
      <div class="consciousness-metrics">
        <div class="metric-section">
          <h4>Inner Alignment</h4>
          <div class="metric">
            <span class="metric-label">Mind-Body Connection</span>
            <div class="metric-bar">
              <div class="bar-fill" :style="{ width: alignmentData.mindBody + '%' }"></div>
            </div>
            <span class="metric-value">{{ alignmentData.mindBody }}%</span>
          </div>
          
          <div class="metric">
            <span class="metric-label">Emotional Balance</span>
            <div class="metric-bar">
              <div class="bar-fill" :style="{ width: alignmentData.emotional + '%' }"></div>
            </div>
            <span class="metric-value">{{ alignmentData.emotional }}%</span>
          </div>
          
          <div class="metric">
            <span class="metric-label">Spiritual Awareness</span>
            <div class="metric-bar">
              <div class="bar-fill" :style="{ width: alignmentData.spiritual + '%' }"></div>
            </div>
            <span class="metric-value">{{ alignmentData.spiritual }}%</span>
          </div>
        </div>
        
        <div class="metric-section">
          <h4>Cosmic Connection</h4>
          <div class="metric">
            <span class="metric-label">Universal Harmony</span>
            <div class="metric-bar">
              <div class="bar-fill" :style="{ width: cosmicData.harmony + '%' }"></div>
            </div>
            <span class="metric-value">{{ cosmicData.harmony }}%</span>
          </div>
          
          <div class="metric">
            <span class="metric-label">Energy Flow</span>
            <div class="metric-bar">
              <div class="bar-fill" :style="{ width: cosmicData.energy + '%' }"></div>
            </div>
            <span class="metric-value">{{ cosmicData.energy }}%</span>
          </div>
          
          <div class="metric">
            <span class="metric-label">Cosmic Resonance</span>
            <div class="metric-bar">
              <div class="bar-fill" :style="{ width: cosmicData.resonance + '%' }"></div>
            </div>
            <span class="metric-value">{{ cosmicData.resonance }}%</span>
          </div>
        </div>
        
        <div class="metric-section">
          <h4>Impact Potential</h4>
          <div class="metric">
            <span class="metric-label">Societal Influence</span>
            <div class="metric-bar">
              <div class="bar-fill" :style="{ width: impactData.society + '%' }"></div>
            </div>
            <span class="metric-value">{{ impactData.society }}%</span>
          </div>
          
          <div class="metric">
            <span class="metric-label">Planetary Healing</span>
            <div class="metric-bar">
              <div class="bar-fill" :style="{ width: impactData.planet + '%' }"></div>
            </div>
            <span class="metric-value">{{ impactData.planet }}%</span>
          </div>
          
          <div class="metric">
            <span class="metric-label">Universal Evolution</span>
            <div class="metric-bar">
              <div class="bar-fill" :style="{ width: impactData.universe + '%' }"></div>
            </div>
            <span class="metric-value">{{ impactData.universe }}%</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="alignment-controls">
      <button class="nexus-btn primary" @click="startAlignment">
        <span class="btn-text">Begin Alignment</span>
        <div class="btn-energy"></div>
      </button>
      
      <button class="nexus-btn secondary" @click="meditationMode">
        <span class="btn-text">Meditation Mode</span>
        <div class="btn-energy"></div>
      </button>
      
      <button class="nexus-btn tertiary" @click="cosmicJourney">
        <span class="btn-text">Cosmic Journey</span>
        <div class="btn-energy"></div>
      </button>
    </div>
    
    <!-- Meditation Mode Modal -->
    <div v-if="showMeditation" class="meditation-modal">
      <div class="modal-backdrop" @click="closeMeditation"></div>
      <div class="modal-content">
        <div class="meditation-interface">
          <div class="breathing-guide">
            <div class="breath-circle" :class="{ inhale: isInhaling, exhale: isExhaling }">
              <div class="breath-text">{{ breathText }}</div>
            </div>
          </div>
          
          <div class="meditation-stats">
            <div class="stat">
              <span class="stat-label">Session Time</span>
              <span class="stat-value">{{ formatTime(meditationTime) }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Breath Count</span>
              <span class="stat-value">{{ breathCount }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Alignment Level</span>
              <span class="stat-value">{{ overallAlignment }}%</span>
            </div>
          </div>
          
          <div class="meditation-controls">
            <button class="nexus-btn primary" @click="toggleMeditation">
              {{ isMeditating ? 'Pause' : 'Start' }}
            </button>
            <button class="nexus-btn secondary" @click="resetMeditation">Reset</button>
            <button class="nexus-btn tertiary" @click="closeMeditation">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsciousnessAlignment',
  data() {
    return {
      chakras: [
        { name: 'Root', status: 'balanced' },
        { name: 'Sacral', status: 'active' },
        { name: 'Solar', status: 'balanced' },
        { name: 'Heart', status: 'active' },
        { name: 'Throat', status: 'balanced' },
        { name: 'Third Eye', status: 'active' },
        { name: 'Crown', status: 'balanced' },
        { name: 'Soul', status: 'active' }
      ],
      alignmentData: {
        mindBody: 87,
        emotional: 92,
        spiritual: 95
      },
      cosmicData: {
        harmony: 89,
        energy: 94,
        resonance: 91
      },
      impactData: {
        society: 88,
        planet: 93,
        universe: 96
      },
      showMeditation: false,
      isMeditating: false,
      isInhaling: false,
      isExhaling: false,
      breathText: 'Breathe',
      meditationTime: 0,
      breathCount: 0,
      meditationInterval: null,
      breathInterval: null
    }
  },
  computed: {
    overallAlignment() {
      const allValues = [
        ...Object.values(this.alignmentData),
        ...Object.values(this.cosmicData),
        ...Object.values(this.impactData)
      ]
      return Math.round(allValues.reduce((sum, val) => sum + val, 0) / allValues.length)
    }
  },
  methods: {
    startAlignment() {
      this.animateChakras()
      this.updateMetrics()
    },
    animateChakras() {
      this.chakras.forEach((chakra, index) => {
        setTimeout(() => {
          chakra.status = 'active'
          setTimeout(() => {
            chakra.status = 'balanced'
          }, 1000)
        }, index * 200)
      })
    },
    updateMetrics() {
      // Simulate real-time metric updates
      setInterval(() => {
        this.alignmentData.mindBody = Math.min(100, this.alignmentData.mindBody + Math.random() * 2)
        this.alignmentData.emotional = Math.min(100, this.alignmentData.emotional + Math.random() * 2)
        this.alignmentData.spiritual = Math.min(100, this.alignmentData.spiritual + Math.random() * 2)
        
        this.cosmicData.harmony = Math.min(100, this.cosmicData.harmony + Math.random() * 2)
        this.cosmicData.energy = Math.min(100, this.cosmicData.energy + Math.random() * 2)
        this.cosmicData.resonance = Math.min(100, this.cosmicData.resonance + Math.random() * 2)
        
        this.impactData.society = Math.min(100, this.impactData.society + Math.random() * 2)
        this.impactData.planet = Math.min(100, this.impactData.planet + Math.random() * 2)
        this.impactData.universe = Math.min(100, this.impactData.universe + Math.random() * 2)
      }, 2000)
    },
    meditationMode() {
      this.showMeditation = true
    },
    toggleMeditation() {
      if (this.isMeditating) {
        this.pauseMeditation()
      } else {
        this.startMeditation()
      }
    },
    startMeditation() {
      this.isMeditating = true
      this.startBreathingCycle()
      this.meditationInterval = setInterval(() => {
        this.meditationTime++
      }, 1000)
    },
    pauseMeditation() {
      this.isMeditating = false
      this.stopBreathingCycle()
      if (this.meditationInterval) {
        clearInterval(this.meditationInterval)
      }
    },
    startBreathingCycle() {
      this.breathInterval = setInterval(() => {
        this.isInhaling = true
        this.breathText = 'Inhale'
        setTimeout(() => {
          this.isInhaling = false
          this.isExhaling = true
          this.breathText = 'Exhale'
          setTimeout(() => {
            this.isExhaling = false
            this.breathText = 'Hold'
            setTimeout(() => {
              this.breathCount++
            }, 1000)
          }, 3000)
        }, 3000)
      }, 8000)
    },
    stopBreathingCycle() {
      if (this.breathInterval) {
        clearInterval(this.breathInterval)
      }
      this.isInhaling = false
      this.isExhaling = false
      this.breathText = 'Breathe'
    },
    resetMeditation() {
      this.pauseMeditation()
      this.meditationTime = 0
      this.breathCount = 0
    },
    closeMeditation() {
      this.pauseMeditation()
      this.showMeditation = false
    },
    cosmicJourney() {
      this.$emit('cosmic-journey-started')
    },
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
  },
  beforeUnmount() {
    if (this.meditationInterval) {
      clearInterval(this.meditationInterval)
    }
    if (this.breathInterval) {
      clearInterval(this.breathInterval)
    }
  }
}
</script>

<style scoped>
.consciousness-alignment {
  background: rgba(20, 20, 40, 0.8);
  border: 1px solid rgba(255, 0, 255, 0.3);
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.consciousness-alignment:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 0, 255, 0.6);
  box-shadow: 0 10px 30px rgba(255, 0, 255, 0.2);
}

.alignment-header {
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
  background: radial-gradient(circle, #ff00ff, transparent);
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
  border: 1px solid rgba(255, 0, 255, 0.5);
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

.alignment-header h3 {
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
  background: linear-gradient(45deg, transparent, rgba(255, 0, 255, 0.1), transparent);
  border-radius: 20px;
  animation: headerGlow 4s ease-in-out infinite;
}

@keyframes headerGlow {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.alignment-interface {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cosmic-visualization {
  height: 200px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cosmic-wheel {
  position: relative;
  width: 120px;
  height: 120px;
}

.wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
}

.center-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #ff00ff, transparent);
  border-radius: 50%;
  box-shadow: 0 0 30px #ff00ff;
}

.center-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border: 1px solid rgba(255, 0, 255, 0.5);
  border-radius: 50%;
  animation: centerPulse 2s ease-in-out infinite;
}

@keyframes centerPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
}

.wheel-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 0, 255, 0.3);
  border-radius: 50%;
  animation: wheelRotate linear infinite;
}

.wheel-ring:nth-child(2) { width: 60px; height: 60px; }
.wheel-ring:nth-child(3) { width: 90px; height: 90px; }
.wheel-ring:nth-child(4) { width: 120px; height: 120px; }
.wheel-ring:nth-child(5) { width: 150px; height: 150px; }
.wheel-ring:nth-child(6) { width: 180px; height: 180px; }
.wheel-ring:nth-child(7) { width: 210px; height: 210px; }
.wheel-ring:nth-child(8) { width: 240px; height: 240px; }

@keyframes wheelRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.alignment-indicators {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  width: 100px;
  height: 1px;
  animation: indicatorPulse 3s ease-in-out infinite;
}

.indicator-dot {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.indicator-dot.balanced {
  background: #00ff00;
  box-shadow: 0 0 10px #00ff00;
}

.indicator-dot.active {
  background: #ffff00;
  box-shadow: 0 0 15px #ffff00;
  animation: dotPulse 1s ease-in-out infinite;
}

@keyframes indicatorPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes dotPulse {
  0%, 100% { transform: translateY(-50%) scale(1); }
  50% { transform: translateY(-50%) scale(1.5); }
}

.chakra-label {
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.7rem;
  color: #cccccc;
  white-space: nowrap;
}

.energy-flow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
}

.flow-line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 125px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.5), transparent);
  transform-origin: 0 0;
  animation: flowPulse 2s ease-in-out infinite;
}

@keyframes flowPulse {
  0%, 100% { opacity: 0.3; transform: scaleX(0.5); }
  50% { opacity: 1; transform: scaleX(1); }
}

.consciousness-metrics {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.metric-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.metric-section h4 {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
}

.metric {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.metric-label {
  color: #cccccc;
  font-size: 0.9rem;
  min-width: 120px;
}

.metric-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff00ff, #ffff00, #00ff00);
  border-radius: 4px;
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

.metric-value {
  color: #ff00ff;
  font-weight: 600;
  min-width: 40px;
  text-align: right;
}

.alignment-controls {
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
  background: linear-gradient(45deg, rgba(255, 0, 255, 0.2), rgba(255, 255, 0, 0.2));
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
  box-shadow: 0 5px 15px rgba(255, 0, 255, 0.3);
}

.nexus-btn.primary {
  background: linear-gradient(45deg, #ff00ff, #ffff00);
  color: #000000;
}

.nexus-btn.secondary {
  background: linear-gradient(45deg, rgba(255, 0, 255, 0.3), rgba(255, 255, 0, 0.3));
  border: 1px solid rgba(255, 0, 255, 0.5);
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

/* Meditation Modal */
.meditation-modal {
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
  border: 1px solid rgba(255, 0, 255, 0.3);
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  backdrop-filter: blur(20px);
}

.meditation-interface {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.breathing-guide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.breath-circle {
  width: 200px;
  height: 200px;
  border: 3px solid rgba(255, 0, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 4s ease-in-out;
  background: radial-gradient(circle, rgba(255, 0, 255, 0.1), transparent);
}

.breath-circle.inhale {
  transform: scale(1.3);
  border-color: rgba(0, 255, 255, 0.6);
  background: radial-gradient(circle, rgba(0, 255, 255, 0.2), transparent);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
}

.breath-circle.exhale {
  transform: scale(0.8);
  border-color: rgba(255, 0, 255, 0.6);
  background: radial-gradient(circle, rgba(255, 0, 255, 0.2), transparent);
  box-shadow: 0 0 30px rgba(255, 0, 255, 0.3);
}

.breath-text {
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.meditation-stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  color: #cccccc;
  font-size: 0.9rem;
}

.stat-value {
  color: #ff00ff;
  font-size: 1.2rem;
  font-weight: 600;
}

.meditation-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .alignment-controls {
    flex-direction: column;
  }
  
  .nexus-btn {
    min-width: auto;
  }
  
  .metric {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .metric-label {
    min-width: auto;
  }
  
  .meditation-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .breath-circle {
    width: 150px;
    height: 150px;
  }
  
  .breath-text {
    font-size: 1.2rem;
  }
}
</style>
