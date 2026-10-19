export function KineticLines({ text }: { text: string }) {
  const lines = text.split("\n");

  return lines.map((line, index) => {
    const mark = line.match(/[.?!]$/)?.[0];
    const word = mark ? line.slice(0, -1) : line;
    const outline = lines.length > 1 && index < lines.length - 1;

    return (
      <span key={`${index}-${word}`} className={outline ? "ink-line" : undefined}>
        {index > 0 ? <br /> : null}
        {word}
        {mark ? <span className="text-cyan">{mark}</span> : null}
      </span>
    );
  });
}
