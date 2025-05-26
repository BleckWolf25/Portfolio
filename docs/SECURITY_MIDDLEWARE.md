# Security Middleware Documentation

This document describes the comprehensive security middleware implemented to protect the portfolio contact form and API endpoints from various attacks and vulnerabilities.

## 🛡️ Security Layers Overview

The security implementation follows a **defense-in-depth** strategy with multiple layers of protection:

### 1. Security Headers Middleware (`01.security-headers.ts`)

- **Content Security Policy (CSP)** - Prevents XSS attacks
- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME type sniffing
- **X-XSS-Protection** - Browser XSS protection
- **Strict-Transport-Security (HSTS)** - Forces HTTPS in production
- **Permissions-Policy** - Disables sensitive browser features

### 2. CORS Protection (`02.cors.ts`)

- **Origin validation** - Only allows requests from authorized domains
- **Preflight handling** - Proper CORS preflight request handling
- **Development flexibility** - Allows localhost in development mode

### 3. Request Limits (`03.request-limits.ts`)

- **URL length limits** - Prevents long URL attacks (max 2048 chars)
- **Body size limits** - Contact form: 50KB, Others: 10KB
- **Header limits** - Max 50 headers, 8KB per header
- **Request timeout monitoring** - Logs slow requests

### 4. Input Sanitization (`04.input-sanitization.ts`)

- **XSS prevention** - Removes malicious scripts and HTML
- **SQL injection detection** - Blocks SQL injection attempts
- **HTML sanitization** - Cleans dangerous HTML content
- **Recursive object sanitization** - Deep sanitization of nested objects
- **Control character removal** - Removes null bytes and control chars

### 5. Request Logging (`05.request-logging.ts`)

- **Security event logging** - Comprehensive audit trail
- **Suspicious pattern detection** - Identifies attack attempts
- **Real-time monitoring** - Immediate console logging
- **Attack blocking** - Automatically blocks malicious requests

### 6. CSRF Protection (`06.csrf-protection.ts`)

- **Origin validation** - Validates request origin/referer
- **Host verification** - Ensures requests come from valid hosts
- **Content-type checking** - Validates JSON content type
- **Custom header validation** - Checks for X-Requested-With header

### 7. Rate Limiting (`07.rate-limiting.ts`)

- **Global rate limiting** - 60 requests/minute per IP
- **Endpoint-specific limits** - Contact form: 3/15min, Data: 30/min
- **Burst protection** - Blocks >10 requests in 10 seconds
- **Automatic cleanup** - Removes expired rate limit records

## 🔧 Configuration

### Environment Variables

```env
# Security settings (optional)
ENABLE_SPAM_PROTECTION=true
RATE_LIMIT_WINDOW_MINUTES=15
RATE_LIMIT_MAX_REQUESTS=3
```

### Allowed Domains

Update the allowed domains in the middleware files:

- `02.cors.ts` - CORS origins
- `06.csrf-protection.ts` - CSRF validation hosts

```typescript
const allowedOrigins = [
  'https://yourdomain.com',
  'https://www.yourdomain.com',
  // Add your domains here
]
```

## 🚨 Security Events

### Monitored Events

- `API_REQUEST` - All API requests
- `SUSPICIOUS_ACTIVITY` - Detected attack patterns
- `REQUEST_BLOCKED` - Blocked malicious requests
- `REQUEST_FAILED` - Failed requests (4xx/5xx)
- `REQUEST_COMPLETED` - Successful requests

### Attack Patterns Detected

- **Path Traversal** - `../` patterns
- **File Access** - `/etc/passwd`, `/proc/` access
- **XSS Attempts** - `<script>` tags
- **SQL Injection** - SQL keywords and patterns
- **Command Injection** - `exec`, `eval` patterns
- **System Probes** - WordPress, admin, PHP probes

### Monitoring Dashboard

In development mode, access security events at:

```zsh
GET /api/security/events?limit=100&type=SUSPICIOUS_ACTIVITY
```

## 🔍 Testing Security

### Test Rate Limiting

```bash
# Test global rate limit (should block after 60 requests/minute)
for i in {1..65}; do curl http://localhost:3000/api/data/about.json; done

# Test contact form rate limit (should block after 3 requests/15min)
for i in {1..5}; do curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test message"}'; done
```

### Test Input Sanitization

```bash
# Test XSS protection
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"<script>alert(1)</script>","email":"test@test.com","message":"Test"}'

# Test SQL injection protection
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"admin","email":"test@test.com","message":"SELECT * FROM users"}'
```

### Test CORS Protection

```bash
# Test unauthorized origin (should be blocked)
curl -X POST http://localhost:3000/api/contact \
  -H "Origin: https://malicious-site.com" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","message":"Test"}'
```

## 📊 Performance Impact

The middleware is designed to be lightweight:

- **Minimal latency** - ~1-5ms per request
- **Memory efficient** - Uses Map for O(1) lookups
- **Automatic cleanup** - Prevents memory leaks
- **Conditional execution** - Only runs on relevant routes

## 🚀 Production Deployment

### Checklist

- [ ] Update allowed domains in CORS and CSRF middleware
- [ ] Set proper environment variables
- [ ] Enable HSTS in production
- [ ] Configure proper logging service
- [ ] Set up monitoring alerts
- [ ] Test all security features

### Monitoring

Monitor these metrics in production:

- Rate limit violations
- Blocked requests
- Failed authentication attempts
- Suspicious activity patterns
- Response times

## 🔒 Security Best Practices

### Additional Recommendations

1. **Use HTTPS** - Always use SSL/TLS in production
2. **Regular Updates** - Keep dependencies updated
3. **Security Headers** - Implement additional headers as needed
4. **Input Validation** - Validate all user inputs
5. **Error Handling** - Don't expose sensitive information
6. **Logging** - Log security events for analysis
7. **Monitoring** - Set up real-time security monitoring

### Contact Form Specific

- ✅ Rate limiting implemented
- ✅ Input sanitization active
- ✅ Spam detection enabled
- ✅ CSRF protection active
- ✅ XSS prevention implemented
- ✅ SQL injection protection active

## 🆘 Incident Response

If you detect an attack:

1. **Check logs** - Review security events
2. **Block IP** - Add to rate limiting if needed
3. **Update patterns** - Add new attack patterns
4. **Monitor** - Watch for continued attempts
5. **Report** - Document the incident

## 📞 Support

For security issues or questions:

- Check the security event logs
- Review middleware configuration
- Test with the provided examples
- Monitor console output for warnings
