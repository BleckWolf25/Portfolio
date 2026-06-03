<script setup lang="ts">
/**
 * @file error.vue
 *
 * @version 1.0.0
 * @author Bleckwolf25
 * @license MIT
 *
 * @summary Error page component.
 *
 * @description
 * A user-friendly error page that displays the HTTP status code, a descriptive message,
 * and a call-to-action button to return to the homepage.
 *
 * @since 10/05/2026
 * @updated 02/06/2026
 */
// ---------- IMPORTS
import { computed } from 'vue'
import type { NuxtError } from '#app'

// ---------- PROPS
const props = defineProps<{ error: NuxtError }>()

// ---------- COMPUTED
const errorMessage = computed(() => {
  return (
    props.error.statusText ||
    props.error.message ||
    "Sorry, we couldn't find the page you're looking for."
  )
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
  >
    <div class="max-w-md w-full space-y-8 text-center">
      <div>
        <h1
          class="mt-6 text-9xl font-extrabold text-primary-600 dark:text-primary-500 tracking-tight drop-shadow-sm"
        >
          {{ error.status }}
        </h1>
        <h2 class="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          {{ error.status === 404 ? 'Page not found' : 'An error occurred' }}
        </h2>
        <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {{ errorMessage }}
        </p>
      </div>

      <div class="mt-8 flex justify-center">
        <UButton
          size="lg"
          icon="i-heroicons-home"
          color="primary"
          variant="solid"
          class="font-semibold shadow-md hover:shadow-lg transition-all duration-200"
          @click="handleError"
        >
          Go back home
        </UButton>
      </div>
    </div>
  </div>
</template>
