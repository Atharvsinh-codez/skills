import Image from "next/image";
import { Chevron } from "./icons";

const STORIES = [
  { img: "/stories/quicknode.png", cat: "Corporate", name: "Quicknode", rest: "deployed AccessGrid to modernize physical access across its global office footprint." },
  { img: "/stories/badgepass.png", cat: "Corporate", name: "Badgepass", rest: "needed a modernized credential issuance backend that could wallet-native credentials at scale." },
  { img: "/stories/icon-south-beach.jpg", cat: "Multifamily", name: "ICON South Beach", rest: "replaced its frustrating Bluetooth credentials with AccessGrid’s simpler mobile wallet access." },
];

export default function CaseStudies() {
  return (
    <section className="cases" aria-labelledby="cases-title">
      <div className="shell cases__head">
        <h2 id="cases-title" className="h2">
          Partnering with you to
          <br />
          <span className="blue">deliver outcomes that matter</span>
        </h2>
        <a href="#" className="btn btn--gray">
          Read customer stories <Chevron className="btn__chev" />
        </a>
      </div>
      <div className="shell cases__body">
        <ul className="cases__grid">
          {STORIES.map((s) => (
            <li key={s.name} className="story">
              <div className="story__media">
                <Image src={s.img} alt={`${s.name} case study`} fill sizes="(min-width: 1024px) 480px, 100vw" className="story__img" />
              </div>
              <p className="story__cat">{s.cat}</p>
              <p className="story__text">
                <strong>{s.name}</strong> {s.rest}
              </p>
              <a href="#" className="link">
                Read case study <Chevron className="link__chev" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
