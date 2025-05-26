<!--
	- @file: CARD.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This component represents a card layout with an optional image, title, content, and footer.
		- It supports various styles such as rounded corners, hover effects, and shadows.
		- The card can be used to display information in a visually appealing way.
-->

<!-- Template Section -->
<template>
	<UCard ref="cardRef" :class="[cardClasses]">

		<!-- Optional image slot/prop -->
		<template v-if="image">
			<div class="mb-4 overflow-hidden rounded-t-lg">
				<img :src="image" :alt="imageAlt" class="w-full h-auto object-cover" :width="imageWidth"
					:height="imageHeight" />
			</div>
		</template>

		<!-- Header slot or title prop -->
		<header class="mb-3">
			<slot name="header">
				<h3 v-if="title" class="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
					{{ title }}
				</h3>
			</slot>
		</header>

		<!-- Default slot for content -->
		<div class="mb-4 text-neutral-700 dark:text-neutral-300">
			<slot />
		</div>

		<!-- Footer slot for actions -->
		<footer v-if="$slots.footer" class="mt-auto">
			<slot name="footer" />
		</footer>
	</UCard>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { ref, onMounted, onBeforeUnmount, computed, defineProps } from 'vue'
import { cardLiftEffect } from '../animations'

// ------------ TYPES
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	image: {
		type: String,
		default: '' // path or URL
	},
	imageAlt: {
		type: String,
		default: 'Card image'
	},
	imageWidth: {
		type: [String, Number],
		default: 800
	},
	imageHeight: {
		type: [String, Number],
		default: 450
	},
	rounded: {
		type: Boolean,
		default: true
	},
	hoverLift: {
		type: Boolean,
		default: true
	},
	shadow: {
		type: Boolean,
		default: true
	}
})

// ------------ CARD CLASSES
const cardClasses = computed(() => {
	const classes = [
		'flex flex-col bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-left',
		'transition-shadow transition-transform duration-200',
	]

	// Add classes based on props
	if (props.rounded) {
		classes.push('rounded-lg')
	} else {
		classes.push('rounded')
	}

	if (props.shadow) {
		classes.push('shadow-sm dark:shadow-none')
	}

	if (props.hoverLift) {
		classes.push('hover:shadow-md hover:-translate-y-1')
	}

	return classes.join(' ')
})

const cardRef = ref<HTMLElement | null>(null)

onMounted(() => {
	if (cardRef.value && props.hoverLift) {
		cardLiftEffect(cardRef.value)
	}
})

onBeforeUnmount(() => {
	if (cardRef.value && (cardRef.value as any)._cardLiftCleanup) {
		(cardRef.value as any)._cardLiftCleanup()
	}
})
</script>
