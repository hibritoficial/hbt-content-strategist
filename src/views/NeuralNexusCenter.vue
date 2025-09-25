<template>
  <div class="neural-nexus-center">
    <!-- Neural Grid Background -->
    <div class="neural-grid">
      <div class="grid-line" v-for="i in 20" :key="i" :style="{ animationDelay: `${i * 0.1}s` }"></div>
    </div>

    <!-- Floating Neural Particles -->
    <div class="neural-particles">
      <div 
        class="particle" 
        v-for="i in 50" 
        :key="i"
        :style="{ 
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: (Math.random() * 10 + 5) + 's'
        }"
      ></div>
    </div>

    <!-- Main Header -->
    <div class="nexus-header">
      <div class="header-content">
        <div class="nexus-logo">
          <div class="logo-core">
            <div class="core-ring"></div>
            <div class="core-center"></div>
            <div class="energy-pulse"></div>
          </div>
          <h1 class="nexus-title">
            <span class="title-main">NEURAL</span>
            <span class="title-sub">NEXUS</span>
            <span class="title-center">CENTER</span>
          </h1>
        </div>
        <div class="nexus-subtitle">
          <span class="subtitle-text">Where Human Consciousness Meets Artificial Intelligence</span>
          <div class="subtitle-glow"></div>
        </div>
      </div>
    </div>

    <!-- AI Agent Dashboard -->
    <div class="agent-dashboard">
      <div class="dashboard-grid">
        <!-- Agent Creation Hub -->
        <div class="dashboard-card agent-creation" @click="openAgentCreation">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>Agent Genesis</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="creation-interface">
              <div class="agent-preview">
                <div class="preview-core">
                  <div class="core-matrix"></div>
                  <div class="core-data-stream"></div>
                </div>
              </div>
              <div class="creation-controls">
                <button class="nexus-btn primary" @click.stop="createAgent">
                  <span class="btn-text">Create Agent</span>
                  <div class="btn-energy"></div>
                </button>
                <button class="nexus-btn secondary" @click.stop="loadTemplate">
                  <span class="btn-text">Load Template</span>
                  <div class="btn-energy"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Training Center -->
        <div class="dashboard-card training-center" @click="openTrainingCenter">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>Neural Training</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="training-interface">
              <div class="training-visualization">
                <div class="neural-network">
                  <div class="neuron" v-for="i in 12" :key="i" :style="{ 
                    left: Math.random() * 80 + 10 + '%',
                    top: Math.random() * 80 + 10 + '%'
                  }" @click.stop="activateNeuron(i)">
                    <div class="neuron-core"></div>
                    <div class="neuron-pulse"></div>
                  </div>
                  <div class="connection" v-for="i in 20" :key="i"></div>
                </div>
              </div>
              <div class="training-stats">
                <div class="stat-item">
                  <span class="stat-label">Learning Rate</span>
                  <span class="stat-value">{{ trainingStats.learningRate }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Epochs</span>
                  <span class="stat-value">{{ trainingStats.epochs }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Accuracy</span>
                  <span class="stat-value">{{ trainingStats.accuracy }}%</span>
                </div>
              </div>
              <div class="training-controls">
                <button class="nexus-btn primary" @click.stop="startTraining">
                  <span class="btn-text">Start Training</span>
                  <div class="btn-energy"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Consciousness Alignment -->
        <div class="dashboard-card consciousness-hub" @click="openConsciousnessAlignment">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>Consciousness Alignment</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="consciousness-interface">
              <div class="alignment-visualization">
                <div class="cosmic-wheel">
                  <div class="wheel-center" @click.stop="activateCosmicCenter"></div>
                  <div class="wheel-ring" v-for="i in 5" :key="i" :style="{ 
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i * 0.5}s`
                  }"></div>
                </div>
                <div class="alignment-indicators">
                  <div class="indicator" v-for="i in 8" :key="i" :style="{ 
                    transform: `rotate(${i * 45}deg)`,
                    animationDelay: `${i * 0.2}s`
                  }" @click.stop="activateChakra(i)">
                    <div class="indicator-dot"></div>
                  </div>
                </div>
              </div>
              <div class="consciousness-metrics">
                <div class="metric">
                  <span class="metric-label">Inner Alignment</span>
                  <div class="metric-bar">
                    <div class="bar-fill" :style="{ width: consciousnessData.innerAlignment + '%' }"></div>
                  </div>
                </div>
                <div class="metric">
                  <span class="metric-label">Cosmic Connection</span>
                  <div class="metric-bar">
                    <div class="bar-fill" :style="{ width: consciousnessData.cosmicConnection + '%' }"></div>
                  </div>
                </div>
                <div class="metric">
                  <span class="metric-label">Impact Potential</span>
                  <div class="metric-bar">
                    <div class="bar-fill" :style="{ width: consciousnessData.impactPotential + '%' }"></div>
                  </div>
                </div>
              </div>
              <div class="consciousness-controls">
                <button class="nexus-btn primary" @click.stop="beginAlignment">
                  <span class="btn-text">Begin Alignment</span>
                  <div class="btn-energy"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quantum Productivity -->
        <QuantumProductivity />

        <!-- Conversational Intelligence Lab -->
        <div class="dashboard-card conversational-lab" @click="openConversationalLab">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>Conversational Intelligence Lab</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="lab-preview">
              <div class="preview-icon">🤖</div>
              <div class="preview-stats">
                <div class="preview-stat">
                  <span class="stat-label">Active Bots</span>
                  <span class="stat-value">{{ conversationalStats.activeBots }}</span>
                </div>
                <div class="preview-stat">
                  <span class="stat-label">Conversations</span>
                  <span class="stat-value">{{ conversationalStats.conversations }}</span>
                </div>
                <div class="preview-stat">
                  <span class="stat-label">Accuracy</span>
                  <span class="stat-value">{{ conversationalStats.accuracy }}%</span>
                </div>
              </div>
            </div>
            <div class="lab-controls">
              <button class="nexus-btn primary" @click.stop="openConversationalLab">
                <span class="btn-text">Enter Lab</span>
                <div class="btn-energy"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- AI Experiments Lab -->
        <div class="dashboard-card experiments-lab" @click="openExperimentsLab">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>AI Experiments Lab</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="experiments-interface">
              <div class="experiment-grid">
                <div class="experiment-item" v-for="i in 6" :key="i" @click.stop="launchExperiment(i)">
                  <div class="experiment-core">
                    <div class="core-pulse"></div>
                  </div>
                  <span class="experiment-name">Experiment {{ i }}</span>
                </div>
              </div>
              <div class="experiment-controls">
                <button class="nexus-btn primary" @click.stop="openExperimentsLab">
                  <span class="btn-text">Launch Experiment</span>
                  <div class="btn-energy"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Universal Impact Monitor -->
        <div class="dashboard-card impact-monitor" @click="openImpactMonitor">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>Universal Impact</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="impact-interface">
              <div class="impact-visualization">
                <div class="impact-waves">
                  <div class="wave" v-for="i in 5" :key="i" :style="{ 
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + i * 0.2}s`
                  }" @click.stop="amplifyWave(i)"></div>
                </div>
                <div class="impact-center" @click.stop="activateImpactCenter">
                  <div class="center-core"></div>
                  <div class="center-ripples"></div>
                </div>
              </div>
              <div class="impact-metrics">
                <div class="impact-metric">
                  <span class="metric-label">Society Impact</span>
                  <span class="metric-value">+{{ impactData.society }}%</span>
                </div>
                <div class="impact-metric">
                  <span class="metric-label">Planet Healing</span>
                  <span class="metric-value">+{{ impactData.planet }}%</span>
                </div>
                <div class="impact-metric">
                  <span class="metric-label">Universal Harmony</span>
                  <span class="metric-value">+{{ impactData.universe }}%</span>
                </div>
              </div>
              <div class="impact-controls">
                <button class="nexus-btn primary" @click.stop="amplifyImpact">
                  <span class="btn-text">Amplify Impact</span>
                  <div class="btn-energy"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import QuantumProductivity from '@/components/ai/QuantumProductivity.vue'

