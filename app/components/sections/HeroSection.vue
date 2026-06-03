<template>
  <!--
    HeroSection - full-viewport landing section.

    Renders the owner's name, tagline, a short description, and two CTA
    buttons. Each content block is a stagger-animation element that slides up
    on first render. Inline CSS variable syntax is used here for a small number
    of one-off values that have no Tailwind alias.
  -->
  <section
    id="hero"
    aria-labelledby="hero-heading"
    class="min-h-screen flex items-center pt-20 pb-20"
  >
    <div ref="heroRef" class="w-full max-w-4xl mx-auto px-6 lg:px-8">
      <!-- Name & tagline -->
      <div class="hero-element space-y-4 mb-8">
        <p class="text-accent font-mono text-lg">
          {{ $t('hero.greeting') }}
        </p>
        <h1
          id="hero-heading"
          class="text-5xl md:text-7xl font-bold text-text-primary tracking-tight"
        >
          João Costa
        </h1>
        <h2 class="text-3xl md:text-5xl font-bold text-text-secondary font-mono">
          {{ $t('hero.tagline') }}
        </h2>
      </div>

      <!-- Description -->
      <div class="hero-element max-w-2xl mb-12">
        <p class="text-lg text-text-secondary">
          {{ $t('hero.description') }}
        </p>
      </div>

      <!-- CTA buttons -->
      <div class="hero-element flex flex-wrap gap-4">
        <!-- Primary CTA: scroll to contact -->
        <a
          href="#contact"
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white dark:text-[#0a0a0f] bg-accent hover:opacity-90 active:scale-95 transition-all duration-(--duration-base) font-mono"
        >
          {{ $t('hero.cta') }}
        </a>
        <!-- Secondary CTA: scroll to projects -->
        <a
          href="#projects"
          class="inline-flex items-center justify-center px-6 py-3 border border-accent text-base font-medium rounded-md text-accent hover:bg-accent-dim transition-colors duration-(--duration-base) font-mono"
        >
          {{ $t('hero.secondaryCta') }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * @file HeroSection.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Landing section occupying the full viewport height.
 *
 * @description
 * Landing section occupying the full viewport height. Presents the owner's
 * name, professional tagline, and two anchor-based CTA buttons. All visible
 * text blocks are wrapped in stagger-animation elements that reveal
 * sequentially on page load via `useScrollAnimation`.
 *
 * @since 20/05/2026
 * @updated 21/05/2026
 */
// ---------- IMPORTS
import { ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

// ---------- REFS
const heroRef = ref<HTMLElement | null>(null)

// ---------- ANIMATIONS
useScrollAnimation(heroRef, {
  stagger: 150,
  staggerElements: '.hero-element',
  translateY: 20,
})
</script>
