import { Icon } from '@/components/Icon';
import { answerSources, earlierExchanges, threadCopy as t } from '@/lib/content';

type ThreadProps = {
  /**
   * `compact` runs inside the hero product window, where every size is in `em`
   * and scales with the window's container-query font size. `panel` is the
   * larger standalone copy beside the use-case list.
   */
  variant: 'compact' | 'panel';
};

/**
 * The demo exchange. One component, two sizes — the geometry is identical and
 * only the inherited font size differs, so the two never drift apart.
 */
export function Thread({ variant }: ThreadProps) {
  const showSourceList = variant === 'panel';

  return (
    <div className={variant === 'compact' ? 'thread thread--mini' : 'thread'}>
      {/* Inside the window an earlier exchange sits above, partly cropped by
          the scroll mask, so the pane reads as a chat scrolled to the latest
          message rather than a half-empty box. */}
      {variant === 'compact'
        ? earlierExchanges.map((exchange) => (
            <div className="thread__turn" key={exchange.question}>
              <article className="msg">
                <span className="msg__av msg__av--you">
                  <Icon name="user" className="ico ico--14" />
                </span>
                <div className="msg__b">
                  <p className="msg__who">You</p>
                  <p className="msg__t">{exchange.question}</p>
                </div>
              </article>
              <article className="msg">
                <span className="msg__av msg__av--ai">
                  <Icon name="cloud" className="ico ico--14" />
                </span>
                <div className="msg__b">
                  <p className="msg__who">Assistant</p>
                  <p className="msg__t">{exchange.answer}</p>
                </div>
              </article>
            </div>
          ))
        : null}

      <article className="msg">
        <span className="msg__av msg__av--you">
          <Icon name="user" className="ico ico--14" />
        </span>
        <div className="msg__b">
          <p className="msg__who">You</p>
          <p className="msg__t">{t.question}</p>
        </div>
      </article>

      <article className="msg">
        <span className="msg__av msg__av--ai">
          <Icon name="cloud" className="ico ico--14" />
        </span>
        <div className="msg__b">
          <p className="msg__who">
            Assistant <span className="msg__meta">{t.worked}</span>
          </p>

          <p className="msg__t">
            {t.conflict.lead} <b>{t.conflict.handbook}</b>
            {t.conflict.middle} <b>{t.conflict.msa}</b>
            {t.conflict.tail}
          </p>

          {showSourceList ? (
            <ul className="srcs">
              {answerSources.map((source) => (
                <li key={source.title}>
                  <Icon name={source.glyph} className="ico ico--14" />
                  {source.title} <span>{source.tool}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="chip">
              {answerSources.length} sources used
              <Icon name="chevron" className="ico ico--12" />
            </p>
          )}

          <p className="msg__t">{t.ask}</p>

          <div className="act">
            <span className="act__label">
              <Icon name="mark-5" className="ico ico--14" />
              {t.action}
            </span>
            <span className="act__side">
              <span className="act__ghost">See message</span>
              <span className="act__ghost">Reject</span>
              <span className="act__solid">Confirm</span>
            </span>
          </div>

          <blockquote className="quote">
            <p className="quote__who">{t.reply.who}</p>
            <p>{t.reply.body}</p>
          </blockquote>

          <p className="msg__t">{t.resolution}</p>
        </div>
      </article>
    </div>
  );
}
