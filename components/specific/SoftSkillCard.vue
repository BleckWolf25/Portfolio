<!--
	- @file: SOFT SKILL CARD.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Soft skill card component for displaying individual soft skills.
		- Features skill info, description, and expandable STAR methodology examples.
		- Includes hover effects, responsive design, and accessibility support.
-->

<!-- Template Section -->
<template>
	<UCard
		class="group relative h-full bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-2">
		<!-- Card Header -->
		<template #header>
			<div class="p-6 pb-4">
				<!-- Skill Icon & Title -->
				<div class="flex items-center space-x-4 mb-4">
					<div class="flex-shrink-0">
						<div
							class="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
							<Icon :name="getSkillIcon(skill.icon)" class="w-8 h-8 text-white" />
						</div>
					</div>

					<div class="flex-1">
						<h3
							class="text-xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 mb-1">
							{{ skill.title }}
						</h3>
						<span
							class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
							{{ skill.category }}
						</span>
					</div>
				</div>

				<!-- Description -->
				<p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
					{{ skill.description }}
				</p>
			</div>
		</template>

		<!-- Card Content -->
		<div class="px-6 pb-6">
			<!-- STAR Example Toggle -->
			<div class="mb-4">
				<UButton @click="toggleStarExample" variant="ghost" size="md"
					class="w-full justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-700/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
					:aria-expanded="showStarExample"
					:aria-label="`${showStarExample ? 'Hide' : 'Show'} STAR example for ${skill.title}`">
					<span class="flex items-center space-x-2">
						<Icon name="mdi:star-four-points" class="w-4 h-4 text-primary-500" />
						<span class="font-medium text-neutral-700 dark:text-neutral-300">
							{{ showStarExample ? 'Hide' : 'View' }} STAR Example
						</span>
					</span>
					<Icon :name="showStarExample ? 'mdi:chevron-up' : 'mdi:chevron-down'"
						class="w-5 h-5 text-neutral-500 transition-transform duration-200" />
				</UButton>
			</div>

			<!-- STAR Example Content -->
			<Transition enter-active-class="transition duration-300 ease-out"
				enter-from-class="opacity-0 scale-95 -translate-y-2" enter-to-class="opacity-100 scale-100 translate-y-0"
				leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0"
				leave-to-class="opacity-0 scale-95 -translate-y-2">
				<div v-if="showStarExample" class="space-y-4">
					<!-- Situation -->
					<div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
						<div class="flex items-start space-x-3">
							<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
								<Icon name="mdi:map-marker" class="w-4 h-4 text-white" />
							</div>
							<div class="flex-1">
								<h4 class="text-sm font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wider mb-1">
									Situation
								</h4>
								<p class="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
									{{ skill.star.situation }}
								</p>
							</div>
						</div>
					</div>

					<!-- Task -->
					<div class="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
						<div class="flex items-start space-x-3">
							<div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
								<Icon name="mdi:target" class="w-4 h-4 text-white" />
							</div>
							<div class="flex-1">
								<h4 class="text-sm font-semibold text-green-800 dark:text-green-200 uppercase tracking-wider mb-1">
									Task
								</h4>
								<p class="text-sm text-green-700 dark:text-green-300 leading-relaxed">
									{{ skill.star.task }}
								</p>
							</div>
						</div>
					</div>

					<!-- Action -->
					<div
						class="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
						<div class="flex items-start space-x-3">
							<div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
								<Icon name="mdi:lightning-bolt" class="w-4 h-4 text-white" />
							</div>
							<div class="flex-1">
								<h4 class="text-sm font-semibold text-orange-800 dark:text-orange-200 uppercase tracking-wider mb-1">
									Action
								</h4>
								<p class="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
									{{ skill.star.action }}
								</p>
							</div>
						</div>
					</div>

					<!-- Result -->
					<div
						class="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
						<div class="flex items-start space-x-3">
							<div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
								<Icon name="mdi:trophy" class="w-4 h-4 text-white" />
							</div>
							<div class="flex-1">
								<h4 class="text-sm font-semibold text-purple-800 dark:text-purple-200 uppercase tracking-wider mb-1">
									Result
								</h4>
								<p class="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
									{{ skill.star.result }}
								</p>
							</div>
						</div>
					</div>
				</div>
			</Transition>
		</div>

		<!-- Hover Gradient Overlay -->
		<div
			class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
		</div>
	</UCard>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { ref } from 'vue'

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

// ------------ PROPS
const props = defineProps<{
	skill: SoftSkill
	index: number
}>()

// ------------ REACTIVE STATE
const showStarExample = ref(false)

// ------------ METHODS
function getSkillIcon(iconName: string): string {
	const iconMap: Record<string, string> = {
		'leadership': 'mdi:account-group',
		'communication': 'mdi:message-text',
		'problem-solving': 'mdi:puzzle',
		'teamwork': 'mdi:account-multiple',
		'adaptability': 'mdi:refresh',
		'creativity': 'mdi:lightbulb'
	}
	return iconMap[iconName] || 'mdi:star'
}

function toggleStarExample(): void {
	showStarExample.value = !showStarExample.value
}
</script>
