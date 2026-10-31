'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { Dither } from './Dither';
import { ArrowRight, Download } from './Icons';
import { Segmented } from './Segmented';
import { MotionSquares } from './Demos';

const TABS = ['Introduction', 'Logo', 'Color', 'Typography', 'Motion', 'Moodboard', 'Applications', 'Assets'] as const;

const META = [
  ['Founded', '2021, Zurich'],
  ['Category', 'Performance sportswear'],
  ['Athletes', '40 across 9 disciplines'],
  ['Made in', 'Portugal and Italy'],
];

const PALETTE = [
  { name: 'Ink', hex: '#0B0B0C', fg: '#fff' },
  { name: 'Bone', hex: '#E8E3D9', fg: '#111' },
  { name: 'Signal', hex: '#1F2DE6', fg: '#fff' },
  { name: 'Ash', hex: '#55565C', fg: '#fff' },
];

function Panel({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <>
          <Image
            src="/media/vanta-hero.jpg"
            alt="A runner in a white vest mid-stride through a shaft of light in a dark hall"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 1180px) 100vw, 1080px"
            className="stage__photo"
          />
          <p className="vanta stage__logo" aria-label="VANTA">VANTA</p>
          <h3 className="stage__title">
            Perform in
            <br />
            the quiet.
          </h3>
          <dl className="stage__meta">
            {META.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </>
      );
    case 1:
      return (
        <div className="pane pane--center">
          <div className="pane__clear">
            <span className="vanta pane__wordmark">VANTA</span>
          </div>
          <p className="pane__caption">Primary wordmark. Keep the height of one V clear on every side.</p>
        </div>
      );
    case 2:
      return (
        <div className="pane pane--swatches">
          {PALETTE.map((c) => (
            <div key={c.name} className="swatch" style={{ background: c.hex, color: c.fg }}>
              <span className="swatch__name">{c.name}</span>
              <span className="swatch__hex">{c.hex}</span>
            </div>
          ))}
        </div>
      );
    case 3:
      return (
        <div className="pane pane--type">
          <span className="type__aa">Aa</span>
          <div className="type__specs">
            <p className="type__family">Switzer</p>
            <ul>
              <li><span>Display</span><span>64 / 60</span></li>
              <li><span>Heading</span><span>32 / 34</span></li>
              <li><span>Body</span><span>16 / 24</span></li>
              <li><span>Caption</span><span>11 / 14</span></li>
            </ul>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="pane pane--motion">
          <MotionSquares dark />
          <p className="pane__caption">Glide · cubic-bezier(0.22, 1, 0.36, 1) · 640ms</p>
        </div>
      );
    case 5:
      return (
        <div className="pane pane--mood">
          {['30% 40%', '64% 30%', '58% 78%'].map((pos, i) => (
            <div key={pos} className="mood__tile">
              <Image src="/media/vanta-hero.jpg" alt="" fill sizes="360px" style={{ objectPosition: pos, filter: i === 1 ? 'grayscale(1)' : undefined }} />
            </div>
          ))}
          <div className="mood__tile mood__tile--ink">Quiet. Fast. Unseen.</div>
        </div>
      );
    case 6:
      return (
        <div className="pane pane--apps">
          <div className="app app--bib"><span className="vanta">VANTA</span><b>0417</b></div>
          <div className="app app--tag"><span className="vanta">VANTA</span><small>Made in Portugal</small></div>
          <div className="app app--screen"><span className="vanta">VANTA</span><small>Perform in the quiet.</small></div>
        </div>
      );
    default:
      return (
        <div className="pane pane--assets">
          {[
            ['Wordmark', 'SVG, PNG'],
            ['Color tokens', 'CSS, JSON'],
            ['Typography', 'Switzer, 4 weights'],
            ['Photography', '24 images'],
            ['Motion curves', 'CSS, Figma'],
          ].map(([n, f]) => (
            <div key={n} className="asset">
              <span>{n}</span>
              <span className="asset__fmt">{f}</span>
              <Download />
            </div>
          ))}
        </div>
      );
  }
}

export function Showcase() {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <section className="showcase" aria-label="Example guideline for VANTA">
      <Dither variant="frame" cell={3} />
      <div className="showcase__bar">
        <div className="showcase__scroll">
          <Segmented items={TABS} active={active} onChange={setActive} label="Guideline sections" idBase={id} className="seg--glass" />
        </div>
        <button type="button" className="iconbtn" aria-label="Next section" onClick={() => setActive((active + 1) % TABS.length)}>
          <ArrowRight />
        </button>
      </div>
      <div className="stage">
        {TABS.map((t, i) => (
          <div
            key={t}
            role="tabpanel"
            id={`${id}-panel-${i}`}
            aria-labelledby={`${id}-tab-${i}`}
            className={`stage__panel${i === active ? ' is-active' : ''}`}
            inert={i !== active}
          >
            <Panel index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
