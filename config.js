// ============================================================
// НАСТРОЙКИ ПОДКЛЮЧЕНИЯ К SUPABASE
// ============================================================
const SUPABASE_URL = "https://ieybojpqsrvztfcetcgj.supabase.co";
const SUPABASE_KEY = "sb_publishable_BGAB8G5Xf1XiwQYFOlLJiA_HCviWGd7";

const sb = (typeof window.supabase !== "undefined" && SUPABASE_KEY.startsWith("sb_"))
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

const BASE_PATH = window.location.pathname.startsWith("/Sparkmc2") ? "/Sparkmc2" : "";

function getRoute() {
  let path = window.location.pathname;
  if (BASE_PATH && path.startsWith(BASE_PATH)) {
    path = path.slice(BASE_PATH.length);
  }
  path = path.replace(/^\/+|\/+$/g, "");
  if (path.endsWith(".html")) path = path.slice(0, -5);
  return path;
}

function makeUrl(route) {
  const clean = route.replace(/^\/+|\/+$/g, "");
  return clean ? `${BASE_PATH}/${clean}` : `${BASE_PATH}/`;
}

// ============================================================
// ЕДИНЫЙ МИНИМАЛИСТИЧНЫЙ СТИЛЬ И ПЛАВНЫЕ ПЕРЕХОДЫ
// ============================================================
function injectStyles() {
  if (document.getElementById("spark-core-styles")) return;
  const style = document.createElement("style");
  style.id = "spark-core-styles";
  style.textContent = `
    :root {
      --bg: #09090b;
      --surface: #111114;
      --surface-hover: #18181c;
      --border: rgba(255, 255, 255, 0.08);
      --border-hover: rgba(255, 255, 255, 0.16);
      --text: #f4f4f5;
      --muted: #a1a1aa;
      --accent: #ffffff;
      --accent-text: #09090b;
      --danger: #ef4444;
      --radius: 14px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    body {
      display: flex;
      flex-direction: column;
      opacity: 0;
      transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    }
    body.page-ready { opacity: 1; }
    body.page-leave { opacity: 0; }

    /* Шапка */
    .navbar {
      width: 100%;
      max-width: 760px;
      margin: 0 auto;
      padding: 22px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .nav-links {
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
      border-radius: 10px;
      transition: color 0.2s, background 0.2s;
    }
    .nav-link:hover, .nav-link.active {
      color: var(--text);
      background: rgba(255, 255, 255, 0.06);
    }
    .nav-user {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Кнопки */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 500;
      padding: 8px 14px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
      font-family: inherit;
    }
    .btn:hover {
      background: var(--surface-hover);
      border-color: var(--border-hover);
      transform: translateY(-1px);
    }
    .btn:active { transform: translateY(0); }
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
      border-color: rgba(239, 68, 68, 0.22);
      background: rgba(239, 68, 68, 0.06);
    }
    .btn-danger:hover {
      background: rgba(239, 68, 68, 0.14);
      border-color: rgba(239, 68, 68, 0.4);
      color: #fecaca;
    }

    /* Плавный контейнер контента */
    .page-container {
      flex: 1;
      width: 100%;
      max-width: 760px;
      margin: 0 auto;
      padding: 20px 20px 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      animation: contentSlideUp 0.38s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    @keyframes contentSlideUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Минималистичная карточка */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      transition: border-color 0.25s ease;
    }
    .card-center {
      max-width: 460px;
      width: 100%;
      margin: 0 auto;
      text-align: center;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      letter-spacing: -0.02em;
      margin-bottom: 10px;
    }
    .subtitle {
      font-size: 14px;
      color: var(--muted);
      line-height: 1.6;
    }

    /* Профиль */
    .profile-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      max-width: 560px;
      width: 100%;
      margin: 0 auto;
    }
    .profile-banner {
      width: 100%;
      height: 170px;
      background: linear-gradient(135deg, #18181b 0%, #27272a 100%);
      background-size: cover;
      background-position: center;
      border-bottom: 1px solid var(--border);
    }
    .profile-body {
      padding: 0 26px 28px;
      position: relative;
    }
    .profile-avatar {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      border: 4px solid var(--surface);
      background: #27272a;
      object-fit: cover;
      margin-top: -42px;
      display: block;
    }
    .profile-header-row {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }
    .profile-username {
      font-size: 21px;
      font-weight: 600;
      letter-spacing: -0.02em;
    }
    .profile-bio {
      margin-top: 10px;
      font-size: 14px;
      color: var(--muted);
      line-height: 1.6;
      white-space: pre-wrap;
    }

    /* Форма настроек */
    .form-group {
      margin-bottom: 18px;
      text-align: left;
    }
    .form-label {
      display: block;
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 8px;
    }
    .form-input, .form-textarea {
      width: 100%;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 10px 14px;
      color: var(--text);
      font-size: 14px;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }
    .form-input:focus, .form-textarea:focus {
      border-color: rgba(255, 255, 255, 0.3);
    }
    .form-input:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .form-textarea {
      min-height: 96px;
      resize: vertical;
    }
    .toast {
      margin-top: 14px;
      font-size: 13px;
      color: #a1a1aa;
      min-height: 20px;
    }
  `;
  document.head.appendChild(style);
}

