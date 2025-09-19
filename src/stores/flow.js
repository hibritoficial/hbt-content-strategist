import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import ELK from 'elkjs/lib/elk.bundled.js'

export const useFlowStore = defineStore('flow', () => {
  const nodes = ref([])
  const edges = ref([])
  const selectedNode = ref(null)
  const focusMode = ref(false)

  const elk = new ELK()

  const initialNodes = [
    // Processo A-G (micro-estações)
    { 
      id: 'pa', 
      type: 'stage', 
      label: 'A) Seleção Rápida', 
      lane: 'processo', 
      dimensionBadges: ['sistema', 'metodo'], 
      position: { x: 0, y: 200 },
      inputs: ['📄 Pilares', '🎯 Ângulos', '🧩 Moldes'],
      outputs: ['✅ ContentItem', '🎯 CTA único'],
      exitCriteria: 'Pilar + Ângulo + Molde + CTA definidos'
    },
    { 
      id: 'pb', 
      type: 'stage', 
      label: 'B) IA: 3 Variações', 
      lane: 'processo', 
      dimensionBadges: ['sistema'], 
      position: { x: 200, y: 200 },
      inputs: ['📄 Brief', '🪝 Hooks', '📋 Hashtags'],
      outputs: ['✍️ 3 CopyVersions', '📝 Variações A/B/C'],
      exitCriteria: '3 variações completas e legíveis'
    },
    { 
      id: 'pc', 
      type: 'stage', 
      label: 'C) Curadoria', 
      lane: 'processo', 
      dimensionBadges: ['metodo'], 
      position: { x: 400, y: 200 },
      inputs: ['✍️ 3 Variações', '📊 Scorecard 6x'],
      outputs: ['🏆 Copy escolhida', '📊 Score ≥5/6'],
      exitCriteria: 'Scorecard ≥5/6 + variação vencedora'
    },
    { 
      id: 'pd', 
      type: 'stage', 
      label: 'D) Montagem', 
      lane: 'processo', 
      dimensionBadges: ['sistema', 'metodo'], 
      position: { x: 600, y: 200 },
      inputs: ['🏆 Copy final', '🧩 Layout molde', '🎨 Tokens visuais'],
      outputs: ['🖼️ Assets draft', '📱 Roteiro/Arte'],
      exitCriteria: 'Arte consistente + CTA visível'
    },
    { 
      id: 'pe', 
      type: 'stage', 
      label: 'E) Revisão CXA', 
      lane: 'processo', 
      dimensionBadges: ['metodo', 'marketing'], 
      position: { x: 800, y: 200 },
      inputs: ['🖼️ Asset final', '🔗 Links', '🏷️ UTM'],
      outputs: ['✅ Checklist CXA', '🤖 Automação testada'],
      exitCriteria: 'Checklist 100% + automação OK'
    },
    { 
      id: 'pf', 
      type: 'stage', 
      label: 'F) Publicação', 
      lane: 'processo', 
      dimensionBadges: ['sistema'], 
      position: { x: 1000, y: 200 },
      inputs: ['✅ Peça aprovada', '📅 Data agendada'],
      outputs: ['🚀 Post agendado', '🔖 Tag experimento'],
      exitCriteria: 'Agendado com UTM ou link publicado'
    },
    { 
      id: 'pg', 
      type: 'stage', 
      label: 'G) Loop Métricas', 
      lane: 'processo', 
      dimensionBadges: ['marketing'], 
      position: { x: 1200, y: 200 },
      inputs: ['📊 Métricas canal', '⏱️ 24-72h'],
      outputs: ['📈 MetricEntry', '🔄 Próxima ação'],
      exitCriteria: 'Métricas registradas + decisão tomada'
    }
  ]

  const initialEdges = [
    { id: 'pa-pb', source: 'pa', target: 'pb', label: 'ContentItem' },
    { id: 'pb-pc', source: 'pb', target: 'pc', label: '3 Variações' },
    { id: 'pc-pd', source: 'pc', target: 'pd', label: 'Copy escolhida' },
    { id: 'pd-pe', source: 'pd', target: 'pe', label: 'Asset draft' },
    { id: 'pe-pf', source: 'pe', target: 'pf', label: 'CXA aprovado' },
    { id: 'pf-pg', source: 'pf', target: 'pg', label: 'Post publicado' },
    { id: 'pg-pa', source: 'pg', target: 'pa', label: 'Loop feedback', style: { stroke: '#ff9800', strokeDasharray: '5,5' } }
  ]

  const initializeFlow = async () => {
    await loadFlowData()
  }

  const loadFlowData = async () => {
    try {
      // Carregar layouts personalizados
      const { data: layouts } = await supabase
        .from('flow_layouts')
        .select('*')
      
      // Carregar status dos nós
      const { data: nodeStatus } = await supabase
        .from('flow_node_status')
        .select('*')
      
      // Sincronizar com dados reais do Pipeline
      await syncWithPipeline()
      
      // Merge dados iniciais com dados salvos
      nodes.value = initialNodes.map(node => {
        const layout = layouts?.find(l => l.node_id === node.id)
        const status = nodeStatus?.find(s => s.node_id === node.id)
        
        return {
          ...node,
          position: layout ? { x: layout.position_x, y: layout.position_y } : node.position,
          data: {
            ...node,
            status: status?.status || 'pending',
            metrics: status?.metrics || {},
            notes: status?.notes
          }
        }
      })
      
      edges.value = initialEdges
    } catch (error) {
      console.error('Erro ao carregar dados do flow:', error)
      // Fallback para dados iniciais
      nodes.value = initialNodes
      edges.value = initialEdges
    }
  }

  const syncWithPipeline = async () => {
    try {
      // Contar itens por status no pipeline
      const { data: contentItems } = await supabase
        .from('content_items')
        .select('status')
      
      if (!contentItems) return
      
      // Mapear status do pipeline para nós do flow
      const statusMap = {
        'brief': 'pa',
        'draft_copy': 'pb', 
        'design': 'pd',
        'ready': 'pe',
        'scheduled': 'pf',
        'published': 'pg'
      }
      
      // Calcular métricas por etapa
      const metrics = {}
      contentItems.forEach(item => {
        const nodeId = statusMap[item.status]
        if (nodeId) {
          metrics[nodeId] = (metrics[nodeId] || 0) + 1
        }
      })
      
      // Atualizar status dos nós baseado na atividade
      for (const [nodeId, count] of Object.entries(metrics)) {
        const status = count > 0 ? 'active' : 'pending'
        const { error } = await supabase
          .from('flow_node_status')
          .upsert({
            node_id: nodeId,
            status,
            metrics: { completion: Math.min(count * 10, 100), active_items: count }
          }, {
            onConflict: 'node_id'
          })
        
        if (error) {
          console.error('Erro ao atualizar status do nó:', nodeId, error)
        }
      }
    } catch (error) {
      console.error('Erro na sincronização:', error)
    }
  }

  const saveNodePosition = async (nodeId, position) => {
    try {
      await supabase
        .from('flow_layouts')
        .upsert({
          node_id: nodeId,
          position_x: Math.round(position.x),
          position_y: Math.round(position.y)
        })
    } catch (error) {
      console.error('Erro ao salvar posição:', error)
    }
  }

  const updateNodeStatus = async (nodeId, status, metrics = {}) => {
    try {
      const { error } = await supabase
        .from('flow_node_status')
        .upsert({
          node_id: nodeId,
          status,
          metrics,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'node_id'
        })
      
      if (error) {
        console.error('Erro ao atualizar status:', error)
        return
      }
      
      // Atualizar store local
      const node = nodes.value.find(n => n.id === nodeId)
      if (node) {
        node.data.status = status
        node.data.metrics = metrics
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
    }
  }

  const selectNode = (nodeId) => {
    selectedNode.value = nodes.value.find(n => n.id === nodeId)
  }

  const toggleFocusMode = () => {
    focusMode.value = !focusMode.value
  }

  const getNodesByLane = (lane) => {
    return nodes.value.filter(node => node.lane === lane)
  }

  return {
    nodes,
    edges,
    selectedNode,
    focusMode,
    initializeFlow,
    loadFlowData,
    syncWithPipeline,
    saveNodePosition,
    updateNodeStatus,
    selectNode,
    toggleFocusMode,
    getNodesByLane
  }
})