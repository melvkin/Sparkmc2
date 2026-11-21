// ============================================================
// НАСТРОЙКИ ПОДКЛЮЧЕНИЯ К SUPABASE
// ============================================================
const SUPABASE_URL = "https://ieybojpqsrvztfcetcgj.supabase.co";
const SUPABASE_KEY = "sb_publishable_BGAB8G5Xf1XiwQYFO1LJiA_HCviWGd7";

const sb = (typeof window.supabase !== "undefined" && SUPABASE_KEY.startsWith("sb_"))
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

const RESERVED_PATHS = new Set(["", "index", "index.html", "ads", "ads.html", "settings", "me", "me.html", "upd", "upd.html"]);

// Базовый путь репозитория (например, /Sparkmc2/)
function getBasePath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (window.location.hostname.endsWith("github.io") && parts.length > 0) {
    return "/" + parts[0] + "/";
  }
  return "/";
}

const BASE_PATH = getBasePath();

function makeUrl(subpath) {
  const clean = subpath.replace(/^\/+/, "");
  return BASE_PATH + clean;
}

// Единые стили в духе минималистичных SMP-сайтов (полноэкранный, темный, строгий)
(function injectGlobalStyles() {
  if (document.getElementById("sparkmc-theme")) return;
  const style = document.createElement("style");
  style.id = "sparkmc-theme";
  style.textContent = `
    :root {
      --bg: #070709;
      --surface: #0e0e13;
      --surface-hover: #14141b;
      --border: rgba(255, 255, 255, 0.08);
      --border-strong: rgba(255, 255, 255, 0.16);
      --text: #f3f4f6;
      --muted: #8b8d98;
      --accent: #ffffff;
      --accent-text: #070709;
      --danger: #ef4444;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      width: 100%;
      min-height: 100vh;
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    /* Тонкая сетка на фоне во весь экран */
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(circle at 50% 35%, black 35%, transparent 85%);
      -webkit-mask-image: radial-gradient(circle at 50% 35%, black 35%, transparent 85%);
      pointer-events: none;
      z-index: 0;
    }

    .app-shell {
      position: relative;
      z-index: 1;
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .app-shell.is-ready {
      opacity: 1;
      transform: translateY(0);
    }

    .app-shell.is-leaving {
      opacity: 0;
      transform: translateY(-4px);
    }

    /* Навигация во всю ширину */
    .topbar {
      width: 100%;
      padding: 20px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      background: rgba(7, 7, 9, 0.75);
      backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .brand {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--text);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 10px rgba(34, 197, 94, 0.6);
    }

    .nav-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-link {
      color: var(--muted);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      padding: 8px 14px;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .nav-link:hover, .nav-link.active {
      color: var(--text);
      background: rgba(255, 255, 255, 0.05);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 9px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid var(--border-strong);
      background: var(--surface);
      color: var(--text);
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .btn:hover {
      background: var(--surface-hover);
      border-color: rgba(255, 255, 255, 0.28);
    }

    .btn-primary {
      background: var(--accent);
      color: var(--accent-text);
      border-color: var(--accent);
      font-weight: 600;
    }

    .btn-primary:hover {
      background: #e5e7eb;
      border-color: #e5e7eb;
    }

    .btn-danger {
      color: #fca5a5;
      border-color: rgba(239, 68, 68, 0.25);
      background: rgba(239, 68, 68, 0.08);
    }

    .btn-danger:hover {
      background: rgba(239, 68, 68, 0.16);
      border-color: rgba(239, 68, 68, 0.45);
    }

    .nav-avatar {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      object-fit: cover;
      background: #1f2029;
    }

    /* Полноэкранный центрированный контейнер */
    .fullscreen-main {
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 24px;
    }

    .hero-block {
      max-width: 680px;
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .hero-title {
      font-size: clamp(36px, 6vw, 64px);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.05;
      color: var(--text);
    }

    .hero-subtitle {
      font-size: clamp(16px, 2vw, 19px);
      color: var(--muted);
      line-height: 1.6;
      max-width: 480px;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    /* Карточка профиля и настроек */
    .card {
      width: 100%;
      max-width: 640px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
    }

    .profile-banner {
      width: 100%;
      height: 200px;
      background: linear-gradient(135deg, #13131a 0%, #1c1c26 100%);
      background-size: cover;
      background-position: center;
      border-bottom: 1px solid var(--border);
    }

    .profile-body {
      padding: 0 28px 28px;
      position: relative;
    }

    .profile-top {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-top: -44px;
      margin-bottom: 18px;
      gap: 16px;
      flex-wrap: wrap;
    }

    .profile-avatar {
      width: 88px;
      height: 88px;
      border-radius: 20px;
      border: 4px solid var(--surface);
      background: #1a1a24;
      object-fit: cover;
    }

    .profile-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .profile-name {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 4px;
    }

    .profile-handle {
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 16px;
    }

    .profile-bio {
      font-size: 15px;
      line-height: 1.6;
      color: #d1d5db;
      white-space: pre-wrap;
      padding-top: 16px;
      border-top: 1px solid var(--border);
    }

    /* Форма настроек */
    .form-wrap {
      padding: 28px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--muted);
    }

    .form-input, .form-textarea {
      width: 100%;
      background: #09090c;
      border: 1px solid var(--border-strong);
      border-radius: 10px;
      padding: 11px 14px;
      color: var(--text);
      font-family: inherit;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    }

    .form-input:focus, .form-textarea:focus {
      border-color: rgba(255, 255, 255, 0.4);
    }

    .form-input:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .form-textarea {
      min-height: 100px;
      resize: vertical;
    }

    .status-msg {
      font-size: 13px;
      color: #4ade80;
      min-height: 18px;
    }

    @media (max-width: 640px) {
      .topbar { padding: 14px 16px; }
      .nav-link { padding: 6px 10px; font-size: 13px; }
      .btn { padding: 7px 12px; font-size: 13px; }
      .profile-body, .form-wrap { padding: 0 18px 20px; }
      .form-wrap { padding-top: 20px; }
    }
  `;
  document.head.appendChild(style);
})();

