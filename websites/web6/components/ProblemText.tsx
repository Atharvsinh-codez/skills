'use client';

import { useEffect, useRef } from 'react';

interface ProblemTextProps {
  paragraphs: string[];
  accent: string;
}

export function ProblemText({ paragraphs, accent }: ProblemTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const words = Array.from(root.querySelectorAll<HTMLSpanElement>('.w'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      words.forEach((w) => w.classList.add('on'));
      return;
    }
    let raf = 0;
    let lit = -1;
    const update = () => {
      raf = 0;
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.82 - r.top) / (r.height + vh * 0.25)));
      const n = Math.round(p * words.length);
      if (n === lit) return;
      lit = n;
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const split = (text: string) =>
    text.split(' ').map((word, i) => (
      <span key={i} className="w">
        {word}{' '}
      </span>
    ));

  return (
    <div className="problem__text" ref={ref}>
      {paragraphs.map((p) => (
        <p key={p}>{split(p)}</p>
      ))}
      <p className="is-accent">{split(accent)}</p>
    </div>
  );
}
