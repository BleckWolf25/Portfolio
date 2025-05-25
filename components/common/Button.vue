<!--
	- @file: BUTTON.VUE
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
	<UButton ref="buttonRef" :color="props.variant" :variant="'solid'" :size="props.size" :disabled="disabled || loading"
		:aria-label="ariaLabel || undefined" :aria-describedby="ariaDescribedby || undefined"
		:aria-pressed="ariaPressed === 'mixed' ? 'mixed' : ariaPressed === true ? 'true' : ariaPressed === false ? 'false' : undefined"
		:type="type" :aria-busy="loading ? 'true' : undefined" :aria-disabled="disabled || loading ? 'true' : undefined"
		:class="[
			props.fullWidth ? 'w-full' : '',
			props.rounded ? 'rounded-lg' : 'rounded'
		]" @keydown="handleKeydown" @click="handleClick">
		<span v-if="loading" class="sr-only" aria-live="polite" aria-atomic="true">Loading</span>
		<slot />
	</UButton>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { ref, onMounted, onBeforeUnmount, inject, nextTick } from 'vue'
import { buttonHoverEffect } from '../animations'

// ------------ TYPES
const props = defineProps({
	variant: {
		type: String as PropType<'primary' | 'secondary' | 'neutral'>,
		default: 'primary'
	},
	size: {
		type: String as PropType<'sm' | 'md' | 'lg'>,
		default: 'md'
	},
	rounded: {
		type: Boolean,
		default: true
	},
	fullWidth: {
		type: Boolean,
		default: false
	},
	disabled: {
		type: Boolean,
		default: false
	},
	loading: {
		type: Boolean,
		default: false
	},
	type: {
		type: String as PropType<'button' | 'submit' | 'reset'>,
		default: 'button'
	},
	ariaLabel: {
		type: String,
		default: ''
	},
	ariaDescribedby: {
		type: String,
		default: ''
	},
	ariaPressed: {
		type: [Boolean, String] as PropType<boolean | 'mixed' | undefined | null>,
		default: undefined,
		validator: (value: any) => value === true || value === false || value === 'mixed' || value === undefined || value === null
	},
	announceOnClick: {
		type: String,
		default: ''
	}
})

// ------------ EMITS
const emit = defineEmits<{
	(e: 'click', event: MouseEvent): void
}>()

// ------------ GLOBAL ANNOUNCER (screen reader live region)
const announce = inject<(msg: string) => void>('announce', () => { })

function handleClick(event: MouseEvent) {
	if (!props.disabled && !props.loading) {
		emit('click', event)
		if (props.announceOnClick && announce) {
			announce(props.announceOnClick)
		}
	}
}

function handleKeydown(event: KeyboardEvent) {
	// Optionally, allow Enter or Space to trigger click
	if ((event.key === 'Enter' || event.key === ' ') && !(props.disabled || props.loading)) {
		event.preventDefault()
		emit('click', event as any)
		if (props.announceOnClick && announce) {
			announce(props.announceOnClick)
		}
	}
	// Optionally, allow Escape to blur/cancel
	if (event.key === 'Escape') {
		(buttonRef.value as HTMLElement)?.blur()
	}
}

// ------------ COMPONENT REFS
const buttonRef = ref<any>(null)

onMounted(() => {
	// Wait for next tick to ensure the component is fully rendered
	nextTick(() => {
		// UButton component exposes its DOM element through $el
		const buttonElement = buttonRef.value?.$el || buttonRef.value
		if (buttonElement && buttonElement.nodeType === Node.ELEMENT_NODE) {
			buttonHoverEffect(buttonElement)
		}
	})
})

onBeforeUnmount(() => {
	const buttonElement = buttonRef.value?.$el || buttonRef.value
	if (buttonElement && (buttonElement as any)._buttonHoverCleanup) {
		(buttonElement as any)._buttonHoverCleanup()
	}
})
</script>
