import type { ImageState } from './image'

export type ActionType = 
  | 'FILTER_APPLY'
  | 'ADJUSTMENT_CHANGE'
  | 'TRANSFORM_ROTATE'
  | 'TRANSFORM_FLIP'
  | 'TRANSFORM_CROP'

interface BasePayload {
  type: ActionType
}

interface TransformRotatePayload extends BasePayload {
  type: 'TRANSFORM_ROTATE'
  direction: 'cw' | 'ccw'
}

interface TransformFlipPayload extends BasePayload {
  type: 'TRANSFORM_FLIP'
  direction: 'horizontal' | 'vertical'
}

interface TransformCropPayload extends BasePayload {
  type: 'TRANSFORM_CROP'
  x: number
  y: number
  width: number
  height: number
  dataUrl: string
}

interface FilterApplyPayload extends BasePayload {
  type: 'FILTER_APPLY'
  filter: string | null
}

interface AdjustmentChangePayload extends BasePayload {
  type: 'ADJUSTMENT_CHANGE'
  key: string
  value: number
}

type ActionPayload = 
  | TransformRotatePayload 
  | TransformFlipPayload 
  | TransformCropPayload 
  | FilterApplyPayload 
  | AdjustmentChangePayload

export interface EditorAction {
  type: ActionType
  payload: ActionPayload
  timestamp: number
  previousState: ImageState
}
