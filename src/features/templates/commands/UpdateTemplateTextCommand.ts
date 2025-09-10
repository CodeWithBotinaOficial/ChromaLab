import type { Command } from '../../../shared/core/commands/Command';
import { useEditorStore } from '../../../shared/store/editorStore';
import type { Template, TemplateTextPlaceholder } from '../../../shared/types/template';

export class UpdateTemplateTextCommand implements Command {
  private templateId: string;
  private placeholderId: string;
  private newText: string;
  private previousText: string = '';

  constructor(templateId: string, placeholderId: string, newText: string) {
    this.templateId = templateId;
    this.placeholderId = placeholderId;
    this.newText = newText;
  }

  execute(): void {
    const editorStore = useEditorStore.getState();
    const template: Template | null = editorStore.activeTemplate;
    if (template && template.id === this.templateId) {
      const placeholder: TemplateTextPlaceholder | undefined = template.textPlaceholders.find(p => p.id === this.placeholderId);
      if (placeholder) {
        this.previousText = placeholder.currentText || placeholder.defaultText;
        editorStore.updateTemplateText(this.templateId, this.placeholderId, this.newText);
      }
    }
  }

  undo(): void {
    const editorStore = useEditorStore.getState();
    editorStore.updateTemplateText(this.templateId, this.placeholderId, this.previousText);
  }
}
