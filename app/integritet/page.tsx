import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal-shell";
import { companyLines, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integritet",
  description: "Så hanterar Built2Perform personuppgifter som lämnas via sidan.",
};

export default function PrivacyPage() {
  const lines = companyLines();

  return (
    <LegalShell title="Integritet">
      <p>
        Den här policyn beskriver hur {site.legalName} hanterar personuppgifter när du använder webbplatsen för {site.brand} och {site.boost}.
      </p>

      <h2>Vem som ansvarar</h2>
      <p>
        Personuppgiftsansvarig är det bolag som driver {site.brand}. Du når oss på{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <ul>
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      {!site.orgNumber || !site.street ? (
        <p>
          Organisationsnummer och postadress publiceras här innan sidan lanseras. Tills dess är e-postadressen rätt sätt att nå oss, även om du vill utöva dina rättigheter.
        </p>
      ) : null}

      <h2>Vilka uppgifter</h2>
      <p>Vi samlar bara in det du själv skickar, och det som krävs för att sidan ska fungera.</p>
      <ul>
        <li>Namn, e-post, telefon, ort, förening eller företag och meddelande, om du skriver till oss.</li>
        <li>Ditt val om cookierutan, sparat lokalt i din webbläsare.</li>
        <li>Tekniska uppgifter som en värdleverantör loggar för drift och säkerhet, till exempel IP-adress och tidpunkt.</li>
      </ul>

      <h2>Varför</h2>
      <ul>
        <li>För att svara på din förfrågan och, om vi går vidare, för att förbereda ett samarbete.</li>
        <li>För att komma ihåg att du har sett informationen om cookies.</li>
        <li>För att hålla sidan säker och tillgänglig.</li>
      </ul>

      <h2>Rättslig grund</h2>
      <p>
        När du skriver till oss behandlar vi uppgifterna för att vidta åtgärder på din begäran innan ett eventuellt avtal, artikel 6.1 b i dataskyddsförordningen. Berättigat intresse, artikel 6.1 f, används för drift, säkerhet och för att minnas ditt cookieval. Vi använder inte uppgifterna till reklamutskick.
      </p>

      <h2>Hur länge</h2>
      <p>
        En förfrågan som inte leder vidare sparas så länge det behövs för att svara och följa upp, som längst 12 månader. Om vi tecknar avtal gäller den tid bokföringslagen och avtalet kräver. Cookievalet ligger kvar i din webbläsare tills du rensar det.
      </p>

      <h2>Vem som tar del</h2>
      <p>
        Vi säljer inte personuppgifter. En värdleverantör kan behandla tekniska loggar för att sidan ska kunna visas. Mejl du skickar läses av oss. Om vi anlitar ett personuppgiftsbiträde gör vi det med avtal och bara för det ändamål som står här.
      </p>

      <h2>Dina rättigheter</h2>
      <p>Du kan begära tillgång, rättelse, radering, begränsning och dataportabilitet, och invända mot behandling som stöds på berättigat intresse. Du kan också klaga hos Integritetsskyddsmyndigheten, imy.se.</p>
      <p>
        Skriv till <a href={`mailto:${site.email}`}>{site.email}</a> om du vill använda en rättighet. Vi kan behöva säkerställa att vi pratar med rätt person.
      </p>

      <h2>Cookies</h2>
      <p>
        Läs mer på sidan <Link href="/cookies">Cookies</Link>. Vi använder i dag inga analys- eller reklamcookies.
      </p>

      <h2>Säkerhet</h2>
      <p>
        Åtkomst till det du skickar begränsas till dem som behöver det för att svara. Ingen överföring på internet är helt riskfri, så skicka inte känsliga uppgifter i formuläret.
      </p>
    </LegalShell>
  );
}
