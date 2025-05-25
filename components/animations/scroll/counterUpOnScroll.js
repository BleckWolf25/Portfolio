/**
 * @file COUNTER UP ON SCROLL.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Counter Up On Scroll Animation
 * Smoothly animates numbers from zero (or custom start) to target value
 * Supports various number formats, currency, percentages, and custom formatting
 * Triggers when elements enter the viewport with configurable thresholds
 */

// ------------ IMPORTS
import { observeOnce, cleanupObservers } from '../utils/observers.js'
import { createStaggeredTimer, createAnimationTimer, cleanupTimers } from '../utils/timers.js'
import { presets, cubic } from '../utils/easing.js'

// ------------ DEFAULT CONFIGURATION
const DEFAULT_CONFIG = {
  duration: 2000,          // Animation duration in milliseconds
  delay: 0,               // Initial delay before animation starts
  startValue: 0,          // Starting number (can be negative)
  endValue: null,         // Target value (auto-detected from element if null)
  easing: presets.ui,     // Easing function for smooth acceleration
  threshold: 0.3,         // Intersection threshold (0-1) - higher for better visibility
  rootMargin: '0px 0px -100px 0px', // Root margin for triggering
  stagger: 200,           // Stagger delay between multiple counters (ms)
  once: true,             // Only animate once (don't repeat on scroll)

  // Number formatting options
  format: {
    type: 'number',       // 'number', 'currency', 'percent', 'custom'
    decimals: 0,          // Number of decimal places
    separator: ',',       // Thousands separator
    decimal: '.',         // Decimal separator
    prefix: '',           // Text before number (e.g., '$', '#')
    suffix: '',           // Text after number (e.g., '%', 'K', 'M')
    currency: 'USD',      // Currency code for currency type
    locale: 'en-US'       // Locale for number formatting
  },

  // Animation behavior
  useRAF: true,           // Use requestAnimationFrame for smoother animation
  preserveAspectRatio: true, // Maintain consistent width during animation
  showLeadingZeros: false,   // Show leading zeros for consistency

  // Callbacks
  onStart: null,          // Called when animation starts
  onUpdate: null,         // Called on each frame with current value
  onComplete: null        // Called when animation completes
}

// ------------ COUNTER UP ON SCROLL FUNCTION
/**
 * Initialize counter-up animation for elements
 * @param {string|NodeList|Element} selector - Elements to animate
 * @param {Object} options - Animation configuration options
 * @returns {Object} Animation control object with cleanup and control methods
 */
