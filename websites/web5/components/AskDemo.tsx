"use client";

import { useState } from "react";
import { PromptBox } from "./PromptBox";
import { usePaused } from "./FeatureCard";

const phrases = [
  "When does our agreement with Acme renew?",
  "Which contracts expire this quarter?",
  "What is the deposit in the Studio North agreement?",
];

export function AskDemo() {
  const paused = usePaused();
  const [asked, setAsked] = useState<string | null>(null);

  return (
    <div className="stage stage--ask">
      <h3 className="stage__title">Your agreements have answers.</h3>
      <p className="stage__subtitle">Ask a question. Get straight to the relevant clause.</p>
      <PromptBox
        label="Ask a question about your contracts"
        phrases={phrases}
        paused={paused}
        startAt={6}
        onSubmit={(text) => setAsked(text || "your file")}
      />
      <p className="stage__status" role="status">
        {asked ? (
          <>
            Sign up to search your agreements for “{asked}”. <a href="#signup">Create an account</a>
          </>
        ) : null}
      </p>
    </div>
  );
}
