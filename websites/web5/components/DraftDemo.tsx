"use client";

import { useState } from "react";
import { PromptBox } from "./PromptBox";
import { usePaused } from "./FeatureCard";

type Status = "signed" | "awaiting" | "draft";

type Contract = { id: string; title: string; date: string; status: Status };

const statusLabel: Record<Status, string> = {
  signed: "Signed",
  awaiting: "Awaiting counterparty",
  draft: "Draft",
};

const initialContracts: Contract[] = [
  { id: "acme", title: "Acme — Consulting agreement", date: "September 24, 2026", status: "signed" },
  { id: "studio-north", title: "Studio North — Design services", date: "September 22, 2026", status: "awaiting" },
  { id: "nda", title: "Mutual non-disclosure agreement", date: "September 18, 2026", status: "draft" },
];

const phrases = [
  "Draft a design services agreement. $12,000, six weeks, 50% upfront.",
  "Draft a consulting agreement, hourly, capped.",
  "Draft a mutual NDA for a contractor this summer.",
];

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

export function DraftDemo() {
  const paused = usePaused();
  const [contracts, setContracts] = useState(initialContracts);

  return (
    <div className="stage">
      <h3 className="stage__title">Start with what you need.</h3>
      <p className="stage__subtitle">A few details. A first draft.</p>
      <PromptBox
        label="Describe the contract you want to draft"
        phrases={phrases}
        paused={paused}
        startAt={5}
        onSubmit={(text, file) => {
          const title = text || file?.name || "Untitled draft";
          setContracts((list) =>
            [{ id: `${Date.now()}`, title, date: dateFormat.format(new Date()), status: "draft" as const }, ...list].slice(0, 3),
          );
        }}
      />
      <div className="recent">
        <p className="recent__label">Recent contracts:</p>
        <ul className="recent__list" aria-live="polite">
          {contracts.map((c) => (
            <li key={c.id} className="recent__row">
              <div className="recent__text">
                <span className="recent__title">{c.title}</span>
                <span className="recent__date">{c.date}</span>
              </div>
              <span className={`badge badge--${c.status}`}>{statusLabel[c.status]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
