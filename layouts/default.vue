<!--
    - @file: Default.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
    - Default layout component for the application.
		- It serves as a wrapper for the main content and includes a footer with social links.
		- The social links are dynamically loaded from a JSON file.
		- The layout is theme-aware and uses CSS & tailwindcss variables for styling.
-->

<!-- Template Part -->
<template>
	<div>
		<!-- Under Development Banner -->
		<transition name="fade">
			<div v-if="showBanner" class="dev-banner" :style="bannerStyle" role="status" aria-live="polite">
				<span>
					🚧 This website is under development.
				</span>
				<button class="dev-banner-close" :title="bannerClosed ? 'Show banner' : 'Hide banner'" @click="toggleBanner"
					aria-label="Hide development banner">
					<svg v-if="!bannerClosed" width="18" height="18" viewBox="0 0 20 20" fill="none">
						<path d="M6 6l8 8M6 14L14 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					</svg>
					<svg v-else width="18" height="18" viewBox="0 0 20 20" fill="none">
						<path d="M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						<path d="M10 4v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					</svg>
				</button>
			</div>
		</transition>

		<!-- Main Content -->
		<main>
			<slot />
		</main>

		<!-- Footer can be added here -->
		<footer class="py-8 border-t" :style="{ backgroundColor: 'var(--background)', borderColor: 'var(--light-color)' }">
			<div class="container mx-auto px-4 text-center">

				<p :style="{ color: 'var(--text-secondary, #4B5563)' }">
					© {{ new Date().getFullYear() }} BleckWolf25. All rights reserved.
				</p>

				<!-- Social Links -->
				<div class="flex justify-center mt-4 space-x-4">
					<a v-for="social in socialLinks" :key="social.platform" :href="social.url" target="_blank"
						rel="noopener noreferrer" class="transition-colors" :style="{ color: 'var(--secondary-color)' }">
						<IconifyIcon :icon="getIconName(social.platform)" width="28" height="28" />
					</a>
				</div>

			</div>
		</footer>
	</div>
</template>

<!-- Script Part -->
<script>
// ------------ IMPORTS
import { Icon } from '@iconify/vue'

// ------------ EXPORTS
export default {
	name: 'DefaultLayout',
	components: {
		IconifyIcon: Icon
	},

	data() {
		return {
			socialLinks: [],
			bannerClosed: false,
			bannerTop: 24
		}
	},

	async mounted() {
		try {

			// Load social links from about.json
			const aboutData = await import('~/data/about.json')
			this.socialLinks = aboutData.default.about.social || []
		} catch (error) {
			console.error('Failed to load social links:', error)
		}

		// Restore banner state from localStorage
		const closed = localStorage.getItem('devBannerClosed')
		this.bannerClosed = closed === 'true'
		this.updateBannerPosition()
		window.addEventListener('scroll', this.updateBannerPosition, { passive: true })
	},

	beforeUnmount() {
		window.removeEventListener('scroll', this.updateBannerPosition)
	},

	computed: {
		showBanner() {
			return !this.bannerClosed
		},
		bannerStyle() {
			return {
				top: `${this.bannerTop}px`
			}
		}
	},

	methods: {
		getIconName(platform) {

			// Map common platforms to iconify names
			const map = {
				github: 'mdi:github',
				linkedin: 'mdi:linkedin',
				twitter: 'mdi:twitter',
				facebook: 'mdi:facebook',
				instagram: 'mdi:instagram',
				discord: 'mdi:discord',
				telegram: 'mdi:telegram',
				email: 'mdi:email',
				youtube: 'mdi:youtube',
				// fallback
				default: 'mdi:account'
			}
			return map[platform.toLowerCase()] || map.default
		},
		toggleBanner() {
			this.bannerClosed = !this.bannerClosed
			localStorage.setItem('devBannerClosed', this.bannerClosed)
		},
		updateBannerPosition() {
			// Always 24px from top + scrollY
			this.bannerTop = 24 + (window.scrollY || window.pageYOffset || 0)
		}
	}
}
</script>

<style scoped>
.dev-banner {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	z-index: 2000;
	background: var(--secondary-color, #2563eb);
	color: var(--background, #fff);
	padding: 0.75rem 2.5rem 0.75rem 1.25rem;
	border-radius: 9999px;
	box-shadow: 0 4px 16px rgba(37, 99, 235, 0.12);
	font-size: 1rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	gap: 1rem;
	transition: top 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s;
	pointer-events: auto;
}

.dev-banner-close {
	background: none;
	border: none;
	color: inherit;
	cursor: pointer;
	padding: 0.25rem;
	border-radius: 9999px;
	transition: background 0.2s;
	display: flex;
	align-items: center;
}

.dev-banner-close:hover,
.dev-banner-close:focus {
	background: rgba(255, 255, 255, 0.15);
	outline: none;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

@media (max-width: 600px) {
	.dev-banner {
		font-size: 0.875rem;
		padding: 0.5rem 2rem 0.5rem 1rem;
	}
}
</style>
