<template>
  <div class="conversational-intelligence-lab">
    <!-- Neural Grid Background -->
    <div class="neural-grid">
      <div class="grid-line" v-for="i in 20" :key="i" :style="{ animationDelay: `${i * 0.1}s` }"></div>
    </div>

    <!-- Floating Neural Particles -->
    <div class="neural-particles">
      <div 
        class="particle" 
        v-for="i in 30" 
        :key="i"
        :style="{ 
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: (Math.random() * 10 + 5) + 's'
        }"
      ></div>
    </div>

    <!-- Lab Header -->
    <div class="lab-header">
      <div class="header-content">
        <div class="lab-logo">
          <div class="logo-core">
            <div class="core-ring"></div>
            <div class="core-center"></div>
            <div class="energy-pulse"></div>
            <div class="chat-bubbles">
              <div class="bubble" v-for="i in 3" :key="i" :style="{ 
                animationDelay: `${i * 0.5}s`,
                left: Math.random() * 60 + 20 + '%',
                top: Math.random() * 60 + 20 + '%'
              }"></div>
            </div>
          </div>
          <h1 class="lab-title">
            <span class="title-main">CONVERSATIONAL</span>
            <span class="title-sub">INTELLIGENCE</span>
            <span class="title-center">LAB</span>
          </h1>
        </div>
        <div class="lab-subtitle">
          <span class="subtitle-text">Advanced AI Chatbot Development & Training Center</span>
          <div class="subtitle-glow"></div>
        </div>
        <div class="lab-stats">
          <div class="stat-item">
            <span class="stat-value">{{ labStats.activeBots }}</span>
            <span class="stat-label">Active Bots</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ labStats.conversations }}</span>
            <span class="stat-label">Conversations</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ labStats.accuracy }}%</span>
            <span class="stat-label">Avg Accuracy</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ labStats.satisfaction }}%</span>
            <span class="stat-label">User Satisfaction</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lab Dashboard -->
    <div class="lab-dashboard">
      <div class="dashboard-grid">
        <!-- Chat Simulator -->
        <div class="dashboard-card chat-simulator" @click="openChatSimulator">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>Chat Simulator</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="card-preview">
              <div class="preview-icon">💬</div>
              <div class="preview-stats">
                <div class="preview-stat">
                  <span class="stat-label">Active</span>
                  <span class="stat-value">{{ simulatorStats.active }}</span>
                </div>
                <div class="preview-stat">
                  <span class="stat-label">Sessions</span>
                  <span class="stat-value">{{ simulatorStats.sessions }}</span>
                </div>
              </div>
            </div>
            <div class="card-actions">
              <button class="nexus-btn primary" @click.stop="startSimulation">
                <span class="btn-text">Start Test</span>
                <div class="btn-energy"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Bot Development Hub -->
        <div class="dashboard-card bot-development" @click="openBotDevelopment">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>Bot Development Hub</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="card-preview">
              <div class="preview-icon">🤖</div>
              <div class="preview-stats">
                <div class="preview-stat">
                  <span class="stat-label">Templates</span>
                  <span class="stat-value">{{ botStats.templates }}</span>
                </div>
                <div class="preview-stat">
                  <span class="stat-label">Created</span>
                  <span class="stat-value">{{ botStats.created }}</span>
                </div>
              </div>
            </div>
            <div class="card-actions">
              <button class="nexus-btn primary" @click.stop="createNewBot">
                <span class="btn-text">Create Bot</span>
                <div class="btn-energy"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Training Center -->
        <div class="dashboard-card training-center" @click="openTrainingCenter">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>Training Center</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="card-preview">
              <div class="preview-icon">🧠</div>
              <div class="preview-stats">
                <div class="preview-stat">
                  <span class="stat-label">Models</span>
                  <span class="stat-value">{{ trainingStats.models }}</span>
                </div>
                <div class="preview-stat">
                  <span class="stat-label">Accuracy</span>
                  <span class="stat-value">{{ trainingStats.accuracy }}%</span>
                </div>
              </div>
            </div>
            <div class="card-actions">
              <button class="nexus-btn primary" @click.stop="startTraining">
                <span class="btn-text">Train Model</span>
                <div class="btn-energy"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Analytics Dashboard -->
        <div class="dashboard-card analytics-dashboard" @click="openAnalytics">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>Analytics Dashboard</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="card-preview">
              <div class="preview-icon">📊</div>
              <div class="preview-stats">
                <div class="preview-stat">
                  <span class="stat-label">Insights</span>
                  <span class="stat-value">{{ analyticsStats.insights }}</span>
                </div>
                <div class="preview-stat">
                  <span class="stat-label">Reports</span>
                  <span class="stat-value">{{ analyticsStats.reports }}</span>
                </div>
              </div>
            </div>
            <div class="card-actions">
              <button class="nexus-btn primary" @click.stop="generateReport">
                <span class="btn-text">Generate Report</span>
                <div class="btn-energy"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Bot Library -->
        <div class="dashboard-card bot-library" @click="openBotLibrary">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>Bot Library</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="card-preview">
              <div class="preview-icon">📚</div>
              <div class="preview-stats">
                <div class="preview-stat">
                  <span class="stat-label">Templates</span>
                  <span class="stat-value">{{ libraryStats.templates }}</span>
                </div>
                <div class="preview-stat">
                  <span class="stat-label">Downloads</span>
                  <span class="stat-value">{{ libraryStats.downloads }}</span>
                </div>
              </div>
            </div>
            <div class="card-actions">
              <button class="nexus-btn primary" @click.stop="browseLibrary">
                <span class="btn-text">Browse</span>
                <div class="btn-energy"></div>
              </button>
            </div>
          </div>
        </div>

        <!-- Performance Monitor -->
        <div class="dashboard-card performance-monitor" @click="openPerformanceMonitor">
          <div class="card-header">
            <div class="header-icon">
              <div class="icon-core"></div>
              <div class="icon-rings"></div>
            </div>
            <h3>Performance Monitor</h3>
            <div class="card-glow"></div>
          </div>
          <div class="card-content">
            <div class="card-preview">
              <div class="preview-icon">⚡</div>
              <div class="preview-stats">
                <div class="preview-stat">
                  <span class="stat-label">Uptime</span>
                  <span class="stat-value">{{ performanceStats.uptime }}%</span>
                </div>
                <div class="preview-stat">
                  <span class="stat-label">Response</span>
                  <span class="stat-value">{{ performanceStats.response }}ms</span>
                </div>
              </div>
            </div>
            <div class="card-actions">
              <button class="nexus-btn primary" @click.stop="optimizePerformance">
                <span class="btn-text">Optimize</span>
                <div class="btn-energy"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ConversationalIntelligenceLab',
  data() {
    return {
      labStats: {
        activeBots: 12,
        conversations: 2847,
        accuracy: 94.7,
        satisfaction: 96.3
      },
      botStats: {
        templates: 5,
        created: 23
      },
      simulatorStats: {
        active: 3,
        sessions: 156
      },
      trainingStats: {
        models: 8,
        accuracy: 92.1
      },
      analyticsStats: {
        insights: 47,
        reports: 12
      },
      libraryStats: {
        templates: 15,
        downloads: 234
      },
      performanceStats: {
        uptime: 99.9,
        response: 45
      }
    }
  },
  mounted() {
    this.initializeLabEffects()
  },
  methods: {
    initializeLabEffects() {
      // Initialize lab animations
      this.animateNeuralGrid()
      this.animateParticles()
      this.updateStats()
    },
    animateNeuralGrid() {
      // Animate neural grid lines
      const gridLines = document.querySelectorAll('.grid-line')
      gridLines.forEach((line, index) => {
        setTimeout(() => {
          line.style.opacity = '1'
        }, index * 50)
      })
    },
    animateParticles() {
      // Animate floating particles
      const particles = document.querySelectorAll('.particle')
      particles.forEach(particle => {
        setInterval(() => {
          particle.style.transform = 'translate(0, -20px) scale(1.2)'
          setTimeout(() => {
            particle.style.transform = 'translate(0, 0) scale(1)'
          }, 500)
        }, Math.random() * 3000 + 2000)
      })
    },
    updateStats() {
      // Simulate real-time stats updates
      setInterval(() => {
        this.labStats.conversations += Math.floor(Math.random() * 3)
        this.labStats.accuracy = Math.min(100, this.labStats.accuracy + Math.random() * 0.1)
        this.labStats.satisfaction = Math.min(100, this.labStats.satisfaction + Math.random() * 0.1)
      }, 5000)
    },
    
    // Navigation Methods
    openBotDevelopment() {
      this.$emit('open-bot-development')
      console.log('Opening Bot Development Hub...')
    },
    openChatSimulator() {
      this.$router.push('/neural-nexus/conversational-intelligence/chat-simulator')
      console.log('Opening Chat Simulator...')
    },
    openTrainingCenter() {
      this.$emit('open-training-center')
      console.log('Opening Training Center...')
    },
    openAnalytics() {
      this.$emit('open-analytics')
      console.log('Opening Analytics Dashboard...')
    },
    openBotLibrary() {
      this.$emit('open-bot-library')
      console.log('Opening Bot Library...')
    },
    openPerformanceMonitor() {
      this.$emit('open-performance-monitor')
      console.log('Opening Performance Monitor...')
    },
    
    // Action Methods
    createNewBot() {
      console.log('Creating new bot...')
      this.botStats.created += 1
    },
    startSimulation() {
      console.log('Starting chat simulation...')
      this.simulatorStats.sessions += 1
    },
    startTraining() {
      console.log('Starting model training...')
      this.trainingStats.models += 1
    },
    generateReport() {
      console.log('Generating analytics report...')
      this.analyticsStats.reports += 1
    },
    browseLibrary() {
      console.log('Browsing bot library...')
      this.libraryStats.downloads += 1
    },
    optimizePerformance() {
      console.log('Optimizing performance...')
      this.performanceStats.response = Math.max(10, this.performanceStats.response - 5)
    }
  }
}
</script>

