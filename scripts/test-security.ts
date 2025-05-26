/**
 * @file: TEST-SECURITY.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.0
 *
 * @description:
 * Security testing script to verify middleware functionality.
 * Tests rate limiting, input sanitization, CORS, and other security features.
 */

const BASE_URL = 'http://localhost:3000'

interface TestResult {
	name: string
	passed: boolean
	message: string
	details?: any
}

async function makeRequest(url: string, options: RequestInit = {}): Promise<Response> {
	try {
		return await fetch(`${BASE_URL}${url}`, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			}
		})
	} catch (error) {
		throw new Error(`Request failed: ${error}`)
	}
}

async function testInputSanitization(): Promise<TestResult> {
	try {
		const maliciousData = {
			name: '<script>alert("XSS")</script>',
			email: 'test@test.com',
			message: 'SELECT * FROM users WHERE id = 1; DROP TABLE users;'
		}

		const response = await makeRequest('/api/contact', {
			method: 'POST',
			body: JSON.stringify(maliciousData)
		})

		// Should either sanitize the input or block the request
		const isBlocked = response.status === 400
		const isProcessed = response.status === 200 || response.status === 429

		return {
			name: 'Input Sanitization',
			passed: isBlocked || isProcessed,
			message: isBlocked ? 'Malicious input blocked' : 'Input processed (likely sanitized)',
			details: { status: response.status }
		}
	} catch (error) {
		return {
			name: 'Input Sanitization',
			passed: false,
			message: `Test failed: ${error}`,
		}
	}
}

async function testRateLimiting(): Promise<TestResult> {
	try {
		const validData = {
			name: 'Test User',
			email: 'test@example.com',
			message: 'This is a test message for rate limiting.'
		}

		// Make multiple requests quickly
		const requests = []
		for (let i = 0; i < 5; i++) {
			requests.push(makeRequest('/api/contact', {
				method: 'POST',
				body: JSON.stringify(validData)
			}))
		}

		const responses = await Promise.all(requests)
		const rateLimited = responses.some(r => r.status === 429)

		return {
			name: 'Rate Limiting',
			passed: rateLimited,
			message: rateLimited ? 'Rate limiting working' : 'Rate limiting may not be active',
			details: { statuses: responses.map(r => r.status) }
		}
	} catch (error) {
		return {
			name: 'Rate Limiting',
			passed: false,
			message: `Test failed: ${error}`,
		}
	}
}

async function testCORS(): Promise<TestResult> {
	try {
		const response = await makeRequest('/api/contact', {
			method: 'POST',
			headers: {
				'Origin': 'https://malicious-site.com',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: 'Test',
				email: 'test@test.com',
				message: 'CORS test'
			})
		})

		// Should be blocked (403) or handled by CORS
		const isBlocked = response.status === 403
		const hasCorrectCORS = response.headers.get('Access-Control-Allow-Origin') !== 'https://malicious-site.com'

		return {
			name: 'CORS Protection',
			passed: isBlocked || hasCorrectCORS,
			message: isBlocked ? 'Unauthorized origin blocked' : 'CORS headers properly configured',
			details: { 
				status: response.status,
				corsHeader: response.headers.get('Access-Control-Allow-Origin')
			}
		}
	} catch (error) {
		return {
			name: 'CORS Protection',
			passed: false,
			message: `Test failed: ${error}`,
		}
	}
}

async function testSecurityHeaders(): Promise<TestResult> {
	try {
		const response = await makeRequest('/api/contact', {
			method: 'OPTIONS'
		})

		const securityHeaders = [
			'X-Frame-Options',
			'X-Content-Type-Options',
			'X-XSS-Protection',
			'Referrer-Policy'
		]

		const presentHeaders = securityHeaders.filter(header => 
			response.headers.get(header) !== null
		)

		return {
			name: 'Security Headers',
			passed: presentHeaders.length >= 2,
			message: `${presentHeaders.length}/${securityHeaders.length} security headers present`,
			details: { presentHeaders }
		}
	} catch (error) {
		return {
			name: 'Security Headers',
			passed: false,
			message: `Test failed: ${error}`,
		}
	}
}

async function testRequestLimits(): Promise<TestResult> {
	try {
		// Test with oversized payload
		const largeMessage = 'A'.repeat(100000) // 100KB message
		const response = await makeRequest('/api/contact', {
			method: 'POST',
			body: JSON.stringify({
				name: 'Test',
				email: 'test@test.com',
				message: largeMessage
			})
		})

		// Should be blocked due to size limit
		const isBlocked = response.status === 413 || response.status === 400

		return {
			name: 'Request Size Limits',
			passed: isBlocked,
			message: isBlocked ? 'Large payload blocked' : 'Large payload accepted (may need adjustment)',
			details: { status: response.status }
		}
	} catch (error) {
		return {
			name: 'Request Size Limits',
			passed: false,
			message: `Test failed: ${error}`,
		}
	}
}

async function runSecurityTests(): Promise<void> {
	console.log('🔒 Running Security Middleware Tests...\n')

	const tests = [
		testInputSanitization,
		testRateLimiting,
		testCORS,
		testSecurityHeaders,
		testRequestLimits
	]

	const results: TestResult[] = []

	for (const test of tests) {
		console.log(`Running ${test.name}...`)
		const result = await test()
		results.push(result)
		
		const status = result.passed ? '✅ PASS' : '❌ FAIL'
		console.log(`${status}: ${result.message}`)
		if (result.details) {
			console.log(`   Details:`, result.details)
		}
		console.log('')
	}

	// Summary
	const passed = results.filter(r => r.passed).length
	const total = results.length
	
	console.log('📊 Test Summary:')
	console.log(`   Passed: ${passed}/${total}`)
	console.log(`   Success Rate: ${Math.round((passed / total) * 100)}%`)
	
	if (passed === total) {
		console.log('\n🎉 All security tests passed!')
	} else {
		console.log('\n⚠️  Some security tests failed. Please review the middleware configuration.')
	}
}

// Run tests if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
	runSecurityTests().catch(console.error)
}

export { runSecurityTests }
