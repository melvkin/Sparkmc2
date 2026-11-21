// ============================================================
// 1. ССЫЛКИ НА ВАШИ СОЦСЕТИ (просто вставьте свои ссылки в кавычки)
// Если оставить "" (пустые кавычки), иконка не будет показываться
// ============================================================
const SOCIAL_LINKS = {
  telegram: "https://t.me/",
  youtube: "https://youtube.com/",
  discord: "https://discord.gg/",
  twitch: "https://twitch.tv/"
};

// ============================================================
// 2. НАСТРОЙКИ ПОДКЛЮЧЕНИЯ К SUPABASE (уже настроены)
// ============================================================
const SUPABASE_URL = "https://ieybojpqsrvztfcetcgj.supabase.co";
const SUPABASE_KEY = "sb_publishable_BGAB8G5Xf1XiwQYFOlLJiA_HCviWGd7";

// ============================================================
// ДАЛЬШЕ КОД МЕНЯТЬ НЕ НУЖНО — ВСЁ РАБОТАЕТ АВТОМАТИЧЕСКИ
// ============================================================
const REPO_NAME = "Sparkmc2";
const BASE_PATH = location.hostname.endsWith("github.io") && location.pathname.startsWith("/" + REPO_NAME)
  ? "/" + REPO_NAME
  : "";
const SITE_ORIGIN_BASE = location.origin + BASE_PATH;

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

const RESERVED_SLUGS = new Set([
  "", "index.html", "lore", "lore.html", "updates", "updates.html",
  "settings", "settings.html", "404.html", "config.js"
]);

