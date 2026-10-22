/* ==========================================================
   EINSTELLUNGEN – nur diese Datei musst du anpassen
   ========================================================== */
window.SITE_CONFIG = {
  // Deine Meta-Pixel-ID aus dem Events Manager (nur Ziffern).
  // Solange hier "DEINE_PIXEL_ID" steht, wird kein Pixel geladen.
  pixelId: "DEINE_PIXEL_ID",

  // Wohin die Buttons führen
  bookingUrl: "https://sauna-pf.de/buchen?tarif=time2-week",
  bookingUrlWeekend: "https://sauna-pf.de/buchen?tarif=time2-weekend",
  voucherUrl: "https://sauna-pf.de/gutscheine",

  // Wird an die Ziel-Links angehängt, damit du auf sauna-pf.de siehst,
  // woher die Besucher kommen. UTM-Parameter aus der Anzeige werden
  // automatisch durchgereicht und haben Vorrang.
  defaultUtm: {
    utm_source: "meta",
    utm_medium: "paid",
    utm_campaign: "time4two_landing"
  }
};
