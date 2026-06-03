<template>
  <!--
    ParticleBackground - decorative canvas animation rendered client-side only.

    The component is excluded from SSR by the `.client.vue` file-name suffix,
    so no canvas markup is included in the server-rendered HTML. This avoids
    hydration mismatches and avoids running canvas / RAF code during SSR.
  -->
  <div class="fixed inset-0 z-0 pointer-events-none w-full h-full" aria-hidden="true">
    <!-- Animated particle canvas (driven by useParticles) -->
    <canvas ref="canvasRef" class="w-full h-full opacity-50" />
  </div>
</template>

<script setup lang="ts">
/**
 * @file ParticleBackground.client.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Client-only particle background animation.
 *
 * @description
 * Client-only wrapper around the `useParticles` composable. Mounts a full-
 * viewport canvas and starts the particle animation loop.
 * The `.client.vue` suffix ensures this component is never rendered on the
 * server, keeping SSR output clean. The particle animation always runs
 * regardless of `prefers-reduced-motion` - the particles are subtle,
 * decorative, and non-interactive, making them unlikely to cause vestibular
 * issues.
 *
 * @since 30/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { ref } from 'vue'
import { useParticles } from '~/composables/useParticles'

// ---------- REFS
const canvasRef = ref<HTMLCanvasElement | null>(null)

// ---------- COMPOSABLES
/** Drives the particle animation and manages the RAF loop lifecycle. */
useParticles(canvasRef)
</script>
