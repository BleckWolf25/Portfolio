/**
 * loading.js - Loading screen handler
 * Coordinates with animations.js to ensure proper sequencing
 */
document.addEventListener('DOMContentLoaded', () => {
  const loaderWrapper = document.querySelector('.loader-wrapper');
  const contentWrapper = document.querySelector('.content-wrapper');

  if (!loaderWrapper) {
    console.warn('Loading wrapper not found in the document');

    return;
  }
  if (!contentWrapper) {
    console.warn('Content wrapper not found in the document');
  }

  // Display the loader
  loaderWrapper.style.display = 'flex';

  // Hide the main content until loading is complete
  if (contentWrapper) {
    contentWrapper.style.opacity = '0';
    contentWrapper.style.transform = 'translateY(20px)';
    contentWrapper.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';

  }

  const hideLoader = () => {
    // Fade out the loader
    loaderWrapper.style.opacity = '0';
    loaderWrapper.style.transition = 'opacity 0.5s ease-out';

    // After fade out completes, hide completely and show content
    setTimeout(() => {
      loaderWrapper.style.display = 'none';
      document.body.style.overflow = 'visible';

      // Show the main content
      if (contentWrapper) {
        contentWrapper.style.opacity = '1';
        contentWrapper.style.transform = 'translateY(0)';
      }

      // Dispatch an event to notify other scripts that loading is complete
      document.dispatchEvent(new CustomEvent('loadingComplete'));
    }, 500);
  };

  /*
   * Simulate loading time or wait for actual content to load
   * You can also use window.onload if waiting for all resources
   * setTimeout(hideLoader, 2000); // Adjust timing as needed
   */

  // Use window.onload to wait for all content to load:
  window.addEventListener('load', () => {
    setTimeout(hideLoader, 1500);
  });
});
