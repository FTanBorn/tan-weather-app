// src/components/weather/WeatherIcon.tsx
import { Box, useTheme } from '@mui/material'

interface WeatherIconProps {
  condition: string
  isNight?: boolean
  size?: number
  animate?: boolean
}

export const WeatherIcon = ({ condition, isNight = false, size = 100, animate = true }: WeatherIconProps) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const getIconPath = (): string => {
    const conditionLower = condition.toLowerCase()

    if (conditionLower.includes('clear') || conditionLower.includes('sunny')) {
      return isNight ? '/lottie/clear-night.svg' : '/lottie/clear-day.svg'
    }
    if (conditionLower.includes('partly cloudy')) {
      return isNight ? '/lottie/partly-cloudy-night.svg' : '/lottie/partly-cloudy-day.svg'
    }
    if (conditionLower.includes('cloud')) return '/lottie/cloudy.svg'
    if (conditionLower.includes('thunder')) return '/lottie/thunderstorms.svg'
    if (conditionLower.includes('rain')) return '/lottie/rain.svg'
    if (conditionLower.includes('snow')) return '/lottie/snow.svg'
    if (conditionLower.includes('sleet')) return '/lottie/sleet.svg'
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return '/lottie/fog.svg'
    if (conditionLower.includes('wind')) return '/lottie/wind.svg'

    return '/lottie/clear-day.svg'
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
          filter: isDark ? 'invert(1)' : 'none',
          transition: 'transform 0.3s ease-in-out',
          ...(animate && {
            animation: 'weatherIconFloat 3s ease-in-out infinite'
          })
        }}
      />
    </Box>
  )
}
