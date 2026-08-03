<template>
  <!--
    SkillBadge - a pill-shaped badge for a single technical skill.
  -->
  <div
    class="skill-badge inline-flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded transition-all duration-200 text-left select-none"
  >
    <UIcon v-if="skill.icon" :name="skill.icon" class="w-4 h-4 text-accent" aria-hidden="true" />
    <span class="text-sm font-mono text-text-primary">{{ skill.name }}</span>
  </div>
</template>

<script setup lang="ts">
/**
 * @file SkillBadge.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Renders a single skill as a pill-shaped badge with an optional icon.
 *
 * @description
 * Renders a single skill as a pill-shaped badge with an optional icon.
 *
 * @since 18/05/2026
 * @updated 03/08/2026
 */
// ---------- IMPORTS
import type { Skill } from '~~/data/skills'

defineProps<{
  /** Skill data including the name and optional icon. */
  skill: Skill
}>()
</script>

<style scoped>
.skill-badge {
  transition:
    border-color 0.2s ease,
    transform 0.1s ease;
}

.skill-badge:hover {
  border-color: var(--color-accent);
}
</style>
