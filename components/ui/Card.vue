<!--
    - @file: Card.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
		- Card UI component with theme support, accessibility, and flexibility

    @props:
    - hover: Boolean - Enable/disable hover effects (default: true)
    - variant: String - Card style variant: 'default', 'outlined', 'elevated' (default: 'default')
    - padding: String - Custom padding for content area (default: '1.5rem')
    - clickable: Boolean - Make entire card clickable (default: false)

    @slots:
    - image: Optional image/media content at the top
    - default: Main card content
    - footer: Optional footer content

    @events:
    - click: Emitted when card is clicked (only when clickable=true)
-->
<template>

	<div :class="cardClasses" :role="clickable ? 'button' : undefined" :tabindex="clickable ? '0' : undefined"
		:aria-disabled="clickable ? 'false' : 'true'" @click="handleClick" @keydown.enter="handleClick"
		@keydown.space.prevent="handleClick" @focus="onFocus" @blur="onBlur">

		<!-- Image/Media Section -->
		<div v-if="$slots.image" class="card-image">
			<slot name="image" />
		</div>

		<!-- Main Content -->
		<div class="card-content" :style="{ padding }">
			<slot />
		</div>

		<!-- Footer Section -->
		<div v-if="$slots.footer" class="card-footer">
			<slot name="footer" />
		</div>
	</div>

</template>

<script setup>
// ------------ PROPS
const props = defineProps({
	/**
	 * Enable hover effects (shadow and transform)
	 */
	hover: {
		type: Boolean,
		default: true,
		validator: (value) => typeof value === 'boolean'
	},

	/**
	 * Visual variant of the card
	 * @values 'default', 'outlined', 'elevated'
	 */
	variant: {
		type: String,
		default: 'default',
		validator: (value) => ['default', 'outlined', 'elevated'].includes(value)
	},

	/**
	 * Custom padding for the content area
	 */
	padding: {
		type: String,
		default: '1.5rem'
	},

	/**
	 * Make the entire card clickable
	 */
	clickable: {
		type: Boolean,
		default: false
	}
})

// ------------ EMITS
const emit = defineEmits(['click'])

// ------------ COMPUTED
/**
 * Dynamic CSS classes based on props
 */
const cardClasses = computed(() => ({
	'card-root': true,
	'card-root--hoverable': props.hover,
	'card-root--clickable': props.clickable,
	[`card-root--${props.variant}`]: true
}))

// ------------ METHODS
/**
 * Handle card click events
 * @param {Event} event - Click or keyboard event
 */
const handleClick = (event) => {
	if (props.clickable) {
		emit('click', event)
	}
}

// ------------ STATE
const isFocused = ref(false)
function onFocus() { isFocused.value = true }
function onBlur() { isFocused.value = false }
</script>

<style scoped>
/* --------------------------------------------------------------------------
   BASE CARD STYLES
   -------------------------------------------------------------------------- */
.card-root {
	/* Layout */
	display: flex;
	flex-direction: column;
	height: 100%;
	border-radius: 0.75rem;
	/* Slightly larger for modern look */
	overflow: hidden;

	/* Theme-aware background */
	background-color: var(--background);
	border: 1px solid transparent;

	/* Smooth transitions */
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

	/* Accessibility */
	outline: none;
	position: relative;
}

/* --------------------------------------------------------------------------
   CARD VARIANTS
   -------------------------------------------------------------------------- */

/* Default variant - subtle shadow */
.card-root--default {
	box-shadow:
		0 1px 3px rgba(0, 0, 0, 0.1),
		0 1px 2px rgba(0, 0, 0, 0.06);
}

/* Outlined variant - border instead of shadow */
.card-root--outlined {
	border-color: var(--light-color);
	box-shadow: none;
}

/* Elevated variant - stronger shadow */
.card-root--elevated {
	box-shadow:
		0 4px 6px rgba(0, 0, 0, 0.1),
		0 2px 4px rgba(0, 0, 0, 0.06);
}

/* Dark theme adjustments */
:global(.dark) .card-root--outlined {
	border-color: var(--dark-color);
}

/* --------------------------------------------------------------------------
   INTERACTIVE STATES
   -------------------------------------------------------------------------- */

/* Hover effects */
.card-root--hoverable:hover {
	transform: translateY(-2px);
}

.card-root--default.card-root--hoverable:hover {
	box-shadow:
		0 10px 15px rgba(0, 0, 0, 0.1),
		0 4px 6px rgba(0, 0, 0, 0.05);
}

.card-root--outlined.card-root--hoverable:hover {
	border-color: var(--secondary-color);
	box-shadow:
		0 4px 6px rgba(0, 0, 0, 0.05),
		0 2px 4px rgba(0, 0, 0, 0.03);
}

.card-root--elevated.card-root--hoverable:hover {
	box-shadow:
		0 20px 25px rgba(0, 0, 0, 0.15),
		0 10px 10px rgba(0, 0, 0, 0.04);
}

/* Clickable states */
.card-root--clickable {
	cursor: pointer;
}

.card-root--clickable:focus-visible {
	outline: 2px solid var(--secondary-color);
	outline-offset: 2px;
}

.card-root--clickable:focus,
.card-root--clickable[data-focus-visible-added] {
	outline: 2px solid var(--secondary-color);
	outline-offset: 2px;
}

.card-root--clickable:active {
	transform: translateY(0);
}

/* --------------------------------------------------------------------------
   CARD SECTIONS
   -------------------------------------------------------------------------- */

/* Image section */
.card-image {
	width: 100%;
	overflow: hidden;
	background-color: var(--light-color);
}

.card-image :deep(img) {
	width: 100%;
	height: auto;
	display: block;
	transition: transform 0.3s ease;
}

.card-root--hoverable:hover .card-image :deep(img) {
	transform: scale(1.02);
}

/* Content section */
.card-content {
	flex: 1;
	color: var(--text-primary);
	background-color: transparent;

	/* Typography improvements */
	line-height: 1.6;
}

/* Footer section */
.card-footer {
	padding: 1rem 1.5rem;
	background-color: var(--light-color);
	color: var(--text-secondary);
	border-top: 1px solid rgba(0, 0, 0, 0.05);

	/* Subtle typography adjustments */
	font-size: 0.875rem;
	line-height: 1.5;
}

/* Dark theme footer adjustments */
:global(.dark) .card-footer {
	border-top-color: rgba(255, 255, 255, 0.1);
}

/* --------------------------------------------------------------------------
   RESPONSIVE DESIGN
   -------------------------------------------------------------------------- */
@media (max-width: 768px) {
	.card-content {
		padding: 1rem !important;
	}

	.card-footer {
		padding: 0.75rem 1rem;
	}
}

/* --------------------------------------------------------------------------
   ACCESSIBILITY IMPROVEMENTS
   -------------------------------------------------------------------------- */

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.card-root {
		transition: box-shadow 0.2s ease;
	}

	.card-root--hoverable:hover {
		transform: none;
	}

	.card-image :deep(img) {
		transition: none;
	}
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.card-root--outlined {
		border-width: 2px;
	}

	.card-root--clickable:focus-visible {
		outline-width: 3px;
	}
}
</style>
