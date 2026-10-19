import Image from "next/image";
import { BookletCalculator } from "@/components/calculator";
import { Reveal } from "@/components/reveal";
import { Savings } from "@/components/savings";

const steps = [
  {
    n: "01",
    title: "Vi bygger häftet",
    body: "Lokala aktörer, rabatter som går att använda, och föreningens namn på omslaget.",
  },
  {
    n: "02",
    title: "Föreningen säljer",
    body: "Till medlemmar, föräldrar och folk i närområdet. Inte via en anonym webbshop.",
  },
  {
    n: "03",
    title: "Kunden går plus",
    body: "En till tre kuponger, så har häftet betalat sig. Resten är pengar tillbaka.",
  },
  {
    n: "04",
    title: "Föreningen får",
    body: "150 kronor per sålt häfte. Rakt in i föreningen, varje gång.",
  },
];

const actors = [
  {
    title: "Café och mat",
    body: "Stället efter matchen och före träningen. Där föräldrarna redan står i kö.",
  },
  {
    title: "Sport och hälsa",
    body: "Butik, fysio, gym. Sånt laget använder på riktigt, inte bara i en kampanj.",
  },
  {
    title: "Vardag",
    body: "Frisör, verkstad, service. Det man ändå köper, fast nu med föreningen i ryggen.",
  },
  {
    title: "Kväll",
    body: "Restaurang och ställen på orten. Handlarna som känner namnen i laget.",
  },
];

export function Boost() {
  return (
    <section id="hafte" className="relative overflow-hidden bg-ink py-24 sm:py-32">
      <div className="stroke-run" aria-hidden="true">
        <p className="stroke-text font-display text-[22vw] font-semibold uppercase leading-none">Boost</p>
        <p className="stroke-text font-display text-[22vw] font-semibold uppercase leading-none">Boost</p>
      </div>
      <div className="page-x relative">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">Built2Boost</p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold uppercase leading-none text-white">
              Häftet
              <span className="line-soft">som föreningen</span>
              säljer<span className="text-cyan">.</span>
            </h2>
          </Reveal>
          <Reveal delay={140} className="lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-8 text-mist">
              Built2Boost är rabatthäftet. Vi bygger det utifrån föreningens önskemål och fyller det med aktörer från orten.{" "}
              <span className="text-white">Efter en till tre kuponger har slutkunden gått plus.</span> Föreningen får 150 kronor för varje häfte.
            </p>
          </Reveal>
        </div>

        <Reveal stagger className="mt-16">
          <ol className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.n} className="bg-ink p-6">
                <span className="font-display text-4xl text-cyan">{step.n}</span>
                <h3 className="mt-4 font-display text-3xl uppercase leading-none text-white">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-mist">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <div id="aktorer" className="scroll-mt-28 mt-28 grid items-center gap-10 lg:grid-cols-12 lg:gap-0">
          <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[520px]">
            <Image
              src="/media/aktor-cafe.jpg"
              alt="En barista räcker över en kaffe på ett café, den sortens lokala aktör som finns i häftet."
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-[68%_center]"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#05070c_0%,transparent_34%)] lg:bg-[linear-gradient(to_right,transparent_68%,#05070c_100%)]" />
          </div>
          <div className="relative z-10 lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">Aktörerna i häftet</p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] text-white sm:text-7xl">
                Lokala aktörer<span className="text-cyan">.</span>
                <span className="mt-2 block text-[0.62em] text-white/75">
                  Riktig handel<span className="text-cyan">.</span>
                </span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-lg leading-8 text-mist">
                De får synlighet rakt in i föreningens nätverk. Föräldrar, spelare, ledare. Inte en annons som scrollas förbi.{" "}
                <span className="text-white">Ett häfte som ligger i jackfickan och används på vägen hem.</span>
              </p>
            </Reveal>
            <Reveal stagger className="mt-8">
              <ul className="grid gap-4 sm:grid-cols-2">
                {actors.map((actor) => (
                  <li key={actor.title} className="border border-white/10 p-5">
                    <h3 className="font-display text-2xl uppercase text-white">{actor.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-mist">{actor.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <p className="mt-6 text-sm text-mist">
              Vi tar med aktörer som finns där medlemmarna redan rör sig. Häftet ska gynna handeln runt föreningen.
            </p>
          </div>
        </div>

        <Savings />

        <div className="mt-16">
          <BookletCalculator />
        </div>
      </div>
    </section>
  );
}
