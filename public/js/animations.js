// animations.js

// -------- IMPORTS -------- \\

import { inView, animate } from 'motion'; // I've used motion since it's easier to use on an completed website.

// -------- UTILITY FUNCTIONS -------- \\

/**
 * Sets up and triggers animations for elements within a given section when it enters the viewport.
 * @param {string} sectionSelector - CSS selector for the section containing the animation targets.
 * @param {Array<HTMLElement|NodeList>} animationTargets - Array of HTML elements or NodeLists to animate.
 * @param {Object} animationOptions - Options for the animation (duration, delay, threshold, scale).
 *   - duration: Animation duration in seconds (default: 0.5).
 *   - delay: Animation delay in seconds - after triggering the threshold (default: 0.3).
 *   - threshold: Percentage of element visibility to trigger animation (default: 0.5).
 *   - scale: Whether to include a scaling effect (default: false).
 * 
 *   - For big-medium sections use threshold between 0.1-0.5
 *   - For small sections use threshold between 0.5-1
 */
function setupSectionAnimations(sectionSelector, animationTargets, animationOptions) {
  const section = document.querySelector(sectionSelector);

  // Error handling for missing section
  if (!section) {
    console.error(`Section not found: ${sectionSelector}`);

    return;
  }

  // Filter and validate targets to ensure they are valid HTMLElements
  const validTargets = animationTargets.flatMap((target) => {
    if (target instanceof NodeList) {
      return Array.from(target).filter((item) => item && item.nodeType === Node.ELEMENT_NODE);
    } else if (target && target.nodeType === Node.ELEMENT_NODE) {
      return [target];
    } else {
      console.error('Invalid or null target found:', target);

      return [];
    }
  });

  // Warning if no valid targets are found
  if (validTargets.length === 0) {
    console.warn(`No valid targets for section: ${sectionSelector}`);

    return;
  }

  // Initial styling for the animation
  validTargets.forEach((target) => {
    target.style.opacity = 0;
    target.style.transform = `translateY(30px) scale(${animationOptions.scale ? 0.9 : 1})`;
  });

  // Trigger animation when section is in view with custom or default values.
  inView(section, () => {
    animate(
      validTargets,
      {
        y: [30, 0],
        opacity: [0, 1],
        scale: animationOptions.scale ? [0.9, 1] : [1, 1],  // scale - Customizable
      },
      {
        duration: animationOptions.duration || 1, // duration - Customizable
        delay: animationOptions.delay || 0.3, // delay - Customizable
        ease: 'easeInOut',  // easing function - Customizable ( requires additional logic )
      },
    );
  }, {
    amount: animationOptions.threshold || 0.5,  // threshold - Customizable
  });
}


// -------- ANIMATION SETUP (ON DOCUMENT LOAD) -------- \\
document.addEventListener('DOMContentLoaded', () => {

  // ---- Home Section Animations ---- \\
  setupSectionAnimations(
    '#home',
    [
      document.querySelector('.a__css__style__here'),
    ],
    {
      threshold: 0.5, // threshold - Customizable
      duration: 1.5, // duration - Customizable
      delay: 0.75, // delay - Customizable
    },
  );

  // ---- About Me Section Animations ---- \\
  setupSectionAnimations(
    '#about',
    [
      document.querySelector('.a__css__style__here'),
    ],
    {
      threshold: 0.5, // threshold - Customizable
      duration: 0.5, // duration - Customizable
      delay: 0.25, // delay - Customizable
    },
  );

  // ---- Add More Section Animations ---- \\

  /* Template:
  setupSectionAnimations(
    '#section-id',
    [
      document.querySelector('.style-me'),
    ],
    {
      threshold: 0.5,
      duration: 0.5,
      delay: 0.25,
    },
  );
  */

});
