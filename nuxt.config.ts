export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', 'motion-v/nuxt'],

	// Global CSS
	css: ['~/assets/css/main.css'],

	// Application head settings
	app: {
		head: {
			title: 'My Portfolio',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
				{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
			],
		},
	},

	// TypeScript strict mode
	typescript: {
		strict: true,
	},

	// Compatibility date (for Vite & Nitro)
	compatibilityDate: '2025-05-22',
})
