// src/services/locationiq.ts
import { Location, LocationType } from '@/types/geonames'

const LOCATIONIQ_API_KEY = process.env.NEXT_PUBLIC_GEONAMES_KEY
const BASE_URL = 'https://api.locationiq.com/v1'

const ALLOWED_TYPES: LocationType[] = ['country', 'state', 'town']

const getLocationType = (type: string): LocationType | null => {
  if (ALLOWED_TYPES.includes(type as LocationType)) {
    return type as LocationType
  }

  // LocationIQ bazen farklı isimler kullanabiliyor, onları düzeltiyoruz
  switch (type) {
    case 'administrative':
      return 'state'
    case 'city':
      return 'state'
    case 'village':
      return 'town'
    default:
      return null
  }
}

export const searchLocations = async (query: string): Promise<Location[]> => {
  if (!query || query.length < 2) return []

  const params = new URLSearchParams()

  if (!LOCATIONIQ_API_KEY) {
    throw new Error('LocationIQ API key is missing')
  }

  params.append('key', LOCATIONIQ_API_KEY)
  params.append('q', query)
  params.append('format', 'json')
  params.append('limit', '10')
  params.append('accept-language', 'tr')
  params.append('addressdetails', '1')
  params.append('normalizecity', '1')
  params.append('dedupe', '1')

  try {
    const response = await fetch(`${BASE_URL}/autocomplete?${params}`)

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()

    // Sadece istediğimiz tipleri filtrele ve dönüştür
    return data
      .map((item: any) => {
        const locationType = getLocationType(item.type)
        if (!locationType) return null

        return {
          id: item.osm_id,
          name: item.display_name.split(',')[0],
          fullName: item.display_name,
          type: locationType,
          lat: Number(item.lat),
          lon: Number(item.lon),
          displayName: item.display_name,
          address: {
            city: item.address?.city || item.address?.town || item.address?.county,
            state: item.address?.state,
            country: item.address?.country
          }
        }
      })
      .filter((item: Location | null): item is Location => item !== null)
  } catch (error) {
    console.log('LocationIQ API Error:', error)
    return []
  }
}
