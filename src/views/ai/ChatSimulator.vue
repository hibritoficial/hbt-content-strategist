<template>
  <div class="chat-simulator" :class="{ 'dark-mode': isDarkMode, 'with-sidebar': showJsonSidebar }">
    <!-- JSON Sidebar -->
    <div v-if="showJsonSidebar" class="json-sidebar">
      <div class="sidebar-header">
        <h3>📋 Estrutura JSON</h3>
        <button @click="showJsonSidebar = false" class="close-sidebar">×</button>
      </div>
      <div class="sidebar-actions">
        <button @click="selectAllJson" class="select-all-btn">
          <span class="select-icon">📋</span>
          <span class="select-text">Selecionar Tudo</span>
        </button>
      </div>
      <div class="json-content" ref="jsonContent">
        <pre class="json-display" ref="jsonDisplay"><code v-html="highlightedJson"></code></pre>
      </div>
    </div>

    <!-- Select Alert -->
    <div v-if="showSelectAlert" class="select-alert">
      <div class="alert-content">
        <div class="alert-icon">✅</div>
        <div class="alert-text">
          <strong>JSON Selecionado!</strong>
          <p>Código copiado para a área de transferência</p>
        </div>
      </div>
    </div>

    <!-- Neural Grid Background -->
    <div class="neural-grid">
      <div class="grid-line" v-for="i in 15" :key="i" :style="{ animationDelay: `${i * 0.1}s` }"></div>
    </div>

    <!-- Floating Neural Particles -->
    <div class="neural-particles">
      <div 
        class="particle" 
        v-for="i in 25" 
        :key="i"
        :style="{ 
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: (Math.random() * 10 + 5) + 's'
        }"
      ></div>
    </div>

    <!-- Header -->
    <div class="simulator-header">
      <div class="header-content">
        <div class="header-left">
          <button class="back-btn" @click="goBack">
            <span class="back-icon">←</span>
            <span class="back-text">Back to Lab</span>
          </button>
          <div class="header-title">
            <h1>Chat Simulator</h1>
            <p>Advanced AI Conversation Testing & Development</p>
          </div>
        </div>
        <div class="header-right">
          <div class="header-actions">
            <div class="mode-toggle">
              <button class="toggle-btn" @click="toggleMode" :class="{ active: isDarkMode }">
                <span class="toggle-icon">{{ isDarkMode ? '🌙' : '☀️' }}</span>
                <span class="toggle-text">{{ isDarkMode ? 'Dark' : 'Light' }}</span>
              </button>
            </div>
          </div>
          <div class="simulator-stats">
            <div class="stat-item">
              <span class="stat-value">{{ conversationStats.messages }}</span>
              <span class="stat-label">Messages</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ conversationStats.responses }}</span>
              <span class="stat-label">Responses</span>
            </div>
            <div class="stat-item">
              <span class="stat-value">{{ conversationStats.accuracy }}%</span>
              <span class="stat-label">Accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Experiments Menu -->
    <div class="experiments-menu">
      <div class="menu-container">
        <div class="menu-tabs">
          <button 
            v-for="experiment in experiments" 
            :key="experiment.id"
            class="tab-btn"
            :class="{ active: currentExperiment && currentExperiment.id === experiment.id }"
            @click="switchExperiment(experiment)"
          >
            <span class="tab-icon">{{ experiment.icon }}</span>
            <span class="tab-label">{{ experiment.name }}</span>
          </button>
        </div>
        <div class="experiment-info" v-if="currentExperiment">
          <div class="experiment-header">
            <h3>{{ currentExperiment.name }}</h3>
            <p>{{ currentExperiment.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Chat Interface -->
      <div class="chat-interface">
        <div class="chat-container">
        <div class="chat-messages" ref="chatMessages">
          <div 
            class="message" 
            v-for="message in messages" 
            :key="message.id"
            :class="[message.type, { 'typing': message.isTyping }]"
          >
            <div class="message-avatar">
              <div class="avatar" :class="message.type">
                <img v-if="message.type === 'bot' && currentExperiment && currentExperiment.id === 'emotions-map'" 
                     src="/images/samelly-avatar.jpg" 
                     alt="Samelly - Guia Espiritual" 
                     class="avatar-image human-avatar samelly-avatar"
                     @error="handleImageError" />
                <img v-else-if="message.type === 'bot' && currentExperiment && currentExperiment.id === 'customer-support'" 
                     src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face&auto=format&q=95" 
                     alt="Atendente" 
                     class="avatar-image human-avatar support-avatar"
                     @error="handleImageError" />
                <img v-else-if="message.type === 'bot' && currentExperiment" 
                     src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face&auto=format&q=95" 
                     alt="Assistente" 
                     class="avatar-image human-avatar assistant-avatar"
                     @error="handleImageError" />
                <span v-else>👤</span>
              </div>
            </div>
            <div class="message-content">
              <!-- Presentation Photo -->
              <div v-if="message.showPresentation" class="presentation-photo">
                <div class="photo-container">
                  <img src="/images/samelly-presentation.jpg" alt="Samelly" class="presentation-image" />
                  <div class="photo-glow"></div>
                </div>
              </div>
              
              <!-- Score Display -->
              <div v-if="message.showScore" class="score-visual">
                <div class="score-header">
                  <h3>📊 Sua Pontuação</h3>
                  <p>Baseada nas suas 10 respostas</p>
                </div>
                <div class="score-bars-container">
                  <div class="score-item-visual" v-for="(score, group) in userScore" :key="group">
                    <div class="score-info">
                      <span class="score-emoji">{{ getGroupEmoji(group) }}</span>
                      <span class="score-name">{{ getGroupName(group) }}</span>
                      <span class="score-value-display">{{ score }}/10</span>
                    </div>
                    <div class="score-bar-visual">
                      <div 
                        class="score-fill-visual" 
                        :class="group.toLowerCase()"
                        :style="{ width: (score / 10 * 100) + '%' }"
                      ></div>
                    </div>
                    <div class="score-percentage">{{ Math.round(score / 10 * 100) }}%</div>
                  </div>
                </div>
                <div class="score-footer">
                  <p>🎯 <strong>{{ getWinningGroup() }}</strong> é o seu perfil dominante!</p>
                </div>
              </div>
              
              <div class="message-bubble">
                <div v-if="message.type === 'bot' && message.isTyping" class="typing-indicator">
                  <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div v-else class="message-text" v-html="message.text"></div>
              </div>
              <div class="message-time">{{ message.time }}</div>
            </div>
          </div>
        </div>

        <!-- Interactive Elements -->
        <div class="interactive-elements" v-if="currentQuestion">
          <div class="question-container">
            <div class="question-content">
              <!-- Text Input -->
              <div v-if="currentQuestion.type === 'text'" class="input-group">
                <input 
                  v-model="userInput" 
                  type="text" 
                  :placeholder="currentQuestion.placeholder"
                  @keyup.enter="submitResponse"
                  class="text-input"
                  ref="textInput"
                />
                <button @click="submitResponse" class="submit-btn" :disabled="!userInput.trim()">
                  <span class="submit-icon">→</span>
                </button>
              </div>

              <!-- Button Options -->
              <div v-else-if="currentQuestion.type === 'buttons'" class="button-group">
                <button 
                  v-for="option in currentQuestion.options" 
                  :key="option.value"
                  @click="selectOption(option.value)"
                  class="option-button"
                >
                  <span class="button-icon" v-if="option.icon">{{ option.icon }}</span>
                  <span class="button-text">{{ option.label }}</span>
                </button>
              </div>

              <!-- Checkbox Options -->
              <div v-else-if="currentQuestion.type === 'checkboxes'" class="checkbox-group">
                <div 
                  v-for="option in currentQuestion.options" 
                  :key="option.value"
                  class="checkbox-item"
                  @click="toggleCheckbox(option.value)"
                >
                  <div class="checkbox" :class="{ checked: selectedCheckboxes.includes(option.value) }">
                    <div class="checkbox-mark" v-if="selectedCheckboxes.includes(option.value)">✓</div>
                  </div>
                  <div class="checkbox-content">
                    <span class="checkbox-icon" v-if="option.icon">{{ option.icon }}</span>
                    <span class="checkbox-text">{{ option.label }}</span>
                  </div>
                </div>
                <button @click="submitCheckboxes" class="submit-checkboxes" :disabled="selectedCheckboxes.length === 0">
                  <span class="submit-text">Continue</span>
                  <span class="submit-icon">→</span>
                </button>
              </div>

              <!-- Card Selection -->
              <div v-else-if="currentQuestion.type === 'cards'" class="card-group">
                <div 
                  v-for="option in currentQuestion.options" 
                  :key="option.value"
                  class="option-card"
                  :class="{ selected: selectedCard === option.value }"
                  @click="selectCard(option.value)"
                >
                  <div class="card-icon">{{ option.icon }}</div>
                  <div class="card-content">
                    <h4 class="card-title">{{ option.label }}</h4>
                    <p class="card-description" v-if="option.description">{{ option.description }}</p>
                  </div>
                </div>
                <button @click="submitCard" class="submit-card" :disabled="!selectedCard">
                  <span class="submit-text">Continue</span>
                  <span class="submit-icon">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input (when no active question) -->
        <div class="chat-input" v-if="!currentQuestion">
          <div class="input-container">
            <input 
              v-model="userInput" 
              @keyup.enter="sendMessage"
              placeholder="Type your message..."
              class="message-input"
              ref="messageInput"
            />
            <button @click="sendMessage" class="send-btn" :disabled="!userInput.trim()">
              <span class="send-icon">🚀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>

    <!-- JSON Viewer Modal -->
    <div class="json-modal" v-if="showJsonModal" @click="closeJsonModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Chat Structure JSON</h3>
          <button class="close-btn" @click="closeJsonModal">×</button>
        </div>
        <div class="modal-body">
          <div class="json-container">
            <pre class="json-code">{{ formattedJson }}</pre>
          </div>
        </div>
        <div class="modal-footer">
          <button class="copy-btn" @click="copyJson">
            <span class="copy-icon">📋</span>
            Copy JSON
          </button>
          <button class="export-btn" @click="exportJson">
            <span class="export-icon">💾</span>
            Export
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatSimulator',
  data() {
    return {
      isDarkMode: true,
      userInput: '',
      selectedCheckboxes: [],
      selectedCard: null,
      currentQuestion: null,
      showJsonModal: false,
      userData: {},
      conversationStats: {
        messages: 0,
        responses: 0,
        accuracy: 94.7
      },
      experiments: [
        {
          id: 'basic-chat',
          name: 'Chat Básico',
          icon: '💬',
          description: 'Fluxo conversacional simples para testar interações básicas',
          chatStructure: {
            welcome: {
              messages: [
                {
                  type: 'bot',
                  text: 'Olá! Como posso te ajudar hoje?',
                  time: '10:00'
                }
              ]
            },
            flow: [
              {
                type: 'bot',
                text: 'Qual é o seu nome?',
                question: {
                  type: 'text',
                  placeholder: 'Digite seu nome...'
                }
              },
              {
                type: 'bot',
                text: 'Prazer em conhecê-lo! Em que posso te ajudar?',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'help', label: 'Preciso de ajuda', icon: '🆘' },
                    { value: 'info', label: 'Quero informações', icon: 'ℹ️' },
                    { value: 'chat', label: 'Só conversar', icon: '💬' }
                  ]
                }
              }
            ]
          }
        },
        {
          id: 'emotions-map',
          name: 'Mapa das Emoções',
          icon: '🌹',
          description: 'Avaliação de inteligência emocional com orientação espiritual',
          chatStructure: {
            welcome: {
              messages: [
                {
                  type: 'bot',
                  text: 'Olá! 🌹 Bem-vinda ao Mapa das Emoções!',
                  time: '10:30'
                },
                {
                  type: 'bot',
                  text: 'Sou a Samelly, sua guia espiritual e estou aqui para te ajudar a descobrir como você lida com suas emoções. Vamos fazer uma jornada de autoconhecimento juntas?',
                  time: '10:30',
                  showPresentation: true
                }
              ]
            },
            flow: [
              {
                type: 'bot',
                text: 'Antes de começarmos nossa jornada de autoconhecimento, preciso saber seu nome para que possamos nos conectar de forma mais pessoal. Qual é o seu nome?',
                question: {
                  type: 'text',
                  placeholder: 'Digite seu nome...'
                }
              },
              {
                type: 'bot',
                text: 'Obrigada por compartilhar seu nome comigo! Agora vou te explicar como funciona nosso teste de autoconhecimento. Vou apresentar 10 situações do dia a dia e você escolherá a resposta que mais se parece com você. É importante ser sincera para que possamos descobrir juntas como você lida com suas emoções. Está pronta para começar?',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'start', label: 'Sim, estou pronta! 🌹', icon: '🌹' }
                  ]
                }
              },
              {
                type: 'bot',
                text: '1. No trabalho, quando alguém critica sua ideia:',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'a1', label: 'Fico confuso(a), nem sei direito o que sinto na hora', icon: '😕' },
                    { value: 'b1', label: 'Eu até sei que fiquei irritado(a) ou triste, mas não consigo reagir de forma saudável', icon: '😤' },
                    { value: 'c1', label: 'Eu reconheço o que senti, consigo respirar fundo e escolher como responder', icon: '😌' }
                  ]
                }
              },
              {
                type: 'bot',
                text: '2. Em uma briga de casal ou amizade:',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'a2', label: 'Não sei o que sinto exatamente, só sei que "dói"', icon: '💔' },
                    { value: 'b2', label: 'Sei que estou magoado(a), mas acabo explodindo ou me fechando', icon: '😡' },
                    { value: 'c2', label: 'Reconheço a mágoa e tento conversar de forma clara, mesmo que difícil', icon: '💙' }
                  ]
                }
              },
              {
                type: 'bot',
                text: '3. Quando me sinto ansioso(a) sem motivo aparente:',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'a3', label: 'Fico perdido(a), não sei nem identificar se é ansiedade mesmo', icon: '😰' },
                    { value: 'b3', label: 'Eu percebo que estou ansioso(a), mas não sei como acalmar meu corpo/mente', icon: '😟' },
                    { value: 'c3', label: 'Consigo perceber os sinais e uso alguma prática (respiração, pausa, oração, exercício) para me ajudar', icon: '🧘' }
                  ]
                }
              },
              {
                type: 'bot',
                text: '4. Em momentos de estresse no trabalho:',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'a4', label: 'Só percebo que fiquei mal quando já estou exausto(a)', icon: '😵' },
                    { value: 'b4', label: 'Percebo na hora, mas mesmo assim me afogo na pressão', icon: '😫' },
                    { value: 'c4', label: 'Percebo e busco organizar prioridades ou pedir ajuda', icon: '📋' }
                  ]
                }
              },
              {
                type: 'bot',
                text: '5. Quando alguém não corresponde às minhas expectativas:',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'a5', label: 'Só sinto uma mistura estranha e não entendo bem o que está acontecendo comigo', icon: '🤔' },
                    { value: 'b5', label: 'Sei que estou frustrado(a), mas não consigo mudar meu padrão de cobrança', icon: '😠' },
                    { value: 'c5', label: 'Reconheço a frustração e tento ajustar minhas expectativas', icon: '🔄' }
                  ]
                }
              },
              {
                type: 'bot',
                text: '6. Em minha espiritualidade:',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'a6', label: 'Às vezes me sinto desconectado(a), mas nem sei o porquê', icon: '🌫️' },
                    { value: 'b6', label: 'Eu até sinto quando estou distante, mas não sei como voltar a me alinhar', icon: '🌙' },
                    { value: 'c6', label: 'Eu percebo quando me desconecto e tenho práticas que me ajudam a me reconectar', icon: '✨' }
                  ]
                }
              },
              {
                type: 'bot',
                text: '7. Quando algo dá errado em meus planos:',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'a7', label: 'Nem sei o que sinto, só fico meio "paralisado(a)"', icon: '🛑' },
                    { value: 'b7', label: 'Sei que estou com raiva ou frustrado(a), mas fico remoendo', icon: '😤' },
                    { value: 'c7', label: 'Reconheço a emoção e tento aprender com a situação', icon: '📚' }
                  ]
                }
              },
              {
                type: 'bot',
                text: '8. Em um dia difícil:',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'a8', label: 'Só percebo minhas emoções depois, quando já passei mal', icon: '😔' },
                    { value: 'b8', label: 'Sei que estou mal, mas desconto em comida, redes sociais ou em outras pessoas', icon: '🍕' },
                    { value: 'c8', label: 'Reconheço o que estou vivendo e busco uma forma mais saudável de lidar', icon: '🌱' }
                  ]
                }
              },
              {
                type: 'bot',
                text: '9. Ao lidar com alguém próximo que está sofrendo:',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'a9', label: 'Fico sem saber o que sentir ou fazer', icon: '😶' },
                    { value: 'b9', label: 'Sei que estou triste junto, mas não consigo oferecer apoio verdadeiro', icon: '😢' },
                    { value: 'c9', label: 'Reconheço minha emoção e consigo apoiar sem me perder', icon: '🤗' }
                  ]
                }
              },
              {
                type: 'bot',
                text: '10. Quando preciso tomar uma decisão importante:',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'a10', label: 'Fico travado(a), sem clareza do que sinto', icon: '🤯' },
                    { value: 'b10', label: 'Sei o que sinto, mas deixo a emoção me dominar e não consigo decidir bem', icon: '😵' },
                    { value: 'c10', label: 'Escuto minhas emoções e junto com a razão consigo escolher melhor', icon: '⚖️' }
                  ]
                }
              }
            ],
            results: {
              group1: {
                title: '🌱 Grupo 1 – Reconhecimento inicial',
                description: 'Você está aprendendo a dar nome às suas emoções. Às vezes sente um turbilhão por dentro, mas não consegue traduzir em palavras, nem entender de onde vem. Isso não é fraqueza — é apenas um convite da vida para se conhecer de verdade.',
                help: 'Aqui o trabalho começa com o despertar da consciência. Através da escrita emocional, você vai aprender a dar voz ao que sente; com a astrologia, podemos olhar para seus mapas e ciclos para entender como suas emoções se manifestam; e com o baralho cigano, trazemos a força dos arquétipos para situações que parecem confusas. É o início de uma jornada de alfabetização emocional e espiritual e estou aqui para seguirmos juntos.'
              },
              group2: {
                title: '🔥 Grupo 2 – Reconhece, mas não age',
                description: 'Você já percebe suas emoções, sabe quando está ansioso(a), frustrado(a) ou triste. Mas sente que fica preso(a) no mesmo lugar — reconhece, mas não consegue transformar. É como se estivesse olhando para a porta, mas sem força ou coragem de atravessá-la.',
                help: 'Aqui entramos no campo da integração. Com base em Jung, podemos trabalhar seus padrões inconscientes, para que você não fique repetindo as mesmas reações. Através da escrita emocional, você aprende a transformar percepção em ação. E com a espiritualidade prática — astrologia e baralho cigano — abrimos caminhos para escolhas mais conscientes e alinhadas. Assim, você sai da estagnação e entra no movimento da vida.'
              },
              group3: {
                title: '🌟 Grupo 3 – Gestor(a) em evolução',
                description: 'Você já tem consciência, já experimenta algumas práticas e percebe suas emoções de forma mais clara. Mas sabe que pode ir além: sente que existe uma versão mais livre, mais inteira e mais sábia de si mesmo(a), esperando para emergir.',
                help: 'Nesse ponto, minha função é expandir sua maestria emocional e espiritual. Podemos mergulhar em leituras mais profundas do seu mapa e dos trânsitos astrológicos, trabalhar arquétipos junguianos para ampliar sua visão de mundo, e usar o baralho cigano como espelho do inconsciente, mostrando possibilidades de evolução. Você já não busca apenas sobreviver às emoções — você busca crescer com elas.'
              }
            }
          }
        },
        {
          id: 'customer-support',
          name: 'Suporte ao Cliente',
          icon: '🎧',
          description: 'Simulação de atendimento ao cliente com gestão de tickets',
          chatStructure: {
            welcome: {
              messages: [
                {
                  type: 'bot',
                  text: 'Olá! Sou o atendente virtual e estou aqui para te ajudar. Como posso resolver sua questão hoje?',
                  time: '10:00'
                }
              ]
            },
            flow: [
              {
                type: 'bot',
                text: 'Qual é o seu nome?',
                question: {
                  type: 'text',
                  placeholder: 'Digite seu nome...'
                }
              },
              {
                type: 'bot',
                text: 'Como posso te ajudar hoje?',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'technical', label: 'Problema técnico', icon: '🔧' },
                    { value: 'billing', label: 'Questão de cobrança', icon: '💳' },
                    { value: 'product', label: 'Dúvida sobre produto', icon: '📦' },
                    { value: 'other', label: 'Outro assunto', icon: '❓' }
                  ]
                }
              }
            ]
          }
        },
        {
          id: 'lead-qualification',
          name: 'Qualificação de Leads',
          icon: '🎯',
          description: 'Fluxo de qualificação de vendas com sistema de pontuação',
          chatStructure: {
            welcome: {
              messages: [
                {
                  type: 'bot',
                  text: 'Olá! Bem-vindo ao nosso processo de qualificação. Vou fazer algumas perguntas para entender melhor suas necessidades.',
                  time: '10:00'
                }
              ]
            },
            flow: [
              {
                type: 'bot',
                text: 'Qual é o seu nome?',
                question: {
                  type: 'text',
                  placeholder: 'Digite seu nome...'
                }
              },
              {
                type: 'bot',
                text: 'Qual é o tamanho da sua empresa?',
                question: {
                  type: 'buttons',
                  options: [
                    { value: 'startup', label: 'Startup (1-10 pessoas)', icon: '🚀' },
                    { value: 'small', label: 'Pequena (11-50 pessoas)', icon: '🏢' },
                    { value: 'medium', label: 'Média (51-200 pessoas)', icon: '🏭' },
                    { value: 'large', label: 'Grande (200+ pessoas)', icon: '🏗️' }
                  ]
                }
              }
            ]
          }
        }
      ],
      currentExperiment: null,
      currentExperimentData: null,
      messages: [],
      conversationFlow: [],
      currentFlowIndex: 0,
      userAnswers: [],
      showResults: false,
      userScore: {
        A: 0,
        B: 0,
        C: 0
      },
      finalResult: null,
      showDetailedResults: false,
      showJsonSidebar: true,
      currentJsonHighlight: null,
      jsonScrollPosition: 0,
      showSelectAlert: false,
      contactFlow: [],
      contactFlowIndex: 0
    }
  },
  watch: {
    currentQuestion(newQuestion) {
      if (newQuestion) {
        // When new question options appear, scroll to ensure visibility
        this.$nextTick(() => {
          setTimeout(() => {
            this.scrollToBottom()
          }, 200) // Delay to ensure DOM is updated with options
        })
      }
    }
  },
  computed: {
    testResult() {
      if (this.userAnswers.length < 10) return null
      
      // Calculate scores for each group
      this.userScore = { A: 0, B: 0, C: 0 }
      this.userAnswers.forEach(answer => {
        if (answer.startsWith('a')) this.userScore.A++
        else if (answer.startsWith('b')) this.userScore.B++
        else if (answer.startsWith('c')) this.userScore.C++
      })
      
      // Determine the group with highest score
      const maxScore = Math.max(this.userScore.A, this.userScore.B, this.userScore.C)
      if (this.userScore.A === maxScore) return 'groupA'
      if (this.userScore.B === maxScore) return 'groupB'
      return 'groupC'
    },
    
    formattedJson() {
      if (!this.currentExperimentData) {
        return JSON.stringify({ error: 'No experiment data loaded' }, null, 2)
      }
      
      const chatStructure = {
        ...this.currentExperimentData,
        currentState: {
          messages: this.messages,
          currentFlowIndex: this.currentFlowIndex,
          currentQuestion: this.currentQuestion,
          userAnswers: this.userAnswers,
          showResults: this.showResults
        },
        runtime: {
          theme: this.isDarkMode ? 'dark' : 'light',
          loadedAt: new Date().toISOString()
        }
      }
      
      return JSON.stringify(chatStructure, null, 2)
    },
    
    highlightedJson() {
      if (!this.currentExperimentData) {
        return '<span class="json-error">Nenhum experimento carregado</span>'
      }
      
      let jsonString = JSON.stringify(this.currentExperimentData, null, 2)
      
      // Add syntax highlighting
      jsonString = jsonString
        .replace(/(".*?")\s*:/g, '<span class="json-key">$1</span>:')
        .replace(/:\s*(".*?")/g, ': <span class="json-string">$1</span>')
        .replace(/:\s*(true|false)/g, ': <span class="json-boolean">$1</span>')
        .replace(/:\s*(\d+)/g, ': <span class="json-number">$1</span>')
        .replace(/:\s*(null)/g, ': <span class="json-null">$1</span>')
      
      // Highlight current section based on chat state
      if (this.currentJsonHighlight) {
        const highlightRegex = new RegExp(`("${this.currentJsonHighlight}"[^}]*})`, 'g')
        jsonString = jsonString.replace(highlightRegex, '<span class="json-highlight">$1</span>')
      }
      
      return jsonString
    }
  },
  mounted() {
    this.initializeSimulator()
  },
  methods: {
    initializeSimulator() {
      // Set default experiment to emotions-map
      const defaultExperiment = this.experiments.find(exp => exp.id === 'emotions-map')
      if (defaultExperiment) {
        this.currentExperiment = defaultExperiment
        this.loadExperimentFromJSON(defaultExperiment)
      } else {
        // Fallback: create basic experiment
        this.createFallbackExperiment()
      }
    },
    
    createFallbackExperiment() {
      this.currentExperiment = {
        id: 'emotions-map',
        name: 'Mapa das Emoções',
        icon: '🌹',
        description: 'Avaliação de inteligência emocional com orientação espiritual',
        aiModel: 'Claude 3.5 Sonnet - Anthropic'
      }
      
      // Add basic welcome messages
      this.messages = [
        {
          id: 1,
          type: 'bot',
          text: 'Olá! 🌹 Bem-vinda ao Mapa das Emoções!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isTyping: false
        },
        {
          id: 2,
          type: 'bot',
          text: 'Sou a Samelly, sua guia espiritual. Estamos carregando o experimento...',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isTyping: false,
          showPresentation: true
        }
      ]
      
      // Try to load from JSON after fallback
      setTimeout(() => {
        this.loadExperimentFromJSON(this.currentExperiment)
      }, 1000)
    },

    goBack() {
      this.$router.push('/neural-nexus/conversational-intelligence')
    },
    
    toggleMode() {
      this.isDarkMode = !this.isDarkMode
    },
    
    startConversation() {
      const welcomeMessages = this.currentExperimentData?.chatStructure?.welcome?.messages
      const defaultDelay = this.currentExperimentData?.experiment?.defaultDelay || 2000
      
      if (welcomeMessages && welcomeMessages.length > 1) {
        const secondMessage = welcomeMessages[1]
        const messageDelay = secondMessage.delay || defaultDelay
        
        setTimeout(() => {
          this.addBotMessage(secondMessage.text, true)
          const lastMessage = this.messages[this.messages.length - 1]
          if (secondMessage.showPresentation) {
            lastMessage.showPresentation = true
          }
          
          // Start flow after second message
          setTimeout(() => {
            this.askNextQuestion()
          }, messageDelay)
        }, defaultDelay)
      } else {
        setTimeout(() => {
          this.askNextQuestion()
        }, defaultDelay)
      }
    },
    
    askNextQuestion() {
      if (this.currentFlowIndex < this.conversationFlow.length) {
        const flowItem = this.conversationFlow[this.currentFlowIndex]
        this.addBotMessage(flowItem.text, true)
        
        // Update JSON highlight
        this.updateJsonHighlight('flow', this.currentFlowIndex)
        
        // Increment index first
        this.currentFlowIndex++
        
        // Only set question after message is displayed
        setTimeout(() => {
          if (flowItem.question) {
            this.currentQuestion = flowItem.question
            // Auto-scroll to bottom after options appear
            this.$nextTick(() => {
              setTimeout(() => {
                this.scrollToBottom()
              }, 100) // Small delay to ensure options are rendered
            })
          } else {
            // If no question, continue to next item automatically
            setTimeout(() => {
              this.askNextQuestion()
            }, 1500)
          }
        }, 2000) // Wait for message to be fully displayed
      }
    },
    
    addBotMessage(text, isTyping = false) {
      const message = {
        id: Date.now(),
        type: 'bot',
        text: this.processMessageTags(text),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTyping: isTyping
      }
      
      this.messages.push(message)
      this.conversationStats.messages++
      
      if (isTyping) {
        setTimeout(() => {
          message.isTyping = false
        }, 1500)
      }
      
      this.scrollToBottom()
    },
    
    processMessageTags(text) {
      let processedText = text
      Object.keys(this.userData).forEach(key => {
        const regex = new RegExp(`\\$\\{${key}\\}`, 'g')
        processedText = processedText.replace(regex, this.userData[key] || '')
      })
      return processedText
    },
    
    addUserMessage(text) {
      const message = {
        id: Date.now(),
        type: 'user',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTyping: false
      }
      
      this.messages.push(message)
      this.conversationStats.messages++
      this.conversationStats.responses++
      this.scrollToBottom()
    },
    
    sendMessage() {
      if (!this.userInput.trim()) return
      
      this.addUserMessage(this.userInput)
      const userMessage = this.userInput
      this.userInput = ''
      this.currentQuestion = null
      
      // Process text input and move to next question
      setTimeout(() => {
        this.askNextQuestion()
      }, 1000)
    },
    
    selectOption(value) {
      const option = this.currentQuestion.options.find(opt => opt.value === value)
      this.addUserMessage(option.label)
      this.currentQuestion = null
      
      // Handle continue buttons
      if (value.startsWith('continue')) {
        setTimeout(() => {
          this.askNextQuestion()
        }, 1000)
      } else if (value === 'start') {
        setTimeout(() => {
          this.askNextQuestion()
        }, 1000)
      } else if (value === 'schedule') {
        setTimeout(() => {
          this.startContactFlow()
        }, 1000)
      } else if (value.match(/^[abc]\d+$/)) {
        // Handle test answers - track the answer
        this.userAnswers.push(value)
        
        setTimeout(() => {
          if (this.userAnswers.length < 10) {
            this.askNextQuestion()
          } else {
            // All questions answered, show results
            this.showTestResults()
          }
        }, 1000)
      } else {
        // Handle other answers
        setTimeout(() => {
          this.askNextQuestion()
        }, 1000)
      }
    },
    
    toggleCheckbox(value) {
      const index = this.selectedCheckboxes.indexOf(value)
      if (index > -1) {
        this.selectedCheckboxes.splice(index, 1)
      } else {
        this.selectedCheckboxes.push(value)
      }
    },
    
    submitCheckboxes() {
      const selectedLabels = this.selectedCheckboxes.map(value => {
        const option = this.currentQuestion.options.find(opt => opt.value === value)
        return option.label
      })
      
      this.addUserMessage(selectedLabels.join(', '))
      this.currentQuestion = null
      this.selectedCheckboxes = []
      
      setTimeout(() => {
        // Remove this message - follow only the provided script
        setTimeout(() => {
          this.askNextQuestion()
        }, 1500)
      }, 1000)
    },
    
    selectCard(value) {
      this.selectedCard = value
    },
    
    submitCard() {
      const option = this.currentQuestion.options.find(opt => opt.value === this.selectedCard)
      this.addUserMessage(option.label)
      this.currentQuestion = null
      this.selectedCard = null
      
      setTimeout(() => {
        // Remove these messages - follow only the provided script
      }, 1000)
    },
    
    submitResponse() {
      if (!this.userInput.trim()) return
      
      // Save user data if question has saveAs property
      if (this.currentQuestion && this.currentQuestion.saveAs) {
        this.userData[this.currentQuestion.saveAs] = this.userInput.trim()
      }
      
      this.addUserMessage(this.userInput)
      const userMessage = this.userInput
      this.userInput = ''
      this.currentQuestion = null
      
      setTimeout(() => {
        // Check if we're in contact flow
        if (this.contactFlow.length > 0 && this.contactFlowIndex <= this.contactFlow.length) {
          this.askContactQuestion()
        } else {
          this.askNextQuestion()
        }
      }, 1000)
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages
        if (chatMessages) {
          // Scroll extra para garantir que as opções fiquem visíveis
          const extraScroll = 150
          chatMessages.scrollTo({
            top: chatMessages.scrollHeight + extraScroll,
            behavior: 'smooth'
          })
        }
      })
    },
    
    scrollToBottomImmediate() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight
        }
      })
    },
    
    // JSON Viewer Methods
    showJsonViewer() {
      this.showJsonModal = true
    },
    
    closeJsonModal() {
      this.showJsonModal = false
    },
    
    copyJson() {
      navigator.clipboard.writeText(this.formattedJson)
      console.log('JSON copied to clipboard!')
    },
    
    exportJson() {
      const blob = new Blob([this.formattedJson], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `chat-structure-${this.currentExperiment?.id || 'unknown'}.json`
      a.click()
      URL.revokeObjectURL(url)
    },
    
    // Experiment Methods
    switchExperiment(experiment) {
      this.currentExperiment = experiment
      this.resetConversation()
      this.loadExperimentFromJSON(experiment)
    },
    
    resetConversation() {
      this.messages = []
      this.currentFlowIndex = 0
      this.currentQuestion = null
      this.userInput = ''
      this.selectedCheckboxes = []
      this.selectedCard = null
      this.userAnswers = []
      this.showResults = false
      this.userData = {}
      this.contactFlow = []
      this.contactFlowIndex = 0
    },
    
    showTestResults() {
      if (!this.currentExperimentData?.chatStructure?.results) return
      
      const result = this.testResult
      if (!result) return
      
      const resultData = this.currentExperimentData.chatStructure.results[result]
      if (!resultData) return
      
      this.finalResult = resultData
      
      setTimeout(() => {
        this.addBotMessage(`🔑 Resultados`)
        this.updateJsonHighlight('results')
        setTimeout(() => {
          this.showScoreBreakdown()
          setTimeout(() => {
            this.addBotMessage(resultData.subtitle)
            setTimeout(() => {
              this.addBotMessage(`💫 Como posso te ajudar:`)
              setTimeout(() => {
                this.addBotMessage(resultData.description.split('. Como eu posso te ajudar: ')[1])
                setTimeout(() => {
                  this.addBotMessage(`✨ Interpretações personalizadas do teste`)
                  setTimeout(() => {
                    this.addBotMessage(`${resultData.detailed.title} ${resultData.detailed.description}`)
                    setTimeout(() => {
                      this.showFinalMessage()
                    }, 2000)
                  }, 2000)
                }, 2000)
              }, 2000)
            }, 2000)
          }, 2000)
        }, 2000)
      }, 2000)
    },
    
    showScoreBreakdown() {
      // Add visual score display only
      this.addScoreMessage()
    },
    
    addScoreMessage() {
      const scoreMessage = {
        id: Date.now(),
        type: 'bot',
        text: 'Aqui está sua pontuação detalhada:',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTyping: false,
        showScore: true
      }
      
      this.messages.push(scoreMessage)
      this.conversationStats.messages++
      this.scrollToBottomImmediate()
    },
    
    getGroupEmoji(group) {
      const emojis = {
        A: '🌱',
        B: '🔥', 
        C: '🌟'
      }
      return emojis[group] || '📊'
    },
    
    getGroupName(group) {
      const names = {
        A: 'Reconhecimento inicial',
        B: 'Reconhece, mas não age',
        C: 'Gestor em evolução'
      }
      return names[group] || group
    },
    
    getWinningGroup() {
      const maxScore = Math.max(this.userScore.A, this.userScore.B, this.userScore.C)
      if (this.userScore.A === maxScore) return 'Grupo A - Reconhecimento inicial'
      if (this.userScore.B === maxScore) return 'Grupo B - Reconhece, mas não age'
      return 'Grupo C - Gestor em evolução'
    },
    
    updateJsonHighlight(section, index = null) {
      if (section === 'welcome') {
        this.currentJsonHighlight = 'welcome'
      } else if (section === 'flow' && index !== null) {
        this.currentJsonHighlight = `flow-${index}`
      } else if (section === 'results') {
        this.currentJsonHighlight = 'results'
      } else if (section === 'scoring') {
        this.currentJsonHighlight = 'scoring'
      }
      
      // Auto-scroll JSON sidebar to highlighted section
      this.$nextTick(() => {
        this.scrollJsonToHighlight()
      })
    },
    
    scrollJsonToHighlight() {
      if (!this.$refs.jsonContent) return
      
      const highlightElement = this.$refs.jsonContent.querySelector('.json-highlight')
      if (highlightElement) {
        highlightElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        })
      }
    },
    
    selectAllJson() {
      if (!this.$refs.jsonDisplay) return
      
      const range = document.createRange()
      range.selectNodeContents(this.$refs.jsonDisplay)
      
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      
      // Copiar para clipboard automaticamente
      try {
        document.execCommand('copy')
        
        // Mostrar alerta elegante
        this.showSelectAlert = true
        
        // Esconder alerta após 3 segundos
        setTimeout(() => {
          this.showSelectAlert = false
        }, 3000)
        
      } catch (err) {
        console.log('Falha ao copiar automaticamente')
        
        // Mostrar alerta mesmo se falhar a cópia
        this.showSelectAlert = true
        setTimeout(() => {
          this.showSelectAlert = false
        }, 3000)
      }
    },
    
    showFinalMessage() {
      if (!this.currentExperimentData?.chatStructure?.finalMessage) return
      
      const finalMsg = this.currentExperimentData.chatStructure.finalMessage
      
      setTimeout(() => {
        this.addBotMessage(finalMsg.title)
        setTimeout(() => {
          this.addBotMessage(finalMsg.text)
          setTimeout(() => {
            this.addBotMessage(finalMsg.cta.text)
            setTimeout(() => {
              this.currentQuestion = {
                type: 'buttons',
                options: [
                  { value: 'schedule', label: finalMsg.cta.button, icon: '🌹' }
                ]
              }
              this.showResults = true
            }, 2000)
          }, 2000)
        }, 2000)
      }, 2000)
    },
    
    startContactFlow() {
      if (!this.currentExperimentData?.chatStructure?.contactFlow) return
      
      this.contactFlowIndex = 0
      this.contactFlow = this.currentExperimentData.chatStructure.contactFlow
      this.askContactQuestion()
    },
    
    askContactQuestion() {
      if (this.contactFlowIndex < this.contactFlow.length) {
        const flowItem = this.contactFlow[this.contactFlowIndex]
        this.addBotMessage(flowItem.text, true)
        
        this.contactFlowIndex++
        
        setTimeout(() => {
          if (flowItem.question) {
            this.currentQuestion = flowItem.question
            this.$nextTick(() => {
              setTimeout(() => {
                this.scrollToBottom()
              }, 100)
            })
          } else {
            // If no question, this is the final message
            // Contact collection completed
          }
        }, 2000)
      }
    },
    
    handleImageError(event) {
      // Fallback to default person avatar if image fails to load
      const img = event.target
      img.src = 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face&auto=format&q=95'
      img.onerror = null // Prevent infinite loop
    },
    
    async loadExperimentFromJSON(experiment) {
      try {
        // Load individual JSON file for the experiment
        const response = await fetch(`/data/experiments/${experiment.id}.json`)
        const experimentData = await response.json()
        
        // Update current experiment with loaded data
        this.currentExperiment = experimentData.experiment
        
        // Load only first welcome message
        const firstMessage = experimentData.chatStructure.welcome.messages[0]
        this.messages = [{
          id: 1,
          type: firstMessage.type,
          text: firstMessage.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isTyping: false,
          showPresentation: firstMessage.showPresentation || false
        }]
        
        // Load conversation flow
        this.conversationFlow = experimentData.chatStructure.flow || []
        
        // Store full experiment data for JSON viewer
        this.currentExperimentData = experimentData
        
        // Reset flow index
        this.currentFlowIndex = 0
        
        // Start conversation
        this.startConversation()
      } catch (error) {
        console.error('Error loading experiment JSON:', error)
        // Fallback to basic experiment data
        this.currentExperiment = experiment
        this.messages = []
        this.conversationFlow = []
      }
    }
  }
}
</script>

