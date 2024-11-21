import api from './index'
import type { EstateResponseItem } from './types'
import type { Estate } from '@/types/estate'
import type { EstateType } from './types'
import type { Currency } from '@/types/common'

export async function getEstates(
  city: string | null,
  searchQuery: string | null,
): Promise<Estate[]> {
  const params: { city?: string; search?: string } = {}

  if (city) {
    params.city = city
  }

  if (searchQuery) {
    params.search = searchQuery
  }

  const estatesRes = await api.get<EstateResponseItem[]>('/estates', { params })
  return parseEstates(estatesRes.data)
}

function parseEstates(estatesRes: EstateResponseItem[]): Estate[] {
  const estateTypes: { [key in EstateType]: string } = {
    commercial: 'Коммерческая недвижимость',
    house: 'Дом',
    apartment: 'Квартира',
  }

  const currencies: { [key in Currency]: string } = { RUB: '₽' }

  return estatesRes.map((estate) => {
    return {
      ...estate,
      type: estateTypes[estate.type],
      price: `${estate.price.toLocaleString()} ${currencies[estate.currency]}`,
    }
  })
}
