/**
 * @file: 06.CSRF-PROTECTION.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.1
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

	// Allowed hosts/origins - include all Vercel deployment patterns
	const allowedHosts = [
		'bleckwolf25.vercel.app',
		'bleckwolf25-preview.vercel.app',
		'portfolio-bleckwolf25.vercel.app',
		'portfolio-bleckwolf25s-projects.vercel.app',
		'portfolio-git-main-bleckwolf25s-projects.vercel.app',
		'portfolio-git-dev-preview-bleckwolf25s-projects.vercel.app',
		...(process.env.NODE_ENV === 'development' ? [
			'localhost:3000',
			'127.0.0.1:3000',
			'192.168.1.207:3000'
		] : [])
	]

	// Check if the request is from an allowed origin
	let isValidOrigin = false

	// Check origin header
	if (origin) {
		try {
			const originUrl = new URL(origin)
			isValidOrigin = allowedHosts.includes(originUrl.host) ||
				(originUrl.host.includes('bleckwolf25') && originUrl.host.includes('.vercel.app'))
		} catch (error) {
			console.warn('🚫 CSRF: Invalid origin format:', origin)
		}
	}

	// Check referer header as fallback
	if (!isValidOrigin && referer) {
		try {
			const refererUrl = new URL(referer)
			isValidOrigin = allowedHosts.includes(refererUrl.host) ||
				(refererUrl.host.includes('bleckwolf25') && refererUrl.host.includes('.vercel.app'))
		} catch (error) {
			console.warn('🚫 CSRF: Invalid referer format:', referer)
		}
	}

	// Check host header as additional validation
	if (!isValidOrigin && host) {
		isValidOrigin = allowedHosts.includes(host) ||
			(host.includes('bleckwolf25') && host.includes('.vercel.app'))
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
		const userAgent = getHeader(event, 'user-agent')

		// Log request details for debugging
		console.log(`🔍 CSRF: Contact form request - Content-Type: ${contentType}, User-Agent: ${userAgent}`)

		// Ensure content type is JSON for API requests (more lenient check)
		if (contentType && !contentType.includes('application/json') && !contentType.includes('text/plain')) {
			console.warn('🚫 CSRF: Invalid content type for contact form:', contentType)
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid content type'
			})
		}

		// Check for custom header that indicates legitimate request (optional)
		const requestedWith = getHeader(event, 'x-requested-with')
		if (!requestedWith) {
			console.log('ℹ️ CSRF: Request without X-Requested-With header (allowing for browser compatibility)')
		}
	}

	console.log(`✅ CSRF: Valid request from ${origin || referer || host}`)
})
