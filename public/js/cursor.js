/* eslint-disable arrow-parens */
document.addEventListener('DOMContentLoaded', () => {
  const customCursor = document.querySelector('.custom-cursor');
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let scale = 1;
  
  // Smoother animation frame logic
  const animateCursor = () => {
    // Linear interpolation for smooth movement
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
      
    cursorX += dx * 0.1;
    cursorY += dy * 0.1;
      
    customCursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(${scale})`;
    requestAnimationFrame(animateCursor);
  };
    
  animateCursor();
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Interactive elements logic
  const interactiveElements = document.querySelectorAll(
    'a, button, .interactive, [data-cursor="interactive"]',
  );
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      scale = 1.2;
      customCursor.classList.add('interactive');
    });
      
    element.addEventListener('mouseleave', () => {
      scale = 1;
      customCursor.classList.remove('interactive');
    });
  });
});