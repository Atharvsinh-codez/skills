import { LogoMark } from "./icons";

const product = [
  { label: "Sign up", href: "#signup" },
  { label: "Login", href: "#login" },
  { label: "Pricing", href: "#pricing" },
  { label: "API docs", href: "#api" },
  { label: "Changelog", href: "#changelog" },
];

const company = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <LogoMark className="footer__logo" />
          <p>
            Terms is a minimal document signing tool. Contracts are markdown you write and edit in the browser;
            counterparties open a secure link, highlight text to comment inline, and sign with a typed e-signature.
            When the last signer signs, the document locks and a certificate of completion records the audit trail.
          </p>
        </div>
        <nav className="footer__col" aria-label="Product">
          <p className="footer__heading">Product</p>
          <ul>
            {product.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <nav className="footer__col" aria-label="Company">
          <p className="footer__heading">Company</p>
          <ul>
            {company.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
