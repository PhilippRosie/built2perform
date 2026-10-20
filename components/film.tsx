"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KineticLines } from "@/components/kinetic";
import { Reveal } from "@/components/reveal";
import { Ticker } from "@/components/ticker";

gsap.registerPlugin(ScrollTrigger);

const SCENE_COUNT = 3;

const panels = [
  {
    index: "01",
    kicker: "Built2Boost",
    title: "Rabatthäftet.",
    body: "Vi fyller det med atraktiva lokala aktörer, föreningen säljer sitt eget rabatthäftet och slutkunden tjänar pengar på att använda det. Föreningen får 150 kronor för varje sålt häfte.",
    href: "#hafte",
    link: "Öppna häftet",
    image: "/media/boost-booklet.jpg",
    alt: "Ett Built2Boost-häfte hålls upp framför en väska och en flaska med samma märke.",
    contain: false,
  },
  {
    index: "02",
    kicker: "Aktörerna",
    title: "Från orten.",
    body: "Caféet, butiken, frisören, restaurangen. När häftet används stannar handeln runt föreningen, och slutkunden betalar mindre på ställen de redan går till.",
    href: "#aktorer",
    link: "Vilka som är med",
    image: "/media/orten.jpg",
    alt: "En kvällsgata med café, restaurang, frisör och butik.",
    contain: false,
    position: "object-[22%_center]",
  },
  {
    index: "03",
    kicker: "Slutkunden",
    title: "Plus.",
    body: "Efter en till tre kuponger har häftet betalat sig. Varje gång det används efter det är pengar tillbaka.",
    href: "#kund",
    link: "Se när det vänder",
    image: "/media/plus-cafe.jpg",
    alt: "En gäst räcker över en kupong i ett café och håller ett Built2Boost-häfte. På disken står kaffe och bakverk.",
    contain: false,
    position: "object-[center_42%]",
  },
];