export default {
  name: 'NeuralNexusCenter',
  components: {
    QuantumProductivity
  },
  data() {
    return {
      trainingStats: {
        learningRate: 0.001,
        epochs: 1247,
        accuracy: 94.7
      },
      consciousnessData: {
        innerAlignment: 87,
        cosmicConnection: 92,
        impactPotential: 95
      },
      impactData: {
        society: 88,
        planet: 93,
        universe: 96
      },
      conversationalStats: {
        activeBots: 12,
        conversations: 2847,
        accuracy: 94.7
      }
    }
  },
  mounted() {
    this.initializeNeuralEffects()
  },
  methods: {
    initializeNeuralEffects() {
      // Initialize neural network animations
      this.animateNeuralConnections()
      this.animateConsciousnessAlignment()
      this.animateQuantumField()
    },
    animateNeuralConnections() {
      // Animate neural network connections
      const connections = document.querySelectorAll('.connection')
      connections.forEach((conn, index) => {
        setTimeout(() => {
          conn.style.opacity = '1'
          conn.style.transform = 'scaleX(1)'
        }, index * 100)
      })
    },
    animateConsciousnessAlignment() {
      // Animate consciousness alignment indicators
      const indicators = document.querySelectorAll('.indicator-dot')
      indicators.forEach((indicator, index) => {
        setInterval(() => {
          indicator.style.transform = 'scale(1.5)'
          setTimeout(() => {
            indicator.style.transform = 'scale(1)'
          }, 200)
        }, 1000 + index * 200)
      })
    },
    animateQuantumField() {
      // Animate quantum field particles
      const particles = document.querySelectorAll('.field-particle')
      particles.forEach(particle => {
        setInterval(() => {
          particle.style.transform = 'translate(0, -20px) scale(1.2)'
          setTimeout(() => {
            particle.style.transform = 'translate(0, 0) scale(1)'
          }, 500)
        }, Math.random() * 2000 + 1000)
      })
    },
    
    // Agent Creation Methods
    openAgentCreation() {
      this.$emit('open-agent-creation')
      console.log('Opening Agent Creation Hub...')
    },
    createAgent() {
      console.log('Creating new AI agent...')
      // Simulate agent creation
      setTimeout(() => {
        console.log('Agent created successfully!')
      }, 2000)
    },
    loadTemplate() {
      console.log('Loading agent template...')
      // Simulate template loading
      setTimeout(() => {
        console.log('Template loaded successfully!')
      }, 1000)
    },
    
    // Training Center Methods
    openTrainingCenter() {
      this.$emit('open-training-center')
      console.log('Opening Neural Training Center...')
    },
    activateNeuron(neuronId) {
      console.log(`Activating neuron ${neuronId}...`)
      // Simulate neuron activation
      this.trainingStats.accuracy = Math.min(100, this.trainingStats.accuracy + 0.1)
    },
    startTraining() {
      console.log('Starting neural network training...')
      // Simulate training process
      const trainingInterval = setInterval(() => {
        this.trainingStats.epochs += 1
        this.trainingStats.accuracy = Math.min(100, this.trainingStats.accuracy + 0.01)
        
        if (this.trainingStats.accuracy >= 99.9) {
          clearInterval(trainingInterval)
          console.log('Training completed!')
        }
      }, 100)
    },
    
    // Consciousness Alignment Methods
    openConsciousnessAlignment() {
      this.$emit('open-consciousness-alignment')
      console.log('Opening Consciousness Alignment...')
    },
    activateCosmicCenter() {
      console.log('Activating cosmic center...')
      // Simulate cosmic activation
      this.consciousnessData.cosmicConnection = Math.min(100, this.consciousnessData.cosmicConnection + 1)
    },
    activateChakra(chakraId) {
      console.log(`Activating chakra ${chakraId}...`)
      // Simulate chakra activation
      this.consciousnessData.innerAlignment = Math.min(100, this.consciousnessData.innerAlignment + 0.5)
    },
    beginAlignment() {
      console.log('Beginning consciousness alignment...')
      // Simulate alignment process
      const alignmentInterval = setInterval(() => {
        this.consciousnessData.innerAlignment = Math.min(100, this.consciousnessData.innerAlignment + 0.1)
        this.consciousnessData.cosmicConnection = Math.min(100, this.consciousnessData.cosmicConnection + 0.1)
        this.consciousnessData.impactPotential = Math.min(100, this.consciousnessData.impactPotential + 0.1)
        
        if (this.consciousnessData.innerAlignment >= 99.9) {
          clearInterval(alignmentInterval)
          console.log('Consciousness alignment completed!')
        }
      }, 200)
    },
    
    // Conversational Intelligence Lab Methods
    openConversationalLab() {
      this.$router.push('/neural-nexus/conversational-intelligence')
      console.log('Opening Conversational Intelligence Lab...')
    },
    
    // Experiments Lab Methods
    openExperimentsLab() {
      this.$emit('open-experiments-lab')
      console.log('Opening AI Experiments Lab...')
    },
    launchExperiment(experimentId) {
      console.log(`Launching experiment ${experimentId}...`)
      // Simulate experiment launch
      setTimeout(() => {
        console.log(`Experiment ${experimentId} launched successfully!`)
      }, 1500)
    },
    
    // Impact Monitor Methods
    openImpactMonitor() {
      this.$emit('open-impact-monitor')
      console.log('Opening Universal Impact Monitor...')
    },
    amplifyWave(waveId) {
      console.log(`Amplifying wave ${waveId}...`)
      // Simulate wave amplification
      this.impactData.society = Math.min(100, this.impactData.society + 0.5)
    },
    activateImpactCenter() {
      console.log('Activating impact center...')
      // Simulate impact center activation
      this.impactData.universe = Math.min(100, this.impactData.universe + 1)
    },
    amplifyImpact() {
      console.log('Amplifying universal impact...')
      // Simulate impact amplification
      const impactInterval = setInterval(() => {
        this.impactData.society = Math.min(100, this.impactData.society + 0.2)
        this.impactData.planet = Math.min(100, this.impactData.planet + 0.2)
        this.impactData.universe = Math.min(100, this.impactData.universe + 0.2)
        
        if (this.impactData.universe >= 99.9) {
          clearInterval(impactInterval)
          console.log('Universal impact maximized!')
        }
      }, 300)
    }
  }
}
</script>

