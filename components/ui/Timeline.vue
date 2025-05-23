<!--
    - @file: Timeline.vue
    - @author: BleckWolf25
    - @license: MIT

		- @description:
		- Timeline component with accessibility, theme support, and flexible layouts

    @props:
    - items: Array - Timeline items with required structure: { date, title, description, ...custom }
    - layout: String - Timeline layout: 'center', 'left', 'right' (default: 'center')
    - dotColor: String - Custom dot color (optional, defaults to theme)
    - lineColor: String - Custom line color (optional, defaults to theme)
    - dotSize: String - Dot size variant: 'sm', 'md', 'lg' (default: 'md')
    - spacing: String - Spacing between items: 'sm', 'md', 'lg' (default: 'md')
    - animated: Boolean - Enable scroll animations (default: true)

    @slots:
    - default: Custom content for each timeline item (receives { item, index })
    - dot: Custom dot content (receives { item, index })
    - date: Custom date formatting (receives { item, index })

    @events:
    - itemClick: Emitted when a timeline item is clicked

    @usage:
    <Timeline
      :items="timelineData"
      layout="center"
      :animated="true"
      @item-click="handleItemClick"
    >
      <template #default="{ item, index }">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </template>
    </Timeline>
-->
<template>
	<div :class="timelineClasses" role="list" :aria-label="ariaLabel || 'Timeline'">
		<div v-for="(item, index) in validatedItems" :key="getItemKey(item, index)" :class="getItemClasses(index)"
			:style="getItemStyles(index)" role="listitem" :tabindex="clickable ? '0' : '-1'"
			:aria-disabled="clickable ? 'false' : 'true'"
			:aria-current="index === validatedItems.length - 1 ? 'step' : undefined" @click="handleItemClick(item, index)"
			@keydown.enter="handleItemClick(item, index)" @keydown.space.prevent="handleItemClick(item, index)"
			@focus="onFocus" @blur="onBlur">

			<!-- Timeline Content -->
			<div :class="getContentClasses(index)">
				<!-- Main Content -->
				<div class="timeline-body">
					<slot :item="item" :index="index">
						<h3 v-if="item.title" class="timeline-title">
							{{ item.title }}
						</h3>
						<p v-if="item.description" class="timeline-description">
							{{ item.description }}
						</p>
					</slot>
				</div>
			</div>

			<!-- Timeline Line -->
			<div v-if="index < validatedItems.length - 1" :class="getLineClasses(index)" :style="getLineStyles(item)"
				:aria-hidden="true" />
		</div>
	</div>
</template>

<script setup>
// ------------ PROPS
const props = defineProps({
	/**
	 * Array of timeline items
	 * Each item should have: { date, title?, description?, ...custom }
	 */
	items: {
		type: Array,
		required: true,
		validator: (items) => {
			return Array.isArray(items) && items.every(item =>
				item && typeof item === 'object' && 'date' in item
			)
		}
	},

	/**
	 * Timeline layout variant
	 * @values 'center', 'left', 'right'
	 */
	layout: {
		type: String,
		default: 'center',
		validator: (value) => ['center', 'left', 'right'].includes(value)
	},

	/**
	 * Custom dot color (CSS color value)
	 */
	dotColor: {
		type: String,
		default: undefined
	},

	/**
	 * Custom line color (CSS color value)
	 */
	lineColor: {
		type: String,
		default: undefined
	},

	/**
	 * Dot size variant
	 * @values 'sm', 'md', 'lg'
	 */
	dotSize: {
		type: String,
		default: 'md',
		validator: (value) => ['sm', 'md', 'lg'].includes(value)
	},

	/**
	 * Spacing between timeline items
	 * @values 'sm', 'md', 'lg'
	 */
	spacing: {
		type: String,
		default: 'md',
		validator: (value) => ['sm', 'md', 'lg'].includes(value)
	},

	/**
	 * Enable scroll-based animations
	 */
	animated: {
		type: Boolean,
		default: true
	},

	/**
	 * Accessibility label for the timeline
	 */
	ariaLabel: {
		type: String,
		default: undefined
	}
})

