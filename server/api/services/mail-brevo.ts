/**
 * @file: mail-brevo.ts
 * @author: BleckWolf25
 * @license: MIT
 * @version: 2.0.0
 *
 * @description:
 * Modern Brevo API-based mail service optimized for serverless deployment.
 * Uses Brevo's v3 REST API instead of SMTP for better reliability in Vercel.
 * Includes comprehensive error handling, retry logic, and rate limiting.
 */

// ------------ TYPE DEFINITIONS
export interface ContactFormData {
	name: string
	email: string
	message: string
}

export interface EmailResponse {
	success: boolean
	messageId?: string
	error?: string
	details?: any
}

export interface BrevoApiResponse {
	messageId: string
}

export interface BrevoApiError {
	code: string
	message: string
	details?: any
}

export interface BrevoEmailRequest {
	sender: {
		name: string
		email: string
	}
	to: Array<{
		name: string
		email: string
	}>
	subject: string
	htmlContent: string
	textContent: string
	replyTo?: {
		name: string
		email: string
	}
	headers?: Record<string, string>
	tags?: string[]
}

// ------------ CONFIGURATION
const BREVO_CONFIG = {
	apiUrl: 'https://api.brevo.com/v3/smtp/email',
	timeout: 30000, // 30 seconds timeout
	retryAttempts: 2,
	retryDelay: 1000, // 1 second initial delay
} as const

// ------------ BREVO API MAIL SERVICE
export class BrevoApiMailService {
	private static instance: BrevoApiMailService | null = null
	private apiKey: string
	private senderEmail: string
	private senderName: string
	private recipientEmail: string

	private constructor() {
		const runtimeConfig = useRuntimeConfig()

		// Validate required configuration
		if (!runtimeConfig.brevoApiKey) {
			throw new Error('BREVO_API_KEY environment variable is required')
		}
		if (!runtimeConfig.senderEmail) {
			throw new Error('SENDER_EMAIL environment variable is required')
		}
		if (!runtimeConfig.recipientEmail) {
			throw new Error('RECIPIENT_EMAIL environment variable is required')
		}

		this.apiKey = runtimeConfig.brevoApiKey
		this.senderEmail = runtimeConfig.senderEmail
		this.senderName = runtimeConfig.senderName || 'Portfolio Contact Form'
		this.recipientEmail = runtimeConfig.recipientEmail
	}

	/**
	 * Get singleton instance with lazy initialization
	 */
	static getInstance(): BrevoApiMailService {
		if (!this.instance) {
			this.instance = new BrevoApiMailService()
		}
		return this.instance
	}

	/**
	 * Send email using Brevo API with retry logic
	 */
	private async sendWithRetry(
		emailData: BrevoEmailRequest,
		attempt: number = 1
	): Promise<BrevoApiResponse> {
		try {
			const controller = new AbortController()
			const timeoutId = setTimeout(() => controller.abort(), BREVO_CONFIG.timeout)

			const response = await fetch(BREVO_CONFIG.apiUrl, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'api-key': this.apiKey,
				},
				body: JSON.stringify(emailData),
				signal: controller.signal,
			})

			clearTimeout(timeoutId)

			// Parse response
			const responseData = await response.json()

			if (!response.ok) {
				const error: BrevoApiError = {
					code: responseData.code || `HTTP_${response.status}`,
					message: responseData.message || response.statusText,
					details: responseData,
				}
				throw error
			}

