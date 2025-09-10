export interface DrawingStroke {
  id: string;
  points: number[]; // Flat array of [x1, y1, x2, y2, ...]
  color: string;
  brushSize: number;
  opacity: number;
}
