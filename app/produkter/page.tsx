import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { EarningsProvider } from "@/components/earnings";
import { Products } from "@/components/products";

export const metadata: Metadata = {
  title: "Built2Perform – Produkter",
  description: "Performance grip socks, sleeve-benskydd, premium sportstrumpor och sneakerstrumpor. 75 kronor per såld produkt går till lagkassan.",
};

export default function ProdukterPage() {
  return (
    <EarningsProvider>
      <Products />
      <Contact
        allowed={["forening"]}
        subject="Built2Perform produkter"
        lead="Förening som vill sälja produkterna och stärka lagkassan. Skriv. Vi svarar."
        hints={{ forening: "Vi vill sälja produkterna." }}
      />
    </EarningsProvider>
  );
}
