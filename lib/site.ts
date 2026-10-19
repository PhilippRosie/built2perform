/**
 * Fyll i bolagsuppgifterna innan sidan lanseras.
 * E-post, organisationsnummer och adress syns i sidfot och policys.
 */
export const site = {
  brand: "Built2Perform",
  boost: "Built2Boost",
  legalName: "Built2Perform",
  orgNumber: "",
  street: "",
  postalCode: "",
  city: "",
  email: "hej@built2perform.se",
  phone: "",
  url: "https://built2perform.se",
  bookletKronor: 150,
  productKronor: 75,
  policyUpdated: "19 oktober 2026",
  year: 2026,
  description:
    "Built2Perform gör sportartiklar för träning, match och vardag. Built2Boost är rabatthäftet. Built2Print är profilering och tryck. Skånetaxen är ett premiumvarumärke föreningar kan sälja.",
} as const;

export const routes = [
  { href: "/integritet", label: "Integritet" },
  { href: "/cookies", label: "Cookies" },
  { href: "/villkor", label: "Villkor" },
  { href: "/tillganglighet", label: "Tillgänglighet" },
] as const;

export function companyLines() {
  const lines: string[] = [site.legalName];
  if (site.orgNumber) lines.push(`Org.nr ${site.orgNumber}`);
  const address = [site.street, [site.postalCode, site.city].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
  if (address) lines.push(address);
  lines.push(site.email);
  if (site.phone) lines.push(site.phone);
  return lines;
}
