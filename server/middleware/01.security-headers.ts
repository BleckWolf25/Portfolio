/**
 * @file: 01.SECURITY-HEADERS.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.0
 *
 * @description:
 * Security headers middleware for enhanced protection against common web vulnerabilities.
 * Adds comprehensive security headers to all responses including CSP, HSTS, and more.
 */

export default defineEventHandler(async (event) => {
	// Only apply to API routes and form submissions
	if (!event.node.req.url?.startsWith('/api/')) {
		return
	}

	// Set comprehensive security headers
	const headers = {
		// Content Security Policy - Prevent XSS and injection attacks
		'Content-Security-Policy': [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Allow inline scripts for Nuxt
			"style-src 'self' 'unsafe-inline'", // Allow inline styles
			"img-src 'self' data: https:",
			"font-src 'self' https:",
			"connect-src 'self' https:",
			"frame-ancestors 'none'",
			"base-uri 'self'",
			"form-action 'self'"
		].join('; '),

		// Prevent clickjacking
		'X-Frame-Options': 'DENY',

		// Prevent MIME type sniffing
		'X-Content-Type-Options': 'nosniff',

		// Enable XSS protection
		'X-XSS-Protection': '1; mode=block',

		// Referrer policy for privacy
		'Referrer-Policy': 'strict-origin-when-cross-origin',

		// Prevent DNS prefetching
		'X-DNS-Prefetch-Control': 'off',

		// Disable feature policy for sensitive features
		'Permissions-Policy': [
			'camera=()',
			'microphone=()',
			'geolocation=()',
			'payment=()',
			'usb=()',
			'magnetometer=()',
			'gyroscope=()',
			'accelerometer=()'
		].join(', '),

		// Remove server information
		'X-Powered-By': '',
		'Server': ''
	}

	// Add HSTS in production
	if (process.env.NODE_ENV === 'production') {
		headers['Strict-Transport-Security' as keyof typeof headers] = 'max-age=31536000; includeSubDomains; preload'
	}

	// Apply headers
	Object.entries(headers).forEach(([key, value]) => {
		setHeader(event, key, value)
	})
})
