import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 20 26" fill="none" aria-hidden="true" {...props}>
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="butt">
        <path d="M10 0v26" />
        <path d="M2.2 4.7 17.8 13.7" />
        <path d="M17.8 4.7 2.2 13.7" />
      </g>
    </svg>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" {...props}>
      <rect x="2" y="1.5" width="3" height="9" rx="0.6" />
      <rect x="7" y="1.5" width="3" height="9" rx="0.6" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3 1.6v8.8a.5.5 0 0 0 .76.43l7.04-4.4a.5.5 0 0 0 0-.86L3.76 1.17A.5.5 0 0 0 3 1.6Z" />
    </svg>
  );
}

export function CaretRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 8 8" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M2.5 1.2v5.6L6.3 4 2.5 1.2Z" />
    </svg>
  );
}

export function PaperclipIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M10.6 5.2 6.1 9.7a1.3 1.3 0 0 0 1.84 1.84l4.6-4.6a2.7 2.7 0 0 0-3.82-3.82l-4.6 4.6a4.1 4.1 0 0 0 5.8 5.8l3.9-3.9" />
    </svg>
  );
}

export function ChatBubbleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M10 1.5c4.7 0 8.5 3.2 8.5 7.4 0 4.1-3.8 7.4-8.5 7.4-.9 0-1.7-.1-2.5-.3L3.6 18c-.4.2-.9-.2-.7-.6l.9-3C2.4 13 1.5 11 1.5 8.9c0-4.2 3.8-7.4 8.5-7.4Z" />
      <circle cx="6.4" cy="8.9" r="1.1" fill="#fff" />
      <circle cx="10" cy="8.9" r="1.1" fill="#fff" />
      <circle cx="13.6" cy="8.9" r="1.1" fill="#fff" />
    </svg>
  );
}

export function CursorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 20" aria-hidden="true" {...props}>
      <path
        d="M1 1v15.2l3.7-3.5 2.6 6 2.4-1-2.6-5.9h5.1L1 1Z"
        fill="#111"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
