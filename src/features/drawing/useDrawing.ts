import { useState } from 'react';
import { useEditorStore } from '../../shared/store/editorStore';
import type { DrawingStroke } from '../../shared/types/drawing';
import { AddDrawingStrokeCommand } from './commands/AddDrawingStrokeCommand';
import { ClearDrawingCommand } from './commands/ClearDrawingCommand';
import { v4 as uuidv4 } from 'uuid';

export const useDrawing = () => {
  const drawingStrokes = useEditorStore((state) => state.drawingStrokes);
  const executeCommand = useEditorStore((state) => state.executeCommand);

  const [brushColor, setBrushColor] = useState('#FF0000');
  const [brushSize, setBrushSize] = useState(5);
  const [brushOpacity, setBrushOpacity] = useState(1);

  const addStroke = (points: number[]) => {
    const newStroke: DrawingStroke = {
      id: uuidv4(),
      points,
      color: brushColor,
      brushSize,
      opacity: brushOpacity,
    };
    executeCommand(new AddDrawingStrokeCommand(newStroke));
  };

  const clearDrawing = () => {
    executeCommand(new ClearDrawingCommand());
  };

  return {
    drawingStrokes,
    brushColor,
    setBrushColor,
    brushSize,
    setBrushSize,
    brushOpacity,
    setBrushOpacity,
    addStroke,
    clearDrawing,
  };
};
