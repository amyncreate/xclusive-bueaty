# Xclusive Beauty Saloon & Spa — Website

A premium, mobile-first beauty salon website built with vanilla HTML5, CSS3, and JavaScript. No frameworks, no backend, no build step — just upload and go.

## Before you publish — 3 things to update

1. **WhatsApp number** — open `assets/js/script.js` and edit line 11:
   ```js
   var WHATSAPP_NUMBER = '2348000000000';
   ```
   Replace with the real number in international format (no `+`, no leading `0` after the country code). This single line powers every "Book via WhatsApp" button, every product order button, and the floating WhatsApp icon site-wide.

2. **Contact details** — the address, phone number, and email currently use placeholders:
   - Address: `No. 10 Kawu Plaza, Lagos Street, Maiduguri, Borno State, Nigeria` (this is real, from the brief — leave as is unless it changes)
   - Phone: `+234 800 000 0000` — appears in the header, footer, and Contact page; find-and-replace across all 6 HTML files
   - Email: `hello@xclusivebeautysaloon.com` — same, find-and-replace across all 6 HTML files

3. **Photos** — every image area (hero, service cards, gallery, product shots) currently uses styled gradient placeholders with icons, since no photography was supplied. Replace the placeholder `<div>` elements with real `<img>` tags once you have professional photos. The gallery lightbox and story-collage layout already support real `<img>` tags out of the box — just swap the tag and keep the same wrapping classes.

## Structure

```
index.html      Home
about.html      About / Story / Mission / Vision / Values
services.html   All 12 services
gallery.html    Filterable gallery + lightbox
shop.html       Product showcase with WhatsApp ordering
contact.html    Contact form, map, business info

assets/
  css/style.css         All styles (single file)
  js/script.js          All interactivity (single file)
  fonts/                Self-hosted Cormorant + Jost (no Google Fonts dependency)
  fontawesome/          Self-hosted Font Awesome icons (no CDN dependency)
  images/               Favicon + social share image
  icons/                Decorative SVG motif
```

Everything is self-hosted — no external CDN calls at all, so the site will work identically on any free host (Netlify, InfinityFree, AwardSpace) with no extra configuration.

## Hosting

Static files only. Upload the whole folder as-is to any static host. No `.htaccess`, no PHP, no database needed.

## Notes

- The Google Maps embed on the Contact page uses the address directly in the URL — no API key needed, but do double check it geocodes to the right spot once live.
- The contact form does not send email on its own (per the "frontend only" brief) — it shows a success message and offers a WhatsApp continue button instead. If you later want real form delivery, that'll need a small backend or a form service.
