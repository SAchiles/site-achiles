// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 300);
        });
        
        // Fallback timing for safety
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1200);
    }

    // Navbar scroll effect
    const navbarContainer = document.querySelector('.navbar-container');
    const navbarLinks = document.querySelector('.navbar-links');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (navbarLinks) {
                navbarLinks.style.background = 'rgba(2, 6, 23, 0.95)';
                navbarLinks.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            }
        } else {
            if (navbarLinks) {
                navbarLinks.style.background = 'rgba(2, 6, 23, 0.8)';
                navbarLinks.style.boxShadow = 'none';
            }
        }

        // Hide/Show navbar on scroll
        if (navbarContainer) {
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                // Scrolling down
                navbarContainer.classList.add('navbar-hidden');
            } else {
                // Scrolling up
                navbarContainer.classList.remove('navbar-hidden');
            }
            lastScrollY = window.scrollY;
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.solution-card, .about-description, .stat-box, .bento-item, .guarantee-card, .section-title');
    
    // Quick CSS injection for these animations
    const style = document.createElement('style');
    style.innerHTML = `
        .solution-card, .about-description, .stat-box, .bento-item, .guarantee-card, .section-title {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .solution-card.visible, .about-description.visible, .stat-box.visible, .bento-item.visible, .guarantee-card.visible, .section-title.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    animateElements.forEach((el, index) => {
        // Add slight delay based on index for staggered effect
        if(el.classList.contains('solution-card') || el.classList.contains('stat-box') || el.classList.contains('bento-item') || el.classList.contains('guarantee-card')) {
            el.style.transitionDelay = `${(index % 4) * 0.15}s`;
        }
        observer.observe(el);
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if(mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if(navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Authority CountUp Animation
    const observerCountUpOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const countUpObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetEl = entry.target;
                const valueEl = targetEl.querySelector('.count-value');
                if (valueEl) {
                    const target = parseInt(targetEl.getAttribute('data-target'));
                    startCountUp(valueEl, target, 2000);
                }
                observer.unobserve(targetEl); // Count only once
            }
        });
    }, observerCountUpOptions);

    document.querySelectorAll('.stat-number[data-target]').forEach(el => {
        countUpObserver.observe(el);
    });

    function startCountUp(element, target, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress * (2 - progress); // easeOutQuad
            element.innerText = Math.floor(easeProgress * target);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.innerText = target;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Magnetic Buttons
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });

        btn.addEventListener('mouseout', (e) => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
});
