import type { Command } from '../../../shared/core/commands/Command';
import { useEditorStore } from '../../../shared/store/editorStore';
import type { DrawingStroke } from '../../../shared/types/drawing';

export class ClearDrawingCommand implements Command {
  private previousStrokes: DrawingStroke[] = [];

  execute(): void {
    const editorStore = useEditorStore.getState();
    this.previousStrokes = [...editorStore.drawingStrokes]; // Store current strokes for undo
    editorStore.clearDrawingStrokes();
  }

  undo(): void {
    const editorStore = useEditorStore.getState();
    // Re-add all previously cleared strokes
    this.previousStrokes.forEach(stroke => editorStore.addDrawingStroke(stroke));
  }
}
