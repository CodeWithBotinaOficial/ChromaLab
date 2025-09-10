import type { Command } from '../../../shared/core/commands/Command';
import { useEditorStore } from '../../../shared/store/editorStore';
import type { Sticker } from '../../../shared/types/sticker';

export class AddStickerCommand implements Command {
  private sticker: Sticker;

  constructor(sticker: Sticker) {
    this.sticker = sticker;
  }

  execute(): void {
    useEditorStore.getState().addSticker(this.sticker);
  }

  undo(): void {
    useEditorStore.getState().removeSticker(this.sticker.id);
  }
}
