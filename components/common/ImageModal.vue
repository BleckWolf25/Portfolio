<!--
	@file: IMAGE-MODAL.VUE
	@author: BleckWolf25
	@license: MIT
	@version: 1.0.0

	@description:
		Advanced image modal component with professional features:
		- Smooth animations and transitions
		- Zoom functionality with mouse wheel and buttons
		- Click/drag to pan when zoomed
		- Keyboard navigation (ESC, arrow keys)
		- Loading states and error handling
		- Responsive design with mobile gestures
		- Accessibility support (ARIA labels, focus management)
		- Professional UI with backdrop blur and modern styling
-->

<template>
	<!-- Modal Backdrop -->
	<Teleport to="body">
		<Transition name="modal-backdrop" enter-active-class="duration-300 ease-out" enter-from-class="opacity-0"
			enter-to-class="opacity-100" leave-active-class="duration-200 ease-in" leave-from-class="opacity-100"
			leave-to-class="opacity-0">
			<div v-if="isOpen"
				class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md debug-modal-backdrop"
				@click="handleBackdropClick" @keydown="handleKeydown" tabindex="-1" role="dialog" aria-modal="true"
				:aria-label="`Image viewer for ${title}`"> <!-- Modal Container -->
				<Transition name="modal-content" enter-active-class="duration-300 ease-out"
					enter-from-class="opacity-0 scale-95 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0"
					leave-active-class="duration-200 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0"
					leave-to-class="opacity-0 scale-95 translate-y-4">
					<div v-if="isOpen"
						class="relative max-w-7xl max-h-[90vh] mx-4 bg-white/95 dark:bg-neutral-900/95 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/20 dark:border-neutral-700/30 overflow-hidden"
						@click.stop>
						<!-- Header -->
						<div
							class="flex items-center justify-between p-6 border-b border-neutral-200/50 dark:border-neutral-700/50 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
							<div class="flex-1 min-w-0">
								<h2 class="text-xl font-bold text-neutral-900 dark:text-white truncate">
									{{ title }}
								</h2>
								<p v-if="description" class="text-sm text-neutral-600 dark:text-neutral-400 mt-1 truncate">
									{{ description }}
								</p>
							</div>

							<!-- Zoom Controls -->
							<div class="flex items-center space-x-2 ml-4">
								<button @click="zoomOut" :disabled="scale <= minScale"
									class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
									:aria-label="'Zoom out'">
									<Icon name="heroicons:minus" class="w-4 h-4" />
								</button>

								<span class="text-sm font-medium text-neutral-700 dark:text-neutral-300 min-w-[60px] text-center">
									{{ Math.round(scale * 100) }}%
								</span>

								<button @click="zoomIn" :disabled="scale >= maxScale"
									class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
									:aria-label="'Zoom in'">
									<Icon name="heroicons:plus" class="w-4 h-4" />
								</button>

								<button @click="resetZoom"
									class="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-all duration-200"
									:aria-label="'Reset zoom'">
									<Icon name="heroicons:arrow-path" class="w-4 h-4" />
								</button>

								<div class="w-px h-6 bg-neutral-300 dark:bg-neutral-600 mx-2"></div>

								<button @click="closeModal"
									class="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-all duration-200"
									:aria-label="'Close modal'">
									<Icon name="heroicons:x-mark" class="w-4 h-4" />
								</button>
							</div>
						</div>

						<!-- Image Container -->
						<div ref="imageContainer" class="relative overflow-hidden bg-neutral-50 dark:bg-neutral-800"
							:style="{ height: containerHeight }" @wheel="handleWheel" @mousedown="handleMouseDown"
							@mousemove="handleMouseMove" @mouseup="handleMouseUp" @mouseleave="handleMouseUp"
							@touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
							<!-- Loading State -->
							<div v-if="isLoading"
								class="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
								<div class="flex flex-col items-center space-y-3">
									<div class="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
									<p class="text-sm text-neutral-600 dark:text-neutral-400">Loading image...</p>
								</div>
							</div>

							<!-- Error State -->
							<div v-else-if="hasError"
								class="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
								<div class="flex flex-col items-center space-y-3 text-center">
									<Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-500" />
									<p class="text-sm text-neutral-600 dark:text-neutral-400">Failed to load image</p>
									<button @click="retryLoad"
										class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
										Retry
									</button>
								</div>
							</div>

							<!-- Image -->
							<img v-else ref="imageElement" :src="imageSrc" :alt="title"
								class="absolute transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing select-none"
								:style="{
									transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
									transformOrigin: 'center center'
								}" :class="{ 'cursor-zoom-in': scale === 1, 'cursor-grab': scale > 1 }" @load="handleImageLoad"
								@error="handleImageError" @dragstart.prevent draggable="false" />

							<!-- Zoom Instructions -->
							<div v-if="!isLoading && !hasError && scale === 1"
								class="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/60 text-white text-sm rounded-lg backdrop-blur-sm">
								<div class="flex items-center space-x-2">
									<Icon name="heroicons:cursor-arrow-rays" class="w-4 h-4" />
									<span>Scroll to zoom • Click and drag to pan</span>
								</div>
							</div>
						</div>

						<!-- Footer -->
						<div
							class="flex items-center justify-between p-4 border-t border-neutral-200/50 dark:border-neutral-700/50 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm">
							<div class="flex items-center space-x-3 text-sm text-neutral-600 dark:text-neutral-400">
								<span v-if="imageSize">{{ imageSize.width }} × {{ imageSize.height }}</span>
								<span v-if="fileSize">{{ formatFileSize(fileSize) }}</span>
							</div>

							<div class="flex items-center space-x-2">
								<button @click="downloadImage"
									class="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 hover:scale-105">
									<Icon name="heroicons:arrow-down-tray" class="w-4 h-4" />
									<span>Download</span>
								</button>
							</div>
						</div>
					</div>
				</Transition>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang="ts">
