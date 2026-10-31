'use client';

import { useEffect, useRef } from 'react';

export type DitherVariant = 'frame' | 'patch' | 'card' | 'band' | 'arc';

interface DitherProps {
  variant: DitherVariant;
  className?: string;
  /** Cell size in CSS pixels. */
  cell?: number;
  /** Dot color. */
  color?: string;
  /** Insets (CSS px) of a solid region left free of dots. */
  hole?: { top: number; right: number; bottom: number; left: number };
}

const BAYER8 = new Float32Array(
  [
    0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28,
    52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39,
    13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21,
  ].map((v) => (v + 0.5) / 64),
);

function hash2(x: number, y: number) {
  let h = Math.imul(x | 0, 0x27d4eb2d) ^ Math.imul(y | 0, 0x165667b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function vnoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function parseColor(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

type Ripple = { x: number; y: number; born: number };

const FPS_INTERVAL = 1000 / 30;

export function Dither({ variant, className, cell = 4, color = '#ffffff', hole }: DitherProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holeKey = hole ? `${hole.top},${hole.right},${hole.bottom},${hole.left}` : '';

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const [cr, cg, cb] = parseColor(color);
    const alpha = 255;

    const buf = document.createElement('canvas');
    const bctx = buf.getContext('2d');
    const pat = document.createElement('canvas');
    const pctx = pat.getContext('2d');
    if (!bctx || !pctx) return;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let cellPx = 4;
    let cols = 0;
    let rows = 0;
    let img: ImageData | null = null;
    let pattern: CanvasPattern | null = null;

    const pointer = { x: -999, y: -999, s: 0, target: 0 };
    const ripples: Ripple[] = [];
    let raf = 0;
    let last = 0;
    let visible = false;
    let revealStart = -1;
    const t0 = performance.now();

    const resize = () => {
      const rect = host.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cellPx = Math.max(2, Math.round(cell * dpr));
      canvas.width = Math.max(1, Math.ceil(W * dpr));
      canvas.height = Math.max(1, Math.ceil(H * dpr));
      cols = Math.ceil(canvas.width / cellPx);
      rows = Math.ceil(canvas.height / cellPx);
      buf.width = cols;
      buf.height = rows;
      img = bctx.createImageData(cols, rows);
      // Keep the solid panel wide enough for its copy on narrow screens.
      hl = hole ? Math.min(hole.left, W * 0.06) : 0;
      hr = hole ? Math.min(hole.right, W * 0.06) : 0;
      if (hole && W >= 900) {
        hl = hole.left;
        hr = hole.right;
      }
      const gap = Math.max(1, Math.round(dpr));
      pat.width = cellPx;
      pat.height = cellPx;
      pctx.clearRect(0, 0, cellPx, cellPx);
      pctx.fillStyle = '#000';
      pctx.fillRect(cellPx - gap, 0, gap, cellPx);
      pctx.fillRect(0, cellPx - gap, cellPx, gap);
      pattern = ctx.createPattern(pat, 'repeat');
      draw(performance.now(), true);
    };

    let hl = 0;
    let hr = 0;
    const field = (x: number, y: number, t: number) => {
      const n =
        vnoise(x * 0.011 + t * 0.16, y * 0.011 - t * 0.11) * 0.62 +
        vnoise(x * 0.034 - t * 0.21, y * 0.034 + t * 0.14) * 0.38 -
        0.5;
      switch (variant) {
        case 'frame': {
          const d = Math.min(x, W - x, y, H - y);
          const e = Math.max(0, 1 - d / 120);
          return e * e * 0.45 + n * 0.6 + 0.12;
        }
        case 'patch': {
          const d = Math.min(x, W - x, y, H - y);
          const e = Math.max(0, 1 - d / 90);
          return Math.max(0, n - 0.05) * 1.7 * (0.35 + e) - 0.04;
        }
        case 'card': {
          const top = Math.max(0, 1 - y / (H * 0.35));
          const right = Math.max(0, 1 - (W - x) / (W * 0.22));
          const bottom = Math.max(0, 1 - (H - y) / (H * 0.22)) * (x / W);
          return 0.2 + top * 0.45 + right * 0.3 + bottom * 0.3 + n * 0.55;
        }
        case 'band': {
          if (hole && x > hl && x < W - hr && y > hole.top && y < H - hole.bottom) return -1;
          const d = Math.min(x, W - x, y, H - y);
          const e = Math.max(0, 1 - d / 130);
          let near = 0;
          if (hole) {
            const hx = Math.max(hl - x, 0, x - (W - hr));
            const hy = Math.max(hole.top - y, 0, y - (H - hole.bottom));
            near = Math.max(0, 1 - Math.sqrt(hx * hx + hy * hy) / 36);
          }
          return 0.02 + e * 0.62 + n * 0.85 - near * 0.1;
        }
        case 'arc': {
          const cx = W / 2;
          if (y < 12) return (1.1 - y / 12) * (1 - Math.abs(x - cx) / (W * 0.5)) + n * 0.3;
          if (y < 50) return -0.2;
          const ex = (x - cx) / 310;
          const ey = (y - 50) / 54;
          const e = ex * ex + ey * ey;
          if (e >= 1) return -0.2;
          return Math.pow(1 - e, 0.5) * 1.15 + n * 0.3;
        }
      }
    };

    const draw = (now: number, force = false) => {
      if (!img || !pattern) return;
      const t = reduce ? 0 : (now - t0) / 1000;
      let reveal = 1;
      if (!reduce) {
        if (revealStart < 0) reveal = force ? 0 : 0;
        else {
          const p = Math.min(1, (now - revealStart) / 1400);
          reveal = 1 - Math.pow(1 - p, 3);
        }
      }
      pointer.s += (pointer.target - pointer.s) * 0.12;
      for (let i = ripples.length - 1; i >= 0; i--) if (now - ripples[i].born > 1300) ripples.splice(i, 1);

      const data = img.data;
      const step = cellPx / dpr;
      const sigma2 = 2 * 75 * 75;
      for (let r = 0; r < rows; r++) {
        const y = (r + 0.5) * step;
        const brow = (r & 7) << 3;
        for (let c = 0; c < cols; c++) {
          const x = (c + 0.5) * step;
          let v = field(x, y, t);
          if (v > -1) {
            if (pointer.s > 0.01) {
              const dx = x - pointer.x;
              const dy = y - pointer.y;
              v += pointer.s * 0.7 * Math.exp(-(dx * dx + dy * dy) / sigma2);
            }
            for (let k = 0; k < ripples.length; k++) {
              const rp = ripples[k];
              const age = (now - rp.born) / 1300;
              const R = age * 420;
              const dx = x - rp.x;
              const dy = y - rp.y;
              const dist = Math.sqrt(dx * dx + dy * dy) - R;
              v += (1 - age) * 0.9 * Math.exp(-(dist * dist) / 500);
            }
            v = v * reveal - (1 - reveal) * 0.9;
          }
          const on = v > BAYER8[brow | (c & 7)];
          const o = (r * cols + c) * 4;
          if (on && variant === 'arc' && y < 12) {
            data[o] = 31;
            data[o + 1] = 45;
            data[o + 2] = 230;
            data[o + 3] = 255;
          } else if (on) {
            data[o] = cr;
            data[o + 1] = cg;
            data[o + 2] = cb;
            data[o + 3] = alpha;
          } else data[o + 3] = 0;
        }
      }
      bctx.putImageData(img, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(buf, 0, 0, cols * cellPx, rows * cellPx);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < FPS_INTERVAL) return;
      last = now;
      draw(now);
    };

    const start = () => {
      if (reduce) {
        draw(performance.now());
        return;
      }
      if (revealStart < 0) revealStart = performance.now();
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { rootMargin: '80px' },
    );
    io.observe(host);

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const local = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e: PointerEvent) => {
      const p = local(e);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.target = 1;
    };
    const onLeave = () => {
      pointer.target = 0;
    };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      ripples.push({ x: p.x, y: p.y, born: performance.now() });
      if (ripples.length > 4) ripples.shift();
    };
    if (!reduce) {
      if (finePointer) {
        host.addEventListener('pointermove', onMove);
        host.addEventListener('pointerleave', onLeave);
      }
      host.addEventListener('pointerdown', onDown);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerdown', onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, cell, color, holeKey]);

  return <canvas ref={canvasRef} className={`dither ${className ?? ''}`} aria-hidden="true" />;
}
