"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type ComponentType, type ReactNode, type SVGProps } from "react";
import {
  ArrowRight,
  IconAnalytics,
  IconApi,
  IconAutomation,
  IconBuilder,
  IconCampaigns,
  IconInbound,
  IconSdk,
  IconSegment,
  IconTriggers,
  IconWarmup,
  IconWebhooks,
} from "@/components/icons";
import {
  AnalyticsPanel,
  AutomationFlowPanel,
  BuilderPanel,
  CampaignsPanel,
  EmailApiPanel,
  InboundPanel,
  SdkPanel,
  SegmentPanel,
  TriggerPanel,
  WarmupPanel,
  WebhooksPanel,
} from "@/components/panels";
import { Container, Eyebrow, cx } from "@/components/ui";
import { href } from "@/lib/site";
import greenHills from "@/public/images/green-hills.png";
import greenMountains from "@/public/images/green-mountains.webp";
import lakeBeach from "@/public/images/lake-beach.png";

type Feature = {
  title: string;
  body: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  panel: ReactNode;
};

type SectionData = {
  id: string;
  eyebrow: string;
  eyebrowClass: string;
  title: string;
  image: StaticImageData;
  link: { label: string; path: string };
  features: Feature[];
};

const SECTIONS: SectionData[] = [
  {
    id: "transactional",
    eyebrow: "#01 - Transactional Emails",
    eyebrowClass: "text-rose-500",
    title: "OTPs, updates, and alerts your users can rely on.",
    image: greenMountains,
    link: { label: "All About Transactional Emails", path: "/transactional-emails" },
    features: [
      {
        title: "Email API / SMTP",
        body: "Send transactional emails programmatically with a clean, reliable REST API or SMTP.",
        icon: IconApi,
        panel: <EmailApiPanel />,
      },
      {
        title: "SDK",
        body: "Drop-in libraries for Node.js, Next.js, and more so you can start sending emails in minutes.",
        icon: IconSdk,
        panel: <SdkPanel />,
      },
      {
        title: "Inbound",
        body: "Receive an email, get structured JSON: bodies, attachments, headers, and auth checks, all parsed for you.",
        icon: IconInbound,
        panel: <InboundPanel />,
      },
      {
        title: "Webhooks",
        body: "Get real-time event notifications for every delivery, open, bounce, or failure.",
        icon: IconWebhooks,
        panel: <WebhooksPanel />,
      },
    ],
  },
  {
    id: "marketing",
    eyebrow: "#02 - Marketing Emails",
    eyebrowClass: "text-indigo-500",
    title: "Marketing emails that reach, engage and convert.",
    image: lakeBeach,
    link: { label: "All About Marketing Emails", path: "/marketing-emails" },
    features: [
      {
        title: "Campaigns",
        body: "Create, personalize, and send beautiful marketing emails to the right audience. From newsletters to product launches.",
        icon: IconCampaigns,
        panel: <CampaignsPanel />,
      },
      {
        title: "Domain Warmup",
        body: "Gradually warm up your sending domain to build trust with mailbox providers and improve deliverability.",
        icon: IconWarmup,
        panel: <WarmupPanel />,
      },
      {
        title: "Dynamic Segmentation",
        body: "Segment your audience dynamically based on behavior, contact properties, and engagement signals.",
        icon: IconSegment,
        panel: <SegmentPanel />,
      },
      {
        title: "Email Builder",
        body: "Build emails without bugging your devs. Write in markdown, preview instantly, ship in minutes.",
        icon: IconBuilder,
        panel: <BuilderPanel />,
      },
    ],
  },
  {
    id: "automation",
    eyebrow: "#03 - Email Automation",
    eyebrowClass: "text-lime-600",
    title: "Automate all emails from conversion to retention.",
    image: greenHills,
    link: { label: "All About Email Automation", path: "/email-automation" },
    features: [
      {
        title: "Email Automation",
        body: "Create welcome sequences, onboarding flows, and re-engagement campaigns that send themselves automatically.",
        icon: IconAutomation,
        panel: <AutomationFlowPanel />,
      },
      {
        title: "Smart Triggers",
        body: "Trigger emails based on user actions, contact property changes, or custom events from your product.",
        icon: IconTriggers,
        panel: <TriggerPanel />,
      },
      {
        title: "Analytics & Insights",
        body: "See opens, clicks, and conversions as they happen. Spot what's working and apply learnings to your next campaign.",
        icon: IconAnalytics,
        panel: <AnalyticsPanel />,
      },
    ],
  },
];

