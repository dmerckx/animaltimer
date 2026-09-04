"use client";

import { AnimalTimer } from "@/app/AnimalTimer";
import { ExerciseLibrary } from "@/app/ExerciseLibrary";
import { ParcoursPage } from "@/app/Parcours";
import type { Exercise } from "@/data/exercises";
import { useState } from "react";

type View = "exercises" | "parcours" | "timer";

export default function Home() {
  const [view, setView] = useState<View>("exercises");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showExercises = () => {
    setView("exercises");
    setSelectedExercise(null);
    scrollToTop();
  };

  const showTimer = () => {
    setView("timer");
    setSelectedExercise(null);
    scrollToTop();
  };

  const showParcours = () => {
    setView("parcours");
    setSelectedExercise(null);
    scrollToTop();
  };

  const openExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#203028]">
      <MobileNavigation
        view={view}
        onExercises={showExercises}
        onParcours={showParcours}
        onTimer={showTimer}
      />

      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-[#dcd9d1] bg-[#f0eee7] lg:flex">
        <Brand />

        <nav className="mt-7 space-y-1.5 px-4" aria-label="Hoofdnavigatie">
          <NavButton
            active={view === "exercises"}
            icon={<LibraryIcon />}
            label="Oefeningen"
            description="Kies een activiteit"
            onClick={showExercises}
          />
          <NavButton
            active={view === "parcours"}
            icon={<ParcoursIcon />}
            label="Parcours"
            description="Combineer stations"
            onClick={showParcours}
          />
          <NavButton
            active={view === "timer"}
            icon={<TimerIcon />}
            label="Dierentimer"
            description="Meet een loopje"
            onClick={showTimer}
          />
        </nav>

        <div className="mx-4 mb-5 mt-auto overflow-hidden rounded-2xl border border-[#d8d5cd] bg-white p-4 shadow-[0_8px_25px_rgba(43,52,47,0.04)]">
          <div className="flex items-center gap-2 text-sm font-black text-[#2d3d34]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff0da] text-lg">
              ✦
            </span>
            Lesgever-tip
          </div>
          <p className="mt-3 text-xs leading-5 text-[#727a74]">
            Kies vooraf enkele opdrachten, maar speel tijdens de les flexibel in
            op de energie van de groep.
          </p>
        </div>

        <div className="border-t border-[#dcd9d1] px-5 py-4 text-[11px] font-bold uppercase tracking-[0.13em] text-[#9a9d98]">
          Multimove · beweegplezier
        </div>
      </aside>

      <div className="pb-20 lg:pb-0 lg:pl-64">
        {view === "exercises" ? (
          <ExerciseLibrary
            selectedExercise={selectedExercise}
            onOpenExercise={openExercise}
            onCloseExercise={() => {
              setSelectedExercise(null);
              scrollToTop();
            }}
          />
        ) : view === "parcours" ? (
          <ParcoursPage />
        ) : (
          <AnimalTimer />
        )}
      </div>
    </div>
  );
}

function MobileNavigation({
  view,
  onExercises,
  onParcours,
  onTimer,
}: {
  view: View;
  onExercises: () => void;
  onParcours: () => void;
  onTimer: () => void;
}) {
  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-3 gap-1 rounded-[22px] border border-[#d6d3cb] bg-[#f4f2ec]/96 p-1.5 shadow-[0_14px_40px_rgba(30,40,34,0.20)] backdrop-blur lg:hidden"
      aria-label="Hoofdnavigatie"
    >
      <MobileNavButton
        active={view === "exercises"}
        icon={<LibraryIcon />}
        label="Oefeningen"
        onClick={onExercises}
      />
      <MobileNavButton
        active={view === "parcours"}
        icon={<ParcoursIcon />}
        label="Parcours"
        onClick={onParcours}
      />
      <MobileNavButton
        active={view === "timer"}
        icon={<TimerIcon />}
        label="Dierentimer"
        onClick={onTimer}
      />
    </nav>
  );
}

function MobileNavButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[10px] font-black transition ${
        active
          ? "bg-white text-[#244131] shadow-sm ring-1 ring-[#dfdcd5]"
          : "text-[#7e857f]"
      }`}
      aria-label={label}
      aria-current={active ? "page" : undefined}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-5 pt-7">
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[#203a2d] shadow-sm">
        <span className="absolute left-2 top-2 h-3 w-3 rounded-full bg-[#f5c655]" />
        <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-[#ef8068]" />
        <span className="relative text-lg font-black text-white">M</span>
      </div>
      <div>
        <div className="text-[10px] font-black uppercase leading-none tracking-[0.18em] text-[#e26950]">
          Mijn
        </div>
        <div className="mt-1 text-lg font-black leading-none tracking-[-0.03em] text-[#22342a]">
          Multimove
        </div>
      </div>
    </div>
  );
}

function NavButton({
  active,
  icon,
  label,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
        active
          ? "bg-white text-[#21352a] shadow-[0_6px_20px_rgba(43,52,47,0.06)] ring-1 ring-[#ddd9d0]"
          : "text-[#667169] hover:bg-white/60 hover:text-[#293b31]"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
          active
            ? "bg-[#e8f2e7] text-[#2c563d]"
            : "bg-[#e5e2da] text-[#727b74] group-hover:bg-white"
        }`}
      >
        {icon}
      </span>
      <span>
        <span className="block text-sm font-black">{label}</span>
        <span className="mt-0.5 block text-[11px] font-semibold text-[#929791]">
          {description}
        </span>
      </span>
      {active && <span className="ml-auto text-[#d7664e]">•</span>}
    </button>
  );
}

function LibraryIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M5 4.75h5.25c.97 0 1.75.78 1.75 1.75v12.75H6.75A1.75 1.75 0 0 1 5 17.5V4.75Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M19 4.75h-5.25c-.97 0-1.75.78-1.75 1.75v12.75h5.25A1.75 1.75 0 0 0 19 17.5V4.75ZM8 8h1.5M14.5 8H16"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="13" r="7.25" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 13V9.25M9.5 3.75h5M16.9 6.2l1.35-1.35"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ParcoursIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect
        x="3.75"
        y="5"
        width="5"
        height="5"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <rect
        x="15.25"
        y="14"
        width="5"
        height="5"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M8.75 7.5h3.5a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2M11.5 13l2.75 2.75L17 13"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
