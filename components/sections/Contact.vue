<!--
	- @file: CONTACT.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.0

	- @description:
		- Modern Contact section for portfolio with contact form and social links.
		- Features interactive contact form, social media links, and professional information.
		- Responsive design with animations and accessibility support.
-->

<!-- Template Section -->
<template>
	<section id="contact"
		class="relative py-16 lg:py-24 bg-gradient-to-br from-white via-primary-50/20 to-accent-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden"
		role="main" aria-label="Contact information and form section">
		<!-- Background Decorative Elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<!-- Subtle gradient orbs -->
			<div
				class="absolute top-32 -left-32 w-96 h-96 bg-gradient-to-br from-primary-200/10 to-accent-200/10 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 24s" aria-hidden="true"></div>
			<div
				class="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-accent-300/10 to-secondary-200/10 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 28s; animation-delay: 10s" aria-hidden="true"></div>
		</div>

		<!-- Main Content Container -->
		<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

			<!-- Section Title -->
			<div class="contact-title opacity-0" data-contact-element>
				<SectionTitle>Get In Touch</SectionTitle>
				<p class="text-center text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-16">
					Ready to collaborate on your next project? I'd love to hear from you.
					Whether you have a question, want to discuss opportunities, or just want to connect, feel free to
					reach out.
				</p>
			</div>

			<!-- Contact Content Grid -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

				<!-- Contact Information -->
				<div class="contact-info opacity-0" data-contact-element>
					<div class="space-y-8">
						<!-- Contact Header -->
						<div>
							<h3 class="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
								Let's Start a Conversation
							</h3>
							<p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">
								I'm always excited to discuss new projects, creative ideas, or opportunities to be part
								of your vision.
								Drop me a message and let's create something amazing together.
							</p>
						</div>

						<!-- Contact Methods -->
						<div class="space-y-6">
							<!-- Email -->
							<div
								class="flex items-center space-x-4 p-4 rounded-xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 group">
								<div
									class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
									<Icon name="mdi:email" class="w-6 h-6 text-white" />
								</div>
								<div>
									<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Email</h4>
									<a href="mailto:joao.coutinho08@icloud.com"
										class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
										aria-label="Send email to joao.coutinho08@icloud.com">
										joao.coutinho08@icloud.com
									</a>
								</div>
							</div>

							<!-- GitHub -->
							<div
								class="flex items-center space-x-4 p-4 rounded-xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 group">
								<div
									class="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
									<Icon name="mdi:github" class="w-6 h-6 text-white" />
								</div>
								<div>
									<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100">GitHub</h4>
									<a href="https://github.com/BleckWolf25" target="_blank" rel="noopener noreferrer"
										class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
										aria-label="Visit GitHub profile (opens in new tab)">
										github.com/BleckWolf25
									</a>
								</div>
							</div>

							<!-- Location -->
							<div
								class="flex items-center space-x-4 p-4 rounded-xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50">
								<div
									class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
									<Icon name="mdi:map-marker" class="w-6 h-6 text-white" />
								</div>
								<div>
									<h4 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Location
									</h4>
									<p class="text-neutral-600 dark:text-neutral-400">Available for remote work
										worldwide</p>
								</div>
							</div>
						</div>

						<!-- Response Time -->
						<div
							class="p-6 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border border-primary-200 dark:border-primary-800">
							<div class="flex items-center space-x-3 mb-3">
								<Icon name="mdi:clock-fast" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
								<h4 class="text-lg font-semibold text-primary-800 dark:text-primary-200">Quick Response
								</h4>
							</div>
							<p class="text-primary-700 dark:text-primary-300 text-sm">
								I typically respond to messages within 24 hours. For urgent inquiries, feel free to
								mention it in your
								message.
							</p>
						</div>
					</div>
				</div>

				<!-- Contact Form -->
				<div class="contact-form opacity-0" data-contact-element>
					<ContactForm />
				</div>
			</div>

			<!-- Bottom CTA Section -->
			<div class="contact-cta opacity-0 mt-20" data-contact-element>
				<div
					class="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-neutral-200/50 dark:border-neutral-700/50 text-center">
					<div
						class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg">
						<Icon name="mdi:handshake" class="w-10 h-10 text-white" />
					</div>
					<h3 class="text-2xl lg:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
						Let's Build Something Great Together
					</h3>
					<p class="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8 leading-relaxed">
						Whether you're looking for a technical leader, a collaborative team member, or someone to bring
						your ideas
						to life,
						I'm here to help. Let's discuss how we can create something extraordinary.
					</p>

					<!-- Social Links -->
					<div class="flex justify-center space-x-6">
						<a href="https://github.com/BleckWolf25" target="_blank" rel="noopener noreferrer"
							class="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
							aria-label="Visit GitHub profile (opens in new tab)">
							<Icon name="mdi:github" class="w-6 h-6 text-white" />
						</a>
						<a href="mailto:joao.coutinho08@icloud.com"
							class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl"
							aria-label="Send email to joao.coutinho08@icloud.com">
							<Icon name="mdi:email" class="w-6 h-6 text-white" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import { onMounted, onBeforeUnmount } from 'vue'
import { fadeInOnScroll } from '../animations'
import SectionTitle from '../common/SectionTitle.vue'
import ContactForm from '../specific/ContactForm.vue'

// ------------ LIFECYCLE
let fadeInCleanup: (() => void) | null = null

onMounted(() => {
	// Initialize staggered fade-in animation for contact elements
	const fadeInControl = fadeInOnScroll('[data-contact-element]', {
		duration: 600,
		direction: 'up',
		distance: 30,
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px',
		stagger: 200,
		once: true
	}) as { cleanup: () => void }
	fadeInCleanup = fadeInControl.cleanup
})

onBeforeUnmount(() => {
	// Clean up animations
	if (fadeInCleanup) {
		fadeInCleanup()
	}
})
</script>
