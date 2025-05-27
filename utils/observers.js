/**
 * @file OBSERVERS.JS
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Intersection Observer utilities for scroll-based animations
 * Provides reusable observer patterns with performance optimizations
 */

/**
 * Creates a performance-optimized Intersection Observer
 * @param {Function} callback - Function to execute when intersection changes
 * @param {Object} options - Observer configuration options
 * @param {string|number} options.rootMargin - Margin around root (default: '0px')
 * @param {number|Array} options.threshold - Intersection threshold(s) (default: 0.1)
 * @param {Element} options.root - Root element for intersection (default: null)
 * @returns {IntersectionObserver} Configured observer instance
 */
export function createScrollObserver(callback, options = {}) {
	const defaultOptions = {
		rootMargin: '0px',
		threshold: 0.1,
		root: null,
	};

	const config = { ...defaultOptions, ...options };

	// Performance optimization: debounce callback to avoid excessive calls
	let timeoutId = null;
	const debouncedCallback = (entries, observer) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			callback(entries, observer);
			// ~60fps throttling
		}, 16);
	};

	return new IntersectionObserver(debouncedCallback, config);
}

/**
 * Observes multiple elements with a single observer instance
 * More efficient than creating individual observers for each element
 * @param {NodeList|Array} elements - Elements to observe
 * @param {Function} callback - Callback function for intersection changes
 * @param {Object} options - Observer options
 * @returns {IntersectionObserver} The observer instance
 */
export function observeElements(elements, callback, options = {}) {
	const observer = createScrollObserver(callback, options);

	// Convert NodeList to Array if needed and filter valid elements
	const elementsArray = Array.from(elements).filter(
		(el) => el instanceof Element,
	);

	elementsArray.forEach((element) => {
		observer.observe(element);
	});

	return observer;
}

/**
 * Observes a single element with enter/exit callbacks
 * @param {Element} element - Element to observe
 * @param {Object} callbacks - Callback functions
 * @param {Function} callbacks.onEnter - Called when element enters viewport
 * @param {Function} callbacks.onExit - Called when element exits viewport
 * @param {Object} options - Observer options
 * @returns {IntersectionObserver} The observer instance
 */
export function observeElement(element, { onEnter, onExit }, options = {}) {
	if (!element || !(element instanceof Element)) {
		console.warn('observeElement: Invalid element provided');
		return null;
	}

	const callback = (entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting && onEnter) {
				onEnter(entry);
			} else if (!entry.isIntersecting && onExit) {
				onExit(entry);
			}
		});
	};

	const observer = createScrollObserver(callback, options);
	observer.observe(element);

	return observer;
}

/**
 * Creates an observer that triggers only once per element
 * Automatically unobserves elements after first intersection
 * Perfect for fade-in animations that shouldn't repeat
 * @param {NodeList|Array} elements - Elements to observe
 * @param {Function} callback - Callback function
 * @param {Object} options - Observer options
 * @returns {IntersectionObserver} The observer instance
 */
export function observeOnce(elements, callback, options = {}) {
	const observer = createScrollObserver((entries, obs) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				callback(entry);

				// Stop observing after first trigger
				obs.unobserve(entry.target);
			}
		});
	}, options);

	const elementsArray = Array.from(elements).filter(
		(el) => el instanceof Element,
	);
	elementsArray.forEach((element) => observer.observe(element));

	return observer;
}

/**
 * Cleanup utility to disconnect observers and clear timeouts
 * Should be called in component unmount/destroy lifecycle
 * @param {...IntersectionObserver} observers - Observer instances to cleanup
 */
export function cleanupObservers(...observers) {
	observers.forEach((observer) => {
		if (observer && typeof observer.disconnect === 'function') {
			observer.disconnect();
		}
	});
}
