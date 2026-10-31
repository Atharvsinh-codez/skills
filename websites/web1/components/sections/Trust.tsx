import { Icon } from '@/components/Icon';
import { trustItems } from '@/lib/content';

export function Trust() {
  return (
    <section className="sec trust" id="trust" aria-labelledby="trust-h">
      <div className="shell">
        <div className="trust__head">
          <h2 className="h2" id="trust-h">
            Protected by design.
            <br />
            Governed by default.
          </h2>
          <a className="link" href="#faq">
            Visit our trust center
            <Icon name="arrow-ne" className="ico ico--16" />
          </a>
        </div>

        <div className="trust__grid">
          {trustItems.map((item) => (
            <article className="trust-item" key={item.title}>
              <span className="trust-item__i" aria-hidden="true">
                <Icon name={item.icon} className="ico ico--20" />
              </span>
              <h3 className="trust-item__t">
                {item.title} {item.badge ? <span className="badge">{item.badge}</span> : null}
              </h3>
              <p className="trust-item__p">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
