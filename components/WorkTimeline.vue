<!--
    - @file: WorkTimeline.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
    - Work history timeline section.
-->
<template>
	<section id="work-timeline" class="bg-gray-50 dark:bg-gray-900 py-20">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold mb-4" style="color: var(--text-primary)">
					Work History
				</h2>
				<p class="text-lg" style="color: var(--text-secondary);">
					My professional journey and experience
				</p>
			</div>

			<div v-if="loading" class="text-center">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style="border-color: var(--primary-color);">
				</div>
			</div>

			<div v-else-if="error" class="text-center" style="color: var(--danger-color);">
				Failed to load work history
			</div>

			<Timeline :items="mappedWorkHistory" dotColor="var(--primary-color)" lineColor="var(--light-color)">
				<template #default="{ item }">
					<Card variant="outlined" padding="2rem" class="work-item">
						<template #default>
							<h3 class="text-xl font-semibold flex items-center gap-3" style="color: var(--text-primary)">
								{{ (item as WorkHistoryItem).position }}
								<Badge variant="light" size="sm">{{ (item as WorkHistoryItem).company }}</Badge>
							</h3>
							<p class="text-sm mb-3" style="color: var(--secondary-color)">
								{{ (item as WorkHistoryItem).period }}
							</p>
							<p class="mb-4" style="color: var(--text-secondary);">
								{{ (item as WorkHistoryItem).description }}
							</p>
							<div class="flex flex-wrap gap-2">
								<Badge v-for="tech in (item as WorkHistoryItem).technologies" :key="tech" variant="primary" size="sm"
									outlined>
									{{ tech }}
								</Badge>
							</div>
						</template>
					</Card>
				</template>
			</Timeline>
			<div v-if="!loading && !error && (!mappedWorkHistory || mappedWorkHistory.length === 0)" class="text-center"
				style="color: var(--text-secondary)">
				No work history found.
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
// ------------ IMPORTS
import { Timeline, Badge, Card } from '~/components/ui'
import type { WorkHistoryItem } from '~/types/portfolio'

// ------------ COMPOSABLES
const { data: workHistory, loading, error } = usePortfolioData<WorkHistoryItem[]>('workHistory')

// Map workHistory to add a 'date' property for Timeline
const mappedWorkHistory = computed(() =>
(workHistory.value?.map((item: WorkHistoryItem) => ({
	...item,
	date: item.period // Timeline expects 'date'
})) ?? [])
)
</script>

<style scoped>
.work-item {
	margin-bottom: 2rem;
}

.work-item h3 {
	margin-bottom: 0.5rem;
}

.work-item p {
	margin-bottom: 0.5rem;
}

/* Utility classes using variables */
.text-center {
	text-align: center;
}

.bg-gray-50,
.dark\:bg-gray-900 {
	background-color: var(--background);
}

.text-3xl {
	font-size: 1.875rem;
}

.md\:text-4xl {
	font-size: 2.25rem;
}

.text-lg {
	font-size: 1.125rem;
}

.flex {
	display: flex;
}

.flex-wrap {
	flex-wrap: wrap;
}

.gap-2 {
	gap: 0.5rem;
}

.items-center {
	align-items: center;
}

.gap-3 {
	gap: 0.75rem;
}

.py-20 {
	padding-top: 5rem;
	padding-bottom: 5rem;
}

.container {
	max-width: 1200px;
	margin: 0 auto;
}

.mx-auto {
	margin-left: auto;
	margin-right: auto;
}

.px-4 {
	padding-left: 1rem;
	padding-right: 1rem;
}

.animate-spin {
	animation: spin 1s linear infinite;
}

.rounded-full {
	border-radius: 9999px;
}

.h-12 {
	height: 3rem;
}

.w-12 {
	width: 3rem;
}

.border-b-2 {
	border-bottom-width: 2px;
}

@keyframes spin {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
