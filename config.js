// ============================================================
// НАСТРОЙКИ ПОДКЛЮЧЕНИЯ К SUPABASE — SPARK MC
// ============================================================
const SUPABASE_URL = "https://ieybojpqsrvztfcetcgj.supabase.co";
const SUPABASE_KEY = "sb_publishable_BGAB8G5Xf1XiwQYFOlLJiA_HCviWGd7";

const PROJECT_NAME = "Spark MC";
const REPO_BASE = window.location.pathname.startsWith("/Sparkmc2") ? "/Sparkmc2" : "";
const SITE_ORIGIN = window.location.origin + REPO_BASE;

// ============================================================
// ЕДИНЫЙ МИНИМАЛИСТИЧНЫЙ СТИЛЬ (100% ЭКРАНА + ПЛАВНЫЕ ПЕРЕХОДЫ)
// ============================================================
(function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    :root {
      --bg: #09090b;
      --surface: rgba(18, 18, 22, 0.72);
      --surface-hover: rgba(28, 28, 34, 0.9);
      --border: rgba(255, 255, 255, 0.08);
      --border-hover: rgba(255, 255, 255, 0.18);
      --text: #f4f4f5;
      --muted: #a1a1aa;
      --accent: #ffffff;
      --accent-text: #09090b;
      --danger: #ef4444;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      width: 100%;
      min-height: 100vh;
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    body {
      display: flex;
      flex-direction: column;
      background-image:
        radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.045) 0%, transparent 55%),
        linear-gradient(to right, rgba(255, 255, 255, 0.022) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.022) 1px, transparent 1px);
      background-size: 100% 100%, 48px 48px, 48px 48px;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.28s ease, transform 0.28s ease;
    }

    body.page-ready {
      opacity: 1;
      transform: translateY(0);
    }

    body.page-leaving {
      opacity: 0;
      transform: translateY(-6px);
    }

    header.topbar {
      position: sticky;
      top: 0;
      z-index: 50;
      width: 100%;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      background: rgba(9, 9, 11, 0.72);
      border-bottom: 1px solid var(--border);
    }

    .topbar-inner {
      max-width: 1120px;
      margin: 0 auto;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .brand {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--text);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 10px rgba(34, 197, 94, 0.7);
    }

    nav.nav-links {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    nav.nav-links a {
      color: var(--muted);
      text-decoration: none;
      font-size: 14px;
      padding: 7px 12px;
      border-radius: 8px;
      transition: color 0.18s ease, background 0.18s ease;
    }

    nav.nav-links a:hover,
    nav.nav-links a.active {
      color: var(--text);
      background: rgba(255, 255, 255, 0.06);
    }

    .auth-box {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 13.5px;
      font-weight: 500;
      padding: 8px 14px;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.18s ease;
    }

    .btn:hover {
      background: var(--surface-hover);
      border-color: var(--border-hover);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: wait;
    }

    .btn-primary {
      background: var(--accent);
      color: var(--accent-text);
      border-color: var(--accent);
      font-weight: 600;
    }

    .btn-primary:hover {
      background: #e4e4e7;
      border-color: #e4e4e7;
    }

    .btn-danger {
      color: #fca5a5;
      border-color: rgba(239, 68, 68, 0.25);
    }

    .btn-danger:hover {
      background: rgba(239, 68, 68, 0.14);
      border-color: rgba(239, 68, 68, 0.45);
      color: #fecaca;
    }

    .user-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 11px 5px 6px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 500;
      transition: all 0.18s ease;
    }

    .user-pill:hover {
      border-color: var(--border-hover);
      background: var(--surface-hover);
    }

    .user-pill img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
      background: #27272a;
    }

    main.fullscreen-main {
      flex: 1;
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      padding: 40px 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .hero-center {
      max-width: 640px;
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      color: var(--muted);
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--surface);
    }

    h1.hero-title {
      font-size: clamp(34px, 6vw, 56px);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.08;
    }

    p.hero-sub {
      font-size: 16px;
      line-height: 1.6;
      color: var(--muted);
      max-width: 500px;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 6px;
    }

    .grid-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
      width: 100%;
      margin-top: 28px;
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 22px;
      transition: border-color 0.2s ease, transform 0.2s ease;
    }

    .card:hover {
      border-color: var(--border-hover);
    }

    .card h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .card p {
      font-size: 14px;
      line-height: 1.55;
      color: var(--muted);
    }

    /* Профиль /(никнейм) */
    .profile-wrap {
      width: 100%;
      max-width: 760px;
      margin: 0 auto;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 18px;
      overflow: hidden;
    }

    .profile-banner {
      width: 100%;
      height: 210px;
      background: linear-gradient(135deg, #18181b 0%, #27272a 100%);
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
      gap: 16px;
      margin-top: -46px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }

    .profile-avatar {
      width: 92px;
      height: 92px;
      border-radius: 20px;
      object-fit: cover;
      background: #18181b;
      border: 4px solid #09090b;
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
    }

    .profile-handle {
      font-size: 13.5px;
      color: var(--muted);
      margin-top: 2px;
    }

    .profile-bio {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
      font-size: 14.5px;
      line-height: 1.6;
      color: #d4d4d8;
      white-space: pre-wrap;
    }

    /* Настройки */
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 18px;
    }

    .form-group label {
      font-size: 13.5px;
      font-weight: 500;
      color: var(--muted);
    }

    .input, .textarea {
      width: 100%;
      background: rgba(9, 9, 11, 0.8);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 14px;
      color: var(--text);
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.18s ease;
    }

    .input:focus, .textarea:focus {
      border-color: rgba(255, 255, 255, 0.35);
    }

    .input[readonly] {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .textarea {
      min-height: 100px;
      resize: vertical;
    }

    .toast {
      position: fixed;
      bottom: 22px;
      right: 22px;
      background: #18181b;
      border: 1px solid var(--border-hover);
      color: var(--text);
      padding: 11px 16px;
      border-radius: 10px;
      font-size: 13.5px;
      z-index: 999;
      opacity: 0;
      transform: translateY(8px);
      transition: all 0.22s ease;
      pointer-events: none;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
})();

