document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.navbar__menu');
  
  // Add scroll behavior
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll <= 0) {
      navbar.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-up');
      navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-down');
      navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });

  // Smooth active link transition
  const updateActiveLink = () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.navbar__links[href*=${sectionId}]`)?.classList.add('active');
      } else {
        document.querySelector(`.navbar__links[href*=${sectionId}]`)?.classList.remove('active');
      }
    });
  };

  // Query selector for mobile
  document.querySelectorAll('.navbar__links').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Enhanced mobile menu animation
  mobileMenu?.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);
});