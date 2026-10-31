import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Stats } from "@/components/stats";
import { FeatureSections } from "@/components/feature-sections";
import { Projects } from "@/components/projects";
import { Agents } from "@/components/agents";
import { Testimonials } from "@/components/testimonials";
import { StillWondering } from "@/components/still-wondering";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <FeatureSections />
        <Projects />
        <Agents />
        <Testimonials />
        <StillWondering />
      </main>
      <Footer />
    </>
  );
}
