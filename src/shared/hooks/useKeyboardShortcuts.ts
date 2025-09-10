import { useEffect } from 'react'
import { useEditorStore } from '../store/editorStore'

export const useKeyboardShortcuts = () => {
  const { undo, redo, canUndo, canRedo } = useEditorStore()
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        event.preventDefault()
        if (event.shiftKey) {
          if (canRedo()) {
            redo()
          }
        } else {
          if (canUndo()) {
            undo()
          }
        }
      } else if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
        event.preventDefault()
        if (canRedo()) {
          redo()
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, canUndo, canRedo])
}
