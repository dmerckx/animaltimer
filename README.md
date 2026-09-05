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

## Helpers op /helpen

De kalender loopt van 7 september 2026 tot en met 31 mei 2027, elke maandag van
17u20 tot 18u30. Vlaamse schoolvakanties en Pinkstermaandag zijn uitgesloten op
basis van de [officiële schoolkalender](https://www.vlaanderen.be/onderwijs-en-vorming/wat-mag-en-moet-op-school/schoolvakanties-vrije-dagen-en-afwezigheden/schoolvakanties).
Pas voor een volgend seizoen `lib/multimove-events.ts` en de introductietekst aan.
Gestarte lessen verdwijnen op basis van de tijdzone Europe/Brussels.

Er is één helper per les. De browser onthoudt de naam en een willekeurige sleutel
om eigen inschrijvingen te annuleren. Annuleren werkt op hetzelfde toestel en in
dezelfde browser; bij gewiste browseropslag kan de beheerder de inschrijving uit
het JSON-bestand verwijderen. Namen zijn zichtbaar op de website en blijven in
de gitgeschiedenis staan; de geheime browsersleutel wordt alleen gehasht bewaard.

Alle registraties staan in `data/registrations.json`. Zonder token schrijft
`yarn dev` rechtstreeks naar dat bestand (geen automatische lokale commit).
Lokale wijzigingen worden achtereenvolgens en via een atomische bestandsvervanging
opgeslagen. Gebruik één ontwikkelserver per checkout.
Controleer de kalender en opslag met `yarn test:registrations` (Node.js 22.7+).

Voor productie: kopieer `.env.example` naar `.env.local` of stel dezelfde
servervariabelen in bij de hostingprovider. Alleen `GITHUB_TOKEN` is verplicht.
`GITHUB_REPOSITORY` en `GITHUB_BRANCH` vallen terug op de huidige repository en
branch: `dmerckx/animaltimer` en `main`. Je kunt ze expliciet overschrijven voor
een andere repository of branch. Gebruik een fine-grained
GitHub-token met **Contents: Read and write** voor uitsluitend deze repository.
Commit eerst `data/registrations.json` naar die branch. De branch moet directe
commits toestaan. De token krijgt nooit een `NEXT_PUBLIC_`-prefix.

De Node.js API leest de actuele GitHub-versie en schrijft aanmeldingen en
annuleringen met de GitHub Contents API. SHA-conflicten worden opnieuw ingelezen
en gecontroleerd, zodat een bezette les niet overschreven wordt. Productie zonder
token geeft een foutmelding en schrijft niet naar een tijdelijk hostingbestand.
Er is een serverruntime nodig; een statische export volstaat niet. Registratiecommits
bevatten `[skip ci]`; configureer eventueel ook je hosting om builds voor wijzigingen
in alleen `data/registrations.json` over te slaan.

## Technologie

- Next.js 16 met de App Router
- React 19
- TypeScript 5.9
- Tailwind CSS 4
- ESLint met de Next.js Core Web Vitals- en TypeScriptregels
