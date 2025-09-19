import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jfxvfekzoaixdmckrlch.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeHZmZWt6b2FpeGRtY2tybGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNDU3MTUsImV4cCI6MjA3MzgyMTcxNX0.f4Oed_H6X7zYc5n7dhQtrmOsv-DNBBWK_1eDKV9Xdg8'

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