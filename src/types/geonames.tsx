export type LocationType = 'country' | 'state' | 'town'

export interface Location {
  id: string
  name: string
  fullName: string
  type: LocationType
  lat: number
  lon: number
  displayName: string
  address: {
    city?: string
    state?: string
    country?: string
  }
}

export interface LocationSearchProps {
  onLocationSelect?: (location: Location) => void
  placeholder?: string
  className?: string
}
