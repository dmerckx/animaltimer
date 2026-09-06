"use client";

import { AnimalTimer } from "@/app/AnimalTimer";
import { getMaterialIcon } from "@/app/materials";
import { PlanToggleButton } from "@/app/PlanToggleButton";
import { useDayPlan } from "@/app/useDayPlan";
import { useSessionStorageValue } from "@/app/useSessionStorage";
import { exercises, type Exercise } from "@/data/exercises";

type ExerciseLibraryProps = {
  selectedExercise: Exercise | null;
  onOpenExercise: (exercise: Exercise) => void;
  onCloseExercise: () => void;
};

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

export function ExerciseLibrary({
  selectedExercise,
  onOpenExercise,
  onCloseExercise,
}: ExerciseLibraryProps) {
  const { isPlanned, toggleItem } = useDayPlan();

  if (selectedExercise) {
    if (selectedExercise.kind === "animal-timer") {
      return (
        <AnimalTimer
          assignments={selectedExercise.assignments}
          onBack={onCloseExercise}
          planned={isPlanned("exercise", selectedExercise.id)}
          onTogglePlan={() => toggleItem("exercise", selectedExercise.id)}
        />
      );
    }

    return (
      <ExerciseDetail
        key={selectedExercise.id}
        exercise={selectedExercise}
        onBack={onCloseExercise}
        planned={isPlanned("exercise", selectedExercise.id)}
        onTogglePlan={() => toggleItem("exercise", selectedExercise.id)}
      />
    );
  }

  return (
    <ExerciseOverview
      onOpenExercise={onOpenExercise}
      isPlanned={(id) => isPlanned("exercise", id)}
      onTogglePlan={(id) => toggleItem("exercise", id)}
    />
  );
}

function ExerciseOverview({
  onOpenExercise,
  isPlanned,
  onTogglePlan,
}: Pick<ExerciseLibraryProps, "onOpenExercise"> & {
  isPlanned: (id: string) => boolean;
  onTogglePlan: (id: string) => void;
}) {
  return (
    <main className="mx-auto w-full max-w-[1200px] px-3 pb-8 pt-3 sm:px-6 lg:px-10 lg:pt-8">
      <h1 className="sr-only">Oefeningen</h1>
      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onOpen={() => onOpenExercise(exercise)}
            planned={isPlanned(exercise.id)}
            onTogglePlan={() => onTogglePlan(exercise.id)}
          />
        ))}
      </div>
    </main>
  );
}

