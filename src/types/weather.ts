// src/types/weather.ts

export interface WeatherThemeColors {
  cardBackground: {
    day: string
    night: string
  }
  icons: {
    temperature: string
    humidity: string
    wind: string
    sun: string
    moon: string
    sunset: string
  }
  text: {
    primary: string
    secondary: string
  }
  overlay: {
    light: string
    medium: string
  }
}

export const getWeatherColors = (isDark: boolean): WeatherThemeColors => ({
  cardBackground: {
    day: isDark
      ? 'linear-gradient(135deg, #1e1e2f 0%, #2c2c44 100%)'
      : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    night: isDark
      ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
  },
  icons: {
    temperature: isDark ? '#fb923c' : '#f97316',
    humidity: isDark ? '#38bdf8' : '#0284c7',
    wind: isDark ? '#93c5fd' : '#2563eb',
    sun: isDark ? '#fbbf24' : '#d97706',
    moon: isDark ? '#a5b4fc' : '#6366f1',
    sunset: isDark ? '#fb923c' : '#f97316'
  },
  text: {
    primary: isDark ? '#f8fafc' : '#0f172a',
    secondary: isDark ? '#94a3b8' : '#475569'
  },
  overlay: {
    light: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)',
    medium: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.85)'
  }
})
