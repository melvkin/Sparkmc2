// ==========================================
// НАСТРОЙКИ СОЦСЕТЕЙ И ПОДКЛЮЧЕНИЯ
// ==========================================
const SOCIAL_LINKS = {
  telegram: "",
  youtube: "",
  discord: "",
  twitch: ""
};

const ADMIN_USERNAME = "melvkin_0";

const SUPABASE_URL = "https://ieybojpqsrvztfcetcgj.supabase.co";
const SUPABASE_KEY = "sb_publishable_BGAB8G5Xf1XiwQYFO1LJiA_HCviWGd7";

// ==========================================
// БАЗОВЫЕ ПУТИ И ИНИЦИАЛИЗАЦИЯ
// ==========================================
const BASE_PATH = "/Sparkmc2/";

const sb = (typeof window.supabase !== "undefined" && SUPABASE_KEY.startsWith("sb_"))
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

function appUrl(path) {
  const clean = path.replace(/^\//, "");
  return BASE_PATH + clean;
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==========================================
// ЕДИНЫЙ МИНИМАЛИСТИЧНЫЙ СТИЛЬ (FULLSCREEN)
// ==========================================
(function injectGlobalStyles() {
  const style = document.createElement("style");
  style.textContent = `
    :root {
      --bg: #0a0a0c;
      --surface: #121216;
      --surface-hover: #18181e;
      --border: rgba(255, 255, 255, 0.08);
      --border-hover: rgba(255, 255, 255, 0.18);
      --text: #f4f4f6;
      --muted: #8e8e98;
      --accent: #ffffff;
      --accent-text: #0a0a0c;
      --danger: #ff5c5c;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      min-height: 100vh;
      width: 100%;
      background-color: var(--bg);
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
      background-size: 48px 48px;
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      opacity: 0;
      transition: opacity 0.28s ease;
    }

    body.page-ready { opacity: 1; }
    body.page-leaving { opacity: 0; }

    /* Шапка */
    header.site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      width: 100%;
      background: rgba(10, 10, 12, 0.8);
      backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border);
    }

    .header-inner {
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
      font-weight: 700;
      font-size: 16px;
      letter-spacing: -0.02em;
      color: var(--text);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 10px rgba(74, 222, 128, 0.5);
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
      transition: color 0.2s, background 0.2s;
    }

    nav.nav-links a:hover, nav.nav-links a.active {
      color: var(--text);
      background: rgba(255, 255, 255, 0.06);
    }

    nav.nav-links a.admin-link {
      color: #fbbf24;
      border: 1px solid rgba(251, 191, 36, 0.25);
      background: rgba(251, 191, 36, 0.06);
    }
    nav.nav-links a.admin-link:hover {
      background: rgba(251, 191, 36, 0.14);
    }

    .auth-box {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 9px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn:hover {
      background: var(--surface-hover);
      border-color: var(--border-hover);
    }

    .btn-primary {
      background: var(--accent);
      color: var(--accent-text);
      border-color: var(--accent);
    }

    .btn-primary:hover {
      opacity: 0.9;
      background: var(--accent);
    }

    .btn-danger {
      color: var(--danger);
      border-color: rgba(255, 92, 92, 0.22);
    }

    .btn-danger:hover {
      background: rgba(255, 92, 92, 0.1);
      border-color: rgba(255, 92, 92, 0.4);
    }

    .user-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 12px 5px 6px;
      border-radius: 999px;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text);
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: border-color 0.2s;
    }

    .user-chip:hover { border-color: var(--border-hover); }

    .user-chip img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
      background: #222;
    }

    /* Основной контейнер */
    main.page-main {
      flex: 1;
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      padding: 40px 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      animation: fadeUp 0.35s ease;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px;
    }

    .input, .textarea {
      width: 100%;
      background: #0d0d10;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 11px 14px;
      color: var(--text);
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }

    .input:focus, .textarea:focus {
      border-color: rgba(255, 255, 255, 0.32);
    }

    .textarea { resize: vertical; min-height: 96px; }

    /* Подвал с соцсетями */
    footer.site-footer {
      width: 100%;
      border-top: 1px solid var(--border);
      padding: 18px 24px;
      margin-top: auto;
    }

    .footer-inner {
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    .footer-copy {
      font-size: 13px;
      color: var(--muted);
    }

    .social-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .social-btn {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--muted);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .social-btn svg { width: 17px; height: 17px; fill: currentColor; }

    .social-btn.tg:hover { color: #26a5e4; border-color: rgba(38, 165, 228, 0.45); background: rgba(38, 165, 228, 0.08); }
    .social-btn.yt:hover { color: #ff4444; border-color: rgba(255, 68, 68, 0.45); background: rgba(255, 68, 68, 0.08); }
    .social-btn.ds:hover { color: #5865f2; border-color: rgba(88, 101, 242, 0.45); background: rgba(88, 101, 242, 0.08); }
    .social-btn.tw:hover { color: #9146ff; border-color: rgba(145, 70, 255, 0.45); background: rgba(145, 70, 255, 0.08); }
  `;
  document.head.appendChild(style);
})();

// ==========================================
// АВТОРИЗАЦИЯ И ПРОФИЛИ
// ==========================================
let currentUser = null;
let currentProfile = null;

function isCurrentUserAdmin() {
  return Boolean(currentProfile && currentProfile.username === ADMIN_USERNAME);
}

async function ensureProfile(user) {
  if (!sb || !user) return null;

  const { data: existing } = await sb
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (existing) return existing;

  const meta = user.user_metadata || {};
  const raw = meta.preferred_username || meta.user_name || meta.name || ("player_" + user.id.slice(0, 6));
  let clean = raw.toLowerCase().replace(/[^a-z0-9_]/g, "");
  const reserved = ["ads", "me", "upd", "updates", "lore", "rules", "settings", "admin", "players", "login", "api"];
  if (!clean || reserved.includes(clean)) {
    clean = "player_" + user.id.slice(0, 6);
  }

  const { data: created } = await sb
    .from("profiles")
    .insert({
      id: user.id,
      username: clean,
      avatar_url: meta.avatar_url || ""
    })
    .select()
    .maybeSingle();

  return created || { id: user.id, username: clean, avatar_url: meta.avatar_url || "", banner_url: "", bio: "" };
}

async function initAuth() {
  if (!sb) return null;

  // Ждём завершения обмена OAuth-кода, если пользователь только что вернулся с Discord
  const { data: sessionData } = await sb.auth.getSession();
  let session = sessionData?.session || null;

  if (window.location.search.includes("code=") || window.location.hash.includes("access_token=")) {
    if (!session) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const retry = await sb.auth.getSession();
      session = retry.data?.session || null;
    }
    if (session) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  if (session?.user) {
    currentUser = session.user;
    currentProfile = await ensureProfile(currentUser);
  }
  return currentProfile;
}

async function loginWithDiscord(btn) {
  if (!sb) {
    alert("Ошибка подключения к базе данных.");
    return;
  }
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Переход в Discord...";
  }
  const redirectTo = window.location.origin + BASE_PATH;
  const { error } = await sb.auth.signInWithOAuth({
    provider: "discord",
    options: { redirectTo }
  });
  if (error) {
    alert("Ошибка входа: " + error.message);
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Войти через Discord";
    }
  }
}

