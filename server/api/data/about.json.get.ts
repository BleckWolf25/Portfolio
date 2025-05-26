/**
 * @file ABOUT.JSON.GET.TS
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * API endpoint for fetching about data
 * Serves as a proxy to the static JSON file
 */

// ------------ IMPORTS
import { readFileSync } from 'fs'
import { join } from 'path'

// ------------ HANDLER
export default defineEventHandler(async (event) => {
	try {
		const filePath = join(process.cwd(), 'public/data/about.json')
		const data = readFileSync(filePath, 'utf-8')
		return JSON.parse(data)
	} catch (error) {
		throw createError({
			statusCode: 404,
			statusMessage: 'About data not found'
		})
	}
})
