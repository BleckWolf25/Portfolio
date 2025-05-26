<!--
	- @file: TECHNOLOGIES.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.1.0

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
					Hover over the icons to see my experience with each technology.
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
						<!-- Total Technologies -->
						<div class="space-y-2 group">
							<div
								class="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent group-hover:from-primary-400 group-hover:to-accent-400 transition-all duration-300">
								{{ totalTechnologies }}+
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
								Technologies
							</div>
							<div class="text-xs text-neutral-500 dark:text-neutral-500">
								Across {{ categoriesCount }} categories
							</div>
						</div>

						<!-- Primary Language -->
						<div class="space-y-2 group">
							<div
								class="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent group-hover:from-primary-400 group-hover:to-accent-400 transition-all duration-300">
								{{ primaryLanguage.name }}
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
								Primary Language
							</div>
							<div class="text-xs text-neutral-500 dark:text-neutral-500">
								{{ formatExperience(primaryLanguage) }}
							</div>
						</div>

						<!-- Most Experienced Tech -->
						<div class="space-y-2 group">
							<div
								class="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent group-hover:from-primary-400 group-hover:to-accent-400 transition-all duration-300">
								{{ mostExperiencedTech.name }}
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
								Most Experienced
							</div>
							<div class="text-xs text-neutral-500 dark:text-neutral-500">
								{{ formatExperience(mostExperiencedTech) }}
							</div>
						</div>

						<!-- Active Projects -->
						<div class="space-y-2 group">
							<div
								class="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent group-hover:from-primary-400 group-hover:to-accent-400 transition-all duration-300">
								{{ modernFrameworks }}+
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
								Modern Frameworks
							</div>
							<div class="text-xs text-neutral-500 dark:text-neutral-500">
								{{ topFramework.name }} ({{ formatExperience(topFramework) }})
							</div>
						</div>
					</div>

					<!-- Additional Insights Row -->
					<div
						class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-neutral-200/50 dark:border-neutral-700/50">
						<!-- Development Focus -->
						<div class="text-center space-y-2">
							<div class="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
								{{ developmentFocus.area }}
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400">
								Development Focus
							</div>
							<div class="text-xs text-neutral-500 dark:text-neutral-500">
								{{ developmentFocus.technologies }} technologies
							</div>
						</div>

						<!-- Learning Path -->
						<div class="text-center space-y-2">
							<div class="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
								{{ learningPath.category }}
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400">
								Learning Focus
							</div>
							<div class="text-xs text-neutral-500 dark:text-neutral-500">
								{{ learningPath.count }} recent additions
							</div>
						</div>

						<!-- Expertise Level -->
						<div class="text-center space-y-2">
							<div class="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
								{{ expertiseLevel }}
							</div>
							<div class="text-sm text-neutral-600 dark:text-neutral-400">
								Expertise Level
							</div>
							<div class="text-xs text-neutral-500 dark:text-neutral-500">
								Based on experience diversity
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

// ------------ UTILITY FUNCTIONS
/**
 * Convert technology experience to total months for comparison
 */
function getTotalMonths(tech: Technology): number {
	const years = tech.years || 0
	const months = tech.months || 0
	const days = tech.days || 0
	return years * 12 + months + (days / 30)
}

/**
 * Format experience into readable string
 */
function formatExperience(tech: Technology): string {
	const years = tech.years || 0
	const months = tech.months || 0
	const days = tech.days || 0

	if (years > 0) {
		return months > 0 ? `${years}y ${months}m` : `${years} year${years > 1 ? 's' : ''}`
	}
	if (months > 0) {
		return `${months} month${months > 1 ? 's' : ''}`
	}
	if (days > 0) {
		return `${days} day${days > 1 ? 's' : ''}`
	}
	return 'New'
}

// ------------ COMPUTED PROPERTIES
const totalTechnologies = computed(() => {
	return Object.values(technologiesData.value).reduce((total, category) => total + category.length, 0)
})

const categoriesCount = computed(() => {
	return Object.keys(technologiesData.value).length
})

/**
 * Find most experienced technology (excluding operating systems)
 */
