// Official calendar: https://www.vlaanderen.be/onderwijs-en-vorming/wat-mag-en-moet-op-school/schoolvakanties-vrije-dagen-en-afwezigheden/schoolvakanties
export const season = { start: "2026-09-07", end: "2027-05-31" };
const holidays = [
  ["2026-11-02", "2026-11-08"],
  ["2026-12-21", "2027-01-03"],
  ["2027-02-08", "2027-02-14"],
  ["2027-03-29", "2027-04-11"],
  ["2027-05-17", "2027-05-17"],
];

export function upcomingEvents(now = new Date()): string[] {
  const local = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/Brussels", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).format(now);
  const today = local.slice(0, 10);
  const events: string[] = [];
  for (const day = new Date(`${season.start}T12:00:00Z`); day.toISOString().slice(0, 10) <= season.end; day.setUTCDate(day.getUTCDate() + 7)) {
    const date = day.toISOString().slice(0, 10);
    if (date < today || (date === today && local.slice(11, 16) >= "17:20")) continue;
    if (!holidays.some(([start, end]) => date >= start && date <= end)) events.push(date);
  }
  return events;
}

export type PublicRegistration = { id: string; date: string; name: string; mine: boolean };
