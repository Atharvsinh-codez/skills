import { Icon } from '@/components/Icon';
import { Thread } from '@/components/Thread';
import { threadCopy, windowNav, windowThreads } from '@/lib/content';

/**
 * The app window shown inside the hero sky. The reference has a raster
 * screenshot here; this is a real DOM rebuild of it, treated as *media*: the
 * whole thing is hidden from assistive technology and a text equivalent sits
 * beside it, so screen readers get the meaning without the interface noise.
 *
 * All internal sizing is `em` against a container-query font size, so the
 * window scales like an image would instead of reflowing.
 */
export function ProductWindow() {
  return (
    <div className="win" aria-hidden="true">
      <div className="win__bar">
        <span className="win__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="win__title">
          <Icon name="search" className="ico ico--12" />
          Ask assistant
        </span>
        <span className="win__tools">
          <Icon name="sliders" className="ico ico--12" />
          <Icon name="plus" className="ico ico--12" />
        </span>
      </div>

      <div className="win__body">
        <aside className="win__side">
          <ul className="win__nav">
            {windowNav.map((item, i) => (
              <li key={item.label} className={i === 0 ? 'is-on' : undefined}>
                <Icon name={item.icon} className="ico ico--14" />
                {item.label}
              </li>
            ))}
          </ul>

          <p className="win__side-h">Recent</p>
          <ul className="win__threads">
            {windowThreads.map((label, i) => (
              <li key={label} className={i === 0 ? 'is-on' : undefined}>
                {label}
              </li>
            ))}
          </ul>
        </aside>

        <div className="win__main">
          <div className="win__scroll">
            <Thread variant="compact" />
          </div>

          <div className="composer">
            <span className="composer__ph">{threadCopy.placeholder}</span>
            <span className="composer__send">
              <Icon name="arrow-up" className="ico ico--14" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
