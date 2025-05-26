/**
 * @file WORKTIMELINE.JSON.GET.TS
 *
 * @version 2.0.0
 * @author BleckWolf25
 * @license MIT
 *
 * @description
 * API endpoint for fetching work timeline data
 * Serves as a proxy to the static JSON file
 */

// ------------ IMPORTS
import { readFileSync } from 'fs'
import { join } from 'path'

// ------------ HANDLER
export default defineEventHandler(async (event) => {
	try {
		const filePath = join(process.cwd(), 'public/data/workTimeline.json')
		const data = readFileSync(filePath, 'utf-8')
		return JSON.parse(data)
	} catch (error) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Work timeline data not found'
		})
	}
})
