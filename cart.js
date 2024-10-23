// Array of product objects
const products = [
    { name: "Samsung Galaxy Z Flip 6", price: 1099, description: "A compact foldable phone." },
    { name: "Samsung Galaxy S24 Ultra", price: 1299, description: "A high-end smartphone with a superior camera." },
    { name: "Samsung Galaxy Z Fold 6", price: 1899, description: "A phone that unfolds into a tablet." },
    { name: "iPhone 16", price: 799, description: "Apple's latest flagship iPhone." },
    { name: "Google Pixel 9 XL", price: 999, description: "Google's top-tier smartphone." }
];

// Cart array to store items
let cart = [];

// Load products into the product list
function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach((product, index) => {
        const productHTML = `
            <div class="w3-container w3-padding w3-border">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart(${index})">Add to Cart</button>
            </div>
        `;
        productList.innerHTML += productHTML;
    });
}

// Add product to the cart
function addToCart(index) {
    const product = products[index];
    const cartItem = cart.find(item => item.name === product.name);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function displayCart() {
    const cartList = document.getElementById("cart-list");
    cartList.innerHTML = ""; // Clear previous items

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        // Correctly format the HTML inside template literals
        cartItem.innerHTML = `
            <div class="w3-container w3-padding w3-border">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove From Cart</button>
            </div>
        `;

        cartList.appendChild(cartItem);
    });

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-cost').textContent = totalPrice.toFixed(2);
}

    

// Update the cart display
function updateCart() {
    console.log("Current cart contents:" , cart);
    const cartDiv = document.getElementById('cart-summary');
    const totalItems = document.getElementById('total-items');
    const totalCost = document.getElementById('total-cost');

    // Reset cart display
    cartDiv.innerHTML = '';

    if (cart.length === 0) {
        cartDiv.innerHTML = '<p>Your cart is empty.</p>';
        totalItems.textContent = '0';
        totalCost.textContent = '0.00';
        return;
    }

    let total = 0;
    let itemsCount = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemsCount += item.quantity;

        const cartItemHTML = `
            <div class="w3-container w3-padding w3-border">
                <h4>${item.name} (x${item.quantity})</h4>
                <p>Price: $${item.price}</p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;

        cartDiv.innerHTML += cartItemHTML;
    });

    totalItems.textContent = itemsCount;
    totalCost.textContent = total.toFixed(2);
}

// Remove an item from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

// Initialize the page by displaying the products
window.onload = function () {
    displayProducts();
};
