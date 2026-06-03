<template>
  <!--
    ProjectsSection (§04) - portfolio project showcase.

    Receives the ordered `projects` array as a prop and renders each item as a
    `ProjectCard` inside a responsive CSS grid (1 → 2 → 3 columns).
    Filtering uses a two-phase fade (out → swap data → in) to guarantee
    zero flicker - CSS Grid + TransitionGroup leave-absolute is inherently buggy.
  -->
  <section id="projects" aria-labelledby="projects-heading" class="py-24 bg-surface">
    <div ref="projectsRef" class="w-full max-w-6xl mx-auto px-6 lg:px-8">
      <!-- Section heading -->
      <div class="project-element flex items-center gap-4 mb-12">
        <h2 id="projects-heading" class="text-3xl font-bold text-text-primary font-mono">
          <span class="text-accent">04.</span> {{ $t('projects.title') }}
        </h2>
        <div class="h-px bg-(--color-border) grow max-w-xs" aria-hidden="true" />
      </div>

      <!-- Filter Buttons Row -->
      <div class="project-element flex flex-wrap gap-3 mb-10">
        <button
          v-for="filter in filters"
          :key="filter.key"
          class="px-4 py-2 text-xs font-mono rounded border transition-all duration-300 cursor-pointer flex items-center gap-2"
          :class="
            activeFilter === filter.key
              ? 'bg-accent-dim border-accent text-accent shadow-[0_0_15px_var(--color-accent-dim)]'
              : 'border-border text-text-secondary hover:text-accent hover:border-accent bg-transparent'
          "
          @click="setFilter(filter.key)"
        >
          <span
            class="w-1.5 h-1.5 rounded-full bg-accent transition-all duration-300"
            :class="activeFilter === filter.key ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
          />
          {{ $t(filter.labelKey) }}
        </button>
      </div>

      <!-- Project cards grid: two-phase fade avoids all CSS Grid + absolute positioning bugs -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 project-grid"
        :class="{ 'is-fading': isFading }"
      >
        <div
          v-for="(project, i) in displayedProjects"
          :key="project.id"
          class="project-card-wrapper h-full"
          :style="{ '--card-delay': `${i * 40}ms` }"
        >
          <ProjectCard :project="project" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * @file ProjectsSection.vue
 *
 * @version 1.1.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Renders the portfolio project cards in a responsive grid with filter animations.
 *
 * @description
 * Renders the portfolio project cards in a responsive grid. Accepts the full
 * `projects` array as a prop. Supports interactive filtering via a two-phase
 * fade transition (fade out → swap data → staggered fade in) to guarantee
 * zero flicker, since CSS Grid + TransitionGroup leave-absolute interactions
 * cause unavoidable position jumps.
 *
 * @since 22/05/2026
 * @updated 24/06/2026
 */
// ---------- IMPORTS
import { ref, computed } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import type { Project, ProjectCategory } from '~~/data/projects'
import ProjectCard from '~/components/ui/ProjectCard.vue'

// ---------- PROPS
const props = defineProps<{
  /** Ordered list of projects to display. */
  projects: Project[]
}>()

// ---------- REFS
const projectsRef = ref<HTMLElement | null>(null)

// ---------- FILTERING STATE
/** The filter key currently active in the UI. */
const activeFilter = ref<'all' | ProjectCategory>('all')

/**
 * The filter key that `displayedProjects` is currently computed from.
 * This lags behind `activeFilter` during the fade-out phase so the old
 * set of cards stays visible until they have fully faded out.
 */
const committedFilter = ref<'all' | ProjectCategory>('all')

/** Whether the grid is in its fade-out phase. */
const isFading = ref<boolean>(false)

/** Duration in ms that matches the CSS fade-out transition. */
const FADE_OUT_MS = 200 as const

const filters = [
  { key: 'all', labelKey: 'projects.filterAll' },
  { key: 'systems', labelKey: 'projects.filterSystems' },
  { key: 'frontend', labelKey: 'projects.filterFrontend' },
  { key: 'fullstack', labelKey: 'projects.filterFullstack' },
] as const

/** Cards actually rendered - always trails behind `activeFilter` to prevent flicker. */
const displayedProjects = computed<Project[]>(() => {
  if (committedFilter.value === 'all') return props.projects
  return props.projects.filter((p) => p.category === committedFilter.value)
})

// ---------- FILTER SWITCHING LOGIC
/**
 * Two-phase filter switch:
 *   Phase 1 - set `isFading = true` so CSS fades cards out (FADE_OUT_MS).
 *   Phase 2 - update `committedFilter` (DOM swap) then clear `isFading`
 *              so the new cards fade back in via CSS animation.
 *
 * This approach avoids CSS Grid + position:absolute flicker entirely because
 * the grid layout never changes while items are mid-transition.
 */
function setFilter(key: 'all' | ProjectCategory): void {
  if (key === committedFilter.value) return

  activeFilter.value = key
  isFading.value = true

  setTimeout(() => {
    committedFilter.value = key
    isFading.value = false
  }, FADE_OUT_MS)
}

// ---------- ANIMATIONS
useScrollAnimation(projectsRef, {
  stagger: 150,
  staggerElements: '.project-element',
})
</script>

<style scoped>
.project-grid {
  /* Reserve space to avoid jump when grid shrinks/grows between phases */
  min-height: 200px;
}

/* Phase 1: fade all cards out */
.project-grid.is-fading .project-card-wrapper {
  opacity: 0;
  transform: scale(0.97) translateY(-8px);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

/* Phase 2: animate new cards in with stagger */
.project-grid:not(.is-fading) .project-card-wrapper {
  opacity: 1;
  transform: scale(1) translateY(0);
  transition:
    opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1) var(--card-delay, 0ms),
    transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) var(--card-delay, 0ms);
}
</style>
