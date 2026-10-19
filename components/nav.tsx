"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Logo } from "@/components/logo";

type NavLink = { href: string; label: string; id?: string };

const homeLinks: NavLink[] = [
  { href: "/#kedjan", id: "kedjan", label: "Häfte" },
  { href: "/#produkter", id: "produkter", label: "Produkter" },
  { href: "/print", label: "Profilering" },
  { href: "/skanetaxen", label: "Skånetaxen" },
  { href: "/#kontakt", id: "kontakt", label: "Kontakt" },
];

const pageLinks: Record<string, NavLink[]> = {
  "/print": [
    { href: "#inledning", id: "inledning", label: "Trycket" },
    { href: "#kedjan", id: "kedjan", label: "Kedjan" },
    { href: "#sortiment", id: "sortiment", label: "Sortiment" },
    { href: "#kontakt", id: "kontakt", label: "Kontakt" },
    { href: "/skanetaxen", label: "Skånetaxen" },
  ],
  "/skanetaxen": [
    { href: "#inledning", id: "inledning", label: "Märket" },
    { href: "#kedjan", id: "kedjan", label: "Kedjan" },
    { href: "#kontakt", id: "kontakt", label: "Kontakt" },
    { href: "/print", label: "Profilering" },
  ],
};

export function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const bar = useRef<HTMLDivElement>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const links = pageLinks[pathname] ?? homeLinks;
  const onHome = pathname === "/";

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        setSolid(window.scrollY > 24);
        if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  function go(event: React.MouseEvent<HTMLAnchorElement>, id?: string) {
    setOpen(false);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else target.scrollIntoView();
  }

  function home(event: React.MouseEvent<HTMLAnchorElement>) {
    setOpen(false);
    if (!onHome) return;
    event.preventDefault();
    const target = document.getElementById("top");
    if (target && lenis) lenis.scrollTo(target, { offset: 0 });
    else window.scrollTo(0, 0);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`pointer-events-none absolute inset-0 ${solid || open ? "bg-ink/85 backdrop-blur-md" : ""}`} />
      <div ref={bar} className="relative z-50 h-px origin-left scale-x-0 bg-cyan" />
      <div className="relative z-50 flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" onClick={home} aria-label="Built2Perform, till startsidan">
          <Logo compact alt="" />
        </Link>
        <nav className="hidden shrink-0 items-center lg:flex" aria-label="Sektioner">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(event) => go(event, link.id)}
              className={`text-[0.72rem] uppercase tracking-[0.12em] text-white/75 transition hover:text-cyan ${index > 0 ? "ml-8" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          {onHome ? (
            <Link
              href="/#kontakt"
              onClick={(event) => go(event, "kontakt")}
              className="ml-8 bg-cyan px-4 py-2 font-display text-lg uppercase tracking-[0.14em] text-ink transition hover:bg-white"
            >
              Bli partner
            </Link>
          ) : null}
        </nav>
        <button
          type="button"
          className="font-display text-xl uppercase tracking-[0.16em] lg:hidden"
          aria-expanded={open}
          aria-controls="mobilmeny"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Stäng" : "Meny"}
        </button>
      </div>
      {open ? (
        <div
          id="mobilmeny"
          role="dialog"
          aria-modal="true"
          aria-label="Meny"
          className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-16 pt-28 lg:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Sektioner">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => go(event, link.id)}
                className="font-display text-5xl uppercase leading-[0.9] text-white sm:text-6xl"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
