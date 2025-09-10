import React, { useRef, useState, useEffect } from 'react';
import type { TextOverlay } from '../../shared/types/text';
import { useTextOverlay } from './useTextOverlay';
import Draggable, { type DraggableData, type DraggableEvent } from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import react-resizable styles

interface EditableTextProps {
  textOverlay: TextOverlay;
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
}

export const EditableText: React.FC<EditableTextProps> = ({ textOverlay, isSelected, onSelect, onDeselect }) => {
  const { updateText, removeText } = useTextOverlay();
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(textOverlay.text);
  const textRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null); // New ref for Draggable's DOM node
  const [rotation, setRotation] = useState(textOverlay.rotation);

  useEffect(() => {
    setCurrentText(textOverlay.text);
  }, [textOverlay.text]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (currentText !== textOverlay.text) {
      updateText(textOverlay.id, { text: currentText });
    }
    onDeselect(); // Call onDeselect when editing finishes
  };

  const handleDrag = (_e: DraggableEvent, ui: DraggableData) => {
    updateText(textOverlay.id, { x: ui.x, y: ui.y });
  };

  const handleResize = (_e: React.SyntheticEvent, { size }: { size: { width: number; height: number } }) => {
    updateText(textOverlay.id, { width: size.width, height: size.height });
  };

  const handleRotateStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const rect = textRef.current?.getBoundingClientRect();
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
      updateText(textOverlay.id, { rotation: rotation });
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      removeText(textOverlay.id);
    }
  };

  return (
    <Draggable
      position={{ x: textOverlay.x, y: textOverlay.y }}
      onStop={handleDrag}
      handle=".handle"
      nodeRef={draggableRef} // Pass the ref to Draggable
    >
      <div ref={draggableRef} onClick={onSelect}> {/* Assign the ref to a div that wraps ResizableBox */}
        <ResizableBox
          width={textOverlay.width}
          height={textOverlay.height}
          onResizeStop={handleResize}
          minConstraints={[50, 20]}
          maxConstraints={[500, 200]}
          className={`relative border ${isSelected ? 'border-blue-500' : 'border-dashed border-transparent'}`}
          style={{
            transform: `rotate(${rotation}deg)`,
            position: 'absolute',
          }}
        >
          <div
            ref={textRef}
            className="handle w-full h-full flex items-center justify-center cursor-move"
            onDoubleClick={handleDoubleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0} // Make div focusable for key events
            style={{
              fontFamily: textOverlay.fontFamily,
              fontSize: `${textOverlay.fontSize}px`,
              color: textOverlay.color,
              fontWeight: textOverlay.fontWeight,
              fontStyle: textOverlay.fontStyle,
              textDecoration: textOverlay.textDecoration,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              userSelect: 'none',
            }}
          >
            {isEditing ? (
              <textarea
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                onBlur={handleBlur}
                autoFocus
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  textAlign: 'center',
                  fontFamily: textOverlay.fontFamily,
                  fontSize: `${textOverlay.fontSize}px`,
                  color: textOverlay.color,
                  fontWeight: textOverlay.fontWeight,
                  fontStyle: textOverlay.fontStyle,
                  textDecoration: textOverlay.textDecoration,
                }}
              />
            ) : (
              currentText
            )}
          </div>
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