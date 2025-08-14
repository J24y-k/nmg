// cart.js — Amazon-style cart with thumbnails & quantity controls
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
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');

function renderCart() {
  if (!cartItems || !totalPrice) return;
  cartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p>Your cart is empty.</p>`;
  }

  cart.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-left">
        <img src="${item.image}" alt="${item.name}" class="cart-thumb"
             onerror="this.src='https://via.placeholder.com/80x80?text=No+Image'">
      </div>
      <div class="cart-middle">
        <a class="cart-name" href="product-details.html?category=${encodeURIComponent(item.category)}&id=${encodeURIComponent(item.id)}">
          ${item.name}
        </a>
        <div class="cart-price">R${item.price}</div>
        <div class="quantity-controls">
          <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
          <span class="qty-count">${item.quantity}</span>
          <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
        </div>
      </div>
      <div class="cart-right">
        <div class="cart-subtotal">R${item.price * item.quantity}</div>
        <button class="remove-item" data-index="${index}">Remove</button>
      </div>
    `;
    cartItems.appendChild(row);
    total += item.price * item.quantity;
  });

  totalPrice.textContent = total;
  updateCartCount();
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('qty-btn')) {
    const index = parseInt(e.target.dataset.index);
    const action = e.target.dataset.action;
    if (action === 'increase') cart[index].quantity += 1;
    if (action === 'decrease') cart[index].quantity = Math.max(1, cart[index].quantity - 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
  if (e.target.classList.contains('remove-item')) {
    const index = parseInt(e.target.dataset.index);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

document.getElementById('proceed-to-checkout')?.addEventListener('click', () => {
  if (cart.length > 0) window.location.href = 'checkout.html';
  else alert('Your cart is empty!');
});

document.addEventListener('DOMContentLoaded', () => {
  setupHamburgerMenu();
  if (typeof gsap !== 'undefined') initCustomCursor();
  renderCart();
});
