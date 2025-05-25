/**
 * @file SLIDE IN ON SCROLL.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Slide In On Scroll Animation
 * Smoothly slides elements into view from various directions as they enter viewport
 * Supports multiple slide patterns, staggering, and performance optimizations
 */

// ------------ IMPORTS
import { observeOnce, cleanupObservers } from '../utils/observers.js'
import { createStaggeredTimer, createAnimationTimer, cleanupTimers } from '../utils/timers.js'
import { presets, back } from '../utils/easing.js'

// ------------ DEFAULT CONFIGURATION
const DEFAULT_CONFIG = {
  duration: 700,           // Animation duration in milliseconds
  delay: 0,               // Initial delay before animation starts
  distance: 60,           // Distance to slide (in pixels)
  direction: 'left',      // Direction: 'left', 'right', 'up', 'down', 'diagonal-up-left', etc.
  easing: presets.slide,  // Easing function for smooth motion
  threshold: 0.15,        // Intersection threshold (0-1)
  rootMargin: '0px 0px -80px 0px', // Root margin for triggering
  stagger: 0,             // Stagger delay between multiple elements (ms)
  once: true,             // Only animate once per element

  // Advanced slide options
  slideType: 'translate', // 'translate', 'clip-path', 'mask' for different effects
  overshoot: false,       // Add slight bounce/overshoot effect

  // Transform properties
  opacity: {
    from: 0,              // Starting opacity
    to: 1,                // Ending opacity
    enabled: true         // Whether to animate opacity alongside slide
  },

  // Scale effect during slide (subtle zoom)
  scale: {
    from: 0.95,           // Starting scale
    to: 1,                // Ending scale
    enabled: false        // Whether to include scale animation
  },

  // Rotation effect during slide
  rotation: {
    from: 0,              // Starting rotation in degrees
    to: 0,                // Ending rotation in degrees
    enabled: false        // Whether to include rotation
  }
}


// ------------ SLIDE DIRECTIONS
const SLIDE_DIRECTIONS = {

  // Cardinal directions
  left: { x: -1, y: 0, angle: 0 },
  right: { x: 1, y: 0, angle: 0 },
  up: { x: 0, y: -1, angle: 0 },
  down: { x: 0, y: 1, angle: 0 },

  // Diagonal directions
  'diagonal-up-left': { x: -0.707, y: -0.707, angle: -45 },
  'diagonal-up-right': { x: 0.707, y: -0.707, angle: 45 },
  'diagonal-down-left': { x: -0.707, y: 0.707, angle: 45 },
  'diagonal-down-right': { x: 0.707, y: 0.707, angle: -45 },

  // Curved paths (for advanced animations)
  'curve-left': { x: -1, y: 0, angle: 0, curve: true },
  'curve-right': { x: 1, y: 0, angle: 0, curve: true }
}

// ------------ SLIDE IN ON SCROLL FUNCTION
/**
 * Initialize slide-in animation for elements
 * @param {string|NodeList|Element} selector - Elements to animate
 * @param {Object} options - Animation configuration options
 * @returns {Object} Animation control object with cleanup and control methods
 */
export function slideInOnScroll(selector, options = {}) {
  const config = { ...DEFAULT_CONFIG, ...options }

  // Validate and get elements
  const elements = getElements(selector)
  if (!elements || elements.length === 0) {
    console.warn(`slideInOnScroll: No elements found for selector: ${selector}`)
    return createEmptyController()
  }

  // Validate slide direction
  if (!SLIDE_DIRECTIONS[config.direction]) {
    console.warn(`slideInOnScroll: Invalid direction "${config.direction}". Using "left" as fallback.`)
    config.direction = 'left'
  }

  // Initialize elements with starting styles
  const initializedElements = Array.from(elements).map(element => {
    initializeElement(element, config)
    return element
  })

  let observer = null
  let staggerTimer = null
  let individualTimers = []

  // Setup animation based on stagger configuration
  if (config.stagger > 0) {
    observer = createStaggeredObserver(initializedElements, config, (timer) => {
      staggerTimer = timer
    })
  } else {
    observer = createIndividualObserver(initializedElements, config, (timers) => {
      individualTimers = timers
    })
  }

  // Return comprehensive control object
  return createController(observer, staggerTimer, individualTimers, initializedElements, config)
}

/**
 * Get elements from various selector types with validation
 * @param {string|NodeList|Element} selector - Element selector
 * @returns {Array} Array of valid DOM elements
 */
