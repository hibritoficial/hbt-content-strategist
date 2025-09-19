import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDocsStore = defineStore('docs', () => {
  const isOpen = ref(false)
  const activeTab = ref('sistema')
  const currentTopic = ref(null)
  const searchQuery = ref('')

  const topics = ref({
    'dashboard-overview': {
      id: 'dashboard-overview',
      route: '/dashboard',
      anchors: ['stats', 'actions'],
      dimensions: ['sistema', 'metodo', 'marketing'],
      title: 'Dashboard - Visão Geral',
      content: {
        sistema: 'Painel central com métricas de hoje e ações rápidas. Mostra status das peças por pilar.',
        metodo: 'Use para priorizar: peças em "Copy" precisam de atenção. Botão "Gerar 3 Copies" acelera produção.',
        marketing: 'Dashboard eficiente reduz tempo de decisão. Métricas visuais facilitam identificar gargalos.'
      },
      related: ['pipeline-status', 'metrics-overview']
    },
    'editor-molds': {
      id: 'editor-molds',
      route: '/editor',
      anchors: ['mold_id', 'cta'],
      dimensions: ['sistema', 'metodo', 'marketing'],
      title: 'Moldes LEGO',
      content: {
        sistema: 'Templates pré-definidos (Carrossel 6x, Reels, Post). Estruturam o conteúdo automaticamente.',
        metodo: 'Carrossel 6x: S1 Hook → S2 Por quê → S3-4 Passos → S5 Prova → S6 CTA único.',
        marketing: 'Moldes padronizam qualidade e aceleram produção. Consistência visual aumenta reconhecimento.'
      },
      related: ['editor-cta', 'library-molds']
    },
    'pipeline-status': {
      id: 'pipeline-status',
      route: '/pipeline',
      anchors: ['status', 'duplicate'],
      dimensions: ['sistema', 'metodo'],
      title: 'Status do Pipeline',
      content: {
        sistema: 'Kanban com 7 estágios: Backlog → Brief → Copy → Design → Pronto → Agendado → Publicado.',
        metodo: 'Mova peças arrastando. Máx 3 peças em "Copy" simultâneas. Duplique para criar variações.'
      },
      related: ['dashboard-overview', 'calendar-scheduling']
    },
    'flow-overview': {
      id: 'flow-overview',
      route: '/flow',
      anchors: ['canvas', 'nodes'],
      dimensions: ['sistema', 'metodo', 'marketing'],
      title: 'Fluxo Canvas - Método Completo',
      content: {
        sistema: 'Canvas interativo mostra o fluxo completo: Entradas → Processo A-G → Saídas. Zoom, minimap e busca.',
        metodo: 'Visualize o HIBRIT STRATEGIST: Brief → IA → Curadoria → Montagem → Revisão → Publicação → Métricas.',
        marketing: 'Fluxo visual facilita onboarding de equipes e padronização de processos. Reduz erros e acelera produção.'
      },
      related: ['editor-molds', 'pipeline-status']
    }
  })

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const openTopic = (topicId) => {
    currentTopic.value = topics.value[topicId] || null
    isOpen.value = true
  }

  const searchTopics = (query) => {
    if (!query) return []
    return Object.values(topics.value).filter(topic =>
      topic.title.toLowerCase().includes(query.toLowerCase()) ||
      Object.values(topic.content).some(content => 
        content.toLowerCase().includes(query.toLowerCase())
      )
    )
  }

  return {
    isOpen,
    activeTab,
    currentTopic,
    searchQuery,
    topics,
    toggle,
    openTopic,
    searchTopics
  }
})