export function counterUpOnScroll(selector, options = {}) {
  const config = { ...DEFAULT_CONFIG, ...options }

  // Get elements based on selector type
  let elements = getElements(selector)
  if (!elements.length) {
    console.warn(`counterUpOnScroll: No elements found for selector: ${selector}`)
    return { cleanup: () => {} }
  }

  // Initialize elements and extract target values
  const initializedElements = Array.from(elements).map(element => {
    return initializeElement(element, config)
  }).filter(Boolean)

  if (initializedElements.length === 0) {
    console.warn('counterUpOnScroll: No valid counter elements found')
    return { cleanup: () => {} }
  }

  let observer = null
  let staggerTimer = null
  let activeAnimations = new Map()

  // Create observer based on stagger configuration
  if (config.stagger > 0 && initializedElements.length > 1) {
    // Staggered animation - animate counters with delays
    observer = observeOnce(
      initializedElements.map(item => item.element),
      () => {
        staggerTimer = createStaggeredTimer(
          initializedElements,
          (elementData, progress) => animateCounter(elementData, progress, config, activeAnimations),
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
    // Individual animation - each counter animates when it enters viewport
    observer = observeOnce(
      initializedElements.map(item => item.element),
      (entry) => {
        const elementData = initializedElements.find(item => item.element === entry.target)
        if (elementData) {
          setTimeout(() => {
            animateCounterWithTimer(elementData, config, activeAnimations)
          }, config.delay)
        }
      },
      {
        threshold: config.threshold,
        rootMargin: config.rootMargin
      }
    )
  }

  // Return control object
  return {
    /**
     * Cleanup function to remove observers and stop animations
     */
    cleanup() {
      cleanupObservers(observer)
      cleanupTimers(staggerTimer)

      // Stop any active individual animations
      activeAnimations.forEach(timer => cleanupTimers(timer))
      activeAnimations.clear()

      observer = null
      staggerTimer = null
    },

    /**
     * Manually trigger animation for all counters
     */
    trigger() {
      if (config.stagger > 0 && initializedElements.length > 1) {
        staggerTimer = createStaggeredTimer(
          initializedElements,
          (elementData, progress) => animateCounter(elementData, progress, config, activeAnimations),
          {
            stagger: config.stagger,
            duration: config.duration,
            easing: config.easing
          }
        )
        staggerTimer.start()
      } else {
        initializedElements.forEach((elementData, index) => {
          setTimeout(() => {
            animateCounterWithTimer(elementData, config, activeAnimations)
          }, config.delay + (index * 100))
        })
      }
    },

    /**
     * Reset all counters to their initial state
     */
    reset() {
      activeAnimations.forEach(timer => cleanupTimers(timer))
      activeAnimations.clear()

      initializedElements.forEach(elementData => {
        resetElement(elementData, config)
      })
    },

    /**
     * Pause all active animations
     */
    pause() {
      activeAnimations.forEach(timer => {
        if (timer.pause) timer.pause()
      })
    },

    /**
     * Resume all paused animations
     */
    resume() {
      activeAnimations.forEach(timer => {
        if (timer.resume) timer.resume()
      })
    },

    /**
     * Get current values of all counters
     */
    getValues() {
      return initializedElements.map(elementData => ({
        element: elementData.element,
        currentValue: getCurrentValue(elementData.element),
        targetValue: elementData.endValue,
        isAnimating: activeAnimations.has(elementData.element)
      }))
    }
  }
}

/**
 * Get elements from various selector types
 * @param {string|NodeList|Element} selector - Selector to process
 * @returns {Array} Array of elements
 */
function getElements(selector) {
  if (typeof selector === 'string') {
    return Array.from(document.querySelectorAll(selector))
  } else if (selector instanceof NodeList) {
    return Array.from(selector)
  } else if (selector instanceof Element) {
    return [selector]
  }
  return []
}

/**
 * Initialize element with counter data and starting state
 * @param {Element} element - Element to initialize
 * @param {Object} config - Animation configuration
 * @returns {Object|null} Element data object or null if invalid
 */
function initializeElement(element, config) {
  // Extract target value from element
  const endValue = extractTargetValue(element, config)
  if (endValue === null) {
    console.warn('counterUpOnScroll: Could not extract target value from element:', element)
    return null
  }

  // Store original content for potential reset
  if (!element._originalContent) {
    element._originalContent = element.textContent
  }

  // Create element data object
  const elementData = {
    element,
    startValue: config.startValue,
    endValue,
    originalContent: element._originalContent
  }

  // Set initial display value
  resetElement(elementData, config)

  // Add CSS class for potential styling
  element.classList.add('counter-animation')

  return elementData
}

/**
 * Extract target value from element content
 * @param {Element} element - Element to analyze
 * @param {Object} config - Configuration object
 * @returns {number|null} Extracted number or null if invalid
 */
function extractTargetValue(element, config) {
  // If endValue is explicitly provided, use it
  if (config.endValue !== null) {
    return parseFloat(config.endValue)
  }

  // Extract from data attribute first
  const dataValue = element.dataset.counterTarget || element.dataset.count
  if (dataValue) {
    const parsed = parseFloat(dataValue)
    return isNaN(parsed) ? null : parsed
  }

  // Extract from element content
  const content = element.textContent.trim()

  // Remove common prefixes and suffixes to find the number
  const cleanContent = content
    .replace(/[$€£¥₹₽]/g, '') // Currency symbols
    .replace(/[,%]/g, '')      // Thousands separators and percentage
    .replace(/[^\d.-]/g, '')   // Keep only digits, decimals, and negative sign

  if (cleanContent === '') return null

  const parsed = parseFloat(cleanContent)
  return isNaN(parsed) ? null : parsed
}

/**
 * Reset element to initial state
 * @param {Object} elementData - Element data object
 * @param {Object} config - Configuration object
 */
function resetElement(elementData, config) {
  const formattedValue = formatNumber(elementData.startValue, config.format)
  elementData.element.textContent = formattedValue

  // Ensure consistent width if preserveAspectRatio is enabled
  if (config.preserveAspectRatio) {
    const targetFormatted = formatNumber(elementData.endValue, config.format)
    elementData.element.style.minWidth = getTextWidth(targetFormatted, elementData.element) + 'px'
  }
}

/**
 * Get current numeric value from element
 * @param {Element} element - Element to read from
 * @returns {number} Current numeric value
 */
function getCurrentValue(element) {
  const content = element.textContent.trim()
  const cleanContent = content
    .replace(/[^\d.-]/g, '')
  return parseFloat(cleanContent) || 0
}

/**
 * Animate counter with progress-based animation (for staggered animations)
 * @param {Object} elementData - Element data object
 * @param {number} progress - Animation progress (0-1)
 * @param {Object} config - Configuration object
 * @param {Map} activeAnimations - Map of active animations
 */
function animateCounter(elementData, progress, config, activeAnimations) {
  const easedProgress = config.easing(progress)

  // Calculate current value
  const currentValue = elementData.startValue +
    (elementData.endValue - elementData.startValue) * easedProgress

  // Format and display
  const formattedValue = formatNumber(currentValue, config.format)
  elementData.element.textContent = formattedValue

  // Trigger callbacks
  if (progress === 0 && config.onStart) {
    config.onStart(elementData.element, elementData.endValue)
  }

  if (config.onUpdate) {
    config.onUpdate(elementData.element, currentValue, progress)
  }

  if (progress >= 1) {
    // Ensure final value is exact
    const finalFormatted = formatNumber(elementData.endValue, config.format)
    elementData.element.textContent = finalFormatted

    if (config.onComplete) {
      config.onComplete(elementData.element, elementData.endValue)
    }

    // Remove from active animations
    activeAnimations.delete(elementData.element)

    // Clean up styling
    elementData.element.style.minWidth = ''
  }
}

/**
 * Animate counter with individual timer
 * @param {Object} elementData - Element data object
 * @param {Object} config - Configuration object
 * @param {Map} activeAnimations - Map of active animations
 */
function animateCounterWithTimer(elementData, config, activeAnimations) {
  if (activeAnimations.has(elementData.element)) {
    // Already animating, skip
    return
  }

  // Create animation timer
  const timer = createAnimationTimer(
    (progress) => {
      animateCounter(elementData, progress, config, activeAnimations)
    },
    {
      duration: config.duration,
      easing: config.easing,
      useRAF: config.useRAF
    }
  )

  // Store timer for cleanup
  activeAnimations.set(elementData.element, timer)

  // Start animation
  timer.start()
}

/**
 * Format number according to configuration
 * @param {number} value - Number to format
 * @param {Object} format - Format configuration
 * @returns {string} Formatted number string
 */
function formatNumber(value, format) {
  const { type, decimals, separator, decimal, prefix, suffix, currency, locale } = format

  // Handle different format types
  switch (type) {
    case 'currency':
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(value)

    case 'percent':
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }).format(value / 100)

    case 'custom':
      // Custom formatting with prefix/suffix
      const formattedNumber = formatWithSeparators(value, decimals, separator, decimal)
      return `${prefix}${formattedNumber}${suffix}`

    case 'number':
    default:
      // Standard number formatting
      if (separator || decimal !== '.' || decimals > 0) {
        return formatWithSeparators(value, decimals, separator, decimal)
      }
      return Math.round(value).toString()
  }
}

/**
 * Format number with custom separators
 * @param {number} value - Number to format
 * @param {number} decimals - Decimal places
 * @param {string} separator - Thousands separator
 * @param {string} decimal - Decimal separator
 * @returns {string} Formatted number
 */
function formatWithSeparators(value, decimals, separator, decimal) {
  const fixed = value.toFixed(decimals)
  const parts = fixed.split('.')

  // Add thousands separator
  if (separator) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  }

  // Join with custom decimal separator
  return parts.join(decimal)
}

