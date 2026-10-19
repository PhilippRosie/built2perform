import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="page-x mx-auto max-w-3xl pb-24 pt-32">
      <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">{site.brand}</p>
      <h1 className="mt-4 font-display text-6xl uppercase leading-[0.86] text-white md:text-8xl">{title}</h1>
      <p className="mt-6 text-sm text-mist">Senast uppdaterad {site.policyUpdated}.</p>
      <div className="legal mt-10 space-y-5 text-[1.02rem] leading-7 text-mist">{children}</div>
    </article>
  );
}
