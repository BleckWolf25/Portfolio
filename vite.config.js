/**
 * Vite Configuration File
 * 
 * Handles build process, server configuration, and asset management
 * Remove this file if not using Vite
 */

// Base configuration
export default defineConfig({
  
  // Project root directory
  root: '.',
  
  // Production build settings
  build: {
    outDir: './dist',              // Output directory
    minify: 'terser',              // JS minification
    sourcemap: false,              // Disable source maps
    chunkSizeWarningLimit: 500,    // Size warning threshold
    
    // Rollup bundler configuration
    rollupOptions: {
      input: './index.html',       // Main entry point
      output: {
        assetFileNames: 'assets/[name].[hash][extname]' // Hashed asset names
      }
    }
  },

  // Development server settings
  server: {
    port: 3000,       // Local dev port
    open: true,       // Auto-open browser
    hmr: true,        // Hot module replacement
    cors: true        // Enable CORS
  },

  // Asset handling configuration
  assetsInclude: [    // Supported file types
    '**/*.png',
    '**/*.jpg', 
    '**/*.svg',
    '**/*.ico'
  ]
});