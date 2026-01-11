// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Features section is now loaded directly in HTML with the 'loaded' class
    // and all cards have the 'animate' class applied
    
    // Set up mobile navigation
    const setupMobileNav = () => {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        const body = document.body;
        
        if (mobileNavToggle && navLinks) {
            mobileNavToggle.addEventListener('click', function() {
                // Toggle active class on the button
                this.classList.toggle('active');
                
                // Toggle visibility of the navigation menu
                navLinks.classList.toggle('active');
                
                // Update aria-expanded attribute for accessibility
                const expanded = navLinks.classList.contains('active');
                this.setAttribute('aria-expanded', expanded);
            });
            
            // Close mobile menu when a link is clicked
            const navItems = navLinks.querySelectorAll('a');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    if (window.innerWidth <= 768) { // Only on mobile
                        mobileNavToggle.classList.remove('active');
                        navLinks.classList.remove('active');
                        mobileNavToggle.setAttribute('aria-expanded', 'false');
                    }
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (
                    navLinks.classList.contains('active') && 
                    !navLinks.contains(e.target) && 
                    !mobileNavToggle.contains(e.target)
                ) {
                    mobileNavToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    body.style.overflow = '';
                }
            });
        }
    };
    
    // Set up lazy loading for images
    const setupLazyLoading = () => {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    };
    
    // Set up social sharing buttons
    const setupSocialSharing = () => {
        const shareButtons = document.querySelector('.share-buttons');
        if (!shareButtons) return;
        
        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);
        
        const socialPlatforms = [
            {
                name: 'BlueSky',
                icon: 'fab fa-square-bluesky',
                url: `https://bsky.app/intent/compose?text=Check%20out%20TippyTip%20-%20a%20smart%20web%20link%20manager%20for%20iOS!%20https%3A%2F%2Ftippytip.ai`
            },
            {
                name: 'Twitter',
                icon: 'fab fa-twitter',
                url: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`
            },
            {
                name: 'Facebook',
                icon: 'fab fa-facebook-f',
                url: `https://www.facebook.com/sharer/sharer.php`
            },
            {
                name: 'LinkedIn',
                icon: 'fab fa-linkedin-in',
                url: `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`
            }
        ];
        
        socialPlatforms.forEach(platform => {
            const button = document.createElement('a');
            button.href = platform.url;
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
            button.setAttribute('aria-label', `Share on ${platform.name}`);
            
            const icon = document.createElement('i');
            const iconClasses = platform.icon.split(' ');
            iconClasses.forEach(cls => icon.classList.add(cls));
            
            button.appendChild(icon);
            shareButtons.appendChild(button);
        });
    };
    
    // Add back the scroll animation effect
    const setupScrollAnimations = () => {
        // Elements to animate on scroll
        const animateElements = document.querySelectorAll('.feature-card, .step, .testimonial, .faq-item');
        
        // Set initial styles
        animateElements.forEach(el => {
            // Don't hide feature cards initially since they should be visible right away
            if (!el.classList.contains('feature-card')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
            }
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Function to check if element is in viewport
        const isInViewport = (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
            );
        };
        
        // Function to handle scroll animation
        const handleScrollAnimation = () => {
            animateElements.forEach(el => {
                if (isInViewport(el)) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScrollAnimation);
        
        // Trigger initial check
        setTimeout(handleScrollAnimation, 100);
    };
    
    // Smooth scrolling for anchor links
    const setupSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Initialize all components
    setupMobileNav();
    setupLazyLoading();
    setupSocialSharing();
    setupScrollAnimations();
    setupSmoothScrolling();
}); 