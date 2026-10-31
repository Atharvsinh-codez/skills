import Image from 'next/image';
import { AiSteps } from '@/components/AiSteps';
import { AccentDemo, ColorList, MotionSquares, PasswordDemo } from '@/components/Demos';
import { Dither } from '@/components/Dither';
import { Faq } from '@/components/Faq';
import { Header } from '@/components/Header';
import {
  ArrowUpRight,
  BurstGlyph,
  Check,
  Cross,
  CubeGlyph,
  KnotGlyph,
  LogoMark,
  SparkGlyph,
  Star,
} from '@/components/Icons';
import { Newsletter } from '@/components/Newsletter';
import { ProblemText } from '@/components/ProblemText';
import { RevealObserver } from '@/components/RevealObserver';
import { Showcase } from '@/components/Showcase';
import { VideoCard } from '@/components/VideoCard';

const PROBLEM = [
  'You spend six weeks on a brand and then you flatten the whole thing into a PDF, and everyone on the call says it looks great and nobody opens it again.',
  "The motion part is worse. A file can't hold it, so it comes down to a written description and the developer builds something else.",
  "So the brand shows up at the client already worse than it was, and six months later the site doesn't match the deck and everyone quietly agrees not to mention it.",
];

const CLIENTS = [
  ['Claude', BurstGlyph],
  ['ChatGPT', KnotGlyph],
  ['Codex', KnotGlyph],
  ['Cursor', CubeGlyph],
  ['Gemini', SparkGlyph],
] as const;

const PLANS = [
  {
    name: 'Own brand',
    price: '€19.50',
    was: '€39',
    note: 'once, per brand, VAT included',
    desc: 'For your own company or studio.',
    items: [
      [true, 'The whole editor before you pay a cent'],
      [true, 'Live at arix.design/brand/your-brand'],
      [true, 'Stays editable after you publish'],
      [false, 'One brand. The next one is its own €19.50.'],
    ],
  },
  {
    name: 'Client brand',
    dot: true,
    price: '€74.50',
    note: 'once, per brand, + VAT, for businesses',
    desc: "For a brand you're delivering to a client, bought as a business.",
    items: [
      [true, 'Everything in Own brand'],
      [true, "Nothing of arix's on the page, only your studio's credit if you add it"],
      [true, 'Your requests answered first'],
    ],
  },
  {
    name: 'Done for you',
    price: '€590',
    note: 'once, per brand, + VAT, for businesses',
    desc: "For a finished brand book you don't have time to rebuild.",
    items: [
      [true, 'Everything in Client brand'],
      [true, 'Your PDF and files built into all nine sections'],
      [true, 'One round of changes'],
      [true, 'Live 5 working days after we have everything'],
      [false, '3 builds a month. When they’re taken, the next opens on the 1st.'],
    ],
    link: 'Book a build',
  },
] as const;

const FOOTER = [
  ['Product', ['Gallery', 'See VANTA live', 'Changelog']],
  ['Compare', ['arix vs Brandpad', 'arix vs Corebook', 'arix vs Standards', 'arix vs Visualbook']],
  ['Guides', ['Documenting motion']],
  ['Docs', ['Publishing', 'Fonts', 'Connect Claude or Cursor']],
  ['Legal', ['Imprint', 'Privacy', 'Terms']],
] as const;

function Rule({ marks = false }: { marks?: boolean }) {
  return <div className={`rule${marks ? ' rule--marks' : ''}`} aria-hidden="true" />;
}

function SignupBadge() {
  return (
    <p className="badge">
      <span className="badge__num">1630+</span> designers signed up
    </p>
  );
}

