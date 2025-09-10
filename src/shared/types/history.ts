import type { ImageState } from './image'

export type ActionType = 
  | 'FILTER_APPLY'
  | 'ADJUSTMENT_CHANGE'

interface BasePayload {
  type: ActionType
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
  | FilterApplyPayload 
  | AdjustmentChangePayload

export interface EditorAction {
  type: ActionType
  payload: ActionPayload
  timestamp: number
  previousState: ImageState
}