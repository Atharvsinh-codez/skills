import { Icon } from '@/components/Icon';
import { Thread } from '@/components/Thread';
import { useCases } from '@/lib/content';

/**
 * The use-case list is a plain list, not a tab strip: the single reference
 * frame shows no state change, so making the rows interactive would be
 * inventing behaviour — and styling them as controls that do nothing would be
 * worse. The first row carries `aria-current` to match the reference's
 * highlighted row.
 */
export function Results() {
  return (
    <section className="sec results" aria-labelledby="results-h">
      <div className="shell">
        <h2 className="h2" id="results-h">
          Reliable results.
          <br />
          For everything.
        </h2>

        <div className="results__grid">
          <div className="uses">
            <ul className="uses__list">
              {useCases.map((useCase, i) => (
                <li key={useCase} aria-current={i === 0 ? true : undefined}>
                  {useCase}
                  <Icon name="chevron" className="ico ico--16 uses__i" />
                </li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <Thread variant="panel" />
          </div>
        </div>
      </div>
    </section>
  );
}
