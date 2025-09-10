import React from 'react';
import { useTemplates } from './useTemplates';
import { useEditorStore } from '../../shared/store/editorStore';
 

export const TemplateEditor: React.FC = () => {
  const { activeTemplate, updateTemplateText } = useTemplates();
  const { textOverlays } = useEditorStore((state) => ({ textOverlays: state.textOverlays }));

  if (!activeTemplate) {
    return (
      <div className="p-4 border-t border-gray-700 text-gray-400">
        No template active. Select a template to edit its text.
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-gray-700">
      <h3 className="text-lg font-semibold mb-2">Edit Template: {activeTemplate.name}</h3>
      {
        activeTemplate.textPlaceholders.map((placeholder) => {
          // Find the corresponding textOverlay to get its current text value
          const currentTextOverlay = textOverlays.find(to => to.id === placeholder.id);
          const displayValue = currentTextOverlay ? currentTextOverlay.text : placeholder.defaultText;

          return (
            <div key={placeholder.id} className="mb-4">
              <label htmlFor={placeholder.id} className="block text-sm font-medium text-gray-400">
                {`Text Block (${placeholder.id.substring(0, 4)}...)`}
              </label>
              <textarea
                id={placeholder.id}
                value={displayValue}
                onChange={(e) => updateTemplateText(activeTemplate.id, placeholder.id, e.target.value)}
                className="w-full p-2 mt-1 rounded-md bg-gray-800 border border-gray-700 text-gray-light focus:ring-accent-blue focus:border-accent-blue"
                rows={3}
              />
            </div>
          );
        })
      }
    </div>
  );
};
