/**
 * @file: CONTACT.POST.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.1
 *
 * @description:
 * API endpoint for handling contact form submissions.
 * Validates form data, sends emails using the mail service, and returns appropriate responses.
 * Includes rate limiting and security measures to prevent spam.
 */

import { sendContactFormEmail } from './services/mail-brevo'
import type { ContactFormData, EmailResponse } from './services/mail-brevo'

// ------------ TYPES
interface ContactRequest {
	name: string
	email: string
	message: string
}

interface ContactResponse {
	success: boolean
	message: string
	error?: string
}

// ------------ VALIDATION HELPERS
function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

function validateName(name: string): boolean {
	return name.trim().length >= 2 && name.trim().length <= 100
}

function validateMessage(message: string): boolean {
	return message.trim().length >= 10 && message.trim().length <= 5000
}

function sanitizeInput(input: string): string {
	return input.trim().replace(/[<>]/g, '')
}

// ------------ RATE LIMITING (Simple in-memory store)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3 // Max 3 emails per 15 minutes per IP

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
	const now = Date.now()
	const record = rateLimitStore.get(ip)

	if (!record || now > record.resetTime) {
		// Reset or create new record
		rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
		return { allowed: true }
	}

	if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
		return { allowed: false, resetTime: record.resetTime }
	}

	// Increment count
	record.count++
	rateLimitStore.set(ip, record)
	return { allowed: true }
}

// ------------ MAIN HANDLER
export default defineEventHandler(async (event): Promise<ContactResponse> => {
	// Only allow POST requests
	if (event.node.req.method !== 'POST') {
		throw createError({
			statusCode: 405,
			statusMessage: 'Method Not Allowed'
		})
	}

	try {
		// Get client IP for rate limiting
		const clientIP = (getHeader(event, 'x-forwarded-for') as string) ||
			(getHeader(event, 'x-real-ip') as string) ||
			(event.node.req.socket.remoteAddress) ||
			'unknown'

		// Log request details for debugging
		console.log(`📧 CONTACT: Request from IP ${clientIP}, Origin: ${getHeader(event, 'origin')}, User-Agent: ${getHeader(event, 'user-agent')}`)
		console.log(`📧 CONTACT: Headers count: ${Object.keys(event.node.req.headers).length}`)
		console.log(`📧 CONTACT: Content-Type: ${getHeader(event, 'content-type')}`)
		console.log(`📧 CONTACT: Method: ${event.node.req.method}`)
		console.log(`📧 CONTACT: URL: ${event.node.req.url}`)

		// Check rate limit
		const rateLimitResult = checkRateLimit(clientIP)
		if (!rateLimitResult.allowed) {
			const resetTime = rateLimitResult.resetTime
			const waitTime = resetTime ? Math.ceil((resetTime - Date.now()) / 1000 / 60) : 15

			throw createError({
				statusCode: 429,
				statusMessage: `Too Many Requests. Please try again in ${waitTime} minutes.`
			})
		}

		// Parse and validate request body
		const body = await readBody<ContactRequest>(event)

		if (!body || typeof body !== 'object') {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid request body'
			})
		}

		const { name, email, message } = body

		// Validate required fields
		if (!name || !email || !message) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Missing required fields: name, email, and message are required'
			})
		}

		// Validate field types
		if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid field types: all fields must be strings'
			})
		}

		// Sanitize inputs
		const sanitizedData: ContactFormData = {
			name: sanitizeInput(name),
			email: sanitizeInput(email),
			message: sanitizeInput(message)
		}

		// Validate sanitized data
		if (!validateName(sanitizedData.name)) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid name: must be between 2 and 100 characters'
			})
		}

		if (!validateEmail(sanitizedData.email)) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid email address format'
			})
		}

		if (!validateMessage(sanitizedData.message)) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid message: must be between 10 and 5000 characters'
			})
		}

		// Check for potential spam patterns
		const spamPatterns = [
			/\b(viagra|cialis|casino|lottery|winner|congratulations)\b/i,
			/\b(click here|visit now|act now|limited time)\b/i,
			/(http[s]?:\/\/[^\s]+){3,}/i, // Multiple URLs
			/(.)\1{10,}/, // Repeated characters
		]

		const combinedText = `${sanitizedData.name} ${sanitizedData.email} ${sanitizedData.message}`.toLowerCase()
		const isSpam = spamPatterns.some(pattern => pattern.test(combinedText))

		if (isSpam) {
			// Log potential spam but don't reveal to user
			console.warn(`Potential spam detected from IP ${clientIP}:`, sanitizedData)

			// Return success to prevent spam detection
			return {
				success: true,
				message: 'Thank you for your message! I will get back to you soon.'
			}
		}

		// Send email
		const emailResult: EmailResponse = await sendContactFormEmail(sanitizedData)

		if (!emailResult.success) {
			console.error('Failed to send contact email:', emailResult.error)

			throw createError({
				statusCode: 500,
				statusMessage: 'Failed to send message. Please try again later or contact me directly.'
			})
		}

		// Log successful submission
		console.log(`✅ Contact form submitted successfully from ${clientIP} by ${sanitizedData.name} (${sanitizedData.email})`)

		return {
			success: true,
			message: 'Thank you for your message! I will get back to you soon.'
		}

	} catch (error) {
		// Handle known errors
		if (error && typeof error === 'object' && 'statusCode' in error) {
			throw error
		}

		// Handle unexpected errors
		console.error('Unexpected error in contact form handler:', error)

		throw createError({
			statusCode: 500,
			statusMessage: 'An unexpected error occurred. Please try again later.'
		})
	}
})
