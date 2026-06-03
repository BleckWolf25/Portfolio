/**
 * @file useReducedMotion.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Composable to track the user's prefers-reduced-motion setting.
 *
 * @description
 * Composable that exposes a reactive boolean reflecting the user's
 * `prefers-reduced-motion` OS / browser preference.
 * - During SSR (when `window` is unavailable) the value defaults to `false`
 * so the server-rendered HTML ships with animations enabled.
 * - On the client it reads the current state from
 * `window.matchMedia('(prefers-reduced-motion: reduce)')` and stays in sync
 * by listening to `change` events - no polling required.
 * - The listener is removed on component unmount to prevent memory leaks.
 *
 * @since 10/05/2026
 * @updated 30/05/2026
 */
// ---------- IMPORTS
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

// ---------- API
/**
 * Returns a reactive ref that is `true` when the user has opted into reduced
 * motion, and `false` otherwise (including during SSR).
 *
 * @returns A `Ref<boolean>` that updates automatically if the OS preference
 *   changes while the component is mounted.
 */
export function useReducedMotion(): Ref<boolean> {
  const prefersReducedMotion = ref(false)

  // Stored, can pass the exact same function reference to removeEventListener
  let mediaQuery: MediaQueryList | null = null

  /**
   * Updates `prefersReducedMotion` whenever the media-query result changes.
   * Stored as a named function so it can be deregistered precisely on unmount.
   */
  function handleChange(event: MediaQueryListEvent): void {
    prefersReducedMotion.value = event.matches
  }

  onMounted(() => {
    // Guard against environments where matchMedia is unavailable (old browsers)
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    // Sync the initial value from the current media-query state
    prefersReducedMotion.value = mediaQuery.matches

    // Listen for future changes (e.g. user toggles OS setting while page is open)
    mediaQuery.addEventListener('change', handleChange)
  })

  onUnmounted(() => {
    if (mediaQuery !== null) {
      mediaQuery.removeEventListener('change', handleChange)
      mediaQuery = null
    }
  })

  return prefersReducedMotion
}
