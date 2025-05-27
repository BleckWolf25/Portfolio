/**
 * @file SCROLL-ANIMATION-INIT.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Improved initialization system for scroll animations
 * Prevents FOUC and provides smooth, non-intrusive animations
 */

/* eslint-disable no-undef */

// Import the animation functions
import { fadeInOnScroll } from './fadeInOnScroll.js';

/**
 * Initialize scroll animations with improved defaults
 * This function should be called when the DOM is ready
 */
export function initScrollAnimations() {
	// Add loading class to prevent FOUC
	document.documentElement.classList.add('scroll-animations-loading');

	// Wait for next frame to ensure CSS is applied
	requestAnimationFrame(() => {
		// Remove loading class and add ready class
		document.documentElement.classList.remove('scroll-animations-loading');
		document.documentElement.classList.add('scroll-animations-ready');

		// Initialize animations with improved settings
		initFadeAnimations();
	});
}

/**
 * Initialize fade animations with optimized settings for premium look
 */
function initFadeAnimations() {
	const fadeElements = document.querySelectorAll('.scroll-animate-fade');

	if (fadeElements.length > 0) {
		fadeInOnScroll(fadeElements, {
			duration: 800,
			distance: 15,
			threshold: 0.2,
			rootMargin: '0px 0px -20px 0px',
			opacity: { from: 0, to: 1 }, // Full transparency for premium effect
		});
	}
}

/**
 * Smooth scroll animation presets for easy use
 */
export const smoothScrollPresets = {
	/**
	 * Subtle fade-in animation with premium transparency
	 */
	subtleFade: (selector, options = {}) => {
		return fadeInOnScroll(selector, {
			duration: 1000,
			distance: 10,
			threshold: 0.3,
			rootMargin: '0px 0px -10px 0px',
			opacity: { from: 0, to: 1 }, // Full transparency for premium effect
			...options,
		});
	},

	/**
	 * Standard section animation - matches your current usage
	 */
	sectionFade: (selector, options = {}) => {
		return fadeInOnScroll(selector, {
			duration: 600,
			direction: 'up',
			distance: 30,
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px',
			once: true,
			...options,
		});
	},

	/**
	 * Staggered cards animation
	 */
	staggeredCards: (selector, stagger = 200, options = {}) => {
		return fadeInOnScroll(selector, {
			duration: 600,
			direction: 'up',
			distance: 30,
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px',
			stagger,
			once: true,
			...options,
		});
	},

	/**
	 * Quick hero elements animation
	 */
	heroElements: (selector, options = {}) => {
		return fadeInOnScroll(selector, {
			duration: 800,
			direction: 'up',
			distance: 20,
			threshold: 0.2,
			rootMargin: '0px 0px -30px 0px',
			opacity: { from: 0, to: 1 },
			...options,
		});
	},
};

/**
 * Utility function to check if user prefers reduced motion
 */
export function prefersReducedMotion() {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Initialize animations with respect for user preferences
 */
export function initAccessibleScrollAnimations() {
	if (prefersReducedMotion()) {
		// Skip animations for users who prefer reduced motion
		return;
	}

	initScrollAnimations();
}

/**
 * Auto-initialize when DOM is ready
 * Can be disabled by setting window.disableAutoScrollAnimations = true
 */
if (typeof window !== 'undefined' && !window.disableAutoScrollAnimations) {
	if (document.readyState === 'loading') {
		document.addEventListener(
			'DOMContentLoaded',
			initAccessibleScrollAnimations,
		);
	} else {
		initAccessibleScrollAnimations();
	}
}