function routeUrl(route) {
  const clean = route.replace(/^\/+/, "");
  return BASE_PATH + (clean ? "/" + clean : "/");
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function injectSharedStyles() {
  if (document.getElementById("spark-shared-css")) return;
  const style = document.createElement("style");
  style.id = "spark-shared-css";
  style.textContent = `
    :root {
      --bg: #09090b;
      --surface: #111114;
      --surface-hover: #18181d;
      --border: rgba(255, 255, 255, 0.08);
      --border-strong: rgba(255, 255, 255, 0.16);
      --text: #fafafa;
      --muted: #8e8e98;
      --accent: #ffffff;
      --accent-text: #09090b;
      --discord: #5865F2;
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
        linear-gradient(rgba(255, 255, 255, 0.022) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.022) 1px, transparent 1px);
      background-size: 100% 100%, 44px 44px, 44px 44px;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1), transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    }

    body.page-ready {
      opacity: 1;
      transform: translateY(0);
    }

    body.page-leaving {
      opacity: 0;
      transform: translateY(-6px);
      pointer-events: none;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* Шапка */
    .topbar {
      position: sticky;
      top: 0;
      z-index: 50;
      width: 100%;
      height: 64px;
      padding: 0 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(9, 9, 11, 0.78);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid var(--border);
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 28px;
    }

    .brand {
      font-weight: 700;
      font-size: 15px;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--text);
    }

    .brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
      box-shadow: 0 0 12px rgba(34, 197, 94, 0.7);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .nav-link {
      font-size: 13.5px;
      color: var(--muted);
      padding: 7px 12px;
      border-radius: 8px;
      transition: color 0.18s ease, background 0.18s ease;
    }

    .nav-link:hover {
      color: var(--text);
      background: rgba(255, 255, 255, 0.05);
    }

    .nav-link.active {
      color: var(--text);
      background: rgba(255, 255, 255, 0.08);
      font-weight: 500;
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 13.5px;
      font-weight: 500;
      padding: 8px 15px;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      cursor: pointer;
      transition: all 0.18s ease;
      font-family: inherit;
    }

    .btn:hover {
      background: var(--surface-hover);
      border-color: var(--border-strong);
      transform: translateY(-1px);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: wait;
      transform: none;
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

    .btn-discord {
      background: var(--discord);
      border-color: var(--discord);
      color: #fff;
    }

    .btn-discord:hover {
      background: #4752c4;
      border-color: #4752c4;
    }

    .btn-danger {
      color: #fca5a5;
      border-color: rgba(239, 68, 68, 0.25);
      background: rgba(239, 68, 68, 0.08);
    }

    .btn-danger:hover {
      background: rgba(239, 68, 68, 0.16);
      border-color: rgba(239, 68, 68, 0.45);
      color: #fecaca;
    }

    .user-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 5px 12px 5px 6px;
      border-radius: 999px;
      background: var(--surface);
      border: 1px solid var(--border);
      font-size: 13.5px;
      font-weight: 500;
      transition: all 0.18s ease;
    }

    .user-pill:hover {
      border-color: var(--border-strong);
      background: var(--surface-hover);
    }

    .user-pill img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      object-fit: cover;
      background: #27272a;
    }

    /* Основной контейнер */
    .main-wrap {
      flex: 1;
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
      padding: 48px 24px 36px;
      display: flex;
      flex-direction: column;
    }

    .main-wrap.centered {
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    /* Карточки */
    .card {
      background: rgba(17, 17, 20, 0.82);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 26px;
      backdrop-filter: blur(10px);
    }

    .grid-2 {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    /* Нижний футер с красивыми иконками соцсетей */
    .site-footer {
      width: 100%;
      padding: 20px 24px 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      border-top: 1px solid var(--border);
      background: rgba(9, 9, 11, 0.55);
      backdrop-filter: blur(10px);
    }

    .social-dock {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .social-btn {
      width: 44px;
      height: 44px;
      border-radius: 13px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--muted);
      transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1), color 0.2s ease, border-color 0.2s ease, background 0.2s ease, box-shadow 0.22s ease;
    }

    .social-btn svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
      transition: transform 0.22s ease;
    }

    .social-btn:hover {
      transform: translateY(-3px) scale(1.04);
      color: #ffffff;
    }

    .social-btn.tg:hover {
      background: rgba(42, 171, 238, 0.14);
      border-color: rgba(42, 171, 238, 0.5);
      color: #38bdf8;
      box-shadow: 0 8px 22px -6px rgba(42, 171, 238, 0.45);
    }

    .social-btn.yt:hover {
      background: rgba(255, 0, 51, 0.14);
      border-color: rgba(255, 0, 51, 0.5);
      color: #f87171;
      box-shadow: 0 8px 22px -6px rgba(255, 0, 51, 0.45);
    }

    .social-btn.ds:hover {
      background: rgba(88, 101, 242, 0.16);
      border-color: rgba(88, 101, 242, 0.55);
      color: #818cf8;
      box-shadow: 0 8px 22px -6px rgba(88, 101, 242, 0.5);
    }

    .social-btn.tw:hover {
      background: rgba(145, 70, 255, 0.16);
      border-color: rgba(145, 70, 255, 0.55);
      color: #c084fc;
      box-shadow: 0 8px 22px -6px rgba(145, 70, 255, 0.5);
    }

    .footer-copy {
      font-size: 12px;
      color: #52525b;
      letter-spacing: 0.01em;
    }

    @media (max-width: 720px) {
      .topbar {
        padding: 0 16px;
        height: auto;
        min-height: 60px;
        flex-wrap: wrap;
        gap: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
      }
      .topbar-left {
        gap: 14px;
        flex-wrap: wrap;
      }
      .grid-2 {
        grid-template-columns: 1fr;
      }
    }
  `;
  document.head.appendChild(style);
}

function setupSmoothTransitions() {
  requestAnimationFrame(() => {
    document.body.classList.add("page-ready");
  });

  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      document.body.classList.remove("page-leaving");
      document.body.classList.add("page-ready");
    }
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || link.target === "_blank") return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const url = new URL(link.href, location.origin);
    if (url.origin !== location.origin) return;

    e.preventDefault();
    document.body.classList.remove("page-ready");
    document.body.classList.add("page-leaving");
    setTimeout(() => {
      location.href = url.href;
    }, 210);
  });
}

function navigateSmooth(url) {
  document.body.classList.remove("page-ready");
  document.body.classList.add("page-leaving");
  setTimeout(() => {
    location.href = url;
  }, 210);
}

async function loginWithDiscord(btn) {
  if (!sb) {
    alert("Ошибка подключения к Supabase. Проверьте config.js.");
    return;
  }
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Переход в Discord...";
  }
  const redirectTarget = SITE_ORIGIN_BASE + "/";
  const { error } = await sb.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: redirectTarget
    }
  });
  if (error) {
    alert("Не удалось запустить вход через Discord: " + error.message);
    if (btn) {
      btn.disabled = false;
      btn.textContent = "Войти через Discord";
    }
  }
}

async function logoutUser() {
  if (!sb) return;
  await sb.auth.signOut();
  navigateSmooth(routeUrl(""));
}

