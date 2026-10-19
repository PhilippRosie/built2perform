import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tillgänglighet",
  description: "Så arbetar Built2Perform med tillgänglighet på webbplatsen.",
};

export default function AccessibilityPage() {
  return (
    <LegalShell title="Tillgänglighet">
      <p>
        Vi vill att sidan ska gå att använda med tangentbord, skärmläsare och utan att rörelse är ett krav. Målet är WCAG 2.2 nivå AA så långt det är rimligt för en berättande sida.
      </p>

      <h2>Det som finns</h2>
      <ul>
        <li>Texten ligger i sidan, inte bara i bilder.</li>
        <li>Kalkylatorn går att styra med tangentbord och har ett sifferfält vid sidan av reglaget.</li>
        <li>Formuläret har etiketter och felmeddelanden.</li>
        <li>Om du har stängt av animationer i systemet visas kapitlen under varandra, utan den horisontella scrollen.</li>
        <li>En länk längst upp hoppar förbi menyn.</li>
      </ul>

      <h2>Kända begränsningar</h2>
      <p>
        På stor skärm rör sig fyra kapitel i sidled när du scrollar. Innehållet finns kvar i läsordning, men rörelsen kan vara jobbig. Stäng av animeringar i operativsystemet, eller skriv till oss så skickar vi samma information i ett mejl.
      </p>

      <h2>Hör av dig</h2>
      <p>
        Om något stänger dig ute, skriv till <a href={`mailto:${site.email}`}>{site.email}</a> och berätta vilken sida och vad som hände. Vi svarar med vad vi kan göra.
      </p>
    </LegalShell>
  );
}
