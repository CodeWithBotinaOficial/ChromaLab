
import React from 'react';
import { useDrawing } from '../useDrawing';
import { useEditorStore } from '../../../shared/store/editorStore';
import { Button } from '../../../shared/components/ui/Button';
import { Slider } from '../../../shared/components/Slider';
import { ToolPanel } from '../../../shared/components/ui/ToolPanel';

export const DrawingPanel: React.FC = () => {
  const { 
    brushColor, setBrushColor, 
    brushSize, setBrushSize, 
    brushOpacity, setBrushOpacity, 
    clearDrawing 
  } = useDrawing();
  
  const { isDrawing, toggleDrawing } = useEditorStore();

  return (
    <ToolPanel title="Drawing">
      <div className="space-y-4">
        <Button onClick={toggleDrawing} variant={isDrawing ? 'primary' : 'default'} className="w-full">
          {isDrawing ? 'Disable' : 'Enable'} Drawing Mode
        </Button>
        
        <div className="space-y-2">
          <label htmlFor="brush-color" className="text-sm font-medium text-gray-light">Brush Color</label>
          <input 
            id="brush-color"
            type="color" 
            value={brushColor} 
            onChange={(e) => setBrushColor(e.target.value)} 
            className="w-full h-10 p-1 bg-background-secondary border border-gray-600 rounded-md cursor-pointer"
          />
        </div>

        <Slider 
          label="Brush Size"
          value={[brushSize]}
          defaultValue={[5]}
          min={1}
          max={50}
          step={1}
          onChange={(value: number[]) => setBrushSize(value[0])}
        />

        <Slider 
          label="Brush Opacity"
          value={[brushOpacity]}
          defaultValue={[1]}
          min={0}
          max={1}
          step={0.1}
          onChange={(value: number[]) => setBrushOpacity(value[0])}
        />

        <Button onClick={clearDrawing} variant="ghost" className="w-full">
          Clear Drawing
        </Button>
      </div>
    </ToolPanel>
  );
};
