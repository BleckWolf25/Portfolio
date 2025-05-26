<!--
	- @file: SECTION TITLE.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This component represents a section title with a heading and optional description.
		- It supports different sizes and can be styled with various classes.
		- The section title can emit events to the parent component.
-->

<!-- Template Section -->
<template>
	<UCard class="mb-8 bg-neutral-50 dark:bg-neutral-800 border-0 shadow-none text-center">
		<h2 class="text-3xl font-bold text-neutral-800 dark:text-neutral-100">
			<slot />
		</h2>
		<div class="mt-2 w-20 h-1 mx-auto bg-primary-500 rounded"></div>
	</UCard>
</template>

<script setup lang="ts">
/*
 * @example Usage:
 * <SectionTitle>My Section</SectionTitle>
 */
</script>
