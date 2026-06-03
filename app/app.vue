<template>
  <!--
    /**
    * @file app.vue
    *
    * @version 1.0.0
    * @author Bleckwolf25
    * @license MIT
    *
    * @summary Root application shell.
    *
    * @description
    * The main application shell component. Integrates the layout frame, skip-link
    * accessibility helper, main navbar, dynamic Nuxt page router, and background
    * canvas particles.
    *
    * @since 01/05/2026
    * @updated 02/06/2026
    */

    Renders the persistent layout:
      - AppSkipLink         - keyboard-accessible skip-to-content link (visually hidden)
      - AppNavbar           - fixed top navigation with scroll-spy and language toggle
      - <main>              - page content rendered by the router via <NuxtPage>
      - ParticleBackground  - decorative canvas animation (client-only, aria-hidden)
  -->
  <UApp>
    <StartupScene v-if="showStartup" @finished="onStartupFinished" />
    <div
      id="main-content"
      class="min-h-screen bg-background font-mono text-text-primary selection:bg-accent selection:text-background"
    >
      <AppSkipLink />
      <AppNavbar />

      <main class="relative z-10 w-full overflow-hidden">
        <NuxtPage />
      </main>

      <ParticleBackground />
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import StartupScene from '~/components/ui/StartupScene.vue'

const seenIntroCookie = useCookie('seen-intro')
const showStartup = ref(!seenIntroCookie.value)

function onStartupFinished() {
  seenIntroCookie.value = 'true'
  showStartup.value = false
}

const appConfig = useAppConfig()

const accentColors = {
  emerald: { light: '#10b981', dark: '#34d399' },
  blue: { light: '#007b99', dark: '#00d4ff' }, // Project's default custom cyan/blue
  indigo: { light: '#6366f1', dark: '#818cf8' },
  rose: { light: '#f43f5e', dark: '#fb7185' },
  amber: { light: '#f59e0b', dark: '#fbbf24' },
}

const themeColors = computed(() => {
  const primary = (appConfig.ui as { colors?: { primary?: string } })?.colors?.primary || 'blue'
  return accentColors[primary as keyof typeof accentColors] || accentColors.blue
})

useSeoMeta({
  twitterTitle: 'João Costa',
  twitterDescription: 'Software Engineer Portfolio',
})

useHead(() => ({
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
  style: [
    {
      textContent: `
        :root {
          --theme-accent-light: ${themeColors.value.light};
          --theme-accent-dark: ${themeColors.value.dark};
          --theme-accent-dim-light: color-mix(in srgb, ${themeColors.value.light} 15%, transparent);
          --theme-accent-dim-dark: color-mix(in srgb, ${themeColors.value.dark} 15%, transparent);
        }
      `,
    },
  ],
  bodyAttrs: {
    class: showStartup.value ? 'overflow-hidden' : '',
  },
}))
</script>
