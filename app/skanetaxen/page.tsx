import type { Metadata } from "next";
import Image from "next/image";
import { HomeStage } from "@/components/home-stage";
import { Reveal } from "@/components/reveal";
import { Team } from "@/components/team";
import { Ticker } from "@/components/ticker";

export const metadata: Metadata = {
  title: "Skånetaxen",
  description: "Skånetaxen är premiumkläder som föreningen säljer och tjänar pengar på. Sortimentet har t-shirt, sweatshirt, hoodie och mössa.",
};

const beanies = [
  {
    src: "/media/skanetaxen-mossa-ljus.jpg",
    alt: "Gräddvit stickad mössa med en svart skinnlapp där Skånetaxen-taxen är präglad.",
    label: "Vit mössa",
  },
  {
    src: "/media/skanetaxen-mossa-ljus-tofs.jpg",
    alt: "Gräddvit mössa med tofs och en svart skinnlapp där Skånetaxen-taxen är präglad.",
    label: "Vit mössa med tofs",
  },
  {
    src: "/media/skanetaxen-mossa-svart-ny.jpg",
    alt: "Svart stickad mössa med en mörk skinnlapp där Skånetaxen-taxen är präglad.",
    label: "Svart mössa",
  },
  {
    src: "/media/skanetaxen-mossa-svart-tofs.jpg",
    alt: "Svart mössa med tofs och en mörk skinnlapp där Skånetaxen-taxen är präglad.",
    label: "Svart mössa med tofs",
  },
];

const garments = [
  {
    src: "/media/skanetaxen-jacka-fram-2.jpg",
    alt: "Gräddvit jacka framifrån, utan sidofickor, med dragkedja och Skånetaxen broderat på ärmen.",
    label: "Jacka",
  },
  {
    src: "/media/skanetaxen-jacka-rygg.jpg",
    alt: "Gräddvit jacka bakifrån, med Skånetaxen-taxen broderad över ryggen.",
    label: "Jacka, rygg",
  },
  {
    src: "/media/skanetaxen-hoodie-fram-2.jpg",
    alt: "Beige hoodie utan känguruficka, med en liten vit Skånetaxen-tax på huvan och märket broderat på ärmen.",
    label: "Hoodie",
  },
];

const worn = [
  {
    src: "/media/skanetaxen-hoodie-4.jpg",
    alt: "En kvinna i beige hoodie utan känguruficka, med Skånetaxen-taxen på huvan och händerna i framfickorna, i höstljus vid en sjö.",
    label: "Hoodie",
    frame: "aspect-[4/5]",
  },
  {
    src: "/media/skanetaxen-skogen-3.jpg",
    alt: "Ett par i höstskog. Hon i gräddvit teddyjacka och mössa med tofs, han i svart mössa, beige hoodie och mörk väst.",
    label: "I skogen",
    frame: "aspect-[4/5]",
  },
  {
    src: "/media/skanetaxen-bordet-2.jpg",
    alt: "En person i beige hoodie och mössa med tofs sitter vid ett träbord vid sjön, med en kopp i handen.",
    label: "Vid bordet",
    frame: "aspect-[3/2]",
  },
  {
    src: "/media/skanetaxen-armen.jpg",
    alt: "Närbild på en beige hoodie med Skånetaxen broderat på ärmen, och en gräddvit mössa med svart skinnlapp på ett träbord.",
    label: "På ärmen",
    frame: "aspect-[3/2]",
  },
];

const points = [
  {
    n: "01",
    title: "Märket",
    body: "Taxen, kvarnen och Skåne. Ett märke som känns valt, inte påhängt.",
  },
  {
    n: "02",
    title: "Föreningen säljer",
    body: "Till medlemmar, föräldrar och folk runt laget. Samma närhet som häftet, ett annat märke.",
  },
  {
    n: "03",
    title: "Förtjänsten",
    body: "Varje såld produkt ger föreningen en intäkt. Hur mycket bestäms i avtalet, inte här på sidan.",
  },
];

