/**
 * Core navbar.js - Handles mobile menu toggling and section highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.navbar__menu');
  const navLinks = document.querySelectorAll('.navbar__links');
  const body = document.body;

  // Track menu state
  let menuOpen = false;

  // Intersection Observer for active section highlighting
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.navbar__links[href="#${id}"]`);

      if (entry.isIntersecting) {
        link?.classList.add('active');
        link?.setAttribute('aria-current', 'page');
      } else {
        link?.classList.remove('active');
        link?.removeAttribute('aria-current');
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Observe all sections with IDs for navigation highlighting
  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section);
  });

  // Mobile menu toggle function
  const toggleMenu = () => {
    menuOpen = !menuOpen;

    // Accessibility attributes and visual state
    mobileMenuButton.setAttribute('aria-expanded', menuOpen);
    navMenu.classList.toggle('active', menuOpen);

    // Lock scroll when menu is open
    body.style.overflow = menuOpen ? 'hidden' : '';

    // Focus management for accessibility
    if (menuOpen) {
      navMenu.querySelector('a:first-of-type')?.focus();
    }
  };

  // Mobile menu button click handler
  mobileMenuButton.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMenu();
  });

  // Close menu when clicking a nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (menuOpen) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (menuOpen &&
      !navMenu.contains(event.target) &&
      !mobileMenuButton.contains(event.target)) {
      toggleMenu();
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) {
      toggleMenu();
      mobileMenuButton.focus();
    }
  });

  // Keyboard accessibility for mobile menu button
  mobileMenuButton.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleMenu();
    }
  });
});