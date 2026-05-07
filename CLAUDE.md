# Tracks All Finances — Guida progetto

## Stack
- **Frontend**: Vanilla HTML / CSS / JavaScript (no framework)
- **Backend / DB**: Supabase (client JS via CDN `@supabase/supabase-js@2`)
- **PWA**: Service Worker (`sw.js`), Web App Manifest (`manifest.json`)
- **Font**: Geist (CDN jsDelivr) + Figtree (Google Fonts)
- **Deployment**: GitHub Pages (statico)

## Struttura file
```
index.html   — app completa (HTML + CSS inline + JS logica principale)
styles.css   — stili aggiuntivi
app.js       — gestione tastiera virtuale e viewport mobile
sw.js        — service worker per cache offline (shell-v10)
manifest.json — configurazione PWA
icons/       — icon-192.png, icon-512.png
```

## Regole di sviluppo
- Tutta la logica dell'app è in `index.html` — NON creare file JS separati senza discuterne
- Il Service Worker usa `CACHE_NAME = "finanze-shell-v13"` — aggiornare il numero versione ad ogni modifica dei file in cache
- L'app è in **italiano** — tutti i testi UI restano in italiano
- Nessun build step, nessun bundler — tutto gira direttamente nel browser
- Usare CSS custom properties (design tokens in `:root`) per colori e spaziature

## Comandi utili
- **Avviare in locale**: aprire `index.html` in un browser (o usare Live Server in VS Code)
- **Deploy**: `git push origin main` → GitHub Pages si aggiorna automaticamente
- **Testare PWA**: Chrome DevTools → Application → Service Workers

## Repository
- GitHub: https://github.com/collettaa01-ai/finanze-versione-desktop-prova
- Branch principale: `main`
