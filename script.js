// BloomBelle India - Premium Interactive Web Application Logic
// Performance-optimized, clean vanilla JavaScript with state persistence

(function() {
    'use strict';

    // State Variables
    let cartCount = 2; // Initial state matching HTML
    let wishlistCount = 0;
    const wishlistItems = new Set();

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initializeState();
        initializeEventListeners();
        initializeScrollSpy();
        injectAnimationStyles();
        trackEvent('page_view', { title: document.title });
    }

    // Load and render persistent states
    function initializeState() {
        try {
            // Dark Theme check
            const savedTheme = localStorage.getItem('bloombelle-theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const themeToggleBtn = document.getElementById('darkModeToggle');
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                document.body.classList.add('dark-theme');
                if (themeToggleBtn) {
                    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
                }
            } else {
                document.body.classList.remove('dark-theme');
                if (themeToggleBtn) {
                    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
                }
            }

            // Cart Badge from localStorage
            const savedCart = localStorage.getItem('bloombelle-cart-count');
            if (savedCart !== null) {
                cartCount = parseInt(savedCart, 10) || 0;
                updateBadge('cartCount', cartCount);
            }

            // Wishlist Badge from localStorage
            const savedWishlist = localStorage.getItem('bloombelle-wishlist');
            if (savedWishlist) {
                const parsed = JSON.parse(savedWishlist);
                if (Array.isArray(parsed)) {
                    parsed.forEach(item => wishlistItems.add(item));
                    wishlistCount = wishlistItems.size;
                    updateBadge('wishlistCount', wishlistCount);
                    
                    // Update heart icons on cards
                    document.querySelectorAll('.product-card').forEach(card => {
                        const name = card.getAttribute('data-product');
                        if (name && wishlistItems.has(name)) {
                            const btn = card.querySelector('.wishlist-toggle-btn');
                            if (btn) {
                                btn.classList.add('active');
                                btn.innerHTML = '<i class="fas fa-heart"></i>';
                            }
                        }
                    });
                }
            }
        } catch (e) {
            console.error('State initialization error:', e);
        }
    }

    // Initialize all event listeners
    function initializeEventListeners() {
        // Mobile Drawer navigation toggles
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileDrawer = document.getElementById('mobileDrawer');
        const drawerClose = document.getElementById('drawerClose');
        const drawerOverlay = document.getElementById('drawerOverlay');

        if (mobileToggle && mobileDrawer) {
            mobileToggle.addEventListener('click', () => toggleDrawer(true));
        }
        if (drawerClose) {
            drawerClose.addEventListener('click', () => toggleDrawer(false));
        }
        if (drawerOverlay) {
            drawerOverlay.addEventListener('click', () => toggleDrawer(false));
        }

        // Close drawer on click of side drawer links
        document.querySelectorAll('.drawer-link').forEach(link => {
            link.addEventListener('click', () => {
                toggleDrawer(false);
            });
        });

        // Dark Theme Switcher
        const themeToggleBtn = document.getElementById('darkModeToggle');
        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', toggleDarkTheme);
        }

        // Add to cart buttons
        const addToCartButtons = document.querySelectorAll('[data-add-to-cart]');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });

        // Wishlist toggles
        const wishlistButtons = document.querySelectorAll('.wishlist-toggle-btn');
        wishlistButtons.forEach(button => {
            button.addEventListener('click', handleWishlistToggle);
        });

        // Newsletter form
        const newsletterForm = document.querySelector('[data-newsletter-form]');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        }

        // Search action
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                showMessage('Online boutique search coming soon!', 'info');
            });
        }

        // Smooth scroll for anchors
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleAnchorClick);
        });
    }

    // Toggle slide drawer
    function toggleDrawer(open) {
        const mobileDrawer = document.getElementById('mobileDrawer');
        const mobileToggle = document.getElementById('mobileToggle');
        
        if (!mobileDrawer) return;

        if (open) {
            mobileDrawer.classList.add('open');
            mobileDrawer.setAttribute('aria-hidden', 'false');
            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', 'true');
            }
            document.body.style.overflow = 'hidden'; // Lock background scroll
        } else {
            mobileDrawer.classList.remove('open');
            mobileDrawer.setAttribute('aria-hidden', 'true');
            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = ''; // Unlock scroll
        }
    }

    // Toggle Dark/Light Mode
    function toggleDarkTheme() {
        const btn = document.getElementById('darkModeToggle');
        const isDark = document.body.classList.toggle('dark-theme');
        
        try {
            if (isDark) {
                localStorage.setItem('bloombelle-theme', 'dark');
                if (btn) btn.innerHTML = '<i class="fas fa-sun"></i>';
                showMessage('Midnight luxury theme enabled', 'info');
            } else {
                localStorage.setItem('bloombelle-theme', 'light');
                if (btn) btn.innerHTML = '<i class="fas fa-moon"></i>';
                showMessage('Classic light theme enabled', 'info');
            }
            trackEvent('theme_toggle', { is_dark: isDark });
        } catch (e) {
            console.error('Error saving theme configuration:', e);
        }
    }

    // Handle add to cart action
    function handleAddToCart(e) {
        e.preventDefault();
        
        const button = e.currentTarget;
        const originalContent = button.innerHTML;
        const card = button.closest('.product-card');
        const productName = card?.getAttribute('data-product') || 'Signature Bouquet';
        
        try {
            // Update local state
            cartCount += 1;
            updateBadge('cartCount', cartCount);
            localStorage.setItem('bloombelle-cart-count', cartCount);

            // Animate button
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-check"></i> Added!';
            button.style.background = 'linear-gradient(135deg, #A4C2A9 0%, #7B9080 100%)';
            
            // Pop dynamic feedback
            showMessage(`"${productName}" added to shopping bag.`, 'success');
            
            // Pulse the cart icon
            const cartIcon = document.getElementById('cartBtn');
            if (cartIcon) {
                cartIcon.style.transform = 'scale(1.25)';
                setTimeout(() => {
                    cartIcon.style.transform = '';
                }, 300);
            }

            // Track analytics
            trackEvent('add_to_cart', { product_name: productName, price_currency: 'INR' });

            // Reset button
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.disabled = false;
                button.style.background = '';
            }, 2000);

        } catch (error) {
            console.error('Error handling add to cart:', error);
            button.innerHTML = originalContent;
            button.disabled = false;
        }
    }

    // Handle Wishlist Click
    function handleWishlistToggle(e) {
        e.preventDefault();
        const button = e.currentTarget;
        const card = button.closest('.product-card');
        const productName = card?.getAttribute('data-product') || 'Bouquet';
        const heartIcon = button.querySelector('i');

        try {
            const isAdded = button.classList.toggle('active');
            
            if (isAdded) {
                wishlistItems.add(productName);
                heartIcon.className = 'fas fa-heart';
                button.style.color = 'var(--accent-dark)';
                showMessage(`"${productName}" saved to wishlist.`, 'success');
                
                // Wishlist icon animation
                button.style.transform = 'scale(1.3)';
                setTimeout(() => button.style.transform = '', 200);
            } else {
                wishlistItems.delete(productName);
                heartIcon.className = 'far fa-heart';
                button.style.color = '';
                showMessage(`Removed "${productName}" from wishlist.`, 'info');
            }

            // Update state
            wishlistCount = wishlistItems.size;
            updateBadge('wishlistCount', wishlistCount);
            localStorage.setItem('bloombelle-wishlist', JSON.stringify(Array.from(wishlistItems)));
            
            // Pulse the header wishlist button
            const wishlistHeader = document.getElementById('wishlistBtn');
            if (wishlistHeader) {
                wishlistHeader.style.transform = 'scale(1.25)';
                setTimeout(() => {
                    wishlistHeader.style.transform = '';
                }, 300);
            }

            trackEvent('wishlist_update', { product_name: productName, saved: isAdded });

        } catch (error) {
            console.error('Error toggling wishlist state:', error);
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
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';

            setTimeout(() => {
                trackEvent('newsletter_subscribe', { email: maskEmail(email) });
                showMessage('Subscription successful! Enjoy 15% off your first floral gift.', 'success');
                form.reset();
                submitButton.innerHTML = '✓ Subscribed!';

                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                }, 3000);
            }, 800);

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
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Account for sticky header offset
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL cleanly
                window.history.pushState(null, '', href);
            }
        }
    }

    // Scrollspy active class indicators
    function initializeScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let currentSec = '';
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 120; // accounting for navigation
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSec = section.getAttribute('id');
                }
            });

            // Update navbar items
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSec}` || (currentSec === 'home' && link.getAttribute('href') === '#')) {
                    link.classList.add('active');
                }
            });

            // Update mobile drawer items
            document.querySelectorAll('.drawer-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSec}` || (currentSec === 'home' && link.getAttribute('href') === '#')) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Update specific badge innerText
    function updateBadge(badgeId, value) {
        const badge = document.getElementById(badgeId);
        if (badge) {
            badge.textContent = value;
            badge.style.display = value > 0 ? 'flex' : 'none';
        }
    }

    // Google Analytics tracking wrapper
    function trackEvent(eventName, eventData = {}) {
        try {
            if (window.gtag) {
                gtag('event', eventName, eventData);
            }
            console.log(`[Analytics Event] ${eventName}:`, eventData);
        } catch (error) {
            console.warn('Analytics tracking error:', error);
        }
    }

    // Show floating notifications
    function showMessage(message, type = 'info') {
        // Remove existing alerts first to avoid overlap
        document.querySelectorAll('.bloombelle-notification').forEach(el => el.remove());

        const messageEl = document.createElement('div');
        messageEl.className = `bloombelle-notification bloombelle-notification-${type}`;
        messageEl.setAttribute('role', 'alert');
        messageEl.setAttribute('aria-live', 'polite');
        messageEl.innerHTML = `<span class="notif-icon"></span> <p class="notif-text">${message}</p>`;

        // Apply styled layouts
        Object.assign(messageEl.style, {
            position: 'fixed',
            bottom: '30px',
            left: '30px',
            padding: '16px 24px',
            borderRadius: '12px',
            fontSize: '0.9rem',
            fontWeight: '600',
            zIndex: '10000',
            maxWidth: '380px',
            display: 'flex',
            align-items: 'center',
            gap: '12px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
            animation: 'notifSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        });

        // Set palette styling
        const colors = {
            success: { bg: 'var(--primary)', color: 'white', icon: '✓' },
            error: { bg: '#c62828', color: 'white', icon: '✕' },
            info: { bg: 'var(--bg-card)', color: 'var(--text-main)', icon: '🌸' }
        };

        const theme = colors[type] || colors.info;
        messageEl.style.backgroundColor = theme.bg;
        messageEl.style.color = theme.color;
        
        if (type === 'info') {
            messageEl.style.border = '1px solid var(--border-color)';
        }

        const iconContainer = messageEl.querySelector('.notif-icon');
        if (iconContainer) {
            iconContainer.textContent = theme.icon;
            iconContainer.style.fontSize = '1.1rem';
        }

        document.body.appendChild(messageEl);

        // Remove after 4 seconds
        setTimeout(() => {
            messageEl.style.animation = 'notifSlideOut 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => messageEl.remove(), 400);
        }, 4000);
    }

    // Mask emails
    function maskEmail(email) {
        const [name, domain] = email.split('@');
        if (!name || !domain) return email;
        const maskedName = name.charAt(0) + '*'.repeat(Math.max(3, name.length - 1));
        return `${maskedName}@${domain}`;
    }

    // Inject required animation style strings
    function injectAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes notifSlideIn {
                from {
                    transform: translateY(50px) scale(0.9);
                    opacity: 0;
                }
                to {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
            }
            
            @keyframes notifSlideOut {
                from {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
                to {
                    transform: translateY(50px) scale(0.9);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Public API
    window.BloomBelle = {
        trackEvent,
        showMessage,
        version: '1.2.0'
    };

})();
