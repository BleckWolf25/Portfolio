/**
 * @file eslint.config.mjs
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @summary ESLint configuration for the portfolio.
 *
 * @description
 * Uses the default Nuxt ESLint configuration and extends it with custom rules for the project.
 *
 * @since 10/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import withNuxt from './.nuxt/eslint.config.mjs'

// ---------- CONFIGURATION
export default withNuxt({
  rules: {
    'no-console': 'off',
    'no-debugger': 'error',
    'prefer-const': 'error',
    eqeqeq: ['error', 'smart'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/no-unnecessary-condition': 'off',
    'vue/html-indent': ['error', 2],
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
  },
})
