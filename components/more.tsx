import Link from "next/link";
import { Reveal } from "@/components/reveal";

const marks = [
  {
    name: "Built2Print",
    href: "/print",
    kicker: "Profilering och tryck",
    title: "Föreningens namn, på det som syns.",
    body: "Kläder, skyltar, beachflags och rollups. Från matchtröjan till det som står utanför hallen.",
    link: "Öppna Built2Print",
  },
  {
    name: "Skånetaxen",
    href: "/skanetaxen",
    kicker: "Premium",
    title: "Ett märke föreningen kan sälja.",
    body: "Strumpor och underkläder i ett eget premiumvarumärke. Föreningen säljer det, och tjänar pengar på det.",
    link: "Öppna Skånetaxen",
  },
];

export function More() {
  return (
    <section id="mer" className="relative scroll-mt-28 overflow-hidden bg-ink py-24 sm:py-32">
      <div className="stroke-run" aria-hidden="true">
        <p className="stroke-text font-display text-[22vw] font-semibold uppercase leading-none">Mer</p>
        <p className="stroke-text font-display text-[22vw] font-semibold uppercase leading-none">Mer</p>
      </div>
      <div className="page-x relative">
        <Reveal>
          <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">Föreningen</p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(3.2rem,7vw,6.4rem)] font-semibold uppercase leading-[0.86] text-white">
            Mer kraft
            <span className="line-soft">till</span>
            föreningen<span className="text-cyan">.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-mist">
            Häftet och sportartiklarna är redan med. <span className="text-white">Här finns också tryck och profilering, och ett premiumvarumärke föreningen kan sälja.</span>
          </p>
        </Reveal>
        <Reveal stagger className="mt-16">
        <div className="grid gap-px bg-white/10 lg:grid-cols-2">
          {marks.map((mark) => (
            <article key={mark.name} className="bg-ink p-8 sm:p-12">
              <p className="font-display text-4xl uppercase leading-none text-cyan sm:text-5xl">{mark.name}</p>
              <p className="mt-6 text-[0.72rem] uppercase tracking-[0.32em] text-white/55">{mark.kicker}</p>
              <h3 className="mt-3 font-display text-4xl uppercase leading-[0.9] text-white sm:text-5xl">
                {mark.title.replace(/[.]$/, "")}
                <span className="text-cyan">.</span>
              </h3>
              <p className="mt-5 max-w-md text-base leading-7 text-mist">{mark.body}</p>
              <Link href={mark.href} className="mt-8 inline-flex font-display text-2xl uppercase tracking-[0.12em] text-cyan">
                {mark.link}
              </Link>
            </article>
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
