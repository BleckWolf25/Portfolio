<template>
  <!--
    HobbiesSection (§07) - personal interests outside of work.

    Iterates over the `hobbies` array defined in the script block and renders
    each hobby as an icon + title + description row. The icon container
    highlights on group-hover to give a subtle interactive feel.
  -->
  <section id="hobbies" aria-labelledby="hobbies-heading" class="py-24 bg-surface">
    <div ref="hobbiesRef" class="w-full max-w-4xl mx-auto px-6 lg:px-8">
      <!-- Section heading -->
      <div class="hobby-element flex items-center gap-4 mb-12">
        <h2 id="hobbies-heading" class="text-3xl font-bold text-text-primary font-mono">
          <span class="text-accent">07.</span> {{ $t('hobbies.title') }}
        </h2>
        <div class="h-px bg-border grow max-w-xs" aria-hidden="true" />
      </div>

      <!-- Hobby list -->
      <div class="space-y-8">
        <div
          v-for="hobby in hobbies"
          :key="hobby.titleKey"
          class="hobby-element flex items-start gap-6 group"
        >
          <!-- Icon badge -->
          <div
            class="mt-1 w-12 h-12 shrink-0 rounded-full bg-background border border-border flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent transition-colors duration-(--duration-base)"
          >
            <UIcon :name="hobby.icon" class="w-6 h-6" aria-hidden="true" />
          </div>

          <!-- Title & description -->
          <div>
            <h3 class="text-xl font-bold text-text-primary font-mono mb-2">
              {{ $t(hobby.titleKey) }}
            </h3>
            <p class="text-text-secondary leading-relaxed">
              {{ $t(hobby.descriptionKey) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * @file HobbiesSection.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Displays personal hobbies and interests.
 *
 * @description
 * Displays personal hobbies and interests. Hobby content is defined locally
 * as an array of i18n key pairs; all visible text is resolved through `$t()`
 * so the section localises automatically when the user switches language.
 *
 * @since 21/05/2026
 * @updated 21/05/2026
 */
// ---------- IMPORTS
import { ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

// ---------- REFS
const hobbiesRef = ref<HTMLElement | null>(null)

// ---------- DATA
/**
 * Hobby entries displayed in the section.
 * Each entry references i18n keys for its title and description so the content
 * can be localised without modifying this component.
 */
const hobbies = [
  {
    titleKey: 'hobbies.gaming.title',
    descriptionKey: 'hobbies.gaming.description',
    icon: 'i-heroicons-puzzle-piece',
  },
  {
    titleKey: 'hobbies.moto.title',
    descriptionKey: 'hobbies.moto.description',
    icon: 'i-heroicons-map',
  },
  {
    titleKey: 'hobbies.coding.title',
    descriptionKey: 'hobbies.coding.description',
    icon: 'i-heroicons-code-bracket',
  },
]

// ---------- ANIMATIONS
useScrollAnimation(hobbiesRef, {
  stagger: 150,
  staggerElements: '.hobby-element',
})
</script>
