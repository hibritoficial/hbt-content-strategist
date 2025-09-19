import { onMounted, onUnmounted } from 'vue'
import { useDocsStore } from '@/stores/docs'

export function useDocHotspot() {
  const docsStore = useDocsStore()

  const handleKeydown = (event) => {
    // Shift + / para toggle do dock
    if (event.shiftKey && event.key === '?') {
      event.preventDefault()
      docsStore.toggle()
    }
    
    // Cmd/Ctrl + K para busca
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault()
      docsStore.toggle()
      // Focus no campo de busca após um tick
      setTimeout(() => {
        const searchInput = document.querySelector('.doc-dock input')
        if (searchInput) searchInput.focus()
      }, 100)
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  return {
    openTopic: docsStore.openTopic,
    toggle: docsStore.toggle
  }
}