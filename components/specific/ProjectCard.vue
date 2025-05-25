<!--
	- @file: PROJECT CARD.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Project card component for displaying individual projects.
		- Features project image, title, description, tech stack, and action buttons.
		- Includes hover effects, responsive design, and accessibility support.
-->

<!-- Template Section -->
<template>
	<UCard
		class="group relative h-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-2 overflow-hidden">
		<!-- Project Image -->
		<template #header>
			<div class="relative overflow-hidden rounded-t-lg">
				<NuxtImg :src="projectImage" :alt="`Screenshot of ${project.title}`"
					class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" width="400"
					height="200" loading="lazy" />

				<!-- Overlay on hover -->
				<div
					class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				</div>

				<!-- Quick action buttons overlay -->
				<div
					class="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<a v-if="project.url" :href="project.url" target="_blank" rel="noopener"
						class="shadow-lg backdrop-blur-sm inline-flex items-center justify-center px-2 py-1 rounded bg-primary-500 text-white hover:bg-primary-600 transition"
						:aria-label="`View ${project.title} live demo`">
						<Icon name="mdi:open-in-new" class="w-4 h-4" />
					</a>
					<a v-if="project.github" :href="project.github" target="_blank" rel="noopener"
						class="shadow-lg backdrop-blur-sm inline-flex items-center justify-center px-2 py-1 rounded bg-neutral-700 text-white hover:bg-neutral-800 transition"
						:aria-label="`View ${project.title} source code`">
						<Icon name="mdi:github" class="w-4 h-4" />
					</a>
				</div>
			</div>
		</template>

		<!-- Project Content -->
		<div class="p-6">
			<!-- Project Title -->
			<h3
				class="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
				{{ project.title }}
			</h3>

			<!-- Project Description -->
			<p class="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
				{{ project.description }}
			</p>

			<!-- Tech Stack -->
			<div class="mb-6">
				<h4 class="text-sm font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider mb-3">
					Tech Stack
				</h4>
				<div class="flex flex-wrap gap-2">
					<span v-for="tech in project.techStack" :key="tech"
						class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors duration-200">
						{{ tech }}
					</span>
				</div>
			</div>

			<!-- Action Buttons -->
			<div class="flex flex-col sm:flex-row gap-3">
				<a v-if="project.url" :href="project.url" target="_blank" rel="noopener"
					class="flex-1 justify-center font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center px-4 py-2 rounded bg-primary-600 text-white hover:bg-primary-700"
					:aria-label="`View ${project.title} live demo`">
					<Icon name="mdi:open-in-new" class="w-4 h-4 mr-2" />
					Live Demo
				</a>
				<a v-if="project.github" :href="project.github" target="_blank" rel="noopener"
					class="flex-1 justify-center font-semibold border border-primary-300 dark:border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 inline-flex items-center px-4 py-2 rounded"
					:aria-label="`View ${project.title} source code`">
					<Icon name="mdi:github" class="w-4 h-4 mr-2" />
					Source Code
				</a>
			</div>
		</div>

		<!-- Hover Gradient Overlay -->
		<div
			class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
		</div>
	</UCard>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ TYPES
interface Project {
	title: string
	description: string
	image: string
	url: string
	github: string
	techStack: string[]
}

// ------------ PROPS
const props = defineProps<{
	project: Project
}>()

const projectImage = computed(() => {
	return (!props.project.image || props.project.image === '1x' || props.project.image === '/1x')
		? '/images/project-placeholder.jpg'
		: props.project.image
})
</script>
