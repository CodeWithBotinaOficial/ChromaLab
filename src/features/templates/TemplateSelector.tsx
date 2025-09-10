import React from 'react';
import { useTemplates } from './useTemplates';

export const TemplateSelector: React.FC = () => {
  const { predefinedTemplates, applyTemplate } = useTemplates();

  return (
    <div className="p-4 border-t border-gray-700">
      <h3 className="text-lg font-semibold mb-2">Templates</h3>
      <div className="grid grid-cols-2 gap-4">
        {predefinedTemplates.map((template) => (
          <div
            key={template.id}
            className="border border-gray-600 rounded-lg p-2 cursor-pointer hover:border-accent-blue transition-colors"
            onClick={() => applyTemplate(template)}
          >
            <img src={template.previewImage} alt={template.name} className="w-full h-24 object-cover mb-2 rounded" />
            <p className="text-sm font-medium text-center">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
