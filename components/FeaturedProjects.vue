<!--
    - @file: FeaturedProjects.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
    - Featured Projects section, listing highlighted projects with tech stack and links.
-->
<template>
	<section id="projects" class="py-20" style="background-color: var(--background);">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold mb-4" style="color: var(--text-primary);">Featured Projects
				</h2>
				<p class="text-lg max-w-3xl mx-auto" style="color: var(--text-secondary);">
					Showcasing some of my best work
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<Card v-for="(project, index) in projectsData" :key="index" class="h-full" hover>
					<template #image>
						<img :src="project.image || '/api/placeholder/800/400'" :alt="project.title"
							class="w-full h-20 object-cover" />
					</template>
					<template #default>
						<h3 class="text-xl font-bold mb-2" style="color: var(--text-primary);">{{ project.title }}</h3>
						<p class="mb-6" style="color: var(--text-secondary);">{{ project.description }}</p>
						<div class="flex flex-wrap gap-2 mb-6">
							<Badge v-for="(tech, tIndex) in project.techStack" :key="tIndex" variant="primary" size="sm" outlined>
								{{ tech }}
							</Badge>
						</div>
					</template>
					<template #footer>
						<div class="flex justify-between items-center">
							<a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer"
								class="flex items-center" style="color: var(--primary-color);">
								<span class="mr-2">Live Demo</span>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
							</a>
							<a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer"
								class="flex items-center" style="color: var(--secondary-color);">
								<svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
									<path fill-rule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
										clip-rule="evenodd" />
								</svg>
								<span>GitHub</span>
							</a>
						</div>
					</template>
				</Card>
			</div>
		</div>
	</section>
</template>

<script>
// ------------ IMPORTS
import projectsData from '~/data/projects.json'
import Card from '~/components/ui/Card.vue'
import Badge from '~/components/ui/Badge.vue'

// ------------ EXPORTS
export default {
	name: 'FeaturedProjects',
	components: {
		Card,
		Badge
	},
	data() {
		return {
			projectsData: projectsData.projects || []
		}
	},
	methods: {
		getBadgeVariant(index) {
			const variants = ['blue', 'green', 'purple', 'pink', 'orange']
			return variants[index % variants.length]
		},
		getBadgeStyle(index) {
			// Map variants to CSS variable colors
			const colorMap = {
				blue: { bg: 'var(--primary-color)', color: 'var(--background)' },
				green: { bg: 'var(--success-color)', color: 'var(--background)' },
				purple: { bg: 'var(--purple-color)', color: 'var(--background)' },
				pink: { bg: 'var(--pink-color)', color: 'var(--background)' },
				orange: { bg: 'var(--warning-color)', color: 'var(--background)' }
			}
			const variant = this.getBadgeVariant(index)
			const style = colorMap[variant]
			return {
				backgroundColor: style.bg,
				color: style.color
			}
		}
	}
}
</script>
