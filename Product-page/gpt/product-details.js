function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
    });
}

function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    if (!hamburger || !navLinks) return;
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('active');
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Read category & id from URL
const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const id = parseInt(params.get('id'));

// Find product in categories data
let product = null;
if (categories[category]) {
    product = categories[category].find(p => p.id === id);
}

// Display product if found
if (product) {
    document.getElementById('product-info').innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" style="max-width: 400px;">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <p class="product-price">R${product.price}</p>
    `;
} else {
    document.getElementById('product-info').innerHTML = `<p>Product not found.</p>`;
}

// Add to Cart button
document.getElementById('add-to-cart').addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id && item.category === category);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, category, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
});

document.addEventListener('DOMContentLoaded', () => {
    setupHamburgerMenu();
    if (typeof gsap !== 'undefined') initCustomCursor();
    updateCartCount();
});