export default function SkanetaxenPage() {
  return (
    <HomeStage>
      <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink lg:h-[100svh]">
        <div className="hero-media absolute inset-x-0 -top-[8%] h-[120%]">
          <Image
            src="/media/skanetaxen-jacka.jpg"
            alt="En person bakifrån i en gräddvit jacka med Skånetaxen broderat över ryggen, vid en sjö i kvällsljus."
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_32%]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(231,220,200,0.16),transparent_42%),linear-gradient(to_bottom,rgba(5,7,12,0.45)_0%,rgba(5,7,12,0.18)_30%,rgba(5,7,12,0.78)_68%,#05070c_100%)]" />
        </div>
        <div className="hero-copy page-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-28 pt-24 lg:pb-16 lg:pt-24">
          <p className="hero-kicker rise text-[0.72rem] uppercase tracking-[0.46em] text-[#e7dcc8]">Skånetaxen</p>
          <h1 className="hero-title rise rise-2 mt-3 max-w-5xl font-display font-semibold uppercase leading-[0.84] text-white">
            <span className="ink-line">Ett märke</span>
            <br />
            <span className="ink-line">föreningen</span>
            <br />
            kan sälja<span className="text-[#e7dcc8]">.</span>
          </h1>
          <p className="rise rise-3 mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Premiumkläder med ett eget märke. <span className="text-white">Föreningen säljer dem och tjänar pengar på varje plagg.</span>
          </p>
          <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#kollektion"
              className="bg-[#e7dcc8] px-5 py-3 text-center font-display text-xl uppercase tracking-[0.12em] text-ink transition hover:bg-white sm:text-left"
            >
              Se kollektionen
            </a>
            <a
              href="#kontakt"
              className="border border-white/30 px-5 py-3 text-center font-display text-xl uppercase tracking-[0.12em] text-white transition hover:border-[#e7dcc8] hover:text-[#e7dcc8] sm:text-left"
            >
              Skriv till oss
            </a>
          </div>
        </div>
      </section>

      <section id="inledning" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-ink text-center">
        <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
          <Ticker cover text="Skånetaxen · T-shirt · Sweatshirt · Hoodie · Mössa · Premium · Förening · " accent="text-[#e7dcc8]" />
        </div>
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[78%] w-[min(56rem,92vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(5,7,12,0.82)_0%,rgba(5,7,12,0.45)_46%,transparent_74%)]" />
        <div className="page-x relative z-10 flex max-w-4xl flex-col items-center">
          <Reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-[#e7dcc8]">Märket</p>
            <h2 className="mt-6 font-display text-[clamp(3.4rem,16vw,8.6rem)] font-semibold uppercase leading-[0.82] text-white">
              <span className="ink-line">Laget kan</span>
              <span className="mt-[0.12em] block">
                bära det<span className="text-[#e7dcc8]">.</span>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-mist sm:text-xl">
              Skånetaxen är ett eget premiummärke. <span className="text-white">Föreningen säljer det till medlemmar och runt laget, och behåller förtjänsten.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section id="kollektion" className="bg-ink">
        <div className="page-x flex min-h-0 flex-col justify-center gap-2.5 pt-16 pb-24 lg:min-h-[70vh] lg:gap-4 lg:py-16">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-[#e7dcc8]">Kollektionen</p>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,6.4vw,4rem)] font-semibold uppercase leading-none text-white">
              Mössa, jacka och hoodie<span className="text-[#e7dcc8]">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
            <figure className="relative col-span-2 aspect-[16/10] bg-[#efe6da] lg:col-span-1 lg:aspect-square">
              <Image src={garments[0].src} alt={garments[0].alt} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover object-[center_30%]" />
              <figcaption className="absolute bottom-3 left-3 bg-ink/80 px-3 py-2 text-[0.65rem] uppercase tracking-[0.18em] text-[#e7dcc8]">{garments[0].label}</figcaption>
            </figure>
            {garments.slice(1).map((item) => (
              <figure key={item.src} className="relative aspect-[5/4] bg-[#efe6da] lg:aspect-square">
                <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-center" />
                <figcaption className="absolute bottom-3 left-3 bg-ink/80 px-2.5 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-[#e7dcc8]">{item.label}</figcaption>
              </figure>
            ))}
            {beanies.map((beanie) => (
              <figure key={beanie.src} className="relative aspect-[4/3] bg-[#efe6da] lg:aspect-square">
                <Image src={beanie.src} alt={beanie.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                <figcaption className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] bg-ink/80 px-2 py-1 text-[0.55rem] uppercase leading-tight tracking-[0.12em] text-[#e7dcc8] lg:bottom-3 lg:left-3 lg:px-2.5 lg:py-1.5 lg:text-[0.62rem]">
                  {beanie.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="bars" className="bg-ink">
        <div className="page-x flex min-h-[70vh] flex-col justify-center gap-3 py-8 lg:gap-4 lg:py-16">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-[#e7dcc8]">Så bärs det</p>
            <h2 className="mt-2 font-display text-[clamp(2rem,7vw,4rem)] font-semibold uppercase leading-none text-white">
              På riktigt<span className="text-[#e7dcc8]">.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-3">
            {worn.map((shot) => (
              <figure key={shot.src} className="relative aspect-[4/5] bg-[#efe6da]">
                <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                <figcaption className="absolute bottom-3 left-3 bg-ink/80 px-2.5 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-[#e7dcc8]">
                  {shot.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="forjanst" className="overflow-hidden bg-ink">
        <div className="forjanst-layout grid h-full min-h-[100svh] grid-rows-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:min-h-0 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:grid-rows-1">
          <div className="relative min-h-0 lg:order-2">
            <Image
              src="/media/skanetaxen-sjon-3.jpg"
              alt="Två personer vid en sjö i kvällsljus. Hon har beige hoodie och mössa med tofs, han en gräddvit jacka med Skånetaxen broderat på ryggen."
              fill
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover object-[center_32%] lg:object-[center_40%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,12,0.08)_0%,transparent_28%,rgba(5,7,12,0.55)_78%,#05070c_100%)] lg:bg-[linear-gradient(to_left,transparent_40%,rgba(5,7,12,0.35)_72%,#05070c_100%)]" />
          </div>
          <div className="page-x flex min-h-0 flex-col justify-center overflow-hidden pb-20 pt-1 lg:order-1 lg:justify-center lg:px-10 lg:py-10">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[#e7dcc8]">Förtjänsten</p>
            <h2 className="mt-2 max-w-xl font-display text-[clamp(1.7rem,6vw,3.4rem)] font-semibold uppercase leading-[0.92] text-white">
              Premium, för föreningen
              <span className="text-[#e7dcc8]">.</span>
            </h2>
            <ol className="mt-4 grid gap-3 lg:mt-6 lg:gap-4">
              {points.map((point) => (
                <li key={point.n}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-xl text-[#e7dcc8] lg:text-2xl">{point.n}</span>
                    <h3 className="font-display text-xl uppercase leading-none text-white lg:text-2xl">{point.title}</h3>
                  </div>
                  <p className="mt-1 max-w-xl text-sm leading-5 text-mist">{point.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Team />
    </HomeStage>
  );
}
