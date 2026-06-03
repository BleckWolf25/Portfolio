<template>
  <!--
    WhatIBuildSection (§02) - areas of specialisation.

    Renders three `SpecialisationCard` components in a 1 → 3 column grid.
    Card content is computed reactively from i18n so it updates immediately
    when the user switches language.
  -->
  <section id="what-i-build" aria-labelledby="what-i-build-heading" class="py-24 bg-surface">
    <div ref="buildRef" class="w-full max-w-6xl mx-auto px-6 lg:px-8">
      <!-- Section heading -->
      <div class="build-element flex items-center gap-4 mb-12">
        <h2 id="what-i-build-heading" class="text-3xl font-bold text-text-primary font-mono">
          <span class="text-accent">02.</span> {{ $t('whatIBuild.title') }}
        </h2>
        <div class="h-px bg-(--color-border) grow max-w-xs" aria-hidden="true" />
      </div>

      <!-- Specialisation cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="card in cards" :key="card.title" class="build-element h-full">
          <SpecialisationCard
            :title="card.title"
            :description="card.description"
            :icon="card.icon"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * @file WhatIBuildSection.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Highlights the three main development disciplines: web, software, and game
 *
 * @description
 * Highlights the three main development disciplines: web, software, and game
 * development. Card content is derived from i18n strings via a computed
 * property so it reacts to language changes without a page reload.
 *
 * @since 21/05/2026
 * @updated 21/06/2026
 */
// ---------- IMPORTS
import { ref, computed } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import SpecialisationCard from '~/components/ui/SpecialisationCard.vue'
import { useI18n } from '#imports'

// ---------- COMPOSABLES
const buildRef = ref<HTMLElement | null>(null)
const { t } = useI18n()

// ---------- COMPUTED
/**
 * Reactive array of specialisation card data.
 * Recomputed whenever the active locale changes so card text is always in sync.
 */
const cards = computed(() => [
  {
    title: t('whatIBuild.webDev.title'),
    description: t('whatIBuild.webDev.description'),
    icon: 'i-heroicons-globe-alt',
  },
  {
    title: t('whatIBuild.softwareDev.title'),
    description: t('whatIBuild.softwareDev.description'),
    icon: 'i-heroicons-cpu-chip',
  },
  {
    title: t('whatIBuild.gameDev.title'),
    description: t('whatIBuild.gameDev.description'),
    icon: 'i-heroicons-puzzle-piece',
  },
])

// ---------- ANIMATIONS
useScrollAnimation(buildRef, {
  stagger: 150,
  staggerElements: '.build-element',
})
</script>
