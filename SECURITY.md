# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Luna, please report it responsibly.

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please:

1. **Email**: Send details to the repository maintainer (check GitHub profile for contact)
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if you have one)
3. **Wait**: Allow time for the maintainer to respond (typically 48-72 hours)

### What to Expect

- **Acknowledgment**: We'll acknowledge receipt within 72 hours
- **Assessment**: We'll assess the vulnerability and determine severity
- **Fix**: We'll work on a fix and keep you informed
- **Disclosure**: We'll coordinate public disclosure after the fix is released
- **Credit**: You'll be credited for responsible disclosure (unless you prefer to remain anonymous)

## Security Best Practices

### Current Security Issues

⚠️ **CRITICAL**: This project currently has the following security issues that need addressing:

1. **Hardcoded API Key** (CRITICAL)
   - **Location**: `Luna/server.js:7`
   - **Issue**: Google Places API key is exposed in source code
   - **Risk**: Unauthorized API usage, potential billing charges
   - **Status**: ⚠️ Known issue, needs immediate fix
   - **Mitigation**: Do not use this key in production; rotate immediately

2. **No Authentication** (HIGH)
   - **Issue**: Login/signup forms are non-functional
   - **Risk**: No user identity verification
   - **Status**: 🔲 Not implemented

3. **No Input Validation** (HIGH)
   - **Issue**: Forms accept any input without validation
   - **Risk**: Potential injection attacks
   - **Status**: 🔲 Not implemented

4. **No HTTPS Enforcement** (MEDIUM)
   - **Issue**: Application runs on HTTP
   - **Risk**: Data transmitted in plain text
   - **Status**: 🔲 Not configured

5. **No CSRF Protection** (MEDIUM)
   - **Issue**: No cross-site request forgery tokens
   - **Risk**: Potential CSRF attacks
   - **Status**: 🔲 Not implemented

6. **No Rate Limiting** (MEDIUM)
   - **Issue**: No limits on API requests
   - **Risk**: Potential DoS attacks
   - **Status**: 🔲 Not implemented

## Secure Configuration Guide

### Environment Variables Setup

**Step 1**: Create `.env` file in `Luna/` directory:
```env
# NEVER commit this file to Git
# Add .env to .gitignore

# Server Configuration
PORT=3000
NODE_ENV=production

# Google Places API
GOOGLE_PLACES_API_KEY=your_actual_api_key_here

# Session Secret (generate a random string)
SESSION_SECRET=generate_a_random_string_here

# Database (when implemented)
DATABASE_URL=postgresql://user:password@localhost:5432/luna
```

**Step 2**: Install dotenv:
```bash
npm install dotenv
```

**Step 3**: Update `server.js`:
```javascript
require('dotenv').config();

// Replace hardcoded values with:
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PORT = process.env.PORT || 3000;
```

**Step 4**: Add to `.gitignore`:
```
.env
.env.local
.env.production
```

### Securing the Google API Key

1. **Create a new API key** in [Google Cloud Console](https://console.cloud.google.com/)
2. **Restrict the key**:
   - Application restrictions: Set to your domain
   - API restrictions: Enable only "Places API"
3. **Set usage quotas** to prevent unexpected charges
4. **Monitor usage** regularly in Cloud Console
5. **Rotate keys** periodically (every 90 days recommended)

### Recommended Security Enhancements

#### 1. Add Authentication (Passport.js)

```bash
npm install passport passport-local express-session bcrypt
```

```javascript
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport configuration
passport.use(new LocalStrategy(
  async (username, password, done) => {
    // Verify user credentials
    // TODO: Implement database lookup
  }
));
```

#### 2. Add Input Validation

```bash
npm install express-validator
```

```javascript
const { body, validationResult } = require('express-validator');

app.post('/signup',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).matches(/^(?=.*[A-Za-z])(?=.*\d)/),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process signup
  }
);
```

#### 3. Add Security Headers (Helmet)

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://maps.googleapis.com"]
    }
  }
}));
```

#### 4. Add Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', apiLimiter);
```

#### 5. Sanitize User Input

```bash
npm install xss-clean
```

```javascript
const xss = require('xss-clean');

// Sanitize user input
app.use(xss());
```

#### 6. Enable CORS Properly

```bash
npm install cors
```

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
}));
```

## Production Deployment Checklist

Before deploying to production:

- [ ] Remove all hardcoded credentials
- [ ] Enable environment variable configuration
- [ ] Implement user authentication
- [ ] Add input validation on all forms
- [ ] Enable HTTPS (SSL/TLS certificate)
- [ ] Add security headers (Helmet)
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Enable XSS protection
- [ ] Set up logging and monitoring
- [ ] Configure firewall rules
- [ ] Review and update dependencies
- [ ] Perform security audit
- [ ] Set up backup systems
- [ ] Document security procedures

## Dependencies Security

### Checking for Vulnerabilities

```bash
# Check for known vulnerabilities
npm audit

# Fix vulnerabilities automatically (if possible)
npm audit fix

# Force fix (may introduce breaking changes)
npm audit fix --force
```

### Keeping Dependencies Updated

```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update to latest versions (may break)
npm install package@latest
```

### Recommended Tools

- **Snyk**: `npm install -g snyk` - Continuous vulnerability scanning
- **Dependabot**: Enable on GitHub for automated dependency updates
- **npm audit**: Built-in vulnerability scanner

## Security Headers Reference

Recommended HTTP security headers:

```javascript
// Using Helmet middleware
app.use(helmet({
  // Prevent clickjacking
  frameguard: { action: 'deny' },
  
  // Prevent MIME sniffing
  noSniff: true,
  
  // Enable XSS protection
  xssFilter: true,
  
  // Force HTTPS
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  }
}));
```

## Secure Coding Guidelines

### 1. Never Trust User Input
- Always validate and sanitize
- Use parameterized queries (when DB is added)
- Escape output in HTML

### 2. Protect Sensitive Data
- Never log passwords or API keys
- Hash passwords (bcrypt, scrypt, or Argon2)
- Encrypt sensitive data at rest
- Use HTTPS for data in transit

### 3. Handle Errors Securely
```javascript
// Bad: Exposes system details
app.get('/api/data', (req, res) => {
  throw new Error('Database connection failed: localhost:5432');
});

// Good: Generic error message
app.get('/api/data', (req, res) => {
  try {
    // ... code
  } catch (error) {
    console.error('Database error:', error); // Log internally
    res.status(500).json({ error: 'Internal server error' }); // Generic message
  }
});
```

### 4. Use Secure Session Management
- Generate strong session IDs
- Set secure cookie flags
- Implement session timeout
- Regenerate session ID after login

### 5. Apply Principle of Least Privilege
- Limit API key permissions
- Restrict database user permissions
- Use environment-specific configurations

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [npm Security Advisories](https://www.npmjs.com/advisories)
- [Snyk Vulnerability Database](https://snyk.io/vuln/)

## Version Support

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Contact

For security concerns, please contact the repository maintainer through GitHub.

---

**Note**: This security policy will be updated as the project evolves and new security measures are implemented.
