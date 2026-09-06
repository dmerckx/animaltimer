export type MaterialNeed = {
  name: string;
  sources: string[];
};

function getMaterialName(material: string): string {
  const value = material.trim().toLocaleLowerCase("nl-BE");

  // Keep alternatives and special equipment distinct from their generic versions.
  if (/\bof\b/.test(value.replace(/per kind of duo$/, "")) && !/^1 lange of 2 korte matten$/.test(value)) {
    return material.trim();
  }
  if (/\b(kegels?|kegeltjes?|markeringspotjes?|markeringslijnen?)\b/.test(value)) return "Kegeltjes";
  if (/\bkersepitzakjes?\b/.test(value)) return "Kersepitzakjes";
  if (/\bknuffels?\b/.test(value)) return "Knuffels";
  if (/\bmat(ten)?\b/.test(value) && !value.includes("dikke")) return "Matten";
  if (/\b(turn)?bank(en)?\b/.test(value) && !value.includes("schuine")) return "Turnbanken";
  if (/\bhoepels?\b/.test(value)) return "Hoepels";
  if (/\bzachte (bal|ballen|balletjes?)\b/.test(value) && !value.includes("grote")) return "Zachte ballen";
  if (/^(\d+ )?bal( per (kind|duo))?$/.test(value)) return "Ballen";
  return material.trim();
}

export function collectMaterials(items: {
  title: string;
  material: string[];
  optionalMaterial: string[];
}[]) {
  const necessary = new Map<string, MaterialNeed>();
  const optional = new Map<string, MaterialNeed>();

  const addMaterial = (collection: Map<string, MaterialNeed>, material: string, source: string) => {
    const name = getMaterialName(material);
    const key = name.toLocaleLowerCase("nl-BE");
    const current = collection.get(key);
    if (current) {
      if (!current.sources.includes(source)) current.sources.push(source);
    } else {
      collection.set(key, { name, sources: [source] });
    }
  };

  for (const item of items) {
    for (const material of item.material) addMaterial(necessary, material, item.title);
    for (const material of item.optionalMaterial) addMaterial(optional, material, item.title);
  }

  // Material already needed for an exercise does not need a second optional row.
  for (const [key, need] of optional) {
    if (!necessary.has(key)) continue;
    for (const source of need.sources) addMaterial(necessary, need.name, source);
    optional.delete(key);
  }

  return { necessary: [...necessary.values()], optional: [...optional.values()] };
}

export function getMaterialIcon(material: string) {
  const value = material.toLocaleLowerCase("nl-BE");

  if (value.includes("parachute")) return "🪂";
  if (value.includes("touw")) return "🪢";
  if (value.includes("hoepel")) return "⭕";
  if (value.includes("kegel") || value.includes("marker")) return "🔶";
  if (value.includes("kersepit")) return "🫘";
  if (value.includes("bal")) return "⚽";
  if (value.includes("bank")) return "➖";
  if (value.includes("mat")) return "▰";
  if (value.includes("plint")) return "▤";
  if (value.includes("ladder")) return "🪜";
  if (value.includes("goal") || value.includes("doel")) return "🥅";
  if (value.includes("wand")) return "🟦";
  if (value.includes("muur")) return "🧱";
  if (value.includes("meetlint")) return "📏";
  if (value.includes("vest")) return "🦺";
  if (value.includes("knuffel")) return "🧸";
  return "🎒";
}
