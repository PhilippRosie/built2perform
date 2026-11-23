import Image from "next/image";
import Link from "next/link";
import { ProductCalculator } from "@/components/calculator";
import { KineticLines } from "@/components/kinetic";
import { Reveal } from "@/components/reveal";
import { Ticker } from "@/components/ticker";

const products = [
  {
    name: "Performance Grip Socks",
    body: "Maximal kontroll i varje steg. Grepp där det behövs, komfort hela vägen. Utvecklade för prestation – utan kompromisser.",
    shots: [
      { src: "/media/grip-white.png", alt: "Vita Performance Grip Socks från Built2Perform.", label: "Vit" },
      { src: "/media/grip-black.png", alt: "Svarta Performance Grip Socks från Built2Perform, med cyan linje.", label: "Svart" },
    ],
  },
  {
    name: "Sleeve Benskydd",
    body: "Avskalad design med exakt funktion. Lätta, följsamma och sitter där de ska så du kan fokusera på spelet.",
    shots: [
      { src: "/media/sleeve-white.png", alt: "Vita sleeve-benskydd från Built2Perform.", label: "Vit" },
      { src: "/media/sleeve-black.png", alt: "Svarta sleeve-benskydd från Built2Perform.", label: "Svart" },
    ],
  },
  {
    name: "Premium Sportstrumpor",
    body: "Ren design, hög kvalitet och en känsla som märks direkt. Slitstarka nog för träning – stilrena nog för match.",
    shots: [
      { src: "/media/sport-white.png", alt: "Vita premium sportstrumpor från Built2Perform.", label: "Vit" },
      { src: "/media/sport-black.png", alt: "Svarta premium sportstrumpor från Built2Perform.", label: "Svart" },
    ],
  },
  {
    name: "Sneakerstrumpor",
    body: "Diskreta, självsäkra och gjorda för vardagen. Perfekt passform, varje gång.",
    shots: [
      { src: "/media/sneaker-white.png", alt: "Vita sneakerstrumpor från Built2Perform.", label: "Vit" },
      { src: "/media/sneaker-black.png", alt: "Svarta sneakerstrumpor från Built2Perform.", label: "Svart" },
    ],
  },
];

function ProductPair({ id, kicker, items }: { id: string; kicker: string; items: typeof products }) {
  return (
    <section id={id} className="bg-ink">
      <div className="page-x grid content-center gap-8 py-20 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-24">
        <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan lg:col-span-2">{kicker}</p>
        {items.map((product) => (
          <article key={product.name} className="min-w-0">
            <div className="grid grid-cols-2 gap-px bg-white/10">
              {product.shots.map((shot) => (
                <figure key={shot.src} className="relative aspect-[5/4] bg-[radial-gradient(circle_at_center,#3a4456_0%,#10141c_72%)] sm:aspect-square">
                  <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 25vw, 40vw" className="object-contain p-4 sm:p-8" />
                  <figcaption className="absolute bottom-3 left-4 text-[0.65rem] uppercase tracking-[0.22em] text-white/55">{shot.label}</figcaption>
                </figure>
              ))}
            </div>
            <h3 className="mt-4 font-display text-[clamp(1.65rem,6vw,3.25rem)] uppercase leading-[0.9] text-white">{product.name}</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-mist sm:text-base sm:leading-7">{product.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Products() {
  return (
    <>
      <section id="top" className="relative min-h-[100svh] overflow-hidden bg-ink lg:h-[100svh]">
        <div className="hero-media absolute inset-x-0 -top-[8%] h-[120%]">
          <Image
            src="/media/hero-arena-marke.jpg"
            alt="Built2Perform-märket över en upplyst arena på natten."
            fill
            priority
            sizes="100vw"
            data-hero-focus="center"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(190,236,255,0.22),transparent_42%),linear-gradient(to_bottom,rgba(5,7,12,0.45)_0%,rgba(5,7,12,0.18)_30%,rgba(5,7,12,0.78)_68%,#05070c_100%)]" />
        </div>
        <div className="hero-copy page-x relative z-10 flex min-h-[100svh] flex-col justify-end pb-28 pt-24 lg:pb-16 lg:pt-24">
          <p className="hero-kicker rise text-[0.72rem] uppercase tracking-[0.46em] text-cyan">Built2Perform</p>
          <h1 className="hero-title rise rise-2 mt-3 max-w-5xl font-display font-semibold uppercase leading-[0.84] text-white">
            <KineticLines text={"Saker laget\nändå använder."} />
          </h1>
          <p className="rise rise-3 mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Greppstrumpor, benskydd och strumpor. Svart eller vitt. <span className="text-white">75 kronor per såld produkt går till lagkassan.</span>
          </p>
          <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#grepp" className="bg-cyan px-5 py-3 text-center font-display text-xl uppercase tracking-[0.12em] text-ink transition hover:bg-white sm:text-left">
              Se produkterna
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
          <Ticker cover text="Grepp · Skydd · Strumpor · Sneaker · Match · Vardag · Lagkassa · " />
        </div>
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[78%] w-[min(56rem,92vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(5,7,12,0.82)_0%,rgba(5,7,12,0.45)_46%,transparent_74%)]" />
        <div className="page-x relative z-10 flex max-w-4xl flex-col items-center">
          <Reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">Produkterna</p>
            <h2 className="mt-6 font-display text-[clamp(3.4rem,16vw,8.6rem)] font-semibold uppercase leading-[0.82] text-white">
              <KineticLines text={"Och så har vi\nprodukterna."} />
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-mist sm:text-xl">
              Fyra produkter. Två färger. <span className="text-white">Saker som ändå behövs, och som stärker lagkassan när de säljs.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <ProductPair id="grepp" kicker="Grepp och skydd" items={products.slice(0, 2)} />
      <ProductPair id="strumpor" kicker="Strumpor" items={products.slice(2)} />

      <section id="lagkassan" className="relative overflow-hidden bg-ink">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[72%] lg:inset-y-0 lg:left-[40%] lg:h-auto lg:w-auto" aria-hidden="true">
          <Image
            src="/media/lagkassan-produkter.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-[center_32%] [mask-image:linear-gradient(to_bottom,#000_58%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_58%,transparent_100%)] lg:object-[center_42%] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_28%,#000_100%)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_28%,#000_100%)]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,7,12,0.18)_0%,transparent_28%,transparent_52%,rgba(5,7,12,0.35)_100%)] lg:bg-[linear-gradient(to_right,#05070c_0%,rgba(5,7,12,0.45)_18%,transparent_42%)]" />
        </div>
        <div className="page-x relative z-10 flex min-h-[70vh] flex-col justify-end pb-24 pt-[48vh] lg:min-h-0 lg:max-w-3xl lg:justify-center lg:py-28 lg:pt-28">
          <Reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">Lagkassan</p>
            <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.4rem,8vw,4.25rem)] font-semibold uppercase leading-[0.9] text-white">
              Pengar
              <span className="line-soft">till</span>
              laget<span className="text-cyan">.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-xl text-base leading-7 text-mist sm:text-lg sm:leading-8">
              Grepp, skydd och strumpor behövs ändå. <span className="text-white">När laget säljer dem stärks lagkassan med 75 kronor per produkt.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section id="kalkyl" className="bg-ink">
        <div className="page-x flex min-h-[70vh] items-center py-16">
          <ProductCalculator />
        </div>
      </section>
    </>
  );
}
