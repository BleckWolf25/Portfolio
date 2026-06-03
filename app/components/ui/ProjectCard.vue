<template>
  <!--
    ProjectCard - a single portfolio project displayed as a card.

    Layout (top → bottom):
      1. Name + status badge (open-source / confidential)
      2. Localised description paragraph
      3. Tech-stack badge row
      4. Action links: Live Demo (when liveUrl present) and/or Repository (open-source only)
  -->
  <div
    class="project-card border border-border rounded-lg p-6 bg-surface transition-all duration-300 ease-out flex flex-col h-full"
    tabindex="0"
  >
    <!-- Name and status badge -->
    <div class="flex justify-between items-start mb-4 gap-4">
      <h3 class="text-xl font-bold text-text-primary font-mono">
        {{
          $t(`projects.list.${project.id}.name`) !== `projects.list.${project.id}.name`
            ? $t(`projects.list.${project.id}.name`)
            : project.name
        }}
      </h3>
      <span
        class="px-2 py-1 text-xs font-mono rounded whitespace-nowrap"
        :class="
          project.status === 'open-source'
            ? 'bg-green-500/20 text-green-400'
            : 'bg-yellow-500/20 text-yellow-400'
        "
      >
        {{
          project.status === 'open-source' ? $t('project.openSource') : $t('project.confidential')
        }}
      </span>
    </div>

    <!-- Description (resolved via i18n key stored in the data file) -->
    <p class="text-text-secondary mb-6 text-sm grow">
      {{ $t(project.descriptionKey) }}
    </p>

    <!-- Tech-stack badges -->
    <div class="flex flex-wrap gap-2 mb-6">
      <span
        v-for="tech in project.techStack"
        :key="tech"
        class="text-xs px-2 py-1 bg-background text-accent rounded border border-accent-dim hover:bg-accent-dim hover:text-white transition-colors duration-200 cursor-default"
      >
        {{ tech }}
      </span>
    </div>

    <!-- Action links row: Live Demo and/or Repository -->
    <div
      v-if="project.liveUrl || (project.status === 'open-source' && project.repositoryUrl)"
      class="mt-auto flex flex-wrap items-center gap-4"
    >
      <!-- Live Demo link -->
      <a
        v-if="project.liveUrl"
        :href="project.liveUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="group inline-flex items-center gap-2 text-sm text-accent hover:text-white transition-colors duration-200"
        :aria-label="$t('project.liveDemo')"
      >
        <UIcon
          name="i-heroicons-arrow-top-right-on-square"
          aria-hidden="true"
          class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        <span
          class="border-b border-transparent group-hover:border-white transition-colors duration-200"
        >
          {{ $t('project.liveDemo') }}
        </span>
      </a>

      <!-- Repository link (open-source only) -->
      <a
        v-if="project.status === 'open-source' && project.repositoryUrl"
        :href="project.repositoryUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="group inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-200"
        :aria-label="$t('project.viewRepository')"
      >
        <UIcon
          name="i-heroicons-code-bracket"
          aria-hidden="true"
          class="transition-transform duration-200 group-hover:scale-110"
        />
        <span
          class="border-b border-transparent group-hover:border-accent transition-colors duration-200"
        >
          {{ $t('project.viewRepository') }}
        </span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file ProjectCard.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Presentational card component for a single portfolio project.
 *
 * @description
 * Presentational card component for a single portfolio project. Receives a
 * fully-typed `Project` object and renders all its fields - name, localised
 * description, tech-stack badges, status badge, and (when available) a link to
 * the public repository.
 * All text content that varies by locale is resolved through `$t()` using the
 * i18n key stored on the `Project` object, so no raw strings are embedded here.
 *
 * @since 16/05/2026
 * @updated 20/05/2026
 */
// ---------- IMPORTS
import type { Project } from '~~/data/projects'

// ---------- PROPS
defineProps<{
  /** The project data to render. */
  project: Project
}>()
</script>

<style scoped>
.project-card:hover,
.project-card:focus,
.project-card:focus-within {
  outline: none;
  border-color: var(--color-accent);
  transform: translateY(-6px);
  box-shadow: 0 10px 30px -10px rgba(0, 212, 255, 0.15);
  background-color: var(--color-surface);
}

.project-card:active {
  transform: scale(0.98);
  border-color: var(--color-accent);
}
</style>
