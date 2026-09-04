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
    ages: "3–8 jaar",
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
    ages: "4–8 jaar",
    groupSize: "6–20 kinderen",
    material: ["10 kegels", "Bank", "Zachte ballen"],
    setup:
      "Zet de kegels verspreid op een bank. Maak twee teams en teken een veilige werplijn. Ballen mogen steeds gerecupereerd worden.",
    tip:
      "Gebruik alleen zachte ballen en laat kinderen rond de bank lopen, nooit ervoor terwijl er gegooid wordt.",
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
        title: "Bouwers tegen gooiers",
        instruction:
          "Eén klein team zet omgevallen kegels recht, het andere gooit. Wissel na één minuut.",
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
    ages: "3–8 jaar",
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
    ages: "3–7 jaar",
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
    ages: "3–9 jaar",
    groupSize: "4–24 kinderen",
    material: [],
    optionalMaterial: ["2 matten", "Kegels"],
    setup:
      "Gebruik twee lijnen of matten als start en finish. Laat voldoende ruimte tussen de kinderen en stuur in kleine golven.",
    tip:
      "Kies vijf tot acht opdrachten per les. Herhaal favorieten op een andere snelheid of in de omgekeerde richting.",
    assignments: [
      {
        title: "Op je tippen",
        instruction: "Wandel zo hoog en stil mogelijk op je tenen.",
        level: "Rustig",
      },
      {
        title: "Hinkelen",
        instruction:
          "Hinkel op één been tot halverwege en wissel daar van been.",
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
          "Beweeg zijwaarts en kruis afwisselend één voet voor en achter de andere.",
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
    ages: "4–9 jaar",
    groupSize: "8–24 kinderen",
    material: ["2 matten"],
    setup:
      "Leg aan elk uiteinde van de zaal een mat. Eén schipper staat in het midden. Wie de opdracht volgt, mag vrij over; de anderen kunnen getikt worden.",
    tip:
      "Laat getikte kinderen mee schipper worden, maar spreek af dat aantikken zacht op de schouder gebeurt.",
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
    ages: "4–9 jaar",
    groupSize: "4–16 kinderen",
    material: ["Markeringspotjes"],
    optionalMaterial: ["Meetlint", "Matten"],
    setup:
      "Laat elk kind even op de grond liggen en markeer met twee potjes de lichaamslengte. Maak verschillende veilige springbanen naast elkaar.",
    tip:
      "Vergelijk kinderen niet met elkaar. De uitdaging is telkens de eigen afstand op een veilige manier te halen.",
    assignments: [
      {
        title: "Spring uit stand",
        instruction:
          "Zet je voeten naast elkaar, zwaai je armen en probeer voorbij je eigen lengte te landen.",
        level: "Rustig",
      },
      {
        title: "Met aanloop",
        instruction:
          "Neem een korte aanloop, zet met één voet af en land met twee voeten voorbij de potjes.",
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
        title: "Achterwaartse mini-sprongen",
        instruction:
          "Maak kleine sprongen achteruit tussen de potjes. Kijk eerst of je baan vrij is.",
        level: "Uitdaging",
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
    ages: "3–8 jaar",
    groupSize: "4–16 kinderen",
    material: ["Dikke matten"],
    optionalMaterial: ["Schuine bank", "Kersepitzakje"],
    setup:
      "Leg matten in één of meer banen. Kinderen starten pas wanneer de vorige van de mat is. Help actief bij nieuwe rolbewegingen.",
    tip:
      "Begin met eenvoudige lengte- en zijrollen. Een koprol vraagt een ronde rug en kin op de borst; bied ondersteuning waar nodig.",
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
          "Hurkt neer, zet één hand op de mat en tuimel zacht over je zij.",
        level: "Rustig",
      },
      {
        title: "Koprol",
        instruction:
          "Zet je handen neer, kin op de borst, billen omhoog en rol over je ronde rug.",
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
    ages: "3–9 jaar",
    groupSize: "4–18 kinderen",
    material: ["Turnbanken", "Matten"],
    setup:
      "Zet banken stevig en leg matten aan risicopunten. Werk in één richting en laat pas starten wanneer er ruimte is.",
    tip:
      "Maak meerdere niveaus: naast de bank voor beginners, op de bank voor wie meer uitdaging wil.",
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
          "Wandel traag achteruit met een begeleider naast de bank.",
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
    title: "Vijf passen",
    summary: "Samen vrijlopen, passen en onderscheppen in twee teams.",
    category: "Samen spelen",
    emoji: "🤝",
    accent: "green",
    duration: "± 10 min",
    ages: "6–10 jaar",
    groupSize: "8–20 kinderen",
    material: ["1 zachte bal", "Partijvestjes"],
    setup:
      "Maak twee teams, liefst met een begeleider in elk team. Vijf opeenvolgende passen is één punt. Met de bal in de hand mag je niet lopen.",
    tip:
      "Begeleiders onderscheppen niet en spelen bewust naar kinderen die nog weinig aan de bal kwamen.",
    assignments: [
      {
        title: "Drie passen",
        instruction:
          "Start eenvoudig: drie geslaagde passen zonder onderschepping is één punt.",
        level: "Rustig",
      },
      {
        title: "Vijf passen",
        instruction:
          "Maak vijf opeenvolgende passen voor een punt. De teller start opnieuw na balverlies.",
        level: "Actief",
      },
      {
        title: "Iedereen aan de bal",
        instruction:
          "Een punt telt alleen als ieder kind van het team minstens één pas kreeg.",
        level: "Uitdaging",
      },
      {
        title: "Botspas telt dubbel",
        instruction:
          "Een goede botspas is twee passen waard. Roep samen de nieuwe tussenstand.",
        level: "Actief",
      },
      {
        title: "Geen terugpas",
        instruction:
          "Je mag de bal niet meteen terugspelen naar het kind van wie je hem kreeg.",
        level: "Uitdaging",
      },
      {
        title: "Eindzone",
        instruction:
          "Na drie passen mag je scoren door naar een medespeler in de eindzone te passen.",
        level: "Uitdaging",
      },
      {
        title: "Twee ballen",
        instruction:
          "Breng een tweede zachte bal in het spel. Kijk extra goed rond voor je past.",
        level: "Uitdaging",
      },
      {
        title: "Stille ronde",
        instruction:
          "Speel zonder te praten. Gebruik kijken, wijzen en vrijlopen om elkaar te vinden.",
        level: "Rustig",
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
    ages: "4–9 jaar",
    groupSize: "4–24 kinderen",
    material: ["1 bal per duo", "1 mat per duo"],
    setup:
      "Maak duo’s. Elk duo zit of staat aan een andere korte zijde van een mat, zodat de afstand meteen duidelijk is.",
    tip:
      "Geef elk duo een bal die bij hun niveau past. Een grotere, zachte bal is makkelijker om te vangen.",
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
        title: "Draai voor je vangt",
        instruction:
          "Je partner roept ‘ja’. Draai je om en vang de bal die daarna rustig wordt gegooid.",
        level: "Uitdaging",
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
        title: "Tien zonder vallen",
        instruction:
          "Tel samen hoeveel passen lukken zonder dat de bal valt. Probeer jullie record te verbeteren.",
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
    ages: "4–9 jaar",
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
    ages: "5–10 jaar",
    groupSize: "2–16 kinderen",
    material: ["1 zachte bal per kind of duo", "Vrije muur"],
    setup:
      "Geef elk kind een eigen stuk muur en zet een werplijn op veilige afstand. Controleer dat niemand door een andere werpzone loopt.",
    tip:
      "Begin dicht bij de muur. Wie controle heeft, zet na drie goede vangballen een kleine stap achteruit.",
    assignments: [
      {
        title: "Gooi en vang",
        instruction:
          "Gooi met twee handen tegen de muur en vang de bal rechtstreeks terug.",
        level: "Rustig",
      },
      {
        title: "Eén bots",
        instruction:
          "Laat de terugkomende bal één keer op de grond botsen voor je hem vangt.",
        level: "Rustig",
      },
      {
        title: "Klappen",
        instruction:
          "Klap één keer nadat je gooit en vang de bal daarna met twee handen.",
        level: "Uitdaging",
      },
      {
        title: "Raak de stip",
        instruction:
          "Kies een denkbeeldige stip op de muur en probeer die vijf keer te raken.",
        level: "Rustig",
      },
      {
        title: "Gooi en zit",
        instruction:
          "Gooi hoog, ga snel op je poep zitten en vang na één bots.",
        level: "Uitdaging",
      },
      {
        title: "Draai rond",
        instruction:
          "Gooi de bal hoog tegen de muur, draai één rondje en probeer hem na een bots te vangen.",
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
    ages: "4–10 jaar",
    groupSize: "5–20 kinderen",
    material: ["Zachte ballen", "Goal", "Kegels", "Mat"],
    optionalMaterial: ["Hoepels", "Bank"],
    setup:
      "Maak vóór het doel een korte bewegingslus zodat niemand stilstaat. Eén begeleider of kind is keeper; de anderen gooien om beurten vanaf de lijn.",
    tip:
      "Wissel de keeper vaak en maak scoren niet het enige succes: gericht gooien of de juiste techniek uitvoeren telt ook.",
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
          "Een begeleider geeft een botspas. Vang, draai naar het doel en gooi in één vloeiende beweging.",
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
];
