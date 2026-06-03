/**
 * @file app.config.ts
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Client-App configuration.
 *
 * @description
 * Global client-side configuration for the Portfolio application, defining UI themes and other settings.
 * This configuration is used throughout the app to maintain consistent styling and behavior, allowing for easy updates and customization.
 *
 * @since 10/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'gray',
    },
  },
})
