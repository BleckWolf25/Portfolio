<!--
    - @file: Badge.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
    - UI re-usable Badge component with accessibility, theme support, and modern patterns

    @props:
    - variant: String - Visual style variant: 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark' (default: 'primary')
    - size: String - Badge size: 'xs', 'sm', 'md', 'lg', 'xl' (default: 'md')
    - pill: Boolean - Make badge pill-shaped (fully rounded) (default: false)
    - outlined: Boolean - Use outlined style instead of filled (default: false)
    - bg: String - Custom background color (overrides variant) (default: undefined)
    - color: String - Custom text color (default: undefined)
    - ariaLabel: String - Accessibility label for screen readers (default: undefined)
    - clickable: Boolean - Make badge clickable with hover effects (default: false)

    @slots:
    - default: Badge content

    @events:
    - (none)

    @usage:
    <Badge variant="primary" size="md" pill>Primary Badge</Badge>
    <Badge variant="success" outlined>Success Outlined</Badge>
    <Badge :bg="customColor" :color="textColor">Custom Badge</Badge>
-->
<template>
	<span :class="badgeClasses" :style="customStyles" :role="clickable ? 'button' : 'status'"
		:tabindex="clickable ? 0 : -1" :aria-label="ariaLabel" :aria-disabled="clickable ? 'false' : 'true'"
		@keydown.enter="onKeydown" @keydown.space.prevent="onKeydown" @click="onClick" @focus="onFocus" @blur="onBlur">
		<slot />
	</span>
</template>

<script setup lang="ts">
// ------------ IMPORTS
import { computed, ref, type ComputedRef } from 'vue'

// ------------ TYPES
interface BadgeProps {

	/** Badge color variant */
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

	/** Badge size */
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

	/** Make badge pill-shaped (fully rounded) */
	pill?: boolean

	/** Use outlined style instead of filled */
	outlined?: boolean

	/** Custom background color (overrides variant) */
	bg?: string

	/** Custom text color */
	color?: string

	/** Accessibility label for screen readers */
	ariaLabel?: string

	/** Make badge clickable with hover effects */
	clickable?: boolean
}

// ------------ PROPS
const props = withDefaults(defineProps<BadgeProps>(), {
	variant: 'primary',
	size: 'md',
	pill: false,
	outlined: false,
	bg: undefined,
	color: undefined,
	ariaLabel: undefined,
	clickable: false
})

// ------------ COMPUTED PROPERTIES
/**
 * Computed badge classes based on props
 */
const badgeClasses: ComputedRef<string[]> = computed(() => {
	const classes = ['badge']

	// Add variant class
	if (props.variant) {
		classes.push(`badge--${props.variant}`)
	}

	// Add size class
	classes.push(`badge--${props.size}`)

	// Add modifier classes
	if (props.pill) classes.push('badge--pill')
	if (props.outlined) classes.push('badge--outlined')
	if (props.clickable) classes.push('badge--clickable')

	return classes
})

/**
 * Custom inline styles for bg and color overrides
 */
const customStyles: ComputedRef<Record<string, string>> = computed(() => {
	const styles: Record<string, string> = {}

	if (props.bg) {
		styles.backgroundColor = props.bg
		// If custom bg is provided and it's outlined, use bg as border color
		if (props.outlined) {
			styles.borderColor = props.bg
		}
	}

	if (props.color) {
		styles.color = props.color
	}

	return styles
})

// Emit click event if clickable (for accessibility)
const emit = defineEmits(['click'])

function onClick(event: MouseEvent) {
	if (props.clickable) {
		emit('click', event)
	}
}

function onKeydown(event: KeyboardEvent) {
	if (props.clickable) {
		emit('click', event)
	}
}

const isFocused = ref(false)

function onFocus() {
	isFocused.value = true
}
function onBlur() {
	isFocused.value = false
}
</script>

<style scoped>
/* --------------------------------------------------------------------------
   BASE BADGE STYLES
   -------------------------------------------------------------------------- */
.badge {
	/* Layout */
	display: inline-flex;
	align-items: center;
	justify-content: center;

	/* Typography */
	font-weight: 600;
	line-height: 1;
	text-align: center;
	white-space: nowrap;
	vertical-align: baseline;

	/* Appearance */
	border-radius: 0.375rem;
	/* 6px */
	border: 1px solid transparent;

	/* Transitions */
	transition: all 0.15s ease-in-out;

	/* Theme-aware defaults */
	color: rgb(55 65 81);
	/* gray-700 */
	background-color: rgb(229 231 235);
	/* gray-200 */
}

