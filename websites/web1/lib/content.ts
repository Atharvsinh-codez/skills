import type { GlyphName, IconName, MarkName } from '@/components/Icon';

export const site = {
  name: 'Agentwork',
  wordmark: 'agentwork',
  tagline: 'One place to ask, across every tool',
  description:
    "Agentwork connects to the tools your team already uses and answers questions across all of " +
    "them in plain language, with sources you can check. When the answer isn't written down, it " +
    'asks the person who knows.',
  url: 'https://agentwork.example',
  legalEntity: 'Fenrell ApS',
  location: 'Copenhagen, Denmark',
  copyright: '© 2026 Agentwork. All rights reserved.',
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: readonly NavLink[] = [
  { label: 'Pricing', href: '#faq' },
  { label: 'Blog', href: '#faq' },
  { label: 'Trust', href: '#trust' },
  { label: 'Log in', href: '#cta' },
];

/* ── 2. How it works ────────────────────────────────────────────────────── */

export type StepHeading = { line: string; marker: string };

export const stepHeadings: readonly StepHeading[] = [
  { line: 'Connect your tools', marker: '01' },
  { line: 'Ask questions in plain language', marker: '02' },
  { line: 'Let Agentwork fill in the gaps', marker: '03' },
];

export type Step = { number: string; title: string; body: string };

export const steps: readonly Step[] = [
  {
    number: '01',
    title: 'Integrate',
    body:
      'Plug Agentwork into the systems where your work already lives. It connects every tool and ' +
      'pulls scattered information into one place your company can draw from.',
  },
  {
    number: '02',
    title: 'Ask',
    body:
      'Anyone can ask a question the way they’d ask a coworker and get a clear answer in seconds. ' +
      'No digging through channels, no waiting on the one person who knows.',
  },
  {
    number: '03',
    title: 'Improve',
    body:
      'When nothing is written down, Agentwork asks whoever does know, then keeps the confirmed ' +
      'answer. Your company’s knowledge gets sharper every time somebody asks.',
  },
];

/* ── 3. Reliable results ────────────────────────────────────────────────── */

export const useCases: readonly string[] = [
  'Review conversations',
  'Understand company policies',
  'Find the owner',
  'Catch up on decisions',
  'Search by meaning',
  'Onboard faster',
  'Reconcile definitions',
  'Surface tribal knowledge',
  'Track work across tools',
  'Prep for a customer call',
  'Find the latest version',
];

/** The demo exchange, shared by the hero window and the results panel. */
export type Source = { glyph: GlyphName; title: string; tool: string };

export const answerSources: readonly Source[] = [
  { glyph: 'mark-1', title: 'Support Handbook', tool: 'Notion' },
  { glyph: 'doc', title: 'MSA template v4', tool: 'Drive' },
  { glyph: 'mark-3', title: 'Trigger: first reply', tool: 'Zendesk' },
  { glyph: 'mark-5', title: '#support-leads', tool: 'Slack' },
];

/** Earlier turns, shown above the main exchange inside the product window. */
export type Exchange = { question: string; answer: string };

export const earlierExchanges: readonly Exchange[] = [
  {
    question: 'Where did we land on the Q4 pricing tiers?',
    answer:
      'Three tiers, and Enterprise moves to annual billing. Decided in the 12 June pricing review.',
  },
  {
    question: 'What is the deploy freeze window in December?',
    answer:
      '18 December to 2 January, per the release policy in Confluence. Hotfixes still go through ' +
      'on-call approval.',
  },
  {
    question: 'Who owns the Q3 revenue forecast?',
    answer:
      'Priya Raman owns it — she took over from Dan in April. The current model lives in Drive and ' +
      'was last updated on 14 July.',
  },
];

export const threadCopy = {
  question: 'What is our current SLA response time for Enterprise customers?',
  worked: 'Worked for 12s',
  conflict: {
    lead: 'I found conflicting information across your systems. The Support Handbook in Notion states',
    handbook: '4 hours',
    middle: ', but the recently updated MSA template in Google Drive says',
    msa: '2 hours',
    tail: '. Zendesk triggers are still configured for 4 hours.',
  },
  ask:
    'I’ll reach out to Martin Chen (Head of Support) to clarify which is correct. Should I send him ' +
    'a quick ping?',
  action: 'Ping Martin Chen via Slack',
  reply: { who: 'Martin Chen · Slack', body: 'Two hours is correct — it changed with the new MSA in March.' },
  resolution:
    'Done. I’ve updated the Support Handbook in Notion, flagged the Zendesk trigger for the ops ' +
    'team, and saved the answer for next time.',
  placeholder: 'Ask anything about your company…',
  altText:
    'A product screenshot: the Agentwork assistant answers a question about Enterprise SLA response ' +
    'times, finds that Notion, Google Drive and Zendesk disagree, and offers to ask the Head of ' +
    'Support to confirm which figure is correct.',
} as const;

export const windowNav: readonly { label: string; icon: IconName }[] = [
  { label: 'Home', icon: 'home' },
  { label: 'Workflows', icon: 'flow' },
  { label: 'Settings', icon: 'sliders' },
];

export const windowThreads: readonly string[] = [
  'SLA response time',
  'Q3 forecast owner',
  'Vendor contract terms',
  'Onboarding checklist',
  'Billing escalations',
  'Data retention policy',
  'Release naming',
];

/* ── 4. Security bento ──────────────────────────────────────────────────── */

export const verifiedFiles: readonly { glyph: GlyphName; label: string }[] = [
  { glyph: 'mark-2', label: 'Brand guidelines v4' },
  { glyph: 'doc', label: 'Q3 board deck' },
];

export const connectors: readonly { mark: MarkName; name: string; synced: string; learned: string }[] = [
  { mark: 'mark-5', name: 'Slack', synced: 'Synced 1 min ago', learned: '12 new answers' },
  { mark: 'mark-8', name: 'GitHub', synced: 'Synced 6 min ago', learned: '4 new answers' },
  { mark: 'mark-1', name: 'Notion', synced: 'Synced 1 hour ago', learned: '8 new answers' },
];

export const workflowCard = {
  title: 'Daily Overview',
  description:
    'This workflow generates a daily overview of everything that happened relevant to my role ' +
    'across the business.',
  trigger: 'Schedule',
  repeats: 'Daily',
  time: '08:00',
  instructions:
    'Summarise key updates, decisions and blockers from the last 24 hours across every connected ' +
    'tool. Prioritise anything that needs my attention, one bullet each.',
} as const;

export type BentoCard = { key: 'a' | 'b' | 'c' | 'd'; title: string; body: string };

export const bentoCards: readonly BentoCard[] = [
  {
    key: 'a',
    title: 'Sources you can verify',
    body: 'Every response links back to the exact source, so you can check it yourself.',
  },
  {
    key: 'b',
    title: 'Multifactor authentication',
    body: 'MFA and permission-aware access so answers stay with the right people.',
  },
  {
    key: 'c',
    title: 'Repeatable workflows',
    body: 'Schedule recurring briefings and tasks, like a daily brief built for your role.',
  },
  {
    key: 'd',
    title: 'Smarter every day',
    body: 'It keeps learning from your connected tools and from every question your team asks.',
  },
];

/* ── 5 & 6. Integrations and agents ─────────────────────────────────────── */

export type Product = { name: string; mark: MarkName };

export const integrations: readonly Product[] = [
  { name: 'Linear', mark: 'mark-2' },
  { name: 'HubSpot', mark: 'mark-6' },
  { name: 'Jira', mark: 'mark-3' },
  { name: 'Figma', mark: 'mark-4' },
  { name: 'Granola', mark: 'mark-9' },
  { name: 'GitLab', mark: 'mark-7' },
  { name: 'Intercom', mark: 'mark-1' },
  { name: 'Slack', mark: 'mark-5' },
  { name: 'MS Teams', mark: 'mark-8' },
];

export const agentTargets: readonly Product[] = [
  { name: 'OpenAI', mark: 'mark-4' },
  { name: 'Anthropic', mark: 'mark-6' },
  { name: 'Copilot', mark: 'mark-9' },
  { name: 'Cursor', mark: 'mark-3' },
  { name: 'Claude', mark: 'mark-2' },
  { name: 'Gemini', mark: 'mark-7' },
];

/* ── 7. Trust ───────────────────────────────────────────────────────────── */

export type TrustItem = { icon: IconName; title: string; badge?: string; body: string };

export const trustItems: readonly TrustItem[] = [
  {
    icon: 'shield',
    title: 'GDPR compliant',
    body:
      'We are GDPR compliant, with strict access controls on every piece of data synced from your ' +
      'connected tools.',
  },
  {
    icon: 'lock',
    title: 'End-to-end encryption',
    badge: 'in progress',
    body:
      'We’re working toward end-to-end encryption. Data is encrypted in transit and at rest today, ' +
      'and connection credentials are never stored in plaintext.',
  },
  {
    icon: 'seal',
    title: 'SOC 2 & ISO 27001',
    badge: 'in progress',
    body:
      'We’re working toward SOC 2 and ISO 27001 certification, with estimated completion in ' +
      'September 2026.',
  },
];

/* ── 8. FAQ ─────────────────────────────────────────────────────────────── */

export type FaqItem = { question: string; answer: string };

export const faqs: readonly FaqItem[] = [
  {
    question: 'Which tools does Agentwork connect to?',
    answer:
      'Chat, docs, tickets, code and CRM: Slack, Microsoft Teams, Notion, Confluence, Google Drive, ' +
      'Jira, Linear, GitHub, GitLab, Zendesk, Intercom and HubSpot, among others. If something you ' +
      'rely on is missing, tell us and it usually takes a couple of weeks.',
  },
  {
    question: 'What happens when the answer isn’t written down anywhere?',
    answer:
      'Agentwork says so instead of guessing. It works out who is most likely to know, asks them in ' +
      'the tool they already use, and keeps the confirmed answer so nobody has to ask a second time.',
  },
  {
    question: 'How do I know an answer is correct?',
    answer:
      'Every claim carries its sources, so you can open the original document, message or ticket in ' +
      'one click. When sources disagree, Agentwork shows you the conflict rather than quietly ' +
      'picking a winner.',
  },
  {
    question: 'Will people see answers they’re not supposed to?',
    answer:
      'No. Agentwork mirrors the permissions of every connected tool at query time, and private ' +
      'connections are scoped to the person who made them. That boundary is enforced in code, not ' +
      'left to the model’s judgment.',
  },
  {
    question: 'Does our company’s data live on your servers?',
    answer:
      'We store the minimum needed to answer: an index of the content you connect, plus the answers ' +
      'your team confirms. Source documents stay in their original systems, and you can delete an ' +
      'index whenever you want.',
  },
  {
    question: 'Who are your sub processors?',
    answer:
      'The current list of sub processors, together with our data-processing terms, is published in ' +
      'the trust center and updated whenever it changes.',
  },
];

/* ── Footer ─────────────────────────────────────────────────────────────── */

export type FooterLink = { label: string; href: string; icon?: IconName; dim?: string };
export type FooterColumn = { heading: string; links: readonly FooterLink[] };

export const footerColumns: readonly FooterColumn[] = [
  {
    heading: 'Legal',
    links: [
      { label: 'Trust Center', href: '#trust' },
      { label: 'Terms & conditions', href: '#faq' },
      { label: 'Privacy policy', href: '#faq' },
    ],
  },
  {
    heading: 'Product',
    links: [
      { label: 'Log in', href: '#cta' },
      { label: 'Sign up', href: '#cta' },
      { label: 'Pricing', href: '#faq' },
      { label: 'Blog', href: '#faq' },
    ],
  },
  {
    heading: 'Social',
    links: [
      { label: 'LinkedIn', href: '#top' },
      { label: 'X', href: '#top', dim: '(formerly Twitter)' },
    ],
  },
];
