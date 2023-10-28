/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: false,
    coverage: {
      provider: 'v8',
      all: true,
      skipFull: false,
      reporter: 'text',
    },
  },
})
