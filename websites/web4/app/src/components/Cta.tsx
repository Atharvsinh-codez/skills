import { Chevron } from "./icons";

export default function Cta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="shell cta__shell">
        <span className="cta__tile cta__tile--l" aria-hidden="true" />
        <span className="cta__tile cta__tile--r" aria-hidden="true" />
        <h2 id="cta-title" className="cta__title">
          Mobile credentials.
          <br />
          Zero complexity.
        </h2>
        <div className="btn-row btn-row--center">
          <a href="#" className="btn btn--primary btn--lg">
            Get started
          </a>
          <a href="#" className="btn btn--gray btn--lg">
            Contact sales <Chevron className="btn__chev" />
          </a>
        </div>
      </div>
    </section>
  );
}
