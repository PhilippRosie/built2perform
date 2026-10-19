import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { Reveal } from "@/components/reveal";
import { Story } from "@/components/story";

export const metadata: Metadata = {
  title: "Built2Print",
  description: "Profilering och tryck för föreningar. Kläder, skyltar, beachflags och rollups med föreningens namn.",
};

const range = [
  { title: "Kläder", body: "Tröja, hoodie, t-shirt, keps och flaska." },
  { title: "Skyltar", body: "Vepa vid planen och vid hallen." },
  { title: "Beachflags", body: "Till cup, mässa och entré." },
  { title: "Rollups", body: "Med när ni ska synas en dag." },
];

export default function PrintPage() {
  return (
    <>
      <Story
        kicker="Built2Print"
        title={"Namnet\nsyns."}
        lead="Föreningens namn, tryckt på kläder, skyltar, beachflags och rollups."
        marquee="Tryck · Kläder · Skylt · Beachflag · Rollup · Förening · Namn · Syns · "
        introKicker="Trycket"
        introTitle={"Från tröjan\ntill planen."}
        introBody="Det medlemmarna har på sig, och det som står där de samlas."
        chainLabel="Built2Print, från kläder till rollups"
        heroImage="/media/print-hero.jpg"
        heroAlt="En person i regn på en upplyst arena rättar till en svart keps med Built2Print-märket. Samma märke sitter på jackan, och strålkastarna lyser bakom."
        heroPosition="object-[center_45%]"
        heroFrame="inset-0"
        heroStill
        scenes={[
          {
            index: "01",
            kicker: "Kläder",
            title: "Det som bärs.",
            body: "Tröja, hoodie, t-shirt, keps och flaska. Ert namn, där laget redan är.",
            image: "/media/print-merch.jpg",
            alt: "Svart hoodie, matchtröja, vit t-shirt, keps, vikta tröjor och en svart flaska, alla med Built2Print-märket.",
            position: "object-[center_40%]",
          },
          {
            index: "02",
            kicker: "Skyltar",
            title: "Det som sitter kvar.",
            body: "Vepa längs planen och vid hallen. Namnet syns hela matchen.",
            image: "/media/print-vepa.jpg",
            alt: "Svart vepa med Built2Print-märket på ett staket längs en fotbollsplan i kvällsljus.",
            position: "object-[center_60%]",
          },
          {
            index: "03",
            kicker: "Beachflags",
            title: "En dag.\nEn cup.",
            body: "Till cup, mässa och utanför hallen. Upp när ni behöver synas.",
            image: "/media/print-beachflag.jpg",
            alt: "En rad beachflags med Built2Print-märket på en våt plan vid en cup, med tält och kläder i bakgrunden.",
            position: "object-[30%_center]",
          },
          {
            index: "04",
            kicker: "Rollups",
            title: "Lätt att ta med.",
            body: "En rollup som visar det föreningen vill säga. Står upp, packas ihop.",
            image: "/media/print-rollup.jpg",
            alt: "Två rollups med Built2Print. Den ena visar kläder, flaska och vepor. Den andra visar skylt, bil och beachflags.",
            position: "object-[center_30%]",
          },
        ]}
        closeImage="/media/print-press.jpg"
        closeAlt="En storformatsskrivare trycker en banderoll med Built2Print-märket i en verkstad."
        closeLine="Tryckt för föreningen."
      />

      <section id="sortiment" className="scroll-mt-28 bg-ink py-24 sm:py-32">
        <div className="page-x">
          <Reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">För föreningen</p>
            <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold uppercase leading-none text-white">
              Fyra saker
              <span className="line-soft">med</span>
              ert namn<span className="text-cyan">.</span>
            </h2>
          </Reveal>
          <Reveal stagger className="mt-14">
            <ol className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {range.map((item, index) => (
                <li key={item.title} className="bg-ink p-6 sm:p-8">
                  <span className="font-display text-4xl text-cyan">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-display text-3xl uppercase leading-none text-white">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-mist">{item.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-10 max-w-xl text-lg leading-8 text-mist">
              <span className="text-white">Ert namn på det ni väljer.</span> Skriv vad ni behöver, så tar vi fram ett förslag.
            </p>
          </Reveal>
        </div>
      </section>

      <Contact
        heading="Vill ni synas?"
        lead="Skriv vad ni vill ha föreningens namn på. Kläder, skylt, beachflag eller rollup. Vi svarar."
        allowed={["forening", "aktor"]}
        subject="Built2Print"
        hints={{
          forening: "Vi vill profilera föreningen.",
          aktor: "Vi vill beställa tryck.",
        }}
      />
    </>
  );
}
