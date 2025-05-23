<!--
    - @file: Contact.vue
    - @author: BleckWolf25
    - @license: MIT

    - @description:
    - Contact form and contact information section.
-->
<template>
	<section id="contact" class="py-20" style="background-color: var(--background);">
		<div class="container mx-auto px-4">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold mb-4" style="color: var(--text-primary);">
					Contact Me
				</h2>
				<p class="text-lg max-w-3xl mx-auto" style="color: var(--text-secondary);">
					Interested in working together or have a question? Fill out the form below or reach out via email.
				</p>
			</div>
			<div class="max-w-2xl mx-auto">
				<Card variant="outlined" padding="2rem">
					<template #default>
						<form @submit.prevent="submitForm" class="bg-transparent rounded-lg shadow-none p-0"
							style="background-color: transparent;">
							<div class="mb-6">
								<label for="name" class="block mb-2 font-semibold" style="color: var(--text-primary);">Name</label>
								<input id="name" v-model="form.name" type="text" required
									class="w-full px-4 py-3 rounded border bg-transparent focus:outline-none focus:ring-2"
									style="color: var(--text-primary); background-color: var(--background); border-color: var(--light-color);"
									autocomplete="name" />
							</div>
							<div class="mb-6">
								<label for="email" class="block mb-2 font-semibold" style="color: var(--text-primary);">Email</label>
								<input id="email" v-model="form.email" type="email" required
									class="w-full px-4 py-3 rounded border bg-transparent focus:outline-none focus:ring-2"
									style="color: var(--text-primary); background-color: var(--background); border-color: var(--light-color);"
									autocomplete="email" />
							</div>
							<div class="mb-6">
								<label for="message" class="block mb-2 font-semibold"
									style="color: var(--text-primary);">Message</label>
								<textarea id="message" v-model="form.message" rows="5" required
									class="w-full px-4 py-3 rounded border bg-transparent focus:outline-none focus:ring-2"
									style="color: var(--text-primary); background-color: var(--background); border-color: var(--light-color);"></textarea>
							</div>
							<div class="flex justify-center">
								<Button type="submit" variant="primary" size="md" :loading="loading" :disabled="loading">
									{{ loading ? 'Sending...' : 'Send Message' }}
								</Button>
							</div>
							<div v-if="success" class="mt-6 text-center" style="color: var(--success-color);">
								Thank you! Your message has been sent.
							</div>
							<div v-if="error" class="mt-6 text-center" style="color: var(--danger-color);">
								Something went wrong. Please try again.
							</div>
						</form>
					</template>
				</Card>
				<div class="mt-8 text-center">
					<p style="color: var(--text-secondary);">
						Or email me directly at
						<a href="mailto:bleckwolf25@gmail.com" style="color: var(--primary-color); text-decoration: underline;">
							bleckwolf25@gmail.com
						</a>
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
// ------------ IMPORTS
import { ref } from 'vue'
import Button from './ui/Button.vue'
import Card from './ui/Card.vue'

// ------------ COMPOSABLES
const form = ref({
	name: '',
	email: '',
	message: ''
})

// ------------ REACTIVE VARIABLES
const loading = ref(false)
const success = ref(false)
const error = ref(false)

// ------------ METHODS
function submitForm() {
	loading.value = true
	success.value = false
	error.value = false

	// Simulate async form submission (replace with real API call)
	setTimeout(() => {
		loading.value = false
		// Simulate success
		success.value = true
		form.value = { name: '', email: '', message: '' }
	}, 1200)
}
</script>
