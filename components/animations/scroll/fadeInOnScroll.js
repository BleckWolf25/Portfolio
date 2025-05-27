/**
 * @file FADE IN ON SCROLL
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Fade-in animation triggered by scroll intersection
 * Optimized for performance and accessibility
 * Supports staggering and custom easing
 */

/* eslint-disable no-undef */

// ------------ IMPORTS
import { observeOnce, cleanupObservers } from '../../../utils/observers.js';
import { createStaggeredTimer, cleanupTimers } from '../../../utils/timers.js';
import { presets, cubic } from '../../../utils/easing.js';

// Configuration with animation state tracking
const DEFAULT_CONFIG = {
	duration: 800,
	delay: 0,
	distance: 15,
	direction: 'up',
	easing: presets.fade,
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px',
	stagger: 0,
	once: true,
	opacity: {
		from: 0,
		to: 1,
	},
};

// Animation states to prevent re-animation and blinking
const ANIMATION_STATES = {
	INITIAL: 'initial',
	ANIMATING: 'animating',
	COMPLETED: 'completed',
};

// Global persistent state manager to prevent re-animations across page interactions
const GLOBAL_ANIMATION_STATE = {
	completedElements: new Set(),
	sessionId: Date.now() + Math.random(),

	markCompleted(elementId) {
		this.completedElements.add(elementId);
		// Store in sessionStorage to persist during page navigation
		try {
			const stored = JSON.parse(sessionStorage.getItem('scrollAnimationState') || '{}');
			stored[this.sessionId] = Array.from(this.completedElements);
			sessionStorage.setItem('scrollAnimationState', JSON.stringify(stored));
		} catch (e) {
			// Silently fail if sessionStorage is not available
		}
	},

	isCompleted(elementId) {
		return this.completedElements.has(elementId);
	},

	loadPersistedState() {
		try {
			const stored = JSON.parse(sessionStorage.getItem('scrollAnimationState') || '{}');
			const currentSession = stored[this.sessionId];
			if (currentSession && Array.isArray(currentSession)) {
				this.completedElements = new Set(currentSession);
			}
		} catch (e) {
			// Silently fail if sessionStorage is not available
		}
	},

	generateElementId(element) {
		// Generate a unique ID based on element position and content
		const rect = element.getBoundingClientRect();
		const content = element.textContent?.slice(0, 50) || '';
		return `${rect.top}-${rect.left}-${content.replace(/\s+/g, '-')}`;
	}
};

/**
 * Main fade-in scroll animation function with blink prevention and persistent state
 */
export function fadeInOnScroll(selector, options = {}) {
	const config = { ...DEFAULT_CONFIG, ...options };

	// Load any persisted animation state
	GLOBAL_ANIMATION_STATE.loadPersistedState();

	// Get and validate elements
	const elements = getElements(selector);
	if (elements.length === 0) {
		return createControlObject();
	}

	// Initialize elements and track their states with global persistence
	const animationStates = new WeakMap();
	const elementIds = new WeakMap();
	const initializedElements = elements.map((element) => {
		const elementId = GLOBAL_ANIMATION_STATE.generateElementId(element);
		elementIds.set(element, elementId);

		// Check if this element was already animated in this session
		if (GLOBAL_ANIMATION_STATE.isCompleted(elementId)) {
			// Element was already animated, set it to completed state immediately
			animationStates.set(element, ANIMATION_STATES.COMPLETED);
			setElementToFinalState(element, config);
		} else {
			// Element hasn't been animated yet, initialize for animation
			initializeElementImproved(element, config);
			animationStates.set(element, ANIMATION_STATES.INITIAL);
		}
		return element;
	});

	let observer = null;
	const staggerTimer = null;

	// Only create observer for elements that haven't been animated yet
	const elementsToObserve = initializedElements.filter(
		(element) => animationStates.get(element) === ANIMATION_STATES.INITIAL
	);

	if (elementsToObserve.length > 0) {
		// Create optimized intersection observer
		observer =
			config.stagger > 0
				? observeOnce(
						elementsToObserve,
						() =>
							handleStaggeredAnimation(
								elementsToObserve,
								config,
								animationStates,
								elementIds,
							),
						{
							threshold: config.threshold,
							rootMargin: config.rootMargin,
						},
					)
				: observeOnce(
						elementsToObserve,
						(entry) => handleIndividualAnimation(entry, config, animationStates, elementIds),
						{
							threshold: config.threshold,
							rootMargin: config.rootMargin,
						},
					);
	}

	return createControlObject(
		observer,
		staggerTimer,
		initializedElements,
		config,
		animationStates,
	);
}

