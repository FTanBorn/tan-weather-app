import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Weather and city information application',
  keywords: ['weather', 'forecast', 'city', 'temperature', 'climate'],
  authors: [{ name: 'Furkan Tandogan' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#ffffff',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Weather App',
    description: 'Weather and city information application',
    type: 'website',
    locale: 'en_US',
    siteName: 'Weather App',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weather App',
    description: 'Weather and city information application',
  },
} 