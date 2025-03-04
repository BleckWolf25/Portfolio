/**
 * navbar.js - Core functionality for the navigation bar, including mobile menu behavior and section highlighting.
 *
 * This file manages the interactive behavior of the navigation bar, particularly focusing on:
 *
 * 1.  **Mobile Menu Toggle:** Handles the opening and closing of the mobile navigation menu when the
 *     hamburger button is clicked. It also manages the visual and accessibility state of the menu.
 *
 * 2.  **Active Section Highlighting:** Uses the Intersection Observer API to dynamically highlight the
 *     navigation link corresponding to the section currently in view. This provides clear feedback to the
 *     user about their location on the page.
 *
 * 3.  **Menu Closing on Link Click:** Automatically closes the mobile menu when a navigation link is clicked,
 *     ensuring a smooth navigation experience.
 *
 * 4.  **Menu Closing on Outside Click:** Allows the user to close the mobile menu by clicking anywhere outside
 *     of the menu or the hamburger button.
 *
 * 5.  **Accessibility Enhancements:** Implements keyboard navigation and ARIA attributes to ensure the navigation
 *     menu is accessible to users with disabilities.
 *
 * 6. **Menu Closing on Escape Key:** Allows the user to close the mobile menu with the Escape key.
 *
 * 7. **Keyboard accessibility for mobile menu button:** When the button has focus, user can use Enter or Space to open the mobile menu.
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // Get references to key elements in the DOM.
  const mobileMenuButton = document.getElementById('mobile-menu'); // The hamburger button.
  const navMenu = document.querySelector('.navbar__menu'); // The navigation menu container.
  const navLinks = document.querySelectorAll('.navbar__links'); // All navigation links.
  const body = document.body; // The document body.

  // Track the state of the mobile menu (open/closed).
  let menuOpen = false;

  /**
   * Intersection Observer setup for active section highlighting.
   * This observer tracks which sections are in the viewport and highlights the corresponding
   * navigation links.
   */
  const observerOptions = {
    root: null, // Use the viewport as the root.
    rootMargin: '0px', // No margin around the root. - Customizable
    threshold: 0.5, // Trigger when 50% of the section is visible. - Customizable
  };

  /**
   * Callback function for the Intersection Observer.
   * @param {IntersectionObserverEntry[]} entries - Array of observed entries.
   */
  const observerCallback = (entries) => {
    entries.forEach((entry) => {

      // Get the ID of the section.
      const id = entry.target.getAttribute('id');
      
      // Find the corresponding navigation link.
      const link = document.querySelector(`.navbar__links[href="#${id}"]`);

      // If the section is intersecting, add the 'active' class to the link and set aria-current attribute.
      if (entry.isIntersecting) {
        link?.classList.add('active');
        link?.setAttribute('aria-current', 'page');
      } else {
        
        // Otherwise, remove the 'active' class and aria-current attribute.
        link?.classList.remove('active');
        link?.removeAttribute('aria-current');
      }
    });
  };

  // Create a new Intersection Observer instance.
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all sections with IDs for navigation highlighting.
  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section);
  });

  /**
   * Toggles the mobile menu open/closed state.
   * Manages accessibility attributes and scroll locking.
   */
  const toggleMenu = () => {
    // Toggle the menu state.
    menuOpen = !menuOpen;

    // Update accessibility attributes to reflect the menu's state.
    mobileMenuButton.setAttribute('aria-expanded', menuOpen);
    
    // Toggle the 'active' class on the menu to show/hide it.
    navMenu.classList.toggle('active', menuOpen);

    // Lock or unlock body scroll based on menu state.
    body.style.overflow = menuOpen ? 'hidden' : '';

    // Focus management: if menu is opened, focus the first link
    if (menuOpen) {
      navMenu.querySelector('a:first-of-type')?.focus();
    }
  };

  // Mobile menu button click handler: toggle the menu on click.
  mobileMenuButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior.
    toggleMenu();
  });

  // Close menu when clicking a nav link:
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      
      // If the menu is open, close it.
      if (menuOpen) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside the menu:
  document.addEventListener('click', (event) => {
    
    // Check if the menu is open and the click is outside both the menu and the button.
    if (
      menuOpen &&
      !navMenu.contains(event.target) &&
      !mobileMenuButton.contains(event.target)
    ) {
      toggleMenu(); // Close the menu.
    }
  });

  // Close menu on Escape key press.
  document.addEventListener('keydown', (event) => {
    
    // If Escape is pressed and the menu is open.
    if (event.key === 'Escape' && menuOpen) {
      toggleMenu(); // Close the menu.
      mobileMenuButton.focus(); // return the focus to the button.
    }
  });

  // Keyboard accessibility for mobile menu button. - Customizable, you can change the keybind or remove this.
  mobileMenuButton.addEventListener('keydown', (event) => {
    
    // If Enter or Space is pressed.
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default link behavior.
      toggleMenu(); // open the menu.
    }
  });
});
