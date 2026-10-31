import Image from "next/image";
import { Chevron, FeatureIcon } from "./icons";
import ReaderList from "./ReaderList";

const CUSTOMERS = [
  { src: "/customers/g4s.svg", alt: "G4S" },
  { src: "/customers/icon.svg", alt: "ICON" },
  { src: "/customers/onestpete.png", alt: "ONE St. Petersburg" },
  { src: "/customers/cme.svg", alt: "CME Group" },
  { src: "/customers/quicknode.svg", alt: "QuickNode" },
  { src: "/customers/goldman.svg", alt: "Goldman Properties" },
  { src: "/customers/elevate.png", alt: "Elevate" },
  { src: "/customers/crossmint.svg", alt: "Crossmint" },
  { src: "/customers/mesa.png", alt: "Mesa Public Schools" },
  { src: "/customers/nibol.png", alt: "Nibol" },
];

export default function HardWork() {
  return (
    <section className="hard" id="how-it-works" aria-labelledby="hard-title">
      <div className="shell hard__shell">
        <h2 id="hard-title" className="hard__statement">
          <span className="hl">We&rsquo;ve done the hard work</span> of getting widespread hardware manufacturer support for our
          credential, and built integrations to the most popular systems and programming languages,{" "}
          <span className="hl">so you don&rsquo;t have to.</span>
        </h2>

        <ul className="hard__cols">
          <li className="hard__col">
            <FeatureIcon name="reader" className="hard__icon" />
            <h3 className="hard__title">Widespread hardware support</h3>
            <p className="hard__desc">
              Issue credentials that work on more than 50 different readers today.{" "}
              <a href="#" className="link">
                View all readers <Chevron className="link__chev" />
              </a>
            </p>
            <ReaderList />
          </li>

          <li className="hard__col">
            <FeatureIcon name="cases" className="hard__icon" />
            <h3 className="hard__title">Comprehensive use-case coverage</h3>
            <p className="hard__desc">
              Everything from employee badges to student housing.{" "}
              <a href="#" className="link">
                View customer stories <Chevron className="link__chev" />
              </a>
            </p>
            <ul className="customers" aria-label="Customers">
              {CUSTOMERS.map((c) => (
                <li key={c.alt}>
                  <Image src={c.src} alt={c.alt} width={120} height={40} className={`customers__logo${c.src.endsWith(".png") ? " customers__logo--tall" : ""}`} />
                </li>
              ))}
            </ul>
          </li>

          <li className="hard__col">
            <FeatureIcon name="support" className="hard__icon" />
            <h3 className="hard__title">Expert support built-in</h3>
            <p className="hard__desc">No extra charge for rollout support. Just real people, around the clock.</p>
            <div className="chat" aria-label="Example support conversation">
              <p className="chat__msg chat__msg--in">
                We&rsquo;re rolling out to the Denver office next week. Any gotchas with Signo readers on Seos?
              </p>
              <div className="chat__agent">
                <p className="chat__msg chat__msg--out">
                  None for Signo 40K. I&rsquo;ll send the reader config profile and a one-page install guide for your
                  facilities team now.
                </p>
                <p className="chat__msg chat__msg--out">
                  Want me on the go-live call?
                  <br />
                  Happy to sit in.
                </p>
                <span className="chat__who">
                  <Image src="/support/avatar.jpg" alt="" width={24} height={24} className="chat__avatar" />
                  Nat
                </span>
              </div>
              <p className="chat__msg chat__msg--in chat__msg--short">Yes, let&rsquo;s do it!</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
