"use client";

import { createContext, useContext, useId, useState } from "react";
import { PauseIcon, PlayIcon } from "./icons";

const PausedContext = createContext(false);

export function usePaused() {
  return useContext(PausedContext);
}

type FeatureCardProps = {
  title: string;
  description: string;
  /** Body has no inner padding (split-pane demos). */
  flush?: boolean;
  children: React.ReactNode;
};

export function FeatureCard({ title, description, flush, children }: FeatureCardProps) {
  const [paused, setPaused] = useState(false);
  const headingId = useId();

  return (
    <section className="card" aria-labelledby={headingId}>
      <div className="card__header">
        <div>
          <h2 id={headingId} className="card__title">{title}</h2>
          <p className="card__description">{description}</p>
        </div>
        <button
          type="button"
          className="card__toggle"
          aria-pressed={paused}
          aria-label={paused ? `Play ${title} demo` : `Pause ${title} demo`}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
      </div>
      <div className={flush ? "card__body card__body--flush" : "card__body"} data-paused={paused || undefined}>
        <PausedContext.Provider value={paused}>{children}</PausedContext.Provider>
      </div>
    </section>
  );
}
