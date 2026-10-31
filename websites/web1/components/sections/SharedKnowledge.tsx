import { Icon } from '@/components/Icon';
import { integrations } from '@/lib/content';

/**
 * The track is duplicated so the translate loop is seamless. Only the first
 * copy is exposed to assistive technology; the CSS pauses the animation under
 * `prefers-reduced-motion` and turns the strip into a scrollable region.
 */
function MarqueeRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul className="marquee__row" aria-hidden={ariaHidden || undefined}>
      {integrations.map((product) => (
        <li key={product.name}>
          <Icon name="tiny-plus" className="marquee__sep" />
          <Icon name={product.mark} className="ico ico--16" />
          {product.name}
        </li>
      ))}
    </ul>
  );
}

export function SharedKnowledge() {
  return (
    <section className="sec shared" aria-labelledby="shared-h">
      <div className="shell">
        <h2 className="h2" id="shared-h">
          Shared knowledge for the team.
          <br />
          Private knowledge that stays yours.
        </h2>
        <p className="shared__p">
          Agentwork connects two layers: shared sources everyone can see, and private ones each
          employee connects through their own account — private data never surfaces in somebody
          else’s search. The boundary is enforced in code, not in the model’s judgment.
        </p>
      </div>

      <div className="marquee">
        <div className="marquee__track">
          <MarqueeRow />
          <MarqueeRow ariaHidden />
        </div>
      </div>
    </section>
  );
}
