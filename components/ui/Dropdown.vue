<!--
    - @file: Dropdown.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description: Accessible dropdown component with theme support and keyboard navigation

    @props:
    - trigger: String - Text for the trigger button (default: 'Options')
    - position: String - Dropdown position: 'bottom-left', 'bottom-right', 'top-left', 'top-right' (default: 'bottom-left')
    - disabled: Boolean - Disable the dropdown (default: false)
    - closeOnSelect: Boolean - Close dropdown when item is selected (default: true)
    - maxHeight: String - Maximum height of dropdown content (default: '300px')
    - width: String - Width of dropdown: 'auto', 'trigger', 'full' (default: 'auto')

    @slots:
    - trigger: Custom trigger element (overrides trigger prop)
    - default: Dropdown content/items

    @events:
    - open: Emitted when dropdown opens
    - close: Emitted when dropdown closes
    - select: Emitted when an item is selected (if using DropdownItem)
-->
<template>
	<div class="dropdown-root" ref="dropdownRef">

		<!-- Trigger Element -->
		<div ref="triggerRef" :class="triggerClasses" :aria-expanded="isOpen" :aria-haspopup="'menu'"
			:aria-controls="dropdownId" :aria-disabled="props.disabled ? 'true' : 'false'" :disabled="disabled" role="button"
			:tabindex="props.disabled ? -1 : 0" @click="toggleDropdown" @keydown.enter.prevent="toggleDropdown"
			@keydown.space.prevent="toggleDropdown" @keydown.down.prevent="openAndFocusFirst"
			@keydown.up.prevent="openAndFocusLast" @focus="onFocus" @blur="onBlur">
			<slot name="trigger">
				<span class="dropdown-trigger-text">{{ trigger }}</span>
				<svg :class="iconClasses" width="16" height="16" viewBox="0 0 16 16" fill="none"
					xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
						stroke-linejoin="round" />
				</svg>
			</slot>
		</div>

		<!-- Dropdown Content -->
		<Transition name="dropdown">
			<div v-if="isOpen" :id="dropdownId" ref="contentRef" :class="contentClasses" :style="contentStyles" role="menu"
				:aria-labelledby="triggerId" @keydown.escape="closeDropdown" @keydown.tab="handleTabNavigation">
				<div class="dropdown-content-inner">
					<slot />
				</div>
			</div>
		</Transition>

	</div>
</template>

<script setup>
// ------------ IMPORTS
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// ------------ PROPS
const props = defineProps({
	/**
	 * Text for the default trigger button
	 */
	trigger: {
		type: String,
		default: 'Options'
	},

	/**
	 * Position of the dropdown relative to trigger
	 * @values 'bottom-left', 'bottom-right', 'top-left', 'top-right'
	 */
	position: {
		type: String,
		default: 'bottom-left',
		validator: (value) => [
			'bottom-left', 'bottom-right',
			'top-left', 'top-right'
		].includes(value)
	},

	/**
	 * Disable the dropdown
	 */
	disabled: {
		type: Boolean,
		default: false
	},

	/**
	 * Close dropdown when an item is selected
	 */
	closeOnSelect: {
		type: Boolean,
		default: true
	},

	/**
	 * Maximum height of dropdown content
	 */
	maxHeight: {
		type: String,
		default: '300px'
	},

	/**
	 * Width behavior of dropdown
	 * @values 'auto', 'trigger', 'full'
	 */
	width: {
		type: String,
		default: 'auto',
		validator: (value) => ['auto', 'trigger', 'full'].includes(value)
	}
})

// ------------ EMITS
const emit = defineEmits(['open', 'close', 'select'])

// ------------ REACTIVE STATE
const isOpen = ref(false)
const dropdownRef = ref(null)
const triggerRef = ref(null)
const contentRef = ref(null)
const isFocused = ref(false)

// ------------ COMPUTED
/**
 * Generate unique IDs for accessibility
 */
const dropdownId = computed(() => `dropdown-${Math.random().toString(36).substr(2, 9)}`)
const triggerId = computed(() => `trigger-${dropdownId.value}`)

/**
 * Dynamic CSS classes for trigger
 */
const triggerClasses = computed(() => ({
	'dropdown-trigger': true,
	'dropdown-trigger--open': isOpen.value,
	'dropdown-trigger--disabled': props.disabled
}))

/**
 * Dynamic CSS classes for dropdown content
 */
