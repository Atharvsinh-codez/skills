import { Icon } from '@/components/Icon';
import { agentTargets } from '@/lib/content';

export function Agents() {
  return (
    <section className="sec agents" aria-labelledby="agents-h">
      <div className="shell">
        <span className="tile" aria-hidden="true">
          <Icon name="cloud" className="ico ico--24" />
        </span>

        <h2 className="h2 h2--sm" id="agents-h">
          Agentwork for agents <span className="badge">in progress</span>
        </h2>
        <p className="agents__p">
          Leverage Agentwork’s MCP server and skills to give your own agents human-level verification
          on the work they do.
        </p>

        <ul className="agents__grid">
          {agentTargets.map((product) => (
            <li key={product.name}>
              <Icon name={product.mark} className="ico ico--20" />
              {product.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
