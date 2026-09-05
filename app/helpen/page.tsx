import Link from "next/link"
import HelpCalendar from "./HelpCalendar"

export const metadata = { title: "Kom helpen · Mijn Multimove" }

export default function HelpPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
      <Link
        href="/"
        className="text-sm font-bold text-[#53695b] hover:underline"
      >
        ← Mijn Multimove
      </Link>
      <header className="relative mt-8 overflow-hidden rounded-3xl bg-[#203a2d] p-7 text-white sm:p-10">
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-5 rotate-12 text-[140px] opacity-15"
        >
          ✦
        </span>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f5c655]">
          Kleine moeite. Groot beweegplezier.
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          Een maandagheld gezocht!
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-[#dce7dc]">
          Een handje helpen, een balletje aangeven, een high five uitdelen. Met
          jouw hulp maken we van elke Multimove-les een feestje.
        </p>
        <p className="mt-6 font-bold text-[#f5c655]">
          Elke maandag · 17u20 – 18u30
        </p>
        <p className="mt-2 text-sm text-[#dce7dc]">
          Tot en met 31 mei 2027 · Geen les tijdens schoolvakanties en op
          feestdagen.
        </p>
      </header>
      <HelpCalendar />
    </main>
  )
}
