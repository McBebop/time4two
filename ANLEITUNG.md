# Landingpage „Time for 2“ – Anleitung

## 1. Pixel-ID eintragen
Öffne `assets/config.js` und ersetze `DEINE_PIXEL_ID` durch deine Pixel-ID aus dem
Meta Events Manager (nur Ziffern). Mehr musst du im Code nicht anfassen.

## 2. Auf GitHub Pages veröffentlichen
1. Auf github.com ein neues **öffentliches** Repository anlegen, z. B. `time4two`.
2. „Add file“ → „Upload files“ → den **Inhalt** dieses Ordners hochladen
   (index.html, datenschutz.html, .nojekyll und den Ordner assets) → „Commit changes“.
3. Repository → Settings → Pages → Source: „Deploy from a branch“ →
   Branch `main`, Ordner `/ (root)` → Save.
4. Nach 1–2 Minuten ist die Seite erreichbar unter
   `https://DEIN-NUTZERNAME.github.io/time4two/`.

## 3. Eigene Domain (empfohlen)
1. Settings → Pages → „Custom domain“: z. B. `angebot.sauna-pf.de` oder deine neue Domain eintragen → Save.
2. Beim Domain-Anbieter einen DNS-Eintrag setzen:
   - Subdomain (z. B. angebot.sauna-pf.de): **CNAME** → `DEIN-NUTZERNAME.github.io`
   - Eigene Hauptdomain: **A-Records** auf die IP-Adressen, die GitHub in der Pages-Hilfe nennt
3. Wenn die Domain grün angezeigt wird: „Enforce HTTPS“ anhaken.
4. Domain in Meta verifizieren: Unternehmenseinstellungen → Brand Safety → Domains.

## 4. Testen
1. Chrome-Erweiterung „Meta Pixel Helper“ installieren.
2. Seite öffnen → Cookie-Banner „Akzeptieren“ → Pixel Helper zeigt `PageView` und `ViewContent`.
3. Auf „Termin wählen“ klicken → `InitiateCheckout` muss erscheinen.
4. Parallel im Events Manager unter „Events testen“ prüfen.
5. Bei „Nur notwendige“ darf **kein** Pixel laden.

## 5. Kampagne
- Ziel: **Umsatz** · Conversion-Ort: **Website** · Pixel auswählen
- Conversion-Event: **InitiateCheckout** (= Klick auf „Termin wählen“ / „buchen“)
- Optional im Events Manager eine benutzerdefinierte Conversion „Buchung gestartet“
  anlegen: InitiateCheckout, bei dem `content_category` = `Buchung` ist.
- Anzeigen-URL: deine Landingpage, z. B.
  `https://angebot.sauna-pf.de/?utm_source=meta&utm_medium=paid&utm_campaign=time4two&utm_content={{ad.name}}`
  (UTM-Parameter werden automatisch an den Buchungslink weitergegeben.)

## Was die Seite misst
| Event | Wann |
|---|---|
| PageView, ViewContent | beim Öffnen (nach Zustimmung) |
| InitiateCheckout (content_category: Buchung, value 200/250) | Klick auf einen Buchen-Button |
| InitiateCheckout (content_category: Gutschein, value 50) | Klick auf den Gutschein-Link |

## Vor dem Livegang
- `datenschutz.html`: Platzhalter in [eckigen Klammern] ausfüllen, Hinweis-Kasten löschen,
  am besten kurz prüfen lassen. Das Impressum verlinkt auf sauna-pf.de/impressum.
- Code **TIME4TWO** im Buchungssystem anlegen bzw. dem Team Bescheid geben.
