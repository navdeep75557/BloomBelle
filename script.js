// BloomBelle - Production Ready JavaScript
// Performance optimized with error handling

(function() {
    'use strict';

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initializeEventListeners();
        initializeAnalytics();
    }

    // Initialize all event listeners
    function initializeEventListeners() {
        // Add to cart buttons
        const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });

        // Newsletter form
        const newsletterForm = document.querySelector('[data-newsletter-form]');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleAnchorClick);
        });
    }

    // Handle add to cart action
    function handleAddToCart(e) {
        e.preventDefault();
        
        const button = e.currentTarget;
        const originalContent = button.innerHTML;
        const productName = button.closest('[data-product]')?.getAttribute('data-product') || 'Product';
        
        try {
            // Update button state
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-check"></i> Added!';
            button.style.opacity = '0.8';

            // Track event
            trackEvent('add_to_cart', {
                product_name: productName
            });

            // Reset button after delay
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
                button.style.opacity = '1';
            }, 2000);

        } catch (error) {
            console.error('Error handling add to cart:', error);
            button.innerHTML = originalContent;
            button.disabled = false;
        }
    }

    // Handle newsletter form submission
    function handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const form = e.currentTarget;
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (!emailInput || !emailInput.value) {
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        const email = emailInput.value;
        const originalButtonText = submitButton.innerHTML;

        try {
            submitButton.disabled = true;
            submitButton.innerHTML = '✓ Subscribing...';

            // Simulate API call (replace with actual API endpoint)
            setTimeout(() => {
                trackEvent('newsletter_subscribe', {
                    email: maskEmail(email)
                });

                showMessage('Thank you for subscribing! Check your email for the 15% discount code.', 'success');
                form.reset();
                submitButton.innerHTML = '✓ Subscribed!';

                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                }, 3000);

            }, 500);

        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            showMessage('Something went wrong. Please try again.', 'error');
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    }

    // Handle anchor link clicks with smooth scroll
    function handleAnchorClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Update history without page reload
                window.history.pushState(null, '', href);
            }
        }
    }

    // Analytics tracking
    function trackEvent(eventName, eventData = {}) {
        try {
            // Google Analytics
            if (window.gtag) {
                gtag('event', eventName, eventData);
            }

            // Custom analytics (optional)
            if (window.analyticsQueue) {
                window.analyticsQueue.push({
                    event: eventName,
                    data: eventData,
                    timestamp: new Date().toISOString()
                });
            }
        } catch (error) {
            console.warn('Analytics tracking error:', error);
        }
    }

    // Initialize analytics queue
    window.analyticsQueue = window.analyticsQueue || [];

    // Show message notification
    function showMessage(message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.className = `notification notification-${type}`;
        messageEl.setAttribute('role', 'alert');
        messageEl.setAttribute('aria-live', 'polite');
        messageEl.textContent = message;

        // Add styles
        Object.assign(messageEl.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '9999',
            maxWidth: '400px',
            animation: 'slideIn 0.3s ease-out'
        });

        // Set colors based on type
        const colors = {
            success: { bg: '#4caf50', color: 'white' },
            error: { bg: '#f44336', color: 'white' },
            info: { bg: '#2196f3', color: 'white' }
        };

        const colorScheme = colors[type] || colors.info;
        messageEl.style.backgroundColor = colorScheme.bg;
        messageEl.style.color = colorScheme.color;

        document.body.appendChild(messageEl);

        // Remove after 4 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => messageEl.remove(), 300);
        }, 4000);
    }

    // Mask email for privacy
    function maskEmail(email) {
        const [name, domain] = email.split('@');
        const maskedName = name.charAt(0) + '*'.repeat(name.length - 1);
        return `${maskedName}@${domain}`;
    }

    // Performance monitoring
    function logPerformanceMetrics() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const navigationStart = timing.navigationStart;
            
            const metrics = {
                dns: timing.domainLookupEnd - timing.domainLookupStart,
                tcp: timing.connectEnd - timing.connectStart,
                ttfb: timing.responseStart - navigationStart,
                domContentLoaded: timing.domContentLoadedEventEnd - navigationStart,
                loadComplete: timing.loadEventEnd - navigationStart
            };

            console.log('Performance Metrics:', metrics);
            trackEvent('performance', metrics);
        }
    }

    // Log performance after page load
    window.addEventListener('load', logPerformanceMetrics);

    // Add animation styles
    function injectAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    injectAnimationStyles();

    // Expose global object for external integrations
    window.BloomBelle = {
        trackEvent,
        showMessage,
        version: '1.0.0'
    };

})();