			return responseData as BrevoApiResponse
		} catch (error) {
			// Handle network errors and retries
			if (attempt < BREVO_CONFIG.retryAttempts && this.isRetryableError(error)) {
				console.warn(`Brevo API attempt ${attempt} failed, retrying...`, error)

				// Exponential backoff
				const delay = BREVO_CONFIG.retryDelay * Math.pow(2, attempt - 1)
				await this.sleep(delay)

				return this.sendWithRetry(emailData, attempt + 1)
			}

			throw error
		}
	}

	/**
	 * Determine if an error is retryable
	 */
	private isRetryableError(error: any): boolean {
		// Retry on network errors, timeouts, and certain HTTP status codes
		if (error.name === 'AbortError') return true
		if (error.code && ['ECONNRESET', 'ENOTFOUND', 'ETIMEDOUT'].includes(error.code)) return true
		if (error.code && ['HTTP_429', 'HTTP_500', 'HTTP_502', 'HTTP_503', 'HTTP_504'].includes(error.code)) return true

		return false
	}

	/**
	 * Sleep utility for retry delays
	 */
	private sleep(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	/**
	 * Send contact form email via Brevo API
	 */
	async sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
		try {
			// Validate input data
			const validation = this.validateContactData(data)
			if (!validation.valid) {
				return {
					success: false,
					error: `Validation failed: ${validation.errors.join(', ')}`
				}
			}

			// Sanitize input data
			const sanitizedData = {
				name: this.sanitizeInput(data.name),
				email: this.sanitizeInput(data.email),
				message: this.sanitizeInput(data.message)
			}

			// Generate email content
			const { htmlContent, textContent } = this.createEmailTemplate(sanitizedData)

			// Prepare Brevo API request
			const emailRequest: BrevoEmailRequest = {
				sender: {
					name: this.senderName,
					email: this.senderEmail
				},
				to: [{
					name: 'Portfolio Owner',
					email: this.recipientEmail
				}],
				subject: `Portfolio Contact: Message from ${sanitizedData.name}`,
				htmlContent,
				textContent,
				replyTo: {
					name: sanitizedData.name,
					email: sanitizedData.email
				},
				headers: {
					'X-Mailer': 'Portfolio Contact Form v2.0',
					'X-Priority': '3',
					'X-Contact-Form': 'true'
				},
				tags: ['contact-form', 'portfolio']
			}

			// Send email via Brevo API
			const result = await this.sendWithRetry(emailRequest)

			// Log success
			console.log(`✅ Email sent successfully via Brevo API`, {
				messageId: result.messageId,
				from: sanitizedData.email,
				to: this.recipientEmail
			})

			return {
				success: true,
				messageId: result.messageId
			}

		} catch (error) {
			console.error('❌ Failed to send contact email via Brevo API:', error)

			// Parse error details for better debugging
			let errorMessage = 'Unknown error occurred'
			let errorDetails = undefined

			if (error && typeof error === 'object') {
				if ('message' in error) {
					errorMessage = error.message as string
				}
				if ('details' in error) {
					errorDetails = error.details
				}
			}

			return {
				success: false,
				error: errorMessage,
				details: errorDetails
			}
		}
	}

	/**
	 * Validate contact form data with comprehensive rules
	 */
	private validateContactData(data: ContactFormData): { valid: boolean; errors: string[] } {
		const errors: string[] = []

		// Name validation
		if (!data.name?.trim()) {
			errors.push('Name is required')
		} else if (data.name.trim().length < 2) {
			errors.push('Name must be at least 2 characters long')
		} else if (data.name.trim().length > 100) {
			errors.push('Name must be less than 100 characters')
		}

		// Email validation with more comprehensive regex
		const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
		if (!data.email?.trim()) {
			errors.push('Email is required')
		} else if (!emailRegex.test(data.email.trim())) {
			errors.push('Valid email address is required')
		} else if (data.email.trim().length > 254) {
			errors.push('Email address is too long')
		}

		// Message validation
		if (!data.message?.trim()) {
			errors.push('Message is required')
		} else if (data.message.trim().length < 10) {
			errors.push('Message must be at least 10 characters long')
		} else if (data.message.trim().length > 10000) {
			errors.push('Message must be less than 10000 characters')
		}

		return {
			valid: errors.length === 0,
			errors
		}
	}

	/**
	 * Input sanitization
	 */
	private sanitizeInput(input: string): string {
		return input
			.trim()
			.replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
			.replace(/[<>]/g, '') // Remove HTML brackets
			.replace(/javascript:/gi, '') // Remove javascript: protocol
			.replace(/on\w+\s*=/gi, '') // Remove event handlers
			.replace(/data:/gi, '') // Remove data: protocol
			.slice(0, 10000) // Limit length as additional safety
	}

	/**
	 * Create responsive email template with modern design
	 */
	private createEmailTemplate(data: ContactFormData): {
		htmlContent: string
		textContent: string
	} {
		const timestamp = new Date().toLocaleString('en-US', {
			timeZone: 'UTC',
			dateStyle: 'full',
			timeStyle: 'long'
		})

		const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Contact Message</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      margin: 0;
      padding: 20px;
      background-color: #f8fafc;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 32px 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 600;
    }
    .header p {
      margin: 0;
      opacity: 0.9;
      font-size: 16px;
    }
    .content {
      padding: 32px 24px;
    }
    .field {
      margin-bottom: 24px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 16px;
    }
    .field:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .label {
      font-weight: 600;
      color: #374151;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .value {
      font-size: 16px;
      color: #1f2937;
    }
    .message-content {
      background: #f8fafc;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      font-family: 'Courier New', monospace;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .email-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
    .email-link:hover {
      text-decoration: underline;
    }
    .footer {
      padding: 24px;
      background: #f8fafc;
      text-align: center;
      font-size: 14px;
      color: #6b7280;
    }
    @media (max-width: 600px) {
      body { padding: 10px; }
      .content, .header { padding: 24px 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Contact Message</h1>
      <p>Portfolio Contact Form</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">👤 From</div>
        <div class="value">${this.escapeHtml(data.name)}</div>
      </div>
      <div class="field">
        <div class="label">📧 Email Address</div>
        <div class="value">
          <a href="mailto:${this.escapeHtml(data.email)}" class="email-link">
            ${this.escapeHtml(data.email)}
          </a>
        </div>
      </div>
      <div class="field">
        <div class="label">💬 Message</div>
        <div class="value">
          <div class="message-content">${this.escapeHtml(data.message)}</div>
        </div>
      </div>
      <div class="field">
        <div class="label">🕒 Received</div>
        <div class="value">${timestamp}</div>
      </div>
    </div>
    <div class="footer">
      <p>Reply directly to this email to respond to ${this.escapeHtml(data.name)}</p>
    </div>
  </div>
</body>
</html>`

		const textContent = `
NEW PORTFOLIO CONTACT MESSAGE
============================

From: ${data.name}
Email: ${data.email}
Received: ${timestamp}

Message:
--------
${data.message}

============================
Reply directly to this email to respond.
Powered by Brevo API
`

		return { htmlContent, textContent }
	}

	/**
	 * HTML escaping for security
	 */
	private escapeHtml(text: string): string {
		const htmlEscapeMap: Record<string, string> = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#x27;',
			'/': '&#x2F;',
			'`': '&#x60;',
			'=': '&#x3D;'
		}
		return text.replace(/[&<>"'`=/]/g, (match) => htmlEscapeMap[match] || match)
	}
}

// ------------ UTILITY FUNCTIONS
/**
 * Send contact form email using Brevo API (main export)
 */
export async function sendContactFormEmail(data: ContactFormData): Promise<EmailResponse> {
	try {
		const mailService = BrevoApiMailService.getInstance()
		return await mailService.sendContactEmail(data)
	} catch (error) {
		console.error('❌ Critical error in Brevo API mail service:', error)
		return {
			success: false,
			error: 'Email service temporarily unavailable. Please try again later.',
			details: error
		}
	}
}

/**
 * Health check for Brevo API service
 */
export async function checkBrevoApiHealth(): Promise<{ healthy: boolean; details?: any }> {
	try {
		const runtimeConfig = useRuntimeConfig()

		if (!runtimeConfig.brevoApiKey) {
			return { healthy: false, details: 'API key not configured' }
		}

		// Simple API health check
		const response = await fetch('https://api.brevo.com/v3/account', {
			headers: {
				'Accept': 'application/json',
				'api-key': runtimeConfig.brevoApiKey,
			},
		})

		return {
			healthy: response.ok,
			details: response.ok ? 'API accessible' : `HTTP ${response.status}: ${response.statusText}`
		}
	} catch (error) {
		return {
			healthy: false,
			details: error instanceof Error ? error.message : 'Unknown error'
		}
	}
}
