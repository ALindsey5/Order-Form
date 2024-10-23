document.addEventListener('DOMContentLoaded', () => {
    fetch('cart_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayCartItems(data);
            updateCartSummary(data);
        })
        .catch(error => {
            document.getElementById('cart-list').innerHTML = `<p>Error loading cart data: ${error.message}</p>`;
        });
});

function displayCartItems(items) {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';  // Clear existing items

    items.forEach(item => {
        const itemElement = document.createElement('li');
        const totalCost = (item.price * item.quantity).toFixed(2);
        itemElement.textContent = `${item.name} - $${item.price} x ${item.quantity} = $${totalCost}`;
        cartItemsContainer.appendChild(itemElement);
    });
}

function updateCartSummary(items) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = totalPrice;
}
