/*
 * @file Nuxt.config.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * Nuxt.js configuration file
 * Defines application settings, modules, and plugins
 */

// ------------ CONFIGURATION
export default defineNuxtConfig({
	compatibilityDate: '2025-05-25',
	future: {
		compatibilityVersion: 4,
	},

	app: {
		head: {
			title: 'BleckWolf25 - Portfolio',
			meta: [
				// Essential meta tags
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },

				// SEO and website information
				{ name: 'description', content: 'BleckWolf25 - Full-Stack Developer Portfolio showcasing modern web development projects and expertise' },
				{ name: 'author', content: 'BleckWolf25' },
				{ name: 'keywords', content: 'portfolio, web developer, full-stack, frontend, backend, vue, nuxt, typescript' },

				// Open Graph for social media
				{ property: 'og:title', content: 'BleckWolf25 - Portfolio' },
				{ property: 'og:description', content: 'Welcome to my professional portfolio showcasing innovative web development projects.' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: 'https://bleckwolf25.vercel.app' },
				{ property: 'og:image', content: 'https://bleckwolf25.vercel.app/images/profile.png' },

				// Twitter Card
				{ name: 'twitter:card', content: 'summary_large_image' },
				{ name: 'twitter:title', content: 'BleckWolf25 - Portfolio' },
				{ name: 'twitter:description', content: 'Professional web developer portfolio' },
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'canonical', href: 'https://bleckwolf25.vercel.app' }
			]
		}
	},

	// Enhanced SSR configuration for better performance
	ssr: true,

	// Nitro configuration for production optimization
	nitro: {
		experimental: {
			wasm: true
		},
		preset: 'vercel',
		compressPublicAssets: true,
		minify: true
	},

	// Comprehensive TypeScript configuration
	typescript: {
		strict: true,
		typeCheck: true,
		// Type checking for better development experience
		includeWorkspace: true,
		tsConfig: {
			compilerOptions: {
				// Modern ES target for better performance
				target: 'ES2022',
				module: 'ESNext',
				moduleResolution: 'Bundler',

				// Strict checking
				noImplicitReturns: true,
				noFallthroughCasesInSwitch: true,
				noUncheckedIndexedAccess: true,

				// Better import handling
				allowImportingTsExtensions: false,
				verbatimModuleSyntax: false
			}
		}
	},

	// Color mode configuration
	colorMode: {
		classSuffix: '',
		preference: 'system',
		fallback: 'light',
		storageKey: 'nuxt-color-mode',
	},

	// Modern font loading strategy
	fonts: {
		families: [
			{
				name: 'Open Sans',
				provider: 'google',
				preload: true,
				display: 'swap', // Better loading performance
				fallbacks: ['system-ui', 'sans-serif'],
				weights: [300, 400, 600, 700]
			}
		],
		// Performance optimization
		defaults: {
			weights: [400],
			styles: ['normal'],
			subsets: ['latin']
		}
	},

	// Icon configuration
	icon: {
		mode: 'css',
		cssLayer: 'icons',
		serverBundle: {
			collections: ['mdi', 'devicon', 'simple-icons', 'heroicons'],
			remote: false
		},
		clientBundle: {
			scan: true,
			sizeLimitKb: 512,
			includeCustomCollections: true
		}
	},

	// CSS optimization
	css: [
		'@/assets/css/main.css'
	],

	// Build configuration for TypeScript compatibility
	build: {
		transpile: [
			'@nuxt/ui',
			'@headlessui/vue',
			'@iconify/vue'
		]
	},

	// Optimized Vite configuration
	vite: {
		optimizeDeps: {
			include: [
				'@nuxt/ui',
				'@headlessui/vue',
				'@vueuse/core',
				'@iconify/vue'
			]
		},
		css: {
			// Modern CSS processing
			devSourcemap: true
		},
		ssr: {
			noExternal: ['@nuxt/ui']
		},
		// Maintainance
		define: {
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
		}
	},

	// Runtime configuration with type safety
	runtimeConfig: {

		// Public keys
		public: {
			siteName: 'BleckWolf25 Portfolio',
			siteUrl: 'https://bleckwolf25.vercel.app',
			contactEmail: 'coutinho4gaming@gmail.com'
		}
	},

	// Development tools
	devtools: {
		enabled: true,
		timeline: {
			enabled: true
		}
	},

	// Comprehensive module configuration
	modules: [
		// Core UI framework
		'@nuxt/ui',

		// Performance and assets
		'@nuxt/fonts',
		'@nuxt/icon',

		// Functionality
		'@nuxt/scripts',
		'@nuxtjs/color-mode',

		// Development and SEO (conditionally loaded)
		...(process.env.NODE_ENV === 'development' ? ['@nuxt/devtools'] : [])
	],

	// Production optimizations
	experimental: {
		payloadExtraction: false,
		viewTransition: true,
		renderJsonPayloads: true,
		typedPages: true, // Better type safety for pages
		watcher: 'parcel' // Faster file watching in development
	},

	// Security headers for production
	routeRules: {
		// Add security headers to all routes
		'/**': {
			headers: {
				'X-Frame-Options': 'DENY',
				'X-Content-Type-Options': 'nosniff',
				'Referrer-Policy': 'strict-origin-when-cross-origin'
			}
		},
		// Serve data files as static assets
		'/data/**': {
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=3600'
			}
		},
		// Prerender static pages for better performance
		'/': { prerender: true }
	},

	// Hooks for build optimization
	hooks: {
		'build:before': () => {
			console.log('🚀 Building portfolio with TypeScript configuration...')
		}
	}
})
