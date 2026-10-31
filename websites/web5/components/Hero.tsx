"use client";

import { LogoMark, PlayIcon } from "./icons";
import { useTypewriter } from "./useTypewriter";

type Snippet = {
  phrases: string[];
  style: React.CSSProperties;
  startFull?: boolean;
  startAt?: number;
  startDelay?: number;
};

const prompts = {
  consulting: "Consulting agreement, hourly, capped.",
  contractor: "Hire a contractor for the summer.",
  fee: "$12,000, six weeks. 50% upfront.",
  nda: "Write an NDA for a new contractor.",
  loi: "a one-page letter of intent",
  expire: "Which contracts expire this quarter?",
};

// Positions are measured from the 1440px reference; right-side snippets are
// anchored to the right edge so they clip off-canvas the way the design does.
const snippets: Snippet[] = [
  { phrases: ["Consulting\n agreement, hourly,\ncapped.", "Hire a\n contractor for\nthe summer."], style: { left: 92, top: 25 }, startFull: true, startDelay: 5200 },
  { phrases: [prompts.contractor, prompts.loi], style: { left: 5, top: 172 }, startFull: true, startDelay: 9000 },
  { phrases: [prompts.consulting, prompts.nda], style: { left: -42, top: 405 }, startFull: true, startDelay: 12500 },
  { phrases: ["$12,000, six\n weeks. 50% upfront.", "Which contracts\n expire this\n quarter?"], style: { left: 11, top: 591 }, startFull: true, startDelay: 7200 },
  { phrases: [prompts.consulting, prompts.contractor, prompts.expire], style: { right: 0, left: "calc(100% - 113px)", top: 55 }, startAt: 7 },
  { phrases: ["$12,000,\n six\n50% upfront."], style: { left: "calc(100% - 27px)", top: 97 }, startFull: true },
  { phrases: [prompts.nda, prompts.consulting], style: { left: "calc(100% - 70px)", top: 386 }, startFull: true, startDelay: 10500 },
  { phrases: [prompts.loi, prompts.fee], style: { left: "calc(100% - 207px)", top: 561 }, startFull: true, startDelay: 3600 },
  { phrases: ["Which contracts\n  expire\n  this quarter?", "Renewal terms\n  for Acme"], style: { left: "calc(100% - 133px)", top: 632 }, startFull: true, startDelay: 14000 },
];

function GhostPrompt({ snippet }: { snippet: Snippet }) {
  const { text, caret } = useTypewriter({
    phrases: snippet.phrases,
    startFull: snippet.startFull,
    startAt: snippet.startAt,
    startDelay: snippet.startDelay,
    holdMs: 5200,
    typeMs: 70,
  });
  return (
    <span className="ghost" style={snippet.style}>
      {text}
      {caret && <span className="ghost__caret" />}
    </span>
  );
}

export function Hero() {
  return (
    <header className="hero">
      <div className="hero__backdrop" aria-hidden="true">
        {snippets.map((s, i) => (
          <GhostPrompt key={i} snippet={s} />
        ))}
      </div>

      <nav className="nav container" aria-label="Primary">
        <a href="/" className="nav__logo" aria-label="Terms home">
          <LogoMark />
        </a>
        <ul className="nav__links">
          <li><a href="#about">About</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#login" className="is-strong">Login</a></li>
          <li><a href="#signup" className="is-strong">Sign up</a></li>
        </ul>
      </nav>

      <div className="hero__content container">
        <h1 className="hero__title">
          <span className="is-muted">Start a draft with AI.</span>{" "}
          <span className="is-muted">Chat about any contract.</span>{" "}
          <span className="is-muted">Comment with counterparties.</span>{" "}
          <span>You’ll never open DocuSign again.</span>
        </h1>
        <div className="hero__actions">
          <a href="#signup" className="btn btn--light">Sign up</a>
          <a href="#demo" className="btn btn--ghost">
            <PlayIcon className="btn__icon" />
            Watch a demo
          </a>
        </div>
      </div>
    </header>
  );
}
