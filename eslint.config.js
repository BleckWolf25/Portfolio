import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Global settings and environment
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
    ],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },

  // Base configurations
  pluginJs.configs.recommended,

  // JSX A11y Plugin Configuration
  {
    plugins: {
      'jsx-a11y': pluginJsxA11y,
    },
  },

  // Project-specific rules
  {
    rules: {
      // Error Prevention
      'no-unused-vars': ['warn', { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_', 
      }],
      'no-undef': 'error',
      'no-console': ['warn', { 
        allow: ['warn', 'error'], 
      }],
      'no-debugger': 'warn',

      // Best Practices
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { 
        max: 2,
        maxEOF: 1, 
      }],

      // ES6+ Features
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'always'],
      'no-duplicate-imports': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': ['error', 'never'],

      // Style & Formatting
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { 
        'avoidEscape': true,
        'allowTemplateLiterals': true, 
      }],
      'indent': ['error', 2, { 
        'SwitchCase': 1, 
      }],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],

      // Code Organization
      'padding-line-between-statements': [
        'error',
        { 'blankLine': 'always', 'prev': '*', 'next': 'return' },
        { 'blankLine': 'always', 'prev': ['const', 'let', 'var'], 'next': '*' },
        { 'blankLine': 'any', 'prev': ['const', 'let', 'var'], 'next': ['const', 'let', 'var'] },
      ],

      // DOM & Browser
      'no-alert': 'warn',
      'no-script-url': 'error',

      // Error Handling
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error',

      // Performance
      'no-unused-expressions': ['error', { 
        'allowShortCircuit': true,
        'allowTernary': true, 
      }],

      // Accessibility (JSX A11y)
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',

      // Comments
      'multiline-comment-style': ['error', 'starred-block'],
      'spaced-comment': ['error', 'always', {
        'line': {
          'markers': ['/'],
          'exceptions': ['-', '+'],
        },
        'block': {
          'markers': ['!'],
          'exceptions': ['*'],
          'balanced': true,
        },
      }],
    },
  },
];