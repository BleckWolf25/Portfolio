/**
 * @file USE PORTFOLIO DATA.ts
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * This file provides a composable function for fetching and managing portfolio data.
 * It uses Vue's reactivity system to handle loading states and errors.
 * The data is fetched from JSON files located in the ~/data directory.
 */

// ------------ IMPORTS
import { ref } from 'vue'

// ------------ EXPORTS
export function usePortfolioData<T>(section: string) {
	const data = ref<T | null>(null)
	const error = ref<Error | null>(null)
	const loading = ref(false)

	// Function to fetch data from the JSON file
	async function fetchData() {
		loading.value = true
		try {
			const response = await import(`~/data/${section}.json`)
			data.value = response.default[section]
		} catch (e) {
			error.value = e as Error
			console.error(`Error loading ${section} data:`, e)
		} finally {
			loading.value = false
		}
	}

	// Load data immediately
	fetchData()

	// Return the reactive data, error, loading state, and refresh function
	return {
		data,
		error,
		loading,
		refresh: fetchData
	}
}
