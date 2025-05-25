/**
 * @file CARD LIFT EFFECT.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Card lift effect animation.
 * Provides a subtle shadow and translateY effect on hover.
 * Commonly used for cards to enhance interactivity and user experience.
 * This effect can be customized with options for duration and lift amount.
 */

/**
 * Card lift effect animation.
 * @param {Element} cardEl - The card element to animate.
 * @param {Object} [options] - Optional animation settings.
 * @param {number} [options.duration=180] - Animation duration in ms.
 * @param {number} [options.lift=6] - Lift amount in px.
 * @returns {void}
 */
export function cardLiftEffect(cardEl, options = {}) {
	// Default options
  const duration = options.duration ?? 180
  const lift = options.lift ?? 6

  if (!cardEl) return

	// Set initial styles
  cardEl.style.transition = `box-shadow ${duration}ms cubic-bezier(0.4,0,0.2,1), transform ${duration}ms cubic-bezier(0.4,0,0.2,1)`

	// Define hover effects
  const onEnter = () => {
    cardEl.style.boxShadow = '0 8px 24px 0 rgba(0,0,0,0.10)'
    cardEl.style.transform = `translateY(-${lift}px)`
  }

	// Define hover out effects
  const onLeave = () => {
    cardEl.style.boxShadow = ''
    cardEl.style.transform = ''
  }

	// Add event listeners
  cardEl.addEventListener('mouseenter', onEnter)
  cardEl.addEventListener('mouseleave', onLeave)

  // Cleanup utility
  cardEl._cardLiftCleanup = () => {
    cardEl.removeEventListener('mouseenter', onEnter)
    cardEl.removeEventListener('mouseleave', onLeave)
    cardEl.style.transition = ''
    cardEl.style.boxShadow = ''
    cardEl.style.transform = ''
  }
}
