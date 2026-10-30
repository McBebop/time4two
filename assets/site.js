/* Cookie-Zustimmung, Meta Pixel und Klick-Tracking.
   Der Pixel lädt erst, nachdem jemand "Akzeptieren" geklickt hat. */
(function () {
  var cfg = window.SITE_CONFIG || {};
  var KEY = "spa_consent_v1";
  var pixelReady = false;

  function readConsent() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function saveConsent(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
  }

  function hasPixelId() {
    return cfg.pixelId && /^\d+$/.test(String(cfg.pixelId));
  }

  function loadPixel() {
    if (pixelReady || !hasPixelId()) return;
    /* Offizieller Meta-Pixel-Basiscode */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0";
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", String(cfg.pixelId));
    window.fbq("track", "PageView");
    window.fbq("track", "ViewContent", { content_name: "Time for 2 Landingpage", content_category: "Buchung" });
    pixelReady = true;
  }

  function track(eventName, params) {
    if (pixelReady && window.fbq) window.fbq("track", eventName, params || {});
  }

  /* ---------- Links mit UTM-Parametern versehen ---------- */
  function withUtm(url) {
    try {
      var target = new URL(url);
      var incoming = new URLSearchParams(window.location.search);
      var defaults = cfg.defaultUtm || {};
      Object.keys(defaults).forEach(function (k) {
        if (!target.searchParams.has(k)) target.searchParams.set(k, defaults[k]);
      });
      incoming.forEach(function (v, k) {
        if (k.indexOf("utm_") === 0 || k === "fbclid") target.searchParams.set(k, v);
      });
      return target.toString();
    } catch (e) { return url; }
  }

  function setupLinks() {
    var map = { booking: cfg.bookingUrl, weekend: cfg.bookingUrlWeekend, voucher: cfg.voucherUrl };
    document.querySelectorAll("[data-go]").forEach(function (a) {
      var kind = a.getAttribute("data-go");
      if (map[kind]) a.href = withUtm(map[kind]);
      a.addEventListener("click", function (ev) {
        if (!pixelReady) return; // ohne Zustimmung: normaler Link
        var isVoucher = kind === "voucher";
        track("InitiateCheckout", {
          content_category: isVoucher ? "Gutschein" : "Buchung",
          content_name: isVoucher ? "Gutschein" : (kind === "weekend" ? "Time for 2 Fr-So" : "Time for 2 Mo-Do"),
          currency: "EUR",
          value: isVoucher ? 50 : (kind === "weekend" ? 250 : 200)
        });
        // kurz warten, damit das Event sicher rausgeht
        if (!a.target || a.target === "_self") {
          ev.preventDefault();
          var href = a.href;
          setTimeout(function () { window.location.href = href; }, 250);
        }
      });
    });
  }

  /* ---------- Cookie-Banner ---------- */
  function showBanner(show) {
    var b = document.getElementById("consent");
    if (b) b.hidden = !show;
  }

  function setupConsent() {
    var accept = document.getElementById("consent-accept");
    var decline = document.getElementById("consent-decline");
    var reopen = document.querySelectorAll("[data-consent-open]");
    if (accept) accept.addEventListener("click", function () {
      saveConsent("all"); showBanner(false); loadPixel();
    });
    if (decline) decline.addEventListener("click", function () {
      saveConsent("necessary"); showBanner(false);
      if (pixelReady) window.location.reload(); // Pixel wieder entladen
    });
    reopen.forEach(function (el) {
      el.addEventListener("click", function (e) { e.preventDefault(); showBanner(true); });
    });

    var c = readConsent();
    if (c === "all") loadPixel();
    else if (c !== "necessary") showBanner(true);
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupLinks();
    setupConsent();
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
    // Ab dem 20. auf den Folgemonat verweisen, sonst auf den aktuellen
    var d = new Date(), m = d.getDate() >= 20 ? new Date(d.getFullYear(), d.getMonth() + 1, 1) : d;
    var name = m.toLocaleDateString("de-DE", { month: "long" });
    document.querySelectorAll("[data-month]").forEach(function (el) {
      el.textContent = name;
    });
  });
})();
