import React from 'react';
import { useEditorStore } from '../../../shared/store/editorStore';
import { Button } from '../../../shared/components/ui/Button';

export const CropPanel: React.FC = () => {
  const setIsCropping = useEditorStore((state) => state.setIsCropping);

  const handleCropClick = () => {
    setIsCropping(true);
  };

  return (
    <div className="p-4 border-t border-gray-700">
      <h3 className="text-lg font-semibold mb-2">Crop Image</h3>
      <Button onClick={handleCropClick} className="w-full">Activate Crop Tool</Button>
    </div>
  );
};
