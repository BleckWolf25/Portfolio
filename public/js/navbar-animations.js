/**
 * navbar-animations.js - Handles scroll-based animations for the navbar
 */
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
    
  // Performance-optimized scroll handling
  let lastScroll = 0;
  let ticking = false;
    
  // Adds ripple effect to navbar links
  const addRippleEffect = () => {
    const navLinks = document.querySelectorAll('.navbar__links');
      
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const rect = link.getBoundingClientRect();
        const diameter = Math.max(rect.width, rect.height);
          
        // Create and position the ripple element
        const ripple = document.createElement('span');

        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - rect.left - diameter / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - diameter / 2}px`;
          
        // Add and then cleanup ripple effect
        link.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  };
    
  // Navbar scroll behavior handler
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
          
        // Apply appropriate classes based on scroll direction
        if (currentScroll <= 50) {
          // At top of page
          navbar.classList.remove('scroll-up', 'scroll-down');
          navbar.classList.add('at-top');
        } else if (currentScroll > lastScroll && currentScroll > 100) {
          // Scrolling down & not at the top
          navbar.classList.remove('scroll-up', 'at-top');
          navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll) {
          // Scrolling up
          navbar.classList.remove('scroll-down', 'at-top');
          navbar.classList.add('scroll-up');
        }
          
        lastScroll = currentScroll;
        ticking = false;
      });
        
      ticking = true;
    }
  };
    
  // Add CSS classes to style the navbar based on scroll position
  const setupNavbarStyleClasses = () => {
    // Initial state
    if (window.scrollY <= 50) {
      navbar.classList.add('at-top');
    } else {
      navbar.classList.add('scroll-up');
    }
      
  };
    
  // Initialize animations
  addRippleEffect();
  setupNavbarStyleClasses();
    
  // Register scroll handler with passive flag for better performance
  window.addEventListener('scroll', handleScroll, { passive: true });
});