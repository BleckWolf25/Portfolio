/**
 * @file: 05.REQUEST-LOGGING.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.0
 *
 * @description:
 * Request logging middleware for security monitoring and audit trails.
 * Logs suspicious activities, failed requests, and security events.
 */

interface SecurityEvent {
	timestamp: string
	ip: string
	userAgent: string
	method: string
	url: string
	statusCode?: number
	event: string
	details?: any
}

// In-memory store for security events (in production, use a proper logging service)
const securityEvents: SecurityEvent[] = []
const MAX_EVENTS = 1000 // Keep last 1000 events

function logSecurityEvent(event: SecurityEvent) {
	securityEvents.push(event)

	// Keep only the last MAX_EVENTS
	if (securityEvents.length > MAX_EVENTS) {
		securityEvents.shift()
	}

	// Log to console for immediate monitoring
	const logLevel = event.event.includes('BLOCKED') || event.event.includes('ATTACK') ? 'error' : 'info'
	console[logLevel](`🔒 SECURITY: ${event.event} - ${event.ip} - ${event.method} ${event.url}`)
}

function getClientInfo(event: any) {
	const ip = (getHeader(event, 'x-forwarded-for') as string) ||
		(getHeader(event, 'x-real-ip') as string) ||
		(event.node.req.socket.remoteAddress) ||
		'unknown'

	const userAgent = getHeader(event, 'user-agent') || 'unknown'

	return { ip, userAgent }
}

function detectSuspiciousPatterns(url: string, userAgent: string): string[] {
	const suspiciousPatterns = []

	// Check for common attack patterns in URL
	const urlPatterns = [
		{ pattern: /\.\.[\/\\]/g, name: 'PATH_TRAVERSAL' },  // Handle both forward and backslashes
		{ pattern: /(?:\/etc\/passwd|\/etc\/shadow)/i, name: 'FILE_ACCESS_ATTEMPT' },
		{ pattern: /(?:\/proc\/|\/sys\/|\/dev\/)/i, name: 'SYSTEM_ACCESS_ATTEMPT' },
		{ pattern: /(?:<script|javascript:|data:text\/html)/i, name: 'XSS_ATTEMPT' },
		{ pattern: /(?:union\s+select|information_schema)/i, name: 'SQL_INJECTION' },
		{ pattern: /(?:\bexec\b|\bshell\b|\bping\b)/i, name: 'COMMAND_INJECTION' },
		{ pattern: /(?:\beval\b|\bFunction\b|\bsetTimeout\b)/i, name: 'CODE_INJECTION' },
		{ pattern: /\.(?:php|asp|aspx|jsp|cgi)$/i, name: 'WEB_SHELL_PROBE' },
		{ pattern: /(?:wp-admin|wp-login|wp-content|xmlrpc\.php)/i, name: 'WORDPRESS_PROBE' },
		{ pattern: /(?:admin|administrator|login|dashboard|phpMyAdmin)/i, name: 'ADMIN_PROBE' }
	]

	// Use a single regex test for better performance
	for (const { pattern, name } of urlPatterns) {
		if (pattern.test(decodeURIComponent(url))) {  // Handle URL-encoded attacks
			suspiciousPatterns.push(name)
		}
	}

	// Check for suspicious user agents with more comprehensive patterns
	const botPatterns = [
		/(?:bot|crawler|spider|scraper)(?!-google)/i,  // Exclude legitimate crawlers
		/(?:curl|wget|python-|java\/|go-http|postman)/i,
		/(?:scanner|exploit|attack|acunetix|netsparker)/i,
		/(?:sqlmap|nikto|nmap|masscan|whatweb|dirbuster)/i,
		/(?:burp|hydra|brutus|havij|webshell)/i
	]

	// Use a single test for all bot patterns
	if (botPatterns.some(pattern => pattern.test(userAgent))) {
		suspiciousPatterns.push('SUSPICIOUS_USER_AGENT')
	}

	return [...new Set(suspiciousPatterns)]
}

export default defineEventHandler(async (event) => {
	// Only apply to API routes
	if (!event.node.req.url?.startsWith('/api/')) {
		return
	}

	const startTime = Date.now()
	const { ip, userAgent } = getClientInfo(event)
	const method = event.node.req.method || 'UNKNOWN'
	const url = event.node.req.url || ''

	// Log all API requests
	logSecurityEvent({
		timestamp: new Date().toISOString(),
		ip,
		userAgent,
		method,
		url,
		event: 'API_REQUEST'
	})

	// Check for suspicious patterns
	const suspiciousPatterns = detectSuspiciousPatterns(url, userAgent)
	if (suspiciousPatterns.length > 0) {
		logSecurityEvent({
			timestamp: new Date().toISOString(),
			ip,
			userAgent,
			method,
			url,
			event: 'SUSPICIOUS_ACTIVITY',
			details: { patterns: suspiciousPatterns }
		})

		// Block obviously malicious requests
		const blockPatterns = ['PATH_TRAVERSAL', 'FILE_ACCESS_ATTEMPT', 'SYSTEM_ACCESS_ATTEMPT', 'SQL_INJECTION']
		const shouldBlock = suspiciousPatterns.some(pattern => blockPatterns.includes(pattern))

		if (shouldBlock) {
			logSecurityEvent({
				timestamp: new Date().toISOString(),
				ip,
				userAgent,
				method,
				url,
				statusCode: 403,
				event: 'REQUEST_BLOCKED',
				details: { reason: 'Malicious pattern detected', patterns: suspiciousPatterns }
			})

			throw createError({
				statusCode: 403,
				statusMessage: 'Forbidden'
			})
		}
	}

	// Monitor request completion
	event.node.res.on('finish', () => {
		const duration = Date.now() - startTime
		const statusCode = event.node.res.statusCode

		// Log completed request
		logSecurityEvent({
			timestamp: new Date().toISOString(),
			ip,
			userAgent,
			method,
			url,
			statusCode,
			event: 'REQUEST_COMPLETED',
			details: { duration }
		})

		// Log failed requests for monitoring
		if (statusCode >= 400) {
			logSecurityEvent({
				timestamp: new Date().toISOString(),
				ip,
				userAgent,
				method,
				url,
				statusCode,
				event: 'REQUEST_FAILED',
				details: { duration }
			})
		}
	})
})

// Export function to get security events (for monitoring dashboard)
export function getSecurityEvents(limit = 100): SecurityEvent[] {
	return securityEvents.slice(-limit)
}
