"use client";

import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

type Phase = "typing" | "holding" | "deleting" | "waiting";

export type TypewriterOptions = {
  phrases: string[];
  paused?: boolean;
  /** Start with the first phrase fully written instead of typing it. */
  startFull?: boolean;
  /** Characters of the first phrase already typed on first render. */
  startAt?: number;
  startDelay?: number;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  waitMs?: number;
};

/**
 * Cycles through phrases: type, hold, delete, wait. Returns the visible text
 * and whether the caret should show. With reduced motion the first phrase is
 * shown in full and never changes.
 */
export function useTypewriter({
  phrases,
  paused = false,
  startFull = false,
  startAt = 0,
  startDelay = 0,
  typeMs = 55,
  deleteMs = 22,
  holdMs = 2600,
  waitMs = 500,
}: TypewriterOptions) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(startFull ? phrases[0].length : startAt);
  const [phase, setPhase] = useState<Phase>(startFull ? "holding" : "typing");
  const [started, setStarted] = useState(startDelay === 0);

  useEffect(() => {
    if (started) return;
    const t = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(t);
  }, [started, startDelay]);

  useEffect(() => {
    if (paused || reduced || !started) return;
    const phrase = phrases[index];
    let delay = typeMs;
    let step: () => void;

    if (phase === "typing") {
      if (length >= phrase.length) {
        delay = 0;
        step = () => setPhase("holding");
      } else {
        delay = typeMs + (phrase[length] === " " ? typeMs : 0);
        step = () => setLength((l) => l + 1);
      }
    } else if (phase === "holding") {
      delay = holdMs;
      step = () => setPhase("deleting");
    } else if (phase === "deleting") {
      if (length <= 0) {
        delay = 0;
        step = () => setPhase("waiting");
      } else {
        delay = deleteMs;
        step = () => setLength((l) => l - 1);
      }
    } else {
      delay = waitMs;
      step = () => {
        setIndex((i) => (i + 1) % phrases.length);
        setPhase("typing");
      };
    }

    const t = window.setTimeout(step, delay);
    return () => window.clearTimeout(t);
  }, [paused, reduced, started, phase, length, index, phrases, typeMs, deleteMs, holdMs, waitMs]);

  if (reduced) return { text: phrases[0], caret: false };
  return {
    text: phrases[index].slice(0, length),
    caret: phase === "typing" || phase === "deleting",
  };
}
