/**
 * @file: 02.CORS.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.1
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

	// Allowed origins - include all possible Vercel deployment URLs
	const allowedOrigins = [
		config.public.siteUrl,
		'https://bleckwolf25.vercel.app',
		'https://bleckwolf25-preview.vercel.app',
		'https://portfolio-bleckwolf25s-projects.vercel.app',
		'https://portfolio-git-main-bleckwolf25s-projects.vercel.app',
		'https://portfolio-git-dev-preview-bleckwolf25s-projects.vercel.app',
		// Add localhost for development
		...(process.env.NODE_ENV === 'development' ? [
			'http://localhost:3000',
			'http://127.0.0.1:3000',
			'http://192.168.1.207:3000',
		] : [])
	]

	// Check if origin is allowed or if it's a Vercel deployment
	const isVercelDomain = origin?.includes('.vercel.app') || origin?.includes('bleckwolf25')
	const isAllowedOrigin = !origin || allowedOrigins.includes(origin) || isVercelDomain

	// Log CORS information for debugging
	console.log(`🌐 CORS: Request from origin: ${origin || 'none'}, Method: ${method}, Allowed: ${isAllowedOrigin}`)

	// Set CORS headers for all requests (more permissive for Vercel)
	if (origin) {
		setHeader(event, 'Access-Control-Allow-Origin', origin)
	} else {
		setHeader(event, 'Access-Control-Allow-Origin', '*')
	}

	setHeader(event, 'Access-Control-Allow-Credentials', 'true')
	setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
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
		'If-Modified-Since',
		'X-CSRF-Token'
	].join(', '))

	// Handle preflight requests
	if (method === 'OPTIONS') {
		setHeader(event, 'Access-Control-Max-Age', 86400) // 24 hours
		setResponseStatus(event, 204)
		return ''
	}

	// Only block if it's clearly not a legitimate request
	if (!isAllowedOrigin && origin && !isVercelDomain) {
		console.warn(`🚫 CORS: Blocked request from unauthorized origin: ${origin}`)
		throw createError({
			statusCode: 403,
			statusMessage: 'Forbidden: Origin not allowed'
		})
	}

	console.log(`✅ CORS: Request allowed from ${origin || 'no origin'}`)
	return
})
