const brands: { name: string; style?: React.CSSProperties; mark?: "dot" | "tri" | "m" | "nio" }[] = [
  { name: "KIND BEAR", style: { fontSize: 11, lineHeight: 1, letterSpacing: "0.08em", width: 54, textAlign: "center" } },
  { name: "HEINEKEN", style: { fontSize: 13, letterSpacing: "0.04em" } },
  { name: "ipn", style: { fontSize: 22, fontWeight: 300 } },
  { name: "Bellingham", mark: "dot", style: { fontSize: 12, fontWeight: 500 } },
  { name: "MITSUBISHI ELECTRIC", mark: "tri", style: { fontSize: 9, lineHeight: 1.1, width: 120 } },
  { name: "Mondial", style: { fontSize: 14, fontWeight: 600, fontFamily: "Georgia, serif" } },
  { name: "SCHUBERTH", style: { fontSize: 12, fontWeight: 900, letterSpacing: "0.1em", background: "#3f3f46", color: "#fff", padding: "2px 8px" } },
  { name: "Material Bank", mark: "m", style: { fontSize: 12, lineHeight: 1, width: 110 } },
  { name: "makro", style: { fontSize: 24, fontWeight: 800, letterSpacing: "-0.04em" } },
  { name: "NIO", mark: "nio", style: { fontSize: 18, fontWeight: 600 } },
];

function Mark({ type }: { type?: string }) {
  if (type === "dot") return <svg width="10" height="14" viewBox="0 0 10 14" aria-hidden="true"><path fill="currentColor" d="M5 0a5 5 0 015 5c0 4-5 9-5 9S0 9 0 5a5 5 0 015-5z" /></svg>;
  if (type === "tri") return <svg width="20" height="18" viewBox="0 0 20 18" aria-hidden="true"><path fill="currentColor" d="M10 0l3 5.2-3 5.2-3-5.2zM3 12.4l6-.0-3 5.2H0zM17 12.4h-6l3 5.2h6z" /></svg>;
  if (type === "m") return <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path fill="currentColor" d="M0 18V0l9 9 9-9v18h-5V9l-4 4-4-4v9z" /></svg>;
  if (type === "nio") return <svg width="20" height="18" viewBox="0 0 20 18" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="3" d="M2 12a8 8 0 0116 0M6 17v-5h8v5" /></svg>;
  return null;
}

export function Logos() {
  return (
    <section aria-label="Trusted by" className="logos">
      {brands.map((b) => (
        <div className="logo-cell" key={b.name}>
          <span className="wordmark" style={b.style}>
            <Mark type={b.mark} />
            {b.name}
          </span>
        </div>
      ))}
    </section>
  );
}
