<!--
    - @file: Technologies.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
    - Technologies section, listing technology categories and experience.
-->
<template>
	<section id="technologies" class="py-20" style="background-color: var(--background);">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold mb-4" style="color: var(--text-primary);">
					Technologies I've Worked With
				</h2>
				<p class="text-lg max-w-3xl mx-auto" style="color: var(--text-secondary);">
					Hover over the tech stack icons to see my experience with each technology.
				</p>
			</div>
			<!-- Dynamically render technology categories -->
			<div v-for="(techCategory, categoryKey) in categoriesConfig" :key="categoryKey" class="mb-16">
				<h3 class="text-2xl font-semibold mb-8 text-center" style="color: var(--secondary-color);">
					{{ techCategory.title }}
				</h3>
				<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
					<div v-for="(tech, index) in techData[categoryKey]" :key="index" class="flex flex-col items-center relative">
						<div
							class="w-20 h-20 flex items-center justify-center rounded-lg mb-4 transition-all duration-300 transform hover:-translate-y-1"
							:style="{
								backgroundColor: 'var(--background)',
								boxShadow: '0 1px 4px 0 rgba(0,0,0,0.08)',
								border: '1px solid var(--light-color)'
							}" @mouseover="showExperience(categoryKey, index)" @mouseleave="hideExperience"
							@focus="showExperience(categoryKey, index)" @blur="hideExperience" tabindex="0"
							:aria-label="`${tech.name}: ${formatExperience(tech)}`" role="button">
							<div
								class="w-12 h-12 flex items-center justify-center transition-transform duration-300 transform hover:scale-110"
								:style="{ color: isActiveTech(categoryKey, index) ? tech.color || 'var(--primary-color)' : 'var(--secondary-color)' }"
								aria-hidden="true">
								<component :is="getIcon(tech.icon)" />
							</div>
						</div>
						<span class="text-sm font-medium" style="color: var(--text-primary);">{{ tech.name }}</span>

						<!-- Tooltip -->
						<div v-if="showTooltip(categoryKey, index)"
							class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-xs rounded px-2 py-1 shadow z-10 whitespace-nowrap"
							style="background-color: var(--dark-color); color: var(--text-secondary);" role="tooltip">
							{{ formatExperience(tech) }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
// ------------ IMPORTS
import techData from '~/data/technologies.json'
import { getIconComponent } from '~/utils/iconMap'
import Badge from '~/components/ui/Badge.vue'

// ------------ EXPORTS
export default {
	name: 'Technologies',
	components: {
		Badge
	},
	data() {
		return {
			techData: techData.technologies || {},
			activeTech: null,
			experienceHover: null, // { category, index }
			// Configuration for all categories - centralized for maintainability
			categoriesConfig: {
				languages: {
					title: 'Languages',
					ariaLabel: 'Programming language'
				},
				frameworks: {
					title: 'Frameworks & Libraries',
					ariaLabel: 'Framework or library'
				},
				tools: {
					title: 'Tools & Platforms',
					ariaLabel: 'Development tool'
				},
				ides: {
					title: 'IDEs & Editors',
					ariaLabel: 'Code editor'
				},
				gameDevelopment: {
					title: 'Game Development',
					ariaLabel: 'Game development platform'
				},
				operatingSystems: {
					title: 'Operating Systems',
					ariaLabel: 'Operating system'
				},
				aiTools: {
					title: 'AI Tools',
					ariaLabel: 'AI tool'
				}
			}
		}
	},
	methods: {
		/**
		 * Gets the icon component for the specified icon name
		 * @param {string} iconName - Name of the icon
		 * @returns {Component} Vue component for the icon
		 */
		getIcon(iconName) {
			return getIconComponent(iconName, 48)
		},

		/**
		 * Shows the experience tooltip for the specified technology
		 * @param {string} category - Technology category
		 * @param {number} index - Index of the technology in the category
		 */
		showExperience(category, index) {
			this.activeTech = { category, index }
			this.experienceHover = { category, index }
		},

		/**
		 * Hides the experience tooltip
		 */
		hideExperience() {
			this.experienceHover = null
		},

		/**
		 * Checks if the tooltip should be shown for the specified technology
		 * @param {string} category - Technology category
		 * @param {number} index - Index of the technology in the category
		 * @returns {boolean} True if the tooltip should be shown
		 */
		showTooltip(category, index) {
			return this.experienceHover &&
				this.experienceHover.category === category &&
				this.experienceHover.index === index
		},

		/**
		 * Checks if the specified technology is active (being hovered/focused)
		 * @param {string} category - Technology category
		 * @param {number} index - Index of the technology in the category
		 * @returns {boolean} True if the technology is active
		 */
		isActiveTech(category, index) {
			return this.activeTech?.category === category && this.activeTech?.index === index
		},

		/**
		 * Formats the experience time (years/months/days) for display
		 * @param {Object} tech - Technology object
		 * @returns {string} Formatted experience string
		 */
		formatExperience(tech) {
			if (!tech.years && !tech.months && !tech.days) {
				return 'Experience not specified'
			}

			const parts = []

			if (tech.years) {
				parts.push(`${tech.years} year${tech.years > 1 ? 's' : ''}`)
			}

			if (tech.months) {
				parts.push(`${tech.months} month${tech.months > 1 ? 's' : ''}`)
			}

			if (tech.days) {
				parts.push(`${tech.days} day${tech.days > 1 ? 's' : ''}`)
			}

			return parts.length > 0 ? `${parts.join(', ')} experience` : 'Experience not specified'
		}
	}
}
</script>