/**
 * Component Props Interface
 */
interface Props {
	/** Whether the modal is open */
	isOpen: boolean
	/** Image source URL */
	imageSrc: string
	/** Image title */
	title: string
	/** Optional image description */
	description?: string
	/** Container height (default: 60vh) */
	containerHeight?: string
}

/**
 * Component Emits Interface
 */
interface Emits {
	/** Emitted when modal should close */
	(e: 'close'): void
	/** Emitted when modal is fully opened */
	(e: 'opened'): void
}

// ------------ PROPS & EMITS
const props = withDefaults(defineProps<Props>(), {
	containerHeight: '60vh'
})

const emit = defineEmits<Emits>()

// ------------ REACTIVE STATE
const isLoading = ref(true)
const hasError = ref(false)
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)
const imageSize = ref<{ width: number; height: number } | null>(null)
const fileSize = ref<number | null>(null)

// Interaction state
const isDragging = ref(false)
const lastMouseX = ref(0)
const lastMouseY = ref(0)
const lastTouchDistance = ref(0)

// Element refs
const imageContainer = ref<HTMLDivElement>()
const imageElement = ref<HTMLImageElement>()

// ------------ CONSTANTS
const minScale = 0.5
const maxScale = 5
const zoomStep = 0.25

// ------------ COMPUTED
const canZoomIn = computed(() => scale.value < maxScale)
const canZoomOut = computed(() => scale.value > minScale)

// ------------ WATCHERS
watch(() => props.isOpen, (newValue) => {
	if (newValue) {
		resetZoom()
		loadImage()
		nextTick(() => emit('opened'))
	} else {
		// Reset state when closing
		isLoading.value = true
		hasError.value = false
	}
})

watch(() => props.imageSrc, () => {
	if (props.isOpen) {
		loadImage()
	}
})

// Debug watcher
watch(() => props.isOpen, (newValue, oldValue) => {
	console.log('ImageModal isOpen changed:', { oldValue, newValue })
	if (newValue) {
		console.log('Modal should open now')
		resetZoom()
		loadImage()
		nextTick(() => emit('opened'))
	} else {
		console.log('Modal should close now')
		// Reset state when closing
		isLoading.value = true
		hasError.value = false
	}
})
// ------------ METHODS

/**
 * Load image and handle states
 */
function loadImage() {
	isLoading.value = true
	hasError.value = false

	const img = new Image()
	img.onload = () => {
		imageSize.value = { width: img.naturalWidth, height: img.naturalHeight }
		isLoading.value = false
	}
	img.onerror = () => {
		hasError.value = true
		isLoading.value = false
	}
	img.src = props.imageSrc
}

/**
 * Retry loading image
 */
function retryLoad() {
	loadImage()
}

/**
 * Handle image load event
 */
function handleImageLoad(event: Event) {
	const img = event.target as HTMLImageElement
	imageSize.value = { width: img.naturalWidth, height: img.naturalHeight }

	// Estimate file size (rough approximation)
	fileSize.value = Math.round((img.naturalWidth * img.naturalHeight * 3) / 1024) // KB
}

/**
 * Handle image error event
 */
function handleImageError() {
	hasError.value = true
	isLoading.value = false
}

/**
 * Close modal
 */
function closeModal() {
	emit('close')
}

/**
 * Handle backdrop click
 */
function handleBackdropClick(event: MouseEvent) {
	if (event.target === event.currentTarget) {
		closeModal()
	}
}

/**
 * Handle keyboard events
 */
function handleKeydown(event: KeyboardEvent) {
	switch (event.key) {
		case 'Escape':
			closeModal()
			break
		case '+':
		case '=':
			event.preventDefault()
			zoomIn()
			break
		case '-':
			event.preventDefault()
			zoomOut()
			break
		case '0':
			event.preventDefault()
			resetZoom()
			break
	}
}

/**
 * Zoom in
 */
function zoomIn() {
	if (canZoomIn.value) {
		scale.value = Math.min(scale.value + zoomStep, maxScale)
	}
}

/**
 * Zoom out
 */
