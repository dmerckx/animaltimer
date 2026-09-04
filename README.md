# Mijn Multimove

Een praktische lesgeverstool met losse Multimove-oefeningen, een voorbereid parcours met stations en de dierentimer als minigame.

## Functionaliteit

- 17 losse, thematische oefeningen van ongeveer 10 minuten.
- 166 korte opdrachten met vorige-, volgende- en willekeurige navigatie.
- Zoeken op naam en materiaal, met filters voor thema en materiaal.
- Info over leeftijd, groepsgrootte, opstelling, materiaal en lesgevertips.
- Een apart parcours met 7 voorbereide stations en 42 combineerbare uitvoeringen.
- Een stationsoverzicht, individuele variatieknoppen en een willekeurige nieuwe ronde.
- Een responsive interface voor telefoon, tablet en desktop.
- De bestaande dierentimer met afstandskeuze, dierengeluiden en opgeslagen tijden.

## Ontwikkelen

Installeer eerst de dependencies en start daarna de ontwikkelserver:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

Andere controles:

```bash
yarn typecheck
yarn lint
yarn build
yarn start
```

## Inhoud aanpassen

Alle oefeningen en opdrachten staan getypeerd in `data/exercises.ts`. Het parcours, de stations en hun uitvoeringen staan in `data/parcours.ts`. De dieren en bijbehorende snelheden staan in `data/speeds.ts`.

## Technologie

- Next.js 16 met de App Router
- React 19
- TypeScript 5.9
- Tailwind CSS 4
- ESLint met de Next.js Core Web Vitals- en TypeScriptregels