export function Film() {
  const hero = useRef<HTMLElement>(null);
  const heroMedia = useRef<HTMLDivElement>(null);
  const heroCopy = useRef<HTMLDivElement>(null);
  const chain = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [cinematic, setCinematic] = useState(false);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ctx: gsap.Context | null = null;

    const setup = () => {
      ctx?.revert();
      ctx = null;
      const allowMotion = !motion.matches;
      const allowFilm = allowMotion;
      root.classList.toggle("cinematic", allowFilm);
      setCinematic(allowFilm);

      ctx = gsap.context(() => {
        if (allowMotion && hero.current && heroMedia.current && heroCopy.current && window.matchMedia("(min-width: 1024px)").matches) {
          gsap.fromTo(
            heroMedia.current,
            { yPercent: -4, scale: 1.08 },
            {
              yPercent: 12,
              scale: 1.16,
              ease: "none",
              scrollTrigger: {
                trigger: hero.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            },
          );
          gsap.to(heroCopy.current, {
            y: -48,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: hero.current,
              start: "center top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (allowFilm && chain.current && track.current) {
          const currentTrack = track.current;
          gsap.to(currentTrack, {
            x: () => -(currentTrack.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: chain.current,
              start: "top top",
              end: () => `+=${Math.max(0, currentTrack.scrollWidth - window.innerWidth)}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const next = Math.min(SCENE_COUNT - 1, Math.round(self.progress * (SCENE_COUNT - 1)));
                setIndex((current) => (current === next ? current : next));
              },
            },
          });
        }
      });

      ScrollTrigger.refresh();
    };

    setup();
    const onLoad = () => ScrollTrigger.refresh();
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", onResize);
    motion.addEventListener("change", setup);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
      motion.removeEventListener("change", setup);
      ctx?.revert();
      root.classList.remove("cinematic");
    };
  }, []);

  return (
    <>
      <section id="top" ref={hero} className="relative min-h-[100svh] overflow-hidden bg-ink lg:h-[100svh]">
        <div ref={heroMedia} className="hero-media absolute inset-x-0 -top-[8%] h-[120%]">
          <Image
            src="/media/hero-arenan.jpg"
            alt="Sex spelare med ryggen mot oss, armarna om varandra, framför strålkastarna på en fullsatt arena."
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-[center_58%]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(190,236,255,0.22),transparent_42%),linear-gradient(to_bottom,rgba(5,7,12,0.45)_0%,rgba(5,7,12,0.18)_30%,rgba(5,7,12,0.78)_68%,#05070c_100%)]" />
        </div>
        <div ref={heroCopy} className="hero-copy page-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-28 pt-24 sm:pb-16 sm:pt-24">
          <p className="hero-kicker rise text-[0.72rem] uppercase tracking-[0.46em] text-cyan">Built2Perform</p>
          <h1 className="hero-title rise rise-2 mt-3 max-w-5xl font-display font-semibold uppercase leading-[0.84] text-white">
            Tillsammans
            <br />
            <span className="ink-line">stärker vi</span>
            <br />
            föreningslivet<span className="text-cyan">.</span>
          </h1>
          <p className="rise rise-3 mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Vi skapar rabatthäftet. <span className="text-white">Bidrar till att stärka lokala handeln,</span> Slutkunden sparar massor med pengar,<span className="text-white"> föreningen får 150 kronor för varje häfte.</span>
          </p>
          <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#kedjan" className="bg-cyan px-5 py-3 text-center font-display text-xl uppercase tracking-[0.12em] text-ink transition hover:bg-white sm:text-left">
              Följ kedjan
            </a>
            <a href="#kalkyl-hafte" className="border border-white/30 px-5 py-3 text-center font-display text-xl uppercase tracking-[0.12em] text-white transition hover:border-cyan hover:text-cyan sm:text-left">
              Räkna på föreningen
            </a>
          </div>
        </div>
      </section>

      <Ticker text="Häfte · Kupong · Plus · Förening · Lokalt · Aktör · Grepp · Skydd" />

      <section className="page-x bg-ink py-24 sm:py-32">
        <Reveal>
          <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">Kedjan</p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold uppercase leading-none text-white">
            Så går
            <span className="line-soft">häftet</span>
            till<span className="text-cyan">.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-xl text-lg leading-8 text-mist">
            Vi bygger häftet utifrån föreningens önskemål. Föreningen säljer det. Aktörerna på orten är med.{" "}
            <span className="text-white">Slutkunden sparar massor med pengar.</span>
          </p>
        </Reveal>
      </section>

      <section id="kedjan" ref={chain} className="chain relative bg-ink" aria-label="Häftet, från föreningen till slutkunden">
        <div className="chain-viewport">
          <div ref={track} className="chain-track flex flex-col">
            {panels.map((panel) => (
              <article key={panel.index} className="chain-panel relative flex min-h-[100svh] w-full flex-col bg-ink lg:min-h-[92svh] lg:flex-row">
                <div className="chain-media relative min-h-[46vh] flex-1 bg-black lg:min-h-0">
                  <Image
                    src={panel.image}
                    alt={panel.alt}
                    fill
                    sizes="(min-width: 1024px) 54vw, 100vw"
                    className={`object-cover object-center ${"position" in panel && panel.position ? panel.position : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/20 lg:bg-gradient-to-r lg:from-transparent lg:via-ink/10 lg:to-ink" />
                </div>
                <div className="chain-copy page-x relative z-10 flex w-full flex-col justify-end py-12 lg:w-[46%] lg:justify-center lg:px-12 lg:py-16">
                  <p className="font-display text-5xl leading-none text-cyan">{panel.index}</p>
                  <p className="mt-4 text-[0.72rem] uppercase tracking-[0.36em] text-white/60">{panel.kicker}</p>
                  <h3 className="mt-3 font-display text-[clamp(2.6rem,8vw,3.75rem)] uppercase leading-[0.9] text-white">
                    <KineticLines text={panel.title} />
                  </h3>
                  <p className="mt-5 max-w-md text-base leading-7 text-mist">{panel.body}</p>
                  <a href={panel.href} className="mt-8 inline-flex font-display text-2xl uppercase tracking-[0.12em] text-cyan">
                    {panel.link}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
        {cinematic ? (
          <p className="scene-count pointer-events-none absolute bottom-6 right-8 z-20 hidden font-display text-2xl tracking-[0.18em] text-white/80">
            {String(index + 1).padStart(2, "0")} / 03
          </p>
        ) : null}
      </section>

      <section className="relative aspect-[1024/533] max-h-[78svh] w-full overflow-hidden bg-black" aria-label="Built2Boost, laget framför arenan">
        <Image
          src="/media/laget.jpg"
          alt="Ett lag med ryggen mot oss, i motljus på planen."
          fill
          sizes="100vw"
          className="object-cover object-[center_68%]"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <p className="page-x absolute inset-x-0 bottom-3 text-center font-display text-[clamp(2rem,8vw,3.75rem)] uppercase leading-none text-white sm:bottom-4 sm:text-left">
          Tillsammans är vi <span className="text-cyan">starkare.</span>
        </p>
      </section>
    </>
  );
}
