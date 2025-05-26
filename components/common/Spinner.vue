<!--
	- @file: SPINNER.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This component represents a spinner loading indicator.
		- It supports different sizes and can be styled with various classes.
		- The spinner can emit events to the parent component.
-->

<!-- Template Section -->
<template>
	<div class="flex items-center justify-center spinner" role="status" aria-live="polite">
		<USpinner size="lg" color="primary" class="text-primary-500" />
		<div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
		<span class="sr-only">Loading...</span>
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.spinner {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
}
</style>
