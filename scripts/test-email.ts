/**
 * @file: TEST-EMAIL.TS
 * @author: BleckWolf25
 * @license: MIT
 * @version: 1.0.0
 * 
 * @description:
 *   Test script to verify email service configuration.
 *   Run this script to test if your email setup is working correctly.
 */

import { sendContactFormEmail, verifyEmailService } from '../server/api/services/mail'

async function testEmailService() {
  console.log('🧪 Testing Email Service Configuration...\n')

  // Test 1: Verify email service configuration
  console.log('1️⃣ Verifying email service configuration...')
  try {
    const isConfigured = await verifyEmailService()
    if (isConfigured) {
      console.log('✅ Email service is properly configured')
    } else {
      console.log('❌ Email service configuration failed')
      console.log('💡 Check your environment variables in .env file')
      return
    }
  } catch (error) {
    console.error('❌ Error verifying email service:', error)
    return
  }

  console.log('')

  // Test 2: Send a test email
  console.log('2️⃣ Sending test email...')
  try {
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message from the portfolio contact form. If you receive this, your email service is working correctly!'
    }

    const result = await sendContactFormEmail(testData)
    
    if (result.success) {
      console.log('✅ Test email sent successfully!')
      console.log(`📧 Message ID: ${result.messageId}`)
      console.log('📬 Check your inbox for the test email')
    } else {
      console.log('❌ Failed to send test email')
      console.log(`🔍 Error: ${result.error}`)
    }
  } catch (error) {
    console.error('❌ Error sending test email:', error)
  }

  console.log('\n🎉 Email service test completed!')
}

// Run the test
testEmailService().catch(console.error)
