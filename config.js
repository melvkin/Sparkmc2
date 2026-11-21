// ==========================================
// НАСТРОЙКИ SUPABASE (УЖЕ ЗАПОЛНЕНЫ)
// ==========================================
const SUPABASE_URL = "https://ieybojpqsrvztfcetcgj.supabase.co";
const SUPABASE_KEY = "sb_publishable_BGAB8G5Xf1XiwQYF0lLJiA_HCviWGd7";

// Определяем базовый путь сайта (/Sparkmc2/ на GitHub Pages или / локально)
const BASE_PATH = (() => {
  const parts = window.location.pathname.split('/').filter(Boolean);
  if (window.location.hostname.endsWith('github.io') && parts.length > 0) {
    return '/' + parts[0] + '/';
  }
  return '/';
})();

const RESERVED_ROUTES = new Set([
  '', 'index', 'index.html', 'lore', 'lore.html',
  'rules', 'rules.html', 'updates', 'updates.html',
  'settings', 'settings.html', '404', '404.html'
]);

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Единые стили для всего сайта
const SHARED_STYLES = `
  :root {
    --bg: #08080a;
    --surface: rgba(18, 18, 22, 0.78);
    --surface-solid: #111115;
    --border: rgba(255, 255, 255, 0.08);
    --border-hover: rgba(255, 255, 255, 0.18);
    --text: #f4f4f6;
    --muted: #8e8e9a;
    --accent: #ffffff;
    --discord: #5865F2;
    --discord-hover: #4752C4;
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

  /* Тонкая сетка на весь экран в духе SMP */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(to right, rgba(255, 255, 255, 0.025) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(circle at 50% 35%, black 35%, transparent 85%);
    -webkit-mask-image: radial-gradient(circle at 50% 35%, black 35%, transparent 85%);
    pointer-events: none;
    z-index: 0;
  }

  /* Плавный переход страниц */
  .page-shell {
    position: relative;
    z-index: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .page-shell.ready {
    opacity: 1;
    transform: translateY(0);
  }

  .page-shell.leaving {
    opacity: 0;
    transform: translateY(-6px);
  }

  /* Шапка сайта */
  header.site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    height: 64px;
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(8, 8, 10, 0.72);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: var(--text);
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.02em;
  }

  .brand-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 10px rgba(34, 197, 94, 0.6);
  }

  nav.site-nav {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  nav.site-nav a {
    text-decoration: none;
    color: var(--muted);
    font-size: 14px;
    font-weight: 500;
    padding: 7px 13px;
    border-radius: 8px;
    transition: color 0.18s, background 0.18s;
  }

  nav.site-nav a:hover,
  nav.site-nav a.active {
    color: var(--text);
    background: rgba(255, 255, 255, 0.06);
  }

  .auth-area {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 15px;
    border-radius: 9px;
    font-size: 13.5px;
    font-weight: 500;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--text);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .btn:hover {
    border-color: var(--border-hover);
    background: rgba(255, 255, 255, 0.09);
  }

  .btn-discord {
    background: var(--discord);
    border-color: transparent;
    color: #fff;
  }

  .btn-discord:hover {
    background: var(--discord-hover);
  }

  .btn-primary {
    background: #fff;
    color: #08080a;
    border-color: #fff;
    font-weight: 600;
  }

  .btn-primary:hover {
    background: #e4e4e7;
    border-color: #e4e4e7;
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

  .user-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px 4px 5px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: rgba(255, 255, 255, 0.04);
    color: var(--text);
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 500;
    transition: all 0.18s;
  }

  .user-pill:hover {
    border-color: var(--border-hover);
    background: rgba(255, 255, 255, 0.08);
  }

  .user-pill img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    background: #222;
  }

  /* Основной контейнер */
  main.content {
    flex: 1;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
  }

  main.content.fullscreen-center {
    max-width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: calc(100vh - 64px);
    padding: 32px 20px;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    backdrop-filter: blur(12px);
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  .page-title {
    font-size: clamp(28px, 4vw, 38px);
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 10px;
  }

  .page-subtitle {
    color: var(--muted);
    font-size: 15.5px;
    line-height: 1.6;
    margin-bottom: 32px;
  }

  /* Профиль пользователя */
  .profile-card {
    width: 100%;
    max-width: 760px;
    margin: 0 auto;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    backdrop-filter: blur(14px);
  }

  .profile-banner {
    width: 100%;
    height: 210px;
    background: linear-gradient(135deg, #16161d 0%, #1f1f2b 100%);
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
    border-radius: 22px;
    border: 4px solid #0d0d11;
    background: #1a1a22;
    object-fit: cover;
  }

  .profile-actions {
    display: flex;
    gap: 8px;
    padding-bottom: 4px;
  }

  .profile-username {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }

  .profile-bio {
    color: #c8c8d2;
    font-size: 15px;
    line-height: 1.6;
    white-space: pre-wrap;
  }

  .profile-bio.empty {
    color: var(--muted);
    font-style: italic;
  }

  /* Форма настроек */
  .form-group {
    margin-bottom: 18px;
  }

  .form-label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--muted);
    margin-bottom: 8px;
  }

  .form-input, .form-textarea {
    width: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 11px 14px;
    color: var(--text);
    font-family: inherit;
    font-size: 14.5px;
    outline: none;
    transition: border-color 0.18s;
  }

  .form-input:focus, .form-textarea:focus {
    border-color: rgba(255, 255, 255, 0.3);
  }

  .form-input[readonly] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .form-textarea {
    min-height: 110px;
    resize: vertical;
  }

  @media (max-width: 720px) {
    header.site-header {
      padding: 0 14px;
      height: auto;
      min-height: 60px;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    nav.site-nav {
      order: 3;
      width: 100%;
      overflow-x: auto;
      padding-bottom: 2px;
    }
    .profile-banner {
      height: 150px;
    }
    .profile-body {
      padding: 0 18px 22px;
    }
  }
`;

