<!--
    - @file: Button.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
		- UI re-usable Button component with accessibility, theme support, and modern patterns

    @props:
    - variant: String - Visual style variant: 'primary', 'secondary', 'outline', 'danger', 'ghost' (default: 'primary')
    - size: String - Button size: 'sm', 'md', 'lg', 'xl' (default: 'md')
    - loading: Boolean - Show loading spinner and disable interaction (default: false)
    - disabled: Boolean - Disable the button (default: false)
    - fullWidth: Boolean - Make button full width (default: false)
    - rounded: String - Border radius variant: 'none', 'sm', 'md', 'lg', 'full' (default: 'full')
    - type: String - HTML button type (default: 'button')

    @slots:
    - default: Button content
    - icon: Optional icon slot (displayed before text)
    - iconRight: Optional icon slot (displayed after text)

    @events:
    - click: Emitted when button is clicked (only when not disabled/loading)

    @usage:
    <Button variant="primary" size="md" :loading="isLoading" @click="handleSubmit">
      Submit Form
    </Button>
-->
<template>
	<button :class="buttonClasses" :disabled="isDisabled" :type="type" :aria-label="ariaLabel"
		:aria-describedby="ariaDescribedBy" :aria-disabled="isDisabled ? 'true' : undefined"
		:aria-busy="loading ? 'true' : undefined" :tabindex="isDisabled ? -1 : undefined" v-bind="$attrs"
		@click="handleClick">

		<!-- Loading Spinner -->
		<span v-if="loading" class="btn-spinner" aria-hidden="true" />

		<!-- Left Icon Slot -->
		<span v-if="$slots.icon && !loading" class="btn-icon btn-icon--left">
			<slot name="icon" />
		</span>

		<!-- Button Content -->
		<span v-if="!loading || $slots.default" class="btn-content">
			<slot />
		</span>

		<!-- Right Icon Slot -->
		<span v-if="$slots.iconRight && !loading" class="btn-icon btn-icon--right">
			<slot name="iconRight" />
		</span>

	</button>
</template>

<script setup>
import { useSlots } from 'vue'

// ------------ PROPS
const props = defineProps({
	/**
	 * Visual style variant of the button
	 * @values 'primary', 'secondary', 'outline', 'danger', 'ghost'
	 */
	variant: {
		type: String,
		default: 'primary',
		validator: (value) => [
			'primary', 'secondary', 'outline', 'danger', 'ghost'
		].includes(value)
	},

	/**
	 * Size of the button
	 * @values 'sm', 'md', 'lg', 'xl'
	 */
	size: {
		type: String,
		default: 'md',
		validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
	},

	/**
	 * Show loading spinner and disable interaction
	 */
	loading: {
		type: Boolean,
		default: false
	},

	/**
	 * Disable the button
	 */
	disabled: {
		type: Boolean,
		default: false
	},

	/**
	 * Make button full width
	 */
	fullWidth: {
		type: Boolean,
		default: false
	},

	/**
	 * Border radius variant
	 * @values 'none', 'sm', 'md', 'lg', 'full'
	 */
	rounded: {
		type: String,
		default: 'full',
		validator: (value) => ['none', 'sm', 'md', 'lg', 'full'].includes(value)
	},

	/**
	 * HTML button type attribute
	 */
	type: {
		type: String,
		default: 'button',
		validator: (value) => ['button', 'submit', 'reset'].includes(value)
	},

	/**
	 * Accessibility label (for screen readers)
	 */
	ariaLabel: {
		type: String,
		default: undefined
	},

	/**
	 * ID of element that describes this button
	 */
	ariaDescribedBy: {
		type: String,
		default: undefined
	}
})

// ------------ EMITS
const emit = defineEmits(['click'])

// ------------ SLOTS
const slots = useSlots()

// ------------ COMPUTED
/**
 * Check if button should be disabled
 */
const isDisabled = computed(() => props.disabled || props.loading)

/**
 * Dynamic CSS classes based on props
 */
