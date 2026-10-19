export function Ticker({ text }: { text: string }) {
  const parts = text.split("·").map((part) => part.trim()).filter(Boolean);

  return (
    <div className="overflow-hidden border-y border-white/10 bg-ink py-4" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <p key={copy} className="flex items-baseline font-display text-2xl uppercase tracking-[0.28em]">
            {parts.map((part, index) => (
              <span key={`${copy}-${index}`} className="px-4">
                <span className={index % 3 === 1 ? "text-cyan" : "text-white/65"}>{part}</span>
                <span className="pl-4 text-white/25">·</span>
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}
