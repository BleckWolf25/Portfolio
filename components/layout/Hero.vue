<!--
	- @file: HERO.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Modern hero layout section for portfolio with animated text effects and smooth interactions.
		- Features gradient text effects, staggered animations, and accessible navigation.
		- Responsive design with dark mode support and optimized performance.
-->

<!-- Template Section -->
<template>
	<section id="hero"
		class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-100/20 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
		role="banner" aria-label="Hero section">

		<!-- Background Decorative Elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">

			<!-- Animated gradient orbs -->
			<div
				class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-200/20 to-accent-200/20 rounded-full blur-3xl animate-pulse"
				aria-hidden="true">
			</div>

			<div
				class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-primary-300/20 to-secondary-200/20 rounded-full blur-3xl animate-pulse"
				style="animation-delay: 2s" aria-hidden="true">
			</div>

		</div>

		<!-- Main Content Container -->
		<div class="relative z-10 max-w-4xl mx-auto px-6 text-center">

			<!-- Welcome Text -->
			<div class="hero-welcome mb-4 opacity-0" data-hero-element>
				<p class="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-medium tracking-wide">
					Welcome, I'm
				</p>
			</div>

			<!-- Main Name with Gradient Effect -->
			<div class="hero-name mb-6 opacity-0" data-hero-element>

				<h1 class="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
					<span
						class="bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent animate-gradient-x relative"
						style="background-size: 200% 200%">
						BleckWolf25
					</span>
				</h1>

				<!-- Subtle glow effect -->
				<div
					class="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-600/20 blur-xl -z-10 opacity-60"
					aria-hidden="true">
				</div>

			</div>

			<!-- Role Description -->
			<div class="hero-role mb-12 opacity-0" data-hero-element>
				<p
					class="text-xl md:text-2xl lg:text-3xl text-neutral-700 dark:text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
					Software Developer & Executive Leader
				</p>
			</div>

			<!-- Action Buttons -->
			<div class="hero-actions flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0" data-hero-element>
				<Button variant="primary" size="lg" :rounded="true"
					class="min-w-[160px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
					aria-label="Learn more about BleckWolf25" announce-on-click="Navigating to About section"
					@click="scrollToSection('about')">
					<ClientOnly>
						<Icon name="mdi:arrow-down" class="w-5 h-5 mr-2" />
						<template #fallback>
							<div class="w-5 h-5 mr-2 bg-white/20 rounded animate-pulse"></div>
						</template>
					</ClientOnly>
					Learn More
				</Button>

				<Button variant="secondary" size="lg" :rounded="true"
					class="min-w-[160px] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
					aria-label="Contact BleckWolf25" announce-on-click="Navigating to Contact section"
					@click="scrollToSection('contact')">
					<ClientOnly>
						<Icon name="mdi:email-outline" class="w-5 h-5 mr-2" />
						<template #fallback>
							<div class="w-5 h-5 mr-2 bg-white/20 rounded animate-pulse"></div>
						</template>
					</ClientOnly>
					Contact Me
				</Button>
			</div>
		</div>

		<!-- Scroll Indicator -->
		<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 hero-scroll-indicator"
			data-hero-element>
			<div class="flex flex-col items-center animate-bounce">
				<span class="text-sm text-neutral-500 dark:text-neutral-400 mb-2">Scroll to explore</span>
				<ClientOnly>
					<Icon name="mdi:chevron-down" class="w-6 h-6 text-primary-500" />
					<template #fallback>
						<div class="w-6 h-6 bg-primary-500/20 rounded animate-pulse"></div>
					</template>
				</ClientOnly>
			</div>
		</div>

	</section>
</template>

<!-- Script Section -->
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { heroLoadAnimation } from '../animations/index'
import Button from '../common/Button.vue';

// ------------ PROPS & EMITS
interface HeroProps {

	/** Custom animation delay in milliseconds */
	animationDelay?: number

	/** Enable/disable auto-scroll indicator */
	showScrollIndicator?: boolean
}

const props = withDefaults(defineProps<HeroProps>(), {
	animationDelay: 200,
	showScrollIndicator: true
})

// ------------ METHODS
/**
 * Smooth scroll to a specific section of the page
 * @param sectionId - The ID of the target section (without #)
 */
