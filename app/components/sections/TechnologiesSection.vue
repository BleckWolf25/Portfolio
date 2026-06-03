<template>
  <!--
    TechnologiesSection (§03) - technical skills catalogue.

    Iterates over the `categories` prop and renders each group as a heading
    followed by a wrapping row of `SkillBadge` components. Category labels are
    resolved through `$t()` to support localisation; the raw label is used as a
    fallback if the i18n key is missing.
  -->
  <section id="technologies" aria-labelledby="tech-heading" class="py-24">
    <div class="w-full max-w-4xl mx-auto px-6 lg:px-8">
      <!-- Section heading - subtle fade-in via useScrollAnimation -->
      <div ref="headingRef" class="flex items-center gap-4 mb-12">
        <h2 id="tech-heading" class="text-3xl font-bold text-text-primary font-mono">
          <span class="text-accent">03.</span> {{ $t('technologies.title') }}
        </h2>
        <div class="h-px bg-(--color-border) grow max-w-xs" aria-hidden="true" />
      </div>

      <!-- Infinite Marquees Showcase - always visible, no scroll-reveal hidden -->
      <div class="mb-16 space-y-4">
        <h3 class="text-xs font-mono uppercase tracking-widest text-text-secondary mb-4">
          {{ $t('technologies.showcase') }}
        </h3>
        <InfiniteMarquee :skills="coreSkills" direction="forward" :speed="35" />
        <InfiniteMarquee :skills="coreSkills" direction="reverse" :speed="28" />
      </div>

      <!-- Skill categories - always visible so tooltips work immediately -->
      <div class="space-y-12">
        <div v-for="category in categories" :key="category.id" class="category-block">
          <!-- Category heading, falls back to the raw label if the i18n key is missing -->
          <h3 class="text-xl font-bold text-text-primary font-mono mb-6">
            {{ $t(category.label) || category.label }}
          </h3>
          <!-- Skill badges row -->
          <div class="flex flex-wrap gap-4">
            <SkillBadge v-for="skill in category.skills" :key="skill.name" :skill="skill" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * @file TechnologiesSection.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Renders the technical-skills catalogue grouped by category.
 *
 * @description
 * Renders the technical-skills catalogue grouped by category. Accepts the
 * `categories` array as a prop and delegates badge rendering to `SkillBadge`,
 * which surfaces the proficiency tooltip.
 * Extracts high-proficiency skills (Expert / Intermediate) and feeds them to
 * two `InfiniteMarquee` instances scrolling in opposite directions.
 * Key design decision: skill categories are NOT hidden initially by the JS
 * IntersectionObserver scroll-reveal system. Instead they use a pure-CSS
 * `@keyframes` entrance so tooltips are always accessible and there is no
 * risk of the observer failing to fire. Only the section heading uses the
 * shared `useScrollAnimation` composable.
 *
 * @since 20/05/2026
 * @updated 29/05/2026
 */
// ---------- IMPORTS
import { ref, computed } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import type { SkillCategory, Skill } from '~~/data/skills'
import SkillBadge from '~/components/ui/SkillBadge.vue'
import InfiniteMarquee from '~/components/ui/InfiniteMarquee.vue'

// ---------- PROPS
const props = defineProps<{
  /** Ordered list of skill categories to render. */
  categories: SkillCategory[]
}>()

// ---------- REFS
const headingRef = ref<HTMLElement | null>(null)

// ---------- COMPUTED PROPERTIES
const coreSkills = computed(() => {
  const list: Skill[] = []
  const seen = new Set<string>()

  for (const cat of props.categories) {
    for (const skill of cat.skills) {
      if (skill.level && skill.level === 'Proficient') {
        if (!seen.has(skill.name)) {
          seen.add(skill.name)
          list.push(skill)
        }
      }
    }
  }

  return list
})

// ---------- ANIMATIONS
useScrollAnimation(headingRef)
</script>

<style scoped>
/* Staggered entrance for each category block via pure CSS - no JS observer,
   no initial opacity:0 hiding. Elements are immediately in the layout so
   tooltips and interactions work from page load. */
.category-block {
  animation: category-reveal 0.55s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}

.category-block:nth-child(1) {
  animation-delay: 0.05s;
}
.category-block:nth-child(2) {
  animation-delay: 0.13s;
}
.category-block:nth-child(3) {
  animation-delay: 0.21s;
}
.category-block:nth-child(4) {
  animation-delay: 0.29s;
}
.category-block:nth-child(5) {
  animation-delay: 0.37s;
}
.category-block:nth-child(6) {
  animation-delay: 0.45s;
}
.category-block:nth-child(7) {
  animation-delay: 0.53s;
}
.category-block:nth-child(8) {
  animation-delay: 0.61s;
}

@keyframes category-reveal {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
