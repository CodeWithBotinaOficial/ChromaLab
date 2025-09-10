import React from 'react';
import { useTemplates } from '../useTemplates';
import { useEditorStore } from '../../../shared/store/editorStore';
import { ToolPanel } from '../../../shared/components/ui/ToolPanel';
import { templatePresets } from '../templatePresets';
import { Button } from '../../../shared/components/ui/Button';
import type { Template, TemplateTextPlaceholder } from '../../../shared/types/template';

export const TemplatePanel: React.FC = () => {
  const { applyTemplate, updateTemplateText } = useTemplates();
  const activeTemplate = useEditorStore((state) => state.activeTemplate);

  return (
    <ToolPanel title="Templates">
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 font-semibold text-gray-light">Apply a Template</h4>
          <div className="grid grid-cols-2 gap-2">
            {templatePresets.map((template: Template) => (
              <Button
                key={template.id}
                onClick={() => applyTemplate(template)}
                variant={activeTemplate?.id === template.id ? 'default' : 'ghost'}
              >
                {template.name}
              </Button>
            ))}
          </div>
        </div>

        {activeTemplate && (
          <div>
            <h4 className="mb-2 font-semibold text-gray-light">Edit Template Text</h4>
            <div className="space-y-4">
              {activeTemplate.textPlaceholders.map((placeholder: TemplateTextPlaceholder) => (
                <div key={placeholder.id} className="space-y-2">
                  <label className="text-sm font-medium text-gray-light">{placeholder.defaultText}</label>
                  <input
                    type="text"
                    value={placeholder.currentText || ''}
                    onChange={(e) => updateTemplateText(activeTemplate.id, placeholder.id, e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-background-secondary border border-gray-600 rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPanel>
  );
};