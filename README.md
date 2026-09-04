# Mijn Multimove

Een praktische lesgeverstool voor Multimove-kinderen van 3 tot 6 jaar, met losse oefeningen, een voorbereid parcours met stations en de dierentimer als minigame.

## Functionaliteit

- 18 losse, thematische kleuteroefeningen en de dierentimer als extra oefening.
- 178 korte opdrachten met vorige-, volgende- en willekeurige navigatie.
- Compacte mobiele oefeningskaarten met direct zichtbare materiaalpictogrammen.
- Info over leeftijd, groepsgrootte, opstelling, materiaal en lesgevertips.
- Een apart parcours met 8 voorbereide stations en 48 combineerbare uitvoeringen.
- Een compact stationsoverzicht met veegbare uitvoeringen per station.
- Oefeningen en stations zijn aanvinkbaar in een dagplanning en via slepen te herschikken.
- Geplande parcoursstations staan samen in één compact parcoursblok.
- De dagplanning bundelt noodzakelijk en optioneel materiaal afzonderlijk.
- Een deelbare URL laadt dezelfde dagplanning en volgorde bij iemand anders in.
- De laatst gekozen opdracht en uitvoering blijven tijdens de browsersessie bewaard.
- Een mobiel geoptimaliseerde interface die ook schaalt naar tablet en desktop.
- De dierentimer met afstandskeuze, dierengeluiden en opgeslagen tijden.

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
