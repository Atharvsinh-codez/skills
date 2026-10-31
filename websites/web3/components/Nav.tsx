"use client";

import { useState } from "react";
import { Close, MedusaMark, Menu } from "./icons";

const links = ["Product", "Solutions", "Developers", "Cloud", "Pricing", "Blog"];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="/" aria-label="Medusa home">
          <MedusaMark />
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l} href="#">
              {l}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <a className="btn btn-light" href="#">
            Log in
          </a>
          <a className="btn btn-dark" href="#">
            Get started
          </a>
        </div>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>
      <nav id="mobile-menu" className="mobile-menu" data-open={open} aria-label="Mobile">
        {links.map((l) => (
          <a key={l} href="#" onClick={() => setOpen(false)}>
            {l}
          </a>
        ))}
        <a className="btn btn-dark" href="#">
          Get started
        </a>
      </nav>
    </header>
  );
}