async function getCurrentUserAndProfile() {
  if (!sb) return { user: null, profile: null };

  const { data: sessionData } = await sb.auth.getSession();
  const user = sessionData?.session?.user || null;

  if (user && (location.search.includes("code=") || location.hash.includes("access_token="))) {
    history.replaceState(null, "", location.pathname);
  }

  if (!user) return { user: null, profile: null };

  let { data: profile } = await sb
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const meta = user.user_metadata || {};
    const raw = meta.preferred_username || meta.user_name || meta.name || ("player_" + user.id.slice(0, 6));
    let clean = String(raw).toLowerCase().replace(/[^a-z0-9_]/g, "");
    if (!clean || RESERVED_SLUGS.has(clean)) {
      clean = "player_" + user.id.slice(0, 6);
    }
    const { data: created } = await sb
      .from("profiles")
      .upsert({
        id: user.id,
        username: clean,
        avatar_url: meta.avatar_url || ""
      }, { onConflict: "id" })
      .select("*")
      .maybeSingle();
    profile = created || {
      id: user.id,
      username: clean,
      avatar_url: meta.avatar_url || "",
      banner_url: "",
      bio: ""
    };
  }

  return { user, profile };
}

function renderFooter() {
  if (document.getElementById("spark-footer")) return;

  const items = [
    {
      key: "telegram",
      cls: "tg",
      label: "Telegram",
      svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`
    },
    {
      key: "youtube",
      cls: "yt",
      label: "YouTube",
      svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
    },
    {
      key: "discord",
      cls: "ds",
      label: "Discord",
      svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>`
    },
    {
      key: "twitch",
      cls: "tw",
      label: "Twitch",
      svg: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>`
    }
  ];

  const linksHtml = items
    .filter(item => SOCIAL_LINKS && SOCIAL_LINKS[item.key] && SOCIAL_LINKS[item.key].trim() !== "")
    .map(item => `
      <a class="social-btn ${item.cls}" href="${escapeHtml(SOCIAL_LINKS[item.key].trim())}" target="_blank" rel="noopener noreferrer" title="${item.label}" aria-label="${item.label}">
        ${item.svg}
      </a>
    `)
    .join("");

  const footer = document.createElement("footer");
  footer.id = "spark-footer";
  footer.className = "site-footer";
  footer.innerHTML = `
    ${linksHtml ? `<div class="social-dock">${linksHtml}</div>` : ""}
    <div class="footer-copy">Spark MC · @melvkin_</div>
  `;
  document.body.appendChild(footer);
}

async function initLayout(activeKey) {
  injectSharedStyles();
  setupSmoothTransitions();

  const header = document.createElement("header");
  header.className = "topbar";
  header.innerHTML = `
    <div class="topbar-left">
      <a href="${routeUrl("")}" class="brand">
        <span class="brand-dot"></span>
        <span>Spark MC</span>
      </a>
      <nav class="nav-links">
        <a href="${routeUrl("")}" class="nav-link ${activeKey === "home" ? "active" : ""}">Главная</a>
        <a href="${routeUrl("lore.html")}" class="nav-link ${activeKey === "lore" ? "active" : ""}">Лор и механики</a>
        <a href="${routeUrl("updates")}" class="nav-link ${activeKey === "updates" ? "active" : ""}">Новости</a>
      </nav>
    </div>
    <div class="topbar-right" id="auth-bar">
      <span style="font-size:13px;color:var(--muted)">Загрузка...</span>
    </div>
  `;
  document.body.prepend(header);
  renderFooter();

  const { user, profile } = await getCurrentUserAndProfile();
  const authBar = document.getElementById("auth-bar");
  if (!authBar) return { user, profile };

  if (user && profile) {
    const avatar = profile.avatar_url || "https://cdn.discordapp.com/embed/avatars/0.png";
    authBar.innerHTML = `
      <a href="${routeUrl(profile.username)}" class="user-pill" title="Открыть профиль">
        <img src="${escapeHtml(avatar)}" alt="">
        <span>${escapeHtml(profile.username)}</span>
      </a>
      <a href="${routeUrl("settings")}" class="btn ${activeKey === "settings" ? "btn-primary" : ""}">Настройки</a>
      <button type="button" class="btn btn-danger" id="top-logout-btn">Выйти</button>
    `;
    document.getElementById("top-logout-btn")?.addEventListener("click", logoutUser);
  } else {
    authBar.innerHTML = `
      <button type="button" class="btn btn-discord" id="top-login-btn">Войти через Discord</button>
    `;
    const btn = document.getElementById("top-login-btn");
    btn?.addEventListener("click", () => loginWithDiscord(btn));
  }

  return { user, profile };
}
