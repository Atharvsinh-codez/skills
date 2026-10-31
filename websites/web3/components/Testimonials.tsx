"use client";

import { useState } from "react";
import { Nodes, Quote, Steps } from "./icons";

const items = [
  {
    company: "Symbiosy",
    author: "Bob Kraves, Staff DMS & Project Lead",
    quote: "Medusa struck the right balance between open source flexibility and solid opinionated architecture.",
    Icon: () => <span style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>8</span>,
  },
  {
    company: "Heinzel",
    author: "Lena Hoff, Head of Digital",
    quote: "We replaced three legacy systems with one Medusa setup and shipped our B2B portal in weeks.",
    Icon: () => <Steps />,
  },
  {
    company: "Material Bank",
    author: "Adam Ruiz, VP Engineering",
    quote: "Our agents build on Medusa every day. The framework keeps their output consistent and safe.",
    Icon: () => <Nodes />,
  },
];

export function Testimonials() {
  const [open, setOpen] = useState(0);
  return (
    <section aria-label="Customer stories" className="testis">
      {items.map(({ company, author, quote, Icon }, i) => {
        const isOpen = open === i;
        return (
          <div
            key={company}
            className="testi"
            data-open={isOpen}
            role={isOpen ? undefined : "button"}
            tabIndex={isOpen ? -1 : 0}
            aria-expanded={isOpen}
            aria-label={isOpen ? undefined : `Show story from ${company}`}
            onClick={() => setOpen(i)}
            onKeyDown={(e) => {
              if (!isOpen && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                setOpen(i);
              }
            }}
          >
            <div className="testi-tab" aria-hidden="true">
              <span className="vert">{company}</span>
              <Icon />
            </div>
            <figure className="testi-body" style={{ margin: 0 }} aria-hidden={!isOpen}>
              <span className="arch" aria-hidden="true" />
              <span className="quote-mark"><Quote /></span>
              <figcaption className="testi-author">{author}</figcaption>
              <blockquote className="testi-quote" style={{ margin: "10px 0 0" }}>{quote}</blockquote>
              <div className="testi-logo"><Icon />{company}</div>
            </figure>
          </div>
        );
      })}
    </section>
  );
}
