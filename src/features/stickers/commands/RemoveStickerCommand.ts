import type { Command } from '../../../shared/core/commands/Command';
import { useEditorStore } from '../../../shared/store/editorStore';
import type { Sticker } from '../../../shared/types/sticker';

export class RemoveStickerCommand implements Command {
  private sticker: Sticker;

  constructor(sticker: Sticker) {
    this.sticker = sticker;
  }

  execute(): void {
    useEditorStore.getState().removeSticker(this.sticker.id);
  }

  undo(): void {
    useEditorStore.getState().addSticker(this.sticker);
  }
}
