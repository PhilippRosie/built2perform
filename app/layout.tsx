import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Outfit } from "next/font/google";
import Script from "next/script";
import { CookieBanner } from "@/components/cookie-banner";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/lib/site";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Built2Perform — Tillsammans stärker vi föreningslivet",
    template: "%s · Built2Perform",
  },
  description: site.description,
  openGraph: {
    title: "Built2Perform — Tillsammans stärker vi föreningslivet",
    description: site.description,
    locale: "sv_SE",
    type: "website",
    images: [{ url: "/thumbnail.png", width: 1024, height: 1024, alt: "Built2Perform" }],
  },
  twitter: {
    card: "summary",
    images: ["/thumbnail.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05070c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${display.variable} ${sans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-ink font-sans text-paper">
        <Script id="cinematic-flag" strategy="beforeInteractive">
          {`try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&matchMedia("(min-width: 1024px)").matches)document.documentElement.classList.add("cinematic")}catch(e){}`}
        </Script>
        <a className="skip" href="#innehall">
          Hoppa till innehållet
        </a>
        <SmoothScroll>
          <Nav />
          <main id="innehall">{children}</main>
          <Footer />
          <CookieBanner />
        </SmoothScroll>
      </body>
    </html>
  );
}
