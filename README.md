# Atlas — prototyp

Interaktiv HTML/CSS-prototyp av nytt utseende för **Atlas**, intranätet hos
Tandvårds- och läkemedelsförmånsverket (TLV).

Tas fram som anbudsbilaga i offentlig upphandling. Prototypen är en visuell
och funktionell konkretisering av designstrategin — inte en
produktionsklar implementation.

---

## Köra prototypen lokalt

Inga beroenden. Två alternativ:

**Alternativ 1 — direkt i webbläsaren**

Öppna `index.html` i en modern webbläsare (Chrome, Firefox, Safari, Edge).
Allt fungerar utom Google Fonts som kräver internetanslutning.

**Alternativ 2 — lokal webbserver (rekommenderas)**

```bash
cd atlas-prototyp
python3 -m http.server 8000
```

Öppna sedan <http://localhost:8000> i webbläsaren.

---

## Vad som ingår

| Sida              | Fil               | Beskrivning                                            |
| ----------------- | ----------------- | ------------------------------------------------------ |
| Startsida         | `index.html`      | Personlig zon, nyheter, sidopanel, verktygslåda        |
| Undersida         | `undersida.html`  | "Resor och utlägg" — exempel på artikelsida med TOC    |

**Ej levererad i denna version:** komponentöversikt (`komponenter.html`).

---

## Filstruktur

```
atlas-prototyp/
├── index.html              Startsida
├── undersida.html          Undersida (Resor och utlägg)
├── README.md               Denna fil
├── css/
│   ├── tokens.css          Designtokens (färger, typografi, spacing)
│   ├── base.css            Reset, typografi, fokus, skip-link
│   ├── layout.css          Container, topbar, mainnav, sidfot
│   ├── components.css      Knappar, sökfält, kort, badges, avatarer
│   ├── pages.css           Sid-specifika sektioner
│   └── responsive.css      Mediefrågor (1024 / 768 / 480)
├── js/
│   └── main.js             Hamburger, flikbyte, feedback-rad
└── assets/                 (tom — alla bilder är CSS-mönster eller SVG inline)
```

---

## Designstrategi

**Bärande idé:** Atlas som arbetsplatsens hubb — inte en informationsanslagstavla.

**Fem designprinciper:**

1. Person först, sedan myndighet (personlig zon överst)
2. Söket är navigeringen (federerat sök i toppen, alltid synligt)
3. Tydlig hierarki, inte tre likvärdiga kolumner (F-mönster)
4. Harmoni — inte kopia — med tlv.se
5. Tillgänglighet är fundamentet (WCAG 2.1 AA inbyggt från start)

---

## Designsystem

Färgerna och typografin är hämtade direkt från tlv.se:s produktions-CSS för
visuell harmoni mellan extern webbplats och intranät.

| Token                  | Värde       | Användning                       |
| ---------------------- | ----------- | -------------------------------- |
| `--color-primary-900`  | `#003540`   | Sidfot, mörkast hover            |
| `--color-primary-800`  | `#005966`   | Logga, primär mörk               |
| `--color-primary-700`  | `#007289`   | Knappar, accentfärg              |
| `--color-primary-600`  | `#0091ac`   | Hover, fokus-ring                |
| `--color-primary-100`  | `#d1e9f2`   | Ljus bakgrund, hover-tint        |
| `--color-primary-50`   | `#e5eef0`   | Sektionsbakgrunder               |

**Typsnitt:** [Inter](https://fonts.google.com/specimen/Inter) (brödtext) +
[Overpass](https://fonts.google.com/specimen/Overpass) (rubriker). Båda
gratis via Google Fonts. Fallback: systemfont-stack.

Hela token-uppsättningen finns i [`css/tokens.css`](css/tokens.css).

---

## Tillgänglighet (WCAG 2.1 AA)

Tillgänglighet är inbyggd från start och uppfyller AA-kraven:

- ✅ Kontrast ≥4.5:1 för normal text, ≥3:1 för stora element
- ✅ Tydlig `:focus-visible`-stil (3px solid + 2px offset)
- ✅ Alla interaktiva element ≥44×44px klickyta
- ✅ "Hoppa till innehåll"-länk synlig vid fokus
- ✅ `aria-label` på sökfält och navigationer
- ✅ `lang="sv"` på `<html>`
- ✅ Semantiska landmarks: `<header role="banner">`, `<main>`, `<nav>`, `<aside>`, `<footer role="contentinfo">`
- ✅ Korrekt rubrikhierarki (en `<h1>` per sida → `<h2>` → `<h3>`)
- ✅ Tab-mönstret följer WAI-ARIA Authoring Practices (pilnav, roving tabindex)
- ✅ `prefers-reduced-motion: reduce` respekteras (animeringar slås av)
- ✅ Hamburgermenyn stängs med ESC och fokus återställs till knappen

---

## Responsivitet

Tre brytpunkter, alla via CSS-mediefrågor (samma HTML på alla skärmar):

| Brytpunkt    | Beteende                                                         |
| ------------ | ---------------------------------------------------------------- |
| ≤ **1024px** | 2-kolumns-grids stackas till 1; toolbox & sidfot blir 2-kol       |
| ≤ **768px**  | Hamburgermeny, sökfält på rad 2, allt i 1 kolumn                  |
| ≤ **480px**  | Mindre rubriker, snabbåtkomst 4 → 2, kompaktare doc-list          |

---

## Interaktivitet

Vanilla JS i [`js/main.js`](js/main.js), 182 rader, inga beroenden:

| Komponent       | Beteende                                                              |
| --------------- | --------------------------------------------------------------------- |
| Hamburgermeny   | Mobil. Toggle med klick, stäng med ESC, autostängning vid resize     |
| Flikar          | Sekundära nyheter på startsidan. Klick + pilnav + Home/End            |
| Feedback        | Undersidan. Ja → tack · Nej → formulär → tack                         |

Alla widgets är **progressivt förbättrade**: HTML/CSS visar startläget
korrekt även om JS aldrig laddas. Felsäkert.

---

## Browserstöd

Designat för aktuell version + N-1 av Chrome, Firefox, Safari och Edge.
Använder `:focus-visible`, CSS Grid, `clamp()`, CSS Custom Properties och
`matchMedia` — alla med bred support.

---

## Bedömningskriterier i upphandlingen

Prototypen svarar mot upphandlingens fyra kriterier:

1. **Användarvänlighet** — F-mönster, tydlig hierarki, federerat sök alltid synligt, snabbåtkomst till de 8 vanligaste systemen.
2. **Kreativitet i design** — personlig zon överst med kontextkort, gradient-platshållare för nyheter, mjuka petrol-toner som signaturfärg.
3. **Grad av målgruppsanpassning** — välkomsthälsning, dagens överblick, kalender, status & lokaler. Tonen anpassad för svensk myndighetspersonal.
4. **Tydlighet i presentation** — semantisk HTML5, tokeniserad CSS, kommentarer i kod, separerade filer per ansvarsområde.

---

## Designens avgränsningar

Detta är en **prototyp**, inte produktion. Följande har medvetet utelämnats:

- Bildmaterial (ersatt med CSS-gradienter och mönster)
- Live-data (alla nyheter, kalenderposter och statusar är hårdkodade exempel)
- Sökfunktionalitet (sökfältet finns men har ingen backend)
- Inloggning, behörigheter, personalisering på riktigt
- Sitevision-integration (intranätet drivs i produktion av Sitevision)
- Profil-meny dropdown (knappen är synlig men har ingen meny)

---

## Licens & upphovsrätt

Levereras till TLV som del av anbud. Designtokens kalibrerade mot publik
information från tlv.se.
