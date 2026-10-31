import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 16): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
});

export const ChevronRight = ({ size = 12, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M6 4l4 4-4 4" /></svg>
);
export const ChevronLeft = ({ size = 12, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M10 4L6 8l4 4" /></svg>
);
export const ChevronDown = ({ size = 10, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M4 6l4 4 4-4" /></svg>
);
export const Menu = ({ size = 20, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M2.5 5h11M2.5 11h11" /></svg>
);
export const Close = ({ size = 20, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M4 4l8 8M12 4l-8 8" /></svg>
);
export const ArrowUp = ({ size = 10, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M8 13V3M4 7l4-4 4 4" /></svg>
);
export const Search = ({ size = 8, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
);
export const Quote = ({ size = 18, ...p }: P) => (
  <svg {...base(size)} strokeWidth={1.3} {...p}><path d="M5 5L3 11M10 5l-2 6M7 5l-2 6M12 5l-2 6" /></svg>
);
export const Sparkle = ({ size = 12, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M8 2v3M8 11v3M2 8h3M11 8h3M4 4l1.5 1.5M10.5 10.5L12 12M12 4l-1.5 1.5M5.5 10.5L4 12" /></svg>
);
export const Code = ({ size = 12, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M5.5 4.5L2 8l3.5 3.5M10.5 4.5L14 8l-3.5 3.5" /></svg>
);
export const Plug = ({ size = 12, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M6 2v3M10 2v3M4 5h8v3a4 4 0 01-8 0V5zM8 12v2" /></svg>
);
export const Nodes = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="8" cy="4" r="1.6" /><circle cx="3.5" cy="12" r="1.6" /><circle cx="12.5" cy="12" r="1.6" /><path d="M8 5.6v2.4M8 8l-3.6 2.6M8 8l3.6 2.6" /></svg>
);
export const Steps = ({ size = 16, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M3 3h4v4M7 7h3v3M10 10h3v3M3 7v6h6" /></svg>
);

export const MedusaMark = ({ size = 18, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M16.24 3.6L12.6 1.5a5.2 5.2 0 00-5.2 0L3.76 3.6A5.2 5.2 0 001.16 8.1v4.2a5.2 5.2 0 002.6 4.5l3.64 2.1a5.2 5.2 0 005.2 0l3.64-2.1a5.2 5.2 0 002.6-4.5V8.1a5.2 5.2 0 00-2.6-4.5zM10 14.3a4.1 4.1 0 110-8.2 4.1 4.1 0 010 8.2z"
    />
  </svg>
);

const s = (size: number): SVGProps<SVGSVGElement> => ({ width: size, height: size, viewBox: "0 0 16 16", fill: "currentColor", "aria-hidden": true });
export const Discord = ({ size = 13, ...p }: P) => (
  <svg {...s(size)} {...p}><path d="M13.3 3.4A12 12 0 0010.4 2.5l-.4.8a11 11 0 00-4 0l-.4-.8a12 12 0 00-2.9.9C.9 6.2.4 8.9.6 11.6a12 12 0 003.6 1.8l.8-1.2a7.6 7.6 0 01-1.2-.6l.3-.2a8.5 8.5 0 007.8 0l.3.2-1.2.6.8 1.2a12 12 0 003.6-1.8c.3-3.1-.5-5.8-2.1-8.2zM5.6 10c-.7 0-1.3-.7-1.3-1.5S4.9 7 5.6 7s1.3.7 1.3 1.5S6.3 10 5.6 10zm4.8 0c-.7 0-1.3-.7-1.3-1.5S9.7 7 10.4 7s1.3.7 1.3 1.5-.6 1.5-1.3 1.5z" /></svg>
);
export const XLogo = ({ size = 12, ...p }: P) => (
  <svg {...s(size)} {...p}><path d="M12.2 1.5h2.2L9.6 7l5.6 7.5h-4.4L7.4 9.9l-3.9 4.6H1.3l5.1-5.9L1 1.5h4.5l3.1 4.1 3.6-4.1zm-.8 11.7h1.2L4.7 2.7H3.4l8 10.5z" /></svg>
);
export const LinkedIn = ({ size = 12, ...p }: P) => (
  <svg {...s(size)} {...p}><path d="M13.6 1H2.4C1.6 1 1 1.6 1 2.4v11.2c0 .8.6 1.4 1.4 1.4h11.2c.8 0 1.4-.6 1.4-1.4V2.4c0-.8-.6-1.4-1.4-1.4zM5.2 13H3.1V6.2h2.1V13zM4.1 5.3a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4zM13 13h-2.1V9.7c0-.8 0-1.8-1.1-1.8s-1.3.9-1.3 1.8V13H6.4V6.2h2v.9a2.2 2.2 0 012-1.1c2.1 0 2.5 1.4 2.5 3.2V13z" /></svg>
);
export const GitHub = ({ size = 13, ...p }: P) => (
  <svg {...s(size)} {...p}><path d="M8 .7a7.3 7.3 0 00-2.3 14.2c.4.1.5-.2.5-.4v-1.3c-2 .4-2.5-.9-2.5-.9-.3-.8-.8-1.1-.8-1.1-.7-.5 0-.5 0-.5.7.1 1.1.8 1.1.8.7 1.1 1.7.8 2.1.6.1-.5.3-.8.5-1-1.6-.2-3.3-.8-3.3-3.6 0-.8.3-1.5.8-2-.1-.2-.3-.9.1-2 0 0 .6-.2 2 .8a7 7 0 013.7 0c1.4-1 2-.8 2-.8.4 1.1.1 1.8.1 2 .5.5.8 1.2.8 2 0 2.8-1.7 3.4-3.3 3.6.3.2.5.7.5 1.4v2c0 .2.1.5.5.4A7.3 7.3 0 008 .7z" /></svg>
);
