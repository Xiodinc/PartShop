document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupCart();
    handleContactForm();
});

// Initialize cart as an empty array
let cart = [];

// Load products from product-list.json
function loadProducts() {
    fetch('assets/product-list.json')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="assets/images/${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                `;
                productList.appendChild(productElement);
            });
        })
        .catch(error => {
            console.error('Error loading products:', error);
        });
}

// Add product to cart
function addToCart(productId) {
    fetch('assets/product-list.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push(product);
                updateCart();
            }
        });
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>No items in your cart.</p>';
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <p>${item.name} - $${item.price}</p>
            `;
            cartItems.appendChild(itemElement);
        });
    }
}

// Proceed to checkout (basic alert)
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Proceeding to checkout...');
    }
});

// Handle contact form submission
function handleContactForm() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        alert(`Thank you for contacting us, ${email}. We have received your message.`);
    });
}
