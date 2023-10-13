"use client";

import { speeds } from "@/data/speeds";
import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";

type Snap = {
  seconds: number;
};

export default function Home() {
  const [meters, setMeters] = useState(50);
  const [snaps, setSnaps] = useState<Snap[]>([]);
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch();

  return (
    <main className="flex flex-col items-center w-full min-h-screen py-12 space-y-4">
      <Slider meters={meters} setMeters={setMeters} />
      <div className="flex px-4 justify-between">
        {speeds.map(({ name, speed, emoji }) => (
          <div
            key={name}
            className="w-4 h-4 md:w-6 md:h-6 flex flex-col items-center "
          >
            <div className="text-sm md:text-lg">{emoji}</div>
          </div>
        ))}
      </div>
      <div className="text-[80px] font-mono relative">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
        {isRunning && (
          <div className="absolute top-2 -right-8 text-sm">
            <button
              type="button"
              onClick={() => {
                reset(undefined, false);
                setSnaps([]);
              }}
              className="rounded-full w-8 h-8 bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="w-6 h-6 text-xl">↺</span>
            </button>
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={isRunning ? pause : start}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span className="-ml-0.5">{isRunning ? "⏸️" : "▶️"}</span>
          {isRunning ? "Pause" : totalSeconds ? "Continue" : "Play"}
        </button>
        <button
          type="button"
          onClick={() => {
            setSnaps([...snaps, { seconds: totalSeconds }]);
          }}
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span className="-ml-0.5">⏱️</span>Add time
        </button>
      </div>
      <div>
        {snaps.map((snap, i) => {
          const speed = meters / 1000 / (snap.seconds / 60 / 60);
          const nextIndex = speeds.findIndex((animal) => animal.speed > speed)!;
          const animal = speeds[nextIndex > 0 ? nextIndex - 1 : 0];
          return (
            <div key={i} className="flex items-center">
              <div>
                <div className="text-2xl items-end">#{i + 1} </div>
                <div className="text-xs">({Math.round(speed)} kmh)</div>
              </div>
              <div className="text-[140px]">{animal.emoji}</div>
            </div>
          );
        })}
        <div className="mx-auto w-fit mt-16">
          {!isRunning && !!totalSeconds && (
            <button
              type="button"
              onClick={() => {
                reset(undefined, false);
                setSnaps([]);
              }}
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="-ml-0.5">🔄</span>
              Reset
            </button>
          )}
        </div>
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
      <input
        id="small-range"
        type="range"
        step={5}
        value={meters}
        onChange={(e) => setMeters(parseInt(e.target.value, 10))}
        className="w-full h-1 accent-current bg-purple-400 rounded-lg appearance-none cursor-pointer range-sm"
      />
      <label
        htmlFor="small-range"
        className="w-12 block  ml-4 text-sm font-medium  dark:text-white"
      >
        {meters}m
      </label>
    </div>
  );
};
