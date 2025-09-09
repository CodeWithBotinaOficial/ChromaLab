import { RotateCw, RotateCcw, FlipHorizontal2, FlipVertical2, Crop } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useEditorStore } from '../../store/editorStore'

export const TransformPanel = () => {
  const { pushAction, currentImage, isCropping, setIsCropping } = useEditorStore()

  const handleCropClick = useCallback(() => {
    setIsCropping(!isCropping)
  }, [isCropping, setIsCropping])

  const [isTransforming, setIsTransforming] = useState(false)

  const handleRotate = useCallback((direction: 'cw' | 'ccw') => {
    if (!currentImage || isTransforming) return

    setIsTransforming(true)
    requestAnimationFrame(() => {
      pushAction({
        type: 'TRANSFORM_ROTATE',
        payload: { type: 'TRANSFORM_ROTATE', direction },
        timestamp: Date.now(),
        previousState: { ...currentImage }
      })
      // Add a small delay to prevent rapid clicking
      setTimeout(() => setIsTransforming(false), 150)
    })
  }, [currentImage, isTransforming, pushAction])

  const handleFlip = useCallback((direction: 'horizontal' | 'vertical') => {
    if (!currentImage || isTransforming) return

    setIsTransforming(true)
    requestAnimationFrame(() => {
      pushAction({
        type: 'TRANSFORM_FLIP',
        payload: { type: 'TRANSFORM_FLIP', direction },
        timestamp: Date.now(),
        previousState: { ...currentImage }
      })
      // Add a small delay to prevent rapid clicking
      setTimeout(() => setIsTransforming(false), 150)
    })
  }, [currentImage, isTransforming, pushAction])

  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-semibold text-gray-light">Transform</h3>
      
      <div className="space-y-4">
        {/* Basic Transform Controls */}
        <div className="grid grid-cols-2 gap-2">
          <button
            className="flex items-center justify-center p-3 rounded-md bg-background-secondary text-gray-light hover:bg-accent-blue/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleRotate('ccw')}
            title="Rotate Counter-Clockwise"
            disabled={isTransforming || !currentImage}
          >
            <RotateCcw className={`w-5 h-5 ${isTransforming ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            className="flex items-center justify-center p-3 rounded-md bg-background-secondary text-gray-light hover:bg-accent-blue/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleRotate('cw')}
            title="Rotate Clockwise"
            disabled={isTransforming || !currentImage}
          >
            <RotateCw className={`w-5 h-5 ${isTransforming ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            className="flex items-center justify-center p-3 rounded-md bg-background-secondary text-gray-light hover:bg-accent-blue/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleFlip('horizontal')}
            title="Flip Horizontal"
            disabled={isTransforming || !currentImage}
          >
            <FlipHorizontal2 className={`w-5 h-5 ${isTransforming ? 'animate-pulse' : ''}`} />
          </button>
          
          <button
            className="flex items-center justify-center p-3 rounded-md bg-background-secondary text-gray-light hover:bg-accent-blue/20 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleFlip('vertical')}
            title="Flip Vertical"
            disabled={isTransforming || !currentImage}
          >
            <FlipVertical2 className={`w-5 h-5 ${isTransforming ? 'animate-pulse' : ''}`} />
          </button>
        </div>

        {/* Crop Control */}
        <button
          className={`
            w-full flex items-center justify-center gap-2 p-3 rounded-md
            transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            ${isCropping 
              ? 'bg-accent-blue text-white hover:bg-accent-blue/90' 
              : 'bg-background-secondary text-gray-light hover:bg-accent-blue/20'
            }
          `}
          onClick={handleCropClick}
          disabled={!currentImage}
        >
          <Crop className="w-5 h-5" />
          <span>{isCropping ? 'Apply Crop' : 'Crop Image'}</span>
        </button>
      </div>
    </div>
  )
}
