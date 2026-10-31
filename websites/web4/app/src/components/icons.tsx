import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function Chevron(props: P) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M6.5 4.5 10 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDown(props: P) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="M4.5 6.5 8 10l3.5-3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Search(props: P) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.3" />
      <path d="m10.5 10.5 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function LogoMark(props: P) {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M18.107 11.834a2.533 2.533 0 0 1 2.534 2.533 2.52 2.52 0 0 1-.876 1.913c-.323.279-.585.652-.585 1.079v2.115c0 .427.262.8.585 1.08a2.533 2.533 0 1 1-3.313-.001c.323-.28.585-.653.585-1.08V17.36c0-.427-.262-.8-.585-1.08a2.521 2.521 0 0 1-.878-1.913 2.533 2.533 0 0 1 2.533-2.533ZM5.607 7.8a2.534 2.534 0 0 1 2.534 2.533c0 .765-.34 1.45-.878 1.913-.323.28-.585.653-.585 1.08v2.447c0 .427.262.8.585 1.08.086.074.168.155.243.24.279.318.649.574 1.07.574h2.277c.422 0 .792-.256 1.07-.573a2.52 2.52 0 0 1 1.9-.86 2.533 2.533 0 0 1 0 5.066 2.521 2.521 0 0 1-1.9-.86c-.278-.317-.648-.573-1.07-.573H8.577c-.422 0-.792.256-1.07.573a2.533 2.533 0 1 1-3.556-3.587c.322-.279.584-.652.584-1.079v-2.45c0-.426-.262-.8-.585-1.079a2.52 2.52 0 0 1-.876-1.912A2.534 2.534 0 0 1 5.607 7.8Zm16.786-.366a2.533 2.533 0 0 1 2.533 2.533 2.52 2.52 0 0 1-.876 1.912c-.323.28-.585.652-.585 1.08v2.45c0 .426.262.799.585 1.078.536.464.876 1.149.876 1.913a2.534 2.534 0 0 1-5.067 0c0-.765.34-1.45.878-1.914.323-.28.585-.652.585-1.08V12.96c0-.427-.262-.8-.585-1.08a2.554 2.554 0 0 1-.243-.24c-.279-.317-.649-.574-1.07-.574h-2.275c-.422 0-.792.257-1.07.574a2.521 2.521 0 0 1-1.9.86 2.533 2.533 0 0 1 0-5.066 2.52 2.52 0 0 1 1.9.86c.278.317.648.573 1.07.573h2.274c.422 0 .792-.256 1.07-.573a2.52 2.52 0 0 1 1.9-.86ZM9.893 3a2.52 2.52 0 0 1 1.916.88c.28.324.653.587 1.08.587h2.25c.421 0 .79-.257 1.07-.573a2.521 2.521 0 0 1 1.898-.86 2.534 2.534 0 0 1 0 5.066 2.521 2.521 0 0 1-1.898-.86c-.28-.317-.649-.573-1.07-.573h-2.305c-.416 0-.782.25-1.06.559-.07.077-.145.15-.225.22-.322.279-.584.652-.584 1.078v2.85c0 .427.262.8.585 1.079a2.533 2.533 0 1 1-3.313-.001c.323-.28.585-.653.585-1.08V8.526c0-.427-.262-.8-.585-1.08a2.52 2.52 0 0 1-.878-1.913A2.533 2.533 0 0 1 9.893 3ZM2.06 12.558a1.81 1.81 0 1 1-.001 3.62 1.81 1.81 0 0 1 0-3.62Zm23.88 0a1.81 1.81 0 1 1 0 3.62 1.81 1.81 0 0 1 0-3.62Z"
      />
    </svg>
  );
}

export function XLogo(props: P) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z" />
    </svg>
  );
}

export function LinkedIn(props: P) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="3" fill="#0A66C2" />
      <path fill="#fff" d="M7.1 9.5H4.6V19h2.5V9.5ZM5.85 5.3a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9ZM19.4 13.6c0-2.6-1.4-4.3-3.7-4.3-1.3 0-2.1.7-2.5 1.3V9.5h-2.4V19h2.5v-4.9c0-1.3.5-2.3 1.7-2.3 1.2 0 1.6.9 1.6 2.3V19h2.8v-5.4Z" />
    </svg>
  );
}

export function Messenger(props: P) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" {...props}>
      <path d="M6 7.5A2.5 2.5 0 0 1 8.5 5h11A2.5 2.5 0 0 1 22 7.5V22l-3.6-2.6a2 2 0 0 0-1.17-.4H8.5A2.5 2.5 0 0 1 6 16.5v-9Z" fill="#fff" />
      <path d="M10 13.5c2.4 1.8 5.6 1.8 8 0" stroke="#306ffc" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* Small line icons used in the steps list */
export function StepIcon({ name, ...props }: P & { name: "template" | "reader" | "integrate" | "material" | "deploy" }) {
  const common = { stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      {name === "template" && (
        <>
          <path d="M3 4.5h6M6 4.5V16" {...common} />
          <path d="M10.5 9.5 16 12l-2.4 1-1 2.4-2.1-5.9Z" {...common} />
          <path d="M3 8h2.5" {...common} />
        </>
      )}
      {name === "reader" && (
        <>
          <path d="M3 6h7M13 6h4M3 10h3M9 10h8M3 14h9M15 14h2" {...common} />
          <path d="M11.5 4.5v3M7.5 8.5v3M13.5 12.5v3" {...common} />
        </>
      )}
      {name === "integrate" && (
        <>
          <rect x="3.5" y="3.5" width="13" height="13" rx="2" {...common} />
          <path d="M10 6.5v6.5M7.2 10.4 10 13.2l2.8-2.8" {...common} />
        </>
      )}
      {name === "material" && <path d="M3 6.2c0-.9.7-1.7 1.6-1.7h3.2l1.6 1.8h6c.9 0 1.6.7 1.6 1.6v6.5c0 .9-.7 1.6-1.6 1.6H4.6c-.9 0-1.6-.7-1.6-1.6V6.2Z" {...common} />}
      {name === "deploy" && (
        <>
          <path d="M8 12 6 10.2c1.6-3.9 4.6-6.4 9.5-6.7-.3 4.9-2.8 7.9-6.7 9.5L8 12Z" {...common} />
          <path d="M6.2 10.3 3.5 10l2.2-2.6h3M9.7 13.8l.3 2.7 2.6-2.2v-3M5.6 14.4l-2.1 2.1" {...common} />
        </>
      )}
    </svg>
  );
}

export function FeatureIcon({ name, ...props }: P & { name: "reader" | "cases" | "support" }) {
  const c = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" {...props}>
      {name === "reader" && (
        <>
          <rect x="7.5" y="3.5" width="13" height="21" rx="3" {...c} />
          <path d="M12 8.5c1.4 1.3 1.4 3.7 0 5M15 7c2.4 2.2 2.4 6.3 0 8.5" {...c} />
          <path d="M11.5 20.5h5" {...c} />
        </>
      )}
      {name === "cases" && (
        <>
          <rect x="3.5" y="8.5" width="21" height="15" rx="2.5" {...c} />
          <path d="M10 8.5V6a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 18 6v2.5M3.5 14.5h21" {...c} />
        </>
      )}
      {name === "support" && (
        <>
          <path d="M5 13a9 9 0 0 1 18 0" {...c} />
          <rect x="3.5" y="13" width="4.5" height="7" rx="2" {...c} />
          <rect x="20" y="13" width="4.5" height="7" rx="2" {...c} />
          <path d="M22 20c0 2.5-2.5 4-6 4h-1.5" {...c} />
        </>
      )}
    </svg>
  );
}
