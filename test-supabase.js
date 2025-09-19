import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'your_supabase_url_here'
const supabaseAnonKey = 'your_supabase_anon_key_here'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log('🔄 Testando conexão com Supabase...')
    
    // Testar tabelas
    const { data: pillars, error: pillarsError } = await supabase.from('pillars').select('*').limit(5)
    if (pillarsError) throw pillarsError
    console.log('✅ Pillars:', pillars?.length || 0, 'registros')
    
    const { data: angles, error: anglesError } = await supabase.from('angles').select('*').limit(5)
    if (anglesError) throw anglesError
    console.log('✅ Angles:', angles?.length || 0, 'registros')
    
    const { data: formats, error: formatsError } = await supabase.from('formats').select('*').limit(5)
    if (formatsError) throw formatsError
    console.log('✅ Formats:', formats?.length || 0, 'registros')
    
    const { data: content, error: contentError } = await supabase.from('content_items').select('*').limit(5)
    if (contentError) throw contentError
    console.log('✅ Content Items:', content?.length || 0, 'registros')
    
    console.log('🚀 Conexão com Supabase funcionando!')
    
  } catch (error) {
    console.error('❌ Erro na conexão:', error.message)
  }
}

testConnection()