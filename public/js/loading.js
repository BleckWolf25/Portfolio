// loading.js

/**
 * Manages the loading screen, hiding it once the page is fully loaded.
 * It coordinates with animations.js to ensure proper sequencing.
 */
document.addEventListener('DOMContentLoaded', () => {
  const loaderWrapper = document.querySelector('.loader-wrapper');
  const contentWrapper = document.querySelector('.content-wrapper');


  // Error handling for missing elements
  if (!loaderWrapper) {
    console.warn('Loading wrapper not found in the document');
    return;
  }
  if (!contentWrapper) {
    console.warn('Content wrapper not found in the document');
  }

  // Initial Display of Loader
  loaderWrapper.style.display = 'flex'; // Show loader - Customizable

  // Initially hide main content - Customizable but not recommended to change except style.transition
  contentWrapper.style.opacity = '0';
  contentWrapper.style.transform = 'translateY(20px)';
  contentWrapper.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';

  /**
   * Hides the loading screen and shows the main content.
   */
  const hideLoader = () => {
    //Fade out the loader
    loaderWrapper.style.opacity = '0';
    loaderWrapper.style.transition = 'opacity 0.5s ease-out';

    // After fade out, hide completely and show content
    setTimeout(() => {
      loaderWrapper.style.display = 'none';
      document.body.style.overflow = 'visible'; // Enable scrolling - Customizable

      // Show main content
      contentWrapper.style.opacity = '1'; 
      contentWrapper.style.transform = 'translateY(0)';

      // Dispatch custom event to signal loading completion
      document.dispatchEvent(new CustomEvent('loadingComplete'));
    }, 500);
  };

  // Wait for window load event before hiding loader. This ensures all assets have loaded.
  window.addEventListener('load', () => {
    setTimeout(hideLoader, 1500); // Delay - Customizable
  });
});
