import { onMounted, onUnmounted } from 'vue'

export function useKeyboardShortcuts(shortcuts) {
  const handleKeydown = (event) => {
    // Ignorar se estiver em um input/textarea
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
      return
    }

    const key = event.key.toLowerCase()
    const combo = []
    
    if (event.ctrlKey || event.metaKey) combo.push('ctrl')
    if (event.altKey) combo.push('alt')
    if (event.shiftKey) combo.push('shift')
    combo.push(key)
    
    const shortcut = combo.join('+')
    
    // Verificar combinações especiais como g+c
    if (key === 'g') {
      const nextKey = new Promise(resolve => {
        const handler = (e) => {
          document.removeEventListener('keydown', handler)
          resolve(e.key.toLowerCase())
        }
        document.addEventListener('keydown', handler)
        setTimeout(() => {
          document.removeEventListener('keydown', handler)
          resolve(null)
        }, 1000)
      })
      
      nextKey.then(next => {
        if (next) {
          const comboShortcut = `g+${next}`
          if (shortcuts[comboShortcut]) {
            event.preventDefault()
            shortcuts[comboShortcut]()
          }
        }
      })
      return
    }
    
    if (shortcuts[key] || shortcuts[shortcut]) {
      event.preventDefault()
      const handler = shortcuts[key] || shortcuts[shortcut]
      handler()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
}