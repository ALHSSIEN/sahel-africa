(function () {
  /* ===== Language ===== */
  const LANG_KEY = "ac_lang"; // ar | en

  function getLang() {
    const saved = localStorage.getItem(LANG_KEY);
    return saved === "en" ? "en" : "ar";
  }

  function applyLang(lang) {
    const html = document.documentElement;
    html.lang = lang === "en" ? "en" : "ar";
    html.dir = lang === "en" ? "ltr" : "rtl";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val =
        (window.I18N?.[lang]?.[key]) ||
        (window.I18N?.ar?.[key]) ||
        "";
      if (val) el.textContent = val;
    });

    const langBtn = document.getElementById("langToggle");
    if (langBtn) langBtn.textContent = lang === "en" ? "AR" : "EN";
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyLang(lang);
  }

  /* ===== Theme ===== */
  const THEME_KEY = "ac_theme"; // light | dark

  function getTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) themeBtn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }

  /* ===== Hamburger ===== */
  function initHamburger() {
    const burger = document.getElementById("burgerBtn");
    const menu = document.getElementById("mainMenu");
    if (!burger || !menu) return;

    burger.addEventListener("click", () => {
      menu.classList.toggle("open");
    });

    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => menu.classList.remove("open"));
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !burger.contains(e.target)) {
        menu.classList.remove("open");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();

    applyLang(getLang());
    applyTheme(getTheme());

    const langBtn = document.getElementById("langToggle");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        const cur = getLang();
        setLang(cur === "en" ? "ar" : "en");
      });
    }

    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const cur = getTheme();
        setTheme(cur === "dark" ? "light" : "dark");
      });
    }

    initHamburger();
  });
})();