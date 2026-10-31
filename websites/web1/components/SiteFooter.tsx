import { Icon } from '@/components/Icon';
import { footerColumns, site } from '@/lib/content';

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="shell foot__in">
        <div className="foot__brand">
          <span className="tile tile--accent" aria-hidden="true">
            <Icon name="cloud" className="ico ico--20" />
          </span>
          <p className="foot__org">{site.legalEntity}</p>
          <p className="foot__meta">{site.location}</p>
          <p className="foot__meta">{site.copyright}</p>
        </div>

        <nav className="foot__cols" aria-label="Footer">
          {footerColumns.map((column) => (
            <div className="foot__col" key={column.heading}>
              <h2 className="foot__h">{column.heading}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>
                      {link.icon ? <Icon name={link.icon} className="ico ico--16" /> : null}
                      {link.label}
                      {link.dim ? <span className="foot__dim">{link.dim}</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <p className="foot__word" aria-hidden="true">
        {site.wordmark}
      </p>
    </footer>
  );
}
