import { Icon } from '@/components/Icon';
import { faqs } from '@/lib/content';

/**
 * Native `<details>`/`<summary>`: keyboard, screen-reader and no-JavaScript
 * behaviour come for free, and the answers stay in the document for crawlers.
 */
export function Faq() {
  return (
    <section className="sec faq" id="faq" aria-labelledby="faq-h">
      <div className="shell faq__in">
        <h2 className="h2 faq__h" id="faq-h">
          Frequently
          <br />
          Asked
          <br />
          Questions
        </h2>

        <div className="faq__list">
          {faqs.map((item) => (
            <details className="qa" key={item.question}>
              <summary>
                {item.question}
                <span className="qa__i" aria-hidden="true">
                  <Icon name="plus" className="ico ico--18" />
                </span>
              </summary>
              <div className="qa__a">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