// ------------ EMITS
const emit = defineEmits(['itemClick'])

// ------------ REACTIVE STATE
const observedElements = ref(new Set())
const isFocused = ref(false)

// ------------ COMPUTED
/**
 * Validate and ensure items have required structure
 */
const validatedItems = computed(() => {
	return props.items.filter(item => item && typeof item.date !== 'undefined')
})

/**
 * Check if timeline items are clickable
 */
const clickable = computed(() => {
	return emit.itemClick !== undefined
})

/**
 * Dynamic CSS classes for timeline root
 */
const timelineClasses = computed(() => ({
	'timeline': true,
	[`timeline--${props.layout}`]: true,
	[`timeline--spacing-${props.spacing}`]: true,
	'timeline--animated': props.animated
}))

// ------------ METHODS
/**
 * Get unique key for timeline item
 */
const getItemKey = (item, index) => {
	return item.id || item.date || index
}

/**
 * Get CSS classes for timeline item
 */
const getItemClasses = (index) => ({
	'timeline-item': true,
	'timeline-item--right': props.layout === 'center' && index % 2 !== 0,
	'timeline-item--clickable': clickable.value,
	'timeline-item--animated': props.animated
})

/**
 * Get CSS classes for timeline content
 */
const getContentClasses = (index) => ({
	'timeline-content': true,
	'timeline-content--right': props.layout === 'center' && index % 2 !== 0
})

/**
 * Get CSS classes for timeline dot
 */
const getDotClasses = (index) => ({
	'timeline-dot': true,
	[`timeline-dot--${props.dotSize}`]: true,
	'timeline-dot--right': props.layout === 'center' && index % 2 !== 0
})

/**
 * Get CSS classes for timeline line
 */
const getLineClasses = (index) => ({
	'timeline-line': true,
	'timeline-line--right': props.layout === 'center' && index % 2 !== 0
})

/**
 * Get inline styles for timeline item
 */
const getItemStyles = (index) => {
	const styles = {}

	if (props.animated) {
		styles['--animation-delay'] = `${index * 0.1}s`
	}

	return styles
}

/**
 * Get inline styles for timeline dot
 */
const getDotStyles = (item) => {
	const styles = {}

	if (props.dotColor) {
		styles.backgroundColor = props.dotColor
	}

	return styles
}

/**
 * Get inline styles for timeline line
 */
const getLineStyles = (item) => {
	const styles = {}

	if (props.lineColor) {
		styles.backgroundColor = props.lineColor
	}

	return styles
}

/**
 * Format date for display
 */
const formatDate = (date) => {
	if (!date) return ''

	// If it's already a formatted string, return as-is
	if (typeof date === 'string' && !date.match(/^\d{4}-\d{2}-\d{2}/)) {
		return date
	}

	// Try to parse and format as date
	try {
		const parsedDate = new Date(date)
		if (isNaN(parsedDate.getTime())) return date

		// Format date to 'MMM DD, YYYY'
		return parsedDate.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	} catch {
		return String(date)
	}
}

/**
 * Handle timeline item click
 */
const handleItemClick = (item, index) => {
	if (clickable.value) {
		emit('itemClick', { item, index })
	}
}

/**
 * Set up intersection observer for animations
 */
const setupIntersectionObserver = () => {
	if (!props.animated || typeof window === 'undefined') return

	// Create a new intersection observer
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('timeline-item--visible')
					observedElements.value.add(entry.target)
				}
			})
		},
		{
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		}
	)

	// Observe timeline items
	nextTick(() => {
		const items = document.querySelectorAll('.timeline-item--animated')
		items.forEach(item => observer.observe(item))
	})

	return observer
}

/**
 * Handle focus event
 */
function onFocus() {
	isFocused.value = true
}

/**
 * Handle blur event
 */
function onBlur() {
	isFocused.value = false
}

// ------------ LIFECYCLE
let intersectionObserver = null

// Set up intersection observer on mount
onMounted(() => {
	if (props.animated) {
		intersectionObserver = setupIntersectionObserver()
	}
})

