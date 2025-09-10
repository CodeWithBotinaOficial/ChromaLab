import React from 'react';
import { useDrawing } from './useDrawing';
import { Button } from '../../shared/components/ui/Button';
import { Slider } from '../../shared/components/Slider';

export const DrawingTool: React.FC = () => {
  const { brushColor, setBrushColor, brushSize, setBrushSize, brushOpacity, setBrushOpacity, clearDrawing } = useDrawing();

  return (
    <div className="p-4 border-t border-gray-700">
      <h3 className="text-lg font-semibold mb-2">Drawing Tool</h3>
      <div className="mb-4">
        <label htmlFor="brushColor" className="block text-sm font-medium text-gray-400">Brush Color</label>
        <input
          type="color"
          id="brushColor"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
          className="w-full h-10 mt-1 rounded-md border-gray-600 focus:ring-accent-blue focus:border-accent-blue"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="brushSize" className="block text-sm font-medium text-gray-400">Brush Size</label>
        <Slider
          label="Brush Size"
          min={1}
          max={20}
          step={1}
          value={[brushSize]}
          defaultValue={[5]}
          onChange={(value) => setBrushSize(value[0])}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="brushOpacity" className="block text-sm font-medium text-gray-400">Opacity</label>
        <Slider
          label="Opacity"
          min={0.1}
          max={1}
          step={0.05}
          value={[brushOpacity]}
          defaultValue={[1]}
          onChange={(value) => setBrushOpacity(value[0])}
        />
      </div>
      <Button onClick={clearDrawing} className="w-full bg-red-600 hover:bg-red-700">
        Clear Drawing
      </Button>
    </div>
  );
};
