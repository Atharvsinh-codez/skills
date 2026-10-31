import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { PromptBox } from "@/components/prompt-box";
import { ButtonLink, Container } from "@/components/ui";
import { href } from "@/lib/site";
import heroImage from "@/public/images/pixel-mountain-lake.png";

const AGENT_CARDS = [
  {
    title: "Email API",
    body: "Fast and reliable email API your AI agents can work with.",
    url: "https://docs.autosend.com/quickstart/email-using-api",
  },
  {
    title: "MCP",
    body: "Build templates, create campaigns, manage contacts, & monitor delivery stats.",
    url: "https://docs.autosend.com/ai/mcp-server",
  },
  {
    title: "skill.md",
    body: "Give your agent full knowledge of the AutoSend API and best practices.",
    url: "https://docs.autosend.com/ai/skills",
  },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-16 sm:pt-[116px]">
      <Container className="text-center">
        <a
          href={href("/inbound")}
          className="group inline-flex h-8 max-w-full overflow-hidden rounded-lg bg-white text-left"
        >
          <span className="flex shrink-0 items-center rounded-l-lg bg-stone-800 px-4 font-mono text-xs leading-4 font-medium text-stone-50 uppercase">
            New
          </span>
          <span className="flex min-w-0 items-center truncate rounded-r-lg border border-stone-800 pr-3 pl-4 text-sm leading-5 font-medium text-stone-800 transition-colors group-hover:bg-stone-100">
            <span className="truncate">
              <span className="max-sm:hidden">Inbound Email API: </span>AutoSend can now receive emails.
            </span>
          </span>
        </a>

        <h1
          id="hero-title"
          className="font-display mx-auto mt-10 max-w-[760px] text-[44px] leading-[1.1] font-light text-stone-800 sm:text-[64px] lg:text-[80px] lg:leading-[88px]"
        >
          Email for <em className="font-light">teams</em> who <br className="max-sm:hidden" />
          ship with <em className="font-light">agents</em>
        </h1>

        <p className="mx-auto mt-4 max-w-[718px] text-lg leading-7 text-stone-500 sm:text-xl sm:leading-[30px]">
          Transactional, marketing &amp; automations in one platform.{" "}
          <span className="sm:block">Priced by volume, not contacts.</span>
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <ButtonLink href={href("/book-a-demo")}>Book a demo</ButtonLink>
          <ButtonLink href={href("/signup")} variant="primary">Sign up</ButtonLink>
        </div>
      </Container>

      <Container className="mt-16 sm:mt-[120px]">
        <div className="relative h-[420px] overflow-hidden sm:h-[620px]">
          <Image
            src={heroImage}
            alt=""
            priority
            fill
            sizes="(max-width: 1136px) 100vw, 1104px"
            className="object-cover object-[50%_58%] [image-rendering:pixelated]"
          />
          <div className="absolute inset-x-4 top-[120px] sm:top-[248px] sm:left-1/2 sm:w-[672px] sm:-translate-x-1/2">
            <PromptBox />
          </div>
        </div>

        <ul className="grid border-x border-b border-stone-200 bg-stone-200 max-md:gap-y-px md:grid-cols-3 md:gap-x-px">
          {AGENT_CARDS.map((card) => (
            <li key={card.title} className="flex flex-col">
              <div className="flex-1 bg-white p-6">
                <h2 className="font-mono text-base leading-6 font-medium text-stone-800">{card.title}</h2>
                <p className="mt-2 text-base leading-[22px] text-stone-500">{card.body}</p>
              </div>
              <a
                href={card.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${card.title} docs`}
                className="flex h-[41px] items-center justify-between border-t border-stone-200 bg-stone-50 px-6 font-mono text-xs leading-4 font-medium text-stone-800 uppercase transition-colors hover:bg-stone-100"
              >
                Docs
                <ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
