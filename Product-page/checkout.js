// checkout.js (updated with cursor, hamburger, GSAP check, form handling, quantities)
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

function handleEFTFormSubmission() {
  const form = document.getElementById('eft-form');
  const statusMessage = document.getElementById('status-message');
  if (!form || !statusMessage) {
    console.error('EFT form or status message element not found.');
    return;
  }
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const account = document.getElementById('account').value;
    const branch = document.getElementById('branch').value;
    if (name && email && account && branch) {
      statusMessage.textContent = 'Thank you for your payment details! We will process your order soon.';
      statusMessage.classList.add('success');
      setTimeout(() => {
        form.reset();
        statusMessage.classList.remove('success');
        statusMessage.textContent = '';
        localStorage.removeItem('cart');
        window.location.href = 'products.html'; // Redirect back
      }, 3000);
      // In real-world, send to server
    } else {
      statusMessage.textContent = 'Please fill out all fields.';
      statusMessage.classList.remove('success');
    }
  });
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <span>${item.name} - R${item.price} x ${item.quantity}</span>
      <div class="quantity-controls">
        <button class="qty-btn" data-index="${index}" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" data-index="${index}" data-action="increase">+</button>
      </div>
      <button class="remove-item" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(div);
    total += item.price * item.quantity;
  });
  totalPrice.textContent = total;
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('qty-btn')) {
    const index = parseInt(e.target.dataset.index);
    const action = e.target.dataset.action;
    if (action === 'increase') cart[index].quantity += 1;
    else if (action === 'decrease' && cart[index].quantity > 1) cart[index].quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  } else if (e.target.classList.contains('remove-item')) {
    const index = parseInt(e.target.dataset.index);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setupHamburgerMenu();
  handleEFTFormSubmission();
  if (typeof gsap !== 'undefined') {
    initCustomCursor();
  } else {
    console.error('GSAP library is not loaded. Please include GSAP in your project.');
  }
  renderCart();
});