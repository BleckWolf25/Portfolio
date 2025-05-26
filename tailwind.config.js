/*
 * @file TAILWIND.CONFIG.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Tailwind CSS configuration for the project
 * Defines custom colors, fonts, and other design tokens
 * Configures dark mode and plugin integrations
 */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ─── PRIMARY (blue-green) ───────────────────────────────
        primary: {
          50:  '#e8fdfb',
          100: '#c2f9f3',
          200: '#8ef1e8',
          300: '#5fe9de',
          400: '#31e1d3',
          500: '#0ac9bc', // main
          600: '#08a89a',
          700: '#067877',
          800: '#044a4d',
          900: '#02221f',
        },

        // ─── SECONDARY (muted purple) ────────────────────────────
        secondary: {
          50:  '#f3f2f8',
          100: '#e1dfea',
          200: '#c7bee8',
          300: '#ab9ae3',
          400: '#8f75db',
          500: '#7555c2', // main
          600: '#5e44a0',
          700: '#49327a',
          800: '#322252',
          900: '#1c132f',
        },

        // ─── ACCENT (teal) ───────────────────────────────────────
        accent: {
          DEFAULT: '#14b8a6',
          100: '#b2f0eb',
          200: '#8ae8de',
          300: '#5ae1d2',
          400: '#2dd9c5',
          500: '#14b8a6', // main
          600: '#0f8c7c',
          700: '#0a614f',
          800: '#053429',
          900: '#021715',
        },

        // ─── NEUTRALS ────────────────────────────────────────────
        neutral: {
          // light-mode neutrals
          50:  '#fafafa',
          100: '#f3f3f3',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373', // main
          600: '#525252',
          700: '#404040',
          // dark-mode neutrals (override under .dark)
          800: '#1a1a1a',
          900: '#0d0d0d',
        },
      }
    }
  },
  plugins: [],
}
