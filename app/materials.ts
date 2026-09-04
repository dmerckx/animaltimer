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
