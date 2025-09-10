import type { Command } from '@/shared/core/commands/Command';
import type { UpdateTransformFn } from '@/shared/types/transform';

export class FreeRotateCommand implements Command {
  private previousRotation: number;
  private newRotation: number;
  private updateTransform: UpdateTransformFn;

  constructor(
    currentRotation: number,
    newRotation: number,
    updateTransform: UpdateTransformFn
  ) {
    this.previousRotation = currentRotation;
    this.newRotation = newRotation;
    this.updateTransform = updateTransform;
  }

  execute(): void {
    this.updateTransform({ rotation: this.newRotation });
  }

  undo(): void {
    this.updateTransform({ rotation: this.previousRotation });
  }
}