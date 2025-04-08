/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_WEATHER_KEY: process.env.NEXT_PUBLIC_WEATHER_KEY,
    NEXT_PUBLIC_GEONAMES_KEY: process.env.NEXT_PUBLIC_GEONAMES_KEY
  },
  images: {
    domains: ['cdn.weatherapi.com'],
  }
}

module.exports = nextConfig