<style scoped>
.neural-nexus-center {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Neural Grid Background */
.neural-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  z-index: 1;
}

.grid-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
  height: 1px;
  width: 100%;
  top: 0;
  animation: gridFlow 10s linear infinite;
}

.grid-line:nth-child(odd) {
  background: linear-gradient(0deg, transparent, #ff00ff, transparent);
  height: 100%;
  width: 1px;
  left: 0;
}

@keyframes gridFlow {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}

/* Floating Neural Particles */
.neural-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #00ffff, transparent);
  border-radius: 50%;
  animation: particleFloat linear infinite;
}

@keyframes particleFloat {
  0% { transform: translateY(100vh) scale(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) scale(1); opacity: 0; }
}

/* Main Header */
.nexus-header {
  position: relative;
  z-index: 10;
  padding: 2rem;
  text-align: center;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.nexus-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.logo-core {
  position: relative;
  width: 80px;
  height: 80px;
}

.core-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid #00ffff;
  border-radius: 50%;
  animation: coreRotate 4s linear infinite;
}

.core-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #ffffff, #00ffff);
  border-radius: 50%;
  box-shadow: 0 0 20px #00ffff;
}

.energy-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 1px solid #00ffff;
  border-radius: 50%;
  animation: energyPulse 2s ease-in-out infinite;
}