const buttonClasses = computed(() => ({
	'btn': true,
	[`btn--${props.variant}`]: true,
	[`btn--${props.size}`]: true,
	[`btn--rounded-${props.rounded}`]: true,
	'btn--loading': props.loading,
	'btn--disabled': props.disabled,
	'btn--full-width': props.fullWidth,
	'btn--has-icon-left': !!slots.icon,
	'btn--has-icon-right': !!slots.iconRight
}))

// ------------ METHODS
/**
 * Handle button click events
 * @param {Event} event - Click event
 */
const handleClick = (event) => {
	if (!isDisabled.value) {
		emit('click', event)
	}
}

// ------------ ATTRIBUTES INHERITANCE
defineOptions({
	inheritAttrs: false
})
</script>

<style scoped>
/* --------------------------------------------------------------------------
   BASE BUTTON STYLES
   -------------------------------------------------------------------------- */
.btn {
	/* Layout */
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	position: relative;

	/* Typography */
	font-family: inherit;
	font-weight: 600;
	line-height: 1.5;
	text-align: center;
	text-decoration: none;
	white-space: nowrap;

	/* Interaction */
	cursor: pointer;
	user-select: none;
	border: 1px solid transparent;

	/* Transitions */
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

	/* Accessibility */
	outline: none;
}

.btn:focus-visible {
	outline: 2px solid var(--secondary-color);
	outline-offset: 2px;
}

/* --------------------------------------------------------------------------
   BUTTON VARIANTS
   -------------------------------------------------------------------------- */

/* Primary Button */
.btn--primary {
	background-color: var(--secondary-color);
	color: var(--background);
	border-color: var(--secondary-color);
}

.btn--primary:hover:not(:disabled) {
	background-color: var(--primary-color);
	border-color: var(--primary-color);
	color: var(--background);
	/* Ensure readable text on hover */
	transform: translateY(-1px);
	box-shadow: 0 4px 8px rgba(37, 99, 235, 0.3);
}

.btn--primary:active:not(:disabled) {
	transform: translateY(0);
	box-shadow: 0 2px 4px rgba(37, 99, 235, 0.3);
}

/* Secondary Button */
.btn--secondary {
	background-color: var(--light-color);
	color: var(--text-primary);
	border-color: var(--light-color);
}

