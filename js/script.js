document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. Navigation & Hamburger Menu
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       2. Theme Toggle (Dark / Light Mode)
       ========================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = document.getElementById('toggle-icon');
    const body = document.body;

    // Check for saved user preference, if any, on load
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(currentTheme);
        if (currentTheme === 'light-mode') {
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
        }
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    /* =========================================
       3. Typewriter Effect
       ========================================= */
    const typewriterElement = document.getElementById('typewriter');
    const phrases = ["AI Enthusiast", "Web Developer", "Problem Solver", "Creative Thinker"];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);


    /* =========================================
       4. Scroll Reveal Animations (Intersection Observer)
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));


    /* =========================================
       5. Gallery Filtering
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    // small timeout for smooth reflow
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => { item.style.display = 'none'; }, 300); // match transition duration
                    }
                }
            });
        });
    });

    /* =========================================
       6. Active Navigation Link on Scroll
       ========================================= */
    const sections = document.querySelectorAll('section, header');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* =========================================
       7. Form Submission Prevention (Demo)
       ========================================= */
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
            btn.style.background = '#4CAF50';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }
});
