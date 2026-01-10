
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

