import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { Story } from "@/components/story";

export const metadata: Metadata = {
  title: "Skånetaxen",
  description: "Premiumvarumärket Skånetaxen. Strumpor och underkläder som föreningen kan sälja och tjäna pengar på.",
};

export default function SkanetaxenPage() {
  return (
    <>
    <Story
      kicker="Skånetaxen"
      title={"Premium\natt sälja."}
      lead="Ett eget premiumvarumärke. Strumpor och underkläder som föreningen säljer, och tjänar pengar på."
      marquee="Skånetaxen · Premium · Strumpor · Underkläder · Förening · Sälja · Tjäna · "
      introKicker="Märket"
      introTitle={"Ett märke\nlaget kan bära."}
      introBody="Skånetaxen är premium. Föreningen säljer det till medlemmar och runt laget, och behåller förtjänsten."
      chainLabel="Skånetaxen, från märke till försäljning"
      heroImage="/media/mark-stadium.jpg"
      heroAlt="Built2Perform-märket över en upplyst arena på natten."
      scenes={[
        {
          index: "01",
          kicker: "Premium",
          title: "Eget\nuttryck.",
          body: "Strumpor och underkläder med ett märke som känns valt, inte påhängt. Premium, från början.",
        },
        {
          index: "02",
          kicker: "Försäljningen",
          title: "Föreningen säljer.",
          body: "Till medlemmar, föräldrar och folk runt laget. Samma närhet som häftet, ett annat märke.",
          image: "/media/boost-team.jpg",
          alt: "Ett lag med ryggen mot oss på en upplyst arena.",
        },
        {
          index: "03",
          kicker: "Förtjänsten",
          title: "Pengar\ntillbaka.",
          body: "Varje såld produkt ger föreningen en intäkt. Hur mycket bestäms i avtalet, inte här på sidan.",
          href: "#kontakt",
          link: "Prata om märket",
        },
      ]}
      closeImage="/media/stadium.jpg"
      closeAlt="Fotbollsarena på natten, upplyst av strålkastare."
      closeLine="Premium, för föreningen."
    />
    <Contact
      heading="Vill ni sälja märket?"
      lead="För föreningar som vill sälja Skånetaxen och tjäna pengar på det. Skriv. Vi svarar."
      allowed={["forening"]}
      subject="Skånetaxen"
      hints={{ forening: "Vi vill sälja Skånetaxen." }}
    />
    </>
  );
}
