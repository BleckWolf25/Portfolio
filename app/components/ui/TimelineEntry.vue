<template>
  <!--
    TimelineEntry - a single row in the professional experience timeline.

    Uses a left-border + absolute-dot pattern to create the vertical line
    connecting entries. The dot and content block both animate on group-hover
    to provide tactile feedback without JavaScript.
  -->
  <div
    class="timeline-entry relative pl-8 pb-10 border-l border-border last:border-l-0 last:pb-0 group outline-none focus:outline-none"
    tabindex="0"
  >
    <!--
      Dot marker on the left border.
      Scales up and glows with the accent colour on group-hover/focus.
    -->
    <div
      class="absolute -left-1.25 top-0 w-2.5 h-2.5 rounded-full bg-border group-hover:bg-accent group-focus:bg-accent group-focus-within:bg-accent group-hover:scale-150 group-focus:scale-150 group-focus-within:scale-150 group-hover:shadow-[0_0_10px_var(--color-accent-dim)] group-focus:shadow-[0_0_10px_var(--color-accent-dim)] group-focus-within:shadow-[0_0_10px_var(--color-accent-dim)] transition-all duration-(--duration-base)"
      aria-hidden="true"
    />

    <!-- Content block -->
    <div
      class="group-hover:translate-x-2 group-focus:translate-x-2 group-focus-within:translate-x-2 transition-transform duration-(--duration-base)"
    >
      <!-- Role + date range -->
      <div class="mb-1 flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
        <h3
          class="text-xl font-bold text-text-primary font-mono group-hover:text-accent group-focus:text-accent group-focus-within:text-accent transition-colors duration-(--duration-base)"
        >
          {{
            $t(`timeline.jobs.${entry.id}.role`) !== `timeline.jobs.${entry.id}.role`
              ? $t(`timeline.jobs.${entry.id}.role`)
              : entry.role
          }}
        </h3>
        <span class="text-sm font-mono text-accent mt-1 sm:mt-0">
          {{ formattedDateRange }}
        </span>
      </div>

      <!-- Organisation name -->
      <h4 class="text-md text-text-secondary mb-4 font-medium">
        {{
          $t(`timeline.jobs.${entry.id}.organisation`) !== `timeline.jobs.${entry.id}.organisation`
            ? $t(`timeline.jobs.${entry.id}.organisation`)
            : entry.organisation
        }}
      </h4>

      <!-- Role description -->
      <p class="text-text-secondary text-sm leading-relaxed">
        {{
          $t(`timeline.jobs.${entry.id}.description`) !== `timeline.jobs.${entry.id}.description`
            ? $t(`timeline.jobs.${entry.id}.description`)
            : entry.description
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file TimelineEntry.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Work experience entry for the vertical timeline in the "Experience" section.
 *
 * @description
 * Renders a single experience entry as part of the vertical
 * timeline. Formats the `startDate` and `endDate` ISO month strings into a
 * human-readable, locale-aware range (e.g. "Jan 2023 - Dec 2023") using the
 * browser's `Intl.DateTimeFormat` API via `Date.toLocaleDateString`.
 * The sentinel value `'present'` is resolved to the active locale's translation
 * of "Present" via `$t('timeline.present')`.
 *
 * @since 25/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { computed } from 'vue'
import { useI18n } from '#imports'
import type { TimelineItem } from '~~/data/timeline'

// ---------- PROPS
const props = defineProps<{
  /** The timeline entry to render. */
  entry: TimelineItem
}>()

// ---------- COMPOSABLES
const { t } = useI18n()

// ---------- COMPUTED
/**
 * Formats a single date string (`'DD/MM/YYYY'`) or the sentinel `'present'`
 * into a localised display string.
 *
 * @param dateStr - Date string in `'DD/MM/YYYY'` or `'present'` format
 * @returns A DD/MM/YYYY formatted string, or the localised word for "Present"
 */
function formatMonth(dateStr: string): string {
  if (dateStr === 'present') return t('timeline.present')
  const parts = dateStr.split('/')
  if (
    parts.length === 3 &&
    parts[0] !== undefined &&
    parts[1] !== undefined &&
    parts[2] !== undefined
  ) {
    const day = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1
    const year = parseInt(parts[2], 10)
    const date = new Date(year, month, day)
    if (!isNaN(date.getTime())) {
      const pad = (num: number) => String(num).padStart(2, '0')
      return `${pad(day)}/${pad(month + 1)}/${year}`
    }
  }
  // Fallback: return the raw string when it cannot be parsed
  return dateStr
}

/**
 * Human-readable date range built from the entry's start and end dates.
 * Example output: `'23/08/2023 - 01/01/2026'` or `'23/08/2023 - Present'`.
 */
const formattedDateRange = computed(
  () => `${formatMonth(props.entry.startDate)} - ${formatMonth(props.entry.endDate)}`
)
</script>