// ============================================================
// ПОДКЛЮЧЕНИЕ SUPABASE И АВТОРИЗАЦИЯ DISCORD
// ============================================================
const sb = (typeof window.supabase !== "undefined" && SUPABASE_KEY.startsWith("sb_"))
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        flowType: "pkce",
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

function showToast(msg) {
  let el = document.getElementById("spark-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "spark-toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 3000);
}

function appUrl(path) {
  const clean = path.startsWith("/") ? path : "/" + path;
  return REPO_BASE + clean;
}

function navigateSmooth(url) {
  document.body.classList.remove("page-ready");
  document.body.classList.add("page-leaving");
  setTimeout(() => {
    window.location.href = url;
  }, 190);
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[href]");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("http") || link.target === "_blank") return;
  e.preventDefault();
  navigateSmooth(href);
});

async function loginWithDiscord(btn) {
  if (!sb) {
    showToast("Ошибка подключения к базе данных");
    return;
  }
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Переход в Discord...";
  }
  const { error } = await sb.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: SITE_ORIGIN + "/"
    }
  });
  if (error) {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Войти через Discord";
    }
    showToast("Ошибка входа: " + error.message);
  }
}

async function logoutUser() {
  if (!sb) return;
  await sb.auth.signOut();
  navigateSmooth(appUrl("/"));
}

function cleanUsernameFromUser(user) {
  const meta = user.user_metadata || {};
  const raw = meta.preferred_username || meta.user_name || meta.name || ("player_" + user.id.slice(0, 6));
  let clean = raw.toLowerCase().replace(/[^a-z0-9_]/g, "");
  const reserved = ["lore", "rules", "updates", "settings", "ads", "me", "upd", "index", "404", "login", "api"];
  if (!clean || reserved.includes(clean)) {
    clean = "player_" + user.id.slice(0, 6);
  }
  return clean;
}

async function ensureProfile(user) {
  if (!sb || !user) return null;
  const { data: existing } = await sb
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (existing) return existing;

  const username = cleanUsernameFromUser(user);
  const avatar = (user.user_metadata && user.user_metadata.avatar_url) || "";
  const { data: created } = await sb
    .from("profiles")
    .upsert({ id: user.id, username, avatar_url: avatar }, { onConflict: "id" })
    .select()
    .maybeSingle();

  return created || { id: user.id, username, avatar_url: avatar, banner_url: "", bio: "" };
}

function renderHeader(activeKey, profile) {
  const existing = document.querySelector("header.topbar");
  if (existing) existing.remove();

  const header = document.createElement("header");
  header.className = "topbar";

  const navItems = [
    { key: "home", label: "Главная", href: appUrl("/") },
    { key: "lore", label: "Лор и механики", href: appUrl("/lore.html") },
    { key: "rules", label: "Правила", href: appUrl("/rules.html") },
    { key: "updates", label: "Новости", href: appUrl("/updates") }
  ];

  const navHtml = navItems
    .map((item) => `<a href="${item.href}" class="${activeKey === item.key ? "active" : ""}">${item.label}</a>`)
    .join("");

  let authHtml = `<button class="btn btn-primary" id="login-btn">Войти через Discord</button>`;
  if (profile) {
    const ava = profile.avatar_url || "https://cdn.discordapp.com/embed/avatars/0.png";
    authHtml = `
      <a href="${appUrl("/" + profile.username)}" class="user-pill" title="Мой профиль">
        <img src="${ava}" alt="">
        <span>${profile.username}</span>
      </a>
      <a href="${appUrl("/settings")}" class="btn">Настройки</a>
      <button class="btn btn-danger" id="logout-btn">Выйти</button>
    `;
  }

  header.innerHTML = `
    <div class="topbar-inner">
      <a href="${appUrl("/")}" class="brand">
        <span class="brand-dot"></span>
        <span>${PROJECT_NAME}</span>
      </a>
      <nav class="nav-links">${navHtml}</nav>
      <div class="auth-box">${authHtml}</div>
    </div>
  `;

  document.body.prepend(header);

  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => loginWithDiscord(loginBtn));
  }
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }
}

async function initSparkApp(activeKey, onReady) {
  renderHeader(activeKey, null);
  requestAnimationFrame(() => document.body.classList.add("page-ready"));

  if (!sb) {
    if (onReady) await onReady(null, null);
    return;
  }

  // Ждём завершения обмена ?code= от Discord, прежде чем чистить адресную строку
  const { data: { session } } = await sb.auth.getSession();

  if (window.location.search.includes("code=") || window.location.hash.includes("access_token=")) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  let currentUser = session ? session.user : null;
  let currentProfile = null;

  if (currentUser) {
    currentProfile = await ensureProfile(currentUser);
    renderHeader(activeKey, currentProfile);
  }

  sb.auth.onAuthStateChange(async (event, newSession) => {
    if (event === "SIGNED_IN" && newSession && !currentUser) {
      currentUser = newSession.user;
      currentProfile = await ensureProfile(currentUser);
      renderHeader(activeKey, currentProfile);
      if (window.location.search.includes("code=")) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } else if (event === "SIGNED_OUT") {
      currentUser = null;
      currentProfile = null;
      renderHeader(activeKey, null);
    }
  });

  if (onReady) {
    await onReady(currentUser, currentProfile);
  }
}
