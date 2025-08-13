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

function renderProducts(category) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  products[category].forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = category;
    card.dataset.id = product.id;
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/150x150?text=No+Image'">
      <div class="product-name">${product.name}</div>
      <div class="product-description">${product.description}</div>
      <div class="product-price">R${product.price}</div>
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

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

updateCartCount();

// Add to cart from product grid
document.getElementById('product-grid').addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart')) {
    e.stopPropagation(); // Prevent triggering card navigation
    const card = e.target.closest('.product-card');
    const category = card.dataset.category;
    const id = parseInt(card.dataset.id);
    const product = products[category].find(p => p.id === id);
    const existing = cart.find(item => item.id === id && item.category === category);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, category });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`); // Simple feedback; can enhance later
  }
});

// Make cards clickable to details (excluding button clicks due to stopPropagation)
document.addEventListener('click', (e) => {
  const card = e.target.closest('.product-card');
  if (card) {
    const category = card.dataset.category;
    const id = card.dataset.id;
    window.location.href = `product-details.html?category=${category}&id=${id}`;
  }
});

// Cart icon to cart page (already handled by HTML href, but override if needed)
document.getElementById('cart-icon').addEventListener('click', (e) => {
  e.preventDefault();
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