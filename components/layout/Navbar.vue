<!--
	- @file: NAVBAR.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Modern navbar layout section for portfolio with glass-morphism effect.
		- Features smooth scroll navigation, section tracking, and responsive design.
		- Includes accessibility support and theme integration.
-->

<!-- Template Section -->
<template>
	<nav ref="navbarRef" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="[
		isScrolled
			? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/20 dark:border-neutral-700/20 shadow-lg'
			: 'bg-transparent'
	]" role="navigation" aria-label="Main navigation">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16 lg:h-20">

				<!-- Logo/Brand -->
				<div class="flex-shrink-0">
					<UButton @click="scrollToSection('hero')" variant="ghost" size="lg"
						class="font-bold text-xl bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
						aria-label="Go to top of page">
						BleckWolf25
					</UButton>
				</div>

				<!-- Desktop Navigation -->
				<div class="hidden lg:block">
					<div class="flex items-center space-x-1">
						<UButton v-for="section in navigationSections" :key="section.id" @click="scrollToSection(section.id)"
							variant="ghost" size="sm"
							class="relative px-4 py-2 rounded-lg transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20"
							:class="[
								activeSection === section.id
									? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
									: 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
							]" :aria-label="`Navigate to ${section.label} section`"
							:aria-current="activeSection === section.id ? 'page' : undefined">
							{{ section.label }}

							<!-- Active indicator -->
							<span v-if="activeSection === section.id"
								class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"
								aria-hidden="true"></span>
						</UButton>
					</div>
				</div>

				<!-- Theme Toggle & Mobile Menu Button -->
				<div class="flex items-center space-x-2">
					<!-- Theme Toggle -->
					<ThemeToggle />

					<!-- Mobile Menu Button -->
					<UButton @click="toggleMobileMenu" variant="ghost" size="md" class="lg:hidden p-2"
						:aria-label="isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
						:aria-expanded="isMobileMenuOpen" aria-controls="mobile-menu">
						<Icon :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'"
							class="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
					</UButton>
				</div>
			</div>
		</div>

		<!-- Mobile Navigation Menu -->
		<Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
			enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
			leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
			<div v-if="isMobileMenuOpen" id="mobile-menu"
				class="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/20 dark:border-neutral-700/20 shadow-lg"
				role="menu" aria-orientation="vertical">
				<div class="px-4 py-3 space-y-1">
					<UButton v-for="section in navigationSections" :key="`mobile-${section.id}`"
						@click="scrollToSection(section.id, true)" variant="ghost" size="md"
						class="w-full justify-start px-4 py-3 rounded-lg transition-all duration-200" :class="[
							activeSection === section.id
								? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
								: 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
						]" :aria-label="`Navigate to ${section.label} section`"
						:aria-current="activeSection === section.id ? 'page' : undefined" role="menuitem">
						{{ section.label }}
					</UButton>
				</div>
			</div>
		</Transition>
	</nav>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { fadeInOnScroll } from '../animations'
import ThemeToggle from '../specific/ThemeToggle.vue'

// ------------ TYPES
interface NavigationSection {
	id: string
	label: string
}

// ------------ REACTIVE STATE
const navbarRef = ref<HTMLElement | null>(null)
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')

// ------------ NAVIGATION SECTIONS
const navigationSections: NavigationSection[] = [
	{ id: 'hero', label: 'Home' },
	{ id: 'about', label: 'About' },
	{ id: 'what-i-develop', label: 'What I Develop' },
	{ id: 'technologies', label: 'Technologies' },
	{ id: 'projects', label: 'Projects' },
	{ id: 'testimonials', label: 'Testimonials' },
	{ id: 'work-timeline', label: 'Work Timeline' },
	{ id: 'soft-skills', label: 'Soft Skills' },
	{ id: 'hobbies', label: 'Hobbies' },
	{ id: 'contact', label: 'Contact' }
]

