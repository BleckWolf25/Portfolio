/**
 * @file nuxt.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary Nuxt 4 configuration for the portfolio application.
 *
 * @description
 * Designed with the following goals in mind:
 *  - SSR enabled for SEO and performance. The home route is pre-rendered at
 *    build time via Nitro's prerenderer.
 *  - `@nuxt/ui` provides the design-system primitives (icons, colour mode).
 *  - `@nuxtjs/i18n` handles English / Portuguese localisation with a
 *    `no_prefix` URL strategy so language switching does not change the path.
 *  - `@nuxt/image` serves images in WebP format via the `ipx` provider,
 *    which is bundled automatically when the `sharp` binary is available.
 *  - `@nuxtjs/seo` auto-generates `sitemap.xml`, `robots.txt`, and OG/Twitter
 *    social-card meta tags from the `site` configuration block below.
 *
 * @since 10/05/2026
 * @updated 03/06/2026
 *
 * @see https://nuxt.com/modules/ui
 * @see https://nuxt.com/modules/i18n
 * @see https://nuxt.com/modules/image
 * @see https://nuxt.com/modules/seo
 */
// ---------- IMPORTS
import { defineNuxtConfig } from 'nuxt/config'

// ---------- NUXT CONFIG
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  ssr: true,

  // Comprehensive TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: 'build',
    includeWorkspace: true,

    // Configures frontend app context (.nuxt/tsconfig.app.json)
    tsConfig: {
      compilerOptions: {
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'Bundler',

        // Core Strictness
        alwaysStrict: true,
        noImplicitAny: true,
        noImplicitThis: true,

        // Advanced Type Safety
        exactOptionalPropertyTypes: true,
        noUncheckedIndexedAccess: true,
        useUnknownInCatchVariables: true,

        // Code Quality & Flow Analysis
        noUnusedLocals: true,
        noUnusedParameters: true,
        noImplicitReturns: true,
        noFallthroughCasesInSwitch: true,

        allowImportingTsExtensions: false,
        verbatimModuleSyntax: false,
      },
    },
  },

  features: {
    // Inlines all component styles directly into the server-rendered HTML
    inlineStyles: true,
  },

  // Nitro configuration for production optimization
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true,
    minify: true,
    prerender: { routes: ['/'] },
    // This app is entirely static, I don't need any server-side API routes or anything else.
  },

  // Advanced Caching & Routing Rules
  routeRules: {
    // Cache static fonts for 1 year (immutable)
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },

    // Cache standard assets (images, icons) for 1 month
    '/img/**': { headers: { 'cache-control': 'public, max-age=2592000, immutable' } },
    '/favicon.ico': { headers: { 'cache-control': 'public, max-age=86400' } },

    // API responses caching if applicable
    '/api/**': { cors: true, headers: { 'cache-control': 'max-age=60' } },
  },

  // Nuxt modules
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@vercel/speed-insights/nuxt',
    '@vercel/analytics/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-security',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/a11y',
  ],

  /**
   * Site-wide metadata consumed by `@nuxtjs/seo` to generate the sitemap,
   * robots.txt, and Open Graph / Twitter card meta tags.
   */
  site: {
    url: 'https://joaoccosta.vercel.app',
    name: 'João Costa',
    description: 'Software Engineer',
    defaultLocale: 'en',
  },

  /**
   * Exclude the site's own live URL from the link checker's `absolute-site-urls`
   * rule. The URL appears in `data/projects.ts` as the Portfolio project's
   * `liveUrl` — it is intentionally absolute because it points to the live
   * deployment of this very site used as a demo link in a project card.
   */
  linkChecker: {
    excludeLinks: ['https://joaoccosta.vercel.app'],
  },

  /**
   * Force WebP output for all images processed through `<NuxtImg>`.
   * The `ipx` provider is the default and works without additional
   * infrastructure, it processes images on-demand at runtime.
   */
  image: {
    format: ['avif', 'webp'],
    provider: 'ipx',
  },

  // PWA configuration for offline support and installability
  pwa: {
    registerType: 'autoUpdate',

    manifest: {
      name: 'João Costa - Portfolio',
      short_name: 'JC.',
      description: 'Software Engineer Portfolio by João Costa.',

      // Dark background to match the site's colour scheme
      theme_color: '#0a0a0f',
      background_color: '#0a0a0f',

      display: 'standalone',
      start_url: '/',
      orientation: 'any',

      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          // 'maskable' lets Android shape the icon (circle, squircle, etc.)
          purpose: 'any maskable',
        },
      ],
    },

    workbox: {
      // Serve the shell when navigating to any uncached route offline
      navigateFallback: '/',

      // Pre-cache all build artefacts: JS chunks, CSS, HTML, fonts, icons
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

      runtimeCaching: [
        {
          // Local fonts - cache-first, 1 year TTL (they never change)
          urlPattern: /\/fonts\/.*/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts-cache',
            expiration: { maxAgeSeconds: 31536000 },
          },
        },
        {
          // Images - serve cached copy while fetching a fresh one in BG
          urlPattern: /\.(png|jpg|jpeg|svg|gif|webp|ico)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'images-cache',
            expiration: { maxAgeSeconds: 2592000, maxEntries: 60 },
          },
        },
      ],
    },

    // Keep the service worker silent during `nuxt dev` to prevent
    // cache interference with HMR. Flip `enabled` to true to test offline.
    devOptions: {
      enabled: false,
      type: 'module',
    },
  },

  // Nuxt Security module configuration to disable the default Content Security Policy
  security: {
    headers: {
      contentSecurityPolicy: false,
    },
  },

  // Internationalization configuration for English and Portuguese locales
  i18n: {
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'pt', file: 'pt.json' },
    ],
    defaultLocale: 'en',
    langDir: '../i18n/locales/',

    // Let the user toggle language manually rather than reading Accept-Language
    detectBrowserLanguage: false,

    // Use a single URL for all locales (language stored in a cookie/ref)
    strategy: 'no_prefix',
  },

  // Global app configuration
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        // Favicons - multi-size coverage for all platforms
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        // Apple touch icon (180×180 - shown on iOS home screen)
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        {
          // Preload the monospace subset font to avoid FOUT on first paint
          rel: 'preload',
          href: '/fonts/JetBrainsMono-subset.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
      meta: [
        // Open Graph / Facebook
        { property: 'og:image', content: 'https://joaoccosta.vercel.app/images/og-image.jpg' },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'João Costa | Software Engineer' },
        { name: 'twitter:description', content: 'Software Engineer Portfolio' },
        { name: 'twitter:image', content: 'https://joaoccosta.vercel.app/images/og-image.jpg' },
      ],
    },
  },

  // CSS main entry point for global styles. This file imports the Inter font and sets up the base styles.
  css: ['@/assets/css/main.css'],

  // Nuxt Hints configuration
  hints: {
    devtools: true,
    features: {
      hydration: true,
      lazyLoad: true,
      webVitals: true,
      thirdPartyScripts: false,
      htmlValidate: true,
    },
  },

  // Nuxt Accessibility configuration
  a11y: {
    enabled: true,
    defaultHighlight: false,
    logIssues: true,
    axe: {
      options: {},
      runOptions: {
        rules: {
          'color-contrast': { enabled: false },
        },
      },
    },
  },

  // Vite configuration for build optimizations
  vite: {
    // Strip console.log and debugger in production builds
    esbuild: {
      drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
    },
    optimizeDeps: {
      include: ['animejs'],
    },
  },
})
