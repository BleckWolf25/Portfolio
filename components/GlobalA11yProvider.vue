<!--
	- @file: GLOBAL A11Y PROVIDER.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This component provides a global screen reader announcer.
		- It allows any component to announce messages to screen readers.
		- The announcer uses a polite live region to ensure messages are read.
-->

<!-- Template Section -->
<template>
	<div>
		<slot />
		<div id="global-sr-announcer" ref="liveRegion" class="sr-only" aria-live="polite" aria-atomic="true"
			style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0);">{{ message }}
		</div>
	</div>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { ref, provide } from 'vue'

// ------------ LIVELY REGION
const message = ref('')
const liveRegion = ref<HTMLElement | null>(null)

// ------------ ANNOUNCE FUNCTION
function announce(msg: string) {
	message.value = ''
	// Clear then set to ensure screen readers re-announce
	setTimeout(() => {
		message.value = msg
	}, 50)
}

// ------------ PROVIDE ANNOUNCE FUNCTION
provide('announce', announce)
</script>
