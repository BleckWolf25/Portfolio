<!--
	- @file: TECHNOLOGIES.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Modern Technologies section for portfolio showcasing technical skills.
		- Features interactive technology icons with hover tooltips showing experience.
		- Organized by categories with responsive grid layout and smooth animations.
-->

<!-- Template Section -->
<template>
	<section id="technologies"
		class="relative py-16 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-accent-50/20 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden"
		role="main" aria-label="Technologies and skills section">
		<!-- Background Decorative Elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Subtle gradient orbs -->
			<div
				class="absolute top-60 -right-60 w-96 h-96 bg-gradient-to-br from-primary-200/6 to-accent-200/6 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 14s" aria-hidden="true"></div>
			<div
				class="absolute -bottom-60 -left-60 w-96 h-96 bg-gradient-to-tr from-accent-300/6 to-secondary-200/6 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 18s; animation-delay: 5s" aria-hidden="true"></div>
		</div>

		<!-- Main Content Container -->
		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

			<!-- Section Title -->
			<div class="tech-title opacity-0" data-tech-element>
				<SectionTitle>Technologies & Skills</SectionTitle>
				<p class="text-center text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-16">
					A comprehensive overview of the technologies, frameworks, and tools I use to build innovative
					solutions.
					All icons below represent my tech stack.
				</p>
			</div>

			<!-- Technologies Categories -->
			<div class="space-y-16">

				<!-- Programming Languages -->
				<div class="tech-category opacity-0" data-tech-element>
					<TechnologyCategory title="Programming Languages" :technologies="technologiesData.languages"
						icon="mdi:code-braces" description="Core programming languages I use for development" />
				</div>

				<!-- Frameworks & Libraries -->
				<div class="tech-category opacity-0" data-tech-element>
					<TechnologyCategory title="Frameworks & Libraries" :technologies="technologiesData.frameworks"
						icon="mdi:library" description="Modern frameworks and libraries for efficient development" />
				</div>

				<!-- Development Tools -->
				<div class="tech-category opacity-0" data-tech-element>
					<TechnologyCategory title="Development Tools" :technologies="technologiesData.tools" icon="mdi:tools"
						description="Essential tools for version control, deployment, and workflow" />
				</div>

				<!-- IDEs & Editors -->
				<div class="tech-category opacity-0" data-tech-element>
					<TechnologyCategory title="IDEs & Editors" :technologies="technologiesData.ides" icon="mdi:application-edit"
						description="Integrated development environments and code editors" />
				</div>

				<!-- Game Development -->
				<div class="tech-category opacity-0" data-tech-element>
					<TechnologyCategory title="Game Development" :technologies="technologiesData.gameDevelopment"
						icon="mdi:gamepad-variant" description="Game engines and tools for interactive entertainment" />
				</div>

				<!-- Operating Systems -->
				<div class="tech-category opacity-0" data-tech-element>
					<TechnologyCategory title="Operating Systems" :technologies="technologiesData.operatingSystems"
						icon="mdi:desktop-classic" description="Operating systems I develop, and have used before" />
				</div>

				<!-- AI Tools -->
				<div class="tech-category opacity-0" data-tech-element>
					<TechnologyCategory title="AI & Productivity Tools" :technologies="technologiesData.aiTools" icon="mdi:robot"
						description="AI-powered tools that enhance development productivity" />
				</div>
			</div>

			<!-- Bottom Stats Section -->
			<div class="tech-stats opacity-0 mt-20" data-tech-element>
				<div
					class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50">
					<div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
						<div class="space-y-2">
							<div
								class="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
								{{ totalTechnologies }}+
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
								Technologies
							</div>
						</div>
						<div class="space-y-2">
							<div
								class="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
								{{ categoriesCount }}
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
								Categories
							</div>
						</div>
						<div class="space-y-2">
							<div
								class="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
								{{ mostExperiencedTech.name }}
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
								Most Experienced
							</div>
						</div>
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
import TechnologyCategory from '../specific/TechnologyCategory.vue'

// ------------ TYPES
interface Technology {
	name: string
	icon: string
	years?: number
	months?: number
	days?: number
	color?: string
}

interface TechnologiesData {
	languages: Technology[]
	frameworks: Technology[]
	tools: Technology[]
	ides: Technology[]
	gameDevelopment: Technology[]
	operatingSystems: Technology[]
	aiTools: Technology[]
}

interface TechnologiesResponse {
	technologies: TechnologiesData
}

// ------------ DATA
const { data: technologiesDataResponse } = await useAsyncData<TechnologiesResponse | null>('technologies-data', async () => {
	try {
		return await $fetch<TechnologiesResponse>('/api/data/technologies.json')
	} catch (err) {
		console.warn('[Technologies] Failed to load technologies data:', err)
		return null
	}
})

const technologiesData = computed(() => {
	const data = technologiesDataResponse.value as TechnologiesResponse | null
	return data?.technologies ?? {
		languages: [],
		frameworks: [],
		tools: [],
		ides: [],
		gameDevelopment: [],
		operatingSystems: [],
		aiTools: []
	}
})

// ------------ COMPUTED PROPERTIES
const totalTechnologies = computed(() => {
	return Object.values(technologiesData.value).reduce((total, category) => total + category.length, 0)
})

const categoriesCount = computed(() => {
	return Object.keys(technologiesData.value).length
})

const mostExperiencedTech = computed(() => {
	let maxExperience = 0
	let mostExperienced = { name: 'N/A' }

	Object.values(technologiesData.value).forEach((category: Technology[]) => {
		category.forEach((tech: Technology) => {
			const years = tech.years || 0
			const months = tech.months || 0
			const days = tech.days || 0

			const totalMonths = years * 12 + months + (days / 30)

			if (totalMonths > maxExperience) {
				maxExperience = totalMonths
				mostExperienced = tech
			}
		})
	})

	return mostExperienced
})

// ------------ LIFECYCLE
let fadeInCleanup: (() => void) | null = null

onMounted(() => {
	// Initialize staggered fade-in animation for tech elements
	const fadeInControl = fadeInOnScroll('[data-tech-element]', {
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
