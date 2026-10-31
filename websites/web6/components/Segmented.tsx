'use client';

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';

interface SegmentedProps {
  items: readonly string[];
  active: number;
  onChange: (index: number) => void;
  label: string;
  idBase: string;
  className?: string;
}

export function Segmented({ items, active, onChange, label, idBase, className }: SegmentedProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const el = refs.current[active];
      if (el) setInd({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  const move = (i: number) => {
    const n = (i + items.length) % items.length;
    onChange(n);
    refs.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      move(keys[e.key]);
    }
  };

  return (
    <div role="tablist" aria-label={label} className={`seg ${className ?? ''}`} onKeyDown={onKey}>
      {ind && (
        <span
          className="seg__ind"
          aria-hidden="true"
          style={{ transform: `translateX(${ind.x}px)`, width: ind.w }}
        />
      )}
      {items.map((item, i) => (
        <button
          key={item}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          role="tab"
          id={`${idBase}-tab-${i}`}
          aria-selected={i === active}
          aria-controls={`${idBase}-panel-${i}`}
          tabIndex={i === active ? 0 : -1}
          className={`seg__item${i === active ? ' is-active' : ''}${ind ? '' : ' no-ind'}`}
          onClick={() => onChange(i)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
