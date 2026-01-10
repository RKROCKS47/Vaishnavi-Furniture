// assets/js/cart.js
const CART_KEY = "vaishnavi_cart";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  let cart = getCart();
  const item = cart.find(i => i.productId === productId);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ productId, qty: 1 });
  }

  saveCart(cart);
  alert("Added to cart!");
}

function removeFromCart(productId) {
  let cart = getCart().filter(i => i.productId !== productId);
  saveCart(cart);
}

function updateQty(productId, qty) {
  let cart = getCart();
  const item = cart.find(i => i.productId === productId);
  if (item) item.qty = qty;
  saveCart(cart);
}
