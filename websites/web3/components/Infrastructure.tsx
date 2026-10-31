import { ArrowUp, ChevronDown, ChevronRight } from "./icons";

const traffic = [52, 50, 47, 44, 40, 38, 33, 30, 28, 31, 26, 24, 27, 22, 25, 28, 24, 26, 29, 27, 24, 18, 22, 26, 21, 24, 30, 28, 25, 27, 29, 24, 20, 22, 14, 10];
const linePath = traffic.map((v, i) => `${i === 0 ? "M" : "L"}${(i * 8.3).toFixed(1)} ${v}`).join(" ");
const bars = [[22, 8], [6, 4], [18, 20], [28, 64], [9, 6], [14, 18], [20, 40], [5, 6], [10, 28], [24, 52], [12, 26], [8, 10], [18, 22], [16, 10], [20, 44], [6, 18]];

function ChatVisual() {
  return (
    <div className="chat" aria-hidden="true">
      <div className="bubble-user">Help me integrate with my existing tool stack</div>
      <div className="tool-icons">
        {["#3b82f6", "#6366f1", "#18181b", "#64748b", "#f43f5e"].map((c) => <i key={c} style={{ background: c }} />)}
        <span className="spark" />
      </div>
      <div className="bubble-ai">&ldquo;Here are hundreds of Medusa integrations. Which ones do you need? I will guide you on the setup.&rdquo;</div>
      <div className="chat-input">Ask Medusa...<ArrowUp /></div>
    </div>
  );
}

function TrafficVisual() {
  return (
    <div className="chart-card" aria-hidden="true">
      <div className="label">Traffic</div>
      <svg width="100%" height="120" viewBox="0 0 300 70" preserveAspectRatio="none" style={{ marginTop: 6 }}>
        <defs>
          <linearGradient id="tl" x1="0" x2="1">
            <stop offset="0" stopColor="#22c55e" />
            <stop offset="0.45" stopColor="#a3c94b" />
            <stop offset="0.7" stopColor="#f2c14e" />
            <stop offset="1" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <g stroke="#ededee" strokeWidth="0.6">
          <line x1="22" x2="300" y1="8" y2="8" />
          <line x1="22" x2="300" y1="34" y2="34" />
          <line x1="22" x2="300" y1="60" y2="60" />
        </g>
        <g fill="#a1a1aa" fontSize="4.5" fontFamily="inherit">
          <text x="10" y="10">2k</text>
          <text x="10" y="36">1k</text>
          <text x="12" y="62">0</text>
        </g>
        <path d={linePath} transform="translate(0 4)" fill="none" stroke="url(#tl)" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="290.5" cy="14" r="2.4" fill="#f97316" />
      </svg>
      <div style={{ display: "flex", justifyContent: "space-between", marginLeft: 34, marginTop: 4, color: "#a1a1aa" }}>
        <span>12th Apr</span><span>13th Apr</span><span>Now</span>
      </div>
      <div className="label" style={{ marginTop: 26 }}>Server size</div>
      <div style={{ marginLeft: 28, marginTop: 2, color: "#a1a1aa" }}>Automatically scales to handle any level of demand</div>
      <div className="bars-wide">
        {[0, 1, 2].map((row) => (
          <div key={row}>
            {Array.from({ length: 16 }).map((_, i) => {
              const top = row === 0 ? [2, 6, 9, 10, 13, 14].includes(i) : row === 1 ? i < 13 : true;
              return <i key={i} style={{ background: row === 2 || (row === 1 && i < 13) ? "#4ade80" : top ? "#f59e0b" : "transparent" }} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function FilesVisual() {
  return (
    <div className="stack" aria-hidden="true">
      <div className="stack-top">
        <span>Current billing cycle&nbsp;&nbsp;<ChevronDown size={8} /></span>
        <span>1 Jul 2025 – 31 Jul</span>
      </div>
      <div className="stack-title"><span>Total files changes</span><span>$11,120</span></div>
      <div className="tooltip">
        <span style={{ color: "#71717a" }}>Jul 3, 2025</span>
        <span><i style={{ background: "#8b5cf6" }} />Data transfer&nbsp;&nbsp;<b>$0.31</b></span>
        <span><i style={{ background: "#f97316" }} />Object storage&nbsp;&nbsp;<b>$1.46</b></span>
      </div>
      <svg width="100%" height="250" viewBox="0 0 240 200" preserveAspectRatio="none" style={{ marginTop: 10 }}>
        <g fill="#a1a1aa" fontSize="6">
          <text x="0" y="30">300</text>
          <text x="0" y="100">150</text>
          <text x="6" y="170">0</text>
        </g>
        <rect x="56" y="24" width="10" height="148" fill="#e4e4e7" opacity="0.6" />
        {bars.map(([p, o], i) => {
          const x = 22 + i * 13.5;
          const oh = o * 2.2;
          const ph = p * 1.2;
          return (
            <g key={i}>
              <rect x={x} y={170 - oh} width="8" height={oh} rx="1" fill="#f97316" />
              <rect x={x} y={170 - oh - ph - 1} width="8" height={ph} rx="1" fill="#8b5cf6" />
            </g>
          );
        })}
        <g>
          {Array.from({ length: 17 }).map((_, i) => (
            <rect key={i} x={22 + i * 13.5} y="190" width="8" height="5" rx="1" fill="#f97316" />
          ))}
        </g>
      </svg>
    </div>
  );
}

const cards = [
  { title: "AI tools on Cloud", desc: "MCP, Deployment Agent, Cloud CLI, access AI tooling with deep Medusa knowledge.", link: "AI tooling", Visual: ChatVisual },
  { title: "Best performance", desc: "Operate with the ease of a SaaS setup, with the most performant infrastructure for Medusa.", link: "Infrastructure", Visual: TrafficVisual },
  { title: "No hidden fees", desc: "Only pay for the infrastructure, no more license or GMV fee.", link: "Pricing", Visual: FilesVisual },
];

export function Infrastructure() {
  return (
    <section aria-labelledby="infra-title">
      <div className="sec-head infra-head">
        <div>
          <p className="eyebrow">Medusa Cloud</p>
          <h2 id="infra-title">Get the most out of Medusa<br />with AI-enabling infrastructure</h2>
        </div>
        <p className="lead">Performant infrastructure with built-in AI<br />features and support tools on Cloud</p>
      </div>
      <div className="infra-grid">
        {cards.map(({ title, desc, link, Visual }) => (
          <article className="infra-card" key={title}>
            <div className="infra-media"><Visual /></div>
            <div className="infra-text">
              <h3>{title}</h3>
              <p>{desc}</p>
              <a className="more" href="#">{link}<ChevronRight size={10} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
