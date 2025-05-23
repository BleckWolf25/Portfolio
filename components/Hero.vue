<!--
    - @file: Hero.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
    - Hero section with name, title, and call-to-action buttons.
-->
<!-- components/Hero.vue -->
<template>
	<section class="relative h-screen flex items-center justify-center overflow-hidden"
		:style="Object.assign({ background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }, backgroundStyle)">
		<div class="absolute inset-0 z-0">
			<!-- Background overlay -->
			<div class="absolute inset-0" style="background: var(--dark-color); opacity: 0.20;"></div>
		</div>
		<div class="container mx-auto px-4 z-10">
			<div class="text-center">
				<h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style="color: var(--text-primary);">
					<span class="block">Hello, I'm</span>
					<span class="block" style="color: var(--primary-color);">{{ heroData.name }}</span>
				</h1>
				<p class="text-xl md:text-2xl mb-12 max-w-3xl mx-auto" style="color: var(--text-primary);">
					{{ heroData.title }}
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<Button variant="outline" size="lg" tag="a" href="#about">
						Learn More
					</Button>
					<Button variant="primary" size="lg" tag="a" href="#contact">
						Contact Me
					</Button>
				</div>
			</div>
		</div>
		<div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
			@click="$router ? $router.push('#about') : (window.location.hash = '#about')" aria-label="Scroll to About section"
			role="button" tabindex="0">
			<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				style="color: var(--background);">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3">
				</path>
			</svg>
		</div>
	</section>
</template>

<script>
// ------------ IMPORTS
import heroData from '~/data/hero.json'
import Button from '~/components/ui/Button.vue'

// ------------ EXPORTS
export default {
	name: 'Hero',
	components: {
		Button
	},
	data() {
		return {
			heroData: heroData.hero || {}
		}
	},
	computed: {
		backgroundStyle() {
			return this.heroData.backgroundImage
				? { backgroundImage: `url(${this.heroData.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
				: {}
		}
	}
}
</script>

<style scoped>
.animate-fade-in {
	animation: fadeIn 1.5s ease-out;
}

@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(-20px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
