import React from 'react';
import { useStickers } from './useStickers';

const stickerAssets = [
  'https://via.placeholder.com/50/FF0000/FFFFFF?text=S1',
  'https://via.placeholder.com/50/00FF00/FFFFFF?text=S2',
  'https://via.placeholder.com/50/0000FF/FFFFFF?text=S3',
  'https://via.placeholder.com/50/FFFF00/000000?text=S4',
];

export const StickerPanel: React.FC = () => {
  const { addSticker } = useStickers();

  const handleAddSticker = (src: string) => {
    addSticker(src);
  };

  return (
    <div className="p-4 border-t border-gray-700">
      <h3 className="text-lg font-semibold mb-2">Stickers</h3>
      <div className="grid grid-cols-4 gap-2">
        {stickerAssets.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Sticker ${index + 1}`}
            className="w-16 h-16 cursor-pointer hover:opacity-75 transition-opacity"
            onClick={() => handleAddSticker(src)}
          />
        ))}
      </div>
    </div>
  );
};
