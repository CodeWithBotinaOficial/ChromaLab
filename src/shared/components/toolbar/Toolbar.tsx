import { Undo2, Redo2, Download } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'
import { Button } from '../ui/Button'
import { Tooltip } from '../ui/Tooltip'

export const Toolbar = () => {
  const { undo, redo, currentImage, canUndo, canRedo } = useEditorStore()
  
  const handleExport = async () => {
    if (!currentImage) return

    // Get the Konva stage
    const stage = document.querySelector('canvas') as HTMLCanvasElement
    if (!stage) return

    // Get the modified image data
    const modifiedDataUrl = stage.toDataURL(currentImage.type, 1.0) // Maximum quality
    
    // Create download link
    const link = document.createElement('a')
    link.download = `edited_${currentImage.name}`
    link.href = modifiedDataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return (
    <div className="flex items-center gap-2">
      <Tooltip content="Undo (Ctrl+Z)">
        <Button
          variant="ghost"
          size="sm"
          onClick={undo}
          disabled={!canUndo()}
          leftIcon={<Undo2 className="w-5 h-5" />}
        />
      </Tooltip>

      <Tooltip content="Redo (Ctrl+Y)">
        <Button
          variant="ghost"
          size="sm"
          onClick={redo}
          disabled={!canRedo()}
          leftIcon={<Redo2 className="w-5 h-5" />}
        />
      </Tooltip>
      
      <div className="w-px h-6 bg-background-primary mx-2" />
      
      <Tooltip content="Export Image">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExport}
          disabled={!currentImage}
          leftIcon={<Download className="w-5 h-5" />}
        />
      </Tooltip>
    </div>
  )
}
