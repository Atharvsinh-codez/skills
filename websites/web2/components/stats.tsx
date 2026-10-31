import { LogoCarousel } from "@/components/logo-carousel";
import { Container } from "@/components/ui";

const STATS = [
  { value: "5,125,980", label: "Emails sent in past 7 days" },
  { value: "98.51%", label: "Deliverability rate" },
  { value: "1.87s", label: "Average time to inbox" },
  { value: "1.46%", label: "Average bounce rate" },
];

export function Stats() {
  return (
    <section aria-label="AutoSend by the numbers" className="mt-24 sm:mt-40">
      <Container className="border border-stone-200">
        <dl className="grid grid-cols-2 gap-px bg-stone-200 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse bg-stone-50 px-6 py-6 text-center">
              <dt className="mt-2 text-sm leading-5 text-stone-500">{s.label}</dt>
              <dd className="font-data text-2xl leading-8 text-stone-800 tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>
        <p className="border-t border-stone-200 bg-white p-6 text-center font-mono text-sm leading-5 font-medium text-stone-800 uppercase">
          Emails sent by big and small companies alike!
        </p>
        <LogoCarousel />
      </Container>
    </section>
  );
}
