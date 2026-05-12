# Product

## Register

product

## Users

Persone che gestiscono le proprie finanze personali in autonomia e vogliono uno strumento che li accompagni nel tempo nella crescita del patrimonio. L'utente è in modalità "controllo veloce": apre l'app per registrare una transazione fresca o per dare un'occhiata all'andamento del patrimonio. Contesto d'uso prevalente: smartphone (PWA installata), brevi sessioni quotidiane, occasionalmente sessioni più lunghe quando si ricontrolla il quadro mensile.

I due gesti dominanti che la UI deve servire prima di tutto:
1. Inserire una nuova transazione.
2. Leggere a colpo d'occhio l'andamento del patrimonio.

## Product Purpose

Essere il "custode" delle finanze personali dell'utente: un luogo silenzioso, affidabile, denso di significato in pochi numeri, che dà la sensazione di avere il proprio patrimonio sotto controllo e in crescita. Il successo non è "inserire più dati", è la fiducia: l'utente apre l'app, vede il proprio patrimonio rappresentato con gravitas, registra in due tap, chiude. La promessa implicita è longevità — uno strumento che resta utile per anni, non un'app che intrattiene.

## Brand Personality

Tre parole: **silenziosa, affidabile, sicura**.

Voce: misurata, asciutta, in italiano corretto. Nessuna esclamazione, nessuna emoji nei testi UI, nessuna gamification ("Bravo!", "Hai vinto 100 punti!"). I numeri parlano per primi; le parole servono solo a dare contesto. Emozione bersaglio: la calma di chi sa che i propri soldi sono in ordine.

Riferimento principale: **Trade Republic** — ma **solo per la disciplina tipografica e strutturale**: numeri eroi, gerarchia dura, hairline al posto delle ombre, un solo accento usato col contagocce, generose pause. **Il tema di TR è scuro, il nostro è chiaro**: prendiamo da TR il rigore, non il colore di sfondo. Ulteriori riferimenti di disciplina su light: Linear (light mode), Things 3, Stripe docs.

## Tema

**Chiaro, bianco-caldo dominante.** Mai pure `#fff` (è freddo e clinico): la base è un off-white tinto verso il warm-grey. Il "nero" è in realtà un near-black caldo, mai `#000`. L'inchiostro è l'accento: i CTA sono neri su bianco. Nessuna palette colorata da gamification. La trasmissione di "premium" passa da contrasto + tipografia + spazio, non da colore.

## Anti-references

- **L'estetica "app vibecodata"**: gradienti viola/rosa, ombre soffiate, emoji nei titoli, copy promozionale ("Il tuo viaggio finanziario inizia qui!"), pulsanti grossi con gradient hero, card identiche con icone tonde colorate diverse per ogni riga.
- **L'estetica "banca tradizionale Italiana"**: azzurro corporate, gerarchia debole, modali pieni di terms, finto skeuomorfismo, pulsanti rigidi tipo Intesa/Unicredit.
- **L'estetica "fintech infantile"**: Mint/Revolut consumer-base, illustrazioni 3D, pastelli, big emoji, badge gioiello.
- **Eccesso di rigidità da banca privata**: pure serif editoriali su sfondo crema con cornici dorate — qui vogliamo professionale, non museale.
- **Category reflex sul tema**: non assumere il tema scuro perché un riferimento (es. Trade Republic) lo è. Estrarre dai riferimenti solo i pattern strutturali, non i colori di sfondo.
- **Eccesso di colori semantici**: niente verdi/rossi accesi per entrate/uscite. Il segno (+/−) e la posizione bastano. Il colore semantico esiste, ma desaturato e raro.

## Design Principles

1. **Il numero è l'eroe.** In ogni schermata il primo elemento per peso visivo è una cifra (saldo, patrimonio netto, totale del mese). Tutto il resto è subordinato.
2. **L'inchiostro è l'accento.** Su bianco, il nero stesso è l'unico colore "forte". Niente accent giallo, viola, blu, rosa — sono tutti chiacchiera visiva. Il nero esegue il lavoro del colore.
3. **Hairline, non shadow.** La profondità si crea con livelli tonali e separatori a 1 px, mai con drop shadow. Le shadow sono il marchio del vibe-code.
4. **Densità misurata.** Vuoto generoso intorno ai numeri principali; densità più alta nelle liste di transazioni. Non c'è un "ritmo" unico — le schermate respirano dove conta.
5. **Pazienza del moto.** Le transizioni sono brevi (≤220 ms), ease-out esponenziale, mai bounce. Niente animazioni "che si vedono"; il moto serve a non perdere il filo, non a stupire.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. App in italiano, mobile-first ma deve restare leggibile anche su desktop in PWA standalone.

- Contrasto: minimo 4.5:1 su body, 3:1 su numeri molto grandi (≥24 px / 700 weight).
- Tap target minimo 44×44 px (incluse le voci della nav bar inferiore e i tasti del PIN keypad).
- Supporto `prefers-reduced-motion`: disattiva le transizioni di schermo e gli archi animati dei donut, lascia gli stati istantanei.
- I numeri delle valute usano cifre tabulari (`font-variant-numeric: tabular-nums`) per non ballare durante gli update.
- Mai veicolare un significato solo col colore (es. verde = entrata): sempre affiancato da segno (+/−) e/o icona.
