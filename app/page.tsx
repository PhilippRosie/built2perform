import { Boost } from "@/components/boost";
import { Contact } from "@/components/contact";
import { EarningsProvider } from "@/components/earnings";
import { Film } from "@/components/film";
import { More } from "@/components/more";
import { Products } from "@/components/products";

export default function Page() {
  return (
    <EarningsProvider>
      <Film />
      <Boost />
      <Products />
      <More />
      <Contact />
    </EarningsProvider>
  );
}
