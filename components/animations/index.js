/**
 * @file INDEX.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Animation System - Main Export Module
 * Centralized exports for all animation utilities and effects
 * Provides clean imports and consistent API across the application
 */

// ------------ ANIMATION SYSTEM MODULES EXPORTS
export {
  createScrollObserver,
  observeElements,
  observeElement,
  observeOnce,
  cleanupObservers
} from '../../utils/observers.js'

export {
  linear,
  quad,
  cubic,
  quart,
  expo,
  circ,
  back,
  elastic,
  bounce,
  material,
  presets,
  createCubicBezier
} from '../../utils/easing.js'

export {
  createAnimationTimer,
  createStaggeredTimer,
  createAnimationLoop,
  debounce,
  throttle,
  delay,
  cleanupTimers
} from '../../utils/timers.js'


// ------------ ANIMATION EFFECTS EXPORTS

// Scroll Animations - Effects triggered by viewport intersection
export { fadeInOnScroll } from './scroll/fadeInOnScroll.js'
export { slideInOnScroll } from './scroll/slideInOnScroll.js'
export { counterUpOnScroll } from './scroll/counterUpOnScroll.js'

// Hover Animations - Interactive hover effects
export { buttonHoverEffect } from './hover/buttonHoverEffect.js'
export { cardLiftEffect } from './hover/cardLiftEffect.js'

// Page Animations - Page load and transition effects
export { heroLoadAnimation } from './page/heroLoadAnimation.js'

// Modal Animations - Dialog and modal-specific animations
export { modalFadeIn } from './modals/modalFadeIn.js'
export { tooltipSlideIn } from './modals/tooltipSlideIn.js'


// ------------ FUNCTIONALITY EXPORTS
/**
 * Convenience function to initialize the animation system
 * Sets up global observers and performance optimizations
 * Should be called once in your main application setup
 * @param {Object} options - Global configuration options
 * @param {boolean} options.reducedMotion - Respect user's motion preferences
 * @param {number} options.globalThreshold - Default intersection threshold
 * @param {string} options.globalRootMargin - Default root margin for observers
 * @returns {Object} Cleanup function and configuration
 */
export function initAnimationSystem(options = {}) {
  const config = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    globalThreshold: 0.1,
    globalRootMargin: '0px 0px -50px 0px',
    ...options
  }

  // Global performance optimizations
  const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'measure' && entry.name.includes('animation')) {
        // Log slow animations for debugging
        if (entry.duration > 16.67) { // Slower than 60fps
          console.warn(`Slow animation detected: ${entry.name} took ${entry.duration}ms`)
        }
      }
    }
  })

  try {
    performanceObserver.observe({ entryTypes: ['measure'] })
  } catch (error) {
    // Performance Observer not supported, continue silently
  }

  // Global cleanup function
  const cleanup = () => {
    performanceObserver.disconnect?.()
  }

  // Add cleanup to window beforeunload for better memory management
  window.addEventListener('beforeunload', cleanup)

  return {
    config,
    cleanup
  }
}

/**
 * Utility to check if animations should be reduced based on user preferences
 * @returns {boolean} True if animations should be reduced
 */
export function shouldReduceMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Apply animation with automatic reduced motion handling
 * @param {Element} element - Element to animate
 * @param {Function} animationFunction - Animation function to apply
 * @param {Function} reducedMotionFallback - Fallback for reduced motion
 */
export function applyAnimation(element, animationFunction, reducedMotionFallback = null) {
  if (shouldReduceMotion() && reducedMotionFallback) {
    reducedMotionFallback(element)
  } else if (!shouldReduceMotion()) {
    animationFunction(element)
  }
}

/**
 * Batch animation utility for better performance
 * Groups multiple DOM mutations into a single frame
 * @param {Array} animations - Array of animation functions
 * @param {Function} onComplete - Optional completion callback
 */
export function batchAnimations(animations, onComplete = null) {
  requestAnimationFrame(() => {
    // Read phase - collect all measurements
    const measurements = animations.map(anim =>
      anim.measure ? anim.measure() : null
    ).filter(Boolean)

    // Write phase - apply all mutations
    requestAnimationFrame(() => {
      animations.forEach((anim, index) => {
        if (anim.animate) {
          anim.animate(measurements[index])
        }
      })

      if (onComplete) {
        onComplete()
      }
    })
  })
}
