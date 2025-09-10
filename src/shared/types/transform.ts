export type TransformState = {
  rotation: number;
  scaleX: number;
  scaleY: number;
};

export type UpdateTransformFn = (transform: Partial<TransformState>) => void;
