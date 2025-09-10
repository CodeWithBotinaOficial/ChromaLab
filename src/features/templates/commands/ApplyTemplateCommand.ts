import type { Command } from '../../../shared/core/commands/Command';
import { useEditorStore } from '../../../shared/store/editorStore';
import type { Template } from '../../../shared/types/template';
import type { TextOverlay } from '../../../shared/types/text';

export class ApplyTemplateCommand implements Command {
  private template: Template;
  private previousTextOverlays: TextOverlay[] = [];
  private previousActiveTemplate: Template | null = null;

  constructor(template: Template) {
    this.template = template;
  }

  execute(): void {
    const editorStore = useEditorStore.getState();
    this.previousTextOverlays = [...editorStore.textOverlays];
    this.previousActiveTemplate = editorStore.activeTemplate;
    editorStore.applyTemplate(this.template);
  }

  undo(): void {
    const editorStore = useEditorStore.getState();
    editorStore.replaceState({
      textOverlays: this.previousTextOverlays,
      activeTemplate: this.previousActiveTemplate,
    });
  }
}
