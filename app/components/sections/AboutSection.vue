<template>
  <!--
    AboutSection (§01) - brief personal introduction.

    Layout: a 5-column grid with a 3-column prose block on the left and a
    decorative icon on the right (hidden on small screens).
  -->
  <section id="about" aria-labelledby="about-heading" class="py-24">
    <div ref="aboutRef" class="w-full max-w-4xl mx-auto px-6 lg:px-8">
      <!-- Section heading with accent-coloured numbering -->
      <div class="about-element flex items-center gap-4 mb-12">
        <h2 id="about-heading" class="text-3xl font-bold text-text-primary font-mono">
          <span class="text-accent">01.</span> {{ $t('about.title') }}
        </h2>
        <div class="h-px bg-border grow max-w-xs" aria-hidden="true" />
      </div>

      <!-- Prose + decorative icon grid -->
      <div class="about-element grid grid-cols-1 md:grid-cols-5 gap-12">
        <div class="md:col-span-3 space-y-6 text-text-secondary leading-relaxed">
          <p>{{ $t('about.p1') }}</p>
          <p>{{ $t('about.p2') }}</p>
          <p>{{ $t('about.p3') }}</p>
        </div>
        <div class="md:col-span-2 hidden md:flex items-center justify-center" aria-hidden="true">
          <UIcon
            name="i-heroicons-code-bracket-square"
            class="w-full h-full max-w-50 max-h-50 text-border"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * @file AboutSection.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Short personal introduction section with a decorative icon.
 *
 * @description
 * Displays a short personal introduction drawn from i18n strings. Animates its
 * child elements sequentially as they scroll into view via `useScrollAnimation`.
 *
 * @since 21/05/2026
 * @updated 21/05/2026
 */
// ---------- IMPORTS
import { ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

// ---------- REFS
const aboutRef = ref<HTMLElement | null>(null)

// ---------- ANIMATIONS
useScrollAnimation(aboutRef, {
  stagger: 150,
  staggerElements: '.about-element',
})
</script>
