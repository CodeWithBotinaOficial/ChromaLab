import type { Command } from '../../../shared/core/commands/Command';
import { useEditorStore } from '../../../shared/store/editorStore';
import type { TextOverlay } from '../../../shared/types/text';

export class RemoveTextCommand implements Command {
  private textOverlay: TextOverlay;

  constructor(textOverlay: TextOverlay) {
    this.textOverlay = textOverlay;
  }

  execute(): void {
    useEditorStore.getState().removeTextOverlay(this.textOverlay.id);
  }

  undo(): void {
    useEditorStore.getState().addTextOverlay(this.textOverlay);
  }
}
