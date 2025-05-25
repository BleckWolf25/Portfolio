<!--
	- @file: MODAL.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This component represents a modal dialog with a title, body, and footer.
		- It supports keyboard navigation and can be closed by clicking outside or pressing the ESC key.
		- The modal can emit events for confirmation actions.
-->

<!-- Template Section -->
<template>
	<transition name="modal-fade">
		<div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center" role="dialog" :aria-modal="true"
			:aria-labelledby="titleId" :aria-describedby="bodyId" @keydown.tab.prevent="trapFocus">
			<!-- Backdrop -->
			<div class="fixed inset-0 bg-black bg-opacity-50" @click="close" aria-hidden="true"></div>

			<!-- Modal dialog -->
			<div ref="modalDialogRef"
				class="bg-white dark:bg-neutral-800 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-4"
				role="document" :aria-labelledby="titleId" :aria-describedby="bodyId" tabindex="-1">
				<!-- Focus trap start -->
				<span ref="focusStart" tabindex="0" aria-hidden="true"
					style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0);"></span>
				<!-- Header -->
				<header class="flex justify-between items-center px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
					<h3 :id="titleId" class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
						<slot name="title">Modal Title</slot>
					</h3>
					<button @click="close" class="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
						<span class="sr-only">Close</span>
						&times;
					</button>
				</header>

				<!-- Body -->
				<section :id="bodyId" class="px-6 py-4 text-neutral-700 dark:text-neutral-300">
					<slot name="body">Modal body content goes here.</slot>
				</section>

				<!-- Footer -->
				<footer class="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 flex justify-end gap-2">
					<slot name="footer">
						<UButton color="primary" variant="solid" @click="confirm">OK</UButton>
						<UButton color="neutral" variant="solid" @click="close">Cancel</UButton>
					</slot>
				</footer>
				<!-- Focus trap end -->
				<span ref="focusEnd" tabindex="0" aria-hidden="true"
					style="position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0);"></span>
			</div>
		</div>
	</transition>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { onMounted, onBeforeUnmount, ref, watch, nextTick, defineProps, computed, inject } from 'vue'
import { modalFadeIn } from '../animations'

// ------------ UNIQUE IDS FOR ACCESSIBILITY
const titleId = `modal-title-${Math.random().toString(36).substring(2, 11)}`
const bodyId = `modal-body-${Math.random().toString(36).substring(2, 11)}`

// ------------ TYPES
const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	}
})

// ------------ EMITS
const emit = defineEmits<{
	(e: 'update:modelValue', value: boolean): void
	(e: 'confirm'): void
}>()

// ------------ KEYBOARD HANDLING
// Close on ESC key
function onKeydown(e: KeyboardEvent) {
	if (e.key === 'Escape' && props.modelValue) {
		close()
	}
}

// ------------ METHODS
function close() {
	emit('update:modelValue', false)
}

function confirm() {
	emit('confirm')
	close()
}

// ------------ FOCUS TRAP
const modalDialogRef = ref<HTMLElement | null>(null)
const focusStart = ref<HTMLElement | null>(null)
const focusEnd = ref<HTMLElement | null>(null)

function getFocusableElements() {
	if (!modalDialogRef.value) return []
	return Array.from(
		modalDialogRef.value.querySelectorAll<HTMLElement>(
			'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]'
		)
	).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
}

function trapFocus(e: KeyboardEvent) {
	const focusable = getFocusableElements()
	if (!focusable.length) return
	const first = focusable[0]
	const last = focusable[focusable.length - 1]
	if (e.shiftKey) {
		if (document.activeElement === first) {
			if (last) last.focus()
			e.preventDefault()
		}
	} else {
		if (document.activeElement === last) {
			if (first) first.focus()
			e.preventDefault()
		}
	}
}

function focusDialog() {
	nextTick(() => {
		const focusable = getFocusableElements()
		if (focusable.length && focusable[0]) {
			focusable[0].focus()
		} else if (modalDialogRef.value) {
			modalDialogRef.value.focus()
		}
	})
}

// ------------ GLOBAL ANNOUNCER (screen reader live region)
const announce = inject<(msg: string) => void>('announce', () => { })

// ------------ WATCHERS
watch(
	() => props.modelValue,
	async (val) => {
		if (val && modalDialogRef.value) {
			await nextTick()
			modalFadeIn(modalDialogRef.value)
			focusDialog()
			if (announce) announce('Modal dialog opened.')
		} else if (!val && announce) {
			announce('Modal dialog closed.')
		}
	}
)

// ------------ LIFECYCLE HOOKS
onMounted(() => {
	window.addEventListener('keydown', onKeydown)
})
onBeforeUnmount(() => {
	window.removeEventListener('keydown', onKeydown)
})
</script>

<!-- Style Section -->
<style>
/* ===================================== */
/* MODAL TRANSITION STYLES               */
/* ===================================== */

/* Styles for the active states of the modal fade transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: opacity 0.2s ease;
	/* Smooth opacity transition */
}

/* Styles for the "from" state when entering and the "to" state when leaving */
.modal-fade-enter-from,
.modal-fade-leave-to {
	opacity: 0;
	/* Make the modal invisible */
}
</style>
