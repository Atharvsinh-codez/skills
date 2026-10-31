'use client';

import { useId, useState } from 'react';
import { Plus } from './Icons';

const ITEMS = [
  {
    q: 'Do I have to design the page?',
    a: "No. The layout is already done and you fill in fields, so there's no spread to build and nothing to export at the end. You write the rules down and the page is there.",
  },
  {
    q: 'What do I get for €19.50?',
    a: 'The full guideline for one brand: all nine sections, the live link at arix.design/brand/your-brand, and edits for as long as the page exists. You only pay when you publish.',
  },
  {
    q: 'Can you build it for us?',
    a: 'Yes. Done for you takes your PDF and files and builds them into every section, with one round of changes. There are three builds a month.',
  },
  {
    q: 'Why is it a one-time price?',
    a: "A brand guideline doesn't need a seat count. You pay once per brand, the link stays live, and nobody has to take over a subscription when the project ends.",
  },
  {
    q: 'Can I put it on our own domain?',
    a: 'Every page lives at arix.design/brand/your-brand. Write to me if you need it on your own domain and we will look at it together.',
  },
  {
    q: 'What about our fonts?',
    a: 'Upload the font files you are licensed to use on the web and the page renders in them, including the type specimens.',
  },
  {
    q: 'How is this different from Brandpad or Corebook?',
    a: 'Motion plays in the page as real values, AI can draft and edit the whole guideline with you, and there is no subscription to keep it online.',
  },
  {
    q: 'What do developers do with the motion?',
    a: 'They copy it. Every ease and duration sits on the page as a value, so what the guideline shows is what ends up in the build.',
  },
  {
    q: 'Can my AI work on it?',
    a: 'Yes. arix speaks MCP, so Claude, Cursor, ChatGPT or any MCP client can fill sections, upload assets and publish for you.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <ul className="faq__list">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
            <h3>
              <button
                type="button"
                className="faq__q"
                aria-expanded={isOpen}
                aria-controls={`${id}-a-${i}`}
                id={`${id}-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{item.q}</span>
                <Plus className="faq__icon" />
              </button>
            </h3>
            <div className="faq__a" id={`${id}-a-${i}`} role="region" aria-labelledby={`${id}-q-${i}`} inert={!isOpen}>
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
