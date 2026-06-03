<template>
  <div
    v-if="isVisible"
    class="startup-overlay fixed inset-0 z-99 flex items-center justify-center bg-background select-none pointer-events-none"
  >
    <!-- Background subtle radial glow -->
    <div
      class="glow-ring absolute w-64 h-64 rounded-full border border-accent/20 opacity-0 scale-50"
      aria-hidden="true"
    />

    <!-- Logo block -->
    <div
      class="brand-text text-7xl sm:text-8xl font-bold font-mono tracking-tight text-text-primary flex items-baseline relative z-10"
    >
      <span class="char-j inline-block opacity-0">J</span>
      <span class="char-c inline-block opacity-0 font-mono">C</span>
      <span class="char-dot inline-block opacity-0 text-accent font-sans">.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @file StartupScene.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Renders an introductory startup scene animation on first-time page load.
 *
 * @description
 * Renders an introductory startup scene animation on first-time page load.
 * Uses `animejs` to orchestrate entry animations for the "JC." logo:
 * - Slides 'J' from left
 * - Slides 'C' from right
 * - Drops '.' with elastic bounce
 * - Pulses a glowing ring behind the logo
 * - Shrinks and fades out the entire screen upon completion.
 *
 * @since 02/06/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { ref, onMounted } from 'vue'
import { createTimeline, animate } from 'animejs'

// ---------- EMITS
const emit = defineEmits<{
  /** Emitted when the animation sequence has finished playing and the overlay is hidden. */
  (e: 'finished'): void
}>()

// ---------- STATE
const isVisible = ref(true)

// ---------- LIFECYCLE
onMounted(() => {
  const tl = createTimeline({
    defaults: {
      ease: 'easeOutQuart',
    },
  })

  // 1. Slide and fade J from the left
  tl.add('.char-j', {
    opacity: [0, 1],
    translateX: [-40, 0],
    duration: 800,
  })

  // 2. Slide and fade C from the right (overlapping slightly)
  tl.add(
    '.char-c',
    {
      opacity: [0, 1],
      translateX: [40, 0],
      duration: 800,
    },
    '-=600'
  )

  // 3. Drop dot with elastic bounce
  tl.add(
    '.char-dot',
    {
      opacity: [0, 1],
      translateY: [-100, 0],
      duration: 1000,
      ease: 'easeOutElastic(1, 0.6)',
    },
    '-=500'
  )

  // 4. Pulse the glow ring
  tl.add(
    '.glow-ring',
    {
      opacity: [0, 1, 0],
      scale: [0.5, 1.3],
      duration: 1200,
      ease: 'easeOutCubic',
    },
    '-=1000'
  )

  // 5. Subtle scale down and fade out of the logo elements together
  tl.add(
    '.brand-text',
    {
      opacity: [1, 0],
      scale: [1, 0.95],
      duration: 600,
      ease: 'easeInQuad',
    },
    '+=600'
  )

  // Transition overlay container after logo animations complete
  tl.then(() => {
    animate('.startup-overlay', {
      opacity: 0,
      scale: 1.05,
      duration: 800,
      ease: 'easeInOutQuad',
    }).then(() => {
      isVisible.value = false
      emit('finished')
    })
  })
})
</script>