// Clean up intersection observer on unmount
onUnmounted(() => {
	if (intersectionObserver) {
		intersectionObserver.disconnect()
	}
})

// ------------ WATCHERS
watch(() => props.items, () => {
	if (props.animated && intersectionObserver) {
		intersectionObserver.disconnect()
		observedElements.value.clear()
		nextTick(() => {
			intersectionObserver = setupIntersectionObserver()
		})
	}
}, { deep: true })
</script>

<style scoped>
/* --------------------------------------------------------------------------
   TIMELINE ROOT
   -------------------------------------------------------------------------- */
.timeline {
	position: relative;
	width: 100%;
	max-width: 100%;
}

/* --------------------------------------------------------------------------
   TIMELINE LAYOUTS
   -------------------------------------------------------------------------- */

/* Center Layout */
.timeline--center {
	padding: 2rem 0;
}

.timeline--center::before {
	content: '';
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 2px;
	height: 100%;
	background-color: var(--line-color, var(--light-color));
	z-index: 1;
}

/* Left Layout */
.timeline--left {
	padding: 1rem 0;
	padding-left: 2rem;
}

.timeline--left::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0.75rem;
	width: 2px;
	height: 100%;
	background-color: var(--line-color, var(--light-color));
	z-index: 1;
}

/* Right Layout */
.timeline--right {
	padding: 1rem 0;
	padding-right: 2rem;
}

.timeline--right::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0.75rem;
	width: 2px;
	height: 100%;
	background-color: var(--line-color, var(--light-color));
	z-index: 1;
}

/* --------------------------------------------------------------------------
   SPACING VARIANTS
   -------------------------------------------------------------------------- */
.timeline--spacing-sm .timeline-item {
	margin-bottom: 1rem;
}

.timeline--spacing-md .timeline-item {
	margin-bottom: 2rem;
}

.timeline--spacing-lg .timeline-item {
	margin-bottom: 3rem;
}

/* --------------------------------------------------------------------------
   TIMELINE ITEMS
   -------------------------------------------------------------------------- */
.timeline-item {
	position: relative;
	display: flex;
	align-items: flex-start;
	z-index: 2;
}

/* Center layout positioning */
.timeline--center .timeline-item {
	width: 50%;
	padding-right: 2rem;
	justify-content: flex-end;
}

.timeline--center .timeline-item--right {
	margin-left: 50%;
	padding-left: 2rem;
	padding-right: 0;
	justify-content: flex-start;
}

/* Left layout positioning */
.timeline--left .timeline-item {
	padding-left: 2rem;
	justify-content: flex-start;
}

/* Right layout positioning */
.timeline--right .timeline-item {
	padding-right: 2rem;
	justify-content: flex-end;
}

/* Clickable items */
.timeline-item--clickable {
	cursor: pointer;
}

.timeline-item--clickable:focus-visible {
	outline: 2px solid var(--secondary-color);
	outline-offset: 2px;
	border-radius: 0.5rem;
}

.timeline-item--clickable:focus,
.timeline-item--clickable[data-focus-visible-added] {
	outline: 2px solid var(--secondary-color);
	outline-offset: 2px;
	border-radius: 0.5rem;
}

/* --------------------------------------------------------------------------
   TIMELINE CONTENT
   -------------------------------------------------------------------------- */
.timeline-content {
	background-color: var(--background);
	border: 1px solid var(--light-color);
	border-radius: 0.75rem;
	padding: 1.5rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	max-width: 100%;
	width: 100%;
}

.timeline-content:hover {
	transform: translateY(-2px);
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
	border-color: var(--secondary-color);
}

