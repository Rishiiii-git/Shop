function increase(id) {
  let input = document.getElementById(id);
  input.value = parseInt(input.value) + 1;
}

function decrease(id) {
  let input = document.getElementById(id);
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

function addToCart(name, price, sizeId, qtyId) {
  let size = document.getElementById(sizeId).value;
  let qty = document.getElementById(qtyId).value;
  alert(`${name} (Size: ${size}) x${qty} added to cart. Total: Rs. ${price * qty}`);
}
let cart = [];

function increase(id) {
  let input = document.getElementById(id);
  input.value = parseInt(input.value) + 1;
}

function decrease(id) {
  let input = document.getElementById(id);
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

function addToCart(name, price, sizeId, qtyId) {
  let size = document.getElementById(sizeId).value;
  let qty = parseInt(document.getElementById(qtyId).value);
  cart.push({ name, price, size, qty });
  renderCart();
}

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


}



