"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Plus } from "@/components/icons";
import { href } from "@/lib/site";

const PROMPTS = [
  "Create a newsletter campaign for our October product updates and send it to all signed up users.",
  "Set up an automated welcome email sequence for new subscribers.",
  "Duplicate the Black Friday campaign and update the copy for our spring sale.",
  "Schedule a promotional campaign to go out this Friday at 9 AM.",
  "Send a test email for my latest campaign to check how it looks.",
];

const TYPE_MS = 38;
const HOLD_MS = 2600;

function useTypewriter(lines: string[]) {
  const [state, setState] = useState({ line: 0, chars: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const full = lines[state.line].length;
    const done = state.chars >= full;
    if (reduced && done) return;
    const t = window.setTimeout(
      () =>
        setState((s) =>
          reduced
            ? { ...s, chars: full }
            : done
              ? { line: (s.line + 1) % lines.length, chars: 0 }
              : { ...s, chars: s.chars + 1 },
        ),
      reduced ? 0 : done ? HOLD_MS : TYPE_MS,
    );
    return () => window.clearTimeout(t);
  }, [state, lines]);

  return lines[state.line].slice(0, state.chars);
}

export function PromptBox() {
  const typed = useTypewriter(PROMPTS);

  return (
    <div className="rounded-2xl border-2 border-[#d97757] bg-white px-4 pt-4 pb-3 text-left shadow-[0_12px_32px_-12px_rgba(28,25,23,0.35)]">
      <p className="sr-only">Example agent prompt: {PROMPTS[0]}</p>
      <p aria-hidden className="min-h-[44px] text-base leading-[22px] text-stone-800">
        {typed}
        <span className="animate-caret ml-px inline-block h-[18px] w-px translate-y-[3px] bg-stone-800" />
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span aria-hidden className="inline-flex size-8 items-center justify-center rounded-xl text-stone-800">
          <Plus className="size-5" />
        </span>
        <a
          href={href("/signup")}
          aria-label="Get started with AutoSend"
          className="inline-flex size-8 items-center justify-center rounded-xl border border-[#d97757] bg-[#d97757] text-white transition-colors hover:bg-[#c4643f]"
        >
          <ArrowUp aria-hidden className="size-5" />
        </a>
      </div>
    </div>
  );
}
