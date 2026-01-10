import { db } from "./assets/js/firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const wrap   = document.getElementById("testimonial-wrap");
  const btn    = document.getElementById("more-reviews");
  const snap   = await getDocs(collection(db,"reviews"));
  const reviews= snap.docs.map(d=>d.data());

  let showing = 3;
  render();

  btn.onclick = () => {
    showing = showing === 3 ? reviews.length : 3;
    btn.textContent = showing === 3 ? "View more" : "View less";
    render();
  };

  function render() {
    wrap.innerHTML = "";
    reviews.slice(0, showing).forEach(r=>{
      wrap.insertAdjacentHTML("beforeend",`
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <p class="card-text">"${r.text}"</p>
              <h6 class="card-subtitle text-muted">– ${r.author}</h6>
            </div>
          </div>
        </div>`);
    });
  }
});
