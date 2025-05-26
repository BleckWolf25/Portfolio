/**
 * @file HERO LOAD ANIMATION.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Animates the hero section content on page load.
 * Common effects include fade-in, slide-up, and staggered appearance of child elements.
 */

// ------------ HERO LOAD ANIMATION MODULE
export function heroLoadAnimation(selector = '#hero', options = {}) {
  const root = document.querySelector(selector);
  if (!root) return console.warn(`[heroLoadAnimation] Element not found: ${selector}`);

  // Merge default options with custom ones
  const {
    delay = 0,
    stagger = 100,       // ms between each child animation
    duration = 600,      // duration of each animation
    easing = 'ease-out', // CSS easing
    yOffset = 20         // how far elements slide up
  } = options;

  const children = Array.from(root.children);

  children.forEach((el, index) => {
    // Reset styles before animation
    el.style.opacity = 0;
    el.style.transform = `translateY(${yOffset}px)`;
    el.style.transition = `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`;

    // Apply animation with staggered delay
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, delay + index * stagger);
  });
}
