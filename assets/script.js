(function(){
  "use strict";

  /* =========================
     Language (ar / en)
     ========================= */
  const LANG_KEY = "aci_lang";

  function getLang(){
    const saved = localStorage.getItem(LANG_KEY);
    return saved === "en" ? "en" : "ar";
  }

  function translate(lang){
    const html = document.documentElement;
    html.lang = lang === "en" ? "en" : "ar";
    html.dir  = lang === "en" ? "ltr" : "rtl";

    document.querySelectorAll("[data-i18n]").forEach((el)=>{
      const key = el.getAttribute("data-i18n");
      const val = (window.I18N?.[lang]?.[key]) || (window.I18N?.ar?.[key]) || "";
      if (val) el.textContent = val;
    });

    const btn = document.getElementById("langToggle");
    if (btn) btn.textContent = lang === "en" ? "AR" : "EN";
  }

  function setLang(lang){
    localStorage.setItem(LANG_KEY, lang);
    translate(lang);
  }

  /* =========================
     Theme (light / dark)
     ========================= */
  const THEME_KEY = "aci_theme";

  function getTheme(){
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme){
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeToggle");
    if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
  }

  function setTheme(theme){
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }

  /* =========================
     Navigation
     ========================= */
  function initHamburger(){
    const burger = document.getElementById("burgerBtn");
    const menu   = document.getElementById("mainMenu");
    if (!burger || !menu) return;

    burger.addEventListener("click", ()=> menu.classList.toggle("open"));

    menu.querySelectorAll("a").forEach((a)=>{
      a.addEventListener("click", ()=> menu.classList.remove("open"));
    });

    document.addEventListener("click", (e)=>{
      if (!menu.contains(e.target) && !burger.contains(e.target)) menu.classList.remove("open");
    });
  }

  function setActiveNav(){
    const path = (location.pathname || "").split("/").pop() || "index.html";
    document.querySelectorAll(".menu a").forEach((a)=>{
      const href = a.getAttribute("href");
      if (!href) return;
      const file = href.split("/").pop();
      if (file === path) a.classList.add("active");
    });
  }

  /* =========================
     Contact form -> mailto
     ========================= */
  function initMailtoForm(){
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const name = (document.getElementById("fName")?.value || "").trim();
      const subj = (document.getElementById("fSubject")?.value || "").trim();
      const msg  = (document.getElementById("fMessage")?.value || "").trim();

      const subject = encodeURIComponent(subj || "Website inquiry");
      const body = encodeURIComponent(
        (name ? ("Name: " + name + "\n\n") : "") +
        (msg || "")
      );

      const to = form.getAttribute("data-to") || "info@AfricaCoast.ly";
      location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }

  /* =========================
     Init
     ========================= */
  document.addEventListener("DOMContentLoaded", ()=>{
    const y = document.querySelector("[data-year]");
    if (y) y.textContent = String(new Date().getFullYear());

    translate(getLang());
    applyTheme(getTheme());

    const langBtn = document.getElementById("langToggle");
    if (langBtn) langBtn.addEventListener("click", ()=> setLang(getLang() === "en" ? "ar" : "en"));

    const themeBtn = document.getElementById("themeToggle");
    if (themeBtn) themeBtn.addEventListener("click", ()=> setTheme(getTheme() === "dark" ? "light" : "dark"));

    initHamburger();
    setActiveNav();
    initMailtoForm();
  });
})();
