import { Icon } from '@/components/Icon';
import { stepHeadings, steps } from '@/lib/content';

/** 01 — how the tools connect. */
function WireDiagram() {
  return (
    <svg className="wire" viewBox="0 0 264 104" fill="none" aria-hidden="true">
      <g stroke="#dcdbd4" strokeWidth={1.4}>
        <path d="M40 26h44a18 18 0 0 1 18 18v8" />
        <path d="M224 26h-44a18 18 0 0 0-18 18v8" />
        <path d="M40 78h44a18 18 0 0 0 18-18v-8" />
        <path d="M224 78h-44a18 18 0 0 1-18-18v-8" />
      </g>
      <rect x={111} y={31} width={42} height={42} rx={12} fill="#1a1912" />
      <svg x={120} y={40} width={24} height={24} viewBox="0 0 24 24" color="#fff">
        <use href="#icon-cloud" />
      </svg>
      <g fill="#fff" stroke="#dcdbd4" strokeWidth={1.2}>
        <rect x={6} y={12} width={28} height={28} rx={8} />
        <rect x={230} y={12} width={28} height={28} rx={8} />
        <rect x={6} y={64} width={28} height={28} rx={8} />
        <rect x={230} y={64} width={28} height={28} rx={8} />
      </g>
      <g color="#6d6c62">
        <svg x={13} y={19} width={14} height={14} viewBox="0 0 24 24">
          <use href="#icon-mark-1" />
        </svg>
        <svg x={237} y={19} width={14} height={14} viewBox="0 0 24 24">
          <use href="#icon-mark-3" />
        </svg>
        <svg x={13} y={71} width={14} height={14} viewBox="0 0 24 24">
          <use href="#icon-mark-5" />
        </svg>
        <svg x={237} y={71} width={14} height={14} viewBox="0 0 24 24">
          <use href="#icon-mark-7" />
        </svg>
      </g>
    </svg>
  );
}

/** 02 — asking in plain language. */
function AskInput() {
  return (
    <div className="ask">
      <span className="ask__ph">Who owns the Q3 forecast?</span>
      <span className="ask__send">
        <Icon name="arrow-up" className="ico ico--14" />
      </span>
    </div>
  );
}

/** 03 — verifying and keeping the answer. */
function Validating() {
  return (
    <div className="valid">
      <span className="valid__pill">
        <Icon name="sync" className="ico ico--14 valid__spin" />
        Validating 3 sources
      </span>
      <span className="valid__marks">
        {(['mark-4', 'mark-6', 'mark-8'] as const).map((mark) => (
          <i key={mark}>
            <Icon name={mark} className="ico ico--12" />
          </i>
        ))}
      </span>
    </div>
  );
}

const visuals = [WireDiagram, AskInput, Validating];

export function Steps() {
  return (
    <section className="sec steps" aria-labelledby="steps-h">
      <div className="shell">
        <h2 className="h2 steps__h" id="steps-h">
          {stepHeadings.map((heading) => (
            <span key={heading.marker}>
              {heading.line}
              <sup>{heading.marker}</sup>
            </span>
          ))}
        </h2>

        <div className="steps__grid">
          {steps.map((step, i) => {
            const Visual = visuals[i];
            return (
              <article className="step" key={step.number}>
                <div className="step__vis">
                  <Visual />
                </div>
                <p className="step__n">{step.number}</p>
                <h3 className="step__t">{step.title}</h3>
                <p className="step__p">{step.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
