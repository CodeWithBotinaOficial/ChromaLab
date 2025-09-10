import { useEditorStore } from '../../shared/store/editorStore';
import type { TextOverlay } from '../../shared/types/text';
import { AddTextCommand } from './commands/AddTextCommand';
import { UpdateTextCommand } from './commands/UpdateTextCommand';
import { RemoveTextCommand } from './commands/RemoveTextCommand';
import { v4 as uuidv4 } from 'uuid';

export const useTextOverlay = () => {
  const textOverlays = useEditorStore((state) => state.textOverlays);
  const executeCommand = useEditorStore((state) => state.executeCommand);

  const addText = (initialText: Partial<TextOverlay>) => {
    const newText: TextOverlay = {
      id: uuidv4(),
      x: 50,
      y: 50,
      text: 'New Text',
      fontSize: 24,
      fontFamily: 'Arial',
      color: '#000000',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
      rotation: 0,
      width: 100,
      height: 30,
      ...initialText,
    };
    executeCommand(new AddTextCommand(newText));
  };

  const updateText = (id: string, updates: Partial<TextOverlay>) => {
    executeCommand(new UpdateTextCommand(id, updates));
  };

  const removeText = (id: string) => {
    const textToRemove = textOverlays.find((text) => text.id === id);
    if (textToRemove) {
      executeCommand(new RemoveTextCommand(textToRemove));
    }
  };

  return {
    textOverlays,
    addText,
    updateText,
    removeText,
  };
};
