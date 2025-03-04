/**
 * projects.js - Handles the image modal functionality for project cards.
 *
 * This file implements a modal (popup) that displays a larger version of the
 * project image when the user clicks on it. It also provides a caption for
 * the image and manages the modal's opening, closing, and accessibility.
 *
 * Key features:
 *
 * 1.  **Image Modal:** Opens a modal that overlays the page, showing a larger
 *     version of the clicked project image.
 *
 * 2.  **Image Caption:** Displays the `alt` attribute of the clicked image as
 *     a caption in the modal (if present).
 *
 * 3.  **Scroll Management:** Stores the current scroll position before opening
 *     the modal and restores it when the modal is closed. It also prevents
 *     scrolling of the background page while the modal is open.
 *
 * 4.  **Modal Closing:** Provides multiple ways to close the modal:
 *     -   Clicking the close button.
 *     -   Clicking outside the modal image.
 *     -   Pressing the `Escape` key.
 *
 * 5.  **Image Loading Indication:** Adds a `loaded` class to the modal image
 *     when it has finished loading, allowing for CSS-based loading indicators.
 * 6. **Accessibility:** Handle the accessibility, with the escape key.
 */

// Get the modal, image, close button, and caption elements
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const closeBtn = document.getElementById('modal-close');
const captionText = document.getElementById('modal-caption');

// Variable to store scroll position - customizable (not recommended to change it)
let scrollY = 0;

// Get all project card images
const images = document.querySelectorAll('.projects-card__image img');

// Add click event to each image
images.forEach((img) => {
  img.addEventListener('click', () => {
    
    // Store current scroll position
    scrollY = window.scrollY;

    // Prevent body scroll and fix scroll position
    document.body.classList.add('body-no-scroll');
    document.body.style.top = `-${scrollY}px`;

    // Open modal and set image source
    modal.style.display = 'block';
    modalImg.src = img.src;
    modalImg.alt = img.alt;

    // Set caption text if available
    if (captionText) {
      captionText.textContent = img.alt;
    }

    // Set the modal image to be on the current scroll Y
    modal.style.top = `${scrollY}px`;

    // Add loaded class when image is ready
    if (modalImg.complete) {
      modalImg.classList.add('loaded');
    } else {
      modalImg.addEventListener('load', () => {
        modalImg.classList.add('loaded');
      });
    }
  });
});

/**
 * Function to close the modal.
 *
 * Restores body scroll, resets modal styles, and returns the user to their
 * original scroll position.
 */
function closeModal() {

  // Restore body scroll and reset styles
  document.body.classList.remove('body-no-scroll');
  document.body.style.top = '';

  // Scroll to the original position
  window.scrollTo(0, scrollY);

  // Hide modal and reset image
  modal.style.display = 'none';
  modalImg.classList.remove('loaded');
}

// Close modal when close button is clicked
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the image - Customizable (you can remove this or add something else)
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with ESC key - Customizable (you can remove this or add something else)
document.addEventListener('keydown', (e) => { 
  if (e.key === 'Escape') {
    closeModal();
  }
});
