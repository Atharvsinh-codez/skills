export const SITE_URL = "https://autosend.com";
export const DOCS_URL = "https://docs.autosend.com";

/** Routes that are not part of this build resolve to the live site. */
export const href = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;

export const isExternal = (url: string) => !url.startsWith(SITE_URL) && url.startsWith("http");

export const SOLUTIONS = [
  { label: "Transactional Emails", path: "/transactional-emails" },
  { label: "Marketing Emails", path: "/marketing-emails" },
  { label: "Email Automation", path: "/email-automation" },
  { label: "Deliverability", path: "/deliverability" },
  { label: "Inbound Email API", path: "/inbound" },
  { label: "Email Builder", path: "/compose" },
] as const;

const ASK_QUERY =
  "how%20is%20autosend%20better%20than%20other%20ESPs%20(like%20sendgrid%2C%20loops%2C%20resend%2C%20mailgun%2C%20postmark)%20for%20transactional%20and%20marketing%20emails%3F";

export const ASK_LINKS = {
  chatgpt: `https://chat.openai.com/?q=${ASK_QUERY}`,
  gemini: `https://www.google.com/search?q=${ASK_QUERY}`,
  claude: `https://claude.ai/new?q=${ASK_QUERY}`,
  perplexity: `https://perplexity.ai/?q=${ASK_QUERY}`,
};

type FooterLink = { label: string; url: string } | null;

export const FOOTER_COLUMNS = ["Solutions", "Docs", "Resources", "Compare", "Legal"] as const;

/** Rows are aligned across columns, so a two-line label grows its whole row. */
export const FOOTER_ROWS: FooterLink[][] = [
  [
    { label: "Transactional Emails", url: href("/transactional-emails") },
    { label: "Getting Started", url: DOCS_URL },
    { label: "FAQ", url: href("/faq") },
    { label: "SendGrid", url: href("/vs/sendgrid") },
    { label: "Fair Use", url: href("/legal/fair-use") },
  ],
  [
    { label: "Marketing Emails", url: href("/marketing-emails") },
    { label: "API Reference", url: `${DOCS_URL}/api-reference` },
    { label: "Blog", url: href("/blog") },
    { label: "Loops", url: href("/vs/loops") },
    { label: "Privacy", url: href("/legal/privacy") },
  ],
  [
    { label: "Email Automation", url: href("/email-automation") },
    { label: "Agents", url: `${DOCS_URL}/ai/introduction` },
    { label: "Glossary", url: href("/glossary") },
    { label: "Resend", url: href("/vs/resend") },
    { label: "Terms", url: href("/legal/terms") },
  ],
  [
    { label: "Agents", url: href("/agents") },
    { label: "Wiki", url: `${DOCS_URL}/wiki` },
    { label: "Be an Affiliate", url: "https://autosend.affonso.io/" },
    { label: "Postmark", url: href("/vs/postmark") },
    { label: "Sub-Processors", url: href("/legal/subprocessors") },
  ],
  [
    { label: "Deliverability", url: href("/deliverability") },
    { label: "Changelog", url: `${DOCS_URL}/changelog` },
    null,
    null,
    { label: "Data Processing Addendum", url: href("/legal/dpa") },
  ],
  [{ label: "Inbound Email API", url: href("/inbound") }, null, null, null, null],
  [{ label: "Email Builder", url: href("/compose") }, null, null, null, null],
];
