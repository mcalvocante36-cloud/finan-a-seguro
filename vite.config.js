// vite.config.js (Versão Final com root: 'docs' + outDir)

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'docs', 
  base: './', // Usamos o caminho relativo

  plugins: [react()],
  
  build: {
    outDir: '../dist', // Volta para a pasta 'dist' na raiz
    // Removido: rollupOptions
  }
})