<!--
	- @file: HOBBIES.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Modern Hobbies section for portfolio showcasing personal interests.
		- Features interactive hobby cards with animations and personal descriptions.
		- Casual, engaging design that reflects personality and work-life balance.
-->

<!-- Template Section -->
<template>
	<section id="hobbies"
		class="relative py-16 lg:py-24 bg-gradient-to-br from-primary-50/30 via-white to-accent-50/20 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden"
		role="main" aria-label="Hobbies and personal interests section">
		<!-- Background Decorative Elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Subtle gradient orbs -->
			<div
				class="absolute top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primary-200/8 to-accent-200/8 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 22s" aria-hidden="true"></div>
			<div
				class="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-accent-300/8 to-secondary-200/8 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 26s; animation-delay: 9s" aria-hidden="true"></div>
		</div>

		<!-- Main Content Container -->
		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

			<!-- Section Title -->
			<div class="hobbies-title opacity-0" data-hobbies-element>
				<SectionTitle>Hobbies & Interests</SectionTitle>
				<p class="text-center text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-16">
					When I'm not coding or leading teams, you'll find me pursuing these passions that keep me balanced,
					creative, and energized. They reflect my commitment to continuous learning and personal growth.
				</p>
			</div>

			<!-- Hobbies Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8 mb-16">
				<div v-for="(hobby, index) in hobbiesData" :key="hobby.name" class="hobby-card opacity-0" data-hobbies-element>
					<HobbyCard :hobby="hobby" :index="index" />
				</div>
			</div>

			<!-- Personal Philosophy Section -->
			<div class="hobbies-philosophy opacity-0" data-hobbies-element>
				<div
					class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-neutral-200/50 dark:border-neutral-700/50">
					<div class="text-center mb-8">
						<div
							class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg">
							<SSRIcon name="mdi:heart" class="w-10 h-10 text-white" fallback-class="bg-white/20" />
						</div>
						<h3 class="text-2xl lg:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
							Work-Life Balance Philosophy
						</h3>
						<p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
							I believe that diverse interests and hobbies fuel creativity and innovation in professional
							work.
							Each activity teaches valuable lessons that I bring to my development projects and
							leadership roles.
						</p>
					</div>

					<!-- Philosophy Points -->
					<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
						<div class="text-center">
							<div
								class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
								<SSRIcon name="mdi:brain" class="w-8 h-8 text-white" fallback-class="bg-white/20" />
							</div>
							<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Mental Agility
							</h4>
							<p class="text-sm text-neutral-600 dark:text-neutral-400">Gaming and coding challenges
								enhance problem-solving skills and strategic thinking</p>
						</div>

						<div class="text-center">
							<div
								class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
								<SSRIcon name="mdi:heart-pulse" class="w-8 h-8 text-white" fallback-class="bg-white/20" />
							</div>
							<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Physical
								Wellness</h4>
							<p class="text-sm text-neutral-600 dark:text-neutral-400">Gym workouts and Moto riding
								maintain energy levels and mental clarity for peak performance</p>
						</div>

						<div class="text-center">
							<div
								class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
								<SSRIcon name="mdi:music-note" class="w-8 h-8 text-white" fallback-class="bg-white/20" />
							</div>
							<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Creative
								Inspiration</h4>
							<p class="text-sm text-neutral-600 dark:text-neutral-400">Music provides rhythm and flow
								that influences my approach to elegant code architecture</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Bottom CTA Section -->
			<div class="hobbies-cta opacity-0 mt-16" data-hobbies-element>
				<div
					class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 text-center">
					<h3 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
						Let's Connect Beyond Work
					</h3>
					<p class="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
						I believe the best professional relationships are built on shared interests and genuine
						connections.
						Whether you share any of these hobbies or have others you're passionate about, I'd love to hear
						about them!
					</p>
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<UButton @click="scrollToSection('contact')" color="primary" variant="solid" size="lg"
							class="px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
							<SSRIcon name="mdi:chat" class="w-5 h-5 mr-2 text-white" fallback-class="bg-white/20" />
							Start a Conversation
						</UButton>
						<UButton @click="scrollToSection('about')" variant="outline" size="lg"
							class="px-8 py-4 font-semibold border-primary-300 dark:border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300">
							<SSRIcon name="mdi:account" class="w-5 h-5 mr-2 text-current" fallback-class="bg-current/20" />
							Learn More About Me
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
import HobbyCard from '../specific/HobbyCard.vue'
import SSRIcon from '../common/SSRIcon.vue'

// ------------ TYPES
interface Hobby {
	name: string
	icon: string
}

interface HobbiesData {
	hobbies: {
		items: Hobby[]
	}
}

// ------------ DATA
const { data: hobbiesDataResponse } = await useAsyncData<HobbiesData | null>('hobbies-data', async () => {
	try {
		return await $fetch<HobbiesData>('/api/data/hobbies.json')
	} catch (err) {
		console.warn('[Hobbies] Failed to load hobbies data:', err)
		return null
	}
})

const hobbiesData = computed(() => {
	const data = hobbiesDataResponse.value as HobbiesData | null
	return data?.hobbies?.items ?? []
})

// ------------ METHODS
function scrollToSection(sectionId: string): void {
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
	// Initialize staggered fade-in animation for hobbies elements
	const fadeInControl = fadeInOnScroll('[data-hobbies-element]', {
		duration: 600,
		direction: 'up',
		distance: 30,
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px',
		stagger: 150,
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