/**
 * Calculate text width for consistent sizing
 * @param {string} text - Text to measure
 * @param {Element} element - Reference element for styling
 * @returns {number} Text width in pixels
 */
function getTextWidth(text, element) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const computedStyle = window.getComputedStyle(element)

  context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`
  return context.measureText(text).width
}

// ------------ CONVENIENCE FUNCTIONS

/**
 * Quick counter setup with common defaults
 * @param {string} selector - CSS selector for elements
 * @param {Object} options - Animation options
 * @returns {Object} Animation control object
 */
export function quickCounter(selector, options = {}) {
  return counterUpOnScroll(selector, {
    duration: 1500,
    easing: presets.ui,
    format: { type: 'number', separator: ',' },
    ...options
  })
}

/**
 * Currency counter with automatic formatting
 * @param {string} selector - CSS selector for elements
 * @param {string} currency - Currency code (default: 'USD')
 * @param {Object} options - Additional options
 * @returns {Object} Animation control object
 */
export function currencyCounter(selector, currency = 'USD', options = {}) {
  return counterUpOnScroll(selector, {
    duration: 2000,
    format: {
      type: 'currency',
      currency: currency,
      decimals: 2
    },
    ...options
  })
}

/**
 * Percentage counter with % suffix
 * @param {string} selector - CSS selector for elements
 * @param {Object} options - Animation options
 * @returns {Object} Animation control object
 */
export function percentageCounter(selector, options = {}) {
  return counterUpOnScroll(selector, {
    duration: 1800,
    format: { type: 'percent', decimals: 1 },
    ...options
  })
}

/**
 * Staggered counter animation for multiple elements
 * @param {string} selector - CSS selector for elements
 * @param {number} stagger - Stagger delay in milliseconds
 * @param {Object} options - Additional options
 * @returns {Object} Animation control object
 */
export function staggeredCounter(selector, stagger = 300, options = {}) {
  return counterUpOnScroll(selector, {
    stagger,
    duration: 2000,
    format: { type: 'number', separator: ',' },
    ...options
  })
}