/* Dark mode defaults */
.dark .badge {
	color: rgb(209 213 219);
	/* gray-300 */
	background-color: rgb(75 85 99);
	/* gray-600 */
}

/* --------------------------------------------------------------------------
   BADGE VARIANT SIZES
   -------------------------------------------------------------------------- */
.badge--xs {
	padding: 0.125rem 0.375rem;
	/* 2px 6px */
	font-size: 0.6875rem;
	/* 11px */
	line-height: 1.25;
}

.badge--sm {
	padding: 0.25rem 0.5rem;
	/* 4px 8px */
	font-size: 0.75rem;
	/* 12px */
	line-height: 1.25;
}

.badge--md {
	padding: 0.375rem 0.75rem;
	/* 6px 12px */
	font-size: 0.875rem;
	/* 14px */
	line-height: 1.25;
}

.badge--lg {
	padding: 0.5rem 1rem;
	/* 8px 16px */
	font-size: 1rem;
	/* 16px */
	line-height: 1.5;
}

.badge--xl {
	padding: 0.625rem 1.25rem;
	/* 10px 20px */
	font-size: 1.125rem;
	/* 18px */
	line-height: 1.5;
}

/* --------------------------------------------------------------------------
   PILL MODIFIER
   -------------------------------------------------------------------------- */
.badge--pill {
	border-radius: 9999px;
}

/* --------------------------------------------------------------------------
   CLICKABLE BADGE MODIFIERS
   -------------------------------------------------------------------------- */
.badge--clickable {
	cursor: pointer;
	user-select: none;
}

.badge--clickable:hover {
	transform: translateY(-1px);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
}

.badge--clickable:active {
	transform: translateY(0);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}

/* --------------------------------------------------------------------------
   BADGE VARIANT STYLES
   -------------------------------------------------------------------------- */
/* Primary */
.badge--primary {
	color: white;
	background-color: rgb(59 130 246);
	/* blue-500 */
}

.dark .badge--primary {
	background-color: rgb(37 99 235);
	/* blue-600 */
}

/* Secondary */
.badge--secondary {
	color: white;
	background-color: rgb(107 114 128);
	/* gray-500 */
}

.dark .badge--secondary {
	background-color: rgb(75 85 99);
	/* gray-600 */
}

/* Success */
.badge--success {
	color: white;
	background-color: rgb(34 197 94);
	/* green-500 */
}

.dark .badge--success {
	background-color: rgb(22 163 74);
	/* green-600 */
}

/* Danger */
.badge--danger {
	color: white;
	background-color: rgb(239 68 68);
	/* red-500 */
}

.dark .badge--danger {
	background-color: rgb(220 38 38);
	/* red-600 */
}

/* Warning */
.badge--warning {
	color: rgb(146 64 14);
	/* amber-800 */
	background-color: rgb(251 191 36);
	/* amber-400 */
}

.dark .badge--warning {
	color: rgb(120 53 15);
	/* amber-900 */
	background-color: rgb(245 158 11);
	/* amber-500 */
}

/* Info */
.badge--info {
	color: white;
	background-color: rgb(14 165 233);
	/* sky-500 */
}

.dark .badge--info {
	background-color: rgb(2 132 199);
	/* sky-600 */
}

/* Light */
.badge--light {
	color: rgb(55 65 81);
	/* gray-700 */
	background-color: rgb(249 250 251);
	/* gray-50 */
	border-color: rgb(229 231 235);
	/* gray-200 */
}

.dark .badge--light {
	color: rgb(31 41 55);
	/* gray-800 */
	background-color: rgb(243 244 246);
	/* gray-100 */
	border-color: rgb(209 213 219);
	/* gray-300 */
}

/* Dark */
.badge--dark {
	color: white;
	background-color: rgb(31 41 55);
	/* gray-800 */
}

.dark .badge--dark {
	background-color: rgb(17 24 39);
	/* gray-900 */
}

/* --------------------------------------------------------------------------
   OUTLINED BADGE STYLES
   -------------------------------------------------------------------------- */
.badge--outlined {
	background-color: transparent;
	border-width: 1px;
	border-style: solid;
}

/* Outlined Primary */
.badge--outlined.badge--primary {
	color: rgb(59 130 246);
	/* blue-500 */
	border-color: rgb(59 130 246);
}

.dark .badge--outlined.badge--primary {
	color: rgb(96 165 250);
	/* blue-400 */
	border-color: rgb(96 165 250);
}

