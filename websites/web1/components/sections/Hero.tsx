import { ProductWindow } from '@/components/ProductWindow';
import { threadCopy } from '@/lib/content';

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="shell">
        <div className="hero__top">
          <div className="hero__copy">
            <h1 className="hero__h1">
              One place to ask,
              <br />
              across every tool
            </h1>
            <p className="hero__lede">
              Agentwork connects to the tools your team already uses and answers questions across all
              of them in plain language, with sources you can check. When the answer isn’t written
              down, it asks the person who knows.
            </p>
          </div>

          <div className="hero__actions">
            <a className="btn btn--dark" href="#cta">
              Book a demo
            </a>
            <a className="btn btn--light" href="#cta">
              Create account
            </a>
          </div>
        </div>

        <figure className="stage">
          <div className="stage__sky">
            <p className="sr-only">{threadCopy.altText}</p>
            <ProductWindow />
          </div>
        </figure>
      </div>
    </section>
  );
}
