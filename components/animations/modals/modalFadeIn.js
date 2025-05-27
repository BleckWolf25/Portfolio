/**
 * @file MODAL FADE IN.JS
 *
 * @version 1.0.1
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Animates the modal dialog when it fades in.
 * Common effects include fade-in, slide-up, and scale transformations.
 */

/**
 * Fade-in animation for modals.
 * @param {Element} modalEl - The modal dialog element to animate.
 * @param {Object} [options] - Optional animation settings.
 * @param {number} [options.duration=200] - Animation duration in ms.
 * @param {Function} [options.easing=(t)=>t] - Easing function.
 * @returns {Promise<void>} Resolves when animation completes.
 */
export function modalFadeIn(modalEl, options = {}) {
	// Default options
	const duration = options.duration ?? 200;

	if (!modalEl) return Promise.resolve();

	// Reset styles before animation
	modalEl.style.opacity = '0';
	modalEl.style.transform = 'scale(0.96)';
	modalEl.style.willChange = 'opacity, transform';
	modalEl.style.transition = 'none';

	// Force style flush
	void modalEl.offsetWidth;

	// Start animation
	return new Promise((resolve) => {
		modalEl.style.transition = `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1), transform ${duration}ms cubic-bezier(0.4,0,0.2,1)`;
		modalEl.style.opacity = '1';
		modalEl.style.transform = 'scale(1)';

		const cleanup = () => {
			modalEl.style.transition = '';
			modalEl.style.willChange = '';
			modalEl.removeEventListener('transitionend', onEnd);
			resolve();
		};

		function onEnd(e) {
			if (
				e.target === modalEl &&
				(e.propertyName === 'opacity' || e.propertyName === 'transform')
			) {
				cleanup();
			}
		}

		// Add transition end listener
		modalEl.addEventListener('transitionend', onEnd);
	});
}
