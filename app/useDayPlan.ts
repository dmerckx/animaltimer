"use client";

import { useSessionStorageValue } from "@/app/useSessionStorage";

export type DayPlanItem = {
  type: "exercise" | "station";
  id: string;
};

export const dayPlanStorageKey = "multimove:day-plan";

function parseItems(value: string | null): DayPlanItem[] {
  try {
    const items = JSON.parse(value ?? "[]");
    if (!Array.isArray(items)) return [];

    return items.filter(
      (item): item is DayPlanItem =>
        typeof item === "object" &&
        item !== null &&
        (item.type === "exercise" || item.type === "station") &&
        typeof item.id === "string",
    );
  } catch {
    return [];
  }
}

export function useDayPlan() {
  const [storedItems, setStoredItems] =
    useSessionStorageValue(dayPlanStorageKey);
  const items = parseItems(storedItems);

  const isPlanned = (type: DayPlanItem["type"], id: string) =>
    items.some((item) => item.type === type && item.id === id);

  const toggleItem = (type: DayPlanItem["type"], id: string) => {
    const alreadyPlanned = isPlanned(type, id);
    const nextItems = alreadyPlanned
      ? items.filter((item) => !(item.type === type && item.id === id))
      : [...items, { type, id }];
    setStoredItems(JSON.stringify(nextItems));
  };

  return { items, isPlanned, toggleItem };
}

export function encodeDayPlan(items: DayPlanItem[]) {
  return items
    .map((item) => `${item.type === "exercise" ? "e" : "s"}:${item.id}`)
    .join(",");
}

export function decodeDayPlan(value: string) {
  const seen = new Set<string>();

  return value
    .split(",")
    .slice(0, 50)
    .flatMap<DayPlanItem>((part) => {
      const match = /^([es]):([a-z0-9-]+)$/.exec(part);
      if (!match) return [];

      const item: DayPlanItem = {
        type: match[1] === "e" ? "exercise" : "station",
        id: match[2],
      };
      const key = `${item.type}:${item.id}`;
      if (seen.has(key)) return [];
      seen.add(key);
      return [item];
    });
}
