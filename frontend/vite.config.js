import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // Se activa el plugin de React, per
  server: {
    proxy: { // Se definen las reglas para redirigir peticiones
      '/api': { // Prefijo que usa Vite como proxy
        target: 'http://localhost:4000/', // Backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Elimina /api de la URL antes de enviarla al backend
      }
    }
  }
})

