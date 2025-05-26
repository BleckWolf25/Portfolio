<!--
	- @file: ABOUT.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Modern About Me section for portfolio with animated text effects and smooth interactions.
		- Features gradient text effects, staggered animations, and accessible navigation.
		- Responsive design with dark mode support and optimized performance.
-->

<!-- Template Section -->
<template>
	<section id="about"
		class="relative py-16 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden"
		role="main" aria-label="About me section">
		<!-- Background Decorative Elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Subtle gradient orbs -->
			<div
				class="absolute top-20 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/10 to-accent-200/10 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 8s" aria-hidden="true"></div>
			<div
				class="absolute -bottom-20 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-300/10 to-secondary-200/10 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 10s; animation-delay: 3s" aria-hidden="true"></div>
		</div>

		<!-- Main Content Container -->
		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

			<!-- Section Title -->
			<div class="about-title opacity-0" data-about-element>
				<SectionTitle>{{ aboutData.title }}</SectionTitle>
			</div>

			<!-- Main Content Grid -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

				<!-- Profile Image & Info -->
				<div class="about-image-section opacity-0" data-about-element>
					<div class="relative">
						<!-- Profile Image -->
						<div class="relative mx-auto lg:mx-0 w-80 h-80 lg:w-96 lg:h-96">
							<!-- Gradient border effect -->
							<div
								class="absolute inset-0 bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 rounded-2xl blur-sm opacity-75">
							</div>

							<!-- Image container -->
							<div class="relative bg-white dark:bg-neutral-800 rounded-2xl p-2 shadow-xl">
								<img :src="profileImage" :alt="`Profile photo of ${aboutData.title.replace('About ', '')}`"
									class="w-full h-full object-cover rounded-xl" width="400" height="400" loading="lazy" />
							</div>

							<!-- Floating info cards -->
							<div
								class="absolute -bottom-4 -right-4 bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-lg border border-neutral-200 dark:border-neutral-700">
								<div class="flex items-center space-x-2">
									<Icon name="mdi:map-marker" class="w-4 h-4 text-primary-500" />
									<span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
										{{ aboutData.location }}
									</span>
								</div>
							</div>

							<div
								class="absolute -top-4 -left-4 bg-white dark:bg-neutral-800 rounded-xl p-4 shadow-lg border border-neutral-200 dark:border-neutral-700">
								<div class="flex items-center space-x-2">
									<div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
									<span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
										Available for work
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Content & Details -->
				<div class="about-content-section space-y-8">

					<!-- Main Description -->
					<div class="about-description opacity-0" data-about-element>
						<h3 class="text-2xl lg:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
							Software Developer &
							<span
								class="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent">
								Executive Leader
							</span>
						</h3>

						<div class="prose prose-lg dark:prose-invert max-w-none">
							<p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
								{{ aboutData.description }}
							</p>
						</div>
					</div>

					<!-- Social Links -->
					<div class="about-social opacity-0" data-about-element>
						<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
							Connect With Me
						</h4>
						<div class="flex flex-wrap gap-4">
							<div v-for="social in aboutData.social" :key="social.platform">
								<a :href="social.url" target="_blank" rel="noopener"
									class="flex items-center space-x-3 px-6 py-3 bg-white dark:bg-neutral-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 hover:scale-105 hover:shadow-lg rounded-lg font-medium"
									:aria-label="`Visit my ${social.platform} profile`">
									<Icon :name="`mdi:${social.icon}`" class="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
									<span class="text-neutral-700 dark:text-neutral-300">
										{{ social.platform }}
									</span>
								</a>
							</div>
						</div>
					</div>

					<!-- Contact Info -->
					<div class="about-contact opacity-0" data-about-element>
						<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
							Get In Touch
						</h4>
						<div class="space-y-3">
							<a :href="`mailto:${aboutData.email}`" target="_blank" rel="noopener"
								class="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 w-full justify-start"
								:aria-label="`Send email to ${aboutData.email}`">
								<Icon name="mdi:email" class="w-5 h-5 text-primary-500" />
								<span class="text-neutral-600 dark:text-neutral-400">
									{{ aboutData.email }}
								</span>
							</a>
						</div>
					</div>

					<!-- Call to Action -->
					<div class="about-cta opacity-0" data-about-element>
						<UButton @click="scrollToSection('projects')" color="primary" variant="solid" size="lg"
							class="px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
							:aria-label="aboutData.ctaText">
							<Icon name="mdi:rocket-launch" class="w-5 h-5 mr-2" />
							{{ aboutData.ctaText }}
						</UButton>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { onMounted, onBeforeUnmount, computed } from 'vue'
import { fadeInOnScroll } from '../animations'
import SectionTitle from '../common/SectionTitle.vue'

// ------------ TYPES
interface AboutData {
	about: {
		title: string
		description: string
		photo: string
		location: string
		email: string
		ctaText: string
		ctaLink: string
		social: Array<{
			platform: string
			url: string
			icon: string
		}>
	}
}

// ------------ DATA
const { data: aboutDataResponse } = await useAsyncData<AboutData | null>('about-data', async () => {
	try {
		return await $fetch<AboutData>('/api/data/about.json')
	} catch (err) {
		console.warn('[About] Failed to load about data:', err)
		return null
	}
})

const aboutData = computed(() => {
	const data = aboutDataResponse.value as AboutData | null
	return data?.about ?? {
		title: '',
		description: '',
		photo: '',
		location: '',
		email: '',
		ctaText: '',
		ctaLink: '',
		social: []
	}
})

// ------------ COMPUTED PROPERTIES
const profileImage = computed(() => {
	const src = aboutData.value.photo
	if (!src || src === '1x' || src === '/1x') {
		return '/images/profile.png' // fallback to a valid image in /public/images/
	}
	return src
})

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
		const announcement = document.createElement('div')
		announcement.setAttribute('aria-live', 'polite')
		announcement.setAttribute('aria-atomic', 'true')
		announcement.className = 'sr-only'
		announcement.textContent = `Navigated to ${sectionId} section`
		document.body.appendChild(announcement)

		setTimeout(() => {
			document.body.removeChild(announcement)
		}, 1000)
	}
}

// ------------ LIFECYCLE
let fadeInCleanup: (() => void) | null = null

onMounted(() => {
	// Initialize staggered fade-in animation for about elements
	const fadeInControl = fadeInOnScroll('[data-about-element]', {
		duration: 600,
		direction: 'up',
		distance: 30,
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px',
		stagger: 200,
		once: true
	}) as { cleanup: () => void }
	fadeInCleanup = fadeInControl.cleanup
})

onBeforeUnmount(() => {
	// Clean up animations
	if (fadeInCleanup) {
		fadeInCleanup()
	}
})
</script>
