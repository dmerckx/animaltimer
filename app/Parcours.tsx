"use client";

import { parcours, type ParcoursStation } from "@/data/parcours";
import { useState } from "react";

const accentClasses: Record<
  ParcoursStation["accent"],
  { panel: string; icon: string; strong: string; badge: string }
> = {
  coral: {
    panel: "bg-[#fff1ec]",
    icon: "bg-[#ff8d72]",
    strong: "bg-[#df674e]",
    badge: "bg-[#ffe4dc] text-[#91402f]",
  },
  blue: {
    panel: "bg-[#edf6ff]",
    icon: "bg-[#83bdf0]",
    strong: "bg-[#568fc4]",
    badge: "bg-[#deefff] text-[#2c608d]",
  },
  yellow: {
    panel: "bg-[#fff7dd]",
    icon: "bg-[#f4c64d]",
    strong: "bg-[#d8a925]",
    badge: "bg-[#ffefba] text-[#765b12]",
  },
  green: {
    panel: "bg-[#edf8ed]",
    icon: "bg-[#84c681]",
    strong: "bg-[#5f9d5d]",
    badge: "bg-[#dff1de] text-[#376c35]",
  },
  purple: {
    panel: "bg-[#f3efff]",
    icon: "bg-[#ac8ee5]",
    strong: "bg-[#8064bb]",
    badge: "bg-[#e9e0ff] text-[#5b4090]",
  },
};

