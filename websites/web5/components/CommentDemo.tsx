"use client";

import { useId, useState } from "react";
import { ChatBubbleIcon, CursorIcon } from "./icons";
import { usePaused } from "./FeatureCard";

type Clause = { id: string; heading: string; body: React.ReactNode[] };

const clauses: Clause[] = [
  {
    id: "scope",
    heading: "1. Scope of work",
    body: ["The Designer will create a visual identity and website design, including two rounds of revisions."],
  },
  {
    id: "fees",
    heading: "2. Fees and payment",
    body: [
      <>
        The total project fee is <strong>$12,000</strong>. A <strong>$6,000 deposit</strong> is due before work begins.
      </>,
      <>
        The remaining balance is payable within <strong>14 days</strong>&nbsp; of delivery.
      </>,
    ],
  },
  {
    id: "timeline",
    heading: "3. Timeline",
    body: [
      <>
        The project will be completed within <strong>six weeks</strong> of receiving the deposit and project materials.
      </>,
    ],
  },
  {
    id: "ownership",
    heading: "4. Ownership",
    body: ["Ownership of the final approved designs transfers to the Client when payment is complete."],
  },
];

type Comment = { id: number; clause: string; text: string };

export function CommentDemo() {
  const paused = usePaused();
  const [selected, setSelected] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");
  const [interacted, setInteracted] = useState(false);
  const fieldId = useId();
  const active = clauses.find((c) => c.id === selected);
  const thread = comments.filter((c) => c.clause === selected);

  return (
    <div className="doc">
      <div className="doc__pane">
        <p className="doc__tab">Design services agreement</p>
        <article className="doc__page">
          <h3 className="doc__title">Design services agreement</h3>
          <p className="doc__parties">Studio North &amp; Acme</p>
          {clauses.map((c) => (
            <button
              key={c.id}
              type="button"
              className="clause"
              aria-pressed={selected === c.id}
              onClick={() => {
                setInteracted(true);
                setSelected((s) => (s === c.id ? null : c.id));
              }}
            >
              <span className="clause__heading">{c.heading}</span>
              {c.body.map((p, i) => (
                <span key={i} className="clause__text">{p}</span>
              ))}
            </button>
          ))}
        </article>
        {!interacted && (
          <CursorIcon className={paused ? "demo-cursor is-paused" : "demo-cursor"} />
        )}
      </div>

      <aside className="comments" aria-label="Comments">
        <p className="comments__label">Comments</p>
        {active ? (
          <div className="thread">
            <p className="thread__clause">{active.heading}</p>
            {thread.length > 0 && (
              <ul className="thread__list">
                {thread.map((c) => (
                  <li key={c.id} className="thread__item">
                    <span className="thread__author">You</span>
                    <span>{c.text}</span>
                  </li>
                ))}
              </ul>
            )}
            <form
              className="thread__form"
              onSubmit={(e) => {
                e.preventDefault();
                const text = draft.trim();
                if (!text) return;
                setComments((list) => [...list, { id: Date.now(), clause: active.id, text }]);
                setDraft("");
              }}
            >
              <label htmlFor={fieldId} className="visually-hidden">
                Comment on {active.heading}
              </label>
              <textarea
                id={fieldId}
                className="thread__input"
                rows={3}
                placeholder="Add a comment"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <button type="submit" className="enter" disabled={!draft.trim()}>
                Comment
              </button>
            </form>
          </div>
        ) : (
          <div className="comments__empty">
            <ChatBubbleIcon className="comments__icon" />
            <p>
              Select a clause.
              <br />
              Keep the conversation right here.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
