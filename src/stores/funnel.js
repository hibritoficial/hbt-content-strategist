import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export const useFunnelStore = defineStore('funnel', () => {
  const funnels = ref([])
  const currentFunnel = ref(null)
  const nodes = ref([])
  const edges = ref([])
  const selectedNode = ref(null)
  const realtimeChannel = ref(null)
  const pulses = ref([]) // Animações em tempo real

  const nodeTypes = {
    traffic: { icon: 'mdi-bullhorn', color: 'blue', family: 'Tráfego' },
    landing: { icon: 'mdi-web', color: 'purple', family: 'Conteúdo' },
    form: { icon: 'mdi-form-textbox', color: 'green', family: 'Conversão' },
    whatsapp: { icon: 'mdi-whatsapp', color: 'teal', family: 'Mensageria' },
    checkout: { icon: 'mdi-cart', color: 'green', family: 'Conversão' },
    thankyou: { icon: 'mdi-check-circle', color: 'green', family: 'Conversão' },
    email: { icon: 'mdi-email-fast', color: 'teal', family: 'Mensageria' },
    crm: { icon: 'mdi-handshake', color: 'amber', family: 'CRM' },
    webhook: { icon: 'mdi-instagram', color: 'pink', family: 'Webhook' }
  }

  const loadFunnels = async () => {
    const { data, error } = await supabase
      .from('funnels')
      .select('*')
      .order('updated_at', { ascending: false })
    
    if (!error) funnels.value = data || []
    return { data, error }
  }

  const loadFunnel = async (funnelId) => {
    try {
      // Carregar funil
      const { data: funnelData } = await supabase
        .from('funnels')
        .select('*')
        .eq('id', funnelId)
        .single()
      
      currentFunnel.value = funnelData

      // Carregar nós
      const { data: nodesData } = await supabase
        .from('funnel_nodes')
        .select('*')
        .eq('funnel_id', funnelId)
        .order('created_at')
      
      // Carregar edges
      const { data: edgesData } = await supabase
        .from('funnel_edges')
        .select('*')
        .eq('funnel_id', funnelId)
      
      // Transformar para formato Vue Flow
      nodes.value = (nodesData || []).map(node => ({
        id: node.id,
        type: 'funnel',
        position: { x: node.position_x, y: node.position_y },
        data: {
          ...node,
          nodeType: nodeTypes[node.type] || nodeTypes.traffic,
          count: 0 // Será atualizado via realtime
        }
      }))

      edges.value = (edgesData || []).map(edge => ({
        id: edge.id,
        source: edge.source_node_id,
        target: edge.target_node_id,
        label: edge.label,
        data: edge
      }))

      // Iniciar realtime
      startRealtime(funnelId)
      
    } catch (error) {
      console.error('Erro ao carregar funil:', error)
    }
  }

  const createFunnel = async (funnelData) => {
    const { data, error } = await supabase
      .from('funnels')
      .insert([funnelData])
      .select()
      .single()
    
    if (!error) {
      funnels.value.unshift(data)
    }
    return { data, error }
  }

  const createFunnelFromTemplate = async (templateId, funnelName) => {
    try {
      const { funnelTemplates } = await import('@/data/funnelTemplates')
      const template = funnelTemplates[templateId]
      
      if (!template) throw new Error('Template não encontrado')
      
      // Criar funil
      const funnelResult = await createFunnel({ name: funnelName })
      if (funnelResult.error) throw new Error(funnelResult.error.message)
      
      const funnelId = funnelResult.data.id
      const nodeIdMap = {}
      
      // Criar nós
      for (const node of template.nodes) {
        const newNodeId = crypto.randomUUID()
        nodeIdMap[node.id] = newNodeId
        
        const { error } = await supabase.from('funnel_nodes').insert({
          id: newNodeId,
          funnel_id: funnelId,
          type: node.type,
          label: node.label,
          icon: nodeTypes[node.type]?.icon || 'mdi-circle',
          position_x: node.position.x,
          position_y: node.position.y,
          config: JSON.stringify(node.config || {})
        })
        
        if (error) {
          console.error('Erro ao criar nó:', error)
          throw error
        }
      }
      
      // Criar edges
      for (const edge of template.edges) {
        const { error } = await supabase.from('funnel_edges').insert({
          id: crypto.randomUUID(),
          funnel_id: funnelId,
          source_node_id: nodeIdMap[edge.source],
          target_node_id: nodeIdMap[edge.target]
        })
        
        if (error) {
          console.error('Erro ao criar edge:', error)
          // Não lançar erro para edges, apenas logar
        }
      }
      
      return { success: true, data: funnelResult.data }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const createNode = async (nodeData) => {
    const { data, error } = await supabase
      .from('funnel_nodes')
      .insert([{
        ...nodeData,
        funnel_id: currentFunnel.value?.id
      }])
      .select()
      .single()
    
    if (!error) {
      const newNode = {
        id: data.id,
        type: 'funnel',
        position: { x: data.position_x, y: data.position_y },
        data: {
          ...data,
          nodeType: nodeTypes[data.type] || nodeTypes.traffic,
          count: 0
        }
      }
      nodes.value.push(newNode)
    }
    return { data, error }
  }

  const updateNodePosition = async (nodeId, position) => {
    const { error } = await supabase
      .from('funnel_nodes')
      .update({
        position_x: Math.round(position.x),
        position_y: Math.round(position.y)
      })
      .eq('id', nodeId)
    
    if (!error) {
      const node = nodes.value.find(n => n.id === nodeId)
      if (node) {
        node.position = position
      }
    }
  }

  const startRealtime = (funnelId) => {
    if (realtimeChannel.value) {
      supabase.removeChannel(realtimeChannel.value)
    }

    realtimeChannel.value = supabase
      .channel(`funnel:${funnelId}`)
      .on('broadcast', { event: 'pulse' }, (payload) => {
        handleRealtimePulse(payload.payload)
      })
      .subscribe()
  }

  const handleRealtimePulse = (data) => {
    const { edge_id, count, node_id } = data
    
    // Atualizar contador do nó
    if (node_id) {
      const node = nodes.value.find(n => n.id === node_id)
      if (node) {
        node.data.count += count
      }
    }
    
    // Criar pulsos animados na edge
    if (edge_id && count > 0) {
      for (let i = 0; i < Math.min(count, 5); i++) {
        setTimeout(() => {
          pulses.value.push({
            id: `${edge_id}-${Date.now()}-${i}`,
            edgeId: edge_id,
            timestamp: Date.now()
          })
          
          // Remove pulse após animação
          setTimeout(() => {
            pulses.value = pulses.value.filter(p => p.id !== `${edge_id}-${Date.now()}-${i}`)
          }, 2000)
        }, i * 200)
      }
    }
  }

  const stopRealtime = () => {
    if (realtimeChannel.value) {
      supabase.removeChannel(realtimeChannel.value)
      realtimeChannel.value = null
    }
  }

  const selectNode = (nodeId) => {
    selectedNode.value = nodes.value.find(n => n.id === nodeId)
  }

  const saveEdge = async (edge) => {
    try {
      // Gerar UUID simples para o ID
      const edgeId = crypto.randomUUID()
      
      const { error } = await supabase
        .from('funnel_edges')
        .insert({
          id: edgeId,
          funnel_id: currentFunnel.value?.id,
          source_node_id: edge.source,
          target_node_id: edge.target
        })
      
      if (error) throw error
      console.log('✅ Edge salva no banco:', edgeId)
    } catch (error) {
      console.error('Erro ao salvar edge:', error)
    }
  }

  const loadEdges = async (funnelId) => {
    try {
      const { data, error } = await supabase
        .from('funnel_edges')
        .select('*')
        .eq('funnel_id', funnelId)
      
      if (error) throw error
      
      edges.value = data.map(edge => ({
        id: edge.id,
        source: edge.source_node_id,
        target: edge.target_node_id,
        sourceHandle: 'source',
        targetHandle: 'target',
        label: '',
        style: {
          stroke: '#e8eaf6',
          strokeWidth: 4,
          strokeDasharray: '12,6'
        },
        markerEnd: {
          type: 'arrowclosed',
          color: '#e8eaf6',
          width: 10,
          height: 8
        },
        data: { filter: {} }
      }))
      
      console.log('✅ Edges carregadas:', edges.value.length)
    } catch (error) {
      console.error('Erro ao carregar edges:', error)
    }
  }

  const deleteNode = async (nodeId) => {
    try {
      // Excluir nó do banco
      const { error } = await supabase
        .from('funnel_nodes')
        .delete()
        .eq('id', nodeId)
      
      if (error) throw error
      
      // Excluir edges relacionadas
      await supabase
        .from('funnel_edges')
        .delete()
        .or(`source_node_id.eq.${nodeId},target_node_id.eq.${nodeId}`)
      
      // Remover do estado local
      nodes.value = nodes.value.filter(n => n.id !== nodeId)
      edges.value = edges.value.filter(e => e.source !== nodeId && e.target !== nodeId)
      
      console.log('✅ Nó excluído:', nodeId)
    } catch (error) {
      console.error('Erro ao excluir nó:', error)
    }
  }

  const deleteEdge = async (edgeId) => {
    try {
      // Excluir edge do banco
      const { error } = await supabase
        .from('funnel_edges')
        .delete()
        .eq('id', edgeId)
      
      if (error) throw error
      
      // Remover do estado local
      edges.value = edges.value.filter(e => e.id !== edgeId)
      
      console.log('✅ Edge excluída:', edgeId)
    } catch (error) {
      console.error('Erro ao excluir edge:', error)
    }
  }

  const startConnection = (nodeId) => {
    console.log('🔵 Store: Iniciando conexão para:', nodeId)
    // Emitir evento global para o FunnelBuilder
    window.dispatchEvent(new CustomEvent('funnel-start-connection', {
      detail: { nodeId }
    }))
  }

  const completeConnection = (targetNodeId) => {
    console.log('🔵 Store: Completando conexão para:', targetNodeId)
    window.dispatchEvent(new CustomEvent('funnel-complete-connection', {
      detail: { targetNodeId }
    }))
  }

  return {
    funnels,
    currentFunnel,
    nodes,
    edges,
    selectedNode,
    pulses,
    nodeTypes,
    loadFunnels,
    loadFunnel,
    createFunnel,
    createNode,
    updateNodePosition,
    startRealtime,
    stopRealtime,
    selectNode,
    startConnection,
    completeConnection,
    saveEdge,
    loadEdges,
    deleteNode,
    deleteEdge,
    createFunnelFromTemplate
  }
})