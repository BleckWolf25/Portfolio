<!--
	- @file: TECHNOLOGY CATEGORY.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.1.0

	- @description:
		- Technology category component for displaying groups of technologies.
		- Features interactive technology icons with hover tooltips showing experience.
		- Responsive grid layout with smooth animations and accessibility support.
-->

<!-- Template Section -->
<template>
	<div class="technology-category">
		<!-- Category Header -->
		<div class="flex items-center space-x-4 mb-8">
			<div class="flex-shrink-0">
				<div
					class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg">
					<Icon :name="icon" class="w-6 h-6 text-white" />
				</div>
			</div>
			<div class="flex-1">
				<h3 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
					{{ title }}
				</h3>
				<p class="text-neutral-600 dark:text-neutral-400">
					{{ description }}
				</p>
			</div>
		</div>

		<!-- Technologies Grid -->
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
			<div v-for="technology in technologies" :key="technology.name" class="group relative">
				<!-- Technology Card -->
				<div
					class="flex flex-col items-center justify-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm transition-all duration-200 hover:shadow-lg hover:border-primary-400 dark:hover:border-primary-500 hover:scale-105 cursor-pointer p-4"
					@mouseenter="showTooltip = technology.name" @mouseleave="showTooltip = null">
					<Icon :name="technology.icon"
						class="w-10 h-10 text-neutral-700 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200"
						:style="technology.color ? { color: technology.color } : {}" />
					<span class="mt-2 text-xs text-neutral-600 dark:text-neutral-400 text-center font-medium truncate w-full">
						{{ technology.name }}
					</span>
				</div>

				<!-- Custom Tooltip -->
				<Transition enter-active-class="transition-all duration-200 ease-out"
					enter-from-class="opacity-0 scale-95 translate-y-1" enter-to-class="opacity-100 scale-100 translate-y-0"
					leave-active-class="transition-all duration-150 ease-in"
					leave-from-class="opacity-100 scale-100 translate-y-0" leave-to-class="opacity-0 scale-95 translate-y-1">
					<div v-if="showTooltip === technology.name"
						class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 pointer-events-none"
						role="tooltip" :aria-label="`${technology.name} experience: ${formatExperience(technology)}`">
						<!-- Tooltip Content -->
						<div
							class="bg-neutral-900 dark:bg-neutral-700 text-white text-xs rounded-lg px-3 py-2 shadow-lg border border-neutral-700 dark:border-neutral-600 whitespace-nowrap">
							<div class="font-semibold text-primary-300 mb-1">
								{{ technology.name }}
							</div>
							<div class="text-neutral-200">
								Experience: {{ formatExperience(technology) }}
							</div>
							<!-- Detailed breakdown if multiple time units -->
							<div v-if="hasMultipleTimeUnits(technology)" class="text-neutral-400 text-xs mt-1 space-y-0.5">
								<div v-if="technology.years" class="flex justify-between">
									<span>Years:</span>
									<span>{{ technology.years }}</span>
								</div>
								<div v-if="technology.months" class="flex justify-between">
									<span>Months:</span>
									<span>{{ technology.months }}</span>
								</div>
								<div v-if="technology.days" class="flex justify-between">
									<span>Days:</span>
									<span>{{ technology.days }}</span>
								</div>
							</div>
						</div>

						<!-- Tooltip Arrow -->
						<div class="absolute top-full left-1/2 transform -translate-x-1/2">
							<div class="border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-700"></div>
						</div>
					</div>
				</Transition>
			</div>
		</div>

		<!-- Technology Count -->
		<div class="mt-6 text-center">
			<span class="text-sm text-neutral-500 dark:text-neutral-400">
				{{ technologies.length }} {{ technologies.length === 1 ? 'technology' : 'technologies' }}
			</span>
		</div>
	</div>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { ref } from 'vue'

// ------------ TYPES
interface Technology {
	name: string
	icon: string
	years?: number
	months?: number
	days?: number
	color?: string
}

// ------------ PROPS
const props = defineProps<{
	title: string
	description: string
	icon: string
	technologies: Technology[]
}>()

// ------------ REACTIVE STATE
const showTooltip = ref<string | null>(null)

// ------------ UTILITY FUNCTIONS

/**
 * Format technology experience into a human-readable string
 * Prioritizes the largest time unit and includes secondary units when relevant
 */
function formatExperience(technology: Technology): string {
	const { years = 0, months = 0, days = 0 } = technology

	// Handle no experience case
	if (!years && !months && !days) {
		return 'New to this technology'
	}

	const parts: string[] = []

	// Add years if present
	if (years > 0) {
		parts.push(`${years} year${years !== 1 ? 's' : ''}`)
	}

	// Add months if present and either no years or less than 2 years
	if (months > 0 && (years === 0 || years < 2)) {
		parts.push(`${months} month${months !== 1 ? 's' : ''}`)
	}

	// Add days only if no years and months < 2, or if it's the only time unit
	if (days > 0 && years === 0 && (months === 0 || months < 2)) {
		parts.push(`${days} day${days !== 1 ? 's' : ''}`)
	}

	// Join parts with appropriate connectors
	if (parts.length === 0) {
		return 'Getting started'
	} else if (parts.length === 1) {
		return parts[0] ?? 'Getting started'
	} else if (parts.length === 2) {
		return parts.join(' and ')
	} else {
		return parts.slice(0, -1).join(', ') + ', and ' + parts[parts.length - 1]
	}
}

/**
 * Check if technology has multiple time units for detailed breakdown
 */
function hasMultipleTimeUnits(technology: Technology): boolean {
	const { years = 0, months = 0, days = 0 } = technology
	const unitCount = [years, months, days].filter(unit => unit > 0).length
	return unitCount > 1
}

/**
 * Get experience level badge based on total experience
 */
function getExperienceLevel(technology: Technology): string {
	const { years = 0, months = 0, days = 0 } = technology
	const totalMonths = years * 12 + months + (days / 30)

	if (totalMonths >= 24) return 'Expert'
	if (totalMonths >= 12) return 'Advanced'
	if (totalMonths >= 6) return 'Intermediate'
	if (totalMonths >= 1) return 'Beginner'
	return 'Learning'
}
</script>

<!-- Styles Section -->
<style scoped>
/* Ensure tooltip appears above other elements */
.group:hover {
	z-index: 10;
}

/* Smooth tooltip transitions */
.tooltip-enter-active,
.tooltip-leave-active {
	transition: all 0.2s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
	opacity: 0;
	transform: translateY(4px) scale(0.95);
}

/* Ensure tooltip stays visible during hover */
[role="tooltip"] {
	pointer-events: none;
}
</style>
