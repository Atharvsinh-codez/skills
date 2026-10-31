import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = (p: P) => ({ 'aria-hidden': true as const, focusable: false as const, ...p });

export function LogoMark(p: P) {
  return (
    <svg viewBox="0 0 24 20" {...base(p)}>
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M3.7 0H20l3.8 5.9L9 20 0 5.8zM3.8.3C7 4.6 8.6 6.1 23.4 6.1 13.5 6.6 11 9.2 9 19.4 9.6 11.2 8.6 6.6 3.8.3z"
      />
    </svg>
  );
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export function ArrowRight(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" {...base(p)}>
      <path d="M3 8h10M9 4l4 4-4 4" {...stroke} strokeWidth="1.6" />
    </svg>
  );
}

export function ArrowUpRight(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="11" height="11" {...base(p)}>
      <path d="M5 11l6-6M6 5h5v5" {...stroke} strokeWidth="1.4" />
    </svg>
  );
}

export function Check(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" {...base(p)}>
      <path d="M3.5 8.3l2.8 2.8 6.2-6.4" {...stroke} strokeWidth="1.5" />
    </svg>
  );
}

export function Cross(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" {...base(p)}>
      <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" {...stroke} strokeWidth="1.4" />
    </svg>
  );
}

export function Plus(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" {...base(p)}>
      <path d="M8 2.5v11M2.5 8h11" {...stroke} strokeWidth="1.3" />
    </svg>
  );
}

export function Play(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" {...base(p)}>
      <path d="M5.5 3.6v8.8a.6.6 0 00.9.5l7-4.4a.6.6 0 000-1L6.4 3.1a.6.6 0 00-.9.5z" fill="currentColor" />
    </svg>
  );
}

export function ImageIcon(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" {...base(p)}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="2" {...stroke} strokeWidth="1.3" />
      <circle cx="6" cy="6" r="1.1" fill="currentColor" />
      <path d="M2.8 11.5l3.4-3.2 2.4 2.2 1.8-1.6 3 2.6" {...stroke} strokeWidth="1.3" />
    </svg>
  );
}

export function CursorIcon(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" {...base(p)}>
      <path d="M3 2l9.5 5.6-4.2 1 2.4 4.4-1.7.9-2.4-4.4L3.4 12z" fill="#111" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

export function Star(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" {...base(p)}>
      <path d="M8 1.8l1.8 4 4.3.4-3.3 2.9 1 4.2L8 11.1l-3.8 2.2 1-4.2L1.9 6.2l4.3-.4z" fill="currentColor" />
    </svg>
  );
}

export function Menu(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" {...base(p)}>
      <path d="M2.5 5h11M2.5 11h11" {...stroke} strokeWidth="1.4" />
    </svg>
  );
}

export function Download(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" {...base(p)}>
      <path d="M8 2.5v7.5M4.8 7l3.2 3.2L11.2 7M3 13h10" {...stroke} strokeWidth="1.4" />
    </svg>
  );
}

/* Simplified client glyphs, drawn as generic geometric marks. */
export function BurstGlyph(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" {...base(p)}>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <path
            key={i}
            d={`M${8 + Math.cos(a) * 1.4} ${8 + Math.sin(a) * 1.4}L${8 + Math.cos(a) * 6.6} ${8 + Math.sin(a) * 6.6}`}
            {...stroke}
            strokeWidth="1.7"
          />
        );
      })}
    </svg>
  );
}

export function KnotGlyph(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" {...base(p)}>
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse key={i} cx="8" cy="5.3" rx="2.4" ry="3.6" transform={`rotate(${i * 60} 8 8)`} {...stroke} strokeWidth="1.1" />
      ))}
    </svg>
  );
}

export function CubeGlyph(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" {...base(p)}>
      <path d="M8 1.5l5.8 3.3v6.5L8 14.5 2.2 11.3V4.8z" fill="currentColor" />
      <path d="M2.6 5L8 8.2 13.4 5M8 8.2v6" stroke="#f1f2f5" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function SparkGlyph(p: P) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" {...base(p)}>
      <path d="M8 1c.5 3.6 3.4 6.5 7 7-3.6.5-6.5 3.4-7 7-.5-3.6-3.4-6.5-7-7 3.6-.5 6.5-3.4 7-7z" fill="currentColor" />
    </svg>
  );
}
