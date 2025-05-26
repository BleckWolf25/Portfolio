/**
 * @file: 02.CORS.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.0
 *
 * @description:
 * CORS middleware for controlling cross-origin requests.
 * Prevents unauthorized domains from making requests to the API.
 */

export default defineEventHandler(async (event) => {
	// Only apply to API routes
	if (!event.node.req.url?.startsWith('/api/')) {
		return
	}

	const config = useRuntimeConfig()
	const origin = getHeader(event, 'origin')
	const method = event.node.req.method

	// Allowed origins
	const allowedOrigins = [
		config.public.siteUrl,
		'https://bleckwolf25.vercel.app',
		'https://bleckwolf25-preview.vercel.app',
		// Add localhost for development
		...(process.env.NODE_ENV === 'development' ? [
			'http://localhost:3000',
			'http://192.168.1.207:3000',
		] : [])
	]

	// Check if origin is allowed
	const isAllowedOrigin = !origin || allowedOrigins.includes(origin)

	if (!isAllowedOrigin) {
		console.warn(`🚫 CORS: Blocked request from unauthorized origin: ${origin}`)
		throw createError({
			statusCode: 403,
			statusMessage: 'Forbidden: Origin not allowed'
		})
	}

	// Set CORS headers for allowed origins
	if (origin && isAllowedOrigin) {
		setHeader(event, 'Access-Control-Allow-Origin', origin)
	}

	setHeader(event, 'Access-Control-Allow-Credentials', 'true')
	setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
	setHeader(event, 'Access-Control-Allow-Headers', [
		'Content-Type',
		'Authorization',
		'X-Requested-With',
		'Accept',
		'Origin',
		'User-Agent',
		'DNT',
		'Cache-Control',
		'X-Mx-ReqToken',
		'Keep-Alive',
		'X-Requested-With',
		'If-Modified-Since'
	].join(', '))

	// Handle preflight requests
	if (method === 'OPTIONS') {
		setHeader(event, 'Access-Control-Max-Age', 86400) // 24 hours
		setResponseStatus(event, 204)
		return ''
	}

	// Return at the end
	return
})
