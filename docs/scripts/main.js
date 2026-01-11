
  document.addEventListener("click", (e) => {
    const item = e.target.closest(".copy-item");
    if (!item) return;

    const text = item.dataset.copy;

    navigator.clipboard.writeText(text).then(() => {
      const btn = item.querySelector("button");
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = "Copy"), 1200);
    });
  });

const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
  overlay.classList.add("show");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});


sidebar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  });
});


