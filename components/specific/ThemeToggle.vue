<!--
	- @file: THEME TOGGLE.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This component represents a button with various styles and states.
		- It supports different variants, sizes, and states (e.g., disabled).
		- The button can emit a click event to the parent component.
-->

<!-- Template Section -->
<template>
	<ClientOnly>
		<UButton @click="toggleTheme" :aria-label="`Switch to ${nextMode} mode`" color="primary" variant="soft" size="md"
			class="relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400"
			:class="{
				'bg-gray-300 dark:bg-neutral-700': !isDark,
				'bg-primary-500 text-white': isDark
			}" circular>
			<span
				class="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 absolute left-1 top-1"
				:class="{
					'translate-x-0': !isDark,
					'translate-x-6': isDark
				}" />
			<Icon :name="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'"
				class="absolute top-0.5 left-0.5 w-5 h-5 text-yellow-400 dark:text-yellow-300" />
		</UButton>

		<!-- Fallback during SSR -->
		<template #fallback>
			<div class="w-12 h-6 rounded-full bg-gray-200 animate-pulse"></div>
		</template>
	</ClientOnly>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { onMounted, nextTick, computed, ref } from 'vue'

// ------------ NUXT COLOR MODE USAGE
const colorMode = useColorMode()
const isHydrated = ref(false)

// ------------ COMPUTED PROPERTIES
const isDark = computed(() => isHydrated.value && colorMode.value === 'dark')
const nextMode = computed(() => (isDark.value ? 'light' : 'dark'))

// ------------ METHODS
function toggleTheme() {
	colorMode.preference = isDark.value ? 'light' : 'dark'
}

// ------------ ENSURE PROPER HYDRATION
// Wait for client-side hydration to complete before using the theme
onMounted(() => {
	// Use nextTick to ensure DOM is fully updated
	nextTick(() => {
		// Mark component as hydrated to enable reactive updates
		isHydrated.value = true
	})
})
</script>
