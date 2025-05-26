/**
 * @file: 07.RATE-LIMITING.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.1
 *
 * @description:
 * Rate limiting middleware with multiple strategies.
 * Provides global rate limiting, endpoint-specific limits, and burst protection.
 */

interface RateLimitRecord {
	count: number
	resetTime: number
	firstRequest: number
}

interface BurstProtectionRecord {
	requests: number[]
	blocked: boolean
	blockUntil: number
}

// Rate limit stores
const globalRateLimit = new Map<string, RateLimitRecord>()
const endpointRateLimit = new Map<string, RateLimitRecord>()
const burstProtection = new Map<string, BurstProtectionRecord>()

// Configuration
const GLOBAL_WINDOW = 60 * 1000 // 1 minute
const GLOBAL_MAX_REQUESTS = 60 // 60 requests per minute per IP

const ENDPOINT_LIMITS = {
	'/api/contact': {
		window: 5 * 60 * 1000, // 5 minutes (reduced from 15)
		maxRequests: 5 // 5 requests per 5 minutes (increased from 3)
	},
	'/api/data': {
		window: 60 * 1000, // 1 minute
		maxRequests: 30 // 30 requests per minute
	}
}

// Burst protection: block if more than 10 requests in 10 seconds
const BURST_WINDOW = 10 * 1000 // 10 seconds
const BURST_THRESHOLD = 10
const BURST_BLOCK_DURATION = 5 * 60 * 1000 // 5 minutes

function cleanupExpiredRecords() {
	const now = Date.now()

	// Cleanup global rate limit
	for (const [ip, record] of globalRateLimit.entries()) {
		if (now > record.resetTime) {
			globalRateLimit.delete(ip)
		}
	}

	// Cleanup endpoint rate limit
	for (const [key, record] of endpointRateLimit.entries()) {
		if (now > record.resetTime) {
			endpointRateLimit.delete(key)
		}
	}

	// Cleanup burst protection
	for (const [ip, record] of burstProtection.entries()) {
		if (now > record.blockUntil) {
			burstProtection.delete(ip)
		}
	}
}

function checkGlobalRateLimit(ip: string): { allowed: boolean; resetTime?: number; remaining?: number } {
	const now = Date.now()
	const record = globalRateLimit.get(ip)

	if (!record || now > record.resetTime) {
		// Reset or create new record
		globalRateLimit.set(ip, {
			count: 1,
			resetTime: now + GLOBAL_WINDOW,
			firstRequest: now
		})
		return { allowed: true, remaining: GLOBAL_MAX_REQUESTS - 1 }
	}

	if (record.count >= GLOBAL_MAX_REQUESTS) {
		return { allowed: false, resetTime: record.resetTime, remaining: 0 }
	}

	// Increment count
	record.count++
	globalRateLimit.set(ip, record)
	return { allowed: true, remaining: GLOBAL_MAX_REQUESTS - record.count }
}

function checkEndpointRateLimit(ip: string, endpoint: string): { allowed: boolean; resetTime?: number } {
	const config = ENDPOINT_LIMITS[endpoint as keyof typeof ENDPOINT_LIMITS]
	if (!config) return { allowed: true }

	const now = Date.now()
	const key = `${ip}:${endpoint}`
	const record = endpointRateLimit.get(key)

	if (!record || now > record.resetTime) {
		// Reset or create new record
		endpointRateLimit.set(key, {
			count: 1,
			resetTime: now + config.window,
			firstRequest: now
		})
		return { allowed: true }
	}

	if (record.count >= config.maxRequests) {
		return { allowed: false, resetTime: record.resetTime }
	}

	// Increment count
	record.count++
	endpointRateLimit.set(key, record)
	return { allowed: true }
}

