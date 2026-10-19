import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Villkor",
  description: "Villkor för Built2Perform och Built2Boost.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Villkor">
      <p>
        De här villkoren gäller webbplatsen för {site.brand} och varumärket {site.boost}. Genom att använda sidan accepterar du villkoren.
      </p>

      <h2>Vad sidan är</h2>
      <p>
        Sidan presenterar sportartiklarna och rabatthäftet, och hur idrottsföreningar, lokala aktörer och slutkunder hänger ihop. Den är inte en webbshop. Du kan inte lägga en beställning eller betala här.
      </p>

      <h2>Häftet och produkterna</h2>
      <p>
        {site.boost} är rabatthäftet. Det fylls med lokala aktörer och säljs av föreningen. {site.brand} är sportartiklarna: performance grip socks, sleeve-benskydd, premium sportstrumpor och sneakerstrumpor. Built2Print är profilering och tryck, från kläder till skyltar, beachflags och rollups. Skånetaxen är ett premiumvarumärke som föreningen kan sälja.
      </p>
      <p>
        <strong>{site.bookletKronor} kronor per sålt häfte</strong> går till föreningen. <strong>{site.productKronor} kronor per såld produkt</strong> är till för att stärka lagkassan. Kalkylatorn på sidan är ett räkneexempel. Den lovar ingen volym. Vilket pris slutkunden betalar, vilka aktörer som är med och hur försäljningen går till bestäms i avtal med föreningen, inte av kalkylatorn.
      </p>

      <h2>Köp, ånger och reklamation</h2>
      <p>
        Köpet av häfte eller produkt sker via föreningen, eller enligt det avtal som gäller för just den försäljningen. Ångerrätt och reklamation följer det avtalet och konsumentlagstiftningen mot den säljare du handlade av. Hör av dig till oss på <a href={`mailto:${site.email}`}>{site.email}</a> om en produkt från {site.brand} är fel, så hjälper vi dig vidare.
      </p>

      <h2>Det du skickar till oss</h2>
      <p>
        Formuläret öppnar ditt mejlprogram med det du skrivit. Vi tar emot meddelandet först när mejlet faktiskt skickas. Uppgifterna används för att svara dig. Läs mer i <Link href="/integritet">integritetspolicyn</Link>.
      </p>

      <h2>Immaterialrätt</h2>
      <p>
        Texter, bilder, märket och formen på sidan tillhör {site.legalName} eller våra licensgivare. Du får inte kopiera dem för eget kommersiellt bruk utan medgivande. {site.brand} och {site.boost} är våra varumärken.
      </p>

      <h2>Ansvar</h2>
      <p>
        Vi beskriver modellen så som den är tänkt att fungera. Rabatter hos aktörer, öppettider och vad ett häfte innehåller kan ändras och framgår av det häfte som gäller. Vi ansvarar inte för en lokal aktörs vara eller tjänst. Sidan kan vara otillgänglig vid underhåll.
      </p>

      <h2>Länkar</h2>
      <p>Om sidan länkar vidare gäller den andra webbplatsens egna villkor.</p>

      <h2>Lag</h2>
      <p>Svensk lag gäller. Tvister prövas av svensk domstol.</p>
    </LegalShell>
  );
}
