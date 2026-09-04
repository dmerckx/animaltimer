"use client";

import {
  categories,
  exercises,
  type Exercise,
  type ExerciseCategory,
} from "@/data/exercises";
import { useMemo, useState } from "react";

type ExerciseLibraryProps = {
  selectedExercise: Exercise | null;
  onOpenExercise: (exercise: Exercise) => void;
  onCloseExercise: () => void;
};

type MaterialFilter = "all" | "none" | "ball" | "hoop" | "bench";

const accentClasses: Record<
  Exercise["accent"],
  { card: string; icon: string; line: string; soft: string }
> = {
  coral: {
    card: "bg-[#fff3ee]",
    icon: "bg-[#ff8d72]",
    line: "bg-[#ff8d72]",
    soft: "bg-[#fff0ea] text-[#a3412f]",
  },
  blue: {
    card: "bg-[#edf6ff]",
    icon: "bg-[#86bdf0]",
    line: "bg-[#72aee7]",
    soft: "bg-[#e7f3ff] text-[#245b8b]",
  },
  yellow: {
    card: "bg-[#fff8df]",
    icon: "bg-[#f6c84f]",
    line: "bg-[#eebf43]",
    soft: "bg-[#fff5d1] text-[#75590c]",
  },
  green: {
    card: "bg-[#eef8ed]",
    icon: "bg-[#87c884]",
    line: "bg-[#78b976]",
    soft: "bg-[#e8f5e7] text-[#376c35]",
  },
  purple: {
    card: "bg-[#f4efff]",
    icon: "bg-[#af91e8]",
    line: "bg-[#a486df]",
    soft: "bg-[#f0eaff] text-[#5e4294]",
  },
};

const materialOptions: { value: MaterialFilter; label: string }[] = [
  { value: "all", label: "Alle materialen" },
  { value: "none", label: "Zonder materiaal" },
  { value: "ball", label: "Met bal" },
  { value: "hoop", label: "Met hoepel" },
  { value: "bench", label: "Met bank" },
];

export function ExerciseLibrary({
  selectedExercise,
  onOpenExercise,
  onCloseExercise,
}: ExerciseLibraryProps) {
  if (selectedExercise) {
    return (
      <ExerciseDetail
        key={selectedExercise.id}
        exercise={selectedExercise}
        onBack={onCloseExercise}
      />
    );
  }

  return <ExerciseOverview onOpenExercise={onOpenExercise} />;
}

