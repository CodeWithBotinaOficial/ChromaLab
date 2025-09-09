import { create } from 'zustand'
import type { ImageState } from '../types/image'
import type { EditorAction } from '../types/history'
import type { PresetFilter } from '../../features/filters/filterUtils'

interface EditorStore {
  // Image state
  currentImage: ImageState | null
  setCurrentImage: (image: ImageState) => void
  
  // History management
  history: EditorAction[]
  currentIndex: number
  pushAction: (action: EditorAction) => void
  undo: () => void
  redo: () => void
  
  // Transform state
  transform: {
    rotation: number
    scaleX: number
    scaleY: number
  }
  updateTransform: (transform: Partial<EditorStore['transform']>) => void
  
  // Crop state
  isCropping: boolean
  setIsCropping: (cropping: boolean) => void
  
  // Editor settings
  activeFilter: PresetFilter
  setActiveFilter: (filter: PresetFilter) => void
  adjustments: {
    brightness: number    // 0-200 (100 is normal)
    contrast: number     // 0-200 (100 is normal)
    saturation: number   // 0-200 (100 is normal)
    blur: number         // 0-20
    hue: number          // -180 to 180
    noise: number        // 0-100
    pixelate: number     // 1-40
    whitePoint: number   // 0-100
    blackPoint: number   // 0-100
  }
  updateAdjustment: (key: string, value: number) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  // Image state
  currentImage: null,
  setCurrentImage: (image) => set({ currentImage: image }),
  
  // History management
  history: [],
  currentIndex: -1,
  pushAction: (action) =>
    set((state) => {
      const newHistory = [...state.history.slice(0, state.currentIndex + 1), action]
      
      // Update the current image based on the action
      let newImage = state.currentImage
      if (state.currentImage) {
        if (action.type === 'TRANSFORM_CROP' && action.payload.type === 'TRANSFORM_CROP') {
          // For crop actions, update the image with the new dimensions and data URL
          const { width, height, dataUrl } = action.payload
          newImage = {
            ...state.currentImage,
            width,
            height,
            dataUrl
          }
        }
      }
      
      return {
        history: newHistory,
        currentIndex: newHistory.length - 1,
        currentImage: newImage
      }
    }),
  undo: () =>
    set((state) => ({
      currentIndex: Math.max(-1, state.currentIndex - 1),
    })),
  redo: () =>
    set((state) => ({
      currentIndex: Math.min(state.history.length - 1, state.currentIndex + 1),
    })),
  
    // Transform state
  transform: {
    rotation: 0,
    scaleX: 1,
    scaleY: 1
  },
  updateTransform: (newTransform) =>
    set((state) => ({
      transform: { ...state.transform, ...newTransform }
    })),

  // Crop state
  isCropping: false,
  setIsCropping: (cropping) => set({ isCropping: cropping }),

  // Editor settings
  activeFilter: null,
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  adjustments: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    hue: 0,
    noise: 0,
    pixelate: 1,
    whitePoint: 100,
    blackPoint: 0
  },
  updateAdjustment: (key, value) =>
    set((state) => ({
      adjustments: {
        ...state.adjustments,
        [key]: value
      }
    }))
}))
