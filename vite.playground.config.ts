import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

/**
 * Playground / showcase site config.
 *
 * The same config serves `npm run playground` (dev) and `npm run build:site`
 * (the artifact deployed to GitHub Pages).
 *
 * BASE_PATH is injected by the Pages workflow as `/<repo-name>/` so that all
 * asset URLs resolve under the project-pages sub-path. Locally it stays '/'.
 */
const base = process.env.BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  root: './playground',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'glass-ui': path.resolve(__dirname, './src'),
    },
  },
  publicDir: path.resolve(__dirname, './playground/assets'),
  build: {
    outDir: path.resolve(__dirname, './site-dist'),
    emptyOutDir: true,
    sourcemap: false,
  },
  server: {
    port: 3000,
  },
})
