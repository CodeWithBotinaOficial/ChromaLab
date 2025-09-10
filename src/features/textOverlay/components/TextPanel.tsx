
import React, { useState, useEffect, useMemo } from 'react';
import { useTextOverlay } from '../useTextOverlay';
import { useEditorStore } from '../../../shared/store/editorStore';
import { ToolPanel } from '../../../shared/components/ui/ToolPanel';
import { Button } from '../../../shared/components/ui/Button';
import { Slider } from '../../../shared/components/Slider';
import { Select } from '../../../shared/components/ui/Select';
import { ToggleGroup, ToggleButton } from '../../../shared/components/ui/ToggleGroup';
import type { TextOverlay } from '../../../shared/types/text';

const FONT_FACES = ['Arial', 'Roboto', 'Serif', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'];

export const TextPanel: React.FC = () => {
  const { addText, updateText, removeText } = useTextOverlay();
  const { textOverlays, selectedTextId, setSelectedTextId } = useEditorStore();

  const selectedText = useMemo(() => textOverlays.find((t: TextOverlay) => t.id === selectedTextId), [textOverlays, selectedTextId]);

  const [text, setText] = useState('');
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    if (selectedText) {
      setText(selectedText.text);
      setColor(selectedText.color);
    } else {
      setText('');
      setColor('#000000');
    }
  }, [selectedText]);

  const handleAddText = () => {
    addText({ text: 'New Text', color: '#000000' });
  };

  const handleUpdate = (updates: Partial<TextOverlay>) => {
    if (selectedTextId) {
      updateText(selectedTextId, updates);
    }
  };

  return (
    <ToolPanel title="Text">
      <div className="space-y-4">
        <Button onClick={handleAddText} className="w-full">Add Text</Button>
        
        <div className="space-y-2">
            <h4 className="mb-2 font-semibold text-gray-light">Active Text Layers</h4>
            {textOverlays.map((t: TextOverlay) => (
                <div key={t.id} onClick={() => setSelectedTextId(t.id)} className={`p-2 rounded-md cursor-pointer ${selectedTextId === t.id ? 'bg-accent-blue/30' : 'bg-background-secondary'}`}>
                    <p className="truncate">{t.text}</p>
                </div>
            ))}
        </div>

        {selectedText && (
          <div className="space-y-4 pt-4 border-t border-background-primary">
            <input
              type="text"
              value={text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
              onBlur={() => handleUpdate({ text })}
              className="w-full h-10 px-3 text-sm bg-background-secondary border border-gray-600 rounded-md"
            />
            <Select label="Font" value={selectedText.fontFamily} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleUpdate({ fontFamily: e.target.value})}>
                {FONT_FACES.map(font => <option key={font} value={font}>{font}</option>)}
            </Select>
            <div className="flex items-center space-x-2">
                <label htmlFor="text-color" className="text-sm font-medium text-gray-light">Color</label>
                <input id="text-color" type="color" value={color} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)} onBlur={() => handleUpdate({ color })} className="w-full h-10 p-1 bg-background-secondary border border-gray-600 rounded-md cursor-pointer"/>
            </div>
            <Slider label="Font Size" value={[selectedText.fontSize]} defaultValue={[selectedText.fontSize]} min={8} max={128} step={1} onChange={([val]: number[]) => handleUpdate({ fontSize: val})} />
            <Slider label="Rotation" value={[selectedText.rotation]} defaultValue={[selectedText.rotation]} min={0} max={360} step={1} onChange={([val]: number[]) => handleUpdate({ rotation: val})} />
            <ToggleGroup label="Style">
                <ToggleButton value="bold" isActive={selectedText.fontWeight === 'bold'} onClick={() => handleUpdate({ fontWeight: selectedText.fontWeight === 'bold' ? 'normal' : 'bold'})}>B</ToggleButton>
                <ToggleButton value="italic" isActive={selectedText.fontStyle === 'italic'} onClick={() => handleUpdate({ fontStyle: selectedText.fontStyle === 'italic' ? 'normal' : 'italic'})}>I</ToggleButton>
                <ToggleButton value="underline" isActive={selectedText.textDecoration === 'underline'} onClick={() => handleUpdate({ textDecoration: selectedText.textDecoration === 'underline' ? 'none' : 'underline'})}>U</ToggleButton>
            </ToggleGroup>
            <Button onClick={() => removeText(selectedTextId!)} variant="ghost" className="w-full">Remove Text</Button>
          </div>
        )}
      </div>
    </ToolPanel>
  );
};
