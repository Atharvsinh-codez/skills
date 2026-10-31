'use client';

import { useEffect, useRef, useState } from 'react';
import { CursorIcon } from './Icons';

const SQUARES: [number, number, number][] = [
  [135, 82, 0],
  [121, 101, 1],
  [189, 68, 2],
  [267, 64, 3],
  [352, 69, 4],
  [424, 82, 5],
  [465, 100, 6],
  [463, 121, 7],
  [233, 136, 8],
  [329, 142, 9],
  [415, 136, 10],
];

export function MotionSquares({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`squares${dark ? ' squares--dark' : ''}`} aria-hidden="true">
      {SQUARES.map(([x, y, i]) => (
        <span key={i} className="sq" style={{ left: x, top: y, animationDelay: `${-i * 0.7}s` }} />
      ))}
      <span className="sq sq--blue" style={{ left: 156, top: 121 }} />
    </div>
  );
}

const ACCENTS = ['#1F2DE6', '#E5482B', '#0E9F6E', '#111318'];

export function AccentDemo() {
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState(ACCENTS[0].length);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    const id = window.setInterval(() => {
      if (!visible) return;
      setI((n) => (n + 1) % ACCENTS.length);
      setTyped(1);
    }, 3200);
    return () => {
      window.clearInterval(id);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typed >= ACCENTS[i].length) return;
    const t = window.setTimeout(() => setTyped((n) => n + 1), 55);
    return () => window.clearTimeout(t);
  }, [typed, i]);

  const color = ACCENTS[i];
  const done = typed >= color.length;
  return (
    <div className="accent" ref={ref} aria-hidden="true" style={{ ['--accent' as string]: done ? color : ACCENTS[(i + ACCENTS.length - 1) % ACCENTS.length] }}>
      <div className="accent__card">
        <span className="accent__label">Accent</span>
        <span className="accent__input">
          <i className="accent__swatch" />
          <span className="mono">{color.slice(0, typed)}</span>
          {!done && <span className="caret" />}
        </span>
      </div>
      <span className="accent__wire" />
      <div className="browser">
        <span className="browser__url"><i /> arix.design/brand/vanta</span>
        <span className="browser__bar" />
        <span className="browser__line" />
        <span className="browser__line browser__line--s" />
      </div>
    </div>
  );
}

const COLORS = [
  { name: 'Ink', hex: '#111216' },
  { name: 'Paper', hex: '#EEF0F3' },
  { name: 'Accent', hex: '#1F2DE6' },
];

export function ColorList() {
  const [copied, setCopied] = useState<number | null>(2);
  const [demo, setDemo] = useState(true);

  useEffect(() => {
    if (!demo || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setCopied((c) => (c === null ? 2 : null)), 2600);
    return () => window.clearInterval(id);
  }, [demo]);

  const copy = async (i: number) => {
    setDemo(false);
    try {
      await navigator.clipboard.writeText(COLORS[i].hex);
    } catch {
      /* Clipboard can be blocked outside secure contexts; the label still confirms intent. */
    }
    setCopied(i);
    window.setTimeout(() => setCopied((c) => (c === i ? null : c)), 1600);
  };

  return (
    <div className="clist">
      <ul>
        {COLORS.map((c, i) => (
          <li key={c.name}>
            <button type="button" className="clist__row" onClick={() => copy(i)} aria-label={`Copy ${c.name} ${c.hex}`}>
              <i className="clist__sw" style={{ background: c.hex }} />
              <span className="clist__name">
                <span className={copied === i ? 'is-out' : ''}>{c.name}</span>
                <span className={copied === i ? '' : 'is-out'} aria-hidden={copied !== i}>Copied</span>
              </span>
              <span className="clist__hex mono">{c.hex}</span>
              {copied === i && demo && <CursorIcon className="clist__cursor" />}
            </button>
          </li>
        ))}
        {[300, 258, 218, 176].map((w) => (
          <li key={w} className="clist__skel" aria-hidden="true">
            <i className="clist__sw" />
            <span style={{ width: w }} />
          </li>
        ))}
      </ul>
      <span className="sr-only" aria-live="polite">{copied !== null && !demo ? `${COLORS[copied].name} copied` : ''}</span>
    </div>
  );
}

export function PasswordDemo() {
  return (
    <div className="gate" aria-hidden="true">
      <div className="gate__page">
        <span className="gate__bar" />
        <span /><span /><span /><span />
      </div>
      <div className="gate__card">
        <span className="vanta gate__logo">VANTA</span>
        <p className="gate__msg">These brand guidelines are private.</p>
        <span className="gate__label">Password</span>
        <span className="gate__input">
          {Array.from({ length: 8 }, (_, i) => (
            <i key={i} style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </span>
        <span className="gate__btn">Open</span>
      </div>
    </div>
  );
}
