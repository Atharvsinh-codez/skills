"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUpDown,
  Connector,
  IconClock,
  IconCopy,
  IconDots,
  IconExit,
  IconGear,
  IconSending,
  IconTrigger,
  PlusCircle,
  PlusSmall,
  TabCurve,
} from "@/components/icons";
import { AppWindow, cx } from "@/components/ui";
import { highlight } from "@/lib/highlight";
import {
  INBOUND_REQUEST,
  INBOUND_RESPONSE,
  LANGUAGES,
  SDK_SAMPLE,
  SEND_EMAIL,
  type LanguageId,
} from "@/lib/code-samples";
import csphere from "@/public/images/projects/csphere.png";
import frostline from "@/public/images/projects/frostline.png";

const label = "font-mono text-xs leading-4 font-semibold tracking-[0.04em] uppercase";

/* ------------------------------------------------------------------ code */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={copied ? "Copied" : "Copy code"}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        } catch {
          setCopied(false);
        }
      }}
      className="absolute top-4 right-4 z-10 inline-flex size-7 items-center justify-center rounded-md border border-stone-200 bg-white text-stone-500 transition-colors hover:text-stone-800"
    >
      {copied ? (
        <svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-4">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <IconCopy aria-hidden className="size-4" />
      )}
    </button>
  );
}

function Code({ code, className }: { code: string; className?: string }) {
  return (
    <pre className={cx("no-scrollbar overflow-auto font-mono text-[13px] leading-5 font-medium text-stone-950", className)}>
      <code>{highlight(code)}</code>
    </pre>
  );
}

