import { type FC, useCallback } from 'react'
import { useEditorStore } from '@/shared/store/editorStore'
import { ToolPanel } from '@/shared/components/ui/ToolPanel'
import { Button } from '@/shared/components/ui/Button'
import { RotateCommand } from '@/features/transformations/commands/RotateCommand'
import { FlipCommand } from '@/features/transformations/commands/FlipCommand'
import { FreeRotateCommand } from '@/features/transformations/commands/FreeRotateCommand'
import { Slider } from '@/shared/components/Slider'

export const TransformPanel: FC = () => {
  const { 
    transform, 
    updateTransform, 
    executeCommand, 
    isCropping, 
    setIsCropping 
  } = useEditorStore()

  const handleRotate = useCallback((direction: 'cw' | 'ccw') => {
    const rotationChange = direction === 'cw' ? 90 : -90
    executeCommand(new RotateCommand(transform.rotation, rotationChange, updateTransform))
  }, [transform.rotation, updateTransform, executeCommand])

  const handleFreeRotate = useCallback((value: number) => {
    // For free rotation, we don't want to push a command on every slider change
    // Instead, we update the transform directly, and only push a command on mouse up
    // For now, let's just update the transform directly
    updateTransform({ rotation: value })
  }, [updateTransform])

  const handleFreeRotateEnd = useCallback((value: number) => {
    // When the user finishes dragging the slider, execute the command
    executeCommand(new FreeRotateCommand(transform.rotation, value, updateTransform))
  }, [transform.rotation, updateTransform, executeCommand])

  const handleFlip = useCallback((direction: 'horizontal' | 'vertical') => {
    executeCommand(new FlipCommand(transform.scaleX, transform.scaleY, direction, updateTransform))
  }, [transform.scaleX, transform.scaleY, updateTransform, executeCommand])

  const handleToggleCrop = useCallback(() => {
    setIsCropping(!isCropping)
  }, [isCropping, setIsCropping])

  return (
    <ToolPanel title="Transform">
      <div className="flex flex-col gap-4">
        <div className="flex justify-around items-center">
          <Button onClick={() => handleRotate('ccw')}>Rotate Left</Button>
          <Button onClick={() => handleRotate('cw')}>Rotate Right</Button>
        </div>

        <div>
          <Slider
            label="Free Rotate"
            min={-180}
            max={180}
            step={1}
            value={transform.rotation}
            defaultValue={0}
            onChange={handleFreeRotate}
            onAfterChange={handleFreeRotateEnd}
          />
        </div>

        <div className="flex justify-around items-center">
          <Button onClick={() => handleFlip('horizontal')}>Flip Horizontal</Button>
          <Button onClick={() => handleFlip('vertical')}>Flip Vertical</Button>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleToggleCrop}>
            {isCropping ? 'Cancel Crop' : 'Crop Image'}
          </Button>
        </div>
      </div>
    </ToolPanel>
  )
}