/**
 * Get elements from various selector types
 */
function getElements(selector) {
	if (typeof selector === 'string') {
		return Array.from(document.querySelectorAll(selector));
	} else if (selector instanceof NodeList) {
		return Array.from(selector);
	} else if (selector instanceof Element) {
		return [selector];
	}
	return [];
}

/**
 * Set element to final animated state without animation
 */
function setElementToFinalState(element, config) {
	// Store original styles only once
	if (!element._fadeScrollOriginalStyles) {
		element._fadeScrollOriginalStyles = {
			opacity: element.style.opacity || '',
			transform: element.style.transform || '',
			transition: element.style.transition || '',
			willChange: element.style.willChange || '',
		};
	}

	// Add completion classes
	element.classList.add('fade-scroll-element', 'fade-scroll-completed');

	// Set final state immediately without animation
	Object.assign(element.style, {
		opacity: config.opacity.to,
		transform: 'none',
		transition: 'none',
		willChange: 'auto',
		visibility: 'visible',
	});
}

/**
 * Improved element initialization that prevents FOUC and blinking
 */
function initializeElementImproved(element, config) {
	// Store original styles only once
	if (!element._fadeScrollOriginalStyles) {
		element._fadeScrollOriginalStyles = {
			opacity: element.style.opacity || '',
			transform: element.style.transform || '',
			transition: element.style.transition || '',
			willChange: element.style.willChange || '',
		};
	}

	// Add CSS class for consistent styling
	element.classList.add('fade-scroll-element');

	// Set up CSS custom properties for consistent animation
	element.style.setProperty('--fade-duration', `${config.duration}ms`);
	element.style.setProperty('--fade-easing', getCSSEasing(config.easing));

	// Apply initial state styles atomically with full transparency for "expensive" look
	const initialTransform = getInitialTransform(
		config.direction,
		config.distance,
	);

	// Use a single style update to prevent flashing
	Object.assign(element.style, {
		opacity: config.opacity.from,
		transform: initialTransform,

		// Prevent any automatic transitions during setup
		transition: 'none',
		willChange: 'opacity, transform',
		visibility: 'visible',
	});

	// Force a reflow to ensure styles are applied
	element.offsetHeight;
}

/**
 * Handle staggered animation with state tracking and global persistence
 */
function handleStaggeredAnimation(elements, config, animationStates, elementIds) {
	// Check if any element is already animating
	const hasAnimatingElements = elements.some(
		(el) => animationStates.get(el) === ANIMATION_STATES.ANIMATING,
	);

	if (hasAnimatingElements) return;

	const staggerTimer = createStaggeredTimer(
		elements,
		(element, progress) => {
			if (animationStates.get(element) === ANIMATION_STATES.INITIAL) {
				animationStates.set(element, ANIMATION_STATES.ANIMATING);
			}
			animateElementProgress(element, progress, config);

			if (progress >= 1) {
				animationStates.set(element, ANIMATION_STATES.COMPLETED);
				const elementId = elementIds.get(element);
				if (elementId) {
					GLOBAL_ANIMATION_STATE.markCompleted(elementId);
				}
				finalizeElement(element, config);
			}
		},
		{
			stagger: config.stagger,
			duration: config.duration,
			easing: config.easing,
		},
	);

	staggerTimer.start();
}

/**
 * Handle individual element animation with state tracking and global persistence
 */
function handleIndividualAnimation(entry, config, animationStates, elementIds) {
	const element = entry.target;

	// Skip if already animated or animating
	const currentState = animationStates.get(element);
	if (
		currentState === ANIMATION_STATES.ANIMATING ||
		currentState === ANIMATION_STATES.COMPLETED
	) {
		return;
	}

	animationStates.set(element, ANIMATION_STATES.ANIMATING);

	setTimeout(() => {
		animateElementCSS(element, config, () => {
			animationStates.set(element, ANIMATION_STATES.COMPLETED);
			const elementId = elementIds.get(element);
			if (elementId) {
				GLOBAL_ANIMATION_STATE.markCompleted(elementId);
			}
			finalizeElement(element, config);
		});
	}, config.delay);
}

/**
 * Progress-based animation for staggered effects
 */
function animateElementProgress(element, progress, config) {
	const easedProgress = config.easing(progress);

	// Interpolate opacity
	const opacity =
		config.opacity.from +
		(config.opacity.to - config.opacity.from) * easedProgress;

	// Interpolate transform
	const distance = config.distance * (1 - easedProgress);
	const currentTransform = getInitialTransform(config.direction, distance);

	// Apply styles efficiently
	element.style.opacity = opacity;
	element.style.transform = currentTransform;
}

