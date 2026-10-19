import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sidan finns inte",
};

export default function NotFound() {
  return (
    <div className="page-x flex min-h-[100svh] flex-col justify-end pb-24 pt-32">
      <p className="font-display text-[clamp(6rem,22vw,16rem)] font-semibold leading-[0.8] text-white">404</p>
      <p className="mt-4 max-w-md text-lg text-mist">Den här sidan finns inte. Planen gör det.</p>
      <Link href="/" className="mt-8 inline-flex w-fit bg-cyan px-5 py-3 font-display text-2xl uppercase tracking-[0.12em] text-ink">
        Tillbaka
      </Link>
    </div>
  );
}
