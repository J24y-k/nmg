// Register GSAP ScrollTrigger plugin [the real real death of jQuery]
gsap.registerPlugin(ScrollTrigger);

// Custom Loading Screen
window.addEventListener('load', () => {
    // Hide the preloader and show the body
    document.body.classList.add('loaded');
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
});

// Custom Cursor Effect
const cursor = document.getElementById('custom-cursor');

document.addEventListener('mousemove', e => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
    });
});

// Check if GSAP is loaded
if (typeof gsap === 'undefined') {
    console.error('GSAP failed to load. Check the CDN or host locally.');
} else {
    // --- Hero Section Animations ---
    const heroTimeline = gsap.timeline({ defaults: { duration: 0.8, ease: "power2.out" } });
    heroTimeline.from(".logo", { y: -50, opacity: 0, duration: 1.2 })
                .from(".nav-links a", { y: -50, opacity: 0, stagger: 0.2 }, "-=0.8")
                .from(".search", { y: -50, opacity: 0 }, "-=0.8")
                .from(".hero-title", { y: 50, opacity: 0, duration: 1.5 }, "-=0.5")
                .from("#lottie-animation", { y: 100, opacity: 0, duration: 1.5 }, "-=1");

    // --- Parallax Effect for Hero Background ---
    gsap.to(".hero-background-image", {
        y: 100,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });

    // --- About Section Animations ---
    gsap.from(".about-wrapper", {
        y: 50,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
    });

    // --- Services Section Animations ---
    gsap.from(".services-wrapper", {
        y: 50,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".services-and-products-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
    });

    // --- Testimonials Section Animations ---
    gsap.from(".testimonials-content", {
        y: 50,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".testimonials-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
    });

    // Testimonials Carousel
    const testimonials = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        gsap.to(testimonials, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                testimonials.forEach((item, i) => {
                    item.style.display = i === index ? 'block' : 'none';
                });
                gsap.fromTo(testimonials[index], 
                    { x: 100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                );
            }
        });
    }

    function startTestimonialCarousel() {
        showTestimonial(currentTestimonial);
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 7000); // 7 seconds interval
    }
    
    // Initialize carousel
    testimonials.forEach((item, i) => {
        item.style.display = i === 0 ? 'block' : 'none';
    });
    startTestimonialCarousel();

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