function ExerciseCard({
  exercise,
  onOpen,
  planned,
  onTogglePlan,
}: {
  exercise: Exercise;
  onOpen: () => void;
  planned: boolean;
  onTogglePlan: () => void;
}) {
  const colors = accentClasses[exercise.accent];

  return (
    <article
      className={`relative overflow-hidden rounded-[20px] border bg-white shadow-[0_5px_18px_rgba(43,52,47,0.035)] transition hover:shadow-[0_10px_28px_rgba(43,52,47,0.08)] ${
        planned ? "border-[#a9cbb3] ring-1 ring-[#d5e8da]" : "border-[#dedbd3]"
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group w-full p-4 text-left focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-[#ed765d]"
      >
        <div className="flex items-start gap-3 pr-11">
          <span
            className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm ${colors.icon}`}
            aria-hidden="true"
          >
            {exercise.emoji}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[9px] font-black uppercase tracking-[0.13em] text-[#949a95]">
              {exercise.category}
            </span>
            <span className="mt-1 block text-lg font-black tracking-[-0.025em] text-[#1e2d25]">
              {exercise.title}
            </span>
            <span className="mt-1 line-clamp-1 block text-xs leading-5 text-[#747d76]">
              {exercise.summary}
            </span>
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-[#ebe8e1] pt-3">
          {exercise.material.length > 0 ? (
            exercise.material.map((material) => (
              <MaterialBadge key={material} material={material} />
            ))
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f2f4f0] px-2 py-1 text-[10px] font-bold text-[#68736c]">
              <span aria-hidden="true">🙌</span> Geen materiaal
            </span>
          )}
          <span className="ml-auto whitespace-nowrap text-[10px] font-black text-[#929892]">
            {exercise.kind === "animal-timer"
              ? "Minigame"
              : `${exercise.assignments.length} opdrachten`}
          </span>
        </div>
      </button>
      <div className="absolute right-3 top-3 z-10">
        <PlanToggleButton
          selected={planned}
          label={exercise.title}
          onToggle={onTogglePlan}
        />
      </div>
    </article>
  );
}

function MaterialBadge({ material }: { material: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f2f4f0] px-2 py-1 text-[10px] font-bold text-[#5f6b63]">
      <span className="text-sm" aria-hidden="true">
        {getMaterialIcon(material)}
      </span>
      {material}
    </span>
  );
}

function ExerciseDetail({
  exercise,
  onBack,
  planned,
  onTogglePlan,
}: {
  exercise: Exercise;
  onBack: () => void;
  planned: boolean;
  onTogglePlan: () => void;
}) {
  const storageKey = `multimove:exercise:${exercise.id}:assignment`;
  const [storedIndex, setStoredIndex] = useSessionStorageValue(storageKey);
  const parsedIndex = Number(storedIndex);
  const assignmentIndex =
    Number.isInteger(parsedIndex) &&
    parsedIndex >= 0 &&
    parsedIndex < exercise.assignments.length
      ? parsedIndex
      : 0;
  const assignment = exercise.assignments[assignmentIndex];
  const colors = accentClasses[exercise.accent];

  const updateAssignmentIndex = (
    getNextIndex: (currentIndex: number) => number,
  ) => {
    setStoredIndex(String(getNextIndex(assignmentIndex)));
  };

  const goPrevious = () => {
    updateAssignmentIndex((current) =>
      current === 0 ? exercise.assignments.length - 1 : current - 1,
    );
  };

  const goNext = () => {
    updateAssignmentIndex((current) =>
      current === exercise.assignments.length - 1 ? 0 : current + 1,
    );
  };

  const chooseRandom = () => {
    if (exercise.assignments.length < 2) return;
    updateAssignmentIndex((current) => {
      const offset = Math.floor(Math.random() * (exercise.assignments.length - 1)) + 1;
      return (current + offset) % exercise.assignments.length;
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-5 pb-20 pt-6 sm:px-8 lg:px-10 lg:pt-9">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-extrabold text-[#58655d] transition hover:bg-white hover:text-[#203028]"
        >
          <span className="text-lg transition group-hover:-translate-x-0.5">←</span>
          Alle oefeningen
        </button>
        <PlanToggleButton
          selected={planned}
          label={exercise.title}
          onToggle={onTogglePlan}
          showText
        />
      </div>

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

              <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5 px-1">
                {getVisibleAssignmentIndexes(
                  exercise.assignments.length,
                  assignmentIndex,
                ).map((index, slot) =>
                  index === null ? (
                    <span
                      key={`ellipsis-${slot}`}
                      className="w-2.5 shrink-0 text-center text-xs font-black leading-none text-[#a5aaa5]"
                      aria-hidden="true"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      type="button"
                      key={exercise.assignments[index].title}
                      onClick={() => updateAssignmentIndex(() => index)}
                      className={`h-2.5 shrink-0 rounded-full transition-all ${
                        index === assignmentIndex
                          ? `w-7 ${colors.line}`
                          : "w-2.5 bg-[#d6d5cf] hover:bg-[#b9bab5]"
                      }`}
                      aria-label={`Ga naar opdracht ${index + 1}: ${exercise.assignments[index].title}`}
                      aria-current={
                        index === assignmentIndex ? "step" : undefined
                      }
                    />
                  ),
                )}
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

function getVisibleAssignmentIndexes(total: number, current: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index);
  }

  if (current <= 3) {
    return [0, 1, 2, 3, 4, null, total - 1];
  }

  if (current >= total - 4) {
    return [0, null, total - 5, total - 4, total - 3, total - 2, total - 1];
  }

  return [0, null, current - 1, current, current + 1, null, total - 1];
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