const contentClasses = computed(() => ({
	'dropdown-content': true,
	[`dropdown-content--${props.position}`]: true
}))

/**
 * Dynamic CSS classes for chevron icon
 */
const iconClasses = computed(() => ({
	'dropdown-icon': true,
	'dropdown-icon--open': isOpen.value
}))

/**
 * Dynamic styles for dropdown content
 */
const contentStyles = computed(() => {
	const styles = {
		maxHeight: props.maxHeight
	}

	if (props.width === 'trigger' && triggerRef.value) {
		styles.width = `${triggerRef.value.offsetWidth}px`
	} else if (props.width === 'full') {
		styles.width = '100%'
	}

	return styles
})

// ------------ METHODS
/**
 * Toggle dropdown open/close state
 */
const toggleDropdown = () => {
	if (props.disabled) return

	if (isOpen.value) {
		closeDropdown()
	} else {
		openDropdown()
	}
}

/**
 * Open the dropdown
 */
const openDropdown = () => {
	if (props.disabled) return

	isOpen.value = true
	emit('open')
}

/**
 * Close the dropdown
 */
const closeDropdown = () => {
	isOpen.value = false
	emit('close')

	// Return focus to trigger
	nextTick(() => {
		triggerRef.value?.focus()
	})
}

/**
 * Open dropdown and focus first focusable element
 */
const openAndFocusFirst = () => {
	openDropdown()
	nextTick(() => {
		focusFirstItem()
	})
}

/**
 * Open dropdown and focus last focusable element
 */
const openAndFocusLast = () => {
	openDropdown()
	nextTick(() => {
		focusLastItem()
	})
}

/**
 * Focus the first focusable item in dropdown
 */
const focusFirstItem = () => {
	const focusableElements = getFocusableElements()
	if (focusableElements.length > 0) {
		focusableElements[0].focus()
	}
}

/**
 * Focus the last focusable item in dropdown
 */
const focusLastItem = () => {
	const focusableElements = getFocusableElements()
	if (focusableElements.length > 0) {
		focusableElements[focusableElements.length - 1].focus()
	}
}

/**
 * Get all focusable elements within dropdown content
 */
const getFocusableElements = () => {
	if (!contentRef.value) return []

	const focusableSelectors = [
		'button:not([disabled])',
		'[href]',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'[tabindex]:not([tabindex="-1"])'
	].join(', ')

	return Array.from(contentRef.value.querySelectorAll(focusableSelectors))
}

/**
 * Handle tab navigation within dropdown
 */
const handleTabNavigation = (event) => {
	const focusableElements = getFocusableElements()
	if (focusableElements.length === 0) return

	const firstElement = focusableElements[0]
	const lastElement = focusableElements[focusableElements.length - 1]

	if (event.shiftKey && document.activeElement === firstElement) {
		event.preventDefault()
		lastElement.focus()
	} else if (!event.shiftKey && document.activeElement === lastElement) {
		event.preventDefault()
		firstElement.focus()
	}
}

/**
 * Handle click outside to close dropdown
 */
const handleClickOutside = (event) => {
	if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
		closeDropdown()
	}
}

/**
 * Handle item selection
 */
const handleItemSelect = (value) => {
	emit('select', value)

	if (props.closeOnSelect) {
		closeDropdown()
	}
}

/**
 * Handle focus state
 */
function onFocus() {
	isFocused.value = true
}

function onBlur() {
	isFocused.value = false
}

// ------------ LIFECYCLE
onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})

// ------------ PROVIDE/INJECT
// Provide context for child DropdownItem components
provide('dropdown', {
	closeOnSelect: props.closeOnSelect,
	onItemSelect: handleItemSelect
})
</script>

<style scoped>
/* --------------------------------------------------------------------------
   DROPDOWN ROOT
   -------------------------------------------------------------------------- */
.dropdown-root {
	position: relative;
	display: inline-block;
}

/* --------------------------------------------------------------------------
   TRIGGER STYLES
   -------------------------------------------------------------------------- */
.dropdown-trigger {
	/* Layout */
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;
	padding: 0.75rem 1rem;
	min-width: 120px;

	/* Appearance */
	background-color: var(--background);
	border: 1px solid var(--light-color);
	border-radius: 0.5rem;
	color: var(--text-primary);
	font-size: 0.875rem;
	font-weight: 500;
	cursor: pointer;

	/* Transitions */
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

	/* Accessibility */
	outline: none;
}

