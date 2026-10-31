"use client";

import { useState } from "react";
import { Discord, GitHub, LinkedIn, MedusaMark, XLogo } from "./icons";

const cols: { title: string; links: string[] }[] = [
  { title: "Product", links: ["Starters", "Admin", "Modules", "Framework", "Cloud", "Integrations"] },
  { title: "Solutions", links: ["Enterprise", "Medusa Experts", "User Stories", "B2B", "D2C", "Marketplace", "Distributors"] },
  { title: "Agent tools", links: ["Medusa MCP", "Agentic guide", "Cloud CLI", "Agent Skills", "Preview Environments", "Medusa Development Agent"] },
  { title: "Developers", links: ["Documentation", "Agentic development", "Recipes", "Changelog", "Community", "Blog"] },
];

export function Footer() {
  const [msg, setMsg] = useState("");
  return (
    <footer className="footer">
      <div className="brandcol">
        <a href="/" aria-label="Medusa home"><MedusaMark size={16} /></a>
      </div>
      {cols.map((c, i) => (
        <nav key={c.title} aria-label={c.title}>
          <h4>{c.title}</h4>
          <ul>{c.links.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
          {i === 0 && (
            <div className="other">
              <h4>Other</h4>
              <ul>{["Pricing", "Blog", "Contact"].map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          )}
        </nav>
      ))}
      <div className="newsletter">
        <h4>Newsletter</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget.elements.namedItem("email") as HTMLInputElement;
            setMsg(input.checkValidity() ? "Thanks, you are subscribed." : "Enter a valid email.");
          }}
          noValidate
        >
          <label htmlFor="email" className="sr-only">Email address</label>
          <input id="email" name="email" type="email" required placeholder="Enter your email" autoComplete="email" />
          <button type="submit">Subscribe</button>
        </form>
        <p className="msg" role="status">{msg}</p>
        <p className="note">Get the latest product news, promotions, and engineering updates. Unsubscribe at any time.</p>
        <div className="socials" style={{ marginTop: 14 }}>
          <a href="#" aria-label="Discord"><Discord /></a>
          <a href="#" aria-label="X"><XLogo /></a>
          <a href="#" aria-label="LinkedIn"><LinkedIn /></a>
          <a href="#" aria-label="GitHub"><GitHub /></a>
        </div>
        <p className="sys">All systems normal</p>
      </div>
    </footer>
  );
}
