<!--
    - @file: SoftSkills.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
    - Soft Skills section, listing skills with S.T.A.R. method examples.
-->
<template>
	<section id="soft-skills" class="py-20" style="background-color: var(--background);">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold mb-4" style="color: var(--text-primary);">Soft Skills</h2>
				<p class="text-lg max-w-3xl mx-auto" style="color: var(--text-secondary);">
					Beyond technical expertise, these skills help me deliver exceptional results
				</p>
			</div>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<Card v-for="(skill, index) in skillsData" :key="index" class="h-full" hover>
					<template #default>
						<div class="flex items-start mb-4">
							<div class="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
								:style="{ backgroundColor: 'var(--primary-color)', color: 'var(--background)' }">
								<component :is="getIcon(skill.icon)" />
							</div>
							<div>
								<h3 class="text-xl font-bold mb-1" style="color: var(--text-primary);">{{ skill.title }}</h3>
								<p style="color: var(--text-secondary);">{{ skill.description }}</p>
							</div>
						</div>
						<!-- S.T.A.R. Method Section -->
						<div class="mt-6 p-4 rounded-lg" style="background-color: var(--light-color);">
							<h4 class="text-md font-semibold mb-3" style="color: var(--secondary-color);">Real-world Application
								(S.T.A.R.)</h4>
							<div class="space-y-3">
								<div>
									<span class="font-semibold" style="color: var(--primary-color);">Situation: </span>
									<span style="color: var(--text-secondary);">{{ skill.star.situation }}</span>
								</div>
								<div>
									<span class="font-semibold" style="color: var(--primary-color);">Task: </span>
									<span style="color: var(--text-secondary);">{{ skill.star.task }}</span>
								</div>
								<div>
									<span class="font-semibold" style="color: var(--primary-color);">Action: </span>
									<span style="color: var(--text-secondary);">{{ skill.star.action }}</span>
								</div>
								<div>
									<span class="font-semibold" style="color: var(--primary-color);">Result: </span>
									<span style="color: var(--text-secondary);">{{ skill.star.result }}</span>
								</div>
							</div>
						</div>
					</template>
					<template #footer>
						<Badge variant="secondary">{{ skill.category }}</Badge>
					</template>
				</Card>
			</div>
		</div>
	</section>
</template>

<script>
// ------------ IMPORTS
import softSkillsData from '~/data/softSkills.json'
import Card from '~/components/ui/Card.vue'
import Badge from '~/components/ui/Badge.vue'
import { getIconComponent } from '~/utils/iconMap'

// ------------ EXPORTS
export default {
	name: 'SoftSkills',
	components: {
		Card,
		Badge
	},
	data() {
		return {
			skillsData: softSkillsData.softSkills || []
		}
	},
	methods: {
		getIcon(iconName) {
			return getIconComponent(iconName, 36)
		}
	}
}
</script>
