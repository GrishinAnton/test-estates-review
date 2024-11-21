
import type { Currency } from '@/types/common'

export type EstateType = 'commercial' | 'house' | 'apartment'

export interface EstateResponseItem {
  id: number
  address: string
  city: string
  type: EstateType
  price: number
  currency: Currency
}
