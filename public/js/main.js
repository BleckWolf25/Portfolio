// Main.js - Imports and vercel insights(if you use vercel to deploy)

/**
 * This is the main entry point for the client-side JavaScript of the portfolio website.
 * It's responsible for importing and initializing all the different JavaScript modules - if you are using ESM
 * that handle various aspects of the site's functionality, such as animations,
 * It also integrates Vercel's Speed Insights for performance monitoring. - optionally
 */

// Importing different modules that handle specific functionalities.
import './animations.js'; // Handles animations for elements as they enter the viewport.
import './cursor.js'; // Manages the custom cursor effect on the page.
import './loading.js'; // Controls the loading screen and its behavior.
import './navbar-animations.js'; // Manages the animations and behavior of the navbar based on scroll.
import './navbar.js'; // Handles the core functionality of the navbar, including mobile menu toggling and section highlighting.
import './projects.js'; // Implements the image modal for the project cards.

// Importing the Vercel Speed Insights library for performance monitoring. - optional
import { injectSpeedInsights } from '@vercel/speed-insights';

/**
 * Initialize Speed Insights
 * This function injects Vercel's Speed Insights into the page.
 * It's crucial for performance monitoring and gaining insights into
 * real user experience on the website.
 */
injectSpeedInsights();