<template>
  <!--
    InfiniteMarquee - hardware-accelerated infinite scrolling marquee.

    Each instance renders its skills array TWICE side-by-side inside a track
    that is animated by translateX(-50%). When the track has scrolled exactly
    one copy's width, the animation loops seamlessly back to the start.

    The outer wrapper applies edge-fade masks (left + right) and sets the
    CSS custom properties that drive the animation speed and direction.
    This avoids any v-bind() / computed ref unwrapping issues in scoped CSS.
  -->
  <div
    class="marquee-wrapper relative w-full overflow-hidden py-4 select-none"
    :style="{
      '--marquee-duration': `${speed}s`,
      '--marquee-dir': direction === 'reverse' ? 'reverse' : 'normal',
    }"
  >
    <div class="marquee-track" :class="{ 'pause-on-hover': pauseOnHover }">
      <!-- Set 1 (visible content) -->
      <div class="flex gap-6 shrink-0 items-center px-3">
        <UTooltip
          v-for="(skill, idx) in skills"
          :key="`a-${idx}`"
          :open="activeTooltipIndex === `a-${idx}`"
          :text="
            skill.level
              ? $t('skills.levelLabel', { level: $t(`skills.levels.${skill.level.toLowerCase()}`) })
              : skill.name
          "
          :delay-duration="200"
        >
          <button
            type="button"
            class="skill-pill text-left cursor-default"
            @mouseenter="activeTooltipIndex = `a-${idx}`"
            @mouseleave="activeTooltipIndex = null"
            @focus="activeTooltipIndex = `a-${idx}`"
            @blur="activeTooltipIndex = null"
            @click="handleBadgeClick($event, `a-${idx}`)"
          >
            <UIcon v-if="skill.icon" :name="skill.icon" class="w-4 h-4 shrink-0 text-accent" />
            <span class="text-sm font-mono font-medium text-text-primary whitespace-nowrap">
              {{ skill.name }}
            </span>
          </button>
        </UTooltip>
      </div>
      <!-- Set 2 (duplicate for loop) -->
      <div class="flex gap-6 shrink-0 items-center px-3" aria-hidden="true">
        <UTooltip
          v-for="(skill, idx) in skills"
          :key="`b-${idx}`"
          :open="activeTooltipIndex === `b-${idx}`"
          :text="
            skill.level
              ? $t('skills.levelLabel', { level: $t(`skills.levels.${skill.level.toLowerCase()}`) })
              : skill.name
          "
          :delay-duration="200"
        >
          <button
            type="button"
            class="skill-pill text-left cursor-default"
            tabindex="-1"
            @mouseenter="activeTooltipIndex = `b-${idx}`"
            @mouseleave="activeTooltipIndex = null"
            @focus="activeTooltipIndex = `b-${idx}`"
            @blur="activeTooltipIndex = null"
            @click="handleBadgeClick($event, `b-${idx}`)"
          >
            <UIcon v-if="skill.icon" :name="skill.icon" class="w-4 h-4 shrink-0 text-accent" />
            <span class="text-sm font-mono font-medium text-text-primary whitespace-nowrap">
              {{ skill.name }}
            </span>
          </button>
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file InfiniteMarquee.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Horizontal infinite-scrolling ticker for technology badges.
 *
 * @description
 * Creates a premium horizontal infinite-scrolling ticker for technology badges.
 * Uses hardware-accelerated CSS keyframe animation (translate3d) for 60+ FPS.
 * Animation speed and direction are passed as CSS custom properties on the
 * wrapper element (`--marquee-duration`, `--marquee-dir`). The inner
 * `.marquee-track` reads them via `var()`. This avoids the pitfall of using
 * `v-bind()` in scoped CSS with nested computed-ref property access, which
 * does NOT auto-unwrap the ref's `.value`.
 * Structure:
 * wrapper (sets CSS vars)
 * └── marquee-track (animated)
 * ├── [skills × 1]  ← visible set
 * └── [skills × 1]  ← duplicate (aria-hidden), for loop
 *
 * @since 20/05/2026
 * @updated 01/06/2026
 */
// ---------- IMPORTS
import { ref } from 'vue'
import type { Skill } from '~~/data/skills'

// ---------- PROPS
withDefaults(
  defineProps<{
    /** Skills to render in this scrolling track. */
    skills: Skill[]
    /** 'forward' = right-to-left; 'reverse' = left-to-right. */
    direction?: 'forward' | 'reverse'
    /** Duration in seconds for one full loop cycle. Higher = slower. */
    speed?: number
    /** Pause animation while the user hovers over the track. */
    pauseOnHover?: boolean
  }>(),
  {
    direction: 'forward',
    speed: 30,
    pauseOnHover: true,
  }
)

// ---------- STATE
const activeTooltipIndex = ref<string | null>(null)

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
 * @param indexKey - The unique key string for the tooltip.
 */
function handleBadgeClick(event: Event, indexKey: string) {
  focusBadge(event)
  activeTooltipIndex.value = indexKey
}
</script>

<style scoped>
.marquee-wrapper {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 40px,
    black calc(100% - 40px),
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 40px,
    black calc(100% - 40px),
    transparent
  );
}

@media (min-width: 768px) {
  .marquee-wrapper {
    mask-image: linear-gradient(
      to right,
      transparent,
      black 100px,
      black calc(100% - 100px),
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      black 100px,
      black calc(100% - 100px),
      transparent
    );
  }
}

.marquee-track {
  display: flex;
  width: max-content;
  /* animation-duration and direction come from CSS custom properties
     set by the parent wrapper via :style binding */
  animation-name: scroll-marquee;
  animation-duration: var(--marquee-duration, 30s);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: var(--marquee-dir, normal);
}

.skill-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  cursor: default;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.1s ease;
  flex-shrink: 0;
}

@media (hover: hover) {
  .pause-on-hover:hover {
    animation-play-state: paused;
  }
}

.skill-pill:hover,
.skill-pill:focus,
.skill-pill:focus-within {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 14px rgba(0, 212, 255, 0.2);
}

.skill-pill:active {
  border-color: var(--color-accent);
  background: var(--color-accent-dim);
  transform: scale(0.96);
}

@keyframes scroll-marquee {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
