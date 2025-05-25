/**
 * @file FADE IN ON SCROLL.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Fade In On Scroll Animation
 * Smoothly fades elements into view as they enter the viewport
 * Supports various fade directions and staggered animations
 */

// ------------ IMPORTS
import { observeOnce, cleanupObservers } from '../utils/observers.js'
import { createStaggeredTimer, cleanupTimers } from '../utils/timers.js'
import { presets, cubic } from '../utils/easing.js'

// ------------ DEFAULT CONFIGURATION
const DEFAULT_CONFIG = {
  duration: 600,           // Animation duration in milliseconds
  delay: 0,               // Initial delay before animation starts
  distance: 30,           // Distance to move during fade (in pixels)
  direction: 'up',        // Direction: 'up', 'down', 'left', 'right', 'none'
  easing: presets.fade,   // Easing function
  threshold: 0.1,         // Intersection threshold (0-1)
  rootMargin: '0px 0px -50px 0px', // Root margin for early/late triggering
  stagger: 0,             // Stagger delay between multiple elements (ms)
  once: true,             // Only animate once (don't repeat on scroll)
  opacity: {
    from: 0,              // Starting opacity
    to: 1                 // Ending opacity
  }
}

// ------------ FADE IN ON SCROLL FUNCTION
/**
 * Initialize fade-in animation for elements
 * @param {string|NodeList|Element} selector - Elements to animate
 * @param {Object} options - Animation configuration options
 * @returns {Object} Animation control object with cleanup method
 */
export function fadeInOnScroll(selector, options = {}) {
  const config = { ...DEFAULT_CONFIG, ...options }

  // Get elements based on selector type
  let elements
  if (typeof selector === 'string') {
    elements = document.querySelectorAll(selector)
  } else if (selector instanceof NodeList) {
    elements = selector
  } else if (selector instanceof Element) {
    elements = [selector]
  } else {
    console.warn('fadeInOnScroll: Invalid selector provided')
    return { cleanup: () => {} }
  }

  if (elements.length === 0) {
    console.warn(`fadeInOnScroll: No elements found for selector: ${selector}`)
    return { cleanup: () => {} }
  }

  // Initialize elements with starting styles
  const initializedElements = Array.from(elements).map(element => {
    initializeElement(element, config)
    return element
  })

  let observer = null
  let staggerTimer = null

  // Create observer based on stagger configuration
  if (config.stagger > 0) {
    // Staggered animation - observe all elements and animate with delays
    observer = observeOnce(
      initializedElements,
      () => {
        staggerTimer = createStaggeredTimer(
          initializedElements,
          (element, progress) => animateElement(element, progress, config),
          {
            stagger: config.stagger,
            duration: config.duration,
            easing: config.easing
          }
        )
        staggerTimer.start()
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin
      }
    )
  } else {
    // Individual animation - each element animates when it enters viewport
    observer = observeOnce(
      initializedElements,
      (entry) => {
        const element = entry.target
        setTimeout(() => {
          animateElementWithTimer(element, config)
        }, config.delay)
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin
      }
    )
  }

  // Return control object with cleanup method
  return {
    /**
     * Cleanup function to remove observers and stop animations
     * Should be called when component is unmounted or destroyed
     */
    cleanup() {
      cleanupObservers(observer)
      cleanupTimers(staggerTimer)
      observer = null
      staggerTimer = null
    },

    /**
     * Manually trigger animation for all elements
     * Useful for testing or programmatic control
     */
    trigger() {
      if (config.stagger > 0) {
        staggerTimer = createStaggeredTimer(
          initializedElements,
          (element, progress) => animateElement(element, progress, config),
          {
            stagger: config.stagger,
            duration: config.duration,
            easing: config.easing
          }
        )
        staggerTimer.start()
      } else {
        initializedElements.forEach((element, index) => {
          setTimeout(() => {
            animateElementWithTimer(element, config)
          }, config.delay + (index * 50)) // Small delay between elements
        })
      }
    },

    /**
     * Reset all elements to their initial state
     */
    reset() {
      initializedElements.forEach(element => {
        initializeElement(element, config)
      })
    }
  }
}

/**
 * Initialize element with starting animation styles
 * @param {Element} element - Element to initialize
 * @param {Object} config - Animation configuration
 */
