// /product-page/product-details.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const productId = parseInt(params.get('id'));

    const infoContainer = document.getElementById('product-info-container');
    const statusMessage = document.getElementById('status-message');

    if (!infoContainer || !products[category]) {
        infoContainer.innerHTML = "<p>Product not found or category is invalid.</p>";
        return;
    }

    // Find the specific product from the shared data.js file
    const product = products[category].find(p => p.id === productId);

    if (product) {
        // Populate the page with the product's details
        infoContainer.innerHTML = `
            <div class="product-details-layout">
                <img src="${product.image}" alt="${product.name}" class="product-image-large" onerror="this.src='https://placehold.co/400x400/EBF4F6/2B2D42?text=No+Image'">
                <div class="product-details-info">
                    <h2 class="product-name">${product.name}</h2>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price" style="font-size: 1.5rem; color: var(--primary-color);">R${product.price}</p>
                    <button id="add-to-cart-btn" class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;

        // Add event listener for the new "Add to Cart" button
        document.getElementById('add-to-cart-btn').addEventListener('click', () => {
            addToCart(category, productId); // Use the shared function
            
            // Show a success message
            statusMessage.textContent = `${product.name} added to cart!`;
            statusMessage.classList.add('success');
            setTimeout(() => {
                statusMessage.textContent = '';
                statusMessage.classList.remove('success');
            }, 3000);
        });

    } else {
        infoContainer.innerHTML = "<p>Could not find the specified product.</p>";
    }
});
