document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.dataset.category;
      document.querySelectorAll(".gallery-item").forEach((item) => {
        item.style.display =
          category === "all" || item.classList.contains(category)
            ? "block"
            : "none";
      });
    });
  });
});
