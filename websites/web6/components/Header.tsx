'use client';

import { useEffect, useState } from 'react';
import { LogoMark, Menu } from './Icons';

const LINKS = [
  ['Examples', '#examples'],
  ['How it works', '#how-it-works'],
  ['Pricing', '#pricing'],
  ['FAQ', '#faq'],
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="nav">
      <a href="#top" className="logo" aria-label="arix home">
        <LogoMark className="logo__mark" />
        <span>arix</span>
      </a>
      <nav aria-label="Primary" className={`nav__links${open ? ' is-open' : ''}`} id="primary-nav">
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="#signin" className="nav__mobile-only" onClick={() => setOpen(false)}>Sign in</a>
      </nav>
      <div className="nav__right">
        <a href="#signin" className="nav__signin">Sign in</a>
        <a href="#start" className="btn">Start building free</a>
        <button
          type="button"
          className="nav__menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((o) => !o)}
        >
          <Menu />
        </button>
      </div>
    </header>
  );
}
