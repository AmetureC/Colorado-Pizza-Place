// Colorado Pizza Place - Sprint 1 JavaScript
// This file handles cart functionality, totals, and order confirmation.

function getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
    const cart = getCart();

    const item = {
        name: name,
        price: price
    };

    cart.push(item);
    saveCart(cart);

    alert(name + " was added to your cart.");
}

function addCustomPizza() {
    const size = document.getElementById("pizza-size").value;
    const topping = document.getElementById("extra-topping").value;

    let price = 11.99;

    if (size === "Medium") {
        price = 13.99;
    } else if (size === "Large") {
        price = 15.99;
    }

    if (topping !== "None") {
        price += 1.50;
    }

    const pizzaName = size + " Custom Pizza with " + topping;
    addToCart(pizzaName, price);
}

function displayCart() {
    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItemsDiv || !cartTotal) {
        return;
    }

    const cart = getCart();
    cartItemsDiv.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(function(item, index) {
            const itemParagraph = document.createElement("p");
            itemParagraph.textContent =
                (index + 1) + ". " + item.name + " - $" + item.price.toFixed(2);
            cartItemsDiv.appendChild(itemParagraph);

            total += item.price;
        });
    }

    cartTotal.textContent = "Total: $" + total.toFixed(2);
}

function placeOrder() {
    const cart = getCart();
    const orderMessage = document.getElementById("order-message");

    if (cart.length === 0) {
        orderMessage.textContent = "Please add items to your cart before placing an order.";
        return;
    }

    localStorage.removeItem("cart");
    orderMessage.textContent =
        "Thank you! Your order has been placed successfully.";

    displayCart();
}

displayCart();