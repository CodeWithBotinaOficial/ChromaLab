export interface Sticker {
  id: string;
  x: number;
  y: number;
  src: string; // URL or base64 data URL of the sticker image
  width: number;
  height: number;
  rotation: number;
}
