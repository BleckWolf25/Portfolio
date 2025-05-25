<!--
	- @file: CONTACT FORM.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- This component represents a contact form that allows users to send messages.
		- It includes fields for name, email, and message, with validation and loading states.
		- The form handles submission and displays success or error messages.
-->

<!-- Template Section -->
<template>
	<form
		class="space-y-6 max-w-2xl mx-auto bg-white dark:bg-neutral-900 p-6 md:p-8 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 transition-all"
		@submit.prevent="handleSubmit" novalidate aria-describedby="form-status">
		<h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Contact Me</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<label class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300" for="name">Name</label>
				<UInput id="name" v-model="form.name" required type="text" :aria-invalid="!!errors.name"
					:aria-describedby="errors.name ? 'name-error' : undefined" color="primary" class="w-full"
					:class="{ 'border-red-500': errors.name }" />
				<p v-if="errors.name" id="name-error" class="mt-1 text-red-500 text-sm" aria-live="polite">{{
					errors.name }}</p>
			</div>

			<div>
				<label class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300" for="email">Email</label>
				<UInput id="email" v-model="form.email" required type="email" :aria-invalid="!!errors.email"
					:aria-describedby="errors.email ? 'email-error' : undefined" color="primary" class="w-full"
					:class="{ 'border-red-500': errors.email }" />
				<p v-if="errors.email" id="email-error" class="mt-1 text-red-500 text-sm" aria-live="polite">{{
					errors.email }}
				</p>
			</div>
		</div>

		<div>
			<label class="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-300" for="message">Message</label>
			<UTextarea id="message" v-model="form.message" required :rows="5" :aria-invalid="!!errors.message"
				:aria-describedby="errors.message ? 'message-error' : undefined" color="primary" class="w-full resize-none"
				:class="{ 'border-red-500': errors.message }" />
			<p v-if="errors.message" id="message-error" class="mt-1 text-red-500 text-sm" aria-live="polite">{{
				errors.message
			}}</p>
		</div>

		<div class="flex justify-end">
			<UButton type="submit" :disabled="loading" color="primary" variant="solid"
				class="relative px-6 py-2 rounded-lg font-semibold shadow-md focus:ring-2 focus:ring-primary-300 focus:outline-none disabled:opacity-50"
				:aria-busy="loading">
				<template v-if="loading" #leading>
					<Spinner size="sm" color="white" />
				</template>
				{{ loading ? 'Sending...' : 'Send Message' }}
			</UButton>
		</div>

		<div id="form-status" aria-live="polite" aria-atomic="true">
			<p v-if="success" class="mt-4 text-green-500 font-medium">Your message has been sent!</p>
			<p v-if="error" class="mt-4 text-red-500 font-medium">{{ error }}</p>
		</div>
	</form>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { ref, inject } from 'vue'
import Spinner from '../common/Spinner.vue';

// ------------ TYPES
const form = ref({
	name: '',
	email: '',
	message: ''
})

// ------------ STATE
const errors = ref<{ name?: string; email?: string; message?: string }>({})

// ------------ FORM STATES
const loading = ref(false)
const success = ref(false)
const error = ref<string | false>(false)

// ------------ VALIDATION
function validate() {
	errors.value = {}
	let valid = true

	if (!form.value.name.trim()) {
		errors.value.name = 'Name is required.'
		valid = false
	}

	if (!form.value.email.trim()) {
		errors.value.email = 'Email is required.'
		valid = false
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
		errors.value.email = 'Please enter a valid email address.'
		valid = false
	}

	if (!form.value.message.trim()) {
		errors.value.message = 'Message is required.'
		valid = false
	} else if (form.value.message.length < 10) {
		errors.value.message = 'Message must be at least 10 characters.'
		valid = false
	}

	return valid
}

// ------------ GLOBAL ANNOUNCER (screen reader live region)
const announce = inject<(msg: string) => void>('announce', () => { })

// ------------ SUBMIT HANDLER
function handleSubmit() {
	success.value = false
	error.value = false

	if (!validate()) {
		if (announce) announce('Form validation failed. Please check the errors and try again.')
		return
	}

	loading.value = true

	// Simulate async request
	setTimeout(() => {
		const isSuccess = Math.random() > 0.2 // fake 80% success rate
		loading.value = false
		success.value = isSuccess
		error.value = isSuccess ? false : 'Something went wrong. Please try again.'

		if (isSuccess) {
			form.value = { name: '', email: '', message: '' }
			if (announce) announce('Your message has been sent!')
		} else {
			if (announce) announce('Message sending failed. Please try again.')
		}
	}, 1500)
}
</script>
