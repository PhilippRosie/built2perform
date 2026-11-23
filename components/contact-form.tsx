"use client";

import { useState } from "react";
import { site } from "@/lib/site";

type Role = "forening" | "aktor" | "kund";

const roles: { id: Role; label: string; hint: string }[] = [
  { id: "forening", label: "Förening", hint: "Vi vill sälja häftet och produkterna." },
  { id: "aktor", label: "Lokal aktör", hint: "Vi vill vara med i häftet." },
  { id: "kund", label: "Slutkund", hint: "Jag vill veta mer om häftet." },
];

type ContactFormProps = {
  allowed?: Role[];
  subject?: string;
  hints?: Partial<Record<Role, string>>;
  tone?: "cyan" | "sand";
};

const toneClass = {
  cyan: {
    text: "text-cyan",
    button: "bg-cyan hover:bg-white",
    focus: "focus:border-cyan",
    selected: "border-cyan bg-cyan/10",
  },
  sand: {
    text: "text-[#e7dcc8]",
    button: "bg-[#e7dcc8] hover:bg-white",
    focus: "focus:border-[#e7dcc8]",
    selected: "border-[#e7dcc8] bg-[#e7dcc8]/10",
  },
} as const;

type Fields = {
  name: string;
  email: string;
  phone: string;
  city: string;
  organization: string;
  members: string;
  message: string;
};

const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  city: "",
  organization: "",
  members: "",
  message: "",
};

export function ContactForm({ allowed, subject = "Built2Perform", hints, tone = "cyan" }: ContactFormProps = {}) {
  const paint = toneClass[tone];
  const choices = roles
    .filter((item) => (allowed ? allowed.includes(item.id) : true))
    .map((item) => ({ ...item, hint: hints?.[item.id] ?? item.hint }));
  const [role, setRole] = useState<Role>(choices[0]?.id ?? "forening");
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);

  function set<K extends keyof Fields>(key: K, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSent(false);
  }

  function validate() {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) next.name = "Skriv ditt namn.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) next.email = "Skriv en e-postadress som går att nå.";
    if (role !== "kund" && fields.organization.trim().length < 2) {
      next.organization = role === "forening" ? "Skriv föreningens namn." : "Skriv företagets namn.";
    }
    if (fields.message.trim().length < 8) next.message = "Skriv några rader om vad ni vill.";
    return next;
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const roleLabel = choices.find((item) => item.id === role)?.label ?? role;
    const orgLabel = role === "aktor" ? "Företag" : "Förening";
    const lines = [
      `Jag är: ${roleLabel}`,
      `Namn: ${fields.name.trim()}`,
      `E-post: ${fields.email.trim()}`,
      fields.phone.trim() ? `Telefon: ${fields.phone.trim()}` : "",
      fields.city.trim() ? `Ort: ${fields.city.trim()}` : "",
      fields.organization.trim() ? `${orgLabel}: ${fields.organization.trim()}` : "",
      role === "forening" && fields.members.trim() ? `Ungefär antal medlemmar: ${fields.members.trim()}` : "",
      "",
      fields.message.trim(),
    ].filter(Boolean);

    const href = `mailto:${site.email}?subject=${encodeURIComponent(`${subject} — ${roleLabel}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setSent(true);
  }

  const orgLabel = role === "aktor" ? "Företag" : "Förening";

  return (
    <form onSubmit={submit} noValidate className="grid gap-6">
      {choices.length > 1 ? (
      <div className="contact-beat">
      <fieldset>
        <legend className="contact-chip text-[0.72rem] uppercase tracking-[0.28em] text-mist">Jag är</legend>
        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {choices.map((item) => (
            <label
              key={item.id}
              className={`contact-chip cursor-pointer border p-4 transition ${role === item.id ? paint.selected : "border-white/15 hover:border-white/40"}`}
            >
              <input
                type="radio"
                name="roll"
                value={item.id}
                checked={role === item.id}
                onChange={() => {
                  setRole(item.id);
                  setSent(false);
                }}
                className="sr-only"
              />
              <span className="block font-display text-2xl uppercase text-white">{item.label}</span>
              <span className="mt-1 block text-sm text-mist">{item.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>
      </div>
      ) : null}

      <div className="contact-beat grid gap-4 lg:grid-cols-2 lg:gap-6">
        <div className="contact-chip"><Field label="Namn" value={fields.name} error={errors.name} onChange={(value) => set("name", value)} autoComplete="name" paint={paint} /></div>
        <div className="contact-chip"><Field label="E-post" value={fields.email} error={errors.email} onChange={(value) => set("email", value)} type="email" autoComplete="email" paint={paint} /></div>
        <div className="contact-chip"><Field label="Telefon" value={fields.phone} onChange={(value) => set("phone", value)} type="tel" autoComplete="tel" optional paint={paint} /></div>
        <div className="contact-chip"><Field label="Ort" value={fields.city} onChange={(value) => set("city", value)} autoComplete="address-level2" optional paint={paint} /></div>
      </div>

      <div className="contact-beat grid gap-4 lg:grid-cols-2 lg:gap-6">
        {role !== "kund" ? (
          <div className="contact-chip">
            <Field label={orgLabel} value={fields.organization} error={errors.organization} onChange={(value) => set("organization", value)} paint={paint} />
          </div>
        ) : (
          <div className="contact-chip">
            <Field label="Förening" value={fields.organization} onChange={(value) => set("organization", value)} optional paint={paint} />
          </div>
        )}
        {role === "forening" ? (
          <div className="contact-chip">
            <Field label="Antal medlemmar" value={fields.members} onChange={(value) => set("members", value)} inputMode="numeric" optional paint={paint} />
          </div>
        ) : null}
        <label className="contact-chip col-span-2 block">
          <span className="text-[0.72rem] uppercase tracking-[0.28em] text-mist">Meddelande</span>
          <textarea
            value={fields.message}
            onChange={(event) => set("message", event.target.value)}
            rows={4}
            aria-invalid={errors.message ? true : undefined}
            className={`mt-2 w-full resize-none border-b border-white/20 bg-transparent py-3 text-base text-white outline-none ${paint.focus}`}
          />
          {errors.message ? <span className={`mt-2 block text-sm ${paint.text}`}>{errors.message}</span> : null}
        </label>

        <div className="contact-chip col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center">
          <button type="submit" className={`${paint.button} w-fit px-6 py-3 font-display text-2xl uppercase tracking-[0.12em] text-ink transition`}>
            Skriv till oss
          </button>
          <a href={`mailto:${site.email}`} className="text-sm text-mist underline decoration-white/20 underline-offset-4 hover:text-white">
            eller mejla {site.email}
          </a>
        </div>
        {sent ? (
          <p className="col-span-2 text-sm leading-6 text-mist" role="status">
            Mejlprogrammet ska ha öppnats med ditt meddelande. Om inget hände, skriv direkt till {site.email}. Vi läser det som kommer fram.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  inputMode,
  optional = false,
  paint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  optional?: boolean;
  paint: (typeof toneClass)[keyof typeof toneClass];
}) {
  const id = label.toLowerCase().replaceAll(" ", "-").replaceAll("ä", "a").replaceAll("ö", "o");
  return (
    <label className="block" htmlFor={id}>
      <span className="text-[0.72rem] uppercase tracking-[0.28em] text-mist">
        {label}
        {optional ? " (valfritt)" : ""}
      </span>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        className={`mt-2 w-full border-b border-white/20 bg-transparent py-3 text-base text-white outline-none ${paint.focus}`}
      />
      {error ? <span className={`mt-2 block text-sm ${paint.text}`}>{error}</span> : null}
    </label>
  );
}