function ExerciseOverview({
  onOpenExercise,
}: Pick<ExerciseLibraryProps, "onOpenExercise">) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ExerciseCategory | "Alle">("Alle");
  const [materialFilter, setMaterialFilter] =
    useState<MaterialFilter>("all");

  const filteredExercises = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("nl-BE");

    return exercises.filter((exercise) => {
      const haystack = [
        exercise.title,
        exercise.summary,
        exercise.category,
        ...exercise.material,
        ...(exercise.optionalMaterial ?? []),
      ]
        .join(" ")
        .toLocaleLowerCase("nl-BE");
      const allMaterial = [
        ...exercise.material,
        ...(exercise.optionalMaterial ?? []),
      ]
        .join(" ")
        .toLocaleLowerCase("nl-BE");

      const matchesMaterial =
        materialFilter === "all" ||
        (materialFilter === "none" && exercise.material.length === 0) ||
        (materialFilter === "ball" && allMaterial.includes("bal")) ||
        (materialFilter === "hoop" && allMaterial.includes("hoepel")) ||
        (materialFilter === "bench" && allMaterial.includes("bank"));

      return (
        (!normalizedQuery || haystack.includes(normalizedQuery)) &&
        (category === "Alle" || exercise.category === category) &&
        matchesMaterial
      );
    });
  }, [category, materialFilter, query]);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 pt-7 sm:px-8 lg:px-10 lg:pt-10">
      <header className="flex flex-col gap-5 border-b border-[#dedbd3] pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#e05d42]">
            Lesvoorbereiding
          </p>
          <h1 className="text-balance text-4xl font-black tracking-[-0.045em] text-[#18251f] sm:text-5xl">
            Wat gaan we vandaag doen?
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#68736c]">
            Kies een oefening, blader door de opdrachten en pas ze aan aan jouw
            groep.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-[#dedbd3] bg-white px-4 py-3 shadow-[0_8px_30px_rgba(40,48,43,0.05)]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9f4e8] text-xl">
            🗂️
          </span>
          <div>
            <div className="text-xl font-black leading-none text-[#203028]">
              {exercises.length}
            </div>
            <div className="mt-1 text-xs font-semibold text-[#788179]">
              oefeningen klaar
            </div>
          </div>
        </div>
      </header>

      <section className="pt-7" aria-label="Oefeningen zoeken en filteren">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Zoek een oefening</span>
            <SearchIcon />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Zoek op oefening of materiaal…"
              className="h-13 w-full rounded-2xl border border-[#d9d7cf] bg-white py-3 pl-12 pr-4 text-[15px] font-medium text-[#223028] outline-none transition placeholder:text-[#9b9e98] focus:border-[#ed765d] focus:ring-4 focus:ring-[#ed765d]/10"
            />
          </label>
          <label className="relative">
            <span className="sr-only">Filter op materiaal</span>
            <select
              value={materialFilter}
              onChange={(event) =>
                setMaterialFilter(event.target.value as MaterialFilter)
              }
              className="h-13 w-full appearance-none rounded-2xl border border-[#d9d7cf] bg-white py-3 pl-4 pr-11 text-[15px] font-bold text-[#3f4c45] outline-none transition focus:border-[#ed765d] focus:ring-4 focus:ring-[#ed765d]/10 lg:w-52"
            >
              {materialOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon />
          </label>
        </div>

        <div className="no-scrollbar -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
          {(["Alle", ...categories] as const).map((item) => {
            const active = category === item;
            return (
              <button
                type="button"
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition ${
                  active
                    ? "bg-[#20342a] text-white shadow-sm"
                    : "border border-[#dcdad2] bg-white text-[#657068] hover:border-[#b9b8b1] hover:text-[#26352d]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </section>

      <section className="pt-8" aria-live="polite">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-[#24332b]">
            {category === "Alle" ? "Alle oefeningen" : category}
          </h2>
          <span className="text-sm font-semibold text-[#818880]">
            {filteredExercises.length} gevonden
          </span>
        </div>

        {filteredExercises.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onOpen={() => onOpenExercise(exercise)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-[#cbc8bf] bg-white/60 px-6 py-16 text-center">
            <div className="text-4xl">🧭</div>
            <h3 className="mt-4 text-lg font-black text-[#26352d]">
              Geen oefeningen gevonden
            </h3>
            <p className="mt-2 text-sm text-[#747d76]">
              Probeer een andere zoekterm of zet de filters terug op alles.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("Alle");
                setMaterialFilter("all");
              }}
              className="mt-5 rounded-xl bg-[#20342a] px-4 py-2.5 text-sm font-bold text-white"
            >
              Wis filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function ExerciseCard({
  exercise,
  onOpen,
}: {
  exercise: Exercise;
  onOpen: () => void;
}) {
  const colors = accentClasses[exercise.accent];

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex min-h-72 flex-col overflow-hidden rounded-[26px] border border-[#dedbd3] bg-white text-left shadow-[0_8px_25px_rgba(43,52,47,0.04)] transition duration-200 hover:-translate-y-1 hover:border-[#c8c4bb] hover:shadow-[0_18px_45px_rgba(43,52,47,0.10)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#ed765d]"
    >
      <div
        className={`relative flex h-31 w-full items-center justify-center overflow-hidden ${colors.card}`}
      >
        <div className="absolute -left-5 -top-9 h-24 w-24 rounded-full border-[18px] border-white/35" />
        <div className="absolute -bottom-9 -right-1 h-24 w-24 rounded-full border-[16px] border-white/45" />
        <div
          className={`relative flex h-17 w-17 rotate-[-5deg] items-center justify-center rounded-[22px] text-4xl shadow-[0_10px_25px_rgba(43,52,47,0.12)] transition duration-300 group-hover:rotate-3 group-hover:scale-105 ${colors.icon}`}
        >
          <span aria-hidden="true">{exercise.emoji}</span>
        </div>
        <span className="absolute right-4 top-4 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-extrabold text-[#4c574f] backdrop-blur">
          {exercise.assignments.length} opdrachten
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#848c85]">
          {exercise.category}
        </span>
        <h3 className="mt-2 text-xl font-black tracking-[-0.025em] text-[#1e2d25]">
          {exercise.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6d766f]">
          {exercise.summary}
        </p>
        <div className="mt-auto flex items-center gap-3 border-t border-[#ebe8e1] pt-4 text-xs font-bold text-[#677169]">
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true">⏱</span> {exercise.duration}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#b8b9b4]" />
          <span>{exercise.ages}</span>
          <span className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f2ec] text-lg text-[#26372d] transition group-hover:bg-[#26372d] group-hover:text-white">
            →
          </span>
        </div>
      </div>
    </button>
  );
}

function ExerciseDetail({
  exercise,
  onBack,
}: {
  exercise: Exercise;
  onBack: () => void;
}) {
  const [assignmentIndex, setAssignmentIndex] = useState(0);
  const assignment = exercise.assignments[assignmentIndex];
  const colors = accentClasses[exercise.accent];

  const goPrevious = () => {
    setAssignmentIndex((current) =>
      current === 0 ? exercise.assignments.length - 1 : current - 1,
    );
  };

  const goNext = () => {
    setAssignmentIndex((current) =>
      current === exercise.assignments.length - 1 ? 0 : current + 1,
    );
  };

  const chooseRandom = () => {
    if (exercise.assignments.length < 2) return;
    setAssignmentIndex((current) => {
      const offset = Math.floor(Math.random() * (exercise.assignments.length - 1)) + 1;
      return (current + offset) % exercise.assignments.length;
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-6 sm:px-8 lg:px-10 lg:pt-9">
      <button
        type="button"
        onClick={onBack}
        className="group inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-extrabold text-[#58655d] transition hover:bg-white hover:text-[#203028]"
      >
        <span className="text-lg transition group-hover:-translate-x-0.5">←</span>
        Alle oefeningen
      </button>

      <div className="mt-5 grid gap-7 lg:grid-cols-[minmax(0,1fr)_310px]">
        <main>
          <div className="flex items-start gap-4 sm:gap-5">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[20px] text-3xl shadow-sm sm:h-20 sm:w-20 sm:text-4xl ${colors.icon}`}
              aria-hidden="true"
            >
              {exercise.emoji}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] ${colors.soft}`}
                >
                  {exercise.category}
                </span>
                <span className="text-xs font-bold text-[#7d867f]">
                  {exercise.duration}
                </span>
              </div>
              <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#1d2d24] sm:text-5xl">
                {exercise.title}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#69746d]">
                {exercise.summary}
              </p>
            </div>
          </div>

          <section className="mt-8 rounded-[28px] border border-[#dedbd3] bg-white p-4 shadow-[0_14px_40px_rgba(40,48,43,0.06)] sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8a918b]">
                  Opdracht {assignmentIndex + 1} van {exercise.assignments.length}
                </p>
                <h2 className="mt-1 text-lg font-black text-[#28372f]">
                  Kies wat bij je groep past
                </h2>
              </div>
              <button
                type="button"
                onClick={chooseRandom}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-[#ddd9d0] bg-[#faf9f5] px-3 py-2 text-xs font-extrabold text-[#536058] transition hover:border-[#bdb9b0] hover:bg-white"
              >
                <span className="text-base" aria-hidden="true">
                  ⚄
                </span>
                <span className="hidden sm:inline">Verras me</span>
              </button>
            </div>

            <div
              className={`relative mt-5 min-h-67 overflow-hidden rounded-[24px] p-6 sm:min-h-72 sm:p-9 ${colors.card}`}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[28px] border-white/35" />
              <div className="absolute -bottom-12 left-16 h-32 w-32 rounded-full border-[22px] border-white/35" />
              <div className="relative flex min-h-54 flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex rounded-full bg-white/75 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.1em] ${colors.soft}`}
                  >
                    {assignment.level ?? "Actief"}
                  </span>
                  <span className="font-mono text-sm font-bold text-[#6b726d]">
                    {String(assignmentIndex + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-3xl font-black tracking-[-0.04em] text-[#1b2c22] sm:text-4xl">
                  {assignment.title}
                </h3>
                <p className="mt-4 max-w-2xl text-lg font-medium leading-8 text-[#46534b] sm:text-xl">
                  {assignment.instruction}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={goPrevious}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#d8d5cd] bg-white px-4 text-sm font-black text-[#435048] transition hover:bg-[#f5f3ee] sm:px-5"
                aria-label="Vorige opdracht"
              >
                <span className="text-lg">←</span>
                <span className="hidden sm:inline">Vorige</span>
              </button>

              <div className="no-scrollbar flex flex-1 justify-center gap-1.5 overflow-x-auto px-2">
                {exercise.assignments.map((item, index) => (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() => setAssignmentIndex(index)}
                    className={`h-2.5 shrink-0 rounded-full transition-all ${
                      index === assignmentIndex
                        ? `w-8 ${colors.line}`
                        : "w-2.5 bg-[#d6d5cf] hover:bg-[#b9bab5]"
                    }`}
                    aria-label={`Ga naar opdracht ${index + 1}: ${item.title}`}
                    aria-current={index === assignmentIndex ? "step" : undefined}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#20342a] px-4 text-sm font-black text-white shadow-sm transition hover:bg-[#304b3d] sm:px-5"
                aria-label="Volgende opdracht"
              >
                <span className="hidden sm:inline">Volgende</span>
                <span className="text-lg">→</span>
              </button>
            </div>
          </section>
        </main>

        <aside className="space-y-4 lg:pt-1">
          <InfoCard title="Klaarzetten" icon="▦">
            <p>{exercise.setup}</p>
          </InfoCard>

          <InfoCard title="Materiaal" icon="◫">
            {exercise.material.length > 0 ? (
              <ul className="space-y-2">
                {exercise.material.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span
                      className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${colors.line}`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Geen materiaal nodig.</p>
            )}
            {exercise.optionalMaterial && (
              <div className="mt-4 border-t border-[#ebe8e1] pt-3">
                <p className="mb-2 text-[11px] font-black uppercase tracking-[0.12em] text-[#999e99]">
                  Optioneel
                </p>
                <p>{exercise.optionalMaterial.join(", ")}</p>
              </div>
            )}
          </InfoCard>

          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Leeftijd" value={exercise.ages} icon="☺" />
            <StatCard label="Groep" value={exercise.groupSize} icon="♟" />
          </div>

          <div className="rounded-2xl border border-[#efdca8] bg-[#fff8df] p-4 text-sm leading-6 text-[#675726]">
            <div className="mb-2 flex items-center gap-2 font-black text-[#554714]">
              <span aria-hidden="true">💡</span> Tip voor de lesgever
            </div>
            <p>{exercise.tip}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#dedbd3] bg-white p-5 text-sm leading-6 text-[#647068] shadow-[0_8px_25px_rgba(43,52,47,0.035)]">
      <h2 className="mb-3 flex items-center gap-2.5 text-sm font-black text-[#27362e]">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0eee8] text-[#536058]">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-[#dedbd3] bg-white p-4 shadow-[0_8px_25px_rgba(43,52,47,0.035)]">
      <div className="text-lg text-[#68756d]" aria-hidden="true">
        {icon}
      </div>
      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.12em] text-[#969b96]">
        {label}
      </p>
      <p className="mt-1 text-xs font-black leading-5 text-[#2d3c34]">
        {value}
      </p>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8b918c]"
    >
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#747d76]"
    >
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
