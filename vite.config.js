// -------- IMPORTS -------- \\

import { defineConfig } from 'vite';

// -------- EXPORT CONFIG -------- \\

export default defineConfig({
  // Root directory
  root: '.',

  // Build options for production
  build: {
    // Output directory for the production build
    outDir: './dist',

    // Clear the dist folder before building
    emptyOutDir: true,

    // Minify JS with Terser
    minify: 'terser',

    // Generate sourcemap for debugging (false for small builds, true for big builds)
    sourcemap: false,

    // Rollup options to handle entry points and assets
    rollupOptions: {
      input: {
        main: './index.html', // Main entry point
      },
      output: {
        assetFileNames: 'assets/[name].[hash][extname]', // Minified asset naming
      },
    },

    // Chunk size warning limit
    chunkSizeWarningLimit: 500, // Warn if chunks exceed 500KB
  },

  // Server options
  server: {
    port: 3000,
    open: true,
    hmr: true,
    cors: true,
  },

  // Base URL for production deployment
  base: '/',

  // Asset handling
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.ico'],
});