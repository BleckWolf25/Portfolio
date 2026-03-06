import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,
  typescript: { strict: true },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss'
  ],
  nitro: {
    prerender: { routes: ['/'] }
  },
  runtimeConfig: {
    public: {
      siteName: 'Bleck Portfolio'
    }
  },
  app: {
    head: {
      title: 'Bleck - Software Engineer',
      meta: [
        { name: 'description', content: 'Bleck - software engineer portfolio' }
      ]
    }
  },
  css: ['@/assets/css/tailwind.css']
})
