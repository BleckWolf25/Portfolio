/**
 * @file: SECURITY/EVENTS.GET.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.0
 *
 * @description:
 * Security monitoring endpoint to view security events and logs.
 * Only accessible in development mode for security monitoring.
 */

import { getSecurityEvents } from '../../middleware/05.request-logging'

export default defineEventHandler(async (event) => {
	// Only allow in development mode for security
	if (process.env.NODE_ENV !== 'development') {
		throw createError({
			statusCode: 404,
			statusMessage: 'Not Found'
		})
	}

	// Get query parameters
	const query = getQuery(event)
	const limit = parseInt(query.limit as string) || 50
	const eventType = query.type as string

	try {
		// Get security events
		let events = getSecurityEvents(Math.min(limit, 500)) // Max 500 events

		// Filter by event type if specified
		if (eventType) {
			events = events.filter(e => e.event.toLowerCase().includes(eventType.toLowerCase()))
		}

		// Return security dashboard data
		return {
			success: true,
			data: {
				events,
				summary: {
					total: events.length,
					byType: events.reduce((acc, event) => {
						acc[event.event] = (acc[event.event] || 0) + 1
						return acc
					}, {} as Record<string, number>),
					recentActivity: events.slice(-10),
					topIPs: events.reduce((acc, event) => {
						acc[event.ip] = (acc[event.ip] || 0) + 1
						return acc
					}, {} as Record<string, number>)
				}
			}
		}
	} catch (error) {
		console.error('Error fetching security events:', error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error'
		})
	}
})
