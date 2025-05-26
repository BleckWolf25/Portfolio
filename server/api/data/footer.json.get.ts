/**
 * @file FOOTER.JSON.GET.TS
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * API endpoint for fetching footer data
 * Serves as a proxy to the static JSON file
 */

// ------------ IMPORTS
import { readFileSync } from 'fs'
import { join } from 'path'

// ------------ HANDLER
export default defineEventHandler(async (event) => {
	try {
		const filePath = join(process.cwd(), 'public/data/footer.json')
		const data = readFileSync(filePath, 'utf-8')
		return JSON.parse(data)
	} catch (error) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Footer data not found'
		})
	}
})
