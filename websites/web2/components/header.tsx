"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight12, ChevronDown, Logo } from "@/components/icons";
import { ButtonLink, Container, cx } from "@/components/ui";
import { DOCS_URL, SOLUTIONS, href } from "@/lib/site";

const navLink =
  "inline-flex h-7 items-center gap-1 rounded-lg border-2 border-transparent px-3 font-mono text-sm leading-5 font-semibold text-stone-800 uppercase transition-colors duration-150 hover:bg-stone-100";

function SolutionsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={cx(
          navLink,
          open && "border-indigo-500 bg-indigo-50 text-indigo-600 hover:bg-indigo-50",
        )}
      >
        Solutions
        <ChevronDown
          aria-hidden
          className={cx("size-3 transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      <div
        id={menuId}
        hidden={!open}
        className="absolute top-[calc(100%+12px)] left-1/2 w-64 -translate-x-1/2 rounded-xl border border-stone-200 bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(28,25,23,0.25)]"
      >
        <ul>
          {SOLUTIONS.map((s) => (
            <li key={s.path}>
              <a
                href={href(s.path)}
                className="flex h-9 items-center rounded-lg px-3 font-mono text-xs leading-4 font-semibold text-stone-800 uppercase hover:bg-stone-100"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const onResize = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-9 items-center justify-center rounded-xl border border-stone-200 bg-white text-stone-800"
      >
        <svg aria-hidden viewBox="0 0 24 24" fill="none" className="size-5">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </svg>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="fixed inset-x-0 top-[60px] bottom-0 overflow-y-auto border-t border-stone-200 bg-stone-50 px-4 pt-4 pb-10"
      >
        <p className="px-3 pb-2 font-mono text-xs leading-4 font-medium tracking-[0.1em] text-stone-500 uppercase">
          Solutions
        </p>
        <ul className="border-b border-stone-200 pb-4">
          {SOLUTIONS.map((s) => (
            <li key={s.path}>
              <a href={href(s.path)} className="flex h-11 items-center px-3 font-mono text-sm font-semibold text-stone-800 uppercase">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <ul className="pt-4">
          <li><a href={href("/agents")} className="flex h-11 items-center px-3 font-mono text-sm font-semibold uppercase">Agents</a></li>
          <li><a href={href("/pricing")} className="flex h-11 items-center px-3 font-mono text-sm font-semibold uppercase">Pricing</a></li>
          <li><a href={DOCS_URL} target="_blank" rel="noreferrer" className="flex h-11 items-center gap-1 px-3 font-mono text-sm font-semibold uppercase">Docs<ArrowUpRight12 aria-hidden className="size-3" /></a></li>
          <li><a href={href("/blog")} className="flex h-11 items-center px-3 font-mono text-sm font-semibold uppercase">Blog</a></li>
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-3 px-3">
          <ButtonLink href={href("/login")} className="h-10">Log in</ButtonLink>
          <ButtonLink href={href("/signup")} variant="primary" className="h-10">Sign up</ButtonLink>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 transition-[background-color,box-shadow] duration-200",
        scrolled
          ? "bg-stone-50/85 shadow-[0_1px_0_var(--color-stone-200)] backdrop-blur-md"
          : "bg-stone-50",
      )}
    >
      <Container className="relative flex h-[60px] items-center justify-between">
        <Link href="/" aria-label="Go to home" className="text-stone-800">
          <Logo aria-hidden className="h-7 w-[139px]" />
        </Link>

        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
          <SolutionsMenu />
          <a href={href("/agents")} className={navLink}>Agents</a>
          <a href={href("/pricing")} className={navLink}>Pricing</a>
          <a href={DOCS_URL} target="_blank" rel="noreferrer" className={navLink}>
            Docs
            <ArrowUpRight12 aria-hidden className="size-3" />
          </a>
          <a href={href("/blog")} className={navLink}>Blog</a>
        </nav>

        <div className="flex items-center gap-4">
          <ButtonLink href={href("/login")} className="max-lg:hidden">Log in</ButtonLink>
          <ButtonLink href={href("/signup")} variant="primary" className="max-sm:hidden">Sign up</ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
