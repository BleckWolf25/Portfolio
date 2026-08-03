<template>
  <!--
    InfiniteMarquee - hardware-accelerated infinite scrolling marquee.

    Each instance renders its skills array TWICE side-by-side inside a track
    that is animated by translateX(-50%). When the track has scrolled exactly
    one copy's width, the animation loops seamlessly back to the start.

    The outer wrapper applies edge-fade masks (left + right) and sets the
    CSS custom properties that drive the animation speed and direction.
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
        <div
          v-for="(skill, idx) in skills"
          :key="`a-${idx}`"
          class="skill-pill text-left cursor-default"
        >
          <UIcon v-if="skill.icon" :name="skill.icon" class="w-4 h-4 shrink-0 text-accent" />
          <span class="text-sm font-mono font-medium text-text-primary whitespace-nowrap">
            {{ skill.name }}
          </span>
        </div>
      </div>
      <!-- Set 2 (duplicate for loop) -->
      <div class="flex gap-6 shrink-0 items-center px-3" aria-hidden="true">
        <div
          v-for="(skill, idx) in skills"
          :key="`b-${idx}`"
          class="skill-pill text-left cursor-default"
        >
          <UIcon v-if="skill.icon" :name="skill.icon" class="w-4 h-4 shrink-0 text-accent" />
          <span class="text-sm font-mono font-medium text-text-primary whitespace-nowrap">
            {{ skill.name }}
          </span>
        </div>
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
 *
 * @since 20/05/2026
 * @updated 03/08/2026
 */
import type { Skill } from '~~/data/skills'

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

.skill-pill:hover {
  border-color: var(--color-accent);
  box-shadow: 0 0 14px rgba(0, 212, 255, 0.2);
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
