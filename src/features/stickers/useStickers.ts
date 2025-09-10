import { useEditorStore } from '../../shared/store/editorStore';
import type { Sticker } from '../../shared/types/sticker';
import { AddStickerCommand } from './commands/AddStickerCommand';
import { UpdateStickerCommand } from './commands/UpdateStickerCommand';
import { RemoveStickerCommand } from './commands/RemoveStickerCommand';
import { v4 as uuidv4 } from 'uuid';

export const useStickers = () => {
  const stickers = useEditorStore((state) => state.stickers);
  const executeCommand = useEditorStore((state) => state.executeCommand);

  const addSticker = (src: string, initialProps?: Partial<Sticker>) => {
    const newSticker: Sticker = {
      id: uuidv4(),
      x: 50,
      y: 50,
      src,
      width: 100,
      height: 100,
      rotation: 0,
      ...initialProps,
    };
    executeCommand(new AddStickerCommand(newSticker));
  };

  const updateSticker = (id: string, updates: Partial<Sticker>) => {
    executeCommand(new UpdateStickerCommand(id, updates));
  };

  const removeSticker = (id: string) => {
    const stickerToRemove = stickers.find((sticker) => sticker.id === id);
    if (stickerToRemove) {
      executeCommand(new RemoveStickerCommand(stickerToRemove));
    }
  };

  return {
    stickers,
    addSticker,
    updateSticker,
    removeSticker,
  };
};
