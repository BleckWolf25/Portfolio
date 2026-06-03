<template>
  <!--
    AppSkipLink - keyboard accessibility skip-navigation link.

    Visually hidden until focused (via sr-only / focus:not-sr-only), allowing
    keyboard-only users to bypass the navbar and jump straight to the main
    content area (#main-content). The href target is the `id` on the root <div>
    in app.vue.
  -->
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 px-6 py-3 bg-surface text-text-primary border-2 border-accent font-bold font-mono rounded shadow-lg focus:outline-none focus:ring-4 focus:ring-accent-dim"
  >
    {{ $t('skipLink') }}
  </a>
</template>

<script setup lang="ts">
/**
 * @file AppSkipLink.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Accessibility utility component.
 *
 * @description
 * Accessibility utility component. Renders a visually-hidden anchor that
 * becomes visible on keyboard focus, enabling users who navigate by keyboard
 * (or assistive technology) to skip repetitive navigation and jump directly
 * to the page's main content.
 * The component has no logic - it relies entirely on the CSS `sr-only` /
 * `focus:not-sr-only` utilities provided by Tailwind CSS.
 *
 * @since 01/05/2026
 * @updated 02/06/2026
 */
</script>
