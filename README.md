# BloomBelle - Premium Flower eCommerce Landing Page

A modern, production-ready premium eCommerce landing page for an online florist business. Built with vanilla HTML, CSS, and JavaScript with a focus on performance, accessibility, and SEO.

![BloomBelle](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Performance](https://img.shields.io/badge/Performance-Optimized-brightgreen)

## 🌸 Features

### Design System
- **Premium Modern Aesthetics** - Elegant, minimalist design with soft luxury vibes
- **Color Palette** - Off-white, blush pink, sage green, lavender, and soft peach
- **Typography** - Playfair Display (headings) and Poppins (body)
- **Responsive Design** - Mobile-first approach with tablet and desktop breakpoints
- **Accessibility** - Full WCAG 2.1 compliance with semantic HTML and ARIA labels

### Performance Optimizations
- **Lazy Loading** - Font preconnections for faster load times
- **CSS Caching** - External stylesheet with immutable cache headers
- **JS Minification** - Production-ready JavaScript with error handling
- **Image Optimization** - SVG favicons and emoji placeholders
- **Security Headers** - CSP, X-Frame-Options, X-Content-Type-Options configured

### SEO & Social
- **Meta Tags** - Comprehensive SEO metadata
- **Open Graph** - Facebook sharing support
- **Twitter Cards** - X/Twitter preview cards
- **JSON-LD Schema** - Structured data for search engines
- **Canonical URLs** - Proper URL handling
- **Sitemap Ready** - Easy to add XML sitemap

### Sections
1. **Navigation** - Sticky header with logo, menu, and CTAs
2. **Hero Section** - Full-width banner with headline and primary CTAs
3. **Categories** - 6 occasion-based flower collection cards
4. **Featured Products** - 4-product showcase with ratings and pricing
5. **Why Shop With Us** - 4 feature cards highlighting USPs
6. **Testimonials** - 3 customer review cards with ratings
7. **Newsletter CTA** - Email subscription with discount offer
8. **Footer** - Multi-column layout with social links and info

## 📁 Project Structure

```
bloombelle/
├── index.html          # Main HTML file (production-ready)
├── styles.css          # External stylesheet (production-optimized)
├── script.js           # Production JavaScript with error handling
├── vercel.json         # Vercel deployment configuration
├── .gitignore          # Git ignore file
├── README.md           # This file
└── DEPLOYMENT.md       # Deployment guide (optional)
```

## 🚀 Quick Start

### Development
1. Clone the repository
2. Open `index.html` in a web browser
3. Make edits to files as needed
4. Test across browsers and devices

### Production Deployment

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Vercel Config Included**: The `vercel.json` file contains:
- Security headers (CSP, X-Frame-Options, etc.)
- Cache control rules for optimal performance
- Immutable caching for CSS/JS (1 year)
- Revalidation for HTML (always fresh)

#### Alternative Deployments
- **GitHub Pages**: Push to repository, enable Pages in settings
- **Netlify**: Drop folder in Netlify or connect Git repo
- **Any Static Host**: Simply upload all files to web server

## ⚙️ Configuration

### Google Analytics
Replace `G-XXXXXXXXXX` in `index.html` (lines 92-98) with your actual Google Analytics ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"></script>
<script>
    gtag('config', 'G-YOUR_ID');
</script>
```

### Email Configuration
Update newsletter form endpoint in `script.js` (line 89) to connect to your backend:

```javascript
// Replace with your actual API endpoint
const response = await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email })
});
```

### Social Links
Update social media URLs in `index.html` footer (lines 427-445):

```html
<a href="https://facebook.com/your-business">Facebook</a>
<a href="https://instagram.com/your-business">Instagram</a>
```

## 🔍 SEO Checklist

- [x] Meta titles and descriptions
- [x] Open Graph tags
- [x] Twitter cards
- [x] Schema markup (JSON-LD)
- [x] Canonical URLs
- [x] Mobile responsive design
- [x] Fast page load (optimized assets)
- [x] Accessibility (WCAG 2.1)
- [x] HTTPS ready
- [x] Sitemap ready

## ♿ Accessibility Features

- Semantic HTML5 structure
- ARIA labels and roles
- Focus management
- Keyboard navigation
- Color contrast compliance
- Reduced motion support
- Screen reader optimization

## 📊 Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 100

### Load Times
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

## 🔐 Security

### Implemented Features
- Security headers (X-Frame-Options, CSP)
- XSS protection
- Referrer policy
- No inline scripts (except analytics)
- Subresource integrity for CDN resources

### Best Practices
- Regular dependency updates
- HTTPS enforcement
- Input validation
- Error handling without exposing internals

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## 🎨 Customization

### Colors
Update CSS variables in `styles.css`:

```css
:root {
    --accent-green: #8aa89f;
    --blush: #f4d4cc;
    --sage: #9db4a3;
    /* ... more colors */
}
```

### Typography
Change fonts in `styles.css`:

```css
--heading-font: 'Playfair Display', serif;
--body-font: 'Poppins', sans-serif;
```

### Content
Edit text in `index.html` sections (hero, categories, products, etc.)

## 📈 Analytics & Tracking

### Events Tracked
- Add to cart
- Newsletter subscription
- Page performance metrics
- User interactions

### Custom Events
Add tracking via `window.BloomBelle.trackEvent()`:

```javascript
window.BloomBelle.trackEvent('custom_event', {
    data: 'value'
});
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test across browsers
4. Submit pull request

## 📝 License

MIT License - Free to use and modify

## 📧 Support

For issues, questions, or support:
- Email: support@bloombelle.com
- GitHub Issues: [Your repo]/issues

## 🔗 Links

- [Live Demo](https://bloombelle.vercel.app)
- [Vercel Docs](https://vercel.com/docs)
- [MDN Web Docs](https://developer.mozilla.org)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Version**: 1.0.0  
**Last Updated**: May 2026  
**Status**: ✅ Production Ready
