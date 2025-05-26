/**
 * @file: MAIL.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 2.0.0
 *
 * @description:
 * Mail service using Nodemailer with Gmail SMTP for sending emails.
 * Provides a robust, type-safe solution for handling contact form submissions.
 * Includes comprehensive error handling, connection pooling, and configuration validation.
 */

// ------------ TYPE-SAFE IMPORTS
import type {
	Transporter,
	SendMailOptions,
	SentMessageInfo,
	TransportOptions
} from 'nodemailer'

// Conditional import to handle both development and production environments
let nodemailer: typeof import('nodemailer')
try {
	nodemailer = require('nodemailer')
} catch (error) {
	console.error('❌ Nodemailer import failed:', error)
	throw new Error('Email service unavailable: Nodemailer not found')
}

// ------------ TYPE DEFINITIONS
export interface EmailOptions {
	to: string
	subject: string
	text?: string
	html?: string
	replyTo?: string
	cc?: string | string[]
	bcc?: string | string[]
	attachments?: Array<{
		filename: string
		content: string | Buffer
		contentType?: string
	}>
}

export interface ContactFormData {
	name: string
	email: string
	message: string
}

export interface EmailResponse {
	success: boolean
	messageId?: string
	error?: string
	details?: {
		accepted?: string[]
		rejected?: string[]
		pending?: string[]
		response?: string
	}
}

export interface MailServiceConfig {
	service: string
	host?: string
	port?: number
	secure?: boolean
	auth: {
		user: string
		pass: string
	}
	pool?: boolean
	maxConnections?: number
	maxMessages?: number
	rateDelta?: number
	rateLimit?: number
}

// For the first error, create a custom interface that extends TransportOptions
interface EnhancedTransportOptions extends TransportOptions {
	tls?: {
		rejectUnauthorized: boolean;
		minVersion: string;
	};
	connectionTimeout?: number;
	greetingTimeout?: number;
	socketTimeout?: number;
}

// ------------ MAIL SERVICE CLASS
export class MailService {
	private transporter: Transporter | null = null
	private isConfigured = false
	private config: MailServiceConfig | null = null
	private connectionPool = true
	private maxRetries = 3

	constructor() {
		this.initializeTransporter()
	}

	/**
	 * Initialize the email transporter with configuration
	 */
	private initializeTransporter(): void {
		const runtimeConfig = useRuntimeConfig()

		// Check if required environment variables are set
		if (!runtimeConfig.smtpUser || !runtimeConfig.smtpPass) {
			console.warn('⚠️ SMTP credentials not configured. Email service will be disabled.')
			return
		}

		try {
			// Configuration with connection pooling
			this.config = {
				service: 'gmail',
				auth: {
					user: runtimeConfig.smtpUser,
					pass: runtimeConfig.smtpPass // App password, not regular password
				},
				pool: this.connectionPool,
				maxConnections: 5,
				maxMessages: 10,
				rateDelta: 1000,
				rateLimit: 5,
				secure: true,
				port: 465
			}

			// Create transporter with options
			const transportOptions: EnhancedTransportOptions = {
				...this.config,
				tls: {
					rejectUnauthorized: false,
					minVersion: 'TLSv1.2'
				},
				connectionTimeout: 10000,
				greetingTimeout: 10000,
				socketTimeout: 30000
			}

			this.transporter = nodemailer.createTransport(transportOptions)
			this.isConfigured = true

			console.log('✅ Mail service initialized successfully with connection pooling')
		} catch (error) {
			console.error('❌ Failed to initialize mail service:', error)
			this.isConfigured = false
			this.transporter = null
		}
	}

