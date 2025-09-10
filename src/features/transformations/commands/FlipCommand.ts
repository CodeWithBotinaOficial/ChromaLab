import type { Command } from '@/shared/core/commands/Command';
import type { UpdateTransformFn } from '@/shared/types/transform';

export class FlipCommand implements Command {
  private previousScaleX: number;
  private previousScaleY: number;
  private newScaleX: number;
  private newScaleY: number;
  private updateTransform: UpdateTransformFn;

  constructor(
    currentScaleX: number,
    currentScaleY: number,
    direction: 'horizontal' | 'vertical',
    updateTransform: UpdateTransformFn
  ) {
    this.previousScaleX = currentScaleX;
    this.previousScaleY = currentScaleY;
    this.updateTransform = updateTransform;

    if (direction === 'horizontal') {
      this.newScaleX = currentScaleX * -1;
      this.newScaleY = currentScaleY;
    } else {
      this.newScaleX = currentScaleX;
      this.newScaleY = currentScaleY * -1;
    }
  }

  execute(): void {
    this.updateTransform({ scaleX: this.newScaleX, scaleY: this.newScaleY });
  }

  undo(): void {
    this.updateTransform({ scaleX: this.previousScaleX, scaleY: this.previousScaleY });
  }
}