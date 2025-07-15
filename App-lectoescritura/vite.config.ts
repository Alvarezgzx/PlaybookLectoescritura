import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Esta es la ruta donde vivirá la aplicación del asistente
  base: '/asistente-ia/'
})