async function logoutUser() {
  if (sb) await sb.auth.signOut();
  navigateSmooth(appUrl(""));
}

// ==========================================
// ШАПКА, ПОДВАЛ И ПЛАВНЫЕ ПЕРЕХОДЫ
// ==========================================
function renderLayoutShell() {
  const path = window.location.pathname;
  const isHome = path === BASE_PATH || path === BASE_PATH + "index.html";
  const isLore = path.endsWith("/lore") || path.endsWith("/lore.html");
  const isUpdates = path.endsWith("/updates") || path.endsWith("/updates.html");
  const isAdminPage = path.endsWith("/admin") || path.endsWith("/admin.html");

  const header = document.createElement("header");
  header.className = "site-header";

  let authHtml = `<button class="btn btn-primary" onclick="loginWithDiscord(this)">Войти через Discord</button>`;
  if (currentProfile) {
    const avatar = currentProfile.avatar_url || "https://cdn.discordapp.com/embed/avatars/0.png";
    authHtml = `
      <a href="${appUrl(currentProfile.username)}" class="user-chip" data-nav>
        <img src="${escapeHtml(avatar)}" alt="">
        <span>${escapeHtml(currentProfile.username)}</span>
      </a>
      <a href="${appUrl("settings")}" class="btn" data-nav>Настройки</a>
      <button class="btn btn-danger" onclick="logoutUser()">Выйти</button>
    `;
  }

  const adminNavHtml = isCurrentUserAdmin()
    ? `<a href="${appUrl("admin")}" class="admin-link ${isAdminPage ? "active" : ""}" data-nav>Админ-панель</a>`
    : "";

  header.innerHTML = `
    <div class="header-inner">
      <a href="${appUrl("")}" class="brand" data-nav>
        <span class="brand-dot"></span>
        <span>Spark MC</span>
      </a>
      <nav class="nav-links">
        <a href="${appUrl("")}" class="${isHome ? "active" : ""}" data-nav>Главная</a>
        <a href="${appUrl("lore")}" class="${isLore ? "active" : ""}" data-nav>Лор и механики</a>
        <a href="${appUrl("updates")}" class="${isUpdates ? "active" : ""}" data-nav>Новости</a>
        ${adminNavHtml}
      </nav>
      <div class="auth-box">${authHtml}</div>
    </div>
  `;

  document.body.prepend(header);

  // Подвал с иконками соцсетей
  const icons = {
    telegram: `<svg viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    discord: `<svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>`,
    twitch: `<svg viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>`
  };

  const socialItems = [
    { key: "telegram", cls: "tg", label: "Telegram", url: SOCIAL_LINKS.telegram },
    { key: "youtube", cls: "yt", label: "YouTube", url: SOCIAL_LINKS.youtube },
    { key: "discord", cls: "ds", label: "Discord", url: SOCIAL_LINKS.discord },
    { key: "twitch", cls: "tw", label: "Twitch", url: SOCIAL_LINKS.twitch }
  ].filter(item => item.url && item.url.trim() !== "");

  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-copy">Spark MC · Создается @melvkin_</div>
      <div class="social-row">
        ${socialItems.map(s => `
          <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener" class="social-btn ${s.cls}" title="${s.label}">
            ${icons[s.key]}
          </a>
        `).join("")}
      </div>
    </div>
  `;
  document.body.appendChild(footer);

  // Плавные переходы
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-nav]");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("#")) return;
    e.preventDefault();
    navigateSmooth(href);
  });

  requestAnimationFrame(() => document.body.classList.add("page-ready"));
}

function navigateSmooth(url) {
  document.body.classList.add("page-leaving");
  setTimeout(() => {
    window.location.href = url;
  }, 220);
}

// ==========================================
// ЗАГРУЗКА ФАЙЛОВ В SUPABASE STORAGE
// ==========================================
async function uploadMediaFile(file, folder, userId) {
  if (!sb || !file) return null;
  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  const path = `${folder}/${userId}_${Date.now()}.${ext}`;
  const { error } = await sb.storage.from("media").upload(path, file, { upsert: true });
  if (error) throw error;
  const { data } = sb.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
