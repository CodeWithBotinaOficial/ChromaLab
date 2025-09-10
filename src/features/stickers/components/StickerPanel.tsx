
import React from 'react';
import { useStickers } from '../useStickers';
import { ToolPanel } from '../../../shared/components/ui/ToolPanel';
import { Button } from '../../../shared/components/ui/Button';

const PREDEFINED_STICKERS = [
  '😀', '😎', '😂', '😍', '🥳', '🚀', '🔥', '💯',
];

export const StickerPanel: React.FC = () => {
  const { stickers, addSticker, removeSticker } = useStickers();

  const handleAddSticker = (emoji: string) => {
    // We can't directly use emoji as src, so we'll create a data URL from it.
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 128;
    if (ctx) {
      ctx.font = '100px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(emoji, 64, 64);
    }
    addSticker(canvas.toDataURL());
  };

  return (
    <ToolPanel title="Stickers">
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 font-semibold text-gray-light">Add Sticker</h4>
          <div className="grid grid-cols-4 gap-2">
            {PREDEFINED_STICKERS.map((emoji, index) => (
              <button 
                key={index} 
                onClick={() => handleAddSticker(emoji)} 
                className="p-2 text-3xl transition-transform duration-150 rounded-lg hover:scale-110 bg-background-secondary"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-gray-light">Active Stickers</h4>
          <div className="space-y-2">
            {stickers.length > 0 ? (
              stickers.map((sticker) => (
                <div key={sticker.id} className="flex items-center justify-between p-2 rounded-md bg-background-secondary">
                  <img src={sticker.src} alt="Sticker" className="w-8 h-8" />
                  <Button onClick={() => removeSticker(sticker.id)} variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No stickers added yet.</p>
            )}
          </div>
        </div>
      </div>
    </ToolPanel>
  );
};
