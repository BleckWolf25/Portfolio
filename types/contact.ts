/**
 * @file: CONTACT.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.0
 *
 * @description:
 * TypeScript type definitions for contact form and email functionality.
 * Provides type safety for contact form data, API responses, and email operations.
 */

// ------------ CONTACT FORM TYPES
export interface ContactFormData {
	name: string
	email: string
	message: string
}

export interface ContactFormErrors {
	name?: string
	email?: string
	message?: string
	general?: string
}

export interface ContactFormState {
	data: ContactFormData
	errors: ContactFormErrors
	loading: boolean
	success: boolean
	submitted: boolean
}

// ------------ API RESPONSE TYPES
export interface ContactApiResponse {
	success: boolean
	message: string
	error?: string
}

export interface ContactApiError {
	statusCode: number
	statusMessage: string
	data?: any
}

// ------------ EMAIL SERVICE TYPES
export interface EmailOptions {
	to: string
	subject: string
	text?: string
	html?: string
	replyTo?: string
}

export interface EmailResponse {
	success: boolean
	messageId?: string
	error?: string
}

// ------------ VALIDATION TYPES
export interface ValidationRule {
	required?: boolean
	minLength?: number
	maxLength?: number
	pattern?: RegExp
	custom?: (value: string) => boolean | string
}

export interface ValidationRules {
	name: ValidationRule
	email: ValidationRule
	message: ValidationRule
}

// ------------ EMAIL TEMPLATE TYPES
export interface EmailTemplateData {
	name: string
	email: string
	message: string
	timestamp: string
	userAgent?: string
	ipAddress?: string
}

export interface EmailTemplate {
	subject: string
	html: string
	text: string
}

// ------------ NOTIFICATION TYPES
export interface NotificationConfig {
	email: {
		enabled: boolean
		recipient: string
		template: 'default' | 'minimal' | 'detailed'
	}
	webhook?: {
		enabled: boolean
		url: string
		secret?: string
	}
	slack?: {
		enabled: boolean
		webhookUrl: string
		channel?: string
	}
}

// All types are already exported individually above
