// src/utils/weatherStyles.ts

export const getWeatherCardStyles = (isNight: boolean) => ({
  card: {
    backgroundColor: isNight
      ? 'rgba(15, 23, 42, 0.8)' // Mevcut dark theme'deki card background
      : 'rgba(255, 255, 255, 0.8)', // Mevcut light theme'deki card background
    backdropFilter: 'blur(10px)',
    borderRadius: 16,
    boxShadow: isNight ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 4px 12px rgba(14, 165, 233, 0.1)',
    '&:hover': {
      boxShadow: isNight ? '0 8px 24px rgba(56, 189, 248, 0.2)' : '0 4px 12px rgba(14, 165, 233, 0.2)',
      transform: 'translateY(-5px)',
      transition: 'all 0.3s ease'
    }
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isNight
      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)'
      : 'linear-gradient(135deg, rgba(240, 249, 255, 0.9) 0%, rgba(224, 242, 254, 0.9) 100%)',
    borderRadius: 16,
    zIndex: 0
  }
})
