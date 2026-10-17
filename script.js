(function () {
  "use strict";
  const config = window.INVITATION_CONFIG, root = document.documentElement;
  if (!config) return;
  Object.entries(config.theme || {}).forEach(([name, value]) => root.style.setProperty("--" + name, value));
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const setText = (selector, value) => $$(selector).forEach((el) => { el.textContent = value; });
  const date = new Date(config.couple.dateISO + "T12:00:00Z");
  const dateFormatter = new Intl.DateTimeFormat("es-ES", { timeZone: config.countdown.timezone, weekday: "long", day: "numeric", month: "long", year: "numeric" });
  setText("[data-couple-names]", config.couple.names); setText("[data-date-label]", config.couple.dateLabel); setText("[data-date-full]", capitalize(dateFormatter.format(date)));
  setText("[data-venue]", config.couple.venue); setText("[data-opening-line]", config.couple.openingLine); setText("[data-welcome]", config.couple.welcome); setText("[data-closing-line]", config.couple.closingLine); setText("[data-venue-description]", config.venue.description);
  const mapsLink = $("[data-maps-link]"); if (mapsLink) mapsLink.href = config.venue.mapsUrl;
  renderHeroImage(); renderVenueImage(); renderSchedule(); renderTransport(); renderLogistics(); renderForms(); renderGallery(); renderGift(); updateMeta(); setupNavigation(); startCountdown();
  function capitalize(value) { return value ? value.charAt(0).toUpperCase() + value.slice(1) : value; }
  function clean(value) { return String(value || "").trim(); }
  function renderHeroImage() {
    const path = clean(config.images && config.images.hero), hero = $(".hero");
    if (!path || !hero) return;
    const image = document.createElement("img"); image.className = "hero__photo"; image.src = path; image.alt = clean(config.images.heroAlt) || "Fotografía de Júlia y Jesús"; hero.prepend(image); hero.classList.add("hero--photo");
  }
  function renderVenueImage() {
    const path = clean(config.images && config.images.venue); if (!path) return;
    const art = $("[data-venue-art]"); if (!art) return;
    art.classList.add("has-image");
    const image = document.createElement("img");
    image.className = "place__photo";
    image.src = path;
    image.alt = config.venue.imageAlt || "Fotografía del lugar de la celebración";
    art.prepend(image);
    const fallback = $(".place__illustration", art); if (fallback) fallback.setAttribute("aria-hidden", "true");
  }
  function renderSchedule() {
    const entries = (config.schedule || []).filter((item) => clean(item.time) && clean(item.label)), transport = config.transport || {}, timeline = $("[data-schedule]"), empty = $("[data-schedule-empty]");
    if (clean(transport.departureTime) && clean(transport.departureLocation)) entries.push({ time: transport.departureTime, label: "Salida del autobús · " + transport.departureLocation });
    if (clean(transport.return1Time)) entries.push({ time: transport.return1Time, label: "Autobús de vuelta 1" });
    if (clean(transport.return2Time)) entries.push({ time: transport.return2Time, label: "Autobús de vuelta 2" });
    if (!timeline || !empty || !entries.length) return;
    timeline.innerHTML = entries.map((item) => "<div class=\"timeline__item\"><time>" + escapeHtml(item.time) + " h</time><span>" + escapeHtml(item.label) + "</span></div>").join("");
    empty.hidden = true;
  }
  function renderLogistics() {
    const entries = [["Llegada", config.logistics && config.logistics.arrival], ["Aparcamiento", config.logistics && config.logistics.parking], ["Transporte", config.logistics && config.logistics.transport], ["Notas", config.logistics && config.logistics.notes]].filter(([, text]) => text && text.trim());
    const section = $("[data-practical-section]"), list = $("[data-logistics]"); if (!section || !list) return;
    if (!entries.length) { section.hidden = true; return; }
    list.innerHTML = entries.map(([label, text]) => "<div class=\"practical__item\"><p class=\"eyebrow eyebrow--light\">" + escapeHtml(label) + "</p><p>" + escapeHtml(text) + "</p></div>").join("");
  }
  function renderTransport() {
    const transport = config.transport || {}, target = $("[data-transport]"), empty = $("[data-transport-empty]");
    if (!target || !empty) return;
    const rows = [];
    if (clean(transport.departureLocation)) {
      const location = clean(transport.departureMapUrl) ? "<a href=\"" + escapeHtml(transport.departureMapUrl) + "\" target=\"_blank\" rel=\"noreferrer\">" + escapeHtml(transport.departureLocation) + " ↗</a>" : escapeHtml(transport.departureLocation);
      rows.push("<p><strong>Salida</strong>" + (clean(transport.departureTime) ? " · " + escapeHtml(transport.departureTime) + " h" : "") + "<br />" + location + "</p>");
    }
    if (clean(transport.return1Time)) rows.push("<p><strong>Vuelta 1</strong> · " + escapeHtml(transport.return1Time) + " h</p>");
    if (clean(transport.return2Time)) rows.push("<p><strong>Vuelta 2</strong> · " + escapeHtml(transport.return2Time) + " h</p>");
    if (clean(transport.note)) rows.push("<p class=\"small-copy\">" + escapeHtml(transport.note) + "</p>");
    if (!rows.length) return;
    target.innerHTML = rows.join(""); empty.hidden = true;
  }
  function renderForms() {
    const url = clean(config.forms && config.forms.url);
    const links = $$("[data-form-link]"), pending = $$("[data-form-pending]");
    if (!url) { links.forEach((link) => { link.hidden = true; }); return; }
    links.forEach((link) => { link.href = url; link.hidden = false; }); pending.forEach((note) => { note.hidden = true; });
  }
  function renderGallery() {
    const link = $("[data-gallery-link]");
    if (!link || !clean(config.galleryUrl)) return;
    link.href = config.galleryUrl; link.hidden = false;
  }
  function renderGift() {
    const iban = clean(config.gift && config.gift.iban), details = $("[data-gift-details]"), target = $("[data-iban]");
    if (!iban || !details || !target) return;
    target.textContent = iban; details.hidden = false;
    const button = $("[data-copy-iban]"), confirmation = $("[data-copy-confirmation]");
    if (button) button.addEventListener("click", async () => { try { await navigator.clipboard.writeText(iban); if (confirmation) confirmation.textContent = "IBAN copiado"; } catch (error) { if (confirmation) confirmation.textContent = "Puedes seleccionar el IBAN para copiarlo"; } });
  }
  function setupNavigation() {
    const toggle = $(".menu-toggle"), nav = $(".site-nav"); if (!toggle || !nav) return;
    toggle.addEventListener("click", () => { const open = toggle.getAttribute("aria-expanded") === "true"; toggle.setAttribute("aria-expanded", String(!open)); nav.classList.toggle("is-open", !open); });
    $$("a", nav).forEach((link) => link.addEventListener("click", () => { toggle.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); }));
  }
  function updateMeta() {
    const share = config.sharing || {}; document.title = share.title || document.title;
    const description = $("meta[name='description']"); if (description && share.description) description.content = share.description;
    const ogDescription = $("meta[property='og:description']"); if (ogDescription && share.description) ogDescription.content = share.description;
    const url = (share.publicUrl || "").trim(); if (!url) return;
    const ogUrl = $("meta[property='og:url']"); if (ogUrl) ogUrl.content = url;
    const imageUrl = new URL("assets/og-image.svg", url).href, ogImage = $("meta[property='og:image']"), twitterImage = $("meta[name='twitter:image']");
    if (ogImage) ogImage.content = imageUrl; if (twitterImage) twitterImage.content = imageUrl;
  }
  function startCountdown() {
    const grid = $("[data-countdown]"), message = $("[data-countdown-message]"); if (!grid || !message) return;
    const target = zonedTimeToUtc(config.couple.dateISO, config.countdown.referenceTime || "12:00", config.countdown.timezone);
    const update = () => {
      const remaining = Math.max(0, target.getTime() - Date.now()), totalSeconds = Math.floor(remaining / 1000);
      const values = { days: Math.floor(totalSeconds / 86400), hours: Math.floor((totalSeconds % 86400) / 3600), minutes: Math.floor((totalSeconds % 3600) / 60), seconds: totalSeconds % 60 };
      Object.entries(values).forEach(([name, value]) => { const element = $("[data-unit=\"" + name + "\"]"); if (element) element.textContent = String(value).padStart(2, "0"); });
      if (remaining === 0) { message.textContent = "Hoy es el gran día. ¡Qué emoción!"; grid.classList.add("is-today"); } else message.textContent = "Hasta el " + config.couple.dateLabel;
    };
    update(); window.setInterval(update, 1000);
  }
  // Convierte una hora expresada en Europe/Madrid a un instante UTC y respeta el DST.
  function zonedTimeToUtc(dateISO, time, timeZone) {
    const [year, month, day] = dateISO.split("-").map(Number), [hour, minute] = time.split(":").map(Number);
    let guess = new Date(Date.UTC(year, month - 1, day, hour, minute));
    for (let i = 0; i < 3; i += 1) {
      const parts = new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(guess).reduce((acc, part) => { acc[part.type] = part.value; return acc; }, {});
      const asUtc = Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute)), requested = Date.UTC(year, month - 1, day, hour, minute);
      guess = new Date(guess.getTime() + requested - asUtc);
    }
    return guess;
  }
  function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" }[char])); }
})();
