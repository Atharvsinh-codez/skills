"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Tab = "corporate" | "multifamily" | "hospitality";

const TABS: { id: Tab; label: string }[] = [
  { id: "corporate", label: "Corporate ID" },
  { id: "multifamily", label: "Multifamily" },
  { id: "hospitality", label: "Hospitality" },
];

const FEATURES: Record<Tab, { icon: string; title: string; body: string }[]> = {
  corporate: [
    { icon: "expand", title: "Expand at your pace.", body: "Start with one floor or exec group and expand. Every card moved to a phone is one less to clone or replace." },
    { icon: "identity", title: "Identity integrated.", body: "Provision from your IdP or HRIS; access follows the record — issued before day one, revoked the moment offboarding starts." },
    { icon: "card", title: "Mobile is additive.", body: "It doesn't need to be rip-and-replace. Keep your access control system — move the keys to the phone." },
    { icon: "f4", title: "Biometrics on device.", body: "Face ID unlocks the credential, so there’s no biometric database to own, defend or manage." },
  ],
  multifamily: [
    { icon: "m1", title: "One credential.", body: "Give a single credential for the unit door, the gym, the parking gate, and the package room." },
    { icon: "m2", title: "Sharing made easy.", body: "Residents can share time-limited access from their phone — no keys, handoffs, or lockboxes." },
    { icon: "m3", title: "Out of juice.", body: "No problem — Passes sync to Apple watch, work when the phone is locked, or needs a charge." },
    { icon: "m4", title: "Seamless integration.", body: "Integrates with your property management or access control system so leases and credentials stay in sync." },
  ],
  hospitality: [
    { icon: "f1", title: "Self check-in.", body: "Keys arrive before check-in, update automatically, and expire at checkout." },
    { icon: "m2", title: "Sharing made easy.", body: "Share a key with everyone on the reservation without a second trip to the desk." },
    { icon: "f3", title: "Elevated experience.", body: "Tie room charges and folio balances to the same credential so the phone works at the spa, the pool bar, and the elevator." },
    { icon: "m3", title: "Out of juice.", body: "No problem — Passes sync to Apple watch, work when the phone is locked, or needs a charge." },
  ],
};


/* Seeded so server and client render identical texture strings. */
function noise(seed: number, len: number) {
  const chars = "░▒▓";
  let s = seed * 9301 + 49297;
  let out = "";
  for (let i = 0; i < len; i++) {
    s = (s * 9301 + 49297) % 233280;
    out += chars[Math.floor((s / 233280) * 3)];
  }
  return out;
}

function PassCard({ seed, x, y, peek }: { seed: number; x: number; y: number; peek?: boolean }) {
  return (
    <div className={`pass${peek ? " pass--peek" : ""}`} style={{ left: x, top: y }}>
      <Image src="/dark/mark.svg" alt="" width={40} height={40} className="pass__mark" />
      <Image src="/dark/nfc.svg" alt="" width={17} height={31} className="pass__nfc" />
      <div className="pass__foot">
        <span className="pass__noise">{noise(seed, 10 + (seed % 6))}</span>
      </div>
    </div>
  );
}

/* Card coordinates inside the 1520x750 panel, measured from the design. Later entries paint on top. */
const CARDS: { x: number; y: number; peek?: boolean }[] = [
  { x: -274, y: 250 },
  { x: -274, y: -48 },
  { x: 1419, y: 250 },
  { x: 1419, y: -48 },
  { x: 150, y: 102 },
  { x: 150, y: 400 },
  { x: 150, y: 698 },
  { x: 996, y: 102 },
  { x: 996, y: 400 },
  { x: 996, y: 698 },
  { x: 573, y: -160 },
  { x: 573, y: 140 },
  { x: 573, y: 436, peek: true },
  { x: 573, y: 548 },
];

const ROTATE_MS = 6000;

export default function DarkSection() {
  const [tab, setTab] = useState<Tab>("corporate");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % 4), ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [active, tab, paused]);

  const seedBase = TABS.findIndex((t) => t.id === tab) * 31;

  return (
    <section className="dark" aria-labelledby="dark-title">
      <div className="dark__inner">
        <div className="shell dark__shell">
          <h2 id="dark-title" className="dark__title">
            <span>Never forget credentials</span>
            <span className="dark__title-2">wherever you go.</span>
          </h2>

          <div className="dark__tabs" role="tablist" aria-label="Use cases">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                aria-controls="dark-panel"
                className="dark__tab"
                onClick={() => {
                  setTab(t.id);
                  setActive(0);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div id="dark-panel" role="tabpanel" className="dark__panel" aria-label={`${TABS.find((t) => t.id === tab)?.label} preview`}>
            <div className="mosaic" aria-hidden="true">
              {CARDS.map((c, i) => (
                <PassCard key={i} seed={seedBase + i * 5 + 1} x={c.x} y={c.y} peek={c.peek} />
              ))}
            </div>
          </div>

          <ul className="dark__features" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {FEATURES[tab].map((f, i) => (
              <li key={f.title}>
                <button className={`feat${i === active ? " feat--active" : ""}`} aria-pressed={i === active} onClick={() => setActive(i)}>
                  <span className="feat__head">
                    <Image src={`/dark/icon-${f.icon}.svg`} alt="" width={24} height={24} className="feat__icon" />
                    {i === active && (
                      <svg key={`${tab}-${active}`} className="feat__ring" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                        <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,.18)" strokeWidth="2" fill="none" />
                        <circle cx="9" cy="9" r="7" stroke="#fff" strokeWidth="2" fill="none" pathLength="100" className="feat__ring-bar" style={{ animationDuration: `${ROTATE_MS}ms`, animationPlayState: paused ? "paused" : "running" }} />
                      </svg>
                    )}
                  </span>
                  <span className="feat__text">
                    <strong>{f.title}</strong> {f.body}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
