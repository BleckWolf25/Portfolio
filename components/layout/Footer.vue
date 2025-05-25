<!--
	- @file: FOOTER.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Modern footer layout section for portfolio with glass-morphism effect.
		- Features social links, navigation, contact info, and unique interactive elements.
		- Matches navbar design with smooth animations and responsive layout.
-->

<!-- Template Section -->
<template>
	<footer ref="footerRef"
		class="relative mt-20 bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-100/20 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden"
		role="contentinfo" aria-label="Site footer">
		<!-- Animated Background Elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Floating gradient orbs -->
			<div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/10 to-accent-200/10 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 4s" aria-hidden="true"></div>
			<div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-300/10 to-secondary-200/10 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 6s; animation-delay: 2s" aria-hidden="true"></div>
		</div>

		<!-- Glass-morphism overlay -->
		<div class="absolute inset-0 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm"></div>

		<!-- Main Footer Content -->
		<div class="relative z-10">
			<!-- Top Section with Main Content -->
			<div class="border-b border-neutral-200/20 dark:border-neutral-700/20">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

						<!-- Brand & Description -->
						<div class="lg:col-span-2 space-y-6">
							<div class="footer-brand opacity-0" data-footer-element>
								<h3
									class="text-2xl font-bold bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent">
									BleckWolf25
								</h3>
								<p class="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
									Software Developer & Executive Leader passionate about creating innovative solutions
									and leading teams to success. Based in Portugal, building the future one line of
									code at a time.
								</p>
							</div>

							<!-- Social Links -->
							<div class="footer-social opacity-0" data-footer-element>
								<h4
									class="text-sm font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">
									Connect With Me
								</h4>
								<div class="flex space-x-4">
									<a v-for="social in socialLinks" :key="social.platform" :href="social.url"
										target="_blank" rel="noopener"
										class="p-3 rounded-lg bg-white/50 dark:bg-neutral-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 hover:scale-110 hover:shadow-lg flex items-center"
										:aria-label="`Visit ${social.platform} profile`">
										<Icon :name="`mdi:${social.icon}`"
											class="w-5 h-5 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400" />
									</a>
								</div>
							</div>
						</div>

						<!-- Quick Navigation -->
						<div class="footer-nav opacity-0" data-footer-element>
							<h4
								class="text-sm font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">
								Quick Links
							</h4>
							<nav class="space-y-3" role="navigation" aria-label="Footer navigation">
								<UButton v-for="link in quickLinks" :key="link.id" @click="scrollToSection(link.id)"
									variant="ghost" size="sm"
									class="block w-full justify-start p-2 text-left text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200"
									:aria-label="`Navigate to ${link.label} section`">
									{{ link.label }}
								</UButton>
							</nav>
						</div>

						<!-- Contact & Tech Stack -->
						<div class="footer-contact opacity-0" data-footer-element>
							<h4
								class="text-sm font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-4">
								Get In Touch
							</h4>
							<div class="space-y-3">
								<!-- Location -->
								<div class="flex items-center space-x-3 text-neutral-600 dark:text-neutral-400">
									<Icon name="mdi:map-marker" class="w-4 h-4 text-primary-500" />
									<span class="text-sm">{{ contactInfo.location }}</span>
								</div>

								<!-- Email -->
								<a :href="`mailto:${contactInfo.email}`" target="_blank" rel="noopener"
									class="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 w-full justify-start"
									:aria-label="`Send email to ${contactInfo.email}`">
									<Icon name="mdi:email" class="w-4 h-4 text-primary-500" />
									<span
										class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400">
										{{ contactInfo.email }}
									</span>
								</a>
							</div>

							<!-- Featured Tech Stack -->
							<div class="mt-6">
								<h5
									class="text-xs font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-wider mb-3">
									Built With
								</h5>
								<div class="flex flex-wrap gap-2">
									<span v-for="tech in featuredTech" :key="tech"
										class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors duration-200 cursor-default">
										{{ tech }}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Section with Copyright & Back to Top -->
		<div class="bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">

					<!-- Copyright & Build Info -->
					<div class="footer-copyright opacity-0" data-footer-element>
						<p class="text-sm text-neutral-500 dark:text-neutral-400 text-center sm:text-left">
							© {{ currentYear }} BleckWolf25. All rights reserved.
							<span class="hidden sm:inline-block mx-2">•</span>
							<span class="block sm:inline">Built with ❤️ using Nuxt & Vue</span>
						</p>
					</div>

					<!-- Back to Top Button -->
					<div class="footer-back-to-top opacity-0" data-footer-element>
						<UButton @click="scrollToTop" variant="ghost" size="md"
							class="group flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/50 dark:bg-neutral-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 hover:scale-105 hover:shadow-lg"
							aria-label="Back to top of page">
							<span
								class="text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">
								Back to Top
							</span>
							<Icon name="mdi:chevron-up"
								class="w-4 h-4 text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-transform duration-200 group-hover:-translate-y-1" />
						</UButton>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { fadeInOnScroll } from '../animations'

