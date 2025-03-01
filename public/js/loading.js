window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    const content = document.querySelector('.content-wrapper');
    
    if (loader && content) {
      // Add fade-in animation to content
      content.style.opacity = '0';
      content.style.transform = 'translateY(20px)';
      
      // Smooth transition
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease-out';
        
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
        content.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        
        setTimeout(() => {
          loader.style.display = 'none';
          document.body.style.overflow = 'visible';
        }, 200);
      }, 200);
    }
});