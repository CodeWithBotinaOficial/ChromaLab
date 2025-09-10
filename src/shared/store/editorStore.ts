import { create } from 'zustand'
import type { ImageState } from '../types/image'
import type { PresetFilter } from '../../features/filters/filterUtils'
import { HistoryManager } from '../core/commands/HistoryManager'
import type { Command } from '../core/commands/Command'
import type { TransformState } from '../types/transform'

interface EditorStore {
  // Image state
  currentImage: ImageState | null
  setCurrentImage: (image: ImageState) => void
  
  // History management
  executeCommand: (command: Command) => void
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
  
  // Transform state
  transform: TransformState
  updateTransform: (transform: Partial<TransformState>) => void
  
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

export type UpdateTransformFn = (transform: Partial<EditorStore['transform']>) => void;

const historyManager = new HistoryManager();

export const useEditorStore = create<EditorStore>((set) => ({
  // Image state
  currentImage: null,
  setCurrentImage: (image) => set({ currentImage: image }),
  
  // History management
  executeCommand: (command) => {
    historyManager.execute(command);
    // Force a re-render to update canUndo/canRedo state in components
    set({});
  },
  undo: () => {
    historyManager.undo();
    // Force a re-render
    set({});
  },
  redo: () => {
    historyManager.redo();
    // Force a re-render
    set({});
  },
  canUndo: () => historyManager.canUndo(),
  canRedo: () => historyManager.canRedo(),
  
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