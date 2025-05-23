<!-- app.vue -->
<template>
	<div :class="{ dark: isDarkMode }" class="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
		<NuxtLayout>
			<Navbar />
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<script setup>
// ------------ IMPORTS
import { useState } from '#app'
import Navbar from '~/components/Navbar.vue'

// ------------ DARK MODE
const isDarkMode = useState('darkMode', () => false)

// ------------ TOGGLE DARK MODE
function toggleDarkMode() {
	isDarkMode.value = !isDarkMode.value
	document.documentElement.classList.toggle('dark', isDarkMode.value)
}
</script>
