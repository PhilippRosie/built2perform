"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";

const chapters = [
  { id: "top", label: "Planen" },
  { id: "kedjan", label: "Häftet" },
  { id: "kund", label: "Plus" },
  { id: "produkter", label: "Produkter" },
  { id: "mer", label: "Mer" },
  { id: "kontakt", label: "Kontakt" },
];

function currentChapter() {
  const mark = window.innerHeight * 0.4;
  let current = chapters[0].id;
  for (const chapter of chapters) {
    const node = document.getElementById(chapter.id);
    if (!node) continue;
    if (node.getBoundingClientRect().top <= mark) current = chapter.id;
  }
  return current;
}

export function Rail() {
  const [active, setActive] = useState("top");

  const update = useCallback(() => {
    const next = currentChapter();
    setActive((prev) => (prev === next ? prev : next));
  }, []);

  const lenis = useLenis(update, []);

  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function go(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else target.scrollIntoView();
  }

  return (
    <nav className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block" aria-label="Avsnitt">
      <ol className="flex flex-col gap-3">
        {chapters.map((chapter) => {
          const current = active === chapter.id;
          return (
            <li key={chapter.id}>
              <Link href={`/#${chapter.id}`} onClick={(event) => go(event, chapter.id)} className="group flex items-center gap-3">
                <span className={`block h-px transition-all ${current ? "w-10 bg-cyan" : "w-5 bg-white/35 group-hover:w-8 group-hover:bg-white"}`} />
                <span className={`text-[0.65rem] uppercase tracking-[0.22em] text-transparent group-hover:text-white`}>
                  {chapter.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
