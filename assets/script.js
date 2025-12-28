(function () {
  const KEY = "ac_lang"; // ar | en

  function applyLang(lang) {
    const html = document.documentElement;
    html.lang = lang === "en" ? "en" : "ar";
    html.dir = lang === "en" ? "ltr" : "rtl";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = (window.I18N?.[lang]?.[key]) || (window.I18N?.ar?.[key]) || "";
      if (val) el.textContent = val;
    });

    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = lang === "en" ? "AR" : "EN";
  }

  function getLang() {
    const saved = localStorage.getItem(KEY);
    return saved === "en" ? "en" : "ar";
  }

  function setLang(lang) {
    localStorage.setItem(KEY, lang);
    applyLang(lang);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
    applyLang(getLang());

    const btn = document.getElementById("langToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const cur = getLang();
        setLang(cur === "en" ? "ar" : "en");
      });
    }
  });

  window.__setLang = setLang;
})();
// ===== Dark Mode Toggle =====
(function(){
  const THEME_KEY = "ac_theme";
  const btn = document.getElementById("themeToggle");

  function applyTheme(theme){
    document.documentElement.setAttribute("data-theme", theme);
    if(btn){
      btn.textContent = theme === "dark" ? "☀️" : "🌙";
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  const saved = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(saved);

  if(btn){
    btn.addEventListener("click", ()=>{
      const current = document.documentElement.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
})();
