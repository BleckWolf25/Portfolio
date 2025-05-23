<!--
    - @file: Navbar.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
    - Navigation bar with theme switcher and navigation links.
-->
<template>
	<nav class="navbar flex items-center justify-between px-6 py-4 shadow-md fixed w-full z-50 top-0 left-0"
		:style="{ backgroundColor: 'var(--background)' }">
		<div class="flex items-center space-x-4">
			<a href="#" class="font-bold text-xl" style="color: var(--secondary-color);">BleckWolf25 Portfolio</a>
			<a href="#" class="nav-link" style="color: var(--text-primary);">Home</a>
			<a href="#about" class="nav-link" style="color: var(--text-primary);">About</a>
			<a href="#projects" class="nav-link" style="color: var(--text-primary);">Projects</a>
			<a href="#contact" class="nav-link" style="color: var(--text-primary);">Contact</a>
		</div>
		<button @click="toggleTheme"
			class="theme-switcher flex items-center px-3 py-2 rounded focus:outline-none transition-colors"
			:aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`" :style="{ backgroundColor: 'var(--light-color)' }">
			<span v-if="isDark">
				<svg class="w-6 h-6" :style="{ color: 'var(--warning-color)' }" fill="currentColor" viewBox="0 0 20 20">
					<path
						d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.41 1.41l-.71.7a1 1 0 01-1.41-1.41l.71-.7zM18 9a1 1 0 100 2h-1a1 1 0 100-2h1zm-2.03 4.22a1 1 0 011.41 1.41l-.7.71a1 1 0 01-1.41-1.41l.7-.71zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-2.03a1 1 0 00-1.41 1.41l.71.7a1 1 0 001.41-1.41l-.71-.7zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm2.03-4.22a1 1 0 00-1.41-1.41l-.7.71a1 1 0 001.41 1.41l.7-.71z" />
				</svg>
			</span>
			<span v-else>
				<svg class="w-6 h-6" :style="{ color: 'var(--text-primary)' }" fill="currentColor" viewBox="0 0 20 20">
					<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
				</svg>
			</span>
		</button>
	</nav>
</template>

<script setup>
// ------------ IMPORTS
import { ref, onMounted } from 'vue'

// ------------ COMPOSABLES
const isDark = ref(false)

// ------------ METHODS
function setTheme(dark) {
	isDark.value = dark
	document.documentElement.classList.toggle('dark', dark)
	localStorage.setItem('theme', dark ? 'dark' : 'light')
}

// ------------ EVENTS
function toggleTheme() {
	setTheme(!isDark.value)
}

// ------------ LIFECYCLE
onMounted(() => {
	const saved = localStorage.getItem('theme')
	setTheme(saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches))
})
</script>

<style scoped>
.nav-link {
	padding-left: 0.75rem;
	padding-right: 0.75rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	border-radius: 0.375rem;
	transition: color 0.2s;
}

.nav-link:hover {
	color: var(--primary-color);
}

.theme-switcher {
	transition: background-color 0.2s;
}

.theme-switcher:hover {
	background-color: var(--secondary-color);
}
</style>
