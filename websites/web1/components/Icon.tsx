/**
 * Every icon on this site is SVG from a single inline sprite — no icon fonts,
 * no raster icons, no emoji. `Sprite` is rendered once in the root layout and
 * `Icon` references its symbols by id.
 */
export type IconName =
  | 'cloud'
  | 'chevron'
  | 'plus'
  | 'tiny-plus'
  | 'arrow-ne'
  | 'arrow-up'
  | 'check-circle'
  | 'shield'
  | 'lock'
  | 'seal'
  | 'menu'
  | 'close'
  | 'search'
  | 'home'
  | 'flow'
  | 'sliders'
  | 'doc'
  | 'calendar'
  | 'sync'
  | 'user'
  | 'link';

/**
 * Neutral geometric placeholder marks. Third-party logos are protected marks,
 * so integration and agent rows pair an accurate product *name* with one of
 * these instead of a reproduction. See DESIGN-NOTES.md.
 */
export type MarkName =
  | 'mark-1'
  | 'mark-2'
  | 'mark-3'
  | 'mark-4'
  | 'mark-5'
  | 'mark-6'
  | 'mark-7'
  | 'mark-8'
  | 'mark-9';

export type GlyphName = IconName | MarkName;

type IconProps = {
  name: GlyphName;
  /** Sizing/colour comes from the caller's class, e.g. `ico ico--16`. */
  className?: string;
};

export function Icon({ name, className = 'ico' }: IconProps) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href={`#icon-${name}`} />
    </svg>
  );
}
