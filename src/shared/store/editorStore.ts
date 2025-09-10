import { create } from 'zustand'
import type { ImageState } from '../types/image'
import type { PresetFilter } from '../../features/filters/filterUtils'
import { HistoryManager } from '../core/commands/HistoryManager'
import type { Command } from '../core/commands/Command'
import type { TransformState } from '../types/transform'
import type { TextOverlay } from '../types/text'
import type { Sticker } from '../types/sticker'
import type { DrawingStroke } from '../types/drawing'
import type { Template } from '../types/template'

export interface EditorStore {
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

  // Text Overlays
  textOverlays: TextOverlay[]
  addTextOverlay: (textOverlay: TextOverlay) => void
  updateTextOverlay: (id: string, updates: Partial<TextOverlay>) => void
  removeTextOverlay: (id: string) => void

  // Stickers
  stickers: Sticker[]
  addSticker: (sticker: Sticker) => void
  updateSticker: (id: string, updates: Partial<Sticker>) => void
  removeSticker: (id: string) => void

  // Drawing
  drawingStrokes: DrawingStroke[]
  addDrawingStroke: (stroke: DrawingStroke) => void
  removeDrawingStroke: (id: string) => void
  clearDrawingStrokes: () => void

  // Templates
  activeTemplate: Template | null;
  applyTemplate: (template: Template) => void;
  updateTemplateText: (templateId: string, placeholderId: string, newText: string) => void;

  // Crop state
  isCropping: boolean;
  setIsCropping: (cropping: boolean) => void;

  // Editor settings
  activeFilter: PresetFilter | null;
  setActiveFilter: (filter: PresetFilter) => void;
  adjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
    hue: number;
    noise: number;
    pixelate: number;
    whitePoint: number;
    blackPoint: number;
  };
  updateAdjustment: (key: string, value: number) => void;
  replaceState: (newState: Partial<EditorStore>) => void;
}

const historyManager = new HistoryManager();

export const useEditorStore = create<EditorStore>((set) => ({
  // Image state
  currentImage: null,
  setCurrentImage: (image: ImageState) => set({ currentImage: image }),

  // History management
  executeCommand: (command: Command) => {
    historyManager.execute(command);
  },
  undo: () => {
    historyManager.undo();
  },
  redo: () => {
    historyManager.redo();
  },
  canUndo: () => historyManager.canUndo(),
  canRedo: () => historyManager.canRedo(),

  // Transform state
  transform: { rotation: 0, scaleX: 1, scaleY: 1 },
  updateTransform: (transform: Partial<TransformState>) =>
    set((state) => ({ transform: { ...state.transform, ...transform } })),

  // Text Overlays
  textOverlays: [],
  addTextOverlay: (textOverlay: TextOverlay) =>
    set((state) => ({ textOverlays: [...state.textOverlays, textOverlay] })),
  updateTextOverlay: (id: string, updates: Partial<TextOverlay>) =>
    set((state) => ({
      textOverlays: state.textOverlays.map((overlay) =>
        overlay.id === id ? { ...overlay, ...updates } : overlay
      ),
    })),
  removeTextOverlay: (id: string) =>
    set((state) => ({
      textOverlays: state.textOverlays.filter((overlay) => overlay.id !== id),
    })),

  // Stickers
  stickers: [],
  addSticker: (sticker: Sticker) =>
    set((state) => ({ stickers: [...state.stickers, sticker] })),
  updateSticker: (id: string, updates: Partial<Sticker>) =>
    set((state) => ({
      stickers: state.stickers.map((sticker) =>
        sticker.id === id ? { ...sticker, ...updates } : sticker
      ),
    })),
  removeSticker: (id: string) =>
    set((state) => ({
      stickers: state.stickers.filter((sticker) => sticker.id !== id),
    })),

  // Drawing
  drawingStrokes: [],
  addDrawingStroke: (stroke: DrawingStroke) =>
    set((state) => ({ drawingStrokes: [...state.drawingStrokes, stroke] })),
  removeDrawingStroke: (id: string) =>
    set((state) => ({
      drawingStrokes: state.drawingStrokes.filter((stroke) => stroke.id !== id),
    })),
  clearDrawingStrokes: () => set({ drawingStrokes: [] }),

  // Templates
  activeTemplate: null,
  applyTemplate: (template: Template) =>
    set((_state: EditorStore) => ({
      activeTemplate: template,
      // When applying a template, clear existing text overlays and add template placeholders as new text overlays
      textOverlays: template.textPlaceholders.map(placeholder => ({
        id: placeholder.id,
        x: placeholder.x,
        y: placeholder.y,
        text: placeholder.currentText || placeholder.defaultText,
        fontSize: placeholder.fontSize,
        fontFamily: placeholder.fontFamily,
        color: placeholder.color,
        fontWeight: placeholder.fontWeight,
        fontStyle: placeholder.fontStyle,
        textDecoration: placeholder.textDecoration,
        rotation: placeholder.rotation,
        width: placeholder.width,
        height: placeholder.height,
      })),
    })),
  updateTemplateText: (templateId: string, placeholderId: string, newText: string) =>
    set((state: EditorStore) => {
      if (!state.activeTemplate || state.activeTemplate.id !== templateId) return state;

      const updatedPlaceholders = state.activeTemplate.textPlaceholders.map(placeholder =>
        placeholder.id === placeholderId ? { ...placeholder, currentText: newText } : placeholder
      );

      // Also update the corresponding text overlay
      const updatedTextOverlays = state.textOverlays.map(overlay =>
        overlay.id === placeholderId ? { ...overlay, text: newText } : overlay
      );

      return {
        activeTemplate: { ...state.activeTemplate, textPlaceholders: updatedPlaceholders },
        textOverlays: updatedTextOverlays,
      };
    }),

  // Crop state
  isCropping: false,
  setIsCropping: (cropping: boolean) => set({ isCropping: cropping }),

  // Editor settings
  activeFilter: null,
  setActiveFilter: (filter: PresetFilter) => set({ activeFilter: filter }),
  adjustments: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    hue: 0,
    noise: 0,
    pixelate: 1,
    whitePoint: 100,
    blackPoint: 0,
  },
  updateAdjustment: (key: string, value: number) =>
    set((_state: EditorStore) => ({
      adjustments: {
        ..._state.adjustments,
        [key]: value,
      },
    })),
  replaceState: (newState: Partial<EditorStore>) => set((_state: EditorStore) => ({ ..._state, ...newState })),
}));