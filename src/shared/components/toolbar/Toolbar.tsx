import { Undo2, Redo2, Download } from 'lucide-react'
import { useEditorStore } from '../../store/editorStore'
import { Button } from '../ui/Button'
import { Tooltip } from '../ui/Tooltip'

export const Toolbar = ({ onExport }: { onExport: () => void }) => {
  const { undo, redo, currentImage, canUndo, canRedo } = useEditorStore()
  
  
  
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
          onClick={onExport}
          disabled={!currentImage}
          leftIcon={<Download className="w-5 h-5" />}
        />
      </Tooltip>
    </div>
  )
}
