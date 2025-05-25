<!--
	- @file: BACK AT TOP.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This component provides a "Back to Top" button that appears when the user scrolls down the page.
		- It allows users to quickly return to the top of the page with a smooth scroll effect.
-->

<!-- Template Section -->
<template>
	<transition name="fade">
		<UButton v-show="visible" @click="scrollToTop" aria-label="Back to top" color="primary" variant="solid"
			class="fixed bottom-6 right-6 p-3 rounded-full shadow-lg text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-opacity duration-300"
			size="lg" circular>
			<template #icon>
				<Icon name="mdi:chevron-up" size="24" />
			</template>
		</UButton>
	</transition>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { ref, onMounted, onBeforeUnmount } from 'vue'

// ------------ CONSTANTS
const visible = ref(false)
const threshold = 300

// ------------ METHODS
function onScroll() {
	visible.value = window.scrollY > threshold
}

function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ------------ LIFECYCLE HOOKS
onMounted(() => {
	window.addEventListener('scroll', onScroll)
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', onScroll)
})
</script>

<!-- Style Section -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
