// Teste simples para debug do sistema de conexão
console.log('🔧 Testando sistema de conexão...')

// Simular clique na bolinha
function testConnection() {
  console.log('1. Clicando na bolinha...')
  
  // Verificar se elementos existem
  const handles = document.querySelectorAll('.connection-handle--source')
  console.log('Bolinhas encontradas:', handles.length)
  
  if (handles.length > 0) {
    const firstHandle = handles[0]
    console.log('2. Disparando evento de clique...')
    firstHandle.click()
    
    // Verificar estado após clique
    setTimeout(() => {
      const activeHandles = document.querySelectorAll('.connection-handle--active')
      console.log('Bolinhas ativas após clique:', activeHandles.length)
      
      const connectionMode = document.querySelector('.funnel-node--connecting')
      console.log('Modo de conexão ativo:', !!connectionMode)
      
      const overlay = document.querySelector('.connection-line-overlay')
      console.log('Overlay de linha visível:', !!overlay)
    }, 100)
  }
}

// Executar teste após 2 segundos
setTimeout(testConnection, 2000)