function initializeElement(element, config) {
  // Store original styles for potential reset
  if (!element._originalStyles) {
    element._originalStyles = {
      opacity: element.style.opacity || '',
      transform: element.style.transform || '',
      visibility: element.style.visibility || ''
    }
  }

  // Apply initial styles
  element.style.opacity = config.opacity.from
  element.style.visibility = 'visible'

  // Apply initial transform based on direction
  const initialTransform = getInitialTransform(config.direction, config.distance)
  element.style.transform = initialTransform

  // Ensure element is ready for animation
  element.style.transition = 'none'

  // Force reflow to ensure styles are applied
  element.offsetHeight
}

/**
 * Get initial transform based on fade direction
 * @param {string} direction - Fade direction
 * @param {number} distance - Movement distance
 * @returns {string} CSS transform string
 */
function getInitialTransform(direction, distance) {
  switch (direction) {
    case 'up':
      return `translateY(${distance}px)`
    case 'down':
      return `translateY(-${distance}px)`
    case 'left':
      return `translateX(${distance}px)`
    case 'right':
      return `translateX(-${distance}px)`
    case 'none':
    default:
      return 'translateY(0)'
  }
}

/**
 * Animate element with progress-based animation
 * Used for staggered animations
 * @param {Element} element - Element to animate
 * @param {number} progress - Animation progress (0-1)
 * @param {Object} config - Animation configuration
 */
function animateElement(element, progress, config) {
  const easedProgress = config.easing(progress)

  // Interpolate opacity
  const opacity = config.opacity.from +
    (config.opacity.to - config.opacity.from) * easedProgress

  // Interpolate transform
  const distance = config.distance * (1 - easedProgress)
  const currentTransform = getInitialTransform(config.direction, distance)

  // Apply styles
  element.style.opacity = opacity
  element.style.transform = currentTransform

  // Clean up on completion
  if (progress >= 1) {
    element.style.opacity = config.opacity.to
    element.style.transform = 'none'
  }
}

/**
 * Animate element with timer-based animation
 * Used for individual element animations
 * @param {Element} element - Element to animate
 * @param {Object} config - Animation configuration
 */
function animateElementWithTimer(element, config) {
  // Use CSS transitions for smoother performance
  const transition = `opacity ${config.duration}ms ${getCSSEasing(config.easing)},
                     transform ${config.duration}ms ${getCSSEasing(config.easing)}`

  element.style.transition = transition

  // Trigger animation
  requestAnimationFrame(() => {
    element.style.opacity = config.opacity.to
    element.style.transform = 'none'
  })

  // Clean up after animation completes
  setTimeout(() => {
    element.style.transition = ''
  }, config.duration + 50)
}

/**
 * Convert easing function to CSS transition timing function
 * @param {Function} easingFunction - JavaScript easing function
 * @returns {string} CSS timing function
 */
function getCSSEasing(easingFunction) {
  // Map common easing functions to CSS equivalents
  if (easingFunction === presets.fade) return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  if (easingFunction === presets.slide) return 'cubic-bezier(0.4, 0.0, 0.2, 1)'
  if (easingFunction === presets.ui) return 'cubic-bezier(0.0, 0.0, 0.2, 1)'
  if (easingFunction === cubic.out) return 'cubic-bezier(0.33, 1, 0.68, 1)'
  if (easingFunction === cubic.inOut) return 'cubic-bezier(0.65, 0, 0.35, 1)'

  // Default to ease-out for unknown functions
  return 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
}

/**
 * Convenience function for quick fade-in setup
 * @param {string} selector - CSS selector for elements
 * @param {Object} options - Animation options
 * @returns {Object} Animation control object
 */
export function quickFadeIn(selector, options = {}) {
  return fadeInOnScroll(selector, {
    duration: 400,
    direction: 'up',
    distance: 20,
    ...options
  })
}

/**
 * Convenience function for staggered fade-in
 * @param {string} selector - CSS selector for elements
 * @param {number} stagger - Stagger delay in milliseconds
 * @param {Object} options - Additional animation options
 * @returns {Object} Animation control object
 */
export function staggeredFadeIn(selector, stagger = 100, options = {}) {
  return fadeInOnScroll(selector, {
    stagger,
    duration: 500,
    direction: 'up',
    distance: 25,
    ...options
  })
}

/**
 * Convenience function for fade-in from different directions
 */
export const fadeInDirections = {
  up: (selector, options = {}) => fadeInOnScroll(selector, { direction: 'up', ...options }),
  down: (selector, options = {}) => fadeInOnScroll(selector, { direction: 'down', ...options }),
  left: (selector, options = {}) => fadeInOnScroll(selector, { direction: 'left', ...options }),
  right: (selector, options = {}) => fadeInOnScroll(selector, { direction: 'right', ...options }),
  none: (selector, options = {}) => fadeInOnScroll(selector, { direction: 'none', ...options })
}
