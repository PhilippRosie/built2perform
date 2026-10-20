import type { Metadata } from "next";
import Image from "next/image";
import { Contact } from "@/components/contact";
import { KineticLines } from "@/components/kinetic";
import { Reveal } from "@/components/reveal";
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
    src: "/media/skanetaxen-jacka-fram.jpg",
    alt: "Gräddvit jacka framifrån, med dragkedja och Skånetaxen broderat på ärmen.",
    label: "Jacka",
  },
  {
    src: "/media/skanetaxen-jacka-rygg.jpg",
    alt: "Gräddvit jacka bakifrån, med Skånetaxen-taxen broderad över ryggen.",
    label: "Jacka, rygg",
  },
  {
    src: "/media/skanetaxen-hoodie-fram.jpg",
    alt: "Beige hoodie med en liten vit Skånetaxen-tax på huvan och märket broderat på ärmen.",
    label: "Hoodie",
  },
];

const worn = [
  {
    src: "/media/skanetaxen-hoodie.jpg",
    alt: "En person i en beige hoodie med Skånetaxen-taxen på huvan, händerna i fickan, höstljus vid en sjö.",
    label: "Hoodie",
    frame: "aspect-[4/5]",
  },
  {
    src: "/media/skanetaxen-skogen-2.jpg",
    alt: "Två personer i höstskog. Hon i gräddvit teddyjacka och mössa med tofs, han i svart mössa, beige hoodie och mörk väst.",
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
    <>
      <section id="top" className="grid min-h-[100svh] bg-ink lg:h-[100svh] lg:grid-cols-2">
        <div className="page-x relative z-10 order-2 flex flex-col justify-end pb-28 pt-12 sm:pt-16 lg:order-1 lg:justify-center lg:py-16 lg:pb-16 lg:pt-28">
          <p className="hero-kicker rise text-[0.72rem] uppercase tracking-[0.46em] text-[#e7dcc8]">Skånetaxen</p>
          <h1 className="hero-title rise rise-2 mt-3 max-w-full font-display font-semibold uppercase leading-[0.84] text-white sm:max-w-5xl">
            <KineticLines text={"Ett märke\nföreningen\nkan sälja."} />
          </h1>
          <p className="rise rise-3 mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Premiumkläder med ett eget märke. Föreningen säljer dem och tjänar pengar på varje plagg.
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
        <div className="relative order-1 min-h-[78svh] lg:order-2 lg:min-h-0">
          <Image
            src="/media/skanetaxen-jacka.jpg"
            alt="En person bakifrån i en gräddvit jacka med Skånetaxen broderat över ryggen, vid en sjö i kvällsljus."
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[center_32%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,12,0.55)_0%,transparent_22%),linear-gradient(to_top,#05070c_0%,transparent_24%)] lg:bg-[linear-gradient(to_right,#05070c_0%,transparent_16%)]" />
        </div>
      </section>

      <Ticker text="Skånetaxen · T-shirt · Sweatshirt · Hoodie · Mössa · Premium · Förening · " accent="text-[#e7dcc8]" />

      <section id="inledning" className="relative scroll-mt-28 overflow-hidden bg-ink">
        <div className="page-x relative z-10 flex min-h-[70vh] items-center py-24 sm:py-32 lg:max-w-[46rem]">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-[#e7dcc8]">Märket</p>
            <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold uppercase leading-none text-white">
              Laget kan
              <span className="line-soft">bära</span>
              det<span className="text-[#e7dcc8]">.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-mist">
              Skånetaxen är ett eget premiummärke. <span className="text-white">Föreningen säljer det till medlemmar och runt laget, och behåller förtjänsten.</span>
            </p>
          </div>
        </div>
        <div aria-hidden className="pointer-events-none relative z-0 h-44 sm:h-56 lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[72%]">
          <Image
            src="/media/skanetaxen-tax.png"
            alt=""
            width={1024}
            height={602}
            className="absolute right-0 top-1/2 h-full w-auto max-w-none -translate-y-1/2 translate-x-[25%] mix-blend-screen opacity-[0.12] lg:h-[86%]"
          />
        </div>
      </section>

      <section id="kollektion" className="scroll-mt-28 bg-ink">
        <div className="page-x pb-10 pt-4 sm:pb-14">
          <Reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-[#e7dcc8]">Kollektionen</p>
            <h2 className="mt-4 max-w-full font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold uppercase leading-[0.92] text-white sm:max-w-4xl sm:leading-none">
              Stilen
              <span className="line-soft">du vill bära</span>
              märket alla pratar om<span className="text-[#e7dcc8]">.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-3 px-3 sm:grid-cols-2 sm:gap-4 sm:px-4 lg:grid-cols-4">
          {beanies.map((beanie) => (
            <figure key={beanie.src} className="relative aspect-[4/5] bg-[#efe6da]">
              <Image src={beanie.src} alt={beanie.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              <figcaption className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] bg-ink/80 px-3 py-2 text-[0.65rem] uppercase leading-tight tracking-[0.18em] text-[#e7dcc8] sm:text-[0.72rem] sm:tracking-[0.28em]">
                {beanie.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 px-3 sm:mt-4 sm:grid-cols-3 sm:gap-4 sm:px-4">
          {garments.map((item) => (
            <figure key={item.src} className="relative aspect-[4/5] bg-[#efe6da]">
              <Image src={item.src} alt={item.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover object-center" />
              <figcaption className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] bg-ink/80 px-3 py-2 text-[0.65rem] uppercase leading-tight tracking-[0.18em] text-[#e7dcc8] sm:text-[0.72rem] sm:tracking-[0.28em]">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="bars" className="scroll-mt-28">
        <div className="page-x pb-8 pt-16 sm:pt-20">
          <p className="text-[0.72rem] uppercase tracking-[0.42em] text-[#e7dcc8]">Så bärs det</p>
        </div>
        <div className="grid grid-cols-1 gap-3 px-3 sm:gap-4 sm:px-4 md:grid-cols-2">
          {worn.map((shot) => (
            <figure key={shot.src} className={`relative bg-[#efe6da] ${shot.frame}`}>
              <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              <figcaption className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] bg-ink/80 px-3 py-2 text-[0.65rem] uppercase leading-tight tracking-[0.18em] text-[#e7dcc8] sm:text-[0.72rem] sm:tracking-[0.28em]">
                {shot.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="relative mt-3 aspect-[16/9] overflow-hidden bg-black sm:mt-4" aria-label="Skånetaxen vid sjön i kvällsljus">
        <Image
          src="/media/skanetaxen-sjon-2.jpg"
          alt="Två personer vid en sjö i kvällsljus. Hon har beige hoodie och mössa med tofs, han en gräddvit jacka med Skånetaxen broderat på ryggen."
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/20" />
        <p className="page-x absolute inset-x-0 bottom-6 max-w-full font-display text-[clamp(1.7rem,7vw,3.75rem)] uppercase leading-[0.9] text-white sm:bottom-10 sm:leading-none">
          Premium, för föreningen
          <span className="text-[#e7dcc8]">.</span>
        </p>
      </section>

      <section id="forjanst" className="scroll-mt-28 bg-ink py-24 sm:py-32">
        <div className="page-x">
          <Reveal stagger>
            <ol className="grid grid-cols-1 gap-px bg-[#e7dcc8]/15 sm:grid-cols-2 lg:grid-cols-3">
              {points.map((point) => (
                <li key={point.n} className="bg-ink p-6 sm:p-8">
                  <span className="font-display text-4xl text-[#e7dcc8]">{point.n}</span>
                  <h3 className="mt-4 font-display text-3xl uppercase leading-none text-white">{point.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-mist">{point.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <Contact
        heading="Vill ni sälja märket?"
        lead="För föreningar som vill sälja Skånetaxen och tjäna pengar på det. Skriv. Vi svarar."
        allowed={["forening"]}
        subject="Skånetaxen"
        hints={{ forening: "Vi vill sälja Skånetaxen." }}
        tone="sand"
      />
    </>
  );
}
