import Image from "next/image";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

function kineticHeading(heading: ReactNode, markClass: string) {
  if (typeof heading !== "string") return heading;
  const mark = heading.match(/[.?!]$/)?.[0] ?? "";
  const words = heading.replace(/[.?!]$/, "").trim().split(/\s+/);
  if (words.length < 3) {
    return (
      <>
        {words.slice(0, -1).join(" ")} {words.at(-1)}
        {mark ? <span className={markClass}>{mark}</span> : null}
      </>
    );
  }
  const last = words.at(-1);
  const soft = words.at(-2);
  return (
    <>
      {words.slice(0, -2).join(" ")}
      <span className="line-soft">{soft}</span>
      {last}
      {mark ? <span className={markClass}>{mark}</span> : null}
    </>
  );
}

type ContactProps = {
  heading?: ReactNode;
  lead?: string;
  allowed?: ("forening" | "aktor" | "kund")[];
  subject?: string;
  hints?: Partial<Record<"forening" | "aktor" | "kund", string>>;
  tone?: "cyan" | "sand";
};

const defaultHeading = (
  <>
    Vilka bygger
    <span className="line-soft">vi med</span>
    härnäst<span className="text-cyan">?</span>
  </>
);

export function Contact({
  heading = defaultHeading,
  lead = "Förening, lokal aktör, eller någon som vill veta mer om häftet, produkterna, trycket eller Skånetaxen. Skriv. Vi svarar.",
  allowed,
  subject,
  hints,
  tone = "cyan",
}: ContactProps = {}) {
  const sand = tone === "sand";
  const mark = sand ? "text-[#e7dcc8]" : "text-cyan";
  return (
    <section id="kontakt" className="relative scroll-mt-24 overflow-hidden bg-ink py-24 sm:py-32">
      <Image
        src={sand ? "/media/skanetaxen-sjon.jpg" : "/media/stadium.jpg"}
        alt=""
        fill
        sizes="100vw"
        className={`object-cover ${sand ? "object-[center_40%] opacity-25" : "opacity-30"}`}
      />
      <div className={`absolute inset-0 ${sand ? "bg-gradient-to-b from-ink via-ink/90 to-ink" : "bg-gradient-to-b from-ink via-ink/88 to-ink"}`} />
      <div className="page-x relative grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className={`text-[0.72rem] uppercase tracking-[0.42em] ${mark}`}>Kontakt</p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold uppercase leading-none text-white">
            {kineticHeading(heading, mark)}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-mist">{lead}</p>
        </Reveal>
        <div className="lg:col-span-7">
          <ContactForm allowed={allowed} subject={subject} hints={hints} tone={tone} />
        </div>
      </div>
    </section>
  );
}
