/**
 * navbar-animations.js - Handles scroll-based animations and interactive effects for the navigation bar.
 *
 * This file is responsible for enhancing the navigation bar's behavior by adding dynamic animations and
 * visual feedback based on user interaction and scrolling. It includes features such as:
 *
 * 1.  **Scroll-Based Navbar Styling:** Changes the navbar's appearance (e.g., background, shadow) as the user scrolls
 *     the page. The navbar will show a different style when it's at the top of the page and when it is scrolling.
 *     It also distinguishes between scrolling up and scrolling down, offering a more dynamic user experience.
 *
 * 2.  **Ripple Effect on Links:** Adds a visual ripple effect when a user clicks on any of the navigation links.
 *     This provides instant feedback and makes the interaction more engaging.
 *
 * 3.  **Performance Optimization:** Implements a `ticking` mechanism using `requestAnimationFrame` to ensure smooth
 *     scrolling animations. This prevents the browser from being overwhelmed by continuous scroll events,
 *     leading to smoother performance.
 *
 * 4.  **Initial Navbar Setup:** When the page first loads, it sets the initial style of the navbar based on
 *     whether the page is at the very top or not.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // Selects the main navigation bar element.
  const navbar = document.querySelector('.navbar');

  // Variables for scroll performance optimization.
  let lastScroll = 0; // Stores the last known scroll position.
  let ticking = false; // Flag to control scroll event processing.

  /**
   * Adds a ripple effect to each navigation link on click.
   * When a link is clicked, a visual ripple emanates from the click point.
   */
  const addRippleEffect = () => {
    // Selects all elements with the class 'navbar__links' (navigation links).
    const navLinks = document.querySelectorAll('.navbar__links');

    // Iterate over each navigation link.
    navLinks.forEach((link) => {

      // Add a click event listener to each link.
      link.addEventListener('click', (e) => {
        
        // Get the link's position and dimensions.
        const rect = link.getBoundingClientRect();
        
        // Determine the ripple's diameter (largest of width or height).
        const diameter = Math.max(rect.width, rect.height);

        // Create a new 'span' element for the ripple effect.
        const ripple = document.createElement('span');

        // Set the ripple element's class and position based on the click event.
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`; // Center ripple horizontally.
        ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`; // Center ripple vertically.

        // Append the ripple to the link and remove it after 600ms.
        link.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  };

  /**
   * Handles the navbar's scroll behavior by adding/removing CSS classes.
   * Uses requestAnimationFrame for smooth transitions.
   */
  const handleScroll = () => {
    
    // Check if a scroll animation is already being processed.
    if (!ticking) {
      
      // Schedule an animation frame.
      window.requestAnimationFrame(() => {
        
        // Get the current scroll position.
        const currentScroll = window.scrollY;

        // Determine the navbar's class based on the scroll direction and position.
        if (currentScroll <= 50) {
          // At the top of the page.
          navbar.classList.remove('scroll-up', 'scroll-down');
          navbar.classList.add('at-top');
        } else if (currentScroll > lastScroll && currentScroll > 100) {
          // Scrolling down (and not at the top).
          navbar.classList.remove('scroll-up', 'at-top');
          navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll) {
          // Scrolling up.
          navbar.classList.remove('scroll-down', 'at-top');
          navbar.classList.add('scroll-up');
        }

        // Update the last scroll position and reset the ticking flag.
        lastScroll = currentScroll;
        ticking = false;
      });

      // Set the ticking flag to true to prevent multiple animation requests.
      ticking = true;
    }
  };

  /**
   * Sets up the initial CSS classes for the navbar based on the page's scroll position.
   * This ensures the correct style is applied on page load.
   */
  const setupNavbarStyleClasses = () => {
    
    // Check if the page is at the top.
    if (window.scrollY <= 50) {
      
      // Add the 'at-top' class if at the top.
      navbar.classList.add('at-top');
    } else {
      
      // Add the 'scroll-up' class if not at the top.
      navbar.classList.add('scroll-up');
    }
  };

  // Initialize the navbar animations and styling.
  addRippleEffect();
  setupNavbarStyleClasses();

  // Register the scroll event listener with the 'passive' option for performance.
  window.addEventListener('scroll', handleScroll, { passive: true });
});
