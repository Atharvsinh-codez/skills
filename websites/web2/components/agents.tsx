import type { ComponentType, SVGProps } from "react";
import {
  ArrowUpRight20,
  BrandAntigravity,
  BrandChatGPT,
  BrandClaude,
  BrandCodex,
  BrandCopilot,
  BrandCursor,
  BrandLovable,
} from "@/components/icons";
import { Container, Eyebrow, cx } from "@/components/ui";

export const BRAND_COLOR: Record<string, string> = {
  Claude: "text-[#d97757]",
  "Ask Claude": "text-[#d97757]",
  "Ask Perplexity": "text-[#1fb8cd]",
};

const AGENTS: Array<{ name: string; url: string; icon?: ComponentType<SVGProps<SVGSVGElement>> }> = [
  { name: "ChatGPT", url: "https://docs.autosend.com/ai/mcp-clients/chatgpt", icon: BrandChatGPT },
  { name: "Codex", url: "https://docs.autosend.com/ai/mcp-clients/codex", icon: BrandCodex },
  { name: "Claude", url: "https://docs.autosend.com/ai/mcp-clients/claude", icon: BrandClaude },
  { name: "Antigravity", url: "https://docs.autosend.com/ai/mcp-clients/antigravity", icon: BrandAntigravity },
  { name: "Cursor", url: "https://docs.autosend.com/ai/mcp-clients/cursor", icon: BrandCursor },
  { name: "Lovable", url: "https://docs.autosend.com/ai/integrations/lovable", icon: BrandLovable },
  { name: "Copilot", url: "https://docs.autosend.com/ai/mcp-clients/copilot", icon: BrandCopilot },
  { name: "Others", url: "https://docs.autosend.com/ai/mcp-server" },
];

export function Agents() {
  return (
    <section aria-labelledby="agents-title" className="mt-24 sm:mt-40">
      <Container className="grid border border-stone-200 lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-16 p-6">
          <Eyebrow className="text-indigo-500">Agentic Integrations</Eyebrow>
          <h2 id="agents-title" className="text-[32px] leading-10 text-stone-800 sm:text-[40px] sm:leading-12">
            Works with your <br />
            favorite agent.
          </h2>
        </div>
        <ul className="grid grid-cols-2 gap-px border-stone-200 bg-stone-200 max-lg:border-t lg:border-l">
          {AGENTS.map(({ name, url, icon: Icon }) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-[109px] flex-col justify-between bg-stone-50 p-6 transition-colors hover:bg-white"
              >
                <span className="flex items-start justify-between">
                  <span className="size-6">{Icon && <Icon aria-hidden className={cx("size-6", BRAND_COLOR[name])} />}</span>
                  <ArrowUpRight20 aria-hidden className="size-5 text-stone-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-stone-800" />
                </span>
                <span className="font-mono text-sm leading-5 font-medium text-stone-800 uppercase">{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
