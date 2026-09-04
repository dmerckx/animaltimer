"use client";

import { getMaterialIcon } from "@/app/materials";
import { PlanToggleButton } from "@/app/PlanToggleButton";
import { useDayPlan } from "@/app/useDayPlan";
import { useSessionStorageValue } from "@/app/useSessionStorage";
import { parcours, type ParcoursStation } from "@/data/parcours";
import { useEffect, useRef } from "react";

const storageKeys = {
  station: "multimove:parcours:station",
  variations: "multimove:parcours:variations",
};

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
  const { isPlanned, toggleItem } = useDayPlan();
  const [selectedStationId, setSelectedStationId] = useSessionStorageValue(
    storageKeys.station,
  );
  const [storedVariationIndexes, setStoredVariationIndexes] =
    useSessionStorageValue(storageKeys.variations);
  const variationIndexes = getVariationIndexes(storedVariationIndexes);

  const openStation = (station: ParcoursStation) => {
    setSelectedStationId(station.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeStation = () => {
    setSelectedStationId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectVariation = (stationIndex: number, variationIndex: number) => {
    const next = variationIndexes.map((selected, index) =>
      index === stationIndex ? variationIndex : selected,
    );
    setStoredVariationIndexes(JSON.stringify(next));
  };

  const selectedStationIndex = parcours.stations.findIndex(
    (station) => station.id === selectedStationId,
  );

  if (selectedStationIndex >= 0) {
    const station = parcours.stations[selectedStationIndex];
    return (
      <StationDetail
        key={station.id}
        station={station}
        variationIndex={variationIndexes[selectedStationIndex]}
        onBack={closeStation}
        planned={isPlanned("station", station.id)}
        onTogglePlan={() => toggleItem("station", station.id)}
        onSelect={(variationIndex) =>
          selectVariation(selectedStationIndex, variationIndex)
        }
      />
    );
  }

  return (
    <StationOverview
      onOpenStation={openStation}
      isPlanned={(id) => isPlanned("station", id)}
      onTogglePlan={(id) => toggleItem("station", id)}
    />
  );
}

function getVariationIndexes(storedIndexes: string | null) {
  try {
    const parsedIndexes = JSON.parse(storedIndexes ?? "[]");
    return parcours.stations.map((station, index) => {
      const parsedIndex = Number(
        Array.isArray(parsedIndexes) ? parsedIndexes[index] : 0,
      );
      return Number.isInteger(parsedIndex) &&
        parsedIndex >= 0 &&
        parsedIndex < station.variations.length
        ? parsedIndex
        : 0;
    });
  } catch {
    return parcours.stations.map(() => 0);
  }
}

function StationOverview({
  onOpenStation,
  isPlanned,
  onTogglePlan,
}: {
  onOpenStation: (station: ParcoursStation) => void;
  isPlanned: (id: string) => boolean;
  onTogglePlan: (id: string) => void;
}) {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-3 pb-8 pt-3 sm:px-6 lg:px-10 lg:pt-8">
      <h1 className="sr-only">Parcoursstations</h1>
      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {parcours.stations.map((station) => (
          <StationOverviewCard
            key={station.id}
            station={station}
            onOpen={() => onOpenStation(station)}
            planned={isPlanned(station.id)}
            onTogglePlan={() => onTogglePlan(station.id)}
          />
        ))}
      </div>
    </main>
  );
}

function StationOverviewCard({
  station,
  onOpen,
  planned,
  onTogglePlan,
}: {
  station: ParcoursStation;
  onOpen: () => void;
  planned: boolean;
  onTogglePlan: () => void;
}) {
  const colors = accentClasses[station.accent];

  return (
    <article
      className={`relative overflow-hidden rounded-[20px] border bg-white shadow-[0_5px_18px_rgba(43,52,47,0.035)] transition hover:shadow-[0_10px_28px_rgba(43,52,47,0.08)] ${
        planned ? "border-[#a9cbb3] ring-1 ring-[#d5e8da]" : "border-[#dedbd3]"
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group w-full p-4 text-left focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-[#568fc4]"
      >
        <span className="flex items-start gap-3 pr-11">
          <span
            className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm ${colors.icon}`}
            aria-hidden="true"
          >
            {station.emoji}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-black tracking-[-0.025em] text-[#1e2d25]">
              {station.name}
            </span>
          </span>
        </span>
        <span className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-[#ebe8e1] pt-3">
          {station.material.map((material) => (
            <span
              key={material}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#f2f4f0] px-2 py-1 text-[10px] font-bold text-[#5f6b63]"
            >
              <span className="text-sm" aria-hidden="true">
                {getMaterialIcon(material)}
              </span>
              {material}
            </span>
          ))}
          <span className="ml-auto whitespace-nowrap text-[10px] font-black text-[#929892]">
            {station.variations.length} uitvoeringen
          </span>
        </span>
      </button>
      <div className="absolute right-3 top-3 z-10">
        <PlanToggleButton
          selected={planned}
          label={station.name}
          onToggle={onTogglePlan}
        />
      </div>
    </article>
  );
}

function StationDetail({
  station,
  variationIndex,
  onBack,
  onSelect,
  planned,
  onTogglePlan,
}: {
  station: ParcoursStation;
  variationIndex: number;
  onBack: () => void;
  onSelect: (variationIndex: number) => void;
  planned: boolean;
  onTogglePlan: () => void;
}) {
  const colors = accentClasses[station.accent];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToVariation = (
    index: number,
    behavior: ScrollBehavior = "smooth",
  ) => {
    const scroller = scrollerRef.current;
    const card = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !card) return;
    scroller.scrollTo({ left: card.offsetLeft, behavior });
    onSelect(index);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      scrollToVariation(variationIndex, "auto"),
    );
    return () => cancelAnimationFrame(frame);
    // Only restore the saved position when opening this station.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    },
    [],
  );

  const rememberVisibleVariation = () => {
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const cards = Array.from(scroller.children) as HTMLElement[];
      const nearestIndex = cards.reduce(
        (nearest, card, index) =>
          Math.abs(card.offsetLeft - scroller.scrollLeft) <
          Math.abs(cards[nearest].offsetLeft - scroller.scrollLeft)
            ? index
            : nearest,
        0,
      );
      onSelect(nearestIndex);
    }, 100);
  };

  const previousIndex =
    variationIndex === 0 ? station.variations.length - 1 : variationIndex - 1;
  const nextIndex = (variationIndex + 1) % station.variations.length;

  return (
    <div className="mx-auto w-full max-w-[900px] px-3 pb-20 pt-3 sm:px-6 lg:px-10 lg:pt-8">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-extrabold text-[#58655d] transition hover:bg-white hover:text-[#203028]"
        >
          <span className="text-lg">←</span>
          Alle stations
        </button>
        <PlanToggleButton
          selected={planned}
          label={station.name}
          onToggle={onTogglePlan}
          showText
        />
      </div>

      <header className="mt-3 flex items-start gap-3 rounded-[22px] border border-[#dedbd3] bg-white p-4 shadow-[0_6px_22px_rgba(43,52,47,0.04)]">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm ${colors.icon}`}
          aria-hidden="true"
        >
          {station.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-black tracking-[-0.035em] text-[#1e2d25]">
            {station.name}
          </h1>
          <p className="mt-1 text-xs leading-5 text-[#747d76]">
            {station.material.join(" · ")}
          </p>
        </div>
      </header>

      <details className="group mt-3 rounded-2xl border border-[#dedbd3] bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-xs font-black text-[#57635b] marker:hidden">
          <span>▦ Opstelling &amp; veiligheid</span>
          <span className="text-base transition group-open:rotate-180" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="grid gap-2 border-t border-[#e6e3dc] p-3 text-sm leading-6 text-[#657068] sm:grid-cols-2">
          <div className="rounded-xl bg-[#f7f6f2] p-3">
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#929892]">
              Klaarzetten
            </p>
            {station.preparation}
          </div>
          <div className="rounded-xl bg-[#fff8e8] p-3 text-[#716139]">
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#9c853f]">
              Veiligheid
            </p>
            {station.safety}
          </div>
        </div>
      </details>

      <section className="mt-5" aria-label={`Uitvoeringen voor ${station.name}`}>
        <div className="mb-3 flex items-end justify-between gap-3 px-1">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#929892]">
              Uitvoering
            </p>
            <h2 className="mt-1 text-lg font-black text-[#28372f]">
              Veeg of blader verder
            </h2>
          </div>
          <span className="text-xs font-black text-[#858d86]">
            {variationIndex + 1} / {station.variations.length}
          </span>
        </div>

        <div
          ref={scrollerRef}
          onScroll={rememberVisibleVariation}
          className="no-scrollbar relative flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-[24px]"
          aria-live="polite"
        >
          {station.variations.map((variation) => (
            <article
              key={variation.title}
              className={`relative min-h-72 w-full min-w-full snap-center overflow-hidden rounded-[24px] p-6 ${colors.panel}`}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[28px] border-white/35" />
              <div className="relative flex min-h-60 flex-col">
                <span
                  className={`self-start rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] ${colors.badge}`}
                >
                  {variation.level}
                </span>
                <h3 className="mt-6 text-3xl font-black tracking-[-0.04em] text-[#1b2c22]">
                  {variation.title}
                </h3>
                <p className="mt-4 text-lg font-medium leading-8 text-[#46534b]">
                  {variation.instruction}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollToVariation(previousIndex)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#d8d5cd] bg-white text-lg font-black text-[#435048]"
            aria-label="Vorige uitvoering"
          >
            ←
          </button>
          <div className="flex flex-1 justify-center gap-1.5">
            {station.variations.map((variation, index) => (
              <button
                type="button"
                key={variation.title}
                onClick={() => scrollToVariation(index)}
                className={`h-2.5 shrink-0 rounded-full transition-all ${
                  index === variationIndex
                    ? `w-8 ${colors.strong}`
                    : "w-2.5 bg-[#d6d5cf]"
                }`}
                aria-label={`Ga naar ${variation.title}`}
                aria-current={index === variationIndex ? "step" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollToVariation(nextIndex)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#20342a] text-lg font-black text-white"
            aria-label="Volgende uitvoering"
          >
            →
          </button>
        </div>
      </section>
    </div>
  );
}