function LanguageRail({ value, onChange }: { value: LanguageId; onChange: (l: LanguageId) => void }) {
  return (
    <div className="no-scrollbar flex w-[103px] shrink-0 flex-col overflow-y-auto bg-stone-100">
      {LANGUAGES.map((l) => (
        <button
          key={l.id}
          type="button"
          aria-pressed={value === l.id}
          onClick={() => onChange(l.id)}
          className={cx(
            "flex h-12 shrink-0 items-center gap-2 px-4 font-mono text-sm leading-5 font-medium text-stone-800 transition-colors",
            value === l.id ? "bg-white" : "hover:bg-stone-50",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/icons/lang/${l.icon}.svg`} alt="" width={14} height={14} className="size-3.5" />
          {l.id}
        </button>
      ))}
    </div>
  );
}

export function EmailApiPanel() {
  const [lang, setLang] = useState<LanguageId>("cURL");
  return (
    <AppWindow className="absolute inset-6" bodyClassName="flex">
      <LanguageRail value={lang} onChange={setLang} />
      <div className="relative min-w-0 flex-1">
        <CopyButton text={SEND_EMAIL[lang]} />
        <Code code={SEND_EMAIL[lang]} className="absolute inset-0 pt-5 pr-12 pb-5 pl-4" />
      </div>
    </AppWindow>
  );
}

export function SdkPanel() {
  return (
    <div className="absolute inset-x-9 top-1/2 -translate-y-1/2">
      <AppWindow>
        <CopyButton text={SDK_SAMPLE} />
        <Code code={SDK_SAMPLE} className="px-4 pt-6 pb-6" />
      </AppWindow>
    </div>
  );
}

export function InboundPanel() {
  const [lang, setLang] = useState<LanguageId>("cURL");
  const [view, setView] = useState<"request" | "response">("request");
  const code = view === "request" ? INBOUND_REQUEST[lang] : INBOUND_RESPONSE;
  return (
    <AppWindow className="absolute inset-6" bodyClassName="flex">
      <LanguageRail value={lang} onChange={setLang} />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1 border-b border-stone-200 px-3 py-2">
          {(["request", "response"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cx(
                "h-7 rounded-md px-2.5 font-mono text-xs font-semibold uppercase transition-colors",
                view === v ? "bg-indigo-50 text-indigo-600" : "text-stone-500 hover:text-stone-800",
              )}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="relative min-h-0 flex-1">
          <CopyButton text={code} />
          <Code code={code} className="absolute inset-0 pt-4 pr-12 pb-5 pl-4" />
        </div>
      </div>
    </AppWindow>
  );
}

/* --------------------------------------------------------------- shared */

function Field({ name, required, children, hint }: { name: string; required?: boolean; children: ReactNode; hint?: string }) {
  return (
    <div>
      <p className="text-sm leading-5 font-medium text-stone-800">
        {name}
        {required && <span className="text-rose-500"> *</span>}
      </p>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1.5 text-xs leading-4 text-stone-500">{hint}</p>}
    </div>
  );
}

function Input({ children, select, className }: { children?: ReactNode; select?: boolean; className?: string }) {
  return (
    <div className={cx("flex h-8 items-center justify-between rounded-lg border border-stone-200 bg-white px-3 text-sm leading-5 text-stone-800", className)}>
      <span className="truncate">{children}</span>
      {select && <ChevronDown aria-hidden className="ml-2 size-3 shrink-0 text-stone-500" />}
    </div>
  );
}

function Check({ on, children }: { on?: boolean; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-sm leading-5 text-stone-800">
      <span
        className={cx(
          "flex size-4 shrink-0 items-center justify-center rounded border",
          on ? "border-indigo-500 bg-indigo-500 text-white" : "border-stone-300 bg-white",
        )}
      >
        {on && (
          <svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-3">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------- webhooks */

const WEBHOOK_EVENTS: Array<[string, Array<[string, boolean]>]> = [
  ["Engagement", [["Opened", true], ["Clicked", true], ["Unsubscribed", false], ["Resubscribed", false], ["Spam Reports", true], ["Group Unsubscribes", false], ["Group Resubscribes", false]]],
  ["Deliverability", [["Dropped", false], ["Deferred", false], ["Bounced", true], ["Delivered", true]]],
  ["Contact Events", [["Contact Created", true], ["Contact Updated", false], ["Contact Deleted", false]]],
];

export function WebhooksPanel() {
  return (
    <AppWindow className="absolute inset-6" bodyClassName="overflow-hidden">
      <div className="border-b border-stone-200 bg-stone-50 px-5 py-4">
        <p className="text-base leading-6 font-semibold text-stone-800">Create New Webhook</p>
        <p className="mt-0.5 text-sm leading-5 text-stone-500">
          Get instant updates in your tools when something happens in AutoSend.
        </p>
      </div>
      <div className="space-y-4 px-5 py-4">
        <div className="grid grid-cols-2 gap-3">
          <Field name="Name" required>
            <Input>Order updates</Input>
          </Field>
          <Field name="Endpoint URL" required>
            <Input>https://api.acme.com/hooks</Input>
          </Field>
        </div>
        <p className="-mt-2 text-xs leading-4 text-stone-500">URL where AutoSend should post the updates.</p>
        <div>
          <p className="text-sm leading-5 font-medium text-stone-800">
            Select the events to be posted<span className="text-rose-500"> *</span>
          </p>
          <div className="mt-2 space-y-3 rounded-xl border border-stone-200 p-3">
            {WEBHOOK_EVENTS.map(([group, events]) => (
              <div key={group}>
                <p className={cx(label, "text-stone-500")}>{group}</p>
                <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2">
                  {events.map(([e, on]) => (
                    <Check key={e} on={on}>{e}</Check>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Field name="Secret Token">
          <Input className="bg-stone-100 font-mono text-xs text-stone-500 uppercase">Generated after creating</Input>
        </Field>
      </div>
    </AppWindow>
  );
}

/* ------------------------------------------------------------ campaigns */

function CampaignCard({ status, date, title, subject, live }: { status: string; date: string; title: string; subject: string; live?: boolean }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-xs leading-4">
            <IconSending aria-hidden className={cx("size-3 shrink-0", live ? "text-indigo-500" : "text-stone-500")} />
            <span className={cx(label, live ? "text-shimmer" : "text-stone-800")}>{status}</span>
            <span className="text-stone-500">•</span>
            <span className="truncate text-stone-500">{date}</span>
          </p>
          <p className="mt-2 truncate text-sm leading-5 font-semibold text-stone-800">{title}</p>
          <p className="mt-0.5 truncate text-sm leading-5 text-stone-800">Subject: {subject}</p>
        </div>
        <IconDots aria-hidden className="mt-6 size-[15px] shrink-0 text-stone-500" />
      </div>
    </div>
  );
}

export function CampaignsPanel() {
  return (
    <AppWindow className="absolute inset-6" bodyClassName="bg-stone-50 px-6 pt-4">
      <div className="flex items-start justify-between gap-4">
        <div className="max-w-[283px]">
          <p className="text-lg leading-7 font-semibold text-stone-800">Campaigns</p>
          <p className="mt-2 text-sm leading-5 text-stone-500">Campaigns are marketing emails that you can send to your contacts.</p>
        </div>
        <span className="inline-flex h-6 shrink-0 items-center gap-1 rounded-lg border-2 border-stone-800 bg-stone-700 px-3 font-mono text-xs leading-4 font-semibold text-stone-50 uppercase">
          <PlusSmall aria-hidden className="size-3.5" />
          New Campaign
        </span>
      </div>
      <div className="mt-4 space-y-4">
        <CampaignCard live status="Sending" date="24 Mar, 2026 • 10:24 AM" title="Product Release Mar 26" subject="What we shipped this month + an exciting surprise!" />
      </div>
      <div className="flex h-12 items-center gap-2">
        <ChevronRight aria-hidden className="size-4 rotate-90 text-stone-500" />
        <span className={cx(label, "text-stone-500")}>Past Campaigns ( 3 )</span>
        <span className="h-px flex-1 bg-stone-200" />
      </div>
      <div className="space-y-4">
        <CampaignCard status="Sent" date="20 Mar, 2026 • 10:40 AM" title="Weekly Newsletter" subject="Jobs are changing and here's what you can do." />
        <CampaignCard status="Sent" date="20 Mar, 2026 • 10:40 AM" title="Feedback Survey" subject="Top Projects of Week 38" />
        <CampaignCard status="Sent" date="2025/12/17 • 10:24 AM" title="Peerlist Weekly Email" subject="Top Projects of Week 38" />
      </div>
    </AppWindow>
  );
}

/* --------------------------------------------------------------- warmup */

const WARMUP = Array.from({ length: 15 }, (_, i) => Math.round(25 * Math.pow(1.25, i)));

function Radio({ on, title, children }: { on?: boolean; title: string; children?: ReactNode }) {
  return (
    <div className={cx("rounded-xl border p-3", on ? "border-indigo-500 bg-indigo-50/40" : "border-stone-200 bg-white")}>
      <p className="flex items-center gap-2 text-sm leading-5 font-medium text-stone-800">
        <span className={cx("flex size-4 items-center justify-center rounded-full border", on ? "border-indigo-500" : "border-stone-300")}>
          {on && <span className="size-2 rounded-full bg-indigo-500" />}
        </span>
        {title}
      </p>
      {children}
    </div>
  );
}

export function WarmupPanel() {
  const max = 455;
  return (
    <AppWindow className="absolute inset-6" bodyClassName="overflow-hidden px-5 pt-4">
      <p className="text-base leading-6 font-semibold text-stone-800">When to send?</p>
      <div className="mt-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <Radio title="Now" />
          <Radio title="Schedule" />
        </div>
        <Radio on title="Gradual Send (Domain Warmup)">
          <p className="mt-1 pl-6 text-xs leading-4 text-stone-500">
            Gradually increase sending volume over time to warmup your domain and build sender reputation with mailbox providers.
          </p>
          <div className="mt-3 grid grid-cols-[1fr_1.6fr] gap-2 pl-6">
            <Field name="Starting volume" required>
              <Input>25 emails</Input>
            </Field>
            <Field name="Increment" required>
              <Input select>1.25x - Grow 25% each day (Recommended)</Input>
            </Field>
          </div>
          <div className="mt-3 pl-6">
            <p className="text-sm leading-5 font-medium text-stone-800">Daily send schedule</p>
            <p className="text-xs leading-4 text-stone-500">Full list of 2,500 contacts reached by Nov 14 (Day 15).</p>
            <div className="mt-2 flex gap-2">
              <div className="flex h-[96px] flex-col justify-between text-right font-mono text-[9px] leading-none text-stone-400">
                {[455, 364, 273, 182, 91, 0].map((v) => <span key={v}>{v}</span>)}
              </div>
              <div className="flex-1">
                <div className="flex h-[96px] items-end gap-1 border-b border-l border-stone-200 pl-1">
                  {WARMUP.map((v, i) => (
                    <span key={i} className="flex-1 rounded-t-sm bg-indigo-400/80" style={{ height: `${Math.min(100, (v / max) * 100)}%` }} />
                  ))}
                </div>
                <div className="mt-1 flex gap-1 pl-1 font-mono text-[8px] leading-none text-stone-400">
                  {WARMUP.map((_, i) => <span key={i} className="flex-1 text-center">D{i + 1}</span>)}
                </div>
              </div>
            </div>
          </div>
        </Radio>
        <Field name="Safety threshold" required hint="Auto-pause if bounce > 2% or complaints > 0.05%. You'll get a daily email summary and an alert if warmup pauses.">
          <Input select>Conservative</Input>
        </Field>
      </div>
    </AppWindow>
  );
}

/* -------------------------------------------------------------- segment */

export function SegmentPanel() {
  return (
    <div className="absolute inset-x-6 bottom-6 flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_24px_48px_-16px_rgba(28,25,23,0.35),0_0_0_1px_rgba(28,25,23,0.04)]">
      <div className="border-b border-stone-200 bg-stone-100 px-6 py-6">
        <p className="text-base leading-6 font-medium text-stone-800">Create Segment</p>
        <p className="mt-1 text-base leading-6 text-stone-800">
          A segment is created by matching your contacts to specific criteria. Contacts that meet those conditions are added to the segment.
        </p>
      </div>
      <div className="space-y-6 px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          <Field name="Segment Name" required>
            <Input>Pro Users</Input>
          </Field>
          <Field name="Contact List" required hint="Which contacts do you want to segment">
            <Input select>All Contacts</Input>
          </Field>
        </div>
        <div className="rounded-xl border border-stone-200 p-4">
          <p className="text-xs leading-4 text-stone-800">Automatically add contacts matching following criteria</p>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-8 flex-1 items-center divide-x divide-stone-200 rounded-lg border border-stone-200 text-sm text-stone-800">
              <span className="flex flex-1 items-center justify-between px-3">plan<ChevronDown aria-hidden className="size-3 text-stone-500" /></span>
              <span className="flex flex-1 items-center justify-between px-3">equals<ChevronDown aria-hidden className="size-3 text-stone-500" /></span>
              <span className="flex-1 px-3">Pro</span>
            </div>
            <span className="flex size-6 items-center justify-center rounded-md bg-stone-100 text-stone-500">
              <svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-3"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
            </span>
          </div>
          <span className="mt-3 inline-flex h-6 items-center gap-1 rounded-md border border-stone-200 px-2 font-mono text-xs font-semibold text-stone-800 uppercase">
            <PlusSmall aria-hidden className="size-3" />Add Filter
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-stone-200 font-mono text-sm leading-5 font-semibold uppercase">
        <span className="py-3 text-center text-stone-500">Cancel</span>
        <span className="bg-indigo-50 py-3 text-center text-indigo-600">Create Segment</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- builder */

const BlockIcon = ({ d }: { d: string }) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-stone-800">
    <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HeadingIcon = ({ level }: { level: number }) => (
  <svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-4 shrink-0 text-stone-800">
    <path d="M3 5v14M13 5v14M3 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <text x="16" y="20" fontSize="10" fontFamily="inherit" fill="currentColor">{level}</text>
  </svg>
);

const BLOCKS_TEXT: Array<[ReactNode, string, string]> = [
  [<BlockIcon key="t" d="M5 5h14M12 5v14M9 19h6" />, "Text", ""],
  [<HeadingIcon key="h1" level={1} />, "Heading 1", "#"],
  [<HeadingIcon key="h2" level={2} />, "Heading 2", "##"],
  [<HeadingIcon key="h3" level={3} />, "Heading 3", "###"],
  [<BlockIcon key="ul" d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />, "Bullet List", "-"],
  [<BlockIcon key="ol" d="M10 6h10M10 12h10M10 18h10M4 5l1.5-1v5M3.5 14.5c.5-1 2.5-1 2.5.5 0 1-2.5 2-2.5 3h2.5" />, "Numbered List", "1."],
  [<BlockIcon key="ft" d="M8 4v12a3 3 0 0 0 3 3h3M5 9h7" />, "Footer", ""],
];

const BLOCKS_COMPONENTS: Array<[ReactNode, string]> = [
  [<BlockIcon key="img" d="M4 16l4-4 3 3 4-5 5 6M4 5h16v14H4z" />, "Image"],
  [<BlockIcon key="btn" d="M4 8h16v8H4zM8 12h8" />, "Button"],
  [<BlockIcon key="co" d="M12 8v4M12 16h.01M4 6h16v12H4z" />, "Callout"],
  [<BlockIcon key="dv" d="M4 12h16" />, "Divider"],
  [<BlockIcon key="un" d="M10 14l-2 2a3 3 0 0 1-4-4l2-2M14 10l2-2a3 3 0 0 1 4 4l-2 2M4 4l16 16" />, "Unsubscribe Link"],
];

export function BuilderPanel() {
  return (
    <AppWindow className="absolute inset-6" bodyClassName="overflow-hidden">
      <div className="divide-y divide-stone-200 border-b border-stone-200 text-sm leading-5">
        <p className="px-5 py-3 text-stone-500">Subject<span className="text-rose-500"> *</span> <span className="text-stone-800">Your weekly product digest</span></p>
        <p className="px-5 py-3 text-stone-500">Preview: <span className="text-stone-800">Three updates worth your time</span></p>
      </div>
      <div className="relative px-5 pt-4">
        <p className="text-sm leading-5 text-stone-400">
          <span className="text-stone-800">/</span>
          <span className="animate-caret mx-px inline-block h-4 w-px translate-y-[3px] bg-stone-800" />
          Start writing, press / for commands
        </p>
        <div className="mt-2 w-[232px] rounded-xl border border-stone-200 bg-white p-1 shadow-[0_16px_32px_-12px_rgba(28,25,23,0.3)]">
          <p className={cx(label, "px-3 pt-2 pb-1 text-[10px] text-stone-500")}>Text</p>
          {BLOCKS_TEXT.map(([icon, name, hint], i) => (
            <div key={name} className={cx("flex h-8 items-center gap-3 rounded-lg px-3 text-sm text-stone-800", i === 0 && "bg-stone-100")}>
              {icon}
              <span className="flex-1">{name}</span>
              <span className="font-mono text-xs text-stone-400">{hint}</span>
            </div>
          ))}
          <p className={cx(label, "px-3 pt-3 pb-1 text-[10px] text-stone-500")}>Components</p>
          {BLOCKS_COMPONENTS.map(([icon, name]) => (
            <div key={name} className="flex h-8 items-center gap-3 rounded-lg px-3 text-sm text-stone-800">
              {icon}
              <span className="flex-1">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  );
}

/* ----------------------------------------------------------- automation */

function TriggerNode({ delay = 0 }: { delay?: number }) {
  return (
    <div className="animate-rise w-[320px]" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-end text-stone-200">
        <div className="flex h-9 items-center gap-2 rounded-tl-xl border border-r-0 border-b-0 border-stone-200 bg-white pt-1 pl-3">
          <IconTrigger aria-hidden className="size-4 text-stone-800" />
          <span className={cx(label, "pr-1 text-stone-800")}>Trigger</span>
        </div>
        <TabCurve aria-hidden className="-ml-px h-9 w-[46px] [--color-stone-0:#fff]" />
      </div>
      <div className="-mt-px flex flex-wrap items-center gap-1 rounded-tr-xl rounded-b-xl border border-stone-200 bg-white p-4 text-sm leading-5 text-stone-800">
        Contact is added to
        <span className="rounded-md bg-indigo-100 px-2 py-0.5 font-mono text-xs leading-4 font-semibold text-indigo-600">All Customers</span>
        list
      </div>
    </div>
  );
}

function WaitNode({ stats, delay = 0 }: { stats?: boolean; delay?: number }) {
  return (
    <div className="animate-rise w-[320px] rounded-2xl border border-stone-200 bg-stone-100" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="flex items-center gap-2">
          <IconClock aria-hidden className="size-3.5 text-stone-500" />
          <span className={cx(label, "text-stone-500")}>Wait for</span>
        </span>
        <span className="text-xs leading-4 font-semibold text-stone-800">8 hrs</span>
      </div>
      <div className="m-px rounded-2xl bg-white p-4">
        <div className="flex items-center gap-2">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg leading-7 text-indigo-500">D</span>
          <span className="min-w-0">
            <span className="block truncate text-sm leading-5 font-medium text-stone-800">Welcome, Let&apos;s Get Started!</span>
            <span className="block truncate text-sm leading-5 text-stone-500">David &lt;david@acme.com&gt;</span>
          </span>
        </div>
        {stats && (
          <dl className="mt-3 grid grid-cols-4 border-t border-stone-200 pt-3 text-center">
            {[["Requests", "12,104"], ["Sent", "30%"], ["Opens", "12%"], ["Clicks", "5%"]].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] leading-4 font-semibold tracking-[0.04em] text-stone-500 uppercase">{k}</dt>
                <dd className="mt-0.5 text-sm leading-5 text-stone-800 tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}

function EndNode({ delay = 0 }: { delay?: number }) {
  return (
    <div className="animate-rise w-[320px]" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-end justify-end text-stone-200">
        <TabCurve aria-hidden className="-mr-px h-9 w-[46px] -scale-x-100 [--color-stone-0:#fff]" />
        <div className="flex h-9 items-center gap-2 rounded-tr-xl border border-b-0 border-l-0 border-stone-200 bg-white pt-1 pr-4">
          <span className={cx(label, "pl-1 text-stone-800")}>Automation Ends</span>
          <IconExit aria-hidden className="size-4 text-stone-800" />
        </div>
      </div>
      <div className="-mt-px rounded-tl-xl rounded-b-xl border border-stone-200 bg-white p-4 text-sm leading-5 font-medium text-stone-800">
        Once all emails have been sent or contact doesn&apos;t meet the entry criteria.
      </div>
    </div>
  );
}

const Arrow = ({ delay = 0 }: { delay?: number }) => (
  <Connector aria-hidden className="animate-rise my-1 h-[42px] w-3 text-stone-300" style={{ animationDelay: `${delay}ms` }} />
);

export function AutomationFlowPanel() {
  return (
    <AppWindow className="absolute inset-6" bodyClassName="flex flex-col items-center bg-stone-50 pt-8">
      <TriggerNode />
      <Arrow delay={150} />
      <WaitNode delay={300} />
      <Arrow delay={450} />
      <EndNode delay={600} />
    </AppWindow>
  );
}

export function TriggerPanel() {
  return (
    <AppWindow className="absolute inset-6" bodyClassName="flex items-center justify-center bg-stone-50">
      <TriggerNode />
    </AppWindow>
  );
}

export function AnalyticsPanel() {
  return (
    <AppWindow className="absolute inset-6" bodyClassName="flex flex-col items-center justify-center bg-stone-50">
      <WaitNode stats />
      <p className="animate-rise mt-6 text-sm leading-5 text-stone-500" style={{ animationDelay: "200ms" }}>
        Click to view detailed analytics
      </p>
    </AppWindow>
  );
}

/* ------------------------------------------------------------- projects */

export function ProjectSwitcher() {
  return (
    <div className="w-64">
      <div className="flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-2 py-1.5">
        <Image src={csphere} alt="" width={24} height={24} className="size-6 rounded-md" />
        <p className="flex-1 truncate text-sm leading-5 font-semibold text-stone-800">ConnectSphere</p>
        <ChevronUpDown aria-hidden className="size-4 text-stone-500" />
      </div>
      <div className="mt-3 rounded-lg border border-stone-200 bg-white p-2 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.3)]">
        <div className="flex items-center gap-2 rounded-md bg-stone-100 p-2">
          <Image src={csphere} alt="" width={24} height={24} className="size-6 rounded-md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm leading-5 font-semibold text-stone-800">ConnectSphere</p>
            <p className="truncate font-mono text-xs leading-4 text-stone-500">csphere.com</p>
          </div>
          <IconGear aria-hidden className="size-4 text-stone-500" />
        </div>
        <hr className="my-1.5 border-stone-200" />
        <div className="flex items-center gap-2 p-2">
          <Image src={frostline} alt="" width={24} height={24} className="size-6 rounded-md" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm leading-5 font-semibold text-stone-800">Frostline</p>
            <p className="truncate font-mono text-xs leading-4 text-stone-500">frostline.io</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2 pt-2 pb-1">
          <span className="flex size-6 items-center justify-center">
            <PlusCircle aria-hidden className="size-[18px] text-stone-800" />
          </span>
          <p className={cx(label, "text-stone-800")}>New Project</p>
        </div>
      </div>
    </div>
  );
}
