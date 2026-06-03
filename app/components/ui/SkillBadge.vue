<template>
  <!--
    SkillBadge - a pill-shaped badge for a single technical skill.
    When the skill has `level` or `experience` metadata a CSS tooltip is shown
    on hover using a group-relative positioning pattern. Two stacked border
    triangles create a double-border caret at the bottom of the tooltip bubble.
  -->
  <UTooltip
    v-if="skill.level"
    :open="isOpen"
    :text="$t(`skills.levels.${skill.level.toLowerCase()}`)"
  >
    <button
      type="button"
      class="skill-badge inline-flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded transition-all duration-200 text-left cursor-default"
      @mouseenter="isOpen = true"
      @mouseleave="isOpen = false"
      @focus="isOpen = true"
      @blur="isOpen = false"
      @click="handleBadgeClick"
    >
      <UIcon v-if="skill.icon" :name="skill.icon" class="w-4 h-4 text-accent" aria-hidden="true" />
      <span class="text-sm font-mono text-text-primary">{{ skill.name }}</span>
    </button>
  </UTooltip>
  <button
    v-else
    type="button"
    class="skill-badge inline-flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded transition-all duration-200 text-left cursor-default"
    @click="focusBadge"
  >
    <UIcon v-if="skill.icon" :name="skill.icon" class="w-4 h-4 text-accent" aria-hidden="true" />
    <span class="text-sm font-mono text-text-primary">{{ skill.name }}</span>
  </button>
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
 * Renders a single skill as a pill-shaped badge with an optional icon. When the
 * skill object includes `level` and/or `experience` metadata a hover tooltip
 * surfaces this information without cluttering the main badge layout.
 * The tooltip is implemented with pure CSS (group-hover) so it works without
 * JavaScript and respects pointer-events:none to avoid interfering with hover
 * on adjacent badges.
 *
 * @since 18/05/2026
 * @updated 29/06/2026
 */
// ---------- IMPORTS
import { ref } from 'vue'
import type { Skill } from '~~/data/skills'

// ---------- STATE
const isOpen = ref(false)

// ---------- PROPS
defineProps<{
  /** Skill data including the optional proficiency metadata for the tooltip. */
  skill: Skill
}>()

// ---------- METHODS
/**
 * Programmatically focuses the clicked element to guarantee mobile focus.
 *
 * @param event - The pointer or click event.
 */
function focusBadge(event: Event) {
  if (event.currentTarget) {
    ;(event.currentTarget as HTMLElement).focus()
  }
}

/**
 * Handles the badge click/touch event, focusing the element and setting active state programmatically.
 *
 * @param event - The pointer or click event.
 */
function handleBadgeClick(event: Event) {
  focusBadge(event)
  isOpen.value = true
}
</script>

<style scoped>
.skill-badge {
  transition:
    border-color 0.2s ease,
    transform 0.1s ease;
}

.skill-badge:hover,
.skill-badge:focus,
.skill-badge:focus-within {
  outline: none;
  border-color: var(--color-accent);
}

.skill-badge:active {
  border-color: var(--color-accent);
  transform: scale(0.96);
}
</style>
