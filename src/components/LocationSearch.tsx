// src/components/LocationSearch.tsx
'use client'

import React, { useState, SyntheticEvent } from 'react'
import { Autocomplete, TextField, Grid, Typography } from '@mui/material'
import { AutocompleteInputChangeReason } from '@mui/material/useAutocomplete'
import { Theme } from '@mui/material/styles'
import { LocationOn } from '@mui/icons-material'
import { debounce } from 'lodash'
import { Location, LocationSearchProps, LocationType } from '@/types/geonames'
import { searchLocations } from '@/services/geonames'
import { AutocompleteRenderOptionState } from '@mui/material/Autocomplete/Autocomplete'
import { useRouter } from 'next/navigation'

const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationSelect,
  placeholder = 'Şehir veya ilçe ara...',
  className
}) => {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<Location[]>([])
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const getTypeLabel = (type: LocationType): string => {
    switch (type) {
      case 'country':
        return 'Ülke'
      case 'state':
        return 'İl'
      case 'town':
        return 'İlçe'
      default:
        return ''
    }
  }

  const handleSearch = debounce(async (searchText: string) => {
    if (!searchText || searchText.length < 2) {
      setOptions([])
      return
    }

    setLoading(true)
    try {
      const locations = await searchLocations(searchText)
      setOptions(locations)
    } catch (error) {
      console.error('Search error:', error)
      setOptions([])
    } finally {
      setLoading(false)
    }
  }, 300)

  const handleLocationSelect = (_event: SyntheticEvent, newValue: Location | null) => {
    if (!newValue) return

    // Tekrarlanan şehir isimlerini temizle
    const uniqueLocationName = newValue.fullName
      .split(',')
      .map(part => part.trim())
      .filter((item, index, array) => array.indexOf(item) === index)
      .join(', ')

    // Query parametrelerini oluştur
    const queryParams = new URLSearchParams({
      lat: String(newValue.lat),
      lon: String(newValue.lon),
      name: uniqueLocationName // Temizlenmiş isim
    }).toString()

    // URL'i oluştur
    const url = `/detail?${queryParams}`

    onLocationSelect?.(newValue)
    router.push(url)
  }

  return (
    <Autocomplete<Location, false, false, false>
      id='location-search'
      className={className}
      sx={{ width: '100%' }}
      open={open}
      size='small'
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option: Location, value: Location) => option.id === value.id}
      getOptionLabel={(option: Location) => option.displayName || ''}
      options={options}
      loading={loading}
      loadingText='Aranıyor...'
      noOptionsText='Konum bulunamadı'
      filterOptions={(x: Location[]) => x}
      onChange={handleLocationSelect}
      onInputChange={(_event: SyntheticEvent, newInputValue: string, reason: AutocompleteInputChangeReason) => {
        if (reason === 'input') {
          handleSearch(newInputValue)
        }
      }}
      renderInput={(params: any) => (
        <TextField
          {...params}
          placeholder={placeholder}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: (theme: Theme) =>
                theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                backgroundColor: (theme: Theme) =>
                  theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.08)'
              }
            }
          }}
        />
      )}
      renderOption={(
        props: React.HTMLAttributes<HTMLLIElement>,
        option: Location,
        state: AutocompleteRenderOptionState
      ) => {
        const { key, ...otherProps } = props
        return (
          <li key={key} {...otherProps}>
            <Grid container alignItems='center' spacing={2}>
              <Grid item>
                <LocationOn color='primary' />
              </Grid>
              <Grid item xs>
                <Typography variant='body1' color='text.primary'>
                  {option.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {[option.address.state, option.address.country].filter(Boolean).join(', ')}
                </Typography>
                <Typography
                  variant='caption'
                  sx={{
                    color: 'primary.main',
                    fontWeight: 500
                  }}
                >
                  {getTypeLabel(option.type)}
                </Typography>
              </Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}

export default LocationSearch
