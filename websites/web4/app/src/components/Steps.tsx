"use client";

import Image from "next/image";
import { useState } from "react";
import { StepIcon } from "./icons";

const STEPS = [
  { icon: "template", title: "Create a card template", lead: "Put your brand front and center", rest: "using our template builder, with previews for both platforms" },
  { icon: "reader", title: "Select & configure your reader", lead: "Free support", rest: "to get your readers configured to read both Apple Wallet and Google Wallet credentials" },
  { icon: "integrate", title: "Integrate your access control system", lead: "Connect your access control system", rest: "in a few clicks, so the doors, groups and schedules you already manage carry over to every phone." },
  { icon: "material", title: "Collect pre-launch material", lead: "Ready-made videos, posters and FAQs", rest: "tell people what’s changing and how to set up their phone before day one." },
  { icon: "deploy", title: "Deploy your credentials to your users!", lead: "Go live on one door at a time,", rest: "or every site at once, and see who has installed their key as your launch progresses." },
] as const;

const TYPES = [
  { id: "corporate", label: "Corporate ID" },
  { id: "hospitality", label: "Hospitality" },
  { id: "multifamily", label: "Multifamily" },
] as const;

function TemplateModal() {
  const [type, setType] = useState<(typeof TYPES)[number]["id"]>("corporate");
  const [wallet, setWallet] = useState<"apple" | "google">("apple");
  return (
    <div className="modal">
      <div className="modal__types" role="radiogroup" aria-label="Card template type">
        {TYPES.map((t) => (
          <button key={t.id} role="radio" aria-checked={type === t.id} className="modal__type" onClick={() => setType(t.id)}>
            <Image src={`/usecase/${t.id}.svg`} alt="" width={30} height={30} />
            {t.label}
          </button>
        ))}
      </div>
      <div className="modal__bar">
        <div className="seg seg--sm" role="radiogroup" aria-label="Wallet preview">
          <button role="radio" aria-checked={wallet === "apple"} onClick={() => setWallet("apple")}>
            Apple Wallet
          </button>
          <button role="radio" aria-checked={wallet === "google"} onClick={() => setWallet("google")}>
            Google Wallet
          </button>
        </div>
        <button className="modal__edit">Edit</button>
      </div>
      <div className={`modal__preview modal__preview--${wallet}`}>
        <div className="modal__hatch" />
        <p className="modal__company">Company, Inc</p>
        <p className="modal__name">Employee name</p>
      </div>
      <div className="modal__foot">
        <button className="btn btn--primary btn--sm">Confirm</button>
      </div>
    </div>
  );
}

export default function Steps() {
  const [open, setOpen] = useState(0);
  return (
    <section className="steps" aria-labelledby="steps-title">
      <div className="shell steps__shell">
        <div className="steps__copy">
          <h2 id="steps-title" className="h2">
            A few simple steps
            <br />
            <span className="blue">to get started.</span>
          </h2>
          <a href="#" className="btn btn--primary btn--lg">
            Choose your reader
          </a>
          <ol className="steps__list">
            {STEPS.map((s, i) => (
              <li key={s.title} className={`step${open === i ? " step--open" : ""}`}>
                <button className="step__btn" aria-expanded={open === i} aria-controls={`step-${i}`} onClick={() => setOpen(i)}>
                  <StepIcon name={s.icon} className="step__icon" />
                  {i + 1}. {s.title}
                </button>
                <div id={`step-${i}`} className="step__body" hidden={open !== i}>
                  <p>
                    <strong>{s.lead}</strong> {s.rest}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="steps__panel">
          <svg className="steps__cube" width="70" height="80" viewBox="0 0 70 80" fill="none" aria-hidden="true">
            <path d="M35 2 68 20v40L35 78 2 60V20L35 2Z M2 20l33 18 33-18 M35 38v40" stroke="#c8c8cc" strokeDasharray="3 3" />
          </svg>
          <TemplateModal />
        </div>
      </div>
    </section>
  );
}