<style scoped>
.conversational-intelligence-lab {
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
  opacity: 0;
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

/* Lab Header */
.lab-header {
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

.lab-logo {
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

.chat-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.bubble {
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #00ffff, transparent);
  border-radius: 50%;
  animation: bubbleFloat 3s ease-in-out infinite;
}

@keyframes coreRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes energyPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
}

@keyframes bubbleFloat {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
  50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
}

.lab-title {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.title-main {
  font-size: 2.5rem;
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
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
}

.title-center {
  font-size: 1.5rem;
  font-weight: 600;
  color: #00ffff;
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.5);
}

@keyframes titleGradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.lab-subtitle {
  position: relative;
  margin-bottom: 1.5rem;
}

.subtitle-text {
  font-size: 1.1rem;
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

.lab-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 255, 255, 0.2);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-item:hover {
  border-color: rgba(0, 255, 255, 0.5);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
}

.stat-value {
  color: #00ffff;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 0 0 10px #00ffff;
}

.stat-label {
  color: #cccccc;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Lab Dashboard */
.lab-dashboard {
  position: relative;
  z-index: 10;
  padding: 0 2rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
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
  cursor: pointer;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  border-color: rgba(0, 255, 255, 0.6);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
}

.dashboard-card:active {
  transform: translateY(-2px) scale(0.98);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
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
  font-size: 1.2rem;
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

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-preview {
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

.card-actions {
  display: flex;
  justify-content: center;
}

.nexus-btn {
  position: relative;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: linear-gradient(45deg, #00ffff, #ff00ff);
  color: #000000;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  width: 100%;
}

.nexus-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
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
  
  .lab-title {
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
  
  .lab-header {
    padding: 1rem;
  }
  
  .lab-dashboard {
    padding: 0 1rem 1rem;
  }
  
  .lab-stats {
    gap: 1rem;
  }
  
  .stat-item {
    padding: 0.8rem;
  }
}
</style>
