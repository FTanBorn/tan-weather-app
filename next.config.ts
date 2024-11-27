/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_WEATHER_KEY: process.env.NEXT_PUBLIC_WEATHER_KEY,
    NEXT_PUBLIC_LOCATIONIQ_KEY: process.env.NEXT_PUBLIC_LOCATIONIQ_KEY
  }
}

module.exports = nextConfig