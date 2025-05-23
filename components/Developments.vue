<!--
    - @file: Developments.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
    - What I Develop section, listing development categories and features.
-->
<template>
	<section id="development" class="py-20" style="background-color: var(--background);">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold mb-4" style="color: var(--text-primary);">What I Develop</h2>
				<p class="text-lg max-w-3xl mx-auto" style="color: var(--text-secondary);">
					Specialized solutions for various business needs
				</p>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<Card v-for="(item, index) in developmentData" :key="index" class="h-full" hover>
					<template #default>
						<h3 class="text-xl font-bold mb-2" style="color: var(--text-primary);">{{ item.title }}</h3>
						<p class="mb-6" style="color: var(--text-secondary);">{{ item.description }}</p>
						<h4 class="text-md font-semibold mb-3" style="color: var(--secondary-color);">Features:</h4>
						<ul class="space-y-2">
							<li v-for="(feature, fIndex) in item.features" :key="fIndex" class="flex items-start">
								<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg" style="color: var(--primary-color);">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M5 13l4 4L19 7"></path>
								</svg>
								<span style="color: var(--text-secondary);">{{ feature }}</span>
							</li>
						</ul>
					</template>
					<template #footer>
						<Badge variant="primary">{{ item.category }}</Badge>
					</template>
				</Card>
			</div>
		</div>
	</section>
</template>

<script>
// ------------ IMPORTS
import developmentData from '~/data/development.json'
import Card from '~/components/ui/Card.vue'
import Badge from '~/components/ui/Badge.vue'

// ------------ EXPORTS
export default {
	name: 'Developments',
	components: {
		Card,
		Badge
	},
	data() {
		return {
			developmentData: developmentData.development || []
		}
	}
}
</script>
