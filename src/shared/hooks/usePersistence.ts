import { useEffect } from 'react';
import { useEditorStore } from '../store/editorStore';
import type { EditorStore } from '../store/editorStore';

const LOCAL_STORAGE_KEY = 'chromalab-editor-state';

export const usePersistence = () => {
  // Load state from localStorage on initial mount
  useEffect(() => {
    try {
      const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedState) {
        const parsedState: Partial<EditorStore> = JSON.parse(storedState);
        // Rehydrate the store, but only for the parts we want to persist
        // We need to be careful not to overwrite functions or non-serializable parts
        useEditorStore.setState({
          currentImage: parsedState.currentImage || null,
          textOverlays: parsedState.textOverlays || [],
          stickers: parsedState.stickers || [],
          drawingStrokes: parsedState.drawingStrokes || [],
          transform: parsedState.transform || { rotation: 0, scaleX: 1, scaleY: 1 },
          isCropping: parsedState.isCropping || false,
          activeFilter: parsedState.activeFilter || null,
          adjustments: parsedState.adjustments || {
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
          activeTemplate: parsedState.activeTemplate || null,
        });
      }
    } catch (error) {
      console.error("Failed to load state from localStorage:", error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  const stateToPersist = useEditorStore((state) => ({
    currentImage: state.currentImage,
    textOverlays: state.textOverlays,
    stickers: state.stickers,
    drawingStrokes: state.drawingStrokes,
    transform: state.transform,
    isCropping: state.isCropping,
    activeFilter: state.activeFilter,
    adjustments: state.adjustments,
    activeTemplate: state.activeTemplate,
  }));

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToPersist));
  }, [stateToPersist]);
};