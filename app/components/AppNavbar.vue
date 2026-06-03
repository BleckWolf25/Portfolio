<template>
  <!--
    AppNavbar - fixed top navigation bar.

    Renders:
      - Brand logo (home link)
      - Desktop nav: anchor links highlighted by scroll-spy active section
      - Theme toggle button (dark / light via @nuxt/color-mode)
      - Language toggle button (EN ↔ PT via @nuxtjs/i18n, with loading spinner)
      - Mobile hamburger button
      - Collapsible mobile menu (v-show driven by mobileMenuOpen)
  -->
  <header class="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Brand / Logo -->
        <div class="shrink-0">
          <a
            href="#"
            class="text-text-primary font-bold font-mono text-xl hover:text-accent transition-colors duration-(--duration-fast)"
            :aria-label="$t('nav.home')"
          >
            JC.
          </a>
        </div>

        <!-- Desktop navigation links -->
        <nav class="hidden md:flex space-x-1" :aria-label="$t('nav.mainNavigation')">
          <a
            v-for="(section, index) in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="px-3 py-2 rounded-md text-sm font-mono transition-colors duration-(--duration-fast)"
            :class="
              activeSection === index
                ? 'text-accent bg-accent-dim'
                : 'text-text-primary hover:text-accent hover:bg-surface'
            "
          >
            {{ $t(section.labelKey) }}
          </a>
        </nav>

        <!-- Action buttons: theme toggle + language toggle + mobile menu -->
        <div class="flex items-center space-x-4">
          <!-- Theme customizer -->
          <ClientOnly>
            <UDropdownMenu :items="themeDropdownItems" :popper="{ placement: 'bottom-end' }">
              <button
                class="flex items-center justify-center p-2 rounded-md text-text-primary hover:text-accent hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-(--duration-fast)"
                :aria-label="$t('nav.customizeTheme')"
              >
                <UIcon name="i-heroicons-swatch" class="w-5 h-5" />
              </button>
            </UDropdownMenu>
            <template #fallback>
              <div class="w-9 h-9" />
            </template>
          </ClientOnly>

          <!-- Theme toggle -->
          <ClientOnly>
            <button
              class="flex items-center justify-center p-2 rounded-md text-text-primary hover:text-accent hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-(--duration-fast)"
              :aria-label="$t('nav.toggleTheme')"
              @click="isDark = !isDark"
            >
              <UIcon :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="w-5 h-5" />
            </button>
            <template #fallback>
              <!-- Placeholder preserves layout during SSR -->
              <div class="w-9 h-9" />
            </template>
          </ClientOnly>

          <!-- Language toggle: EN ↔ PT -->
          <button
            class="px-2 py-1 text-xs font-mono font-bold rounded border border-border text-text-primary hover:border-accent hover:text-accent transition-colors duration-(--duration-fast) focus:outline-none focus-visible:ring-2 focus-visible:ring-accent min-w-[32px] min-h-6.5 flex items-center justify-center"
            :aria-label="$t('nav.toggleLanguage')"
            :disabled="isLoading"
            @click="toggleLanguage"
          >
            <!-- Spinner shown while the locale switch is in flight -->
            <UIcon v-if="isLoading" name="i-heroicons-arrow-path" class="w-3 h-3 animate-spin" />
            <span v-else>{{ currentLocale === 'en' ? 'EN' : 'PT' }}</span>
          </button>

          <!-- Mobile hamburger - hidden on md+ -->
          <button
            class="md:hidden flex items-center justify-center p-2 rounded-md text-text-primary hover:text-accent hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            :aria-expanded="mobileMenuOpen"
            :aria-label="$t('nav.toggleMenu')"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <UIcon
              :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
              class="w-6 h-6"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile slide-down menu -->
    <div
      v-show="mobileMenuOpen"
      id="mobile-menu"
      class="md:hidden bg-surface border-b border-border"
    >
      <nav class="px-2 pt-2 pb-3 space-y-1 sm:px-3" :aria-label="$t('nav.mobileNavigation')">
        <a
          v-for="(section, index) in sections"
          :key="section.id"
          :href="`#${section.id}`"
          class="block px-3 py-2 rounded-md text-base font-medium font-mono transition-colors duration-(--duration-fast)"
          :class="
            activeSection === index
              ? 'text-accent bg-accent-dim'
              : 'text-text-primary hover:text-accent hover:bg-background'
          "
          @click="mobileMenuOpen = false"
        >
          {{ $t(section.labelKey) }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * @file AppNavbar.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Fixed top navigation bar.
 *
 * @description
 * Fixed top navigation bar. Integrates:
 * - `useScrollSpy` - keeps `activeSection` in sync with the scrolled section
 * so the correct nav link is highlighted at all times.
 * - `useColorMode` (@nuxt/color-mode) - drives the dark / light theme toggle.
 * - `$i18n.setLocale` - switches the active locale asynchronously a loading
 * spinner is shown on the language button while the switch is in flight.
 * - A responsive mobile menu that collapses on desktop breakpoints.
 *
 * @since 10/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { ref, computed, type Ref } from 'vue'
import { useScrollSpy } from '~/composables/useScrollSpy'
import { useI18n } from '#imports'

// ---------- NUXT COMPOSABLES
const nuxtApp = useNuxtApp()
const i18n = nuxtApp.$i18n as { locale: Ref<string>; setLocale: (locale: string) => Promise<void> }
const colorMode = useColorMode()
const appConfig = useAppConfig()
const { t } = useI18n()

// ---------- THEME CUSTOMIZER
const colorOptions = [
  { label: 'Emerald', value: 'emerald' },
  { label: 'Blue', value: 'blue' },
  { label: 'Indigo', value: 'indigo' },
  { label: 'Rose', value: 'rose' },
  { label: 'Amber', value: 'amber' },
]

/**
 * Dropdown items mapping the curated colors.
 * Shows a checkmark next to the currently active primary color.
 */
const themeDropdownItems = computed(() => [
  colorOptions.map((c) => ({
    label: t(`nav.themes.${c.value}`),
    icon:
      (appConfig.ui as { colors?: { primary?: string } })?.colors?.primary === c.value
        ? 'i-heroicons-check-circle-20-solid'
        : 'i-heroicons-swatch',
    onSelect: () => {
      updateAppConfig({ ui: { colors: { primary: c.value } } })
    },
  })),
])

// ---------- LIGHT & DARK MDOE TOGGLE
/**
 * Two-way computed that maps `colorMode.value` to a boolean.
 * Setting `isDark` updates `colorMode.preference` which is persisted by
 * @nuxt/color-mode across sessions.
 */
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(val) {
    colorMode.preference = val ? 'dark' : 'light'
  },
})

