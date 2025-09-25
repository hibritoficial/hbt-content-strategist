export class ClaudeService {
  constructor() {
    this.apiKey = import.meta.env.VITE_CLAUDE_API_KEY
    this.baseUrl = 'https://api.anthropic.com/v1/messages'
  }

  async generateTravelItinerary(userPreferences) {
    // Use fallback in development
    return this.getFallbackItinerary(userPreferences)
  }

  buildTravelPrompt(preferences) {
    return `Crie um roteiro de viagem personalizado e amigável baseado nestas preferências:

Nome: ${preferences.firstname}
Estilo: ${preferences.travelStyle}
Orçamento: ${preferences.budget}
Duração: ${preferences.duration}
Companhia: ${preferences.companions}
Acomodação: ${preferences.accommodation}
Atividades: ${preferences.activities?.join(', ')}
Clima: ${preferences.climate}
Restrições: ${preferences.restrictions?.join(', ')}
Época: ${preferences.timing}

Formato do roteiro:
- Título atrativo
- 2-3 destinos recomendados
- Atividades por dia
- Dicas de orçamento
- Restaurantes locais
- Informações práticas

Mantenha tom amigável e use emojis. Máximo 1500 caracteres.`
  }

  formatItinerary(rawText) {
    return {
      title: '🌟 Seu Roteiro Personalizado',
      content: rawText,
      generatedAt: new Date().toISOString()
    }
  }

  getFallbackItinerary(preferences) {
    const name = preferences.firstname || 'viajante'
    const travelStyle = this.mapTravelStyle(preferences)
    const budget = this.mapBudget(preferences)
    const duration = this.mapDuration(preferences)
    const companions = this.mapCompanions(preferences)
    const accommodation = this.mapAccommodation(preferences)
    const climate = this.mapClimate(preferences)
    
    return {
      title: '🌟 Roteiro Personalizado',
      content: `Olá ${name}! 🎒

Com base no seu perfil de **${travelStyle}**, criamos sugestões especiais:

🌍 **Destinos Recomendados**

• Locais ideais para ${travelStyle.toLowerCase()}
• Experiências ${climate} perfeitas para você
• Destinos que combinam com ${companions}

📅 **Roteiro de ${duration}**

• Dia 1-2: Chegada e primeiras experiências
• Dia 3-4: Atividades principais do seu interesse
• Dia 5+: Experiências locais autênticas

💰 **Orçamento ${budget}**

• Hospedagem: ${accommodation}
• Atividades selecionadas para seu perfil
• Dicas de economia local

🍽️ **Experiências Gastronômicas**

• Restaurantes locais autênticos
• Pratos típicos imperdíveis
• Experiências culinárias únicas

🎯 **Dicas Personalizadas**

• Melhor época para viajar
• Atividades ideais para seu grupo
• Roteiro otimizado para ${duration}

✈️ Sua viagem dos sonhos te espera!`,
      generatedAt: new Date().toISOString()
    }
  }
  
  mapTravelStyle(preferences) {
    const styles = {
      adventure: 'Aventura e Adrenalina',
      relax: 'Relaxamento e Praias',
      culture: 'Cultura e História',
      gastronomy: 'Gastronomia e Vinhos',
      nature: 'Natureza e Ecoturismo'
    }
    
    for (const [key, value] of Object.entries(preferences)) {
      if (styles[value]) return styles[value]
    }
    return 'Experiências Diversificadas'
  }
  
  mapBudget(preferences) {
    const budgets = {
      budget: 'Econômico',
      medium: 'Intermediário', 
      luxury: 'Premium',
      flexible: 'Flexível'
    }
    
    for (const [key, value] of Object.entries(preferences)) {
      if (budgets[value]) return budgets[value]
    }
    return 'Equilibrado'
  }
  
  mapDuration(preferences) {
    const durations = {
      weekend: 'Final de semana (2-3 dias)',
      week: 'Uma semana (4-7 dias)',
      extended: 'Viagem longa (8-15 dias)',
      month: 'Mochilão (mais de 15 dias)'
    }
    
    for (const [key, value] of Object.entries(preferences)) {
      if (durations[value]) return durations[value]
    }
    return '5-7 dias'
  }
  
  mapCompanions(preferences) {
    const companions = {
      solo: 'viagem solo',
      couple: 'viagem em casal',
      friends: 'viagem com amigos',
      family: 'viagem em família'
    }
    
    for (const [key, value] of Object.entries(preferences)) {
      if (companions[value]) return companions[value]
    }
    return 'sua companhia'
  }
  
  mapAccommodation(preferences) {
    const accommodations = {
      hostel: 'Hostels e pousadas charmosas',
      hotel: 'Hotéis confortáveis',
      resort: 'Resorts all-inclusive',
      unique: 'Experiências únicas de hospedagem'
    }
    
    for (const [key, value] of Object.entries(preferences)) {
      if (accommodations[value]) return accommodations[value]
    }
    return 'acomodações confortáveis'
  }
  
  mapClimate(preferences) {
    const climates = {
      tropical: 'com clima tropical',
      temperate: 'com clima ameno',
      cold: 'com clima frio',
      any: 'com diversos climas'
    }
    
    for (const [key, value] of Object.entries(preferences)) {
      if (climates[value]) return climates[value]
    }
    return 'com clima agradável'
  }
}

export const claudeService = new ClaudeService()