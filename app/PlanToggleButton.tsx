type PlanToggleButtonProps = {
  selected: boolean;
  label: string;
  onToggle: () => void;
  showText?: boolean;
};

export function PlanToggleButton({
  selected,
  label,
  onToggle,
  showText = false,
}: PlanToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border px-3 text-xs font-black shadow-sm transition focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#4f8062] ${
        selected
          ? "border-[#b7d3bf] bg-[#e7f3e9] text-[#28543a]"
          : "border-[#d9d6ce] bg-white text-[#657068]"
      } ${showText ? "" : "w-10 px-0"}`}
      aria-label={`${selected ? "Verwijder" : "Voeg"} ${label} ${
        selected ? "uit" : "toe aan"
      } de dagplanning`}
      aria-pressed={selected}
    >
      <span className="text-base leading-none" aria-hidden="true">
        {selected ? "✓" : "+"}
      </span>
      {showText && (
        <span>{selected ? "In dagplanning" : "Plan deze in"}</span>
      )}
    </button>
  );
}
