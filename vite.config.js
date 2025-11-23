// vite.config.js (Versão FINAL)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'docs', // Mantém a raiz de build em 'docs'
  base: './', // <--- MUDANÇA CRUCIAL: Usa caminho relativo para o GitHub Pages
  
  plugins: [react()],
  
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: 'docs/index.html'
    }
  }
})