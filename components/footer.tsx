import Link from "next/link";
import { Logo } from "@/components/logo";
import { companyLines, routes, site } from "@/lib/site";

export function Footer() {
  const lines = companyLines();

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="page-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm font-display text-4xl uppercase leading-[0.9] text-white">
            Tillsammans är vi <span className="text-cyan">starkare.</span>
          </p>
          <p className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mist">
            <Link href="/print" className="hover:text-white">
              Built2Print
            </Link>
            <Link href="/skanetaxen" className="hover:text-white">
              Skånetaxen
            </Link>
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-cyan">Kontakt</p>
          <address className="mt-4 space-y-1 text-sm not-italic leading-6 text-mist">
            {lines.map((line) => (
              <span key={line} className="block">
                {line === site.email ? (
                  <a href={`mailto:${site.email}`} className="text-white hover:text-cyan">
                    {line}
                  </a>
                ) : (
                  line
                )}
              </span>
            ))}
          </address>
        </div>
        <nav className="md:col-span-4" aria-label="Policyer">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-cyan">Policyer</p>
          <ul className="mt-4 space-y-2">
            {routes.map((route) => (
              <li key={route.href}>
                <Link href={route.href} className="text-sm text-mist transition hover:text-white">
                  {route.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="page-x flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-mist sm:flex-row sm:justify-between">
        <p>
          © {site.year} {site.brand}. {site.boost}, Built2Print och Skånetaxen.
        </p>
        <p>Häften, sportartiklar, tryck och premium för idrottsföreningar.</p>
      </div>
    </footer>
  );
}
