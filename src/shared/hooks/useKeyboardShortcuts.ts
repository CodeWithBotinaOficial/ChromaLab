import { useEffect } from 'react'
import { useEditorStore } from '../store/editorStore'

export const useKeyboardShortcuts = () => {
  const { undo, redo } = useEditorStore()
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault()
        if (event.shiftKey) {
          redo()
        } else {
          undo()
        }
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
        event.preventDefault()
        redo()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])
}
