
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



document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("copy-btn")) return;

  const pre = e.target.closest("pre");
  const code = pre.querySelector("code");

  try {
    await navigator.clipboard.writeText(code.textContent.trim());

    e.target.classList.add("copied");
    e.target.textContent = "Copied!";

    setTimeout(() => {
      e.target.textContent = "copy";
      e.target.classList.remove("copied");
    }, 1500);
  } catch (err) {
    e.target.textContent = "Error";
  }
});


document.querySelectorAll("pre > code").forEach((code) => {
  const pre = code.parentElement;
  pre.classList.add("code-block");

  

  const btn = document.createElement("button");
  btn.className = "copy-btn";
  btn.textContent = "copy";


  pre.appendChild(btn);
});


