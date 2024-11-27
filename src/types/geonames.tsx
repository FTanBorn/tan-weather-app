export interface LocationAddress {
  city?: string
  state?: string
  country?: string
}

export interface Location {
  id: string
  name: string
  fullName: string
  type: string
  lat: number
  lon: number
  displayName: string
  address: LocationAddress
}

export interface LocationSearchProps {
  onLocationSelect?: (location: Location | null) => void
  placeholder?: string
  className?: string
}

export type LocationType = 'country' | 'state' | 'town'
