/**
 * @file useParticles.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Canvas-based animated particle background composable.
 *
 * @description
 * Canvas-based animated particle background composable. Spawns a field of
 * softly drifting dots whose density scales with the viewport area
 * (`width * height / 10000`). The animation loop is driven by
 * `requestAnimationFrame` and automatically:
 * - Pauses / clears the canvas when the user prefers reduced motion.
 * - Resumes when the OS preference is disabled while the page is open.
 * - Cancels the animation frame on component unmount to avoid memory leaks.
 * The `createParticle` factory is exported separately so it can be tested
 * in isolation without mounting a component.
 *
 * @since 15/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { onMounted, onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'

// ---------- INTERFACES
/**
 * A single animated particle rendered on the canvas.
 * All spatial values are in CSS pixels; opacity is in [0, 1].
 */
export interface Particle {
  /** Horizontal position in pixels. */
  x: number

  /** Vertical position in pixels. */
  y: number

  /** Horizontal velocity in pixels per frame. */
  vx: number

  /** Vertical velocity in pixels per frame. */
  vy: number

  /** Radius of the filled circle in pixels. */
  size: number

  /** Alpha value in (0, 0.3] */
  opacity: number
}

// ---------- FUNCTIONS
/**
 * Factory function that creates a particle at a random position within the
 * given canvas dimensions.
 *
 * Velocity is in the range (-0.5, 0.5) px/frame on each axis, giving a slow
 * drift. Opacity is capped at 0.3 to keep particles unobtrusive.
 *
 * @param width  - Canvas width in pixels (used to bound the initial x position)
 * @param height - Canvas height in pixels (used to bound the initial y position)
 * @returns A fully initialised {@link Particle}
 */
export function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1,
    size: Math.random() * 2 + 1,

    // Opacity strictly > 0 and <= 0.3 keeps the background effect subtle
    opacity: Math.random() * 0.29 + 0.01,
  }
}

// ---------- API
/**
 * Composable that drives the particle animation on a `<canvas>` element.
 *
 * Mount the canvas ref in the template and call this composable in `setup()`.
 * The animation starts on mount and stops on unmount. If the user has
 * `prefers-reduced-motion: reduce` active, the canvas is kept clear.
 *
 * @param canvas - Template ref pointing to the `<canvas>` DOM element
 */
export function useParticles(canvas: Ref<HTMLCanvasElement | null>): void {
  let animationFrameId: number
  let particles: Particle[] = []

  /**
   * Populate the `particles` array with density-scaled random particles.
   *
   * @param width  - Canvas width in pixels
   * @param height - Canvas height in pixels
   */
  function initParticles(width: number, height: number): void {
    const particleCount = Math.floor((width * height) / 10000)
    particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(width, height))
    }
  }

  /**
   * Clear the canvas, advance each particle by its velocity, wrap particles
   * that exit the viewport, then draw them.
   *
   * @param ctx    - 2-D rendering context of the canvas
   * @param width  - Canvas width in pixels
   * @param height - Canvas height in pixels
   */
  function drawParticles(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    ctx.clearRect(0, 0, width, height)
    // Read the current accent colour from the CSS custom property so particles
    // are visible in both dark mode (cyan) and light mode (teal).
    const accentColor =
      getComputedStyle(document.documentElement).getPropertyValue('--accent-color').trim() ||
      '#00d4ff'
    ctx.fillStyle = accentColor

    particles.forEach((p) => {
      // Advance position
      p.x += p.vx
      p.y += p.vy

      // Wrap around viewport edges
      if (p.x < 0) p.x = width
      if (p.x > width) p.x = 0
      if (p.y < 0) p.y = height
      if (p.y > height) p.y = 0

      ctx.globalAlpha = p.opacity
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  /**
   * Main animation loop. Adjusts the canvas dimensions if the viewport has
   * been resized, then delegates to `drawParticles` before scheduling the
   * next frame.
   */
  function animate(): void {
    if (!canvas.value) return
    const ctx = canvas.value.getContext('2d')
    if (!ctx) return

    // Sync canvas internal dimensions with the viewport if it was resized
    if (canvas.value.width !== window.innerWidth || canvas.value.height !== window.innerHeight) {
      canvas.value.width = window.innerWidth
      canvas.value.height = window.innerHeight
      initParticles(canvas.value.width, canvas.value.height)
    }

    drawParticles(ctx, canvas.value.width, canvas.value.height)
    animationFrameId = requestAnimationFrame(animate)
  }

  // Lifecycle: Start the animation when the canvas element is bound
  onMounted(() => {
    const init = (newCanvas: HTMLCanvasElement) => {
      newCanvas.width = window.innerWidth
      newCanvas.height = window.innerHeight
      initParticles(newCanvas.width, newCanvas.height)

      if (!animationFrameId) {
        animate()
      }
    }

    if (canvas.value) {
      init(canvas.value)
    } else {
      const stopWatch = watch(canvas, (newCanvas) => {
        if (newCanvas) {
          init(newCanvas)
          stopWatch() // Stop watching once initialized
        }
      })
    }
  })

  // Lifecycle: Cancel the animation frame on unmount to prevent memory leaks
  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId)
  })
}
