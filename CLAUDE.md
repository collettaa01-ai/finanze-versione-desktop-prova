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
- **Dev server con hot reload**: `vite` (apre http://localhost:5173, ricarica al salvataggio)
- **Format codice**: `prettier --write index.html app.js sw.js styles.css`
- **Audit PWA / performance**: `lighthouse https://collettaa01-ai.github.io/finanze-versione-desktop-prova/ --view`
- **Deploy production**: `git push origin main` (GitHub Pages auto-deploy)
- **Deploy preview**: `vercel` (URL temporaneo per testare branch)
- **Testare PWA**: Chrome DevTools → Application → Service Workers

## MCP attivi per Claude Code
- **github**: gestione repo, PR, issues
- **playwright**: Claude apre la PWA in browser reale, clicca, fa screenshot, debug visuale
- **context7**: pesca docs aggiornate (Supabase, Web APIs, Service Worker)
- (opzionale) **supabase**: schema DB e query — richiede `SUPABASE_ACCESS_TOKEN` in settings.json

## Quando chiedi a Claude di lavorare al progetto
- Per debug UI: "apri la PWA con Playwright e..." (Claude la naviga da solo)
- Per query/schema DB: lavora con context7 o supabase MCP
- Prima di committare: chiedi sempre `prettier --write` per formattare

## Repository
- GitHub: https://github.com/collettaa01-ai/finanze-versione-desktop-prova
- Branch principale: `main`
