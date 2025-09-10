import { useCallback, useState } from 'react'
import { useEditorStore } from '../../shared/store/editorStore'
import type { ImageState } from '../../shared/types/image'
import { Upload, X } from 'lucide-react'
import type { EditorStore } from '../../shared/store/editorStore'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

interface UploadError {
  message: string
  type: 'size' | 'format' | 'generic'
}

export const ImageUpload = () => {
  const setCurrentImage = useEditorStore((state: EditorStore) => state.setCurrentImage);
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<UploadError | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const validateFile = (file: File): UploadError | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return {
        message: 'Invalid file format. Please upload a JPEG, PNG, WebP, or GIF image.',
        type: 'format'
      }
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        message: 'File too large. Maximum size is 10MB.',
        type: 'size'
      }
    }

    return null
  }

  const processFile = useCallback((file: File) => {
    setError(null)
    setIsLoading(true)

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setIsLoading(false)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const imageState: ImageState = {
          dataUrl: e.target?.result as string,
          width: img.width,
          height: img.height,
          name: file.name,
          type: file.type,
        }
        setCurrentImage(imageState)
        setIsLoading(false)
      }
      img.onerror = () => {
        setError({
          message: 'Failed to load image. The file might be corrupted.',
          type: 'generic'
        })
        setIsLoading(false)
      }
      img.src = e.target?.result as string
    }
    reader.onerror = () => {
      setError({
        message: 'Failed to read file. Please try again.',
        type: 'generic'
      })
      setIsLoading(false)
    }
    reader.readAsDataURL(file)
  }, [setCurrentImage])

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    processFile(file)
  }, [processFile])

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
    
    const file = event.dataTransfer.files[0]
    if (!file) return
    processFile(file)
  }, [processFile])

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }, [])

  const handleDragEnter = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }, [])

  return (
    <div
      className={`
        flex flex-col items-center justify-center w-full h-full
        relative rounded-lg border-2 border-dashed
        ${isDragging ? 'border-accent-blue bg-accent-blue/10' : 'border-gray-600'}
        transition-colors duration-200
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className={`
          flex flex-col items-center justify-center w-full h-full
          cursor-pointer p-8 text-center
          ${isDragging ? 'pointer-events-none' : ''}
        `}
      >
        <Upload 
          className={`w-12 h-12 mb-4 ${isDragging ? 'text-accent-blue' : 'text-gray-400'}`}
        />
        <div className="space-y-2">
          <p className="text-xl font-medium">
            {isDragging ? 'Drop your image here' : 'Drag & drop your image here'}
          </p>
          <p className="text-sm text-gray-400">
            or click to browse
          </p>
          <p className="text-xs text-gray-500">
            Supports JPEG, PNG, WebP, and GIF up to 10MB
          </p>
        </div>
      </label>

      {/* Error Message */}
      {error && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2">
            <div className="flex-shrink-0">
              <X className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-sm text-red-500">{error.message}</p>
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-background-primary/50 flex items-center justify-center backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
