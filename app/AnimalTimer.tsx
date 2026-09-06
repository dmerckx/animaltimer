"use client";

import { PlanToggleButton } from "@/app/PlanToggleButton";
import { type Assignment } from "@/data/exercises";
import { speeds } from "@/data/speeds";
import { useCallback, useState } from "react";
import { useStopwatch } from "react-timer-hook";

type Animal = (typeof speeds)[number];

type Snap = {
  pos: number;
  seconds: number;
  speed: number;
  animal: Animal;
};

const animalSounds: Record<string, string> = {
  Snail: "slurp",
  Tortoise: "zucht",
  Spin: "sisss",
  Penguin: "kwaak",
  Hamster: "piep",
  Egel: "snuif",
  Kikker: "kwaak",
  Salamander: "sisss",
  Eend: "kwak",
  Das: "grom",
  Muis: "piep",
  Konijn: "snuf",
  Kip: "tok tok",
  Wasbeer: "grom",
  Rat: "piep",
  Varken: "knor",
  Eekhoorn: "tsjik",
  Mus: "tjilp",
  Kangeroe: "boing",
  Geit: "beee",
  Poes: "miauw",
  Tijger: "rauwr",
  Luipaard: "grom",
};

export function AnimalTimer({
  onBack,
  planned,
  onTogglePlan,
  assignments,
}: {
  onBack: () => void;
  planned: boolean;
  onTogglePlan: () => void;
  assignments: Assignment[];
}) {
  const [meters, setMeters] = useState(50);
  const [snaps, setSnaps] = useState<Snap[]>([]);
  const { totalSeconds, seconds, minutes, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  const playSound = useCallback((target: Animal) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const sound = animalSounds[target.name] ?? target.name;
    const utterance = new SpeechSynthesisUtterance(
      Math.random() > 0.5
        ? `${sound}! ${sound}!`
        : `${sound} ${sound}`,
    );
    utterance.lang = "nl-NL";
    utterance.rate = 1 + Math.random() * 0.1;
    utterance.pitch = 1.15 + Math.random() * 0.15;
    utterance.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, []);

  const speed = totalSeconds > 0 ? meters / 1000 / (totalSeconds / 3600) : 0;
  const nextIndex = speeds.findIndex((animal) => animal.speed > speed);
  const animal =
    nextIndex === -1
      ? speeds[speeds.length - 1]
      : speeds[nextIndex > 0 ? nextIndex - 1 : 0];
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  const resetTimer = () => {
    reset(undefined, false);
    setSnaps([]);
  };

  const addSnap = () => {
    if (totalSeconds === 0) return;
    setSnaps((current) => [
      {
        seconds: totalSeconds,
        animal,
        speed,
        pos: current.length + 1,
      },
      ...current,
    ]);
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-3 pb-20 pt-3 sm:px-8 lg:px-10 lg:pt-10">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-extrabold text-[#58655d] transition hover:bg-white hover:text-[#203028]"
        >
          <span className="text-lg">←</span>
          Alle oefeningen
        </button>
        <PlanToggleButton
          selected={planned}
          label="Dierentimer"
          onToggle={onTogglePlan}
          showText
        />
      </div>

      <header className="mt-3 border-b border-[#dedbd3] pb-5">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#7a62b6]">
          Minigame
        </p>
        <h1 className="text-4xl font-black tracking-[-0.045em] text-[#18251f] sm:text-5xl">
          Dierentimer
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#68736c]">
          Meet een loopje en ontdek welk dier even snel beweegt.
        </p>
      </header>

      <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
        <main className="order-1 overflow-hidden rounded-[30px] border border-[#dedbd3] bg-white shadow-[0_14px_45px_rgba(40,48,43,0.07)]">
          <div className="relative overflow-hidden bg-[#f2ecff] px-5 pb-8 pt-6 sm:px-9 sm:pb-10 sm:pt-8">
            <div className="absolute -right-18 -top-18 h-58 w-58 rounded-full border-[34px] border-white/30" />
            <div className="absolute -bottom-28 -left-8 h-48 w-48 rounded-full border-[30px] border-white/30" />

            <DistanceSlider meters={meters} setMeters={setMeters} />

            <div className="relative mt-8 text-center">
              <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
                <div className="text-4xl" aria-hidden="true">
                  {animal.emoji}
                </div>
                <div className="text-left">
                  <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#8b7bab]">
                    Huidig dier
                  </div>
                  <div className="text-lg font-black text-[#382e4e]">
                    {animal.name}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => playSound(animal)}
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7761b0] text-lg text-white transition hover:scale-105 hover:bg-[#674f9e] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#7761b0]"
                  aria-label={`Speel geluid van ${animal.name}`}
                >
                  🔊
                </button>
              </div>

              <div
                className="mt-5 font-mono text-[64px] font-black leading-none tracking-[-0.08em] text-[#241c35] tabular-nums sm:text-[92px]"
                aria-live="off"
              >
                {formattedTime}
              </div>
              <p className="mt-3 text-sm font-semibold text-[#796e8e]">
                {totalSeconds > 0
                  ? `${Math.round(speed)} km/u over ${meters} meter`
                  : "Klaar aan de start?"}
              </p>
            </div>
          </div>

          <div className="grid gap-3 p-5 sm:grid-cols-[1fr_1fr_auto] sm:p-7">
            <button
              type="button"
              onClick={isRunning ? pause : start}
              className={`flex h-14 items-center justify-center gap-2 rounded-2xl px-5 text-base font-black text-white shadow-sm transition hover:-translate-y-0.5 ${
                isRunning
                  ? "bg-[#e16b51] hover:bg-[#ce5b43]"
                  : "bg-[#203a2d] hover:bg-[#2f513f]"
              }`}
            >
              <span aria-hidden="true">{isRunning ? "Ⅱ" : "▶"}</span>
              {isRunning ? "Pauzeer" : totalSeconds ? "Ga verder" : "Start timer"}
            </button>
            <button
              type="button"
              onClick={addSnap}
              disabled={totalSeconds === 0}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-[#d9d6ce] bg-[#f8f6f1] px-5 text-base font-black text-[#34433b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
            >
              <span aria-hidden="true">⚑</span> Tijd opslaan
            </button>
            <button
              type="button"
              onClick={resetTimer}
              disabled={totalSeconds === 0 && snaps.length === 0}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-[#d9d6ce] bg-white px-5 text-sm font-black text-[#68736c] transition hover:bg-[#f7f5f0] disabled:cursor-not-allowed disabled:opacity-40 sm:w-14 sm:px-0"
              aria-label="Timer en tijden wissen"
            >
              <span className="text-xl" aria-hidden="true">
                ↺
              </span>
              <span className="sm:hidden">Opnieuw</span>
            </button>
          </div>
        </main>

        {snaps.length > 0 && (
          <section className="order-2 lg:col-start-1">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-[#24342b]">
                Opgeslagen tijden
              </h2>
              <span className="text-sm font-bold text-[#848b85]">
                {snaps.length} {snaps.length === 1 ? "loper" : "lopers"}
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {snaps.map((snap) => (
                <article
                  key={snap.pos}
                  className="flex items-center gap-4 rounded-2xl border border-[#dedbd3] bg-white p-4 shadow-[0_8px_25px_rgba(43,52,47,0.04)]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f1ebff] text-4xl">
                    {snap.animal.emoji}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#969c97]">
                      Loper {snap.pos}
                    </p>
                    <h3 className="truncate text-lg font-black text-[#2a3830]">
                      {snap.animal.name}
                    </h3>
                    <p className="mt-0.5 font-mono text-sm font-bold text-[#6e786f]">
                      {formatSnapTime(snap.seconds)} · {Math.round(snap.speed)} km/u
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => playSound(snap.animal)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f4f1fa] text-sm transition hover:bg-[#e9e1f7]"
                    aria-label={`Speel geluid van ${snap.animal.name}`}
                  >
                    🔊
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        <aside className="order-3 rounded-[26px] border border-[#dedbd3] bg-white p-5 shadow-[0_10px_35px_rgba(40,48,43,0.05)] lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#979d98]">
                Snelheidsladder
              </p>
              <h2 className="mt-1 text-lg font-black text-[#26362d]">
                Van slak tot luipaard
              </h2>
            </div>
            <span className="text-2xl" aria-hidden="true">
              🏁
            </span>
          </div>
          <div className="mt-5 max-h-119 space-y-1.5 overflow-y-auto pr-1">
            {speeds.map((item) => {
              const active = item.name === animal.name;
              return (
                <div
                  key={item.name}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 transition ${
                    active
                      ? "bg-[#f0eaff] text-[#45336c] ring-1 ring-[#d9cbf3]"
                      : "text-[#68736d]"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f5f3ee] text-lg">
                    {item.emoji}
                  </span>
                  <span className="flex-1 text-sm font-bold">{item.name}</span>
                  <span className="text-xs font-extrabold text-[#929992]">
                    {item.speed} km/u
                  </span>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
      <section className="mt-6 rounded-[26px] border border-[#dedbd3] bg-white p-5">
        <h2 className="text-lg font-black text-[#26362d]">Variaties</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {assignments.map((assignment) => (
            <li key={assignment.title} className="rounded-xl bg-[#f5f3ee] p-4">
              <h3 className="text-sm font-black text-[#26362d]">{assignment.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#68736d]">{assignment.instruction}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function DistanceSlider({
  meters,
  setMeters,
}: {
  meters: number;
  setMeters: (meters: number) => void;
}) {
  return (
    <div className="relative mx-auto max-w-xl rounded-2xl border border-white/70 bg-white/55 px-4 py-3.5 backdrop-blur sm:px-5">
      <div className="mb-2.5 flex items-center justify-between">
        <label
          htmlFor="distance"
          className="text-xs font-black uppercase tracking-[0.12em] text-[#796b96]"
        >
          Loopafstand
        </label>
        <span className="rounded-lg bg-white px-2.5 py-1 text-sm font-black text-[#4e3e70] shadow-sm">
          {meters} m
        </span>
      </div>
      <input
        id="distance"
        type="range"
        min={5}
        max={200}
        step={5}
        value={meters}
        onChange={(event) => setMeters(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#d9cdf0] accent-[#745ba9]"
      />
      <div className="mt-1.5 flex justify-between text-[10px] font-bold text-[#9489a7]">
        <span>5 m</span>
        <span>200 m</span>
      </div>
    </div>
  );
}

function formatSnapTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
