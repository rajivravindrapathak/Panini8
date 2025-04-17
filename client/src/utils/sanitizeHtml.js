const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const sanitizeHtml = (dirty) => {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'pre', 'code', 'hr'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
    FORBID_ATTR: ['style', 'onerror']
  });
};

module.exports = sanitizeHtml;