// Вставляем стили сразу при загрузке скрипта
(() => {
  const styleEl = document.createElement('style');
  styleEl.textContent = SHARED_STYLES;
  document.head.appendChild(styleEl);
})();

function appUrl(subpath = '') {
  const clean = subpath.replace(/^\/+/, '');
  return BASE_PATH + clean;
}

// Плавный переход по внутренним ссылкам
function navigateSmooth(url) {
  const shell = document.querySelector('.page-shell');
  if (shell) {
    shell.classList.add('leaving');
    setTimeout(() => {
      window.location.href = url;
    }, 180);
  } else {
    window.location.href = url;
  }
}

// Вход через Discord
async function loginWithDiscord() {
  const redirectUrl = window.location.origin + BASE_PATH;
  const { error } = await sb.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: redirectUrl
    }
  });
  if (error) {
    alert('Ошибка входа через Discord: ' + error.message);
  }
}

// Выход из аккаунта
async function logoutAccount() {
  await sb.auth.signOut();
  navigateSmooth(appUrl(''));
}

// Получение или автосоздание профиля текущего пользователя
async function ensureCurrentProfile() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session || !session.user) return null;

  const user = session.user;
  const { data: existing } = await sb
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (existing) return existing;

  // Если триггер ещё не создал профиль — создаём прямо сейчас
  const meta = user.user_metadata || {};
  const rawName = meta.preferred_username || meta.user_name || meta.name || ('player_' + user.id.slice(0, 6));
  let cleanName = rawName.toLowerCase().replace(/[^a-z0-9_]/g, '');
  if (!cleanName || RESERVED_ROUTES.has(cleanName)) {
    cleanName = 'player_' + user.id.slice(0, 6);
  }

  const newProfile = {
    id: user.id,
    username: cleanName,
    avatar_url: meta.avatar_url || '',
    banner_url: '',
    bio: ''
  };

  const { data: inserted } = await sb
    .from('profiles')
    .upsert(newProfile)
    .select()
    .maybeSingle();

  return inserted || newProfile;
}

// Отрисовка шапки и подключение плавных переходов
async function initLayout(activeKey = '') {
  const shell = document.querySelector('.page-shell');

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <a href="${appUrl('')}" class="brand" data-nav>
      <span class="brand-dot"></span>
      <span>@melvkin_</span>
    </a>
    <nav class="site-nav">
      <a href="${appUrl('')}" class="${activeKey === 'home' ? 'active' : ''}" data-nav>Главная</a>
      <a href="${appUrl('lore.html')}" class="${activeKey === 'lore' ? 'active' : ''}" data-nav>Лор и механики</a>
      <a href="${appUrl('rules.html')}" class="${activeKey === 'rules' ? 'active' : ''}" data-nav>Правила</a>
      <a href="${appUrl('updates')}" class="${activeKey === 'updates' ? 'active' : ''}" data-nav>Новости</a>
    </nav>
    <div class="auth-area" id="header-auth">
      <button class="btn btn-discord" id="btn-login-discord" type="button">Войти через Discord</button>
    </div>
  `;

  if (shell) {
    shell.prepend(header);
    requestAnimationFrame(() => shell.classList.add('ready'));
  } else {
    document.body.prepend(header);
  }

  // Перехватываем клики по внутренним ссылкам для плавного затухания
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-nav]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#')) return;
    e.preventDefault();
    navigateSmooth(href);
  });

  const loginBtn = document.getElementById('btn-login-discord');
  if (loginBtn) loginBtn.addEventListener('click', loginWithDiscord);

  const profile = await ensureCurrentProfile();
  const authBox = document.getElementById('header-auth');
  if (profile && authBox) {
    const avatarSrc = profile.avatar_url || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="%23222"/></svg>';
    authBox.innerHTML = `
      <a href="${appUrl(profile.username)}" class="user-pill" data-nav>
        <img src="${avatarSrc}" alt="">
        <span>${profile.username}</span>
      </a>
      <a href="${appUrl('settings')}" class="btn" data-nav>Настройки</a>
      <button class="btn btn-danger" id="btn-logout-header" type="button">Выйти</button>
    `;
    document.getElementById('btn-logout-header').addEventListener('click', logoutAccount);
  }

  return profile;
}
