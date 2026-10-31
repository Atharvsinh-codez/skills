"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "./icons";

const slides = [
  {
    title: "Advanced Product Management",
    desc: "Create rich product pages, set up product bundles, and manage large assortments effortlessly with our bulk editor.",
    kind: "product" as const,
  },
  {
    title: "Multiple Sales Channels",
    desc: "Set up sales channels with different rules and products to handle multi-store sales, POS, apps, and more.",
    kind: "channels" as const,
  },
  {
    title: "Inventory and Order Management",
    desc: "Set order rules, manage fulfillment across locations, and keep stock in sync across every channel.",
    kind: "orders" as const,
  },
  {
    title: "Customer Groups and Pricing",
    desc: "Segment customers and create price lists for B2B, wholesale, or VIP tiers without custom code.",
    kind: "product" as const,
  },
];

function AdminMock({ kind }: { kind: "product" | "channels" | "orders" }) {
  if (kind === "channels") {
    const side = ["Store", "Users", "Regions", "Tax Regions", "Return Reasons", "Sales Channels", "Product Types", "Product Tags", "Locations", "Shipping", "API Keys", "Workflows"];
    return (
      <div className="admin" aria-hidden="true">
        <div className="admin-side">
          <div className="brand"><i />Settings</div>
          <div className="grp">General</div>
          <ul>{side.map((s) => <li key={s} className={s === "Sales Channels" ? "on" : undefined}>{s}</li>)}</ul>
        </div>
        <div className="admin-main">
          <div className="admin-crumb">Settings / Sales Channels</div>
          <div className="admin-card">
            <h4>Sales Channels</h4>
            <div className="sub">Manage sales channels for different platforms where you sell your products.</div>
            {[["Webshop EU", "EU storefront"], ["Webshop US", "US storefront"], ["Retail POS", "In-store terminals"], ["App", "Mobile app"], ["Wholesale", "B2B buyers"]].map(([a, b]) => (
              <div className="admin-row" key={a}><b>{a}</b><span>{b}</span></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (kind === "orders") {
    return (
      <div className="admin" aria-hidden="true" style={{ gridTemplateColumns: "1fr" }}>
        <div className="admin-main">
          <div className="admin-crumb">Orders / #1042</div>
          <div className="admin-card">
            <h4>Fulfillment</h4>
            {["Warehouse A", "Warehouse B", "Store pickup", "Dropship"].map((a, i) => (
              <div className="admin-row" key={a}><b>{a}</b><span>{12 + i * 7} items</span></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="admin" aria-hidden="true">
      <div className="admin-side">
        <div className="brand"><i />Medusa Store</div>
        <ul>
          <li><i />Search</li>
          <li><i />Orders</li>
          <li className="on"><i />Products</li>
          <li className="sub">Collections</li>
          <li className="sub">Categories</li>
          <li><i />Inventory</li>
          <li><i />Customers</li>
          <li><i />Promotions</li>
          <li><i />Price Lists</li>
        </ul>
        <div className="grp">Extensions</div>
        <ul>
          <li><i style={{ background: "#f87171" }} />Reviews</li>
          <li><i style={{ background: "#3b82f6" }} />Wishlist</li>
        </ul>
      </div>
      <div className="admin-main">
        <div className="admin-crumb">Products / Bed Frame</div>
        <div className="admin-card">
          <h4>Bed Frame</h4>
          {[["Description", "Minimalist solid oak frame with a low profile."], ["Subtitle", "Oak"], ["Handle", "/bed-frame-oak"], ["Discountable", "True"]].map(([a, b]) => (
            <div className="admin-row" key={a}><span>{a}</span><b>{b}</b></div>
          ))}
        </div>
        <div className="admin-card">
          <h4>Media</h4>
          <div className="media-row"><i /><i className="sel" /><i className="dk" /><i /></div>
        </div>
      </div>
    </div>
  );
}

export function Operations() {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>(".slide");
    el.scrollBy({ left: dir * ((slide?.offsetWidth ?? 500) + 17), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="ops-title">
      <div className="sec-head ops-head">
        <h2 id="ops-title">Handle commerce<br />operations at scale</h2>
        <div className="right">
          <p className="lead">The world&apos;s most flexible commerce platform.<br />Built to be customized by developers and AI.</p>
          <div className="arrows">
            <button className="arrow" onClick={() => go(-1)} disabled={edges.start} aria-label="Previous feature"><ChevronLeft /></button>
            <button className="arrow" onClick={() => go(1)} disabled={edges.end} aria-label="Next feature"><ChevronRight /></button>
          </div>
        </div>
      </div>
      <div className="carousel" ref={track} onScroll={update}>
        {slides.map((s) => (
          <article className="slide" key={s.title}>
            <div className="slide-media"><AdminMock kind={s.kind} /></div>
            <div className="slide-cap">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