// Получение текущего пользователя и профиля
async function getCurrentUserProfile() {
  if (!sb) return null;
  const { data: { session } } = await sb.auth.getSession();
  if (!session || !session.user) return null;

  const { data: profile } = await sb
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .maybeSingle();

  if (profile) return profile;

  // Если триггер не успел создать профиль — создаём запасной
  const meta = session.user.user_metadata || {};
  const rawName = meta.preferred_username || meta.user_name || meta.name || ("player_" + session.user.id.slice(0, 6));
  const cleanName = rawName.toLowerCase().replace(/[^a-z0-9_]/g, "") || ("player_" + session.user.id.slice(0, 6));
  const { data: created } = await sb
    .from("profiles")
    .insert({ id: session.user.id, username: cleanName, avatar_url: meta.avatar_url || "" })
    .select()
    .maybeSingle();

  return created;
}

async function loginWithDiscord() {
  if (!sb) return alert("Ошибка подключения к базе.");
  await sb.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: window.location.origin + BASE_PATH
    }
  });
}

async function logoutUser() {
  if (!sb) return;
  await sb.auth.signOut();
  navigateSmooth(makeUrl(""));
}

// Плавный переход между страницами
function navigateSmooth(url) {
  const shell = document.querySelector(".app-shell");
  if (shell) {
    shell.classList.add("is-leaving");
    setTimeout(() => { window.location.href = url; }, 200);
  } else {
    window.location.href = url;
  }
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-smooth]");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || href.startsWith("http") || href.startsWith("#")) return;
  e.preventDefault();
  navigateSmooth(href);
});

// Отрисовка шапки сайта
async function renderHeader(activePage) {
  const headerEl = document.getElementById("site-header");
  if (!headerEl) return;

  const profile = await getCurrentUserProfile();

  let authHtml = `<button class="btn btn-primary" onclick="loginWithDiscord()">Войти через Discord</button>`;
  if (profile) {
    const avatar = profile.avatar_url || "https://cdn.discordapp.com/embed/avatars/0.png";
    authHtml = `
      <a href="${makeUrl(profile.username)}" data-smooth class="btn ${activePage === 'profile' ? 'active' : ''}">
        <img src="${avatar}" class="nav-avatar" alt="">
        <span>${profile.username}</span>
      </a>
      <button class="btn btn-danger" onclick="logoutUser()">Выйти</button>
    `;
  }

  headerEl.innerHTML = `
    <header class="topbar">
      <a href="${makeUrl("")}" data-smooth class="brand">
        <span class="brand-dot"></span>
        <span>@melvkin_</span>
      </a>
      <nav class="nav-group">
        <a href="${makeUrl("")}" data-smooth class="nav-link ${activePage === 'home' ? 'active' : ''}">Главная</a>
        <a href="${makeUrl("ads")}" data-smooth class="nav-link ${activePage === 'ads' ? 'active' : ''}">Реклама</a>
        ${authHtml}
      </nav>
    </header>
  `;
}

// Инициализация появления страницы
window.addEventListener("DOMContentLoaded", () => {
  requestAnimationFrame(() => {
    const shell = document.querySelector(".app-shell");
    if (shell) shell.classList.add("is-ready");
  });
});
