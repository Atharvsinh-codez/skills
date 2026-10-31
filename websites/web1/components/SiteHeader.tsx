'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { navLinks, site } from '@/lib/content';

const MOBILE = '(max-width: 720px)';

/**
 * Sticky header. Below 720px the links collapse behind a disclosure button
 * with Escape-to-close, outside-click-to-close and focus return. Above it the
 * links are always in the DOM and visible, so nothing depends on JavaScript.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Leaving the mobile breakpoint must not leave a stale open panel behind.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE);
    const onChange = () => {
      if (!mq.matches) close();
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [close]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      close();
      toggleRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) close();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, close]);

  return (
    <header className="head" data-stuck={stuck ? '' : undefined}>
      <div className="shell head__in">
        <a className="brand" href="#top" aria-label={`${site.name} home`}>
          <span className="brand__mark">
            <Icon name="cloud" />
          </span>
          <span className="brand__word">{site.wordmark}</span>
        </a>

        <nav className="nav" aria-label="Primary" ref={navRef} data-open={open ? '' : undefined}>
          <ul className="nav__list" id="nav-list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            className="nav__toggle"
            type="button"
            ref={toggleRef}
            aria-expanded={open}
            aria-controls="nav-list"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav__toggle-i" data-nav-icon="open">
              <Icon name="menu" />
            </span>
            <span className="nav__toggle-i" data-nav-icon="close">
              <Icon name="close" />
            </span>
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
