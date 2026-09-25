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

function cartCount() {
  return getCart().reduce((n, item) => n + (item.qty || 0), 0);
}

// Floating "View Cart" button: show when cart has items, update badge, pulse on add
function updateCartFab(pulse) {
  const fab = document.getElementById("cart-fab");
  if (!fab) return;
  const n = cartCount();
  const badge = document.getElementById("cart-fab-count");
  if (badge) badge.textContent = n;
  fab.classList.toggle("d-none", n === 0);
  if (pulse && n > 0) {
    fab.classList.remove("pulse");
    void fab.offsetWidth; // restart the animation
    fab.classList.add("pulse");
  }
}

document.addEventListener("DOMContentLoaded", () => updateCartFab(false));
// Refresh the badge when returning via the browser back button
// (bfcache restores the old DOM without re-running page load)
window.addEventListener("pageshow", () => updateCartFab(false));

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
  updateCartFab(true);
}

function removeFromCart(productId) {
  let cart = getCart().filter(i => i.productId !== productId);
  saveCart(cart);
  updateCartFab(false);
}

function updateQty(productId, qty) {
  let cart = getCart();
  const item = cart.find(i => i.productId === productId);
  if (item) item.qty = qty;
  saveCart(cart);
  updateCartFab(false);
}