export function ParcoursPage() {
  const [variationIndexes, setVariationIndexes] = useState(() =>
    parcours.stations.map(() => 0),
  );
  const [round, setRound] = useState(1);

  const chooseNewRound = () => {
    setVariationIndexes((current) =>
      current.map((selected, stationIndex) => {
        const variationCount = parcours.stations[stationIndex].variations.length;
        const offset = Math.floor(Math.random() * (variationCount - 1)) + 1;
        return (selected + offset) % variationCount;
      }),
    );
    setRound((current) => current + 1);
  };

  const setVariation = (stationIndex: number, variationIndex: number) => {
    setVariationIndexes((current) =>
      current.map((selected, index) =>
        index === stationIndex ? variationIndex : selected,
      ),
    );
  };

  const scrollToStation = (station: ParcoursStation) => {
    document
      .getElementById(`station-${station.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 pt-7 sm:px-8 lg:px-10 lg:pt-10">
      <header className="flex flex-col gap-5 border-b border-[#dedbd3] pb-8 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#547aa4]">
              Vooraf klaarzetten
            </p>
            <span className="rounded-full bg-[#e7f2fc] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#426b94]">
              Parcours
            </span>
          </div>
          <h1 className="text-balance text-4xl font-black tracking-[-0.045em] text-[#18251f] sm:text-5xl">
            {parcours.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#68736c]">
            {parcours.summary}
          </p>
        </div>

        <button
          type="button"
          onClick={chooseNewRound}
          className="group flex h-14 shrink-0 items-center justify-center gap-3 rounded-2xl bg-[#203a2d] px-5 text-sm font-black text-white shadow-[0_10px_25px_rgba(32,58,45,0.18)] transition hover:-translate-y-0.5 hover:bg-[#2c4c3b]"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/12 text-lg transition group-hover:rotate-90"
            aria-hidden="true"
          >
            ↻
          </span>
          Kies een nieuwe ronde
        </button>
      </header>

      <section className="mt-7 rounded-[26px] border border-[#dedbd3] bg-white p-5 shadow-[0_10px_35px_rgba(40,48,43,0.045)] sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#929892]">
              Overzicht
            </p>
            <h2 className="mt-1 text-xl font-black tracking-[-0.02em] text-[#26362d]">
              Volgorde van de stations
            </h2>
          </div>
          <p className="text-xs font-semibold text-[#8a918b]">
            Tik op een station om naar de uitwerkingen te springen
          </p>
        </div>

        <ol className="no-scrollbar -mx-5 mt-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:-mx-1 sm:px-1">
          {parcours.stations.map((station, index) => {
            const colors = accentClasses[station.accent];
            return (
              <li key={station.id} className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToStation(station)}
                  className="group w-34 snap-start rounded-2xl border border-[#e1ded7] bg-[#faf9f5] p-3 text-left transition hover:-translate-y-0.5 hover:border-[#c8c5bd] hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${colors.icon}`}
                      aria-hidden="true"
                    >
                      {station.emoji}
                    </span>
                    <span className="font-mono text-[10px] font-black text-[#a0a49f]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <span className="mt-3 block text-sm font-black text-[#2b3a32]">
                    {station.name}
                  </span>
                  <span className="mt-1 block text-[10px] font-bold text-[#8b918c]">
                    {station.variations.length} uitvoeringen
                  </span>
                </button>
                {index < parcours.stations.length - 1 && (
                  <span className="text-lg font-black text-[#bbbcb7]" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <QuickInfo
          icon="▦"
          label="Opstelling"
          value={`${parcours.stations.length} vaste stations`}
        />
        <QuickInfo icon="⌛" label="Voorbereiding" value={parcours.setupTime} />
        <QuickInfo icon="☺" label="Leeftijd" value={parcours.ages} />
        <QuickInfo icon="♟" label="Groep" value={parcours.groupSize} />
      </section>

      <section className="mt-5 rounded-2xl border border-[#eadcb7] bg-[#fff9e7] px-5 py-4 text-sm leading-6 text-[#685c35]">
        <div className="flex items-start gap-3">
          <span className="text-xl" aria-hidden="true">
            💡
          </span>
          <p>
            <strong className="text-[#4d421e]">Zo gebruik je dit parcours:</strong>{" "}
            de opstelling blijft tijdens de les staan. Na elke volledige ronde
            kies je per station een andere uitvoering, of gebruik je de knop
            bovenaan om alles tegelijk te variëren.
          </p>
        </div>
      </section>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#929892]">
            Huidige selectie
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#223229]">
            Uitvoering voor ronde {round}
          </h2>
        </div>
        <p className="text-sm font-semibold text-[#788079]">
          {parcours.stations.reduce(
            (total, station) => total + station.variations.length,
            0,
          )}{" "}
          variaties om te combineren
        </p>
      </div>

      <div className="mt-5 grid items-start gap-5 xl:grid-cols-2">
        {parcours.stations.map((station, stationIndex) => (
          <StationCard
            key={station.id}
            station={station}
            stationIndex={stationIndex}
            variationIndex={variationIndexes[stationIndex]}
            onSelect={(variationIndex) =>
              setVariation(stationIndex, variationIndex)
            }
          />
        ))}
      </div>

      <section className="mt-6 rounded-[24px] bg-[#203a2d] p-6 text-white sm:p-7">
        <div className="grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.17em] text-[#b8cebf]">
              Laatste controle
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.03em]">
              Veilig starten
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#c8d7cd]">
              Loop het parcours zelf één keer af voordat de kinderen beginnen.
            </p>
          </div>
          <ul className="grid gap-2 text-sm font-semibold text-[#edf4ef] sm:grid-cols-2">
            {[
              "Alles staat stabiel",
              "Matten liggen op hun plaats",
              "Eén vaste looprichting",
              "Voldoende afstand tussen kinderen",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/12 text-[10px]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function StationCard({
  station,
  stationIndex,
  variationIndex,
  onSelect,
}: {
  station: ParcoursStation;
  stationIndex: number;
  variationIndex: number;
  onSelect: (variationIndex: number) => void;
}) {
  const colors = accentClasses[station.accent];
  const variation = station.variations[variationIndex];
  const previous = () =>
    onSelect(
      variationIndex === 0 ? station.variations.length - 1 : variationIndex - 1,
    );
  const next = () => onSelect((variationIndex + 1) % station.variations.length);

  return (
    <article
      id={`station-${station.id}`}
      className="scroll-mt-24 overflow-hidden rounded-[26px] border border-[#dedbd3] bg-white shadow-[0_10px_35px_rgba(40,48,43,0.05)]"
    >
      <header className="flex items-start gap-4 border-b border-[#e7e4dd] p-5 sm:p-6">
        <span
          className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm ${colors.icon}`}
          aria-hidden="true"
        >
          {station.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#969b96]">
            Station {stationIndex + 1}
          </p>
          <h3 className="mt-1 text-xl font-black tracking-[-0.025em] text-[#24342b]">
            {station.name}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {station.material.map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#f1efe9] px-2.5 py-1 text-[10px] font-bold text-[#687169]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <span className="font-mono text-xs font-black text-[#a0a49f]">
          {String(stationIndex + 1).padStart(2, "0")}
        </span>
      </header>

      <details className="group mx-5 mt-4 rounded-xl border border-[#e1ded7] bg-[#f8f7f3] sm:mx-6">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-xs font-black text-[#57635b] marker:hidden">
          <span className="flex items-center gap-2">
            <span aria-hidden="true">▦</span> Opstelling &amp; veiligheid
          </span>
          <span
            className="text-base text-[#8a918b] transition group-open:rotate-180"
            aria-hidden="true"
          >
            ⌄
          </span>
        </summary>
        <div className="grid gap-3 border-t border-[#e1ded7] p-3 text-sm leading-6 text-[#657068] sm:grid-cols-2">
          <div className="rounded-xl bg-white p-3.5">
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#929892]">
              Klaarzetten
            </p>
            <p>{station.preparation}</p>
          </div>
          <div className="rounded-xl bg-[#fff8e8] p-3.5 text-[#716139]">
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#9c853f]">
              Veiligheid
            </p>
            <p>{station.safety}</p>
          </div>
        </div>
      </details>

      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#818982]">
            Gekozen uitvoering
          </p>
          <span className="text-xs font-bold text-[#929892]">
            {variationIndex + 1} / {station.variations.length}
          </span>
        </div>

        <div
          className={`relative min-h-50 overflow-hidden rounded-[20px] p-5 ${colors.panel}`}
          aria-live="polite"
        >
          <div className="absolute -right-9 -top-9 h-28 w-28 rounded-full border-[20px] border-white/35" />
          <div className="relative">
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] ${colors.badge}`}
            >
              {variation.level}
            </span>
            <h4 className="mt-4 text-2xl font-black tracking-[-0.035em] text-[#213128]">
              {variation.title}
            </h4>
            <p className="mt-2 text-[15px] font-medium leading-6 text-[#4f5b53]">
              {variation.instruction}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={previous}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d9d6ce] bg-white text-lg font-black text-[#546159] transition hover:bg-[#f4f2ed]"
            aria-label={`Vorige uitvoering voor ${station.name}`}
          >
            ←
          </button>
          <div className="flex flex-1 justify-center gap-1.5">
            {station.variations.map((item, index) => (
              <button
                type="button"
                key={item.title}
                onClick={() => onSelect(index)}
                className={`h-2.5 rounded-full transition-all ${
                  variationIndex === index
                    ? `w-7 ${colors.strong}`
                    : "w-2.5 bg-[#d9d8d2] hover:bg-[#bdbdb7]"
                }`}
                aria-label={`Kies ${item.title} voor ${station.name}`}
                aria-current={variationIndex === index ? "step" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#203a2d] text-lg font-black text-white transition hover:bg-[#2d4d3c]"
            aria-label={`Volgende uitvoering voor ${station.name}`}
          >
            →
          </button>
        </div>
      </div>
    </article>
  );
}

function QuickInfo({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-2xl border border-[#dedbd3] bg-white p-3 shadow-[0_7px_22px_rgba(40,48,43,0.035)] sm:gap-3 sm:p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef4f8] text-base text-[#57738b] sm:h-10 sm:w-10 sm:text-lg">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[#969b96]">
          {label}
        </p>
        <p className="mt-1 text-xs font-black leading-5 text-[#2e3d35] sm:text-sm">
          {value}
        </p>
      </div>
    </div>
  );
}