/* Dark theme adjustments */
:global(.dark) .timeline-content {
	border-color: var(--dark-color);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

:global(.dark) .timeline-content:hover {
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

/* --------------------------------------------------------------------------
   TIMELINE CONTENT ELEMENTS
   -------------------------------------------------------------------------- */
.timeline-date {
	display: inline-block;
	padding: 0.25rem 0.5rem;
	font-size: 0.875rem;
	line-height: 1.25;
	color: var(--secondary-color);
	border: 1px solid var(--light-color);
	border-radius: 0.375rem;
	background-color: var(--background);
	transition: all 0.3s ease;

	&:hover {
		border-color: var(--secondary-color);
	}
}

/* Dark theme adjustments */
:global(.dark) .timeline-date {
	border-color: var(--dark-color);
}

/* --------------------------------------------------------------------------
   TIMELINE DOTS
   -------------------------------------------------------------------------- */
.timeline-dot {
	position: absolute;
	left: 100%;
	top: 2rem;
	transform: translate(-50%, -50%);
	z-index: 3;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--secondary-color, rgb(59 130 246));
	border-radius: 50%;
	border: 2px solid var(--background, #fff);
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
	transition: background 0.2s, box-shadow 0.2s;
}

.timeline-dot--sm {
	width: 0.75rem;
	height: 0.75rem;
}

.timeline-dot--md {
	width: 1.25rem;
	height: 1.25rem;
}

.timeline-dot--lg {
	width: 1.75rem;
	height: 1.75rem;
}

.timeline-dot-inner {
	width: 60%;
	height: 60%;
	background: var(--background, #fff);
	border-radius: 50%;
}

/* Center layout dot positioning */
.timeline--center .timeline-dot {
	left: 50%;
	top: 2rem;
	transform: translate(-50%, -50%);
}

/* Left layout dot positioning */
.timeline--left .timeline-dot {
	left: 0.75rem;
	top: 2rem;
	transform: translateY(-50%);
}

/* Right layout dot positioning */
.timeline--right .timeline-dot {
	right: 0.75rem;
	left: auto;
	top: 2rem;
	transform: translateY(-50%);
}

/* --------------------------------------------------------------------------
   TIMELINE LINES
   -------------------------------------------------------------------------- */
.timeline-line {
	position: absolute;
	left: 50%;
	width: 2px;
	background-color: var(--line-color, var(--light-color, #e5e7eb));
	z-index: 1;
}

.timeline--center .timeline-line {
	top: calc(2rem + 1.25rem);
	height: calc(100% - 2rem - 1.25rem);
	transform: translateX(-50%);
}

.timeline--left .timeline-line {
	left: 0.75rem;
	top: calc(2rem + 1.25rem);
	height: calc(100% - 2rem - 1.25rem);
}

.timeline--right .timeline-line {
	right: 0.75rem;
	left: auto;
	top: calc(2rem + 1.25rem);
	height: calc(100% - 2rem - 1.25rem);
}

/* --------------------------------------------------------------------------
   ANIMATION FOR TIMELINE ITEMS
   -------------------------------------------------------------------------- */
.timeline-item--animated {
	opacity: 0;
	transform: translateY(40px);
	transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	transition-delay: var(--animation-delay, 0s);
}

.timeline-item--visible {
	opacity: 1;
	transform: translateY(0);
}

/* --------------------------------------------------------------------------
   RESPONSIVE DESIGN
   -------------------------------------------------------------------------- */
@media (max-width: 900px) {

	.timeline--center .timeline-item,
	.timeline--center .timeline-item--right {
		width: 100%;
		margin-left: 0;
		padding-left: 2.5rem;
		padding-right: 0;
		justify-content: flex-start;
	}

	.timeline--center::before {
		left: 1.25rem;
		transform: none;
	}

	.timeline-dot,
	.timeline--center .timeline-dot {
		left: 1.25rem;
		transform: translateY(-50%);
	}

	.timeline-line,
	.timeline--center .timeline-line {
		left: 1.25rem;
		transform: none;
	}
}

@media (max-width: 600px) {
	.timeline-content {
		padding: 1rem;
	}

	.timeline-date {
		font-size: 0.75rem;
	}
}

/* --------------------------------------------------------------------------
   DARK THEME DOTS & LINES
   -------------------------------------------------------------------------- */
:global(.dark) .timeline-dot {
	border-color: var(--dark-color, #1f2937);
	background-color: var(--secondary-color, rgb(96 165 250));
}

:global(.dark) .timeline-line {
	background-color: var(--dark-color, #1f2937);
}
</style>
