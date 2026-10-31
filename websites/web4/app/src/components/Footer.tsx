import { LinkedIn, LogoMark, XLogo } from "./icons";

const COLS = [
  { title: "Developers", links: ["Documentation", "Guides", "Tools"] },
  { title: "Pricing", links: ["Employee badges", "Multi-family keys", "Hotel keys", "Partner pricing"] },
  { title: "Company", links: ["Integrations", "Case studies", "About", "Contact"] },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__shell">
        <nav className="footer__cols" aria-label="Footer">
          {COLS.map((c) => (
            <div key={c.title} className="footer__col">
              <h2>{c.title}</h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="wordmark" aria-hidden="true">
          <svg className="wordmark__grid" width="1262" height="220" viewBox="0 0 1262 220" fill="none">
            <g stroke="#ededf0">
              <path d="M0 20.5H1262M0 45.5H1262M0 166.5H1262M0 191.5H1262" />
              <path d="M97.5 0V220M130.5 0V220M340.5 0V220M373.5 0V220M1135.5 0V220M1168.5 0V220" />
            </g>
          </svg>
          <LogoMark className="wordmark__mark" />
          <span className="wordmark__text">AccessGrid</span>
        </div>

        <div className="footer__bottom">
          <p>© AccessGrid 2026</p>
          <ul className="footer__social">
            <li>
              <a href="#">
                <XLogo /> Follow on X
              </a>
            </li>
            <li>
              <a href="#">
                <LinkedIn /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
