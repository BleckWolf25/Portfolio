document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const mobileMenuButton = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.navbar__menu');
  const navLinks = document.querySelectorAll('.navbar__links');
  const body = document.body;

  // Throttle scroll handler
  let lastScroll = 0;
  let isScrolling = false;

  const handleScroll = () => {
    if (isScrolling) { return; }
    isScrolling = true;

    requestAnimationFrame(() => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
      } else if (currentScroll > lastScroll) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
      } else {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
      }

      lastScroll = currentScroll;
      isScrolling = false;
    });
  };

  // Intersection Observer for active links
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

  document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));

  // Mobile menu handling
  const toggleMenu = (state) => {
    const isExpanded = state === 'toggle' ?
      !(mobileMenuButton.getAttribute('aria-expanded') === 'true') :
      state;

    mobileMenuButton.setAttribute('aria-expanded', isExpanded);
    navMenu.classList.toggle('active', isExpanded);
    body.style.overflow = isExpanded ? 'hidden' : '';

    if (isExpanded) {
      navMenu.querySelector('a').focus();
    }
  };

  // Event handlers
  const handleMenuClick = (event) => {
    if (event.target === mobileMenuButton || event.key === 'Enter') {
      toggleMenu('toggle');
    }
  };

  const handleDocumentClick = (event) => {
    if (!navMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
      toggleMenu(false);
    }
  };

  const handleEscape = (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu(false);
      mobileMenuButton.focus();
    }
  };

  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  mobileMenuButton.addEventListener('click', handleMenuClick);
  mobileMenuButton.addEventListener('keydown', handleMenuClick);
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleEscape);

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMenu(false);
      link.blur();
    });
  });
});