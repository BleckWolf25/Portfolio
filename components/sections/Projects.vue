<!--
	- @file: PROJECTS.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Modern Projects section for portfolio showcasing featured projects.
		- Features interactive project cards with tech stack, links, and animations.
		- Responsive design with hover effects and smooth transitions.
-->

<!-- Template Section -->
<template>
	<section id="projects"
		class="relative py-16 lg:py-24 bg-gradient-to-br from-white via-accent-50/10 to-primary-50/20 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 overflow-hidden"
		role="main" aria-label="Featured projects section">
		<!-- Background Decorative Elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Subtle gradient orbs -->
			<div
				class="absolute top-80 -left-80 w-96 h-96 bg-gradient-to-br from-primary-200/8 to-accent-200/8 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 16s" aria-hidden="true"></div>
			<div
				class="absolute -bottom-80 -right-80 w-96 h-96 bg-gradient-to-tr from-accent-300/8 to-secondary-200/8 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 20s; animation-delay: 6s" aria-hidden="true"></div>
		</div>

		<!-- Main Content Container -->
		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

			<!-- Section Title -->
			<div class="projects-title opacity-0" data-projects-element>
				<SectionTitle>Featured Projects</SectionTitle>
				<p class="text-center text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-16">
					A showcase of my recent work, including both client, enterprise projects and personal endeavors.
					Each project represents a unique challenge and demonstrates different aspects of my technical expertise
					and problem-solving abilities. Click or tap on the images to open Image Modal. Some projects are
					works in progress or/and confidential.
				</p>
			</div>

			<!-- Projects Grid -->
			<div v-if="projectsData.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
				<div v-for="project in projectsData" :key="project.title" class="project-card opacity-0" data-projects-element>
					<ProjectCard :project="project" />
				</div>
			</div>

			<!-- Empty State -->
			<div v-else class="projects-empty opacity-0" data-projects-element>
				<div class="text-center py-16">
					<div
						class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
						<Icon name="mdi:rocket-launch" class="w-12 h-12 text-white" />
					</div>
					<h3 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
						More Projects Coming Soon!
					</h3>
					<p class="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-8">
						I'm constantly working on new and exciting projects. Check back soon to see what I'm building
						next!
					</p>
					<UButton @click="scrollToSection('contact')" color="primary" variant="solid" size="lg"
						class="px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
						<Icon name="mdi:message-text" class="w-5 h-5 mr-2" />
						Let's Collaborate
					</UButton>
				</div>
			</div>

			<!-- Bottom CTA Section -->
			<div v-if="projectsData.length > 0" class="projects-cta opacity-0 mt-16" data-projects-element>
				<div
					class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200/50 dark:border-neutral-700/50 text-center">
					<h3 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
						Interested in Working Together?
					</h3>
					<p class="text-neutral-600 dark:text-neutral-400 mb-6 max-w-2xl mx-auto">
						I'm always open to discussing new opportunities, collaborations, or interesting projects.
						Let's connect and see how we can create something amazing together.
					</p>
					<div class="flex flex-col sm:flex-row gap-4 justify-center">
						<UButton @click="scrollToSection('contact')" color="primary" variant="solid" size="lg"
							class="px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
							<Icon name="mdi:email" class="w-5 h-5 mr-2" />
							Get In Touch
						</UButton>
						<UButton to="https://github.com/BleckWolf25" external variant="outline" size="lg"
							class="px-8 py-4 font-semibold border-primary-300 dark:border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300">
							<Icon name="mdi:github" class="w-5 h-5 mr-2" />
							View GitHub
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
import ProjectCard from '../specific/ProjectCard.vue'

// ------------ TYPES
interface Project {
	title: string
	description: string
	image: string
	url: string
	github: string
	techStack: string[]
}

interface ProjectsData {
	projects: Project[]
}

// ------------ DATA
const { data: projectsDataResponse } = await useAsyncData<ProjectsData | null>('projects-data', async () => {
	try {
		return await $fetch<ProjectsData>('/api/data/projects.json')
	} catch (err) {
		console.warn('[Projects] Failed to load projects data:', err)
		return null
	}
})

const projectsData = computed(() => {
	const data = projectsDataResponse.value as ProjectsData | null
	return data?.projects ?? []
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
	// Initialize staggered fade-in animation for projects elements
	const fadeInControl = fadeInOnScroll('[data-projects-element]', {
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
