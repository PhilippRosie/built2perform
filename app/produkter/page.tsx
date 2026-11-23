import type { Metadata } from "next";
import { EarningsProvider } from "@/components/earnings";
import { HomeStage } from "@/components/home-stage";
import { Products } from "@/components/products";
import { Team } from "@/components/team";

export const metadata: Metadata = {
  title: "Built2Perform – Produkter",
  description: "Performance grip socks, sleeve-benskydd, premium sportstrumpor och sneakerstrumpor. 75 kronor per såld produkt går till lagkassan.",
};

export default function ProdukterPage() {
  return (
    <EarningsProvider>
      <HomeStage>
      <Products />
      <Team />
      </HomeStage>
    </EarningsProvider>
  );
}
