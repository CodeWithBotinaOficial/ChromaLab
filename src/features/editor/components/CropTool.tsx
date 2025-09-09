import { useEffect, useRef, useState, useCallback, type FC } from 'react'
import { Rect, Transformer } from 'react-konva'
import type Konva from 'konva'
import { useEditorStore } from '@/shared/store/editorStore'

interface CropToolProps {
  imageWidth: number
  imageHeight: number
  onFinishCrop: () => void
  stageRef: React.RefObject<Konva.Stage>
}

interface CropBoxState {
  x: number
  y: number
  width: number
  height: number
}

interface CropOperation {
  x: number
  y: number
  width: number
  height: number
  scaleX: number
  scaleY: number
}

export const CropTool: FC<CropToolProps> = ({ imageWidth, imageHeight, onFinishCrop, stageRef }) => {
  const { pushAction, currentImage } = useEditorStore()
  const cropRef = useRef<Konva.Rect>(null)
  const transformerRef = useRef<Konva.Transformer>(null)
  
  // Initialize crop box with sensible defaults
  const [cropBox, setCropBox] = useState<CropBoxState>(() => {
    const padding = Math.min(50, Math.min(imageWidth, imageHeight) * 0.1)
    return {
      x: padding,
      y: padding,
      width: Math.max(50, imageWidth - padding * 2),
      height: Math.max(50, imageHeight - padding * 2),
    }
  })

  // Debounced transform handler to prevent too many updates
  const handleTransformEnd = useCallback(() => {
    const node = cropRef.current
    if (!node) return

    // Use requestAnimationFrame to batch updates
    requestAnimationFrame(() => {
      if (!node.getStage()) return // Check if still mounted

      // Get the final transformed values
      const scaleX = node.scaleX() || 1
      const scaleY = node.scaleY() || 1
      const x = Math.round(node.x())
      const y = Math.round(node.y())
      const width = Math.round(Math.abs(node.width() * scaleX))
      const height = Math.round(Math.abs(node.height() * scaleY))

      // Reset scale to prevent compound scaling
      node.scaleX(1)
      node.scaleY(1)

      // Batch state updates
      setCropBox((prev) => {
        // Only update if values have actually changed
        if (
          prev.x === x &&
          prev.y === y &&
          prev.width === width &&
          prev.height === height
        ) {
          return prev
        }
        return { x, y, width, height }
      })
    })
  }, [])

  // Attach the transformer to the crop rectangle
  useEffect(() => {
    if (!cropRef.current || !transformerRef.current) return

    // Use a reference to avoid closure issues
    const node = cropRef.current
    const transformer = transformerRef.current

    // Detach nodes first to prevent infinite updates
    transformer.detach()

    // Now attach the new node
    transformer.nodes([node])

    // Get the layer once to avoid repeated lookups
    const layer = node.getLayer()
    if (layer) {
      // Use requestAnimationFrame to batch updates
      requestAnimationFrame(() => {
        if (transformer.getStage()) {
          layer.batchDraw()
        }
      })
    }

    // Cleanup function to detach the transformer
    return () => {
      if (transformer.getStage()) {
        transformer.detach()
      }
    }
  }, []) // Keep empty deps since we're using refs

  const performCrop = useCallback(() => {
    if (!cropRef.current || !stageRef.current || !currentImage) return

    const stage = stageRef.current

    // Create a new canvas to perform the crop
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set up the canvas with the cropped dimensions
    canvas.width = cropBox.width
    canvas.height = cropBox.height

    // Create a temporary image
    const img = new Image()
    img.src = currentImage.dataUrl

    img.onload = () => {
      // Draw the cropped portion
      // Log values for debugging
      console.log('CropBox:', cropBox)
      console.log('Stage Scale X:', stage.scaleX())
      console.log('Stage Scale Y:', stage.scaleY())

      // Draw the cropped portion
      ctx.drawImage(
        img,
        cropBox.x, // sx (source x) - REMOVED DIVISION BY STAGE SCALE
        cropBox.y, // sy (source y) - REMOVED DIVISION BY STAGE SCALE
        cropBox.width, // sWidth (source width) - REMOVED DIVISION BY STAGE SCALE
        cropBox.height, // sHeight (source height) - REMOVED DIVISION BY STAGE SCALE
        0, // dx (destination x)
        0, // dy (destination y)
        cropBox.width, // dWidth (destination width)
        cropBox.height // dHeight (destination height)
      )

      // Get the cropped image data
      const croppedDataUrl = canvas.toDataURL(currentImage.type, 1.0)

      // Push the crop action
      pushAction({
        type: 'TRANSFORM_CROP',
        payload: {
          type: 'TRANSFORM_CROP',
          x: cropBox.x,
          y: cropBox.y,
          width: cropBox.width,
          height: cropBox.height,
          dataUrl: croppedDataUrl
        },
        timestamp: Date.now(),
        previousState: currentImage
      })

      // Clean up
      canvas.remove()
      onFinishCrop()
    }
  }, [currentImage, onFinishCrop, pushAction, stageRef, cropBox])

  // Listen for external crop trigger
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        if (e.key === 'Enter') {
          performCrop()
        }
        onFinishCrop()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onFinishCrop, performCrop])

  return (
    <>
      <Rect
        ref={cropRef}
        x={cropBox.x}
        y={cropBox.y}
        width={cropBox.width}
        height={cropBox.height}
        stroke="#00ff00"
        strokeWidth={2}
        draggable
        onTransformEnd={handleTransformEnd}
        onDragEnd={handleTransformEnd}
      />
      <Transformer
        ref={transformerRef}
        rotateEnabled={false}
        enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
        keepRatio={false}
        ignoreStroke={true}
        padding={0}
        anchorSize={8}
        borderStroke="#00ff00"
        anchorStroke="#00ff00"
        anchorFill="#ffffff"
        boundBoxFunc={(oldBox, newBox) => {
          const minSize = 50
          const maxWidth = imageWidth - cropBox.x
          const maxHeight = imageHeight - cropBox.y

          // Ensure we stay within bounds and maintain minimum size
          const validatedBox = {
            ...newBox,
            width: Math.max(minSize, Math.min(maxWidth, newBox.width)),
            height: Math.max(minSize, Math.min(maxHeight, newBox.height))
          }

          return oldBox.width === validatedBox.width && 
                 oldBox.height === validatedBox.height ? oldBox : validatedBox
        }}
      />
    </>
  )
}
