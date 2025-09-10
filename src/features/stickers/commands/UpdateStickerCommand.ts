import type { Command } from '../../../shared/core/commands/Command';
import { useEditorStore } from '../../../shared/store/editorStore';
import type { Sticker } from '../../../shared/types/sticker';

export class UpdateStickerCommand implements Command {
  private id: string;
  private newUpdates: Partial<Sticker>;
  private previousState: Sticker | undefined;

  constructor(id: string, newUpdates: Partial<Sticker>) {
    this.id = id;
    this.newUpdates = newUpdates;
  }

  execute(): void {
    const editorStore = useEditorStore.getState();
    this.previousState = editorStore.stickers.find((sticker: Sticker) => sticker.id === this.id);
    if (this.previousState) {
      editorStore.updateSticker(this.id, this.newUpdates);
    }
  }

  undo(): void {
    const editorStore = useEditorStore.getState();
    if (this.previousState) {
      editorStore.updateSticker(this.id, this.previousState);
    }
  }
}
