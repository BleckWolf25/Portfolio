/**
 * @file HERO LOAD ANIMATION.JS
 *
 * @version 1.0.1
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Animates the hero section content on page load.
 * Common effects include fade-in, slide-up, and staggered appearance of child elements.
 */

/* eslint-disable no-undef */

// ------------ HERO LOAD ANIMATION MODULE
export function heroLoadAnimation(selector = '#hero', options = {}) {
	const root = document.querySelector(selector);

	// Merge default options with custom ones
	const {
		delay = 0,

		// ms between each child animation
		stagger = 100,

		// duration of each animation
		duration = 600,

		// CSS easing
		easing = 'ease-out',

		// how far elements slide up
		yOffset = 20,
	} = options;

	const children = Array.from(root.children);

	children.forEach((el, index) => {
		// Reset styles before animation
		el.style.opacity = 0;
		el.style.transform = `translateY(${yOffset}px)`;
		el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;

		// Apply animation with staggered delay
		setTimeout(
			() => {
				el.style.opacity = 1;
				el.style.transform = 'translateY(0)';
			},
			delay + index * stagger,
		);
	});
}
