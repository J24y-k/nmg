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

function renderProducts(category) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    categories[category].forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = category;
        card.dataset.id = product.id;

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/150x150?text=No+Image'">
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">R${product.price}</div>
            <button class="add-to-cart">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

// Add to Cart logic
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const card = e.target.closest('.product-card');
        const category = card.dataset.category;
        const id = parseInt(card.dataset.id);
        const product = categories[category][id];

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.id === product.id && item.category === category);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, category, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
});

// Navigate to product details when clicking the card (not the Add to Cart button)
document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (card && !e.target.classList.contains('add-to-cart')) {
        const category = card.dataset.category;
        const id = card.dataset.id;
        window.location.href = `product-details.html?category=${category}&id=${id}`;
    }
});

// Tab switching
document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderProducts(this.dataset.category);
    });
});

// Init
document.addEventListener('DOMContentLoaded', () => {
    setupHamburgerMenu();
    if (typeof gsap !== 'undefined') initCustomCursor();
    renderProducts('laundry');
    updateCartCount();
});
