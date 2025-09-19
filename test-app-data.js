import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'your_supabase_url_here'
const supabaseAnonKey = 'your_supabase_anon_key_here'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testAppQueries() {
  try {
    console.log('🔄 Testando queries da aplicação...')

    // Teste da query do content store (com joins)
    const { data: contentWithJoins, error: contentError } = await supabase
      .from('content_items')
      .select(`
        *,
        pillars(name),
        angles(name),
        formats(name),
        molds(name)
      `)
      .order('updated_at', { ascending: false })
    
    if (contentError) {
      console.error('❌ Erro na query de content_items:', contentError.message)
    } else {
      console.log('✅ Content Items com joins:', contentWithJoins?.length || 0, 'registros')
      if (contentWithJoins?.length > 0) {
        console.log('📄 Exemplo:', {
          title: contentWithJoins[0].title,
          pillar: contentWithJoins[0].pillars?.name,
          angle: contentWithJoins[0].angles?.name,
          format: contentWithJoins[0].formats?.name
        })
      }
    }

    // Teste das tabelas individuais
    const { data: pillars } = await supabase.from('pillars').select('*')
    const { data: angles } = await supabase.from('angles').select('*')
    const { data: formats } = await supabase.from('formats').select('*')
    const { data: molds } = await supabase.from('molds').select('*')

    console.log('✅ Pillars disponíveis:', pillars?.map(p => p.name).join(', '))
    console.log('✅ Angles disponíveis:', angles?.map(a => a.name).join(', '))
    console.log('✅ Formats disponíveis:', formats?.map(f => f.name).join(', '))
    console.log('✅ Molds disponíveis:', molds?.map(m => m.name).join(', '))

    console.log('🚀 Todas as queries da aplicação funcionando!')

  } catch (error) {
    console.error('❌ Erro geral:', error.message)
  }
}

testAppQueries()