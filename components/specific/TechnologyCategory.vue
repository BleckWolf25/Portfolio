<!--
	- @file: TECHNOLOGY CATEGORY.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

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
			<div v-for="technology in technologies" :key="technology.name" class="group">
				<Tooltip :text="getExperienceText(technology)" position="top" :showTooltip="true">
					<div
						class="flex flex-col items-center justify-center bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-sm transition-all duration-200 hover:shadow-lg hover:border-primary-400 dark:hover:border-primary-500 hover:scale-105 cursor-pointer p-4">
						<Icon :name="technology.icon"
							class="w-10 h-10 text-neutral-700 dark:text-neutral-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200"
							:style="technology.color ? { color: technology.color } : {}" />
						<span class="mt-2 text-xs text-neutral-600 dark:text-neutral-400 text-center font-medium truncate w-full">
							{{ technology.name }}
						</span>
					</div>
				</Tooltip>
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

// ------------ METHODS
function getExperienceText(technology: Technology): string {
	const years = technology.years ?? 0
	const months = technology.months ?? 0
	const days = technology.days ?? 0

	const parts: string[] = []

	if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`)
	if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`)
	if (days > 0 && years === 0) parts.push(`${days} day${days > 1 ? 's' : ''}`) // Only show days if no years

	if (parts.length > 0) {
		return `${technology.name}: ${parts.join(', ')}`
	}
	return `${technology.name}: No experience data`
}
</script>
