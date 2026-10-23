import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Firebase SDK into its own cacheable chunk
          'firebase-app':       ['firebase/app'],
          'firebase-firestore': ['firebase/firestore'],
          // Split React + React-DOM
          'vendor-react': ['react', 'react-dom'],
          // Lucide icons
          'vendor-icons': ['lucide-react'],
        }
      }
    }
  }
})

