import type { Command } from '@/shared/core/commands/Command';
import type { ImageState } from '@/shared/types/image';


export class CropCommand implements Command {
  private previousImageState: ImageState;
  private newImageState: ImageState;
  private setCurrentImage: (image: ImageState) => void;

  constructor(
    previousImageState: ImageState,
    newImageState: ImageState,
    setCurrentImage: (image: ImageState) => void
  ) {
    this.previousImageState = previousImageState;
    this.newImageState = newImageState;
    this.setCurrentImage = setCurrentImage;
  }

  execute(): void {
    this.setCurrentImage(this.newImageState);
  }

  undo(): void {
    this.setCurrentImage(this.previousImageState);
  }
}
