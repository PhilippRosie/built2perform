import Image from "next/image";
import { CombinedTotal, ProductCalculator } from "@/components/calculator";
import { Reveal } from "@/components/reveal";

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

export function Products() {
  return (
    <section id="produkter" className="relative overflow-hidden bg-ink">
      <div className="stroke-run" aria-hidden="true">
        <p className="stroke-text font-display text-[22vw] font-semibold uppercase leading-none">Laget</p>
        <p className="stroke-text font-display text-[22vw] font-semibold uppercase leading-none">Laget</p>
      </div>
      <div className="page-x relative py-24 sm:py-32">
        <Reveal>
          <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">Sportartiklar</p>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(3.5rem,8vw,7.2rem)] font-semibold uppercase leading-[0.86] text-white">
            <span className="line-soft">Och så har vi</span>
            produkterna<span className="text-cyan">.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-mist">
            Performance grip socks, sleeve-benskydd, premium sportstrumpor och sneakerstrumpor. Svart eller vitt. Saker laget ändå använder, och{" "}
            <span className="text-white">75 kronor per såld produkt går rakt in i lagkassan.</span>
          </p>
        </Reveal>
      </div>

      <div className="grid border-t border-white/10 lg:grid-cols-2">
        {products.map((product) => (
          <article key={product.name} className="border-b border-white/10 lg:[&:nth-child(odd)]:border-r">
            <div className="grid grid-cols-2">
              {product.shots.map((shot) => (
                <figure key={shot.src} className="relative aspect-square bg-[radial-gradient(circle_at_center,#3a4456_0%,#10141c_72%)]">
                  <Image src={shot.src} alt={shot.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-contain p-6 sm:p-10" />
                  <figcaption className="absolute bottom-3 left-4 text-[0.65rem] uppercase tracking-[0.22em] text-white/55">{shot.label}</figcaption>
                </figure>
              ))}
            </div>
            <Reveal className="px-6 py-8 sm:px-10 sm:py-10">
              <h3 className="font-display text-4xl uppercase leading-[0.9] text-white sm:text-5xl">{product.name}</h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-mist">{product.body}</p>
            </Reveal>
          </article>
        ))}
      </div>

      <div className="page-x grid items-center gap-10 py-24 lg:grid-cols-2">
        <div className="relative min-h-[380px]">
          <Image
            src="/media/logo-stadium.jpg"
            alt="Built2Perform-märket framför en arena på natten."
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <Reveal>
            <p className="text-[0.72rem] uppercase tracking-[0.38em] text-cyan">Lagkassan</p>
            <h3 className="mt-4 font-display text-5xl uppercase leading-[0.9] text-white">
              Pengar
              <span className="line-soft">till</span>
              laget<span className="text-cyan">.</span>
            </h3>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 text-lg leading-8 text-mist">
              Grepp, skydd och strumpor behövs ändå. <span className="text-white">När laget säljer dem stärks lagkassan med 75 kronor per produkt.</span> Säljer ni häftet också kan ni räkna ihop båda här under.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="page-x pb-24">
        <ProductCalculator />
        <div className="mt-6">
          <CombinedTotal />
        </div>
      </div>
    </section>
  );
}
