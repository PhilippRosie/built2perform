"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const ENTER = 1.05;
const EXIT = 0.95;
const OVERLAP = 0.4;

type Segment = {
  node: HTMLElement;
  enterAt: number;
  holdStart: number;
  holdDur: number;
  travelPx: number;
};

export function scrollHomeChapter(id: string) {
  if (typeof document === "undefined") return false;
  if (document.documentElement.dataset.homeStage !== "on") return false;
  window.dispatchEvent(new CustomEvent("homestage-go", { detail: id }));
  return true;
}

export function HomeStage({ children }: { children: ReactNode }) {
  const spacer = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const [atEnd, setAtEnd] = useState(false);
  const atEndRef = useRef(false);

  useLayoutEffect(() => {
    const box = viewport.current;
    if (!box) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ctx: gsap.Context | null = null;
    let timeline: gsap.core.Timeline | null = null;
    let segments: Segment[] = [];
    let offsets = new Map<string, { node: HTMLElement; top: number }>();
    let marks: { id: string; at: number }[] = [{ id: "top", at: 0 }];
    let nodes: HTMLElement[] = [];
    let timer = 0;
    let chapter = "";
    let booted = false;
    let distance = 0;
    let paint = (_time: number) => {};

    const timeFor = (id: string) => {
      if (id === "top") return 0;
      const found = offsets.get(id);
      const seg = found ? segments.find((item) => item.node === found.node) : segments.find((item) => item.node.id === id);
      if (!seg) return null;
      if (!found || seg.travelPx < 48) return seg.holdStart;
      const progress = gsap.utils.clamp(0, 1, Math.max(0, found.top - 96) / seg.travelPx);
      return seg.holdStart + progress * seg.holdDur;
    };

    const yFor = (id: string) => {
      if (!timeline || distance <= 0) return null;
      const time = timeFor(id);
      if (time == null) return null;
      const span = Math.max(timeline.duration(), 0.001);
      const progress = gsap.utils.clamp(0, 1, time / span);
      return progress * distance;
    };

    const scrollToId = (id: string, immediate: boolean) => {
      const y = yFor(id);
      if (y == null) return;
      const scroller = lenisRef.current;
      if (scroller) scroller.scrollTo(y, { force: true, immediate, duration: immediate ? 0 : 1.15 });
      else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
    };

    const publish = (time: number) => {
      let id = marks[0]?.id ?? "top";
      for (const mark of marks) if (time + 0.02 >= mark.at) id = mark.id;
      if (id === chapter) return;
      chapter = id;
      window.dispatchEvent(new CustomEvent("homestage-chapter", { detail: id }));
    };

    const teardown = (notify: boolean) => {
      window.clearTimeout(timer);
      for (const node of nodes) {
        node.inert = false;
        node.style.pointerEvents = "";
        node.style.zoom = "";
        delete node.dataset.homeScene;
      }
      nodes = [];
      segments = [];
      offsets = new Map();
      marks = [{ id: "top", at: 0 }];
      chapter = "";
      distance = 0;
      if (spacer.current) spacer.current.style.height = "";
      ScrollTrigger.getById("home")?.kill();
      if (box) {
        box.style.transform = "none";
        box.style.top = "0px";
      }
      ctx?.revert();
      ctx = null;
      timeline = null;
      if (notify && document.documentElement.dataset.homeStage === "on") {
        delete document.documentElement.dataset.homeStage;
        window.dispatchEvent(new Event("homestage"));
      }
    };

    const build = () => {
      const kept = timeline?.scrollTrigger && timeline.scrollTrigger.progress > 0.001 ? timeline.scrollTrigger.progress : undefined;
      teardown(false);
      if (motion.matches) {
        if (document.documentElement.dataset.homeStage === "on") {
          delete document.documentElement.dataset.homeStage;
          window.dispatchEvent(new Event("homestage"));
        }
        return;
      }

      const root = document.documentElement;
      const first = root.dataset.homeStage !== "on";
      root.dataset.homeStage = "on";
      if (first) window.dispatchEvent(new Event("homestage"));

      ctx = gsap.context(() => {
        const frame = window.innerHeight;
        const phone = window.matchMedia("(max-width: 1023px)").matches;
        gsap.set(box, { height: frame, overflow: "hidden" });
        const scenes = [...box.children].filter((node): node is HTMLElement => node instanceof HTMLElement);
        nodes = scenes;

        scenes.forEach((node, index) => {
          const isTicker = node.tagName !== "SECTION" && Boolean(node.querySelector(".marquee-track"));
          const isPhoto = node.classList.contains("max-h-[78svh]");
          const isHero = node.id === "top";
          const isChain = node.id === "kedjan";
          gsap.set(node, {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            minHeight: "100%",
            zIndex: index === 0 ? 2 : 1,
            autoAlpha: index === 0 ? 1 : 0,
            y: 0,
            scale: 1,
            transformOrigin: "50% 40%",
          });
          if (isHero) {
            gsap.set(node, { height: frame, minHeight: 0, overflow: "hidden" });
            const media = node.querySelector<HTMLElement>(".hero-media");
            const photoH = phone ? Math.round(Math.min(frame * 0.4, 340)) : 0;
            if (media) {
              gsap.set(media, phone ? { top: 0, height: photoH, aspectRatio: "auto" } : { top: "-8%", height: "120%", aspectRatio: "auto" });
              const img = media.querySelector("img");
              if (img && phone) img.style.objectPosition = img.dataset.heroFocus === "center" ? "center center" : "center 36%";
              const shade = media.querySelector<HTMLElement>(":scope > div");
              if (shade && phone) {
                shade.style.background =
                  "linear-gradient(to bottom, rgba(5,7,12,0.18) 0%, rgba(5,7,12,0.05) 55%, rgba(5,7,12,0.72) 86%, #05070c 100%)";
              }
            }
            const copy = node.querySelector<HTMLElement>(".hero-copy");
            if (copy) {
              const topPad = phone ? 12 : Math.max(68, Math.round(frame * 0.1));
              const bottomPad = Math.max(72, Math.round(frame * 0.16));
              gsap.set(copy, {
                position: "absolute",
                inset: phone ? "auto 0 0 0" : 0,
                top: phone ? photoH - 36 : 0,
                height: "auto",
                minHeight: 0,
                maxHeight: "none",
                justifyContent: phone ? "flex-start" : "flex-end",
                paddingTop: topPad,
                paddingBottom: bottomPad,
              });
              const first = copy.firstElementChild?.getBoundingClientRect();
              const last = copy.lastElementChild?.getBoundingClientRect();
              if (phone && first && last && last.bottom > frame - 8) {
                const available = Math.max(1, frame - (photoH - 36) - bottomPad - 8);
                const span = Math.max(1, last.bottom - first.top);
                gsap.set(copy, {
                  transformOrigin: "center top",
                  scale: Math.max(0.82, available / span),
                });
              } else if (first && last && (first.top < 12 || last.bottom > frame - 8)) {
                const span = Math.max(1, last.bottom - first.top);
                gsap.set(copy, {
                  transformOrigin: "center bottom",
                  scale: Math.max(0.68, (frame - topPad - bottomPad) / span),
                });
              }
            }
          }
          if (isChain) {
            gsap.set(node, { height: "100%", overflow: "hidden" });
            const chainViewport = node.querySelector(".chain-viewport");
            if (chainViewport) gsap.set(chainViewport, { height: "100%", overflow: "hidden" });
            const track = node.querySelector<HTMLElement>(".chain-track");
            if (track) {
              gsap.set(track, {
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                alignItems: "stretch",
                width: "max-content",
                height: "100%",
              });
            }
            node.querySelectorAll<HTMLElement>(".chain-panel").forEach((panel) => {
              gsap.set(panel, {
                width: window.innerWidth,
                minWidth: window.innerWidth,
                maxWidth: window.innerWidth,
                height: "100%",
                minHeight: 0,
                flex: "0 0 auto",
                overflow: "hidden",
              });
              if (phone && panel.querySelector(".chain-media")) {
                gsap.set(panel, {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  paddingTop: "4.6rem",
                });
                const media = panel.querySelector<HTMLElement>(".chain-media");
                if (media) {
                  gsap.set(media, {
                    flex: "0 0 auto",
                    alignSelf: "stretch",
                    width: "auto",
                    height: "auto",
                    minHeight: 0,
                    maxHeight: "none",
                    aspectRatio: "4 / 3",
                    marginLeft: "1.25rem",
                    marginRight: "1.25rem",
                  });
                }
              }
              const copy = panel.querySelector<HTMLElement>(".chain-copy");
              if (phone && copy && panel.querySelector(".chain-media")) {
                gsap.set(copy, { marginTop: "-5.5rem", paddingTop: 0, paddingBottom: "4.75rem" });
              }
              if (copy) {
                const overflow = copy.getBoundingClientRect().bottom - (panel.getBoundingClientRect().bottom - 12);
                if (overflow > 8) {
                  const height = copy.getBoundingClientRect().height;
                  gsap.set(copy, { transformOrigin: "left bottom", scale: Math.max(0.74, (height - overflow) / height) });
                }
              }
            });
          }
          if (isPhoto) gsap.set(node, { height: "100%", maxHeight: "none", aspectRatio: "auto", overflow: "hidden" });
          if (isTicker) {
            gsap.set(node, {
              height: "100%",
              minHeight: "100%",
              overflow: "hidden",
              borderTopWidth: 0,
              borderBottomWidth: 0,
            });
          }
          if (phone) {
            node.querySelectorAll<HTMLElement>(".stroke-run").forEach((stroke) => {
              gsap.set(stroke, { top: "4.35rem" });
            });
          }
          node.dataset.homeScene = node.id || (isTicker ? "ticker" : isPhoto ? "photo" : `scene-${index}`);
        });

        const fitScene = (node: HTMLElement) => {
          const backdrop = node.querySelector(":scope > .pointer-events-none.absolute");
          const foreground = node.querySelector<HTMLElement>(":scope > .page-x");
          if (backdrop && foreground) {
            node.style.zoom = "";
            gsap.set(node, {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              minHeight: "100%",
              scale: 1,
              x: 0,
              y: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            });
            const strokes = [...node.querySelectorAll<HTMLElement>(".stroke-run")];
            strokes.forEach((stroke) => {
              stroke.style.display = "none";
            });
            const natural = foreground.scrollHeight;
            strokes.forEach((stroke) => {
              stroke.style.display = "";
            });
            const shift = Math.round(frame * 0.06);
            if (natural > frame - 24) {
              gsap.set(foreground, { width: "100%", transformOrigin: "center center", scale: (frame - 24) / natural, y: shift });
            } else {
              gsap.set(foreground, { width: "100%", y: shift });
            }
            return;
          }
          node.style.zoom = "";
          gsap.set(node, {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            minHeight: 0,
            x: 0,
            y: 0,
            scale: 1,
            transformOrigin: "top center",
          });
          const strokes = [...node.querySelectorAll<HTMLElement>(".stroke-run")];
          strokes.forEach((stroke) => {
            stroke.style.display = "none";
          });
          const natural = node.scrollHeight;
          strokes.forEach((stroke) => {
            stroke.style.display = "";
          });
          if (natural <= frame - 8) {
            gsap.set(node, {
              height: "100%",
              minHeight: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            });
            return;
          }
          gsap.set(node, { transformOrigin: "top center", scale: (frame - 8) / natural });
        };

        const layoutStrip = (node: HTMLElement) => {
          node.querySelectorAll<HTMLElement>(".stage-strip").forEach((strip) => {
            const cards = [...strip.children].filter((child): child is HTMLElement => child instanceof HTMLElement);
            gsap.set(strip, {
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "stretch",
              gap: "0.75rem",
              width: "100%",
              overflow: "visible",
            });
            strip.style.touchAction = "pan-y";
            gsap.set(cards, {
              flex: "0 0 82%",
              width: "82%",
              minWidth: "82%",
              maxWidth: "82%",
            });
          });
        };
        const layoutSplitHero = (node: HTMLElement) => {
          const photo = node.querySelector<HTMLElement>(".hero-split-media");
          const copy = node.querySelector<HTMLElement>(".hero-split-copy");
          gsap.set(node, { height: "100%", minHeight: "100%", overflow: "hidden", display: "flex", flexDirection: "column" });
          if (photo) {
            gsap.set(photo, {
              position: "relative",
              width: "100%",
              height: Math.round(Math.min(frame * 0.4, 340)),
              minHeight: 0,
            });
            const img = photo.querySelector("img");
            if (img) img.style.objectPosition = "center 34%";
          }
          if (copy) {
            gsap.set(copy, {
              position: "relative",
              flex: "1 1 auto",
              minHeight: 0,
              width: "100%",
              paddingTop: "0.75rem",
              paddingBottom: "4.75rem",
              justifyContent: "flex-start",
            });
          }
        };
        const layoutHaftePhoto = (node: HTMLElement) => {
          const backdrop = node.querySelector<HTMLElement>(":scope > .pointer-events-none.absolute");
          const foreground = node.querySelector<HTMLElement>(":scope > .page-x");
          if (!backdrop) return;
          const band = Math.round(Math.min(frame * 0.28, 220));
          gsap.set(backdrop, {
            top: 58,
            bottom: "auto",
            height: band,
            left: 0,
            right: 0,
          });
          const img = backdrop.querySelector("img");
          if (img) img.style.objectPosition = "center 72%";
          const veils = backdrop.querySelectorAll<HTMLElement>(":scope > div");
          if (veils[0]) veils[0].style.opacity = "0.12";
          if (veils[1]) {
            veils[1].style.background =
              "linear-gradient(to bottom, rgba(5,7,12,0.12) 0%, rgba(5,7,12,0) 16%, rgba(5,7,12,0.72) 68%, #05070c 100%)";
          }
          if (foreground) gsap.set(foreground, { paddingTop: 58 + band - 108 });
        };
        const phoneCards = (node: HTMLElement) => {
          if (!phone) return [];
          if (node.id === "hafte") return [...node.querySelectorAll<HTMLElement>("ol > li")];
          if (node.id === "aktorer") return [...node.querySelectorAll<HTMLElement>("ul > li")];
          if (node.id === "mer") return [...node.querySelectorAll<HTMLElement>("article")];
          if (node.querySelector("#kund")) return [...node.querySelectorAll<HTMLElement>(".savings-beat")];
          if (node.querySelector("#kalkyl-hafte")) return [...node.querySelectorAll<HTMLElement>(".calc-beat")];
          const listed = [...node.querySelectorAll<HTMLElement>(":scope .stage-cards > li")];
          if (listed.length > 1) return listed;
          return [];
        };
        const stackCards = (cards: HTMLElement[]) => {
          const parent = cards[0]?.parentElement;
          if (!parent || cards.length < 2) return;
          gsap.set(parent, { display: "grid", gridTemplateColumns: "minmax(0, 1fr)" });
          gsap.set(cards, { gridArea: "1 / 1", minWidth: 0, width: "100%" });
        };
        const layoutActors = (node: HTMLElement) => {
          const media = node.querySelector<HTMLElement>(".actor-media");
          const page = node.querySelector<HTMLElement>(".page-x");
          const note = page?.querySelector<HTMLElement>(":scope > div > p");
          gsap.set(node, { height: "100%", minHeight: "100%", overflow: "hidden", paddingTop: 0, paddingBottom: 0 });
          if (media) {
            gsap.set(media, {
              position: "relative",
              width: "100%",
              height: Math.round(Math.min(frame * 0.28, 210)),
              minHeight: 0,
              aspectRatio: "auto",
            });
            const shade = media.querySelector<HTMLElement>(":scope > div");
            if (shade) {
              shade.style.backgroundImage =
                "linear-gradient(to top, #05070c 0%, rgba(5,7,12,0.72) 22%, rgba(5,7,12,0.08) 62%, rgba(5,7,12,0) 100%)";
            }
            const photo = media.querySelector("img");
            if (photo) photo.style.objectPosition = "62% 42%";
          }
          if (page) {
            gsap.set(page, {
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: "0.85rem",
              paddingTop: "4.6rem",
              paddingBottom: "5.4rem",
              gridTemplateColumns: "minmax(0, 1fr)",
            });
          }
          if (note) gsap.set(note, { display: "none" });
        };
        const layoutSavings = (node: HTMLElement) => {
          const page = node.querySelector<HTMLElement>(".page-x");
          const kund = node.querySelector<HTMLElement>("#kund");
          const beats = [...node.querySelectorAll<HTMLElement>(".savings-beat")];
          gsap.set(node, { height: "100%", minHeight: "100%", overflow: "hidden", paddingTop: 0, paddingBottom: 0 });
          if (page) gsap.set(page, { height: "100%", display: "flex", alignItems: "stretch" });
          if (kund) {
            gsap.set(kund, {
              marginTop: 0,
              width: "100%",
              height: "100%",
              border: "0",
              background: "transparent",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
            });
          }
          gsap.set(beats, {
            gridArea: "1 / 1",
            minWidth: 0,
            width: "100%",
            paddingTop: "4.75rem",
            paddingBottom: "5.4rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          });
        };
        const layoutTeam = (node: HTMLElement) => {
          const page = node.querySelector<HTMLElement>(".page-x");
          const intro = node.querySelector<HTMLElement>(".team-beat");
          const grid = node.querySelector<HTMLElement>(".team-grid");
          const cards = [...node.querySelectorAll<HTMLElement>(".team-grid .team-beat")];
          gsap.set(node, { height: "100%", minHeight: "100%", overflow: "hidden", paddingTop: 0, paddingBottom: 0 });
            if (page) {
            gsap.set(page, {
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0.85rem",
              overflow: "hidden",
              paddingTop: "4.5rem",
              paddingBottom: "5.2rem",
              paddingLeft: 0,
              paddingRight: 0,
            });
          }
          if (intro) {
            gsap.set(intro, {
              position: "relative",
              height: "auto",
              width: "auto",
              margin: 0,
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              display: "block",
            });
          }
          if (grid) {
            gsap.set(grid, {
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "stretch",
              gap: "0.75rem",
              marginTop: 0,
              width: "100%",
              height: "auto",
              minHeight: 0,
              overflow: "visible",
              paddingLeft: "1.25rem",
              paddingRight: "1.25rem",
              paddingBottom: "0.25rem",
            });
            grid.style.touchAction = "pan-y";
          }
          const cardWidth = grid ? Math.max(0, grid.clientWidth - 40 - 72) : 0;
          gsap.set(cards, {
            position: "relative",
            flex: cardWidth ? `0 0 ${cardWidth}px` : "0 0 100%",
            width: cardWidth || "100%",
            minWidth: cardWidth || "100%",
            maxWidth: cardWidth || "100%",
            height: "auto",
            margin: 0,
            padding: 0,
            scrollSnapAlign: "start",
            display: "flex",
            flexDirection: "column",
          });
          gsap.set(node.querySelectorAll(".team-photo"), {
            height: Math.round(Math.min(frame * 0.28, 220)),
            width: "100%",
            aspectRatio: "auto",
          });
        };
        const layoutContact = (node: HTMLElement) => {
          const page = node.querySelector<HTMLElement>(".page-x");
          gsap.set(node, { height: "100%", minHeight: "100%", overflow: "hidden", paddingTop: 0, paddingBottom: 0 });
          if (page) {
            gsap.set(page, {
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0.4rem",
              paddingTop: "4.5rem",
              paddingBottom: "5.6rem",
              scale: 1,
              transformOrigin: "center center",
            });
          }
          const heading = node.querySelector<HTMLElement>("h2");
          if (heading) gsap.set(heading, { marginTop: "0.3rem", fontSize: "2.2rem" });
          const soft = node.querySelector<HTMLElement>("h2 .line-soft");
          if (soft) gsap.set(soft, { display: "inline", margin: "0 0.4rem 0 0", fontSize: "1em" });
          const next = node.querySelector<HTMLElement>("h2 .line-soft + .contact-line");
          if (next) gsap.set(next, { display: "inline" });
          const kicker = node.querySelector<HTMLElement>(".contact-beat > p.contact-line");
          if (kicker) gsap.set(kicker, { fontSize: "0.9rem" });
          const lead = node.querySelector<HTMLElement>(".contact-beat > p.contact-line:last-child");
          if (lead) gsap.set(lead, { marginTop: "0.4rem", maxWidth: "none", fontSize: "1.2rem", lineHeight: 1.35 });
          const form = node.querySelector<HTMLElement>("form");
          if (form) gsap.set(form, { gap: "0.45rem" });
          const legend = node.querySelector<HTMLElement>("legend");
          if (legend) gsap.set(legend, { fontSize: "0.84rem" });
          const roles = node.querySelector<HTMLElement>("fieldset > div");
          if (roles) gsap.set(roles, { marginTop: "0.3rem", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "0.45rem" });
          const roleLabels = node.querySelectorAll("fieldset label");
          if (roleLabels.length) gsap.set(roleLabels, { padding: "0.5rem 0.65rem" });
          const fieldGrid = node.querySelectorAll(".contact-beat.grid");
          if (fieldGrid.length) gsap.set(fieldGrid, { gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "0.3rem 0.7rem" });
          const fieldLabels = node.querySelectorAll("form label > span");
          if (fieldLabels.length) gsap.set(fieldLabels, { fontSize: "1rem", letterSpacing: "0.06em" });
          const roleTitles = node.querySelectorAll("fieldset .font-display");
          if (roleTitles.length) gsap.set(roleTitles, { fontSize: "1.4rem", letterSpacing: "0.02em" });
          const roleHints = node.querySelectorAll("fieldset .text-sm");
          if (roleHints.length) gsap.set(roleHints, { marginTop: "0.15rem", fontSize: "1rem", lineHeight: 1.3, letterSpacing: "0" });
          const inputs = node.querySelectorAll("form input:not([type='radio']), form textarea");
          if (inputs.length) gsap.set(inputs, { marginTop: "0.1rem", paddingTop: "0.22rem", paddingBottom: "0.22rem", fontSize: "1.0625rem" });
          const message = node.querySelector<HTMLElement>("textarea");
          if (message) gsap.set(message, { minHeight: "2.4rem", maxHeight: "2.9rem" });
          const submit = node.querySelector<HTMLElement>("button[type='submit']");
          if (submit) gsap.set(submit, { padding: "0.5rem 0.9rem", fontSize: "1.4rem" });
          const mail = node.querySelector<HTMLElement>("form a[href^='mailto']");
          if (mail) gsap.set(mail, { display: "none" });
          if (page) {
            const rects = [...page.children].map((el) => el.getBoundingClientRect());
            const top = Math.min(...rects.map((rect) => rect.top));
            const bottom = Math.max(...rects.map((rect) => rect.bottom));
            const safeTop = 70;
            const safeBottom = window.innerHeight - 78;
            const span = bottom - top;
            const room = safeBottom - safeTop;
            if (span > room + 2) gsap.set(page, { scale: room / span, transformOrigin: "center center" });
          }
        };

        scenes.forEach((node) => {
          const isTicker = node.tagName !== "SECTION" && Boolean(node.querySelector(".marquee-track"));
          const isPhoto = node.classList.contains("max-h-[78svh]");
          if (phone) stackCards(phoneCards(node));
          if (phone && node.id === "aktorer") {
            layoutActors(node);
            return;
          }
          if (phone && node.querySelector("#kund")) {
            layoutSavings(node);
            return;
          }
          if (phone && node.id === "kontakt" && node.querySelector(".team-beat")) {
            layoutTeam(node);
            return;
          }
          if (phone && node.id === "kontakt") {
            layoutContact(node);
            return;
          }
          if (phone && node.querySelector("#kalkyl-produkt")) {
            const root = node.querySelector<HTMLElement>("#kalkyl-produkt");
            const page = node.querySelector<HTMLElement>(".page-x");
            const beats = [...node.querySelectorAll<HTMLElement>("#kalkyl-produkt .calc-beat")];
            gsap.set(node, { height: "100%", minHeight: "100%", overflow: "hidden", paddingTop: 0, paddingBottom: 0 });
            if (page) {
              gsap.set(page, {
                height: "100%",
                display: "flex",
                alignItems: "center",
                paddingTop: "4.6rem",
                paddingBottom: "5rem",
              });
            }
            if (root) {
              gsap.set(root, {
                width: "100%",
                height: "auto",
                border: "0",
                background: "transparent",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                scale: 1,
              });
              const rate = root.querySelector<HTMLElement>(".calc-line.font-display");
              const rateLabel = rate?.nextElementSibling;
              if (rate) gsap.set(rate, { fontSize: "4.4rem", marginTop: "0.35rem" });
              if (rateLabel instanceof HTMLElement) gsap.set(rateLabel, { fontSize: "1.35rem" });
              const note = root.querySelector<HTMLElement>(".calc-line.mt-5");
              if (note) gsap.set(note, { marginTop: "0.45rem" });
              const presets = root.querySelector<HTMLElement>(".mt-3.flex");
              if (presets) {
                gsap.set(presets, {
                  display: "grid",
                  gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                  gap: "0.35rem",
                  marginTop: "0.65rem",
                });
                presets.querySelectorAll<HTMLElement>("button").forEach((button) => {
                  gsap.set(button, { padding: "0.45rem 0", fontSize: "0.95rem" });
                });
              }
              const sum = root.querySelector<HTMLElement>(".calc-part.mt-4");
              const sumFigure = sum?.querySelector<HTMLElement>(".font-display");
              if (sum) gsap.set(sum, { marginTop: "0.7rem" });
              if (sumFigure) gsap.set(sumFigure, { fontSize: "2.7rem" });
              const aside = root.querySelector<HTMLElement>(".calc-part.mt-4 + p, p.mt-6");
              if (aside) gsap.set(aside, { marginTop: "0.65rem" });
            }
            gsap.set(beats, {
              position: "relative",
              gridArea: "auto",
              width: "100%",
              minWidth: 0,
              padding: 0,
              autoAlpha: 1,
              y: 0,
            });
            if (root && page) {
              const room = frame - 76 - 88;
              const natural = root.scrollHeight;
              if (natural > room) {
                gsap.set(root, { transformOrigin: "center center", scale: Math.max(0.84, room / natural) });
              }
            }
            return;
          }
          if (phone && node.querySelector("#kalkyl-hafte")) {
            const root = node.querySelector<HTMLElement>("#kalkyl-hafte");
            const beats = [...node.querySelectorAll<HTMLElement>(".calc-beat")];
            const page = node.querySelector<HTMLElement>(".page-x");
            gsap.set(node, { height: "100%", minHeight: "100%", overflow: "hidden", paddingTop: 0, paddingBottom: 0 });
            if (page) gsap.set(page, { height: "100%", display: "flex", alignItems: "stretch" });
            if (root) {
              gsap.set(root, {
                width: "100%",
                height: "100%",
                border: "0",
                background: "transparent",
                padding: 0,
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr)",
              });
            }
            gsap.set(beats, {
              gridArea: "1 / 1",
              minWidth: 0,
              width: "100%",
              paddingTop: "4.75rem",
              paddingBottom: "5.4rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            });
            return;
          }
          if (node.id === "top" || node.id === "kedjan" || isPhoto) return;
          if (isTicker) return;
          if (phone && node.querySelector(".hero-split")) {
            layoutSplitHero(node);
            return;
          }
          if (phone && (node.id === "hafte" || node.id === "sortiment")) layoutHaftePhoto(node);
          if (phone && node.querySelector(".stage-strip")) {
            layoutStrip(node);
            const strip = node.querySelector<HTMLElement>(".stage-strip");
            const head = node.querySelector<HTMLElement>(":scope > .page-x");
            gsap.set(node, {
              height: "100%",
              minHeight: "100%",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingTop: "4.6rem",
              paddingBottom: "5.2rem",
              scale: 1,
            });
            if (head) gsap.set(head, { paddingTop: 0, paddingBottom: "0.85rem" });
            if (strip) gsap.set(strip, { flex: "0 0 auto", minHeight: 0 });
            return;
          }
          if (node.id === "forjanst") {
            const layout = node.querySelector<HTMLElement>(".forjanst-layout");
            gsap.set(node, { height: "100%", minHeight: "100%", overflow: "hidden", display: "block", scale: 1 });
            if (layout) gsap.set(layout, { height: "100%", minHeight: 0 });
            return;
          }
          fitScene(node);
          if (node.id === "lagkassan") {
            const photo = node.querySelector<HTMLElement>(":scope > .pointer-events-none.absolute");
            const foreground = node.querySelector<HTMLElement>(":scope > .page-x");
            if (phone) {
              gsap.set(node, { justifyContent: "flex-end" });
              if (photo) {
                gsap.set(photo, {
                  top: 46,
                  left: 0,
                  right: 0,
                  bottom: "auto",
                  width: "100%",
                  height: Math.round(frame * 0.78),
                });
              }
              if (foreground) {
                gsap.set(foreground, { y: 0, scale: 1, width: "100%", minHeight: 0, paddingTop: 0, paddingBottom: "7.25rem" });
              }
            } else if (foreground) {
              gsap.set(foreground, { y: 0, scale: 1, width: "min(40rem, 46%)", marginRight: "auto" });
            }
          }
          if (phone && (node.id === "hafte" || node.id === "sortiment")) {
            const foreground = node.querySelector<HTMLElement>(":scope > .page-x");
            gsap.set(node, { justifyContent: "flex-start" });
            if (foreground) gsap.set(foreground, { y: 0, scale: 1 });
          }
        });

        offsets = new Map();
        box.querySelectorAll<HTMLElement>("[id]").forEach((el) => {
          const scene = scenes.find((item) => item === el || item.contains(el));
          if (!scene) return;
          offsets.set(el.id, {
            node: scene,
            top: el.getBoundingClientRect().top - scene.getBoundingClientRect().top,
          });
        });

        const motionPieces = (node: HTMLElement) => {
          if (node.id === "top") return [...node.querySelectorAll<HTMLElement>(".hero-copy > *")];
          if (node.id === "kedjan") return [...node.querySelectorAll<HTMLElement>(".chain-panel .chain-copy")];
          if (node.id === "hafte") {
            return [
              ...node.querySelectorAll<HTMLElement>(":scope > .page-x > .grid > *"),
              ...node.querySelectorAll<HTMLElement>(":scope ol > li"),
            ];
          }
          if (node.id === "mer") {
            const heads = [...node.querySelectorAll<HTMLElement>(":scope .page-x > .reveal")].filter((el) => !el.querySelector("article"));
            return [...heads, ...node.querySelectorAll<HTMLElement>("article")];
          }
          if (node.id === "kontakt") {
            if (phone && node.querySelector(".team-beat")) {
              const intro = node.querySelector<HTMLElement>(".team-beat");
              return intro ? [intro] : [];
            }
            if (node.querySelector(".team-beat")) {
              const intro = node.querySelector<HTMLElement>(".team-beat");
              return [intro, ...node.querySelectorAll<HTMLElement>(".team-grid article")].filter((el): el is HTMLElement => el instanceof HTMLElement);
            }
            return [...node.querySelectorAll<HTMLElement>(":scope .page-x > *")];
          }
          if (node.id === "aktorer") {
            return [node.querySelector(".actor-media"), node.querySelector("h2"), ...node.querySelectorAll("li")].filter((el): el is HTMLElement => el instanceof HTMLElement);
          }
          const title = node.querySelector("h2");
          if (title?.querySelector(".ink-line")) {
            const lines = [...title.querySelectorAll<HTMLElement>(":scope > span")];
            const kicker = title.parentElement?.querySelector(":scope > p");
            const body = node.querySelector<HTMLElement>(":scope .page-x .reveal + .reveal p");
            return [kicker, ...lines, body].filter((el): el is HTMLElement => el instanceof HTMLElement);
          }
          const page = node.querySelector(":scope > .page-x");
          return page ? [...page.querySelectorAll<HTMLElement>(":scope > *")] : [];
        };

        const enterFrom = (node: HTMLElement, piece: number, count: number) => {
          if (node.id === "top") return { x: 0, y: 28 + piece * 6 };
          if (node.id === "kedjan") return { x: 48, y: 0 };
          if (node.id === "hafte") return piece < 2 ? { x: piece === 0 ? -88 : 88, y: 0 } : { x: 0, y: 72 };
          if (node.id === "mer") return piece >= count - 2 ? { x: piece % 2 ? 90 : -90, y: 20 } : { x: 0, y: 36 };
          if (node.id === "kontakt") return { x: piece === 0 ? -84 : 84, y: 0 };
          if (node.id === "aktorer") return piece === 0 ? { x: -90, y: 0 } : { x: 0, y: 28 + piece * 8 };
          if (node.querySelector(".ink-line")) return piece === 0 ? { x: 0, y: 18 } : { x: 0, y: 56 - piece * 8 };
          return { x: piece % 2 ? 28 : -28, y: 44 };
        };

        const tl = gsap.timeline({ paused: true });

        scenes.forEach((node, index) => {
          const isHero = node.id === "top";
          const isChain = node.id === "kedjan";
          const isTicker = node.tagName !== "SECTION" && Boolean(node.querySelector(".marquee-track"));
          const isPhoto = node.classList.contains("max-h-[78svh]");
          const enterAt = index === 0 ? 0 : Math.max(0, tl.duration() - OVERLAP);
          const cards = phoneCards(node);
          const staged = Boolean(phone && (node.querySelector("#kund") || node.querySelector("#kalkyl-hafte")));
          const introLines = staged ? [...node.querySelectorAll<HTMLElement>(".savings-line, .calc-line")] : [];
          const pieces = motionPieces(node).filter(
            (piece) =>
              !cards.includes(piece) &&
              !introLines.includes(piece) &&
              !(phone && (piece.closest(".savings-beat") || piece.closest(".calc-beat"))),
          );
          if (cards.length > 1) {
            gsap.set(cards, { autoAlpha: 0, y: 28 });
            gsap.set(cards[0], { autoAlpha: 1, y: 0 });
          }
          if (introLines.length) gsap.set(introLines, { autoAlpha: 0, y: 26 });
          if (staged) {
            gsap.set(node.querySelectorAll(".savings-part, .savings-chip, .calc-part, .calc-chip, .contact-chip, .team-chip"), { autoAlpha: 0, y: 18 });
          }
          pieces.forEach((piece) => {
            piece.style.animation = "none";
          });

          if (index > 0) {
            tl.fromTo(node, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9, ease: "power3.out" }, enterAt);
            pieces.forEach((piece, pieceIndex) => {
              const from = enterFrom(node, pieceIndex, pieces.length);
              tl.fromTo(
                piece,
                { autoAlpha: 0, x: from.x, y: from.y },
                { autoAlpha: 1, x: 0, y: 0, duration: 0.85, ease: "power4.out", immediateRender: true },
                enterAt + 0.16 + pieceIndex * 0.14,
              );
            });
            if (introLines.length) {
              introLines.forEach((line, lineIndex) => {
                const copy = lineIndex === introLines.length - 1;
                tl.fromTo(
                  line,
                  { autoAlpha: 0, y: copy ? 24 : line.classList.contains("ink-line") ? 14 : 36 },
                  { autoAlpha: 1, y: 0, duration: copy ? 0.9 : 0.75, ease: "power3.out", immediateRender: true },
                  enterAt + (copy ? 0.78 : 0.08 + lineIndex * 0.14),
                );
              });
            } else if (cards.length > 1) {
              tl.fromTo(
                cards[0],
                { autoAlpha: 0, y: 36 },
                { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", immediateRender: true },
                enterAt + 0.18,
              );
            }
          }
          tl.set(node, { zIndex: 10 + index }, enterAt);

          const arrival = pieces.length ? 0.16 + (pieces.length - 1) * 0.14 + 0.85 : 0.9;
          const phaseStart = index === 0 ? 0 : enterAt + Math.max(ENTER, arrival);
          let phaseDur = 1;
          if (isHero) phaseDur = 1.2;
          else if (isTicker) phaseDur = 0.7;
          else if (isPhoto) phaseDur = 1;

          if (isHero) {
            const media = node.querySelector(".hero-media");
            if (media) {
              tl.fromTo(media, { scale: 1.06, yPercent: 0 }, { scale: 1.14, yPercent: 5, ease: "none", duration: phaseDur }, phaseStart);
            } else {
              tl.to({}, { duration: phaseDur }, phaseStart);
            }
          } else if (isChain) {
            const track = node.querySelector<HTMLElement>(".chain-track");
            const panels = track ? [...track.children].filter((child): child is HTMLElement => child instanceof HTMLElement) : [];
            const slide = Math.max(2.8, panels.length * 0.95);
            phaseDur = slide;
            let panel = -1;
            if (track && panels.length > 1) {
              tl.fromTo(
                track,
                { x: 0 },
                {
                  x: () => -((panels.length - 1) * window.innerWidth),
                  ease: "none",
                  duration: slide,
                  onUpdate: () => {
                    const step = window.innerWidth;
                    const x = Math.abs(Number(gsap.getProperty(track, "x")) || 0);
                    const next = Math.min(panels.length - 1, Math.round(x / step));
                    if (next === panel) return;
                    panel = next;
                    window.dispatchEvent(new CustomEvent("chain-index", { detail: next }));
                  },
                },
                phaseStart,
              );
            } else {
              tl.to({}, { duration: slide }, phaseStart);
            }
          } else if (isPhoto) {
            const img = node.querySelector("img");
            if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, ease: "none", duration: phaseDur }, phaseStart);
            else tl.to({}, { duration: phaseDur }, phaseStart);
          } else if (phone && node.querySelector(".team-grid")) {
            const strip = node.querySelector<HTMLElement>(".team-grid");
            const people = strip ? [...strip.querySelectorAll<HTMLElement>(":scope > article")] : [];
            const hold = 0.45;
            const glide = 0.85;
            if (strip) tl.set(strip, { x: 0 }, phaseStart);
            tl.to({}, { duration: 0.3 }, phaseStart);
            people.forEach((_, personIndex) => {
              if (!strip || personIndex === 0) return;
              const at = phaseStart + 0.3 + (personIndex - 1) * (hold + glide);
              tl.to(
                strip,
                {
                  x: () => -(people[personIndex].offsetLeft - people[0].offsetLeft),
                  duration: glide,
                  ease: "power2.inOut",
                },
                at,
              );
            });
            tl.to({}, { duration: hold });
            phaseDur = Math.max(phaseDur, tl.duration() - phaseStart);
          } else if (phone && node.querySelector(".stage-strip")) {
            const strip = node.querySelector<HTMLElement>(".stage-strip");
            tl.to({}, { duration: 0.2 }, phaseStart);
            if (strip) {
              tl.fromTo(
                strip,
                { x: 0 },
                {
                  x: () => -Math.max(0, strip.scrollWidth - strip.clientWidth),
                  ease: "none",
                  duration: 3.2,
                },
                phaseStart + 0.2,
              );
            } else {
              tl.to({}, { duration: 3.2 });
            }
            tl.to({}, { duration: 0.35 });
            phaseDur = Math.max(phaseDur, tl.duration() - phaseStart);
          } else if (staged && cards.length > 1) {
            const fade = 0.85;
            const hold = 1.15;
            tl.to({}, { duration: hold }, phaseStart);
            cards.forEach((card, cardIndex) => {
              if (cardIndex === 0) return;
              const at = phaseStart + hold + (cardIndex - 1) * (hold + fade);
              const lines = [...cards[cardIndex - 1].querySelectorAll<HTMLElement>(".savings-line, .calc-line, .contact-line, .team-line")];
              lines.forEach((line, lineIndex) => {
                tl.to(line, { autoAlpha: 0, y: -18, duration: 0.42, ease: "power2.in" }, at + (lines.length - 1 - lineIndex) * 0.06);
              });
              tl.to(cards[cardIndex - 1], { autoAlpha: 0, y: -42, duration: fade, ease: "power2.inOut" }, at + 0.16);
              const bits = [...card.querySelectorAll<HTMLElement>(".savings-part, .savings-chip, .calc-part, .calc-chip, .contact-chip, .team-chip")];
              if (bits.length) {
                tl.set(card, { autoAlpha: 1, y: 0 }, at + 0.2);
                bits.forEach((bit, bitIndex) => {
                  const lead = bit.classList.contains("savings-part") || bit.classList.contains("calc-part");
                  tl.fromTo(
                    bit,
                    { autoAlpha: 0, y: lead ? 30 : 16 },
                    { autoAlpha: 1, y: 0, duration: lead ? 0.7 : 0.48, ease: "power3.out", immediateRender: true },
                    at + 0.24 + bitIndex * 0.06,
                  );
                });
              } else {
                tl.fromTo(
                  card,
                  { autoAlpha: 0, y: 56 },
                  { autoAlpha: 1, y: 0, duration: fade, ease: "power3.out" },
                  at + 0.28,
                );
              }
            });
            tl.to({}, { duration: hold });
            phaseDur = Math.max(phaseDur, tl.duration() - phaseStart);
          } else if (cards.length > 1) {
            const span = 1.2;
            cards.forEach((card, cardIndex) => {
              if (cardIndex === 0) return;
              const at = phaseStart + span * 0.45 + (cardIndex - 1) * span;
              tl.to(cards[cardIndex - 1], { autoAlpha: 0, y: -32, duration: 0.4, ease: "power2.in" }, at);
              tl.fromTo(
                card,
                { autoAlpha: 0, y: 36 },
                { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
                at + 0.16,
              );
            });
            tl.to({}, { duration: span * 0.7 });
            phaseDur = Math.max(phaseDur, tl.duration() - phaseStart);
          } else {
            tl.to({}, { duration: phaseDur }, phaseStart);
          }

          segments.push({ node, enterAt, holdStart: phaseStart, holdDur: phaseDur, travelPx: 0 });

          if (index < scenes.length - 1) {
            const exitAt = tl.duration();
            if (cards.length > 1) {
              tl.to(cards[cards.length - 1], { autoAlpha: 0, y: -28, duration: 0.4, ease: "power3.in" }, exitAt);
            }
            pieces.forEach((piece, pieceIndex) => {
              const from = enterFrom(node, pieceIndex, pieces.length);
              tl.to(
                piece,
                {
                  autoAlpha: 0,
                  x: from.x * 0.35,
                  y: from.y > 24 ? 42 : -36,
                  duration: 0.55,
                  ease: "power3.in",
                },
                exitAt + (pieces.length - 1 - pieceIndex) * 0.07,
              );
            });
            tl.to(node, { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" }, exitAt);
          } else {
            tl.to({}, { duration: 0.35 });
          }
        });

        const chainIndex = scenes.findIndex((scene) => scene.id === "kedjan");
        const intro = chainIndex > 0 ? scenes[chainIndex - 1] : null;
        const introSeg = intro ? segments.find((item) => item.node === intro) : null;
        if (intro && introSeg && !intro.id && intro.tagName === "SECTION" && !intro.classList.contains("max-h-[78svh]")) {
          marks.push({ id: "kedjan", at: introSeg.enterAt });
        } else {
          const chainSeg = segments.find((item) => item.node.id === "kedjan");
          if (chainSeg) marks.push({ id: "kedjan", at: chainSeg.enterAt });
        }
        for (const seg of segments) {
          const id = seg.node.id;
          if (!id || id === "top" || id === "kedjan") continue;
          const at = timeFor(id);
          if (at != null) marks.push({ id, at });
        }
        marks.sort((a, b) => a.at - b.at);

        let active: HTMLElement | null = null;
        paint = (time: number) => {
          let current = segments[0]?.node ?? null;
          for (const seg of segments) if (time + 0.001 >= seg.enterAt) current = seg.node;
          if (current && current !== active) {
            active = current;
            for (const seg of segments) {
              const on = seg.node === current;
              seg.node.inert = !on;
              seg.node.style.pointerEvents = on ? "auto" : "none";
            }
          }
          publish(time);
        };

        gsap.set(box, { height: window.innerHeight, overflow: "hidden" });

        timeline = tl;
        paint(0);
      }, box);

      distance = Math.round((timeline?.duration() || 1) * window.innerHeight * 0.92);
      if (spacer.current) spacer.current.style.height = `${distance + window.innerHeight}px`;
      box.style.transform = "none";
      box.style.top = "0px";
      if (timeline) paint(timeline.time());

      if (kept != null) {
        const y = kept * distance;
        if (lenisRef.current) lenisRef.current.scrollTo(y, { immediate: true, force: true });
        else window.scrollTo(0, y);
      } else if (!booted) {
        const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
        if (hash) requestAnimationFrame(() => scrollToId(hash, true));
      }
      booted = true;
    };

    const onGo = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (!id) return;
      scrollToId(id, false);
    };

    const onClick = (event: MouseEvent) => {
      if (document.documentElement.dataset.homeStage !== "on") return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const id = decodeURIComponent(url.hash.slice(1));
      const target = document.getElementById(id);
      if (!target || !box.contains(target)) return;
      if (event.defaultPrevented) {
        event.stopPropagation();
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      scrollToId(id, false);
    };

    const sync = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const nearEnd = distance > 0 ? window.scrollY / distance > 0.9 : max > 80 && window.scrollY > max - 120;
      if (nearEnd !== atEndRef.current) {
        atEndRef.current = nearEnd;
        setAtEnd(nearEnd);
      }
      if (!timeline || distance <= 0) return;
      const progress = gsap.utils.clamp(0, 1, window.scrollY / distance);
      if (Math.abs(timeline.progress() - progress) < 0.0004) return;
      timeline.progress(progress);
      paint(timeline.time());
    };

    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(build, 180);
    };

    build();
    sync();
    const refit = () => {
      if (window.scrollY > 12) return;
      build();
    };
    box.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", refit, { once: true });
    });
    document.fonts?.ready.then(refit);
    window.addEventListener("homestage-go", onGo);
    document.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", sync, { passive: true });
    motion.addEventListener("change", build);
    let raf = 0;
    const loop = () => {
      sync();
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("homestage-go", onGo);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", sync);
      motion.removeEventListener("change", build);
      teardown(true);
    };
  }, []);

  function toStart() {
    if (scrollHomeChapter("top")) return;
    const target = document.getElementById("top");
    if (target) target.scrollIntoView({ behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div ref={spacer}>
      <div ref={viewport} className="home-viewport">
        {children}
      </div>
      <div className="pointer-events-none fixed right-4 bottom-[4.75rem] z-40 lg:right-5 lg:bottom-24 xl:right-8 xl:bottom-8">
        <button
          type="button"
          onClick={toStart}
          aria-label="Till början"
          className={`border border-white/25 bg-ink/80 text-white backdrop-blur-md transition duration-500 hover:border-cyan hover:text-cyan grid h-11 w-11 place-items-center lg:h-auto lg:w-auto lg:px-5 lg:py-3 lg:font-display lg:text-xl lg:uppercase lg:tracking-[0.14em] ${atEnd ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 lg:hidden" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M12 19V6M6.5 11.5 12 6l5.5 5.5" />
          </svg>
          <span className="hidden lg:inline">Till början</span>
        </button>
      </div>
    </div>
  );
}
