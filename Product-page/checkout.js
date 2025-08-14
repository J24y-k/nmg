// checkout.js — handles EFT form, cursor, nav
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

function handleEFTFormSubmission() {
  const form = document.getElementById('eft-form');
  const statusMessage = document.getElementById('status-message');
  if (!form || !statusMessage) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const account = document.getElementById('account').value.trim();
    const branch = document.getElementById('branch').value.trim();

    if (name && email && account && branch) {
      statusMessage.textContent = 'Thank you for your payment details! We will process your order soon.';
      statusMessage.classList.add('success');

      setTimeout(() => {
        form.reset();
        statusMessage.classList.remove('success');
        statusMessage.textContent = '';
        localStorage.removeItem('cart');
        window.location.href = 'products.html';
      }, 1500);
    } else {
      statusMessage.textContent = 'Please fill out all fields.';
      statusMessage.classList.remove('success');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupHamburgerMenu();
  if (typeof gsap !== 'undefined') initCustomCursor();
  updateCartCount();
  handleEFTFormSubmission();
});
