import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jfxvfekzoaixdmckrlch.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeHZmZWt6b2FpeGRtY2tybGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNDU3MTUsImV4cCI6MjA3MzgyMTcxNX0.f4Oed_H6X7zYc5n7dhQtrmOsv-DNBBWK_1eDKV9Xdg8'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function populateData() {
  try {
    console.log('🔄 Populando dados iniciais...')

    // Pillars
    const { error: pillarsError } = await supabase.from('pillars').insert([
      { name: 'Educação', description: 'Conteúdos educativos e informativos' },
      { name: 'Inspiração', description: 'Conteúdos motivacionais e inspiradores' },
      { name: 'Entretenimento', description: 'Conteúdos divertidos e engajadores' }
    ])
    if (pillarsError) throw pillarsError
    console.log('✅ Pillars inseridos')

    // Angles
    const { error: anglesError } = await supabase.from('angles').insert([
      { name: 'Tutorial', description: 'Passo a passo detalhado' },
      { name: 'Dica Rápida', description: 'Dicas práticas e objetivas' },
      { name: 'Bastidores', description: 'Conteúdo dos bastidores' }
    ])
    if (anglesError) throw anglesError
    console.log('✅ Angles inseridos')

    // Formats
    const { error: formatsError } = await supabase.from('formats').insert([
      { name: 'Post', description: 'Post simples do Instagram' },
      { name: 'Carrossel', description: 'Carrossel de múltiplas imagens' },
      { name: 'Reels', description: 'Vídeo curto vertical' },
      { name: 'Story', description: 'Story temporário' }
    ])
    if (formatsError) throw formatsError
    console.log('✅ Formats inseridos')

    // Molds
    const { error: moldsError } = await supabase.from('molds').insert([
      { 
        slug: 'carousel-6x', 
        name: 'Carrossel 6x', 
        slides: 6, 
        layout_schema: { type: 'carousel', slides: 6 }
      },
      { 
        slug: 'reels-tutorial', 
        name: 'Reels Tutorial', 
        slides: 1, 
        layout_schema: { type: 'reels', duration: '15-30s' }
      },
      { 
        slug: 'post-simple', 
        name: 'Post Simples', 
        slides: 1, 
        layout_schema: { type: 'post', format: 'square' }
      }
    ])
    if (moldsError) throw moldsError
    console.log('✅ Molds inseridos')

    // Buscar IDs reais das tabelas inseridas
    const { data: pillarsData } = await supabase.from('pillars').select('id, name')
    const { data: anglesData } = await supabase.from('angles').select('id, name')
    const { data: formatsData } = await supabase.from('formats').select('id, name')
    const { data: moldsData } = await supabase.from('molds').select('id, name')

    // Content Items de exemplo usando IDs reais
    const { error: contentError } = await supabase.from('content_items').insert([
      {
        title: 'Como criar conteúdo viral',
        pillar_id: pillarsData.find(p => p.name === 'Educação')?.id,
        angle_id: anglesData.find(a => a.name === 'Tutorial')?.id,
        format_id: formatsData.find(f => f.name === 'Carrossel')?.id,
        mold_id: moldsData.find(m => m.name === 'Carrossel 6x')?.id,
        offer: 'Descubra o segredo para criar conteúdo que viraliza',
        proof_anchor: 'Mais de 1M de visualizações em nossos posts',
        cta_text: 'Salve este post',
        hashtags_cluster: 'amplas:nicho:branded',
        status: 'draft_copy',
        scheduled_date: '2024-01-20'
      },
      {
        title: 'Motivação para segunda-feira',
        pillar_id: pillarsData.find(p => p.name === 'Inspiração')?.id,
        angle_id: anglesData.find(a => a.name === 'Dica Rápida')?.id,
        format_id: formatsData.find(f => f.name === 'Post')?.id,
        mold_id: moldsData.find(m => m.name === 'Post Simples')?.id,
        offer: 'Transforme sua segunda-feira em um dia produtivo',
        proof_anchor: 'Técnica usada por 90% dos empreendedores de sucesso',
        cta_text: 'Comente AQUI',
        hashtags_cluster: 'amplas:nicho:branded',
        status: 'ready',
        scheduled_date: '2024-01-22'
      }
    ])
    if (contentError) throw contentError
    console.log('✅ Content Items inseridos')

    console.log('🚀 Dados populados com sucesso!')

  } catch (error) {
    console.error('❌ Erro ao popular dados:', error.message)
  }
}

populateData()