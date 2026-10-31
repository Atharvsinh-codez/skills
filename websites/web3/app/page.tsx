import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Logos } from "@/components/Logos";
import { Operations } from "@/components/Operations";
import { Infrastructure } from "@/components/Infrastructure";
import { TimeToMarket } from "@/components/TimeToMarket";
import { Testimonials } from "@/components/Testimonials";
import { Cta } from "@/components/Cta";
import { Footer } from "@/components/Footer";
import { Spacer } from "@/components/Spacer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="frame">
        <Hero />
        <Logos />
        <Spacer />
        <Operations />
        <Spacer />
        <Infrastructure />
        <Spacer />
        <TimeToMarket />
        <Testimonials />
        <Spacer />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
