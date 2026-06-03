<template>
  <!--
    SoftSkillsSection (§06) - interpersonal and professional competencies.

    Iterates over the `skills` prop and renders each as a `SoftSkillCard` in a
    responsive 1 → 2 → 3 column grid.
  -->
  <section id="soft-skills" aria-labelledby="soft-skills-heading" class="py-24">
    <div ref="skillsRef" class="w-full max-w-6xl mx-auto px-6 lg:px-8">
      <!-- Section heading -->
      <div class="soft-skill-element flex items-center gap-4 mb-12">
        <h2 id="soft-skills-heading" class="text-3xl font-bold text-text-primary font-mono">
          <span class="text-accent">06.</span> {{ $t('softSkills.title') }}
        </h2>
        <div class="h-px bg-(--color-border) grow max-w-xs" aria-hidden="true" />
      </div>

      <!-- Soft-skill cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="skill in skills" :key="skill.id" class="soft-skill-element h-full">
          <SoftSkillCard :skill="skill" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * @file SoftSkillsSection.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Renders a grid of STAR-format soft-skill cards.
 *
 * @description
 * Renders a grid of STAR-format soft-skill cards. Accepts the full `skills`
 * array as a prop, keeping this component a pure presentational layer with
 * no data-fetching responsibility.
 *
 * @since 21/05/2026
 * @updated 21/06/2026
 */
// ---------- IMPORTS
import { ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import type { SoftSkill } from '~~/data/softSkills'
import SoftSkillCard from '~/components/ui/SoftSkillCard.vue'

// ---------- PROPS
defineProps<{
  /** Ordered list of soft skills to display. */
  skills: SoftSkill[]
}>()

// ---------- REFS
const skillsRef = ref<HTMLElement | null>(null)

// ---------- ANIMATIONS
useScrollAnimation(skillsRef, {
  stagger: 150,
  staggerElements: '.soft-skill-element',
})
</script>
