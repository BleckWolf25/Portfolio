<!--
	- @file: WORK TIMELINE CARD.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Work timeline card component for displaying individual work experiences.
		- Features company info, position, period, description, and technology stack.
		- Includes hover effects, responsive design, and accessibility support.
-->

<!-- Template Section -->
<template>
	<UCard
		class="group relative h-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-2">
		<!-- Card Header -->
		<template #header>
			<div class="p-6 pb-4">
				<!-- Company & Position -->
				<div class="flex items-start justify-between mb-4">
					<div class="flex-1">
						<h3
							class="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 mb-1">
							{{ job.position }}
						</h3>
						<div class="flex items-center space-x-2">
							<Icon name="mdi:domain" class="w-4 h-4 text-primary-500" />
							<span class="text-lg font-semibold text-primary-600 dark:text-primary-400">
								{{ job.company }}
							</span>
						</div>
					</div>

					<!-- Timeline indicator for mobile -->
					<div class="lg:hidden flex-shrink-0 ml-4">
						<div
							class="w-4 h-4 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full border-2 border-white dark:border-neutral-800 shadow-md">
						</div>
					</div>
				</div>

				<!-- Period -->
				<div class="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
					<Icon name="mdi:calendar-range" class="w-4 h-4 text-accent-500" />
					<span class="font-medium">{{ job.period }}</span>
					<span v-if="job.period.includes('Present')"
						class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
						<div class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></div>
						Current
					</span>
				</div>
			</div>
		</template>

		<!-- Card Content -->
		<div class="px-6 pb-6">
			<!-- Description -->
			<div class="mb-6">
				<p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
					{{ job.description }}
				</p>
			</div>

			<!-- Technologies -->
			<div>
				<h4
					class="text-sm font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-3 flex items-center">
					<Icon name="mdi:code-tags" class="w-4 h-4 mr-2 text-primary-500" />
					Technologies Used
				</h4>

				<!-- Technology Grid -->
				<div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
					<span v-for="tech in displayedTechnologies" :key="tech"
						class="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200 border border-primary-200 dark:border-primary-800">
						{{ tech }}
					</span>
				</div>

				<!-- Show More/Less Button -->
				<div v-if="job.technologies.length > maxDisplayedTech" class="mt-3">
					<UButton @click="toggleTechnologies" variant="ghost" size="sm"
						class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 p-0 h-auto font-medium">
						{{ showAllTechnologies ? 'Show Less' : `Show ${job.technologies.length - maxDisplayedTech} More`
						}}
						<Icon :name="showAllTechnologies ? 'mdi:chevron-up' : 'mdi:chevron-down'"
							class="w-4 h-4 ml-1 transition-transform duration-200" />
					</UButton>
				</div>
			</div>
		</div>

		<!-- Hover Gradient Overlay -->
		<div
			class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
		</div>

		<!-- Side Accent (Desktop) -->
		<div :class="[
			'hidden lg:block absolute top-0 w-1 h-full bg-gradient-to-b from-primary-500 to-accent-500 transition-opacity duration-300',
			index % 2 === 0 ? 'left-0 rounded-l-lg' : 'right-0 rounded-r-lg',
			'opacity-0 group-hover:opacity-100'
		]"></div>
	</UCard>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { ref, computed } from 'vue'

// ------------ TYPES
interface WorkExperience {
	company: string
	position: string
	period: string
	description: string
	technologies: string[]
}

// ------------ PROPS
const props = defineProps<{
	job: WorkExperience
	index: number
}>()

// ------------ REACTIVE STATE
const showAllTechnologies = ref(false)
const maxDisplayedTech = 6

// ------------ COMPUTED PROPERTIES
const displayedTechnologies = computed(() => {
	if (showAllTechnologies.value || props.job.technologies.length <= maxDisplayedTech) {
		return props.job.technologies
	}
	return props.job.technologies.slice(0, maxDisplayedTech)
})

// ------------ METHODS
function toggleTechnologies(): void {
	showAllTechnologies.value = !showAllTechnologies.value
}
</script>
