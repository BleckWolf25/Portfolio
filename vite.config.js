// -------- IMPORTS -------- \\

import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// -------- VARIABLES -------- \\

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// -------- EXPORT CONFIG -------- \\

export default defineConfig({
  // Public Folder is the root
  root: './public',

  // Build properties
  build: {

    // Output directory(for production)
    outDir: '../dist',

    // Checks if dist folder is clear
    emptyOutDir: true,

    // Minifies with terser(slower but better for production)
    minify: 'terser',
  },
  
  // Server Configuration
  server: {

    // Developer Server Port
    port: 3000,

    // Opens the page automatically?
    open: true,

    // Hot Module Replacement for faster development
    hmr: true,

    // Cross-Origin Resource Sharing?
    cors: true,
  },

  // Base URL for production deployment
  base: '/',

  // Asset Handling
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],

  // Path Resolves
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './public'),
    },
  },
});
