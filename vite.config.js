// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'docs', // Mantém a raiz de build em 'docs'
  base: '/finan-a-seguro/', 
  
  plugins: [react()],
  
  build: {
    outDir: '../dist', // <--- IMPORTANTE: Cria a pasta 'dist' na raiz do projeto.
    rollupOptions: {
      input: 'docs/index.html'
    }
  }
})