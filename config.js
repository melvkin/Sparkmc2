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
  if (!str) return " ";
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
      --bg: #09090b;
      --surface: #111114;
      --surface-hover: #18181b;
      --border: rgba(255, 255, 255, 0.08);
      --border-hover: rgba(255, 255, 255, 0.18);
      --text: #fafafa;
      --muted: #a1a1aa;
      --accent: #ffffff;
      --accent-text: #09090b
