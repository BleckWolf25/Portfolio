// Get the modal, image, close button, and caption elements
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const closeBtn = document.getElementById('modal-close');
const captionText = document.getElementById('modal-caption');

// Variable to store scroll position
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

// Function to close the modal
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

// Close modal when clicking outside the image
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});