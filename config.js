// ============================================================
// НАСТРОЙКИ ПОДКЛЮЧЕНИЯ К SUPABASE
// ============================================================
const SUPABASE_URL = "https://ieybojpqsrvztfcetcgj.supabase.co";
const SUPABASE_KEY = "sb_publishable_BGAB8G5Xf1XiwQYFOlLJiA_HCviWGd7";

// ============================================================
// ДАЛЬШЕ КОД МЕНЯТЬ НЕ НУЖНО — ВСЁ РАБОТАЕТ АВТОМАТИЧЕСКИ
// ============================================================
const sb = (typeof window.supabase !== "undefined" && SUPABASE_KEY.startsWith("sb_"))
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

const RESERVED_SLUGS = ["ads", "me", "upd", "settings", "players", "login", "api", "index.html", "404.html"];

function getBasePath() {
  const path = window.location.pathname;
  const parts = path.split("/").filter(Boolean);
  if (parts.length > 0 && parts[0].toLowerCase() === "sparkmc2") {
    return "/Sparkmc2/";
  }
  return "/";
}

function getRelativeRoute() {
  const base = getBasePath();
  let path = window.location.pathname;
  if (path.toLowerCase().startsWith(base.toLowerCase())) {
    path = path.slice(base.length);
  } else if (path.startsWith("/")) {
    path = path.slice(1);
  }
  return path.replace(/\/+$/, "");
}

async function signInWithDiscord() {
  if (!sb) {
    alert("Ошибка подключения к Supabase. Проверьте config.js");
    return;
  }
  const redirectTo = window.location.origin + getBasePath();
  const { error } = await sb.auth.signInWithOAuth({
    provider: "discord",
    options: { redirectTo }
  });
  if (error) {
    alert("Ошибка входа: " + error.message);
  }
}

async function signOut() {
  if (!sb) return;
  await sb.auth.signOut();
  window.location.href = getBasePath();
}

async function getCurrentProfile() {
  if (!sb) return null;
  const { data: { session } } = await sb.auth.getSession();
  if (!session || !session.user) return null;

  const { data: profile } = await sb
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  return profile || null;
}

async function initAuthHeader() {
  const authContainer = document.getElementById("auth-nav");
  if (!authContainer) return;

  const base = getBasePath();
  const profile = await getCurrentProfile();

  if (profile) {
    const avatar = profile.avatar_url || "https://cdn.discordapp.com/embed/avatars/0.png";
    authContainer.innerHTML = `
      <a href="${base}${encodeURIComponent(profile.username)}" class="nav-user">
        <img src="${escapeHtml(avatar)}" alt="" class="nav-avatar">
        <span>${escapeHtml(profile.username)}</span>
      </a>
      <a href="${base}settings" class="nav-link">Настройки</a>
    `;
  } else {
    authContainer.innerHTML = `
      <button onclick="signInWithDiscord()" class="btn-discord">Войти через Discord</button>
    `;
  }
}

async function renderProfilePage(username) {
  const app = document.getElementById("app");
  if (!app) return;

  const base = getBasePath();
  app.innerHTML = `<div class="card center"><p class="muted">Загрузка профиля...</p></div>`;

  if (!sb) {
    app.innerHTML = `<div class="card center"><p>База данных не подключена.</p></div>`;
    return;
  }

  const { data: profile, error } = await sb
    .from("profiles")
    .select("*")
    .eq("username", username.toLowerCase())
    .single();

  if (error || !profile) {
    app.innerHTML = `
      <div class="card center">
        <h2>Профиль не найден</h2>
        <p class="muted">Пользователь <b>@${escapeHtml(username)}</b> ещё не зарегистрирован.</p>
        <div style="margin-top: 20px;">
          <a href="${base}" class="btn">На главную</a>
        </div>
      </div>
    `;
    return;
  }

  const currentProfile = await getCurrentProfile();
  const isOwner = currentProfile && currentProfile.id === profile.id;

  const avatar = profile.avatar_url || "https://cdn.discordapp.com/embed/avatars/0.png";
  const bannerHtml = profile.banner_url
    ? `<div class="profile-banner" style="background-image: url('${escapeHtml(profile.banner_url)}')"></div>`
    : `<div class="profile-banner profile-banner-empty"></div>`;

  const bioHtml = profile.bio && profile.bio.trim()
    ? `<p class="profile-bio">${escapeHtml(profile.bio).replace(/
/g, "<br>")}</p>`
    : `<p class="profile-bio muted">Информация о себе не заполнена.</p>`;

  const ownerActions = isOwner
    ? `<div class="profile-actions">
         <a href="${base}settings" class="btn">Редактировать профиль</a>
         <button onclick="signOut()" class="btn btn-ghost">Выйти</button>
       </div>`
    : "";

  document.title = `${profile.username} — SparkMC`;

  app.innerHTML = `
    <div class="card profile-card">
      ${bannerHtml}
      <div class="profile-body">
        <div class="profile-header">
          <img src="${escapeHtml(avatar)}" alt="${escapeHtml(profile.username)}" class="profile-avatar">
          <div class="profile-meta">
            <h1 class="profile-username">@${escapeHtml(profile.username)}</h1>
          </div>
        </div>
        ${bioHtml}
        ${ownerActions}
      </div>
    </div>
  `;
}

