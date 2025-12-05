// Navigation scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navigation toggle with overlay
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'nav-overlay';
document.body.appendChild(overlay);

// Add CTA button to mobile menu
if (navLinks && !navLinks.querySelector('.btn-mobile-cta')) {
    const mobileCta = document.createElement('a');
    mobileCta.href = 'https://www.doctolib.fr/psychologue/vandoeuvre-les-nancy/helene-el-houssni';
    mobileCta.target = '_blank';
    mobileCta.className = 'btn-mobile-cta';
    mobileCta.innerHTML = '<span>Prendre rendez-vous</span>';
    navLinks.appendChild(mobileCta);
}

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
}

// Close menu when clicking overlay
overlay.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
function initAnimations() {
    // Service cards with stagger
    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        animationObserver.observe(el);
    });

    // Accompagnement cards with stagger
    document.querySelectorAll('.accomp-card').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        animationObserver.observe(el);
    });

    // Pro cards with stagger
    document.querySelectorAll('.pro-card-item').forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.15}s`;
        animationObserver.observe(el);
    });

    // Content text paragraphs
    document.querySelectorAll('.content-text p, .about-content p, .pro-intro p').forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index * 0.1}s`;
        animationObserver.observe(el);
    });

    // Section titles
    document.querySelectorAll('.section-title, .section-title-left, .faq-category-title').forEach(el => {
        el.classList.add('animate-on-scroll');
        animationObserver.observe(el);
    });

    // Cards and special elements
    document.querySelectorAll('.approach-card, .quote-card, .info-card, .contact-card').forEach(el => {
        el.classList.add('animate-scale');
        animationObserver.observe(el);
    });

    // FAQ items
    document.querySelectorAll('.faq-item').forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index * 0.05}s`;
        animationObserver.observe(el);
    });

    // Tarif groups
    document.querySelectorAll('.tarif-group').forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index * 0.1}s`;
        animationObserver.observe(el);
    });
}

// Initialize animations on DOM load
document.addEventListener('DOMContentLoaded', initAnimations);

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMobileMenu();
    }
});
