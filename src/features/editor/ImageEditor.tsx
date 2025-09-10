import { Stage, Layer, Image } from 'react-konva'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useEditorStore } from '../../shared/store/editorStore'

import Konva from 'konva'
import { applyImageFilters } from '../filters/filterUtils'
import { ImageUpload } from '../imageUpload/ImageUpload'
import { CropTool } from './components/CropTool'
import { EditableText } from '../textOverlay/EditableText'
import { DraggableSticker } from '../stickers/DraggableSticker'
import { DrawingCanvas } from '../drawing/DrawingCanvas'
import type { TextOverlay } from '../../shared/types/text'
import type { Sticker } from '../../shared/types/sticker'

export const ImageEditor = () => {
  const currentImage = useEditorStore((state) => state.currentImage);
  const activeFilter = useEditorStore((state) => state.activeFilter);
  const adjustments = useEditorStore((state) => state.adjustments);
  const isCropping = useEditorStore((state) => state.isCropping);
  const setIsCropping = useEditorStore((state) => state.setIsCropping);
  const transform = useEditorStore((state) => state.transform);
  const textOverlays = useEditorStore((state) => state.textOverlays);
  const stickers = useEditorStore((state) => state.stickers);

  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);

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

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    // deselect text and stickers on click on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedTextId(null);
      setSelectedStickerId(null);
    }
  };

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
    <div className="flex-1 flex items-center justify-center bg-background-primary relative">
      <Stage ref={stageRef} width={dimensions.width} height={dimensions.height} onClick={handleStageClick} onTap={handleStageClick}>
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
        <DrawingCanvas />
        <Layer>
          {textOverlays.map((textOverlay: TextOverlay) => (
            <EditableText
              key={textOverlay.id}
              textOverlay={textOverlay}
              isSelected={textOverlay.id === selectedTextId}
              onSelect={() => {
                setSelectedTextId(textOverlay.id);
                setSelectedStickerId(null); // Deselect sticker if text is selected
              }}
              onDeselect={() => setSelectedTextId(null)}
            />
          ))}
        </Layer>
        <Layer>
          {stickers.map((sticker: Sticker) => (
            <DraggableSticker
              key={sticker.id}
              sticker={sticker}
              isSelected={sticker.id === selectedStickerId}
              onSelect={() => {
                setSelectedStickerId(sticker.id);
                setSelectedTextId(null); // Deselect text if sticker is selected
              }}
              onDeselect={() => setSelectedStickerId(null)}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
}