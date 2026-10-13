import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    environment: 'jsdom',
	setupFiles: ["./vitest.setup.ts"],
	chaiConfig: {
      truncateThreshold: 0,
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [react()]
})