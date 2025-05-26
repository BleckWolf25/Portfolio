/**
 * @file: 03.REQUEST-LIMITS.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.0
 *
 * @description:
 * Request limiting middleware to prevent large payload attacks and DoS attempts.
 * Limits request size, body size, and URL length.
 */

export default defineEventHandler(async (event) => {
	// Only apply to API routes
	if (!event.node.req.url?.startsWith('/api/')) {
		return
	}

	const method = event.node.req.method
	const url = event.node.req.url
	const contentLength = getHeader(event, 'content-length')

	// URL length limit (prevent long URL attacks)
	const MAX_URL_LENGTH = 2048
	if (url && url.length > MAX_URL_LENGTH) {
		console.warn(`🚫 REQUEST-LIMITS: URL too long: ${url.length} characters`)
		throw createError({
			statusCode: 414,
			statusMessage: 'URI Too Long'
		})
	}

	// Request body size limits
	const MAX_BODY_SIZE = {
		'/api/contact': 50 * 1024, // 50KB for contact form
		default: 10 * 1024 // 10KB for other endpoints
	}

	// Check content length for POST requests
	if (method === 'POST' && contentLength) {
		const size = parseInt(contentLength, 10)
		const maxSize = MAX_BODY_SIZE[url as keyof typeof MAX_BODY_SIZE] || MAX_BODY_SIZE.default

		if (size > maxSize) {
			console.warn(`🚫 REQUEST-LIMITS: Request body too large: ${size} bytes (max: ${maxSize})`)
			throw createError({
				statusCode: 413,
				statusMessage: 'Payload Too Large'
			})
		}
	}

	// Header count and size limits
	const headers = event.node.req.headers
	const headerCount = Object.keys(headers).length
	const MAX_HEADERS = 50

	if (headerCount > MAX_HEADERS) {
		console.warn(`🚫 REQUEST-LIMITS: Too many headers: ${headerCount}`)
		throw createError({
			statusCode: 400,
			statusMessage: 'Too Many Headers'
		})
	}

	// Check individual header sizes
	const MAX_HEADER_SIZE = 8192 // 8KB
	for (const [name, value] of Object.entries(headers)) {
		const headerSize = (name + (value || '')).length
		if (headerSize > MAX_HEADER_SIZE) {
			console.warn(`🚫 REQUEST-LIMITS: Header too large: ${name} (${headerSize} bytes)`)
			throw createError({
				statusCode: 400,
				statusMessage: 'Header Too Large'
			})
		}
	}

	// Request timeout (handled by Nitro, but we can log long requests)
	const startTime = Date.now()
	
	// Add cleanup function to log request duration
	event.node.req.on('close', () => {
		const duration = Date.now() - startTime
		if (duration > 30000) { // 30 seconds
			console.warn(`⚠️ REQUEST-LIMITS: Long request duration: ${duration}ms for ${url}`)
		}
	})
})
