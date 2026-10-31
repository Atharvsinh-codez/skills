import Image from "next/image";
import { ProjectSwitcher } from "@/components/panels";
import { AppWindow, Container, Eyebrow } from "@/components/ui";
import lakeBeach from "@/public/images/lake-beach.png";

export function Projects() {
  return (
    <section aria-labelledby="projects-title" className="mt-24 sm:mt-40">
      <Container className="grid border border-stone-200 lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-16 bg-stone-50 p-6">
          <Eyebrow className="text-rose-500">Multi project support</Eyebrow>
          <div>
            <h2 id="projects-title" className="text-[32px] leading-10 tracking-[-0.02em] text-stone-800 sm:text-[40px] sm:leading-12">
              Multiple Projects, One Bill.
            </h2>
            <p className="mt-6 max-w-[503px] text-lg leading-7 text-stone-500 sm:text-xl">
              Create isolated projects for every product, client, or environment you manage with each with its own contacts, domains, and API keys.
            </p>
          </div>
        </div>
        <div className="relative h-[520px] overflow-hidden border-stone-200 max-lg:border-t lg:border-l">
          <Image src={lakeBeach} alt="" fill sizes="(max-width: 1024px) 100vw, 552px" className="object-cover" />
          <AppWindow className="absolute inset-6" bodyClassName="flex items-center justify-center bg-stone-50">
            <ProjectSwitcher />
          </AppWindow>
        </div>
      </Container>
    </section>
  );
}
