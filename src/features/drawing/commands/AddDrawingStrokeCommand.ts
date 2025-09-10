import type { Command } from '../../../shared/core/commands/Command';
import { useEditorStore } from '../../../shared/store/editorStore';
import type { DrawingStroke } from '../../../shared/types/drawing';

export class AddDrawingStrokeCommand implements Command {
  private stroke: DrawingStroke;

  constructor(stroke: DrawingStroke) {
    this.stroke = stroke;
  }

  execute(): void {
    useEditorStore.getState().addDrawingStroke(this.stroke);
  }

  undo(): void {
    useEditorStore.getState().removeDrawingStroke(this.stroke.id);
  }
}
