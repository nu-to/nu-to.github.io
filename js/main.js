document.addEventListener('DOMContentLoaded', () => {

    // --- References ---
    const navbar = document.getElementById('navbar');
    const cursorGlow = document.getElementById('cursor-glow');

    // --- Mobile Navigation ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 60;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Fade Up Animation on Scroll ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // --- Dynamic Scroll-Linked Variables ---
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;

        // Update CSS variable for scroll position (0 to 1)
        document.body.style.setProperty('--scroll', scrollPercent);

        // Navbar scroll state
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollTop > 20);
        }
    }, { passive: true });

    // --- Cursor Glow ---
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
        }, { passive: true });
    }

    // --- Scroll to Top on Logo Click ---
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // --- Book Carousel Logic ---
    const track = document.getElementById('book-carousel-track');
    const container = document.querySelector('.carousel-container');

    if (track && container) {
        // Clone items for infinite effect
        const items = Array.from(track.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });

        // Auto Scroll Variables
        let scrollSpeed = 1; // Pixels per frame
        let isPaused = false;
        let animationId;

        // Auto Scroll Function
        const autoScroll = () => {
            if (!isPaused) {
                container.scrollLeft += scrollSpeed;

                // Reset logic for seamless loop
                // If we've scrolled past the halfway point (width of original set), reset to 0
                // Note: This assumes the cloned set is identical width to the original set
                if (container.scrollLeft >= track.scrollWidth / 2) {
                    container.scrollLeft = 0;
                }
            }
            animationId = requestAnimationFrame(autoScroll);
        };

        // Start Animation
        animationId = requestAnimationFrame(autoScroll);

        // Pause on Hover / Touch
        // Pause on Hover / Touch
        container.addEventListener('mouseenter', () => isPaused = true);
        container.addEventListener('touchstart', () => isPaused = true);
        container.addEventListener('touchend', () => isPaused = false);

        // Manual Scroll (Drag to Scroll) for Desktop
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('active'); // Optional: can be used for CSS styling
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            isPaused = true; // Pause auto-scroll while dragging
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('active');
            isPaused = false; // Resume auto-scroll
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('active');
            isPaused = false; // Resume auto-scroll
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            container.scrollLeft = scrollLeft - walk;
        });
    }
});
