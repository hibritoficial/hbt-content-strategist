import { supabase } from '@/lib/supabase'

export const seedLibraryData = async () => {
  const results = {}
  const errors = []
  
  // Pilares (do enunciado original)
  const pillars = [
    { name: 'Autoridade', description: 'Conteúdos que demonstram expertise e conhecimento' },
    { name: 'Relacionamento', description: 'Conteúdos que criam conexão com a audiência' },
    { name: 'Vendas', description: 'Conteúdos focados em conversão e vendas' },
    { name: 'Educativo', description: 'Conteúdos que ensinam e agregam valor' }
  ]

  // Ângulos (do enunciado original)
  const angles = [
    { name: 'Dor', description: 'Foca nos problemas e dificuldades do público' },
    { name: 'Sonho', description: 'Apresenta a situação ideal desejada' },
    { name: 'Medo', description: 'Explora receios e preocupações' },
    { name: 'Urgência', description: 'Cria senso de pressa e oportunidade limitada' },
    { name: 'Curiosidade', description: 'Desperta interesse e vontade de saber mais' }
  ]

  // Formatos (do enunciado original)
  const formats = [
    { name: 'Post', description: 'Post simples com uma imagem' },
    { name: 'Carrossel', description: 'Múltiplas imagens em sequência' },
    { name: 'Reels', description: 'Vídeo curto vertical' },
    { name: 'Story', description: 'Conteúdo temporário para stories' }
  ]

  // Moldes LEGO (do enunciado original + complementos)
  const molds = [
    { name: 'Carrossel 6x', description: 'Template de carrossel com 6 slides' },
    { name: 'Reels', description: 'Template para vídeos curtos' },
    { name: 'Post Educativo', description: 'Template para conteúdo educacional' },
    { name: 'Post de Vendas', description: 'Template focado em conversão' },
    { name: 'Dica Rápida', description: 'Template para dicas práticas' },
    { name: 'Tutorial Passo a Passo', description: 'Template para tutoriais' },
    { name: 'Antes e Depois', description: 'Template para transformações' }
  ]

  // Inserir Pilares
  try {
    const { data: existingPillars } = await supabase.from('pillars').select('name')
    const existingPillarNames = existingPillars?.map(p => p.name) || []
    const newPillars = pillars.filter(p => !existingPillarNames.includes(p.name))
    if (newPillars.length > 0) {
      const result = await supabase.from('pillars').insert(newPillars).select()
      results.pillars = result.data?.length || 0
    } else {
      results.pillars = 'já existem'
    }
  } catch (error) {
    errors.push(`Pilares: ${error.message}`)
  }

  // Inserir Ângulos
  try {
    const { data: existingAngles } = await supabase.from('angles').select('name')
    const existingAngleNames = existingAngles?.map(a => a.name) || []
    const newAngles = angles.filter(a => !existingAngleNames.includes(a.name))
    if (newAngles.length > 0) {
      const result = await supabase.from('angles').insert(newAngles).select()
      results.angles = result.data?.length || 0
    } else {
      results.angles = 'já existem'
    }
  } catch (error) {
    errors.push(`Ângulos: ${error.message}`)
  }

  // Inserir Formatos
  try {
    const { data: existingFormats } = await supabase.from('formats').select('name')
    const existingFormatNames = existingFormats?.map(f => f.name) || []
    const newFormats = formats.filter(f => !existingFormatNames.includes(f.name))
    if (newFormats.length > 0) {
      const result = await supabase.from('formats').insert(newFormats).select()
      results.formats = result.data?.length || 0
    } else {
      results.formats = 'já existem'
    }
  } catch (error) {
    errors.push(`Formatos: ${error.message}`)
  }

  // Inserir Moldes (com tratamento especial de erro)
  try {
    const { data: existingMolds } = await supabase.from('molds').select('name')
    const existingMoldNames = existingMolds?.map(m => m.name) || []
    const newMolds = molds.filter(m => !existingMoldNames.includes(m.name))
    if (newMolds.length > 0) {
      const result = await supabase.from('molds').insert(newMolds).select()
      results.molds = result.data?.length || 0
    } else {
      results.molds = 'já existem'
    }
  } catch (error) {
    errors.push(`Moldes: ${error.message}`)
    results.molds = 'erro - tabela pode não existir'
  }

  console.log('Resultados:', results)
  if (errors.length > 0) {
    console.log('Erros:', errors)
  }

  return {
    success: errors.length === 0,
    results,
    errors
  }
}