.btn--secondary:hover:not(:disabled) {
	background-color: var(--primary-color);
	color: var(--background);
	border-color: var(--primary-color);
	transform: translateY(-1px);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn--secondary:active:not(:disabled) {
	transform: translateY(0);
}

/* Outline Button */
.btn--outline {
	background-color: transparent;
	color: var(--secondary-color);
	border-color: var(--secondary-color);
}

.btn--outline:hover:not(:disabled) {
	background-color: var(--secondary-color);
	color: var(--background);
	transform: translateY(-1px);
	box-shadow: 0 4px 8px rgba(37, 99, 235, 0.2);
}

.btn--outline:active:not(:disabled) {
	transform: translateY(0);
}

/* Danger Button */
.btn--danger {
	background-color: var(--danger-color);
	color: var(--background);
	border-color: var(--danger-color);
}

.btn--danger:hover:not(:disabled) {
	background-color: #dc2626;
	border-color: #dc2626;
	transform: translateY(-1px);
	box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
}

.btn--danger:active:not(:disabled) {
	transform: translateY(0);
}

/* Ghost Button */
.btn--ghost {
	background-color: transparent;
	color: var(--text-primary);
	border-color: transparent;
}

.btn--ghost:hover:not(:disabled) {
	background-color: var(--light-color);
	color: var(--text-primary);
}

.btn--ghost:active:not(:disabled) {
	background-color: var(--primary-color);
	color: var(--background);
}

/* --------------------------------------------------------------------------
   BUTTON SIZES
   -------------------------------------------------------------------------- */
.btn--sm {
	padding: 0.5rem 1rem;
	font-size: 0.875rem;
	min-height: 2rem;
}

.btn--md {
	padding: 0.75rem 1.5rem;
	font-size: 1rem;
	min-height: 2.5rem;
}

.btn--lg {
	padding: 1rem 2rem;
	font-size: 1.125rem;
	min-height: 3rem;
}

.btn--xl {
	padding: 1.25rem 2.5rem;
	font-size: 1.25rem;
	min-height: 3.5rem;
}

/* --------------------------------------------------------------------------
   BORDER RADIUS VARIANTS
   -------------------------------------------------------------------------- */
.btn--rounded-none {
	border-radius: 0;
}

.btn--rounded-sm {
	border-radius: 0.25rem;
}

.btn--rounded-md {
	border-radius: 0.5rem;
}

.btn--rounded-lg {
	border-radius: 0.75rem;
}

.btn--rounded-full {
	border-radius: 9999px;
}

/* --------------------------------------------------------------------------
   BUTTON STATES
   -------------------------------------------------------------------------- */

/* Full Width */
.btn--full-width {
	width: 100%;
}

/* Disabled State */
.btn--disabled,
.btn:disabled {
	opacity: 0.6;
	cursor: not-allowed;
	transform: none !important;
	box-shadow: none !important;
}

/* Loading State */
.btn--loading {
	cursor: wait;
	pointer-events: none;
}

/* --------------------------------------------------------------------------
   BUTTON CONTENT & ICONS
   -------------------------------------------------------------------------- */
.btn-content {
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.btn-icon {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}

.btn-icon--left {
	margin-left: -0.25rem;
}

.btn-icon--right {
	margin-right: -0.25rem;
}

/* Icon size adjustments based on button size */
.btn--sm .btn-icon {
	width: 1rem;
	height: 1rem;
}

.btn--md .btn-icon {
	width: 1.25rem;
	height: 1.25rem;
}

.btn--lg .btn-icon {
	width: 1.5rem;
	height: 1.5rem;
}

.btn--xl .btn-icon {
	width: 1.75rem;
	height: 1.75rem;
}

/* --------------------------------------------------------------------------
   LOADING SPINNER
   -------------------------------------------------------------------------- */
.btn-spinner {
	display: inline-block;
	width: 1em;
	height: 1em;
	border: 2px solid currentColor;
	border-right-color: transparent;
	border-radius: 50%;
	animation: btn-spin 0.75s linear infinite;
}

@keyframes btn-spin {
	to {
		transform: rotate(360deg);
	}
}

/* Spinner size adjustments */
.btn--sm .btn-spinner {
	width: 0.875em;
	height: 0.875em;
	border-width: 1.5px;
}

.btn--lg .btn-spinner,
.btn--xl .btn-spinner {
	width: 1.125em;
	height: 1.125em;
	border-width: 2.5px;
}

/* --------------------------------------------------------------------------
   DARK THEME ADJUSTMENTS
   -------------------------------------------------------------------------- */
:global(.dark) .btn--secondary {
	background-color: var(--dark-color);
	color: var(--text-primary);
	border-color: var(--dark-color);
}

:global(.dark) .btn--primary:hover:not(:disabled) {
	color: var(--background);
	/* Ensure readable text on hover in dark mode */
}

:global(.dark) .btn--ghost:hover:not(:disabled) {
	background-color: var(--dark-color);
}

/* --------------------------------------------------------------------------
   RESPONSIVE DESIGN
   -------------------------------------------------------------------------- */
@media (max-width: 768px) {
	.btn--lg {
		padding: 0.875rem 1.75rem;
		font-size: 1rem;
	}

	.btn--xl {
		padding: 1rem 2rem;
		font-size: 1.125rem;
	}
}

/* --------------------------------------------------------------------------
   ACCESSIBILITY IMPROVEMENTS
   -------------------------------------------------------------------------- */

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
	.btn {
		transition: color 0.2s ease, background-color 0.2s ease;
	}

	.btn:hover:not(:disabled) {
		transform: none;
	}

	.btn-spinner {
		animation: none;
	}
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.btn {
		border-width: 2px;
	}

	.btn:focus-visible {
		outline-width: 3px;
	}
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
	.btn {
		min-height: 44px;
		/* Minimum touch target size */
	}

	.btn--sm {
		min-height: 40px;
		padding: 0.625rem 1.25rem;
	}
}
</style>
