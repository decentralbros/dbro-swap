import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // @ts-ignore
  plugins: [react()],
  test: {
    setupFiles: ['./src/setupTests.js'],
    environment: 'happy-dom',
    globals: true,
  },
})
