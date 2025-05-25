/**
 * @file CURSOR.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Custom Cursor System
 * A modern, performant, and accessible cursor implementation
 */

// ------------ CUSTOM CURSOR SINGLE-TON CLASS
class CustomCursor {
  /**
   * Default configuration options
   * @private
   */
  static #defaultConfig = {
    // Animation settings
    followSpeed: 0.1,          // How fast cursor follows mouse (0-1)
    scaleSpeed: 0.15,          // How fast scaling animations occur

    // Visual settings
    defaultScale: 1,           // Default cursor scale
    hoverScale: 1.2,          // Scale when hovering interactive elements

    // Cursor images/styles
    defaultCursor: '../images/default_cursor.svg',
    interactiveCursor: '../images/default_pointer.png',

    // Element selectors
    interactiveSelectors: [
      'a', 'button', 'input[type="button"]', 'input[type="submit"]',
      '.interactive', '[data-cursor="interactive"]', '[role="button"]'
    ],

    // Performance settings
    throttleMs: 16,            // ~60fps throttling

    // Feature flags
    respectReducedMotion: true, // Honor prefers-reduced-motion
    enableTouchFallback: false  // Show cursor on touch devices
  };

  /**
   * Internal state
   * @private
   */
  #state = {
    isActive: false,
    isDestroyed: false,
    mouse: { x: 0, y: 0 },
    cursor: { x: 0, y: 0 },
    targetScale: 1,
    currentScale: 1,
    animationId: null,
    lastUpdate: 0
  };

  /**
   * DOM references
   * @private
   */
  #refs = {
    cursor: null,
    interactiveElements: new Set()
  };

  /**
   * Timeout for resize debouncing
   * @private
   */
  #resizeTimeout = null;

  /**
   * Event handlers (bound methods for proper cleanup)
   * @private
   */
  #handlers = {
    mousemove: null,
    mouseenter: null,
    mouseleave: null,
    visibilitychange: null,
    resize: null
  };

  /**
   * Initialize the custom cursor system
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    // Merge user config with defaults
    this.config = { ...CustomCursor.#defaultConfig, ...config };

    // Early exit for touch-only devices (unless explicitly enabled)
    if (!this.#shouldInitialize()) {
      console.info('CustomCursor: Skipping initialization (touch device or reduced motion)');
      return;
    }

    // Bind event handlers
    this.#bindHandlers();

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.#init(), { once: true });
    } else {
      this.#init();
    }
  }

  /**
   * Check if cursor should be initialized
   * @private
   */
  #shouldInitialize() {
    // Check for touch device
    const isTouchDevice = (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(hover: none)').matches
    );

    // Check for reduced motion preference
    const prefersReducedMotion = this.config.respectReducedMotion &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fix: Properly group logic for initialization
    return (!isTouchDevice || this.config.enableTouchFallback) && !prefersReducedMotion;
  }

  /**
   * Bind event handlers with proper context
   * @private
   */
  #bindHandlers() {
    this.#handlers.mousemove = this.#handleMouseMove.bind(this);
    this.#handlers.mouseenter = this.#handleInteractiveEnter.bind(this);
    this.#handlers.mouseleave = this.#handleInteractiveLeave.bind(this);
    this.#handlers.visibilitychange = this.#handleVisibilityChange.bind(this);
    this.#handlers.resize = this.#handleResize.bind(this);
  }

  /**
   * Initialize the cursor system
   * @private
   */
  #init() {
    try {
      this.#createCursorElement();
      this.#setupEventListeners();
      this.#startAnimation();
      this.#state.isActive = true;

      console.info('CustomCursor: Successfully initialized');
    } catch (error) {
      console.error('CustomCursor: Initialization failed', error);
      this.destroy();
    }
  }

  /**
   * Create the cursor DOM element
   * @private
   */
  #createCursorElement() {
    // Remove existing cursor if present
    const existing = document.querySelector('.custom-cursor');
    existing?.remove();

    // Create new cursor element
    this.#refs.cursor = document.createElement('div');
    this.#refs.cursor.className = 'custom-cursor';
    this.#refs.cursor.setAttribute('aria-hidden', 'true');
    this.#refs.cursor.setAttribute('data-cursor-system', 'active');

    // Apply initial styles
    Object.assign(this.#refs.cursor.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '32px',
      height: '32px',
      backgroundImage: `url('${this.config.defaultCursor}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: '9999',
      willChange: 'transform',
      opacity: '0',
      transition: 'opacity 0.3s ease'
    });

    document.body.appendChild(this.#refs.cursor);

    // Fade in cursor
    requestAnimationFrame(() => {
      this.#refs.cursor.style.opacity = '1';
    });
  }

  /**
   * Setup all event listeners
   * @private
   */
  #setupEventListeners() {
    // Mouse movement tracking
    document.addEventListener('mousemove', this.#handlers.mousemove, { passive: true });

    // Visibility and resize handling
    document.addEventListener('visibilitychange', this.#handlers.visibilitychange);
    window.addEventListener('resize', this.#handlers.resize, { passive: true });

    // Setup interactive elements
    this.#updateInteractiveElements();

    // Hide default cursor
    this.#hideDefaultCursor();
  }

  /**
   * Handle mouse movement with throttling
   * @private
   */
  #handleMouseMove(event) {
    const now = performance.now();

    // Throttle updates for performance
    if (now - this.#state.lastUpdate < this.config.throttleMs) {
      return;
    }

    this.#state.mouse.x = event.clientX;
    this.#state.mouse.y = event.clientY;
    this.#state.lastUpdate = now;
  }

  /**
   * Handle entering interactive elements
   * @private
   */
  #handleInteractiveEnter(event) {
    if (!this.#state.isActive) return;

    this.#state.targetScale = this.config.hoverScale;
    this.#refs.cursor.style.backgroundImage = `url('${this.config.interactiveCursor}')`;
    this.#refs.cursor.classList.add('interactive');

    // Dispatch custom event for external listeners
    this.#dispatchCursorEvent('cursorenter', event.target);
  }

  /**
   * Handle leaving interactive elements
   * @private
   */
  #handleInteractiveLeave(event) {
    if (!this.#state.isActive) return;

    this.#state.targetScale = this.config.defaultScale;
    this.#refs.cursor.style.backgroundImage = `url('${this.config.defaultCursor}')`;
    this.#refs.cursor.classList.remove('interactive');

    // Dispatch custom event for external listeners
    this.#dispatchCursorEvent('cursorleave', event.target);
  }

  /**
   * Handle visibility changes (tab switching, etc.)
   * @private
   */
  #handleVisibilityChange() {
    if (document.hidden) {
      this.pause();
    } else {
      this.resume();
    }
  }

  /**
   * Handle window resize
   * @private
   */
  #handleResize() {
    // Debounce resize handling
    clearTimeout(this.#resizeTimeout);
    this.#resizeTimeout = setTimeout(() => {
      this.#updateInteractiveElements();
    }, 250);
  }

  /**
   * Update interactive elements list
   * @private
   */
  #updateInteractiveElements() {
    // Clear existing listeners
    this.#refs.interactiveElements.forEach(element => {
      element.removeEventListener('mouseenter', this.#handlers.mouseenter);
      element.removeEventListener('mouseleave', this.#handlers.mouseleave);
    });
    this.#refs.interactiveElements.clear();

    // Find and bind new interactive elements
    const selector = this.config.interactiveSelectors.join(', ');
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      element.addEventListener('mouseenter', this.#handlers.mouseenter, { passive: true });
      element.addEventListener('mouseleave', this.#handlers.mouseleave, { passive: true });
      this.#refs.interactiveElements.add(element);
    });
  }

  /**
   * Hide the default system cursor
   * @private
   */
  #hideDefaultCursor() {
    // Create or update cursor hiding styles
    let styleElement = document.getElementById('custom-cursor-styles');

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'custom-cursor-styles';
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
      @media (hover: hover) and (pointer: fine) {
        body, body * {
          cursor: none !important;
        }
      }
    `;
  }

  /**
   * Start the animation loop
   * @private
   */
  #startAnimation() {
    const animate = (timestamp) => {
      if (this.#state.isDestroyed) return;

      this.#updateCursorPosition();
      this.#updateCursorScale();

      this.#state.animationId = requestAnimationFrame(animate);
    };

    this.#state.animationId = requestAnimationFrame(animate);
  }

  /**
   * Update cursor position with smooth following
   * @private
   */
  #updateCursorPosition() {
    const { mouse, cursor } = this.#state;
    const speed = this.config.followSpeed;

    // Smooth interpolation
    cursor.x += (mouse.x - cursor.x) * speed;
    cursor.y += (mouse.y - cursor.y) * speed;

    // Apply position (scale is handled separately for smoother animation)
    this.#refs.cursor.style.transform =
      `translate(${cursor.x}px, ${cursor.y}px) translate(-50%, -50%) scale(${this.#state.currentScale})`;
  }

  /**
   * Update cursor scale with smooth animation
   * @private
   */
  #updateCursorScale() {
    const speed = this.config.scaleSpeed;
    const diff = this.#state.targetScale - this.#state.currentScale;

    // Only update if there's a meaningful difference
    if (Math.abs(diff) > 0.001) {
      this.#state.currentScale += diff * speed;
    }
  }

  /**
   * Dispatch custom cursor events
   * @private
   */
  #dispatchCursorEvent(type, target) {
    const event = new CustomEvent(type, {
      detail: { target, cursor: this.#refs.cursor },
      bubbles: true
    });
    document.dispatchEvent(event);
  }

  /**
   * Public API Methods
   */

  /**
   * Pause cursor animations (useful for performance)
   */
  pause() {
    if (this.#state.animationId) {
      cancelAnimationFrame(this.#state.animationId);
      this.#state.animationId = null;
    }
    this.#state.isActive = false;
  }

  /**
   * Resume cursor animations
   */
  resume() {
    if (!this.#state.isActive && !this.#state.isDestroyed) {
      this.#startAnimation();
      this.#state.isActive = true;
    }
  }

  /**
   * Update configuration at runtime
   * @param {Object} newConfig - New configuration options
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };

    // Re-setup interactive elements if selectors changed
    if (newConfig.interactiveSelectors) {
      this.#updateInteractiveElements();
    }

    // Update cursor images if changed
    if (newConfig.defaultCursor && !this.#refs.cursor.classList.contains('interactive')) {
      this.#refs.cursor.style.backgroundImage = `url('${newConfig.defaultCursor}')`;
    }
  }

  /**
   * Refresh interactive elements (call after DOM changes)
   */
  refresh() {
    this.#updateInteractiveElements();
  }

  /**
   * Get current cursor state (useful for debugging)
   */
  getState() {
    return {
      isActive: this.#state.isActive,
      position: { ...this.#state.cursor },
      scale: this.#state.currentScale,
      interactiveElementsCount: this.#refs.interactiveElements.size
    };
  }

  /**
   * Destroy the cursor system and clean up resources
   */
  destroy() {
    if (this.#state.isDestroyed) return;

    // Cancel animation
    if (this.#state.animationId) {
      cancelAnimationFrame(this.#state.animationId);
    }

    // Remove event listeners
    document.removeEventListener('mousemove', this.#handlers.mousemove);
    document.removeEventListener('visibilitychange', this.#handlers.visibilitychange);
    window.removeEventListener('resize', this.#handlers.resize);

    // Clean up interactive elements
    this.#refs.interactiveElements.forEach(element => {
      element.removeEventListener('mouseenter', this.#handlers.mouseenter);
      element.removeEventListener('mouseleave', this.#handlers.mouseleave);
    });
    this.#refs.interactiveElements.clear();

    // Remove DOM elements
    this.#refs.cursor?.remove();
    document.getElementById('custom-cursor-styles')?.remove();

    // Clear timeouts
    clearTimeout(this.#resizeTimeout);

    // Mark as destroyed
    this.#state.isDestroyed = true;

    console.info('CustomCursor: Successfully destroyed');
  }
}

/**
 * Factory function for easy initialization
 * @param {Object} config - Configuration options
 * @returns {CustomCursor} Cursor instance
 */
const createCustomCursor = (config) => new CustomCursor(config);

/**
 * Auto-initialize with default settings (can be disabled)
 * Uncomment the line below to auto-initialize
 */
// const cursor = createCustomCursor();

/**
 * Export for module usage
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CustomCursor, createCustomCursor };
} else if (typeof window !== 'undefined') {
  window.CustomCursor = CustomCursor;
  window.createCustomCursor = createCustomCursor;
}
