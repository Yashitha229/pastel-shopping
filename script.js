
let cart = [];

function addToCart(name, price) {
    let item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }

    document.getElementById("message").textContent = "";
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalElement = document.getElementById("total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.textContent = "Your cart is empty.";
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("span");
        details.textContent =
            `${item.name} × ${item.quantity} — ₹${item.price * item.quantity}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeItem(index);

        row.appendChild(details);
        row.appendChild(removeButton);
        cartItems.appendChild(row);
    });

    cartCount.textContent = count;
    totalElement.textContent = total;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
    document.getElementById("message").textContent = "";
}

document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        document.getElementById("message").textContent =
            "Please add a product to your cart first!";
        return;
    }

    const name = document.getElementById("customer-name").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !address) {
        document.getElementById("message").textContent =
            "Please enter your name and delivery address.";
        return;
    }

    const orderTotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById("message").textContent =
        `Thank you, ${name}! Your order of ₹${orderTotal} has been placed successfully.`;

    cart = [];
    updateCart();
    this.reset();
});
