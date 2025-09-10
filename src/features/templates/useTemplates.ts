import { useEditorStore } from '../../shared/store/editorStore';
import type { Template } from '../../shared/types/template';
import { ApplyTemplateCommand } from './commands/ApplyTemplateCommand';
import { UpdateTemplateTextCommand } from './commands/UpdateTemplateTextCommand';
import { v4 as uuidv4 } from 'uuid';

// Predefined templates
const predefinedTemplates: Template[] = [
  {
    id: uuidv4(),
    name: 'Meme Template 1',
    previewImage: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Meme1',
    textPlaceholders: [
      {
        id: uuidv4(),
        x: 50,
        y: 20,
        width: 400,
        height: 50,
        defaultText: 'TOP TEXT',
        currentText: '',
        fontSize: 48,
        fontFamily: 'Impact',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textDecoration: 'none',
        rotation: 0,
      },
      {
        id: uuidv4(),
        x: 50,
        y: 400,
        width: 400,
        height: 50,
        defaultText: 'BOTTOM TEXT',
        currentText: '',
        fontSize: 48,
        fontFamily: 'Impact',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontStyle: 'normal',
        textDecoration: 'none',
        rotation: 0,
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Quote Template',
    previewImage: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Quote',
    textPlaceholders: [
      {
        id: uuidv4(),
        x: 100,
        y: 150,
        width: 300,
        height: 100,
        defaultText: '"Your quote here" - Author',
        currentText: '',
        fontSize: 32,
        fontFamily: 'Serif',
        color: '#000000',
        fontWeight: 'normal',
        fontStyle: 'italic',
        textDecoration: 'none',
        rotation: 0,
      },
    ],
  },
];

export const useTemplates = () => {
  const { activeTemplate, executeCommand } = useEditorStore((state) => ({
    activeTemplate: state.activeTemplate,
    executeCommand: state.executeCommand,
  }));

  const applyTemplate = (template: Template) => {
    executeCommand(new ApplyTemplateCommand(template));
  };

  const updateTemplateText = (templateId: string, placeholderId: string, newText: string) => {
    executeCommand(new UpdateTemplateTextCommand(templateId, placeholderId, newText));
  };

  return {
    predefinedTemplates,
    activeTemplate,
    applyTemplate,
    updateTemplateText,
  };
};
