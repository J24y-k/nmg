// product-details.js (updated with cursor, hamburger, GSAP check, and status message)
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

const params = new URLSearchParams(window.location.search);
const category = params.get('category');
const id = parseInt(params.get('id'));

const product = products[category].find(p => p.id === id);

if (product) {
  const info = document.getElementById('product-info');
  info.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-image" style="max-width: 400px;">
    <h2 class="product-name">${product.name}</h2>
    <p class="product-description">${product.description}</p>
    <p class="product-price">R${product.price}</p>
  `;
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const statusMessage = document.getElementById('status-message');

document.getElementById('add-to-cart').addEventListener('click', () => {
  const existing = cart.find(item => item.id === product.id && item.category === category);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1, category });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  statusMessage.textContent = `${product.name} added to cart!`;
  statusMessage.classList.add('success');
  setTimeout(() => {
    statusMessage.textContent = '';
    statusMessage.classList.remove('success');
  }, 3000);
  updateCartCount();
  // Option to go to cart or continue
  if (confirm('Go to cart?')) {
    window.location.href = 'cart.html';
  }
});

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}
updateCartCount();

// Cart icon to cart page
document.getElementById('cart-icon').addEventListener('click', () => {
  window.location.href = 'cart.html';
});

// New: Back button functionality
document.getElementById('back-button').addEventListener('click', () => {
  history.back();
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setupHamburgerMenu();
  if (typeof gsap !== 'undefined') {
    initCustomCursor();
  } else {
    console.error('GSAP library is not loaded. Please include GSAP in your project.');
  }
});