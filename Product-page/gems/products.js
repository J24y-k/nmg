// /product-page/products.js

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('product-grid');
    const tabs = document.querySelectorAll('.tab-button');

    if (!grid || !tabs.length) {
        console.error("Product grid or tabs not found.");
        return;
    }

    // Function to render products for a given category
    function renderProducts(category) {
        grid.innerHTML = '';
        const productList = products[category];

        if (!productList) {
            grid.innerHTML = '<p>No products found in this category.</p>';
            return;
        }

        productList.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            // Add data attributes for category and id to use for navigation and adding to cart
            card.dataset.category = category;
            card.dataset.id = product.id;

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://placehold.co/150x150/EBF4F6/2B2D42?text=No+Image'">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">R${product.price}</div>
                <button class="add-to-cart-btn">Add to Cart</button>
            `;
            grid.appendChild(card);
        });
        // GSAP animation for new cards
        if (typeof gsap !== 'undefined') {
            gsap.from('.product-card', { duration: 0.8, y: 50, opacity: 0, stagger: 0.1, ease: 'power3.out' });
        }
    }

    // Event listener for the whole grid to handle clicks efficiently
    grid.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (!card) return; // Exit if the click was not on a card

        const category = card.dataset.category;
        const id = parseInt(card.dataset.id);

        // Check if the 'Add to Cart' button was clicked
        if (e.target.classList.contains('add-to-cart-btn')) {
            addToCart(category, id); // Use the shared addToCart function
        } else {
            // Otherwise, navigate to the product details page
            window.location.href = `product-details.html?category=${category}&id=${id}`;
        }
    });

    // Tab switching logic
    tabs.forEach(btn => {
        btn.addEventListener('click', function() {
            tabs.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProducts(this.getAttribute('data-category'));
        });
    });

    // Initial render for the default 'laundry' category
    renderProducts('laundry');
});
