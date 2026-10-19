"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";

const payback = ["Kupong 1", "Kupong 2", "Kupong 3"];
const later = ["Fika", "Lunch", "Restaurang", "Frisör", "Butik", "Gym", "Matbutik", "Spa"];
const max = payback.length + later.length;

function status(used: number) {
  if (used === 0) return "Ingen kupong använd än. Häftet har inte betalat sig.";
  if (used === 1) return "En kupong. Nu har du gått plus på häftet.";
  if (used === 2) return "Två kuponger. Nu har du gått plus på häftet.";
  if (used === 3) return "Tre kuponger. Häftet har betalat sig.";
  const extra = used - payback.length;
  const word = extra === 1 ? "kupong" : "kuponger";
  return `${extra} ${word} till. Häftet har redan betalat sig, så det här är pengar tillbaka.`;
}

export function Savings() {
  const [used, setUsed] = useState(3);
  const plus = used >= 1;

  function pick(count: number) {
    setUsed(used === count ? count - 1 : count);
  }

  return (
    <div id="kund" className="scroll-mt-28 mt-28 border border-cyan/40 bg-[#071018] p-6 sm:p-12">
      <Reveal>
        <p className="text-[0.72rem] uppercase tracking-[0.42em] text-cyan">Slutkunden</p>
        <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.6rem)] font-semibold uppercase leading-[0.86] text-white">
          1–3 kuponger<span className="text-cyan">.</span>
          <br />
          <span className="ink-line">Sen har du gått plus.</span>
        </h2>
      </Reveal>
      <Reveal delay={120}>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">
          Använd en, två eller tre kuponger, så har häftet betalat sig. <span className="text-white">Det du använder efter det är pengar tillbaka.</span>
        </p>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <p className="font-display text-[clamp(5.5rem,13vw,9rem)] font-semibold uppercase leading-[0.8] text-cyan" aria-live="polite">
            {plus ? "Plus" : used}
          </p>
          <p className="mt-2 max-w-md font-display text-3xl uppercase leading-none text-white sm:text-4xl">
            {used === 0 ? "Kuponger använda." : "Häftet har betalat sig."}
          </p>
        </div>
        <div className="lg:col-span-7">
          <label htmlFor="anvandningar" className="text-[0.72rem] uppercase tracking-[0.28em] text-mist">
            Använda kuponger i häftet
          </label>
          <input
            id="anvandningar"
            className="range mt-4"
            type="range"
            min={0}
            max={max}
            value={used}
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={used}
            aria-valuetext={status(used)}
            onChange={(event) => setUsed(Number(event.target.value))}
          />
          <div className="mt-3 flex justify-between font-display text-lg tracking-[0.08em] text-white/50">
            <span>0</span>
            <span>{max}</span>
          </div>
        </div>
      </div>

      <p className="mt-8 text-[0.72rem] uppercase tracking-[0.28em] text-mist">De här tre betalar häftet</p>
      <ul className="mt-4 grid grid-cols-3 gap-px bg-white/10">
        {payback.map((name, index) => {
          const count = index + 1;
          const on = used >= count;
          return (
            <li key={name}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => pick(count)}
                className={`w-full px-3 py-5 text-left transition sm:px-4 sm:py-6 ${on ? "bg-cyan text-ink" : "bg-ink text-white/40 hover:text-white"}`}
              >
                <span className="block font-display text-sm tracking-[0.18em]">{String(count).padStart(2, "0")}</span>
                <span className="mt-2 block font-display text-xl uppercase leading-none sm:text-3xl">{name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 text-[0.72rem] uppercase tracking-[0.28em] text-mist">Sen är det pengar tillbaka</p>
      <ul className="mt-4 grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
        {later.map((name, index) => {
          const count = payback.length + index + 1;
          const on = used >= count;
          return (
            <li key={name}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => pick(count)}
                className={`w-full px-4 py-5 text-left transition ${on ? "bg-cyan text-ink" : "bg-ink text-white/35 hover:text-white"}`}
              >
                <span className="font-display text-2xl uppercase">{name}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 max-w-2xl text-sm leading-6 text-mist">{status(used)}</p>
    </div>
  );
}
