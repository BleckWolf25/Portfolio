<template>
  <!--
    SpecialisationCard - a feature card highlighting an area of expertise.

    An inset gradient overlay fades in on hover to add visual depth, while the
    border transitions to the accent colour for a subtle interactive cue.
  -->
  <div
    class="specialisation-card group relative p-8 bg-surface border border-border rounded-lg hover:border-accent focus:border-accent focus-within:border-accent outline-none focus:outline-none transition-colors duration-(--duration-base) overflow-hidden h-full"
    tabindex="0"
  >
    <!-- Gradient overlay (revealed on hover/focus) -->
    <div
      class="absolute inset-0 bg-linear-to-br from-accent-dim to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 transition-opacity duration-(--duration-base)"
      aria-hidden="true"
    />

    <!-- Card content -->
    <div class="relative z-10 flex flex-col h-full">
      <!-- Icon badge -->
      <div
        class="w-14 h-14 mb-6 rounded-lg bg-background border border-accent-dim flex items-center justify-center text-accent shrink-0"
      >
        <UIcon :name="icon" class="w-8 h-8" aria-hidden="true" />
      </div>

      <!-- Title -->
      <h3 class="text-xl font-bold text-text-primary font-mono mb-4">
        {{ title }}
      </h3>

      <!-- Description -->
      <p class="text-text-secondary leading-relaxed grow">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file SpecialisationCard.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Feature card for highlighting an area of expertise.
 *
 * @description
 * Receives plain-text title, description, and an icon
 * name as props; the parent component is responsible for resolving i18n strings
 * before passing them here.
 * The hover gradient overlay is implemented purely with CSS transitions no JavaScript is required.
 *
 * @since 01/05/2026
 * @updated 02/06/2026
 */
// ---------- PROPS
defineProps<{
  /** Card headline (pre-resolved localised string). */
  title: string
  /** Card body copy (pre-resolved localised string). */
  description: string
  /** @nuxt/icon component name (e.g. `'i-heroicons-globe-alt'`). */
  icon: string
}>()
</script>
