"use client";

import { speeds } from "@/data/speeds";
import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";

type Animal = (typeof speeds)[number];

type Snap = {
  pos: number;
  seconds: number;
  speed: number;
  animal: Animal;
};

export default function Home() {
  const [meters, setMeters] = useState(50);
  const [snaps, setSnaps] = useState<Snap[]>([]);
  const { totalSeconds, seconds, minutes, isRunning, start, pause, reset } =
    useStopwatch();

  const speed = meters / 1000 / (totalSeconds / 60 / 60);
  const nextIndex = speeds.findIndex((animal) => animal.speed > speed)!;
  const animal =
    nextIndex === -1
      ? speeds[speeds.length - 1]
      : speeds[nextIndex > 0 ? nextIndex - 1 : 0];

  return (
    <main className="pl-10 flex flex-col items-center w-full min-h-screen py-8">
      <div className="fixed top-0 bottom-0 left-0 py-8 px-2 bg-purple-200/50">
        <div className="w-full h-full relative flex flex-col-reverse justify-between">
          {speeds.map(({ name, emoji }) => {
            const active = name === animal.name;
            return (
              <div
                key={name}
                className={
                  "w-6 h-6 md:w-6 md:h-6 flex justify-center flex-col items-center rounded-full" +
                  (active ? " bg-purple-400" : "bg-purple-400")
                }
              >
                <div className="text-sm md:text-lg">{emoji}</div>
              </div>
            );
          })}
        </div>
      </div>
      <Slider meters={meters} setMeters={setMeters} />
      <div className="text-[80px] font-mono relative mt-4">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
        {(isRunning || totalSeconds > 0) && (
          <div className="absolute top-2 -right-8 text-sm">
            <button
              type="button"
              onClick={() => {
                reset(undefined, false);
                setSnaps([]);
              }}
              className="rounded-full flex items-center justify-center w-8 h-8 bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="w-6 h-6 text-xl mb-1">↺</span>
            </button>
          </div>
        )}
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          type="button"
          onClick={isRunning ? pause : start}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span className="-ml-0.5">{isRunning ? "⏸️" : "▶️"}</span>
          {isRunning ? "Pause" : totalSeconds ? "Continue" : "Start"}
        </button>
        <button
          type="button"
          onClick={() => {
            setSnaps([
              { seconds: totalSeconds, animal, speed, pos: snaps.length + 1 },
              ...snaps,
            ]);
          }}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span className="-ml-0.5">⏱️</span>Add time
        </button>
      </div>
      <div>
        {snaps.map((snap, i) => {
          return (
            <div key={i} className="flex items-center">
              <div>
                <div className="text-2xl items-end font-bold">
                  ⏱️#{snap.pos}
                </div>
                <div className="text-xs">{snap.animal.name}</div>
                {isFinite(snap.speed) && (
                  <div className="text-xs">({Math.round(snap.speed)} kmh)</div>
                )}
              </div>
              <div className="text-[130px] md:text-[140px]">
                {snap.animal.emoji}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

const Snap: React.FC = () => {
  return <div></div>;
};

const Slider: React.FC<{
  meters: number;
  setMeters: (meters: number) => void;
}> = ({ meters, setMeters }) => {
  return (
    <div className="flex items-center justify-center text-purple-900">
      <label
        htmlFor="small-range"
        className="block ml-4 text-sm font-medium dark:text-white pr-4"
      >
        Afstand:
      </label>
      <input
        id="small-range"
        type="range"
        step={5}
        value={meters}
        onChange={(e) => setMeters(parseInt(e.target.value, 10))}
        className="flex-1 h-1 accent-current bg-purple-400 rounded-lg appearance-none cursor-pointer range-sm"
      />
      <div className="w-12 block  ml-4 text-sm font-medium  dark:text-white">
        {meters}m
      </div>
    </div>
  );
};
