/**
 * @file useReducedMotion.test.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Unit tests for the useReducedMotion composable.
 *
 * @description
 * Unit tests for the `useReducedMotion` composable.
 * Tests that the composable returns false during SSR, reads prefers-reduced-motion media query,
 * updates reactively, and cleans up event listeners on unmount.
 *
 * @since 01/06/2026
 * @updated 02/06/2026
 */
// @vitest-environment happy-dom
// ---------- IMPORTS
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { useReducedMotion } from '../../../app/composables/useReducedMotion'

// ---------- HELPERS
/**
 * Creates a minimal Vue component that calls useReducedMotion() and exposes
 * the returned ref so tests can inspect it.
 */
function makeTestComponent() {
  return defineComponent({
    setup() {
      const reduced = useReducedMotion()
      return { reduced }
    },
    template: '<div>{{ reduced }}</div>',
  })
}

/**
 * Creates a mock MediaQueryList that can be used to simulate matchMedia.
 */
function createMockMediaQuery(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = []

  const mql = {
    matches,
    addEventListener: vi.fn((_type: string, listener: (e: MediaQueryListEvent) => void) => {
      listeners.push(listener)
    }),
    removeEventListener: vi.fn((_type: string, listener: (e: MediaQueryListEvent) => void) => {
      const idx = listeners.indexOf(listener)
      if (idx !== -1) listeners.splice(idx, 1)
    }),
    /** Simulate the OS preference changing */
    triggerChange(newMatches: boolean) {
      const event = { matches: newMatches } as MediaQueryListEvent
      listeners.forEach((fn) => fn(event))
    },
  }

  return mql
}

// ---------- TESTS
describe('useReducedMotion', () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
  })

  afterEach(() => {
    // Restore the original matchMedia after each test
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: originalMatchMedia,
    })
    vi.restoreAllMocks()
  })

  it('returns false when prefers-reduced-motion is not set (no preference)', async () => {
    const mockMql = createMockMediaQuery(false)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue(mockMql),
    })

    const wrapper = mount(makeTestComponent())
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.reduced).toBe(false)
    wrapper.unmount()
  })

  it('returns true when prefers-reduced-motion: reduce is active', async () => {
    const mockMql = createMockMediaQuery(true)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue(mockMql),
    })

    const wrapper = mount(makeTestComponent())
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.reduced).toBe(true)
    wrapper.unmount()
  })

  it('updates reactively when the media query changes from false to true', async () => {
    const mockMql = createMockMediaQuery(false)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue(mockMql),
    })

    const wrapper = mount(makeTestComponent())
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.reduced).toBe(false)

    // Simulate the user enabling reduced motion
    mockMql.triggerChange(true)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.reduced).toBe(true)
    wrapper.unmount()
  })

  it('updates reactively when the media query changes from true to false', async () => {
    const mockMql = createMockMediaQuery(true)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue(mockMql),
    })

    const wrapper = mount(makeTestComponent())
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.reduced).toBe(true)

    // Simulate the user disabling reduced motion
    mockMql.triggerChange(false)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.reduced).toBe(false)
    wrapper.unmount()
  })

  it('removes the event listener when the component is unmounted', async () => {
    const mockMql = createMockMediaQuery(false)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: vi.fn().mockReturnValue(mockMql),
    })

    const wrapper = mount(makeTestComponent())
    await wrapper.vm.$nextTick()

    expect(mockMql.addEventListener).toHaveBeenCalledOnce()

    wrapper.unmount()

    expect(mockMql.removeEventListener).toHaveBeenCalledOnce()
    // The same listener reference must be used for both add and remove
    const addedListener = mockMql.addEventListener.mock.calls[0]![1]
    const removedListener = mockMql.removeEventListener.mock.calls[0]![1]
    expect(addedListener).toBe(removedListener)
  })

  it('queries the correct media query string', async () => {
    const mockMql = createMockMediaQuery(false)
    const matchMediaSpy = vi.fn().mockReturnValue(mockMql)
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: matchMediaSpy,
    })

    const wrapper = mount(makeTestComponent())
    await wrapper.vm.$nextTick()

    expect(matchMediaSpy).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)')
    wrapper.unmount()
  })

  it('returns false (SSR default) when matchMedia is unavailable', async () => {
    // Simulate an environment where matchMedia is not available
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: undefined,
    })

    const wrapper = mount(makeTestComponent())
    await wrapper.vm.$nextTick()

    // Should default to false (animations enabled) when API is unavailable
    expect(wrapper.vm.reduced).toBe(false)
    wrapper.unmount()
  })
})
