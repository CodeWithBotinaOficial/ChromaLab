import React, { useRef } from 'react';
import { Layer, Line } from 'react-konva';
import Konva from 'konva';
import { useDrawing } from './useDrawing';

interface DrawingCanvasProps {
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = () => {
  const { drawingStrokes, addStroke, brushColor, brushSize, brushOpacity } = useDrawing();
  const isDrawing = useRef(false);
  const currentLine = useRef<number[]>([]);

  const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;
    currentLine.current = [pos.x, pos.y];
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    currentLine.current = currentLine.current.concat([pos.x, pos.y]);
    // Force update to show drawing in real-time
    // This is a simplified approach; for performance, consider batching updates
    const layer = e.target.getLayer();
    if (layer) {
      layer.batchDraw();
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    if (currentLine.current.length > 0) {
      addStroke(currentLine.current);
      currentLine.current = []; // Reset for next stroke
    }
  };

  return (
    <Layer
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // End drawing if mouse leaves canvas
    >
      {drawingStrokes.map((stroke) => (
        <Line
          key={stroke.id}
          points={stroke.points}
          stroke={stroke.color}
          strokeWidth={stroke.brushSize}
          opacity={stroke.opacity}
          tension={0.5} // Smooth the lines
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation="source-over" // Ensure drawing is on top
        />
      ))}
      {isDrawing.current && currentLine.current.length > 0 && (
        <Line
          points={currentLine.current}
          stroke={brushColor}
          strokeWidth={brushSize}
          opacity={brushOpacity}
          tension={0.5}
          lineCap="round"
          lineJoin="round"
          globalCompositeOperation="source-over"
        />
      )}
    </Layer>
  );
};
