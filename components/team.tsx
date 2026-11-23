import Image from "next/image";

const people = [
  {
    name: "Kim Walfridsson",
    role: "Föreningar, sponsorer och affärer",
    email: "kim@dealbooster.nu",
    phone: "+46 72 150 09 09",
    tel: "+46721500909",
    image: "/media/team/kim.jpg",
  },
  {
    name: "Conny Nilsson",
    role: "Ekonomi och webb",
    email: "conny@dealbooster.nu",
    phone: "+46 70 145 45 88",
    tel: "+46701454588",
    image: "/media/team/conny.png",
  },
  {
    name: "Philipp Rosie",
    role: "Produkt, marknad och form",
    email: "philipp@dealbooster.nu",
    phone: "+46 76 876 94 90",
    tel: "+46768769490",
    image: "/media/team/philipp.jpg",
  },
  {
    name: "Elliot Leijonberg",
    role: "Produkt",
    email: "elliot@dealbooster.nu",
    phone: "+46 73 368 08 13",
    tel: "+46733680813",
    image: "/media/team/elliot.jpg",
  },
] as const;

export function Team() {
  return (
    <section id="kontakt" className="relative scroll-mt-24 overflow-hidden bg-ink py-24 sm:py-32">
      <Image src="/media/stadium.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/88 to-ink" />
      <div className="page-x relative">
        <div className="team-beat max-w-3xl">
          <p className="team-line text-[0.72rem] uppercase tracking-[0.42em] text-cyan">Kontakt</p>
          <h2 className="mt-4 font-display text-[clamp(2.6rem,5vw,4.25rem)] font-semibold uppercase leading-none text-white">
            <span className="team-line block">Hör av</span>
            <span className="team-line block">
              dig<span className="text-cyan">.</span>
            </span>
          </h2>
          <p className="team-line mt-5 max-w-xl text-lg leading-8 text-mist">
            Ring eller mejla om häftet, trycket eller produkterna. Vi svarar.
          </p>
        </div>
        <div className="team-grid mt-12 grid gap-8 lg:grid-cols-4 lg:gap-8">
          {people.map((person) => (
            <article key={person.email} className="team-beat">
              <div className="team-photo team-chip relative aspect-square overflow-hidden shadow-[0_0_28px_rgba(60,228,244,0.22)]">
                <Image src={person.image} alt={person.name} fill sizes="(min-width: 1280px) 22vw, 80vw" className="object-cover object-[center_18%]" />
              </div>
              <h3 className="team-chip mt-4 font-display text-3xl uppercase leading-none text-white">{person.name}</h3>
              <p className="team-chip mt-2 text-base leading-6 text-mist">{person.role}</p>
              <div className="team-chip mt-3 flex flex-col gap-1 text-base">
                <a href={`mailto:${person.email}`} className="text-cyan underline decoration-cyan/30 underline-offset-4">
                  {person.email}
                </a>
                <a href={`tel:${person.tel}`} className="text-white">
                  {person.phone}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
