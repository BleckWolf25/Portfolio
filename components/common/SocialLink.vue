<!--
	- @file: SOCIAL LINK.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This component represents a social media link with an icon and label.
		- It supports different sizes and can be styled with various classes.
		- The social link can emit events to the parent component.
-->

<!-- Template Section -->
<template>
	<a :href="href" class="inline-flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
		:class="[
			'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-primary-100 dark:hover:bg-primary-800 hover:text-primary-600 dark:hover:text-primary-300',
			customClass
		]" target="_blank" rel="noopener noreferrer" :aria-label="label">
		<slot />
	</a>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ TYPES
defineProps({
	href: String,
	label: String,
	customClass: {
		type: String,
		default: ''
	}
})
</script>
