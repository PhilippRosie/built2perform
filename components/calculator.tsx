"use client";

import { useState } from "react";
import { useEarnings } from "@/components/earnings";
import { Reveal } from "@/components/reveal";
import { clampCount, kronor, plural } from "@/lib/format";
import { site } from "@/lib/site";

const MAX = 5000;

type CalculatorProps = {
  id: string;
  kicker: string;
  rate: number;
  rateLabel: string;
  noun: [string, string];
  value: number;
  onChange: (value: number) => void;
  note: string;
  resultLabel: string;
  children?: React.ReactNode;
};

export function Calculator({
  id,
  kicker,
  rate,
  rateLabel,
  noun,
  value,
  onChange,
  note,
  resultLabel,
  children,
}: CalculatorProps) {
  const [text, setText] = useState(String(value));
  const [focused, setFocused] = useState(false);

  function commit(next: number) {
    const clamped = clampCount(next, MAX);
    onChange(clamped);
    setText(String(clamped));
  }

  return (
    <div id={id} className="scroll-mt-24 border border-white/10 bg-[#070d14]">
      <div className="grid gap-10 p-6 md:grid-cols-12 md:p-12">
        <div className="md:col-span-5">
          <p className="text-[0.72rem] uppercase tracking-[0.38em] text-cyan">{kicker}</p>
          <p className="mt-3 font-display text-[clamp(5.5rem,12vw,9rem)] font-semibold leading-[0.8] text-cyan">{rate}</p>
          <p className="font-display text-3xl uppercase leading-none tracking-wide text-white sm:text-4xl">{rateLabel}</p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-mist">{note}</p>
        </div>
        <div className="flex flex-col justify-end md:col-span-7">
          <div className="flex items-end justify-between gap-4">
            <label htmlFor={`${id}-antal`} className="text-[0.72rem] uppercase tracking-[0.28em] text-mist">
              Antal {noun[1]}
            </label>
            <input
              id={`${id}-antal`}
              inputMode="numeric"
              className="w-36 border-b border-white/25 bg-transparent py-1 text-right font-display text-4xl text-white outline-none focus:border-cyan"
              value={focused ? text : String(value)}
              onFocus={() => {
                setFocused(true);
                setText(String(value));
              }}
              onChange={(event) => {
                const raw = event.target.value.replace(/[^\d]/g, "");
                setText(raw);
                if (raw === "") return;
                onChange(clampCount(Number(raw), MAX));
              }}
              onBlur={() => {
                setFocused(false);
                commit(text === "" ? 0 : Number(text));
              }}
              onWheel={(event) => event.currentTarget.blur()}
            />
          </div>
          <input
            className="range mt-6"
            type="range"
            min={0}
            max={MAX}
            step={10}
            aria-label={`Antal ${noun[1]}`}
            value={value}
            onChange={(event) => commit(Number(event.target.value))}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {[25, 50, 100, 250, 500, 1000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => commit(preset)}
                className={`border px-3 py-2 font-display text-lg uppercase tracking-[0.08em] transition ${
                  value === preset ? "border-cyan bg-cyan text-ink" : "border-white/15 text-white hover:border-cyan"
                }`}
              >
                {preset}
              </button>
            ))}
          </div>
          <p className="mt-10 text-[0.72rem] uppercase tracking-[0.32em] text-mist">{resultLabel}</p>
          <p className="mt-2 font-display text-[clamp(2.6rem,12vw,4.5rem)] leading-none text-white" aria-live="polite">
            {kronor(value * rate)}
          </p>
          <p className="mt-3 text-sm text-mist">
            {value} {plural(value, noun[0], noun[1])} × {kronor(rate)}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

export function BookletCalculator() {
  const { booklets, setBooklets } = useEarnings();
  return (
    <Calculator
      id="kalkyl-hafte"
      kicker="Per sålt häfte"
      rate={site.bookletKronor}
      rateLabel="kronor till föreningen"
      noun={["häfte", "häften"]}
      value={booklets}
      onChange={setBooklets}
      note="150 kronor går till föreningen för varje häfte som säljs. Med köp 1, sälj 1 tar varje medlem två häften per utgåva: ett själv och ett att sälja vidare. Det här är ett räkneexempel."
      resultLabel="Föreningen får"
    >
      <BookletMembers onApply={setBooklets} />
    </Calculator>
  );
}

