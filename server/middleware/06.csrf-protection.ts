/**
 * @file: 06.CSRF-PROTECTION.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.0
 *
 * @description:
 * CSRF protection middleware to prevent cross-site request forgery attacks.
 * Validates origin and referer headers for state-changing requests.
 */

export default defineEventHandler(async (event) => {
	// Only apply to API routes with state-changing methods
	const method = event.node.req.method
	if (!event.node.req.url?.startsWith('/api/') || !['POST', 'PUT', 'PATCH', 'DELETE'].includes(method || '')) {
		return
	}

	const config = useRuntimeConfig()
	const origin = getHeader(event, 'origin')
	const referer = getHeader(event, 'referer')
	const host = getHeader(event, 'host')

	// Allowed hosts/origins
	const allowedHosts = [
		'bleckwolf25.vercel.app',
		'portfolio-bleckwolf25.vercel.app',
		...(process.env.NODE_ENV === 'development' ? [
			'localhost:3000',
			'127.0.0.1:3000'
		] : [])
	]

	// Check if the request is from an allowed origin
	let isValidOrigin = false

	// Check origin header
	if (origin) {
		try {
			const originUrl = new URL(origin)
			isValidOrigin = allowedHosts.includes(originUrl.host)
		} catch (error) {
			console.warn('🚫 CSRF: Invalid origin format:', origin)
		}
	}

	// Check referer header as fallback
	if (!isValidOrigin && referer) {
		try {
			const refererUrl = new URL(referer)
			isValidOrigin = allowedHosts.includes(refererUrl.host)
		} catch (error) {
			console.warn('🚫 CSRF: Invalid referer format:', referer)
		}
	}

	// Check host header as additional validation
	if (!isValidOrigin && host) {
		isValidOrigin = allowedHosts.includes(host)
	}

	// For development, be more lenient
	if (process.env.NODE_ENV === 'development' && !origin && !referer) {
		// Allow requests without origin/referer in development (e.g., from Postman)
		console.warn('⚠️ CSRF: Allowing request without origin/referer in development mode')
		isValidOrigin = true
	}

	if (!isValidOrigin) {
		const clientIP = (getHeader(event, 'x-forwarded-for') as string) ||
			(getHeader(event, 'x-real-ip') as string) ||
			(event.node.req.socket.remoteAddress) ||
			'unknown'

		console.warn(`🚫 CSRF: Blocked request from unauthorized origin. IP: ${clientIP}, Origin: ${origin}, Referer: ${referer}, Host: ${host}`)
		
		throw createError({
			statusCode: 403,
			statusMessage: 'Forbidden: Invalid origin'
		})
	}

	// Additional check for contact form
	if (event.node.req.url === '/api/contact') {
		const contentType = getHeader(event, 'content-type')
		
		// Ensure content type is JSON for API requests
		if (!contentType?.includes('application/json')) {
			console.warn('🚫 CSRF: Invalid content type for contact form:', contentType)
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid content type'
			})
		}

		// Check for custom header that indicates legitimate request
		const requestedWith = getHeader(event, 'x-requested-with')
		if (!requestedWith) {
			// This is optional but adds another layer of protection
			console.log('ℹ️ CSRF: Request without X-Requested-With header (may be legitimate)')
		}
	}

	console.log(`✅ CSRF: Valid request from ${origin || referer || host}`)
})
