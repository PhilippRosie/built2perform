"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Logo } from "@/components/logo";

type NavLink = { href: string; label: string; id?: string };

const brandLinks: NavLink[] = [
  { href: "/", label: "Built2Boost - Häften" },
  { href: "/produkter", label: "Built2Perform - Produkter" },
];

const homeLinks: NavLink[] = [
  { href: "/print", label: "Profilering" },
  { href: "/skanetaxen", label: "Skånetaxen" },
  { href: "/#kontakt", id: "kontakt", label: "Kontakt" },
];

const printSections: NavLink[] = [
  { href: "#inledning", id: "inledning", label: "Trycket" },
  { href: "#kedjan", id: "kedjan", label: "Kedjan" },
  { href: "#sortiment", id: "sortiment", label: "Sortiment" },
];

const taxenSections: NavLink[] = [
  { href: "#inledning", id: "inledning", label: "Märket" },
  { href: "#kollektion", id: "kollektion", label: "Kollektionen" },
];

const pageSections: Record<string, NavLink[]> = {
  "/print": printSections,
  "/skanetaxen": taxenSections,
};

function GlassMenu({
  href,
  label,
  sections,
  hidden,
  active = false,
  layout = "row",
  currentPath,
  onNavigate,
}: {
  href?: string;
  label: string;
  sections: NavLink[];
  hidden: boolean;
  active?: boolean;
  layout?: "row" | "column";
  currentPath?: string;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, id?: string) => void;
}) {
  const frame = useRef<HTMLDivElement | null>(null);
  const cap = useRef<HTMLDivElement | null>(null);

  const fit = () => {
    const box = frame.current;
    const word = cap.current;
    if (!box || !word) return;
    const width = box.offsetWidth;
    const height = box.offsetHeight;
    if (!width || !height) return;
    const side = Math.max(0, (width - word.offsetWidth) / 2);
    const neck = word.offsetHeight;
    const radius = Math.min(4, side, neck / 2, (height - neck) / 2);
    const path = [
      `M${side + radius} 0`,
      `H${width - side - radius}`,
      `Q${width - side} 0 ${width - side} ${radius}`,
      `V${neck - radius}`,
      `Q${width - side} ${neck} ${width - side + radius} ${neck}`,
      `H${width - radius}`,
      `Q${width} ${neck} ${width} ${neck + radius}`,
      `V${height - radius}`,
      `Q${width} ${height} ${width - radius} ${height}`,
      `H${radius}`,
      `Q0 ${height} 0 ${height - radius}`,
      `V${neck + radius}`,
      `Q0 ${neck} ${radius} ${neck}`,
      `H${side - radius}`,
      `Q${side} ${neck} ${side} ${neck - radius}`,
      `V${radius}`,
      `Q${side} 0 ${side + radius} 0`,
      "Z",
    ].join(" ");
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'><path fill='black' d='${path}'/></svg>`;
    const mask = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    box.style.maskImage = mask;
    box.style.webkitMaskImage = mask;
    box.style.maskSize = "100% 100%";
    box.style.webkitMaskSize = "100% 100%";
    box.style.maskRepeat = "no-repeat";
    box.style.webkitMaskRepeat = "no-repeat";
  };

  useLayoutEffect(() => {
    fit();
    const observer = new ResizeObserver(fit);
    if (frame.current) observer.observe(frame.current);
    if (cap.current) observer.observe(cap.current);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, [label, sections, hidden]);

  const labelClass = `relative z-20 text-[0.72rem] uppercase leading-none tracking-[0.12em] transition hover:text-cyan ${href || active ? "text-cyan" : "text-white/75"}`;

  return (
    <div className="relative mx-4">
      {href ? (
        <Link href={href} aria-current="page" className={labelClass}>
          {label}
        </Link>
      ) : (
        <button type="button" aria-expanded={!hidden} aria-controls="tjana-pengar" className={labelClass}>
          {label}
        </button>
      )}
      <div
        id={href ? undefined : "tjana-pengar"}
        ref={frame}
        className={`absolute left-1/2 top-0 z-10 flex w-max -translate-x-1/2 -translate-y-1 flex-col items-center bg-ink/20 shadow-[0_8px_24px_rgba(60,228,244,0.18)] backdrop-blur-xl transition-opacity duration-200 ${hidden ? "pointer-events-none opacity-0" : "pointer-events-auto"}`}
        style={{
          filter:
            "drop-shadow(0.6px 0 0 rgba(60,228,244,0.65)) drop-shadow(-0.6px 0 0 rgba(60,228,244,0.65)) drop-shadow(0 0.6px 0 rgba(60,228,244,0.65)) drop-shadow(0 -0.6px 0 rgba(60,228,244,0.65))",
        }}
      >
        <div ref={cap} className="px-4 py-1">
          <span
            className="text-[0.72rem] uppercase leading-none tracking-[0.12em]"
            style={{ visibility: "hidden" }}
            aria-hidden="true"
          >
            {label}
          </span>
        </div>
        <div className={`flex whitespace-nowrap px-6 py-3 ${layout === "column" ? "flex-col items-center gap-3 text-center" : "items-center gap-5"}`}>
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              onClick={(event) => onNavigate(event, section.id)}
              aria-current={section.href === currentPath ? "page" : undefined}
              className={`pointer-events-auto uppercase leading-none transition hover:text-cyan ${layout === "column" ? "text-[0.72rem] tracking-[0.12em]" : "text-[0.68rem] tracking-[0.14em]"} ${section.href === currentPath ? "text-cyan" : "text-white/60"}`}
            >
              {section.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


export function Nav() {
  const pathname = usePathname();
  const lenis = useLenis();
  const bar = useRef<HTMLDivElement>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [earnOpen, setEarnOpen] = useState(false);
  const earn = useRef<HTMLDivElement>(null);
  const sections = pageSections[pathname];
  const links = homeLinks;
  const earning = pathname === "/" || pathname === "/produkter";
  const onHome = pathname === "/";
  const partnerHref = pathname === "/print" || pathname === "/skanetaxen" || pathname === "/produkter" || pathname === "/" ? "#kontakt" : "/#kontakt";

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
    setEarnOpen(false);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!earnOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!earn.current?.contains(event.target as Node)) setEarnOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEarnOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [earnOpen]);

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
    lenis?.start();
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
      <div className={`relative z-50 grid grid-cols-[1fr_auto_1fr] items-center px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 lg:px-12 ${sections ? "lg:pb-16" : ""}`}>
        <Link href="/" onClick={home} aria-label="Built2Perform, till startsidan" className="relative z-10 justify-self-start">
          <Logo compact alt="" />
        </Link>
        <nav className="relative z-10 hidden items-center gap-8 lg:flex" aria-label="Sektioner">
          <div
            ref={earn}
            className="relative z-30"
            onMouseEnter={() => setEarnOpen(true)}
            onMouseLeave={() => setEarnOpen(false)}
          >
            <GlassMenu
              label="Tjäna pengar"
              sections={brandLinks}
              hidden={!earnOpen}
              active={earning || earnOpen}
              layout="column"
              currentPath={pathname}
              onNavigate={(event, id) => {
                setEarnOpen(false);
                if (id) go(event, id);
              }}
            />
          </div>
          {links.map((link) => {
            const current = link.href === pathname;
            if (sections && link.href === pathname) {
              return (
                <GlassMenu
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  sections={sections}
                  hidden={earnOpen}
                  onNavigate={go}
                />
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(event) => go(event, link.id)}
                aria-current={current ? "page" : undefined}
                className={`text-[0.72rem] uppercase tracking-[0.12em] transition hover:text-cyan ${current ? "text-cyan" : "text-white/75"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="relative z-10 col-start-3 flex items-center justify-self-end">
          <Link
            href={partnerHref}
            onClick={(event) => go(event, "kontakt")}
            className="hidden bg-cyan px-4 py-2 font-display text-lg uppercase tracking-[0.14em] text-ink transition hover:bg-white lg:inline-flex"
          >
            Bli partner
          </Link>
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
      </div>
      {open ? (
        <div
          id="mobilmeny"
          role="dialog"
          aria-modal="true"
          aria-label="Meny"
          className="fixed inset-0 z-40 flex flex-col justify-end overflow-y-auto bg-ink px-6 pb-[max(4rem,env(safe-area-inset-bottom))] pt-28 lg:hidden"
        >
          <nav className="flex flex-col gap-3" aria-label="Sektioner">
            <div>
              <p className="font-display text-[clamp(2.4rem,12vw,3.75rem)] uppercase leading-[0.9] text-white">Tjäna pengar</p>
              <div className="mt-3 flex flex-col gap-2 pl-1">
                {brandLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`text-lg uppercase tracking-[0.14em] ${pathname === link.href ? "text-cyan" : "text-white/70"}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            {links.map((link) =>
              sections && link.href === pathname ? (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current="page"
                    className="font-display text-[clamp(2.4rem,12vw,3.75rem)] uppercase leading-[0.9] text-cyan"
                  >
                    {link.label}
                  </Link>
                  <div className="mt-3 flex flex-col gap-2 pl-1">
                    {sections.map((section) => (
                      <Link
                        key={section.href}
                        href={section.href}
                        onClick={(event) => go(event, section.id)}
                        className="text-lg uppercase tracking-[0.14em] text-white/70"
                      >
                        {section.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(event) => go(event, link.id)}
                  className="font-display text-[clamp(2.4rem,12vw,3.75rem)] uppercase leading-[0.9] text-white"
                >
                  {link.label}
                </Link>
              ),
            )}
            <Link
              href={partnerHref}
              onClick={(event) => go(event, "kontakt")}
              className="mt-4 inline-flex w-fit bg-cyan px-4 py-2 font-display text-lg uppercase tracking-[0.14em] text-ink"
            >
              Bli partner
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
