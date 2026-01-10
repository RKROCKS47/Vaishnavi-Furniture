import { db } from "../assets/js/firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔗 Cloudinary Config
const cloudName = "doq9wg1lh";
const uploadPreset = "vaishnavi_unsigned";

// 🌤 Upload Image to Cloudinary
async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", uploadPreset);
  const res = await fetch(url, { method: "POST", body: data });
  const json = await res.json();
  return json.secure_url;
}

// Firestore Collections
const productCollection = collection(db, "products");
const reviewCollection = collection(db, "reviews");

// 📦 Load Products
async function loadProducts() {
  const snapshot = await getDocs(productCollection);
  const products = snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
  renderProductList(products);
}

// 💾 Save Product to Firestore
async function saveProduct(product) {
  await addDoc(productCollection, product);
  loadProducts();
}

// ❌ Delete Product
async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  await deleteDoc(doc(db, "products", id));
  loadProducts();
}

// 🖼 Render Product List in Admin Panel
function renderProductList(products) {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  if (!products.length) {
    list.innerHTML = "<li class='list-group-item text-muted'>No products yet.</li>";
    return;
  }

  products.forEach((product) => {
    const item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-center";
    item.innerHTML = `
      ${product.name} – ₹${product.price} (${product.category})
      <div>
        <button class="btn btn-sm btn-outline-secondary me-2" onclick='openEditModal(${JSON.stringify(product)})'>Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.id}')">Delete</button>
      </div>
    `;
    list.appendChild(item);
  });
}

// ✏️ Open Edit Modal
window.openEditModal = function (product) {
  document.getElementById("edit-product-id").value = product.id;
  document.getElementById("edit-name").value = product.name;
  document.getElementById("edit-category").value = product.category;
  document.getElementById("edit-price").value = product.price;
  document.getElementById("edit-preview").src = product.image;
  document.getElementById("edit-preview").classList.remove("d-none");

  new bootstrap.Modal(document.getElementById("editProductModal")).show();
};

// 📝 Edit Product Submit
document.getElementById("edit-product-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const id = document.getElementById("edit-product-id").value;
  const name = document.getElementById("edit-name").value.trim();
  const category = document.getElementById("edit-category").value.trim();
  const price = parseInt(document.getElementById("edit-price").value);
  const file = document.getElementById("edit-image").files[0];

  const updateData = { name, category, price };

  if (file) {
    const url = await uploadToCloudinary(file);
    updateData.image = url;
  }

  await updateDoc(doc(db, "products", id), updateData);
  alert("✅ Product updated.");
  location.reload();
});

// ➕ Add Product Submit (Only Upload Button)
document.getElementById("product-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const category = this.category.value;
  const price = parseInt(this.price.value);
  const file = document.getElementById("new-image").files[0];

  if (!file) return alert("Please upload an image.");

  const imageUrl = await uploadToCloudinary(file);

  const product = {
    name, category, price,
    image: imageUrl,
    description: "Added by admin.",
    createdAt: new Date().toISOString()
  };

  await saveProduct(product);
  alert("✅ Product added");
  this.reset();
});

// 💬 REVIEWS
async function loadReviews() {
  const snapshot = await getDocs(reviewCollection);
  const reviews = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  renderAdminReviews(reviews);
}

async function deleteReview(id) {
  if (!confirm("Are you sure you want to delete this review?")) return;
  await deleteDoc(doc(db, "reviews", id));
  loadReviews();
}

function renderAdminReviews(reviews) {
  const list = document.getElementById("admin-review-list");
  list.innerHTML = "";

  if (!reviews.length) {
    list.innerHTML = "<li class='list-group-item text-muted'>No reviews yet.</li>";
    return;
  }

  reviews.forEach((review) => {
    const item = document.createElement("li");
    item.className = "list-group-item d-flex justify-content-between align-items-start";
    item.innerHTML = `
      <div>
        <p class="mb-1">"${review.text}"</p>
        <small class="text-muted">– ${review.author}</small>
      </div>
      <button class="btn btn-sm btn-outline-danger ms-3" onclick="deleteReview('${review.id}')">🗑</button>
    `;
    list.appendChild(item);
  });
}

// 🚀 Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadReviews();
});

window.deleteProduct = deleteProduct;
window.deleteReview = deleteReview;
