// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom Loading Screen
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
}

// Custom Cursor Effect
const cursor = document.getElementById('custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', e => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });
}

// Check if GSAP is loaded
if (typeof gsap === 'undefined') {
    console.error('GSAP failed to load. Check the CDN or host locally.');
} else {
    // --- Hero Section Animations ---
    const heroTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });
    heroTimeline.from(".logo", { y: -50, opacity: 0, duration: 1.2 })
                .from(".nav-links a", { y: -50, opacity: 0, stagger: 0.2 }, "-=0.8")
                .from(".search", { y: -50, opacity: 0 }, "-=0.8")
                .from(".about-hero .hero-title", { y: 50, opacity: 0, duration: 1.5 }, "-=0.5")
                .from(".about-hero .hero-subtitle", { y: 50, opacity: 0, duration: 1 }, "-=1");

    // --- Section Animations on Scroll ---
    const sections = document.querySelectorAll('main > section');

    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        const content = section.querySelector('.container > div');

        if (title) {
            gsap.from(title, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        }
        if (content) {
            gsap.from(content, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });
        }
    });

    // --- Footer Animations ---
    gsap.from(".footer-content", {
        y: 50,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
    });
}