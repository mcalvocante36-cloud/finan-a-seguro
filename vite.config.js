// No seu arquivo vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // ESTA linha diz ao Vite onde encontrar o index.html
  root: 'docs', 

  // ESTA linha já estava correta para o caminho do GitHub Pages
  base: '/finan-a-seguro/', 

  plugins: [react()],
})