function getElements(selector) {
  try {
    if (typeof selector === 'string') {
      return document.querySelectorAll(selector)
    } else if (selector instanceof NodeList || Array.isArray(selector)) {
      return Array.from(selector).filter(el => el instanceof Element)
    } else if (selector instanceof Element) {
      return [selector]
    }
    return null
  } catch (error) {
    console.error('slideInOnScroll: Error getting elements:', error)
    return null
  }
}

/**
 * Initialize element with starting animation styles
 * @param {Element} element - Element to initialize
 * @param {Object} config - Animation configuration
 */
function initializeElement(element, config) {
  // Store original styles for cleanup/reset
  if (!element._slideOriginalStyles) {
    element._slideOriginalStyles = {
      opacity: element.style.opacity || '',
      transform: element.style.transform || '',
      visibility: element.style.visibility || '',
      clipPath: element.style.clipPath || '',
      overflow: element.style.overflow || ''
    }
  }

  // Apply initial styles based on slide type
  switch (config.slideType) {
    case 'clip-path':
      initializeClipPath(element, config)
      break
    case 'mask':
      initializeMask(element, config)
      break
    default:
      initializeTranslate(element, config)
  }
}

/**
 * Initialize element with translate-based slide
 * @param {Element} element - Element to initialize
 * @param {Object} config - Animation configuration
 */
function initializeTranslate(element, config) {
  const direction = SLIDE_DIRECTIONS[config.direction]

  // Calculate initial transform
  const translateX = direction.x * config.distance
  const translateY = direction.y * config.distance
  const rotate = config.rotation.enabled ? config.rotation.from : 0
  const scale = config.scale.enabled ? config.scale.from : 1

  // Build transform string
  let transform = `translate3d(${translateX}px, ${translateY}px, 0)`

  if (config.scale.enabled) {
    transform += ` scale(${scale})`
  }

  if (config.rotation.enabled) {
    transform += ` rotate(${rotate}deg)`
  }

  // Apply styles
  element.style.transform = transform
  element.style.opacity = config.opacity.enabled ? config.opacity.from : 1
  element.style.visibility = 'visible'
  element.style.transition = 'none'

  // Force reflow
  element.offsetHeight
}

/**
 * Initialize element with clip-path based slide
 * @param {Element} element - Element to initialize
 * @param {Object} config - Animation configuration
 */
function initializeClipPath(element, config) {
  const direction = SLIDE_DIRECTIONS[config.direction]

  // Create clip-path based on direction
  let clipPath
  if (direction.x < 0) { // sliding from left
    clipPath = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
  } else if (direction.x > 0) { // sliding from right
    clipPath = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
  } else if (direction.y < 0) { // sliding from top
    clipPath = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
  } else { // sliding from bottom
    clipPath = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
  }

  element.style.clipPath = clipPath
  element.style.opacity = config.opacity.enabled ? config.opacity.from : 1
  element.style.visibility = 'visible'
  element.style.transition = 'none'

  element.offsetHeight
}

/**
 * Initialize element with mask-based slide
 * @param {Element} element - Element to initialize
 * @param {Object} config - Animation configuration
 */
function initializeMask(element, config) {
  const direction = SLIDE_DIRECTIONS[config.direction]

  // Create CSS mask for slide effect
  let maskPosition
  if (direction.x < 0) {
    maskPosition = '-100% 0'
  } else if (direction.x > 0) {
    maskPosition = '100% 0'
  } else if (direction.y < 0) {
    maskPosition = '0 -100%'
  } else {
    maskPosition = '0 100%'
  }

  element.style.mask = `linear-gradient(white, white) ${maskPosition} / 100% 100% no-repeat`
  element.style.webkitMask = element.style.mask // Safari support
  element.style.opacity = config.opacity.enabled ? config.opacity.from : 1
  element.style.visibility = 'visible'
  element.style.transition = 'none'

  element.offsetHeight
}

/**
 * Create observer for staggered animations
 * @param {Array} elements - Elements to observe
 * @param {Object} config - Animation configuration
 * @param {Function} onTimerCreated - Callback when timer is created
 * @returns {IntersectionObserver} Observer instance
 */
function createStaggeredObserver(elements, config, onTimerCreated) {
  return observeOnce(
    elements,
    () => {
      const timer = createStaggeredTimer(
        elements,
        (element, progress) => animateElement(element, progress, config),
        {
          stagger: config.stagger,
          duration: config.duration,
          easing: config.easing
        }
      )
      timer.start()
      onTimerCreated(timer)
    },
    {
      threshold: config.threshold,
      rootMargin: config.rootMargin
    }
  )
}