/**
 * CSS-based animation for individual elements
 */
function animateElementCSS(element, config, onComplete) {
	// Set up CSS transition
	const transition = [
		`opacity ${config.duration}ms ${getCSSEasing(config.easing)}`,
		`transform ${config.duration}ms ${getCSSEasing(config.easing)}`,
	].join(', ');

	element.style.transition = transition;

	// Use requestAnimationFrame for smooth animation trigger
	requestAnimationFrame(() => {
		element.style.opacity = config.opacity.to;
		// Hardware acceleration
		element.style.transform = 'translateX(0) translateY(0) translateZ(0)';
	});

	// Clean up after animation
	const cleanup = () => {
		element.removeEventListener('transitionend', cleanup);
		if (onComplete) onComplete();
	};

	element.addEventListener('transitionend', cleanup, { once: true });

	// Fallback cleanup in case transitionend doesn't fire
	setTimeout(cleanup, config.duration + 100);
}

/**
 * Finalize element after animation completion
 */
function finalizeElement(element, config) {
	// Clean up animation properties
	element.style.transition = '';
	element.style.willChange = 'auto';
	element.style.removeProperty('--fade-duration');
	element.style.removeProperty('--fade-easing');

	// Ensure final state is set
	element.style.opacity = config.opacity.to;
	element.style.transform = 'none';

	// Add completion class for CSS targeting
	element.classList.add('fade-scroll-completed');
}

/**
 * Get initial transform based on direction
 */
function getInitialTransform(direction, distance) {
	const transforms = {
		up: `translateY(${distance}px) translateZ(0)`,
		down: `translateY(-${distance}px) translateZ(0)`,
		left: `translateX(${distance}px) translateZ(0)`,
		right: `translateX(-${distance}px) translateZ(0)`,
		none: 'translateX(0) translateY(0) translateZ(0)',
	};

	// eslint-disable-next-line security/detect-object-injection
	return transforms[direction] || transforms.none;
}

/**
 * Convert easing function to CSS timing function
 */
function getCSSEasing(easingFunction) {
	const easingMap = new Map([
		[presets.fade, 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'],
		[presets.slide, 'cubic-bezier(0.4, 0.0, 0.2, 1)'],
		[presets.ui, 'cubic-bezier(0.0, 0.0, 0.2, 1)'],
		[cubic.out, 'cubic-bezier(0.33, 1, 0.68, 1)'],
		[cubic.inOut, 'cubic-bezier(0.65, 0, 0.35, 1)'],
	]);

	return (
		easingMap.get(easingFunction) || 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
	);
}

/**
 * Create animation control object
 */
function createControlObject(
	observer = null,
	staggerTimer = null,
	elements = [],
	config = {},
	animationStates = null,
) {
	return {
		cleanup() {
			cleanupObservers(observer);
			cleanupTimers(staggerTimer);

			// Reset elements to original state
			if (elements && elements.length > 0) {
				elements.forEach((element) => {
					if (element._fadeScrollOriginalStyles) {
						Object.assign(element.style, element._fadeScrollOriginalStyles);
						delete element._fadeScrollOriginalStyles;
					}
					element.classList.remove(
						'fade-scroll-element',
						'fade-scroll-completed',
					);
				});
			}
		},

		trigger() {
			if (!elements || !config || !animationStates) return;

			elements.forEach((element, index) => {
				if (animationStates.get(element) === ANIMATION_STATES.INITIAL) {
					setTimeout(
						() => {
							animationStates.set(element, ANIMATION_STATES.ANIMATING);
							animateElementCSS(element, config, () => {
								animationStates.set(element, ANIMATION_STATES.COMPLETED);
								finalizeElement(element, config);
							});
						},
						config.delay + index * 50,
					);
				}
			});
		},

		reset() {
			if (!elements || !config || !animationStates) return;

			elements.forEach((element) => {
				initializeElementImproved(element, config);
				animationStates.set(element, ANIMATION_STATES.INITIAL);
				element.classList.remove('fade-scroll-completed');
			});
		},
	};
}

// Export convenience functions with improved defaults
export function quickFadeIn(selector, options = {}) {
	return fadeInOnScroll(selector, {
		duration: 400,
		direction: 'up',
		distance: 20,
		threshold: 0.15,
		...options,
	});
}

export function staggeredFadeIn(selector, stagger = 100, options = {}) {
	return fadeInOnScroll(selector, {
		stagger,
		duration: 500,
		direction: 'up',
		distance: 25,
		threshold: 0.1,
		...options,
	});
}
