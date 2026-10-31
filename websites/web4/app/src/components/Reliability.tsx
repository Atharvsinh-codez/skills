import Image from "next/image";
import { Chevron } from "./icons";

const STATS = [
  { value: "1,559,644", label: "API requests served" },
  { value: "100%", label: "Uptime this year" },
  { value: "4", label: "Credential protocols supported" },
  { value: "11+", label: "Countries with active users" },
];

export default function Reliability() {
  return (
    <section className="rel" aria-labelledby="rel-title">
      <div className="shell rel__shell">
        <div className="rel__globe" aria-hidden="true">
          <Image src="/globe-dots.svg" alt="" width={640} height={640} />
        </div>
        <div className="rel__copy">
          <h2 id="rel-title" className="h2">
            Built for reliability
            <br />
            <span className="muted">at any scale</span>
          </h2>
          <p className="body">
            Infrastructure spans providers and regions, protected by intrusion detection, DDoS mitigation, firewalls, and load
            balancing.
          </p>
          <a href="#" className="link">
            View status page <Chevron className="link__chev" />
          </a>
        </div>
      </div>
      <div className="shell rel__stats">
        <dl className="stats">
          {STATS.map((s) => (
            <div key={s.label} className="stat">
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
