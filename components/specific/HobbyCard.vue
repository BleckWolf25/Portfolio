<!--
	- @file: HOBBY CARD.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Hobby card component for displaying individual hobbies and interests.
		- Features animated icons, hover effects, and personal descriptions.
		- Casual, engaging design that reflects personality and interests.
-->

<!-- Template Section -->
<template>
	<div
		class="group relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:-translate-y-3 cursor-pointer overflow-hidden"
		@click="handleCardClick" @keydown.enter="handleCardClick" @keydown.space.prevent="handleCardClick" tabindex="0"
		role="button" :aria-label="`Learn more about ${hobby.name}`">
		<!-- Background Pattern -->
		<div class="absolute inset-0 opacity-5 dark:opacity-10">
			<div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500"></div>
		</div>

		<!-- Card Content -->
		<div class="relative p-6 text-center">
			<!-- Hobby Icon -->
			<div class="mb-6">
				<div
					class="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
					<SSRIcon :name="hobby.icon"
						class="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300"
						fallback-class="bg-white/20" />
				</div>
			</div>

			<!-- Hobby Name -->
			<h3
				class="text-lg font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 mb-3">
				{{ hobby.name }}
			</h3>

			<!-- Hobby Description -->
			<p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
				{{ getHobbyDescription(hobby.name) }}
			</p>

			<!-- Fun Fact -->
			<div
				class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors duration-300">
				{{ getHobbyFact(hobby.name) }}
			</div>
		</div>

		<!-- Hover Gradient Overlay -->
		<div
			class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
		</div>

		<!-- Animated Border -->
		<div
			class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-300 dark:group-hover:border-primary-600 transition-colors duration-300">
		</div>
	</div>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import SSRIcon from '../common/SSRIcon.vue'

// ------------ TYPES
interface Hobby {
	name: string
	icon: string
}

// ------------ PROPS
const props = defineProps<{
	hobby: Hobby
	index: number
}>()

// ------------ METHODS
function getHobbyDescription(hobbyName: string): string {
	const descriptions: Record<string, string> = {
		'Gaming': 'Strategic thinking and problem-solving through immersive digital experiences that enhance my analytical skills.',
		'Coding': 'Continuous learning and experimentation with new technologies, frameworks, and programming paradigms.',
		'Moto Riding': 'Motorcycle riding is a passion that I have since childhood. It has become a way to escape from the daily grind and indulge in a sense of adventure.',
		'Listening to Music': 'Finding inspiration and rhythm that influences my creative approach to software architecture.',
		'Gym': 'Building physical and mental resilience through structured workouts and disciplined training routines.'
	}
	return descriptions[hobbyName] || 'A passion that brings joy and balance to my life.'
}

function getHobbyFact(hobbyName: string): string {
	const facts: Record<string, string> = {
		'Gaming': '🎮 Strategy & RPG enthusiast',
		'Coding': '💻 Always learning new tech',
		'Moto Riding': '🏍️ MotoGP enthusiast',
		'Listening to Music': '🎵 Coding soundtrack curator',
		'Gym': '💪 Consistency over intensity'
	}
	return facts[hobbyName] || '✨ Life enriching activity'
}

function handleCardClick(): void {
	// Add a subtle animation feedback
	const card = document.activeElement as HTMLElement
	if (card) {
		card.style.transform = 'scale(0.98)'
		setTimeout(() => {
			card.style.transform = ''
		}, 150)
	}

	// Could add more interaction here, like opening a modal with more details
	console.log(`Clicked on ${props.hobby.name} hobby card`)
}
</script>

<style scoped>
/* Custom focus styles for accessibility */
.group:focus {
	outline: 2px solid #3b82f6;
	outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
.group * {
	transition-property: transform, color, background-color, border-color, opacity;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
