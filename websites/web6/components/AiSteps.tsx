'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Dither } from './Dither';
import { ArrowRight, Check, ImageIcon } from './Icons';
import { Segmented } from './Segmented';

const STEPS = [
  {
    tab: 'Scan your site',
    title: 'Point it at a URL.',
    body: 'It reads your live site for the real colors, the fonts and your logo, and drafts a brief from the page in your own words. A few sentences about the brand work just as well.',
  },
  {
    tab: 'Generate',
    title: 'Every section comes back filled.',
    body: 'Logo rules, the palette, the type scale and the motion arrive written and laid out, in a voice that sounds like the brand instead of a template.',
  },
  {
    tab: 'Refine',
    title: 'Then you make the calls.',
    body: 'Change a value, rewrite a line or ask for another take on a section. Nothing ships until you publish, and the page stays yours to edit after.',
  },
] as const;

const DURATION = 6000;

function Fan() {
  return (
    <svg className="fan" viewBox="0 0 60 40" aria-hidden="true">
      {['M0 6 C 30 6, 30 20, 60 20', 'M0 20 L60 20', 'M0 34 C 30 34, 30 20, 60 20'].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

function Scan() {
  return (
    <div className="mini__row">
      <div className="mcard">
        <div className="mcard__dots"><i /><i /><i /></div>
        <p className="mcard__url">yourbrand.com</p>
        <span className="mcard__bar" />
        <span className="mcard__line" />
        <span className="mcard__line mcard__line--s" />
      </div>
      <Fan />
      <div className="mcard mcard--result">
        <div className="swatches">
          <i style={{ background: '#121317' }} />
          <i style={{ background: 'transparent' }} />
          <i style={{ background: '#1f2de6' }} />
          <i style={{ background: '#44464f' }} />
          <i style={{ background: '#d7d9de' }} />
        </div>
        <p className="mcard__font"><b>Aa</b> Switzer</p>
        <p className="mcard__found"><ImageIcon /> Logo found</p>
      </div>
    </div>
  );
}

function Generate() {
  const rows = ['Introduction', 'Logo', 'Color', 'Typography', 'Motion'];
  return (
    <div className="gen">
      {rows.map((r, i) => (
        <div key={r} className="gen__row" style={{ animationDelay: `${i * 180}ms` }}>
          <span className="gen__check"><Check /></span>
          <span>{r}</span>
          <span className="gen__fill" style={{ width: `${70 - i * 8}%` }} />
        </div>
      ))}
    </div>
  );
}

function Refine() {
  return (
    <div className="refine">
      <div className="refine__field">
        <span className="refine__label">Accent</span>
        <span className="refine__input"><i /> #1F2DE6</span>
      </div>
      <div className="refine__field">
        <span className="refine__label">Ease</span>
        <svg viewBox="0 0 100 50" className="refine__curve" aria-hidden="true">
          <path d="M2 48 C 24 48, 30 4, 98 2" />
        </svg>
      </div>
      <div className="refine__field refine__field--wide">
        <span className="refine__label">Tagline</span>
        <span className="refine__text">Perform in the quiet.<span className="caret" /></span>
      </div>
    </div>
  );
}

export function AiSteps() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setAuto(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = auto && inView && !paused;
  const next = () => setActive((a) => (a + 1) % STEPS.length);
  const step = STEPS[active];

  return (
    <div
      className="ai__grid2"
      ref={rootRef}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="ai__card" data-reveal>
        <Dither variant="card" cell={3} />
        <div className="mini">
          {STEPS.map((s, i) => (
            <div key={s.tab} className={`mini__layer${i === active ? ' is-active' : ''}`} aria-hidden="true">
              {i === 0 ? <Scan /> : i === 1 ? <Generate /> : <Refine />}
            </div>
          ))}
        </div>
      </div>
      <div className="ai__side">
        <div className="ai__controls">
          <Segmented items={STEPS.map((s) => s.tab)} active={active} onChange={setActive} label="How the first draft is made" idBase={id} />
          <button type="button" className="iconbtn iconbtn--ring" aria-label="Next step" onClick={next}>
            <svg viewBox="0 0 36 36" className="ring" aria-hidden="true">
              <circle cx="18" cy="18" r="16" />
              {auto && (
                <circle
                  key={active}
                  cx="18"
                  cy="18"
                  r="16"
                  className="ring__progress"
                  style={{ animationDuration: `${DURATION}ms`, animationPlayState: running ? 'running' : 'paused' }}
                  onAnimationEnd={next}
                />
              )}
            </svg>
            <ArrowRight />
          </button>
        </div>
        <div
          className="ai__step"
          role="tabpanel"
          id={`${id}-panel-${active}`}
          aria-labelledby={`${id}-tab-${active}`}
          aria-live="polite"
          key={active}
        >
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </div>
      </div>
    </div>
  );
}
