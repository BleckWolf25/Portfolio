<!--
    - @file: AboutMe.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
    - About Me section with profile, description, contact info, and social links.
-->
<template>
	<section id="about" class="py-20" style="background-color: var(--background);">
		<div class="container mx-auto px-4">
			<div class="flex flex-col md:flex-row items-center">
				<div class="w-full md:w-1/2 mb-12 md:mb-0">
					<div class="relative">
						<div class="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4"
							:style="{ borderColor: 'var(--primary-color)' }">
							<img :src="aboutData.photo" alt="Profile" class="w-full h-full object-cover" />
						</div>
					</div>
				</div>
				<div class="w-full md:w-1/2 md:pl-12">
					<Card variant="outlined" padding="2rem" class="w-full">
						<template #default>
							<h2 class="text-3xl md:text-4xl font-bold mb-6" style="color: var(--text-primary);">{{ aboutData.title }}
							</h2>
							<p class="text-lg mb-8" style="color: var(--text-secondary);">{{ aboutData.description }}</p>
							<div class="mb-8">
								<h3 class="text-xl font-semibold mb-4" style="color: var(--secondary-color);">Contact Information</h3>
								<ul class="space-y-2">
									<li class="flex items-center" style="color: var(--text-secondary);">
										<svg class="w-5 h-5 mr-2" :style="{ color: 'var(--secondary-color)' }" fill="none"
											stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
											</path>
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
										</svg>
										{{ aboutData.location }}
									</li>
									<li class="flex items-center" style="color: var(--text-secondary);">
										<svg class="w-5 h-5 mr-2" :style="{ color: 'var(--secondary-color)' }" fill="none"
											stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
											</path>
										</svg>
										{{ aboutData.email }}
									</li>
								</ul>
							</div>
							<Button variant="secondary" size="md" tag="a" :href="aboutData.ctaLink">
								{{ aboutData.ctaText }}
							</Button>
							<!-- Social Links -->
							<div class="mt-6 flex space-x-4">
								<a v-for="social in aboutData.social" :key="social.platform" :href="social.url" target="_blank"
									rel="noopener noreferrer" class="transition-colors" :style="{ color: 'var(--secondary-color)' }">
									<IconifyIcon :icon="getIconName(social.platform)" width="32" height="32" />
								</a>
							</div>
						</template>
					</Card>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
// ------------ IMPORTS
import aboutData from '~/data/about.json'
import { Icon } from '@iconify/vue'
import Button from '~/components/ui/Button.vue'
import Card from '~/components/ui/Card.vue'

// ------------ EXPORTS
export default {
	name: 'AboutMe',
	components: {
		IconifyIcon: Icon,
		Button,
		Card
	},
	data() {
		return {
			aboutData: aboutData.about || {}
		}
	},
	methods: {
		getIconName(platform) {
			const map = {
				github: 'mdi:github',
				linkedin: 'mdi:linkedin',
				twitter: 'mdi:twitter',
				facebook: 'mdi:facebook',
				instagram: 'mdi:instagram',
				discord: 'mdi:discord',
				telegram: 'mdi:telegram',
				email: 'mdi:email',
				youtube: 'mdi:youtube',
				default: 'mdi:account'
			}
			return map[platform.toLowerCase()] || map.default
		}
	}
}
</script>
