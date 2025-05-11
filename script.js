let cart = [];  // Keep cart data in memory

// Add to Cart
function addToCart(productName, price, sizeId, qtyId) {
  const size = document.getElementById(sizeId).value;
  const quantity = parseInt(document.getElementById(qtyId).value);

  const cartItem = {
    productName,
    price,
    size,
    quantity
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${productName} added to cart!`);
}

// Quantity Controls
function increase(id) {
  const input = document.getElementById(id);
  input.value = parseInt(input.value) + 1;
}

function decrease(id) {
  const input = document.getElementById(id);
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

// Show Cart Items (for checkout.html)
function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <h3>${item.productName}</h3>
      <p>Size: ${item.size}</p>
      <p>Quantity: ${item.quantity}</p>
      <p>Price per item: Rs. ${item.price}</p>
      <p>Total: Rs. ${item.price * item.quantity}</p>
    </div>
    <hr>
  `).join("");
}


// Function to increase the quantity
function increase(id) {
  let input = document.getElementById(id);
  input.value = parseInt(input.value) + 1;
  updateCart(id); // Update cart after quantity change
}

// Function to decrease the quantity
function decrease(id) {
  let input = document.getElementById(id);
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
    updateCart(id); // Update cart after quantity change
  }
}

// Function to add the selected item to the cart
function addToCart(name, price, sizeId, qtyId) {
  let size = document.getElementById(sizeId).value;
  let qty = parseInt(document.getElementById(qtyId).value);

  // Check if the item already exists in the cart
  let cartItem = cart.find(item => item.name === name && item.size === size);
  if (cartItem) {
    cartItem.qty += qty; // If item exists, increase quantity
  } else {
    cart.push({ name, price, size, qty });
  }

  renderCart();  // Update the cart UI
}

// Function to update the cart when quantity changes
function updateCart(id) {
  const productId = id.split('-')[1]; // Extract product name from id
  let cartItem = cart.find(item => item.name === productId);

  if (cartItem) {
    const qty = parseInt(document.getElementById('qty-' + productId).value);
    cartItem.qty = qty;
  }
  renderCart();  // Update the cart UI
}

// Function to render the cart and display it on the page
function renderCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '<h3>🛒 Your Bucket</h3>';

  let total = 0;
  cart.forEach((item, index) => {
    const subTotal = item.qty * item.price;
    total += subTotal;
    cartDiv.innerHTML += `
      <p>${item.name} (Size: ${item.size}) x${item.qty} - Rs. ${subTotal}</p>
      <button onclick="removeFromCart(${index})">Remove</button><hr>
    `;
  });

  cartDiv.innerHTML += `<h4>Total: Rs. ${total}</h4>`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1);  // Remove item from cart by index
  renderCart();  // Update the cart UI
}

// Function to handle the checkout process
function checkout() {
  if (cart.length > 0) {
    alert("Proceeding to checkout");
    // Redirect to checkout page or show checkout form
    window.location.href = 'checkout.html';

  } else {
    alert("Your cart is empty!");
  }
}

// Function to clear the cart (optional)
function clearCart() {
  cart = [];
  renderCart();  // Update the cart UI
}

// Optional: Checkout form handler for storing cart data
const checkoutForm = document.querySelector('form');
checkoutForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  const cartDataInput = document.getElementById('cart-data');
  const cartTotalInput = document.getElementById('cart-total');

  let itemsText = cart.map(item => `${item.name} - Rs. ${item.price.toFixed(2)} x ${item.qty}`).join('\n');
  let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartDataInput.value = itemsText;
  cartTotalInput.value = totalPrice.toFixed(2);
});

// Call this function to reset the cart on page load (useful for a fresh start)
window.onload = function() {
  // Reset cart (you can remove this if you don't want the cart to be reset on page reload)
  cart = [];  
  renderCart(); // Render empty cart
};
localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html"; 

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', renderCart);