export default function Home() {
  return (
    <div className="page" id="top">
      <RevealObserver />

      <div className="hero__arc">
        <Dither variant="arc" color="#8f96ef" cell={3} />
      </div>
      <div className="wrap">
        <Header />
      </div>
      <main id="main">
        <div className="wrap">
            <section className="hero__body" aria-labelledby="hero-title">
              <h1 id="hero-title">
                <span className="line">Animated brand guidelines</span>
                <span className="line">your clients actually use.</span>
              </h1>
              <p className="hero__lede rise" style={{ ['--d' as string]: '160ms' }}>
                arix turns your brand into a live page you send as a link. Colors copy when you click them, the
                motion plays right in the page, and <strong>Claude or Cursor can build the whole thing with you</strong>.
              </p>
              <div className="rise" style={{ ['--d' as string]: '240ms' }}>
                <a href="#start" className="btn hero__cta" id="start">Start building free</a>
                <p className="hero__note">Building is free, and there&apos;s no subscription for you or your client.</p>
                <SignupBadge />
              </div>
            </section>
        </div>

      <Rule marks />
      <div id="examples">
        <Showcase />
      </div>
      <Rule marks />

      <section className="problem" aria-label="Why PDFs fail brands">
        <div className="wrap">
          <ProblemText paragraphs={PROBLEM} accent="That was the only way to hand one over. It isn't anymore." />
        </div>
      </section>

      <section className="ai" id="how-it-works" aria-labelledby="ai-title">
        <div className="wrap">
          <div className="ai__inner">
            <div className="ai__head">
              <h2 id="ai-title" className="h2" data-reveal>The AI writes your first draft.</h2>
              <p className="ai__lede" data-reveal style={{ ['--d' as string]: '80ms' }}>
                Give it your website, or a few sentences about the brand. It fills every section with your real
                colors, type, logo and motion, then hands you a full guideline to shape.
              </p>
            </div>
            <AiSteps />
          </div>
        </div>
      </section>

      <section className="features" aria-labelledby="feat-title">
        <div className="wrap">
          <h2 id="feat-title" className="h2" data-reveal>Everything lives on one link.</h2>
        </div>
        <Rule />
        <div className="wrap mcp">
          <div className="mcp__diagram" aria-hidden="true">
            <LogoMark className="mcp__logo" />
            <span className="mcp__stem" />
            <span className="mcp__pill">MCP</span>
            <svg className="mcp__wires" viewBox="0 0 581 48" preserveAspectRatio="none">
              {[42, 166, 290, 414, 538].map((x) => (
                <path key={x} d={`M290 0 C 290 26, ${x} 18, ${x} 48`} />
              ))}
            </svg>
            <ul className="mcp__chips">
              {CLIENTS.map(([name, Glyph]) => (
                <li key={name}>
                  <Glyph />
                  {name}
                </li>
              ))}
            </ul>
            <p className="mcp__any">or any other MCP client</p>
          </div>
          <div className="feat__text mcp__text" data-reveal>
            <h3>Your AI builds it with you</h3>
            <p>
              arix speaks MCP. Connect once, point your AI at your brand folder, and it fills the sections, uploads the
              assets and publishes. You keep the taste calls.
            </p>
            <p className="sr-only">Works with Claude, ChatGPT, Codex, Cursor, Gemini or any other MCP client.</p>
          </div>
        </div>
        <Rule />
        <div className="grid2">
          <div className="cell cell--motion">
            <MotionSquares />
            <div className="feat__text" data-reveal>
              <h3>Motion your developer can actually ship</h3>
              <p>
                Every ease and duration sits on the page as a value, so the move your guideline shows is the move that
                ends up in the build.
              </p>
            </div>
          </div>
          <div className="cell cell--edit">
            <AccentDemo />
            <div className="feat__text" data-reveal>
              <h3>Edit once, every link updates</h3>
              <p>There&apos;s no v5 to re-send. You change the page and the link your client already has changes with it.</p>
            </div>
          </div>
        </div>
        <Rule />
        <div className="grid2">
          <div className="cell cell--colors">
            <ColorList />
            <div className="feat__text" data-reveal>
              <h3>Every value is one click away</h3>
              <p>Nobody eyedrops a screenshot again. On the live page a click puts the hex on your clipboard.</p>
            </div>
          </div>
          <div className="cell cell--gate">
            <PasswordDemo />
            <div className="feat__text" data-reveal>
              <h3>Not every guideline should be public</h3>
              <p>
                Plenty of brands keep their rules off the open web for good, not just until launch. Add a password and
                the page asks for it before it shows anything, and search engines are told to stay out.
              </p>
            </div>
          </div>
        </div>
        <Rule />
      </section>

      <section className="video" aria-labelledby="video-title">
        <div className="wrap">
          <h2 id="video-title" className="h2 h2--center h2--36" data-reveal>
            Watch one get built, start to published
          </h2>
        </div>
        <Rule marks />
        <div className="video__frame">
          <Dither variant="patch" cell={3} />
          <VideoCard />
        </div>
        <Rule marks />
      </section>

      <section className="brands" aria-labelledby="brands-title">
        <div className="wrap">
          <h2 id="brands-title" className="h2 h2--center h2--36" data-reveal>
            Two live brands, and neither looks like arix.
          </h2>
          <div className="brands__grid">
            {[
              ['VANTA', 'Built for the distance nobody watches.', '/media/brand-vanta.jpg', 'VANTA guideline cover with a runner and the VANTA wordmark'],
              ['Pythia', 'Pythia tells you what happens next.', '/media/brand-pythia.jpg', 'Pythia guideline cover'],
            ].map(([name, line, src, alt], i) => (
              <a key={name} href="#examples" className="brand" data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
                <span className="brand__img">
                  <Image src={src} alt={alt} fill sizes="(max-width: 800px) 100vw, 505px" />
                </span>
                <span className="brand__name">{name}</span>
                <span className="brand__line">{line}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Rule marks />
      <section className="cases" aria-label="Brand guidelines on the web">
        <div className="wrap cases__grid">
          <div className="cases__text" data-reveal>
            <p>
              Your brand doesn&apos;t stay inside the company. Agencies, partners, the developer who joined this week.
              Everyone works with it, and almost nobody has the file.
            </p>
            <p className="is-accent">
              The world&apos;s leading companies put their brand guidelines on the web. It&apos;s time you do too.
            </p>
          </div>
          {[
            ['design.cash.app', '/media/case-cashapp.jpg', 'Cash App design system site'],
            ['brand.dropbox.com', '/media/case-dropbox.jpg', 'Dropbox brand guidelines site'],
          ].map(([host, src, alt], i) => (
            <a key={host} className="case" href={`https://${host}`} target="_blank" rel="noreferrer" data-reveal style={{ ['--d' as string]: `${80 + i * 90}ms` }}>
              <span className="case__img">
                <Image src={src} alt={alt} fill sizes="334px" />
              </span>
              <span className="case__cap">
                {host} <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>
      </section>
      <Rule marks />

      <section className="pricing" id="pricing" aria-labelledby="pricing-title">
        <div className="wrap">
          <h2 id="pricing-title" className="h2 pricing__title" data-reveal>
            You pay once per brand and nothing ever renews.
          </h2>
          <p className="pricing__lede" data-reveal style={{ ['--d' as string]: '80ms' }}>
            Build the whole guideline free and pay when you publish it. The link stays live after that, with no seats to
            add and no subscription for your client to take over.
          </p>
        </div>
        <Rule />
        <div className="plans">
          {PLANS.map((plan, i) => (
            <article key={plan.name} className="plan" data-reveal style={{ ['--d' as string]: `${i * 90}ms` }}>
              <h3 className="plan__name">
                {'dot' in plan && <i className="plan__dot" aria-hidden="true" />}
                {plan.name}
              </h3>
              <p className="plan__price">
                {plan.price}
                {'was' in plan && (
                  <s>
                    <span className="sr-only">was </span>
                    {plan.was}
                  </s>
                )}
              </p>
              <p className="plan__note">{plan.note}</p>
              <p className="plan__desc">{plan.desc}</p>
              <ul className="plan__list">
                {plan.items.map(([ok, label]) => (
                  <li key={label} className={ok ? '' : 'is-no'}>
                    {ok ? <Check /> : <Cross />}
                    <span>
                      <span className="sr-only">{ok ? 'Included: ' : 'Limit: '}</span>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
              {'link' in plan && (
                <a className="plan__link" href="#book">
                  {plan.link}
                </a>
              )}
            </article>
          ))}
        </div>
        <Rule />
        <div className="wrap pricing__foot">
          <div className="pricing__notes">
            <p>
              It keeps getting better after you pay. See <a href="#changelog">every change since launch</a>.
            </p>
            <p>Pricing for your region: 50% off, applied automatically at checkout.</p>
            <p>Not for you? Email within 14 days of paying and it&apos;s refunded in full, published or not.</p>
          </div>
          <div className="pricing__cta">
            <a href="#start" className="btn">Start building free</a>
            <SignupBadge />
          </div>
        </div>
      </section>

      <Rule />
      <section className="news" aria-labelledby="news-title">
        <div className="wrap">
          <div className="news__inner" data-reveal>
            <h2 id="news-title">Don&apos;t miss what ships next.</h2>
            <Newsletter />
            <p className="news__count">Join 2,190+ designers on the list.</p>
            <p className="news__small">The weekly arix email from Julian. New features, brands people made with it and how-tos.</p>
          </div>
        </div>
      </section>
      <Rule />

      <section className="faq" id="faq" aria-labelledby="faq-title">
        <div className="wrap">
          <h2 id="faq-title" className="h2 faq__title" data-reveal>
            Everything you&apos;d ask before paying.
          </h2>
          <div className="faq__grid">
            <Faq />
            <aside className="faq__aside">
              <p>Write to me and I&apos;ll answer it myself.</p>
              <a href="mailto:hello@arix.design">hello@arix.design</a>
            </aside>
          </div>
        </div>
      </section>

      <Rule marks />
      <section className="cta" aria-labelledby="cta-title">
        <Dither variant="band" cell={3} hole={{ top: 60, right: 306, bottom: 60, left: 306 }} />
        <div className="cta__inner">
          <h2 id="cta-title" data-reveal>Hand over a link this time.</h2>
          <a href="#start" className="btn btn--white" data-reveal style={{ ['--d' as string]: '80ms' }}>
            Start building free
          </a>
        </div>
      </section>
      <Rule marks />
      </main>

      <footer className="footer">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#top" className="logo" aria-label="arix home">
              <LogoMark className="logo__mark" />
              <span>arix</span>
            </a>
            <p>The only brand guidelines that move.</p>
            <a href="#annnimate" className="footer__makers">From the makers of Annnimate</a>
            <a href="#review" className="ph">
              <span className="ph__icon"><Star /></span>
              <span>
                <small>Leave a review on</small>
                Product Hunt
              </span>
              <Star className="ph__star" />
            </a>
          </div>
          {FOOTER.map(([head, links]) => (
            <nav key={head} className="footer__col" aria-label={head}>
              <h2>{head}</h2>
              <ul>
                {links.map((l) => (
                  <li key={l}>
                    <a href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}>{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <Rule />
        <div className="wrap footer__bottom">
          <span>arix</span>
          <span>Operated by Good Fella Studio GmbH</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
