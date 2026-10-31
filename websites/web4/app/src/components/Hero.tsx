import Image from "next/image";
import { Chevron } from "./icons";

/* Dashed 100px tiles behind the phone. Missing cells are intentional gaps. */
const GRID_COLS = 8;
const GRID_ROWS = 6;
const GAPS = new Set(["0-0", "0-7", "1-7", "5-0", "5-7", "4-7", "0-1"]);

function HeroGrid() {
  const cells = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      if (GAPS.has(`${r}-${c}`)) continue;
      cells.push(<rect key={`${r}-${c}`} x={c * 100 + 0.5} y={r * 100 + 0.5} width="100" height="100" />);
    }
  }
  return (
    <svg className="hero__grid" width="801" height="601" viewBox="0 0 801 601" fill="none" aria-hidden="true">
      <g stroke="#dcdce0" strokeDasharray="4 4">{cells}</g>
      <g stroke="#d4d4d8" strokeDasharray="4 4">
        <circle cx="100.5" cy="100.5" r="34" />
        <path d="M100.5 134.5c0 60 40 66 100 66" />
        <circle cx="700.5" cy="400.5" r="34" />
        <path d="M666.5 400.5c-50 0-66-40-66-100" />
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero__shell">
        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">
            Mobile wallet
            <br />
            credentials
            <br />
            made easy.
          </h1>
          <p className="hero__lead">
            Issue mobile credentials to any reader, with any access control system or custom back end.{" "}
            <strong>Go live in less than 30 days.</strong>
          </p>
          <p className="hero__lead hero__lead--2">Used by Hardware manufacturers, ACS platforms, and integrators.</p>
          <div className="btn-row">
            <a href="#" className="btn btn--primary btn--lg">
              Get started
            </a>
            <a href="#how-it-works" className="btn btn--gray btn--lg">
              See how it works <Chevron className="btn__chev" />
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <HeroGrid />
          <div className="hero__phone">
            <Image src="/hero/phone.svg" alt="" width={455} height={669} priority className="hero__phone-img" />
            <Image src="/hero/phone-card.svg" alt="" width={299} height={199} priority className="hero__card" />
            <Image src="/hero/phone-hold.svg" alt="" width={455} height={669} priority className="hero__phone-img hero__hold" />
          </div>
        </div>
      </div>
    </section>
  );
}