.dropdown-trigger:hover:not(.dropdown-trigger--disabled) {
	border-color: var(--secondary-color);
	box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.dropdown-trigger:focus-visible {
	border-color: var(--secondary-color);
	box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.dropdown-trigger:focus,
.dropdown-trigger[data-focus-visible-added] {
	border-color: var(--secondary-color);
	box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.dropdown-trigger--open {
	border-color: var(--secondary-color);
	box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.dropdown-trigger--disabled {
	opacity: 0.5;
	cursor: not-allowed;
	color: var(--text-secondary);
}

/* --------------------------------------------------------------------------
   TRIGGER TEXT & ICON
   -------------------------------------------------------------------------- */
.dropdown-trigger-text {
	flex: 1;
	text-align: left;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.dropdown-icon {
	flex-shrink: 0;
	transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	color: var(--text-secondary);
}

.dropdown-icon--open {
	transform: rotate(180deg);
}

/* --------------------------------------------------------------------------
   DROPDOWN CONTENT
   -------------------------------------------------------------------------- */
.dropdown-content {
	/* Position */
	position: absolute;
	z-index: 1000;

	/* Appearance */
	background-color: var(--background);
	border: 1px solid var(--light-color);
	border-radius: 0.75rem;
	box-shadow:
		0 10px 15px rgba(0, 0, 0, 0.1),
		0 4px 6px rgba(0, 0, 0, 0.05);

	/* Layout */
	min-width: 160px;
	overflow: hidden;

	/* Accessibility */
	outline: none;
}

/* Dark theme adjustments */
:global(.dark) .dropdown-content {
	border-color: var(--dark-color);
	box-shadow:
		0 10px 15px rgba(0, 0, 0, 0.3),
		0 4px 6px rgba(0, 0, 0, 0.2);
}

/* --------------------------------------------------------------------------
   DROPDOWN POSITIONING
   -------------------------------------------------------------------------- */
.dropdown-content--bottom-left {
	top: calc(100% + 4px);
	left: 0;
}

.dropdown-content--bottom-right {
	top: calc(100% + 4px);
	right: 0;
}

.dropdown-content--top-left {
	bottom: calc(100% + 4px);
	left: 0;
}

.dropdown-content--top-right {
	bottom: calc(100% + 4px);
	right: 0;
}

/* --------------------------------------------------------------------------
   DROPDOWN CONTENT INNER
   -------------------------------------------------------------------------- */
.dropdown-content-inner {
	padding: 0.5rem;
	max-height: inherit;
	overflow-y: auto;

	/* Custom scrollbar */
	scrollbar-width: thin;
	scrollbar-color: var(--light-color) transparent;
}

.dropdown-content-inner::-webkit-scrollbar {
	width: 6px;
}

.dropdown-content-inner::-webkit-scrollbar-track {
	background: transparent;
}

.dropdown-content-inner::-webkit-scrollbar-thumb {
	background-color: var(--light-color);
	border-radius: 3px;
}

.dropdown-content-inner::-webkit-scrollbar-thumb:hover {
	background-color: var(--text-secondary);
}

/* --------------------------------------------------------------------------
   TRANSITIONS
   -------------------------------------------------------------------------- */
.dropdown-enter-active,
.dropdown-leave-active {
	transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from {
	opacity: 0;
	transform: translateY(-8px) scale(0.95);
}

.dropdown-leave-to {
	opacity: 0;
	transform: translateY(-8px) scale(0.95);
}

/* --------------------------------------------------------------------------
   RESPONSIVE DESIGN
   -------------------------------------------------------------------------- */
@media (max-width: 768px) {
	.dropdown-content {
		min-width: 200px;
		max-width: calc(100vw - 2rem);
	}

	.dropdown-content--bottom-right,
	.dropdown-content--top-right {
		right: auto;
		left: 0;
	}
}

/* --------------------------------------------------------------------------
   ACCESSIBILITY
   -------------------------------------------------------------------------- */

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {

	.dropdown-trigger,
	.dropdown-icon,
	.dropdown-enter-active,
	.dropdown-leave-active {
		transition: none;
	}

	.dropdown-enter-from,
	.dropdown-leave-to {
		transform: none;
	}
}

/* High contrast mode support */
@media (prefers-contrast: high) {
	.dropdown-trigger {
		border-width: 2px;
	}

	.dropdown-content {
		border-width: 2px;
	}
}
</style>
