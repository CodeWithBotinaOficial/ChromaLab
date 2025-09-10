import { Stage, Layer, Image } from 'react-konva'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useEditorStore } from '../../shared/store/editorStore'
import Konva from 'konva'
import { applyImageFilters } from '../filters/filterUtils'
import { ImageUpload } from '../imageUpload/ImageUpload'
import { CropTool } from './components/CropTool'

export const ImageEditor = () => {
  const { 
    currentImage, 
    activeFilter, 
    adjustments, 
    isCropping, 
    setIsCropping, 
    transform
  } = useEditorStore()

  // Refs for stable values that shouldn't trigger re-renders
  const imageRef = useRef<Konva.Image>(null)
  const stageRef = useRef<Konva.Stage>(null!) // non-null assertion since we know Stage will be available when CropTool mounts
  const [imageElement, setImageElement] = useState<HTMLImageElement | undefined>(undefined)

  // State for UI updates only
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  // Handle image loading and dimension calculation
  const setupImage = useCallback((imageUrl: string) => {
    setIsLoaded(false)
    
    const img = new window.Image()
    
    img.onload = () => {
      const maxWidth = window.innerWidth * 0.8
      const maxHeight = window.innerHeight * 0.8
      const scale = Math.min(
        maxWidth / img.width,
        maxHeight / img.height
      )
      
      const newDimensions = {
        width: Math.round(img.width * scale),
        height: Math.round(img.height * scale)
      }
      
      setDimensions(newDimensions)
      setImageElement(img)
      setIsLoaded(true)
    }

    img.src = imageUrl
  }, [])

  // Load image when currentImage changes
  useEffect(() => {
    if (!currentImage) {
      setIsLoaded(false)
      return
    }

    setupImage(currentImage.dataUrl)

    return () => {
      // No cleanup needed for imageElement state
    }
  }, [currentImage, setupImage])

  

  // Apply filters when needed
  useEffect(() => {
    if (!imageRef.current || !isLoaded || dimensions.width === 0) return

    const node = imageRef.current
    requestAnimationFrame(() => {
      if (node === imageRef.current) { // Check if still valid
        applyImageFilters(node, {
          filter: activeFilter,
          adjustments
        })
      }
    })
  }, [activeFilter, adjustments, dimensions.width, isLoaded])

  if (!currentImage) {
    return (
      <div className="flex items-center justify-center h-full bg-background-primary text-gray-light">
        <ImageUpload />
      </div>
    )
  }

  if (!isLoaded || dimensions.width === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background-primary">
        <div className="w-8 h-8 border-4 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-background-primary">
      <Stage ref={stageRef} width={dimensions.width} height={dimensions.height}>
        <Layer>
          <Image
            ref={imageRef}
            image={imageElement}
            width={dimensions.width}
            height={dimensions.height}
            draggable={false}
            rotation={transform.rotation}
            scaleX={transform.scaleX}
            scaleY={transform.scaleY}
            x={dimensions.width / 2}
            y={dimensions.height / 2}
            offsetX={dimensions.width / 2}
            offsetY={dimensions.height / 2}
          />
          {isCropping && (
            <CropTool
              key={`crop-${dimensions.width}-${dimensions.height}`}
              imageWidth={dimensions.width}
              imageHeight={dimensions.height}
              onFinishCrop={() => setIsCropping(false)}
              stageRef={stageRef}
            />
          )}
        </Layer>
      </Stage>
    </div>
  )
}
