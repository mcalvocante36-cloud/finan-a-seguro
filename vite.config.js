// No seu arquivo vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'docs', // Mantém a raiz de build em 'docs'
  base: '/finan-a-seguro/', 
  
  plugins: [react()],
  
  // ADICIONE ESTE BLOCO para forçar a entrada correta do index.html
  build: {
    rollupOptions: {
      input: 'docs/index.html' // Ponto de entrada corrigido
    }
  }
})