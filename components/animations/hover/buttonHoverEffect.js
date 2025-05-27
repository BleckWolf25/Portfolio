/**
 * @file BUTTON HOVER EFFECT.JS
 *
 * @version 1.0.1
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Button hover effect animation.
 * Provides a subtle scale and shadow effect on hover.
 * Commonly used for buttons to enhance interactivity and user experience.
 * This effect can be customized with options for duration and easing.
 */

/**
 * Button hover effect animation.
 * @param {Element} buttonEl - The button element to animate.
 * @param {Object} [options] - Optional animation settings.
 * @param {number} [options.duration=120] - Animation duration in ms.
 * @returns {void}
 */
export function buttonHoverEffect(buttonEl, options = {}) {
	// Default options
	const duration = options.duration ?? 120;

	// Set initial styles
	buttonEl.style.transition = `transform ${duration}ms cubic-bezier(0.4,0,0.2,1), box-shadow ${duration}ms cubic-bezier(0.4,0,0.2,1)`;

	// Define hover effects
	const onEnter = () => {
		buttonEl.style.transform = 'scale(1.045)';
		buttonEl.style.boxShadow = '0 4px 16px 0 rgba(0,0,0,0.10)';
	};

	// Define hover out effects
	const onLeave = () => {
		buttonEl.style.transform = '';
		buttonEl.style.boxShadow = '';
	};

	// Add event listeners
	buttonEl.addEventListener('mouseenter', onEnter);
	buttonEl.addEventListener('mouseleave', onLeave);

	// Cleanup utility
	buttonEl._buttonHoverCleanup = () => {
		buttonEl.removeEventListener('mouseenter', onEnter);
		buttonEl.removeEventListener('mouseleave', onLeave);
		buttonEl.style.transition = '';
		buttonEl.style.transform = '';
		buttonEl.style.boxShadow = '';
	};
}