async function renderSettingsPage() {
  const app = document.getElementById("app");
  if (!app) return;

  const base = getBasePath();
  app.innerHTML = `<div class="card center"><p class="muted">Загрузка настроек...</p></div>`;

  const profile = await getCurrentProfile();
  if (!profile) {
    app.innerHTML = `
      <div class="card center">
        <h2>Требуется вход</h2>
        <p class="muted">Войдите через Discord, чтобы настроить свой профиль.</p>
        <div style="margin-top: 20px;">
          <button onclick="signInWithDiscord()" class="btn-discord">Войти через Discord</button>
        </div>
      </div>
    `;
    return;
  }

  document.title = "Настройки профиля — SparkMC";

  app.innerHTML = `
    <div class="card">
      <div class="settings-top">
        <h2>Настройки профиля</h2>
        <a href="${base}${encodeURIComponent(profile.username)}" class="nav-link">Открыть профиль →</a>
      </div>

      <form id="settings-form" class="settings-form">
        <div class="form-group">
          <label>Никнейм (фиксированный)</label>
          <input type="text" value="@${escapeHtml(profile.username)}" disabled class="input input-disabled">
        </div>

        <div class="form-group">
          <label>Аватарка</label>
          <input type="file" id="avatar-file" accept="image/*" class="input">
        </div>

        <div class="form-group">
          <label>Баннер профиля</label>
          <input type="file" id="banner-file" accept="image/*" class="input">
        </div>

        <div class="form-group">
          <label>Информация о себе</label>
          <textarea id="bio-input" rows="4" maxlength="400" placeholder="Расскажите о себе..." class="input">${escapeHtml(profile.bio || "")}</textarea>
        </div>

        <div id="settings-status" class="status-msg"></div>

        <div class="form-actions">
          <button type="submit" id="save-btn" class="btn">Сохранить изменения</button>
          <button type="button" onclick="signOut()" class="btn btn-ghost">Выйти из аккаунта</button>
        </div>
      </form>
    </div>
  `;

  document.getElementById("settings-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const saveBtn = document.getElementById("save-btn");
    const statusEl = document.getElementById("settings-status");
    saveBtn.disabled = true;
    saveBtn.textContent = "Сохранение...";
    statusEl.textContent = "";

    try {
      let avatarUrl = profile.avatar_url;
      let bannerUrl = profile.banner_url;

      const avatarFile = document.getElementById("avatar-file").files[0];
      if (avatarFile) {
        const ext = avatarFile.name.split(".").pop() || "png";
        const filePath = `${profile.id}/avatar_${Date.now()}.${ext}`;
        const { error: upErr } = await sb.storage.from("media").upload(filePath, avatarFile, { upsert: true });
        if (upErr) throw upErr;
        const { data: pub } = sb.storage.from("media").getPublicUrl(filePath);
        avatarUrl = pub.publicUrl;
      }

      const bannerFile = document.getElementById("banner-file").files[0];
      if (bannerFile) {
        const ext = bannerFile.name.split(".").pop() || "png";
        const filePath = `${profile.id}/banner_${Date.now()}.${ext}`;
        const { error: upErr } = await sb.storage.from("media").upload(filePath, bannerFile, { upsert: true });
        if (upErr) throw upErr;
        const { data: pub } = sb.storage.from("media").getPublicUrl(filePath);
        bannerUrl = pub.publicUrl;
      }

      const bio = document.getElementById("bio-input").value.trim();

      const { error: updateErr } = await sb
        .from("profiles")
        .update({
          avatar_url: avatarUrl,
          banner_url: bannerUrl,
          bio: bio
        })
        .eq("id", profile.id);

      if (updateErr) throw updateErr;

      statusEl.style.color = "#4ade80";
      statusEl.textContent = "Профиль успешно обновлён!";
      await initAuthHeader();
    } catch (err) {
      statusEl.style.color = "#f87171";
      statusEl.textContent = "Ошибка: " + (err.message || err);
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = "Сохранить изменения";
    }
  });
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

document.addEventListener("DOMContentLoaded", () => {
  initAuthHeader();
});