	/**
	 * Verify the email configuration with retry mechanism
	 */
	async verifyConnection(): Promise<boolean> {
		if (!this.transporter || !this.isConfigured) {
			console.warn('📧 Mail service not configured')
			return false
		}

		let attempts = 0
		const maxAttempts = 3

		while (attempts < maxAttempts) {
			try {
				await this.transporter.verify()
				console.log('✅ Email configuration verified successfully')
				return true
			} catch (error) {
				attempts++
				console.error(`❌ Email verification attempt ${attempts} failed:`, error)

				if (attempts < maxAttempts) {
					// Wait before retry (exponential backoff)
					await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempts) * 1000))
				}
			}
		}

		console.error('❌ Email configuration verification failed after all attempts')
		return false
	}

	/**
	 * Send a generic email with error handling
	 */
	async sendEmail(options: EmailOptions): Promise<EmailResponse> {
		if (!this.transporter || !this.isConfigured) {
			return {
				success: false,
				error: 'Email service not configured or unavailable'
			}
		}

		// Validate required fields
		if (!options.to || !options.subject) {
			return {
				success: false,
				error: 'Missing required fields: recipient and subject are required'
			}
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(options.to)) {
			return {
				success: false,
				error: 'Invalid recipient email address format'
			}
		}

		let attempts = 0
		let lastError: Error | null = null

		while (attempts < this.maxRetries) {
			try {
				const runtimeConfig = useRuntimeConfig()
				const fromName = runtimeConfig.emailFromName || 'Portfolio Contact'

				const mailOptions: SendMailOptions = {
					from: `"${fromName}" <${this.config?.auth.user}>`,
					to: options.to,
					subject: options.subject,
					text: options.text,
					html: options.html,
					replyTo: options.replyTo,
					cc: options.cc,
					bcc: options.bcc,
					attachments: options.attachments,
					// Additional security headers
					headers: {
						'X-Mailer': 'Portfolio Contact Form',
						'X-Priority': '3'
					}
				}

				const result: SentMessageInfo = await this.transporter.sendMail(mailOptions)

				// Log successful send
				console.log(`✅ Email sent successfully to ${options.to}`, {
					messageId: result.messageId,
					accepted: result.accepted?.length || 0,
					rejected: result.rejected?.length || 0
				})

				return {
					success: true,
					messageId: result.messageId,
					details: {
						accepted: result.accepted,
						rejected: result.rejected,
						pending: result.pending,
						response: result.response
					}
				}
			} catch (error) {
				attempts++
				lastError = error instanceof Error ? error : new Error(String(error))

				console.error(`❌ Email send attempt ${attempts} failed:`, {
					error: lastError.message,
					to: options.to,
					subject: options.subject
				})

				// Don't retry on authentication errors
				if (lastError.message.includes('Authentication') ||
					lastError.message.includes('Invalid login')) {
					break
				}

				if (attempts < this.maxRetries) {
					// Wait before retry (exponential backoff)
					await new Promise(resolve =>
						setTimeout(resolve, Math.pow(2, attempts) * 1000)
					)
				}
			}
		}

		return {
			success: false,
			error: lastError?.message || 'Unknown error occurred while sending email'
		}
	}

	/**
	 * Send contact form email with template
	 */
	async sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
		const runtimeConfig = useRuntimeConfig()
		const recipientEmail = runtimeConfig.contactEmail || this.config?.auth.user

		if (!recipientEmail) {
			return {
				success: false,
				error: 'No recipient email configured'
			}
		}

		// Validate contact form data
		const validation = this.validateContactData(data)
		if (!validation.valid) {
			return {
				success: false,
				error: `Validation failed: ${validation.errors.join(', ')}`
			}
		}

		// Sanitize data to prevent XSS
		const sanitizedData: ContactFormData = {
			name: this.sanitizeInput(data.name),
			email: this.sanitizeInput(data.email),
			message: this.sanitizeInput(data.message)
		}

		// Create email templates
		const { htmlContent, textContent } = this.createContactTemplate(sanitizedData)

		return await this.sendEmail({
			to: recipientEmail,
			subject: `Portfolio Contact: Message from ${sanitizedData.name}`,
			html: htmlContent,
			text: textContent,
			replyTo: sanitizedData.email
		})
	}

	/**
	 * Validate contact form data
	 */
	private validateContactData(data: ContactFormData): { valid: boolean; errors: string[] } {
		const errors: string[] = []

		if (!data.name || data.name.trim().length < 2) {
			errors.push('Name must be at least 2 characters long')
		}
		if (!data.name || data.name.trim().length > 100) {
			errors.push('Name must be less than 100 characters')
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!data.email || !emailRegex.test(data.email)) {
			errors.push('Valid email address is required')
		}

		if (!data.message || data.message.trim().length < 10) {
			errors.push('Message must be at least 10 characters long')
		}
		if (!data.message || data.message.trim().length > 5000) {
			errors.push('Message must be less than 5000 characters')
		}

		return {
			valid: errors.length === 0,
			errors
		}
	}

	/**
	 * Sanitize input to prevent XSS attacks
	 */
	private sanitizeInput(input: string): string {
		return input
			.trim()
			.replace(/[<>]/g, '')
			.replace(/javascript:/gi, '')
			.replace(/on\w+=/gi, '')
	}

	/**
	 * Create HTML email template
	 */
	private createContactTemplate(data: ContactFormData): {
		htmlContent: string;
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
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      font-size: 24px;
      margin-bottom: 8px;
      font-weight: 600;
    }
    .header p {
      opacity: 0.9;
      font-size: 16px;
    }
    .content {
      padding: 30px 20px;
    }
    .field {
      margin-bottom: 20px;
      background: #f8f9fa;
      border-radius: 8px;
      padding: 16px;
      border-left: 4px solid #667eea;
    }
    .label {
      font-weight: 600;
      color: #495057;
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      color: #212529;
      font-size: 16px;
      line-height: 1.5;
    }
    .message-content {
      white-space: pre-wrap;
      background: white;
      padding: 16px;
      border-radius: 6px;
      border: 1px solid #e9ecef;
      margin-top: 8px;
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
      background: #f8f9fa;
      padding: 20px;
      text-align: center;
      color: #6c757d;
      font-size: 14px;
      border-top: 1px solid #e9ecef;
    }
    .timestamp {
      color: #6c757d;
      font-size: 13px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e9ecef;
    }
    .priority {
      display: inline-block;
      background: #28a745;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 New Contact Message</h1>
      <p>You have received a new message from your portfolio website</p>
    </div>

    <div class="content">
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="priority">New Message</span>
      </div>

      <div class="field">
        <span class="label">👤 Contact Name</span>
        <div class="value">${this.escapeHtml(data.name)}</div>
      </div>

      <div class="field">
        <span class="label">📧 Email Address</span>
        <div class="value">
          <a href="mailto:${this.escapeHtml(data.email)}" class="email-link">
            ${this.escapeHtml(data.email)}
          </a>
        </div>
      </div>

      <div class="field">
        <span class="label">💬 Message</span>
        <div class="value">
          <div class="message-content">${this.escapeHtml(data.message)}</div>
        </div>
      </div>

      <div class="timestamp">
        <strong>Received:</strong> ${timestamp}
      </div>
    </div>

    <div class="footer">
      <p><strong>Next Steps:</strong></p>
      <p>Reply directly to this email to respond to ${this.escapeHtml(data.name)}.</p>
      <p style="margin-top: 12px; font-size: 13px;">
        This message was automatically generated from your portfolio contact form.
      </p>
    </div>
  </div>
</body>
</html>`

		const textContent = `
NEW PORTFOLIO CONTACT MESSAGE
============================

Contact Details:
• Name: ${data.name}
• Email: ${data.email}
• Received: ${timestamp}

Message:
--------
${data.message}

============================
Reply directly to this email to respond to ${data.name}.
This message was sent from your portfolio contact form.
`.trim()

		return { htmlContent, textContent }
	}

	/**
	 * HTML escaping to prevent XSS
	 */
	private escapeHtml(text: string): string {
		const htmlEscapeMap: Record<string, string> = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;',
			'/': '&#x2F;'
		}

		return text.replace(/[&<>"'/]/g, (match) => htmlEscapeMap[match] || match)
	}

	/**
	 * Close transporter connection (useful for cleanup)
	 */
	async close(): Promise<void> {
		if (this.transporter && this.connectionPool) {
			try {
				this.transporter.close()
				console.log('📧 Mail service connection closed')
			} catch (error) {
				console.error('❌ Error closing mail service:', error)
			}
		}
	}

	/**
	 * Get service status
	 */
	getStatus(): {
		configured: boolean
		connected: boolean
		config: Partial<MailServiceConfig> | null
	} {
		return {
			configured: this.isConfigured,
			connected: this.transporter !== null,
			config: this.config ? {
				service: this.config.service,
				pool: this.config.pool,
				maxConnections: this.config.maxConnections
			} : null
		}
	}
}

// ------------ SINGLETON INSTANCE WITH MANAGEMENT
class MailServiceManager {
	private static instance: MailService | null = null

	static getInstance(): MailService {
		if (!this.instance) {
			this.instance = new MailService()
		}
		return this.instance
	}

	static async resetInstance(): Promise<void> {
		if (this.instance) {
			await this.instance.close()
			this.instance = null
		}
	}
}

// ------------ UTILITY FUNCTIONS
/**
 * Get the mail service singleton instance
 */
export function getMailService(): MailService {
	return MailServiceManager.getInstance()
}

/**
 * Send contact form email with error handling
 */
export async function sendContactFormEmail(data: ContactFormData): Promise<EmailResponse> {
	try {
		const mailService = getMailService()
		return await mailService.sendContactEmail(data)
	} catch (error) {
		console.error('❌ Critical error in contact form email service:', error)
		return {
			success: false,
			error: 'Email service temporarily unavailable. Please try again later.'
		}
	}
}

/**
 * Verify email service configuration with detailed diagnostics
 */
export async function verifyEmailService(): Promise<{
	success: boolean
	status: string
	details: any
}> {
	try {
		const mailService = getMailService()
		const status = mailService.getStatus()

		if (!status.configured) {
			return {
				success: false,
				status: 'Not configured - missing SMTP credentials',
				details: status
			}
		}

		const verified = await mailService.verifyConnection()

		return {
			success: verified,
			status: verified ? 'Service ready' : 'Connection failed',
			details: { ...status, verified }
		}
	} catch (error) {
		return {
			success: false,
			status: 'Service error',
			details: { error: error instanceof Error ? error.message : 'Unknown error' }
		}
	}
}

/**
 * Reset mail service (useful for configuration changes)
 */
export async function resetMailService(): Promise<void> {
	await MailServiceManager.resetInstance()
}
