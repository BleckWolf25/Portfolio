<template>
  <!--
    SoftSkillCard - STAR-format card for a single soft skill.

    Renders:
      1. Icon + skill name header (with group-hover accent highlight)
      2. Four STAR sections (Situation, Task, Action, Result), each with
         an accent-coloured label and a localised description paragraph.
  -->
  <div
    class="soft-skill-card h-full p-6 border border-border rounded-lg bg-surface group"
    tabindex="0"
  >
    <!-- Skill header: icon + name -->
    <div class="flex items-center gap-4 mb-4">
      <div
        class="p-3 rounded-md bg-background group-hover:bg-accent-dim group-focus:bg-accent-dim group-focus-within:bg-accent-dim transition-colors duration-(--duration-base)"
      >
        <UIcon :name="skill.icon" class="w-6 h-6 text-accent" aria-hidden="true" />
      </div>
      <h3
        class="text-xl font-bold text-text-primary font-mono group-hover:text-accent group-focus:text-accent group-focus-within:text-accent transition-colors duration-(--duration-base)"
      >
        {{ $t(skill.id) !== skill.id ? $t(skill.id) : skill.name }}
      </h3>
    </div>

    <!-- STAR sections -->
    <div class="space-y-3 text-xs">
      <!-- Situation -->
      <div>
        <h4 class="font-mono text-accent mb-1 uppercase text-xs">
          {{ $t('softSkill.situation') }}
        </h4>
        <p class="text-text-secondary text-sm mt-1 leading-relaxed">
          {{ $t(skill.star.situationKey) }}
        </p>
      </div>

      <!-- Task -->
      <div class="mb-4">
        <h4
          class="text-text-primary font-bold font-mono text-sm uppercase tracking-wider mb-2 flex items-center gap-2"
        >
          <UIcon
            name="i-heroicons-clipboard-document-list"
            class="w-4 h-4 text-accent"
            aria-hidden="true"
          />
          {{ $t('softSkill.task') }}
        </h4>
        <p class="text-text-secondary text-sm leading-relaxed">
          {{ $t(skill.star.taskKey) }}
        </p>
      </div>

      <!-- Action -->
      <div class="mb-4">
        <h4
          class="text-text-primary font-bold font-mono text-sm uppercase tracking-wider mb-2 flex items-center gap-2"
        >
          <UIcon name="i-heroicons-bolt" class="w-4 h-4 text-accent" aria-hidden="true" />
          {{ $t('softSkill.action') }}
        </h4>
        <p class="text-text-secondary text-sm leading-relaxed">
          {{ $t(skill.star.actionKey) }}
        </p>
      </div>

      <!-- Result -->
      <div>
        <h4
          class="text-text-primary font-bold font-mono text-sm uppercase tracking-wider mb-2 flex items-center gap-2"
        >
          <UIcon name="i-heroicons-check-badge" class="w-4 h-4 text-accent" aria-hidden="true" />
          {{ $t('softSkill.result') }}
        </h4>
        <p class="text-text-secondary text-sm leading-relaxed">
          {{ $t(skill.star.resultKey) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file SoftSkillCard.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Renders a single soft skill using the STAR
 *
 * @description
 * Renders a single soft skill using the STAR (Situation, Task, Action, Result)
 * behavioural interview framework. All STAR fields are i18n keys resolved at
 * render time so the content localises automatically with the active language.
 * The card uses CSS group-hover to coordinate accent-colour transitions across
 * the icon background and the skill name heading.
 *
 * @since 24/05/2026
 * @updated 29/05/2026
 */
// ---------- IMPORTS
import type { SoftSkill } from '~~/data/softSkills'

// ---------- PROPS
defineProps<{
  /** The soft skill data including STAR i18n key references. */
  skill: SoftSkill
}>()
</script>

<style scoped>
.soft-skill-card {
  transition:
    border-color var(--duration-base) var(--easing-out),
    transform 0.15s ease;
}

.soft-skill-card:hover,
.soft-skill-card:focus,
.soft-skill-card:focus-within {
  outline: none;
  border-color: var(--color-accent);
}

.soft-skill-card:active {
  transform: scale(0.98);
  border-color: var(--color-accent);
}
</style>