function BookletMembers({ onApply }: { onApply: (count: number) => void }) {
  const [members, setMembers] = useState(300);
  const [each, setEach] = useState(2);
  const [editions, setEditions] = useState<1 | 2>(1);
  const booklets = members * each * editions;

  function apply(nextMembers: number, nextEach: number, nextEditions: 1 | 2) {
    onApply(nextMembers * nextEach * nextEditions);
  }

  return (
    <div className="mt-8 border-t border-white/10 pt-6">
      <p className="text-[0.72rem] uppercase tracking-[0.28em] text-cyan">Köp 1, sälj 1</p>
      <p className="mt-3 max-w-xl text-sm leading-6 text-mist">
        Varje medlem köper ett häfte och säljer ett. Det blir två häften per medlem och utgåva. Siffran går att ändra.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_auto] lg:items-end">
        <label className="block text-sm text-mist">
          Medlemmar
          <input
            type="number"
            min={0}
            max={MAX}
            value={members}
            onChange={(event) => {
              const next = clampCount(Number(event.target.value), MAX);
              setMembers(next);
              apply(next, each, editions);
            }}
            onWheel={(event) => event.currentTarget.blur()}
            className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white outline-none focus:border-cyan"
          />
        </label>
        <label className="block text-sm text-mist">
          Häften per medlem
          <input
            type="number"
            min={1}
            max={20}
            value={each}
            onChange={(event) => {
              const next = Math.max(1, clampCount(Number(event.target.value), 20));
              setEach(next);
              apply(members, next, editions);
            }}
            onWheel={(event) => event.currentTarget.blur()}
            className="mt-2 w-full border-b border-white/20 bg-transparent py-2 text-white outline-none focus:border-cyan"
          />
        </label>
        <div>
          <p id="utgavor-label" className="text-sm text-mist">
            Utgåvor per år
          </p>
          <div className="mt-2 flex gap-2" role="group" aria-labelledby="utgavor-label">
            {([1, 2] as const).map((count) => (
              <button
                key={count}
                type="button"
                aria-pressed={editions === count}
                onClick={() => {
                  setEditions(count);
                  apply(members, each, count);
                }}
                className={`border px-4 py-2 font-display text-lg uppercase tracking-[0.08em] transition ${
                  editions === count ? "border-cyan bg-cyan text-ink" : "border-white/15 text-white hover:border-cyan"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => apply(members, each, editions)}
          className="border border-cyan px-4 py-3 font-display text-xl uppercase tracking-[0.1em] text-cyan transition hover:bg-cyan hover:text-ink"
        >
          Använd
        </button>
      </div>
      <p className="mt-4 text-sm text-mist" aria-live="polite">
        {members} {plural(members, "medlem", "medlemmar")} × {each} {plural(each, "häfte", "häften")} × {editions}{" "}
        {plural(editions, "utgåva", "utgåvor")} = {booklets} {plural(booklets, "häfte", "häften")}. {kronor(booklets * site.bookletKronor)} på ett år.
      </p>
    </div>
  );
}

export function ProductCalculator() {
  const { products, setProducts, bookletTotal } = useEarnings();
  return (
    <Calculator
      id="kalkyl-produkt"
      kicker="Per såld produkt"
      rate={site.productKronor}
      rateLabel="kronor till lagkassan"
      noun={["produkt", "produkter"]}
      value={products}
      onChange={setProducts}
      note="75 kronor per såld produkt går in i lagkassan."
      resultLabel="Lagkassan får"
    >
      <p className="mt-6 text-sm text-mist">
        Tillsammans med häftet: <span className="text-white">{kronor(bookletTotal + products * site.productKronor)}</span>
      </p>
    </Calculator>
  );
}

export function CombinedTotal() {
  const { booklets, products, bookletTotal, productTotal, total } = useEarnings();
  return (
    <div className="border border-cyan/40 bg-cyan/10 p-6 sm:p-12">
      <Reveal>
        <p className="text-[0.72rem] uppercase tracking-[0.38em] text-cyan">Häftet och produkterna</p>
        <p className="mt-4 max-w-3xl font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-semibold uppercase leading-none text-white">
          Säljer ni båda
          <span className="line-soft">blir det</span>
          så här<span className="text-cyan">.</span>
        </p>
      </Reveal>
      <p className="mt-8 font-display text-[clamp(3rem,14vw,6rem)] leading-none text-cyan" aria-live="polite">
        {kronor(total)}
      </p>
      <p className="mt-4 max-w-xl text-mist">
        {booklets} {plural(booklets, "häfte", "häften")} × {kronor(site.bookletKronor)} = {kronor(bookletTotal)}. {products}{" "}
        {plural(products, "produkt", "produkter")} × {kronor(site.productKronor)} = {kronor(productTotal)}.
      </p>
      <p className="mt-3 max-w-xl text-sm text-mist">
        Ett räkneexempel för den som vill ta med båda. Häftet ger föreningen 150 kronor, produkterna ger lagkassan 75 kronor.
      </p>
      <a
        href="#kontakt"
        className="mt-8 inline-flex bg-cyan px-5 py-3 font-display text-xl uppercase tracking-[0.12em] text-ink transition hover:bg-white"
      >
        Ta med siffran till ett samtal
      </a>
    </div>
  );
}
