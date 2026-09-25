// assets/js/cart.js
const CART_KEY = "vaishnavi_cart";

function showToast(msg) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container position-fixed bottom-0 end-0 p-3";
    container.style.zIndex = "1080";
    document.body.appendChild(container);
  }
  const el = document.createElement("div");
  el.className = "toast align-items-center text-bg-success border-0";
  el.setAttribute("role", "alert");
  el.innerHTML = '<div class="d-flex"><div class="toast-body"></div>' +
    '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button></div>';
  el.querySelector(".toast-body").textContent = msg;
  container.appendChild(el);
  new bootstrap.Toast(el, { delay: 2000 }).show();
}


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
  showToast("Added to cart!");
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
