import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jfxvfekzoaixdmckrlch.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeHZmZWt6b2FpeGRtY2tybGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNDU3MTUsImV4cCI6MjA3MzgyMTcxNX0.f4Oed_H6X7zYc5n7dhQtrmOsv-DNBBWK_1eDKV9Xdg8'

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