function scrollToSection(sectionId: string): void {
	const targetElement = document.getElementById(sectionId)

	if (targetElement) {
		targetElement.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	} else {
		console.warn(`[Hero] Section with ID '${sectionId}' not found`)
	}
}

/**
 * Initialize hero animations on component mount
 */
function initializeAnimations(): void {
	// Apply load animation using the imported animation module
	heroLoadAnimation('#hero', {
		delay: props.animationDelay,
		stagger: 150,
		duration: 800,
		easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
		yOffset: 30
	})
}

/**
 * Handle intersection observer for scroll-triggered animations
 */
let intersectionObserver: IntersectionObserver | null = null

function setupScrollAnimations(): void {
	if (typeof window === 'undefined') return

	intersectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('animate-fade-in-up')
				}
			})
		},
		{
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		}
	)

	// Observe elements that should animate on scroll
	const elements = document.querySelectorAll('[data-hero-element]')
	elements.forEach((el) => intersectionObserver?.observe(el))
}

// ------------ LIFECYCLE HOOKS
onMounted(() => {
	// Initialize animations after DOM is ready
	nextTick(() => {
		initializeAnimations()
		setupScrollAnimations()
	})
})

onBeforeUnmount(() => {
	// Clean up intersection observer
	if (intersectionObserver) {
		intersectionObserver.disconnect()
		intersectionObserver = null
	}
})

// ------------ SEO & META
useHead({
	title: 'BleckWolf25 - Software Developer & Executive Leader',
	meta: [
		{
			name: 'description',
			content: 'Welcome to BleckWolf25\'s portfolio. Software Developer and Executive Leader specializing in modern web technologies and leadership.'
		},
		{
			property: 'og:title',
			content: 'BleckWolf25 - Portfolio'
		},
		{
			property: 'og:description',
			content: 'Software Developer & Executive Leader - Explore my work and experience'
		}
	]
})
</script>

<!-- Style Section -->
<style scoped>
/* ===================================== */
/* HERO SECTION CUSTOM STYLES           */
/* ===================================== */

/**
 * Gradient animation for the main name
 * Creates a flowing, animated gradient effect
 */
@keyframes gradient-x {

	0%,
	100% {
		background-position: 0% 50%;
	}

	50% {
		background-position: 100% 50%;
	}
}

.animate-gradient-x {
	animation: gradient-x 3s ease infinite;
}

/**
 * Glow effect for the name
 * Provides depth and visual interest
 */
.hero-name {
	position: relative;
}

.hero-name::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	width: 100%;
	height: 100%;
	background: radial-gradient(ellipse at center,
			rgba(10, 201, 188, 0.15) 0%,
			rgba(20, 184, 166, 0.1) 50%,
			transparent 70%);
	transform: translate(-50%, -50%) scale(1.2);
	z-index: -1;
	border-radius: 50%;
	filter: blur(20px);
	opacity: 0;
	animation: pulse-glow 4s ease-in-out infinite;
}

@keyframes pulse-glow {

	0%,
	100% {
		opacity: 0.3;
		transform: translate(-50%, -50%) scale(1);
	}

	50% {
		opacity: 0.6;
		transform: translate(-50%, -50%) scale(1.1);
	}
}

/**
 * Fade in animation for elements
 */
@keyframes fade-in-up {
	from {
		opacity: 0;
		transform: translateY(30px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.animate-fade-in-up {
	animation: fade-in-up 0.6s ease-out forwards;
}

/**
 * Responsive typography adjustments
 */
@media (max-width: 640px) {
	.hero-name h1 {
		font-size: 3rem;
		line-height: 1.1;
	}

	.hero-role p {
		font-size: 1.25rem;
		line-height: 1.4;
	}
}

/**
 * Reduced motion preferences
 */
@media (prefers-reduced-motion: reduce) {

	.animate-gradient-x,
	.animate-pulse,
	.animate-bounce {
		animation: none;
	}

	.hero-name::before {
		animation: none;
		opacity: 0.3;
	}
}

/**
 * High contrast mode support
 */
@media (prefers-contrast: high) {
	.bg-gradient-to-r {
		background: currentColor;
		-webkit-background-clip: text;
		background-clip: text;
	}
}
</style>
