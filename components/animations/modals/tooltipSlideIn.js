/**
 * @file TOOLTIP SLIDE IN.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Slide-in animation for tooltips.
 * Provides a smooth transition effect when tooltips appear.
 * Commonly used for UI elements to enhance user experience.
 * This effect can be customized with options for position and duration.
 */

/**
 * Slide-in animation for tooltips.
 * @param {Element} tooltipEl - The tooltip element to animate.
 * @param {Object} [options] - Animation settings.
 * @param {'top'|'bottom'|'left'|'right'} [options.position='top'] - Tooltip position.
 * @param {number} [options.duration=180] - Animation duration in ms.
 * @returns {void}
 */
export function tooltipSlideIn(tooltipEl, options = {}) {
	// Default options
  const duration = options.duration ?? 180
  const position = options.position ?? 'top'

  if (!tooltipEl) return

  // Set initial styles based on position
  let translate

	// Determine translation based on position
  switch (position) {
    case 'bottom':
      translate = 'translateY(-8px)'
      break
    case 'left':
      translate = 'translateX(8px)'
      break
    case 'right':
      translate = 'translateX(-8px)'
      break
    case 'top':
    default:
      translate = 'translateY(8px)'
      break
  }

	// Reset styles before animation
  tooltipEl.style.opacity = '0'
  tooltipEl.style.transform = translate
  tooltipEl.style.transition = 'none'
  tooltipEl.style.willChange = 'opacity, transform'

  // Force style flush
  void tooltipEl.offsetWidth

	// Start animation
  tooltipEl.style.transition = `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1), transform ${duration}ms cubic-bezier(0.4,0,0.2,1)`
  tooltipEl.style.opacity = '1'
  tooltipEl.style.transform = 'translate(0,0)'

  // Cleanup after transition
  const cleanup = () => {
    tooltipEl.style.transition = ''
    tooltipEl.style.willChange = ''
    tooltipEl.removeEventListener('transitionend', onEnd)
  }

	// Transition end listener
  function onEnd(e) {
    if (e.target === tooltipEl && (e.propertyName === 'opacity' || e.propertyName === 'transform')) {
      cleanup()
    }
  }

	// Add transition end listener
  tooltipEl.addEventListener('transitionend', onEnd)
}