const mostExperiencedTech = computed(() => {
	let maxExperience = 0
	let mostExperienced: Technology = { name: 'N/A', icon: 'mdi:help-circle', years: 0, months: 0, days: 0 }

	// Exclude operating systems from this calculation
	const relevantCategories = {
		languages: technologiesData.value.languages,
		frameworks: technologiesData.value.frameworks,
		tools: technologiesData.value.tools,
		ides: technologiesData.value.ides,
		gameDevelopment: technologiesData.value.gameDevelopment,
		aiTools: technologiesData.value.aiTools
	}

	Object.values(relevantCategories).forEach((category: Technology[]) => {
		category.forEach((tech: Technology) => {
			const totalMonths = getTotalMonths(tech)
			if (totalMonths > maxExperience) {
				maxExperience = totalMonths
				mostExperienced = tech
			}
		})
	})

	return mostExperienced
})

/**
 * Find primary programming language (most experienced)
 */
const primaryLanguage = computed(() => {
	let maxExperience = 0
	let primary: Technology = { name: 'N/A', icon: 'mdi:help-circle', years: 0, months: 0, days: 0 }

	technologiesData.value.languages.forEach((lang: Technology) => {
		const totalMonths = getTotalMonths(lang)
		if (totalMonths > maxExperience) {
			maxExperience = totalMonths
			primary = lang
		}
	})

	return primary
})

/**
 * Count modern frameworks (Vue, React, Angular, etc.)
 */
const modernFrameworks = computed(() => {
	const modernFrameworkNames = [
		'Vue.js', 'React', 'Angular', 'Next.js', 'Nuxt.js',
		'Express', 'Node.js', 'Vite', 'Tailwindcss'
	]

	return technologiesData.value.frameworks.filter(framework =>
		modernFrameworkNames.some(name =>
			framework.name.toLowerCase().includes(name.toLowerCase())
		)
	).length
})

/**
 * Get top framework by experience
 */
const topFramework = computed(() => {
	let maxExperience = 0
	let top: Technology = { name: 'N/A', icon: 'mdi:help-circle', years: 0, months: 0, days: 0 }

	technologiesData.value.frameworks.forEach((framework: Technology) => {
		const totalMonths = getTotalMonths(framework)
		if (totalMonths > maxExperience) {
			maxExperience = totalMonths
			top = framework
		}
	})

	return top
})

/**
 * Determine development focus based on technology distribution
 */
const developmentFocus = computed(() => {
	const webTech = technologiesData.value.frameworks.filter(f =>
		['Vue.js', 'React', 'Angular', 'Next.js', 'Nuxt.js', 'Node.js'].includes(f.name)
	).length

	const gameTech = technologiesData.value.gameDevelopment.length
	const toolsTech = technologiesData.value.tools.length

	if (webTech >= gameTech && webTech >= toolsTech) {
		return { area: 'Web Development', technologies: webTech }
	} else if (gameTech >= toolsTech) {
		return { area: 'Game Development', technologies: gameTech }
	} else {
		return { area: 'DevOps & Tools', technologies: toolsTech }
	}
})

/**
 * Identify learning path based on recent technologies (those with less experience)
 */
const learningPath = computed(() => {
	const recentTech = Object.entries(technologiesData.value).map(([category, technologies]) => ({
		category: category.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
		recent: technologies.filter((tech: Technology) => getTotalMonths(tech) <= 6).length
	})).sort((a, b) => b.recent - a.recent)

	const topCategory = recentTech[0] || { category: 'Diverse', recent: 0 }

	return {
		category: topCategory.category.replace('Game Development', 'Game Dev').replace('Operating Systems', 'Systems'),
		count: topCategory.recent
	}
})

/**
 * Calculate expertise level based on experience diversity and depth
 */
const expertiseLevel = computed(() => {
	const allTech = Object.values(technologiesData.value).flat()
	const experiencedTech = allTech.filter((tech: Technology) => getTotalMonths(tech) >= 12)
	const expertTech = allTech.filter((tech: Technology) => getTotalMonths(tech) >= 24)

	if (expertTech.length >= 5) return 'Expert'
	if (experiencedTech.length >= 8) return 'Advanced'
	if (experiencedTech.length >= 4) return 'Intermediate'
	return 'Developing'
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
