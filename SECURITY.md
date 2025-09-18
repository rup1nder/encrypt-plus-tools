# Security Policy

## 🔒 Security Overview

This document outlines the security policy for the Secure Encrypt/Decrypt Web Application. We take security seriously and welcome responsible disclosure of security vulnerabilities.

## Supported Versions

We actively support and provide security updates for the following versions:

| Version | Supported          | Security Updates |
| ------- | ------------------ | ---------------- |
| 1.x.x   | ✅ Current        | ✅ Yes          |
| < 1.0   | ❌ Previous      | ❌ No           |

## Reporting a Vulnerability

### 🚨 How to Report Security Issues

**DO NOT** create public GitHub issues for security vulnerabilities.

Instead, please report security issues by:

1. **Email**: Send details to [rupi_st@hotmail.com](mailto:rupi_st@hotmail.com)
2. **Subject**: `[SECURITY] Vulnerability Report - Encrypt/Decrypt App`
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (optional)

### Response Timeline

- **Acknowledgment**: Within 24 hours
- **Initial Assessment**: Within 72 hours
- **Fix Development**: Within 1-2 weeks for critical issues
- **Public Disclosure**: After fix is deployed and tested

## Security Considerations

### 🔐 Encryption Security

This application uses:
- **RSA 2048-bit** asymmetric encryption
- **AES-256** symmetric encryption for key protection
- **PBKDF2** key derivation with salt
- **Secure random** key generation

### ⚠️ Important Security Notes

1. **Password Strength**: Always use strong, unique passwords
2. **Data Storage**: Encrypted data is temporary (3 days max)
3. **No Personal Data**: Application doesn't store personal information
4. **Client-Side Processing**: Encryption happens in your browser
5. **HTTPS Required**: Always use HTTPS in production

### 🛡️ Security Best Practices for Users

#### Password Guidelines
- Use minimum 12 characters
- Include uppercase, lowercase, numbers, and symbols
- Never reuse passwords from other services
- Use a password manager

#### Safe Usage
- Only encrypt sensitive but non-critical information
- Keep passwords secure and memorable
- Don't share encrypted data without the password
- Use strong, unique passwords for each encryption

#### Data Handling
- Encrypted data expires after 3 days
- Keys are automatically deleted
- No data persistence beyond decryption session
- All processing happens client-side

## Known Security Limitations

### Current Limitations
1. **Password Recovery**: No password recovery mechanism (by design)
2. **Data Expiration**: Encrypted data only lasts 3 days
3. **Browser Security**: Dependent on browser security features
4. **Network Security**: Requires HTTPS for production use

### Future Security Enhancements
- [ ] Multi-factor authentication for decryption
- [ ] Key rotation capabilities
- [ ] Audit logging for security events
- [ ] Rate limiting for API endpoints
- [ ] Content Security Policy (CSP) headers

## Security Testing

### Automated Security Testing
```bash
# Run security linters
npm audit                    # Frontend dependencies
mvn dependency-check:check   # Backend dependencies

# Code security scanning
# (Add tools like SonarQube, Snyk, or GitHub CodeQL)
```

### Manual Security Testing
- Input validation testing
- XSS prevention verification
- CSRF protection testing
- SQL injection prevention (though no database queries)
- Secure headers verification

## Incident Response

### In Case of Security Breach
1. **Immediate Actions**:
   - Assess scope of breach
   - Notify affected users
   - Deploy security patches
   - Monitor for further incidents

2. **Communication**:
   - Post-mortem analysis
   - Security advisory release
   - User notification procedures

3. **Prevention**:
   - Update security measures
   - Enhance monitoring
   - Implement additional safeguards

## Security Updates

### How to Stay Secure
- Keep dependencies updated
- Monitor security advisories
- Use HTTPS in production
- Regularly review access logs
- Implement security headers

### Update Process
1. Security issues identified
2. Fix developed and tested
3. Security advisory drafted
4. Update deployed
5. Public announcement made

## Contact Information

- **Security Issues**: rupi_st@hotmail.com
- **General Support**: GitHub Issues
- **Project Maintainer**: Rupinder Singh

## Acknowledgments

We appreciate the security research community for their contributions to keeping open source software secure. Responsible disclosure helps make software safer for everyone.

---

**Disclaimer**: While we strive for security, this application is provided "as is" for educational and utility purposes. For highly sensitive information, consider using dedicated encryption software or consulting security professionals.