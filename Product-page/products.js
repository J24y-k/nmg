// products.js (updated with custom cursor and GSAP check from contact.js)
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

const categories = {
    laundry: [
        { name: "Laundry Soap", description: "Gentle cleaning for all fabrics.", price: "R50", image: "images/laundry-soap.jpg" },
        { name: "Fabric Softener", description: "Keeps clothes soft and fresh.", price: "R35", image: "images/fabric-softener.jpg" },
        { name: "Stain Remover", description: "Removes tough stains easily.", price: "R40", image: "images/stain-remover.jpg" },
        { name: "Laundry Basket", description: "Durable and spacious.", price: "R80", image: "images/laundry-basket.jpg" },
        { name: "Ironing Spray", description: "Smooth out wrinkles fast.", price: "R25", image: "images/ironing-spray.jpg" }
    ],
    "pies-noodles": [
        { name: "Chicken Pie", description: "Classic chicken pie.", price: "R30", image: "images/chicken-pie.jpg" },
        { name: "Beef Pie", description: "Savory beef filling.", price: "R32", image: "images/beef-pie.jpg" },
        { name: "Veggie Pie", description: "Loaded with vegetables.", price: "R28", image: "images/veggie-pie.jpg" },
        { name: "Instant Noodles", description: "Quick and tasty.", price: "R15", image: "images/noodles.jpg" },
        { name: "Spicy Noodles", description: "For a fiery kick.", price: "R18", image: "images/spicy-noodles.jpg" }
    ],
    lunchbox: [
        { name: "Fruit Pack", description: "Fresh seasonal fruits.", price: "R20", image: "images/fruit-pack.jpg" },
        { name: "Sandwich Box", description: "Assorted sandwiches.", price: "R25", image: "images/sandwich-box.jpg" },
        { name: "Snack Mix", description: "Healthy snacks.", price: "R18", image: "images/snack-mix.jpg" },
        { name: "Juice Box", description: "100% fruit juice.", price: "R10", image: "images/juice-box.jpg" },
        { name: "Mini Muffins", description: "Perfect for lunch.", price: "R15", image: "images/mini-muffins.jpg" }
    ],
    gifts: [
        { name: "Custom Mug", description: "Personalized mug.", price: "R50", image: "images/custom-mug.jpg" },
        { name: "Branded T-shirt", description: "Your logo here.", price: "R80", image: "images/branded-tshirt.jpg" },
        { name: "Gift Hamper", description: "Assorted treats.", price: "R120", image: "images/gift-hamper.jpg" },
        { name: "Keychain", description: "Custom design.", price: "R20", image: "images/keychain.jpg" },
        { name: "Notebook", description: "Branded stationery.", price: "R35", image: "images/notebook.jpg" }
    ],
    supply: [
        { name: "A4 Paper", description: "500 sheets.", price: "R60", image: "images/a4-paper.jpg" },
        { name: "Pens Pack", description: "Pack of 10.", price: "R25", image: "images/pens-pack.jpg" },
        { name: "Stapler", description: "Heavy duty.", price: "R40", image: "images/stapler.jpg" },
        { name: "Folders", description: "Set of 5.", price: "R30", image: "images/folders.jpg" },
        { name: "Desk Organizer", description: "Keep tidy.", price: "R55", image: "images/desk-organizer.jpg" }
    ]
};

function renderProducts(category) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    categories[category].forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/150x150?text=No+Image'">
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-price">${product.price}</div>
            <button class="add-to-cart">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

// Initial render for default category
renderProducts('laundry');

// Tab switching logic
document.querySelectorAll('.tab-button').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderProducts(this.getAttribute('data-category'));
    });
});

// Initial load
renderProducts('laundry');

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

updateCartCount();

// Make cards clickable to details
document.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (card) {
        const category = card.dataset.category;
        const id = card.dataset.id;
        window.location.href = `product-details.html?category=${category}&id=${id}`;
    }
});

// Cart icon to cart page
document.getElementById('cart-icon').addEventListener('click', () => {
    window.location.href = 'cart.html';
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setupHamburgerMenu();
    if (typeof gsap !== 'undefined') {
        initCustomCursor();
        gsap.from('.product-card', { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: 'power3.out' });
    } else {
        console.error('GSAP library is not loaded. Please include GSAP in your project.');
    }
});