/**
 * Create observer for individual element animations
 * @param {Array} elements - Elements to observe
 * @param {Object} config - Animation configuration
 * @param {Function} onTimersCreated - Callback when timers are created
 * @returns {IntersectionObserver} Observer instance
 */
function createIndividualObserver(elements, config, onTimersCreated) {
  const timers = []

  const observer = observeOnce(
    elements,
    (entry) => {
      const element = entry.target
      setTimeout(() => {
        const timer = animateElementWithTimer(element, config)
        timers.push(timer)
      }, config.delay)
    },
    {
      threshold: config.threshold,
      rootMargin: config.rootMargin
    }
  )

  onTimersCreated(timers)
  return observer
}

/**
 * Animate element with progress-based animation
 * @param {Element} element - Element to animate
 * @param {number} progress - Animation progress (0-1)
 * @param {Object} config - Animation configuration
 */
function animateElement(element, progress, config) {
  const easedProgress = config.easing(progress)

  // Handle overshoot effect
  let adjustedProgress = easedProgress
  if (config.overshoot && easedProgress > 0.8) {
    // Create slight overshoot using back easing
    const overshootProgress = (easedProgress - 0.8) / 0.2 // 0-1 for last 20%
    adjustedProgress = 0.8 + back.out(overshootProgress) * 0.2
  }

  switch (config.slideType) {
    case 'clip-path':
      animateClipPath(element, adjustedProgress, config)
      break
    case 'mask':
      animateMask(element, adjustedProgress, config)
      break
    default:
      animateTranslate(element, adjustedProgress, config)
  }
}

/**
 * Animate element using translate transforms
 * @param {Element} element - Element to animate
 * @param {number} progress - Animation progress (0-1)
 * @param {Object} config - Animation configuration
 */
function animateTranslate(element, progress, config) {
  const direction = SLIDE_DIRECTIONS[config.direction]

  // Calculate current position
  const currentDistance = config.distance * (1 - progress)
  const translateX = direction.x * currentDistance
  const translateY = direction.y * currentDistance

  // Handle curve effect for curved slide directions
  let adjustedTranslateY = translateY
  if (direction.curve && config.direction.includes('curve')) {
    // Add parabolic curve to the motion
    const curveIntensity = 20
    const curveProgress = Math.sin(progress * Math.PI)
    adjustedTranslateY += curveIntensity * curveProgress
  }

  // Build transform
  let transform = `translate3d(${translateX}px, ${adjustedTranslateY}px, 0)`

  // Add scale if enabled
  if (config.scale.enabled) {
    const scale = config.scale.from + (config.scale.to - config.scale.from) * progress
    transform += ` scale(${scale})`
  }

  // Add rotation if enabled
  if (config.rotation.enabled) {
    const rotation = config.rotation.from + (config.rotation.to - config.rotation.from) * progress
    transform += ` rotate(${rotation}deg)`
  }

  // Apply transform and opacity
  element.style.transform = transform

  if (config.opacity.enabled) {
    const opacity = config.opacity.from + (config.opacity.to - config.opacity.from) * progress
    element.style.opacity = opacity
  }

  // Clean up on completion
  if (progress >= 1) {
    element.style.transform = 'translate3d(0, 0, 0)'
    if (config.opacity.enabled) {
      element.style.opacity = config.opacity.to
    }
  }
}

/**
 * Animate element using clip-path
 * @param {Element} element - Element to animate
 * @param {number} progress - Animation progress (0-1)
 * @param {Object} config - Animation configuration
 */
function animateClipPath(element, progress, config) {
  const direction = SLIDE_DIRECTIONS[config.direction]

  let clipPath
  if (direction.x < 0) { // sliding from left
    const width = progress * 100
    clipPath = `polygon(0% 0%, ${width}% 0%, ${width}% 100%, 0% 100%)`
  } else if (direction.x > 0) { // sliding from right
    const start = 100 - (progress * 100)
    clipPath = `polygon(${start}% 0%, 100% 0%, 100% 100%, ${start}% 100%)`
  } else if (direction.y < 0) { // sliding from top
    const height = progress * 100
    clipPath = `polygon(0% 0%, 100% 0%, 100% ${height}%, 0% ${height}%)`
  } else { // sliding from bottom
    const start = 100 - (progress * 100)
    clipPath = `polygon(0% ${start}%, 100% ${start}%, 100% 100%, 0% 100%)`
  }

  element.style.clipPath = clipPath

  if (config.opacity.enabled) {
    const opacity = config.opacity.from + (config.opacity.to - config.opacity.from) * progress
    element.style.opacity = opacity
  }
}

