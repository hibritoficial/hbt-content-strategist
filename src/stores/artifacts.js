import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import coreArtifacts from '@/data/artifacts/core.json'
import contentProcess from '@/data/artifacts/processes/content-simple.json'
import agrolitoClient from '@/data/artifacts/clients/agrolito-simple.json'

export const useArtifactsStore = defineStore('artifacts', () => {
  // Estado dos artefatos
  const core = ref(coreArtifacts)
  const processes = ref(contentProcess)
  const clients = ref({
    agrolito: agrolitoClient
  })
  
  // Debug: verificar se os dados foram carregados corretamente
  // console.log('Artifacts Store - Dados carregados:', {
  //   core: core.value,
  //   processes: processes.value,
  //   clients: clients.value,
  //   agrolitoClient: agrolitoClient
  // })
  
  // Estado do processo atual
  const currentProcess = ref(null)
  const currentClient = ref(null)
  const currentFunnel = ref(null)
  const currentCulture = ref(null)
  const currentRegion = ref(null)
  const currentAvatar = ref(null)
  const currentTemplate = ref(null)
  const currentHook = ref(null)
  const currentProof = ref(null)
  const currentCTA = ref(null)
  
  // Estado da geração
  const generatedContent = ref([])
  const isGenerating = ref(false)
  
  // Computed properties
  const availableClients = computed(() => {
    return Object.keys(clients.value).map(clientId => ({
      id: clientId,
      name: clients.value[clientId].client.name,
      business: clients.value[clientId].client.business
    }))
  })
  
  const availableFunnels = computed(() => {
    if (!currentClient.value) return []
    const client = clients.value[currentClient.value]
    if (!client || !client.client || !client.client.funnels) return []
    
    return Object.values(client.client.funnels).map(funnel => ({
      id: funnel.id,
      name: funnel.name,
      description: funnel.description,
      icon: funnel.icon,
      color: funnel.color,
      cultures: funnel.cultures || [],
      regions: funnel.regions ? Object.entries(funnel.regions).map(([state, cities]) => 
        cities.map(city => `${state} - ${city}`)
      ).flat() : [],
      avatars: funnel.avatars || []
    }))
  })
  
  const availableCultures = computed(() => {
    if (!currentFunnel.value) return []
    const funnel = availableFunnels.value.find(f => f.id === currentFunnel.value)
    return funnel?.cultures || []
  })
  
  const availableRegions = computed(() => {
    if (!currentFunnel.value) return []
    const funnel = availableFunnels.value.find(f => f.id === currentFunnel.value)
    return funnel?.regions || []
  })
  
  const availableAvatars = computed(() => {
    if (!currentFunnel.value) return []
    const funnel = availableFunnels.value.find(f => f.id === currentFunnel.value)
    return funnel?.avatars || []
  })
  
  const availableTemplates = computed(() => {
    if (processes.value.templates) {
      return Object.values(processes.value.templates).map(template => ({
        id: template.id,
        name: template.name,
        description: template.description,
        structure: template.structure,
        duration: template.duration
      }))
    }
    return []
  })
  
  const availableHooks = computed(() => {
    if (processes.value.hooks) {
      return processes.value.hooks
    }
    return []
  })
  
  const availableProofs = computed(() => {
    if (processes.value.proofs) {
      return processes.value.proofs
    }
    return []
  })
  
  const availableCTAs = computed(() => {
    if (processes.value.ctas) {
      return processes.value.ctas
    }
    return []
  })
  
  const currentClientData = computed(() => {
    if (!currentClient.value) return null
    return clients.value[currentClient.value]
  })
  
  const currentFunnelData = computed(() => {
    if (!currentFunnel.value || !currentClient.value) return null
    const client = clients.value[currentClient.value]
    return Object.values(client.client.funnels).find(f => f.id === currentFunnel.value)
  })
  
  const currentAvatarData = computed(() => {
    if (!currentAvatar.value || !currentFunnelData.value) return null
    return currentFunnelData.value.avatars.find(a => a.id === currentAvatar.value)
  })
  
  const currentTemplateData = computed(() => {
    if (!currentTemplate.value) return null
    return processes.value.content.templates[currentTemplate.value]
  })
  
  const currentHookData = computed(() => {
    if (!currentHook.value) return null
    return availableHooks.value.find(h => h.id === currentHook.value)
  })
  
  const currentProofData = computed(() => {
    if (!currentProof.value) return null
    return availableProofs.value.find(p => p.id === currentProof.value)
  })
  
  const currentCTAData = computed(() => {
    if (!currentCTA.value) return null
    return availableCTAs.value.find(c => c.id === currentCTA.value)
  })
  
  const canGenerate = computed(() => {
    const checks = [
      currentClient.value,
      currentFunnel.value,
      currentCulture.value,
      currentRegion.value,
      currentAvatar.value,
      currentTemplate.value,
      currentHook.value,
      currentProof.value,
      currentCTA.value
    ]
    
    return checks.every(check => check !== null && check !== undefined && check !== '')
  })
  
  // Métodos
  const setClient = (clientId) => {
    currentClient.value = clientId
    // Reset dependent selections
    currentFunnel.value = null
    currentCulture.value = null
    currentRegion.value = null
    currentAvatar.value = null
  }
  
  const setFunnel = (funnelId) => {
    currentFunnel.value = funnelId
    // Reset dependent selections
    currentCulture.value = null
    currentRegion.value = null
    currentAvatar.value = null
  }
  
  const setCulture = (culture) => {
    currentCulture.value = culture
  }
  
  const setRegion = (region) => {
    currentRegion.value = region
  }
  
  const setAvatar = (avatarId) => {
    currentAvatar.value = avatarId
  }
  
  const setTemplate = (templateId) => {
    currentTemplate.value = templateId
  }
  
  const setHook = (hookId) => {
    currentHook.value = hookId
  }
  
  const setProof = (proofId) => {
    currentProof.value = proofId
  }
  
  const setCTA = (ctaId) => {
    currentCTA.value = ctaId
  }
  
  const generateContent = async () => {
    // Verificar se todos os campos necessários estão preenchidos
    const canGenerateLocal = currentClient.value && 
           currentFunnel.value && 
           currentCulture.value && 
           currentRegion.value && 
           currentAvatar.value && 
           currentTemplate.value && 
           currentHook.value && 
           currentProof.value && 
           currentCTA.value
    
    console.log('Store - generateContent called, canGenerateLocal:', canGenerateLocal)
    console.log('Store - current values:', {
      currentClient: currentClient.value,
      currentFunnel: currentFunnel.value,
      currentCulture: currentCulture.value,
      currentRegion: currentRegion.value,
      currentAvatar: currentAvatar.value,
      currentTemplate: currentTemplate.value,
      currentHook: currentHook.value,
      currentProof: currentProof.value,
      currentCTA: currentCTA.value
    })
    
    if (!canGenerateLocal) {
      console.log('Store - cannot generate, missing required fields')
      return
    }
    
    console.log('Store - starting content generation...')
    isGenerating.value = true
    
    try {
      // Simular geração de conteúdo baseada nos artefatos
      const content = await generateContentVariations()
      generatedContent.value = content
      console.log('Store - content generated successfully:', content)
    } catch (error) {
      console.error('Store - error generating content:', error)
    } finally {
      isGenerating.value = false
      console.log('Store - generation completed')
    }
  }
  
  const generateContentVariations = async () => {
    // Simular delay de geração
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const hook = currentHookData.value
    const proof = currentProofData.value
    const cta = currentCTAData.value
    const avatar = currentAvatarData.value
    const client = currentClientData.value
    
    // Gerar 3 variações baseadas nos artefatos
    const variations = [
      {
        id: 1,
        copy: generateVariation1(hook, proof, cta, avatar, client),
        hashtags: generateHashtags(client, currentCulture.value),
        cta: cta.text,
        template: currentTemplate.value,
        quality_score: 85
      },
      {
        id: 2,
        copy: generateVariation2(hook, proof, cta, avatar, client),
        hashtags: generateHashtags(client, currentCulture.value),
        cta: cta.text,
        template: currentTemplate.value,
        quality_score: 78
      },
      {
        id: 3,
        copy: generateVariation3(hook, proof, cta, avatar, client),
        hashtags: generateHashtags(client, currentCulture.value),
        cta: cta.text,
        template: currentTemplate.value,
        quality_score: 92
      }
    ]
    
    return variations
  }
  
  const generateVariation1 = (hook, proof, cta, avatar, client) => {
    return `🌱 ${hook.text}

${proof.description} comprova: ${avatar.name.toLowerCase()}s do ${currentRegion.value} estão economizando até 40% em fertilizantes.

✅ K gradual = sem lixiviação
✅ Si = folhas resistentes  
✅ pH corrigido = raízes profundas

${cta.text}`
  }
  
  const generateVariation2 = (hook, proof, cta, avatar, client) => {
    return `💡 ${hook.text}

Resultado real: ${currentCulture.value} em ${currentRegion.value} com +25% produtividade.

Como funciona:
🔹 Remineralização natural
🔹 Liberação gradual de nutrientes
🔹 Efeito residual 2-3 anos

${cta.text}`
  }
  
  const generateVariation3 = (hook, proof, cta, avatar, client) => {
    return `🚀 ${hook.text}

${proof.name}: tecnologia testada e aprovada.

Benefícios comprovados:
✅ Economia de 30% em fertilizantes
✅ Solo mais estruturado
✅ Plantas mais resistentes

${cta.text}`
  }
  
  const generateHashtags = (client, culture) => {
    const baseHashtags = ['#remineralizador', '#agriculturasustentavel', '#solovivo']
    const clientHashtag = `#${client.client.name.toLowerCase()}`
    const cultureHashtag = `#${culture.toLowerCase()}`
    
    return [...baseHashtags, clientHashtag, cultureHashtag].join(' ')
  }
  
  const resetProcess = () => {
    currentClient.value = null
    currentFunnel.value = null
    currentCulture.value = null
    currentRegion.value = null
    currentAvatar.value = null
    currentTemplate.value = null
    currentHook.value = null
    currentProof.value = null
    currentCTA.value = null
    generatedContent.value = []
  }
  
  const getProcessSummary = () => {
    return {
      client: currentClientData.value?.client.name,
      funnel: currentFunnelData.value?.name,
      culture: currentCulture.value,
      region: currentRegion.value,
      avatar: currentAvatarData.value?.name,
      template: currentTemplateData.value?.name,
      hook: currentHookData.value?.text,
      proof: currentProofData.value?.name,
      cta: currentCTAData.value?.text,
      canGenerate: canGenerate.value
    }
  }
  
  return {
    // Estado
    core,
    processes,
    clients,
    currentClient,
    currentFunnel,
    currentCulture,
    currentRegion,
    currentAvatar,
    currentTemplate,
    currentHook,
    currentProof,
    currentCTA,
    generatedContent,
    isGenerating,
    
    // Computed
    availableClients,
    availableFunnels,
    availableCultures,
    availableRegions,
    availableAvatars,
    availableTemplates,
    availableHooks,
    availableProofs,
    availableCTAs,
    currentClientData,
    currentFunnelData,
    currentAvatarData,
    currentTemplateData,
    currentHookData,
    currentProofData,
    currentCTAData,
    canGenerate,
    
    // Métodos
    setClient,
    setFunnel,
    setCulture,
    setRegion,
    setAvatar,
    setTemplate,
    setHook,
    setProof,
    setCTA,
    generateContent,
    resetProcess,
    getProcessSummary
  }
})
