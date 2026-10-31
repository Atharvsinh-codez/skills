import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LogoBand from "@/components/LogoBand";
import HardWork from "@/components/HardWork";
import DarkSection from "@/components/DarkSection";
import CaseStudies from "@/components/CaseStudies";
import Steps from "@/components/Steps";
import Protocols from "@/components/Protocols";
import Connect from "@/components/Connect";
import Reliability from "@/components/Reliability";
import Changelog from "@/components/Changelog";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <LogoBand />
        <HardWork />
        <DarkSection />
        <CaseStudies />
        <Steps />
        <Protocols />
        <Connect />
        <Reliability />
        <Changelog />
        <Cta />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
