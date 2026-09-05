"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PublicRegistration } from "@/lib/multimove-events";

type Calendar = { events: string[]; registrations: PublicRegistration[] };
const dateLabel = (date: string) => new Intl.DateTimeFormat("nl-BE", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
const button = "rounded-xl bg-[#294e38] px-5 py-3 text-sm font-bold text-white hover:bg-[#1b3826] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#294e38]";

export default function HelpCalendar() {
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [storageWarning, setStorageWarning] = useState(false);
  const token = useRef("");
  const signup = useRef<HTMLDialogElement>(null);
  const celebration = useRef<HTMLDialogElement>(null);
  const cancellation = useRef<HTMLDialogElement>(null);
  const [toCancel, setToCancel] = useState<PublicRegistration | null>(null);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/registrations", { cache: "no-store", headers: { "x-helper-token": token.current } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setCalendar(data);
      setError("");
    } catch (error) { setError(error instanceof Error ? error.message : "Ophalen is niet gelukt."); }
  }, []);

  useEffect(() => {
    let mounted = true;
    // Read browser-only storage after hydration, including when storage is blocked.
    queueMicrotask(() => {
      if (!mounted) return;
    try {
      const saved = localStorage.getItem("multimove:helper-token");
      token.current = saved && /^[a-f0-9-]{36}$/.test(saved) ? saved : crypto.randomUUID();
      localStorage.setItem("multimove:helper-token", token.current);
      setName(localStorage.getItem("multimove:helper-name") ?? "");
    } catch {
      token.current ||= crypto.randomUUID();
      setStorageWarning(true);
    }
    void refresh();
    });
    const onFocus = () => { void refresh(); };
    window.addEventListener("focus", onFocus);
    return () => { mounted = false; window.removeEventListener("focus", onFocus); };
  }, [refresh]);

  async function save(cancel = false) {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/registrations", {
        method: cancel ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json", "x-helper-token": token.current },
        body: JSON.stringify(cancel ? { id: toCancel?.id } : { date: selected, name }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 409) await refresh();
        throw new Error(data.error);
      }
      setCalendar(data);
      if (cancel) {
        cancellation.current?.close();
        setNotice("Je inschrijving is geannuleerd. Bedankt om het te laten weten!");
      } else {
        try { localStorage.setItem("multimove:helper-name", name.trim()); } catch { setStorageWarning(true); }
        signup.current?.close();
        celebration.current?.showModal();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Bewaren is niet gelukt. Probeer opnieuw.");
    } finally { setBusy(false); }
  }

  return (
    <section className="mt-10" aria-labelledby="calendar-title">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div><h2 id="calendar-title" className="text-2xl font-black">Wie helpt er mee?</h2><p className="mt-2 text-sm text-[#68766d]">Eén helper per les. Kies gerust meerdere maandagen.</p></div>
        {calendar && <span className="rounded-full bg-[#e7eddf] px-4 py-2 text-xs font-bold">{calendar.events.filter(date => !calendar.registrations.some(r => r.date === date)).length} vrije plekjes</span>}
      </div>
      {storageWarning && <p className="mb-4 rounded-xl bg-amber-100 p-4 text-sm">Je browser kan je naam en inschrijvingen niet onthouden. Annuleren kan dan alleen zolang deze pagina open blijft.</p>}
      {error && <div role="alert" className="mb-4 rounded-xl bg-red-50 p-4 text-red-800">{error} <button onClick={() => void refresh()} className="font-bold underline">Opnieuw proberen</button></div>}
      <p role="status" className="mb-4 text-sm text-[#294e38]">{notice}</p>
      {!calendar ? <p role="status">De maandagen worden opgehaald…</p> : calendar.events.length === 0 ? <p className="rounded-2xl bg-white p-8">Alle lessen van dit seizoen zijn voorbij. Bedankt aan alle helpers!</p> : (
        <ul className="space-y-3">
          {calendar.events.map(date => {
            const registration = calendar.registrations.find(r => r.date === date);
            return <li key={date} className="flex flex-col gap-4 rounded-2xl border border-[#dedfd5] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div aria-hidden="true" className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl ${registration ? "bg-[#e9efdf]" : "bg-[#fff0da]"}`}><span className="text-[10px] font-black uppercase">ma</span><span className="text-xl font-black">{Number(date.slice(8))}</span></div>
                <div><h3 className="font-bold">{dateLabel(date)}</h3><p className="mt-1 text-sm text-[#68766d]">17u20 – 18u30</p><p className={`mt-1 text-sm ${registration ? "text-[#35603e]" : "text-[#9b5136]"}`}>{registration ? `♥ ${registration.name} helpt mee${registration.mine ? " (jij!)" : ""}` : "Nog een held nodig"}</p></div>
              </div>
              {!registration ? <button className={button} onClick={() => { setSelected(date); setError(""); signup.current?.showModal(); }}>Ik kom helpen</button> : registration.mine ? <button className="rounded-xl px-4 py-3 text-sm font-bold text-[#68766d] underline hover:text-red-700" onClick={() => { setToCancel(registration); setError(""); cancellation.current?.showModal(); }}>Inschrijving annuleren</button> : <span className="text-sm font-bold text-[#35603e]">Helper gevonden ✓</span>}
            </li>;
          })}
        </ul>
      )}
      <p className="mt-6 text-xs leading-5 text-[#68766d]">Je naam is zichtbaar bij de les. We onthouden je naam op dit toestel, zodat je vlot meerdere plekjes kunt kiezen. Hier kun je ook je eigen inschrijving annuleren.</p>

      <dialog ref={signup} className="helper-dialog" onCancel={event => { if (busy) event.preventDefault(); }}>
        <form onSubmit={event => { event.preventDefault(); void save(); }}>
          <p className="text-3xl" aria-hidden="true">🙌</p><h2 className="mt-3 text-2xl font-black">Fijn dat je komt helpen!</h2>
          <p className="mt-3 text-sm text-[#68766d]">{selected && dateLabel(selected)} · 17u20 – 18u30</p>
          <label htmlFor="helper-name" className="mt-6 block text-sm font-bold">Je naam</label>
          <input autoFocus id="helper-name" autoComplete="name" required maxLength={80} value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-[#aab5ab] p-3" placeholder="Bijvoorbeeld: Sofie" />
          {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
          <div className="mt-6 flex flex-wrap gap-3"><button disabled={busy || !name.trim()} className={button}>{busy ? "Even bewaren…" : "Ik ben erbij!"}</button><button type="button" disabled={busy} onClick={() => signup.current?.close()} className="px-4 py-3 text-sm font-bold">Terug</button></div>
        </form>
      </dialog>
      <dialog ref={cancellation} className="helper-dialog" onCancel={event => { if (busy) event.preventDefault(); }}>
        <h2 className="text-2xl font-black">Toch verhinderd?</h2><p className="mt-4">Je plekje op {toCancel && dateLabel(toCancel.date)} komt weer vrij.</p>
        {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
        <div className="mt-6 flex flex-wrap gap-3"><button disabled={busy} className={button} onClick={() => void save(true)}>{busy ? "Even bewaren…" : "Ja, annuleren"}</button><button disabled={busy} className="px-4 py-3 text-sm font-bold" onClick={() => cancellation.current?.close()}>Ik blijf helpen</button></div>
      </dialog>
      <dialog ref={celebration} className="helper-dialog hero-party text-center">
        <div aria-hidden="true" className="hero-sparks">✦ ✧ ★ ✦ ✧</div>
        <div aria-hidden="true" className="hero-animal"><span className="hero-cape" />🦸<span className="hero-pop">POW!</span></div>
        <h2 className="hero-title mt-6 text-4xl font-black">Jij bent een held!</h2>
        <p className="mt-4 text-[#68766d]">{name.trim()}, je staat op de lijst.<br />Je superkracht? Er gewoon zijn.</p>
        <p className="mt-3 text-sm font-bold">Cape optioneel. High fives verplicht. 🙌</p>
        <button autoFocus className={`${button} mt-7`} onClick={() => celebration.current?.close()}>Op naar de volgende maandag!</button>
      </dialog>
    </section>
  );
}
