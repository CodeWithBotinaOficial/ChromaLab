import type { Command } from '@/shared/core/commands/Command';
import type { UpdateTransformFn } from '@/shared/types/transform';

export class RotateCommand implements Command {
  private previousRotation: number;
  private newRotation: number;
  private updateTransform: UpdateTransformFn;

  constructor(
    currentRotation: number,
    rotationChange: number,
    updateTransform: UpdateTransformFn
  ) {
    this.previousRotation = currentRotation;
    this.newRotation = ((currentRotation + rotationChange) % 360 + 360) % 360;
    this.updateTransform = updateTransform;
  }

  execute(): void {
    this.updateTransform({ rotation: this.newRotation });
  }

  undo(): void {
    this.updateTransform({ rotation: this.previousRotation });
  }
}