import React, { useRef, useState, useEffect } from 'react';
import type { Sticker } from '../../shared/types/sticker';
import { useStickers } from './useStickers';
import Draggable, { type DraggableData, type DraggableEvent } from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import react-resizable styles

interface DraggableStickerProps {
  sticker: Sticker;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}

export const DraggableSticker: React.FC<DraggableStickerProps> = ({ sticker, isSelected, onSelect, onDeselect }) => {
  const { updateSticker, removeSticker } = useStickers();
  const stickerRef = useRef<HTMLImageElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null); // New ref for Draggable's DOM node
  const [rotation, setRotation] = useState(sticker.rotation);

  useEffect(() => {
    setRotation(sticker.rotation);
  }, [sticker.rotation]);

  const handleDrag = (_e: DraggableEvent, ui: DraggableData) => {
    updateSticker(sticker.id, { x: ui.x, y: ui.y });
  };

  const handleResize = (_e: React.SyntheticEvent, { size }: { size: { width: number; height: number } }) => {
    updateSticker(sticker.id, { width: size.width, height: size.height });
  };

  const handleRotateStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const rect = stickerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const startAngle = Math.atan2(startY - centerY, startX - centerX) * (180 / Math.PI);
    const initialRotation = rotation;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const moveX = moveEvent.clientX;
      const moveY = moveEvent.clientY;
      const currentAngle = Math.atan2(moveY - centerY, moveX - centerX) * (180 / Math.PI);
      const newRotation = initialRotation + (currentAngle - startAngle);
      setRotation(newRotation);
    };

    const onMouseUp = () => {
      updateSticker(sticker.id, { rotation: rotation });
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      removeSticker(sticker.id);
    }
  };

  return (
    <Draggable
      position={{ x: sticker.x, y: sticker.y }}
      onStop={handleDrag}
      handle=".handle"
      nodeRef={draggableRef} // Pass the ref to Draggable
    >
      <div ref={draggableRef} onClick={onSelect}> {/* Assign the ref to a div that wraps ResizableBox */}
        <ResizableBox
          width={sticker.width}
          height={sticker.height}
          onResizeStop={handleResize}
          minConstraints={[20, 20]}
          maxConstraints={[300, 300]}
          className={`relative border ${isSelected ? 'border-blue-500' : 'border-dashed border-transparent'}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            position: 'absolute',
          }}
        >
          <img
            ref={stickerRef}
            src={sticker.src}
            alt="sticker"
            className="handle w-full h-full object-contain cursor-move"
            onKeyDown={handleKeyDown}
            onBlur={onDeselect} // Call onDeselect when img loses focus
            tabIndex={0} // Make img focusable for key events
          />
          <div
            className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full cursor-grab"
            onMouseDown={handleRotateStart}
            title="Rotate"
          ></div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};