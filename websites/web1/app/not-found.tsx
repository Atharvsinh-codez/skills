import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="sec notfound">
      <div className="shell">
        <p className="notfound__code">404</p>
        <h1 className="h2">This page isn’t here.</h1>
        <p className="notfound__p">
          The link may be out of date, or the page may have moved. Everything on the site is reachable
          from the home page.
        </p>
        <Link className="btn btn--dark" href="/">
          Back to home
        </Link>
      </div>
    </section>
  );
}
