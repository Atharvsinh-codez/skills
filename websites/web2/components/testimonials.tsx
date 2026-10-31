import Image, { type StaticImageData } from "next/image";
import { Container } from "@/components/ui";
import arun from "@/public/images/people/arun.webp";
import ccfan from "@/public/images/people/ccfan.webp";
import pratyush from "@/public/images/people/pratyush.webp";
import firstdollar from "@/public/logos/firstdollar.webp";
import gistr from "@/public/logos/gistr.webp";
import vivgrid from "@/public/logos/vivgrid.webp";

type Testimonial = {
  quote: string[];
  name: string;
  role: string;
  avatar: StaticImageData;
  logo: { src: StaticImageData; alt: string; w: number };
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: ["AutoSend has transformed First Dollar. Their team is responsive and adding 190k users on our $50 plan was huge saving."],
    name: "Pratyush Rungta",
    role: "First Dollar",
    avatar: pratyush,
    logo: { src: firstdollar, alt: "First Dollar", w: 96 },
  },
  {
    quote: [
      "Switching to AutoSend was smooth. The migration was quick, the team responsive, and the product matches big players in features.",
      "I'd recommend AutoSend to any startup.",
    ],
    name: "Arun Anthony",
    role: "Gistr",
    avatar: arun,
    logo: { src: gistr, alt: "Gistr", w: 67 },
  },
  {
    quote: ["We chose AutoSend for its first-class email handling for LLMs and AI agents, unlike generic tools. It fits how agents think and allows LLMs to send transactional emails easily."],
    name: "C.C. Fan",
    role: "CEO Vivgrid",
    avatar: ccfan,
    logo: { src: vivgrid, alt: "Vivgrid", w: 102 },
  },
];

export function Testimonials() {
  return (
    <section aria-label="What customers say" className="mt-24 sm:mt-40">
      <Container className="border border-stone-200">
        <ul className="grid gap-px bg-stone-200 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.name} className="flex flex-col">
              <figure className="flex flex-1 flex-col">
                <blockquote className="font-display flex-1 space-y-4 bg-white p-6 text-[17px] leading-6 tracking-[-0.025em] text-stone-800 italic [font-variation-settings:'SOFT'_100,'opsz'_144]">
                  {t.quote.map((q) => <p key={q}>{q}</p>)}
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-stone-200 bg-stone-50 p-6">
                  <Image src={t.avatar} alt="" width={40} height={40} className="size-10 shrink-0 object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-base leading-6 font-medium text-stone-800 uppercase">{t.name}</span>
                    <span className="block text-xs leading-4 text-stone-500">{t.role}</span>
                  </span>
                  <span className="relative block shrink-0" style={{ width: t.logo.w, aspectRatio: `${t.logo.src.width} / ${t.logo.src.height}` }}>
                    <Image src={t.logo.src} alt={t.logo.alt} fill sizes={`${t.logo.w}px`} className="object-contain" />
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
