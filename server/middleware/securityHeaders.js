const helmet = require('helmet');

const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "res.cloudinary.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      connectSrc: ["'self'", "api.cloudinary.com"]
    }
  },
  frameguard: { action: 'deny' },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  noSniff: true,
  xssFilter: true
});

module.exports = securityHeaders;