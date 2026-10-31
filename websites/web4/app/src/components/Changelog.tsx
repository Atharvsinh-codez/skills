import { Chevron } from "./icons";

const ENTRIES = [
  { title: "All enterprise features included in all plans", body: "We've made our best features available to all customers moving forward. There are no more restrictions on API endpoints.", date: "Oct 15, 2026" },
  { title: "Preview notifications in card templates", body: "We added the ability to see how notifications look with your icon in the card template editor.", date: "Oct 12, 2026" },
  { title: "Add information on `skip_system_id` to docs", body: "In order to provide more flexible support for Key Diversification in DESFire, we added the ability to skip system ID. Please read the docs for more information.", date: "Oct 1, 2026" },
  { title: "New Key Diversification Tool", body: "We have released a tool for people to understand our key diversification more easily. It's a calculator and you can find it here: https://accessgrid.com/tools/key-diversification", date: "Sep 25, 2026" },
];

/* 5x4 dashed tiles; listed coordinates are left open on purpose. */
const OPEN = new Set(["0-2", "1-4"]);

export default function Changelog() {
  const tiles = [];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 5; c++) if (!OPEN.has(`${r}-${c}`)) tiles.push(<rect key={`${r}-${c}`} x={c * 100 + 0.5} y={r * 100 + 0.5} width="100" height="100" />);

  return (
    <section className="changelog" aria-labelledby="changelog-title">
      <div className="shell changelog__shell">
        <div className="changelog__intro">
          <h2 id="changelog-title" className="h2">
            Changelog
          </h2>
          <p className="body">The latest features, updates, improvements, and architectural releases from the AccessGrid team.</p>
          <a href="#" className="link">
            See all <Chevron className="link__chev" />
          </a>
          <svg className="changelog__tiles" width="501" height="401" viewBox="0 0 501 401" fill="none" aria-hidden="true">
            <g stroke="#dcdce0" strokeDasharray="4 4">{tiles}</g>
          </svg>
        </div>
        <ol className="timeline">
          {ENTRIES.map((e, i) => (
            <li key={e.title} className={`timeline__item${i === 0 ? " timeline__item--latest" : ""}`}>
              <span className="timeline__dot" aria-hidden="true" />
              <h3>
                <a href="#">{e.title}</a>
              </h3>
              <p className="timeline__body">{e.body}</p>
              <time>{e.date}</time>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
