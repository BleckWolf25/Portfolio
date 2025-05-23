/**
 * @file ESLINT.CONFIG.JS
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * This file configures ESLint for the project, specifying rules,
 * environments, and plugins to ensure code quality and consistency.
 */

// ------------ CODE QUALITY CONFIGURATIONS (for IDEs) - do NOT change

/* eslint-disable import/no-unresolved */

// ------------ IMPORTS
import globals from 'globals';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import security from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import prettierPlugin from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

// ------------ DEFINE CONFIGURATION

/**
 * ESLint configuration for the project.
 * Extends recommended rules and plugins for JavaScript, Prettier, security, and SonarJS.
 * Enforces consistent code style, formatting (indentation, spacing, semicolons), and complexity limits.
 * Includes rules for maintainability, security best practices, and import path resolution via SonarJS.
 * Targets JavaScript files using ES module syntax, with the latest ECMAScript version and Node.js globals.
 * Compatible with ESLint v8.0.0+ and defined using the ESLint config API.
 * Exported as an array for potential future multi-config support.
 * Supports JavaScript files with .js, .mjs, and .cjs extensions.
 * Supports prettier integration for consistent code formatting.
 */
export default defineConfig([
	js.configs.recommended,
	{
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: globals.node,
		},
		plugins: {
			prettier: prettierPlugin,
			unicorn,
			security,
			sonarjs,
			import: importPlugin,
		},
		rules: {
			// Formatting & style
			'prettier/prettier': 'error',
			indent: ['error', 'tab'],
			'arrow-spacing': ['warn', { before: true, after: true }],
			'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
			'comma-dangle': ['error', 'always-multiline'],
			'comma-spacing': 'error',
			'comma-style': 'error',
			curly: ['error', 'multi-line', 'consistent'],
			'dot-location': ['error', 'property'],
			'handle-callback-err': 'warn',
			'keyword-spacing': 'error',
			'max-nested-callbacks': ['error', { max: 4 }],
			'max-statements-per-line': ['error', { max: 6 }],
			'no-console': 'warn',
			'no-empty-function': 'error',
			'no-floating-decimal': 'error',
			'no-inline-comments': 'error',
			'no-lonely-if': 'error',
			'no-multi-spaces': 'error',
			'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1, maxBOF: 0 }],
			'no-shadow': ['error', { allow: ['err', 'resolve', 'reject'] }],
			'no-trailing-spaces': ['error'],
			'no-var': 'error',
			'no-undef': 'warn',
			'no-unused-vars': 'warn',
			'object-curly-spacing': ['error', 'always'],
			'prefer-const': 'error',
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
			'space-before-blocks': 'error',
			'space-before-function-paren': [
				'error',
				{
					anonymous: 'never',
					named: 'never',
					asyncArrow: 'always',
				},
			],
			'space-in-parens': 'error',
			'space-infix-ops': 'error',
			'space-unary-ops': 'error',
			'spaced-comment': 'error',
			yoda: 'error',

			// Complexity & size limits
			complexity: ['error', { max: 64 }],
			'max-lines-per-function': ['error', 200],
			'max-params': ['error', 6],
			'max-statements': ['warn', 32],
			'max-lines': [
				'warn',
				{ max: 400, skipBlankLines: true, skipComments: true },
			],

			// Maintainability
			'sonarjs/cognitive-complexity': ['error', 64],

			// Security
			'security/detect-object-injection': 'error',
			'security/detect-non-literal-fs-filename': 'error',
			'security/detect-child-process': 'warn',

			'unicorn/prefer-ternary': 'error',
			'unicorn/require-number-to-fixed-digits-argument': 'error',

			// Import sorting/validation
			'import/order': ['warn', { 'newlines-between': 'always' }],
			'import/no-unresolved': 'error',
		},
		settings: {
			// SonarJS
			'import/resolver': {
				node: { extensions: ['.js', '.mjs', '.cjs'] },
			},
		},
	},
	// --- Test file overrides ---
	{
		files: ['**/tests/**/*.test.js', '**/*.test.js', '**/__tests__/**/*.js'],
		plugins: {
			jest: (await import('eslint-plugin-jest')).default,
		},
		env: {
			jest: true,
		},
		rules: {
			'max-lines-per-function': 'off',
			'max-lines': 'off',
			'max-statements': 'off',
			'no-console': 'off',
			'no-unused-vars': 'off',
			'security/detect-object-injection': 'off',
			'jest/no-disabled-tests': 'warn',
			'jest/no-focused-tests': 'error',
			'jest/no-identical-title': 'error',
			'jest/valid-expect': 'error',
		},
	},
	prettier,
]);