// ---------- LANGUAGE
const currentLocale = computed(() => i18n.locale.value)
const isLoading = ref(false)

/**
 * Toggle between English and Portuguese. Shows a spinner on the button while
 * the async locale switch is in progress to give immediate visual feedback.
 */
async function toggleLanguage(): Promise<void> {
  const target = currentLocale.value === 'en' ? 'pt' : 'en'
  isLoading.value = true
  try {
    // Artificial delay to make the spinner visible to the user
    await new Promise((resolve) => setTimeout(resolve, 300))
    await i18n.setLocale(target)
  } finally {
    isLoading.value = false
  }
}

// ---------- MOBILE MENU
const mobileMenuOpen = ref(false)

// ---------- SCROLL SPY
/**
 * Ordered list of page sections. The `id` values must match the `id` attributes
 * on the corresponding `<section>` elements, and `labelKey` must exist in both
 * `en.json` and `pt.json`.
 */
const sections = [
  { id: 'hero', labelKey: 'nav.home' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'what-i-build', labelKey: 'nav.expertise' },
  { id: 'technologies', labelKey: 'nav.tech' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'timeline', labelKey: 'nav.timeline' },
  { id: 'soft-skills', labelKey: 'nav.skills' },
  { id: 'hobbies', labelKey: 'nav.hobbies' },
  { id: 'contact', labelKey: 'nav.contact' },
]

const { activeSection } = useScrollSpy(sections.map((s) => s.id))
</script>
