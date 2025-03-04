// cursor.js

/**
 * Creates and animates a custom cursor on the webpage.
 * The cursor follows the mouse and scales on interaction with specific elements.
 */

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Select the custom cursor element from the DOM
  const customCursor = document.querySelector('.custom-cursor');

  // Variables to store the mouse and cursor positions, and the scale of the cursor - Don't change those
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let scale = 1;   // Scale factor for the cursor (default is 1) - Customizable

  /**
   * Animates the cursor smoothly using requestAnimationFrame.
   * This function updates the cursor's position and scale based on the mouse position.
   */
  const animateCursor = () => {
    // Calculate the difference between the mouse and cursor positions - Don't change those
    const dx = mouseX - cursorX; 
    const dy = mouseY - cursorY;

    // Move the cursor towards the mouse position using linear interpolation
    cursorX += dx * 0.1; // Adjust cursor X position by 10% of the difference - Customizable
    cursorY += dy * 0.1; // Adjust cursor Y position by 10% of the difference - Customizable

    // Apply the transformation to the custom cursor element
    customCursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(${scale})`;

    // Request the next animation frame to continue the animation
    requestAnimationFrame(animateCursor);
  };

  // Start the cursor animation
  animateCursor();

  // Update the mouse position whenever the mouse moves
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Select all interactive elements (links, buttons, elements with specific classes or attributes)
  const interactiveElements = document.querySelectorAll(
    'a, button, .interactive, [data-cursor="interactive"]',
  );

  // Add event listeners to each interactive element
  interactiveElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
      scale = 1.2; // cursor scale when enters an interactive element - Customizable
      customCursor.classList.add('interactive'); // Add a class for styling
    });

    element.addEventListener('mouseleave', () => {
      scale = 1; // cursor scale when leaves an interactive element - Customizable
      customCursor.classList.remove('interactive'); // Remove the class
    });
  });
});