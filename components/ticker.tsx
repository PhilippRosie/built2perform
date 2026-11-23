export function Ticker({ text, accent = "text-cyan", cover = false }: { text: string; accent?: string; cover?: boolean }) {
  const parts = text.split("·").map((part) => part.trim()).filter(Boolean);
  const rows = cover ? 12 : 1;

  return (
    <div
      className={cover ? "flex h-full w-full flex-col justify-center overflow-hidden bg-ink" : "overflow-hidden border-y border-white/10 bg-ink py-4"}
      style={cover ? { gap: "0.06em" } : undefined}
      aria-hidden="true"
    >
      {Array.from({ length: rows }, (_, row) => (
        <div
          key={row}
          className="marquee-track flex w-max"
          style={cover ? { animationDuration: `${110 + row * 8}s`, animationDirection: row % 2 ? "reverse" : "normal" } : undefined}
        >
          {[0, 1].map((copy) => (
            <p
              key={copy}
              className={cover ? "flex items-baseline font-display font-semibold uppercase" : "flex items-baseline font-display text-2xl uppercase tracking-[0.28em]"}
              style={cover ? { fontSize: "clamp(2.6rem, 9.4vh, 7.2rem)", lineHeight: 0.9, letterSpacing: "0.08em" } : undefined}
            >
              {parts.map((part, index) => (
                <span key={`${copy}-${index}`} className="px-4">
                  <span className={index % 3 === 1 ? accent : "text-white/65"}>{part}</span>
                  <span className="pl-4 text-white/25">·</span>
                </span>
              ))}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
