<!--
	- @file: SOFT SKILLS.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Modern Soft Skills section for portfolio showcasing interpersonal abilities.
		- Features interactive cards with STAR methodology examples and expandable content.
		- Responsive design with hover effects and smooth animations.
-->

<!-- Template Section -->
<template>
	<section id="soft-skills"
		class="relative py-16 lg:py-24 bg-gradient-to-br from-white via-accent-50/20 to-primary-50/10 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 overflow-hidden"
		role="main" aria-label="Soft skills and interpersonal abilities section">
		<!-- Background Decorative Elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Subtle gradient orbs -->
			<div
				class="absolute top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary-200/8 to-accent-200/8 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 20s" aria-hidden="true"></div>
			<div
				class="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tr from-accent-300/8 to-secondary-200/8 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 24s; animation-delay: 8s" aria-hidden="true"></div>
		</div>

		<!-- Main Content Container -->
		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

			<!-- Section Title -->
			<div class="skills-title opacity-0" data-skills-element>
				<SectionTitle>Soft Skills</SectionTitle>
				<p class="text-center text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-16">
					Essential interpersonal and professional skills that drive collaboration, innovation, and success.
					Each skill is demonstrated through real-world examples using the STAR methodology.
				</p>
			</div>

			<!-- Skills Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
				<div v-for="(skill, index) in softSkillsData" :key="skill.category" class="skill-card opacity-0"
					data-skills-element>
					<SoftSkillCard :skill="skill" :index="index" />
				</div>
			</div>

			<!-- STAR Methodology Explanation -->
			<div class="skills-methodology opacity-0 mt-20" data-skills-element>
				<div
					class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50">
					<div class="text-center mb-8">
						<h3 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
							STAR Methodology
						</h3>
						<p class="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
							Each soft skill example follows the STAR methodology to provide concrete evidence of my
							abilities in real-world scenarios.
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div class="text-center">
							<div
								class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
								<Icon name="mdi:map-marker" class="w-8 h-8 text-white" />
							</div>
							<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Situation</h4>
							<p class="text-sm text-neutral-600 dark:text-neutral-400">The context and background of the
								challenge</p>
						</div>

						<div class="text-center">
							<div
								class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
								<Icon name="mdi:target" class="w-8 h-8 text-white" />
							</div>
							<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Task</h4>
							<p class="text-sm text-neutral-600 dark:text-neutral-400">The specific goal or objective to
								achieve</p>
						</div>

						<div class="text-center">
							<div
								class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
								<Icon name="mdi:lightning-bolt" class="w-8 h-8 text-white" />
							</div>
							<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Action</h4>
							<p class="text-sm text-neutral-600 dark:text-neutral-400">The steps taken to address the
								situation</p>
						</div>

						<div class="text-center">
							<div
								class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
								<Icon name="mdi:trophy" class="w-8 h-8 text-white" />
							</div>
							<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">Result</h4>
							<p class="text-sm text-neutral-600 dark:text-neutral-400">The measurable outcome and impact
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Bottom CTA Section -->
			<div class="skills-cta opacity-0 mt-16" data-skills-element>
				<div
					class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 text-center">
					<h3 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
						Ready to Collaborate?
					</h3>
					<p class="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
						These soft skills enable me to work effectively in any team environment, lead initiatives,
						and drive positive outcomes. Let's discuss how I can contribute to your organization's success.
					</p>
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<UButton @click="scrollToSection('contact')" color="primary" variant="solid" size="lg"
							class="px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
							<Icon name="mdi:account-group" class="w-5 h-5 mr-2" />
							Let's Work Together
						</UButton>
						<UButton @click="scrollToSection('work-timeline')" variant="outline" size="lg"
							class="px-8 py-4 font-semibold border-primary-300 dark:border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300">
							<Icon name="mdi:briefcase" class="w-5 h-5 mr-2" />
							View Experience
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
import SoftSkillCard from '../specific/SoftSkillCard.vue'

// ------------ TYPES
interface StarExample {
	situation: string
	task: string
	action: string
	result: string
}

interface SoftSkill {
	category: string
	icon: string
	title: string
	description: string
	star: StarExample
}

interface SoftSkillsData {
	softSkills: SoftSkill[]
}

// ------------ DATA
const { data: softSkillsDataResponse } = await useAsyncData<SoftSkillsData | null>('softSkills-data', async () => {
	try {
		return await $fetch<SoftSkillsData>('/api/data/softSkills.json')
	} catch (err) {
		console.warn('[SoftSkills] Failed to load soft skills data:', err)
		return null
	}
})

const softSkillsData = computed(() => {
	const data = softSkillsDataResponse.value as SoftSkillsData | null
	return data?.softSkills ?? []
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
	// Initialize staggered fade-in animation for skills elements
	const fadeInControl = fadeInOnScroll('[data-skills-element]', {
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
