const CATEGORY_NAMES = {
  ai: "AI",
  security: "資安",
  semiconductor: "半導體",
  esg: "ESG 永續",
  geopolitics: "國際政經",
};

/* ---------- 深淺色模式（所有頁面共用） ---------- */
function getSavedTheme() {
  try { return localStorage.getItem("theme"); } catch (e) { return null; }
}
function saveTheme(t) {
  try { localStorage.setItem("theme", t); } catch (e) { /* 無法儲存就算了 */ }
}
function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  const btn = document.querySelector(".theme-toggle");
  if (btn) btn.textContent = t === "dark" ? "淺色" : "深色";
}
(function initTheme() {
  const saved = getSavedTheme();
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
})();
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(document.documentElement.getAttribute("data-theme"));
  const btn = document.querySelector(".theme-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      saveTheme(next);
    });
  }
  if (document.getElementById("article-grid")) initHome();
});

/* ---------- 首頁 ---------- */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function tagHtml(cat) {
  return `<span class="tag tag-${cat}">${CATEGORY_NAMES[cat] || cat}</span>`;
}

function cardHtml(a) {
  return `
    <a class="card" href="${escapeHtml(a.url)}">
      <div>${tagHtml(a.category)}</div>
      <h3>${escapeHtml(a.title)}</h3>
      <p>${escapeHtml(a.summary)}</p>
      <div class="meta">${escapeHtml(a.date)} · ${a.readMinutes} 分鐘</div>
    </a>`;
}

function featuredHtml(a) {
  return `
    <a class="featured" href="${escapeHtml(a.url)}">
      ${tagHtml(a.category)}<span class="label">今日焦點</span>
      <h2>${escapeHtml(a.title)}</h2>
      <p>${escapeHtml(a.summary)}</p>
      <div class="meta featured-meta">${escapeHtml(a.date)} · ${a.readMinutes} 分鐘</div>
    </a>`;
}

async function initHome() {
  const grid = document.getElementById("article-grid");
  const featured = document.getElementById("featured");
  let articles = [];
  try {
    const res = await fetch("data/articles.json", { cache: "no-store" });
    articles = await res.json();
  } catch (e) {
    grid.innerHTML = `<p class="empty">文章載入失敗，請稍後再試。</p>`;
    return;
  }

  function render(cat) {
    const list = cat === "all" ? articles : articles.filter(a => a.category === cat);
    if (list.length === 0) {
      featured.innerHTML = "";
      grid.innerHTML = `<p class="empty">這個分類還沒有文章。</p>`;
      return;
    }
    featured.innerHTML = featuredHtml(list[0]);
    grid.innerHTML = list.slice(1).map(cardHtml).join("") ||
      `<p class="empty">目前只有上面這一篇。</p>`;
  }

  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.cat);
    });
  });

  render("all");
}
