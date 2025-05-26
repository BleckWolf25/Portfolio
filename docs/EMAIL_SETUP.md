# Email Service Setup Guide

This guide will help you set up the email service for your portfolio contact form. The implementation uses **Nodemailer with Gmail SMTP** as a 100% free solution that works on Windows, macOS, and Linux.

## 🚀 Quick Setup

### 1. Gmail Configuration (Recommended - Free)

#### Step 1: Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled

#### Step 2: Generate App Password

1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" as the app
3. Select "Other" as the device and name it "Portfolio Contact Form"
4. Copy the generated 16-character password

#### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:

   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password
   CONTACT_EMAIL=your-email@gmail.com
   ```

### 2. Test the Setup

Start your development server:

```bash
npm run dev
```

Navigate to the contact form and send a test message. Check your email inbox for the message.

## 🔧 Alternative Free Email Services

### SendGrid (100 emails/day free)

```env
# Instead of Gmail SMTP, use SendGrid API
SENDGRID_API_KEY=your-sendgrid-api-key
```

### Mailgun (5,000 emails/month for 3 months)

```env
MAILGUN_API_KEY=your-mailgun-api-key
MAILGUN_DOMAIN=your-mailgun-domain
```

### Resend (3,000 emails/month free)

```env
RESEND_API_KEY=your-resend-api-key
```

## 🛡️ Security Features

### Rate Limiting

- **Default**: 3 emails per 15 minutes per IP address
- **Configurable** via environment variables:

  ```env
  RATE_LIMIT_WINDOW_MINUTES=15
  RATE_LIMIT_MAX_REQUESTS=3
  ```

### Spam Protection

- Automatic detection of spam patterns
- URL and repeated character filtering
- Suspicious word detection
- **Enable/Disable**:

  ```env
  ENABLE_SPAM_PROTECTION=true
  ```

### Input Validation

- Email format validation
- Message length limits (10-5000 characters)
- Name length limits (2-100 characters)
- HTML sanitization to prevent XSS

## 📧 Email Template

The service sends beautifully formatted HTML emails with:

- Professional styling with gradients
- Responsive design
- Plain text fallback
- Reply-to functionality
- Sender information

## 🔍 Troubleshooting

### Common Issues

#### "Email service not configured"

- Check that `SMTP_USER` and `SMTP_PASS` are set in `.env`
- Verify the App Password is correct (16 characters, no spaces)

#### "Authentication failed"

- Ensure 2-Factor Authentication is enabled on Gmail
- Regenerate the App Password
- Check for typos in email address

#### "Connection timeout"

- Check your internet connection
- Verify firewall settings allow SMTP connections
- Try using a different network

#### Rate limiting errors

- Wait for the rate limit window to reset
- Adjust rate limiting settings if needed

### Debug Mode

Enable debug logging by setting:

```env
NODE_ENV=development
```

## 🌐 Deployment Considerations

### Vercel

Add environment variables in your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all required variables from your `.env` file

### Netlify

Add environment variables in Netlify:

1. Go to Site settings > Environment variables
2. Add all required variables

### Other Platforms

Most hosting platforms support environment variables. Consult your platform's documentation.

## 📊 Monitoring

The service logs:

- ✅ Successful email sends
- ❌ Failed attempts
- 🚫 Spam detection
- ⏱️ Rate limit hits

Check your server logs for monitoring information.

## 🔒 Privacy & GDPR

The service:

- Does not store user data permanently
- Only processes data for email sending
- Includes sender IP for rate limiting (temporary)
- Complies with basic privacy requirements

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify your environment variables
3. Test with a simple email client first
4. Check server logs for error messages

## 🎯 Features

- ✅ 100% Free solution
- ✅ Cross-platform compatibility
- ✅ Professional email templates
- ✅ Spam protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling
- ✅ TypeScript support
- ✅ Accessibility compliant
- ✅ Mobile responsive
