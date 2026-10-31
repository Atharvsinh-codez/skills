import type { ComponentType, SVGProps } from "react";
import {
  ArrowRight14,
  ArrowUpRight,
  BrandChatGPT,
  BrandClaude,
  BrandGemini,
  BrandPerplexity,
} from "@/components/icons";
import { BRAND_COLOR } from "@/components/agents";
import { Container, cx } from "@/components/ui";
import { ASK_LINKS, href } from "@/lib/site";

const ASKS: Array<{ name: string; url: string; icon: ComponentType<SVGProps<SVGSVGElement>> }> = [
  { name: "Ask ChatGPT", url: ASK_LINKS.chatgpt, icon: BrandChatGPT },
  { name: "Ask Gemini", url: ASK_LINKS.gemini, icon: BrandGemini },
  { name: "Ask Claude", url: ASK_LINKS.claude, icon: BrandClaude },
  { name: "Ask Perplexity", url: ASK_LINKS.perplexity, icon: BrandPerplexity },
];

export function StillWondering() {
  return (
    <section aria-labelledby="wondering-title" className="mt-24 sm:mt-40">
      <Container className="grid border-x border-t border-stone-200 lg:grid-cols-2">
        <div className="p-6 lg:py-[46px]">
          <h2 id="wondering-title" className="text-[32px] leading-10 text-stone-800 sm:text-[40px] sm:leading-12">
            Still wondering?
          </h2>
          <p className="mt-4 text-lg leading-7 text-stone-500 sm:text-xl sm:leading-[30px]">
            See what your favorite LLM has to say about us,{" "}
            <span className="sm:block">then make an informed decision.</span>
          </p>
        </div>
        <div className="flex flex-col border-stone-200 max-lg:border-t lg:border-l">
          <ul className="grid flex-1 grid-cols-1 gap-px bg-stone-200 sm:grid-cols-2">
            {ASKS.map(({ name, url, icon: Icon }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full min-h-[73px] items-center gap-3 bg-stone-50 px-6 transition-colors hover:bg-white"
                >
                  <Icon aria-hidden className={cx("size-6 shrink-0", BRAND_COLOR[name])} />
                  <span className="flex-1 font-mono text-sm leading-5 font-medium text-stone-800 uppercase">{name}</span>
                  <ArrowUpRight aria-hidden className="size-3.5 text-stone-800 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={href("/book-a-demo")}
            className="group flex items-center justify-between border-t border-stone-200 bg-white p-6 font-mono text-sm leading-5 font-medium text-stone-800 uppercase transition-colors hover:bg-stone-50"
          >
            Talk to a Human
            <ArrowRight14 aria-hidden className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </Container>
    </section>
  );
}
