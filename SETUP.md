# Setup di sviluppo — Tracks All Finances

> Documento di riferimento del setup completo del progetto.
> Spiega **cosa** è stato installato, **perché** serve e **come si usa**.
> Importabile su Google Docs (File → Apri → carica) o leggibile direttamente in markdown.

---

## Indice

1. [CLI tool installati globalmente](#1-cli-tool-installati-globalmente)
2. [MCP servers configurati per Claude Code](#2-mcp-servers-configurati-per-claude-code)
3. [File di configurazione aggiunti al progetto](#3-file-di-configurazione-aggiunti-al-progetto)
4. [Cosa NON è cambiato](#4-cosa-non-è-cambiato)
5. [Workflow di sviluppo consigliato](#5-workflow-di-sviluppo-consigliato)
6. [MCP opzionali da aggiungere quando vuoi](#6-mcp-opzionali-da-aggiungere-quando-vuoi)
7. [Risorse design utilizzabili senza build step](#7-risorse-design-utilizzabili-senza-build-step)
8. [Roadmap futura](#8-roadmap-futura)

---

## 1. CLI tool installati globalmente

Tutti installati con `npm install -g`. Sono globali, accessibili da qualsiasi cartella.

### `pnpm` — package manager veloce

- **Cosa è**: alternativa a npm, più veloce e con dischi più piccoli
- **Perché**: quando inizierai progetti che usano librerie (Next.js, React, ecc) installerà tutto in metà tempo
- **Quando usarlo**: in **questo** progetto non serve (zero dipendenze runtime). Lo userai per i prossimi
- **Esempi**:
  ```bash
  pnpm install       # installa dipendenze del package.json
  pnpm add lodash    # aggiunge una libreria
  pnpm dlx vercel    # esegue un comando senza installarlo
  ```

### `vite` — dev server con hot reload

- **Cosa è**: server di sviluppo locale che ricarica automaticamente quando salvi
- **Perché**: oggi apri `index.html` col doppio click e devi ricaricare a mano. Con vite hai live reload immediato
- **Come usarlo**:
  ```bash
  cd C:\Users\colle\Project\finanze-versione-desktop-prova
  vite
  # apre http://localhost:5173 — ad ogni salvataggio si ricarica la pagina
  ```
- **NON cambia niente in produzione**: il sito su GitHub Pages continua a funzionare uguale

### `prettier` — formatter di codice automatico

- **Cosa è**: tool che riformatta il tuo codice in modo coerente (indent, spazi, virgolette)
- **Perché**: il tuo `index.html` è di 4500+ righe. Senza prettier il codice diventa inconsistente. Con prettier rimane sempre pulito
- **Come usarlo**:
  ```bash
  prettier --write index.html app.js sw.js styles.css
  # Formatta tutti i file in-place
  ```
- **Configurato via** `.prettierrc` (creato in root del progetto)

### `lighthouse` — audit Google per siti / PWA

- **Cosa è**: tool di Google che analizza un sito web e dà punteggi su:
  - Performance (velocità di caricamento)
  - Accessibility (contrasto colori, alt text, ecc)
  - Best Practices (HTTPS, console errors, ecc)
  - SEO
  - PWA (manifest, service worker, offline)
- **Perché**: la tua è una PWA, lighthouse ti dice cosa migliorare per averla "perfetta"
- **Come usarlo**:
  ```bash
  # Audit completo del sito in produzione
  lighthouse https://collettaa01-ai.github.io/finanze-versione-desktop-prova/ --view

  # Solo audit di performance, simulando mobile
  lighthouse https://collettaa01-ai.github.io/finanze-versione-desktop-prova/ --view --preset=perf

  # Genera un report HTML in una cartella
  lighthouse https://... --output=html --output-path=./report.html
  ```
- Il flag `--view` apre il report nel browser appena è pronto

### `vercel` — deploy con preview URL

- **Cosa è**: CLI di Vercel (piattaforma di hosting moderno)
- **Perché**: oggi tu hai GitHub Pages (perfetto per produzione), ma Vercel ti dà un superpotere extra: **un URL pubblico ad ogni branch / push**, utile per:
  - Mostrare un prototipo a qualcuno prima di mergeare
  - Testare una feature senza romperla in produzione
  - Avere un secondo ambiente ufficiale
- **Come usarlo (la prima volta)**:
  ```bash
  cd C:\Users\colle\Project\finanze-versione-desktop-prova
  vercel login          # accedi col tuo account (free)
  vercel link           # collega questo repo
  vercel                # deploy preview (URL temporaneo)
  vercel --prod         # deploy produzione su Vercel (in alternativa a GH Pages)
  ```
- **Non lo userai per forza**: opzionale, comodo quando vuoi mostrare WIP

---

## 2. MCP servers configurati per Claude Code

Gli MCP (Model Context Protocol) sono "estensioni" che danno a Claude nuove capacità.
Configurati nel file globale `C:\Users\colle\.claude\settings.json`.

### `github` (era già attivo)

- **Cosa fa**: Claude può creare/leggere PR, issues, commit, repo
- **Quando si attiva**: ogni volta che lavoriamo con git/GitHub

### `playwright` ⭐ (nuovo)

- **Cosa fa**: dà a Claude un **browser reale** (Chromium) controllabile
- **Cosa cambia per te**:
  - Prima: tu trovavi un bug, registravi un video col cellulare, me lo descrivevi → io provavo a indovinare il fix
  - Adesso: tu mi dici "vai sulla PWA, prova a fare X" → io apro davvero il browser, vedo cosa succede, capisco il bug, lo fixo, ri-testo
- **Esempio di prompt che funzioneranno**:
  - "Apri la PWA, registra un account di test e dimmi se funziona"
  - "Apri la PWA, vai in Portafoglio, prova ad aggiungere una transazione e screenshotta cosa vedi"
  - "Esegui il login e verifica che il bug del popup catapultato sia risolto"
- **Prerequisito**: la prima volta scaricherà i browser (~200MB), poi è veloce

### `context7` ⭐ (nuovo)

- **Cosa fa**: pesca documentazione **aggiornata** di librerie (Supabase, Web APIs, Service Worker, IndexedDB, ecc)
- **Perché serve**: la mia conoscenza è ferma ad agosto 2025. Con context7 leggo docs del 2026
- **Quando si attiva**: automaticamente, quando lavoro con una libreria

---

## 3. File di configurazione aggiunti al progetto

### `.prettierrc`

Configurazione di Prettier per questo progetto:
```json
{
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 100,
  "htmlWhitespaceSensitivity": "css",
  "endOfLine": "lf"
}
```
- 2 spazi di indent
- Virgolette singole in JS
- Linee max 100 caratteri
- Line ending Unix (`\n`)

### `.prettierignore`

Lista di file/cartelle che Prettier deve **ignorare** (icone, manifest, file minified).

### `CLAUDE.md` (aggiornato)

Ho aggiunto sezioni:
- **Comandi utili** (con vite, prettier, lighthouse, vercel)
- **MCP attivi**
- **Quando chiedi a Claude di lavorare al progetto** (suggerimenti pratici)

Claude lo legge automaticamente ad ogni sessione → meno spiegazioni da rifare.

---

## 4. Cosa NON è cambiato

L'app continua a girare in produzione esattamente come prima:

- ✅ Vanilla HTML / CSS / JS — niente framework
- ✅ Niente build step, niente bundler
- ✅ `index.html` rimane il file principale
- ✅ Deploy automatico su GitHub Pages al `git push origin main`
- ✅ Service Worker invariato (cache shell-v21)
- ✅ Supabase + manifest invariati

Tutti gli strumenti aggiunti sono **dev-only** (vite, prettier) o **opt-in** (vercel, lighthouse).

---

## 5. Workflow di sviluppo consigliato

Da seguire ogni volta che lavori:

1. **Apri terminale** nella cartella del progetto:
   ```bash
   cd C:\Users\colle\Project\finanze-versione-desktop-prova
   ```

2. **Avvia il dev server**:
   ```bash
   vite
   ```
   Apre http://localhost:5173 nel browser. Salva un file → ricarica automatica.

3. **Lavora**: modifica `index.html`, `app.js`, `sw.js`, `styles.css`. Vedi il risultato live.

4. **Apri Claude Code** (in un altro terminale o tab):
   ```bash
   claude
   ```
   Descrivi cosa vuoi fare. Claude può:
   - Modificare i file
   - Aprire la PWA con Playwright e verificare
   - Cercare docs con context7
   - Committare e pushare

5. **Quando hai finito**:
   ```bash
   prettier --write index.html app.js sw.js styles.css
   git add .
   git commit -m "feat: descrizione modifica"
   git push origin main
   ```
   GitHub Pages si aggiorna in 1-2 minuti.

6. **(Opzionale) Audit periodico**:
   ```bash
   lighthouse https://collettaa01-ai.github.io/finanze-versione-desktop-prova/ --view
   ```

---

## 6. MCP opzionali da aggiungere quando vuoi

Questi richiedono API token che io non ho potuto inserire. Li aggiungi quando ti servono.

### Supabase MCP — schema DB e query in lettura

**A cosa serve**: io leggo lo schema delle tue tabelle (transactions, profiles), faccio query SELECT,
ti aiuto a generare migrazioni SQL.

**Setup**:

1. Vai su https://supabase.com/dashboard/account/tokens
2. Crea un Personal Access Token, copialo
3. Apri `C:\Users\colle\.claude\settings.json` e aggiungi dentro `mcpServers`:
   ```json
   "supabase": {
     "command": "npx",
     "args": ["-y", "@supabase/mcp-server-supabase@latest", "--read-only"],
     "env": {
       "SUPABASE_ACCESS_TOKEN": "INCOLLA_QUI_IL_TUO_TOKEN"
     }
   }
   ```
4. Riavvia Claude Code

### Firecrawl MCP — scraping siti / ricerche

**A cosa serve**: estrarre contenuto da qualsiasi sito web (utile se vuoi "copiare" un layout o cercare info).

**Setup**:

1. Vai su https://firecrawl.dev → crea account free
2. Copia la API key
3. In `settings.json` aggiungi:
   ```json
   "firecrawl": {
     "command": "npx",
     "args": ["-y", "firecrawl-mcp"],
     "env": {
       "FIRECRAWL_API_KEY": "fc-..."
     }
   }
   ```

---

## 7. Risorse design utilizzabili senza build step

Tutto via CDN (`<script src="...">` nel tuo `index.html`). Nessun npm install, nessun bundler.

### Lucide Icons — 1500+ icone pulite

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => lucide.createIcons());
</script>

<!-- Uso: -->
<i data-lucide="wallet"></i>
<i data-lucide="trending-up"></i>
<i data-lucide="settings"></i>
```
Browse icone: https://lucide.dev/icons

### GSAP — animazioni premium fluide

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>

<!-- Uso: -->
<script>
  gsap.from('.ov-card', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 });
</script>
```
Docs: https://greensock.com/docs/

### Auto-Animate — animazioni magiche al cambio DOM

```html
<script src="https://unpkg.com/@formkit/auto-animate"></script>

<script>
  autoAnimate(document.getElementById('goals-scroll'));
  // Ora ogni elemento aggiunto/tolto si anima da solo
</script>
```

### Tailwind CSS Play CDN (solo per prototipare)

```html
<script src="https://cdn.tailwindcss.com"></script>
```
> **Solo per prototipare**: in produzione conviene il build step. Ma per sperimentare un layout va benissimo.

---

## 8. Roadmap futura

Quando vorrai un nuovo progetto da zero o farai refactoring:

| Tipo progetto | Stack consigliato |
|---|---|
| Web app full-stack moderna | **Next.js + Tailwind + shadcn/ui + Supabase + Vercel** |
| Sito statico / blog / landing | **Astro** |
| App piccola SPA | **Vite + React** o **SvelteKit** |
| Backend API | **Hono** o **Express** + **Neon** (Postgres) |

Tutti i nomi sopra sono già nelle "preferenze" di Claude — basta dirmi "iniziamo un progetto Next.js per X".

---

## Riepilogo comandi più usati

```bash
# Dev locale
cd C:\Users\colle\Project\finanze-versione-desktop-prova
vite                                           # dev server con hot reload

# Format codice
prettier --write index.html app.js sw.js styles.css

# Audit PWA
lighthouse https://collettaa01-ai.github.io/finanze-versione-desktop-prova/ --view

# Deploy
git add . && git commit -m "..." && git push   # GitHub Pages
vercel                                         # Vercel preview (opzionale)

# Claude Code
claude                                         # apre Claude Code
```

---

*Ultimo aggiornamento: vedi data del file. Se aggiungi MCP o tool, aggiorna questo documento.*
