<!--
	- @file: WHAT I DEVELOP.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Modern What I Develop section for portfolio showcasing development categories.
		- Features interactive cards, expandable content, and smooth animations.
		- Responsive design with dark mode support and optimized performance.
-->

<!-- Template Section -->
<template>
	<section id="what-i-develop"
		class="relative py-16 lg:py-24 bg-gradient-to-br from-white via-primary-50/20 to-accent-50/30 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 overflow-hidden"
		role="main" aria-label="What I develop section">
		<!-- Background Decorative Elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Subtle gradient orbs -->
			<div class="absolute top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary-200/8 to-accent-200/8 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 12s" aria-hidden="true"></div>
			<div class="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tr from-accent-300/8 to-secondary-200/8 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 15s; animation-delay: 4s" aria-hidden="true"></div>
		</div>

		<!-- Main Content Container -->
		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

			<!-- Section Title -->
			<div class="develop-title opacity-0" data-develop-element>
				<SectionTitle>What I Develop</SectionTitle>
				<p class="text-center text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-16">
					I specialize in creating innovative solutions across multiple platforms and technologies,
					delivering high-quality applications that meet diverse business and user needs.
				</p>
			</div>

			<!-- Development Categories Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
				<div v-for="(category, index) in developmentData" :key="category.category"
					class="develop-card opacity-0" data-develop-element>
					<UCard
						class="group relative h-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-2">
						<!-- Card Header -->
						<template #header>
							<div class="flex items-center space-x-4 p-6 pb-4">
								<!-- Category Icon -->
								<div class="flex-shrink-0">
									<div
										class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
										<Icon :name="getCategoryIcon(category.category)" class="w-8 h-8 text-white" />
									</div>
								</div>

								<!-- Category Title -->
								<div class="flex-1">
									<h3
										class="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
										{{ category.title }} Development
									</h3>
									<p class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
										{{ category.category }}
									</p>
								</div>
							</div>
						</template>

						<!-- Card Content -->
						<div class="px-6 pb-6">
							<!-- Description -->
							<p class="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
								{{ category.description }}
							</p>

							<!-- Features List -->
							<div class="space-y-4">
								<h4
									class="text-sm font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
									What I Build
								</h4>

								<!-- Expandable Features -->
								<div class="space-y-2">
									<div v-for="feature in getVisibleFeatures(category.features, index)" :key="feature"
										class="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400">
										<div class="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"></div>
										<span>{{ feature }}</span>
									</div>

									<!-- Show More/Less Button -->
									<UButton v-if="category.features.length > 4" @click="toggleFeatures(index)"
										variant="ghost" size="sm"
										class="mt-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 p-0 h-auto font-medium">
										{{ expandedCards.includes(index) ? 'Show Less' : `Show
										${category.features.length - 4} More` }}
										<Icon
											:name="expandedCards.includes(index) ? 'mdi:chevron-up' : 'mdi:chevron-down'"
											class="w-4 h-4 ml-1 transition-transform duration-200" />
									</UButton>
								</div>
							</div>
						</div>

						<!-- Hover Gradient Overlay -->
						<div
							class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
						</div>
					</UCard>
				</div>
			</div>

			<!-- Bottom CTA Section -->
			<div class="develop-cta opacity-0 mt-16 text-center" data-develop-element>
				<div
					class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50">
					<h3 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
						Ready to Build Something Amazing?
					</h3>
					<p class="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
						Whether you need a web application, desktop software, or an engaging game,
						I have the expertise to bring your vision to life with modern technologies and best practices.
					</p>
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<UButton @click="scrollToSection('projects')" color="primary" variant="solid" size="lg"
							class="px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
							<Icon name="mdi:folder-multiple" class="w-5 h-5 mr-2" />
							View My Projects
						</UButton>
						<UButton @click="scrollToSection('contact')" variant="outline" size="lg"
							class="px-8 py-4 font-semibold border-primary-300 dark:border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300">
							<Icon name="mdi:message-text" class="w-5 h-5 mr-2" />
							Let's Discuss
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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { fadeInOnScroll } from '../animations'
import SectionTitle from '../common/SectionTitle.vue'

// ------------ TYPES
interface DevelopmentCategory {
	category: string
	title: string
	description: string
	features: string[]
}

interface WhatIDevelopData {
	development: DevelopmentCategory[]
}

// ------------ DATA
const { data: developDataResponse } = await useAsyncData<WhatIDevelopData | null>('whatIDevelop-data', async () => {
	try {
		return await $fetch<WhatIDevelopData>('/api/data/whatIDevelop.json')
	} catch (err) {
		console.warn('[WhatIDevelop] Failed to load development data:', err)
		return null
	}
})

const developmentData = computed(() => {
	const data = developDataResponse.value as WhatIDevelopData | null
	return data?.development ?? []
})

// ------------ REACTIVE STATE
const expandedCards = ref<number[]>([])

// ------------ METHODS
function getCategoryIcon(category: string): string {
	const iconMap: Record<string, string> = {
		'Web Development': 'mdi:web',
		'Software Development': 'mdi:application-cog',
		'Game Development': 'mdi:gamepad-variant'
	}
	return iconMap[category] || 'mdi:code-braces'
}

function getVisibleFeatures(features: string[], cardIndex: number): string[] {
	const isExpanded = expandedCards.value.includes(cardIndex)
	return isExpanded ? features : features.slice(0, 4)
}

function toggleFeatures(cardIndex: number): void {
	const index = expandedCards.value.indexOf(cardIndex)
	if (index > -1) {
		expandedCards.value.splice(index, 1)
	} else {
		expandedCards.value.push(cardIndex)
	}
}

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
	// Initialize staggered fade-in animation for develop elements
	const fadeInControl = fadeInOnScroll('[data-develop-element]', {
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
