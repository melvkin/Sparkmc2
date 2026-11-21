// ============================================================
// НАСТРОЙКИ ПОДКЛЮЧЕНИЯ К SUPABASE
// Вставьте ваш Publishable key (sb_publishable_...) в кавычки ниже:
// ============================================================
const SUPABASE_URL = "https://ieybojpqsrvztfcetcgj.supabase.co";
const SUPABASE_KEY = "sb_publishable_BGAB8G5Xf1XiwQYFOlLJiA_HCviWGd7";

// ============================================================
// ДАЛЬШЕ КОД МЕНЯТЬ НЕ НУЖНО — ВСЁ РАБОТАЕТ АВТОМАТИЧЕСКИ
// ============================================================
const sb = (typeof window.supabase !== "undefined" && SUPABASE_KEY.startsWith("sb_"))
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

function getBasePath() {
  const host = window.location.hostname;
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (host.endsWith("github.io") && parts.length > 0) {
    const reserved = ["me", "upd", "ads", "settings", "index.html", "me.html", "ads.html", "404.html"];
    if (!reserved.includes(parts[0].toLowerCase())) {
      return "/" + parts[0] + "/";
    }
  }
  return "/";
}

function getCurrentRoute() {
  const base = getBasePath();
  let path = window.location.pathname;
  if (path.startsWith(base)) {
    path = path.slice(base.length);
  }
  path = path.replace(/^\/+|\/+$/g, "").replace(/\.html$/i, "");
  return path;
}

function linkTo(route) {
  const base = getBasePath();
  if (!route || route === "index") return base;
  return base + route.replace(/^\/+/, "");
}

const SHARED_CSS = `
  :root {
    --bg: #0b0c0e;
    --surface: #13151a;
    --surface-hover: #191c23;
    --border: #222630;
    --text: #f3f4f6;
    --muted: #8b92a5;
    --accent: #5865F2;
    --accent-hover: #4752c4;
    --green: #22c55e;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  a { color: inherit; text-decoration: none; }
  .container {
    width: 100%;
    max-width: 880px;
    margin: 0 auto;
    padding: 0 20px;
  }
  header {
    border-bottom: 1px solid var(--border);
    background: rgba(11, 12, 14, 0.85);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    gap: 16px;
  }
  .brand {
    font-weight: 700;
    font-size: 17px;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .brand-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 10px var(--green);
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
  .nav-links a {
    padding: 7px 12px;
    border-radius: 8px;
    font-size: 14px;
    color: var(--muted);
    transition: 0.15s;
  }
  .nav-links a:hover, .nav-links a.active {
    color: var(--text);
    background: var(--surface);
  }
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 9px 16px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    transition: 0.15s;
  }
  .btn:hover { background: var(--surface-hover); border-color: #323846; }
  .btn-discord {
    background: var(--accent);
    border-color: var(--accent);
    color: #fff;
  }
  .btn-discord:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
  .btn-sm { padding: 6px 12px; font-size: 13px; border-radius: 8px; }
  main { flex: 1; padding: 40px 0 64px; }
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
  }
  .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(88, 101, 242, 0.12);
    color: #9aa4ff;
    border: 1px solid rgba(88, 101, 242, 0.25);
  }
  .user-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px 12px 5px 6px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--border);
    font-size: 13px;
    font-weight: 500;
  }
  .user-pill:hover { background: var(--surface-hover); }
  .user-pill img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    background: #1f2430;
  }
  footer {
    border-top: 1px solid var(--border);
    padding: 24px 0;
    color: var(--muted);
    font-size: 13px;
  }
  .footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #181b22;
    border: 1px solid var(--border);
    color: var(--text);
    padding: 12px 18px;
    border-radius: 12px;
    font-size: 14px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    z-index: 999;
    opacity: 0;
    transform: translateY(10px);
    transition: 0.2s;
    pointer-events: none;
  }
  .toast.show { opacity: 1; transform: translateY(0); }
  @media (max-width: 640px) {
    .nav-inner { height: auto; padding: 12px 0; flex-wrap: wrap; }
  }
`;

(function injectStyles() {
  const style = document.createElement("style");
  style.textContent = SHARED_CSS;
  document.head.appendChild(style);
})();

function showToast(msg) {
  let el = document.getElementById("global-toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "global-toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove("show"), 3200);
}

async function getCurrentProfile() {
  if (!sb) return null;
  const { data: { session } } = await sb.auth.getSession();
  if (!session || !session.user) return null;
  const { data: profile } = await sb
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .maybeSingle();
  return profile ? { user: session.user, profile } : { user: session.user, profile: null };
}

async function loginWithDiscord() {
  if (!sb) {
    showToast("Сначала вставьте Publishable key в файл config.js");
    return;
  }
  const redirectUrl = window.location.origin + getBasePath();
  const { error } = await sb.auth.signInWithOAuth({
    provider: "discord",
    options: { redirectTo: redirectUrl }
  });
  if (error) showToast("Ошибка входа: " + error.message);
}

async function logoutDiscord() {
  if (!sb) return;
  await sb.auth.signOut();
  window.location.href = linkTo("");
}

async function unlockAchievement(slug) {
  if (!sb) return;
  const auth = await getCurrentProfile();
  if (!auth || !auth.profile) return;
  const { data: ach } = await sb
    .from("achievements")
    .select("id, title, icon")
    .eq("slug", slug)
    .maybeSingle();
  if (!ach) return;
  const { error } = await sb
    .from("user_achievements")
    .insert({ user_id: auth.profile.id, achievement_id: ach.id });
  if (!error) {
    showToast(`Получена ачивка: ${ach.icon} ${ach.title}`);
  }
}

async function renderLayout(activeRoute) {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");

  if (headerEl) {
    headerEl.innerHTML = `
      <div class="container nav-inner">
        <a href="${linkTo("")}" class="brand">
          <span class="brand-dot"></span>
          <span>@melvkin_</span>
        </a>
        <nav class="nav-links">
          <a href="${linkTo("")}" class="${activeRoute === "" ? "active" : ""}">Главная</a>
          <a href="${linkTo("me")}" class="${activeRoute === "me" ? "active" : ""}">О проекте</a>
          <a href="${linkTo("upd")}" class="${activeRoute === "upd" ? "active" : ""}">Обновления</a>
          <a href="${linkTo("ads")}" class="${activeRoute === "ads" ? "active" : ""}">Реклама</a>
        </nav>
        <div id="auth-slot">
          <button class="btn btn-discord btn-sm" onclick="loginWithDiscord()">Войти через Discord</button>
        </div>
      </div>
    `;
  }

  if (footerEl) {
    footerEl.innerHTML = `
      <div class="container footer-inner">
        <span>Создается @melvkin_ • Лор, Механики и сообщество</span>
        <div style="display:flex;gap:14px;">
          <a href="${linkTo("me")}">/me</a>
          <a href="${linkTo("upd")}">/upd</a>
          <a href="${linkTo("ads")}">/ads</a>
        </div>
      </div>
    `;
  }

  const auth = await getCurrentProfile();
  const authSlot = document.getElementById("auth-slot");
  if (auth && auth.profile && authSlot) {
    const avatar = auth.profile.avatar_url || "https://cdn.discordapp.com/embed/avatars/0.png";
    authSlot.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <a href="${linkTo(auth.profile.username)}" class="user-pill" title="Открыть мой профиль">
          <img src="${avatar}" alt="">
          <span>${auth.profile.username}</span>
        </a>
        <a href="${linkTo("settings")}" class="btn btn-sm" title="Настройки профиля">⚙️</a>
      </div>
    `;
  }
}