/* Outlined Secondary */
.badge--outlined.badge--secondary {
	color: rgb(107 114 128);
	/* gray-500 */
	border-color: rgb(107 114 128);
}

.dark .badge--outlined.badge--secondary {
	color: rgb(156 163 175);
	/* gray-400 */
	border-color: rgb(156 163 175);
}

/* Outlined Success */
.badge--outlined.badge--success {
	color: rgb(34 197 94);
	/* green-500 */
	border-color: rgb(34 197 94);
}

.dark .badge--outlined.badge--success {
	color: rgb(74 222 128);
	/* green-400 */
	border-color: rgb(74 222 128);
}

/* Outlined Danger */
.badge--outlined.badge--danger {
	color: rgb(239 68 68);
	/* red-500 */
	border-color: rgb(239 68 68);
}

.dark .badge--outlined.badge--danger {
	color: rgb(248 113 113);
	/* red-400 */
	border-color: rgb(248 113 113);
}

/* Outlined Warning */
.badge--outlined.badge--warning {
	color: rgb(245 158 11);
	/* amber-500 */
	border-color: rgb(245 158 11);
}

.dark .badge--outlined.badge--warning {
	color: rgb(251 191 36);
	/* amber-400 */
	border-color: rgb(251 191 36);
}

/* Outlined Info */
.badge--outlined.badge--info {
	color: rgb(14 165 233);
	/* sky-500 */
	border-color: rgb(14 165 233);
}

.dark .badge--outlined.badge--info {
	color: rgb(56 189 248);
	/* sky-400 */
	border-color: rgb(56 189 248);
}

/* Outlined Light */
.badge--outlined.badge--light {
	color: rgb(107 114 128);
	/* gray-500 */
	border-color: rgb(229 231 235);
	/* gray-200 */
}

.dark .badge--outlined.badge--light {
	color: rgb(156 163 175);
	/* gray-400 */
	border-color: rgb(75 85 99);
	/* gray-600 */
}

/* Outlined Dark */
.badge--outlined.badge--dark {
	color: rgb(31 41 55);
	/* gray-800 */
	border-color: rgb(31 41 55);
}

.dark .badge--outlined.badge--dark {
	color: rgb(209 213 219);
	/* gray-300 */
	border-color: rgb(209 213 219);
}

/* --------------------------------------------------------------------------
   HOVER EFFECTS FOR CLICKABLE BADGES
   -------------------------------------------------------------------------- */
.badge--clickable:hover {
	opacity: 0.9;
}

.badge--clickable.badge--outlined:hover {
	opacity: 1;
}

.badge--clickable.badge--outlined.badge--primary:hover {
	background-color: rgb(59 130 246);
	color: white;
}

.dark .badge--clickable.badge--outlined.badge--primary:hover {
	background-color: rgb(96 165 250);
	color: rgb(17 24 39);
}

.badge--clickable.badge--outlined.badge--success:hover {
	background-color: rgb(34 197 94);
	color: white;
}

.dark .badge--clickable.badge--outlined.badge--success:hover {
	background-color: rgb(74 222 128);
	color: rgb(17 24 39);
}

.badge--clickable.badge--outlined.badge--danger:hover {
	background-color: rgb(239 68 68);
	color: white;
}

.dark .badge--clickable.badge--outlined.badge--danger:hover {
	background-color: rgb(248 113 113);
	color: rgb(17 24 39);
}

.badge--clickable.badge--outlined.badge--warning:hover {
	background-color: rgb(245 158 11);
	color: white;
}

.badge--clickable.badge--outlined.badge--info:hover {
	background-color: rgb(14 165 233);
	color: white;
}

.badge--clickable.badge--outlined.badge--secondary:hover {
	background-color: rgb(107 114 128);
	color: white;
}

.badge--clickable.badge--outlined.badge--light:hover {
	background-color: rgb(249 250 251);
	color: rgb(55 65 81);
}

.badge--clickable.badge--outlined.badge--dark:hover {
	background-color: rgb(31 41 55);
	color: white;
}

/* --------------------------------------------------------------------------
   ACCESSIBILITY STYLES
   -------------------------------------------------------------------------- */
.badge--clickable:focus,
.badge--clickable[data-focus-visible-added] {
	outline: 2px solid rgb(59 130 246);
	outline-offset: 2px;
}

.dark .badge--clickable:focus,
.dark .badge--clickable[data-focus-visible-added] {
	outline-color: rgb(96 165 250);
}
</style>
