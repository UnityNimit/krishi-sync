import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { weatherApiPlugin } from './server/weatherRoutes'

export default defineConfig({
  plugins: [react(), weatherApiPlugin()],
})
