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
};

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

export function ContactForm({ allowed, subject = "Built2Perform", hints }: ContactFormProps = {}) {
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
      <fieldset>
        <legend className="text-[0.72rem] uppercase tracking-[0.28em] text-mist">Jag är</legend>
        <div className={`mt-3 grid gap-2 ${choices.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
          {choices.map((item) => (
            <label
              key={item.id}
              className={`cursor-pointer border p-4 transition ${role === item.id ? "border-cyan bg-cyan/10" : "border-white/15 hover:border-white/40"}`}
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
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Namn" value={fields.name} error={errors.name} onChange={(value) => set("name", value)} autoComplete="name" />
        <Field label="E-post" value={fields.email} error={errors.email} onChange={(value) => set("email", value)} type="email" autoComplete="email" />
        <Field label="Telefon" value={fields.phone} onChange={(value) => set("phone", value)} type="tel" autoComplete="tel" optional />
        <Field label="Ort" value={fields.city} onChange={(value) => set("city", value)} autoComplete="address-level2" optional />
        {role !== "kund" ? (
          <Field label={orgLabel} value={fields.organization} error={errors.organization} onChange={(value) => set("organization", value)} />
        ) : (
          <Field label="Förening" value={fields.organization} onChange={(value) => set("organization", value)} optional />
        )}
        {role === "forening" ? (
          <Field label="Ungefär antal medlemmar" value={fields.members} onChange={(value) => set("members", value)} inputMode="numeric" optional />
        ) : null}
      </div>

      <label className="block">
        <span className="text-[0.72rem] uppercase tracking-[0.28em] text-mist">Meddelande</span>
        <textarea
          value={fields.message}
          onChange={(event) => set("message", event.target.value)}
          rows={5}
          aria-invalid={errors.message ? true : undefined}
          className="mt-2 w-full resize-y border-b border-white/20 bg-transparent py-3 text-white outline-none focus:border-cyan"
        />
        {errors.message ? <span className="mt-2 block text-sm text-cyan">{errors.message}</span> : null}
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="bg-cyan px-6 py-3 font-display text-2xl uppercase tracking-[0.12em] text-ink transition hover:bg-white">
          Skriv till oss
        </button>
        <a href={`mailto:${site.email}`} className="text-sm text-mist underline decoration-white/20 underline-offset-4 hover:text-white">
          eller mejla {site.email}
        </a>
      </div>
      {sent ? (
        <p className="text-sm leading-6 text-mist" role="status">
          Mejlprogrammet ska ha öppnats med ditt meddelande. Om inget hände, skriv direkt till {site.email}. Vi läser det som kommer fram.
        </p>
      ) : null}
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
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  optional?: boolean;
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
        className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-white outline-none focus:border-cyan"
      />
      {error ? <span className="mt-2 block text-sm text-cyan">{error}</span> : null}
    </label>
  );
}
