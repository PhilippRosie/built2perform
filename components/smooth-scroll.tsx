"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

function LenisDriver() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const tick = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [smooth, setSmooth] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setSmooth(!media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: smooth ? 0.085 : 1,
        smoothWheel: smooth,
        syncTouch: false,
        anchors: { offset: 0 },
      }}
    >
      <LenisDriver />
      {children}
    </ReactLenis>
  );
}
