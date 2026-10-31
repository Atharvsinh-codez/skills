import { Hero } from '@/components/sections/Hero';
import { Steps } from '@/components/sections/Steps';
import { Results } from '@/components/sections/Results';
import { Bento } from '@/components/sections/Bento';
import { SharedKnowledge } from '@/components/sections/SharedKnowledge';
import { Agents } from '@/components/sections/Agents';
import { Trust } from '@/components/sections/Trust';
import { Faq } from '@/components/sections/Faq';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { faqs, site } from '@/lib/content';

/** Mirrors the visible FAQ so the two can never disagree. */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      legalName: site.legalEntity,
      address: { '@type': 'PostalAddress', addressLocality: 'Copenhagen', addressCountry: 'DK' },
    },
    {
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
      description: site.description,
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Steps />
      <Results />
      <Bento />
      <SharedKnowledge />
      <Agents />
      <Trust />
      <Faq />
      <ClosingCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
