"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KineticLines } from "@/components/kinetic";
import { Reveal } from "@/components/reveal";
import { Ticker } from "@/components/ticker";

gsap.registerPlugin(ScrollTrigger);

export type Scene = {
  index: string;
  kicker: string;
  title: string;
  body: string;
  href?: string;
  link?: string;
  image?: string;
  alt?: string;
  position?: string;
};

type StoryProps = {
  kicker: string;
  title: string;
  lead: string;
  marquee: string;
  introKicker: string;
  introTitle: string;
  introBody: string;
  chainLabel: string;
  heroImage: string;
  heroAlt: string;
  heroPosition?: string;
  heroFrame?: string;
  heroStill?: boolean;
  scenes: Scene[];
  closeImage: string;
  closeAlt: string;
  closeLine: string;
};

export function Story({
  kicker,
  title,
  lead,
  marquee,
  introKicker,
  introTitle,
  introBody,
  chainLabel,
  heroImage,
  heroAlt,
  heroPosition = "object-center",
  heroFrame = "inset-x-0 -top-[8%] h-[120%]",
  heroStill = false,
  scenes,
  closeImage,
  closeAlt,
  closeLine,
}: StoryProps) {
  const hero = useRef<HTMLElement>(null);
  const heroMedia = useRef<HTMLDivElement>(null);
  const heroCopy = useRef<HTMLDivElement>(null);
  const chain = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [cinematic, setCinematic] = useState(false);
  const count = scenes.length;

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
        if (allowMotion && hero.current && heroMedia.current && heroCopy.current) {
          gsap.fromTo(
            heroMedia.current,
            heroStill ? { yPercent: 0, scale: 1 } : { yPercent: -4, scale: 1.08 },
            {
              yPercent: heroStill ? 4 : 12,
              scale: heroStill ? 1.03 : 1.16,
              ease: "none",
              scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: true },
            },
          );
          gsap.to(heroCopy.current, {
            y: -48,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: { trigger: hero.current, start: "center top", end: "bottom top", scrub: true },
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
                const next = Math.min(count - 1, Math.round(self.progress * (count - 1)));
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
  }, [count]);

  const total = String(count).padStart(2, "0");

  return (
    <>
      <section ref={hero} className="relative min-h-[100svh] overflow-hidden bg-ink lg:h-[100svh]">
        <div ref={heroMedia} className={`absolute ${heroFrame}`}>
          <Image src={heroImage} alt={heroAlt} fill priority sizes="100vw" className={`object-cover ${heroPosition}`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(190,236,255,0.22),transparent_42%),linear-gradient(to_bottom,rgba(5,7,12,0.45)_0%,rgba(5,7,12,0.18)_30%,rgba(5,7,12,0.78)_68%,#05070c_100%)]" />
        </div>
        <div ref={heroCopy} className="page-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-28 pt-24 sm:pb-16 sm:pt-24">
          <p className="hero-kicker rise text-[0.72rem] uppercase tracking-[0.46em] text-cyan">{kicker}</p>
          <h1 className="hero-title rise rise-2 mt-3 max-w-5xl font-display font-semibold uppercase leading-[0.84] text-white">
            <KineticLines text={title} />
          </h1>
          <p className="rise rise-3 mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">{lead}</p>
          <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#kedjan" className="bg-cyan px-5 py-3 text-center font-display text-xl uppercase tracking-[0.12em] text-ink transition hover:bg-white sm:text-left">
              Följ kedjan
            </a>
            <Link
              href="#kontakt"
              className="border border-white/30 px-5 py-3 text-center font-display text-xl uppercase tracking-[0.12em] text-white transition hover:border-cyan hover:text-cyan sm:text-left"
            >
              Skriv till oss
            </Link>
          </div>
        </div>
      </section>

      <Ticker text={marquee} />

      <section id="inledning" className="page-x scroll-mt-28 bg-ink py-24 sm:py-32">
        <Reveal>
          <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">{introKicker}</p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold uppercase leading-[0.86] text-white">
            <KineticLines text={introTitle} />
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-xl text-lg leading-8 text-mist">{introBody}</p>
        </Reveal>
      </section>

      <section id="kedjan" ref={chain} className="chain relative bg-ink" aria-label={chainLabel}>
        <div className="chain-viewport">
          <div ref={track} className="chain-track flex flex-col">
            {scenes.map((scene) =>
              scene.image ? (
                <article key={scene.index} className="chain-panel relative flex min-h-[100svh] w-full flex-col bg-ink lg:min-h-[92svh] lg:flex-row">
                  <div className="chain-media relative min-h-[46vh] flex-1 bg-black lg:min-h-0">
                    <Image src={scene.image} alt={scene.alt ?? ""} fill sizes="(min-width: 1024px) 54vw, 100vw" className={`object-cover ${scene.position ?? "object-center"}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/20 lg:bg-gradient-to-r lg:from-transparent lg:via-ink/10 lg:to-ink" />
                  </div>
                  <div className="chain-copy page-x relative z-10 flex w-full flex-col justify-end py-12 lg:w-[46%] lg:justify-center lg:px-12 lg:py-16">
                    <p className="font-display text-5xl leading-none text-cyan">{scene.index}</p>
                    <p className="mt-4 text-[0.72rem] uppercase tracking-[0.36em] text-white/60">{scene.kicker}</p>
                    <h3 className="mt-3 font-display text-[clamp(2.6rem,8vw,3.75rem)] uppercase leading-[0.9] text-white">
                      <KineticLines text={scene.title} />
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-7 text-mist">{scene.body}</p>
                    {scene.href && scene.link ? (
                      <Link href={scene.href} className="mt-8 inline-flex font-display text-2xl uppercase tracking-[0.12em] text-cyan">
                        {scene.link}
                      </Link>
                    ) : null}
                  </div>
                </article>
              ) : (
                <article key={scene.index} className="chain-panel relative flex min-h-[100svh] w-full flex-col bg-ink lg:min-h-[92svh]">
                  <div className="chain-copy page-x relative z-10 flex w-full flex-col justify-end py-12 lg:justify-center lg:px-16 lg:py-16">
                    <p className="font-display text-5xl leading-none text-cyan">{scene.index}</p>
                    <p className="mt-4 text-[0.72rem] uppercase tracking-[0.36em] text-white/60">{scene.kicker}</p>
                    <h3 className="mt-3 font-display text-[clamp(2.6rem,8vw,3.75rem)] uppercase leading-[0.9] text-white lg:mt-4 lg:text-[clamp(4.2rem,12vw,9rem)] lg:leading-[0.82]">
                      <KineticLines text={scene.title} />
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-7 text-mist lg:mt-6 lg:max-w-lg">{scene.body}</p>
                    {scene.href && scene.link ? (
                      <Link href={scene.href} className="mt-8 inline-flex font-display text-2xl uppercase tracking-[0.12em] text-cyan">
                        {scene.link}
                      </Link>
                    ) : null}
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
        {cinematic ? (
          <p className="scene-count pointer-events-none absolute right-8 z-20 font-display text-2xl tracking-[0.18em] text-white/80">
            {String(index + 1).padStart(2, "0")} / {total}
          </p>
        ) : null}
      </section>

      <section className="relative h-[78svh] overflow-hidden bg-black">
        <Image src={closeImage} alt={closeAlt} fill sizes="100vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
        <p className="page-x absolute inset-x-0 bottom-10 font-display text-[clamp(2rem,8vw,3.75rem)] uppercase leading-none text-white">
          {closeLine.replace(/[.]$/, "")}
          <span className="text-cyan">.</span>
        </p>
      </section>
    </>
  );
}
