import { ArrowUp, ChevronLeft, ChevronRight, Code, Plug, Sparkle } from "./icons";

export function TimeToMarket() {
  return (
    <section aria-labelledby="ttm-title">
      <div className="sec-head ttm-head">
        <h2 id="ttm-title">10x your time-to-market<br />with AI-enabled development</h2>
        <div className="right">
          <p className="lead">Optimized for AI.<br />Support for agentic development on Cloud.</p>
          <div className="chips">
            <a className="chip" href="#"><span className="chip-icon" style={{ background: "#f97316" }}><Code /></span>Agentic Coding<ChevronRight size={10} /></a>
            <a className="chip" href="#"><span className="chip-icon" style={{ background: "#60a5fa" }}><Plug /></span>MCP<ChevronRight size={10} /></a>
          </div>
        </div>
      </div>
      <div className="studio" aria-hidden="true">
        <div className="studio-win">
          <div className="studio-chat">
            <p className="msg">Now let me apply these findings to your store and update the product page. I&apos;ll start with the hero section.</p>
            <p className="thinking"><Sparkle size={9} />Thinking...</p>
            <div className="studio-input">
              <span>Ask, Build, @ ...</span>
              <div><span>Agent</span><span>Mode</span><ArrowUp size={8} style={{ marginLeft: "auto" }} /></div>
            </div>
          </div>
          <div className="studio-main">
            <p className="crumb">Select Highlight</p>
            <p className="title">Selection mode</p>
            <div className="nav-mini"><ChevronLeft size={9} /><ChevronRight size={9} /></div>
            <div className="studio-preview">
              <div className="card">
                <div className="ph" />
                <i style={{ width: "70%" }} />
                <i style={{ width: "50%" }} />
                <div className="buy sel" />
                <i />
                <i style={{ width: "60%" }} />
              </div>
            </div>
            <p className="studio-cap">You can target elements visually. Click on any div, image, or header with the selection mode&apos;s precise editing instantly.</p>
          </div>
        </div>
        <div className="studio-edge" />
      </div>
    </section>
  );
}
