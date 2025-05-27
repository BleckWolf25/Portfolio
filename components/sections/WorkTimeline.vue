<!--
	- @file: WORK TIMELINE.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Modern Work Timeline section for portfolio showcasing professional experience.
		- Features interactive timeline with work history cards and technology displays.
		- Responsive design with alternating layout and smooth animations.
-->

<!-- Template Section -->
<template>
	<section id="work-timeline"
		class="relative py-16 lg:py-24 bg-gradient-to-br from-neutral-50 via-primary-50/10 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden"
		role="main" aria-label="Work timeline and experience section">
		<!-- Background Decorative Elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Subtle gradient orbs -->
			<div
				class="absolute top-60 -right-60 w-96 h-96 bg-gradient-to-br from-primary-200/6 to-accent-200/6 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 18s" aria-hidden="true"></div>
			<div
				class="absolute -bottom-60 -left-60 w-96 h-96 bg-gradient-to-tr from-accent-300/6 to-secondary-200/6 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 22s; animation-delay: 7s" aria-hidden="true"></div>
		</div>

		<!-- Main Content Container -->
		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

			<!-- Section Title -->
			<div class="timeline-title opacity-0" data-timeline-element>
				<SectionTitle>Work Timeline</SectionTitle>
				<p class="text-center text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-16">
					My professional journey and career milestones. Each role has contributed to my growth as a developer
					and leader, building expertise across various technologies and domains.
				</p>
			</div>

			<!-- Timeline Container -->
			<div class="relative">
				<!-- Timeline Line (Desktop) -->
				<div
					class="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 opacity-30">
				</div>

				<!-- Timeline Items -->
				<div class="space-y-12 lg:space-y-16">
					<div v-for="(job, index) in workHistory" :key="`${job.company}-${job.position}`"
						class="timeline-item opacity-0" data-timeline-element>
						<div class="relative flex flex-col lg:flex-row lg:items-center">

							<!-- Timeline Dot -->
							<div class="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
								<div
									class="w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full border-4 border-white dark:border-neutral-900 shadow-lg z-10 relative">
									<div
										class="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full animate-ping opacity-20">
									</div>
								</div>
							</div>

							<!-- Work Experience Card -->
							<div :class="[
								'lg:w-5/12',
								index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'
							]">
								<WorkTimelineCard :job="job" :index="index" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Bottom Stats Section -->
			<div class="timeline-stats opacity-0 mt-20" data-timeline-element>
				<div
					class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50">
					<div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
						<div class="space-y-2">
							<div
								class="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
								{{ totalExperienceYears }}+
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
								Years Experience
							</div>
						</div>
						<div class="space-y-2">
							<div
								class="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
								{{ totalTechnologies }}+
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
								Technologies Used
							</div>
						</div>
						<div class="space-y-2">
							<div
								class="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
								{{ workHistory.length }}
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
								{{ workHistory.length === 1 ? 'Position' : 'Positions' }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Bottom CTA Section -->
			<div class="timeline-cta opacity-0 mt-16" data-timeline-element>
				<div
					class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 text-center">
					<h3 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
						Ready for the Next Challenge
					</h3>
					<p class="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
						I'm always open to new opportunities that challenge me to grow and make a meaningful impact.
						Let's discuss how my experience can contribute to your team's success.
					</p>
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<UButton @click="scrollToSection('contact')" color="primary" variant="solid" size="lg"
							class="px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
							<Icon name="mdi:briefcase" class="w-5 h-5 mr-2" />
							Let's Connect
						</UButton>
						<UButton @click="scrollToSection('technologies')" variant="outline" size="lg"
							class="px-8 py-4 font-semibold border-primary-300 dark:border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300">
							<Icon name="mdi:code-braces" class="w-5 h-5 mr-2" />
							View Skills
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
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { fadeInOnScroll } from '../animations'
import SectionTitle from '../common/SectionTitle.vue'
import WorkTimelineCard from '../specific/WorkTimelineCard.vue'

// ------------ TYPES
interface WorkExperience {
	company: string
	position: string
	period: string
	description: string
	technologies: string[]
}

interface WorkTimelineData {
	workHistory: WorkExperience[]
}

// ------------ DATA
const { data: workTimelineDataResponse } = await useAsyncData<WorkTimelineData | null>('workTimeline-data', async () => {
	try {
		return await $fetch<WorkTimelineData>('/api/data/workTimeline.json')
	} catch (err) {
		console.warn('[WorkTimeline] Failed to load work timeline data:', err)
		return null
	}
})

const workHistory = computed(() => {
	const data = workTimelineDataResponse.value as WorkTimelineData | null
	return data?.workHistory ?? []
})

// ------------ COMPUTED PROPERTIES
const totalExperienceYears = computed(() => {
	// Calculate based on the period strings
	// For now, we'll use a simple calculation based on current roles
	const currentYear = new Date().getFullYear()
	let totalYears = 0

	workHistory.value.forEach((job: WorkExperience) => {
		if (job.period.includes('Present')) {
			const periodParts = job.period.split('–')
			if (periodParts[0]) {
				const startYear = parseInt(periodParts[0].trim())
				totalYears += currentYear - startYear
			}
		} else {
			// Handle completed roles if any
			const years = job.period.split('–')
			if (years.length === 2 && years[0] && years[1]) {
				const startYear = parseInt(years[0].trim())
				const endYear = parseInt(years[1].trim())
				totalYears += endYear - startYear
			}
		}
	})

	return Math.max(totalYears, 1) // Ensure at least 1 year
})

const totalTechnologies = computed(() => {
	const allTechnologies = new Set<string>()
	workHistory.value.forEach((job: WorkExperience) => {
		job.technologies.forEach((tech: string) => allTechnologies.add(tech))
	})
	return allTechnologies.size
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
	// Initialize staggered fade-in animation for timeline elements
	const fadeInControl = fadeInOnScroll('[data-timeline-element]', {
		duration: 600,
		direction: 'up',
		distance: 30,
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px',
		stagger: 300,
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
