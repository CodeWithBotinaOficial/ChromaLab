import type { Command } from '../../../shared/core/commands/Command';
import { useEditorStore } from '../../../shared/store/editorStore';
import type { TextOverlay } from '../../../shared/types/text';

export class UpdateTextCommand implements Command {
  private id: string;
  private newUpdates: Partial<TextOverlay>;
  private previousState: TextOverlay | undefined;

  constructor(id: string, newUpdates: Partial<TextOverlay>) {
    this.id = id;
    this.newUpdates = newUpdates;
  }

  execute(): void {
    const editorStore = useEditorStore.getState(); // Fix 1
    // Store the current state of the text overlay before applying updates
    this.previousState = editorStore.textOverlays.find((overlay: TextOverlay) => overlay.id === this.id); // Fix 2
    if (this.previousState) {
      editorStore.updateTextOverlay(this.id, this.newUpdates);
    }
  }

  undo(): void {
    const editorStore = useEditorStore.getState(); // Fix 1
    if (this.previousState) {
      // Revert to the previous state
      editorStore.updateTextOverlay(this.id, this.previousState);
    }
  }
}
