<!--
	- @file: TOOLTIP.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This component represents a tooltip with a message and optional arrow.
		- It supports different positions and can be styled with various classes.
		- The tooltip can emit events to the parent component.
-->

<!-- Template Section -->
<template>
	<UPopover :popper="{ placement: position }" :open="isShown" @open="isShown = true" @close="isShown = false">
		<template #activator>
			<span class="relative group inline-block" tabindex="0" @mouseenter="isShown = true" @mouseleave="isShown = false"
				@focusin="isShown = true" @focusout="isShown = false">
				<slot />
			</span>
		</template>
		<div
			class="px-2 py-1 text-sm text-neutral-50 bg-neutral-800 rounded shadow-lg whitespace-nowrap transition-opacity duration-200"
			role="tooltip" :aria-hidden="!isShown">
			{{ text }}
		</div>
	</UPopover>
</template>

<!-- Script Section -->
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
	text: {
		type: String,
		required: true
	},
	position: {
		type: String,
		default: 'top',
		validator: (value: string) => ['top', 'bottom', 'left', 'right'].includes(value)
	}
})

const isShown = ref(false)
</script>

<!-- Style Section -->
<style scoped>
/* ===================================== */
/* TOOLTIP ANIMATION STYLES              */
/* ===================================== */

.group-hover\:block {
	display: none;
}

.group:hover .group-hover\:block {
	display: block;
}
</style>
