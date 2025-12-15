import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './playground',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'glass-ui': path.resolve(__dirname, './src'),
    },
  },
  publicDir: path.resolve(__dirname, './playground/assets'),
  server: {
    port: 3000,
    open: true,
  },
})