@keyframes coreRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes energyPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
}

.nexus-title {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.title-main {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleGradient 3s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
}

.title-sub {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
}

.title-center {
  font-size: 2rem;
  font-weight: 600;
  color: #00ffff;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

@keyframes titleGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.nexus-subtitle {
  position: relative;
  margin-top: 1rem;
}

.subtitle-text {
  font-size: 1.2rem;
  color: #cccccc;
  font-weight: 300;
  letter-spacing: 0.1em;
}

.subtitle-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.1), transparent);
  animation: subtitleGlow 4s ease-in-out infinite;
}

@keyframes subtitleGlow {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

/* Agent Dashboard */
.agent-dashboard {
  position: relative;
  z-index: 10;
  padding: 0 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.dashboard-card {
  background: rgba(20, 20, 40, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 20px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 255, 255, 0.6);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
}

.dashboard-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.dashboard-card:active {
  transform: translateY(-2px) scale(0.98);
}

.card-header {
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

.card-header h3 {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent);
  border-radius: 20px;
  animation: cardGlow 4s ease-in-out infinite;
}

@keyframes cardGlow {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

/* Agent Creation */
.creation-interface {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.agent-preview {
  height: 120px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

.preview-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
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
}

@keyframes matrixRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.creation-controls {
  display: flex;
  gap: 1rem;
}

/* Neural Training */
.training-interface {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.training-visualization {
  height: 120px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

.neural-network {
  position: relative;
  width: 100%;
  height: 100%;
}

.neuron {
  position: absolute;
  width: 12px;
  height: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.neuron:hover {
  transform: scale(1.5);
}

.neuron-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #00ffff, transparent);
  border-radius: 50%;
  animation: neuronPulse 2s ease-in-out infinite;
}

.neuron-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0, 255, 255, 0.5);
  border-radius: 50%;
  animation: neuronPulse 2s ease-in-out infinite;
}

@keyframes neuronPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
}

.connection {
  position: absolute;
  height: 1px;
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.5s ease;
}

.training-stats {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.training-controls {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  font-size: 0.8rem;
  color: #cccccc;
}

.stat-value {
  font-size: 1.1rem;
  color: #00ffff;
  font-weight: 600;
}

/* Consciousness Alignment */
.consciousness-interface {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.alignment-visualization {
  height: 120px;
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
  width: 80px;
  height: 80px;
}

.wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #ff00ff, transparent);
  border-radius: 50%;
  box-shadow: 0 0 20px #ff00ff;
}

.wheel-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 0, 255, 0.5);
  border-radius: 50%;
  animation: wheelRotate linear infinite;
}

.wheel-ring:nth-child(2) { width: 40px; height: 40px; }
.wheel-ring:nth-child(3) { width: 60px; height: 60px; }
.wheel-ring:nth-child(4) { width: 80px; height: 80px; }
.wheel-ring:nth-child(5) { width: 100px; height: 100px; }
.wheel-ring:nth-child(6) { width: 120px; height: 120px; }

@keyframes wheelRotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.alignment-indicators {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
}

.indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0 0;
  width: 70px;
  height: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator:hover {
  transform: scale(1.2);
}

.indicator-dot {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: #ffff00;
  border-radius: 50%;
  box-shadow: 0 0 10px #ffff00;
}

.consciousness-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.consciousness-controls {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric-label {
  font-size: 0.9rem;
  color: #cccccc;
}

.metric-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ffff, #ff00ff);
  border-radius: 4px;
  animation: barFill 2s ease-out;
}

@keyframes barFill {
  0% { width: 0%; }
}

/* Quantum Productivity */
.productivity-interface {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.quantum-field {
  height: 120px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
}

.field-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #ffff00, transparent);
  border-radius: 50%;
  animation: fieldFloat 3s ease-in-out infinite;
}

@keyframes fieldFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
  50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
}

.productivity-multipliers {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.multiplier {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.multiplier-label {
  font-size: 0.8rem;
  color: #cccccc;
  text-align: center;
}

.multiplier-value {
  font-size: 1.5rem;
  color: #ffff00;
  font-weight: 900;
  text-shadow: 0 0 10px #ffff00;
}

/* Conversational Intelligence Lab */
.lab-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  border: 1px solid rgba(0, 255, 255, 0.2);
}

.preview-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 255, 255, 0.1);
  border-radius: 50%;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.preview-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.preview-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.preview-stat .stat-label {
  color: #cccccc;
  font-size: 0.8rem;
}

.preview-stat .stat-value {
  color: #00ffff;
  font-weight: 600;
  font-size: 0.9rem;
}

.lab-controls {
  display: flex;
  justify-content: center;
}

/* AI Experiments Lab */
.experiments-interface {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.experiment-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.experiment-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.experiment-item:hover {
  border-color: rgba(0, 255, 255, 0.5);
  transform: scale(1.05);
}

.experiment-core {
  position: relative;
  width: 30px;
  height: 30px;
}

.core-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #00ffff, transparent);
  border-radius: 50%;
  animation: corePulse 2s ease-in-out infinite;
}

@keyframes corePulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.3); }
}

