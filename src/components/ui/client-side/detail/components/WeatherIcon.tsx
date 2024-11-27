// src/components/weather/WeatherIcon.tsx
import { Box } from '@mui/material'

import Cloudy from '@/public/lottie/cloudy.svg'
import Thunderstorms from '@/public/lottie/thunderstorms.svg'
import Rain from '@/public/lottie/rain.svg'
import Snow from '@/public/lottie/snow.svg'
import Sleet from '@/public/lottie/sleet.svg'
import Fog from '@/public/lottie/fog.svg'
import Wind from '@/public/lottie/wind.svg'
import ClearNight from '@/public/lottie/clear-night.svg'
import PartlyCloudyNight from '@/public/lottie/partly-cloudy-night.svg'
import PartlyCloudyDay from '@/public/lottie/partly-cloudy-day.svg'
import ClearDay from '@/public/lottie/clear-day.svg'
import WindDay from '@/public/lottie/wind-day.svg'
import { useTheme } from '@/providers/ThemeProvider'

interface WeatherIconProps {
  condition: string
  isNight?: boolean
  size?: number
  animate?: boolean
}

export const WeatherIcon = ({ condition, isNight = false, size = 100, animate = true }: WeatherIconProps) => {
  const { mode } = useTheme()

  const getIconPath = (): string => {
    const conditionLower = condition.toLowerCase()

    // Türkçe durumları kontrol et
    if (conditionLower.includes('açık') || conditionLower.includes('güneşli')) {
      return mode === 'light' ? ClearNight.src : ClearDay.src
    }
    if (conditionLower.includes('parçalı bulutlu')) {
      return mode === 'light' ? PartlyCloudyNight.src : PartlyCloudyDay.src
    }
    if (conditionLower.includes('bulut')) return Cloudy.src
    if (conditionLower.includes('gök gürültü') || conditionLower.includes('fırtına')) return Thunderstorms.src
    if (conditionLower.includes('yağmur') || conditionLower.includes('sağanak')) return Rain.src
    if (conditionLower.includes('kar')) return Snow.src
    if (conditionLower.includes('karla karışık yağmur')) return Sleet.src
    if (conditionLower.includes('sis') || conditionLower.includes('puslu')) return Fog.src
    if (conditionLower.includes('rüzgar')) return Wind.src

    return WindDay.src
  }

  return (
    <Box
      sx={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <img
        src={getIconPath()}
        alt={condition}
        style={{
          width: '100%',
          height: '100%',
          transition: 'transform 0.3s ease-in-out',
          ...(animate && {
            animation: 'weatherIconFloat 3s ease-in-out infinite'
          })
        }}
      />
    </Box>
  )
}
