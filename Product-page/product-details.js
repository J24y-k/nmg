// product-details.js — loads product by URL params, adds "You may also like"
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

function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    category: params.get('category'),
    id: parseInt(params.get('id'))
  };
}

function renderProduct(category, id) {
  const info = document.getElementById('product-info');
  if (!info) return;

  const product = window.categories?.[category]?.find(p => p.id === id);
  if (!product) {
    info.innerHTML = `<p>Product not found.</p>`;
    return null;
  }

  info.innerHTML = `
    <div class="details-wrap">
      <img src="${product.image}" alt="${product.name}" class="product-image" style="max-width: 420px"
           onerror="this.src='https://via.placeholder.com/420x280?text=No+Image'">
      <div class="details-text">
        <h2 class="product-name">${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <p class="product-price">R${product.price}</p>
        <div class="details-actions">
          <button id="add-to-cart" class="add-to-cart">Add to Cart</button>
          <a href="products.html" class="continue-shopping">Continue Shopping</a>
        </div>
      </div>
    </div>
  `;
  return product;
}

function attachAddToCart(product, category) {
  const btn = document.getElementById('add-to-cart');
  if (!btn) return;
  btn.addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id && item.category === category);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, category, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
  });
}

function renderRelatedProducts(category, currentId) {
  const container = document.getElementById('related-products');
  if (!container) return;
  const list = (window.categories?.[category] || []).filter(p => p.id !== currentId);
  const random = list.sort(() => 0.5 - Math.random()).slice(0, 3);

  container.innerHTML = '';
  random.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = category;
    card.dataset.id = p.id;
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-image"
           onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
      <div class="product-name">${p.name}</div>
      <div class="product-price">R${p.price}</div>
    `;
    container.appendChild(card);
  });
}

// Click to navigate (also works for related products)
document.addEventListener('click', (e) => {
  const card = e.target.closest('.product-card');
  if (card && !e.target.classList.contains('add-to-cart')) {
    const category = card.dataset.category;
    const id = card.dataset.id;
    window.location.href = `product-details.html?category=${encodeURIComponent(category)}&id=${encodeURIComponent(id)}`;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  setupHamburgerMenu();
  if (typeof gsap !== 'undefined') initCustomCursor();
  updateCartCount();

  const { category, id } = getParams();
  const product = renderProduct(category, id);
  if (product) {
    attachAddToCart(product, category);
    renderRelatedProducts(category, id);
  }
});
