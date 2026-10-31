import { Fragment } from "react";
import {
  ArrowUpRight11,
  Logo,
  SocialDiscord,
  SocialGithub,
  SocialLinkedin,
  SocialPeerlist,
  SocialX,
  SocialYoutube,
} from "@/components/icons";
import { Container, cx } from "@/components/ui";
import { FOOTER_COLUMNS, FOOTER_ROWS, isExternal } from "@/lib/site";

const SOCIALS = [
  { name: "Peerlist", url: "https://peerlist.io/company/autosend", icon: SocialPeerlist },
  { name: "X", url: "https://x.com/AutosendEmail", icon: SocialX },
  { name: "GitHub", url: "https://github.com/autosendhq", icon: SocialGithub },
  { name: "Discord", url: "https://discord.gg/rfcXWWgKzc", icon: SocialDiscord },
  { name: "LinkedIn", url: "https://www.linkedin.com/company/autosendemail/", icon: SocialLinkedin },
  { name: "YouTube", url: "https://www.youtube.com/@AutoSendEmail", icon: SocialYoutube },
];

const cell = "flex min-h-[33px] items-center px-6 py-2 font-mono text-xs leading-4 font-medium uppercase";

function DesktopGrid() {
  return (
    <div className="grid grid-cols-5 gap-px border-y border-stone-200 bg-stone-200 max-lg:hidden">
      {FOOTER_COLUMNS.map((c) => (
        <p key={c} className={cx(cell, "bg-white tracking-[0.1em] text-stone-500")}>{c}</p>
      ))}
      {FOOTER_ROWS.map((row, r) => (
        <Fragment key={r}>
          {row.map((link, c) =>
            link ? (
              <a
                key={c}
                href={link.url}
                {...(isExternal(link.url) ? { target: "_blank", rel: "noreferrer" } : {})}
                className={cx(cell, "group gap-1.5 bg-stone-50 text-stone-800 transition-colors hover:bg-white")}
              >
                {link.label}
                {isExternal(link.url) && <ArrowUpRight11 aria-hidden className="size-[11px] shrink-0 text-stone-500 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />}
              </a>
            ) : (
              <div key={c} aria-hidden className="bg-stone-50" />
            ),
          )}
        </Fragment>
      ))}
    </div>
  );
}

function MobileGrid() {
  return (
    <div className="grid grid-cols-2 gap-px border-y border-stone-200 bg-stone-200 sm:grid-cols-3 lg:hidden">
      {FOOTER_COLUMNS.map((title, c) => (
        <div key={title} className="bg-stone-50 pb-3">
          <p className={cx(cell, "bg-white tracking-[0.1em] text-stone-500")}>{title}</p>
          <ul>
            {FOOTER_ROWS.map((row) => row[c]).filter((l) => l !== null).map((l) => (
              <li key={l.label}>
                <a href={l.url} className={cx(cell, "min-h-10 text-stone-800")}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="pb-10">
      <Container className="border-x border-b border-stone-200">
        <div className="h-12 border-t border-stone-200" />
        <nav aria-label="Footer">
          <DesktopGrid />
          <MobileGrid />
        </nav>
        <div className="relative flex flex-wrap items-end justify-between gap-6 p-6 lg:pt-[64px]">
          <div>
            <Logo aria-label="AutoSend" role="img" className="h-6 w-[139px] text-stone-800" />
            <p className="mt-3 font-mono text-xs leading-4 text-stone-400 uppercase">© 2026 • Peerlist Inc.</p>
          </div>
          <a
            href="https://status.autosend.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-mono text-xs leading-4 font-semibold text-stone-800 uppercase lg:absolute lg:bottom-[43px] lg:left-1/2 lg:-translate-x-1/2"
          >
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-lime-500/60 [animation-duration:2.4s]" />
              <span className="relative size-2.5 rounded-full bg-lime-500" />
            </span>
            All systems operational
          </a>
          <div className="text-right">
            <p className="font-mono text-xs leading-4 font-semibold text-stone-800 uppercase">Find us on</p>
            <ul className="mt-3 flex items-center gap-2">
              {SOCIALS.map(({ name, url, icon: Icon }) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noreferrer" aria-label={`AutoSend on ${name}`} className="flex size-6 items-center justify-center transition-opacity hover:opacity-70">
                    <Icon aria-hidden className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
