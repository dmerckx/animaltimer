"use client";

import { collectMaterials, getMaterialIcon, type MaterialNeed } from "@/app/materials";
import { PlanToggleButton } from "@/app/PlanToggleButton";
import {
  encodeDayPlan,
  useDayPlan,
  type DayPlanItem,
} from "@/app/useDayPlan";
import { exercises, type Exercise } from "@/data/exercises";
import { parcours, type ParcoursStation } from "@/data/parcours";
import { useRef, useState } from "react";
import Link from "next/link";

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

type PlanBlock =
  | { key: string; type: "exercise"; item: PlannedContent }
  | { key: "parcours"; type: "parcours"; items: PlannedContent[] };

type DragTarget = {
  scope: "block" | "station";
  key: string;
};

export function DayPlan({ onOpenExercise, onOpenStation }: DayPlanProps) {
  const { items, toggleItem, reorderItems } = useDayPlan();
  const draggingRef = useRef<DragTarget | null>(null);
  const [dragging, setDragging] = useState<DragTarget | null>(null);
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
  const planBlocks = groupPlanBlocks(plannedContent);
  const { necessary, optional } = collectMaterials(plannedContent);
  const encodedPlan = encodeDayPlan(items);
  const currentLink =
    generatedLink?.plan === encodedPlan ? generatedLink : null;

  const saveBlocks = (blocks: PlanBlock[]) => {
    const nextItems = blocks.flatMap((block) =>
      block.type === "exercise" ? [block.item] : block.items,
    );
    reorderItems(
      nextItems.map(({ type, id }) => ({ type, id })),
    );
  };

  const moveBlock = (draggedKey: string, targetKey: string) => {
    if (draggedKey === targetKey) return;
    const fromIndex = planBlocks.findIndex((block) => block.key === draggedKey);
    const toIndex = planBlocks.findIndex((block) => block.key === targetKey);
    if (fromIndex < 0 || toIndex < 0) return;
    const nextBlocks = [...planBlocks];
    const [moved] = nextBlocks.splice(fromIndex, 1);
    nextBlocks.splice(toIndex, 0, moved);
    saveBlocks(nextBlocks);
  };

  const moveStation = (draggedKey: string, targetKey: string) => {
    if (draggedKey === targetKey) return;
    const parcoursBlock = planBlocks.find(
      (block): block is Extract<PlanBlock, { type: "parcours" }> =>
        block.type === "parcours",
    );
    if (!parcoursBlock) return;
    const fromIndex = parcoursBlock.items.findIndex(
      (item) => item.key === draggedKey,
    );
    const toIndex = parcoursBlock.items.findIndex(
      (item) => item.key === targetKey,
    );
    if (fromIndex < 0 || toIndex < 0) return;
    const nextStations = [...parcoursBlock.items];
    const [moved] = nextStations.splice(fromIndex, 1);
    nextStations.splice(toIndex, 0, moved);
    saveBlocks(
      planBlocks.map((block) =>
        block.type === "parcours"
          ? { ...block, items: nextStations }
          : block,
      ),
    );
  };

  const moveBlockByOffset = (key: string, offset: number) => {
    const index = planBlocks.findIndex((block) => block.key === key);
    const target = planBlocks[index + offset];
    if (target) moveBlock(key, target.key);
  };

  const moveStationByOffset = (key: string, offset: number) => {
    const stations = planBlocks.find((block) => block.type === "parcours")
      ?.items;
    if (!stations) return;
    const index = stations.findIndex((item) => item.key === key);
    const target = stations[index + offset];
    if (target) moveStation(key, target.key);
  };

  const startDragging = (target: DragTarget) => {
    draggingRef.current = target;
    setDragging(target);
  };

  const stopDragging = () => {
    draggingRef.current = null;
    setDragging(null);
  };

  const dragOverTarget = (scope: DragTarget["scope"], key: string) => {
    const current = draggingRef.current;
    if (!current || current.scope !== scope || current.key === key) return;
    if (scope === "block") moveBlock(current.key, key);
    else moveStation(current.key, key);
  };

  const dragAtPoint = (
    scope: DragTarget["scope"],
    clientX: number,
    clientY: number,
  ) => {
    if (clientY < 80) window.scrollBy({ top: -14 });
    if (clientY > window.innerHeight - 100) window.scrollBy({ top: 14 });
    const attribute = scope === "block" ? "data-plan-block" : "data-plan-station";
    const target = document
      .elementFromPoint(clientX, clientY)
      ?.closest<HTMLElement>(`[${attribute}]`);
    const key = target?.getAttribute(attribute);
    if (key) dragOverTarget(scope, key);
  };

  const copyLink = async (url: string, plan: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setGeneratedLink({ plan, url, copied: true });
    } catch {
      setGeneratedLink({ plan, url, copied: false });
    }
  };

  const sharePlan = async () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("planning", encodedPlan);
    const shareUrl = url.toString();
    setGeneratedLink({ plan: encodedPlan, url: shareUrl, copied: false });

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mijn Multimove-dagplanning",
          text: "Open deze Multimove-dagplanning.",
          url: shareUrl,
        });
        return;
      } catch {
        return;
      }
    }

    await copyLink(shareUrl, encodedPlan);
  };

  return (
    <main className="mx-auto w-full max-w-[900px] px-3 pb-20 pt-3 sm:px-6 lg:px-10 lg:pt-8">
      <h1 className="sr-only">Dagplanning</h1>
      <section aria-label="Geplande oefeningen en stations">
        {plannedContent.length > 0 ? (
          <ol className="space-y-2.5">
            {planBlocks.map((block, index) =>
              block.type === "exercise" ? (
                <li
                  key={block.key}
                  data-plan-block={block.key}
                  onDragOver={(event) => {
                    if (draggingRef.current?.scope !== "block") return;
                    event.preventDefault();
                    dragOverTarget("block", block.key);
                  }}
                  className={`flex items-center gap-1.5 rounded-[18px] border bg-white p-2.5 shadow-[0_5px_18px_rgba(43,52,47,0.035)] transition ${
                    dragging?.key === block.key
                      ? "border-[#91b69c] opacity-65"
                      : "border-[#dedbd3]"
                  }`}
                >
                  <ReorderHandle
                    label={`Verplaats ${block.item.title}`}
                    onStart={() =>
                      startDragging({ scope: "block", key: block.key })
                    }
                    onMove={(clientX, clientY) =>
                      dragAtPoint("block", clientX, clientY)
                    }
                    onEnd={stopDragging}
                    onMoveUp={() => moveBlockByOffset(block.key, -1)}
                    onMoveDown={() => moveBlockByOffset(block.key, 1)}
                  />
                  <button
                    type="button"
                    onClick={block.item.onOpen}
                    className="flex min-w-0 flex-1 items-center gap-3 rounded-xl p-1 text-left transition hover:bg-[#f7f6f2]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0eee8] text-xl">
                      {block.item.emoji}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[9px] font-black uppercase tracking-[0.12em] text-[#969b96]">
                        {index + 1}. Oefening
                      </span>
                      <span className="mt-1 block truncate text-base font-black text-[#26362d]">
                        {block.item.title}
                      </span>
                    </span>
                    <span className="text-lg text-[#405148]" aria-hidden="true">
                      →
                    </span>
                  </button>
                  <PlanToggleButton
                    selected
                    label={block.item.title}
                    onToggle={() =>
                      toggleItem(block.item.type, block.item.id)
                    }
                  />
                </li>
              ) : (
                <li
                  key={block.key}
                  data-plan-block={block.key}
                  onDragOver={(event) => {
                    if (draggingRef.current?.scope !== "block") return;
                    event.preventDefault();
                    dragOverTarget("block", block.key);
                  }}
                  className={`overflow-hidden rounded-[20px] border bg-white shadow-[0_5px_18px_rgba(43,52,47,0.04)] transition ${
                    dragging?.key === block.key
                      ? "border-[#91b69c] opacity-65"
                      : "border-[#dedbd3]"
                  }`}
                >
                  <div className="flex items-center gap-2 border-b border-[#e7e4dd] bg-[#f2f5f1] p-3">
                    <ReorderHandle
                      label="Verplaats parcours"
                      onStart={() =>
                        startDragging({ scope: "block", key: block.key })
                      }
                      onMove={(clientX, clientY) =>
                        dragAtPoint("block", clientX, clientY)
                      }
                      onEnd={stopDragging}
                      onMoveUp={() => moveBlockByOffset(block.key, -1)}
                      onMoveDown={() => moveBlockByOffset(block.key, 1)}
                    />
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-sm"
                      aria-hidden="true"
                    >
                      🧩
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[9px] font-black uppercase tracking-[0.12em] text-[#87918a]">
                        {index + 1}. Onderdeel
                      </span>
                      <span className="mt-0.5 block text-base font-black text-[#26362d]">
                        Parcours
                      </span>
                    </span>
                    <span className="rounded-lg bg-white px-2 py-1 text-[10px] font-black text-[#68736c] shadow-sm">
                      {block.items.length} {block.items.length === 1 ? "station" : "stations"}
                    </span>
                  </div>

                  <ol className="divide-y divide-[#ece9e2] px-2">
                    {block.items.map((station) => (
                      <li
                        key={station.key}
                        data-plan-station={station.key}
                        onDragOver={(event) => {
                          if (draggingRef.current?.scope !== "station") return;
                          event.preventDefault();
                          event.stopPropagation();
                          dragOverTarget("station", station.key);
                        }}
                        className={`flex items-center gap-1 py-2 transition ${
                          dragging?.key === station.key ? "opacity-55" : ""
                        }`}
                      >
                        <ReorderHandle
                          label={`Verplaats ${station.title}`}
                          compact
                          onStart={() =>
                            startDragging({
                              scope: "station",
                              key: station.key,
                            })
                          }
                          onMove={(clientX, clientY) =>
                            dragAtPoint("station", clientX, clientY)
                          }
                          onEnd={stopDragging}
                          onMoveUp={() =>
                            moveStationByOffset(station.key, -1)
                          }
                          onMoveDown={() =>
                            moveStationByOffset(station.key, 1)
                          }
                        />
                        <button
                          type="button"
                          onClick={station.onOpen}
                          className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl p-1.5 text-left transition hover:bg-[#f7f6f2]"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f0eee8] text-lg">
                            {station.emoji}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-sm font-black text-[#34433b]">
                            {station.title}
                          </span>
                          <span className="text-base text-[#405148]" aria-hidden="true">
                            →
                          </span>
                        </button>
                        <PlanToggleButton
                          selected
                          label={station.title}
                          onToggle={() =>
                            toggleItem(station.type, station.id)
                          }
                        />
                      </li>
                    ))}
                  </ol>
                </li>
              ),
            )}
          </ol>
        ) : (
          <div className="rounded-[20px] border border-dashed border-[#ccc9c0] bg-white/60 px-5 py-10 text-center">
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

      <section className="pt-8">
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

      <section className="mt-6 border-t border-[#dfdcd5] pt-4" aria-label="Planning delen">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => void sharePlan()}
            disabled={items.length === 0}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#203a2d] px-4 text-sm font-black text-white shadow-sm transition hover:bg-[#2f513f] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Deel dagplanning"
          >
            <span className="text-lg" aria-hidden="true">↗</span>
            Delen
          </button>
        </div>

        {currentLink && (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              readOnly
              value={currentLink.url}
              onFocus={(event) => event.currentTarget.select()}
              aria-label="Deellink voor deze dagplanning"
              className="h-10 min-w-0 flex-1 rounded-xl border border-[#ddd9d1] bg-white px-3 text-xs text-[#59645d] outline-none focus:border-[#789e84]"
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
      <div className="mt-8 text-center">
        <Link href="/helpen" className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-[#53695b] underline decoration-[#b8c4b8] underline-offset-4 hover:text-[#203a2d]">
          <span aria-hidden="true">🙌</span>
          Een handje helpen bij Multimove?
        </Link>
      </div>
    </main>
  );
}

function groupPlanBlocks(items: PlannedContent[]): PlanBlock[] {
  const stations = items.filter((item) => item.type === "station");
  let parcoursAdded = false;

  return items.flatMap<PlanBlock>((item) => {
    if (item.type === "exercise") {
      return [{ key: item.key, type: "exercise", item }];
    }
    if (parcoursAdded) return [];
    parcoursAdded = true;
    return [{ key: "parcours", type: "parcours", items: stations }];
  });
}

function ReorderHandle({
  label,
  compact = false,
  onStart,
  onMove,
  onEnd,
  onMoveUp,
  onMoveDown,
}: {
  label: string;
  compact?: boolean;
  onStart: () => void;
  onMove: (clientX: number, clientY: number) => void;
  onEnd: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  return (
    <button
      type="button"
      className={`touch-none select-none rounded-lg text-[#9aa09b] transition hover:bg-[#ebece8] hover:text-[#4e5d54] active:cursor-grabbing active:bg-[#e4e8e3] ${
        compact ? "h-9 w-7 text-base" : "h-10 w-7 text-lg"
      }`}
      aria-label={label}
      aria-roledescription="Versleephandvat"
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        onStart();
      }}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        onMove(event.clientX, event.clientY);
      }}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        onEnd();
      }}
      onPointerCancel={onEnd}
      onKeyDown={(event) => {
        if (event.key === "ArrowUp") {
          event.preventDefault();
          onMoveUp();
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          onMoveDown();
        }
      }}
    >
      ⠿
    </button>
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
