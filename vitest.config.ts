/**
 * @file vitest.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Vitest configuration for unit testing the Portfolio application.
 *
 * @description
 * Configures Vitest to work with Vue components and TypeScript, using the `happy-dom` environment for DOM APIs.
 * The `include` pattern ensures that only test files are picked up.
 * Path aliases are set up to mirror those in the Nuxt configuration, allowing tests to resolve imports correctly.
 *
 * @since 20/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// ---------- VITEST CONFIG
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url)),
      '@': fileURLToPath(new URL('./app', import.meta.url)),
      '#imports': fileURLToPath(new URL('./tests/mocks/imports.ts', import.meta.url)),
    },
  },
})