<style scoped>
.chat-simulator {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
  position: relative;
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease;
}


.main-content {
  width: 100%;
  max-width: none;
  padding: 2rem;
}

.chat-simulator.with-sidebar .main-content {
  display: flex;
  justify-content: center;
  width: calc(100% - 400px);
  margin: 0;
  padding: 2rem;
}

.chat-simulator.dark-mode {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
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

.dark-mode .neural-grid {
  opacity: 0.2;
}

.grid-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, #64748b, transparent);
  height: 1px;
  width: 100%;
  top: 0;
  animation: gridFlow 10s linear infinite;
}

.dark-mode .grid-line {
  background: linear-gradient(90deg, transparent, #00ffff, transparent);
}

.grid-line:nth-child(odd) {
  background: linear-gradient(0deg, transparent, #64748b, transparent);
  height: 100%;
  width: 1px;
  left: 0;
}

.dark-mode .grid-line:nth-child(odd) {
  background: linear-gradient(0deg, transparent, #ff00ff, transparent);
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
  background: radial-gradient(circle, #64748b, transparent);
  border-radius: 50%;
  animation: particleFloat linear infinite;
}

.dark-mode .particle {
  background: radial-gradient(circle, #00ffff, transparent);
}

@keyframes particleFloat {
  0% { transform: translateY(100vh) scale(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) scale(1); opacity: 0; }
}

/* Header */
.simulator-header {
  position: relative;
  z-index: 10;
  padding: 1.5rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark-mode .simulator-header {
  background: rgba(20, 20, 40, 0.9);
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark-mode .back-btn {
  background: rgba(0, 255, 255, 0.1);
  border-color: rgba(0, 255, 255, 0.3);
  color: #00ffff;
}

.back-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: translateX(-3px);
}

.dark-mode .back-btn:hover {
  background: rgba(0, 255, 255, 0.2);
}

.header-title h1 {
  color: #1e293b;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.2rem 0;
}

.dark-mode .header-title h1 {
  color: #ffffff;
}

.header-title p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

.dark-mode .header-title p {
  color: #cccccc;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}


.mode-toggle {
  display: flex;
  align-items: center;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark-mode .toggle-btn {
  background: rgba(0, 255, 255, 0.1);
  border-color: rgba(0, 255, 255, 0.3);
  color: #00ffff;
}

.toggle-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.dark-mode .toggle-btn:hover {
  background: rgba(0, 255, 255, 0.2);
}

.simulator-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.8rem 1rem;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  transition: all 0.3s ease;
}

.dark-mode .stat-item {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 255, 0.2);
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.dark-mode .stat-item:hover {
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
}

.stat-value {
  color: #1e293b;
  font-size: 1.2rem;
  font-weight: 700;
}

.dark-mode .stat-value {
  color: #00ffff;
}

.stat-label {
  color: #64748b;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.dark-mode .stat-label {
  color: #cccccc;
}

/* Experiments Menu */
.experiments-menu {
  position: relative;
  z-index: 10;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark-mode .experiments-menu {
  background: rgba(20, 20, 40, 0.8);
  border-bottom: 1px solid rgba(0, 255, 255, 0.2);
}

.menu-container {
  max-width: 1400px;
  margin: 0 auto;
}

.menu-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.dark-mode .tab-btn {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 255, 0.2);
  color: #cccccc;
}

.tab-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.dark-mode .tab-btn:hover {
  background: rgba(0, 255, 255, 0.1);
}

.tab-btn.active {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-color: #3b82f6;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.dark-mode .tab-btn.active {
  background: linear-gradient(135deg, #00ffff, #ff00ff);
  border-color: #00ffff;
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
}

.tab-icon {
  font-size: 1.1rem;
}

.tab-label {
  font-weight: 500;
}

.experiment-info {
  text-align: center;
}

.experiment-info h3 {
  color: #1e293b;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
}

.dark-mode .experiment-info h3 {
  color: #ffffff;
}

.experiment-info p {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

.dark-mode .experiment-info p {
  color: #cccccc;
}

.experiment-header {
  margin-bottom: 1rem;
}


.experiment-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* Chat Interface */
.chat-interface {
  position: relative;
  z-index: 10;
  max-width: 1000px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  overflow: hidden;
  transition: all 0.3s ease;
  min-height: 600px;
  max-height: calc(100vh - 250px);
}

.dark-mode .chat-container {
  background: rgba(20, 20, 40, 0.8);
  border-color: rgba(0, 255, 255, 0.2);
}

.chat-messages {
  flex: 1;
  padding: 1.5rem;
  padding-bottom: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  scroll-behavior: smooth;
  max-height: calc(100vh - 300px);
}

.message {
  display: flex;
  gap: 1rem;
  animation: messageSlide 0.5s ease-out;
  opacity: 0;
  animation-fill-mode: forwards;
}

@keyframes messageSlide {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark-mode .avatar {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 255, 0.2);
}

.avatar.user {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-color: #3b82f6;
  color: white;
}

.avatar.bot {
  background: linear-gradient(135deg, #00ffff, #ff00ff);
  border-color: #00ffff;
  color: white;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  image-rendering: auto;
  image-rendering: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  will-change: transform;
}

/* Human Avatar Styles */
.human-avatar {
  border: 2px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  filter: brightness(1.05) contrast(1.1) saturate(1.1);
}

.human-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
  filter: brightness(1.1) contrast(1.15) saturate(1.2);
}

.samelly-avatar.human-avatar {
  border-color: rgba(255, 107, 157, 0.5);
  box-shadow: 0 0 20px rgba(255, 107, 157, 0.3);
}

.samelly-avatar.human-avatar:hover {
  box-shadow: 0 0 30px rgba(255, 107, 157, 0.5);
}

.support-avatar.human-avatar {
  border-color: rgba(79, 70, 229, 0.5);
  box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
}

.support-avatar.human-avatar:hover {
  box-shadow: 0 0 30px rgba(79, 70, 229, 0.5);
}

.avatar-svg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-svg svg {
  width: 100%;
  height: 100%;
}

.samelly-avatar {
  background: linear-gradient(135deg, #ff6b9d, #ff8fab);
  box-shadow: 0 0 20px rgba(255, 107, 157, 0.3);
}

.support-avatar {
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  box-shadow: 0 0 20px rgba(79, 70, 229, 0.3);
}

.assistant-avatar {
  background: linear-gradient(135deg, #00ffff, #00e6e6);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
}

/* Score Display Styles */
.score-display {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

/* Visual Score Component */
.score-visual {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9));
  border-radius: 20px;
  padding: 25px;
  margin: 15px 0;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 255, 255, 0.2);
  animation: scoreAppear 0.8s ease-out;
}

@keyframes scoreAppear {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.score-header {
  text-align: center;
  margin-bottom: 25px;
}

.score-header h3 {
  color: #00ffff;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.score-header p {
  color: #cbd5e1;
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
}

.score-bars-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.score-item-visual {
  display: flex;
  align-items: center;
  gap: 15px;
  animation: scoreBarSlide 0.6s ease-out forwards;
  opacity: 0;
}

.score-item-visual:nth-child(1) { animation-delay: 0.2s; }
.score-item-visual:nth-child(2) { animation-delay: 0.4s; }
.score-item-visual:nth-child(3) { animation-delay: 0.6s; }

@keyframes scoreBarSlide {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.score-info {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
}

.score-emoji {
  font-size: 20px;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
}

.score-name {
  color: #e2e8f0;
  font-weight: 500;
  font-size: 14px;
  flex: 1;
}

.score-value-display {
  color: #00ffff;
  font-weight: 700;
  font-size: 16px;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
}

.score-bar-visual {
  flex: 1;
  height: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.score-fill-visual {
  height: 100%;
  border-radius: 6px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.score-fill-visual.a {
  background: linear-gradient(90deg, #10b981, #34d399);
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
}

.score-fill-visual.b {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
}

.score-fill-visual.c {
  background: linear-gradient(90deg, #8b5cf6, #a78bfa);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.4);
}

.score-fill-visual::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
}

.score-percentage {
  color: #94a3b8;
  font-size: 12px;
  font-weight: 600;
  min-width: 45px;
  text-align: right;
}

.score-footer {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 255, 255, 0.1);
}

.score-footer p {
  color: #e2e8f0;
  font-size: 16px;
  margin: 0;
}

.score-footer strong {
  color: #00ffff;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
}

/* JSON Sidebar Styles */
.json-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(0, 255, 255, 0.2);
  z-index: 999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-header h3 {
  color: #00ffff;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
}

.close-sidebar {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-sidebar:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #00ffff;
}

.sidebar-actions {
  padding: 0 20px 15px 20px;
  border-bottom: 1px solid rgba(0, 255, 255, 0.1);
}

.select-all-btn {
  width: 100%;
  padding: 10px 15px;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(0, 255, 255, 0.2));
  border: 1px solid rgba(0, 255, 255, 0.3);
  border-radius: 8px;
  color: #00ffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.select-all-btn:hover {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(0, 255, 255, 0.3));
  border-color: rgba(0, 255, 255, 0.5);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 255, 255, 0.2);
}

.select-all-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 255, 255, 0.3);
}

.select-icon {
  font-size: 16px;
}

.select-text {
  font-weight: 600;
}

.json-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  scroll-behavior: smooth;
}

.json-display {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 1.4;
  color: #e2e8f0;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.json-key {
  color: #60a5fa;
  font-weight: 500;
}

.json-string {
  color: #34d399;
}

.json-number {
  color: #f59e0b;
}

.json-boolean {
  color: #8b5cf6;
}

.json-null {
  color: #94a3b8;
  font-style: italic;
}

.json-highlight {
  background: rgba(0, 255, 255, 0.1);
  border-left: 3px solid #00ffff;
  padding-left: 10px;
  margin-left: -10px;
  border-radius: 4px;
  animation: jsonPulse 2s ease-in-out infinite;
}

@keyframes jsonPulse {
  0%, 100% { 
    background: rgba(0, 255, 255, 0.1);
    box-shadow: 0 0 5px rgba(0, 255, 255, 0.2);
  }
  50% { 
    background: rgba(0, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
  }
}

.json-error {
  color: #ef4444;
  font-style: italic;
}

.score-display h5 {
  margin: 0 0 15px 0;
  color: #00ffff;
  font-size: 16px;
  font-weight: 600;
}

.score-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.score-label {
  min-width: 80px;
  font-weight: 500;
  color: #e2e8f0;
}

.score-bar {
  flex: 1;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, #00ffff, #00e6e6);
  border-radius: 10px;
  transition: width 0.8s ease;
  position: relative;
}

.score-value {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 600;
  color: #1a202c;
  z-index: 1;
}

.message-content {
  max-width: 70%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.message.user .message-content {
  align-items: flex-end;
}

.message-bubble {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 1rem 1.2rem;
  position: relative;
  transition: all 0.3s ease;
}

.dark-mode .message-bubble {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 255, 0.2);
}

.message.user .message-bubble {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-color: #3b82f6;
  color: white;
}

.message.bot .message-bubble {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1));
  border-color: rgba(0, 255, 255, 0.3);
}

.message-text {
  color: #1e293b;
  font-size: 1rem;
  line-height: 1.5;
}

.dark-mode .message-text {
  color: #ffffff;
}

.message.user .message-text {
  color: white;
}

.message-time {
  color: #64748b;
  font-size: 0.7rem;
  padding: 0 0.5rem;
}

.dark-mode .message-time {
  color: #cccccc;
}

/* Presentation Photo */
.presentation-photo {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  animation: photoSlide 0.8s ease-out;
}

@keyframes photoSlide {
  0% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.photo-container {
  position: relative;
  width: 180px;
  height: 180px;
}

.presentation-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(0, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.dark-mode .presentation-image {
  border-color: rgba(0, 255, 255, 0.5);
  box-shadow: 0 10px 30px rgba(0, 255, 255, 0.3);
}

.photo-glow {
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff);
  background-size: 400% 400%;
  animation: photoGlow 3s ease-in-out infinite;
  z-index: -1;
}

@keyframes photoGlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.typing-dots {
  display: flex;
  gap: 0.3rem;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  background: #64748b;
  border-radius: 50%;
  animation: typingPulse 1.4s ease-in-out infinite;
}

.dark-mode .typing-dots span {
  background: #00ffff;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typingPulse {
  0%, 60%, 100% { transform: scale(1); opacity: 0.5; }
  30% { transform: scale(1.3); opacity: 1; }
}

/* Interactive Elements */
.interactive-elements {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  transition: all 0.3s ease;
  position: sticky;
  bottom: 0;
  backdrop-filter: blur(20px);
  z-index: 200;
  margin-top: 0.5rem;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1);
}

.dark-mode .interactive-elements {
  border-top-color: rgba(0, 255, 255, 0.2);
  background: rgba(15, 23, 42, 0.95);
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.3);
}

.question-container {
  max-width: 600px;
  margin: 0 auto;
}

.question-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Input Groups */
.input-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.text-input {
  flex: 1;
  padding: 1rem 1.2rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.dark-mode .text-input {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 255, 0.3);
  color: #ffffff;
}

.text-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark-mode .text-input:focus {
  border-color: #00ffff;
  box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.1);
}

.submit-btn {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Button Groups */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.option-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  color: #1e293b;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.dark-mode .option-button {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 255, 0.2);
  color: #ffffff;
}

.option-button:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: #3b82f6;
  transform: translateX(5px);
}

.dark-mode .option-button:hover {
  background: rgba(0, 255, 255, 0.1);
  border-color: #00ffff;
}

.button-icon {
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

.dark-mode .button-icon {
  background: rgba(0, 255, 255, 0.1);
}

.button-text {
  font-weight: 500;
}

/* Checkbox Groups */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark-mode .checkbox-item {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 255, 0.2);
}

.checkbox-item:hover {
  background: rgba(59, 130, 246, 0.05);
  border-color: #3b82f6;
  transform: translateX(5px);
}

.dark-mode .checkbox-item:hover {
  background: rgba(0, 255, 255, 0.05);
  border-color: #00ffff;
}

.checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.dark-mode .checkbox {
  border-color: rgba(0, 255, 255, 0.3);
}

.checkbox.checked {
  background: #3b82f6;
  border-color: #3b82f6;
}

.dark-mode .checkbox.checked {
  background: #00ffff;
  border-color: #00ffff;
}

.checkbox-mark {
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
}

.checkbox-content {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex: 1;
}

.checkbox-icon {
  font-size: 1.2rem;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

.dark-mode .checkbox-icon {
  background: rgba(0, 255, 255, 0.1);
}

.checkbox-text {
  color: #1e293b;
  font-weight: 500;
}

.dark-mode .checkbox-text {
  color: #ffffff;
}

.submit-checkboxes {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.submit-checkboxes:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.submit-checkboxes:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Card Groups */
.card-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.option-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.dark-mode .option-card {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 255, 0.2);
}

.option-card:hover {
  background: rgba(59, 130, 246, 0.05);
  border-color: #3b82f6;
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
}

.dark-mode .option-card:hover {
  background: rgba(0, 255, 255, 0.05);
  border-color: #00ffff;
  box-shadow: 0 10px 25px rgba(0, 255, 255, 0.2);
}

.option-card.selected {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.1));
  border-color: #3b82f6;
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.dark-mode .option-card.selected {
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.1), rgba(255, 0, 255, 0.1));
  border-color: #00ffff;
  box-shadow: 0 10px 25px rgba(0, 255, 255, 0.3);
}

.card-icon {
  font-size: 2.5rem;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.dark-mode .card-icon {
  background: rgba(0, 255, 255, 0.1);
}

.option-card:hover .card-icon {
  background: rgba(59, 130, 246, 0.1);
  transform: scale(1.1);
}

.dark-mode .option-card:hover .card-icon {
  background: rgba(0, 255, 255, 0.2);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-title {
  color: #1e293b;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.dark-mode .card-title {
  color: #ffffff;
}

.card-description {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.4;
}

.dark-mode .card-description {
  color: #cccccc;
}

.submit-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border: none;
  border-radius: 25px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  grid-column: 1 / -1;
}

.submit-card:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.submit-card:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Chat Input */
.chat-input {
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
}

.dark-mode .chat-input {
  border-top-color: rgba(0, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.input-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.message-input {
  flex: 1;
  padding: 1rem 1.2rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.dark-mode .message-input {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 255, 0.3);
  color: #ffffff;
}

.message-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark-mode .message-input:focus {
  border-color: #00ffff;
  box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.1);
}

.send-btn {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .header-left {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .simulator-stats {
    gap: 1rem;
  }
  
  .chat-interface {
    padding: 1rem;
  }
  
  .message-content {
    max-width: 85%;
  }
  
  .card-group {
    grid-template-columns: 1fr;
  }
  
  .button-group {
    gap: 0.5rem;
  }
  
  .option-button {
    padding: 0.8rem 1rem;
  }
}

/* JSON Modal */
.json-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.dark-mode .modal-content {
  background: rgba(20, 20, 40, 0.95);
  border-color: rgba(0, 255, 255, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.02);
}

.dark-mode .modal-header {
  border-bottom-color: rgba(0, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.modal-header h3 {
  color: #1e293b;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.dark-mode .modal-header h3 {
  color: #ffffff;
}

.close-btn {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  color: #64748b;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.dark-mode .close-btn {
  background: rgba(0, 255, 255, 0.1);
  color: #00ffff;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

.dark-mode .close-btn:hover {
  background: rgba(0, 255, 255, 0.2);
}

.modal-body {
  flex: 1;
  padding: 1.5rem 2rem;
  overflow-y: auto;
}

.json-container {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  overflow-x: auto;
}

.dark-mode .json-container {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 255, 0.2);
}

.json-code {
  color: #1e293b;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.dark-mode .json-code {
  color: #ffffff;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.02);
}

.dark-mode .modal-footer {
  border-top-color: rgba(0, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.copy-btn, .export-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.9);
  color: #1e293b;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dark-mode .copy-btn, .dark-mode .export-btn {
  background: rgba(0, 0, 0, 0.3);
  border-color: rgba(0, 255, 255, 0.3);
  color: #ffffff;
}

.copy-btn:hover, .export-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.dark-mode .copy-btn:hover, .dark-mode .export-btn:hover {
  background: rgba(0, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.2);
}

.export-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-color: #3b82f6;
  color: white;
}

.dark-mode .export-btn {
  background: linear-gradient(135deg, #00ffff, #ff00ff);
  border-color: #00ffff;
}

.export-btn:hover {
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.dark-mode .export-btn:hover {
  box-shadow: 0 5px 15px rgba(0, 255, 255, 0.3);
}

/* Select Alert */
.select-alert {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  animation: alertSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.alert-content {
  background: linear-gradient(135deg, #00ffff 0%, #0066ff 100%);
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 
    0 20px 40px rgba(0, 255, 255, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 320px;
  border: 2px solid rgba(0, 255, 255, 0.4);
}

.dark-mode .alert-content {
  background: linear-gradient(135deg, #0f1419 0%, #1e293b 100%);
  border: 2px solid rgba(0, 255, 255, 0.6);
  box-shadow: 
    0 20px 40px rgba(0, 255, 255, 0.4),
    0 0 0 1px rgba(0, 255, 255, 0.2);
}

.alert-icon {
  font-size: 2rem;
  animation: alertPulse 1.5s ease-in-out infinite;
}

.alert-text {
  flex: 1;
}

.alert-text strong {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: white;
}

.alert-text p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.dark-mode .alert-text strong {
  color: #00ffff;
}

.dark-mode .alert-text p {
  color: rgba(0, 255, 255, 0.7);
}

@keyframes alertSlideIn {
  0% {
    opacity: 0;
    transform: translate(-50%, -60%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes alertPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Alert fade out animation */
.select-alert.fade-out {
  animation: alertFadeOut 0.3s ease-in-out forwards;
}

@keyframes alertFadeOut {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -40%) scale(0.9);
  }
}
</style>
