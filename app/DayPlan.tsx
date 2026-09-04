"use client";

import { getMaterialIcon } from "@/app/materials";
import { PlanToggleButton } from "@/app/PlanToggleButton";
import {
  encodeDayPlan,
  useDayPlan,
  type DayPlanItem,
} from "@/app/useDayPlan";
import { exercises, type Exercise } from "@/data/exercises";
import { parcours, type ParcoursStation } from "@/data/parcours";
import { useState } from "react";

type DayPlanProps = {
  onOpenExercise: (exercise: Exercise) => void;
  onOpenStation: (station: ParcoursStation) => void;
};

type PlannedContent = {
  key: string;
  type: DayPlanItem["type"];
  id: string;
  title: string;
  emoji: string;
  material: string[];
  optionalMaterial: string[];
  onOpen: () => void;
};

type MaterialNeed = {
  name: string;
  sources: string[];
};

export function DayPlan({ onOpenExercise, onOpenStation }: DayPlanProps) {
  const { items, toggleItem } = useDayPlan();
  const [generatedLink, setGeneratedLink] = useState<{
    plan: string;
    url: string;
    copied: boolean;
  } | null>(null);
  const plannedContent = items.flatMap<PlannedContent>((item) => {
    if (item.type === "exercise") {
      const exercise = exercises.find((candidate) => candidate.id === item.id);
      return exercise
        ? [
            {
              key: `exercise-${exercise.id}`,
              type: item.type,
              id: exercise.id,
              title: exercise.title,
              emoji: exercise.emoji,
              material: exercise.material,
              optionalMaterial: exercise.optionalMaterial ?? [],
              onOpen: () => onOpenExercise(exercise),
            },
          ]
        : [];
    }

    const station = parcours.stations.find(
      (candidate) => candidate.id === item.id,
    );
    return station
      ? [
          {
            key: `station-${station.id}`,
            type: item.type,
            id: station.id,
            title: station.name,
            emoji: station.emoji,
            material: station.material,
            optionalMaterial: station.optionalMaterial ?? [],
            onOpen: () => onOpenStation(station),
          },
        ]
      : [];
  });
  const { necessary, optional } = collectMaterials(plannedContent);
  const encodedPlan = encodeDayPlan(items);
  const currentLink =
    generatedLink?.plan === encodedPlan ? generatedLink : null;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const copyLink = async (url: string, plan: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setGeneratedLink({ plan, url, copied: true });
    } catch {
      setGeneratedLink({ plan, url, copied: false });
    }
  };

  const createShareLink = () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("planning", encodedPlan);
    const shareUrl = url.toString();
    setGeneratedLink({ plan: encodedPlan, url: shareUrl, copied: false });
    void copyLink(shareUrl, encodedPlan);
  };

  return (
    <main className="mx-auto w-full max-w-[900px] px-3 pb-20 pt-3 sm:px-6 lg:px-10 lg:pt-8">
      <header className="flex items-end justify-between gap-4 px-1 py-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#e06951]">
            Vandaag
          </p>
          <h1 className="mt-1 text-2xl font-black tracking-[-0.035em] text-[#1e2d25]">
            Dagplanning
          </h1>
        </div>
        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#68736c] shadow-sm ring-1 ring-[#dfdcd5]">
          {plannedContent.length} gepland
        </span>
      </header>

      <nav className="mt-3 grid grid-cols-2 gap-2" aria-label="Dagplanning bekijken">
        <button
          type="button"
          onClick={() => scrollTo("planning")}
          className="rounded-xl bg-[#203a2d] px-3 py-2.5 text-xs font-black text-white"
        >
          Planning · {plannedContent.length}
        </button>
        <button
          type="button"
          onClick={() => scrollTo("materiaal")}
          className="rounded-xl border border-[#d9d6ce] bg-white px-3 py-2.5 text-xs font-black text-[#526058]"
        >
          Materiaal · {necessary.length + optional.length}
        </button>
      </nav>

      <section className="mt-3 rounded-[18px] border border-[#d9d6ce] bg-white p-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#eef3f8] text-lg"
            aria-hidden="true"
          >
            ↗
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-black text-[#2c3b33]">
              Deel deze planning
            </h2>
            <p className="mt-0.5 text-[11px] leading-4 text-[#7a827c]">
              De link opent dezelfde selectie en volgorde.
            </p>
          </div>
          <button
            type="button"
            onClick={createShareLink}
            disabled={items.length === 0}
            className="shrink-0 rounded-xl bg-[#203a2d] px-3 py-2.5 text-xs font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Maak link
          </button>
        </div>

        {currentLink && (
          <div className="mt-3 flex gap-2 border-t border-[#ebe8e1] pt-3">
            <input
              type="text"
              readOnly
              value={currentLink.url}
              onFocus={(event) => event.currentTarget.select()}
              aria-label="Deellink voor deze dagplanning"
              className="h-10 min-w-0 flex-1 rounded-xl border border-[#ddd9d1] bg-[#f8f7f3] px-3 text-xs text-[#59645d] outline-none focus:border-[#789e84]"
            />
            <button
              type="button"
              onClick={() => void copyLink(currentLink.url, currentLink.plan)}
              className="h-10 shrink-0 rounded-xl border border-[#cfd8d1] bg-[#edf5ef] px-3 text-xs font-black text-[#315440]"
            >
              {currentLink.copied ? "Gekopieerd" : "Kopieer"}
            </button>
          </div>
        )}
      </section>

      <section id="planning" className="scroll-mt-3 pt-5">
        <h2 className="px-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#8b928c]">
          Snel openen
        </h2>

        {plannedContent.length > 0 ? (
          <ol className="mt-3 space-y-2.5">
            {plannedContent.map((item, index) => (
              <li
                key={item.key}
                className="flex items-center gap-2 rounded-[18px] border border-[#dedbd3] bg-white p-2.5 shadow-[0_5px_18px_rgba(43,52,47,0.035)]"
              >
                <button
                  type="button"
                  onClick={item.onOpen}
                  className="flex min-w-0 flex-1 items-center gap-3 rounded-xl p-1.5 text-left transition hover:bg-[#f7f6f2]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0eee8] text-xl">
                    {item.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[9px] font-black uppercase tracking-[0.12em] text-[#969b96]">
                      {index + 1}. {item.type === "exercise" ? "Oefening" : "Station"}
                    </span>
                    <span className="mt-1 block truncate text-base font-black text-[#26362d]">
                      {item.title}
                    </span>
                  </span>
                  <span className="text-lg text-[#405148]" aria-hidden="true">
                    →
                  </span>
                </button>
                <PlanToggleButton
                  selected
                  label={item.title}
                  onToggle={() => toggleItem(item.type, item.id)}
                />
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-3 rounded-[20px] border border-dashed border-[#ccc9c0] bg-white/60 px-5 py-10 text-center">
            <div className="text-3xl" aria-hidden="true">
              📋
            </div>
            <p className="mt-3 font-black text-[#2a3931]">Nog niets gepland</p>
            <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-[#747d76]">
              Vink oefeningen en parcoursstations aan. Ze verschijnen hier in
              de volgorde waarin je ze kiest.
            </p>
          </div>
        )}
      </section>

      <section id="materiaal" className="scroll-mt-3 pt-8">
        <div className="px-1">
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#8b928c]">
            Klaarzetten
          </p>
          <h2 className="mt-1 text-xl font-black tracking-[-0.025em] text-[#26362d]">
            Materiaal voor vandaag
          </h2>
        </div>

        <MaterialList
          title="Noodzakelijk"
          description="Dit heb je nodig om je planning uit te voeren."
          icon="✓"
          items={necessary}
          emptyText="Geen noodzakelijk materiaal voor deze planning."
          className="border-[#cfe0d2] bg-[#f1f8f2]"
        />
        <MaterialList
          title="Optioneel"
          description="Neem dit mee als je ook de variaties wilt gebruiken."
          icon="+"
          items={optional}
          emptyText="Geen optioneel materiaal voor deze planning."
          className="border-[#eadfbd] bg-[#fff9e9]"
        />
      </section>
    </main>
  );
}

function MaterialList({
  title,
  description,
  icon,
  items,
  emptyText,
  className,
}: {
  title: string;
  description: string;
  icon: string;
  items: MaterialNeed[];
  emptyText: string;
  className: string;
}) {
  return (
    <div className={`mt-3 rounded-[20px] border p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-black shadow-sm">
          {icon}
        </span>
        <div>
          <h3 className="font-black text-[#2b3a32]">{title}</h3>
          <p className="mt-0.5 text-xs leading-5 text-[#747d76]">
            {description}
          </p>
        </div>
      </div>
      {items.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li
              key={item.name}
              className="flex items-start gap-3 rounded-xl bg-white/85 px-3 py-2.5"
            >
              <span className="text-lg" aria-hidden="true">
                {getMaterialIcon(item.name)}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-black text-[#34433b]">
                  {item.name}
                </span>
                <span className="mt-0.5 block text-[10px] font-bold text-[#929892]">
                  Voor {item.sources.join(", ")}
                </span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded-xl bg-white/70 px-3 py-3 text-xs font-semibold text-[#7c847e]">
          {emptyText}
        </p>
      )}
    </div>
  );
}

function collectMaterials(items: PlannedContent[]) {
  const necessary = new Map<string, MaterialNeed>();
  const optional = new Map<string, MaterialNeed>();

  const addMaterial = (
    collection: Map<string, MaterialNeed>,
    material: string,
    source: string,
  ) => {
    const key = material.toLocaleLowerCase("nl-BE");
    const current = collection.get(key);
    if (current) {
      if (!current.sources.includes(source)) current.sources.push(source);
    } else {
      collection.set(key, { name: material, sources: [source] });
    }
  };

  items.forEach((item) => {
    item.material.forEach((material) =>
      addMaterial(necessary, material, item.title),
    );
    item.optionalMaterial.forEach((material) =>
      addMaterial(optional, material, item.title),
    );
  });

  necessary.forEach((_, key) => optional.delete(key));
  return {
    necessary: [...necessary.values()],
    optional: [...optional.values()],
  };
}
