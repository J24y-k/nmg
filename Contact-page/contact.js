// A simple function to add the custom cursor functionality
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');

    // Make sure the cursor element exists before trying to use it
    if (!cursor) {
        console.error('Custom cursor element #custom-cursor not found.');
        return;
    }

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });
}

// Function to handle the form submission and provide feedback
function handleContactFormSubmission() {
    const form = document.getElementById('contactForm');
    const statusMessage = document.getElementById('status-message');

    // Make sure the form and status message elements exist
    if (!form || !statusMessage) {
        console.error('Contact form or status message element not found.');
        return;
    }
    
    // Listen for the form submission
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Check if all form fields are filled out
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (name && email && subject && message) {
            // Simulate a successful submission
            statusMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            statusMessage.classList.add('success');
            
            // Clear the form after a short delay
            setTimeout(() => {
                form.reset();
                statusMessage.classList.remove('success');
                statusMessage.textContent = '';
            }, 3000);
            
            // In a real-world scenario, you would send the data to a server here.
            // Example: fetch('/submit-contact-form', { method: 'POST', body: new FormData(form) });
            
        } else {
            // This part is redundant due to the 'required' attribute on inputs,
            // but is good for client-side validation logic.
            statusMessage.textContent = 'Please fill out all fields.';
            statusMessage.classList.remove('success'); // Ensure success styling is removed
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
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    handleContactFormSubmission();
    setupHamburgerMenu();
});
// Ensure GSAP is loaded before using it
if (typeof gsap === 'undefined') {
    console.error('GSAP library is not loaded. Please include GSAP in your project.');
} else {
    // GSAP is loaded, proceed with the custom cursor initialization
    initCustomCursor();
}