// ------------ TYPES
interface SocialLink {
	platform: string
	url: string
	icon: string
}

interface QuickLink {
	id: string
	label: string
}

// Define the expected data structure
interface FooterData {
	about: {
		social: SocialLink[];
		location: string;
		email: string;
	};
}

// ------------ REACTIVE STATE
const footerRef = ref<HTMLElement | null>(null)

// ------------ DATA
const { data } = await useAsyncData<FooterData | null>('footer', async () => {
	try {
		return await $fetch<FooterData>('/api/data/footer.json')
	} catch (err) {
		console.warn('[Footer] Failed to load footer data:', err)
		return null
	}
})

const socialLinks = computed(() => {
	const footerData = data.value as FooterData | null
	return footerData?.about?.social ?? []
})

const quickLinks: QuickLink[] = [
	{ id: 'about', label: 'About' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'technologies', label: 'Technologies' },
	{ id: 'contact', label: 'Contact' }
]

const contactInfo = computed(() => {
	const footerData = data.value as FooterData | null
	return {
		location: footerData?.about?.location ?? '',
		email: footerData?.about?.email ?? ''
	}
})

const featuredTech = ['Nuxt.js', 'Vue.js', 'TypeScript', 'Tailwind CSS']

// ------------ COMPUTED
const currentYear = computed(() => new Date().getFullYear())

// ------------ METHODS
function scrollToSection(sectionId: string) {
	const element = document.getElementById(sectionId)

	if (element) {
		const navbarHeight = 80 // Navbar height offset
		const elementPosition = element.offsetTop - navbarHeight

		window.scrollTo({
			top: elementPosition,
			behavior: 'smooth'
		})

		// Announce navigation for screen readers
		const link = quickLinks.find(l => l.id === sectionId)
		if (link) {
			const announcement = document.createElement('div')
			announcement.setAttribute('aria-live', 'polite')
			announcement.setAttribute('aria-atomic', 'true')
			announcement.className = 'sr-only'
			announcement.textContent = `Navigated to ${link.label} section`
			document.body.appendChild(announcement)

			setTimeout(() => {
				document.body.removeChild(announcement)
			}, 1000)
		}
	}
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	})

	// Announce for screen readers
	const announcement = document.createElement('div')
	announcement.setAttribute('aria-live', 'polite')
	announcement.setAttribute('aria-atomic', 'true')
	announcement.className = 'sr-only'
	announcement.textContent = 'Scrolled to top of page'
	document.body.appendChild(announcement)

	setTimeout(() => {
		document.body.removeChild(announcement)
	}, 1000)
}

// ------------ LIFECYCLE
let fadeInCleanup: (() => void) | null = null

onMounted(() => {
	// Initialize staggered fade-in animation for footer elements
	if (footerRef.value) {
		const fadeInControl = fadeInOnScroll('[data-footer-element]', {
			duration: 600,
			direction: 'up',
			distance: 30,
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px',
			stagger: 150,
			once: true
		}) as { cleanup: () => void }
		fadeInCleanup = fadeInControl.cleanup
	}
})

onBeforeUnmount(() => {
	// Clean up animations
	if (fadeInCleanup) {
		fadeInCleanup()
	}
})
</script>