function checkBurstProtection(ip: string): { allowed: boolean; blockUntil?: number } {
	const now = Date.now()
	let record = burstProtection.get(ip)

	if (!record) {
		record = {
			requests: [now],
			blocked: false,
			blockUntil: 0
		}
		burstProtection.set(ip, record)
		return { allowed: true }
	}

	// Check if still blocked
	if (record.blocked && now < record.blockUntil) {
		return { allowed: false, blockUntil: record.blockUntil }
	}

	// Reset if block period expired
	if (record.blocked && now >= record.blockUntil) {
		record.blocked = false
		record.requests = [now]
		burstProtection.set(ip, record)
		return { allowed: true }
	}

	// Add current request
	record.requests.push(now)

	// Remove old requests outside the burst window
	record.requests = record.requests.filter(time => now - time <= BURST_WINDOW)

	// Check if burst threshold exceeded
	if (record.requests.length > BURST_THRESHOLD) {
		record.blocked = true
		record.blockUntil = now + BURST_BLOCK_DURATION
		burstProtection.set(ip, record)
		return { allowed: false, blockUntil: record.blockUntil }
	}

	burstProtection.set(ip, record)
	return { allowed: true }
}

export default defineEventHandler(async (event) => {
	// Only apply to API routes
	if (!event.node.req.url?.startsWith('/api/')) {
		return
	}

	// Cleanup expired records periodically
	if (Math.random() < 0.01) { // 1% chance to cleanup
		cleanupExpiredRecords()
	}

	const ip = (getHeader(event, 'x-forwarded-for') as string) ||
		(getHeader(event, 'x-real-ip') as string) ||
		(event.node.req.socket.remoteAddress) ||
		'unknown'

	const url = event.node.req.url || ''
	const method = event.node.req.method || 'GET'

	// Skip rate limiting for GET requests to data endpoints in development
	if (process.env.NODE_ENV === 'development' && method === 'GET' && url.startsWith('/api/data/')) {
		return
	}

	// Check burst protection first
	const burstResult = checkBurstProtection(ip)
	if (!burstResult.allowed) {
		const waitTime = burstResult.blockUntil ? Math.ceil((burstResult.blockUntil - Date.now()) / 1000 / 60) : 5
		console.warn(`🚫 RATE-LIMIT: Burst protection triggered for IP ${ip}`)

		throw createError({
			statusCode: 429,
			statusMessage: `Too Many Requests: Burst limit exceeded. Try again in ${waitTime} minutes.`
		})
	}

	// Check global rate limit
	const globalResult = checkGlobalRateLimit(ip)
	if (!globalResult.allowed) {
		const waitTime = globalResult.resetTime ? Math.ceil((globalResult.resetTime - Date.now()) / 1000 / 60) : 1
		console.warn(`🚫 RATE-LIMIT: Global rate limit exceeded for IP ${ip}`)

		setHeader(event, 'X-RateLimit-Limit', GLOBAL_MAX_REQUESTS.toString())
		setHeader(event, 'X-RateLimit-Remaining', '0')
		setHeader(event, 'X-RateLimit-Reset', globalResult.resetTime?.toString() || '')

		throw createError({
			statusCode: 429,
			statusMessage: `Too Many Requests: Global limit exceeded. Try again in ${waitTime} minute(s).`
		})
	}

	// Check endpoint-specific rate limit
	const endpointResult = checkEndpointRateLimit(ip, url)
	if (!endpointResult.allowed) {
		const waitTime = endpointResult.resetTime ? Math.ceil((endpointResult.resetTime - Date.now()) / 1000 / 60) : 15
		console.warn(`🚫 RATE-LIMIT: Endpoint rate limit exceeded for IP ${ip} on ${url}`)

		throw createError({
			statusCode: 429,
			statusMessage: `Too Many Requests: Endpoint limit exceeded. Try again in ${waitTime} minute(s).`
		})
	}

	// Add rate limit headers for successful requests
	setHeader(event, 'X-RateLimit-Limit', GLOBAL_MAX_REQUESTS.toString())
	setHeader(event, 'X-RateLimit-Remaining', (globalResult.remaining || 0).toString())
})
