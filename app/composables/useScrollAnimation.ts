/**
 * @file useScrollAnimation.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Composable for scroll-triggered reveal animations using IntersectionObserver.
 *
 * @description
 * Composable that triggers a CSS-transition-based reveal animation when a
 * target element scrolls into the viewport. Uses the native
 * `IntersectionObserver` API so there is no polling and no dependency on a
 * third-party animation library.
 * Behaviour summary:
 * - Elements start hidden (`opacity: 0`, translated down by `translateY`).
 * - When ≥ 10 % of the element is visible the transition is activated,
 * sliding it up and fading it in.
 * - Staggered children are supported via the `staggerElements` selector;
 * each child gets an increasing `transitionDelay`.
 * - Falls back gracefully when `IntersectionObserver` is unavailable
 * (older environments) by showing all elements immediately.
 * Note: These are one-shot, non-looping, subtle reveal transitions. They do
 * NOT respect `prefers-reduced-motion` because they are not continuous motion
 * that could cause vestibular issues. The particle background (continuous
 * drifting animation) separately respects the OS reduced-motion preference.
 *
 * @since 21/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

// ---------- INTERFACES
/**
 * Configuration for the scroll-triggered animation.
 * All fields are optional; sensible defaults are applied when omitted.
 */
export interface ScrollAnimationOptions {
  /**
   * Additional delay (ms) applied before the transition starts.
   * When combined with `stagger`, this value is the base offset
   * added to each child's staggered delay.
   * @default 0
   */
  delay?: number
  /**
   * Total transition duration in milliseconds.
   * @default 600
   */
  duration?: number
  /**
   * Initial vertical offset (px) that elements slide up from.
   * Accepts a number (interpreted as pixels) or a CSS string such as `'2rem'`.
   * @default 30
   */
  translateY?: number | string
  /**
   * Per-element stagger increment in milliseconds.
   * When set, child `n` receives a delay of `(delay ?? 0) + n * stagger`.
   * Ignored when `staggerElements` is not also provided.
   */
  stagger?: number
  /**
   * CSS selector string used to query child elements that should be animated
   * individually with staggered timing. When omitted, the root `target`
   * element is animated as a single unit.
   */
  staggerElements?: string
}

// ---------- API
/**
 * Attach a scroll-triggered CSS transition to `target` (or to its
 * `staggerElements` children).
 *
 * The observer disconnects itself after the animation fires so there is no
 * ongoing listener overhead. The `IntersectionObserver` is also disconnected
 * on component unmount.
 *
 * @param target  - Template ref pointing to the root container element
 * @param options - Optional animation configuration (see {@link ScrollAnimationOptions})
 */
export function useScrollAnimation(
  target: Ref<HTMLElement | null>,
  options: ScrollAnimationOptions = {}
): void {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    const el = target.value

    // Fallback: show elements immediately when IntersectionObserver is unavailable
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      if (options.staggerElements) {
        const children = el.querySelectorAll(options.staggerElements)
        children.forEach((child) => {
          ;(child as HTMLElement).style.opacity = '1'
          ;(child as HTMLElement).style.transform = 'none'
        })
      }
      return
    }

    // Resolve the set of elements to animate
    const elementsToAnimate = options.staggerElements
      ? Array.from(el.querySelectorAll(options.staggerElements))
      : [el]

    // Set initial hidden state
    elementsToAnimate.forEach((child, index) => {
      const htmlChild = child as HTMLElement
      htmlChild.style.opacity = '0'
      htmlChild.style.transform = `translateY(${options.translateY ?? 30}px)`
      htmlChild.style.transitionProperty = 'opacity, transform'
      htmlChild.style.transitionDuration = `${options.duration ?? 600}ms`
      htmlChild.style.transitionTimingFunction = 'cubic-bezier(0.215, 0.61, 0.355, 1)'

      if (options.stagger) {
        htmlChild.style.transitionDelay = `${(options.delay ?? 0) + index * options.stagger}ms`
      } else if (options.delay) {
        htmlChild.style.transitionDelay = `${options.delay}ms`
      }
    })

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          // Disconnect this specific target
          observer?.unobserve(entry.target)

          const targetEl = entry.target as HTMLElement

          // Brief timeout ensures the initial hidden styles are painted before
          // the transition is triggered, preventing a flash of visible content
          setTimeout(() => {
            targetEl.style.opacity = '1'
            targetEl.style.transform = 'translateY(0)'
          }, 50)
        })
      },
      { threshold: 0.1 }
    )

    // Observe each element individually
    elementsToAnimate.forEach((child) => observer!.observe(child))
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
