(function () {
  "use strict";
  function initMobileNavigation() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".site-nav");
    if (!toggle || !nav || toggle.dataset.mobileNavReady === "true") return;
    toggle.dataset.mobileNavReady = "true";
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-is-open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initMobileNavigation, { once: true });
  else initMobileNavigation();
})();
