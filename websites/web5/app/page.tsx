import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { DraftDemo } from "@/components/DraftDemo";
import { AskDemo } from "@/components/AskDemo";
import { CommentDemo } from "@/components/CommentDemo";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <main id="product" className="features">
        <FeatureCard
          title="Draft with AI"
          description="Describe what you need. Turn a few details into a draft you can refine."
        >
          <DraftDemo />
        </FeatureCard>
        <FeatureCard
          title="Ask your contracts"
          description="Find dates, details, and answers in your agreements, with the source at hand."
        >
          <AskDemo />
        </FeatureCard>
        <FeatureCard
          title="Comment on contracts"
          description="Discuss a clause, agree on a change, and resolve it right in the contract."
          flush
        >
          <CommentDemo />
        </FeatureCard>
      </main>
      <Footer />
    </>
  );
}
