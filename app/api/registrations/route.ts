import { randomUUID } from "node:crypto";
import { upcomingEvents } from "@/lib/multimove-events";
import { ownerHash, readRegistrations, RegistrationError, updateRegistrations, type Registration } from "@/lib/registrations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (data: unknown, status = 200) => Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
function token(request: Request) {
  const value = request.headers.get("x-helper-token") ?? "";
  return /^[a-f0-9-]{36}$/.test(value) ? value : "";
}
function publicData(records: Registration[], request: Request) {
  const owner = token(request) ? ownerHash(token(request)) : "";
  return { events: upcomingEvents(), registrations: records.map(({ id, date, name, owner: savedOwner }) => ({ id, date, name, mine: savedOwner === owner })) };
}
function failure(error: unknown) {
  if (error instanceof RegistrationError) return json({ error: error.message }, error.status);
  console.error("Registration storage failed", error instanceof Error ? error.message : "Unknown error");
  return json({ error: "Het bewaren of ophalen is niet gelukt. Probeer opnieuw." }, 503);
}
export async function GET(request: Request) {
  try { return json(publicData(await readRegistrations(), request)); } catch (error) { return failure(error); }
}
async function mutate(request: Request, cancel: boolean) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) throw new RegistrationError("Ongeldig verzoek.", 403);
    const key = token(request);
    if (!key) throw new RegistrationError("Vernieuw de pagina en probeer opnieuw.", 400);
    if (Number(request.headers.get("content-length")) > 2048) throw new RegistrationError("Ongeldig verzoek.", 400);
    const raw = await request.text();
    if (raw.length > 2048) throw new RegistrationError("Ongeldig verzoek.", 400);
    let body;
    try { body = JSON.parse(raw); } catch { throw new RegistrationError("Ongeldig verzoek.", 400); }
    if (!body || typeof body !== "object") throw new RegistrationError("Ongeldig verzoek.", 400);
    const owner = ownerHash(key);
    const records = await updateRegistrations(records => {
      if (cancel) {
        const existing = records.find(r => r.id === body.id);
        if (!existing || existing.owner !== owner) throw new RegistrationError("Je kunt alleen je eigen inschrijving annuleren op dit toestel.", 403);
        return records.filter(r => r.id !== existing.id);
      }
      const name = typeof body.name === "string" ? body.name.trim().replace(/\s+/g, " ") : "";
      if (!name || name.length > 80 || /[\u0000-\u001f\u007f]/.test(name)) throw new RegistrationError("Vul je naam in (maximaal 80 tekens).", 400);
      if (!upcomingEvents().includes(body.date)) throw new RegistrationError("Deze les is niet meer beschikbaar.", 400);
      const existing = records.find(r => r.date === body.date);
      if (existing?.owner === owner) return records;
      if (existing) throw new RegistrationError("Er heeft zich net iemand ingeschreven voor deze les. Kies gerust een andere maandag.", 409);
      return [...records, { id: randomUUID(), date: body.date, name, owner }];
    });
    return json(publicData(records, request));
  } catch (error) { return failure(error); }
}
export const POST = (request: Request) => mutate(request, false);
export const DELETE = (request: Request) => mutate(request, true);
