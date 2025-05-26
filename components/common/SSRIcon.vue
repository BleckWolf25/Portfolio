<!--
	- @file: SSRIcon.vue
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- SSR-safe icon component that prevents hydration mismatches
		- Wraps NuxtIcon with ClientOnly to ensure consistent rendering
		- Provides fallback placeholder during server-side rendering
-->

<!-- Template Section -->
<template>
	<ClientOnly>
		<Icon :name="name" :class="iconClass" :size="size" />
		<template #fallback>
			<div :class="[
				'animate-pulse rounded',
				fallbackClass,
				sizeClass
			]" :aria-hidden="true"></div>
		</template>
	</ClientOnly>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ TYPES
interface SSRIconProps {
	/** Icon name (e.g., 'mdi:heart', 'mdi:github') */
	name: string

	/** Custom CSS classes for the icon */
	class?: string

	/** Icon size (number or string) */
	size?: string | number

	/** Custom fallback placeholder classes */
	fallbackClass?: string
}

// ------------ PROPS
const props = withDefaults(defineProps<SSRIconProps>(), {
	class: '',
	size: undefined,
	fallbackClass: 'bg-current/20'
})

// ------------ COMPUTED
const iconClass = computed(() => props.class)

const sizeClass = computed(() => {
	if (props.size) {
		if (typeof props.size === 'number') {
			return `w-${props.size} h-${props.size}`
		}
		return props.size
	}

	// Extract size from class if present
	const classStr = props.class || ''
	const sizeMatch = classStr.match(/w-(\d+)\s+h-(\d+)/)
	if (sizeMatch) {
		return `w-${sizeMatch[1]} h-${sizeMatch[2]}`
	}

	// Default size
	return 'w-6 h-6'
})
</script>

<!-- Style Section -->
<style scoped>
/* Ensure consistent sizing for fallback */
.animate-pulse {
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

	0%,
	100% {
		opacity: 1;
	}

	50% {
		opacity: 0.5;
	}
}
</style>