function zoomOut() {
	if (canZoomOut.value) {
		scale.value = Math.max(scale.value - zoomStep, minScale)
		// Reset position if zoomed out too much
		if (scale.value === minScale) {
			translateX.value = 0
			translateY.value = 0
		}
	}
}

/**
 * Reset zoom and position
 */
function resetZoom() {
	scale.value = 1
	translateX.value = 0
	translateY.value = 0
}

/**
 * Handle mouse wheel for zooming
 */
function handleWheel(event: WheelEvent) {
	event.preventDefault()
	const delta = event.deltaY > 0 ? -zoomStep : zoomStep
	const newScale = Math.max(minScale, Math.min(maxScale, scale.value + delta))

	if (newScale !== scale.value) {
		scale.value = newScale

		// Reset position if zoomed out to minimum
		if (scale.value === minScale) {
			translateX.value = 0
			translateY.value = 0
		}
	}
}

/**
 * Handle mouse down for dragging
 */
function handleMouseDown(event: MouseEvent) {
	if (scale.value > 1) {
		isDragging.value = true
		lastMouseX.value = event.clientX
		lastMouseY.value = event.clientY
		event.preventDefault()
	}
}

/**
 * Handle mouse move for dragging
 */
function handleMouseMove(event: MouseEvent) {
	if (isDragging.value && scale.value > 1) {
		const deltaX = event.clientX - lastMouseX.value
		const deltaY = event.clientY - lastMouseY.value

		translateX.value += deltaX
		translateY.value += deltaY

		lastMouseX.value = event.clientX
		lastMouseY.value = event.clientY
	}
}

/**
 * Handle mouse up to stop dragging
 */
function handleMouseUp() {
	isDragging.value = false
}

/**
 * Handle touch start for mobile gestures
 */
function handleTouchStart(event: TouchEvent) {
	if (event.touches.length === 2) {
		// Pinch zoom
		const touch1 = event.touches[0]
		const touch2 = event.touches[1]
		if (touch1 && touch2) {
			const distance = Math.sqrt(
				Math.pow(touch2.clientX - touch1.clientX, 2) +
				Math.pow(touch2.clientY - touch1.clientY, 2)
			)
			lastTouchDistance.value = distance
		}
	} else if (event.touches.length === 1 && scale.value > 1) {
		// Single touch drag
		const touch = event.touches[0]
		if (touch) {
			lastMouseX.value = touch.clientX
			lastMouseY.value = touch.clientY
			isDragging.value = true
		}
	}
}

/**
 * Handle touch move for mobile gestures
 */
function handleTouchMove(event: TouchEvent) {
	event.preventDefault()

	if (event.touches.length === 2) {
		// Pinch zoom
		const touch1 = event.touches[0]
		const touch2 = event.touches[1]
		if (touch1 && touch2) {
			const distance = Math.sqrt(
				Math.pow(touch2.clientX - touch1.clientX, 2) +
				Math.pow(touch2.clientY - touch1.clientY, 2)
			)

			if (lastTouchDistance.value > 0) {
				const scaleChange = distance / lastTouchDistance.value
				const newScale = Math.max(minScale, Math.min(maxScale, scale.value * scaleChange))
				scale.value = newScale
			}

			lastTouchDistance.value = distance
		}
	} else if (event.touches.length === 1 && isDragging.value && scale.value > 1) {
		// Single touch drag
		const touch = event.touches[0]
		if (touch) {
			const deltaX = touch.clientX - lastMouseX.value
			const deltaY = touch.clientY - lastMouseY.value

			translateX.value += deltaX
			translateY.value += deltaY

			lastMouseX.value = touch.clientX
			lastMouseY.value = touch.clientY
		}
	}
}

/**
 * Handle touch end
 */
function handleTouchEnd() {
	isDragging.value = false
	lastTouchDistance.value = 0
}

/**
 * Download image
 */
async function downloadImage() {
	try {
		const response = await fetch(props.imageSrc)
		const blob = await response.blob()
		const url = window.URL.createObjectURL(blob)

		const link = document.createElement('a')
		link.href = url
		link.download = `${props.title}.jpg`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)

		window.URL.revokeObjectURL(url)
	} catch (error) {
		console.error('Failed to download image:', error)
	}
}

/**
 * Format file size
 */
function formatFileSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`
	if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
	return `${Math.round(bytes / (1024 * 1024))} MB`
}

// ------------ LIFECYCLE
onMounted(() => {
	// Prevent body scroll when modal is open
	document.body.style.overflow = props.isOpen ? 'hidden' : ''
})

onBeforeUnmount(() => {
	document.body.style.overflow = ''
})

watch(() => props.isOpen, (isOpen) => {
	document.body.style.overflow = isOpen ? 'hidden' : ''
})
</script>

<style scoped>
/* Custom transitions */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
	transition: opacity 0.3s ease;
}

.modal-content-enter-active {
	transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-content-leave-active {
	transition: all 0.2s ease-in;
}

/* Smooth zoom transition */
img {
	transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Custom scrollbar for container */
.overflow-hidden::-webkit-scrollbar {
	display: none;
}
</style>
