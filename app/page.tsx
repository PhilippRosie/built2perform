import { Boost } from "@/components/boost";
import { Contact } from "@/components/contact";
import { EarningsProvider } from "@/components/earnings";
import { Film } from "@/components/film";
import { More } from "@/components/more";

export default function Page() {
  return (
    <EarningsProvider>
      <Film />
      <Boost />
      <More />
      <Contact
        allowed={["forening", "aktor"]}
        lead="Förening eller lokal aktör. Skriv om häftet, trycket eller Skånetaxen. Vi svarar."
      />
    </EarningsProvider>
  );
}
