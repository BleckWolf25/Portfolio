#!/bin/bash

# TypeScript Configuration Fix Script
# Resolves Nuxt 3 auto-import and module resolution issues
# Author: BleckWolf25

set -e  # Exit on any error

echo "🔧 Starting TypeScript configuration fixes for Nuxt 3 portfolio..."

# Step 1: Clean existing build artifacts and type definitions
echo "📁 Cleaning existing build artifacts..."
rm -rf .nuxt
rm -rf .output
rm -rf dist
rm -rf node_modules/.cache

# Step 2: Reinstall dependencies to ensure clean state
echo "📦 Reinstalling dependencies..."
npm ci

# Step 3: Generate fresh Nuxt type definitions
echo "🎯 Generating Nuxt type definitions..."
npx nuxt prepare

# Step 4: Verify critical type files exist
echo "✅ Verifying type definitions..."
if [ ! -f ".nuxt/nuxt.d.ts" ]; then
    echo "❌ Error: .nuxt/nuxt.d.ts not generated"
    echo "💡 Running nuxt dev briefly to generate types..."
    timeout 30s npx nuxt dev --no-open || true
    sleep 2
fi

if [ ! -f ".nuxt/tsconfig.json" ]; then
    echo "❌ Error: .nuxt/tsconfig.json not found"
    exit 1
fi

# Step 5: Run TypeScript compilation check
echo "🔍 Running TypeScript checks..."
echo "Checking client-side types..."
npx vue-tsc --noEmit

# Step 6: Verify build process
echo "🏗️  Testing build process..."
npx nuxt build --prerender

echo ""
echo "✅ TypeScript configuration fixes completed successfully!"
echo ""
echo "📋 Summary of changes:"
echo "   • Updated tsconfig.json with modern TypeScript configuration"
echo "   • Nuxt.config.ts with better module resolution"
echo "   • Fixed structured data script syntax (innerHTML instead of children)"
echo "   • Added comprehensive type checking and strict mode"
echo "   • Optimized build configuration for production"
echo ""
echo "🚀 Your portfolio is now ready with:"
echo "   • Strict TypeScript checking"
echo "   • Proper Nuxt 3 auto-imports"
echo "   • Modern ES2022 target"
echo "   • SEO and performance optimizations"
echo ""
echo "💡 Next steps:"
echo "   1. Update your pages/index.vue with the fixed structured data scripts"
echo "   2. Run 'npm run dev' to start development server"
echo "   3. Run 'npm run lint' to verify code quality"
echo ""
