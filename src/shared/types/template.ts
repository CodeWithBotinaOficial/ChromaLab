export interface TemplateTextPlaceholder {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  defaultText: string;
  currentText: string; // User-editable text
  fontSize: number;
  fontFamily: string;
  color: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  rotation: number;
}

export interface Template {
  id: string;
  name: string;
  previewImage: string; // URL to a preview image of the template
  textPlaceholders: TemplateTextPlaceholder[];
  // Potentially add image/sticker placeholders later
}
