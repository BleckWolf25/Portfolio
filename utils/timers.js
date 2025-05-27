/**
 * @file TIMERS.JS
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * High-performance animation timing utilities
 * Provides frame-accurate timing and cleanup for smooth animations
 */

/* eslint-disable no-undef */

/**
 * RequestAnimationFrame-based timer with built-in cleanup
 * More accurate than setTimeout for animations
 * @param {Function} callback - Function to execute each frame
 * @param {number} duration - Animation duration in milliseconds
 * @param {Function} easing - Easing function (optional)
 * @returns {Object} Animation control object with stop method
 */
export function createAnimationTimer(callback, duration, easing = (t) => t) {
	let startTime = null;
	let animationId = null;
	let isRunning = false;

	const animate = (currentTime) => {
		if (!startTime) startTime = currentTime;

		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const easedProgress = easing(progress);

		callback(easedProgress, progress, elapsed);

		if (progress < 1 && isRunning) {
			animationId = requestAnimationFrame(animate);
		} else {
			isRunning = false;
		}
	};

	return {
		start() {
			if (!isRunning) {
				isRunning = true;
				startTime = null;
				animationId = requestAnimationFrame(animate);
			}
			return this;
		},

		stop() {
			if (animationId) {
				cancelAnimationFrame(animationId);
				animationId = null;
			}
			isRunning = false;
			return this;
		},

		get isRunning() {
			return isRunning;
		},
	};
}

/**
 * Staggered animation utility for animating multiple elements with delays
 * @param {Array} elements - Elements to animate
 * @param {Function} animateElement - Function to animate single element
 * @param {Object} options - Configuration options
 * @param {number} options.stagger - Delay between each element (ms)
 * @param {number} options.duration - Duration per element (ms)
 * @param {Function} options.easing - Easing function
 * @returns {Object} Control object for the staggered animation
 */
export function createStaggeredTimer(elements, animateElement, options = {}) {
	const { stagger = 100, duration = 500, easing = (t) => t } = options;

	const timers = [];
	let isRunning = false;

	return {
		start() {
			if (isRunning) return this;
			isRunning = true;

			elements.forEach((element, index) => {
				const delay = index * stagger;

				const timer = setTimeout(() => {
					const animTimer = createAnimationTimer(
						(progress) => animateElement(element, progress, index),
						duration,
						easing,
					);
					animTimer.start();
					timers.push(animTimer);
				}, delay);

				timers.push({ stop: () => clearTimeout(timer) });
			});

			return this;
		},

		stop() {
			timers.forEach((timer) => timer.stop());
			timers.length = 0;
			isRunning = false;
			return this;
		},

		get isRunning() {
			return isRunning;
		},
	};
}

/**
 * Debounced function executor for performance optimization
 * Prevents excessive function calls during scroll/resize events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately on first call
 * @returns {Function} Debounced function
 */
export function debounce(func, wait, immediate = false) {
	let timeout;
	let result;

	const debounced = function executedFunction(...args) {
		const later = () => {
			timeout = null;
			if (!immediate) result = func.apply(this, args);
		};

		const callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) result = func.apply(this, args);
		return result;
	};

	debounced.cancel = function () {
		clearTimeout(timeout);
		timeout = null;
	};

	return debounced;
}

/**
 * Throttled function executor for consistent performance
 * Ensures function is called at most once per specified interval
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
	let inThrottle;
	let lastResult;

	return function executedFunction(...args) {
		if (!inThrottle) {
			lastResult = func.apply(this, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
		return lastResult;
	};
}

/**
 * Frame-rate independent animation loop
 * Automatically handles frame timing and provides consistent deltaTime
 * @param {Function} update - Update function called each frame
 * @param {Object} options - Configuration options
 * @param {number} options.targetFPS - Target frame rate (default: 60)
 * @param {boolean} options.adaptive - Adapt to device capabilities
 * @returns {Object} Animation loop control object
 */
export function createAnimationLoop(update, options = {}) {
	const { targetFPS = 60, adaptive = true } = options;

	const targetFrameTime = 1000 / targetFPS;
	let animationId = null;
	let lastTime = 0;
	let deltaTime = 0;
	let isRunning = false;
	let frameCount = 0;
	let fpsHistory = [];

	const loop = (currentTime) => {
		deltaTime = currentTime - lastTime;
		lastTime = currentTime;

		// Adaptive frame rate adjustment
		if (adaptive) {
			fpsHistory.push(1000 / deltaTime);
			if (fpsHistory.length > 60) fpsHistory.shift();

			const avgFPS = fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length;

			// Skip frame if performance is poor
			if (avgFPS < targetFPS * 0.8 && frameCount % 2 === 0) {
				animationId = requestAnimationFrame(loop);
				return;
			}
		}

		update(deltaTime, currentTime, frameCount);
		frameCount++;

		if (isRunning) {
			animationId = requestAnimationFrame(loop);
		}
	};

	return {
		start() {
			if (!isRunning) {
				isRunning = true;
				lastTime = performance.now();
				animationId = requestAnimationFrame(loop);
			}
			return this;
		},

		stop() {
			if (animationId) {
				cancelAnimationFrame(animationId);
				animationId = null;
			}
			isRunning = false;
			frameCount = 0;
			fpsHistory = [];
			return this;
		},

		get isRunning() {
			return isRunning;
		},

		get fps() {
			return fpsHistory.length > 0
				? fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length
				: 0;
		},
	};
}

/**
 * Promise-based delay utility for async/await patterns
 * @param {number} ms - Delay in milliseconds
 * @returns {Promise} Promise that resolves after delay
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Cleanup utility for all timer types
 * Call in component unmount/destroy lifecycle
 * @param {...Object} timers - Timer objects to cleanup
 */
export function cleanupTimers(...timers) {
	timers.forEach((timer) => {
		if (timer && typeof timer.stop === 'function') {
			timer.stop();
		} else if (timer && typeof timer.cancel === 'function') {
			timer.cancel();
		}
	});
}
