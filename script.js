/* ==========================================================================
   FR7 ENTERPRISE LLC | JavaScript
   Smooth scroll, header effects, intersection observer, form handling
   ========================================================================== */

(function () {
    'use strict';

    // ---- Header scroll effect ----
    const header = document.getElementById('site-header');
    
    function handleScroll() {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---- Mobile navigation toggle ----
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close nav when link is clicked
        navLinks.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var headerOffset = 80;
                var elementPosition = target.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Fade-in animations on scroll ----
    var fadeElements = document.querySelectorAll(
        '.section-header, .about-text, .about-visual, .service-card, .contact-card, .contact-form-wrapper'
    );

    fadeElements.forEach(function (el) {
        el.classList.add('fade-in');
    });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    fadeElements.forEach(function (el) {
        observer.observe(el);
    });

    // ---- Contact form handling ----
    var contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var submitBtn = document.getElementById('contact-submit');
            var originalText = submitBtn.textContent;
            
            // Simple validation
            var name = document.getElementById('contact-name').value.trim();
            var email = document.getElementById('contact-email').value.trim();
            var message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !message) {
                return;
            }

            // Simulate sending
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            setTimeout(function () {
                submitBtn.textContent = 'Message Sent ✓';
                submitBtn.style.background = '#2d6a4f';
                submitBtn.style.borderColor = '#2d6a4f';
                submitBtn.style.color = '#fff';
                submitBtn.style.opacity = '1';

                contactForm.reset();

                setTimeout(function () {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                }, 3000);
            }, 1200);
        });
    }

    // ---- Active nav link highlighting ----
    var sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        var scrollY = window.pageYOffset;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop - 120;
            var sectionBottom = sectionTop + section.offsetHeight;
            var sectionId = section.getAttribute('id');

            var link = document.querySelector('.nav-link[href="#' + sectionId + '"]');
            if (link) {
                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

})();
