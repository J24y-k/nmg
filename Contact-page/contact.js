// A simple function to add the custom cursor functionality
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');

    if (!cursor) {
        console.error('Custom cursor element #custom-cursor not found.');
        return;
    }

    document.addEventListener('mousemove', (e) => {
        // Corrected duration to match the index page for a smoother, trailing effect
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1, // Changed from 0.05 to 0.1 to match your index file
            ease: "power2.out"
        });
    });
}

// Function to handle the form submission and provide feedback
function handleContactFormSubmission() {
    const form = document.getElementById('contactForm');

    if (!form) {
        console.error('Contact form element not found.');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });
}

// Function to handle the hamburger menu toggle for mobile navigation
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (!hamburger || !navLinks) {
        console.error('Hamburger menu or navigation links not found.');
        return;
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('active');
    });
}

// Initialize all functionality when the document is ready
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initCustomCursor();
    handleContactFormSubmission();
    setupHamburgerMenu();
});

// A small check for the GSAP library as a fallback
if (typeof gsap === 'undefined') {
    console.error('GSAP library is not loaded. Please include GSAP in your project.');
}