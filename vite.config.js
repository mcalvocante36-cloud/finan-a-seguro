// No seu arquivo vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Adicione ESTA linha:
  base: '/finan-a-seguro/', 
  plugins: [react()],
})