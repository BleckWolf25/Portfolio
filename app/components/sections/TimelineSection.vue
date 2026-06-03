<template>
  <!--
    TimelineSection (§05) - professional experience history.

    Receives an unsorted `entries` array and sorts them reverse-chronologically
    in the computed property `sortedEntries`. Each entry is rendered as a
    `TimelineEntry` component which handles date formatting via `useI18n`.
  -->
  <section id="timeline" aria-labelledby="timeline-heading" class="py-24">
    <div ref="timelineRef" class="w-full max-w-4xl mx-auto px-6 lg:px-8">
      <!-- Section heading -->
      <div class="timeline-element flex items-center gap-4 mb-12">
        <h2 id="timeline-heading" class="text-3xl font-bold text-text-primary font-mono">
          <span class="text-accent">05.</span> {{ $t('timeline.title') }}
        </h2>
        <div class="h-px bg-(--color-border) grow max-w-xs" aria-hidden="true" />
      </div>

      <!-- Timeline entries list -->
      <div class="pl-4 sm:pl-8">
        <TimelineEntry
          v-for="entry in sortedEntries"
          :key="entry.id"
          :entry="entry"
          class="timeline-element"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * @file TimelineSection.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Renders a experience timeline.
 *
 * @description
 * Renders the professional experience timeline. Accepts an unordered array of
 * `TimelineItem` entries and sorts them reverse-chronologically before passing
 * each to `TimelineEntry`. This keeps sorting logic in one place and the child
 * component free of ordering concerns.
 *
 * @since 23/05/2026
 * @updated 23/06/2026
 */
// ---------- IMPORTS
import { ref, computed } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import type { TimelineItem } from '~~/data/timeline'
import TimelineEntry from '~/components/ui/TimelineEntry.vue'

// ---------- PROPS
const props = defineProps<{
  /** Unordered list of timeline entries; sorted here before rendering. */
  entries: TimelineItem[]
}>()

// ---------- REFS
const timelineRef = ref<HTMLElement | null>(null)

// ---------- COMPUTED PROPERTIES
/**
 * Parses a date string in "DD/MM/YYYY" format (or the literal "present")
 *
 * @param dateStr - Date string in "DD/MM/YYYY" or "present" format
 * @returns A sortable string
 */
function parseDateToSortKey(dateStr: string): string {
  if (dateStr === 'present') return '99999999'
  const parts = dateStr.split('/')
  if (
    parts.length === 3 &&
    parts[0] !== undefined &&
    parts[1] !== undefined &&
    parts[2] !== undefined
  ) {
    const day = parts[0].padStart(2, '0')
    const month = parts[1].padStart(2, '0')
    const year = parts[2]
    return `${year}${month}${day}`
  }
  return dateStr
}

/**
 * Returns a copy of `entries` sorted reverse-chronologically.
 *
 * Sort priority:
 *  1. Most recent `startDate` first.
 *  2. When start dates are equal, `'present'` endDate sorts before any specific month.
 *  3. Otherwise, later `endDate` sorts first.
 */
const sortedEntries = computed(() => {
  return [...props.entries].sort((a, b) => {
    const aStart = parseDateToSortKey(a.startDate)
    const bStart = parseDateToSortKey(b.startDate)
    if (aStart === bStart) {
      if (a.endDate === 'present' && b.endDate !== 'present') return -1
      if (b.endDate === 'present' && a.endDate !== 'present') return 1
      const aEnd = parseDateToSortKey(a.endDate)
      const bEnd = parseDateToSortKey(b.endDate)
      return bEnd.localeCompare(aEnd)
    }
    return bStart.localeCompare(aStart)
  })
})

// ---------- ANIMATIONS
useScrollAnimation(timelineRef, {
  stagger: 150,
  staggerElements: '.timeline-element',
})
</script>