.experiment-name {
  font-size: 0.8rem;
  color: #cccccc;
  text-align: center;
}

.experiment-controls {
  display: flex;
  justify-content: center;
}

/* Universal Impact Monitor */
.impact-interface {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.impact-visualization {
  height: 120px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.impact-waves {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}

.wave {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0, 255, 255, 0.5);
  border-radius: 50%;
  animation: waveExpand linear infinite;
  cursor: pointer;
  transition: all 0.3s ease;
}

.wave:hover {
  border-color: rgba(0, 255, 255, 1);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
}

.wave:nth-child(1) { width: 20px; height: 20px; }
.wave:nth-child(2) { width: 40px; height: 40px; }
.wave:nth-child(3) { width: 60px; height: 60px; }
.wave:nth-child(4) { width: 80px; height: 80px; }
.wave:nth-child(5) { width: 100px; height: 100px; }

@keyframes waveExpand {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
}

.impact-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.impact-center:hover {
  transform: translate(-50%, -50%) scale(1.5);
}

.center-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #00ffff, transparent);
  border-radius: 50%;
  box-shadow: 0 0 20px #00ffff;
}

.center-ripples {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 50%;
  animation: rippleExpand 2s ease-in-out infinite;
}

@keyframes rippleExpand {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

.impact-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.impact-controls {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.impact-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.impact-metric .metric-label {
  font-size: 0.9rem;
  color: #cccccc;
}

.impact-metric .metric-value {
  font-size: 1.2rem;
  color: #00ffff;
  font-weight: 700;
  text-shadow: 0 0 10px #00ffff;
}

/* Nexus Buttons */
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
}

.nexus-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
}

.nexus-btn.primary {
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  color: #000000;
}

.nexus-btn.secondary {
  background: linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(255, 0, 255, 0.3));
  border: 1px solid rgba(0, 255, 255, 0.5);
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


/* Responsive Design */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .nexus-title {
    font-size: 2rem;
  }
  
  .title-main {
    font-size: 2rem;
  }
  
  .title-sub {
    font-size: 1.5rem;
  }
  
  .title-center {
    font-size: 1.2rem;
  }
  
  .nexus-header {
    padding: 1rem;
  }
  
  .agent-dashboard {
    padding: 0 1rem 1rem;
  }
}
</style>
