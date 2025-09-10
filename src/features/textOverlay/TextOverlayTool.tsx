import React from 'react';
import { useTextOverlay } from './useTextOverlay';
import { Button } from '../../shared/components/ui/Button';

export const TextOverlayTool: React.FC = () => {
  const { addText } = useTextOverlay();

  const handleAddText = () => {
    addText({});
  };

  return (
    <Button onClick={handleAddText} className="w-full">
      Add Text
    </Button>
  );
};
