export const categories = [
  "Lopen & bewegen",
  "Gooien & vangen",
  "Balans & rollen",
  "Samen spelen",
] as const;

export type ExerciseCategory = (typeof categories)[number];

export type Assignment = {
  title: string;
  instruction: string;
  level?: "Rustig" | "Actief" | "Uitdaging";
};

export type Exercise = {
  id: string;
  kind?: "animal-timer";
  title: string;
  summary: string;
  category: ExerciseCategory;
  emoji: string;
  accent: "coral" | "blue" | "yellow" | "green" | "purple";
  duration: string;
  ages: string;
  groupSize: string;
  material: string[];
  optionalMaterial?: string[];
  setup: string;
  tip: string;
  assignments: Assignment[];
};

export const exercises: Exercise[] = [
  {
    id: "balletje-verstoppen",
    title: "Balletje verstoppen",
    summary: "Zoeken, sprinten en goed kijken tussen een rij kegels.",
    category: "Lopen & bewegen",
    emoji: "🔎",
    accent: "coral",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "4–16 kinderen",
    material: ["10 kegels", "Geel balletje"],
    optionalMaterial: ["Hoepels", "Kersepitzakjes"],
    setup:
      "Zet ongeveer tien kegels met voldoende tussenruimte op een rij. Spreek een startpunt af en verstop het balletje onder één kegel terwijl de kinderen wegkijken.",
    tip:
      "Laat een helper het balletje verstoppen. Zo kun jij de zoekers begeleiden en blijft het tempo hoog.",
    assignments: [
      {
        title: "Vrij zoeken",
        instruction:
          "Loop van het startpunt naar de kegels. Til telkens één kegel op tot je het balletje vindt.",
        level: "Rustig",
      },
      {
        title: "Eén kegel per beurt",
        instruction:
          "Elk kind mag maar één kegel controleren en loopt dan terug. Het volgende kind vertrekt meteen.",
        level: "Actief",
      },
      {
        title: "Sluip naar de schat",
        instruction:
          "Ga zo stil mogelijk op je tippen naar de kegels. Wie lawaai maakt, bevriest drie tellen.",
        level: "Rustig",
      },
      {
        title: "Springende speurders",
        instruction:
          "Ga met twee voeten samen springend naar de kegels en loop gewoon terug.",
        level: "Actief",
      },
      {
        title: "Kleurenkapitein",
        instruction:
          "De lesgever noemt een kleur of nummer. Alleen die kegel mag eerst gecontroleerd worden.",
        level: "Rustig",
      },
      {
        title: "Nadoen tijdens het wachten",
        instruction:
          "Eén kind toont een beweging met een hoepel, bal of zakje. De wachtende kinderen doen exact na.",
        level: "Actief",
      },
      {
        title: "Warm en koud",
        instruction:
          "De groep roept ‘warmer’ of ‘kouder’ om één zoeker naar de juiste kegel te sturen.",
        level: "Rustig",
      },
      {
        title: "Duo-speurders",
        instruction:
          "Twee kinderen vertrekken hand in hand en moeten samen beslissen welke kegel ze optillen.",
        level: "Uitdaging",
      },
    ],
  },
  {
    id: "balletjes-omgooien",
    title: "Balletjes omgooien",
    summary: "Mikken als team en alle kegels van de bank spelen.",
    category: "Gooien & vangen",
    emoji: "🎯",
    accent: "yellow",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "6–20 kinderen",
    material: ["10 kegels", "Bank", "Zachte ballen"],
    setup:
      "Zet de kegels verspreid op een bank. Maak één of twee kleine groepjes en teken een werplijn dicht genoeg bij de bank. Ballen worden alleen op het stopsignaal opgehaald.",
    tip:
      "Gebruik grote, zachte ballen. Laat de jongste kinderen eerst rollen of van dichtbij gooien en geef telkens maar één korte opdracht.",
    assignments: [
      {
        title: "Alle kegels neer",
        instruction:
          "Beide teams gooien tot alle kegels van de bank zijn. Tel samen hoeveel worpen nodig waren.",
        level: "Rustig",
      },
      {
        title: "Tegen de klok",
        instruction:
          "Krijgen jullie alle kegels neer voor één minuut voorbij is? Zet ze recht en probeer opnieuw.",
        level: "Actief",
      },
      {
        title: "Onderhands rollen",
        instruction:
          "Rol de bal vanaf de lijn over de grond en probeer de poten of kegels te raken.",
        level: "Rustig",
      },
      {
        title: "Eén hand",
        instruction:
          "Gooi bovenhands met je favoriete hand. Probeer daarna ook eens met je andere hand.",
        level: "Uitdaging",
      },
      {
        title: "Verre werplijn",
        instruction:
          "Na elke treffer zet het hele team één stap achteruit. Hoe ver raken jullie nog een kegel?",
        level: "Uitdaging",
      },
      {
        title: "Kleur op commando",
        instruction:
          "De lesgever noemt een kleur. Alleen de kegel met die kleur levert een punt op.",
        level: "Rustig",
      },
      {
        title: "Estafetteworp",
        instruction:
          "Gooi één keer, haal je bal op en tik de volgende van je team aan bij de startlijn.",
        level: "Actief",
      },
      {
        title: "Eerst gooien, dan bouwen",
        instruction:
          "De gooiers wachten achter de lijn zodra het stopsignaal klinkt. Pas dan zet het andere groepje de kegels weer recht. Daarna wisselen jullie.",
        level: "Actief",
      },
    ],
  },
  {
    id: "op-en-af-met-hoepels",
    title: "Op en af met hoepels",
    summary: "Rollen, draaien, springen en samenwerken met hoepels.",
    category: "Balans & rollen",
    emoji: "⭕",
    accent: "blue",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "4–20 kinderen",
    material: ["1 hoepel per kind of duo"],
    setup:
      "Verspreid de kinderen over de zaal. Zorg dat iedereen rondom zich genoeg vrije ruimte heeft om een hoepel neer te leggen.",
    tip:
      "Wissel individuele opdrachten af met duo’s. Zo hoef je niet voor elk kind een hoepel te hebben.",
    assignments: [
      {
        title: "Hoepelhuis",
        instruction:
          "Leg je hoepel op de grond. Spring erin, eruit, links, rechts, voor en achter.",
        level: "Rustig",
      },
      {
        title: "Rijdende auto",
        instruction:
          "Hou de hoepel rond je middel als een stuur en loop zonder tegen andere auto’s te botsen.",
        level: "Actief",
      },
      {
        title: "Wandelende hoepel",
        instruction:
          "Zet de hoepel recht en begeleid hem naast je terwijl je naar de overkant wandelt.",
        level: "Rustig",
      },
      {
        title: "Rol en ren",
        instruction:
          "Laat je hoepel zo ver mogelijk rollen en sprint erachteraan. Vang hem voor hij omvalt.",
        level: "Actief",
      },
      {
        title: "Draaitol",
        instruction:
          "Geef de hoepel een draai op zijn rand. Draai zelf één rondje en vang hem weer.",
        level: "Uitdaging",
      },
      {
        title: "Eilandentocht",
        instruction:
          "Werk per twee met twee hoepels. Verleg telkens het lege eiland om samen de zee over te steken.",
        level: "Uitdaging",
      },
      {
        title: "Hoepeltunnel",
        instruction:
          "De helft houdt hoepels rechtop. De anderen kruipen door de tunnel en daarna wisselen jullie.",
        level: "Actief",
      },
      {
        title: "Lichaamslift",
        instruction:
          "Stap in de hoepel en breng hem zonder los te laten van je voeten tot boven je hoofd.",
        level: "Uitdaging",
      },
      {
        title: "Stuur door",
        instruction:
          "Rol de hoepel zacht naar je partner. Die stopt hem met twee handen en rolt terug.",
        level: "Rustig",
      },
      {
        title: "Muzikale eilanden",
        instruction:
          "Loop rond de hoepels. Op het stopsignaal zoekt iedereen snel een eiland om in te staan.",
        level: "Actief",
      },
    ],
  },
  {
    id: "overloop-dieren",
    title: "Overloop: dieren",
    summary: "Steek de zaal over zoals snelle, trage en gekke dieren.",
    category: "Lopen & bewegen",
    emoji: "🐾",
    accent: "green",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "4–24 kinderen",
    material: [],
    optionalMaterial: ["2 matten"],
    setup:
      "Baken een duidelijke start- en eindlijn af. Toon elke dierenbeweging eerst kort voor en laat iedereen tegelijk oversteken.",
    tip:
      "Laat de kinderen om beurten een dier kiezen. Vraag na elke oversteek welk lichaamsdeel het hardst werkte.",
    assignments: [
      {
        title: "Slang",
        instruction: "Kronkel laag over de grond zonder je knieën te gebruiken.",
        level: "Uitdaging",
      },
      {
        title: "Kikker",
        instruction:
          "Zet je handen voor je neer en spring met beide voeten tot bij je handen.",
        level: "Actief",
      },
      {
        title: "Olifant",
        instruction:
          "Neem zware, grote passen en maak met je armen een lange slurf.",
        level: "Rustig",
      },
      {
        title: "Giraf",
        instruction:
          "Maak je zo lang mogelijk en wandel hoog op je tippen naar de overkant.",
        level: "Rustig",
      },
      {
        title: "Luipaard",
        instruction: "Sprint zo snel mogelijk en rem af vóór de eindlijn.",
        level: "Actief",
      },
      {
        title: "Paard",
        instruction:
          "Ga in draf met lichte huppelpasjes. Maak aan de overkant een grote hinnikwieuw.",
        level: "Actief",
      },
      {
        title: "Krab",
        instruction:
          "Loop zijwaarts op handen en voeten met je buik naar boven.",
        level: "Uitdaging",
      },
      {
        title: "Pinguïn",
        instruction:
          "Waggel met kleine pasjes en hou je armen strak naast je lichaam.",
        level: "Rustig",
      },
      {
        title: "Beer",
        instruction:
          "Stap op handen en voeten met gestrekte benen en je billen hoog.",
        level: "Actief",
      },
      {
        title: "Kangoeroe",
        instruction:
          "Maak grote sprongen met twee voeten samen en land telkens zacht.",
        level: "Actief",
      },
      {
        title: "Flamingo",
        instruction:
          "Stap drie passen en blijf daarna drie tellen op één been staan.",
        level: "Uitdaging",
      },
      {
        title: "Muis",
        instruction:
          "Maak piepkleine, snelle pasjes en probeer muisstil te blijven.",
        level: "Rustig",
      },
    ],
  },
  {
    id: "overloop-oefeningen",
    title: "Overloop: bewegen",
    summary: "Een grote voorraad manieren om de zaal over te steken.",
    category: "Lopen & bewegen",
    emoji: "🏃",
    accent: "purple",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "4–24 kinderen",
    material: [],
    optionalMaterial: ["2 matten", "Kegels"],
    setup:
      "Gebruik twee lijnen of matten als start en finish. Toon elke beweging eerst voor en stuur de kinderen in kleine golven met voldoende tussenruimte.",
    tip:
      "Kies drie tot vijf opdrachten en gebruik een eenvoudig beeld, zoals reus of kabouter. Voor 3-jarigen is nadoen belangrijker dan technisch juist uitvoeren.",
    assignments: [
      {
        title: "Op je tippen",
        instruction: "Wandel zo hoog en stil mogelijk op je tenen.",
        level: "Rustig",
      },
      {
        title: "Hinkelen",
        instruction:
          "Probeer enkele sprongen op één been. Lukt dat nog niet, maak dan een stap en een klein huppelsprongetje.",
        level: "Uitdaging",
      },
      {
        title: "Tweevoetensprong",
        instruction: "Spring met twee voeten samen en land telkens zacht.",
        level: "Actief",
      },
      {
        title: "Zijwaarts schuiven",
        instruction:
          "Kijk naar de zijmuur en schuif zijwaarts zonder je voeten te kruisen.",
        level: "Actief",
      },
      {
        title: "Kruispas",
        instruction:
          "Stap zijwaarts en kruis af en toe één voet voor de andere. De lesgever doet traag mee.",
        level: "Uitdaging",
      },
      {
        title: "Reuzenpassen",
        instruction: "Ga in zo weinig mogelijk grote passen naar de overkant.",
        level: "Rustig",
      },
      {
        title: "Kabouterpassen",
        instruction: "Ga in zo veel mogelijk piepkleine pasjes naar de overkant.",
        level: "Actief",
      },
      {
        title: "Achteruit",
        instruction:
          "Wandel rustig achteruit en kijk over je schouder. Hou voldoende afstand.",
        level: "Uitdaging",
      },
      {
        title: "Stoplicht",
        instruction:
          "Groen is lopen, oranje is wandelen en rood is zo snel mogelijk bevriezen.",
        level: "Actief",
      },
      {
        title: "Laag en hoog",
        instruction:
          "Wissel na elke drie passen tussen heel klein bukken en heel groot strekken.",
        level: "Rustig",
      },
      {
        title: "Draai en door",
        instruction: "Loop vijf passen, draai één rondje en loop weer verder.",
        level: "Uitdaging",
      },
      {
        title: "Spiegelduo",
        instruction:
          "Ga per twee. De achterste kopieert precies hoe de voorste beweegt.",
        level: "Uitdaging",
      },
    ],
  },
  {
    id: "schipper-mag-ik-overvaren",
    title: "Schipper mag ik overvaren?",
    summary: "Oversteken op commando zonder door de schipper getikt te worden.",
    category: "Samen spelen",
    emoji: "⛵",
    accent: "blue",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "8–24 kinderen",
    material: ["2 matten"],
    setup:
      "Leg aan elk uiteinde van de zaal een mat. Toon eerst één oversteek zonder tikker. Daarna staat de lesgever of één kind als schipper in het midden.",
    tip:
      "Tik zacht op de schouder en laat niemand afvallen. Voeg hoogstens enkele schippers toe en start daarna opnieuw, zodat de jongste kinderen het spel blijven begrijpen.",
    assignments: [
      {
        title: "Kikkerboot",
        instruction:
          "De schipper zegt ‘spring als een kikker’. Alleen kikkers varen veilig over.",
        level: "Actief",
      },
      {
        title: "Stille boot",
        instruction:
          "Steek op je tippen over zonder enig geluid te maken. Geluid betekent: de schipper mag tikken.",
        level: "Rustig",
      },
      {
        title: "Kleurenticket",
        instruction:
          "Wie de genoemde kleur draagt, krijgt een vrij ticket. De rest probeert snel over te lopen.",
        level: "Actief",
      },
      {
        title: "Duo-overtocht",
        instruction:
          "Steek per twee hand in hand over. Als één iemand getikt is, worden jullie samen schipper.",
        level: "Uitdaging",
      },
      {
        title: "Achteruit varen",
        instruction:
          "Wandel voorzichtig achteruit naar de andere haven. Kijk goed over je schouder.",
        level: "Uitdaging",
      },
      {
        title: "Storm op zee",
        instruction:
          "Bij ‘storm’ mag de schipper iedereen tikken. Bij ‘stil water’ bevriest iedereen.",
        level: "Actief",
      },
      {
        title: "Eilandpauze",
        instruction:
          "Leg een extra hoepel in het midden. Daar mag je maximaal drie tellen veilig rusten.",
        level: "Uitdaging",
      },
      {
        title: "Kapitein kiest",
        instruction:
          "Een kind bedenkt de volgende manier van oversteken en toont die eerst aan de groep.",
        level: "Rustig",
      },
    ],
  },
  {
    id: "over-jezelf-springen",
    title: "Over jezelf springen",
    summary: "Meet je eigen lengte en ontdek hoe ver je kunt springen.",
    category: "Lopen & bewegen",
    emoji: "📏",
    accent: "yellow",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "4–16 kinderen",
    material: ["Markeringspotjes"],
    optionalMaterial: ["Meetlint", "Matten"],
    setup:
      "Laat elk kind even op een mat liggen en markeer de lichaamslengte met twee potjes. Leg halverwege een extra startafstand voor kinderen die nog kleine sprongen maken.",
    tip:
      "Vergelijk kinderen niet met elkaar. Begin op een haalbare afstand en schuif het eindpotje pas verder wanneer een kind zacht en stabiel landt.",
    assignments: [
      {
        title: "Spring uit stand",
        instruction:
          "Zet je voeten naast elkaar, zwaai je armen en land zacht voorbij het eerste potje. Schuif het potje telkens een klein stukje verder.",
        level: "Rustig",
      },
      {
        title: "Met aanloop",
        instruction:
          "Neem drie rustige aanlooppassen, zet af en land met twee voeten op de mat. Kies zelf een haalbaar potje om voorbij te springen.",
        level: "Actief",
      },
      {
        title: "Kikkersprongen",
        instruction:
          "Hoeveel kikkersprongen heb je nodig om je eigen lengte af te leggen?",
        level: "Actief",
      },
      {
        title: "Zijwaartse sprong",
        instruction:
          "Ga zijwaarts staan en spring met twee voeten samen over de gemarkeerde afstand.",
        level: "Uitdaging",
      },
      {
        title: "Spring over beekjes",
        instruction:
          "Leg twee of drie korte lijnen als beekjes. Spring er met twee voeten over en land telkens zacht.",
        level: "Actief",
      },
      {
        title: "Groepsslang",
        instruction:
          "Leg alle lichaamslengtes na elkaar. Kan de groep de hele afstand met gezamenlijke sprongen afleggen?",
        level: "Actief",
      },
    ],
  },
  {
    id: "mat-rol-oefeningen",
    title: "Rollen op de mat",
    summary: "Veilig tuimelen, rollen en lichaamscontrole oefenen.",
    category: "Balans & rollen",
    emoji: "🤸",
    accent: "purple",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "4–16 kinderen",
    material: ["Dikke matten"],
    optionalMaterial: ["Schuine bank", "Kersepitzakje"],
    setup:
      "Leg matten in één of meer banen. Kinderen starten pas wanneer de vorige van de mat is. Help actief bij nieuwe rolbewegingen.",
    tip:
      "Begin met eenvoudige lengte- en zijrollen. Laat een koprol alleen proberen met actieve hulp van een begeleider en forceer de beweging nooit.",
    assignments: [
      {
        title: "Boomstamrol",
        instruction:
          "Maak je lang met je armen boven je hoofd en rol zijwaarts als een rechte boomstam.",
        level: "Rustig",
      },
      {
        title: "Egelrol",
        instruction:
          "Maak je klein, pak je knieën vast en wieg heen en weer op je ronde rug.",
        level: "Rustig",
      },
      {
        title: "Zijwaarts tuimelen",
        instruction:
          "Hurk neer, zet één hand op de mat en tuimel zacht over je zij.",
        level: "Rustig",
      },
      {
        title: "Koprol",
        instruction:
          "Zet je handen neer en maak je rug rond. Rol alleen wanneer een begeleider naast je zit en je helpt.",
        level: "Uitdaging",
      },
      {
        title: "Schuine koprol",
        instruction:
          "Rol van een licht verhoogde, zachte helling naar beneden. Een begeleider helpt bij je schouders.",
        level: "Uitdaging",
      },
      {
        title: "Rol en poseer",
        instruction:
          "Maak een boomstamrol en eindig in een zelfgekozen standbeeldhouding.",
        level: "Actief",
      },
      {
        title: "Zakje mee",
        instruction:
          "Klem een kersepitzakje tussen je handen en probeer het tijdens je rol niet te verliezen.",
        level: "Uitdaging",
      },
      {
        title: "Duo-spiegel",
        instruction:
          "Rol naast elkaar in hetzelfde tempo en probeer tegelijk te stoppen.",
        level: "Uitdaging",
      },
    ],
  },
  {
    id: "bank-oefeningen",
    title: "Op en rond de bank",
    summary: "Balanceren, kruipen, springen en trekken aan één toestel.",
    category: "Balans & rollen",
    emoji: "⚖️",
    accent: "coral",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "4–18 kinderen",
    material: ["Turnbanken", "Matten"],
    setup:
      "Zet banken stevig en leg matten aan risicopunten. Werk in één richting en laat pas starten wanneer er ruimte is.",
    tip:
      "Laat 3-jarigen dezelfde beweging eerst op een lijn naast de bank proberen. Een begeleider blijft binnen armbereik bij elke opdracht op de bank.",
    assignments: [
      {
        title: "Gewoon wandelen",
        instruction:
          "Wandel rustig over de bank met je armen breed. Kijk naar het einde, niet naar je voeten.",
        level: "Rustig",
      },
      {
        title: "Zijwaarts",
        instruction:
          "Stap zijwaarts over de bank en tik bij elke stap je hielen tegen elkaar.",
        level: "Uitdaging",
      },
      {
        title: "Op handen en knieën",
        instruction: "Kruip als een poes over de bank en kijk vooruit.",
        level: "Rustig",
      },
      {
        title: "Buikschuiver",
        instruction:
          "Lig op je buik en trek jezelf met je armen naar het andere einde.",
        level: "Actief",
      },
      {
        title: "Kruiselings springen",
        instruction:
          "Zet je handen op de bank en spring met beide voeten samen van links naar rechts.",
        level: "Actief",
      },
      {
        title: "Onder de brug",
        instruction:
          "Kruip onder de bank door zonder ze aan te raken en sta aan de andere kant recht.",
        level: "Rustig",
      },
      {
        title: "Achteruit balanceren",
        instruction:
          "Probeer eerst achteruit over een lijn op de grond. Op de bank mag het alleen stap voor stap met de hand van een begeleider.",
        level: "Uitdaging",
      },
      {
        title: "Over hindernissen",
        instruction:
          "Leg zachte zakjes op de bank en stap er voorzichtig over zonder ze te raken.",
        level: "Uitdaging",
      },
      {
        title: "Stopbeeld",
        instruction:
          "Stop halverwege, blijf drie tellen op één been staan en wandel dan verder.",
        level: "Uitdaging",
      },
      {
        title: "Veilige afsprong",
        instruction:
          "Spring aan het einde met twee voeten op de mat en blijf als een standbeeld staan.",
        level: "Actief",
      },
    ],
  },
  {
    id: "passenspel",
    title: "Passenspel",
    summary: "Samen rollen, gooien, vrijlopen en voorzichtig onderscheppen.",
    category: "Samen spelen",
    emoji: "🤝",
    accent: "green",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "8–20 kinderen",
    material: ["1 grote, zachte bal", "Partijvestjes"],
    optionalMaterial: ["2 hoepels"],
    setup:
      "Maak twee kleine teams met liefst een begeleider in elk team. Speel in een duidelijk vak en begin zonder tegenstander, zodat de kinderen eerst leren kijken en passen.",
    tip:
      "Gebruik voor 3- en 4-jarigen vooral rollen en drie passen met de begeleider als verbindingsspeler. Voeg pas bij een vaardige groep één wandelende verdediger toe.",
    assignments: [
      {
        title: "Bal rond de kring",
        instruction:
          "Maak per team een kleine kring. Rol de bal naar elkaar en noem de naam van het kind dat de bal krijgt.",
        level: "Rustig",
      },
      {
        title: "Naar de begeleider",
        instruction:
          "Gooi of rol naar de begeleider. Die speelt de bal telkens door naar een ander kind. Er is nog geen verdediger.",
        level: "Rustig",
      },
      {
        title: "Drie passen",
        instruction:
          "Maak samen drie passen zonder dat de bal wegrolt. Valt hij, dan raapt iemand hem op en tellen jullie opnieuw.",
        level: "Actief",
      },
      {
        title: "Vijf passen",
        instruction:
          "Lukken drie passen vlot? Probeer er dan vijf. Een begeleider telt luidop mee en iedereen blijft wandelen.",
        level: "Uitdaging",
      },
      {
        title: "Noem een naam",
        instruction:
          "Kijk eerst naar een teamgenoot, noem de naam en pas pas wanneer die klaarstaat met twee open handen.",
        level: "Rustig",
      },
      {
        title: "Iedereen aan de bal",
        instruction:
          "De begeleider helpt om de bal één keer bij ieder kind te krijgen. Daarna juicht het hele team samen.",
        level: "Uitdaging",
      },
      {
        title: "Eén zachte verdediger",
        instruction:
          "Eén verdediger wandelt en mag alleen een pass onderscheppen, nooit de bal uit handen nemen. Wissel snel van verdediger.",
        level: "Uitdaging",
      },
      {
        title: "Naar het eiland",
        instruction:
          "Maak drie passen en rol de bal daarna naar een teamgenoot in een hoepel. Dat is samen één punt.",
        level: "Uitdaging",
      },
    ],
  },
  {
    id: "passen-per-twee",
    title: "Passen per twee",
    summary: "Ontdek veel manieren om een bal naar je partner te spelen.",
    category: "Gooien & vangen",
    emoji: "🏐",
    accent: "blue",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "4–24 kinderen",
    material: ["1 bal per duo", "1 mat per duo"],
    setup:
      "Maak duo’s en laat ze dicht bij elkaar beginnen. De mat toont hun speelvak; pas wanneer het goed lukt, schuiven ze een klein stapje uit elkaar.",
    tip:
      "Geef elk duo een grote, zachte bal. Een 3-jarige mag de bal na een bots tegen het lichaam stoppen; netjes uit de lucht vangen hoeft nog niet.",
    assignments: [
      {
        title: "Zittend rollen",
        instruction:
          "Zit met je benen open en rol de bal recht tussen de handen van je partner.",
        level: "Rustig",
      },
      {
        title: "Zittend botsen",
        instruction:
          "Bots de bal één keer in het midden van de mat zodat je partner hem kan vangen.",
        level: "Rustig",
      },
      {
        title: "Borstpas",
        instruction:
          "Sta recht, hou de bal voor je borst en duw hem met twee handen naar je partner.",
        level: "Rustig",
      },
      {
        title: "Botspas",
        instruction:
          "Laat de bal één keer op de mat botsen voor hij bij je partner komt.",
        level: "Actief",
      },
      {
        title: "Met de voeten",
        instruction:
          "Pas de bal rustig met de binnenkant van je voet. Stop hem eerst voor je terugpasst.",
        level: "Rustig",
      },
      {
        title: "Na elke pas klappen",
        instruction:
          "Gooi de bal, klap één keer in je handen en maak ze snel klaar om te vangen.",
        level: "Uitdaging",
      },
      {
        title: "Door het poortje",
        instruction:
          "Maak een breed poortje met je benen. Je partner rolt de bal erdoor en jij draait je om om hem te halen.",
        level: "Actief",
      },
      {
        title: "Eén hand",
        instruction:
          "Gooi met één hand en vang met twee. Wissel daarna van werphand.",
        level: "Uitdaging",
      },
      {
        title: "Stap achteruit",
        instruction:
          "Na drie goede passen zetten jullie allebei één stap achteruit. Hoe ver raken jullie?",
        level: "Uitdaging",
      },
      {
        title: "Samen tot tien",
        instruction:
          "Tel elke pas samen tot tien. Rolt of valt de bal weg, haal hem op en tel gewoon verder.",
        level: "Actief",
      },
    ],
  },
  {
    id: "overlopen-met-bal",
    title: "Overlopen met bal",
    summary: "Neem de bal mee naar de overkant met handen of voeten.",
    category: "Gooien & vangen",
    emoji: "⚽",
    accent: "yellow",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "4–24 kinderen",
    material: ["1 bal per kind"],
    optionalMaterial: ["Kegels", "2 matten"],
    setup:
      "Baken een brede start- en eindzone af. Laat kinderen in golven vertrekken en kies ballen die goed botsen en rollen.",
    tip:
      "Werk je met weinig ballen, maak dan duo’s: één kind steekt over en passt vanaf de eindlijn terug.",
    assignments: [
      {
        title: "Bots en vang",
        instruction:
          "Bots de bal één keer, neem hem met twee handen vast, stap verder en herhaal.",
        level: "Rustig",
      },
      {
        title: "Dribbelen",
        instruction:
          "Blijf de bal met één hand botsen terwijl je rustig naar de overkant loopt.",
        level: "Uitdaging",
      },
      {
        title: "Bal aan de voet",
        instruction:
          "Geef de bal kleine tikjes met je voeten en hou hem dicht bij je.",
        level: "Rustig",
      },
      {
        title: "Gooi en vang",
        instruction:
          "Gooi de bal een klein stukje boven je hoofd en vang hem telkens met twee handen.",
        level: "Uitdaging",
      },
      {
        title: "Ver weg stampen",
        instruction:
          "Trap de bal ver voor je uit en sprint erachteraan. Stop hem vóór de eindlijn.",
        level: "Actief",
      },
      {
        title: "Ver weg gooien",
        instruction:
          "Gooi de bal voor je uit, loop erachteraan en pak hem pas na de eerste bots.",
        level: "Actief",
      },
      {
        title: "Rond je middel",
        instruction:
          "Wandel en geef de bal telkens door van je ene naar je andere hand rond je middel.",
        level: "Uitdaging",
      },
      {
        title: "Boven en onder",
        instruction:
          "Hef de bal drie passen boven je hoofd en hou hem daarna drie passen laag bij de grond.",
        level: "Rustig",
      },
      {
        title: "Slalom",
        instruction:
          "Dribbel of rol de bal in een slalom tussen de kegels.",
        level: "Uitdaging",
      },
      {
        title: "Duo-transport",
        instruction:
          "Klem de bal per twee tussen jullie rug of buik en bereik de overkant zonder handen.",
        level: "Uitdaging",
      },
    ],
  },
  {
    id: "bal-tegen-de-muur",
    title: "Bal tegen de muur",
    summary: "Gooien, reageren en vangen met een veilige eigen muurzone.",
    category: "Gooien & vangen",
    emoji: "🧱",
    accent: "coral",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "2–16 kinderen",
    material: ["1 zachte bal per kind of duo", "Vrije muur"],
    setup:
      "Geef elk kind of duo een eigen stuk muur. Begin op één grote kinderpas van de muur en zorg dat niemand door een andere werpzone loopt.",
    tip:
      "Begin met rollen en stoppen, daarna pas met gooien. Gebruik een grote, zachte bal en laat kinderen de terugkerende bal gerust na een bots vastnemen.",
    assignments: [
      {
        title: "Rol en stop",
        instruction:
          "Rol de bal met twee handen tegen de muur en stop hem met open handen wanneer hij terugkomt.",
        level: "Rustig",
      },
      {
        title: "Eén bots",
        instruction:
          "Laat de terugkomende bal één keer op de grond botsen voor je hem vangt.",
        level: "Rustig",
      },
      {
        title: "Gooi en vang",
        instruction:
          "Gooi met twee handen tegen de muur. Probeer rechtstreeks te vangen of neem de bal na één bots vast.",
        level: "Uitdaging",
      },
      {
        title: "Raak de stip",
        instruction:
          "Kies een denkbeeldige stip op de muur en probeer die vijf keer te raken.",
        level: "Rustig",
      },
      {
        title: "Tik de grond",
        instruction:
          "Gooi rustig tegen de muur, tik de grond aan en stop de bal met twee handen na de bots.",
        level: "Uitdaging",
      },
      {
        title: "Klap en pak",
        instruction:
          "Gooi tegen de muur, klap één keer en pak de bal vast nadat hij op de grond botst.",
        level: "Uitdaging",
      },
      {
        title: "Andere hand",
        instruction:
          "Gooi met één hand en vang met twee. Probeer links en rechts af te wisselen.",
        level: "Uitdaging",
      },
      {
        title: "Onderhands",
        instruction:
          "Zwaai de bal van laag naar hoog tegen de muur en vang hem voor je buik.",
        level: "Rustig",
      },
      {
        title: "Duo om de beurt",
        instruction:
          "De ene gooit tegen de muur, de andere vangt. Wissel na elke worp van rol.",
        level: "Actief",
      },
    ],
  },
  {
    id: "gooien-naar-de-keeper",
    title: "Gooien naar de keeper",
    summary: "Een actief mikcircuit met verschillende worpen naar doel.",
    category: "Gooien & vangen",
    emoji: "🥅",
    accent: "purple",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "5–20 kinderen",
    material: ["Zachte ballen", "Goal", "Kegels", "Mat"],
    optionalMaterial: ["Hoepels", "Bank"],
    setup:
      "Maak vóór het doel een korte bewegingslus zodat niemand lang stilstaat. Zet een brede, nabije werplijn en begin met een begeleider als rustige keeper.",
    tip:
      "Gebruik zachte ballen en laat de keeper met de handen laag en open klaarstaan. Een bal tot bij het doel krijgen is al succes; mikken in hoeken is voor een vaardige groep.",
    assignments: [
      {
        title: "Van achter het hoofd",
        instruction:
          "Breng de bal met twee handen achter je hoofd, stap vooruit en gooi gericht naar het doel.",
        level: "Rustig",
      },
      {
        title: "Vanuit de borst",
        instruction:
          "Duw de bal met twee handen vanuit je borst recht naar een vrije hoek.",
        level: "Rustig",
      },
      {
        title: "Met één hand",
        instruction:
          "Hou de bal naast je oor, wijs met je andere hand naar het doel en gooi.",
        level: "Uitdaging",
      },
      {
        title: "Shot op doel",
        instruction:
          "Leg de bal stil, neem een korte aanloop en trap met de binnenkant van je voet.",
        level: "Actief",
      },
      {
        title: "Slalom en gooi",
        instruction:
          "Loop eerst rond drie kegels, pak de bal van de mat en gooi meteen naar doel.",
        level: "Actief",
      },
      {
        title: "Over de bank",
        instruction:
          "Stap of kruip over de bank, neem een bal en probeer rustig te scoren.",
        level: "Actief",
      },
      {
        title: "Mik in een hoek",
        instruction:
          "De lesgever noemt links, rechts, hoog of laag. Probeer daar gericht te gooien.",
        level: "Uitdaging",
      },
      {
        title: "Na een botspas",
        instruction:
          "Een begeleider rolt of botst de bal rustig toe. Stop hem eerst met twee handen, draai naar het doel en gooi.",
        level: "Uitdaging",
      },
      {
        title: "Keeper in beweging",
        instruction:
          "De keeper start naast het doel en stapt pas op het signaal naar binnen. De gooier kiest snel een hoek.",
        level: "Uitdaging",
      },
      {
        title: "Teamrecord",
        instruction:
          "Hoeveel gerichte doelpogingen kan de hele groep in één minuut uitvoeren? Iedereen blijft bewegen.",
        level: "Actief",
      },
    ],
  },
  {
    id: "matten-overdragen",
    title: "Matten overdragen",
    summary: "Breng samen een mat en haar lading veilig naar de overkant.",
    category: "Samen spelen",
    emoji: "🛝",
    accent: "blue",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "6–24 kinderen",
    material: ["1 lichte mat per team"],
    optionalMaterial: ["Knuffels", "Zachte ballen", "Kersepitzakjes", "Kegels"],
    setup:
      "Maak teams van drie of vier kinderen. Elk team krijgt een lichte mat en een eigen korte, brede baan zonder tegenliggers.",
    tip:
      "Toon eerst samen: twee handen aan de rand, kleine stappen en stoppen op jouw signaal. De mat blijft laag, niemand zit erop en bij onbalans zet het team ze meteen neer.",
    assignments: [
      {
        title: "Samen naar de overkant",
        instruction:
          "Iedereen neemt een hoek of stevige rand vast. Til tegelijk op en draag de lege mat rustig naar de overkant.",
        level: "Rustig",
      },
      {
        title: "Knuffeltransport",
        instruction:
          "Leg enkele knuffels als passagiers op de mat. Breng ze naar de overkant zonder dat er eentje afvalt.",
        level: "Rustig",
      },
      {
        title: "Ballen aan boord",
        instruction:
          "Leg drie zachte ballen op de mat. Stap gelijkmatig zodat de ballen aan boord blijven.",
        level: "Uitdaging",
      },
      {
        title: "Schatten verzamelen",
        instruction:
          "Stop onderweg bij drie kegels en leg bij elke kegel een kersepitzakje extra op de mat.",
        level: "Actief",
      },
      {
        title: "Slalomtransport",
        instruction:
          "Draag de mat samen in een ruime slalom rond de kegels. Overleg vóór elke bocht.",
        level: "Uitdaging",
      },
      {
        title: "Kabouterstappen",
        instruction:
          "Iedereen houdt de mat met twee handen vast en draagt ze met piepkleine kabouterstappen naar de overkant.",
        level: "Rustig",
      },
      {
        title: "De stille verhuis",
        instruction:
          "Breng de mat over zonder te praten. Gebruik kijken, knikken en samen tellen om tegelijk te bewegen.",
        level: "Uitdaging",
      },
      {
        title: "Kleurenvracht",
        instruction:
          "De lesgever noemt een kleur. Neem onderweg alleen voorwerpen met die kleur mee op de mat.",
        level: "Actief",
      },
      {
        title: "Wissel van plaats",
        instruction:
          "Zet de mat halverwege zacht neer. Iedereen schuift één plaats door en samen dragen jullie verder.",
        level: "Rustig",
      },
      {
        title: "Mat wordt eiland",
        instruction:
          "Draag de mat tot het midden, leg ze neer, stap er met het hele team even op en draag daarna verder.",
        level: "Actief",
      },
      {
        title: "Tegen de zandloper",
        instruction:
          "Kan het team rustig aankomen voor de zandloper leeg is? Niet sneller lopen: samen blijven en niets verliezen is het doel.",
        level: "Actief",
      },
    ],
  },
  {
    id: "touwtrekken",
    title: "Touwtrekken",
    summary: "Trek, werk samen en ontdek hoe een team zijn kracht verdeelt.",
    category: "Samen spelen",
    emoji: "🪢",
    accent: "yellow",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "6–24 kinderen",
    material: ["Lang, stevig touw", "Middenlint", "3 markeringslijnen"],
    optionalMaterial: ["Partijvestjes", "Knuffel als mascotte"],
    setup:
      "Markeer het midden van het touw en leg dicht bij het midden twee winlijnen. Maak kleine, evenwichtige teams en laat de andere kinderen op veilige afstand wachten of dierenbewegingen doen.",
    tip:
      "Hou rondes kort en trek alleen onder direct toezicht. Wikkel het touw nooit rond handen of lichaam, zet geen kind als anker achteraan en oefen eerst: bij ‘stop’ blijft iedereen staan en legt het touw rustig neer.",
    assignments: [
      {
        title: "Klassiek touwtrekken",
        instruction:
          "Trek rustig tot het middenlint een winlijn raakt. Op het stopsignaal bevriest iedereen en leggen beide teams het touw samen neer.",
        level: "Actief",
      },
      {
        title: "Korte rondes",
        instruction:
          "Trek vijf tellen en stop samen, ook als niemand de lijn bereikt. Wissel daarna enkele kinderen van plaats.",
        level: "Actief",
      },
      {
        title: "Wissel van kant",
        instruction:
          "Speel één ronde, wissel daarna van kant en speel opnieuw met exact dezelfde teams.",
        level: "Rustig",
      },
      {
        title: "Vind het evenwicht",
        instruction:
          "De lesgever maakt de teams na elke korte ronde iets gelijker. Het doel is dat het lint bijna in het midden blijft.",
        level: "Rustig",
      },
      {
        title: "Trekken op het ritme",
        instruction:
          "De lesgever telt traag: drie tellen zacht trekken, één tel stilstaan. Beide teams proberen hetzelfde ritme te volgen.",
        level: "Uitdaging",
      },
      {
        title: "Stille ronde",
        instruction:
          "Trek zonder te praten. Kijk naar je teamgenoten en probeer allemaal op hetzelfde moment kracht te zetten.",
        level: "Uitdaging",
      },
      {
        title: "Vak voor vak",
        instruction:
          "Een team verdient al een punt wanneer het middenlint de eerste zijlijn raakt. Zet daarna alles weer in het midden.",
        level: "Rustig",
      },
      {
        title: "De mascotte kiest",
        instruction:
          "Leg een knuffel naast de middenlijn. Na elke ronde kiest het team dat het best samenwerkte welk dier iedereen even nadoet.",
        level: "Actief",
      },
      {
        title: "Begeleider tegen de groep",
        instruction:
          "Eén begeleider houdt gecontroleerd tegen terwijl een klein groepje samen trekt. De begeleider laat het touw nooit plots los.",
        level: "Actief",
      },
      {
        title: "Maak het eerlijk",
        instruction:
          "Verplaats na elke ronde één kind als dat helpt. Zoek twee teams die allebei stevig kunnen staan zonder hard te moeten trekken.",
        level: "Rustig",
      },
      {
        title: "Touwtrein",
        instruction:
          "Geen wedstrijd: iedereen houdt dezelfde kant van het touw vast en volgt samen een route door de zaal.",
        level: "Rustig",
      },
      {
        title: "Maak een touwgolf",
        instruction:
          "De twee rijen houden het touw losjes vast en maken samen kleine, daarna grote golven zonder te trekken.",
        level: "Rustig",
      },
    ],
  },
  {
    id: "parachute",
    title: "Spelen met de parachute",
    summary: "Laat de parachute golven, vliegen en dieren verstoppen.",
    category: "Samen spelen",
    emoji: "🪂",
    accent: "purple",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "6–24 kinderen",
    material: ["Speelparachute"],
    optionalMaterial: ["1–6 zachte balletjes", "Kersepitzakjes"],
    setup:
      "Spreid de parachute uit en verdeel de kinderen gelijkmatig rond de rand. Iedereen neemt met twee handen een handvat of stuk rand vast.",
    tip:
      "Spreek vaste signalen af voor omhoog, omlaag en loslaten. Kinderen lopen alleen onder de parachute wanneer jij dat roept en de doorgang vrij is.",
    assignments: [
      {
        title: "Bal in de lucht houden",
        instruction:
          "Leg één zachte bal op de parachute. Maak samen golven en probeer de bal zo lang mogelijk op het doek te houden.",
        level: "Rustig",
      },
      {
        title: "Popcorn",
        instruction:
          "Leg meerdere zachte balletjes op het doek. Laat ze stuiteren zonder dat er popcorn op de grond valt.",
        level: "Actief",
      },
      {
        title: "Katapult",
        instruction:
          "Breng de parachute eerst laag en trek daarna allemaal tegelijk snel omhoog. Hoe hoog vliegt het balletje?",
        level: "Actief",
      },
      {
        title: "Cijfers wisselen",
        instruction:
          "Geef elk cijfer aan meerdere kinderen en oefen de cijfers eerst. Roep één cijfer; die kinderen wisselen onder het hoge doek rustig van plaats.",
        level: "Uitdaging",
      },
      {
        title: "Kleuren wisselen",
        instruction:
          "Roep een kleur van de parachute. Iedereen die bij die kleur staat, wisselt onder het hoge doek van plaats.",
        level: "Actief",
      },
      {
        title: "Pinguïn in de sneeuw",
        instruction:
          "Ga op de grond zitten en trek de parachute rond je lichaam. Alleen je pinguïnhoofd blijft boven de sneeuw.",
        level: "Rustig",
      },
      {
        title: "Struisvogel in het zand",
        instruction:
          "Blijf buiten de parachute zitten en steek alleen je hoofd onder het doek alsof het zand is.",
        level: "Rustig",
      },
      {
        title: "Kikker onder water",
        instruction:
          "Wanneer de parachute hoog gaat, stapt iedereen op de eigen plaats onder het doek en hurkt als een kikker. Niemand loopt door het midden.",
        level: "Actief",
      },
      {
        title: "Dierenalarm",
        instruction:
          "De lesgever roept pinguïn, struisvogel of kikker. Voer onmiddellijk de juiste verstopbeweging uit.",
        level: "Uitdaging",
      },
      {
        title: "Rustige en wilde zee",
        instruction:
          "Maak eerst piepkleine golven. Op het signaal verandert de parachute in een wilde zee met grote golven.",
        level: "Actief",
      },
      {
        title: "De paddenstoel",
        instruction:
          "Hef de parachute allemaal tegelijk hoog en stap samen één pas naar binnen zodat een grote paddenstoel ontstaat.",
        level: "Rustig",
      },
      {
        title: "Kamperen in de tent",
        instruction:
          "Hef het doek hoog, stap naar binnen, trek de rand achter je naar de grond en ga samen in de tent zitten.",
        level: "Rustig",
      },
      {
        title: "Bal naar het midden",
        instruction:
          "Maak gerichte golven en probeer de bal naar het gat of een gemarkeerd middenpunt te sturen.",
        level: "Uitdaging",
      },
      {
        title: "Draaimolen",
        instruction:
          "Hou de parachute op heuphoogte en wandel allemaal in dezelfde richting. Wissel op het signaal rustig van richting.",
        level: "Rustig",
      },
    ],
  },
  {
    id: "ballenbak",
    title: "Ballenbak",
    summary: "Haal een bal, voer een opdracht uit en blijf rondjes bewegen.",
    category: "Gooien & vangen",
    emoji: "🏀",
    accent: "green",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "4–24 kinderen",
    material: ["3 turnbanken", "Veel zachte ballen in verschillende maten"],
    optionalMaterial: ["Kegels", "Hoepels", "Muziek"],
    setup:
      "Leg drie stabiele turnbanken op hun zij in een U-vorm en vul het midden met zachte ballen. Maak een vaste looprichting: pak een bal, doe de stationaire opdracht, gooi hem onderhands terug, loop één rondje en kies een nieuwe bal.",
    tip:
      "Maak een aparte plek om ballen te nemen en terug te gooien. Gebruik alleen zachte ballen, laat niemand op de banken klimmen en toon het volledige patroon eerst langzaam voor.",
    assignments: [
      {
        title: "Knuffelbal",
        instruction:
          "Knuffel de bal drie tellen stevig tegen je buik en gooi hem daarna onderhands terug.",
        level: "Rustig",
      },
      {
        title: "Reus en kabouter",
        instruction:
          "Hou de bal drie tellen hoog boven je hoofd en daarna drie tellen laag bij je tenen.",
        level: "Rustig",
      },
      {
        title: "Bots en pak",
        instruction:
          "Laat de bal één keer botsen en pak hem met twee handen vast. Probeer het drie keer.",
        level: "Actief",
      },
      {
        title: "Kleine luchtballon",
        instruction:
          "Gooi de bal een klein stukje omhoog en vang hem met twee handen of pak hem na de bots.",
        level: "Uitdaging",
      },
      {
        title: "Rond je buik",
        instruction:
          "Geef de bal drie keer van hand naar hand rond je buik zonder je voeten te verplaatsen.",
        level: "Uitdaging",
      },
      {
        title: "Tik je lichaam",
        instruction:
          "Tik met de bal je hoofd, buik, knieën en voeten aan. De lesgever noemt de volgorde.",
        level: "Rustig",
      },
      {
        title: "Bal tussen de knieën",
        instruction:
          "Klem de bal tussen je knieën en maak drie kleine sprongen op dezelfde plaats.",
        level: "Actief",
      },
      {
        title: "Zit en sta",
        instruction:
          "Hou de bal met twee handen vast, ga op je poep zitten en sta weer recht.",
        level: "Actief",
      },
      {
        title: "Draai als een tol",
        instruction:
          "Hou de bal voor je buik, draai één rustig rondje en blijf daarna stevig stilstaan.",
        level: "Rustig",
      },
      {
        title: "Rol rond je voeten",
        instruction:
          "Zet je voeten stil en rol de bal met twee handen één rondje rond je schoenen.",
        level: "Uitdaging",
      },
      {
        title: "Kleur of formaat",
        instruction:
          "Zoek een bal met de kleur of het formaat dat de lesgever noemt. Toon hem hoog aan de groep.",
        level: "Actief",
      },
      {
        title: "Eigen baltruc",
        instruction:
          "Bedenk één beweging die je op dezelfde plaats met de bal kunt doen. De groep probeert ze na.",
        level: "Uitdaging",
      },
    ],
  },
  {
    id: "dierentimer",
    kind: "animal-timer",
    title: "Dierentimer",
    summary: "Meet een loopje en ontdek welk dier even snel beweegt.",
    category: "Lopen & bewegen",
    emoji: "⏱️",
    accent: "purple",
    duration: "± 10 min",
    ages: "3–6 jaar",
    groupSize: "2–24 kinderen",
    material: ["2 markeringspotjes"],
    optionalMaterial: ["Meetlint"],
    setup:
      "Markeer een korte, rechte loopafstand met twee potjes en kies die afstand in de timer. Voorzie naast de loopbaan een vrije terugweg.",
    tip:
      "Laat één kind lopen terwijl de volgende klaarstaat. Vergelijk met dieren, niet met andere kinderen: elk resultaat is een leuke ontdekking.",
    assignments: [],
  },
];
