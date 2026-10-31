import Image from "next/image";
import { Chevron } from "./icons";

const LOGOS: { src: string; alt: string; w: number; h: number }[] = [
  { src: "/partners/dotorigin.svg", alt: "Dot Origin", w: 132, h: 34 },
  { src: "/partners/hid.svg", alt: "HID", w: 80, h: 34 },
  { src: "/partners/millennium.png", alt: "Millennium", w: 130, h: 40 },
  { src: "/partners/twilio.svg", alt: "Twilio", w: 104, h: 32 },
  { src: "/partners/okta.png", alt: "Okta", w: 90, h: 32 },
  { src: "/partners/dmp.png", alt: "DMP", w: 92, h: 36 },
  { src: "/partners/cdvi.png", alt: "CDVI", w: 96, h: 34 },
  { src: "/partners/elatec.png", alt: "Elatec", w: 120, h: 30 },
  { src: "/partners/pdk.png", alt: "ProdataKey", w: 110, h: 36 },
  { src: "/partners/sendgrid.png", alt: "SendGrid", w: 132, h: 30 },
];

export default function LogoBand() {
  return (
    <section className="band" aria-label="Compatible systems">
      <div className="shell band__shell">
        <div className="band__intro">
          <p>
            <strong>Dozens of systems and readers</strong> are compatible today.
          </p>
          <a href="#" className="btn btn--gray">
            View our integrations <Chevron className="btn__chev" />
          </a>
        </div>
        <ul className="band__grid">
          {LOGOS.map((l) => (
            <li key={l.alt} className="band__cell">
              <Image src={l.src} alt={l.alt} width={l.w} height={l.h} className={`band__logo${l.src.endsWith(".png") ? " band__logo--tall" : ""}`} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
