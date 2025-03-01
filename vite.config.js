// -------- IMPORTS -------- \\

import { defineConfig } from 'vite';

// -------- EXPORT CONFIG -------- \\

export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        minify: 'terser',
    },

    server: {
        port: 3000,
        open: true,
        hmr: true,
        cors: true
    },
    
    // Base URL for production deployment
    base: '/',
    
    // Asset Handling
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],
    
    // Resolve aliases for cleaner imports
    resolve: {
        alias: {
            '@': '/src',
            '@assets': '/public'
        }
    }
})