const AUTOPLAY_MS = 6000;

function FeatureSection({ data, className }: { data: SectionData; className?: string }) {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const n = data.features.length;
  const tabIds = data.features.map((_, i) => `${data.id}-tab-${i}`);
  const panelId = `${data.id}-panel`;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || !visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [active, autoplay, visible, n]);

  const select = (i: number) => {
    setAutoplay(false);
    setActive(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + n) % n;
    select(next);
    document.getElementById(tabIds[next])?.focus();
  };

  return (
    <section ref={rootRef} aria-labelledby={`${data.id}-title`} className={className}>
      <Container className="border border-stone-200">
        <div className="p-6">
          <Eyebrow className={data.eyebrowClass}>{data.eyebrow}</Eyebrow>
          <h2
            id={`${data.id}-title`}
            className="mt-4 max-w-[519px] text-[32px] leading-10 text-stone-800 sm:text-[40px] sm:leading-12"
          >
            {data.title}
          </h2>
        </div>

        <div className="grid border-t border-stone-200 lg:grid-cols-[550px_1fr]">
          <div role="tablist" aria-orientation="vertical" aria-label={data.eyebrow} onKeyDown={onKeyDown} className="relative flex flex-col">
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 left-0 z-10 w-1 bg-[linear-gradient(white_0%,white_40%,#615fff_100%)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] max-lg:hidden"
              style={{ height: `${100 / n}%`, transform: `translateY(${active * 100}%)` }}
            />
            {data.features.map((f, i) => {
              const Icon = f.icon;
              const selected = i === active;
              return (
                <button
                  key={f.title}
                  id={tabIds[i]}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  className={cx(
                    "flex flex-1 items-center gap-4 border-stone-200 px-6 py-7 text-left transition-colors duration-200 not-last:border-b lg:min-h-[129px] lg:py-0",
                    selected ? "bg-white" : "bg-stone-50 hover:bg-white/60",
                  )}
                >
                  <Icon aria-hidden className="size-5 shrink-0 self-start text-stone-800 lg:mt-0 lg:self-center" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-base leading-4 font-medium text-stone-800 uppercase">{f.title}</span>
                    <span className="mt-2 block text-base leading-6 text-stone-500">{f.body}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabIds[active]}
            className="relative h-[520px] overflow-hidden border-stone-200 max-lg:border-t lg:border-l"
          >
            <Image src={data.image} alt="" fill sizes="(max-width: 1024px) 100vw, 552px" className="object-cover" />
            {data.features.map((f, i) => (
              <div
                key={f.title}
                aria-hidden={i !== active}
                inert={i !== active}
                className={cx(
                  "absolute inset-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  i === active ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                )}
              >
                {i === active || visible ? f.panel : null}
              </div>
            ))}
          </div>
        </div>

        <a
          href={href(data.link.path)}
          className="group flex justify-center border-t border-stone-200 bg-white p-4"
        >
          <span className="inline-flex h-8 items-center gap-2 rounded-xl px-4 font-mono text-sm leading-5 font-semibold text-indigo-600 uppercase transition-colors group-hover:bg-indigo-50">
            {data.link.label}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </a>
      </Container>
    </section>
  );
}

export function FeatureSections() {
  return (
    <>
      {SECTIONS.map((s, i) => (
        <FeatureSection key={s.id} data={s} className={i === 0 ? "mt-24 sm:mt-40" : "mt-20"} />
      ))}
    </>
  );
}
