import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookies",
  description: "Vilka cookies och lokal lagring Built2Perform använder.",
};

export default function CookiesPage() {
  return (
    <LegalShell title="Cookies">
      <p>
        En cookie är en liten textfil som en webbplats kan spara i din webbläsare. Vi använder i dag ingen sådan fil för analys eller reklam.
      </p>

      <h2>Det vi sparar</h2>
      <p>
        När du klickar “Jag förstår” i rutan längst ner sparas valet <strong>b2p-cookie</strong> i webbläsarens local storage. Det är inte en cookie, men det fyller samma funktion: rutan ska inte visas igen på den här enheten. Värdet innehåller inget om vem du är.
      </p>
      <p>Rättslig grund är berättigat intresse av att inte visa samma information vid varje besök. Du kan ta bort värdet genom att rensa webbplatsdata för den här sidan.</p>

      <h2>Det vi inte använder</h2>
      <ul>
        <li>Inga analysverktyg.</li>
        <li>Inga reklamcookies och ingen spårning mellan webbplatser.</li>
        <li>Inga cookies från tredje part.</li>
      </ul>
      <p>
        Om vi senare vill mäta besök gör vi det bara efter ett nytt val, och den här sidan uppdateras innan det händer.
      </p>

      <h2>Kalkylatorn</h2>
      <p>
        Antalet häften och produkter du drar fram i kalkylatorn stannar i webbläsaren under besöket. Det skickas inte till oss.
      </p>

      <h2>Mer om personuppgifter</h2>
      <p>
        Se <Link href="/integritet">integritetspolicyn</Link>. Frågor skickas till <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalShell>
  );
}
