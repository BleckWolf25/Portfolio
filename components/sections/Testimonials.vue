<!--
	- @file: TESTIMONIALS.VUE
	- @author: BleckWolf25
	- @license: MIT
	- @version: 1.0.1

	- @description:
		- Modern Testimonials section for portfolio showcasing customer reviews.
		- Features interactive testimonials with animations and personal descriptions.
		- Casual, engaging design that reflects personality and work-life balance.
-->

<!-- Template Section -->
<template>
	<section id="testimonials"
		class="relative py-16 lg:py-24 bg-gradient-to-br from-white via-accent-50/20 to-primary-50/10 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800 overflow-hidden">
		<!-- Background Decorative Elements -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div
				class="absolute top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary-200/8 to-accent-200/8 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 20s" aria-hidden="true"></div>
			<div
				class="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tr from-accent-300/8 to-secondary-200/8 rounded-full blur-3xl animate-pulse"
				style="animation-duration: 15s" aria-hidden="true"></div>
		</div>

		<div class="container relative mx-auto px-4">
			<h2 class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-8 text-center">
				Testimonials
			</h2>
			<div v-if="pending" class="flex justify-center">
				<USpinner class="h-8 w-8 text-primary-500" />
			</div>
			<UCarousel v-else-if="testimonials.length" :items="testimonials" class="max-w-xl mx-auto" :loop="true"
				:autoplay="true" :interval="5000" :show-arrows="true" :show-indicators="true" swipeable>
				<template #default="{ item }: { item: MappedTestimonialItem }">
					<div
						class="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8 flex flex-col items-center transition-transform duration-500"
						role="group" :aria-label="`Testimonial by ${item.name}`">
						<img :src="item.image" :alt="`${item.name} photo`"
							class="w-20 h-20 rounded-full mb-4 border-4 border-primary-100 dark:border-primary-700 object-cover"
							loading="lazy" width="80" height="80" />
						<blockquote class="text-lg text-neutral-700 dark:text-neutral-200 italic text-center mb-4">
							"{{ item.quote }}"
						</blockquote>
						<div class="text-primary-700 dark:text-primary-300 font-semibold">
							{{ item.name }}
						</div>
						<div class="text-neutral-500 dark:text-neutral-400 text-sm">
							{{ item.role }}
						</div>
					</div>
				</template>
			</UCarousel>
			<div v-else class="text-center text-neutral-500 dark:text-neutral-400">
				No testimonials available at the moment.
			</div>
		</div>
	</section>
</template>

<!-- Script Section -->
<script setup lang="ts">
// ------------ IMPORTS
import USpinner from '../common/Spinner.vue'

// ------------ INTERFACES
interface TestimonialItem {
	author: string
	position: string
	authorImage: string
	quote: string
}

interface MappedTestimonialItem {
	name: string
	role: string
	image: string
	quote: string
}

interface TestimonialsData {
	testimonials: {
		items: TestimonialItem[]
	}
}

// ------------ DATA FETCHING
const { data, pending, error } = await useAsyncData<TestimonialsData>('testimonials', () =>
	$fetch('/api/data/testimonials.json')
)

// ------------ COMPUTED
const testimonials = computed<MappedTestimonialItem[]>(() =>
	(data.value?.testimonials?.items ?? []).map((t: TestimonialItem) => ({
		name: t.author,
		role: t.position,
		image: (!t.authorImage || t.authorImage === '1x' || t.authorImage === '/1x')
			? '/images/profile.png'
			: t.authorImage,
		quote: t.quote
	}))
)
</script>
