"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "b2p-cookie";
const CHANGE = "b2p-cookie-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE, onStoreChange);
  return () => window.removeEventListener(CHANGE, onStoreChange);
}

function accepted() {
  return window.localStorage.getItem(STORAGE_KEY) === "ok";
}

export function CookieBanner() {
  const dismissed = useSyncExternalStore(subscribe, accepted, () => true);
  if (dismissed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/15 bg-ink/95 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-mist">
          Vi sparar bara ditt val i webbläsaren. Inga reklam- eller analyscookies.{" "}
          <Link href="/cookies" className="text-cyan underline decoration-cyan/40 underline-offset-4">
            Läs om cookies
          </Link>
          .
        </p>
        <button
          type="button"
          className="shrink-0 bg-cyan px-4 py-2 font-display text-lg uppercase tracking-[0.12em] text-ink transition hover:bg-white"
          onClick={() => {
            window.localStorage.setItem(STORAGE_KEY, "ok");
            window.dispatchEvent(new Event(CHANGE));
          }}
        >
          Jag förstår
        </button>
      </div>
    </div>
  );
}
