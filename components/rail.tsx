"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

type Chapter = { id: string; label: string };

const rails: Record<string, { accent: string; chapters: Chapter[] }> = {
  "/": {
    accent: "bg-cyan",
    chapters: [
      { id: "top", label: "Planen" },
      { id: "kedjan", label: "Häftet" },
      { id: "kund", label: "Plus" },
      { id: "produkter", label: "Produkter" },
      { id: "mer", label: "Mer" },
      { id: "kontakt", label: "Kontakt" },
    ],
  },
  "/print": {
    accent: "bg-cyan",
    chapters: [
      { id: "top", label: "Namnet" },
      { id: "inledning", label: "Trycket" },
      { id: "kedjan", label: "Kedjan" },
      { id: "sortiment", label: "Sortiment" },
      { id: "kontakt", label: "Kontakt" },
    ],
  },
  "/skanetaxen": {
    accent: "bg-[#e7dcc8]",
    chapters: [
      { id: "top", label: "Märket" },
      { id: "inledning", label: "Bära" },
      { id: "kollektion", label: "Kollektion" },
      { id: "bars", label: "Stilen" },
      { id: "forjanst", label: "Förtjänst" },
      { id: "kontakt", label: "Kontakt" },
    ],
  },
};

const emptyChapters: Chapter[] = [];

function currentChapter(chapters: Chapter[]) {
  const mark = window.innerHeight * 0.4;
  let current = chapters[0]?.id ?? "";
  for (const chapter of chapters) {
    const node = document.getElementById(chapter.id);
    if (!node) continue;
    if (node.getBoundingClientRect().top <= mark) current = chapter.id;
  }
  return current;
}

export function Rail() {
  const pathname = usePathname();
  const rail = rails[pathname];
  const chapters = rail?.chapters ?? emptyChapters;
  const accent = rail?.accent ?? "bg-cyan";
  const [active, setActive] = useState(chapters[0]?.id ?? "");

  const update = useCallback(() => {
    if (!chapters.length) return;
    const next = currentChapter(chapters);
    setActive((prev) => (prev === next ? prev : next));
  }, [chapters]);

  const lenis = useLenis(update, [pathname]);

  useEffect(() => {
    setActive(chapters[0]?.id ?? "");
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, chapters]);

  function go(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else target.scrollIntoView();
  }

  if (!rail) return null;

  const label = chapters.find((chapter) => chapter.id === active)?.label;

  return (
    <>
      <nav className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block" aria-label="Avsnitt">
        <ol className="flex flex-col gap-3">
          {chapters.map((chapter) => {
            const current = active === chapter.id;
            return (
              <li key={chapter.id}>
                <Link href={`#${chapter.id}`} onClick={(event) => go(event, chapter.id)} aria-current={current ? "true" : undefined} className="group flex items-center gap-3">
                  <span className={`block h-px transition-all ${current ? `w-10 ${accent}` : "w-5 bg-white/35 group-hover:w-8 group-hover:bg-white"}`} />
                  <span className="text-[0.65rem] uppercase tracking-[0.22em] text-transparent group-hover:text-white">{chapter.label}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] xl:hidden" aria-label="Avsnitt">
        <ol className="flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-ink/75 px-4 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
          <li className="whitespace-nowrap font-display text-[0.72rem] uppercase tracking-[0.18em] text-white/80" aria-hidden>
            {label}
          </li>
          <li className="h-3 w-px shrink-0 bg-white/15" aria-hidden />
          {chapters.map((chapter) => {
            const current = active === chapter.id;
            return (
              <li key={chapter.id}>
                <Link href={`#${chapter.id}`} onClick={(event) => go(event, chapter.id)} aria-current={current ? "true" : undefined} className="flex h-6 items-center px-0.5">
                  <span className={`block rounded-full transition-all ${current ? `h-px w-5 ${accent}` : "h-1 w-1 bg-white/40"}`} />
                  <span className="sr-only">{chapter.label}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