// ============================================================
// ПЛАВНАЯ НАВИГАЦИЯ БЕЗ РЕЗКИХ ПЕРЕКЛЮЧЕНИЙ
// ============================================================
function navigateSmooth(url) {
  document.body.classList.remove("page-ready");
  document.body.classList.add("page-leave");
  setTimeout(() => {
    window.location.href = url;
  }, 240);
}

function bindSmoothLinks() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("#") || link.target === "_blank") return;
    e.preventDefault();
    navigateSmooth(link.href);
  });
}

// ============================================================
// АВТОРИЗАЦИЯ DISCORD И ВЫХОД ИЗ АККАУНТА
// ============================================================
async function loginWithDiscord() {
  if (!sb) return alert("Ошибка подключения к базе.");
  await sb.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: window.location.origin + makeUrl("")
    }
  });
}

async function logoutAccount() {
  if (!sb) return;
  await sb.auth.signOut();
  navigateSmooth(makeUrl(""));
}

async function getCurrentUserProfile() {
  if (!sb) return null;
  const { data: { session } } = await sb.auth.getSession();
  if (!session?.user) return null;

  const { data: profile } = await sb
    .from("profiles")
    .select("id, username, avatar_url, banner_url, bio")
    .eq("id", session.user.id)
    .single();

  return profile || null;
}

// ============================================================
// ШАПКА САЙТА (ТОЛЬКО ГЛАВНАЯ, РЕКЛАМА И ПРОФИЛЬ/ВЫХОД)
// ============================================================
async function renderNavbar() {
  const header = document.getElementById("navbar");
  if (!header) return;

  const currentRoute = getRoute();
  const profile = await getCurrentUserProfile();

  const homeActive = currentRoute === "" ? "active" : "";
  const adsActive = currentRoute === "ads" ? "active" : "";

  let rightHtml = `
    <button class="btn btn-primary" onclick="loginWithDiscord()">Войти через Discord</button>
  `;

  if (profile) {
    rightHtml = `
      <a href="${makeUrl(profile.username)}" class="btn">@${profile.username}</a>
      <a href="${makeUrl("settings")}" class="btn">Настройки</a>
      <button class="btn btn-danger" onclick="logoutAccount()">Выйти</button>
    `;
  }

  header.innerHTML = `
    <nav class="navbar">
      <div class="nav-links">
        <a href="${makeUrl("")}" class="nav-link ${homeActive}">Главная</a>
        <a href="${makeUrl("ads")}" class="nav-link ${adsActive}">Реклама</a>
      </div>
      <div class="nav-user">${rightHtml}</div>
    </nav>
  `;
}

// ============================================================
// ЗАГРУЗКА КАРТИНОК В SUPABASE STORAGE
// ============================================================
async function uploadMediaFile(file, userId, folder) {
  const ext = file.name.split(".").pop() || "png";
  const filePath = `${userId}/${folder}_${Date.now()}.${ext}`;
  const { error } = await sb.storage.from("media").upload(filePath, file, { upsert: true });
  if (error) throw error;
  const { data } = sb.storage.from("media").getPublicUrl(filePath);
  return data.publicUrl;
}

// ============================================================
// ИНИЦИАЛИЗАЦИЯ КАЖДОЙ СТРАНИЦЫ
// ============================================================
document.addEventListener("DOMContentLoaded", async () => {
  injectStyles();
  bindSmoothLinks();
  await renderNavbar();
  requestAnimationFrame(() => {
    document.body.classList.add("page-ready");
  });
});
