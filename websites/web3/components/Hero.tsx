"use client";

import { useState } from "react";
import { Search } from "./icons";

const tabs = [
  { title: "Modules", desc: "Advanced commerce logic, for any use case." },
  { title: "Admin", desc: "Customizable dashboard for your commerce." },
  { title: "Framework", desc: "Guardrails for agents to build custom solutions." },
  { title: "Infrastructure", desc: "Push from GitHub to the fastest infrastructure.", badge: "New" },
  { title: "Agent Harness", desc: "MCP, CLI, Skills, and Agent Reviews", badge: "New" },
];

function Project({ name, dark }: { name: string; dark?: boolean }) {
  return (
    <div className="project">
      <div className="project-thumb">
        <div className={dark ? "shot dark-top" : "shot"}>
          <div className="s-head"><i /><i /></div>
          <div className="s-title" />
          <div className="s-line" />
          <div className="s-line" style={{ width: 50 }} />
          <div className="s-row">
            {dark ? (<><i /><i /><i /></>) : (<><i /><i className="v" /><i /><i className="k" /><i className="b" /></>)}
          </div>
        </div>
      </div>
      <div className="project-body">
        <div className="pt"><span>{name}</span><svg width="10" height="4" viewBox="0 0 10 4" aria-hidden="true"><circle cx="1.5" cy="2" r="1" fill="currentColor" /><circle cx="5" cy="2" r="1" fill="currentColor" /><circle cx="8.5" cy="2" r="1" fill="currentColor" /></svg></div>
        <div className="kv-row">
          <div><span>Backend</span><b>{name.toLowerCase()}-prod.medusajs.app</b></div>
          <div><span>Storefront</span><b>{name.toLowerCase()}-store.com</b></div>
        </div>
        <div className="kv-row">
          <div><span>Status</span><b className="status">Live</b></div>
          <div><span>Commit</span><b className="status o">a1b2c3d · 1 hour</b></div>
        </div>
        <div className="kv-row">
          <div><span>Latest activity</span><b className="status">Deployed · main · Feat: Rewrite product grid · 1 hour ago</b></div>
        </div>
        <div className="deploy">View deployment</div>
      </div>
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState(3);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">Build and operate your commerce stack with agents</h1>
      <p className="hero-sub">Open source commerce platform to build, customize, and operate your business with agents.</p>
      <div className="hero-ctas">
        <a className="btn btn-dark" href="#">Get started</a>
        <a className="btn btn-light" href="#">Contact sales</a>
      </div>

      <div className="tabs" role="tablist" aria-label="Platform">
        {tabs.map((t, i) => (
          <button
            key={t.title}
            role="tab"
            id={`tab-${i}`}
            aria-selected={active === i}
            aria-controls="hero-panel"
            className="tab"
            onClick={() => setActive(i)}
          >
            <span className="tab-title">
              {t.title}
              {t.badge && <span className="badge">{t.badge}</span>}
            </span>
            <span className="tab-desc">{t.desc}</span>
          </button>
        ))}
      </div>

      <div className="hero-panel" id="hero-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
        <div className="window" style={{ left: 61, right: 57, top: 63, bottom: 0 }} aria-hidden="true">
          <div className="window-bar">
            <span className="dot" />
            <span>Medusa · {tabs[active].title}</span>
            <span className="right"><span /><span /><span /></span>
          </div>
          <div className="projects">
            <div className="projects-head">
              <strong>All projects</strong>
              <span className="field w1"><Search />&nbsp;Search projects</span>
              <span className="field w2">Sort: last updated</span>
              <span style={{ color: "var(--ink-2)" }}>Create project</span>
            </div>
            <Project name="Bloom" />
            <Project name="Medusa" dark />
          </div>
        </div>
      </div>
    </section>
  );
}
