/**
 * @file EASING.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Modern easing functions for smooth animations
 * Based on CSS cubic-bezier curves and Robert Penner's easing equations
 * All functions accept a value between 0 and 1 and return the eased value
 */

/**
 * Linear easing - no acceleration/deceleration
 * @param {number} t - Progress ratio (0 to 1)
 * @returns {number} Eased value
 */
export const linear = t => t

/**
 * Quadratic easing functions
 */
export const quad = {
  in: t => t * t,
  out: t => t * (2 - t),
  inOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

/**
 * Cubic easing functions - smooth and natural feeling
 */
export const cubic = {
  in: t => t * t * t,
  out: t => (--t) * t * t + 1,
  inOut: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

/**
 * Quartic easing functions - more pronounced curves
 */
export const quart = {
  in: t => t * t * t * t,
  out: t => 1 - (--t) * t * t * t,
  inOut: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
}

/**
 * Exponential easing functions - dramatic acceleration/deceleration
 */
export const expo = {
  in: t => t === 0 ? 0 : Math.pow(1024, t - 1),
  out: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  inOut: t => {
    if (t === 0) return 0
    if (t === 1) return 1
    if (t < 0.5) return Math.pow(1024, t - 1) / 2
    return (-Math.pow(2, -10 * (t - 1)) + 2) / 2
  }
}

/**
 * Circular easing functions - smooth arcs
 */
export const circ = {
  in: t => 1 - Math.sqrt(1 - t * t),
  out: t => Math.sqrt(1 - (t - 1) * (t - 1)),
  inOut: t => {
    if (t < 0.5) return (1 - Math.sqrt(1 - 4 * (t * t))) / 2
    return (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2
  }
}

/**
 * Back easing functions - slight overshoot for bounce effect
 */
export const back = {
  in: t => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return c3 * t * t * t - c1 * t * t
  },
  out: t => {
    const c1 = 1.70158
    const c3 = c1 + 1
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
  },
  inOut: t => {
    const c1 = 1.70158
    const c2 = c1 * 1.525
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2
  }
}

/**
 * Elastic easing functions - spring-like bounce
 */
export const elastic = {
  in: t => {
    if (t === 0) return 0
    if (t === 1) return 1
    const c4 = (2 * Math.PI) / 3
    return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4)
  },
  out: t => {
    if (t === 0) return 0
    if (t === 1) return 1
    const c4 = (2 * Math.PI) / 3
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
  inOut: t => {
    if (t === 0) return 0
    if (t === 1) return 1
    const c5 = (2 * Math.PI) / 4.5
    return t < 0.5
      ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1
  }
}

/**
 * Bounce easing functions - multiple bounces
 */
export const bounce = {
  in: t => 1 - bounce.out(1 - t),
  out: t => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
    }
  },
  inOut: t => t < 0.5
    ? bounce.in(t * 2) * 0.5
    : bounce.out(t * 2 - 1) * 0.5 + 0.5
}

/**
 * CSS cubic-bezier equivalents for common Material and iOS animations
 */
export const material = {
  standard: t => cubic.inOut(t), // cubic-bezier(0.4, 0.0, 0.2, 1)
  decelerate: t => quad.out(t),  // cubic-bezier(0.0, 0.0, 0.2, 1)
  accelerate: t => quad.in(t),   // cubic-bezier(0.4, 0.0, 1, 1)
  sharp: t => cubic.in(t)        // cubic-bezier(0.4, 0.0, 0.6, 1)
}

/**
 * Utility function to create custom cubic-bezier easing
 * @param {number} x1 - First control point x
 * @param {number} y1 - First control point y
 * @param {number} x2 - Second control point x
 * @param {number} y2 - Second control point y
 * @returns {Function} Easing function
 */
export function createCubicBezier(x1, y1, x2, y2) {

	// Simplified cubic-bezier approximation
  return t => {
    const mt = 1 - t
    return 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t
  }
}

/**
 * Default recommended easing for different animation types
 */
export const presets = {

	// For fade animations
  fade: cubic.out,

	// For slide animations
  slide: material.standard,

	// For scale/zoom animations
  scale: back.out,

	// For attention-grabbing animations
  bounce: elastic.out,

	// For UI state changes
  ui: material.decelerate
}
