// /assets/js/products.js
import { db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const galleryGrid = document.getElementById("gallery-grid");
  if (!galleryGrid) return;

  const productCollection = collection(db, "products");
  const snapshot = await getDocs(productCollection);

  if (snapshot.empty) {
    galleryGrid.innerHTML = "<p class='text-muted'>No products available.</p>";
    return;
  }

  snapshot.forEach(docSnap => {
    const product = docSnap.data();
    const productId = docSnap.id;

    const col = document.createElement("div");
    col.className = `col-md-4 mb-4 gallery-item ${product.category}`;

    col.innerHTML = `
      <div class="card shadow-sm h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted">₹${product.price.toLocaleString()}</p>
          <button class="btn btn-sm btn-outline-primary" onclick="addToCart('${productId}')">
            Add to Cart
          </button>
        </div>
      </div>
    `;

    galleryGrid.appendChild(col);
  });
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("vaishnavi_cart")) || [];
  const index = cart.findIndex(item => item.productId === productId);

  if (index !== -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ productId, qty: 1 });
  }

  localStorage.setItem("vaishnavi_cart", JSON.stringify(cart));
  alert("🛒 Product added to cart!");
}
