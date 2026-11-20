# Zottel redesign

A static, multi-page website redesign of [zottel.si](https://www.zottel.si/) (inox posode, stiskalnice in oprema iz nerjavnega jekla, Žalec).

## Pages
- `index.html` – Domov
- `izdelki.html` – vsi programi izdelkov s filtri po panogah
- `kategorija.html?k=<slug>` – predloga za vseh 14 programov (podatki v `assets/js/data.js`)
- `o-nas.html`, `prodajna-mreza.html`, `kontakt.html`

## Run locally
```bash
python3 -m http.server 4910
```
Then open http://localhost:4910.

## Stack
Plain HTML/CSS/JS. GSAP + ScrollTrigger, Lenis smooth scroll, d3-geo + topojson for the distributor map. All libraries, fonts (General Sans) and images are bundled in `assets/`, so the site runs offline.

Content, product names and photography belong to Zottel d. o. o.
