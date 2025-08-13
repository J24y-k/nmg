// /product-page/app.js

// This file contains shared functions used across multiple pages to avoid code duplication.

document.addEventListener('DOMContentLoaded', () => {
    // Initialize common functionalities
    if (typeof gsap !== 'undefined') {
        initCustomCursor();
    } else {
        console.error('GSAP library is not loaded.');
    }
    setupHamburgerMenu();
    updateCartCount(); // Update cart count on every page load
});

/**
 * Initializes the custom cursor movement using GSAP.
 */
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
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

/**
 * Sets up the toggle functionality for the hamburger menu on mobile.
 */
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

/**
 * Updates the cart icon's count based on items in localStorage.
 */
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalQuantity;
    }
}

/**
 * Adds an item to the cart or updates its quantity.
 * @param {string} category - The category of the product.
 * @param {number} productId - The ID of the product.
 */
function addToCart(category, productId) {
    const productToAdd = products[category].find(p => p.id === productId);
    if (!productToAdd) {
        console.error("Product not found!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...productToAdd, quantity: 1, category: category });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Optional: Show a confirmation message
    alert(`${productToAdd.name} has been added to your cart.`);
}
