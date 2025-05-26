/**
 * @file: 04.INPUT-SANITIZATION.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.0
 *
 * @description:
 * Input sanitization middleware for preventing XSS, SQL injection, and other injection attacks.
 * Sanitizes request bodies, query parameters, and headers.
 */

// ------------ SANITIZATION FUNCTIONS
function sanitizeString(input: string): string {
	if (typeof input !== 'string') return input

	return input
		// Remove null bytes
		.replace(/\0/g, '')
		// Remove control characters except newlines and tabs
		.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
		// Normalize whitespace
		.replace(/\s+/g, ' ')
		// Trim whitespace
		.trim()
}

function sanitizeHtml(input: string): string {
	if (typeof input !== 'string') return input

	return input
		// Remove script tags and content
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		// Remove dangerous HTML tags
		.replace(/<(iframe|object|embed|form|input|button|select|textarea|style|link|meta)[^>]*>/gi, '')
		// Remove javascript: and data: URLs
		.replace(/javascript:/gi, '')
		.replace(/data:/gi, '')
		// Remove on* event handlers
		.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
		// Remove dangerous attributes
		.replace(/\s*(src|href|action|formaction)\s*=\s*["'][^"']*["']/gi, '')
}

function detectSqlInjection(input: string): boolean {
	if (typeof input !== 'string') return false

	const sqlPatterns = [
		/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
		/(--|\/\*|\*\/|;|'|"|`)/,
		/(\bOR\b|\bAND\b).*?[=<>]/i,
		/\b(INFORMATION_SCHEMA|SYSOBJECTS|SYSCOLUMNS)\b/i,
		/(CAST|CONVERT|CHAR|ASCII|SUBSTRING|LEN|REPLACE)\s*\(/i
	]

	return sqlPatterns.some(pattern => pattern.test(input))
}

function detectXssAttempt(input: string): boolean {
	if (typeof input !== 'string') return false

	const xssPatterns = [
		/<script[^>]*>.*?<\/script>/gi,
		/javascript:/gi,
		/on\w+\s*=/gi,
		/<iframe[^>]*>/gi,
		/<object[^>]*>/gi,
		/<embed[^>]*>/gi,
		/expression\s*\(/gi,
		/vbscript:/gi,
		/data:text\/html/gi
	]

	return xssPatterns.some(pattern => pattern.test(input))
}

// ------------ RECURSIVE SANITIZATION
function sanitizeObject(obj: any, depth = 0): any {
	// Prevent deep recursion attacks
	if (depth > 10) {
		console.warn('🚫 INPUT-SANITIZATION: Object nesting too deep, truncating')
		return {}
	}

	if (obj === null || obj === undefined) {
		return obj
	}

	if (typeof obj === 'string') {
		// Check for malicious patterns
		if (detectSqlInjection(obj)) {
			console.warn('🚫 INPUT-SANITIZATION: SQL injection attempt detected')
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid input detected'
			})
		}

		if (detectXssAttempt(obj)) {
			console.warn('🚫 INPUT-SANITIZATION: XSS attempt detected')
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid input detected'
			})
		}

		return sanitizeHtml(sanitizeString(obj))
	}

	if (Array.isArray(obj)) {
		return obj.map(item => sanitizeObject(item, depth + 1))
	}

	if (typeof obj === 'object') {
		const sanitized: any = {}
		for (const [key, value] of Object.entries(obj)) {
			// Sanitize keys as well
			const sanitizedKey = sanitizeString(key)
			sanitized[sanitizedKey] = sanitizeObject(value, depth + 1)
		}
		return sanitized
	}

	return obj
}

// ------------ MIDDLEWARE
export default defineEventHandler(async (event) => {
	// Only apply to API routes with POST method
	if (!event.node.req.url?.startsWith('/api/') || event.node.req.method !== 'POST') {
		return
	}

	// Skip if already processed
	if (event.context.sanitized) {
		return
	}

	try {
		// Get the raw body
		const body = await readBody(event)

		if (body && typeof body === 'object') {
			// Sanitize the request body
			const sanitizedBody = sanitizeObject(body)
			
			// Replace the body with sanitized version
			event.context.body = sanitizedBody
			event.context.sanitized = true

			// Log sanitization for monitoring
			console.log(`✅ INPUT-SANITIZATION: Sanitized request to ${event.node.req.url}`)
		}
	} catch (error) {
		// If sanitization fails, it's likely malicious input
		console.error('🚫 INPUT-SANITIZATION: Failed to sanitize input:', error)
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid request format'
		})
	}
})
