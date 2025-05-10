let cart = [];

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
// Example function to add product to cart
function addToCart(product) {
    // Assuming you have product details like name, size, price, and quantity
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    // You can update the cart UI after this if needed
}


// Function to update the cart
function updateCart(id) {
  const productId = id.split('-')[1]; // Extract product name from id
  let cartItem = cart.find(item => item.name === productId);

  if (cartItem) {
    const qty = parseInt(document.getElementById('qty-' + productId).value);
    cartItem.qty = qty;
  }
  renderCart();
}
const checkoutForm = document.querySelector('form');

checkoutForm.addEventListener('submit', function (e) {
  const cartDataInput = document.getElementById('cart-data');
  const cartTotalInput = document.getElementById('cart-total');

  let itemsText = cart.map(item => `${item.name} - $${item.price.toFixed(2)}`).join('\n');

  cartDataInput.value = itemsText;
  cartTotalInput.value = totalPrice.toFixed(2);
});
// Whenever cart changes, save it
function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  // Your existing code to update UI, total, etc.
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

  renderCart();
}

// Function to render the cart
function renderCart() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '<h3>🛒 Your Bucket</h3>';

  let total = 0;
  cart.forEach((item, index) => {
    const subTotal = item.qty * item.price;
    total += subTotal;
    cartDiv.innerHTML += `
      <p>${item.name} (Size: ${item.size}) x${item.qty} - Rs. ${subTotal}</p>
    `;
  });

  cartDiv.innerHTML += `<hr><h4>Total: Rs. ${total}</h4>`;
}

// Call this function to clear the cart (optional)
function clearCart() {
  cart = [];
  renderCart();
}



// Optional: Checkout button handler
function checkout() {
  if (cart.length > 0) {
    alert("Proceeding to checkout");
    // Redirect to checkout page or show checkout form
  } else {
    alert("Your cart is empty!");
  }
}
localStorage.setItem('cartData', JSON.stringify(cart));



