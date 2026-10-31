"use client";

import Image from "next/image";
import { useState } from "react";
import { LogoMark } from "./icons";

const SOURCES = [
  { id: "inhouse", label: "In-house", path: "M344 56 C344 120 380 125 430 135 C470 143 494 165 494 200" },
  { id: "acs", label: "ACS", path: "M519 56 V198" },
  { id: "idm", label: "Identity manager", path: "M691 56 C691 120 655 125 605 135 C565 143 544 165 544 200" },
] as const;

type Source = (typeof SOURCES)[number]["id"];

function LogoStack({ items, className }: { items: { src: string; alt: string; w: number; h: number }[]; className?: string }) {
  return (
    <div className={`stack ${className ?? ""}`}>
      <ul className="stack__inner">
        {items.map((i) => (
          <li key={i.alt}>
            <Image src={i.src} alt={i.alt} width={i.w} height={i.h} className={i.src.endsWith(".png") ? "stack__png" : undefined} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Connect() {
  const [source, setSource] = useState<Source>("inhouse");
  return (
    <section className="connect" aria-labelledby="connect-title">
      <div className="shell connect__shell">
        <div className="connect__head">
          <h2 id="connect-title" className="h2">
            Connect to existing systems.
            <br />
            <span className="blue">Everything you like.</span>
          </h2>
          <p className="connect__lead">
            We make it easy to issue and manage NFC keys for Apple and Google Wallet via API for startups, access control
            integrators, and large enterprises.
          </p>
        </div>

        <div className="diagram">
          <div className="seg seg--lg diagram__seg" role="radiogroup" aria-label="Source system">
            {SOURCES.map((s) => (
              <button key={s.id} role="radio" aria-checked={source === s.id} onClick={() => setSource(s.id)}>
                {s.label}
              </button>
            ))}
          </div>

          <svg className="diagram__lines" width="1028" height="610" viewBox="0 0 1028 610" fill="none" aria-hidden="true">
            <g stroke="#ececef">
              <circle cx="519" cy="263" r="105" />
              <circle cx="519" cy="263" r="135" />
              <circle cx="519" cy="263" r="165" />
            </g>
            <g stroke="#c4c4ca" strokeDasharray="4 4">
              {SOURCES.map((s) => (
                <path key={s.id} d={s.path} />
              ))}
              <path d="M189 263 H454 M584 263 H838 M519 328 V524" />
            </g>
            {SOURCES.filter((s) => s.id === source).map((s) => (
              <path key={s.id} d={s.path} stroke="#5b8cff" strokeWidth="1.5" className="diagram__active" pathLength={1} />
            ))}
          </svg>

          <div className="diagram__hub">
            <LogoMark className="diagram__mark" />
          </div>

          <span className="pill diagram__pill diagram__pill--int">Integrations</span>
          <span className="pill diagram__pill diagram__pill--hook">Webhooks</span>
          <span className="pill diagram__pill diagram__pill--plat">Platform integrations</span>

          <LogoStack
            className="diagram__left"
            items={[
              { src: "/connect/postmark.png", alt: "Postmark", w: 116, h: 26 },
              { src: "/connect/twilio.png", alt: "Twilio", w: 86, h: 26 },
              { src: "/connect/smtp2go.png", alt: "SMTP2GO", w: 76, h: 28 },
            ]}
          />
          <LogoStack
            className="diagram__right"
            items={[
              { src: "/connect/n8n.svg", alt: "n8n", w: 74, h: 20 },
              { src: "/connect/zapier.svg", alt: "Zapier", w: 86, h: 24 },
              { src: "/connect/ifttt.svg", alt: "IFTTT", w: 67, h: 30 },
            ]}
          />

          <ul className="diagram__wallets" aria-label="Wallet providers">
            <li>
              <Image src="/connect/apple.svg" alt="Apple Wallet" width={28} height={34} className="wallet--apple" />
            </li>
            <li>
              <Image src="/connect/google.svg" alt="Google Wallet" width={84} height={28} />
            </li>
            <li>
              <Image src="/connect/samsung.svg" alt="Samsung Wallet" width={100} height={15} className="wallet--samsung" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
