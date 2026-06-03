/**
 * @file useScrollSpy.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Composable to track which page section is currently in view based on scroll position.
 *
 * @description
 * Composable that tracks which page section is currently in view based on the
 * vertical scroll position. Drives the active-link highlighting in the navbar.
 * Architecture:
 * - `getActiveSection` is a pure helper that can be unit-tested independently
 * of any Vue machinery.
 * - `useScrollSpy` registers a passive scroll listener on mount and removes
 * it on unmount to avoid memory leaks.
 * - At the bottom of the page the last section is always activated, preventing
 * a situation where the final section is never highlighted because its top
 * offset is never reached.
 * - Returns `{ activeSection: ref(0) }` during SSR (no window) so
 * server-rendered HTML defaults to the first section.
 *
 * @since 14/05/2026
 * @updated 27/05/2026
 */

// ---------- IMPORTS
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

// ---------- FUNCTIONS
/**
 * Pure function: returns the index of the active section given a sorted array
 * of section top offsets and the current scroll position.
 *
 * The active section is the one whose top offset is the greatest value
 * ≤ `scrollY` - i.e. the last section whose top boundary has been crossed.
 * If `scrollY` is less than all offsets the first section (index 0) is returned.
 *
 * @param offsets - Array of section top offsets in pixels, sorted ascending
 * @param scrollY - Current vertical scroll position in pixels
 * @returns Index of the active section within `offsets`
 */
export function getActiveSection(offsets: number[], scrollY: number): number {
  if (offsets.length === 0) return 0

  let activeIndex = 0

  for (let i = 0; i < offsets.length; i++) {
    const offset = offsets[i]
    if (offset !== undefined && offset <= scrollY) {
      activeIndex = i
    } else {
      // Offsets is sorted ascending
      break
    }
  }

  return activeIndex
}

// ---------- API
/**
 * Composable that returns a reactive index indicating which section the user
 * is currently reading.
 *
 * On mount the composable reads the `offsetTop` of every element whose `id`
 * is listed in `sectionIds` and stores those values as static offsets. A
 * passive `scroll` listener then calls `getActiveSection` on every scroll
 * event and updates `activeSection` accordingly.
 *
 * A 100 px look-ahead is added to `scrollY` so a section is considered active
 * slightly before its top edge reaches the very top of the viewport.
 *
 * @param sectionIds - Ordered array of element IDs corresponding to page sections
 * @returns An object containing a reactive `activeSection` ref (index into `sectionIds`)
 */
export function useScrollSpy(sectionIds: string[]): { activeSection: Ref<number> } {
  const activeSection = ref(0)

  // Guard: SSR environmen return the default without registering any listeners
  if (typeof window === 'undefined') {
    return { activeSection }
  }

  // Offsets are now calculated dynamically in handleScroll

  function handleScroll(): void {
    // Dynamically calculate offsets to prevent stale data if the layout changes
    const currentOffsets = sectionIds.map((id) => {
      const el = document.getElementById(id)
      return el ? el.offsetTop : 0
    })

    const isAtBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50

    if (isAtBottom && currentOffsets.length > 0) {
      activeSection.value = currentOffsets.length - 1
    } else {
      activeSection.value = getActiveSection(currentOffsets, window.scrollY + 100)
    }
  }

  onMounted(() => {
    // Set the initial active section based on the current scroll position
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { activeSection }
}
