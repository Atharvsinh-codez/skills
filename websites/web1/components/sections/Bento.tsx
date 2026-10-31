import { Icon } from '@/components/Icon';
import { bentoCards, connectors, verifiedFiles, workflowCard } from '@/lib/content';

function SourcesVisual() {
  return (
    <>
      <ul className="verify" aria-hidden="true">
        {verifiedFiles.map((file) => (
          <li key={file.label}>
            <Icon name={file.glyph} className="ico ico--14" />
            {file.label}
            <Icon name="check-circle" className="ico ico--16 verify__ok" />
          </li>
        ))}
      </ul>
      <p className="card__chip" aria-hidden="true">
        <Icon name="link" className="ico ico--12" />3 sources used
      </p>
    </>
  );
}

/**
 * Purely decorative depiction of a code prompt — there is no input, nothing is
 * submitted and nothing is collected. It is hidden from assistive technology.
 */
function MfaVisual() {
  return (
    <>
      <div className="code" aria-hidden="true">
        <span className="code__box">0</span>
        <span className="code__box">0</span>
        <span className="code__box">5</span>
        <span className="code__box code__box--on" />
      </div>
      <p className="card__chip" aria-hidden="true">
        <Icon name="lock" className="ico ico--12" />
        Verified device
      </p>
    </>
  );
}

function WorkflowVisual() {
  return (
    <div className="flow" aria-hidden="true">
      <p className="flow__t">
        <Icon name="calendar" className="ico ico--16" />
        {workflowCard.title}
      </p>
      <p className="flow__d">{workflowCard.description}</p>

      <div className="flow__row">
        <span className="flow__k">Trigger</span>
        <span className="flow__sel">
          {workflowCard.trigger}
          <Icon name="chevron" className="ico ico--12" />
        </span>
      </div>
      <div className="flow__row">
        <span className="flow__k">Repeats</span>
        <span className="flow__sel">
          {workflowCard.repeats}
          <Icon name="chevron" className="ico ico--12" />
        </span>
        <span className="flow__sel">
          {workflowCard.time}
          <Icon name="chevron" className="ico ico--12" />
        </span>
      </div>

      <p className="flow__k flow__k--block">Instructions</p>
      <p className="flow__box">{workflowCard.instructions}</p>
    </div>
  );
}

function ConnectorsVisual() {
  return (
    <ul className="conn" aria-hidden="true">
      {connectors.map((connector) => (
        <li key={connector.name}>
          <Icon name={connector.mark} className="ico ico--16" />
          <b>{connector.name}</b>
          <span>{connector.synced}</span>
          <em>{connector.learned}</em>
        </li>
      ))}
    </ul>
  );
}

const visuals = {
  a: SourcesVisual,
  b: MfaVisual,
  c: WorkflowVisual,
  d: ConnectorsVisual,
} as const;

export function Bento() {
  return (
    <section className="sec bento" aria-labelledby="bento-h">
      <div className="shell">
        <h2 className="h2" id="bento-h">
          Sourced answers, enterprise security, and knowledge
          <br />
          that keeps improving on its own
        </h2>

        <div className="bento__grid">
          {bentoCards.map((card) => {
            const Visual = visuals[card.key];
            return (
              <article className={`card card--${card.key}`} key={card.key}>
                <div className="card__vis">
                  <Visual />
                </div>
                <h3 className="card__t">{card.title}</h3>
                <p className="card__p">{card.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