// ------------ SCROLL HANDLING
let scrollTimeout: NodeJS.Timeout | null = null

function handleScroll() {
	// Throttle scroll events for performance
	if (scrollTimeout) return

	scrollTimeout = setTimeout(() => {
		// Update navbar background based on scroll position
		isScrolled.value = window.scrollY > 20

		// Update active section based on scroll position
		updateActiveSection()

		scrollTimeout = null
	}, 10)
}

// ------------ ACTIVE SECTION TRACKING
function updateActiveSection() {
	const sections = navigationSections.map(section => {
		const element = document.getElementById(section.id)
		if (!element) return null

		const rect = element.getBoundingClientRect()
		const offset = 100 // Offset for navbar height

		return {
			id: section.id,
			top: rect.top,
			bottom: rect.bottom,
			inView: rect.top <= offset && rect.bottom > offset
		}
	}).filter(Boolean)

	// Find the section that's currently in view
	const currentSection = sections.find(section => section?.inView)

	if (currentSection) {
		activeSection.value = currentSection.id
	} else {
		// If no section is in view, find the closest one
		const closestSection = sections.reduce((closest, section) => {
			if (!section || !closest) return section || closest

			const sectionDistance = Math.abs(section.top)
			const closestDistance = Math.abs(closest.top)

			return sectionDistance < closestDistance ? section : closest
		}, null)

		if (closestSection) {
			activeSection.value = closestSection.id
		}
	}
}

// ------------ NAVIGATION METHODS
function scrollToSection(sectionId: string, closeMobileMenu = false) {
	const element = document.getElementById(sectionId)

	if (element) {
		const navbarHeight = 80 // Approximate navbar height
		const elementPosition = element.offsetTop - navbarHeight

		window.scrollTo({
			top: elementPosition,
			behavior: 'smooth'
		})

		// Update active section immediately for better UX
		activeSection.value = sectionId

		// Close mobile menu if requested
		if (closeMobileMenu) {
			isMobileMenuOpen.value = false
		}

		// Announce navigation for screen readers
		const section = navigationSections.find(s => s.id === sectionId)
		if (section) {
			// Create a temporary announcement element
			const announcement = document.createElement('div')
			announcement.setAttribute('aria-live', 'polite')
			announcement.setAttribute('aria-atomic', 'true')
			announcement.className = 'sr-only'
			announcement.textContent = `Navigated to ${section.label} section`
			document.body.appendChild(announcement)

			// Remove after announcement
			setTimeout(() => {
				document.body.removeChild(announcement)
			}, 1000)
		}
	}
}

function toggleMobileMenu() {
	isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// ------------ KEYBOARD NAVIGATION
function handleKeydown(event: KeyboardEvent) {
	// Close mobile menu on Escape
	if (event.key === 'Escape' && isMobileMenuOpen.value) {
		isMobileMenuOpen.value = false
	}
}

// ------------ LIFECYCLE
let fadeInCleanup: (() => void) | null = null

onMounted(() => {
	// Add scroll listener
	window.addEventListener('scroll', handleScroll, { passive: true })

	// Add keyboard listener
	document.addEventListener('keydown', handleKeydown)

	// Initialize scroll state
	handleScroll()

	// Initialize fade-in animation
	if (navbarRef.value) {
		const fadeInControl = fadeInOnScroll(navbarRef.value, {
			duration: 600,
			direction: 'down',
			distance: 20,
			threshold: 0,
			rootMargin: '0px'
		}) as { cleanup: () => void }
		fadeInCleanup = fadeInControl.cleanup
	}
})

onBeforeUnmount(() => {
	// Clean up event listeners
	window.removeEventListener('scroll', handleScroll)
	document.removeEventListener('keydown', handleKeydown)

	// Clean up scroll timeout
	if (scrollTimeout) {
		clearTimeout(scrollTimeout)
	}

	// Clean up fade-in animation
	if (fadeInCleanup) {
		fadeInCleanup()
	}
})
</script>
