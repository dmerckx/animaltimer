export type StationVariation = {
  title: string;
  instruction: string;
  level: "Rustig" | "Actief" | "Uitdaging";
};

export type ParcoursStation = {
  id: string;
  name: string;
  emoji: string;
  accent: "coral" | "blue" | "yellow" | "green" | "purple";
  material: string[];
  optionalMaterial?: string[];
  preparation: string;
  safety: string;
  variations: StationVariation[];
};

export const parcours = {
  title: "Basisparcours",
  summary:
    "Een vaste opstelling die de kinderen meerdere keren doorlopen. Kies voor elke ronde een andere uitvoering per station.",
  duration: "± 15 min bewegen",
  setupTime: "± 10 min opbouw",
  ages: "3–6 jaar",
  groupSize: "6–20 kinderen",
  stations: [
    {
      id: "bank",
      name: "Bank",
      emoji: "➖",
      accent: "coral",
      material: ["1–3 turnbanken", "Mat aan het uiteinde"],
      optionalMaterial: ["Kersepitzakjes"],
      preparation:
        "Zet één bank of enkele banken stevig achter elkaar. Laat tussen twee banken geen gevaarlijke opening.",
      safety:
        "Controleer of alle banken stabiel staan en leg een mat waar kinderen afstappen of springen.",
      variations: [
        {
          title: "Armen als vleugels",
          instruction:
            "Wandel rechtop over de bank met je armen breed. Kijk naar het einde van de bank.",
          level: "Rustig",
        },
        {
          title: "Poes op de bank",
          instruction:
            "Kruip op handen en knieën over de volledige bank en kijk steeds vooruit.",
          level: "Rustig",
        },
        {
          title: "Zijwaartse stappen",
          instruction:
            "Draai zijwaarts en schuif stap voor stap over de bank zonder je voeten te kruisen.",
          level: "Uitdaging",
        },
        {
          title: "Buikschuiver",
          instruction:
            "Ga op je buik liggen en trek jezelf met beide armen tot aan het einde.",
          level: "Actief",
        },
        {
          title: "Over de pakjes",
          instruction:
            "Stap voorzichtig over enkele kersepitzakjes die verspreid op de bank liggen.",
          level: "Uitdaging",
        },
        {
          title: "Spring naast de bank",
          instruction:
            "Zet je handen op de bank en spring met twee voeten samen van links naar rechts.",
          level: "Actief",
        },
      ],
    },
    {
      id: "mat",
      name: "Mat",
      emoji: "▰",
      accent: "blue",
      material: ["1 lange of 2 korte matten"],
      optionalMaterial: ["Kersepitzakje"],
      preparation:
        "Leg de mat in het verlengde van het parcours. Gebruik eventueel een tweede mat om voldoende uitloopruimte te maken.",
      safety:
        "Laat het volgende kind pas starten wanneer de mat volledig vrij is. Een koprol gebeurt alleen met actieve hulp van een begeleider.",
      variations: [
        {
          title: "Boomstamrol",
          instruction:
            "Maak je lichaam lang, strek je armen boven je hoofd en rol zijwaarts over de mat.",
          level: "Rustig",
        },
        {
          title: "Koprol",
          instruction:
            "Maak je rug rond en rol alleen wanneer een begeleider naast de mat zit en je helpt.",
          level: "Uitdaging",
        },
        {
          title: "Kikkersprongen",
          instruction:
            "Spring met handen en voeten afwisselend vooruit tot aan het einde van de mat.",
          level: "Actief",
        },
        {
          title: "Krab over de mat",
          instruction:
            "Ga met je buik omhoog op handen en voeten en beweeg als een krab naar de overkant.",
          level: "Uitdaging",
        },
        {
          title: "Knieën hoog",
          instruction:
            "Loop over de mat en tik bij elke stap met je handen je hoge knieën aan.",
          level: "Actief",
        },
        {
          title: "Zakje op je buik",
          instruction:
            "Schuif op je rug vooruit zonder het kersepitzakje op je buik te verliezen.",
          level: "Uitdaging",
        },
      ],
    },
    {
      id: "plint",
      name: "Plint",
      emoji: "▤",
      accent: "yellow",
      material: ["Plint op aangepaste hoogte", "Dikke landingsmat"],
      optionalMaterial: ["Gekleurde kersepitzakjes"],
      preparation:
        "Kies een lage, haalbare hoogte. Zet de plint stabiel en leg een dikke mat aan de afstapzijde.",
      safety:
        "Een begeleider blijft naast de plint staan. Laat nooit twee kinderen tegelijk op het toestel.",
      variations: [
        {
          title: "Klim erop en eraf",
          instruction:
            "Klim langs de ene zijde op de plint, ga even rechtstaan en stap rustig af op de mat.",
          level: "Rustig",
        },
        {
          title: "Over de berg",
          instruction:
            "Kruip over de plint zonder recht te staan en daal aan de andere kant achterwaarts af.",
          level: "Rustig",
        },
        {
          title: "Spring en bevries",
          instruction:
            "Spring van een lage plint met twee voeten op de mat en blijf drie tellen stil staan.",
          level: "Uitdaging",
        },
        {
          title: "Buik over de rand",
          instruction:
            "Leg je buik op de plint, trek jezelf erover en zet eerst je handen op de mat.",
          level: "Actief",
        },
        {
          title: "Tik de kleur",
          instruction:
            "Klim op de plint en tik het gekleurde zakje aan dat de lesgever noemt.",
          level: "Rustig",
        },
        {
          title: "Door de tunnel",
          instruction:
            "Kruip door een veilige, open plintopstelling en kom aan de andere zijde weer recht.",
          level: "Uitdaging",
        },
      ],
    },
    {
      id: "kegels",
      name: "Kegeltjes",
      emoji: "🔶",
      accent: "green",
      material: ["6–10 kegeltjes"],
      optionalMaterial: ["Kersepitzakje", "Bal"],
      preparation:
        "Zet de kegeltjes in een rechte lijn met ongeveer één grote kinderstap tussen elk kegeltje.",
      safety:
        "Voorzie naast de rij een vrije terugweg en maak de tussenruimte groter voor snelle opdrachten.",
      variations: [
        {
          title: "Slalom",
          instruction:
            "Loop in een slinger tussen alle kegeltjes zonder er één om te stoten.",
          level: "Rustig",
        },
        {
          title: "Zijwaarts schuiven",
          instruction:
            "Beweeg zijwaarts langs de rij en tik elk kegeltje kort met één hand aan.",
          level: "Actief",
        },
        {
          title: "Spring over de lijn",
          instruction:
            "Spring met twee voeten samen afwisselend links en rechts van de kegeltjeslijn.",
          level: "Actief",
        },
        {
          title: "Zakje op je hoofd",
          instruction:
            "Doe de slalom met een kersepitzakje op je hoofd. Valt het, dan leg je het rustig terug.",
          level: "Uitdaging",
        },
        {
          title: "Bal aan de voet",
          instruction:
            "Dribbel een bal met kleine tikjes tussen de kegeltjes en stop hem aan het einde.",
          level: "Uitdaging",
        },
        {
          title: "Achteruit terug",
          instruction:
            "Loop voorwaarts door de slalom en wandel langs de vrije zijde voorzichtig achteruit terug.",
          level: "Uitdaging",
        },
      ],
    },
    {
      id: "ladder",
      name: "Grondladder",
      emoji: "🪜",
      accent: "purple",
      material: ["Loopladder of platte hoepels"],
      preparation:
        "Leg de ladder volledig vlak en in de looprichting. Met hoepels kun je dezelfde vakken nabouwen.",
      safety:
        "Gebruik alleen een grondladder zonder harde opstaande delen en zorg dat ze niet kan verschuiven.",
      variations: [
        {
          title: "Eén voet per vak",
          instruction:
            "Stap voorwaarts en zet in elk volgend vak precies één voet.",
          level: "Rustig",
        },
        {
          title: "Twee voeten per vak",
          instruction:
            "Zet links en rechts in elk vak voor je naar het volgende vak gaat.",
          level: "Actief",
        },
        {
          title: "Hinkelpad",
          instruction:
            "Hinkel door de eerste helft, wissel van been en hinkel verder.",
          level: "Uitdaging",
        },
        {
          title: "In, in, uit, uit",
          instruction:
            "Zet twee voeten in een vak en daarna twee voeten buiten de ladder. Herhaal vooruit.",
          level: "Uitdaging",
        },
        {
          title: "Handen in de vakken",
          instruction:
            "Beweeg als een beer: zet je handen één voor één in de vakken en laat je voeten volgen.",
          level: "Actief",
        },
        {
          title: "Zijwaartse ladder",
          instruction:
            "Kijk naar de zijmuur en stap met beide voeten zijwaarts door ieder vak.",
          level: "Uitdaging",
        },
      ],
    },
    {
      id: "hoepels",
      name: "Hoepels",
      emoji: "⭕",
      accent: "blue",
      material: ["5–8 hoepels"],
      optionalMaterial: ["Kersepitzakjes"],
      preparation:
        "Leg de hoepels als eilanden op de grond. Wissel links, rechts, dichtbij en iets verder weg af.",
      safety:
        "Leg de hoepels vlak en niet te ver uiteen. Ze mogen niet over elkaar schuiven.",
      variations: [
        {
          title: "Van eiland naar eiland",
          instruction:
            "Stap in elke hoepel zonder de zee ertussen te raken.",
          level: "Rustig",
        },
        {
          title: "Tweevoetensprongen",
          instruction:
            "Spring met twee voeten samen van hoepel naar hoepel en land telkens zacht.",
          level: "Actief",
        },
        {
          title: "Hinkel en wissel",
          instruction:
            "Hinkel in een hoepel, spring met twee voeten in de volgende en blijf afwisselen.",
          level: "Uitdaging",
        },
        {
          title: "Kleurencommando",
          instruction:
            "Volg de hoepels, maar sla de kleur over die de lesgever vooraf noemt.",
          level: "Uitdaging",
        },
        {
          title: "Zakje vooruit",
          instruction:
            "Gooi je kersepitzakje in de volgende hoepel en spring er daarna zelf naartoe.",
          level: "Actief",
        },
        {
          title: "Handen en voeten",
          instruction:
            "Zet in elke hoepel afwisselend twee voeten, één hand of twee handen.",
          level: "Uitdaging",
        },
      ],
    },
    {
      id: "mikpunt",
      name: "Mikpunt",
      emoji: "🎯",
      accent: "coral",
      material: ["Goal, bak of hoepel", "Zachte ballen of zakjes"],
      preparation:
        "Maak aan het einde een duidelijk doel en een werplijn. Leg meerdere ballen of zakjes klaar in een bak.",
      safety:
        "Laat pas gooien wanneer het doel vrij is. Ballen worden langs de buitenzijde opgehaald.",
      variations: [
        {
          title: "Zakje in de hoepel",
          instruction:
            "Gooi het kersepitzakje van achter de lijn en probeer het in de liggende hoepel te laten landen.",
          level: "Rustig",
        },
        {
          title: "Borstpas naar doel",
          instruction:
            "Duw een zachte bal met twee handen vanuit je borst naar de goal.",
          level: "Rustig",
        },
        {
          title: "Bovenhands mikken",
          instruction:
            "Gooi met één hand naar een hoge hoek en haal je bal daarna langs de zijkant op.",
          level: "Uitdaging",
        },
        {
          title: "Na één bots",
          instruction:
            "Laat de bal één keer botsen vóór hij in het doel of de bak terechtkomt.",
          level: "Uitdaging",
        },
        {
          title: "Draai en gooi",
          instruction:
            "Neem een bal, draai één rondje, zoek het doel opnieuw en gooi.",
          level: "Actief",
        },
        {
          title: "Kleurendoel",
          instruction:
            "Mik het zakje in de hoepel of bak met de kleur die de lesgever noemt.",
          level: "Rustig",
        },
      ],
    },
    {
      id: "tunnel",
      name: "Tunnel",
      emoji: "🕳️",
      accent: "green",
      material: ["1 turnbank", "Blauwe afscheidingswand"],
      optionalMaterial: ["Kersepitzakjes", "Zachte bal", "Mat aan de uitgang"],
      preparation:
        "Zet de turnbank stabiel en leg de blauwe afscheidingswand er stevig overheen. Maak een vrije, brede tunnel van ongeveer 50 centimeter hoog met een duidelijke ingang en uitgang.",
      safety:
        "Test zelf of de wand nergens kan schuiven of kantelen. Laat één kind tegelijk in dezelfde richting door de tunnel gaan en hou de uitgang volledig vrij.",
      variations: [
        {
          title: "Poes door de tunnel",
          instruction:
            "Kruip op handen en knieën rustig door de tunnel en kijk naar de uitgang.",
          level: "Rustig",
        },
        {
          title: "Slang op de buik",
          instruction:
            "Ga op je buik liggen en trek jezelf met je armen door de tunnel.",
          level: "Actief",
        },
        {
          title: "Muisje zonder geluid",
          instruction:
            "Kruip zo stil mogelijk door de tunnel. Aan de uitgang piep je één keer als een muis.",
          level: "Rustig",
        },
        {
          title: "Pakje op de rug",
          instruction:
            "Leg een kersepitzakje op je rug en kruip door de tunnel zonder het pakje te verliezen.",
          level: "Uitdaging",
        },
        {
          title: "Bal op verkenning",
          instruction:
            "Rol eerst een zachte bal door de tunnel en kruip er daarna zelf achteraan.",
          level: "Actief",
        },
        {
          title: "Tunnel en standbeeld",
          instruction:
            "Kruip door de tunnel, sta op de mat recht en blijf drie tellen als een standbeeld staan.",
          level: "Uitdaging",
        },
      ],
    },
  ] satisfies ParcoursStation[],
};
