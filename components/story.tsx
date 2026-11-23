"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { KineticLines } from "@/components/kinetic";
import { Reveal } from "@/components/reveal";
import { Ticker } from "@/components/ticker";

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
  scenes,
}: StoryProps) {
  const [index, setIndex] = useState(0);
  const [cinematic, setCinematic] = useState(false);
  const count = scenes.length;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setCinematic(!motion.matches);
    apply();
    const onChain = (event: Event) => {
      const next = (event as CustomEvent<number>).detail;
      if (typeof next === "number") setIndex(next);
    };
    motion.addEventListener("change", apply);
    window.addEventListener("chain-index", onChain);
    return () => {
      motion.removeEventListener("change", apply);
      window.removeEventListener("chain-index", onChain);
    };
  }, []);

  const total = String(count).padStart(2, "0");

  return (
    <>
      <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink lg:h-[100svh]">
        <div className={`hero-media absolute ${heroFrame}`}>
          <Image src={heroImage} alt={heroAlt} fill priority sizes="100vw" className={`object-cover ${heroPosition}`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(190,236,255,0.22),transparent_42%),linear-gradient(to_bottom,rgba(5,7,12,0.45)_0%,rgba(5,7,12,0.18)_30%,rgba(5,7,12,0.78)_68%,#05070c_100%)]" />
        </div>
        <div className="hero-copy page-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-28 pt-24 lg:pb-16 lg:pt-24">
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

      <section id="inledning" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink text-center">
        <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
          <Ticker cover text={marquee} />
        </div>
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[78%] w-[min(56rem,92vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(5,7,12,0.82)_0%,rgba(5,7,12,0.45)_46%,transparent_74%)]" />
        <div className="page-x relative z-10 flex max-w-4xl flex-col items-center">
          <Reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">{introKicker}</p>
            <h2 className="mt-6 font-display text-[clamp(3.4rem,16vw,8.6rem)] font-semibold uppercase leading-[0.82] text-white">
              <KineticLines text={introTitle} />
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-mist sm:text-xl">{introBody}</p>
          </Reveal>
        </div>
      </section>

      <section id="kedjan" className="chain relative bg-ink" aria-label={chainLabel}>
        <div className="chain-viewport">
          <div className="chain-track flex flex-col">
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
                    <p className="mt-8 font-display text-xl tracking-[0.18em] text-white/70 lg:hidden">
                      {scene.index} / {total}
                    </p>
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
          <p className="scene-count pointer-events-none absolute right-8 z-20 hidden font-display text-2xl tracking-[0.18em] text-white/80 lg:block">
            {String(index + 1).padStart(2, "0")} / {total}
          </p>
        ) : null}
      </section>

    </>
  );
}
