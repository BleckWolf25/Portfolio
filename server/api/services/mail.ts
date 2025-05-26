/**
 * @file: MAIL.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.0
 *
 * @description:
 * Mail service using Nodemailer with Gmail SMTP for sending emails.
 * Provides a free, cross-platform solution for handling contact form submissions.
 * Supports both HTML and plain text emails with proper error handling.
 */

import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

// ------------ TYPES
export interface EmailOptions {
	to: string
	subject: string
	text?: string
	html?: string
	replyTo?: string
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
}

// ------------ MAIL SERVICE CLASS
export class MailService {
	private transporter: Transporter | null = null
	private isConfigured = false

	constructor() {
		this.initializeTransporter()
	}

	/**
	 * Initialize the email transporter with Gmail SMTP
	 */
	private initializeTransporter(): void {
		const config = useRuntimeConfig()

		// Check if required environment variables are set
		if (!config.smtpUser || !config.smtpPass) {
			console.warn('SMTP credentials not configured. Email service will be disabled.')
			return
		}

		try {
			this.transporter = nodemailer.createTransport({
				service: 'gmail',
				auth: {
					user: config.smtpUser,
					pass: config.smtpPass // App password, not regular password
				},
				secure: true,
				port: 465,
				tls: {
					rejectUnauthorized: false
				}
			})

			this.isConfigured = true
			console.log('✅ Mail service initialized successfully')
		} catch (error) {
			console.error('❌ Failed to initialize mail service:', error)
			this.isConfigured = false
		}
	}

	/**
	 * Verify the email configuration
	 */
	async verifyConnection(): Promise<boolean> {
		if (!this.transporter || !this.isConfigured) {
			return false
		}

		try {
			await this.transporter.verify()
			return true
		} catch (error) {
			console.error('Email configuration verification failed:', error)
			return false
		}
	}

	/**
	 * Send a generic email
	 */
	async sendEmail(options: EmailOptions): Promise<EmailResponse> {
		if (!this.transporter || !this.isConfigured) {
			return {
				success: false,
				error: 'Email service not configured'
			}
		}

		try {
			const config = useRuntimeConfig()

			const mailOptions = {
				from: `"Portfolio Contact" <${config.smtpUser}>`,
				to: options.to,
				subject: options.subject,
				text: options.text,
				html: options.html,
				replyTo: options.replyTo
			}

			const result = await this.transporter.sendMail(mailOptions)

			return {
				success: true,
				messageId: result.messageId
			}
		} catch (error) {
			console.error('Failed to send email:', error)
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error occurred'
			}
		}
	}

	/**
	 * Send contact form email
	 */
	async sendContactEmail(data: ContactFormData): Promise<EmailResponse> {
		const config = useRuntimeConfig()
		const recipientEmail = config.contactEmail || config.smtpUser

		if (!recipientEmail) {
			return {
				success: false,
				error: 'Recipient email not configured'
			}
		}

		// Create HTML email template
		const htmlContent = this.createContactEmailTemplate(data)

		// Create plain text version
		const textContent = this.createContactEmailText(data)

		return await this.sendEmail({
			to: recipientEmail,
			subject: `Portfolio Contact: Message from ${data.name}`,
			html: htmlContent,
			text: textContent,
			replyTo: data.email
		})
	}

	/**
	 * Create HTML email template for contact form
	 */
	private createContactEmailTemplate(data: ContactFormData): string {
		return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Message</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; border: 1px solid #ddd; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; display: block; margin-bottom: 5px; }
          .value { background: white; padding: 10px; border-radius: 4px; border: 1px solid #ddd; }
          .message-content { min-height: 100px; white-space: pre-wrap; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📧 New Contact Form Message</h1>
          <p>You have received a new message from your portfolio website</p>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">👤 Name:</span>
            <div class="value">${this.escapeHtml(data.name)}</div>
          </div>
          <div class="field">
            <span class="label">📧 Email:</span>
            <div class="value"><a href="mailto:${this.escapeHtml(data.email)}">${this.escapeHtml(data.email)}</a></div>
          </div>
          <div class="field">
            <span class="label">💬 Message:</span>
            <div class="value message-content">${this.escapeHtml(data.message)}</div>
          </div>
        </div>
        <div class="footer">
          <p>This message was sent from your portfolio contact form.</p>
          <p>You can reply directly to this email to respond to ${this.escapeHtml(data.name)}.</p>
        </div>
      </body>
      </html>
    `
	}

	/**
	 * Create plain text email for contact form
	 */
	private createContactEmailText(data: ContactFormData): string {
		return `
NEW CONTACT FORM MESSAGE
========================

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
This message was sent from your portfolio contact form.
You can reply directly to this email to respond to ${data.name}.
    `.trim()
	}

	/**
	 * Escape HTML characters to prevent XSS
	 */
	private escapeHtml(text: string): string {
		const map: { [key: string]: string } = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#039;'
		}
		return text.replace(/[&<>"']/g, (m) => map[m] || m)
	}
}

// ------------ SINGLETON INSTANCE
let mailServiceInstance: MailService | null = null

/**
 * Get the mail service singleton instance
 */
export function getMailService(): MailService {
	if (!mailServiceInstance) {
		mailServiceInstance = new MailService()
	}
	return mailServiceInstance
}

// ------------ UTILITY FUNCTIONS
/**
 * Quick function to send contact form email
 */
export async function sendContactFormEmail(data: ContactFormData): Promise<EmailResponse> {
	const mailService = getMailService()
	return await mailService.sendContactEmail(data)
}

/**
 * Verify email service configuration
 */
export async function verifyEmailService(): Promise<boolean> {
	const mailService = getMailService()
	return await mailService.verifyConnection()
}