/**
 * Animate element using CSS mask
 * @param {Element} element - Element to animate
 * @param {number} progress - Animation progress (0-1)
 * @param {Object} config - Animation configuration
 */
function animateMask(element, progress, config) {
  const direction = SLIDE_DIRECTIONS[config.direction]

  let maskPosition
  if (direction.x < 0) {
    const pos = -100 + (progress * 100)
    maskPosition = `${pos}% 0`
  } else if (direction.x > 0) {
    const pos = 100 - (progress * 100)
    maskPosition = `${pos}% 0`
  } else if (direction.y < 0) {
    const pos = -100 + (progress * 100)
    maskPosition = `0 ${pos}%`
  } else {
    const pos = 100 - (progress * 100)
    maskPosition = `0 ${pos}%`
  }

  element.style.mask = `linear-gradient(white, white) ${maskPosition} / 100% 100% no-repeat`
  element.style.webkitMask = element.style.mask

  if (config.opacity.enabled) {
    const opacity = config.opacity.from + (config.opacity.to - config.opacity.from) * progress
    element.style.opacity = opacity
  }
}

/**
 * Animate element with timer-based animation
 * @param {Element} element - Element to animate
 * @param {Object} config - Animation configuration
 * @returns {Object} Timer control object
 */
function animateElementWithTimer(element, config) {
  return createAnimationTimer(
    (progress) => animateElement(element, progress, config),
    config.duration,
    config.easing
  ).start()
}

/**
 * Create animation controller object
 * @param {IntersectionObserver} observer - Observer instance
 * @param {Object} staggerTimer - Stagger timer instance
 * @param {Array} individualTimers - Individual timer instances
 * @param {Array} elements - Animated elements
 * @param {Object} config - Animation configuration
 * @returns {Object} Controller object
 */
function createController(observer, staggerTimer, individualTimers, elements, config) {
  return {
    cleanup() {
      cleanupObservers(observer)
      cleanupTimers(staggerTimer, ...individualTimers)
    },

    trigger() {
      if (config.stagger > 0) {
        const timer = createStaggeredTimer(
          elements,
          (element, progress) => animateElement(element, progress, config),
          {
            stagger: config.stagger,
            duration: config.duration,
            easing: config.easing
          }
        )
        timer.start()
      } else {
        elements.forEach((element, index) => {
          setTimeout(() => {
            animateElementWithTimer(element, config)
          }, config.delay + (index * 50))
        })
      }
    },

    reset() {
      elements.forEach(element => initializeElement(element, config))
    },

    pause() {
      if (staggerTimer && staggerTimer.stop) staggerTimer.stop()
      individualTimers.forEach(timer => timer.stop && timer.stop())
    }
  }
}

/**
 * Create empty controller for error cases
 * @returns {Object} Empty controller object
 */
function createEmptyController() {
  return {
    cleanup: () => {},
    trigger: () => {},
    reset: () => {},
    pause: () => {}
  }
}


export const slideInFromRight = (selector, options = {}) =>
  slideInOnScroll(selector, { direction: 'right', ...options })

export const slideInFromTop = (selector, options = {}) =>
  slideInOnScroll(selector, { direction: 'up', ...options })

export const slideInFromBottom = (selector, options = {}) =>
  slideInOnScroll(selector, { direction: 'down', ...options })

export const slideInDiagonal = (selector, direction = 'diagonal-up-left', options = {}) =>
  slideInOnScroll(selector, { direction, ...options })

/**
 * Advanced slide patterns with pre-configured effects
 */
export const advancedSlidePatterns = {
  // Slide with bounce effect
  slideWithBounce: (selector, direction = 'left', options = {}) =>
    slideInOnScroll(selector, {
      direction,
      overshoot: true,
      easing: back.out,
      ...options
    }),

  // Slide with scale effect
  slideWithScale: (selector, direction = 'left', options = {}) =>
    slideInOnScroll(selector, {
      direction,
      scale: { from: 0.8, to: 1, enabled: true },
      ...options
    }),

  // Slide with rotation
  slideWithRotation: (selector, direction = 'left', rotation = 10, options = {}) =>
    slideInOnScroll(selector, {
      direction,
      rotation: { from: rotation, to: 0, enabled: true },
      ...options
    }),

  // Clip-path reveal slide
  revealSlide: (selector, direction = 'left', options = {}) =>
    slideInOnScroll(selector, {
      direction,
      slideType: 'clip-path',
      duration: 800,
      ...options
    })
}
